import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const revealed = new WeakSet();
const counted = new WeakSet();

// Batch only siblings that actually arrive together; tall rows do not queue offscreen.
function revealBatch(selector, context, returning, { distance = 20, duration = 0.62 } = {}) {
  const items = gsap.utils.toArray(selector).filter(item => !revealed.has(item));
  if (returning || !items.length) return;
  gsap.set(items, { y: distance, opacity: 0 });
  ScrollTrigger.batch(items, {
    start: 'top 92%',
    once: true,
    interval: 0.065,
    batchMax: 8,
    onEnter: batch => context.add(() => {
      batch.forEach(item => revealed.add(item));
      gsap.to(batch, {
        y: 0, opacity: 1, duration, ease: 'power3.out', overwrite: 'auto',
        stagger: { amount: Math.min(0.24, Math.max(0, batch.length - 1) * 0.07) }
      });
    })
  });
}

export function readingMotion(context, { returning, navigationEntry }) {
  revealBatch('.gallery-item', context, returning, { distance: 24, duration: 0.68 });
  revealBatch('.project-card', context, returning, { distance: 24, duration: 0.68 });
  revealBatch('.knowledge-rows > a', context, returning);
  revealBatch('.updates-main > .update-row', context, returning);
  revealBatch('.discussion-topics li, .collab-step', context, returning, { distance: 16, duration: 0.58 });
  revealBatch('.agenda li', context, returning, { distance: 12, duration: 0.5 });
  revealBatch('.section-heading, .collab-wrap > h2, .cta-section > .container, .join-info, .closing > .container, .project-links', context, returning, { distance: 18 });

  if (!navigationEntry) revealBatch('.visual figure, .speaker-copy', context, returning, { distance: 16 });

  // Each reading section arrives as a heading and its adjacent blocks, not word by word.
  const readingGroups = [...document.querySelectorAll('.article > section')].map(section => ({
    trigger: section, targets: [...section.children]
  }));
  for (const heading of document.querySelectorAll('.content > h2')) {
    const targets = [heading];
    let next = heading.nextElementSibling;
    while (next && next.tagName !== 'H2' && !next.classList.contains('tech-tags')) {
      targets.push(next);
      next = next.nextElementSibling;
    }
    readingGroups.push({ trigger: heading, targets });
  }
  for (const { trigger, targets } of readingGroups) {
    if (returning || revealed.has(trigger)) continue;
    gsap.fromTo(targets, { y: 18, opacity: 0 }, {
      y: 0, opacity: 1, duration: 0.58, ease: 'power3.out',
      stagger: { amount: Math.min(0.18, Math.max(0, targets.length - 1) * 0.045) },
      scrollTrigger: {
        trigger, start: 'top 90%', once: true,
        onEnter: () => revealed.add(trigger)
      }
    });
  }

  const metricRecords = [];
  for (const value of document.querySelectorAll('.metrics .value')) {
    const numberNode = [...value.childNodes].find(node => node.nodeType === Node.TEXT_NODE && /\d/.test(node.textContent));
    const match = numberNode?.textContent.match(/^(\s*[^\d]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!match || counted.has(value)) continue;
    const original = document.createElement('span');
    original.className = 'metric-final';
    original.append(...value.childNodes);
    const visual = original.cloneNode(true);
    visual.className = 'metric-animated';
    visual.setAttribute('aria-hidden', 'true');
    visual.hidden = true;
    value.append(original, visual);
    const visualNumber = [...visual.childNodes].find(node => node.nodeType === Node.TEXT_NODE && /\d/.test(node.textContent));
    const finalNumber = Number(match[2]);
    const precision = match[2].includes('.') ? match[2].split('.')[1].length : 0;
    const finish = () => {
      value.classList.remove('is-counting');
      visual.remove();
      original.replaceWith(...original.childNodes);
    };
    const delay = Math.min(0.12, metricRecords.length * 0.06);
    metricRecords.push({ value, original, visual, finish });
    ScrollTrigger.create({
      trigger: value, start: 'top 91%', once: true,
      onEnter: () => context.add(() => {
        counted.add(value);
        gsap.fromTo(value, { y: 10, opacity: 0.35 }, { y: 0, opacity: 1, duration: 0.48, delay, ease: 'power3.out' });
        // Bounds/tolerances are not quantities: emphasize them without counting a new bound.
        if (/[<≤±]/.test(match[1])) {
          finish();
          return;
        }
        const counter = { number: 0 };
        value.classList.add('is-counting');
        visualNumber.textContent = match[1] + (0).toFixed(precision) + match[3];
        visual.hidden = false;
        gsap.to(counter, {
          number: finalNumber, duration: 0.72, delay, ease: 'power2.out',
          onUpdate: () => { visualNumber.textContent = match[1] + counter.number.toFixed(precision) + match[3]; },
          onComplete: finish
        });
      })
    });
  }
  for (const note of document.querySelectorAll('.result-note')) {
    gsap.fromTo(note.querySelectorAll('strong'), { backgroundColor: 'rgba(8,55,165,0)' }, {
      backgroundColor: 'rgba(8,55,165,0.12)', duration: 0.42, stagger: 0.075, repeat: 1, yoyo: true,
      ease: 'power2.out', scrollTrigger: { trigger: note, start: 'top 87%', once: true }
    });
  }
  return () => {
    for (const { finish } of metricRecords) finish();
  };
}
