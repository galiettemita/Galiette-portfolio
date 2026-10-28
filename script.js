(() => {
  'use strict';

  const projects = {
    'mobile-pros': {
      number: '01',
      label: 'MOBILE PROS',
      status: 'PRODUCTION CLIENT WORK',
      title: 'Mobile Pros',
      summary: 'A B2B auction and live inventory platform that I build and maintain for a real electronics business.',
      challenge: 'The platform has to keep inventory, bids, buyer access, pricing, and order status consistent while staff use it during active sales.',
      metrics: [
        ['50+', 'buyers'],
        ['$100K+', 'inventory'],
        ['Live', 'business workflows'],
      ],
      stack: ['TypeScript', 'Next.js', 'PostgreSQL', 'Supabase'],
      trace: [
        'Inventory enters PostgreSQL',
        'Business rules set price and status',
        'Buyers bid or purchase',
        'Staff close and reconcile orders',
      ],
      poster: 'https://galiette-portfolio.vercel.app/posters/mobile-pros.jpg',
      sources: [{ src: 'https://galiette-portfolio.vercel.app/videos/mobile-pros.mp4', type: 'video/mp4' }],
      links: [],
    },
    classmaker: {
      number: '02',
      label: 'CLASSMAKER',
      status: 'PRODUCTION SCHOOL SOFTWARE',
      title: 'ClassMaker',
      summary: 'A class placement platform used by my former elementary school to organize about 1,000 students across 9 grades and 55 classrooms.',
      challenge: 'Placement has to satisfy many competing constraints at once, including capacity, friend requests, teacher restrictions, support hours, and balanced class composition.',
      metrics: [
        ['1,000', 'students'],
        ['55', 'classrooms'],
        ['9', 'grades'],
      ],
      stack: ['TypeScript', 'Constraint logic', 'Spreadsheet ingestion', 'Student ID matching'],
      trace: [
        'Staff upload student spreadsheets',
        'Student IDs merge new and existing records',
        'Constraint rules score placements',
        'Administrators review and adjust rosters',
      ],
      poster: 'https://galiette-portfolio.vercel.app/posters/classmaker.jpg',
      sources: [{ src: 'https://galiette-portfolio.vercel.app/videos/classmaker.mp4', type: 'video/mp4' }],
      links: [],
    },
    brevia: {
      number: '03',
      label: 'BREVIA',
      status: 'PERSONAL AI SYSTEM',
      title: 'Brevia',
      summary: 'A personal AI agent that connects to tools and completes multi-step tasks instead of only describing what the user should do.',
      challenge: 'The hard part is not the chat interface. It is durable task state, permission boundaries, tool failures, and knowing when the person needs to take over.',
      metrics: [
        ['MCP', 'tool access'],
        ['Gmail', 'Google integration'],
        ['Human', 'approval gates'],
      ],
      stack: ['MCP', 'Google Cloud', 'Gmail API', 'Browser automation'],
      trace: [
        'User describes an outcome',
        'Agent builds a task plan',
        'Permission rules gate sensitive actions',
        'Tools execute and report results',
      ],
      poster: '',
      sources: [],
      links: [],
    },
    applylog: {
      number: '04',
      label: 'APPLYLOG',
      status: 'DEPLOYED CLOUD PROJECT',
      title: 'ApplyLog',
      summary: 'A private serverless internship tracker built to follow one authenticated record from the interface through the cloud stack.',
      challenge: 'The project made cloud architecture concrete by requiring authentication, owner based data access, validation, CRUD operations, deployment, and runtime debugging to work together.',
      metrics: [
        ['Private', 'owner scoped data'],
        ['CRUD', 'complete workflow'],
        ['AWS', 'serverless stack'],
      ],
      stack: ['React', 'TypeScript', 'AWS Amplify Gen 2', 'Cognito', 'AppSync', 'DynamoDB'],
      trace: [
        'Cognito authenticates the user',
        'React sends a GraphQL operation',
        'AppSync enforces owner access',
        'DynamoDB persists the application',
      ],
      poster: 'https://galiette-portfolio.vercel.app/posters/applylog.jpg',
      sources: [
        { src: 'https://galiette-portfolio.vercel.app/videos/applylog.webm', type: 'video/webm' },
        { src: 'https://galiette-portfolio.vercel.app/videos/applylog.mp4', type: 'video/mp4' },
      ],
      links: [
        { label: 'Open live app', href: 'https://main.d19nr4jrdg173h.amplifyapp.com' },
        { label: 'View source', href: 'https://github.com/galiettemita/aws-applylog' },
      ],
    },
  };

  const order = ['mobile-pros', 'classmaker', 'brevia', 'applylog'];
  const buttons = Array.from(document.querySelectorAll('[data-project-id]'));
  const stage = document.getElementById('project-stage');
  const video = document.getElementById('project-video');
  const diagram = document.getElementById('project-diagram');
  const mediaFrame = document.getElementById('media-frame');
  const number = document.getElementById('stage-number');
  const status = document.getElementById('stage-status');
  const title = document.getElementById('project-title');
  const summary = document.getElementById('project-summary');
  const challenge = document.getElementById('project-challenge');
  const trace = document.getElementById('project-trace');
  const stack = document.getElementById('project-stack');
  const links = document.getElementById('project-links');
  const metricValues = [
    document.getElementById('metric-one-value'),
    document.getElementById('metric-two-value'),
    document.getElementById('metric-three-value'),
  ];
  const metricLabels = [
    document.getElementById('metric-one-label'),
    document.getElementById('metric-two-label'),
    document.getElementById('metric-three-label'),
  ];

  function setMedia(project) {
    video.pause();
    while (video.firstChild) video.removeChild(video.firstChild);

    if (!project.sources.length) {
      video.hidden = true;
      diagram.hidden = false;
      mediaFrame.classList.add('is-diagram');
      video.removeAttribute('poster');
      video.load();
      return;
    }

    diagram.hidden = true;
    video.hidden = false;
    mediaFrame.classList.remove('is-diagram');
    if (project.poster) video.poster = project.poster;
    else video.removeAttribute('poster');

    project.sources.forEach((sourceData) => {
      const source = document.createElement('source');
      source.src = sourceData.src;
      source.type = sourceData.type;
      video.appendChild(source);
    });
    video.appendChild(document.createTextNode('Your browser does not support the video element.'));
    video.load();
  }

  function renderList(element, items, renderer) {
    element.replaceChildren(...items.map(renderer));
  }

  function selectProject(projectId, options = {}) {
    const project = projects[projectId];
    if (!project) return;

    buttons.forEach((button) => {
      const active = button.dataset.projectId === projectId;
      button.classList.toggle('is-active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    });

    number.textContent = `${project.number} / ${project.label}`;
    status.textContent = project.status;
    title.textContent = project.title;
    summary.textContent = project.summary;
    challenge.textContent = project.challenge;

    project.metrics.forEach(([value, label], index) => {
      metricValues[index].textContent = value;
      metricLabels[index].textContent = label;
    });

    renderList(trace, project.trace, (item, index) => {
      const li = document.createElement('li');
      const step = document.createElement('span');
      const copy = document.createElement('strong');
      step.textContent = String(index + 1).padStart(2, '0');
      copy.textContent = item;
      li.append(step, copy);
      return li;
    });

    renderList(stack, project.stack, (item) => {
      const li = document.createElement('li');
      li.textContent = item;
      return li;
    });

    renderList(links, project.links, (item) => {
      const anchor = document.createElement('a');
      anchor.className = 'button button-light';
      anchor.href = item.href;
      anchor.target = '_blank';
      anchor.rel = 'noreferrer';
      anchor.textContent = item.label;
      return anchor;
    });

    setMedia(project);
    stage.dataset.activeProject = projectId;

    if (options.focus) {
      const activeButton = buttons.find((button) => button.dataset.projectId === projectId);
      if (activeButton) activeButton.focus();
    }
  }

  buttons.forEach((button) => {
    button.addEventListener('click', () => selectProject(button.dataset.projectId));
    button.addEventListener('keydown', (event) => {
      const current = order.indexOf(button.dataset.projectId);
      let next = current;
      if (event.key === 'ArrowDown') next = (current + 1) % order.length;
      else if (event.key === 'ArrowUp') next = (current - 1 + order.length) % order.length;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = order.length - 1;
      else return;
      event.preventDefault();
      selectProject(order[next], { focus: true });
    });
  });

  const numberShortcuts = {
    '1': 'mobile-pros',
    '2': 'classmaker',
    '3': 'brevia',
    '4': 'applylog',
  };

  document.addEventListener('keydown', (event) => {
    const target = event.target;
    const isTyping = target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement || target instanceof HTMLSelectElement || target?.isContentEditable;
    if (isTyping || event.altKey || event.ctrlKey || event.metaKey) return;
    const projectId = numberShortcuts[event.key];
    if (projectId) selectProject(projectId, { focus: true });
  });

  const copyButton = document.getElementById('copy-email');
  const copyStatus = document.getElementById('copy-status');

  async function copyEmail() {
    const email = copyButton.dataset.email;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(email);
      } else {
        const field = document.createElement('textarea');
        field.value = email;
        field.setAttribute('readonly', '');
        field.style.position = 'fixed';
        field.style.opacity = '0';
        document.body.appendChild(field);
        field.select();
        document.execCommand('copy');
        field.remove();
      }
      copyStatus.textContent = 'Email copied.';
    } catch {
      copyStatus.textContent = `Copy failed. Email: ${email}`;
    }
  }

  copyButton.addEventListener('click', copyEmail);
  selectProject('mobile-pros');
})();
