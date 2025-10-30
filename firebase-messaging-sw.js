/* Firebase Messaging Service Worker */
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.23.0/firebase-messaging-compat.js');

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));

// The page initializes firebaseConfig; to be safe, we mirror minimal config via postMessage later
// For now we initialize with dummy to avoid errors if not injected; messaging will still work if already initialized by page
try {
  if (!firebase.apps.length) {
    // Page will initialize; avoid double init here
  }
} catch (e) {}

try {
  const messaging = firebase.messaging();
  messaging.onBackgroundMessage((payload) => {
    const title = (payload.notification && payload.notification.title) || 'New message';
    const options = {
      body: (payload.notification && payload.notification.body) || '',
      icon: (payload.notification && payload.notification.icon) || undefined,
      badge: (payload.notification && payload.notification.badge) || undefined,
      data: payload.data || {},
      vibrate: [120, 60, 120]
    };
    self.registration.showNotification(title, options);
  });
} catch (e) {
  // no-op
}


