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
$$('.rs:not(#s01cover):not(#s16concl):not(#s17thanks)').forEach(sec=>{const m=sec.dataset.anim;$$('.b',sec).forEach((el,i)=>{
  const fr=el.classList.contains('title')?{clipPath:'inset(0 50% 0 50%)',opacity:0}:el.classList.contains('dissolve')||m==='dissolve'?{opacity:0,scale:.85,filter:'blur(10px)'}:
    m==='flip'?{rotateY:-60,opacity:0,transformPerspective:1000,transformOrigin:'0% 50%'}:{y:60,opacity:0};
  gsap.fromTo(el,fr,{clipPath:'inset(0 0% 0 0%)',opacity:1,y:0,rotateY:0,scale:1,filter:'blur(0px)',duration:1.1,ease:'power3.out',delay:(i%3)*.08,scrollTrigger:ST(el,'top 92%')})})});

/* ---------- Figma-rendered sections: one timeline per group, each mark at its time ---------- */
const FROM={rise:{opacity:0,y:30},fade:{opacity:0},left:{opacity:0,x:-30},drop:{opacity:0,y:-26},pop:{opacity:0,scale:.8},bubble:{opacity:0,scale:.04},tail:{opacity:0,scale:.04},
  dissolve:{opacity:0,scale:.86,filter:'blur(10px)'},herop:{opacity:0,scale:.7},
  barh:{clipPath:'inset(-60px calc(100% + 60px) -60px -60px)'},barv:{clipPath:'inset(calc(100% + 60px) -60px -60px -60px)'},draw:{clipPath:'inset(-20px 100% -20px -20px)'},
  drawdown:{clipPath:'inset(-20px -20px 100% -20px)'},drawrev:{clipPath:'inset(-20px -20px -20px 100%)'},ring:{opacity:0,rotate:-140,scale:.6}};
const EASE={pop:'expo.out',bubble:'power3.out',tail:'power3.out',herop:'expo.out',barh:'power2.inOut',barv:'power2.inOut',draw:'power1.inOut',drawdown:'power1.inOut',drawrev:'power1.inOut',ring:'power3.out',dissolve:'expo.out'};
/* timelines that must wait for another to finish (e.g. Problem row 2 waits for Insight 01) */
const TL={},AFTER={'2616:37311':'2616:37248','2616:37370':'2616:37311'};
const run=g=>{const tl=TL[g],p=AFTER[g],pt=p&&TL[p];
  if(pt&&pt.progress()<1){if(!pt.isActive())pt.play();pt.eventCallback('onComplete',()=>tl.play())}else tl.play()};
const BUB={};const G={};$$('[data-a][data-g]').forEach(el=>{(G[el.dataset.g]||(G[el.dataset.g]=[])).push(el)});
Object.entries(G).forEach(([g,els])=>{const sec=els[0].closest('section');
  const trig=g.startsWith('hdr')||g==='ov'?els[0]:(document.getElementById('f'+g.replace(':','-'))||els[0]);
  const tl=gsap.timeline({paused:true});TL[g]=tl;
  /* everything that animates in place follows the scroll (scrubbed) instead of playing on its own */
  const inPin=els[0].closest('.pinfit'),inStory=els[0].closest('.story,[data-manual],.sx');
  if(!inPin&&(!inStory||g.startsWith('hdr'))){
    if(inStory)ScrollTrigger.create({trigger:trig,start:'top 76%',onEnter:()=>run(g),onLeaveBack:()=>tl.reverse()});
    else ScrollTrigger.create({trigger:trig,start:'top 92%',end:()=>g.startsWith('hdr')?'top 45%':'center 50%',scrub:.6,animation:tl,invalidateOnRefresh:true})}
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
      else{tl.fromTo(p,{opacity:0,scale:.2},{opacity:1,scale:1,duration:last?.9:.6,ease:'expo.out'},t);t+=last?.9:.5}});
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
  {const sec=el.closest('section');if(sec&&sec!==el){const cs=getComputedStyle(sec);if(getComputedStyle(el).backgroundColor==='rgba(0, 0, 0, 0)'){el.style.backgroundColor=cs.backgroundColor==='rgba(0, 0, 0, 0)'?'#F4F5F7':cs.backgroundColor;if(cs.backgroundImage!=='none')el.style.backgroundImage=cs.backgroundImage}}}
  const per=o.per||.55;
  const trg=ScrollTrigger.create({trigger:el,start:'top top',end:()=>'+='+innerHeight*per*n,pin:true,pinSpacing:true,invalidateOnRefresh:true,anticipatePin:1,
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
let jumpUntil=0;window.__jump=()=>{jumpUntil=performance.now()+1800;if(typeof unlock==='function')unlock()};
const intent=(dir,e,d=0)=>{if(performance.now()<jumpUntil)return;const y=scrollY;
  for(const s of SC){if(s.step&&s.step(dir,e))return}
  if(dir>0)for(const s of SC){if(!s.busy())continue;const h=s.hold();
    if(y>=h-4&&y<=h+innerHeight*.5){stop(e);s.hurry();return}
    if(y<h-4&&y+d>h){stop(e);scrollTo({top:h,behavior:'instant'});return}}};
addEventListener('wheel',e=>{if(Math.abs(e.deltaY)>2)intent(Math.sign(e.deltaY),e,e.deltaY*(e.deltaMode===1?32:1))},{passive:false});
let gty=0;addEventListener('touchstart',e=>{gty=e.touches[0].clientY},{passive:true});
addEventListener('touchmove',e=>{const dy=gty-e.touches[0].clientY;if(Math.abs(dy)>10){intent(Math.sign(dy),e,dy);gty=e.touches[0].clientY}},{passive:false});
addEventListener('keydown',e=>{if(['ArrowDown','PageDown',' '].includes(e.key))intent(1,e);else if(['ArrowUp','PageUp'].includes(e.key))intent(-1,e)});
/* momentum (iPad fling) cannot be cancelled — pull it back to the scene that is still playing */
let py=scrollY,lockS=null;const R=document.documentElement;
const lock=s=>{lockS=s;R.style.overflow='hidden';document.body.style.overflow='hidden';s.hurry()};
const unlock=()=>{lockS=null;R.style.overflow='';document.body.style.overflow=''};
gsap.ticker.add(()=>{if(lockS&&!lockS.busy())unlock()});
addEventListener('scroll',()=>{const y=scrollY;
  if(!lockS&&y>py&&performance.now()>jumpUntil){for(const s of SC){const h=s.hold();if(py<=h+3&&y>h+3&&s.busy()){scrollTo({top:h,behavior:'instant'});lock(s);py=h;return}}}
  py=y},{passive:true});

/* ---- problem / interview stories ---- */
/* ---- helper: a pinned scene whose whole sequence is driven by the scroll; marks say which step is on screen ---- */
const scrubScene=(el,tl,marks,onStep,len=.3)=>{let cur=-1;
  const upd=()=>{const now=tl.time();let k=0;marks.forEach((m,j)=>{if(now>=m-.02)k=j});if(k!==cur){cur=k;onStep&&onStep(k)}};
  tl.eventCallback('onUpdate',upd);
  const trg=ScrollTrigger.create({trigger:el,start:'top top',end:()=>'+='+innerHeight*Math.max(1.5,tl.duration()*len),pin:true,pinSpacing:true,scrub:.7,animation:tl,invalidateOnRefresh:true});
  el._go=k=>{window.__jump&&window.__jump();scrollTo({top:trg.start+(trg.end-trg.start)*Math.min(1,(marks[k]+.9)/tl.duration()),behavior:'smooth'})};
  onStep&&onStep(0);return trg};
const nest=(tl,t,pos)=>{if(!t)return;t.paused(false);tl.add(t.progress(0),pos)};
/* ---- problem / interview stories: each number lands big, then shrinks into the rail while its chart draws ---- */
const storyNav=(st,i)=>{$$('.st-nav li',st).forEach((l,j)=>{l.classList.toggle('on',j===i);l.classList.toggle('done',j<i);const e=l.querySelector('em');if(e)e.style.transform=`scaleX(${j<=i?1:0})`})};
const mkStory=st=>{st.classList.add('scr');const items=$$('.st-item',st),lis=$$('.st-nav li',st),stage=st.querySelector('.st-stage'),box=st.querySelector('.st-items');
  const tl=gsap.timeline(),marks=[];gsap.set(items,{autoAlpha:0});
  items.forEach((it,i)=>{const t=it._tl||(it.querySelector('.ig')||{})._tl||TL[it.dataset.g],strong=lis[i]&&lis[i].querySelector('strong');marks.push(tl.duration());
    if(strong){const txt=strong.textContent,m=txt.match(/^([\d.]+)(.*)$/),dp=m?(m[1].split('.')[1]||'').length:0;
      const k=document.createElement('div');k.className='kst';k.innerHTML=`<b>${txt}</b>`;const lab=document.createElement('p');lab.className='ksl';lab.textContent=lis[i].querySelector('span').textContent;
      box.appendChild(k);box.appendChild(lab);const b=k.firstChild,o={v:0};
      const F=()=>{const s=strong.getBoundingClientRect(),g=box.getBoundingClientRect();return {x:s.left+s.width/2-(g.left+g.width/2),y:s.top+s.height/2-(g.top+g.height/2),s:s.height/Math.max(1,k.firstChild.offsetHeight)}};
      gsap.set([k,lab],{autoAlpha:0});gsap.set(strong,{opacity:0});
      tl.fromTo(k,{autoAlpha:0,scale:.55,x:0,y:0,filter:'blur(14px)'},{autoAlpha:1,scale:1,filter:'blur(0px)',duration:.6,ease:'power3.out'})
        .fromTo(o,{v:0},{v:m?+m[1]:0,duration:.6,ease:'power2.out',onUpdate:()=>{if(m)b.textContent=o.v.toFixed(dp)+m[2]}},'<')
        .fromTo(lab,{autoAlpha:0,y:30},{autoAlpha:1,y:0,duration:.4,ease:'power3.out'},'<.25')
        .to({},{duration:.35})
        .to(lab,{autoAlpha:0,y:-20,duration:.3,ease:'power2.in'})
        .to(k,{x:()=>F().x,y:()=>F().y,scale:()=>F().s,duration:.8,ease:'power3.inOut'},'<')
        .to(k,{autoAlpha:0,duration:.2},'>-.15').to(strong,{opacity:1,duration:.2},'<')}
    tl.fromTo(it,{autoAlpha:0,yPercent:30,scale:.9,filter:'blur(8px)'},{autoAlpha:1,yPercent:0,scale:1,filter:'blur(0px)',duration:.8,ease:'power3.out'},strong?'>-.75':'>');
    nest(tl,t,'>-.3');tl.to({},{duration:.7});
    if(i<items.length-1)tl.to(it,{autoAlpha:0,yPercent:-26,scale:.92,filter:'blur(8px)',duration:.6,ease:'power2.in'})});
  scrubScene(st,tl,marks,i=>storyNav(st,i),.28);
  lis.forEach((l,k)=>l.onclick=()=>st._go&&st._go(k))};
const splitW=n=>{[...n.childNodes].forEach(ch=>{if(ch.nodeType===3){const f=document.createDocumentFragment();
    ch.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))f.appendChild(document.createTextNode(w));else{const s=document.createElement('span');s.className='wr';s.textContent=w;f.appendChild(s)}});
    ch.replaceWith(f)}else if(ch.nodeType===1)splitW(ch)})};
/* So: Insight 02 is read in full, then the sentence itself shrinks into its card; Insight 01 comes back down from where it was;
   their lines meet in one point and that point opens into the "So" */
const mkSo=b=>{const gh=b.querySelector('.ghost'),gs=gh.querySelector('.bs'),sow=b.querySelector('.sow'),bs=sow.querySelector('.bs');
  splitW(gs);splitW(bs);
  const cards=$$('.mi',b),ps=$$('.mgl path',b),dot=b.querySelector('.mdot');
  ps.forEach(p=>{const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L});
  gsap.set([sow.querySelector('.bk'),sow.querySelector('.be'),bs,...cards],{opacity:0});
  let F=null;const fl=()=>{const o=gsap.getProperty(gh,'x'),oy=gsap.getProperty(gh,'y'),os=gsap.getProperty(gh,'scale');gsap.set(gh,{x:0,y:0,scale:1});
    const g=gs.getBoundingClientRect(),c=cards[1].querySelector('p').getBoundingClientRect();gsap.set(gh,{x:o,y:oy,scale:os});return F={x:c.left-g.left,y:c.top-g.top,s:c.width/g.width}};
  const Fx=()=>(F||fl());ScrollTrigger.addEventListener('refreshInit',()=>{F=null});
  const tl=gsap.timeline({scrollTrigger:{trigger:b,start:'top top',end:()=>'+='+innerHeight*3,pin:true,pinSpacing:true,scrub:.7}});
  tl.fromTo(b,{clipPath:'inset(18% 9% 18% 9% round 40px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'power2.inOut',duration:1},0)
    .fromTo(gh.querySelector('.bk'),{opacity:0,y:24},{opacity:1,y:0,duration:.25},.55)
    .to(gs.querySelectorAll('.wr'),{opacity:1,stagger:.05,duration:.2,ease:'none'},.7)
    .fromTo(gh.querySelector('.be'),{opacity:0,y:20},{opacity:1,y:0,duration:.3},'>-.1')
    .to({},{duration:.5})
    .addLabel('fly')
    .to([gh.querySelector('.bk'),gh.querySelector('.be')],{opacity:0,duration:.3},'fly')
    .to(gh,{x:()=>Fx().x,y:()=>Fx().y,scale:()=>Fx().s,transformOrigin:()=>gs.offsetLeft+'px '+gs.offsetTop+'px',duration:1.1,ease:'power3.inOut'},'fly')
    .to(gh,{opacity:0,duration:.35},'fly+=.8')
    .fromTo(cards[1],{opacity:0},{opacity:1,duration:.35},'fly+=.75')
    .fromTo(cards[0],{opacity:0,y:()=>-innerHeight*.55,scale:1.3,filter:'blur(8px)'},{opacity:1,y:0,scale:1,filter:'blur(0px)',duration:1,ease:'power3.out'},'fly+=.3')
    .fromTo(cards[0].querySelector('i'),{opacity:0},{opacity:1,duration:.2},'fly+=1')
    .to(ps,{strokeDashoffset:0,duration:.6,ease:'power2.inOut'},'fly+=1.3')
    .fromTo(dot,{scale:0,opacity:0},{scale:1,opacity:1,duration:.25,ease:'power3.out'},'>-.05')
    .to(cards,{opacity:.5,duration:.4},'<')
    .fromTo(sow.querySelector('.bk'),{opacity:0,y:16},{opacity:1,y:0,duration:.3},'<')
    .to(bs,{opacity:1,duration:.05},'<')
    .to(bs.querySelectorAll('.wr'),{opacity:1,stagger:.05,duration:.2,ease:'none'},'>')
    .fromTo(sow.querySelector('.be'),{opacity:0,y:16},{opacity:1,y:0,duration:.3},'>-.1')
    .to({},{duration:.4})};
const mkBig=b=>{const bs=b.querySelector('.bs');
  const walk=n=>{[...n.childNodes].forEach(ch=>{if(ch.nodeType===3){const f=document.createDocumentFragment();
      ch.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))f.appendChild(document.createTextNode(w));else{const s=document.createElement('span');s.className='wr';s.textContent=w;f.appendChild(s)}});
      ch.replaceWith(f)}else if(ch.nodeType===1)walk(ch)})};walk(bs);
  const so=b.classList.contains('so'),mg=b.querySelector('.mg');
  const tl=gsap.timeline({scrollTrigger:{trigger:b,start:'top top',end:()=>'+='+innerHeight*(so?2:1.2),pin:true,pinSpacing:true,scrub:.6}});
  if(so&&mg){const cards=[...mg.children],ps=$$('.mgl path',b),dot=b.querySelector('.mdot'),gh=b.querySelector('.ghost');
    ps.forEach(p=>{const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L});
    gsap.set([b.querySelector('.bk'),b.querySelector('.be'),bs],{opacity:0});
    const fl=()=>{gsap.set(gh,{x:0,y:0,scale:1});const g=gh.getBoundingClientRect(),c=cards[1].getBoundingClientRect();return {x:c.left-g.left,y:c.top-g.top,s:c.width/g.width}};let F=fl();
    ScrollTrigger.addEventListener('refreshInit',()=>{F=null});
    const F_=()=>F||(F=fl());
    tl.fromTo(gh,{opacity:1},{x:()=>F_().x,y:()=>F_().y,scale:()=>F_().s,transformOrigin:'0 0',opacity:0,duration:.8,ease:'power2.inOut'},0)
      .fromTo(cards[1],{opacity:0},{opacity:1,duration:.3},.55)
      .fromTo(cards[0],{opacity:0,y:60},{opacity:1,y:0,duration:.5,ease:'power3.out'},.35)
      .to(ps,{strokeDashoffset:0,duration:.45,ease:'power2.inOut'},.95)
      .fromTo(dot,{scale:0,opacity:0},{scale:1,opacity:1,duration:.2,ease:'power3.out'},1.35)
      .to(cards,{opacity:.45,duration:.3},1.4);
    tl.addLabel('st',1.45);tl.to(bs,{opacity:1,duration:.15},'st')}
  else tl.fromTo(b,{clipPath:'inset(18% 9% 18% 9% round 40px)'},{clipPath:'inset(0% 0% 0% 0% round 0px)',ease:'power2.inOut',duration:1});
  const T0=so?'st':.55,T1=so?'st+=.15':.7;tl
    .fromTo(b.querySelector('.bk'),{opacity:0,y:24},{opacity:1,y:0,duration:.25},T0)
    .to(bs.querySelectorAll('.wr'),{opacity:1,stagger:.05,duration:.2,ease:'none'},T1)
    .fromTo(bs.querySelectorAll('.hl'),{'--hl':0},{'--hl':1,duration:.4,stagger:.1},'>-.1')
    .fromTo(b.querySelector('.be'),{opacity:0,y:20},{opacity:1,y:0,duration:.3},'>-.1')
    .to({},{duration:.4})};
/* ---- one-screen figures (positioning map, hypotheses): play, hold until drawn ---- */
/* one-screen figures are scrubbed: the drawing follows the scroll, and the page cannot pass it before it is drawn */
const mkFit=sec=>{if(sec._hyp){sec._hyp.tl.paused(false);return scrubScene(sec,sec._hyp.tl.progress(0),sec._hyp.marks,sec._hyp.on,.3)}const tls=sec._tls||[];const all=gsap.timeline();tls.forEach(t=>{t.paused(false);all.add(t.progress(0),0)});
  all.to({},{duration:.6});
  ScrollTrigger.create({trigger:sec,start:'top top',end:()=>'+='+innerHeight*Math.max(1.2,all.duration()*.32),pin:true,pinSpacing:true,scrub:.6,animation:all,invalidateOnRefresh:true})};
/* ---- journey: the line follows the scroll; each speech bubble rises whole when the line reaches its dot ---- */
const mkJourney=sec=>{const tl=TL['2616:37657'];if(!tl)return;
  const groups=Object.entries(BUB).map(([t,els])=>{const w=document.createElement('div');w.className='bgrp';sec.appendChild(w);els.forEach(e=>{w.appendChild(e);gsap.set(e,{opacity:1,clearProps:'transform,clipPath'})});
    gsap.set(w,{opacity:0,y:26});return {t:+t,w,on:false}});
  /* bubbles follow the drawn line itself (the scrubbed time), so they never appear before the line reaches their dot */
  const dots=$$('[data-a="pop"]',sec);groups.forEach(g=>{const d=dots.slice().sort((a,b)=>Math.abs(+a.dataset.t-g.t)-Math.abs(+b.dataset.t-g.t))[0];if(!d)return;
    const r=document.createElement('i');r.className='rip';sec.appendChild(r);g.rip=r;g.dot=d});
  tl.eventCallback('onUpdate',()=>{const now=tl.time();groups.forEach(g=>{const want=now>=g.t;if(want!==g.on){g.on=want;
      if(want&&g.rip){g.rip.style.left=(g.dot.offsetLeft+g.dot.offsetWidth/2)+'px';g.rip.style.top=(g.dot.offsetTop+g.dot.offsetHeight/2)+'px';g.rip.classList.remove('go');void g.rip.offsetWidth;g.rip.classList.add('go')}
      gsap.to(g.w,want?{opacity:1,y:0,duration:.6,ease:'power3.out',overwrite:true}:{opacity:0,y:18,duration:.25,ease:'power2.in',overwrite:true})}})});
  ScrollTrigger.create({trigger:sec,start:'top top',end:()=>'+='+innerHeight*1.6,pin:true,pinSpacing:true,scrub:.5,animation:tl})};

/* headers */
$$('.hh').forEach(h=>!h.closest('.st-top')&&gsap.fromTo(h.children,{opacity:0,y:40},{opacity:1,y:0,stagger:.12,ease:'none',scrollTrigger:{trigger:h,start:'top 95%',end:'top 45%',scrub:.6}}));

/* ---------- hypothesis: column by column, left to right ---------- */
/* hypothesis: one hypothesis at a time — what we assumed → what we heard → what it became; then the three merge into the final one */
$$('.hgrid').forEach(g=>{const sec=g.closest('section'),fin=g.parentElement.querySelector('.hfin');sec.classList.add('scr');
  const kids=[...g.children],steps=document.createElement('div'),rows=document.createElement('div');steps.className='hsteps';rows.className='hrows';
  kids.slice(0,5).forEach(k=>steps.appendChild(k));const R=[];
  for(let i=5;i<kids.length;i+=5){const r=document.createElement('div');r.className='hrow';kids.slice(i,i+5).forEach(k=>r.appendChild(k));rows.appendChild(r);R.push(r)}
  const dots=document.createElement('ol');dots.className='hdots';dots.innerHTML=R.map((_,i)=>`<li>H${i+1}</li>`).join('')+'<li>FINAL</li>';
  g.append(steps,rows);rows.appendChild(fin);g.parentElement.appendChild(dots);
  const tl=gsap.timeline({paused:true}),marks=[];gsap.set([...R,fin],{autoAlpha:0});
  tl.fromTo(steps.children,{opacity:0,y:20},{opacity:1,y:0,stagger:.08,duration:.4,ease:'power3.out'},0);
  R.forEach((r,i)=>{const [c0,a1,c2,a3,c4]=r.children,hl=c2.querySelectorAll('.ko b');marks.push(tl.duration());
    tl.set(r,{autoAlpha:1})
      .fromTo(c0,{opacity:0,x:-80,filter:'blur(10px)'},{opacity:1,x:0,filter:'blur(0px)',duration:.6,ease:'power3.out'})
      .fromTo(a1,{opacity:0,x:-20},{opacity:1,x:0,duration:.25},'>-.1')
      .fromTo(c2,{opacity:0,y:50,filter:'blur(10px)'},{opacity:1,y:0,filter:'blur(0px)',duration:.6,ease:'power3.out'},'>-.1')
      .fromTo(hl,{'--hl':0},{'--hl':1,duration:.5,ease:'power2.inOut'},'>-.1')
      .to(c0,{opacity:.45,duration:.4},'<')
      .fromTo(c0.querySelector('p:last-child'),{'--st':0},{'--st':1,duration:.5,ease:'power2.inOut'},'<')
      .fromTo(a3,{opacity:0,x:-20},{opacity:1,x:0,duration:.25},'>-.1')
      .fromTo(c4,{opacity:0,scale:.8,x:60,filter:'blur(12px)'},{opacity:1,scale:1,x:0,filter:'blur(0px)',duration:.7,ease:'power3.out'},'>-.1')
      .to({},{duration:.8})
      .to([c0,a1,c2,a3],{opacity:0,y:-40,stagger:.04,duration:.4,ease:'power2.in'})
      .to(c4,{opacity:0,y:120,scale:.5,duration:.5,ease:'power2.in'},'<.1').set(r,{autoAlpha:0})});
  marks.push(tl.duration());
  tl.to(steps,{opacity:0,y:-20,duration:.3},'<-.3')
    .fromTo(fin,{autoAlpha:0,scale:.7,filter:'blur(14px)'},{autoAlpha:1,scale:1,filter:'blur(0px)',duration:.8,ease:'power3.out'},'>-.1')
    .to({},{duration:.8});
  sec._hyp={tl,marks,on:i=>$$('li',dots).forEach((d,j)=>{d.classList.toggle('on',j===i);d.classList.toggle('done',j<i)})}});

/* ---------- solution: today fails step by step, olways lands ---------- */
$$('.so .scard').forEach((cd,ci)=>{const tl=gsap.timeline({paused:true});cd._tl=tl;
  let t=.2;
  /* each lane is walked by a small wheelchair marker: today it reaches the step, bumps, and has to go home; olways goes straight through */
  cd.querySelectorAll('.lane').forEach(l=>{const ok=l.classList.contains('lo'),segs=[...l.querySelectorAll('.seg')],mk=l.querySelector('.mk'),em=l.querySelector('em');
    const trv=document.createElement('i');trv.className='trv'+(ok?' ok':'');trv.innerHTML='<b>♿</b>';l.appendChild(trv);
    let back=null;if(!ok){back=document.createElement('i');back.className='trl';back.innerHTML='<span>↩ 다시 집으로</span>';l.appendChild(back)}
    const X=e=>e.offsetLeft,W=e=>e.offsetWidth;
    tl.fromTo(l.querySelector('.k'),{opacity:0,x:-10},{opacity:1,x:0,duration:.3},t);t+=.2;
    tl.fromTo(segs,{opacity:0,scaleX:0,transformOrigin:'0% 50%'},{opacity:1,scaleX:1,duration:.35,stagger:.12,ease:'power2.out'},t);
    tl.fromTo(trv,{opacity:0,x:()=>X(segs[0])-10},{opacity:1,x:()=>X(segs[0])-10,duration:.2},t);t+=.35;
    if(!ok){
      const last=segs[segs.length-1];
      tl.to(trv,{x:()=>X(last)+W(last)-18,duration:1.5,ease:'power1.inOut'},t);t+=1.5;
      tl.to(trv,{x:'+=7',duration:.07,repeat:5,yoyo:true,ease:'none'},t);
      tl.fromTo(mk,{opacity:0,scale:0},{opacity:1,scale:1,duration:.45,ease:'expo.out'},t);
      tl.to(segs,{x:3,duration:.06,repeat:5,yoyo:true,ease:'none'},t+.05);
      tl.to(trv,{'--bad':1,duration:.2},t);t+=.5;
      tl.fromTo(back,{opacity:1,clipPath:'inset(0 0 0 100%)',left:()=>X(segs[0])+'px',width:()=>(X(last)+W(last)-X(segs[0]))+'px'},{clipPath:'inset(0 0 0 0%)',duration:1.1,ease:'power1.inOut'},t);
      tl.to(trv,{x:()=>X(segs[0])-10,duration:1.1,ease:'power1.inOut'},t);
      tl.fromTo(em,{opacity:0,x:-8},{opacity:1,x:0,duration:.35},t+.6);t+=1.3}
    else{
      tl.to(trv,{x:()=>X(mk)-4,duration:1.4,ease:'power2.inOut'},t);t+=1.35;
      tl.fromTo(mk,{opacity:0,scale:0},{opacity:1,scale:1,duration:.6,ease:'expo.out'},t);
      tl.to(trv,{opacity:0,duration:.25},t+.1);
      tl.fromTo(em,{opacity:0,x:-8},{opacity:1,x:0,duration:.35},t+.2);t+=.7}})});

/* ---- initial hypothesis: H0 splits into three branches, each problem turns into its hypothesis ---- */
$$('#s06inithyp .ihx').forEach(ih=>{const sec=ih.closest('section'),tl=gsap.timeline({paused:true});const ps=$$('.ihl path',ih);
  ps.forEach(p=>{const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L});
  tl.fromTo(ih.querySelector('.ih0'),{opacity:0,y:30,scale:.96},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out'},0)
    .to(ps,{strokeDashoffset:0,duration:.7,stagger:.08,ease:'power2.inOut'},.6);
  $$('.ihk',ih).forEach((k,i)=>{const t=1.1+i*.55;
    tl.fromTo(k.querySelector('.ihh'),{opacity:0,y:-16,scale:.9},{opacity:1,y:0,scale:1,duration:.45,ease:'expo.out'},t)
      .fromTo(k.querySelector('.ihp'),{opacity:0,y:24},{opacity:1,y:0,duration:.5,ease:'power3.out'},t+.2)
      .fromTo(k.querySelector('.iha s'),{scaleY:0},{scaleY:1,duration:.35,ease:'power2.inOut'},t+.55)
      .fromTo(k.querySelector('.ihy'),{opacity:0,scale:.85,filter:'blur(8px)'},{opacity:1,scale:1,filter:'blur(0px)',duration:.6,ease:'expo.out'},t+.8)});
  (sec._tls||(sec._tls=[])).push(tl)});
/* ---- positioning map: after it is drawn, the brands drift and olways keeps pulsing in its empty corner ---- */
$$('#s04opp').forEach(sec=>{const tl=TL['2616:37385'],hero=document.getElementById('f2616-37405');if(!tl||!hero)return;
  const ring=document.createElement('i');ring.className='oring';hero.parentElement.appendChild(ring);
  const place=()=>{ring.style.left=(hero.offsetLeft+hero.offsetWidth/2)+'px';ring.style.top=(hero.offsetTop+hero.offsetHeight/2)+'px'};place();addEventListener('resize',place);
  const logos=$$('[data-a="pop"]',sec).filter(e=>e!==hero&&e.tagName==='IMG');let fl=[];
  tl.eventCallback('onComplete',()=>{ring.classList.add('on');fl=logos.map((e,i)=>gsap.to(e,{y:(i%2?-1:1)*(3+i%3*2),x:(i%3-1)*3,duration:2.2+(i%4)*.4,repeat:-1,yoyo:true,ease:'sine.inOut'}))});
  tl.eventCallback('onReverseComplete',()=>{ring.classList.remove('on');fl.forEach(f=>f.kill())})});
/* ---------- chapter cards: where you are in the story, and the question the next part answers ---------- */
const mkChap=sec=>{const ch=sec.querySelector('.ch'),arc=ch.querySelector('.arc');
  const pc=edge(nbr(sec,-1),true),nc=edge(nbr(sec,1),false);
  const tl=gsap.timeline({scrollTrigger:{trigger:sec,start:'top top',end:()=>'+='+innerHeight*1.6,pin:true,pinSpacing:true,scrub:.8}});
  tl.fromTo(sec,{backgroundColor:pc},{backgroundColor:'#0A0D12',duration:.45,ease:'power1.inOut'},0)
    .fromTo(arc,{yPercent:30,opacity:0},{yPercent:0,opacity:1,duration:.8,ease:'power2.out'},0)
    .fromTo(ch.querySelector('.ck'),{opacity:0,y:16},{opacity:1,y:0,duration:.3},.25)
    .fromTo(ch.querySelector('.cq span'),{yPercent:105},{yPercent:0,duration:.5,ease:'power3.out'},.35)
    .fromTo(ch.querySelector('.ce'),{opacity:0},{opacity:1,duration:.3},.65)
    .fromTo(ch.querySelectorAll('.cs li'),{opacity:0,y:18},{opacity:1,y:0,stagger:.1,duration:.3,ease:'power3.out'},.8)
    .fromTo(ch.querySelectorAll('.spine li'),{opacity:0},{opacity:1,stagger:.04,duration:.2},.8)
    .to({},{duration:.5})
    .to(arc,{yPercent:-60,scale:1.6,opacity:0,duration:.8,ease:'power2.in'})
    .to(sec,{backgroundColor:nc,duration:.6,ease:'power1.inOut'},'<.25')
    .to([ch.querySelector('.ck'),ch.querySelector('.cq'),ch.querySelector('.ce'),ch.querySelector('.cs'),ch.querySelector('.spine')],{opacity:0,y:-40,stagger:.03,duration:.45,ease:'power2.in'},'<')};
const edge=(el,last)=>{if(!el)return '#F4F5F7';const c=getComputedStyle(el);const m=(c.backgroundImage||'').match(/rgba?\([^)]+\)|#[0-9a-fA-F]{3,6}/g);
  if(m&&m.length)return last?m[m.length-1]:m[0];return c.backgroundColor==='rgba(0, 0, 0, 0)'?'#F4F5F7':c.backgroundColor};
const secOf=el=>el.closest('#main > section')||el;
const nbr=(sec,d)=>{const all=$$('#main > section');const i=all.indexOf(sec);return all[i+d]};
/* solution: one card at a time is in focus; its lanes play — today bumps and turns back, olways goes through */
const mkSol=sx=>{const cards=$$('.scard',sx);
  const tl=gsap.timeline();
  cards.forEach((c,i)=>{if(i)tl.to(cards[i-1],{opacity:0,xPercent:-60,scale:.92,filter:'blur(6px)',duration:.8,ease:'power2.inOut'});
    tl.fromTo(c,{opacity:0,xPercent:60,scale:.92,filter:'blur(6px)'},{opacity:1,xPercent:0,scale:1,filter:'blur(0px)',duration:.8,ease:'power2.inOut'},i?'<':0);
    if(c._tl){c._tl.paused(false);tl.add(c._tl.progress(0),'>')}tl.to({},{duration:.5})});
  ScrollTrigger.create({trigger:sx,start:'top top',end:()=>'+='+innerHeight*Math.max(2,tl.duration()*.3),pin:true,pinSpacing:true,scrub:.6,animation:tl,invalidateOnRefresh:true})};
/* data loop: a light keeps travelling round the ring once it is drawn */
$$('#s15loop').forEach(sec=>{const ring=sec.querySelector('[data-a="ring"]');if(!ring)return;const orb=document.createElement('i');orb.className='orb';ring.parentElement.appendChild(orb);
  const put=()=>{orb.style.left=ring.offsetLeft+'px';orb.style.top=ring.offsetTop+'px';orb.style.width=ring.offsetWidth+'px';orb.style.height=ring.offsetHeight+'px'};put();addEventListener('resize',put);addEventListener('load',put);
  (sec._tls||(sec._tls=[])).push(gsap.timeline({paused:true}).fromTo(orb,{opacity:0},{opacity:1,duration:.5},1.6))});
/* pins are created in page order */
$$('.chap:not(#sc4), .story, .big, .pinfit:not(#s15loop), #s05journey, .so2').forEach(el=>{if(el.classList.contains('chap'))return mkChap(el);if(el.classList.contains('so')&&el.classList.contains('big'))return mkSo(el);if(el.classList.contains('so2'))return mkSol(el);
  if(el.classList.contains('story'))mkStory(el);else if(el.classList.contains('big'))mkBig(el);else if(el.id==='s05journey')mkJourney(el);else mkFit(el)});
/* usability test setup cards */
/* usability-test setup cards tip up into place like cards being dealt */
$$('.ut .usetup').forEach(u=>gsap.fromTo($$('.ucard',u),{opacity:0,y:120,rotateX:-50,scale:.86,transformPerspective:900,transformOrigin:'50% 100%',filter:'blur(8px)'},{opacity:1,y:0,rotateX:0,scale:1,filter:'blur(0px)',stagger:.18,ease:'power2.out',scrollTrigger:{trigger:u,start:'top 96%',end:'top 38%',scrub:.6}}));
/* ---- usability test: the screen slides to the next version, the changed spot is circled, then its close-up opens ---- */
$$('.ux').forEach(ux=>{const figs=$$('.xf',ux),zs=$$('.xz',ux),tabs=$$('.xt',ux),bar=ux.querySelector('.xbar em'),n=figs.length;
  const intro=[ux.querySelector('.xh'),ux.querySelector('.xtabs'),ux.querySelector('.xps'),...$$('.xq',ux),...$$('.xside>.xwhy',ux)].filter(Boolean);
  gsap.set([...figs,...zs],{autoAlpha:0});const tl=gsap.timeline(),marks=[];
  tl.fromTo(intro,{opacity:0,y:36},{opacity:1,y:0,stagger:.08,duration:.5,ease:'power3.out'},0);
  figs.forEach((f,i)=>{const z=zs.find(x=>x.dataset.i===f.dataset.i),zr=f.querySelector('.zr'),img=f.querySelector('.xi img');
    if(i){const pf=figs[i-1],pz=zs.find(x=>x.dataset.i===pf.dataset.i);
      tl.to(pf,{autoAlpha:0,xPercent:-18,scale:.94,filter:'blur(6px)',duration:.6,ease:'power2.inOut'});if(pz)tl.to(pz,{autoAlpha:0,y:-24,duration:.4,ease:'power2.in'},'<')}
    marks.push(tl.duration()-(i?.3:0));
    tl.fromTo(f,{autoAlpha:0,xPercent:i?22:0,y:i?0:50,scale:1.05,filter:'blur(8px)'},{autoAlpha:1,xPercent:0,y:0,scale:1,filter:'blur(0px)',duration:.8,ease:'power3.out'},i?'<.15':.2)
      .to(bar,{scaleX:(i+1)/n,duration:.6,ease:'power2.inOut'},'<');
    if(zr)tl.fromTo(zr,{opacity:0,scale:2.2},{opacity:1,scale:1,duration:.5,ease:'power3.out'},'>-.1').fromTo(img,{scale:1},{scale:1.06,transformOrigin:()=>`${parseFloat(zr.style.left)+parseFloat(zr.style.width)/2}% ${parseFloat(zr.style.top)+parseFloat(zr.style.height)/2}%`,duration:.9,ease:'power2.inOut'},'<');
    if(z)tl.fromTo(z,{autoAlpha:0,y:40},{autoAlpha:1,y:0,duration:.5,ease:'power3.out'},'>-.6').fromTo(z.querySelectorAll('li'),{opacity:0,x:24},{opacity:1,x:0,stagger:.15,duration:.4,ease:'power3.out'},'>-.2');
    tl.to({},{duration:.8})});
  scrubScene(ux,tl,marks,i=>tabs.forEach((t,j)=>{t.classList.toggle('on',j===i);t.classList.toggle('done',j<i)}),.3);
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
/* ---- lens: S1 → S5 as one take; each scene pushes the last one back, the rail fills with the scroll ---- */
$$('.lx').forEach(lx=>{const ms=$$('.lxm',lx),cs=$$('.lxc',lx),rail=$$('.lxrail li',lx);
  gsap.set([...ms,...cs],{autoAlpha:0});const tl=gsap.timeline(),marks=[];
  ms.forEach((m,i)=>{if(i){tl.to(ms[i-1],{autoAlpha:0,yPercent:-14,scale:.86,filter:'blur(8px)',duration:.7,ease:'power2.inOut'}).to(cs[i-1],{autoAlpha:0,y:-30,duration:.4,ease:'power2.in'},'<')}
    marks.push(Math.max(0,tl.duration()-.35));
    tl.fromTo(m,{autoAlpha:0,yPercent:28,scale:.9,filter:'blur(8px)'},{autoAlpha:1,yPercent:0,scale:1,filter:'blur(0px)',duration:.8,ease:'power3.out'},i?'<.2':0)
      .set(cs[i],{autoAlpha:1},'<.2').fromTo(cs[i].children,{opacity:0,y:30},{opacity:1,y:0,stagger:.1,duration:.5,ease:'power3.out'},'<')
      .fromTo(rail[i].querySelector('em'),{scaleX:0},{scaleX:1,duration:2.2,ease:'none'},'<')});
  scrubScene(lx,tl,marks,i=>{rail.forEach((l,j)=>{l.classList.toggle('on',j===i);l.classList.toggle('done',j<i)});
    ms.forEach((m,j)=>{const v=m.querySelector('video');if(j===i){v.currentTime=0;v.play().catch(()=>{})}else v.pause()})},.34);
  rail.forEach((l,k)=>l.onclick=()=>lx._go&&lx._go(k))});

/* ---- anatomy / pass: a spotlight travels across the screen from one element to the next ---- */
const mkShot=sx=>{const sh=sx.querySelector('.ashot'),sp=sh.querySelector('.spot'),bd=$$('.bdg',sh),cr=$$('.acard',sx);
  const tl=gsap.timeline(),marks=[];gsap.set(sp,{'--sx':bd[0].style.left,'--sy':bd[0].style.top});
  tl.fromTo(sh,{opacity:0,y:60,scale:.94},{opacity:1,y:0,scale:1,duration:.7,ease:'power3.out'},0)
    .fromTo(cr,{opacity:0,x:40},{opacity:1,x:0,stagger:.06,duration:.4,ease:'power3.out'},.3);
  bd.forEach((b,k)=>{if(k)tl.to(sp,{'--sx':b.style.left,'--sy':b.style.top,duration:.7,ease:'power2.inOut'});marks.push(tl.duration()-(k?.35:0));
    tl.fromTo(b,{scale:1},{scale:1.35,duration:.25,yoyo:true,repeat:1,ease:'power2.out'},'>-.1').to({},{duration:.9})});
  scrubScene(sx,tl,marks,k=>{sp.classList.add('on');bd.forEach((x,j)=>x.classList.toggle('on',j===k));cr.forEach((c,j)=>{c.classList.toggle('on',j===k);c.classList.toggle('seen',j<k)})},.3);
  $$('.bdg,.acard',sx).forEach(b=>b.onclick=()=>sx._go&&sx._go(+b.dataset.i))};
/* field-of-view: reasoning first, then the lens grows to the whole screen while its zones stay drawn */
const mkFov=sx=>{const z=$$('.fovz .z',sx),hz=sx.querySelector('.hz'),shot=sx.querySelector('.fovshot'),t=sx.querySelector('.fovt'),fit=sx.querySelector('.fit');
  const G=()=>{const o=gsap.getProperty(shot,'scale'),ox=gsap.getProperty(shot,'x');gsap.set(shot,{scale:1,x:0});const a=shot.getBoundingClientRect(),f=fit.getBoundingClientRect();gsap.set(shot,{scale:o,x:ox});
    const pad=parseFloat(getComputedStyle(fit).paddingLeft)||0,w=f.width-pad*2,s=Math.min(w/a.width,(innerHeight-90)/a.height);return {s,x:f.left+pad+(w-a.width*s)/2-a.left}};
  const tl=gsap.timeline();
  tl.fromTo(t.children,{opacity:0,y:30},{opacity:1,y:0,stagger:.1,duration:.5,ease:'power3.out'},0)
    .fromTo(shot,{opacity:0,scale:.92},{opacity:1,scale:1,duration:.7,ease:'power3.out'},0)
    .fromTo(hz,{opacity:0,scaleX:0},{opacity:1,scaleX:1,duration:.6,ease:'power2.inOut'},.5)
    .fromTo(z,{opacity:0,scale:.9},{opacity:1,scale:1,stagger:.3,duration:.5,ease:'power3.out'},.8)
    .to({},{duration:.6})
    .to(t,{opacity:0,x:-120,duration:.6,ease:'power2.in'})
    .to(shot,{x:()=>G().x,scale:()=>G().s,transformOrigin:'0 50%',duration:1,ease:'power3.inOut'},'<')
    .to({},{duration:.9});
  scrubScene(sx,tl,[0],null,.3)};
$$('.sx.an1, .sx.an2, .sx.pj1').forEach(sx=>sx.classList.contains('an2')?mkFov(sx):mkShot(sx));

/* ---- remaining in-place animations become soft scenes ---- */
Object.entries(TL).forEach(([g,tl])=>{const el=document.getElementById('f'+g.replace(':','-'))||$(`[data-g="${g}"]`);
  return;
  const sec=el.closest('section'),els=$$(`[data-g="${g}"]`,sec);
  /* the group's box: from its first to its last mark */
  const box=document.createElement('i');box.className='gbox';sec.appendChild(box);
  const R=()=>{let t=1e9,b=-1e9;const st=sec.getBoundingClientRect().top;els.forEach(e=>{const r=e.getBoundingClientRect();if(r.height){t=Math.min(t,r.top-st);b=Math.max(b,r.bottom-st)}});box.style.top=t+'px';box.style.height=Math.max(1,b-t)+'px'};
  R();addEventListener('resize',R);addEventListener('load',R);soft(box,tl)});

/* ---------- callmelord-style shutter reveals + headline masks ---------- */
$$('.lsplit .lvid, .hp .lvid').forEach(v=>{const m=v.querySelector('video');
  gsap.fromTo(v,{clipPath:'inset(0% 50% 0% 50% round 20px)'},{clipPath:'inset(0% 0% 0% 0% round 20px)',ease:'power3.inOut',duration:1.2,scrollTrigger:ST(v,'top 80%')});
  m&&gsap.fromTo(m,{scale:1.25},{scale:1,ease:'power3.out',duration:1.6,scrollTrigger:ST(v,'top 80%')})});
$$('.hh .htitle, .fx .fsv').forEach(t=>!t.closest('.st-top')&&gsap.fromTo(t,{clipPath:'inset(0 0 100% 0)',y:40},{clipPath:'inset(0 0 -10% 0)',y:0,ease:'none',scrollTrigger:{trigger:t,start:'top 96%',end:'top 60%',scrub:.6}}));

/* ---------- headers: words light up one by one as you scroll (scrubbed) ---------- */
$$('.hh .hsub, [data-wr]').forEach(el=>{if(el.dataset.done||el.closest('.big,.st-top'))return;el.dataset.done=1;
  const walk=n=>{[...n.childNodes].forEach(ch=>{if(ch.nodeType===3){const f=document.createDocumentFragment();
      ch.textContent.split(/(\s+)/).forEach(w=>{if(!w)return;if(/^\s+$/.test(w))f.appendChild(document.createTextNode(w));else{const s=document.createElement('span');s.className='wr';s.textContent=w;f.appendChild(s)}});
      ch.replaceWith(f)}else if(ch.nodeType===1)walk(ch)})};
  walk(el);gsap.to(el.querySelectorAll('.wr'),{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:el,start:'top 82%',end:'top 42%',scrub:.4}})});

$$('#sc4').forEach(mkChap);
$$('#s15loop').forEach(mkFit);
$$('#s16concl, #s17thanks').forEach(sec=>{const bs=$$('.b',sec),th=sec.id==='s17thanks';
  const tl=gsap.timeline({scrollTrigger:th?{trigger:sec,start:'top 95%',end:'bottom bottom',scrub:.7}:{trigger:sec,start:'center center',end:()=>'+='+innerHeight*1.4,pin:true,pinSpacing:true,scrub:.7}});
  if(th)tl.fromTo(bs,{opacity:0,scale:2.4,filter:'blur(18px)'},{opacity:1,scale:1,filter:'blur(0px)',stagger:.15,duration:1,ease:'power3.out'},0);
  else tl.fromTo(bs,{opacity:0,y:140,rotateX:-60,scale:.8,transformPerspective:900,transformOrigin:'50% 100%',filter:'blur(10px)'},{opacity:1,y:0,rotateX:0,scale:1,filter:'blur(0px)',stagger:.14,duration:.7,ease:'power3.out'},0);
  tl.to({},{duration:.5})});
ScrollTrigger.getAll().filter(t=>t.pin).forEach(t=>{const el=t.pin,sp=el.parentElement;
  const inner=el.querySelector(':scope > .fit, :scope > .st-stage, :scope > .tstage, :scope > .sow');if(!inner||!sp||!sp.classList.contains('pin-spacer'))return;
  gsap.fromTo(inner,{scale:.93,opacity:.3,y:70},{scale:1,opacity:1,y:0,ease:'none',scrollTrigger:{trigger:sp,start:'top bottom',end:'top top',scrub:true}});
  gsap.fromTo(inner,{scale:1,opacity:1,y:0},{scale:.94,opacity:.2,y:-60,ease:'none',immediateRender:false,scrollTrigger:{trigger:sp,start:'bottom bottom',end:'bottom top',scrub:true}})});
const seam=()=>$$('.pin-spacer').forEach(sp=>{const el=sp.firstElementChild;if(!el)return;const c=getComputedStyle(el.tagName==='SECTION'?el:el.closest('section')||el);sp.style.backgroundColor=c.backgroundColor;sp.style.backgroundImage=c.backgroundImage});
const refit=()=>{seam();fitAll();fitCards();fitIv();ScrollTrigger.refresh()};addEventListener('load',refit);document.fonts&&document.fonts.ready.then(refit);
})();