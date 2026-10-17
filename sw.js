/* ============================================================
   sw.js — Service Worker para "PlayStudy" (PWA)
   Estrategia: Cache-first con red como fallback.
   Actualiza CACHE_NAME cada vez que hagas cambios relevantes.
   ============================================================ */

const CACHE_NAME = 'playstudy-v1';

// Recursos que se cachean en la instalación (shell de la app)
const PRECACHE_URLS = [
  '/playstudy/',
  '/playstudy/index.html',
  '/playstudy/manifest.json',
  '/playstudy/css/main.css',
  '/playstudy/css/menu.css',
  '/playstudy/css/map.css',
  '/playstudy/css/memory.css',
  '/playstudy/css/puzzle.css',
  '/playstudy/css/theory.css',
  '/playstudy/css/quiz.css',
  '/playstudy/src/game_bundle.js',
  '/playstudy/icons/icon-192.png',
  '/playstudy/icons/icon-512.png',
  '/playstudy/icons/icon-180.png',
  '/playstudy/icons/favicon-32.png',
  '/playstudy/icons/favicon-16.png',
];

// ── Instalación: pre-cachear el shell de la aplicación ──────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

// ── Activación: limpiar cachés antiguas ─────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: cache-first, fallback a red ─────────────────────
self.addEventListener('fetch', event => {
  // Solo interceptamos peticiones GET al mismo origen
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Cachear recursos nuevos del mismo origen
        if (response.ok && response.type === 'basic') {
          const cloned = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        }
        return response;
      });
    })
  );
});
