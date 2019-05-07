const CACHE_NAME = 'sorting-rust-canvas';

let filesToCache = [
  '/index.html',
  '/script.js',
  '/utils.js',
  '/rust-sorting/pkg/rust_sorting.js',
  '/rust-sorting/pkg/rust_sorting_bg.wasm'
];

self.addEventListener('install', evt => {
  evt.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache => cache.addAll(filesToCache))
    .catch(err => console.error(err))
  );
});

self.addEventListener('fetch', evt => {
  evt.respondWith(
    fetch(evt.request)
    .catch(() => caches.match(evt.request))
  );
});
