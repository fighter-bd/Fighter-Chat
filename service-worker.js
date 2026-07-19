const CACHE_NAME = "fighter-whatsapp-v1";

const FILES_TO_CACHE = [
  "/Fighter-Whatsapp/",
  "/Fighter-Whatsapp/index.html",
  "/Fighter-Whatsapp/manifest.json",
  "/Fighter-Whatsapp/icon-192.png",
  "/Fighter-Whatsapp/icon-512.png"
];


// Install
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(FILES_TO_CACHE);
      })
  );
});


// Activate
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});


// Fetch
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});