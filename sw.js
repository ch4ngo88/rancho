const CACHE_NAME = 'tradicoes-cache-v1' // Bei Änderungen an Assets hochzählen
const OFFLINE_URL = '/offline.html'

const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/images/favicon-32x32.png',
  '/images/android-chrome-192x192.png',
  '/images/android-chrome-512x512.png',
  OFFLINE_URL,
]

// Installationsphase: Cache befüllen
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.error('SW cache error', err)
      }),
    ),
  )
  self.skipWaiting()
})

// Aktivierungsphase: Alte Caches löschen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.map((key) => key !== CACHE_NAME && caches.delete(key)))),
  )
  self.clients.claim()
})

// Fetch-Handler: Netzwerk bevorzugen, bei Fehler auf Cache zurückfallen
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  event.respondWith(
    fetch(event.request).catch(() =>
      caches.match(event.request).then((res) => res || caches.match(OFFLINE_URL)),
    ),
  )
})
