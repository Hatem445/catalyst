const CACHE_NAME = 'chemistry-mindmap-pro-v18';
const APP_SHELL = [
  './',
  './index.html',
  './offline.html',
  './manifest.webmanifest',
  './assets/css/app.css',
  './assets/css/exams.css',
  './assets/js/main.js',
  './assets/js/state.js',
  './assets/js/data.js',
  './assets/js/db.js',
  './assets/js/examCenter.js',
  './assets/js/questionPlayer.js',
  './assets/js/mockEngine.js',
  './assets/js/analytics.js',
  './assets/js/workedExamples.js',
  './assets/js/laws.js',
  './assets/js/adaptive.js',
  './assets/js/reaction-player.js',
  './assets/js/render.js',
  './assets/js/router.js',
  './assets/js/quiz.js',
  './assets/js/flashcards.js',
  './assets/js/search.js',
  './assets/js/progress.js',
  './assets/js/periodic-table.js',
  './assets/data/exams/official-2026-models.json',
  './assets/data/exams/archive-2017-2025.json',
  './assets/data/exams/source-map-2026.json',
  './assets/data/exams/manual-review-needed.json',
  './assets/data/mocks/chemistry-blueprint.json',
  './assets/data/worked-examples.json',
  './assets/data/micro-lessons.json',
  './assets/images/catalyst_logo_reference.png',
  './assets/images/chemistry_ui_reference.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const reqUrl = new URL(event.request.url);
  if (reqUrl.pathname.toLowerCase().endsWith('.pdf')) return;

  const isNavigation = event.request.mode === 'navigate';

  if (isNavigation) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put('./index.html', clone));
          return response;
        })
        .catch(() => caches.match('./index.html').then(r => r || caches.match('./offline.html')))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request)
        .then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') return response;
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
          return response;
        })
        .catch(() => caches.match('./offline.html'));
    })
  );
});
