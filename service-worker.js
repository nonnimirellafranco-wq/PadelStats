const CACHE_NAME = "padelstats-v2.4.4";

const ASSETS = [
    "./",
    "./index.html",
    "./style.css",
    "./themes.css",
    "./script.js",
    "./manifest.json",

    "./icon-192.png",
    "./icon-512.png",

    "./Immagini/logoHeader.png",
    "./Immagini/logoHeader2.png",
    "./Immagini/logoapp.png"
];

// Installazione
self.addEventListener("install", event => {
    self.skipWaiting();

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

// Attivazione
self.addEventListener("activate", event => {

    event.waitUntil(

        caches.keys().then(keys => {

            return Promise.all(

                keys.map(key => {

                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }

                })

            );

        }).then(() => self.clients.claim())

    );

});

// Fetch
self.addEventListener("fetch", event => {

    if (event.request.method !== "GET") return;

    event.respondWith(

        fetch(event.request)
            .then(response => {

                const copia = response.clone();

                caches.open(CACHE_NAME).then(cache => {
                    cache.put(event.request, copia);
                });

                return response;

            })
            .catch(() => caches.match(event.request))

    );

});