(()=>{
const $=s=>document.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const secs=$$('#main > section');
const topOf=el=>el.getBoundingClientRect().top+scrollY;
const to=el=>{window.__jump&&window.__jump();window.scrollTo({top:topOf(el),behavior:'smooth'})};

/* ---------- nav (soap-bubble component) ---------- */
const groups=[];secs.forEach(s=>{if(!groups.find(g=>g.name===s.dataset.g))groups.push({name:s.dataset.g,el:s})});
let cur=-1,lastY=0,navLock=false,navSet=null,pend={};
const navUpd=p=>{Object.assign(pend,p);if(navSet)navSet(pend)};
window.__olwaysNavReady=()=>{navSet=window.__olwaysNav;navSet(pend)};
if(window.mountOlwaysNav)window.mountOlwaysNav($('#navroot'),{
  onGroup:i=>to(groups[i].el),onLogo:()=>to(secs[0]),
  onNext:()=>{navLock=true;setTimeout(()=>navLock=false,1200);to(secs[cur>=secs.length-1?0:cur+1])}},LOGO);
navUpd({groups:groups.map(g=>g.name)});
function upd(){const y=scrollY,probe=y+innerHeight*.35;let i=0;secs.forEach((s,j)=>{if(topOf(s)<=probe)i=j});
  const np=y+36;let dk=false;secs.forEach(s=>{const t=topOf(s);if(t<=np&&t+s.offsetHeight>np&&s.classList.contains('dk'))dk=true});
  const p={dark:dk,prog:+(y/(document.documentElement.scrollHeight-innerHeight)).toFixed(3)};
  if(i!==cur){cur=i;p.now=secs[i].dataset.l;p.idx=String(i+1).padStart(2,'0');p.active=groups.findIndex(g=>g.name===secs[i].dataset.g)}
  if(y>lastY+4&&y>200&&!navLock)p.hidden=true;else if(y<lastY-4)p.hidden=false;lastY=y;navUpd(p)}
addEventListener('scroll',()=>requestAnimationFrame(upd),{passive:true});upd();

/* ---------- videos play only when visible ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{const v=e.target;if(e.isIntersecting)v.play().catch(()=>{});else v.pause()}),{threshold:.2});
$$('video').forEach(v=>io.observe(v));

/* ---------- idle → back to top ---------- */
let idle;const bump=()=>{clearTimeout(idle);idle=setTimeout(()=>{window.__jump&&window.__jump();window.scrollTo({top:0,behavior:'smooth'})},180000)};['pointerdown','wheel','touchstart','keydown'].forEach(e=>addEventListener(e,bump,{passive:true}));bump();

if(!window.gsap||location.search.includes('static')||matchMedia('(prefers-reduced-motion: reduce)').matches)return;
gsap.registerPlugin(ScrollTrigger);ScrollTrigger.config({ignoreMobileResize:true});
const ST=(el,start)=>({trigger:el,start:start||'top 88%',toggleActions:'play none none reverse'});

/* cover */
gsap.from('#s01cover .cv',{scale:1.18,duration:2.2,ease:'power2.out'});
gsap.from('#s01cover .b',{y:60,opacity:0,duration:1.3,ease:'power3.out',stagger:.18,delay:.3});
gsap.to('#s01cover .cv',{yPercent:12,scale:1.06,ease:'none',scrollTrigger:{trigger:'#s01cover',start:'top top',end:'bottom top',scrub:true}});
/* remaining raster sections */
$$('.rs:not(#s01cover)').forEach(sec=>{const m=sec.dataset.anim;$$('.b',sec).forEach((el,i)=>{
  const fr=el.classList.contains('title')?{clipPath:'inset(0 50% 0 50%)',opacity:0}:el.classList.contains('dissolve')||m==='dissolve'?{opacity:0,scale:.85,filter:'blur(10px)'}:
    m==='flip'?{rotateY:-60,opacity:0,transformPerspective:1000,transformOrigin:'0% 50%'}:{y:60,opacity:0};
  gsap.fromTo(el,fr,{clipPath:'inset(0 0% 0 0%)',opacity:1,y:0,rotateY:0,scale:1,filter:'blur(0px)',duration:1.1,ease:'power3.out',delay:(i%3)*.08,scrollTrigger:ST(el,'top 92%')})})});

/* ---------- Figma-rendered sections: one timeline per group, each mark at its time ---------- */
const FROM={rise:{opacity:0,y:30},fade:{opacity:0},left:{opacity:0,x:-30},drop:{opacity:0,y:-26},pop:{opacity:0,scale:.3},bubble:{opacity:0,scale:.04},tail:{opacity:0,scale:.04},
  dissolve:{opacity:0,scale:.86,filter:'blur(10px)'},herop:{opacity:0,scale:.2},
  barh:{clipPath:'inset(-60px calc(100% + 60px) -60px -60px)'},barv:{clipPath:'inset(calc(100% + 60px) -60px -60px -60px)'},draw:{clipPath:'inset(-20px 100% -20px -20px)'},
  drawdown:{clipPath:'inset(-20px -20px 100% -20px)'},drawrev:{clipPath:'inset(-20px -20px -20px 100%)'},ring:{opacity:0,rotate:-140,scale:.6}};
const EASE={pop:'back.out(2)',bubble:'back.out(1.4)',tail:'back.out(1.4)',herop:'elastic.out(1,.55)',barh:'power2.inOut',barv:'power2.inOut',draw:'power1.inOut',drawdown:'power1.inOut',drawrev:'power1.inOut',ring:'power3.out',dissolve:'expo.out'};
/* timelines that must wait for another to finish (e.g. Problem row 2 waits for Insight 01) */
const TL={},AFTER={'2616:37311':'2616:37248','2616:37370':'2616:37311'};
const run=g=>{const tl=TL[g],p=AFTER[g],pt=p&&TL[p];
  if(pt&&pt.progress()<1){if(!pt.isActive())pt.play();pt.eventCallback('onComplete',()=>tl.play())}else tl.play()};
const BUB={};const G={};$$('[data-a][data-g]').forEach(el=>{(G[el.dataset.g]||(G[el.dataset.g]=[])).push(el)});
Object.entries(G).forEach(([g,els])=>{const sec=els[0].closest('section');
  const trig=g.startsWith('hdr')||g==='ov'?els[0]:(document.getElementById('f'+g.replace(':','-'))||els[0]);
  const tl=gsap.timeline({paused:true});TL[g]=tl;
  if(g.startsWith('hdr')||!els[0].closest('.story,[data-manual]'))ScrollTrigger.create({trigger:trig,start:g==='ov'?'top 70%':'top 76%',onEnter:()=>run(g),onLeaveBack:()=>tl.reverse()});
  els.forEach(el=>{const a=el.dataset.a,t=+el.dataset.t,d=+(el.dataset.dur||0)||(a==='draw'?1:a.startsWith('bar')?.7:.6);
    const fr={...(FROM[a]||FROM.rise)};
    if(el.dataset.o){const k=innerWidth/1400,[ox,oy]=el.dataset.o.split(',').map(Number);fr.transformOrigin=`${ox*k}px ${oy*k}px`}const tt={opacity:1,x:0,y:0,scale:1,rotate:0,filter:'blur(0px)',duration:d,ease:EASE[a]||'power3.out'};
    if('clipPath' in fr){tt.clipPath='inset(-60px -60px -60px -60px)';fr.opacity=1}
    if(['bubble','tail','btxt'].includes(a)&&el.closest('[data-manual]')){(BUB[t]||(BUB[t]=[])).push(el);return}
    tl.fromTo(el,{...fr},tt,t)});
  if(sec)(sec._tls||(sec._tls=[])).push(tl)});

/* ---------- overview: title rises out of a mask, video eases back as the statement scrolls over ---------- */
$$('#s02overview').forEach(o=>{const t=o.querySelector('.ovtitle'),c=o.querySelector('.ovc'),v=o.querySelector('.ovv');
  gsap.fromTo(t,{clipPath:'inset(0 0 100% 0)',y:60},{clipPath:'inset(0 0 -20% 0)',y:0,duration:1.4,ease:'expo.out',scrollTrigger:ST(o,'top 60%')});
  gsap.fromTo([o.querySelector('.ovk'),o.querySelector('.ovsub')],{opacity:0,y:20},{opacity:1,y:0,duration:.9,stagger:.5,delay:.3,ease:'power3.out',scrollTrigger:ST(o,'top 60%')});
  gsap.fromTo(v,{scale:1.18},{scale:1,ease:'none',scrollTrigger:{trigger:o,start:'top bottom',end:'bottom top',scrub:true}});
  gsap.to(c,{opacity:0,scale:.92,filter:'blur(8px)',ease:'none',scrollTrigger:{trigger:o.querySelector('.ovs'),start:'top 90%',end:'top 30%',scrub:true}})});

const fitCards=()=>$$('.pcw').forEach(c=>{const box=c.closest('.st-items').getBoundingClientRect(),u=innerWidth/1400;
  c.style.setProperty('--s',Math.min(box.width/(+c.style.getPropertyValue('--w')*u),box.height/(+c.style.getPropertyValue('--h')*u)).toFixed(3))});
const fitIv=()=>$$('.iv .st-item').forEach(it=>{it.style.removeProperty('--u');const h=it.scrollHeight,H=it.clientHeight;
  if(h>H)it.style.setProperty('--u',`calc(100vw / 1400 * ${(H/h).toFixed(4)})`)});
fitCards();addEventListener('resize',fitCards);
const IVS=['확신 없으면 출발하지 않아요','방송보다, 다가오는 위험','보기 전에 먼저 짚어줘요','배터리로 어디까지 갈까','쓸 수 있는 화장실은 4곳 중 1곳'];
/* ---------- interview → top-tab story; each finding plays its chart, then its quotes ---------- */
$$('.iv .wrap').forEach(w=>{const igs=$$('.ig',w),ban=w.querySelector('.ban');
  const st=document.createElement('div');st.className='story top';
  st.innerHTML='<div class="st-stage"><ol class="st-nav"></ol><div class="st-items"></div></div>';
  const nav=st.querySelector('.st-nav'),box=st.querySelector('.st-items');
  igs.forEach((g,k)=>{const li=document.createElement('li');const h=g.querySelector('.ih h3');
    li.innerHTML=`<i>${String(k+1).padStart(2,'0')}</i><span></span><b class="sbar"><em></em></b>`;li.querySelector('span').textContent=IVS[k]||(h?h.textContent:'');nav.appendChild(li);
    g.classList.add('st-item');box.appendChild(g);
    const ih=g.querySelector('.ih'),cb=g.querySelector('.cbox'),qc=g.querySelector('.qcard');
    const ps=$$('.pc',cb).sort((a,b)=>a.dataset.o-b.dataset.o);
    const tl=gsap.timeline({paused:true});
    tl.fromTo(ih.children,{opacity:0,y:20},{opacity:1,y:0,duration:.5,stagger:.08,ease:'power3.out'},0);
    tl.fromTo(cb,{opacity:0,y:30},{opacity:1,y:0,duration:.5,ease:'power3.out'},.1);let t=.5;
    ps.forEach((p,i)=>{const last=i===ps.length-1,c=p.classList;
      if(c.contains('barh')){tl.fromTo(p,{opacity:1,clipPath:'inset(-40px calc(100% + 40px) -40px 0)'},{clipPath:'inset(-40px -40px -40px 0)',duration:last?.9:.7,ease:'power2.inOut'},t);t+=last?1:.8}
      else if(c.contains('barv')){tl.fromTo(p,{opacity:1,clipPath:'inset(calc(100% + 40px) -40px 0 -40px)'},{clipPath:'inset(0% -40px 0 -40px)',duration:last?.85:.65,ease:'power2.inOut'},t);t+=last?.95:.75}
      else{tl.fromTo(p,{opacity:0,scale:.2},{opacity:1,scale:1,duration:last?.9:.6,ease:last?'elastic.out(1,.6)':'back.out(2)'},t);t+=last?.9:.5}});
    tl.fromTo(qc,{opacity:0,x:50},{opacity:1,x:0,duration:.7,ease:'power3.out'},t);
    tl.fromTo(qc.querySelectorAll('.qt'),{opacity:0,y:14},{opacity:1,y:0,duration:.45,stagger:.2,ease:'power2.out'},t+.25);
    g._tl=tl});
  $$('.gg',w).forEach(e=>e.remove());w.insertBefore(st,w.firstChild);
  ban&&ban.remove();
  const hh=w.closest('section').querySelector('.hh');if(hh){const top=document.createElement('div');top.className='st-top';top.appendChild(hh);st.querySelector('.st-stage').prepend(top);st.classList.add('hd')}
  st._play=it=>it._tl&&it._tl.restart()});
/* ================= scenes =================
   Every block that animates is a scene. While a scene on screen has not finished, the page will not scroll past it:
   a scroll attempt hurries the animation instead (×3), and momentum that overshoots is pulled back to the scene. */
const SC=[];window.__SC=SC;
const stop=e=>{e.cancelable&&e.preventDefault()};
const done=tl=>!tl||tl.progress()>=1;
const hurry=tl=>{if(!tl||tl.progress()>=1)return;if(!tl.isActive())tl.play();tl.timeScale(3.2)};
const fresh=tl=>{if(tl){tl.timeScale(1);tl.restart()}};
const fitAll=()=>$$('.fit').forEach(f=>{f.style.removeProperty('--u');const u=innerWidth/1400,nav=64;
  const h=f.style.getPropertyValue('--fh')?(+f.style.getPropertyValue('--fh'))*u:f.scrollHeight;
  const s=Math.min(1,(innerHeight-nav-16)/h);f.style.setProperty('--u',`calc(100vw / 1400 * ${s.toFixed(4)})`)});
fitAll();fitIv();addEventListener('resize',()=>{fitAll();fitCards();fitIv()});
/* stepped scene: pinned for one screen, one gesture = one step, each step must finish before the next */
const mkStep=(el,n,show,o={})=>{let cur=-1,live=false,cool=0;const st={dl:[],tl:[]};
  const per=o.per||.55;
  const trg=ScrollTrigger.create({trigger:el,start:'top top',end:()=>'+='+innerHeight*per*n,pin:true,pinSpacing:true,invalidateOnRefresh:true,
    onEnter:()=>{live=true;if(cur<0)set(0,true)},onEnterBack:()=>{live=true},
    onUpdate:s=>{if(live)set(Math.min(n-1,Math.floor(s.progress*n*.999)))}});
  ScrollTrigger.create({trigger:el,start:'top 55%',onEnter:()=>{live=true;if(cur<0)set(0,true)}});
  function set(i,force){if(i===cur&&!force)return;const back=i<cur;cur=i;const r=show(i,back);
    st.tl[i]=r&&r.tl?r.tl:r||null;st.dl[i]=performance.now()+(r&&r.dwell!=null?r.dwell:(o.dwell||0))}
  const fin=k=>st.dl[k]!=null&&performance.now()>=st.dl[k]&&done(st.tl[k]);
  const pos=k=>trg.start+(trg.end-trg.start)*(k+.5)/n;
  const firstOpen=()=>{for(let k=0;k<n;k++)if(!fin(k))return k;return -1};
  const go=k=>{cool=performance.now()+650;scrollTo({top:pos(k),behavior:'instant'});set(k)};
  const hur=()=>{const k=cur<0?0:cur;hurry(st.tl[k]);if(st.dl[k])st.dl[k]=Math.min(st.dl[k],performance.now()+350)};
  SC.push({a:()=>trg.start-innerHeight*.7,b:()=>trg.end,
    hold:()=>{const k=firstOpen();return k<=0?trg.start:pos(k)},busy:()=>firstOpen()>=0,hurry:hur,
    step:(dir,e)=>{const y=scrollY;if(y<trg.start-4||y>trg.end+4)return false;const now=performance.now();
      if(now<cool){stop(e);return true}
      if(dir>0){if(cur<0){set(0);stop(e);return true}
        if(!fin(cur)){stop(e);hur();return true}
        if(cur<n-1){stop(e);go(cur+1);return true}return false}
      if(cur>0&&y<=trg.end){stop(e);go(cur-1);return true}return false}});
  el._go=k=>{if(scrollY<trg.start||scrollY>trg.end)scrollTo({top:pos(k),behavior:'instant'});go(k)};
  return trg};
/* soft scene: an element that animates in place (not pinned); the page stops once it is fully on screen until it is done */
const soft=(el,tl)=>{if(!el||!tl)return;const nav=70;
  const hold=()=>{const r=el.getBoundingClientRect(),t=r.top+scrollY,h=r.height;return h<=innerHeight-nav-20?t+h-innerHeight+20:t-nav};
  SC.push({a:()=>hold()-innerHeight,b:()=>hold()+6,hold,busy:()=>!done(tl),hurry:()=>hurry(tl)})};
let jumpUntil=0;window.__jump=()=>{jumpUntil=performance.now()+1800};
const intent=(dir,e)=>{if(performance.now()<jumpUntil)return;const y=scrollY;
  for(const s of SC){if(s.step&&s.step(dir,e))return}
  if(dir>0)for(const s of SC){const h=s.hold();if(y>=h-4&&y<=h+innerHeight*.5&&s.busy()){stop(e);s.hurry();return}}};
addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>2)intent(Math.sign(e.deltaY),e)},{passive:false});
let gty=0;addEventListener('touchstart',e=>{gty=e.touches[0].clientY},{passive:true});
addEventListener('touchmove',e=>{const dy=gty-e.touches[0].clientY;if(Math.abs(dy)>10){intent(Math.sign(dy),e);gty=e.touches[0].clientY}},{passive:false});
addEventListener('keydown',e=>{if(['ArrowDown','PageDown',' '].includes(e.key))intent(1,e);else if(['ArrowUp','PageUp'].includes(e.key))intent(-1,e)});
/* momentum (iPad fling) cannot be cancelled — pull it back to the scene that is still playing */
let py=scrollY;addEventListener('scroll',()=>{const y=scrollY;
  if(y>py&&performance.now()>jumpUntil){for(const s of SC){const h=s.hold();if(py<=h+3&&y>h+3&&s.busy()){scrollTo({top:h,behavior:'instant'});s.hurry();py=h;return}}}
  py=y},{passive:true});

/* ---- problem / interview stories ---- */
const storyNav=(st,i)=>{$$('.st-item',st).forEach((it,j)=>{it.classList.toggle('on',j===i);it.classList.toggle('past',j<i)});
  $$('.st-nav li',st).forEach((l,j)=>{l.classList.toggle('on',j===i);l.classList.toggle('done',j<i);const e=l.querySelector('em');if(e)e.style.transform=`scaleX(${j<=i?1:0})`})};
const mkStory=st=>{const items=$$('.st-item',st);storyNav(st,0);
  mkStep(st,items.length,i=>{storyNav(st,i);const it=items[i],tl=it._tl||TL[it.dataset.g];fresh(tl);return {tl,dwell:500}},{per:.6});
  $$('.st-nav li',st).forEach((l,k)=>l.onclick=()=>st._go&&st._go(k))};
/* ---- insight statements: card opens to the full screen, then the words light up (scrubbed) ---- */
const mkBig=b=>{const bs=b.querySelector('.bs');
  const walk=n=>{[...n.childNodes].forEach(ch=>{if(ch.nodeType===3){const f=document.createDocumentFragment();
      ch.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))f.appendChild(document.createTextNode(w));else{const s=document.createElement('span');s.className='wr';s.textContent=w;f.appendChild(s)}});
      ch.replaceWith(f)}else if(ch.nodeType===1)walk(ch)})};walk(bs);
  const tl=gsap.timeline({scrollTrigger:{trigger:b,start:'top top',end:()=>'+='+innerHeight*1.2,pin:true,pinSpacing:true,scrub:.6}});
  tl.fromTo(b,{clipPath:'inset(18% 9% 18% 9% round 40px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'power2.inOut',duration:1})
    .fromTo(b.querySelector('.bk'),{opacity:0,y:24},{opacity:1,y:0,duration:.25},.55)
    .to(bs.querySelectorAll('.wr'),{opacity:1,stagger:.05,duration:.2,ease:'none'},.7)
    .fromTo(bs.querySelectorAll('.hl'),{'--hl':0},{'--hl':1,duration:.4,stagger:.1},'>-.1')
    .fromTo(b.querySelector('.be'),{opacity:0,y:20},{opacity:1,y:0,duration:.3},'>-.1')
    .to({},{duration:.4})};
/* ---- one-screen figures (positioning map, hypotheses): play, hold until drawn ---- */
const mkFit=sec=>{const tls=sec._tls||[];const all=gsap.timeline({paused:true});
  mkStep(sec,1,()=>{tls.forEach(t=>{t.timeScale(1);if(t.progress()<1)t.play()});
    const tl={progress:()=>Math.min(...tls.map(t=>t.progress()),1),isActive:()=>tls.some(t=>t.isActive()),play:()=>tls.forEach(t=>t.play()),timeScale:v=>tls.forEach(t=>t.timeScale(v))};
    return {tl,dwell:300}},{per:.35})};
/* ---- journey: the line follows the scroll; each speech bubble rises whole when the line reaches its dot ---- */
const mkJourney=sec=>{const tl=TL['2616:37657'];if(!tl)return;
  const groups=Object.entries(BUB).map(([t,els])=>{const w=document.createElement('div');w.className='bgrp';sec.appendChild(w);els.forEach(e=>{w.appendChild(e);gsap.set(e,{opacity:1,clearProps:'transform,clipPath'})});
    gsap.set(w,{opacity:0,y:26});return {t:+t,w,on:false}});
  ScrollTrigger.create({trigger:sec,start:'top top',end:()=>'+='+innerHeight*1.6,pin:true,pinSpacing:true,scrub:.5,animation:tl,
    onUpdate:s=>{const now=tl.duration()*s.progress;groups.forEach(g=>{const want=now>=g.t;if(want!==g.on){g.on=want;
      gsap.to(g.w,want?{opacity:1,y:0,duration:.6,ease:'power3.out',overwrite:true}:{opacity:0,y:18,duration:.25,ease:'power2.in',overwrite:true})}})}})};

/* headers */
$$('.hh').forEach(h=>!h.closest('.st-top')&&gsap.fromTo(h.children,{opacity:0,y:26},{opacity:1,y:0,duration:.8,stagger:.09,ease:'power3.out',scrollTrigger:ST(h,'top 85%')}));

/* ---------- hypothesis: column by column, left to right ---------- */
$$('.hgrid').forEach(g=>{const tl=gsap.timeline({scrollTrigger:{trigger:g,start:'top 70%',toggleActions:'play none none reverse'}});const sc=g.closest('section');(sc._tls||(sc._tls=[])).push(tl);let t=0;
  for(let c=0;c<5;c++){const els=$$(`[data-c="${c}"]`,g);
    if(c%2){tl.fromTo(els,{opacity:0,x:-14},{opacity:1,x:0,duration:.25,stagger:.05,ease:'power2.out'},t);t+=.2+.05*els.length}
    else{tl.fromTo(els,{opacity:0,scale:.88,x:-24},{opacity:1,scale:1,x:0,duration:.45,stagger:.12,ease:'back.out(1.7)'},t);t+=.3+.12*els.length}}
  tl.fromTo(g.parentElement.querySelector('.hfin'),{opacity:0,scale:.86,filter:'blur(10px)'},{opacity:1,scale:1,filter:'blur(0px)',duration:1,ease:'expo.out'},t+.1)});

/* ---------- solution: today fails step by step, olways lands ---------- */
$$('.so .scard').forEach((cd,ci)=>{const tl=gsap.timeline({scrollTrigger:{trigger:cd,start:'top 72%',toggleActions:'play none none reverse'}});soft(cd,tl);
  tl.fromTo(cd,{opacity:0,y:60,rotateX:18,transformPerspective:900,transformOrigin:'50% 100%'},{opacity:1,y:0,rotateX:0,duration:.9,ease:'power3.out'},ci*.15);
  let t=.6+ci*.15;
  cd.querySelectorAll('.lane').forEach(l=>{const ok=l.classList.contains('lo');
    tl.fromTo(l.querySelector('.k'),{opacity:0,x:-10},{opacity:1,x:0,duration:.3},t);t+=.2;
    l.querySelectorAll('.seg').forEach(sg=>{tl.fromTo(sg,{opacity:0,scale:.5},{opacity:1,scale:1,duration:.45,ease:'back.out(2.4)'},t);t+=.28});
    const mk=l.querySelector('.mk'),em=l.querySelector('em');
    tl.fromTo(mk,{opacity:0,scale:0},{opacity:1,scale:1,duration:.5,ease:ok?'elastic.out(1,.5)':'back.out(3)'},t);
    if(!ok)tl.to(l.querySelectorAll('.seg,.mk'),{x:4,duration:.06,repeat:5,yoyo:true,ease:'none'},t+.25);
    tl.fromTo(em,{opacity:0,x:-8},{opacity:1,x:0,duration:.35},t+.2);t+=.6})});

$$('.story, .big, .pinfit, #s05journey').forEach(el=>{
  if(el.classList.contains('story'))mkStory(el);else if(el.classList.contains('big'))mkBig(el);else if(el.id==='s05journey')mkJourney(el);else mkFit(el)});
/* usability test setup cards */
$$('.ut .usetup .ucard').forEach((c,i)=>{const tl=gsap.fromTo(c,{opacity:0,y:40},{opacity:1,y:0,duration:.8,ease:'power3.out',delay:i*.08,scrollTrigger:ST(c,'top 90%')});soft(c,tl)});
/* ---- usability test: one screen per round — header, problem → fix, why and quotes stay beside the images; one gesture = next version ---- */
$$('.ux').forEach(ux=>{const figs=$$('.xf',ux),tabs=$$('.xt',ux),bar=ux.querySelector('.xbar em'),xl=ux.querySelector('.xl'),n=figs.length;let shown=-1;
  gsap.set(figs,{autoAlpha:0});gsap.set(xl.children,{opacity:0,y:24});
  mkStep(ux,n,(i,back)=>{const tl=gsap.timeline();
    if(shown<0)tl.to(xl.children,{opacity:1,y:0,stagger:.1,duration:.6,ease:'power3.out'},0);
    tabs.forEach((t,j)=>{t.classList.toggle('on',j===i);t.classList.toggle('done',j<i)});
    gsap.to(bar,{scaleX:(i+1)/n,duration:.6,ease:'power3.inOut'});
    figs.forEach((f,j)=>{if(j===i){tl.fromTo(f,{autoAlpha:0,x:back?-60:60},{autoAlpha:1,x:0,duration:.75,ease:'power3.out'},shown<0?.25:.15);
        const z=f.querySelector('.xz');if(z)tl.fromTo([z.querySelector('.xzi'),...z.querySelectorAll('li')],{opacity:0,y:16},{opacity:1,y:0,stagger:.12,duration:.45,ease:'power2.out'},'>-.25')}
      else if(j===shown)tl.to(f,{autoAlpha:0,x:j<i?-60:60,duration:.45,ease:'power2.in'},0)});
    shown=i;return {tl,dwell:700}},{per:.5});
  tabs.forEach((t,k)=>t.onclick=()=>ux._go&&ux._go(k))});

/* ---------- triptych opener ---------- */
/* ---------- triptych opener: full-bleed scene shrinks into the centre, siblings slide in ---------- */
$$('.trip').forEach(t=>{const c=t.querySelector('.tp-c .tpm'),l=t.querySelector('.tp-l'),r=t.querySelector('.tp-r'),caps=$$('figcaption',t),k=t.querySelector('.tkick');
  const R=()=>{const tr=c.style.transform;c.style.transform='none';const b=c.getBoundingClientRect(),sb=t.querySelector('.tstage').getBoundingClientRect();c.style.transform=tr;return {b,sb}};
  const S=()=>{const {b}=R();return Math.min(innerWidth/b.width,innerHeight/b.height)};
  const cy=()=>{const {b,sb}=R();return (sb.top+sb.height/2)-(b.top+b.height/2)};
  const tl=gsap.timeline({scrollTrigger:{trigger:t,start:'top top',end:()=>'+='+innerHeight*1.3,pin:true,scrub:.7,invalidateOnRefresh:true}});
  tl.fromTo(c,{scale:S,y:cy,borderRadius:0},{scale:1,y:0,borderRadius:()=>(22*innerWidth/1400)+'px',ease:'power2.inOut',duration:1},0)
    .fromTo(l,{xPercent:-130,opacity:0},{xPercent:0,opacity:1,ease:'power3.out',duration:.6},.45)
    .fromTo(r,{xPercent:130,opacity:0},{xPercent:0,opacity:1,ease:'power3.out',duration:.6},.45)
    .fromTo([k,...caps],{opacity:0,y:18},{opacity:1,y:0,stagger:.06,duration:.3},.85)});
/* ---- lens: S1 → S5 on one stage; the rail fills as the trip goes on ---- */
$$('.lx').forEach(lx=>{const ms=$$('.lxm',lx),cs=$$('.lxc',lx),rail=$$('.lxrail li',lx);let shown=-1;
  gsap.set([...ms,...cs],{autoAlpha:0});
  mkStep(lx,ms.length,(i,back)=>{const tl=gsap.timeline();
    rail.forEach((l,j)=>{l.classList.toggle('on',j===i);l.classList.toggle('done',j<i);gsap.to(l.querySelector('em'),{scaleX:j<i?1:j===i?1:0,duration:j===i?2:.4,ease:j===i?'none':'power2.out',overwrite:true})});
    if(shown>=0&&shown!==i){tl.to(ms[shown],{autoAlpha:0,y:back?40:-40,scale:.97,duration:.5,ease:'power2.in'},0).to(cs[shown],{autoAlpha:0,y:back?20:-20,duration:.4,ease:'power2.in'},0)}
    ms.forEach((m,j)=>{const v=m.querySelector('video');if(j===i){v.currentTime=0;v.play().catch(()=>{})}else v.pause()});
    tl.fromTo(ms[i],{autoAlpha:0,y:back?-50:70,scale:.96},{autoAlpha:1,y:0,scale:1,duration:.85,ease:'power3.out'},shown<0?0:.3)
      .fromTo(cs[i],{autoAlpha:1},{autoAlpha:1,duration:.01},'<')
      .fromTo(cs[i].children,{opacity:0,y:26},{opacity:1,y:0,stagger:.1,duration:.6,ease:'power3.out'},'<.2');
    shown=i;return {tl,dwell:2000}},{per:.6});
  rail.forEach((l,k)=>l.onclick=()=>lx._go&&lx._go(k))});

/* ---- anatomy / pass: header and screen together; one gesture = next element (spotlight + its card) ---- */
const shotPick=sec=>{const sh=sec.querySelector('.ashot'),sp=sh.querySelector('.spot'),bd=$$('.bdg',sh),cr=$$('.acard',sec);
  return k=>{const b=bd[k];sp.classList.add('on');sp.style.setProperty('--sx',b.style.left);sp.style.setProperty('--sy',b.style.top);
    bd.forEach((x,j)=>x.classList.toggle('on',j===k));cr.forEach((c,j)=>{c.classList.toggle('on',j===k);c.classList.toggle('seen',j<k)});return cr[k]}};
$$('.sx.an1, .sx.pj1').forEach(sx=>{const pick=shotPick(sx),cards=$$('.acard',sx),head=sx.querySelector('.hh, .ahead'),shot=sx.querySelector('.ashot');let first=true;
  gsap.set([shot,...cards],{opacity:0});
  mkStep(sx,cards.length,i=>{const tl=gsap.timeline();
    if(first){first=false;tl.fromTo(shot,{opacity:0,y:40,scale:.97},{opacity:1,y:0,scale:1,duration:.8,ease:'power3.out'},0)
      .fromTo(cards,{opacity:0,x:30},{opacity:1,x:0,stagger:.06,duration:.45,ease:'power3.out'},.3)}
    const c=pick(i);tl.fromTo(c,{'--a':0},{'--a':1,duration:.5},first?.9:0);return {tl,dwell:1100}},{per:.45});
  $$('.bdg,.acard',sx).forEach(b=>b.onclick=()=>sx._go&&sx._go(+b.dataset.i))});
/* field-of-view grid: the lens is divided into five zones, one after another */
$$('.sx.an2').forEach(sx=>{const z=$$('.fovz .z',sx),hz=sx.querySelector('.hz'),img=sx.querySelector('.fovshot>img'),t=sx.querySelector('.fovt');
  gsap.set([...z,hz,...t.children],{opacity:0});
  mkStep(sx,1,()=>{const tl=gsap.timeline();
    tl.to(t.children,{opacity:1,y:0,startAt:{y:24},stagger:.1,duration:.6,ease:'power3.out'},0)
      .fromTo(img,{opacity:.35,scale:1.04},{opacity:1,scale:1,duration:1,ease:'power2.out'},0)
      .fromTo(hz,{opacity:0,scaleX:0},{opacity:1,scaleX:1,duration:.7,ease:'power3.inOut'},.5)
      .fromTo(z,{opacity:0,scale:.94},{opacity:1,scale:1,stagger:.28,duration:.55,ease:'back.out(1.6)'},.9);
    return {tl,dwell:400}},{per:.4})});

/* ---- remaining in-place animations become soft scenes ---- */
Object.entries(TL).forEach(([g,tl])=>{const el=document.getElementById('f'+g.replace(':','-'))||$(`[data-g="${g}"]`);
  if(!el||el.closest('.story,.sx,.pinfit,[data-manual],.big'))return;
  const sec=el.closest('section'),els=$$(`[data-g="${g}"]`,sec);
  /* the group's box: from its first to its last mark */
  const box=document.createElement('i');box.className='gbox';sec.appendChild(box);
  const R=()=>{let t=1e9,b=-1e9;const st=sec.getBoundingClientRect().top;els.forEach(e=>{const r=e.getBoundingClientRect();if(r.height){t=Math.min(t,r.top-st);b=Math.max(b,r.bottom-st)}});box.style.top=t+'px';box.style.height=Math.max(1,b-t)+'px'};
  R();addEventListener('resize',R);addEventListener('load',R);soft(box,tl)});

/* ---------- callmelord-style shutter reveals + headline masks ---------- */
$$('.lsplit .lvid, .hp .lvid').forEach(v=>{const m=v.querySelector('video');
  gsap.fromTo(v,{clipPath:'inset(0% 50% 0% 50% round 20px)'},{clipPath:'inset(0% 0% 0% 0% round 20px)',ease:'power3.inOut',duration:1.2,scrollTrigger:ST(v,'top 80%')});
  m&&gsap.fromTo(m,{scale:1.25},{scale:1,ease:'power3.out',duration:1.6,scrollTrigger:ST(v,'top 80%')})});
$$('.hh .htitle, .fx .fsv').forEach(t=>!t.closest('.st-top')&&gsap.fromTo(t,{clipPath:'inset(0 0 100% 0)',y:30},{clipPath:'inset(0 0 -10% 0)',y:0,duration:1,ease:'expo.out',scrollTrigger:ST(t,'top 88%')}));

/* ---------- headers: words light up one by one as you scroll (scrubbed) ---------- */
$$('.hh .hsub, [data-wr]').forEach(el=>{if(el.dataset.done||el.closest('.big,.st-top'))return;el.dataset.done=1;
  const walk=n=>{[...n.childNodes].forEach(ch=>{if(ch.nodeType===3){const f=document.createDocumentFragment();
      ch.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))f.appendChild(document.createTextNode(w));else{const s=document.createElement('span');s.className='wr';s.textContent=w;f.appendChild(s)}});
      ch.replaceWith(f)}else if(ch.nodeType===1)walk(ch)})};
  walk(el);gsap.to(el.querySelectorAll('.wr'),{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:el,start:'top 82%',end:'top 42%',scrub:.4}})});

const refit=()=>{fitAll();fitCards();fitIv();ScrollTrigger.refresh()};addEventListener('load',refit);document.fonts&&document.fonts.ready.then(refit);
})();