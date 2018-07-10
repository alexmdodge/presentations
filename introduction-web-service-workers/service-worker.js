/**
 * Global state which handles cache names and
 * which asset paths to cache
 */
var CACHE_NAME = 'demo-site-cache';

var _urlsToCache = [
    '/',
    '/styles/styles.css',
    '/dist/main.js',
];

var _fetchEvent = null;

/**     
 * Installation
 * 
 * This step will fail if any of the urls to cache from above fail to respond
 * when requested. This guarantees the defined assets are cached but means you
 * should be careful what you add to the list.
 */
function onInstall(event) {
    console.log('Installing service worker');

    var cachesOpen = caches.open(CACHE_NAME)
        .then(function (cache) {
            console.log('Opened cache');
            return cache.addAll(_urlsToCache);
        })
        .catch(function (error) {
            console.log('Registration error: ', error);
        })

    event.waitUntil(cachesOpen);
}

self.addEventListener('install', onInstall);

/**
 * Caching and Manipulating Requests
 * 
 * In this step we can intercept network requests for assets and data and
 * can cache them as we see fit.
 */
function onFetch(event) {
    _fetchEvent = event;

    var cachedResponse = caches.match(_fetchEvent.request)
        .then(onCacheMatchedSuccess)
        .catch(onCacheMatchedError)

    _fetchEvent.respondWith(cachedResponse);
}

function onCacheMatchedSuccess(response) {
    // Asset is already cached
    if (response) {
        console.log('Response is already cached: ', response);
        return response;
    }

    // Clone the request as it can only be processed
    // once and is used in multiple places
    var fetchRequest = _fetchEvent.request.clone();

    return cachedAsset(fetchRequest);
}

function onCacheMatchedError(error) {
    console.log('Error transforming fetch request: ', error);
}

function cachedAsset(request) {
    return fetch(request)
        .then(onFetchSuccess)
        .catch(onFetchError);
}

function onFetchSuccess(response) {
    // Check if we received a valid response
    if (!response ||
        response.status !== 200 ||
        response.type !== 'basic') {
        return response;
    }

    var responseToCache = response.clone();

    caches.open(CACHE_NAME)
        .then(function (cache) {
            cache.put(_fetchEvent.request, responseToCache);
        });

    console.log('Caching response: ', responseToCache);

    return response;
}

function onFetchError(error) {
    console.log('Error fetching new asset: ', error);
}

// Attach callback to fetch event
self.addEventListener('fetch', onFetch);

/**
 * Activation
 * 
 * A service worker is updated when the page is no longer active which used
 * the old service worker. Upon reload we can perform operations to prepare
 * for the new worker.
 */
function onActivate(event) {
    console.log('Activating new Service Worker.');

    var cachesCleared = caches.keys().then(function (cacheNames) {
        return Promise.all(deleteCaches(cacheNames));
    });

    event.waitUntil(cachesCleared);
}

function deleteCaches(cacheNames) {

    var cacheWhitelist = [CACHE_NAME];

    return cacheNames.map(function (cacheName) {
        if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
        }
    });
}

// Attach callback to activate event
self.addEventListener('activate', onActivate);