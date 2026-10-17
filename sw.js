/* ============================================================
   sw.js — Service Worker para "PlayStudy" (PWA)
   Estrategia:
   - Shell de la app (HTML/CSS/JS del juego): cache-first con red
     como fallback. → Sube CACHE_NAME cuando cambies CSS o código.
   - Datos (data/*.json y data/catalogo_data.js): primero red,
     con la caché como respaldo sin conexión. → Los capítulos,
     quizzes y fichas nuevos aparecen solos al abrir la app con
     internet, sin tocar ninguna versión de caché.
   ============================================================ */

const CACHE_NAME = 'playstudy-v2';

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

// ── Fetch: cache-first para la shell, network-first para datos ──
self.addEventListener('fetch', event => {
  // Solo interceptamos peticiones GET al mismo origen
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // ── Datos del juego: primero red, caché como respaldo offline ──
  // (JSON de capítulos y flashcards de datos compilados; las imágenes
  //  de assets siguen en cache-first para no recargarlas cada vez)
  const ruta = url.pathname;
  const esDato =
    (ruta.includes('/data/') && (ruta.endsWith('.json') || ruta.endsWith('.js'))) ||
    (ruta.startsWith('/playstudy/') && ruta.endsWith('.json'));
  const nav = event.request.mode === 'navigate';

  if (esDato && !nav && navigator.onLine !== false) {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Red OK: devolver y refrescar la copia en caché
          if (response.ok && response.type === 'basic') {
            const cloned = response.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
          }
          return response;
        })
        .catch(() =>
          // Sin conexión: servir la copia cacheada si existe
          caches.match(event.request, { ignoreSearch: true }).then(cached => {
            if (cached) return cached;
            // Primer arranque sin conexión: reintentar ignorando la red
            return fetch(event.request).catch(err => { throw err; });
          })
        )
    );
    return;
  }

  // ── Resto (shell de la app): cache-first, fallback a red ──
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
