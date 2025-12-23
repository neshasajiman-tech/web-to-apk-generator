const CACHE_NAME = 'admin-app-v1';
const ASSETS = [
  'index.html',
  'manifest.json'
];

// সার্ভিস ওয়ার্কার ইন্সটল করা
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS);
      })
  );
});

// অফলাইনে থাকলেও ফাইলগুলো লোড করা
self.addEventListener('fetch', (event) => {
  event.sendResponse = event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
