// Lagrer appen på enheten slik at den virker uten nett. Ny versjon = ny hurtigbuffer.
const BUFFER = 'verdensutforskeren-540f1d1993';
const FILER = ['./', 'manifest.webmanifest', 'ikon.svg', 'ikon-180.png', 'ikon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(BUFFER).then(c => c.addAll(FILER)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(k => Promise.all(k.filter(n => n !== BUFFER).map(n => caches.delete(n)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET' || new URL(e.request.url).origin !== location.origin) return;
  const nokkel = e.request.mode === 'navigate' ? './' : e.request;
  e.respondWith(caches.match(nokkel, { ignoreSearch: true }).then(r => r || fetch(e.request)));
});
