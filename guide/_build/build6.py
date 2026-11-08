import json, html, re, sys, os
sys.path.insert(0, '/tmp/claude-0/v6'); sys.path.insert(0, '/tmp/claude-0/v5')
import numpy as np
from PIL import Image
from render import render, parse, matte, crop, U, OUT, secimg
import secs5
E = html.escape
EX = lambda k: f'/tmp/claude-0/v6/ex/{k}.txt'

def fid(i): return 'f' + i.replace(':', '-')

# ------------------------------------------------------------------ animation spec helpers
class Spec(dict):
    def put(self, ids, a, t, g, step=0, dur=None):
        if isinstance(ids, str): ids = [ids]
        for k, i in enumerate(ids): self[i] = (g, a, round(t + k * step, 3), dur)
        return t + len(ids) * step

def apply_spec(h, spec):
    def rep(m):
        i = m[1]; key = i[1:].replace('-', ':')
        if key not in spec: return m[0]
        g, a, t, d = spec[key]
        return f'{m[0]} data-g="{g}" data-a="{a}" data-t="{t}"' + (f' data-dur="{d}"' if d else '')
    return re.sub(r'id="(f\d+-\d+)"', rep, h)

def inside(n, b, slack=1):
    return n['x'] >= b['x'] - slack and n['y'] >= b['y'] - slack and n['x'] + n['w'] <= b['x'] + b['w'] + slack and n['y'] + n['h'] <= b['y'] + b['h'] + slack

def hdr_spec(nodes, spec, ymax, g=None):
    g = g or ('hdr' + nodes[0]['id'].split(':')[1])
    ids = [n['id'] for n in nodes if n['y'] < ymax and n['k'] in 'TDB' and n['id'] not in spec]
    spec.put(ids, 'rise', 0, g, .08)

def section(key, cls, inner, h=None, extra=''):
    g, l, dk, anim = META[key]
    st = f' style="height:{U(h)}"' if (h and not extra) else ''
    return f'<section id="s{key}" class="fs {cls}{" dk" if dk else ""}" data-g="{g}" data-l="{E(l)}" data-anim="{anim}"{st}{extra}>\n{inner}\n</section>'

ORDER = ['01cover', '02overview', '03problem', '04opp', '05journey', '06inithyp', '07interview', '08hyp', '09solution', '10flow',
         '11iter', '12lens', '13anat', '14pass', '15loop', '16concl', '17thanks']
META = {
 '01cover': ('Intro', 'olways', 1, 'cover'), '02overview': ('Intro', 'Overview', 1, 'rise'),
 '03problem': ('Research', '01 · Problem', 0, 'rise'), '04opp': ('Research', 'Positioning map', 0, 'rise'), '05journey': ('Research', '02 · Scenario', 0, 'rise'),
 '06inithyp': ('Research', '03 · Initial hypothesis', 0, 'cascade'), '07interview': ('Research', '04 · User interview', 0, 'sides'),
 '08hyp': ('Strategy', '04 · Hypothesis', 1, 'slideblur'), '09solution': ('Strategy', '06 · Solution', 1, 'tilt'), '10flow': ('Strategy', '07 · User flow', 0, 'rise'),
 '11iter': ('Design', '08 · Usability test', 1, 'focus'), '12lens': ('Design', '09 · Through the lens', 0, 'rise'), '13anat': ('Design', '09 · Lens anatomy', 0, 'rise'),
 '14pass': ('Design', '09 · Pass judgment', 1, 'rise'), '15loop': ('Outcome', '10 · Data loop', 1, 'rise'), '16concl': ('Outcome', '11 · Conclusion', 0, 'flip'), '17thanks': ('Outcome', 'Thank you', 1, 'dissolve')}

# ------------------------------------------------------------------ raster sections (unchanged ones)
B3 = json.load(open('/tmp/claude-0/v3/blocks2.json'))
def pct(v, base): return f'{v/base*100:.4f}%'
def raster(key):
    s = B3[key]; H = s['h']; parts = []
    if key == '01cover': parts.append(f'<div class="cvw"><img class="plate cv" src="{s["plate"]}" alt="도심 횡단보도를 건너는 휠체어 사용자"></div>')
    else: parts.append(f'<img class="plate" src="{s["plate"]}" alt="">')
    for b in s['blocks']:
        n = b['name']
        c = 'dissolve' if (key == '16concl' and b['h'] < 100) else ('title' if (b['h'] <= 50 and b['w'] >= 280 and b['ch'] < 60) else ('tag' if b['ch'] < 60 and b['cw'] < 800 else 'std'))
        side = 'l' if b['cx'] + b['cw'] / 2 < 700 else 'r'
        parts.append(f'<div class="b {c}" data-side="{side}" style="left:{pct(b["cx"],1400)};top:{pct(b["cy"],H)};width:{pct(b["cw"],1400)};height:{pct(b["ch"],H)}"><img src="{b["src"]}" alt="" decoding="async"></div>')
    g, l, dk, anim = META[key]
    return f'<section id="s{key}" class="fs rs{" dk" if dk else ""}" data-g="{g}" data-l="{E(l)}" data-anim="{anim}" style="aspect-ratio:1400/{H:.2f}">\n' + '\n'.join(parts) + '\n</section>'

# ------------------------------------------------------------------ 02 overview
def overview():
    S, h, nodes = render(EX('2616-37224'), skip=['2616:37225'])
    sp = Spec(); sp.put([n['id'] for n in nodes if n['k'] in 'TD'], 'rise', .2, 'ov', .15)
    inner = ('<video class="ovv" src="media/bg_street.mp4" muted playsinline loop preload="metadata"></video><div class="ovt"></div>'
             + apply_spec(h, sp))
    return section('02overview', 'fx', inner, S['h'])

# ------------------------------------------------------------------ 03 problem
def problem():
    S, nodes = parse(EX('2616-37234')); byid = {n['id']: n for n in nodes}
    card2 = byid['2616:37269']; card4 = byid['2616:37337']
    shift = {n['id'] for n in nodes if inside(n, card2) and n['y'] >= 390 and n['id'] != card2['id']}
    card2['h'] = 387; card4['h'] = 457
    # equal gap title→Q as the left card (86 vs 50)
    import render as R
    R_parse = R.parse
    R.parse = lambda p: (S, nodes)
    S2, h, _ = render(EX('2616-37234'), dy_fn=lambda n: 36 if n['id'] in shift else 0)
    R.parse = R_parse
    sp = Spec(); hdr_spec(nodes, sp, 300)
    ids = lambda a, b: [n['id'] for n in nodes if a <= int(n['id'].split(':')[1]) <= b]
    g = '2616:37248'; sp.put(g, 'rise', 0, g); sp.put(ids(37249, 37257), 'rise', .15, g, .05)
    t = .6
    for bar, txt, num in [('2616:37259', ['2616:37260', '2616:37261'], '2616:37262'), ('2616:37264', ['2616:37265', '2616:37266'], '2616:37267')]:
        sp.put(bar, 'barh', t, g, dur=.7); sp.put(txt, 'fade', t + .5, g); sp.put(num, 'pop', t + .7, g); t += 1.1
    sp.put('2616:37268', 'fade', t, g)
    g = '2616:37269'; sp.put(g, 'rise', 0, g); sp.put(ids(37270, 37278), 'rise', .15, g, .05)
    t = .7
    for c, tx in [('2616:37280', ['2616:37282', '2616:37283']), ('2616:37284', ['2616:37286', '2616:37287']), ('2616:37288', ['2616:37290', '2616:37291'])]:
        sp.put(c, 'pop', t, g, dur=.6); sp.put(tx, 'fade', t + .45, g, .08); t += .8
    sp.put(ids(37292, 37301), 'left', t, g, .07); sp.put('2616:37302', 'fade', t + .6, g)
    for card in ('2616:37303', '2616:37365', '2616:37370'):
        sp.put(card, 'dissolve', 0, card, dur=1); sp.put([n['id'] for n in nodes if inside(n, byid[card]) and n['id'] != card], 'fade', .5, card, .12)
    g = '2616:37311'; sp.put(g, 'rise', 0, g); sp.put(ids(37312, 37320), 'rise', .15, g, .05)
    t = .7
    for lab, col, tx in [('2616:37323', '2616:37324', ['2616:37325']), ('2616:37327', '2616:37328', ['2616:37329', '2616:37330']), ('2616:37332', '2616:37333', ['2616:37334', '2616:37335'])]:
        sp.put(lab, 'fade', t, g); sp.put(col, 'barv', t + .1, g, dur=.7); sp.put(tx, 'fade', t + .65, g, .1); t += 1
    sp.put('2616:37336', 'fade', t, g)
    g = '2616:37337'; sp.put(g, 'rise', 0, g); sp.put(ids(37338, 37346), 'rise', .15, g, .05)
    t = .7
    for lab, bar, val in [('2616:37349', '2616:37350', '2616:37351'), ('2616:37353', '2616:37354', '2616:37355'), ('2616:37357', '2616:37358', '2616:37359'), ('2616:37361', '2616:37362', '2616:37363')]:
        sp.put(lab, 'fade', t, g); sp.put(bar, 'barv', t + .1, g, dur=.65); sp.put(val, 'pop', t + .6, g); t += .85
    sp.put('2616:37364', 'fade', t, g)
    return section('03problem', 'fx', apply_spec(h, sp), S['h'], f' style="background:{S["bg"]};height:{U(S["h"])}"')

def sec_bg(S): return f' style="background:{S["bg"]};height:{U(S["h"])}"'

# ------------------------------------------------------------------ 04 positioning map
def opp():
    S, nodes = parse(EX('2616-37374')); byid = {n['id']: n for n in nodes}
    card = byid['2616:37385']
    inmap = lambda n: inside(n, card) and n['id'] != card['id']
    S2, h, _ = render(EX('2616-37374'), dx_fn=lambda n: 60 if inmap(n) else 0)
    sp = Spec(); hdr_spec(nodes, sp, 300)
    g = card['id']; sp.put(g, 'rise', 0, g, dur=.8)
    sp.put(['2616:37386'], 'barh', .3, g, dur=.9); sp.put(['2616:37387'], 'drawdown', .3, g, dur=.9)
    sp.put(['2616:37388', '2616:37389', '2616:37390', '2616:37391'], 'fade', 1.0, g)
    sp.put(['2616:37393', '2616:37394', '2616:37396', '2616:37397', '2616:37399', '2616:37400', '2616:37402', '2616:37403'], 'fade', 1.0, g, .04)
    logos = [n for n in nodes if n['k'] == 'I']
    import random; random.seed(7); random.shuffle(logos)
    t = 1.4
    for lg in logos:
        lab = [n for n in nodes if n['k'] == 'T' and abs(n['y'] - (lg['y'] + 52)) < 30 and abs((n['x'] + n['w'] / 2) - (lg['x'] + 23)) < 60 and n['y'] > 540]
        lab2 = [n for n in nodes if n['k'] == 'T' and n['id'] == '2616:37429'] if lg['id'] == '2616:37428' else lab
        sp.put(lg['id'], 'pop', t, g, dur=.45); sp.put([l['id'] for l in (lab2 or lab)[:1]], 'fade', t + .15, g); t += .14
    t += .35
    sp.put(['2616:37405'], 'herop', t, g, dur=.9); sp.put(['2616:37406', '2616:37407'], 'fade', t + .3, g, .1)
    sp.put(['2616:37408', '2616:37409'], 'rise', t + .6, g, .12)
    sp.put([n['id'] for n in nodes if n['y'] > 995 and inside(n, card)], 'fade', t + 1, g, .03)
    return section('04opp', 'fx', apply_spec(h, sp), S['h'], sec_bg(S))

# ------------------------------------------------------------------ 05 journey
def journey():
    S, h, nodes = render(EX('2616-37609')); byid = {n['id']: n for n in nodes}
    sp = Spec(); hdr_spec(nodes, sp, 300)
    g = '2616:37657'; sp.put(g, 'rise', 0, g); sp.put(['2616:37660', '2616:37661'], 'rise', .1, g, .06)
    axis = [n['id'] for n in nodes if n['x'] < 100 and 500 < n['y'] < 720] + ['2616:37663', '2616:37667', '2616:37671', '2616:37675']
    sp.put(axis, 'fade', .2, g, .03)
    cards = [n for n in nodes if n['k'] == 'B' and n.get('name', '').startswith('Frame') and abs(n['y'] - 388.45) < 1]
    t = .4
    for c in sorted(cards, key=lambda n: n['x']):
        sp.put(c['id'], 'drop', t, g, dur=.5); sp.put([n['id'] for n in nodes if inside(n, c) and n['id'] != c['id']], 'fade', t + .2, g, .03); t += .12
    cv = byid['2616:37679']; t0, D = t + .3, 2.6
    sp.put(cv['id'], 'draw', t0, g, dur=D)
    at = lambda x: t0 + max(0, min(1, (x - cv['x']) / cv['w'])) * D
    dots = [n for n in nodes if n['k'] == 'B' and n.get('name') == 'Ellipse' and 600 < n['y'] < 700]
    for d in dots: sp.put(d['id'], 'pop', at(d['x'] + 9) - .05, g, dur=.4)
    bubbles = [n for n in nodes if n['k'] == 'B' and n.get('name') == 'Bubble']
    for b in bubbles:
        tail = [n for n in nodes if n['k'] == 'B' and n.get('name') == 'Rectangle' and n['w'] < 20 and abs(n['y'] - (b['y'] + b['h'])) < 14 and b['x'] < n['x'] < b['x'] + b['w']]
        dot = min(dots, key=lambda d: abs(d['x'] + 9 - (b['x'] + b['w'] / 2)))
        tt = at(dot['x'] + 9) + .1
        sp.put(b['id'], 'bubble', tt, g, dur=.5); sp.put([x['id'] for x in tail], 'fade', tt + .1, g)
        sp.put([n['id'] for n in nodes if n['k'] == 'T' and inside(n, b)], 'fade', tt + .2, g, .06)
    return section('05journey', 'fx', apply_spec(h, sp), S['h'], sec_bg(S))

# ------------------------------------------------------------------ 06 initial hypothesis
def inithyp():
    S, h, nodes = render(EX('2616-37765')); byid = {n['id']: n for n in nodes}
    sp = Spec(); hdr_spec(nodes, sp, 300)
    sp.put('2616:37776', 'dissolve', 0, '2616:37776', dur=1); sp.put(['2616:37777', '2616:37778'], 'fade', .4, '2616:37776', .15)
    g = '2616:37779'; t = 0
    for col in ('2616:37780', '2616:37795', '2616:37810'):
        c = byid[col]; items = [n for n in nodes if inside(n, c) and n['id'] != col and n['k'] != 'G']
        headb = [n for n in items if n['y'] < 530]; prob = [n for n in items if 530 <= n['y'] < 642]
        con = [n for n in items if 642 <= n['y'] < 686]; hyp = [n for n in items if n['y'] >= 686]
        sp.put([n['id'] for n in headb], 'pop', t, g, .05); t += .3
        sp.put([n['id'] for n in prob], 'rise', t, g, .06); t += .35
        sp.put([n['id'] for n in con], 'drawdown', t, g, .1); t += .3
        sp.put([n['id'] for n in hyp], 'pop', t, g, .06); t += .45
    return section('06inithyp', 'fx', apply_spec(h, sp), S['h'], sec_bg(S))

# ------------------------------------------------------------------ 10 user flow
def flow():
    S, nodes = parse(EX('2616-38522'))
    acr = [n for n in nodes if n['id'] == '2616:38532'][0]
    mv = lambda n: 92 if (inside(n, acr) and n['id'] != acr['id']) else 0
    S2, h, _ = render(EX('2616-38522'), dx_fn=mv)
    sp = Spec(); hdr_spec(nodes, sp, 280)
    g = acr['id']; sp.put(g, 'rise', 0, g)
    seq = [(['2616:38534', '2616:38535'], 'pop', .4), (['2616:38554'], 'draw', .7), (['2616:38536', '2616:38537'], 'pop', .95),
           (['2616:38555'], 'draw', 1.25), (['2616:38538', '2616:38539'], 'pop', 1.5),
           (['2616:38556', '2616:38557'], 'draw', 1.85), (['2616:38542', '2616:38543'], 'pop', 2.1),
           (['2616:38558', '2616:38559'], 'drawdown', 1.85), (['2616:38540', '2616:38541'], 'pop', 2.15), (['2616:38560'], 'drawrev', 2.45),
           (['2616:38561', '2616:38562', '2616:38563'], 'draw', 2.45), (['2616:38544', '2616:38545'], 'pop', 2.75), (['2616:38546', '2616:38547'], 'pop', 2.9),
           (['2616:38548', '2616:38549'], 'pop', 3.05), (['2616:38568', '2616:38569'], 'pop', 3.25),
           (['2616:38564', '2616:38565', '2616:38566'], 'draw', 3.4), (['2616:38550', '2616:38551'], 'pop', 3.7),
           (['2616:38567'], 'drawdown', 3.95), (['2616:38552', '2616:38553'], 'pop', 4.25)]
    for ids, a, t in seq: sp.put(ids, a, t, g, dur=(.35 if a.startswith('draw') else None))
    sp.put(['2616:38571', '2616:38572'], 'rise', 4.6, g, .12)
    return section('10flow', 'fx', apply_spec(h, sp), S['h'], sec_bg(S))

# ------------------------------------------------------------------ 15 data loop
def loop():
    S, nodes = parse(EX('2616-39495')); byid = {n['id']: n for n in nodes}
    for i in ('2616:39509', '2616:39512', '2616:39521'): byid[i]['bg'] = 'linear-gradient(#0c2430,#0c2430)'
    import render as R
    R_parse = R.parse; R.parse = lambda p: (S, nodes)
    S2, h, _ = render(EX('2616-39495')); R.parse = R_parse
    sp = Spec(); hdr_spec(nodes, sp, 300)
    g = '2616:39507'
    sp.put('2616:39508', 'ring', 0, g, dur=1.2); sp.put(['2616:39509', '2616:39510', '2616:39511'], 'pop', .5, g, .1)
    t = 1.0
    for node in ('2616:39512', '2616:39515', '2616:39518', '2616:39521'):
        sp.put([node] + [n['id'] for n in nodes if inside(n, byid[node]) and n['id'] != node], 'pop', t, g, .06); t += .35
    g2 = '2616:39524'; sp.put(g2, 'rise', 0, g2)
    rows = ['2616:39525', '2616:39531', '2616:39537', '2616:39543', '2616:39549']
    for k, r in enumerate(rows):
        sp.put([n['id'] for n in nodes if inside(n, byid[r]) and n['id'] != r and n['k'] != 'G'], 'left', .3 + k * .22, g2, .05)
    return section('15loop', 'fx', apply_spec(h, sp), S['h'], sec_bg(S))

# ------------------------------------------------------------------ hand-built headers
def title_img(sec, box, color, name):
    fn, b = matte(sec, dict(x=box[0], y=box[1], w=box[2], h=box[3], id=name), fg=color, pad=6, name=name)
    return f'<img class="htitle" src="{fn}" alt="" style="width:{U(b[2])};height:{U(b[3])}">'

def head(tag, timg, sub, lines, dark=False, extra=''):
    ls = ''.join(f'<p class="{c}">{E(t)}</p>' for c, t in lines)
    return (f'<header class="hh{" dk" if dark else ""}"><span class="htag">{E(tag)}</span>{timg}<h2 class="hsub">{E(sub)}</h2>'
            f'<div class="hbody">{ls}</div>{extra}</header>')

def interview():
    h = secs5.interview('<section', None).split('>', 1)[1]  # inner html of v5 build
    h = h.rsplit('</section>', 1)[0]
    h = re.sub(r'<img class="hdr"[^>]*>', '', h)
    meta = ('<p class="hmeta"><b>Participants</b> 휠체어 사용자 12명<b>Period</b> 2026.04.14 – 04.23<b>Method</b> 심층 인터뷰 90–180분 · 맥락적 조사 2건</p>')
    hd = head('04  ·  USER INTERVIEW', title_img('2616:37825', (409, 144, 581, 33), '#097bb5', 't_iv'),
              '휠체어 사용자는 이동하는 것보다, 갈 수 있는지 확인하는 데 더 많은 에너지를 썼어요',
              [('en', 'Wheelchair users spent more energy confirming they could get somewhere than actually getting there.')], extra=meta)
    h = h.replace('s/iv_', 'm/iv_').replace('.webp"', '.png"') if False else h
    h = re.sub(r'src="s/(iv_c\d_\d)\.webp"', r'src="m/\1.png"', h)
    return section('07interview', 'hx iv', hd + h)

def hyp():
    h = secs5.hyp('<section', None).split('>', 1)[1].rsplit('</section>', 1)[0]
    h = re.sub(r'<img class="hdr"[^>]*>', '', h)
    hd = head('04  ·  HYPOTHESIS', title_img('2616:38094', (391.5, 140, 616, 33), '#71cbf8', 't_hy'),
              '그래서 가설을 ‘출발 전 입구 · 경로 판정’과 ‘이동 중 위험 선제 경보’로 바꿨어요',
              [('ko', '인터뷰에서 예상과 달랐던 점 두 가지 — ① 포기는 현장이 아니라 출발 전에 일어났고, ② 위험은 안내 방송이 아니라 보지 · 듣지 못한 근거리에서 왔어요.'),
               ('en', 'Users gave up before leaving, and danger came from what they couldn’t see or hear nearby — so we shifted from on-the-move help to judging ahead and alerting first.')], dark=True)
    return section('08hyp', 'hx hy', hd + h)

def solution():
    h = secs5.solution('<section', None).split('>', 1)[1].rsplit('</section>', 1)[0]
    h = re.sub(r'<img class="hdr"[^>]*>', '', h)
    hd = head('06  ·  SOLUTION', title_img('2616:38285', (559.5, 151, 282.5, 33), '#71cbf8', 't_so'),
              '‘갈 수 있는지’는 집에서, ‘위험한지’는 보기 전에 알려줘요',
              [('en', 'Know whether you can get in from home — and see danger coming before it’s in front of you.'),
               ('ko', '맨눈으로는 입구 앞에서, 눈앞에서야 알던 것을 olways는 한발 먼저 알려줘요.'),
               ('en', 'What you used to find out at the door, or right in front of you, olways tells you one step earlier.')], dark=True)
    return section('09solution', 'hx so', hd + h)

# ------------------------------------------------------------------ 08 usability test
def ut():
    hd = head('08  ·  USABILITY TEST', title_img('2616:38573', (504.5, 150.5, 391, 35), '#71cbf8', 't_ut'),
              '9명의 휠체어 사용자와 세 번의 대면 UT로, ‘멈추지 않고 읽히는 화면’을 다듬었어요',
              [('ko', '라운드마다 사용자가 멈추거나 고개를 돌린 지점을 찾아, 다음 라운드 화면에서 고쳤어요.'),
               ('en', 'Three in-person rounds with 9 wheelchair users — every point where they stopped or turned their head was fixed in the next round.')], dark=True)
    setup = ('<div class="usetup"><div class="ucard urow">'
             '<p><i>대상</i>인터뷰 참여자 12명 중 9명 재참여 — 수동 3 · 전동 3 · 수동+전동 2 · 수동+반전동 1</p>'
             '<p><i>방식</i>1:1 대면 · 본인 휠체어에 앉은 채 진행 · 글라스 화면은 실제 거리 영상 위 프로토타입으로 시연</p>'
             '<p><i>범위</i>출발 전 경로 · 이동 중 안내 · 입구 판정 · 배터리 + 음성 UI</p>'
             '<p><i>라운드</i>1차 → 2차 → 3차 · 라운드당 3명 · 1인 약 60분</p></div>'
             '<div class="ugrid"><div class="ucard"><p class="uk">GOAL</p><h4>이동하면서, 멈추지 않고 · 고개를 돌리지 않고 판단할 수 있는가</h4>'
             '<ul><li><b>① 정지 횟수</b><em>목표 0회</em><span>과업 중 화면을 읽으려고 휠체어를 멈춘 횟수</span></li>'
             '<li><b>② 시선 이탈</b><em>목표 1회 이하</em><span>정보를 찾느라 고개를 돌리거나 시선이 경로를 벗어난 횟수</span></li>'
             '<li><b>③ 판단 시간</b><em>목표 3초 이내</em><span>화면을 보고 ‘갈 수 있다 / 없다’를 말하기까지 걸린 시간</span></li></ul></div>'
             '<div class="ucard"><p class="uk">HOW WE TESTED</p><h4>같은 세 과업을 매 라운드 반복하고, 녹화 · 관찰 · 과업 후 인터뷰로 기록했어요</h4>'
             '<ul><li><i>과업 A · 출발 전</i><b>처음 가는 카페, 갈 수 있을까?</b><span>경로 화면만 보고 갈지 말지 결정하고, 이유를 말해요</span></li>'
             '<li><i>과업 B · 이동 중</i><b>안내를 따라가다 자전거 접근</b><span>경로를 따라 이동 중 뒤에서 오는 자전거 경보에 반응해요</span></li>'
             '<li><i>과업 C · 입구 앞</i><b>이 입구로 들어갈 수 있을까?</b><span>통과 판정을 읽고, 막히면 다른 입구를 찾아가요</span></li></ul></div></div></div>')
    out = ''
    for it in secs5.UT:
        qs = ''.join(f'<div class="uq"><span class="who d">{E(w)}</span><p class="ko">{E(k)}</p><p class="en">{E(e)}</p></div>' for w, k, e in it['q'])
        ps = (f'<div class="ups"><div><p class="pk">문제</p><p>{E(it["p"])}</p></div><div><p class="sk">해결</p><p class="sv">{E(it["s"])}</p></div></div>')
        hdr = f'<header class="uh"><p class="up"><span class="un">{it["n"]}</span>{E(it["prob"])}</p><h3>{it["head"]}</h3></header>'
        if it['n'] == 3:
            cmp = ('<div class="u3"><figure class="u3a"><span class="vl">As Is · 1차</span><div class="u3w"><img src="s/ut3a.webp" alt="As Is 1차 화면" loading="lazy">'
                   '<i class="zr" style="left:89.6%;top:80%;width:6.5%;height:19%"></i></div>'
                   '<div class="u3z"><img src="s/ut3az.webp" alt="배터리 퍼센트 확대"><p><b>% 게이지</b>남은 거리를 머릿속으로 계산해야 했어요</p></div></figure>'
                   '<span class="u3arr" aria-hidden="true">→</span>'
                   '<figure class="u3b"><span class="vl tb">To Be · 3차</span><div class="u3w"><img src="s/ut3c.webp" alt="To Be 3차 화면" loading="lazy">'
                   '<i class="zr ok" style="left:73.8%;top:64.9%;width:22.7%;height:33.6%"></i></div>'
                   '<div class="u3z ok"><img src="s/ut3cz.webp" alt="주행 가능 거리 카드 확대"><p><b>주행 가능 5km</b>가까운 충전기는 AR 핀으로 띄웠어요</p></div></figure></div>')
            out += f'<article class="ui u3x">{hdr}{cmp}{ps}<div class="uqs">{qs}</div></article>'
            continue
        cards = ''
        for i, (lab, im, z, notes) in enumerate(it['vers']):
            tobe = lab.startswith('To')
            zz = ''
            if z:
                nn = ''.join(f'<li>{E(t)}</li>' for t in notes)
                zz = f'<div class="zc{" ok" if tobe else ""}"><img src="s/{z}.webp" alt=""><ul>{nn}</ul></div>'
            cards += (f'<figure class="uc{" tobe" if tobe else ""}" data-i="{i}"><span class="vl{" tb" if tobe else ""}">{E(lab)}</span>'
                      f'<div class="uimg"><img src="s/{im}.webp" alt="{E(lab)} 화면" loading="lazy"></div>{zz}</figure>')
        why = ''
        if it['why']:
            a, b, c = it['why']
            why = (f'<div class="why"><div class="wd"><div class="wm"><i class="x">✕</i></div><span class="wa">→</span><div class="wm r"><i class="o">✓</i></div>'
                   f'<span class="wl r">As Is · 왼쪽</span><span></span><span class="wl b">To Be · 오른쪽</span></div>'
                   f'<div><p class="wk">{E(a)}</p><p class="wt">{E(b)}</p><p class="we">{E(c)}</p></div></div>')
        dots = ''.join(f'<button class="ud" data-i="{k}" aria-label="{k+1}단계">{["As Is 1차","As Is 1·2차","As Is ↔ To Be"][k]}</button>' for k in range(3))
        out += (f'<article class="ui">{hdr}<div class="upin"><div class="utrack">{cards}</div><div class="usteps">{dots}</div></div>'
                f'{why}{ps}<div class="uqs">{qs}</div></article>')
    return section('11iter', 'hx ut', hd + setup + f'<div class="uwrap">{out}</div>')

# ------------------------------------------------------------------ 09 lens
def lens():
    S, nodes = parse(EX('2616-38829'))
    import render as R
    keep = [n for n in nodes if n['y'] < 560]
    R_parse = R.parse; R.parse = lambda p: (S, keep)
    _, h, _ = render(EX('2616-38829')); R.parse = R_parse
    sp = Spec(); hdr_spec(keep, sp, 560)
    caps = []
    for lab, ttl, body, en in [('38866', '38867', '38868', '38869'), ('38874', '38875', '38876', '38877'), ('38882', '38883', '38884', '38885'),
                               ('38891', '38892', '38893', '38894'), ('38899', '38900', '38901', '38902')]:
        t = {n['id']: n['txt'] for n in nodes if n['k'] == 'T'}
        caps.append([t['2616:' + x] for x in (lab, ttl, body, en)])
    vids = ['scan', 'route', 'slope', 'door', 'arrive']
    def cap(i, cls=''):
        a, b, c, d = caps[i]
        return f'<div class="lcap {cls}"><p class="lk">{E(a)}</p><h3>{E(b)}</h3><p class="lb">{E(c)}</p><p class="le">{E(d)}</p></div>'
    def vid(i): v = vids[i]; return f'<div class="lvid"><video src="media/{v}.mp4" poster="media/{v}.jpg" muted playsinline loop preload="metadata"></video><span class="live">PROTOTYPE · S{i}</span></div>'
    split = lambda i, rev: f'<div class="lsplit{" rev" if rev else ""}" data-i="{i}">{vid(i)}{cap(i)}</div>'
    full = lambda i: f'<div class="lfull" data-i="{i}"><div class="lstick">{vid(i)}</div><div class="lover">{cap(i, "ov")}</div></div>'
    panels = ''.join(f'<div class="hp">{vid(i)}{cap(i, "hc")}</div>' for i in (1, 3))
    dots = ''.join(f'<i data-i="{k}"></i>' for k in range(2))
    track = f'<div class="hwrap"><p class="hkick">출발 전부터 입구 앞까지 · 옆으로 넘겨 보기</p><div class="htrack">{panels}</div><div class="hdots">{dots}</div></div>'
    inner = f'<div class="lhead fx" style="height:{U(560)}">{apply_spec(h, sp)}</div>' + split(0, False) + track + full(2) + split(4, True)
    return section('12lens', 'hx ln', inner)

# ------------------------------------------------------------------ 09 anatomy + pass
ANAT_BADGES = [(1052, 360), (693, 511), (548, 807), (514, 675), (850, 744), (514, 889)]  # badge 1..6 (Figma x,y of 28px circle)
def anatomy():
    t = {}
    for ln in open(EX('2616-38903'), encoding='utf-8').read().split('\n'):
        if ln.startswith('T '): t[ln.split(' ')[1]] = ln.split(' | ', 1)[1].replace('⏎', ' ')
    hd = head(t['2616:38906'], title_img('2616:38903', (40, 143, 1320, 40), '#097bb5', 't_an'), t['2616:38910'],
              [('ko', t['2616:38912']), ('en', t['2616:38913'])])
    badges = ''.join(f'<button class="bdg" data-i="{k}" aria-label="{k+1}번 요소" style="left:{(x+14-80)/1120*100:.3f}%;top:{(y+14-330)/630*100:.3f}%"><b>{k+1}</b></button>'
                     for k, (x, y) in enumerate(ANAT_BADGES))
    cards = ''
    for k, base in enumerate([39077, 39084, 39091, 39098, 39105, 39112]):
        g = lambda o: E(t[f'2616:{base+o}'])
        cards += f'<div class="acard" data-i="{k}"><p class="ak"><b>{g(0)}</b>{g(1)}</p><h4>{g(2)}</h4><p>{g(4)}</p></div>'
    fov = ('<div class="fovz"><div class="z fz-t"><b>수평선 위</b><i>Keep clear</i></div><div class="z fz-l"><b>좌측 패널</b><i>5–30%</i></div>'
           '<div class="z fz-r"><b>우측 패널</b><i>70–95% · 상태 · 내비</i></div><div class="z fz-c"><b>중앙 — 위험 · 경로만</b><i>시선 수평선 37–40%</i></div>'
           '<div class="z fz-b"><b>하단 · 음성</b></div><i class="hz"></i></div>')
    fovtxt = (f'<div class="fovt"><p class="fk">{E(t["2616:39119"])}</p><h3>{E(t["2616:39120"])}</h3>'
              f'<p class="fdirs"><span>{E(t["2616:39122"])}</span><span>{E(t["2616:39166"])}</span><span>{E(t["2616:39167"])}</span></p>'
              f'<p class="fb">{E(t["2616:39168"])}</p><p class="fs2">{E(t["2616:39169"])}</p></div>')
    inner = (hd +
             f'<div class="awrap"><div class="ashot"><img src="m/anat.jpg" alt="최종 렌즈 화면 — 여섯 요소" loading="lazy"><i class="spot"></i>{badges}</div>'
             f'<div class="agrid">{cards}</div></div>'
             f'<div class="fovpin"><div class="fovstage">{fovtxt}<div class="fovshot"><img src="m/anat.jpg" alt="" loading="lazy">{fov}</div></div></div>')
    return section('13anat', 'hx an', inner)

PASS_BADGES = [(505.8, 501.7), (572, 795.96), (69, 824.96)]
def passj():
    S, nodes = parse(EX('2616-39191')); t = {n['id']: n['txt'] for n in nodes if n['k'] == 'T'}
    import render as R
    keep = [n for n in nodes if n['y'] < 300]
    R_parse = R.parse; R.parse = lambda p: (S, keep)
    _, h, _ = render(EX('2616-39191')); R.parse = R_parse
    sp = Spec(); hdr_spec(keep, sp, 300)
    badges = ''.join(f'<button class="bdg" data-i="{k}" aria-label="{k+1}번 요소" style="left:{(x+11-40)/1200*100:.3f}%;top:{(y+11-330)/653*100:.3f}%"><b>{k+1}</b></button>'
                     for k, (x, y) in enumerate(PASS_BADGES))
    cards = ''
    for k, (a, b, c, d) in enumerate([(39251, 39252, 39253, 39255), (39258, 39259, 39260, 39262), (39265, 39266, 39267, 39269)]):
        cards += f'<div class="acard dk" data-i="{k}"><p class="ak"><b>{E(t[f"2616:{a}"])}</b>{E(t[f"2616:{b}"])}</p><h4>{E(t[f"2616:{c}"])}</h4><p>{E(t[f"2616:{d}"])}</p></div>'
    inner = (f'<div class="ahead fx" style="height:{U(300)}">{apply_spec(h, sp)}</div>'
             f'<div class="awrap"><div class="ashot ps"><img src="m/pass.jpg" alt="입구 판정 화면" loading="lazy"><i class="spot"></i>{badges}</div>'
             f'<div class="agrid g3">{cards}</div></div>')
    return section('14pass', 'hx pj', inner)

# ------------------------------------------------------------------ assets prepared once
def prep_assets():
    os.makedirs(OUT + 'm', exist_ok=True)
    for f in os.listdir('/tmp/claude-0/site5/s'):
        if f.startswith('iv_c'):
            a = np.asarray(Image.open('/tmp/claude-0/site5/s/' + f).convert('RGB')).astype(np.float32)
            lim = 255.0; d = 255 - a
            al = np.clip((d / lim).max(-1), 0, 1); al[al < .015] = 0
            safe = np.where(al > 0, al, 1)[..., None]
            rgb = np.clip(255 - d / safe, 0, 255)
            Image.fromarray(np.dstack([rgb, al * 255]).astype(np.uint8), 'RGBA').save(OUT + 'm/' + f.replace('.webp', '.png'), optimize=True)
    for src, dst in [('/tmp/claude-0/v6/dl/anat.jpg', 'm/anat.jpg'), ('/tmp/claude-0/v6/dl/pass.jpg', 'm/pass.jpg')]:
        im = Image.open(src).convert('RGB'); im.save(OUT + dst, quality=86, optimize=True, progressive=True)

if __name__ == '__main__':
    prep_assets()
    GEN = {'02overview': overview, '03problem': problem, '04opp': opp, '05journey': journey, '06inithyp': inithyp, '07interview': interview,
           '08hyp': hyp, '09solution': solution, '10flow': flow, '11iter': ut, '12lens': lens, '13anat': anatomy, '14pass': passj, '15loop': loop}
    secs = [GEN[k]() if k in GEN else raster(k) for k in ORDER]
    logo = open('/tmp/claude-0/site/img/logo.svg').read().replace('<svg ', '<svg aria-hidden="true" ')
    tpl = open('/tmp/claude-0/v6/tpl6.html', encoding='utf-8').read()
    css5 = open('/tmp/claude-0/v5/css5.css').read()
    css6 = open('/tmp/claude-0/v6/css6.css').read()
    css = css5 + '\n' + css6
    css = re.sub(r'/\*U\{\*/(.*?)/\*\}U\*/', lambda m: re.sub(r'(?<![\w.#-])(-?\d+(?:\.\d+)?)u\b', lambda n: f'calc(var(--u)*{n.group(1)})', m.group(1)), css, flags=re.S)
    out = tpl.replace('{{CSS}}', css).replace('{{SECTIONS}}', '\n'.join(secs)).replace('{{JS}}', open('/tmp/claude-0/v6/js6.js').read()).replace('{{LOGO}}', json.dumps(logo))
    open(OUT + 'index.html', 'w', encoding='utf-8').write(out)
    print(len(out))
