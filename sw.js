/* 올웨이즈 offline cache: everything is stored once, then served from the iPad itself (with byte-range support for video) */
const V='olw-f64993ce10';
const MEM=new Map();
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==V)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin||e.request.method!=='GET')return;
  e.respondWith((async()=>{
    const c=await caches.open(V);
    const key=u.origin+u.pathname;
    let r=await c.match(key);
    if(!r){
      try{r=await fetch(e.request)}catch(_){return Response.error()}
      return r;
    }
    const range=e.request.headers.get('range');
    if(!range)return r;
    let buf=MEM.get(key);
    if(!buf){buf=await r.arrayBuffer();if(MEM.size>3)MEM.delete(MEM.keys().next().value);MEM.set(key,buf)}
    const m=/bytes=(\d*)-(\d*)/.exec(range)||[];
    let s=m[1]?+m[1]:0,en=m[2]?+m[2]:buf.byteLength-1;
    if(!m[1]&&m[2]){s=buf.byteLength-(+m[2]);en=buf.byteLength-1}
    en=Math.min(en,buf.byteLength-1);
    return new Response(buf.slice(s,en+1),{status:206,headers:{'Content-Type':r.headers.get('Content-Type')||'video/mp4','Content-Range':`bytes ${s}-${en}/${buf.byteLength}`,'Content-Length':String(en-s+1),'Accept-Ranges':'bytes'}});
  })());
});
