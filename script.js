(() => {
  'use strict';

  function injectApplyLog() {
    const classmaker = document.getElementById('classmaker');
    if (classmaker && !document.getElementById('applylog')) {
      classmaker.insertAdjacentHTML('afterend', `
<article aria-labelledby="applylog-title" class="project feature" id="applylog">
  <div class="video-shell" data-project="applylog" data-state="empty">
    <video aria-label="ApplyLog silent project demo" loop muted playsinline preload="none">Your browser cannot play this video.</video>
    <div class="video-placeholder">
      <span class="preview-category">03 / ApplyLog</span>
      <div aria-hidden="true" class="demo-mark"><span></span><span></span><span></span></div>
      <strong class="placeholder-title">Demo coming soon</strong>
      <span class="placeholder-note">Sign in → save → track → persist</span>
      <span class="silent-note">Short walkthrough · no sound needed</span>
    </div>
    <div class="video-label">ApplyLog · silent demo with synthetic data</div>
    <button aria-label="Play ApplyLog demo" class="video-toggle" hidden type="button">Play demo</button>
  </div>
  <div class="project-copy">
    <div class="project-number">03</div>
    <div class="project-meta"><span class="project-status">Deployed</span><span>Personal cloud project · October 2026</span></div>
    <h3 id="applylog-title">ApplyLog</h3>
    <p class="project-hook">I wanted to understand cloud architecture by following one real record all the way through the stack.</p>
    <p>ApplyLog is a private serverless internship tracker built with React, TypeScript, AWS Amplify Gen 2, Cognito, AppSync, GraphQL, and DynamoDB. I implemented authenticated CRUD, owner-based data isolation, input validation, automated logic tests, and deployment checks—then worked through the build and runtime failures that surfaced when the pieces met in production.</p>
    <div class="hero-actions">
      <a class="button primary" href="https://main.d19nr4jrdg173h.amplifyapp.com" rel="noreferrer" target="_blank">Live app ↗</a>
      <a class="button ghost" href="https://github.com/galiettemita/aws-applylog" rel="noreferrer" target="_blank">Source ↗</a>
    </div>
    <div class="chips"><span>AWS Amplify Gen 2</span><span>Cognito</span><span>AppSync</span><span>DynamoDB</span><span>GraphQL</span></div>
  </div>
</article>`);
    }

    const glance = document.querySelector('.now-list a[href="#ai-agent"]');
    if (glance) {
      glance.href = '#applylog';
      glance.innerHTML = '<span class="now-label">Deployed</span><strong>ApplyLog</strong><span class="now-description">A private serverless tracker on AWS.</span><span aria-hidden="true" class="now-arrow">↗</span>';
    }

    const proofItems = document.querySelectorAll('.mini-proof span');
    if (proofItems[2]) proofItems[2].innerHTML = '<strong>AWS</strong> serverless · ApplyLog';

    const index = document.querySelector('.project-index');
    if (index) {
      index.innerHTML = [
        ['01', 'mobile-pros', 'Mobile Pros'],
        ['02', 'classmaker', 'ClassMaker'],
        ['03', 'applylog', 'ApplyLog'],
        ['04', 'ai-agent', 'Personal AI Agent'],
        ['05', 'medical-ai', 'Medical Imaging'],
        ['06', 'pneumoscan', 'PneumoScan'],
      ].map(([number, id, name]) => `<a href="#${id}"><span>${number}</span>${name}<b aria-hidden="true">↗</b></a>`).join('');
    }

    const layouts = [
      ['ai-agent', '04', 'Personal AI Agent', true],
      ['medical-ai', '05', 'Medical Imaging', false],
      ['pneumoscan', '06', 'PneumoScan', true],
    ];
    layouts.forEach(([id, number, title, reverse]) => {
      const article = document.getElementById(id);
      if (!article) return;
      article.classList.toggle('reverse', reverse);
      const projectNumber = article.querySelector('.project-number');
      if (projectNumber) projectNumber.textContent = number;
      const category = article.querySelector('.preview-category');
      if (category) category.textContent = `${number} / ${title}`;
    });
  }

  injectApplyLog();

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
    if (Array.isArray(state.config.sources)) {
      state.config.sources.forEach(item => {
        if (!item || typeof item.src !== 'string' || !item.src.trim()) return;
        const source = document.createElement('source');
        source.src = item.src;
        if (item.type) source.type = item.type;
        state.video.appendChild(source);
      });
    } else {
      state.video.src = state.config.src;
    }
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
    const hasSingleSource = config && typeof config.src === 'string' && config.src.trim();
    const hasSourceList = config && Array.isArray(config.sources) && config.sources.some(item => item && typeof item.src === 'string' && item.src.trim());
    if (!hasSingleSource && !hasSourceList) return;
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
        state.video.pause();
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
