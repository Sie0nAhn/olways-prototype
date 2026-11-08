import json, html, re
from secs5 import CUSTOM
B = json.load(open('/tmp/claude-0/v3/blocks2.json'))
logo = open('/tmp/claude-0/site/img/logo.svg').read().replace('<svg ', '<svg aria-hidden="true" ')

ORDER = ['01cover','02overview','03problem','04opp','05journey','06inithyp','07interview','08hyp','09solution','10flow','11iter','12lens','13anat','14pass','15loop','16concl','17thanks']
META = {
 '01cover':('Intro','olways',1,'cover'), '02overview':('Intro','Overview',1,'rise'),
 '03problem':('Research','01 · Problem',0,'rise'), '04opp':('Research','Positioning map',0,'rise'), '05journey':('Research','02 · Scenario',0,'rise'),
 '06inithyp':('Research','03 · Initial hypothesis',0,'cascade'), '07interview':('Research','04 · User interview',0,'sides'),
 '08hyp':('Strategy','04 · Hypothesis',1,'slideblur'), '09solution':('Strategy','06 · Solution',1,'tilt'), '10flow':('Strategy','07 · User flow',0,'rise'),
 '11iter':('Design','08 · Usability test',1,'focus'), '12lens':('Design','09 · Through the lens',0,'rise'), '13anat':('Design','09 · Lens anatomy',0,'rise'),
 '14pass':('Design','09 · Pass judgment',1,'rise'), '15loop':('Outcome','10 · Data loop',1,'rise'), '16concl':('Outcome','11 · Conclusion',0,'flip'), '17thanks':('Outcome','Thank you',1,'dissolve')}
LENS_VIDS = ['scan','route','slope','door','arrive']
SPOT = {
 '13anat': dict(badges=[(1066,374),(707,525),(561,821),(528,689),(864,758),(528,903)],
                cards=[(40,1000,213,131),(261,1000,213,131),(483,1000,213,131),(704,1000,213,131),(925,1000,213,131),(1147,1000,213,131)],
                lens=(40,330,1320,630)),
 '14pass': dict(badges=[(517,513),(583,807),(79,836)],
                cards=[(40,1021,429,131),(485,1021,429,131),(931,1021,429,131)],
                lens=(40,330,1320,651)),
}
def pct(v, base): return f'{v/base*100:.4f}%'

def solution_cards():
    def lanes(rows):
        out=''
        for k,segs,end in rows:
            s=''.join(f'<div class="seg {c}" style="width:{w}px">{html.escape(t)}</div>' for c,w,t in segs)
            out+=f'<div class="lane"><span class="k{" ob" if k=="OLWAYS" else ""}">{k}</span>{s}{end}</div>'
        return out
    c1=lanes([('TODAY',[('gy',150,'모른 채 이동'),('gy',72,'현장 도착'),('bad',80,'문턱 발견')],'<span class="mk x">✕</span><em class="r">헛걸음</em>'),
              ('OLWAYS',[('bl',130,'집에서 끝나는 확인'),('bl',84,'출발 전 판정'),('gd',120,'갈 수 있는 곳만')],'<span class="mk o">✓</span><em class="g">도착</em>')])
    c2=lanes([('TODAY',[('gy',150,'모르는 채 다가감'),('gy',72,'위험 등장'),('bad',84,'보고서야 인지')],'<span class="mk x">✕</span><em class="r">급정거</em>'),
              ('OLWAYS',[('gd',130,'확보된 판단 시간'),('gy',66,'위험 등장'),('bl',120,'렌즈 · 진동 경보')],'<span class="mk o">✓</span><em class="g">여유 있게</em>')])
    card=lambda h,e,t,en,body: f'<div class="scard"><div class="sh"><b>{h}</b><span>{e}</span></div><p class="st">{t}</p><p class="se">{en}</p><div class="lanes">{body}</div></div>'
    return ('<div class="fx sol" style="width:1200px;height:443px">'
      + card('출발 전','Before departure','가는 길은 사진으로 미리 보고, 입구는 집에서 판정해<br>갈 수 있는 곳만 골라 출발해요','Preview the route and judge the entrance from home — then go only where you can get in.',c1)
      + card('이동 중','On the move','차 · 자전거 · 턱이 다가오면,<br>급정거하기 전에 안경이 먼저 알려줘요','Cars, bikes and curbs — the glasses warn you before you have to brake hard.',c2)
      + '</div>')

def block_cls(key,b):
    n=b['name']
    if key=='15loop' and n=='Ellipse': return 'ring'
    if key=='15loop' and n=='box' and b['w']<130: return 'node'
    if key in SPOT and n=='Lens + callouts': return 'lensb'
    if n in ('Card','Insight banner','Final','H0') or (key=='16concl' and b['h']<100) or (key=='08hyp' and n.startswith('Frame') and b['h']>100 and b['y']>700): return 'dissolve'
    if key=='10flow' and n=='Acrylic': return 'draw'
    if b['h']<=50 and b['w']>=280 and b['ch']<60 and ('EN' in n or b['w']>=900 or n[:1].isalpha()) and b['h']>=35: return 'title'
    if b['ch']<60 and b['cw']<800: return 'tag'
    return 'std'

def parts_html(b):
    out=''
    for j,p in enumerate(b.get('parts',[])):
        st=f'left:{pct(p["x"]-b["cx"],b["cw"])};top:{pct(p["y"]-b["cy"],b["ch"])};width:{pct(p["w"],b["cw"])};height:{pct(p["h"],b["ch"])}'
        out+=f'<i class="p {p["kind"]}" data-x="{p["x"]:.0f}" data-y="{p["y"]:.0f}" style="{st}"><img src="{p["src"]}" alt=""></i>'
    return out

def block_html(key,b,H):
    style=f'left:{pct(b["cx"],1400)};top:{pct(b["cy"],H)};width:{pct(b["cw"],1400)};height:{pct(b["ch"],H)}'
    side=' data-side="'+('l' if b['cx']+b['cw']/2<700 else 'r')+'"'
    return f'<div class="b {block_cls(key,b)}"{side} style="{style}"><img src="{b["src"]}" alt="" decoding="async">{parts_html(b)}</div>'

secs=[]
for key in ORDER:
    s=B[key]; H=s['h']; g,label,dk,anim=META[key]
    head=f'<section id="s{key}" class="fs{" dk" if dk else ""}" data-g="{g}" data-l="{html.escape(label)}" data-anim="{anim}"'
    if key in CUSTOM:
        secs.append(CUSTOM[key](head,s)); continue
    if key=='12lens':
        HH=583
        hb=[b for b in s['blocks'] if b['y']<HH]
        rest=[b for b in s['blocks'] if b['y']>=HH]
        parts=[f'<div class="lhead" style="aspect-ratio:1400/{HH}">']
        parts+= [block_html(key,b,HH) for b in hb]
        parts.append('</div>')
        rects=[b for b in rest if b['name']=='Rectangle']; caps=[b for b in rest if b['name']!='Rectangle']
        for i,(r,c) in enumerate(zip(rects,caps)):
            v=LENS_VIDS[i]
            parts.append(f'''<div class="scene"><div class="vbig"><video src="media/{v}.mp4" poster="media/{v}.jpg" muted playsinline loop preload="metadata"></video><span class="live">PROTOTYPE · S{i}</span></div>
<div class="cap" style="width:{pct(c["cw"],1400)}"><img src="{c["src"]}" alt=""></div></div>''')
        secs.append(head+'>\n'+'\n'.join(parts)+'\n</section>'); continue
    parts=[]
    if key=='02overview':
        parts.append(f'<img class="plate" src="{s["plate"]}" alt=""><video class="ovv" src="media/bg_street.mp4" muted playsinline loop preload="metadata"></video><div class="ovt"></div>')
    elif key=='01cover':
        parts.append(f'<div class="cvw"><img class="plate cv" src="{s["plate"]}" alt="도심 횡단보도를 건너는 휠체어 사용자"></div>')
    else:
        parts.append(f'<img class="plate" src="{s["plate"]}" alt="">')
    for b in s['blocks']:
        if key=='09solution' and b['name']=='Knowing point':
            style=f'left:{pct(b["x"],1400)};top:{pct(b["y"],H)};width:{pct(b["w"],1400)};height:{pct(b["h"],H)}'
            parts.append(f'<div class="b html" style="{style}">{solution_cards()}</div>'); continue
        parts.append(block_html(key,b,H))
    if key in SPOT:
        sp=SPOT[key]; lx,ly,lw,lh=sp['lens']
        parts.append(f'<div class="spot" style="left:{pct(lx,1400)};top:{pct(ly,H)};width:{pct(lw,1400)};height:{pct(lh,H)}"></div>')
        for j,(bx,by) in enumerate(sp['badges']):
            parts.append(f'<button class="bdg" data-i="{j}" aria-label="{j+1}번 요소" style="left:{pct(bx,1400)};top:{pct(by,H)}"></button>')
        for j,(cx,cy,cw,ch) in enumerate(sp['cards']):
            parts.append(f'<div class="cring" data-i="{j}" style="left:{pct(cx,1400)};top:{pct(cy,H)};width:{pct(cw,1400)};height:{pct(ch,H)}"></div>')
    secs.append(head+f' style="aspect-ratio:1400/{H:.2f}">\n'+'\n'.join(parts)+'\n</section>')

tpl=open('/tmp/claude-0/v5/tpl.html',encoding='utf-8').read().replace('{{CSS5}}',open('/tmp/claude-0/v5/css5.css').read()).replace('{{JS5}}',open('/tmp/claude-0/v5/js5.js').read())
tpl=re.sub(r'/\*U\{\*/(.*?)/\*\}U\*/',lambda m:re.sub(r'(?<![\w.#-])(-?\d+(?:\.\d+)?)u\b',lambda n:f'calc(var(--u)*{n.group(1)})',m.group(1)),tpl,flags=re.S)
out=tpl.replace('{{SECTIONS}}','\n'.join(secs)).replace('{{LOGO}}',logo)
open('/tmp/claude-0/site5/index.html','w',encoding='utf-8').write(out)
print(len(out), out.count('class="b'), out.count('class="p '))
