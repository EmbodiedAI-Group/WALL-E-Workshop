from pathlib import Path
from hashlib import sha256
import json
from urllib.parse import urlparse, unquote
from playwright.sync_api import sync_playwright

root = Path.cwd()
out = root / '.impeccable/screenshots'
out.mkdir(parents=True, exist_ok=True)
review = root / '.impeccable/review'
review.mkdir(parents=True, exist_ok=True)
routes = ['index.html', 'projects.html', 'project-1.html', 'project-2.html', 'project-3.html', 'project-4.html', 'wang-zhi-talk.html']
results = []
with sync_playwright() as p:
    browser = p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe', headless=True)
    for route in routes:
        page = browser.new_page(viewport={'width': 1536, 'height': 1024}, device_scale_factor=1)
        errors = []
        page.on('pageerror', lambda error: errors.append(str(error)))
        response = page.goto('http://127.0.0.1:8765/' + route, wait_until='networkidle')
        page.evaluate('document.fonts.ready')
        page.wait_for_timeout(1300)
        links = page.eval_on_selector_all('a[href]', '(nodes) => nodes.map(a => a.getAttribute("href"))')
        broken = []
        for link in links:
            parsed = urlparse(link)
            if parsed.scheme or parsed.netloc:
                continue
            target = root / unquote(parsed.path) if parsed.path else root / route
            if not target.exists():
                broken.append(link)
            elif parsed.fragment and target.suffix == '.html':
                text = target.read_text(encoding='utf8')
                if f'id="{unquote(parsed.fragment)}"' not in text:
                    broken.append(link)
        for width, height in [(1536, 1024), (375, 812)]:
            page.set_viewport_size({'width': width, 'height': height})
            page.evaluate('document.fonts.ready')
            page.evaluate('Promise.all([...document.images].map(i => {i.loading="eager"; return i.decode()}))')
            page.evaluate('window.scrollTo({top:document.documentElement.scrollHeight,behavior:"instant"})')
            page.wait_for_timeout(1800)
            page.evaluate('window.scrollTo({top:0,behavior:"instant"})')
            page.wait_for_timeout(1800)
            metrics = page.evaluate('({overflow:document.documentElement.scrollWidth>innerWidth, badImages:[...document.images].filter(i=>!i.naturalWidth).length, h1:document.querySelectorAll("h1").length, main:document.querySelectorAll("main").length})')
            name = ('home-desktop' if width == 1536 else 'home-375') if route == 'index.html' else route.replace('.html', f'-{width}')
            page.screenshot(path=str(out / (name + '.png')), full_page=True)
            if route == 'index.html' and width == 1536:
                page.screenshot(path=str(out / 'home-first-viewport.png'))
                page.screenshot(path=str(review / 'hero-repro.png'))
            results.append({'route': route, 'width': width, 'status': response.status, **metrics, 'brokenLinks': broken, 'errors': errors.copy()})
        page.close()
    page = browser.new_page(viewport={'width': 1536, 'height': 1024})
    page.goto('http://127.0.0.1:8765/', wait_until='networkidle')
    layers = page.evaluate('({wordmark:Number(getComputedStyle(document.querySelector(".hero-masthead")).zIndex),frame:Number(getComputedStyle(document.querySelector(".hero-photo-frame")).zIndex),photoInsideFrame:document.querySelector(".hero-photo").parentElement.classList.contains("hero-photo-frame")})')
    motion = {'heroLayers': layers, 'desktopThreads': page.locator('#community-threads canvas').count(), 'joinHref': page.locator('#join-magnet a').get_attribute('href')}
    page.locator('#join').scroll_into_view_if_needed()
    page.locator('.join-contact a').hover()
    motion['joinHoverColor'] = page.locator('.join-contact a').evaluate('(a)=>getComputedStyle(a).color')
    page.emulate_media(reduced_motion='reduce')
    page.reload(wait_until='networkidle')
    motion['reducedThreads'] = page.locator('#community-threads canvas').count()
    page.set_viewport_size({'width': 375, 'height': 812})
    page.emulate_media(reduced_motion='no-preference')
    page.reload(wait_until='networkidle')
    motion['mobileThreads'] = page.locator('#community-threads canvas').count()
    nojs = browser.new_context(java_script_enabled=False, viewport={'width': 375, 'height': 812})
    fallback = nojs.new_page()
    fallback.goto('http://127.0.0.1:8765/')
    motion['noJsNavigationUsable'] = fallback.locator('#join-magnet a').is_visible() and fallback.locator('h1').is_visible()
    nojs.close()
    browser.close()
inputs = [*root.glob('*.html'), *root.glob('assets/*.css'), *root.glob('assets/*.js'), *root.glob('assets/media/*.webp'), *root.glob('assets/fonts/*.woff2')]
hashes = {str(path.relative_to(root)).replace('\\', '/'): sha256(path.read_bytes()).hexdigest() for path in inputs}
report = {'routes': results, 'motion': motion, 'inputHashes': hashes, 'viewport': '1536x1024 desktop / 375x812 mobile', 'browser': 'Local Chrome via Python Playwright', 'reproduce': 'python .impeccable/scripts/verify-site.py'}
(out / 'final-validation.json').write_text(json.dumps(report, ensure_ascii=False, indent=2), encoding='utf8')
failures = [r for r in results if r['status'] != 200 or r['overflow'] or r['badImages'] or r['brokenLinks'] or r['errors'] or r['h1'] != 1 or r['main'] != 1]
assert not failures, json.dumps(failures, ensure_ascii=False)
assert motion['desktopThreads'] == 1 and motion['reducedThreads'] == 0 and motion['mobileThreads'] == 0
assert motion['joinHref'] == '#join' and motion['noJsNavigationUsable']
assert layers['wordmark'] > layers['frame'] and layers['photoInsideFrame']
print(json.dumps({'routeViewportChecks': len(results), 'failures': len(failures), 'motion': motion}, ensure_ascii=False))
