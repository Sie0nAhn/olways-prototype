/* 올웨이즈 offline cache: 저장된 파일은 iPad 안에서 바로 제공 (영상은 byte-range 지원), 아직 안 받은 파일은 네트워크로 */
const V='olw-6aa33c8ae7';
const STORE='olw-store';
const MEM=new Map();
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==STORE)await caches.delete(k);await self.clients.claim()})())});
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin||e.request.method!=='GET'||u.searchParams.has('h'))return;
  e.respondWith((async()=>{
    const c=await caches.open(STORE);
    const key=u.origin+u.pathname;
    let r=await c.match(key);
    if(!r){try{return await fetch(e.request)}catch(_){return Response.error()}}
    const range=e.request.headers.get('range');
    if(!range)return r;
    let buf=MEM.get(key);
    if(!buf){buf=await r.arrayBuffer();if(MEM.size>2)MEM.delete(MEM.keys().next().value);MEM.set(key,buf)}
    const m=/bytes=(\d*)-(\d*)/.exec(range)||[];
    let s=m[1]?+m[1]:0,en=m[2]?+m[2]:buf.byteLength-1;
    if(!m[1]&&m[2]){s=buf.byteLength-(+m[2]);en=buf.byteLength-1}
    en=Math.min(en,buf.byteLength-1);
    return new Response(buf.slice(s,en+1),{status:206,headers:{'Content-Type':r.headers.get('Content-Type')||'video/mp4','Content-Range':`bytes ${s}-${en}/${buf.byteLength}`,'Content-Length':String(en-s+1),'Accept-Ranges':'bytes'}});
  })());
});
