import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const header = document.querySelector('.site-header');
const main = document.querySelector('main');
if (header && main) {
  const context = header.querySelector('.section-context');
  const progress = header.querySelector('.reading-progress');
  const setProgress = gsap.quickSetter(progress, 'scaleX');
  const route = location.pathname.split('/').pop() || 'index.html';
  const category = route.startsWith('project') ? 'projects.html' : route === 'wang-zhi-talk.html' ? route : null;
  for (const link of header.querySelectorAll('nav a')) {
    const url = new URL(link.href);
    const current = Boolean(category && !url.hash && url.pathname.endsWith('/' + category));
    link.classList.toggle('is-current', current);
    if (current) link.setAttribute('aria-current', route === category ? 'page' : 'true');
  }
  let compact = false;
  document.fonts.ready.then(() => {
    ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate(self) {
        setProgress(self.progress);
        const next = self.scroll() > 96;
        if (compact !== next) {
          compact = next;
          header.classList.toggle('is-scrolled', next);
        }
      }
    });
    const headings = [...main.querySelectorAll('h1,h2')];
    const indexLinks = [...main.querySelectorAll('.project-index a')];
    const select = heading => {
      context.textContent = heading.textContent.replace(/\s+/g, ' ').trim();
      if (route === 'index.html') {
        const join = header.querySelector('.join-link');
        const active = Boolean(heading.closest('#join'));
        join.classList.toggle('is-current', active);
        if (active) join.setAttribute('aria-current', 'location');
        else join.removeAttribute('aria-current');
      }
      for (const link of indexLinks) {
        const active = link.hash === '#' + heading.id;
        link.classList.toggle('is-current', active);
        if (active) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      }
    };
    for (const [index, heading] of headings.entries()) {
      ScrollTrigger.create({
        trigger: heading,
        start: () => {
          let top = 0;
          for (let node = heading; node; node = node.offsetParent) top += node.offsetTop;
          return top - innerHeight * 0.3;
        },
        onEnter: () => select(heading),
        onLeaveBack: () => select(headings[Math.max(0, index - 1)])
      });
    }
    if (headings.length) select(headings[0]);
    ScrollTrigger.refresh();
  });
}
