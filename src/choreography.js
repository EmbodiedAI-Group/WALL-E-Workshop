import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger);
const media = gsap.matchMedia();
const home = document.body.classList.contains('page-home');
let entered = false;

// Fonts set the publication's geometry. Defaults stay visible until it is ready.
document.fonts.ready.then(() => {
  media.add({
    desktop: '(hover: hover) and (pointer: fine)',
    reduce: '(prefers-reduced-motion: reduce)',
    all: 'all'
  }, context => {
    const { desktop, reduce } = context.conditions;
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
        anchors: { offset: -24 },
        stopInertiaOnNavigate: true
      });
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    if (home) {
      // A media rebuild must not inherit the entrance's captured from-state.
      gsap.set('.hero-photo', { x: 0, y: 0, xPercent: 0, yPercent: 0, scale: 1.08 });
      if (!entered && window.scrollY < 32) {
        const assembly = gsap.timeline({ defaults: { ease: 'power4.out' } });
        assembly
          .from('.hero-masthead', { yPercent: 12, duration: 0.92 }, 0)
          .from('.hero-photo', { x: desktop ? 36 : 18, scale: 1.16, duration: 0.9 }, 0.04)
          .from('.hero-mission span', { y: desktop ? 30 : 18, duration: 0.72, stagger: 0.08 }, 0.12)
          .from('.contents-rail > a', { x: -12, opacity: 0.45, duration: 0.46, stagger: 0.045 }, 0.18)
          .from('.hero-note', { y: 10, opacity: 0.45, duration: 0.5 }, 0.26)
          .from('.event-strip', { y: 9, opacity: 0.6, duration: 0.45 }, 0.35);
      }
      gsap.fromTo('.hero-photo', { yPercent: -3 }, {
        yPercent: 3,
        ease: 'none',
        scrollTrigger: { trigger: '.home-opening', start: 'top top', end: 'bottom top', scrub: 0.55 }
      });
      if (desktop) gsap.to('.hero-masthead', {
        y: -20,
        ease: 'none',
        scrollTrigger: { trigger: '.home-opening', start: 'top top', end: 'bottom top', scrub: 0.55 }
      });

      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.project-gallery', start: 'top 94%', once: true }
      })
        .fromTo('.gallery-image', { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.64, stagger: 0.06 }, 0)
        .from('.gallery-item h3, .gallery-item p', { y: 10, opacity: 0.5, duration: 0.48, stagger: 0.025 }, 0.12);

      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.research-feature', start: 'top 82%', once: true }
      })
        .from('.research-heading h2', { y: 30, duration: 0.72 }, 0)
        .from('.research-author', { x: -14, opacity: 0.6, duration: 0.6 }, 0.1)
        .from('.research-summary h3', { x: desktop ? 28 : 14, opacity: 0.65, duration: 0.7 }, 0.16);

      gsap.from('.knowledge-section .heading-rule', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.85,
        ease: 'power3.inOut',
        scrollTrigger: { trigger: '.knowledge-section', start: 'top 84%', once: true }
      });
      gsap.from('.updates-main .update-row', {
        y: 16, opacity: 0.65, duration: 0.6, stagger: 0.07, ease: 'power3.out',
        scrollTrigger: { trigger: '.community-updates', start: 'top 84%', once: true }
      });
      gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: { trigger: '.community-join', start: 'top 84%', once: true }
      })
        .from('.join-copy h2', { y: 28, duration: 0.75 }, 0)
        .from('.join-contact', { x: desktop ? 24 : 0, y: desktop ? 0 : 18, opacity: 0.6, duration: 0.65 }, 0.15);
    } else {
      if (!entered && window.scrollY < 32) {
        gsap.from('main h1', { y: 22, opacity: 0.65, duration: 0.58, ease: 'power3.out' });
        gsap.from('.page-hero > .container > p, .page-talk .english-title', { y: 12, opacity: 0.7, duration: 0.5, delay: 0.08, ease: 'power3.out' });
      }
      for (const row of document.querySelectorAll('.project-card')) {
        gsap.timeline({
          defaults: { duration: 0.65, ease: 'power3.out' },
          scrollTrigger: { trigger: row, start: 'top 90%', once: true }
        })
          .fromTo(row.querySelector('.card-visual'), { clipPath: 'inset(0% 14% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)' }, 0)
          .from(row.querySelector('.card-body'), { x: desktop ? 26 : 0, y: desktop ? 0 : 12, opacity: 0.6 }, 0.08);
      }
      for (const section of document.querySelectorAll('.visual figure, .speaker-copy')) {
        gsap.from(section, {
          y: 16, opacity: 0.65, duration: 0.62, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 92%', once: true }
        });
      }
    }
    entered = true;
    ScrollTrigger.refresh();
    return () => {
      if (lenis) {
        gsap.ticker.remove(tick);
        lenis.destroy();
      }
    };
  });
});
