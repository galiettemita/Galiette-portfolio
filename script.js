(() => {
  'use strict';
  const media = window.PORTFOLIO_MEDIA || {};
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const states = [];

  function updateButton(state) {
    state.button.textContent = state.video.paused ? 'Play demo' : 'Pause demo';
    state.button.setAttribute('aria-label', `${state.video.paused ? 'Play' : 'Pause'} ${state.title} demo`);
  }

  function play(state) {
    const promise = state.video.play();
    if (promise && typeof promise.catch === 'function') promise.catch(() => updateButton(state));
  }

  function syncPlayback(state) {
    if (!state.ready) return;
    if (!state.inView || document.hidden) {
      state.video.pause();
    } else if (!state.userPaused && (!reducedMotion.matches || state.userStarted)) {
      play(state);
    }
  }

  function load(state) {
    if (state.loaded) return;
    state.loaded = true;
    state.shell.dataset.state = 'loading';
    state.video.preload = 'metadata';
    if (state.config.poster) state.video.poster = state.config.poster;
    state.video.src = state.config.src;
    state.video.load();
  }

  const observer = 'IntersectionObserver' in window ? new IntersectionObserver(entries => {
    for (const entry of entries) {
      const state = states.find(item => item.shell === entry.target);
      if (!state) continue;
      state.inView = entry.isIntersecting && entry.intersectionRatio >= 0.35;
      if (entry.isIntersecting) load(state);
      syncPlayback(state);
    }
  }, {threshold: [0, 0.35]}) : null;

  document.querySelectorAll('.video-shell').forEach(shell => {
    const config = media[shell.dataset.project];
    if (!config || typeof config.src !== 'string' || !config.src.trim()) return;
    const video = shell.querySelector('video');
    const button = shell.querySelector('.video-toggle');
    if (!video || !button) return;
    const title = shell.closest('article').querySelector('h3').textContent;
    const state = {shell, video, button, config, title, inView: false, ready: false, loaded: false, userPaused: false, userStarted: false};
    states.push(state);
    video.muted = true;
    video.defaultMuted = true;

    video.addEventListener('loadeddata', () => {
      state.ready = true;
      shell.dataset.state = 'ready';
      shell.classList.add('has-video');
      button.hidden = false;
      updateButton(state);
      syncPlayback(state);
    });
    video.addEventListener('play', () => updateButton(state));
    video.addEventListener('pause', () => updateButton(state));
    video.addEventListener('error', () => {
      state.ready = false;
      shell.classList.remove('has-video');
      shell.dataset.state = 'unavailable';
      button.hidden = true;
      shell.querySelector('.placeholder-title').textContent = 'Demo unavailable';
      shell.querySelector('.placeholder-note').textContent = 'The project story is below.';
    });
    button.addEventListener('click', () => {
      if (video.paused) {
        state.userPaused = false;
        state.userStarted = true;
        play(state);
      } else {
        state.userPaused = true;
        video.pause();
      }
    });
    if (observer) observer.observe(shell);
    else {
      state.userPaused = true;
      load(state);
    }
  });

  document.addEventListener('visibilitychange', () => states.forEach(syncPlayback));
  if (reducedMotion.addEventListener) reducedMotion.addEventListener('change', () => {
    states.forEach(state => {
      if (reducedMotion.matches && !state.userStarted) state.video.pause();
      else syncPlayback(state);
    });
  });
})();