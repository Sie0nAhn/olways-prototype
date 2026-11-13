/* 올웨이즈 offline cache
   - 앱·이미지·음성: 저장본을 바로 사용
   - 영상: 인터넷이 되면 원래 서버에서 바로 스트리밍(Claude 앱과 같은 방식), 안 되면 저장본을 조각(range)으로 제공 */
const V='olw-bf546ef8f4';
const STORE='olw-store';
const BLOB=new Map();
self.addEventListener('install',e=>{self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil((async()=>{for(const k of await caches.keys())if(k!==STORE)await caches.delete(k);await self.clients.claim()})())});
function slice(blob,range,type){
  const m=/bytes=(\d*)-(\d*)/.exec(range)||[];const L=blob.size;
  let s=m[1]?+m[1]:0,en=m[2]?+m[2]:L-1;
  if(!m[1]&&m[2]){s=L-(+m[2]);en=L-1}
  en=Math.min(en,L-1);
  return new Response(blob.slice(s,en+1),{status:206,headers:{'Content-Type':type||'video/mp4','Content-Range':`bytes ${s}-${en}/${L}`,'Content-Length':String(en-s+1),'Accept-Ranges':'bytes'}});
}
async function fromCache(req,key){
  const c=await caches.open(STORE);const r=await c.match(key);
  if(!r)return null;
  const range=req.headers.get('range');
  if(!range)return r;
  let b=BLOB.get(key);
  if(!b){b=await r.blob();if(BLOB.size>3)BLOB.delete(BLOB.keys().next().value);BLOB.set(key,b)}
  return slice(b,range,r.headers.get('Content-Type'));
}
self.addEventListener('fetch',e=>{
  const u=new URL(e.request.url);
  if(u.origin!==location.origin||e.request.method!=='GET'||u.searchParams.has('h'))return;
  const key=u.origin+u.pathname;
  if(/\.mp4$/i.test(u.pathname)){
    if(self.navigator.onLine!==false)return; /* 온라인: 브라우저가 서버에서 직접 스트리밍 (서비스워커 거치지 않음) */
    e.respondWith((async()=>(await fromCache(e.request,key))||fetch(e.request))());
    return;
  }
  e.respondWith((async()=>{
    const r=await fromCache(e.request,key);
    if(r)return r;
    try{return await fetch(e.request)}catch(_){return Response.error()}
  })());
});
