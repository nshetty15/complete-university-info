// use a CACHE_NAME for cache versioning
var CACHE_NAME = '0.0.2';

// during the install phase you usually want to cache static assets
self.addEventListener('install', function (e) {
    // once the SW is installed, go ahead and fetch the resources to make this work offline
    e.waitUntil(
        caches.open(CACHE_NAME).then(function (cache) {
            return cache.addAll([
                '/',
                '/dist/common.bundle.js',
                '/offline.html',
                '/images/completeuniversityinfo.png',
                '/images/banner.jpg',
                '/images/tests/ielts_logo.jpg',
                '/images/tests/toefl_logo.jpg',
                '/images/tests/pte_logo.jpg',
                '/images/tests/gmat_logo.jpg',
                '/images/tests/gre_logo.jpg',
            ]).then(function () {
                self.skipWaiting();
            });
        })
    );
});

// to delete outdated caches
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return true;
                }).map(function (cacheName) {
                    return caches.delete(cacheName);
                })
            );
        })
    );
});

// when the browser fetches a url
self.addEventListener('fetch', function (event) {
    // either respond with the cached object or go ahead and fetch the actual url
    event.respondWith(
        caches.match(event.request).then(function (response) {
            if (response) {
                // retrieve from cache
                return response;
            }
            // fetch as normal
            return fetch(event.request);
        })
    );
});