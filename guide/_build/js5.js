/* hand-built section headers settle in */
$$('.hx > .hdr').forEach(h=>gsap.fromTo(h,{opacity:0,y:50},{opacity:1,y:0,duration:1.1,ease:'power3.out',scrollTrigger:ST(h,'top 92%')}));

/* interview: each chart draws one mark at a time, then the quotes slide in */
$$('.iv .ig').forEach(g=>{
  const ih=g.querySelector('.ih'),box=g.querySelector('.cbox'),qc=g.querySelector('.qcard');
  gsap.fromTo(ih.children,{opacity:0,y:24},{opacity:1,y:0,duration:.7,stagger:.1,ease:'power3.out',scrollTrigger:ST(ih,'top 90%')});
  const ps=[...box.querySelectorAll('.pc')].sort((a,b)=>a.dataset.o-b.dataset.o);gsap.set(ps,{opacity:0});
  const tl=gsap.timeline({scrollTrigger:{trigger:box,start:'top 68%',toggleActions:'play none none reverse'}});
  tl.fromTo(box,{opacity:0,y:40},{opacity:1,y:0,duration:.6,ease:'power3.out'},0);
  let t=.55;
  ps.forEach((p,i)=>{const last=i===ps.length-1,k=p.classList;
    if(k.contains('barh')){tl.fromTo(p,{opacity:1,clipPath:'inset(-30px 100% -30px 0)'},{clipPath:'inset(-30px 0% -30px 0)',duration:last?.9:.7,ease:'power2.inOut'},t);t+=last?1:.8}
    else if(k.contains('barv')){tl.fromTo(p,{opacity:1,clipPath:'inset(100% -30px 0 -30px)'},{clipPath:'inset(0% -30px 0 -30px)',duration:last?.85:.65,ease:'power2.inOut'},t);t+=last?.95:.75}
    else{tl.fromTo(p,{opacity:0,scale:.2},{opacity:1,scale:1,duration:last?.9:.6,ease:last?'elastic.out(1,.6)':'back.out(2)'},t);t+=last?.9:.5}});
  const lp=ps[ps.length-1];if(lp)tl.fromTo(lp,{filter:'brightness(1)'},{filter:'brightness(1.12)',duration:.35,yoyo:true,repeat:1,ease:'sine.inOut'},t-.1);
  tl.fromTo(qc,{opacity:0,x:60},{opacity:1,x:0,duration:.8,ease:'power3.out'},.35);
  tl.fromTo(qc.querySelectorAll('.qt'),{opacity:0,y:16},{opacity:1,y:0,duration:.5,stagger:.25,ease:'power2.out'},.7);
});
$$('.iv .ban').forEach(el=>gsap.fromTo(el,{opacity:0,scale:.85,filter:'blur(10px)'},{opacity:1,scale:1,filter:'blur(0px)',duration:1.1,ease:'expo.out',scrollTrigger:ST(el,'top 85%')}));

/* hypothesis: built column by column, left to right, one card at a time */
$$('.hgrid').forEach(g=>{const tl=gsap.timeline({scrollTrigger:{trigger:g,start:'top 70%',toggleActions:'play none none reverse'}});let t=0;
  for(let c=0;c<5;c++){const els=[...g.querySelectorAll(`[data-c="${c}"]`)];
    if(c%2){tl.fromTo(els,{opacity:0,x:-14},{opacity:1,x:0,duration:.25,stagger:.05,ease:'power2.out'},t);t+=.2+.05*els.length}
    else{tl.fromTo(els,{opacity:0,scale:.88,x:-24},{opacity:1,scale:1,x:0,duration:.45,stagger:.12,ease:'back.out(1.7)'},t);t+=.3+.12*els.length}}
  const f=g.parentElement.querySelector('.hfin');tl.fromTo(f,{opacity:0,scale:.86,filter:'blur(10px)'},{opacity:1,scale:1,filter:'blur(0px)',duration:1,ease:'expo.out'},t+.1);
});

/* solution: today's path pops step by step and fails; then olways' path pops and lands */
$$('.so .scard').forEach((cd,ci)=>{const tl=gsap.timeline({scrollTrigger:{trigger:cd,start:'top 72%',toggleActions:'play none none reverse'}});
  tl.fromTo(cd,{opacity:0,y:60,rotateX:18,transformPerspective:900,transformOrigin:'50% 100%'},{opacity:1,y:0,rotateX:0,duration:.9,ease:'power3.out'},ci*.15);
  let t=.6+ci*.15;
  cd.querySelectorAll('.lane').forEach(l=>{const ok=l.classList.contains('lo');
    tl.fromTo(l.querySelector('.k'),{opacity:0,x:-10},{opacity:1,x:0,duration:.3},t);t+=.2;
    l.querySelectorAll('.seg').forEach(sg=>{tl.fromTo(sg,{opacity:0,scale:.5},{opacity:1,scale:1,duration:.45,ease:'back.out(2.4)'},t);t+=.28});
    const mk=l.querySelector('.mk'),em=l.querySelector('em');
    tl.fromTo(mk,{opacity:0,scale:0},{opacity:1,scale:1,duration:.5,ease:ok?'elastic.out(1,.5)':'back.out(3)'},t);
    if(!ok)tl.to(l.querySelectorAll('.seg,.mk'),{x:4,duration:.06,repeat:5,yoyo:true,ease:'none'},t+.25);
    tl.fromTo(em,{opacity:0,x:-8},{opacity:1,x:0,duration:.35},t+.2);t+=.6;});
});

/* usability test: the screen stays put while rounds switch — As Is 1 → As Is 2 → To Be */
$$('.ut .ui').forEach(ui=>{const n=+ui.dataset.n,pin=ui.querySelector('.upin'),vv=[...ui.querySelectorAll('.vv')],sb=[...ui.querySelectorAll('.sb')],ind=ui.querySelector('.seg3 .ind');let cur=-1;
  const set=i=>{if(i===cur)return;cur=i;vv.forEach((v,j)=>v.classList.toggle('on',j===i));sb.forEach((b,j)=>b.classList.toggle('on',j===i));
    const b=sb[i];ind.style.left=b.offsetLeft+'px';ind.style.width=b.offsetWidth+'px';ind.classList.toggle('tb',b.classList.contains('tb'));wob(ind)};
  set(0);
  const st=ScrollTrigger.create({trigger:pin,start:'top top',end:()=>'+='+innerHeight*.9*(n-1),pin:true,pinSpacing:true,
    snap:{snapTo:v=>Math.round(v*(n-1))/(n-1),duration:{min:.2,max:.5},ease:'power1.inOut',delay:.08},
    onUpdate:s=>set(Math.min(n-1,Math.round(s.progress*(n-1))))});
  sb.forEach((b,i)=>b.onclick=()=>window.scrollTo({top:st.start+(st.end-st.start)*i/(n-1),behavior:'smooth'}));
  const hd=ui.querySelector('.uh');gsap.fromTo(hd.children,{opacity:0,y:30},{opacity:1,y:0,duration:.8,stagger:.12,ease:'power3.out',scrollTrigger:ST(hd,'top 88%')});
  gsap.fromTo(ui.querySelector('.stage'),{scale:.86,borderRadius:'60px'},{scale:1,borderRadius:'calc(var(--u)*32)',ease:'none',scrollTrigger:{trigger:pin,start:'top 95%',end:'top top',scrub:.5}});
  ui.querySelectorAll('.why,.ups,.uq').forEach((el,i)=>gsap.fromTo(el,{opacity:0,y:50},{opacity:1,y:0,duration:.9,ease:'power3.out',scrollTrigger:ST(el,'top 90%')}));
});

/* through the lens: full-screen scenes grow out of a card; the middle scenes run sideways */
$$('.lfull').forEach(f=>{const lv=f.querySelector('.lv');
  gsap.fromTo(lv,{scale:.72,borderRadius:'48px'},{scale:1,borderRadius:'0px',ease:'none',scrollTrigger:{trigger:f,start:'top 90%',end:'top top',scrub:.5}});
  gsap.fromTo(f.querySelector('.lcap'),{y:40,opacity:0},{y:0,opacity:1,duration:.9,ease:'power3.out',scrollTrigger:ST(f.querySelector('.lsheet'),'top 80%')});});
$$('.hwrap').forEach(w=>{const tr=w.querySelector('.htrack'),dots=[...w.querySelectorAll('.hdots i')],ps=[...tr.children];const dist=()=>Math.max(0,tr.scrollWidth-innerWidth);
  dots[0]&&dots[0].classList.add('on');
  gsap.to(tr,{x:()=>-dist(),ease:'none',scrollTrigger:{trigger:w,start:'top top',end:()=>'+='+dist()*1.2,pin:true,scrub:.6,invalidateOnRefresh:true,
    snap:{snapTo:1/(ps.length-1),duration:{min:.2,max:.6},delay:.08,ease:'power1.inOut'},
    onUpdate:s=>{const i=Math.round(s.progress*(ps.length-1));dots.forEach((d,j)=>d.classList.toggle('on',j===i))}}});
});
