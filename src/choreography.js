import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { readingMotion } from './reading-motion.js';

gsap.registerPlugin(ScrollTrigger);
const media = gsap.matchMedia();
const home = document.body.classList.contains('page-home');
let entered = false;

// Font loading and the early navigation marker settle geometry before choreography.
document.fonts.ready.then(() => {
  media.add({
    desktop: '(hover: hover) and (pointer: fine)',
    reduce: '(prefers-reduced-motion: reduce)',
    all: 'all'
  }, context => {
    const { desktop, reduce } = context.conditions;
    const navigationEntry = document.documentElement.hasAttribute('data-navigation-entry');
    const returning = document.documentElement.dataset.navigationEntry === 'detail-back';
    if (reduce) {
      if (home) gsap.set('.hero-photo', { clearProps: 'transform' });
      return;
    }

    let lenis;
    const tick = time => lenis.raf(time * 1000);
    if (desktop) {
      lenis = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        anchors: { offset: 0 },
        stopInertiaOnNavigate: true
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    if (home) {
      // Reset the captured entrance pose on every media rebuild.
      gsap.set('.hero-photo', { x: 0, y: 0, xPercent: 0, yPercent: 0, scale: 1.08 });
      if (!entered && !navigationEntry && window.scrollY < 32) {
        gsap.timeline({ defaults: { ease: 'power4.out' } })
          .from('.hero-masthead', { yPercent: 12, duration: 0.92 }, 0)
          .from('.hero-photo', { x: desktop ? 36 : 18, scale: 1.16, duration: 0.9 }, 0.04)
          .from('.hero-mission span', { y: desktop ? 30 : 18, duration: 0.72, stagger: 0.08 }, 0.12)
          .from('.contents-rail > a', { x: -12, opacity: 0.45, duration: 0.46, stagger: 0.045 }, 0.18)
          .from('.hero-note', { y: 10, opacity: 0.45, duration: 0.5 }, 0.26)
          .from('.event-strip', { y: 9, opacity: 0.6, duration: 0.45 }, 0.35);
      }
      gsap.fromTo('.hero-photo', { yPercent: -3 }, {
        yPercent: 3, ease: 'none',
        scrollTrigger: { trigger: '.home-opening', start: 'top top', end: 'bottom top', scrub: 0.55 }
      });
      if (desktop) gsap.to('.hero-masthead', {
        y: -20, ease: 'none',
        scrollTrigger: { trigger: '.home-opening', start: 'top top', end: 'bottom top', scrub: 0.55 }
      });
      if (!returning) {
        gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: '.research-feature', start: 'top 88%', once: true }
        })
          .fromTo('.research-heading h2', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.66 }, 0)
          .fromTo('.research-author', { x: -12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.6 }, 0.08)
          .fromTo('.research-summary h3', { x: desktop ? 24 : 12, opacity: 0 }, { x: 0, opacity: 1, duration: 0.66 }, 0.13);
        gsap.from('.knowledge-section .heading-rule', {
          scaleX: 0, transformOrigin: 'left center', duration: 0.72, ease: 'power3.inOut',
          scrollTrigger: { trigger: '.knowledge-section', start: 'top 88%', once: true }
        });
        gsap.timeline({
          defaults: { ease: 'power3.out' },
          scrollTrigger: { trigger: '.community-join', start: 'top 89%', once: true }
        })
          .fromTo('.join-copy h2', { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.66 }, 0)
          .fromTo('.join-contact', { x: desktop ? 20 : 0, y: desktop ? 0 : 16, opacity: 0 }, { x: 0, y: 0, opacity: 1, duration: 0.6 }, 0.12);
      }
    } else if (!entered && !navigationEntry && window.scrollY < 32) {
      gsap.from('main h1', { y: 22, opacity: 0.4, duration: 0.58, ease: 'power3.out' });
      gsap.from('.page-hero > .container > p, .page-talk .english-title', { y: 12, opacity: 0.5, duration: 0.5, delay: 0.08, ease: 'power3.out' });
    }

    const restoreMetrics = readingMotion(context, { returning, navigationEntry });
    entered = true;
    ScrollTrigger.refresh();
    return () => {
      restoreMetrics();
      if (lenis) {
        gsap.ticker.remove(tick);
        lenis.destroy();
      }
    };
  });
});
