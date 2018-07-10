/**
 * There are a couple of steps to setup a Service Worker,
 *   - determine if the Service Worker API is available
 *   - register the service worker at the root of the domain
 */

function onLoad() {
    navigator.serviceWorker.register('/service-worker.js')
        .then(function (registration) {
            console.log('SW registered with scope: ', registration.scope);
        }, function (error) {
            console.log('SW registration failed: ', error);
        });
}

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', onLoad);
// }
