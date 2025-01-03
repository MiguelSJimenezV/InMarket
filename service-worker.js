const cacheName = "in-market-app-v1";
const assets = [
    "index.html",
    "criptomonedas.html",
    "assets/css/crypto.css",
    "assets/css/style.css",
    "assets/js/index.js",
    "assets/js/formValid.js",
    "assets/img/btc-1.jpg",
    "assets/img/c-1.png",
    "assets/img/c-2.png",
    "assets/img/c-3.png",
    "assets/img/c-4.png",
];

// Evento de instalación
self.addEventListener('install', (event) => {
    console.log('Service Worker instalado');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('Archivos cacheados');
                return cache.addAll(assets);
            })
    );
    self.skipWaiting();
});

// Evento de activación
self.addEventListener('activate', (event) => {
    console.log('Service Worker activado');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== cacheName) {
                        console.log('Service Worker limpiando caché antigua');
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Evento de fetch
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request).then(networkResponse => {
                    if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
                        return networkResponse;
                    }
                    let responseToCache = networkResponse.clone();
                    caches.open(cacheName).then(cache => {
                        cache.put(event.request, responseToCache);
                    });
                    return networkResponse;
                });
            })
    );
});
