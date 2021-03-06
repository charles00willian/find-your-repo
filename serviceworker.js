var cacheName = 'findyourrepo';

self.addEventListener('install', function (event) {
  caches.open(cacheName).then((cache) => {
    cache.addAll([
      '/',
      '/index.html',
      '/manifest.webmanifest',
      '/main.css',
      '/nomalize.css',
      '/tesi.js',
      '/toferrado.css',
      '/toferrado.js',
      '/assets/adicionar.png',
      '/assets/background.png',
      '/assets/remover.png',
      '/assets/appicons/favicon.ico',
      '/assets/appicons/android-icon-48x48.png',
      '/assets/appicons/android-icon-72x72.png',
      '/assets/appicons/android-icon-96x96.png',
      '/assets/appicons/android-icon-144x144.png',
      '/assets/appicons/android-icon-192x192.png',
      '/assets/appicons/apple-icon-72x72.png',
      '/assets/appicons/apple-icon-120x120.png',
      '/assets/appicons/apple-icon-144x144.png',
      '/assets/appicons/apple-icon-152x152.png',
      '/assets/appicons/apple-icon-180x180.png',
    ]);
  });
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== cacheName) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', function (event) { 
  let resposta = caches.open(cacheName).then((cache) => { 
    return cache.match(event.request).then((recurso) => { 
      if (recurso) return recurso; 
      return fetch(event.request).then((recurso) => { 
        cache.put(event.request, recurso.clone()); 
        return recurso; 
      }); 
    }); 
  }); 
  event.respondWith(resposta); 
});