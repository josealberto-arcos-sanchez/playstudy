/* ============================================================
   sw.js — Service Worker para "PlayStudy" (PWA)
   Estrategia:
   - Shell de la app (HTML/CSS/JS del juego): cache-first con red
     como fallback. → La versión de la caché (playstudy-<hash>) y
     la lista de precache se generan con scripts/versionar.ps1 a
     partir del contenido del shell: cualquier cambio de código o
     CSS mueve la versión solo, nadie la sube a mano.
   - Datos (data/*.json y data/catalogo_data.js): primero red,
     con la caché como respaldo sin conexión. → Los capítulos,
     quizzes y fichas nuevos aparecen solos al abrir la app con
     internet, sin tocar ninguna versión de caché.
   ============================================================ */

// Versión de caché y lista de precache generadas (ver banner del archivo).
importScripts('sw_version.js');

// Ruta base derivada del scope real con el que se registró este SW:
// no hay '/playstudy/' escrito a mano, así que sobrevive a un cambio
// de ruta de despliegue.
const BASE = new URL(self.registration.scope).pathname;

const CACHE_NAME = self.PLAYSTUDY_SW.cacheName;
// Prefijo propio de la app: en un origen compartido (por ejemplo, una página
// de usuario de GitHub Pages) no debemos borrar las cachés de otras PWAs.
const CACHE_PREFIX = 'playstudy-';
const PRECACHE_URLS = [BASE].concat(
  self.PLAYSTUDY_SW.precacheUrls.map(ruta => BASE + ruta)
);

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
          .filter(key => key.startsWith(CACHE_PREFIX) && key !== CACHE_NAME)
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

  // La Cache Storage API es por origen: no interceptamos ni cacheamos
  // peticiones a terceros (por ejemplo, las del tutor con IA).
  if (url.origin !== self.location.origin) return;

  // ── Datos del juego: primero red, caché como respaldo offline ──
  // (JSON de capítulos y flashcards de datos compilados; las imágenes
  //  de assets siguen en cache-first para no recargarlas cada vez)
  const ruta = url.pathname;
  const esDato =
    (ruta.includes('/data/') && (ruta.endsWith('.json') || ruta.endsWith('.js'))) ||
    (ruta.startsWith(BASE) && ruta.endsWith('.json'));
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
            // Sin red y sin copia: no reintentamos una petición que ya falló.
            // El juego usará sus datos incrustados (catalogo_data.js) si los hay.
            return new Response('Sin conexión y sin copia en caché.', {
              status: 503,
              statusText: 'Offline',
              headers: { 'Content-Type': 'text/plain; charset=utf-8' }
            });
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
