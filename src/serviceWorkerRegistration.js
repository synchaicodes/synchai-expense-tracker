// This optional code is used to register a service worker.
// register() is not called by default.

export function register() {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      const swUrl = `${process.env.PUBLIC_URL}/service-worker.js`;

      navigator.serviceWorker
        .register(swUrl)
        .then(() => {
          console.log('✅ PWA Service Worker Registered');
        })
        .catch((error) => {
          console.error('❌ Service Worker Error:', error);
        });
    });
  }
}
