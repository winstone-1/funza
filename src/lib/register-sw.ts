/**
 * The app is offline-first, so the service worker in public/sw.js has to be registered.
 * Dev is excluded: caching Vite's module graph makes hot reload serve stale files.
 */
export function registerServiceWorker() {
  if (!import.meta.env.PROD || !('serviceWorker' in navigator)) {
    return
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((error: unknown) => {
      console.error('Service worker registration failed', error)
    })
  })
}
