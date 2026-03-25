const CACHE_NAME = 'squad-pwa-cache-v2';
const OFFLINE_URL = '/offline';

const ASSETS_TO_CACHE = [
  '/',
  '/offline',
  '/manifest.json',
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      // Use Promise.allSettled so if one fails, it doesn't break the whole install
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) =>
          fetch(url).then((response) => {
            if (response.ok) {
              return cache.put(url, response);
            }
          }).catch((err) => {
            console.error('Failed to cache during install:', url, err);
          })
        )
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle GET requests
  if (request.method !== 'GET') return;

  // Ignore API calls, or chrome-extension requests
  if (url.protocol !== 'http:' && url.protocol !== 'https:') return;
  if (url.pathname.startsWith('/api/')) return;

  // 1. Navigation requests - Network First, fallback to Offline Cache
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((networkResponse) => {
          // Clone and cache the successful navigation response
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
             cache.put(request, responseClone);
          });
          return networkResponse;
        })
        .catch(async () => {
          const cache = await caches.open(CACHE_NAME);
          
          // Try to return the cached response for this specific page
          const cachedResponse = await cache.match(request);
          if (cachedResponse) return cachedResponse;
          
          // Return the offline fallback
          const offlineResponse = await cache.match(OFFLINE_URL);
          if (offlineResponse) return offlineResponse;

          // If all else fails
          return new Response('Network error and offline fallback not available.', {
            status: 503,
            headers: { 'Content-Type': 'text/plain' },
          });
        })
    );
    return;
  }

  // 2. Next.js Static Assets (JS, CSS, Images, Fonts) - Stale-While-Revalidate
  const isStaticAsset = url.pathname.startsWith('/_next/') || 
                        ASSETS_TO_CACHE.includes(url.pathname) || 
                        request.destination === 'image' || 
                        request.destination === 'script' || 
                        request.destination === 'style' ||
                        request.destination === 'font';

  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        const fetchPromise = fetch(request).then((networkResponse) => {
          // Only cache valid responses (200 OK or opaque responses from CDNs/cross-origin)
          if (networkResponse && (networkResponse.ok || networkResponse.type === 'opaque')) {
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return networkResponse;
        }).catch((err) => {
           // Ignore network errors, Stale-While-Revalidate pattern
           console.log('Network fetch failed for asset, using cache if available:', request.url, err);
        });

        // Return the cached response immediately if we have it,
        // while fetching newer version in the background
        return cachedResponse || fetchPromise;
      })
    );
    return;
  }

  // 3. For everything else, Network First cache fallback
  event.respondWith(
    fetch(request)
      .catch(async () => {
        return caches.match(request);
      })
  );
});
