/* 올웨이즈 전시 영상 — 오프라인용
   페이지는 인터넷부터(3초 안에 안 오면 저장본), 영상은 페이지가 직접 저장·재생하므로 여기서는 페이지만 저장한다. */
const STORE = 'olw-play-page';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()));
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url);
  if (u.origin !== location.origin || e.request.method !== 'GET' || e.request.mode !== 'navigate') return;
  const key = u.origin + u.pathname + (u.pathname.endsWith('/') ? 'index.html' : '');
  e.respondWith((async () => {
    const c = await caches.open(STORE);
    try {
      const ctl = new AbortController(), tm = setTimeout(() => ctl.abort(), 3000);
      const r = await fetch(u.origin + u.pathname + '?h=' + Date.now(), { cache: 'no-store', signal: ctl.signal });
      clearTimeout(tm);
      if (r.ok && !r.redirected) { c.put(key, r.clone()); return r; }
    } catch (_) {}
    return (await c.match(key)) || fetch(e.request);
  })());
});
