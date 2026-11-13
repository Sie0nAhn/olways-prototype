/* 올웨이즈 offline cache
   - 앱·이미지·음성: 저장본을 바로 사용
   - 영상: 앱이 저장본을 메모리(blob)로 꺼내 재생. 저장 전이면 온라인은 서버 직접, 오프라인은 저장본 조각 */
const V='olw-ad72b8e257';
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
  const key=u.origin+u.pathname+(u.pathname.endsWith('/')?'index.html':''); /* 주소가 /로 끝나도 저장된 index.html 로 */
  if(/\.mp4$/i.test(u.pathname)){
    /* 영상은 앱이 저장본을 직접 꺼내 기기 메모리에서 재생한다(서비스워커를 거치지 않음 — 아이패드 사파리에서 끊김 방지).
       여기 오는 건 아직 저장 전인 영상뿐: 인터넷이 되면 서버에서 바로, 안 되면 저장본 조각으로 */
    if(self.navigator.onLine!==false)return;
    e.respondWith((async()=>(await fromCache(e.request,key))||fetch(e.request))());
    return;
  }
  /* 페이지와 시작 스크립트는 인터넷부터(3초) — 새 버전을 알아채야 업데이트가 된다. 안 되면 저장본 */
  if(e.request.mode==='navigate'||/\/boot\.js$/.test(u.pathname)){
    e.respondWith((async()=>{
      try{
        const ctl=new AbortController(),tm=setTimeout(()=>ctl.abort(),3000);
        const r=await fetch(u.origin+u.pathname+'?h='+Date.now(),{cache:'no-store',signal:ctl.signal});
        clearTimeout(tm);
        if(r.ok&&!r.redirected){try{(await caches.open(STORE)).put(key,r.clone())}catch(_){}return r}
      }catch(_){}
      const c=await fromCache(e.request,key);
      return c||fetch(e.request);
    })());
    return;
  }
  e.respondWith((async()=>{
    const r=await fromCache(e.request,key);
    if(r)return r;
    try{return await fetch(e.request)}catch(_){return Response.error()}
  })());
});
