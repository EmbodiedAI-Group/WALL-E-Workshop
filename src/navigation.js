(() => {
  const root = document.documentElement;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)');
  const key = 'moss-navigation';
  const route = url => new URL(url, location.href).pathname.split('/').pop() || 'index.html';
  const current = route(location.href);
  const detail = page => /^project-[1-4]\.html$/.test(page) || page === 'wang-zhi-talk.html';
  const order = ['index.html', 'projects.html', 'wang-zhi-talk.html'];
  const rank = page => /^project-[1-4]\.html$/.test(page) ? 1 : order.indexOf(page);
  let incoming;
  let transition;
  let shared = [];
  let revealed = false;

  const read = () => {
    const value = JSON.parse(sessionStorage.getItem(key) || 'null');
    if (value?.to !== current) return null;
    sessionStorage.removeItem(key);
    return value;
  };
  const role = anchor => anchor.matches('.gallery-item') ? 'gallery' : anchor.matches('.project-card') ? 'catalog' : anchor.matches('.event-strip') ? 'event' : anchor.matches('.update-row') ? 'update' : anchor.closest('.research-summary') ? 'research' : 'navigation';
  const findSource = (item, sourceRole) => {
    const candidates = [...document.querySelectorAll('.gallery-item, .project-card, .event-strip, .update-row[href], .research-summary .text-action')].filter(anchor => route(anchor.href) === item);
    return candidates.find(anchor => role(anchor) === sourceRole) || candidates[0];
  };
  const opposite = direction => direction.endsWith('forward') ? direction.replace('forward', 'back') : direction.replace('back', 'forward');
  const classify = (from, to) => detail(from) && !detail(to) ? 'detail-back' : !detail(from) && detail(to) ? 'detail-forward' : rank(to) < rank(from) ? 'section-back' : 'section-forward';
  const contextFor = (from, to) => {
    const arrival = history.state?.mossArrival;
    if (arrival?.from === to) return { ...arrival, from, to, direction: opposite(arrival.direction), returning: true };
    const selection = history.state?.mossSelection;
    if (selection?.item === to) return { ...selection, from, to, direction: 'detail-forward' };
    return { from, to, direction: classify(from, to) };
  };
  const mark = context => {
    root.dataset.navigationEntry = context.direction;
    root.dataset.navigationEntity = context.item || '';
  };
  const clearShared = () => {
    for (const element of shared) element.style.viewTransitionName = '';
    shared = [];
  };
  const nameShared = context => {
    clearShared();
    if (!context.item || !context.direction.startsWith('detail-')) return;
    let title, image;
    if (detail(current)) {
      title = document.querySelector('main h1');
      image = document.querySelector('.visual img');
    } else {
      const anchor = findSource(context.item, context.sourceRole);
      if (!anchor) return;
      title = context.sourceRole === 'research' ? anchor.closest('.research-summary').querySelector('h3') : anchor.querySelector('h2, h3, .event-research');
      image = anchor.querySelector('img');
    }
    for (const [element, name] of [[title, 'navigation-title'], [image, 'navigation-image']]) {
      if (element) {
        element.style.viewTransitionName = name;
        shared.push(element);
      }
    }
  };
  const returnTarget = context => {
    if (context.direction !== 'detail-back' || detail(current)) return;
    const anchor = findSource(context.item, context.sourceRole);
    if (!anchor) return;
    anchor.classList.add('navigation-return-target');
    setTimeout(() => anchor.classList.remove('navigation-return-target'), 1100);
  };
  const restorePosition = (context, navigationType) => {
    if (context.direction !== 'detail-back' || detail(current) || navigationType === 'traverse') return;
    const anchor = findSource(context.item, context.sourceRole);
    if (anchor && Number.isFinite(context.sourceTop)) {
      scrollTo({ top: scrollY + anchor.getBoundingClientRect().top - context.sourceTop, behavior: 'instant' });
    }
  };

  // This file is a tiny classic head entry: pagereveal must be registered before paint.
  incoming = read();
  if (incoming) {
    mark(incoming);
    root.dataset.navigationFallback = incoming.direction;
  }

  document.addEventListener('click', event => {
    const anchor = event.target.closest('a[href]');
    if (!anchor || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || anchor.target === '_blank' || anchor.hasAttribute('download')) return;
    const url = new URL(anchor.href);
    if (url.origin !== location.origin || url.pathname === location.pathname) return;
    const to = route(url.href);
    const sourceRole = role(anchor);
    let context = contextFor(current, to);
    if (anchor.closest('.site-header, .site-footer')) {
      context = { from: current, to, direction: rank(to) < rank(current) ? 'section-back' : 'section-forward' };
    } else if (detail(to) && sourceRole !== 'navigation') {
      const selection = { item: to, sourceRole, sourceTop: anchor.getBoundingClientRect().top };
      history.replaceState({ ...history.state, mossSelection: selection }, '');
      sessionStorage.setItem('moss-origin:' + current, JSON.stringify(selection));
      context = { ...selection, from: current, to, direction: 'detail-forward' };
    } else if (detail(current) && !detail(to) && anchor.closest('.breadcrumb')) {
      const origin = JSON.parse(sessionStorage.getItem('moss-origin:' + to) || 'null');
      context = origin?.item === current && context.returning ? { ...origin, from: current, to, direction: 'detail-back', returning: true } : { from: current, to, direction: 'detail-back' };
    } else if (sourceRole === 'navigation') {
      context = { from: current, to, direction: detail(current) && !detail(to) ? 'detail-back' : rank(to) < rank(current) ? 'section-back' : 'section-forward' };
    }
    incoming = null;
    sessionStorage.setItem(key, JSON.stringify(context));
  });

  addEventListener('pageswap', event => {
    const activation = event.activation;
    if (!activation) return;
    const to = route(activation.entry.url);
    const pending = JSON.parse(sessionStorage.getItem(key) || 'null');
    const context = pending?.from === current && pending.to === to ? pending : contextFor(current, to);
    context.navigationType = activation.navigationType;
    sessionStorage.setItem(key, JSON.stringify(context));
    mark(context);
    transition = event.viewTransition;
    if (!transition || reduce.matches) return;
    nameShared(context);
    const active = transition;
    active.finished.then(() => { if (transition === active) clearShared(); });
  });

  addEventListener('pagereveal', event => {
    revealed = true;
    const activation = window.navigation?.activation;
    const from = activation?.from && route(activation.from.url);
    const context = read() || incoming || (from && contextFor(from, current));
    incoming = null;
    if (!context) return;
    mark(context);
    restorePosition(context, activation?.navigationType || context.navigationType);
    if (activation?.navigationType !== 'traverse') history.replaceState({ ...history.state, mossArrival: context }, '');
    transition = event.viewTransition;
    if (!transition || reduce.matches) {
      root.dataset.navigationFallback = context.direction;
      returnTarget(context);
      return;
    }
    delete root.dataset.navigationFallback;
    nameShared(context);
    root.dataset.navigationMotion = shared.length ? 'shared' : 'native';
    const active = transition;
    active.finished.then(() => {
      if (transition !== active) return;
      clearShared();
      returnTarget(context);
    });
  });

  // Unsupported engines keep native navigation/history and a short directional entry.
  addEventListener('pageshow', event => {
    if (revealed || 'onpagereveal' in window) return;
    const context = read() || incoming;
    incoming = null;
    if (!context) return;
    mark(context);
    restorePosition(context, event.persisted ? 'traverse' : context.navigationType);
    if (!event.persisted) history.replaceState({ ...history.state, mossArrival: context }, '');
    if (event.persisted && !reduce.matches) root.dataset.navigationFallback = context.direction;
    returnTarget(context);
  });
  document.addEventListener('animationend', event => {
    if (event.animationName.startsWith('navigation-fallback')) delete root.dataset.navigationFallback;
  });
})();
