const CACHE_NAME = 'sheddys-radio-v1';
const STATIC_ASSETS = [
  '/',
  '/logo1.jpeg',
  '/manifest.json',
  '/favicon.ico'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Fetch event - serve from cache or network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached version or fetch from network
      return response || fetch(event.request);
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  const options = {
    body: event.data?.text() || 'Sheddy\'s Radio - New Update!',
    icon: '/logo1.jpeg',
    badge: '/logo1.jpeg',
    tag: 'sheddys-radio',
    requireInteraction: true,
    actions: [
      {
        action: 'listen',
        title: 'Sikiliza Live',
        icon: '/logo1.jpeg'
      },
      {
        action: 'dismiss',
        title: 'Funga',
        icon: '/logo1.jpeg'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification("Sheddy's Radio", options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'listen') {
    event.waitUntil(
      clients.openWindow('/?action=play')
    );
  } else if (event.action === 'dismiss') {
    // Just close the notification
    return;
  } else {
    // Default click - open the app
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});
