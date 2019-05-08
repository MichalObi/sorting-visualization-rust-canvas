const CACHE_NAME = 'sorting-rust-canvas';

let filesToCache = [
  '/',
  '/index.html',
  '/script.js',
  '/utils.js',
  '/rust-sorting/pkg/rust_sorting.js',
  '/rust-sorting/pkg/rust_sorting_bg.wasm',
  // tmp tests
  '/1.script.js',
  '/0.script.js',
  '/d31927af4ebb7d9fc1cd.module.wasm',
  '/manifest.json',
  '/images/icons/icon-72x72.png',
  '/images/icons/icon-96x96.png',
  '/images/icons/icon-128x128.png',
  '/images/icons/icon-144x144.png',
  '/images/icons/icon-152x152.png',
  '/images/icons/icon-192x192.png'
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
