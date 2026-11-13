// Worship Pad Studio – cache offline. Naikkan VERSI setiap kali index.html diperbarui.
const VERSI = 'wps-v14';
const FILES = ['./', './index.html', './manifest.webmanifest', './icon-192.png', './icon-512.png', './apple-touch-icon.png', './bells.js', './cues.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSI).then(c => c.addAll(FILES)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  // coba ambil versi terbaru dari internet; kalau offline, pakai yang tersimpan
  e.respondWith(fetch(e.request).then(r => { const copy = r.clone(); caches.open(VERSI).then(c => c.put(e.request, copy)); return r; })
    .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
});
