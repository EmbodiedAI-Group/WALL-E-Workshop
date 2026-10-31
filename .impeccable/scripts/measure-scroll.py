from pathlib import Path
from hashlib import sha256
import json, statistics, time
from playwright.sync_api import sync_playwright
ROOT=Path.cwd(); OUT=ROOT/'.impeccable/performance'; OUT.mkdir(parents=True,exist_ok=True)
URL='http://127.0.0.1:8765/index.html'
def pct(v,p):
    return sorted(v)[min(len(v)-1, int((len(v)-1)*p))] if v else None
INIT='''() => {
  window.__motionPerf = {frames:[],tasks:[],scrolls:[],running:false};
  const state=window.__motionPerf;
  new PerformanceObserver(list=> {for (const e of list.getEntries()) if(state.running) state.tasks.push({start:e.startTime,duration:e.duration});}).observe({type:'longtask',buffered:false});
}'''
BEGIN='''() => {const s=window.__motionPerf;s.frames=[];s.tasks=[];s.running=true;s.start=performance.now();s.previous=null;function tick(t){if(!s.running)return;if(s.previous!==null)s.frames.push(t-s.previous);s.previous=t;requestAnimationFrame(tick);}requestAnimationFrame(tick);}'''
END='''() => {const s=window.__motionPerf;s.running=false;return {intervals:s.frames,longTasks:s.tasks,wallDuration:performance.now()-s.start,scrollY:scrollY,maxScroll:document.documentElement.scrollHeight-innerHeight,overflow:document.documentElement.scrollWidth>innerWidth};}'''
def measure(browser,name,width,height,mobile=False,rate=1,cycle=False):
    context=browser.new_context(viewport={'width':width,'height':height},device_scale_factor=1,is_mobile=mobile,has_touch=mobile)
    page=context.new_page(); errors=[]; page.on('pageerror',lambda e:errors.append(str(e)))
    page.goto(URL,wait_until='networkidle');page.evaluate('document.fonts.ready');page.wait_for_timeout(650)
    if rate!=1:context.new_cdp_session(page).send('Emulation.setCPUThrottlingRate',{'rate':rate})
    page.evaluate(INIT);page.evaluate(BEGIN)
    positions=[]
    for i in range(40):
        delta=(170 if mobile else 110) * (1 if i<20 else -1) if cycle else (115 if mobile else 100)
        page.mouse.wheel(0,delta);page.wait_for_timeout(200)
        if i%5==0:positions.append(page.evaluate('scrollY'))
    data=page.evaluate(END); v=data.pop('intervals');data.update({'name':name,'viewport':[width,height],'mobileEmulation':mobile,'cpuRate':rate,'frameCount':len(v),'medianIntervalMs':round(statistics.median(v),2),'p95IntervalMs':round(pct(v,.95),2),'p99IntervalMs':round(pct(v,.99),2),'medianEquivalentFps':round(1000/statistics.median(v),1),'observedAverageFps':round(len(v)*1000/data['wallDuration'],1),'framesOver33ms':sum(x>33.3 for x in v),'framesOver50ms':sum(x>50 for x in v),'maxIntervalMs':round(max(v),2),'longTaskCount':len(data['longTasks']),'longTaskTotalMs':round(sum(x['duration'] for x in data['longTasks']),1),'positions':positions,'pageErrors':errors})
    context.close();return data
if __name__=='__main__':
    import sys
    label=sys.argv[1] if len(sys.argv)>1 else 'baseline'
    before=sha256((ROOT/'assets/motion.js').read_bytes()).hexdigest()
    with sync_playwright() as p:
        browser=p.chromium.launch(executable_path=r'C:\Program Files\Google\Chrome\Application\chrome.exe',headless=True)
        cycle=label.startswith('active')
        results=[measure(browser,label+'-desktop',1536,1024,cycle=cycle),measure(browser,label+'-mobile',390,844,True,cycle=cycle)]
        if label in ['active-after','active-after-final']:results.append(measure(browser,label+'-desktop4x',1536,1024,rate=4,cycle=True))
        browser.close()
    after=sha256((ROOT/'assets/motion.js').read_bytes()).hexdigest()
    report={'label':label,'method':('Active20down20up, ' if cycle else 'Down-only with idle tail, ')+'Local headless Chrome, 40 actual wheel inputs at200ms, warmed fonts, rAF sampling; viewport emulation is not physical-device validation. Concurrent local workloads may affect timing.','bundleHashBefore':before,'bundleHashAfter':after,'bundleUnchanged':before==after,'results':results}
    (OUT/(label+'.json')).write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf8'); print(json.dumps(report,ensure_ascii=False))
