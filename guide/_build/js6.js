(()=>{
const $=s=>document.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const secs=$$('#main > section');
const topOf=el=>el.getBoundingClientRect().top+scrollY;
const to=el=>window.scrollTo({top:topOf(el),behavior:'smooth'});

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

/* ---------- anatomy / pass spotlight ---------- */
$$('.ashot').forEach(sh=>{const sec=sh.closest('section'),sp=sh.querySelector('.spot'),bd=$$('.bdg',sh),cr=$$('.acard',sec);let i=0,hold=0,vis=false;
  function pick(k){i=k;const b=bd[k];sp.style.setProperty('--sx',b.style.left);sp.style.setProperty('--sy',b.style.top);
    bd.forEach((x,j)=>x.classList.toggle('on',j===k));cr.forEach((c,j)=>c.classList.toggle('on',j===k))}
  bd.forEach((b,k)=>b.onclick=()=>{hold=performance.now()+8000;sp.classList.add('on');pick(k)});
  cr.forEach((c,k)=>c.onclick=()=>{hold=performance.now()+8000;sp.classList.add('on');pick(k)});
  new IntersectionObserver(es=>es.forEach(e=>{vis=e.isIntersecting;if(vis){sp.classList.add('on');pick(0)}else{sp.classList.remove('on');cr.forEach(c=>c.classList.remove('on'))}}),{threshold:.5}).observe(sh);
  setInterval(()=>{if(vis&&performance.now()>hold)pick((i+1)%bd.length)},2600)});

/* ---------- idle → back to top ---------- */
let idle;const bump=()=>{clearTimeout(idle);idle=setTimeout(()=>window.scrollTo({top:0,behavior:'smooth'}),180000)};['pointerdown','wheel','touchstart','keydown'].forEach(e=>addEventListener(e,bump,{passive:true}));bump();

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
const EASE={pop:'back.out(2)',bubble:'back.out(1.4)',tail:'back.out(1.4)',herop:'elastic.out(1,.55)',barh:'power2.inOut',barv:'power2.inOut',draw:'none',drawdown:'none',drawrev:'none',ring:'power3.out',dissolve:'expo.out'};
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
/* headers */
$$('.hh').forEach(h=>gsap.fromTo(h.children,{opacity:0,y:26},{opacity:1,y:0,duration:.8,stagger:.09,ease:'power3.out',scrollTrigger:ST(h,'top 85%')}));

/* ---------- hypothesis: column by column, left to right ---------- */
$$('.hgrid').forEach(g=>{const tl=gsap.timeline({scrollTrigger:{trigger:g,start:'top 70%',toggleActions:'play none none reverse'}});const sc=g.closest('section');(sc._tls||(sc._tls=[])).push(tl);let t=0;
  for(let c=0;c<5;c++){const els=$$(`[data-c="${c}"]`,g);
    if(c%2){tl.fromTo(els,{opacity:0,x:-14},{opacity:1,x:0,duration:.25,stagger:.05,ease:'power2.out'},t);t+=.2+.05*els.length}
    else{tl.fromTo(els,{opacity:0,scale:.88,x:-24},{opacity:1,scale:1,x:0,duration:.45,stagger:.12,ease:'back.out(1.7)'},t);t+=.3+.12*els.length}}
  tl.fromTo(g.parentElement.querySelector('.hfin'),{opacity:0,scale:.86,filter:'blur(10px)'},{opacity:1,scale:1,filter:'blur(0px)',duration:1,ease:'expo.out'},t+.1)});

/* ---------- solution: today fails step by step, olways lands ---------- */
$$('.so .scard').forEach((cd,ci)=>{const tl=gsap.timeline({scrollTrigger:{trigger:cd,start:'top 72%',toggleActions:'play none none reverse'}});
  tl.fromTo(cd,{opacity:0,y:60,rotateX:18,transformPerspective:900,transformOrigin:'50% 100%'},{opacity:1,y:0,rotateX:0,duration:.9,ease:'power3.out'},ci*.15);
  let t=.6+ci*.15;
  cd.querySelectorAll('.lane').forEach(l=>{const ok=l.classList.contains('lo');
    tl.fromTo(l.querySelector('.k'),{opacity:0,x:-10},{opacity:1,x:0,duration:.3},t);t+=.2;
    l.querySelectorAll('.seg').forEach(sg=>{tl.fromTo(sg,{opacity:0,scale:.5},{opacity:1,scale:1,duration:.45,ease:'back.out(2.4)'},t);t+=.28});
    const mk=l.querySelector('.mk'),em=l.querySelector('em');
    tl.fromTo(mk,{opacity:0,scale:0},{opacity:1,scale:1,duration:.5,ease:ok?'elastic.out(1,.5)':'back.out(3)'},t);
    if(!ok)tl.to(l.querySelectorAll('.seg,.mk'),{x:4,duration:.06,repeat:5,yoyo:true,ease:'none'},t+.25);
    tl.fromTo(em,{opacity:0,x:-8},{opacity:1,x:0,duration:.35},t+.2);t+=.6})});

/* ---------- pinned scenes, created in page order ---------- */
const GATES=[];let gcool=0;
const inR=st=>scrollY>=st.start-4&&scrollY<=st.end+4;
const gate=(dir,e)=>{for(const g of GATES){if(inR(g.st)&&g.handle(dir,e))return}};
addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>2)gate(Math.sign(e.deltaY),e)},{passive:false});
let gty=0;addEventListener('touchstart',e=>{gty=e.touches[0].clientY},{passive:true});
addEventListener('touchmove',e=>{const dy=gty-e.touches[0].clientY;if(Math.abs(dy)>10){gate(Math.sign(dy),e);gty=e.touches[0].clientY}},{passive:false});
addEventListener('keydown',e=>{if(['ArrowDown','PageDown',' '].includes(e.key))gate(1,e);else if(['ArrowUp','PageUp'].includes(e.key))gate(-1,e)});
const stop=e=>{e.cancelable&&e.preventDefault()};
const busyTl=tl=>!!tl&&(tl.isActive()||tl.progress()<1);
/* fit one-screen sections to the iPad viewport */
const fitAll=()=>$$('.fit').forEach(f=>{f.style.removeProperty('--u');const u=innerWidth/1400,nav=64;
  const h=f.style.getPropertyValue('--fh')?(+f.style.getPropertyValue('--fh'))*u:f.scrollHeight;
  const s=Math.min(1,(innerHeight-nav-18)/h);f.style.setProperty('--u',`calc(100vw / 1400 * ${s.toFixed(4)})`)});
fitAll();fitIv();addEventListener('resize',()=>{fitAll();fitCards();fitIv()});
/* story: one gesture = one step; the next step waits until this one has finished drawing */
const mkStory=(st,play)=>{const items=$$('.st-item',st),nav=$$('.st-nav li',st),n=items.length;let cur=-1,live=false;
  const set=i=>{if(i===cur)return;cur=i;items.forEach((it,j)=>{it.classList.toggle('on',j===i);it.classList.toggle('past',j<i)});
    nav.forEach((l,j)=>{l.classList.toggle('on',j===i);l.classList.toggle('done',j<i);const e=l.querySelector('em');if(e)e.style.transform=`scaleX(${j<=i?1:0})`});if(live)play(items[i])};
  set(0);
  const trg=ScrollTrigger.create({trigger:st,start:'top top',end:()=>'+='+innerHeight*.6*n,pin:true,pinSpacing:true,invalidateOnRefresh:true,
    onEnter:()=>{if(!live){live=true;play(items[cur])}},onEnterBack:()=>{live=true},
    onUpdate:s=>set(Math.min(n-1,Math.floor(s.progress*n*.999)))});
  const tlOf=it=>it._tl||TL[it.dataset.g];
  const go=k=>{gcool=performance.now()+700;scrollTo({top:trg.start+(trg.end-trg.start)*(k+.5)/n,behavior:'instant'});set(k)};
  GATES.push({st:trg,handle:(dir,e)=>{const now=performance.now();
    if(dir>0){if(!live){live=true;play(items[cur])}
      if(busyTl(tlOf(items[cur]))||now<gcool){stop(e);return true}
      if(cur<n-1){stop(e);go(cur+1);return true}return false}
    if(cur>0){stop(e);if(now>=gcool)go(cur-1);return true}return false}})};
const mkBig=b=>{const ws=[];const bs=b.querySelector('.bs');
  bs.childNodes.forEach(()=>{});bs.innerHTML=bs.textContent.split(/(\s+)/).map(w=>/^\s+$/.test(w)?w:`<span class="wr">${w}</span>`).join('');
  const tl=gsap.timeline({scrollTrigger:{trigger:b,start:'top top',end:()=>'+='+innerHeight*1.2,pin:true,pinSpacing:true,scrub:.6}});
  tl.fromTo(b,{clipPath:'inset(18% 9% 18% 9% round 40px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'power2.inOut',duration:1})
    .fromTo(b.querySelector('.bk'),{opacity:0,y:24},{opacity:1,y:0,duration:.25},.55)
    .to(bs.querySelectorAll('.wr'),{opacity:1,stagger:.05,duration:.2,ease:'none'},.7)
    .fromTo(b.querySelector('.be'),{opacity:0,y:20},{opacity:1,y:0,duration:.3},'>-.1')
    .to({},{duration:.4})};
const mkFit=sec=>{const trg=ScrollTrigger.create({trigger:sec,start:'top top',end:()=>'+='+innerHeight*.35,pin:true,pinSpacing:true,
    onEnter:()=>(sec._tls||[]).forEach(t=>{if(t.progress()<1&&!t.isActive())t.play()})});
  GATES.push({st:trg,handle:(dir,e)=>{if(dir>0&&(sec._tls||[]).some(busyTl)){stop(e);return true}return false}})};
const mkJourney=sec=>{const tl=TL['2616:37657'];if(!tl)return;
  const groups=Object.entries(BUB).map(([t,els])=>({t:+t,els,on:false}));groups.forEach(g=>gsap.set(g.els,{opacity:0,y:10}));
  ScrollTrigger.create({trigger:sec,start:'top top',end:()=>'+='+innerHeight*1.6,pin:true,pinSpacing:true,scrub:.5,animation:tl,
    onUpdate:s=>{const now=tl.duration()*s.progress;groups.forEach(g=>{const want=now>=g.t;if(want!==g.on){g.on=want;
      gsap.to(g.els,{opacity:want?1:0,y:want?0:10,duration:want?.45:.2,ease:want?'power3.out':'power2.in',overwrite:true})}})}})};
$$('.story, .big, .pinfit, #s05journey').forEach(el=>{
  if(el.classList.contains('story'))mkStory(el,el._play||(it=>{const tl=TL[it.dataset.g];tl&&tl.restart()}));
  else if(el.classList.contains('big'))mkBig(el);
  else if(el.id==='s05journey')mkJourney(el);
  else mkFit(el)});

/* ---------- usability test ---------- */
$$('.ut .usetup .ucard').forEach((c,i)=>gsap.fromTo(c,{opacity:0,y:40},{opacity:1,y:0,duration:.8,ease:'power3.out',delay:i*.08,scrollTrigger:ST(c,'top 90%')}));
$$('.ut .ui').forEach(ui=>{
  const hd=ui.querySelector('.uh');gsap.fromTo(hd.children,{opacity:0,y:30},{opacity:1,y:0,duration:.8,stagger:.12,ease:'power3.out',scrollTrigger:ST(hd,'top 88%')});
  $$('.why,.ups,.uq,.u3',ui).forEach(el=>gsap.fromTo(el,{opacity:0,y:40},{opacity:1,y:0,duration:.8,ease:'power3.out',scrollTrigger:ST(el,'top 90%')}));
  const pin=ui.querySelector('.upin');if(!pin)return;
  const tr=pin.querySelector('.utrack'),cs=$$('.uc',tr),dots=$$('.ud',pin);
  const X=()=>{const vw=innerWidth,u=vw/1400,a=cs[0],b=cs[1],c=cs[2];const off=e=>e.offsetLeft,w=e=>e.offsetWidth;
    return [vw/2-(off(a)+w(a)/2), vw/2-(off(a)+(off(b)+w(b)-off(a))/2), (vw-40*u)-(off(c)+w(c))]};
  let xs=X();addEventListener('resize',()=>{xs=X()});
  const st={i:-1};
  const set=i=>{if(i===st.i)return;st.i=i;dots.forEach((d,j)=>d.classList.toggle('on',j===i));
    cs.forEach((c,j)=>c.classList.toggle('dim',i===0?j!==0:i===1?j===2:j===0));
    gsap.to(tr,{x:xs[i],duration:.9,ease:'power3.inOut',overwrite:true})};
  const P=[0,.5,.98];
  const trg=ScrollTrigger.create({trigger:pin,start:'top top',end:()=>'+='+innerHeight*1.5,pin:true,pinSpacing:true,invalidateOnRefresh:true,
    onUpdate:s=>set(s.progress<.3?0:s.progress<.75?1:2),onRefresh:()=>{xs=X();const i=st.i;st.i=-1;set(Math.max(0,i))}});
  gsap.set(tr,{x:xs[0]});set(0);
  /* while pinned, one gesture = one step; the page itself does not move on until To Be is on screen */
  let cool=0;const inPin=()=>scrollY>=trg.start-4&&scrollY<=trg.end+4;
  const go=k=>{cool=performance.now()+750;window.scrollTo({top:trg.start+(trg.end-trg.start)*P[k],behavior:'instant'});set(k)};
  const step=(dir,e)=>{if(!inPin())return;const i=st.i;
    if(dir>0&&i<2){e.cancelable&&e.preventDefault();if(performance.now()>cool)go(i+1)}
    else if(dir<0&&i>0){e.cancelable&&e.preventDefault();if(performance.now()>cool)go(i-1)}
    else if(performance.now()<cool){e.cancelable&&e.preventDefault()}};
  addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>2)step(Math.sign(e.deltaY),e)},{passive:false});
  let ty=0;addEventListener('touchstart',e=>{ty=e.touches[0].clientY},{passive:true});
  addEventListener('touchmove',e=>{const dy=ty-e.touches[0].clientY;if(Math.abs(dy)>14){step(Math.sign(dy),e);ty=e.touches[0].clientY}},{passive:false});
  addEventListener('keydown',e=>{if(['ArrowDown','PageDown',' '].includes(e.key))step(1,e);else if(['ArrowUp','PageUp'].includes(e.key))step(-1,e)});
  dots.forEach((d,k)=>d.onclick=()=>go(k))});

/* ---------- triptych opener: full-bleed scene shrinks into the centre, siblings slide in ---------- */
$$('.trip').forEach(t=>{const c=t.querySelector('.tp-c .tpm'),l=t.querySelector('.tp-l'),r=t.querySelector('.tp-r'),caps=$$('figcaption',t),k=t.querySelector('.tkick');
  const R=()=>{const tr=c.style.transform;c.style.transform='none';const b=c.getBoundingClientRect(),sb=t.querySelector('.tstage').getBoundingClientRect();c.style.transform=tr;return {b,sb}};
  const S=()=>{const {b}=R();return Math.min(innerWidth/b.width,innerHeight/b.height)};
  const cy=()=>{const {b,sb}=R();return (sb.top+sb.height/2)-(b.top+b.height/2)};
  const tl=gsap.timeline({scrollTrigger:{trigger:t,start:'top top',end:()=>'+='+innerHeight*1.3,pin:true,scrub:.7,invalidateOnRefresh:true}});
  tl.fromTo(c,{scale:S,y:cy,borderRadius:0},{scale:1,y:0,borderRadius:()=>getComputedStyle(c).borderTopLeftRadius||'18px',ease:'power2.inOut',duration:1},0)
    .fromTo(l,{xPercent:-130,opacity:0},{xPercent:0,opacity:1,ease:'power3.out',duration:.6},.45)
    .fromTo(r,{xPercent:130,opacity:0},{xPercent:0,opacity:1,ease:'power3.out',duration:.6},.45)
    .fromTo([k,...caps],{opacity:0,y:18},{opacity:1,y:0,stagger:.06,duration:.3},.85)});

/* ---------- through the lens ---------- */
$$('.lsplit').forEach(s=>{const v=s.querySelector('.lvid'),c=s.querySelector('.lcap'),rev=s.classList.contains('rev');
  gsap.fromTo(c.children,{opacity:0,y:30},{opacity:1,y:0,duration:.8,stagger:.1,ease:'power3.out',scrollTrigger:ST(s,'top 55%')})});
$$('.lfull').forEach(f=>{const v=f.querySelector('.lstick .lvid');
  gsap.fromTo(v,{scale:.62,borderRadius:'36px'},{scale:1,borderRadius:'0px',ease:'none',scrollTrigger:{trigger:f,start:'top 95%',end:'top top',scrub:.5}});
  gsap.fromTo(f.querySelector('.lcap.ov'),{y:60,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:ST(f.querySelector('.lover'),'top 70%')})});
$$('.hwrap').forEach(w=>{const tr=w.querySelector('.htrack'),dots=$$('.hdots i',w),ps=[...tr.children];const dist=()=>Math.max(0,tr.scrollWidth-innerWidth);
  dots[0]&&dots[0].classList.add('on');
  gsap.to(tr,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:w,start:'top top',end:()=>'+='+Math.max(innerHeight*.8,dist()*1.2),pin:true,scrub:.6,invalidateOnRefresh:true,
        onUpdate:s=>{const i=Math.round(s.progress*(ps.length-1));dots.forEach((d,j)=>d.classList.toggle('on',j===i))}}})});

/* ---------- callmelord-style shutter reveals + headline masks ---------- */
$$('.lsplit .lvid, .hp .lvid').forEach(v=>{const m=v.querySelector('video');
  gsap.fromTo(v,{clipPath:'inset(0% 50% 0% 50% round 20px)'},{clipPath:'inset(0% 0% 0% 0% round 20px)',ease:'power3.inOut',duration:1.2,scrollTrigger:ST(v,'top 80%')});
  m&&gsap.fromTo(m,{scale:1.25},{scale:1,ease:'power3.out',duration:1.6,scrollTrigger:ST(v,'top 80%')})});
$$('.hh .htitle, .fx .fsv').forEach(t=>gsap.fromTo(t,{clipPath:'inset(0 0 100% 0)',y:30},{clipPath:'inset(0 0 -10% 0)',y:0,duration:1,ease:'expo.out',scrollTrigger:ST(t,'top 88%')}));

/* ---------- headers: words light up one by one as you scroll (scrubbed) ---------- */
$$('.hh .hsub, [data-wr]').forEach(el=>{if(el.dataset.done||el.closest('.big'))return;el.dataset.done=1;
  const walk=n=>{[...n.childNodes].forEach(ch=>{if(ch.nodeType===3){const f=document.createDocumentFragment();
      ch.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))f.appendChild(document.createTextNode(w));else{const s=document.createElement('span');s.className='wr';s.textContent=w;f.appendChild(s)}});
      ch.replaceWith(f)}else if(ch.nodeType===1)walk(ch)})};
  walk(el);gsap.to(el.querySelectorAll('.wr'),{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:el,start:'top 82%',end:'top 42%',scrub:.4}})});

/* ---------- anatomy: the field-of-view map lands on the real screen ---------- */
$$('.fovpin').forEach(p=>{const shot=p.querySelector('.fovshot'),img=shot.querySelector('img'),z=$$('.fovz .z,.fovz .hz',shot),txt=p.querySelector('.fovt');
  const small=()=>{const u=innerWidth/1400;return {s:560/1320,x:(1360-560-40)*u*0+0}};
  gsap.set(shot,{scale:560/1320,xPercent:0});
  const tl=gsap.timeline({scrollTrigger:{trigger:p,start:'top top',end:()=>'+='+innerHeight*1.4,pin:true,scrub:.6}});
  tl.fromTo(img,{opacity:0},{opacity:1,duration:.6},0)
    .fromTo(shot,{scale:560/1320},{scale:1,duration:1,ease:'power2.inOut'},0)
    .to(txt,{opacity:0,x:-80,duration:.5},0)
    .to({}, {duration:.4});
  gsap.fromTo([...txt.children],{opacity:0,y:24},{opacity:1,y:0,stagger:.08,duration:.7,ease:'power3.out',scrollTrigger:ST(p,'top 70%')})});
$$('.awrap').forEach(w=>{gsap.fromTo(w.querySelector('.ashot'),{opacity:0,y:60,scale:.96},{opacity:1,y:0,scale:1,duration:1,ease:'power3.out',scrollTrigger:ST(w,'top 85%')});
  gsap.fromTo($$('.acard',w),{opacity:0,y:30},{opacity:1,y:0,duration:.6,stagger:.08,ease:'power3.out',scrollTrigger:ST(w.querySelector('.agrid'),'top 92%')})});

/* ---------- layer by layer (grida): the finished screen lifts apart, one layer per step ---------- */
$$('.lyr').forEach(w=>{const st=w.querySelector('.lystack'),base=w.querySelector('.ly0'),ls=$$('.ly',w),steps=$$('.lysteps li',w),tags=$$('.lytag',w);
  const on=k=>steps.forEach((s,i)=>s.classList.toggle('on',i<=k));on(-1);
  const tl=gsap.timeline({scrollTrigger:{trigger:w,start:'top top',end:()=>'+='+innerHeight*2.2,pin:true,scrub:.7,invalidateOnRefresh:true,
    onUpdate:s=>{const p=s.progress;on(p<.07?-1:p<.14?0:p<.24?1:p<.34?2:p<.44?3:4)}}});
  const k=()=>innerWidth/1400;
  tl.to(st,{scale:.9,duration:.6,ease:'power2.inOut'},0)
    .to(base.querySelector('img'),{opacity:.38,filter:'saturate(.6)',duration:.6},.2)
    .to(base.querySelector('.lytag'),{opacity:1,duration:.2},.4);
  ls.forEach((l,i)=>{tl.to(l,{y:()=>-[46,38,34,30][i]*k(),scale:[1.08,1.14,1.3,1.2][i],boxShadow:'0 30px 60px rgba(1,23,34,.35)',duration:.6,ease:'power3.out'},.7+i*.5)
    .to(l.querySelector('.lytag'),{opacity:1,duration:.2},.95+i*.5)});
  tl.to({},{duration:.8});
  tl.to(tags,{opacity:0,duration:.2},'>').to(ls,{y:0,scale:1,boxShadow:'0 0 0 rgba(0,0,0,0)',duration:.7,ease:'power2.inOut',stagger:.05},'<').to(base.querySelector('img'),{opacity:1,filter:'saturate(1)',duration:.5},'<')
    .to(st,{scale:1,duration:.7,ease:'power2.inOut'},'<.1')});

addEventListener('load',()=>ScrollTrigger.refresh());
})();
