const SEC='__SEC__';
const sec=await figma.getNodeByIdAsync(SEC);
const ox=sec.absoluteBoundingBox.x, oy=sec.absoluteBoundingBox.y;
const r2=v=>Math.round(v*100)/100;
const col=(c,a)=>{a=(a===undefined?1:a);const h='#'+[c.r,c.g,c.b].map(v=>Math.round(v*255).toString(16).padStart(2,'0')).join('');return a<0.999?`rgba(${[c.r,c.g,c.b].map(v=>Math.round(v*255)).join(',')},${r2(a)})`:h};
function grad(p,w,h){
  const m=p.gradientTransform;const a=m[0][0],b=m[0][1],c=m[0][2],d=m[1][0],e=m[1][1],f=m[1][2];
  const det=a*e-b*d;const inv=(u,v)=>{const x=(e*(u-c)-b*(v-f))/det,y=(-d*(u-c)+a*(v-f))/det;return [x*w,y*h]};
  const s=inv(0,0.5),t=inv(1,0.5);const dx=t[0]-s[0],dy=t[1]-s[1];const D=Math.hypot(dx,dy)||1;
  const op=p.opacity===undefined?1:p.opacity;
  if(p.type==='GRADIENT_LINEAR'){
    const ang=Math.atan2(dx,-dy);const ux=Math.sin(ang),uy=-Math.cos(ang);
    const L=Math.abs(w*Math.sin(ang))+Math.abs(h*Math.cos(ang));
    const ps=(s[0]-w/2)*ux+(s[1]-h/2)*uy+L/2;
    const st=p.gradientStops.map(g=>`${col(g.color,g.color.a*op)} ${r2((ps+g.position*D)/L*100)}%`).join(',');
    return `linear-gradient(${r2(ang*180/Math.PI)}deg,${st})`;
  }
  const rx=Math.hypot(dx,dy),q=inv(0.5,1);const ry=Math.hypot(q[0]-s[0]-(t[0]-s[0])/2,q[1]-s[1]-(t[1]-s[1])/2);
  const cx=(s[0]+t[0])/2,cy=(s[1]+t[1])/2;
  const st=p.gradientStops.map(g=>`${col(g.color,g.color.a*op)} ${r2(g.position*100)}%`).join(',');
  return `radial-gradient(${r2(rx/2)}px ${r2(ry)}px at ${r2(cx)}px ${r2(cy)}px,${st})`;
}
function fills(n,w,h){
  if(!('fills' in n)||!Array.isArray(n.fills))return '';
  return n.fills.filter(p=>p.visible!==false).slice().reverse().map(p=>{
    if(p.type==='SOLID'){const c=col(p.color,p.opacity);return `linear-gradient(${c},${c})`}
    if(p.type.startsWith('GRADIENT'))return grad(p,w,h);
    if(p.type==='IMAGE')return 'IMG';return ''}).filter(Boolean).join(',');
}
function fx(n){
  if(!('effects' in n))return '';const sh=[],o=[];
  for(const e of n.effects){if(e.visible===false)continue;
    if(e.type==='DROP_SHADOW'||e.type==='INNER_SHADOW')sh.push(`${e.type==='INNER_SHADOW'?'inset ':''}${r2(e.offset.x)}px ${r2(e.offset.y)}px ${r2(e.radius)}px ${r2(e.spread||0)}px ${col(e.color,e.color.a)}`);
    else if(e.type==='BACKGROUND_BLUR')o.push(`bb:${r2(e.radius)}`);else if(e.type==='LAYER_BLUR')o.push(`lb:${r2(e.radius)}`);}
  return (sh.length?'sh:'+sh.join(','):'')+(o.length?' '+o.join(' '):'');
}
function rad(n){if(n.type==='ELLIPSE')return '50%';if(!('cornerRadius' in n))return '0';
  if(typeof n.cornerRadius==='number')return r2(n.cornerRadius)+'';return [n.topLeftRadius,n.topRightRadius,n.bottomRightRadius,n.bottomLeftRadius].map(r2).join('/')}
function stroke(n){if(!('strokes' in n))return '';const s=n.strokes.filter(p=>p.visible!==false&&p.type==='SOLID');if(!s.length||!n.strokeWeight||typeof n.strokeWeight!=='number')return '';
  return `bd:${r2(n.strokeWeight)}px ${col(s[0].color,s[0].opacity)} ${n.strokeAlign[0]}${n.dashPattern&&n.dashPattern.length?' dash':''}`}
const bb=n=>{const b=n.absoluteBoundingBox;return [b.x-ox,b.y-oy,b.width,b.height].map(r2).join(',')};
const out=[];
function walk(n,d){
  if(!n.visible)return;
  const op=('opacity' in n&&n.opacity<1)?' op:'+r2(n.opacity):'';
  const bm=('blendMode' in n&&!['PASS_THROUGH','NORMAL'].includes(n.blendMode))?' bm:'+n.blendMode:'';
  if(n.type==='TEXT'){
    const segs=n.getStyledTextSegments(['fontName','fontSize','fills','lineHeight','letterSpacing']);
    const g=segs[0];const lh=g.lineHeight.unit==='PIXELS'?r2(g.lineHeight.value)+'px':g.lineHeight.unit==='PERCENT'?r2(g.lineHeight.value/100)+'':'n';
    const ls=g.letterSpacing.value?(g.letterSpacing.unit==='PERCENT'?r2(g.letterSpacing.value/100)+'em':r2(g.letterSpacing.value)+'px'):'0';
    const c0=g.fills[0]?col(g.fills[0].color,g.fills[0].opacity):'#000';
    const s=segs.map(q=>{const c=q.fills[0]?col(q.fills[0].color,q.fills[0].opacity):'';return (segs.length>1&&(q.fontName.style!==g.fontName.style||c!==c0||q.fontSize!==g.fontSize))?`{${q.fontName.style}|${c}|${q.fontSize}}${q.characters}{/}`:q.characters}).join('').replace(/\n/g,'⏎');
    out.push(`${g.fontName.family==='Dystopian'?'D':'T'} ${n.id} ${bb(n)} ${g.fontName.family}:${g.fontName.style}:${r2(g.fontSize)} lh:${lh} ls:${ls} ${c0} ${n.textAlignHorizontal[0]}${n.textAutoResize==='WIDTH_AND_HEIGHT'?' nw':''}${op} | ${s}`);return;
  }
  const w=n.width,h=n.height;
  if(['VECTOR','LINE','BOOLEAN_OPERATION','STAR','POLYGON'].includes(n.type)){out.push(`V ${n.id} ${bb(n)} ${n.type} ${n.name.slice(0,24)}${op}`);return}
  if(n.type==='INSTANCE'&&n.name.match(/icon|ic_|Icon|svg/)){out.push(`V ${n.id} ${bb(n)} ICON ${n.name.slice(0,24)}${op}`);return}
  const f=fills(n,w,h),e=fx(n),s=stroke(n);
  const clip=('clipsContent' in n&&n.clipsContent&&n.children&&n.children.length)?' clip':'';
  if(f.includes('IMG'))out.push(`I ${n.id} ${bb(n)} r:${rad(n)} ${n.name.slice(0,24)}${op}${e?' '+e:''}${s?' '+s:''}`);
  else if(f||e||s||clip)out.push(`B ${n.id} ${bb(n)} d${d} r:${rad(n)}${f?' bg:'+f:''}${e?' '+e:''}${s?' '+s:''}${op}${bm}${clip} ~${n.name.slice(0,20)}`);
  else if((n.type==='FRAME'||n.type==='GROUP')&&d<=3)out.push(`G ${n.id} ${bb(n)} d${d} ~${n.name.slice(0,20)}`);
  if('children' in n) for(const c of n.children) walk(c,d+1);
  if(clip)out.push(`/ ${n.id}`);
}
for(const c of sec.children) walk(c,1);
const sf=fills(sec,sec.width,sec.height);
return `S ${SEC} ${r2(sec.width)},${r2(sec.height)} bg:${sf}\n`+out.join('\n');
