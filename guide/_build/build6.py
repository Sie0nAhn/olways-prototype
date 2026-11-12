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

CHAPS = {'c1': (1, 'Research', '휠체어 사용자가 새로운 곳을 포기하는 이유에 주목했어요', 'We looked at why wheelchair users give up on new places.', ['문제', '포지셔닝', '시나리오', '초기 가설', '인터뷰']),
         'c2': (2, 'Strategy', '‘갈 수 있는지’를 출발 전에 아는 것을 중점으로 방향을 잡았어요', 'We set our direction on knowing “can I get in?” before leaving.', ['가설 수정', '솔루션', '유저 플로우']),
         'c3': (3, 'Design', '두 손을 핸들에 둔 채 읽히는 화면에 집중했어요', 'We focused on screens you can read with both hands on the rims.', ['UT 3라운드', '최종 화면', '렌즈 구성', '입구 판정']),
         'c4': (4, 'Outcome', '다녀온 길이 다음 사람의 판단이 되는 구조를 만들었어요', 'Every ride becomes the next person’s pre-departure judgment.', ['데이터 루프', '결론'])}
def chapter(key):
    n, name, ko, en, steps = CHAPS[key]
    dots = ''.join(f'<li class="{"on" if i == n else "past" if i < n else ""}"><span>{g}</span></li>' for i, g in enumerate(['Intro', 'Research', 'Strategy', 'Design', 'Outcome']))
    st = ''.join(f'<li><i>{k + 1:02d}</i>{E(x)}</li>' for k, x in enumerate(steps))
    inner = (f'<div class="ch" style="--n:{n}"><div class="arc"></div>'
             f'<p class="ck">Chapter {n:02d}  ·  {name}</p><h2 class="cq"><span>{E(ko)}</span></h2><p class="ce">{E(en)}</p>'
             f'<ol class="cs">{st}</ol><ol class="spine">{dots}</ol></div>')
    return section(key, 'chap', inner)

ORDER = ['01cover', '02overview', 'c1', '03problem', '04opp', '05journey', '06inithyp', '07interview', 'c2', '08hyp', '09solution', '10flow',
         'c3', '11iter', '12lens', '13anat', '14pass', 'c4', '15loop', '16concl', '17thanks']
META = {
 '01cover': ('Intro', 'olways', 1, 'cover'), '02overview': ('Intro', 'Overview', 1, 'rise'),
 'c1': ('Research', 'Chapter 01 · Research', 1, 'chap'), 'c2': ('Strategy', 'Chapter 02 · Strategy', 1, 'chap'),
 'c3': ('Design', 'Chapter 03 · Design', 1, 'chap'), 'c4': ('Outcome', 'Chapter 04 · Outcome', 1, 'chap'),
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
def HL(text, marks):
    """escape, then wrap phrases: ('b', phrase) = heavier weight, ('s', phrase) = sky + heavier"""
    h = E(text)
    for kind, ph in marks:
        ph = E(ph); assert ph in h, ph
        h = h.replace(ph, f'<b class="hl{" sky" if kind == "s" else ""}">{ph}</b>', 1)
    return h

OVK = 'olways는 휠체어 사용자를 위한 스마트 글라스예요. 출발 전엔 내 휠체어로 갈 수 있는지, 이동 중엔 놓친 위험을 먼저 알려줘요.'
OVE = 'Smart glasses for wheelchair users — know if you can get in before you leave, and see the risks you missed on the move.'
def overview():
    # callmelord-style: full-bleed street video stays put, the title rises out of a mask, then the statement lights up word by word
    from svgt import svg_title
    sv, x, y, w, hh = svg_title('2616:37229', 'Know Before You Go: Hands-Free Access, Measured for You')
    T = {n['id']: n['txt'] for n in parse(EX('2616-37224'))[1] if n['k'] in 'TD'}
    inner = ('<div class="ovpin"><div class="ovbg"><img src="m/ov_bg.webp" alt="" decoding="async"></div><div class="ovt"></div>'
             f'<div class="ovc"><p class="ovk">Overview</p><div class="ovtitle" style="aspect-ratio:{w:g}/{hh:g}">{sv}</div>'
             f'<p class="ovsub">{E(T["2616:37230"])}</p></div></div>'
             f'<div class="ovs"><p class="ovbig" data-wr>{HL(OVK, [("s", "휠체어 사용자"), ("s", "갈 수 있는지"), ("s", "놓친 위험")])}</p><p class="oven">{E(OVE)}</p></div>')
    return section('02overview', 'ov2', inner)

# ------------------------------------------------------------------ 03 problem
def big(kicker, ko, en_html, cls='', marks=()):
    """voy-style statement screen: one sentence, words light up as you scroll"""
    if cls == 'so':  # the two insights sit side by side, their lines meet in one point, and that point is the "So"
        cards = ('<div class="mg"><div class="mi"><i>Insight 01</i><p>외출 포기는 의지가 아니라<br><b>갈 수 있는지 몰라서</b>예요</p></div>'
                 '<div class="mi"><i>Insight 02</i><p>공식 정보는<br><b>‘있다’만</b> 알려줘요</p></div></div>'
                 '<svg class="mgl" viewBox="0 0 820 80" preserveAspectRatio="none" aria-hidden="true"><path d="M205 0 V30 Q205 42 217 42 H398 Q410 42 410 54 V80"/><path d="M615 0 V30 Q615 42 603 42 H422 Q410 42 410 54 V80"/></svg><i class="mdot"></i>')
        ghost = ('<div class="ghost"><p class="bk">Insight 02</p><p class="bs gs">공식 인증과 지도는 ‘있다’만 알려줘요. <b class="hl sky">지나갈 수 있는지는 가봐야</b> 알 수 있어서, 이동 시간과 헛걸음이 쌓였어요.</p>'
                 '<p class="be">Official Data Says “Accessible” — But It <b>Can’t Tell You</b> If Your Wheelchair Fits.</p></div>')
        return (f'<div class="big so">{ghost}<div class="sow"><p class="bk">{E(kicker)}</p>{cards}<p class="bs" data-wr>{HL(ko, marks)}</p><p class="be">{en_html}</p></div></div>')
    return (f'<div class="big {cls}"><p class="bk">{E(kicker)}</p><p class="bs" data-wr>{HL(ko, marks)}</p><p class="be">{en_html}</p></div>')

def widen3(h):
    """3% / 44% / 75% columns: stretch to the card's content width (24–628) with a 10u gutter between columns"""
    cols = [range(37322, 37326), range(37326, 37331), range(37331, 37336)]
    f = (604 - 20) / 520
    for k, ids in enumerate(cols):
        for i in ids:
            def fix(m):
                st = m.group(0)
                if 'src="' in st:  # raster numerals keep their size, pinned to the column's right edge
                    L = float(re.search(r'left:calc\(var\(--u\)\*(-?[\d.]+)\)', st).group(1)); W = float(re.search(r'width:calc\(var\(--u\)\*([\d.]+)\)', st).group(1))
                    return re.sub(r'left:calc\(var\(--u\)\*(-?[\d.]+)\)', f'left:calc(var(--u)*{24 + (L + W - 24) * f + k * 10 - W:.2f})', st, count=1)
                st = re.sub(r'left:calc\(var\(--u\)\*(-?[\d.]+)\)', lambda q: f'left:calc(var(--u)*{24 + (float(q.group(1)) - 24) * f + k * 10:.2f})', st, count=1)
                st = re.sub(r'width:calc\(var\(--u\)\*([\d.]+)\)', lambda q: f'width:calc(var(--u)*{float(q.group(1)) * f:.2f})', st, count=1)
                return st
            h = re.sub(r'id="f2616-%d"[^>]*?style="[^"]*"' % i, fix, h, count=1)
    return h

def center_bubbles(h):
    """bubble chart: each label + number pair is stacked and centred in its circle"""
    G = lambda st, k: float(re.search(k + r':calc\(var\(--u\)\*(-?[\d.]+)\)', st).group(1))
    def box(i):
        m = re.search(r'<[^>]*id="f2616-%d"[^>]*style="([^"]*)"' % i, h); return m.group(1)
    for c, lab, num in ((37280, 37282, 37283), (37284, 37286, 37287), (37288, 37290, 37291)):
        cs, ls, ns = box(c), box(lab), box(num)
        cx, cy, cw = G(cs, 'left'), G(cs, 'top'), G(cs, 'width')
        fs = 12; lh = fs * 1.3 * 2
        nw, nh = G(ns, 'width'), G(ns, 'height')
        pad = (nh - (24 if cw < 150 else 48)) / 2          # the number raster carries a soft margin
        tot = lh + 6 + nh - 2 * pad
        top = cy + cw / 2 - tot / 2
        def put(i, st):
            nonlocal_h[0] = re.sub(r'(<[^>]*id="f2616-%d"[^>]*style=")[^"]*' % i, lambda m: m.group(1) + st, nonlocal_h[0], count=1)
        nonlocal_h = [h]
        put(lab, re.sub(r'left:[^;]*;top:[^;]*;width:[^;]*;', f'left:calc(var(--u)*{cx:.2f});top:calc(var(--u)*{top:.2f});width:calc(var(--u)*{cw:.2f});', ls, count=1))
        put(num, re.sub(r'left:[^;]*;top:[^;]*;', f'left:calc(var(--u)*{cx + cw / 2 - nw / 2:.2f});top:calc(var(--u)*{top + lh + 6 - pad:.2f});', ns, count=1))
        h = nonlocal_h[0]
    return h

def center_on_bars(h, groups):
    """each bar's label above and its text inside sit centred on the bar"""
    G = lambda st, k: float(re.search(k + r':calc\(var\(--u\)\*(-?[\d.]+)\)', st).group(1))
    for bar, kids in groups:
        st = re.search(r'id="f2616-%d"[^>]*?style="([^"]*)"' % bar, h).group(1)
        bl, bw = G(st, 'left'), G(st, 'width')
        for k in kids:
            m = re.search(r'(<(p|img)[^>]*id="f2616-%d"[^>]*?style=")([^"]*)(")' % k, h)
            ks = m.group(3)
            if m.group(2) == 'img':
                kw = G(ks, 'width'); ks = re.sub(r'left:calc\(var\(--u\)\*(-?[\d.]+)\)', f'left:calc(var(--u)*{bl + (bw - kw) / 2:.2f})', ks, count=1)
            else:
                ks = re.sub(r'left:calc\(var\(--u\)\*(-?[\d.]+)\)', f'left:calc(var(--u)*{bl + 8:.2f})', ks, count=1)
                ks = re.sub(r'width:calc\(var\(--u\)\*([\d.]+)\)', f'width:calc(var(--u)*{bw - 16:.2f})', ks, count=1)
                ks = re.sub(r'text-align:\w+', 'text-align:center', ks) if 'text-align' in ks else ks + ';text-align:center'
            h = h[:m.start()] + m.group(1) + ks + m.group(4) + h[m.end():]
    return h

SHORT = {'2616:37248': ('58%', '새로운 곳, 한 곳도 못 가요'), '2616:37269': ('53%', '가장 큰 벽은 탑승'),
         '2616:37311': ('3%', '인증된 길 · 정류장은 3%뿐'), '2616:37337': ('3.3×', '환승은 3.3배 더 걸려요')}
def problem():
    S, nodes = parse(EX('2616-37234')); byid = {n['id']: n for n in nodes}
    card2 = byid['2616:37269']; card4 = byid['2616:37337']
    shift = {n['id'] for n in nodes if inside(n, card2) and n['y'] >= 390 and n['id'] != card2['id']}
    DY = {n['id']: 59 for n in nodes if inside(n, card4) and n['y'] - card4['y'] >= 134 and n['id'] != card4['id']}
    card2['h'] = 387; card4['h'] = 457
    import render as R
    R_parse = R.parse
    def part(keep, dx, dy):
        R.parse = lambda p: (S, keep)
        _, h, _ = render(EX('2616-37234'), dx_fn=lambda n: dx, dy_fn=lambda n: dy + (36 if n['id'] in shift else 0) + DY.get(n['id'], 0))
        R.parse = R_parse
        return h
    ids = lambda a, b: [n['id'] for n in nodes if a <= int(n['id'].split(':')[1]) <= b]
    # header
    hk = [n for n in nodes if n['y'] < 300]
    sp = Spec(); hdr_spec(hk, sp, 300)
    head_html = f'<div class="fx phead" style="height:{U(300)}">{apply_spec(part(hk, 0, 0), sp)}</div>'
    # cards: each its own timeline, played when the story reaches it
    def card(cid, build):
        c = byid[cid]; keep = [n for n in nodes if inside(n, c)]
        sp = Spec(); g = cid; build(sp, g)
        h = apply_spec(part(keep, -c['x'], -c['y']), sp)
        if cid == '2616:37269': h = center_bubbles(h)
        if cid == '2616:37337': h = center_on_bars(h, [(37350, [37349, 37351]), (37354, [37353, 37355]), (37358, [37357, 37359]), (37362, [37361, 37363])])
        if cid == '2616:37311':
            h = widen3(h)
            # the 3% label: English and Korean on separate lines, lifted so it clears the short bar
            h = re.sub(r'(id="f2616-37323"[^>]*?top:calc\(var\(--u\)\*)290\.00(\)[^>]*>)BF certificates on\s+streets &amp; stops',
                       lambda m: m.group(1) + '262.00' + m.group(2) + 'BF certificates on streets &amp; stops<br>', h, count=1)
            h = center_on_bars(h, [(37324, [37323, 37325]), (37328, [37327, 37329, 37330]), (37333, [37332, 37334, 37335])])
        return f'<div class="st-item" data-g="{g}"><div class="pcw" style="--w:{c["w"]};--h:{c["h"]}"><div class="pcard fx">{h}</div></div></div>'
    def b1(sp, g):
        sp.put(ids(37249, 37257), 'rise', 0, g, .05); t = .5
        for bar, txt, num in [('2616:37259', ['2616:37260', '2616:37261'], '2616:37262'), ('2616:37264', ['2616:37265', '2616:37266'], '2616:37267')]:
            sp.put(bar, 'barh', t, g, dur=.7); sp.put(txt, 'fade', t + .5, g); sp.put(num, 'pop', t + .7, g); t += 1.1
        sp.put('2616:37268', 'fade', t, g)
    def b2(sp, g):
        sp.put(ids(37270, 37278), 'rise', 0, g, .05); t = .5
        for c, tx in [('2616:37280', ['2616:37282', '2616:37283']), ('2616:37284', ['2616:37286', '2616:37287']), ('2616:37288', ['2616:37290', '2616:37291'])]:
            sp.put(c, 'pop', t, g, dur=.6); sp.put(tx, 'fade', t + .45, g, .08); t += .8
        sp.put(ids(37292, 37301), 'left', t, g, .07); sp.put('2616:37302', 'fade', t + .6, g)
    def b3(sp, g):
        sp.put(ids(37312, 37320), 'rise', 0, g, .05); t = .5
        for lab, col, tx in [('2616:37323', '2616:37324', ['2616:37325']), ('2616:37327', '2616:37328', ['2616:37329', '2616:37330']), ('2616:37332', '2616:37333', ['2616:37334', '2616:37335'])]:
            sp.put(lab, 'fade', t, g); sp.put(col, 'barv', t + .1, g, dur=.7); sp.put(tx, 'fade', t + .65, g, .1); t += 1
        sp.put('2616:37336', 'fade', t, g)
    def b4(sp, g):
        sp.put(ids(37338, 37346), 'rise', 0, g, .05); t = .5
        for lab, bar, val in [('2616:37349', '2616:37350', '2616:37351'), ('2616:37353', '2616:37354', '2616:37355'), ('2616:37357', '2616:37358', '2616:37359'), ('2616:37361', '2616:37362', '2616:37363')]:
            sp.put(lab, 'fade', t, g); sp.put(bar, 'barv', t + .1, g, dur=.65); sp.put(val, 'pop', t + .6, g); t += .85
        sp.put('2616:37364', 'fade', t, g)
    T = {n['id']: n['txt'] for n in nodes if n['k'] in 'TD'}
    def story(pairs, kick, head, first=False, top=None):
        nav = ''.join(f'<li><i>{k:02d}</i><strong>{SHORT[cid][0]}</strong><span>{SHORT[cid][1]}</span><b class="sbar"><em></em></b></li>' for k, (cid, tid, _) in pairs)
        items = ''.join(card(cid, fn) for k, (cid, tid, fn) in pairs)
        # the header scrolls in before the scene; the pinned scene keeps the whole screen for the figure
        top = f'<div class="st-pre">{head_html if first else top}</div>' if (first or top) else ''
        return (f'{top}<div class="story side"><div class="st-stage"><div class="st-side"><p class="st-k">{kick}</p><p class="st-h">{head}</p><ol class="st-nav">{nav}</ol></div>'
                f'<div class="st-items">{items}</div></div></div>')
    st1 = story([(1, ('2616:37248', '2616:37250', b1)), (2, ('2616:37269', '2616:37271', b2))], 'Problem · 01–02', '나가지 않는 게 아니라,<br>나갈 수 없어요', True)
    h2 = ('<header class="hh sh"><span class="htag">01  ·  PROBLEM  ·  03–04</span><p class="sht">Accessible on paper, unknown at the door</p>'
          '<h2 class="hsub">공식 정보는 ‘있다’만 알려줄 뿐, <b class="hl sky">‘지나갈 수 있는지’</b>는 알려주지 않아요</h2>'
          '<div class="hbody"><p>베리어프리 인증 · 지도 · 시설 정보는 있어도, 내 휠체어로 지나갈 수 있는지는 가봐야 알 수 있어요.</p></div>'
          '<div class="hbody"><p class="en">Official data says “accessible” — it can’t tell you whether your wheelchair gets through.</p></div></header>')
    st2 = story([(3, ('2616:37311', '2616:37313', b3)), (4, ('2616:37337', '2616:37339', b4))], 'Problem · 03–04', '공식 정보로는<br>알 수 없어요', top=h2)
    i1 = big('Insight 01', T['2616:37306'], 'Avoiding Trips Isn’t About Will — It’s About <b>Not Knowing</b> If You Can Get In.', '', [('s', '미리 알 수 없어서예요')])
    i2 = big('Insight 02', '공식 인증과 지도는 ‘있다’만 알려줘요. 지나갈 수 있는지는 가봐야 알 수 있어서, 이동 시간과 헛걸음이 쌓였어요.',
             'Official Data Says “Accessible” — But It <b>Can’t Tell You</b> If Your Wheelchair Fits.', '', [('s', '지나갈 수 있는지는 가봐야')])
    so = big('So', '그래서 olways는 ‘갈 수 있는지’를 출발 전에 알려주는 것부터 시작해요', 'So olways starts by answering <b>“Can I get there?”</b> before you leave.', 'so', [('s', '‘갈 수 있는지’'), ('s', '출발 전에')])
    return section('03problem', 'hx pr', st1 + i1 + st2 + so)

def pinfit(key, cls, inner, S=None):
    """one screen: content is scaled to fit the iPad viewport, pinned until its animation has finished"""
    fh = f' style="--fh:{S["h"]}"' if S else ''
    bg = f' style="background:{S["bg"]}"' if S else ''
    return section(key, cls + ' pinfit', f'<div class="fit{" fx" if S else ""}"{fh}>{inner}</div>', None, bg)

def sec_bg(S): return f' style="background:{S["bg"]};height:{U(S["h"])}"'

# ------------------------------------------------------------------ 04 positioning map
def opp():
    S, nodes = parse(EX('2616-37374')); byid = {n['id']: n for n in nodes}
    card = byid['2616:37385']
    inmap = lambda n: inside(n, card) and n['id'] != card['id']
    # the map is drawn 25% shorter so it reads with its header on one iPad screen: positions compress, marks keep their size,
    # and a label stays glued to the mark above it
    SY = .74; Y0 = card['y']; CUT = card['h'] * (1 - SY)
    marks = [n for n in nodes if inmap(n) and n['k'] != 'T' and n['h'] > 20 and n['w'] < 300]
    def anchor(n):
        if n['k'] == 'T':
            cx = n['x'] + n['w'] / 2
            ab = [m for m in marks if m['x'] - 30 <= cx <= m['x'] + m['w'] + 30 and 0 <= n['y'] - (m['y'] + m['h']) <= 60]
            if ab: return anchor(min(ab, key=lambda m: n['y'] - (m['y'] + m['h'])))
        return n['y']
    def dyf(n):
        if inmap(n): return (anchor(n) - Y0) * (SY - 1)
        return -CUT if n['y'] > Y0 + card['h'] - 1 else 0
    S2, h, _ = render(EX('2616-37374'), dx_fn=lambda n: 60 if inmap(n) else 0, dy_fn=dyf)
    for nid, hh in (('2616:37385', card['h']), ('2616:37387', 600)):
        h = re.sub(r'(id="f%s"[^>]*?height:calc\(var\(--u\)\*)([\d.]+)' % nid.replace(':', '-'), lambda m: m.group(1) + f'{hh * SY:.2f}', h, count=1)
    S = dict(S, h=S['h'] - CUT)
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
    return pinfit('04opp', '', apply_spec(h, sp), S)

# ------------------------------------------------------------------ 05 journey
TAILS = []; ORIG = {}
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
        sp.put(b['id'], 'bubble', tt, g, dur=.55); sp.put([x['id'] for x in tail], 'tail', tt, g, dur=.55)
        TAILS.extend(x['id'] for x in tail)
        ORIG[b['id']] = (dot['x'] + 9 - b['x'], dot['y'] + 9 - b['y'])  # grow out of the dot below
        for x in tail: ORIG[x['id']] = (dot['x'] + 9 - x['x'], dot['y'] + 9 - x['y'])
        sp.put([n['id'] for n in nodes if n['k'] == 'T' and inside(n, b)], 'btxt', tt, g)
    h = apply_spec(h, sp)
    for i in TAILS:  # Figma tails are 12px squares rotated 45° — draw the diamond (pointed tip), not the bounding box
        h = h.replace(f'id="{fid(i)}"', f'id="{fid(i)}" data-tail="1"', 1)
    for i, (ox, oy) in ORIG.items():
        h = h.replace(f'id="{fid(i)}"', f'id="{fid(i)}" data-o="{ox:.1f},{oy:.1f}"', 1)
    return section('05journey', 'fx', h, S['h'], sec_bg(S) + ' data-manual')

# ------------------------------------------------------------------ 06 initial hypothesis
def inithyp():
    """hand-built so the hypothesis text can be read on an iPad: H0 branches into H1–H3, each problem leads to its hypothesis"""
    S, nodes = parse(EX('2616-37765')); T = {n['id']: n['txt'].replace('⏎', ' ') for n in nodes if n['k'] in 'TD'}
    import render as R
    keep = [n for n in nodes if n['y'] < 300]
    R_parse = R.parse; R.parse = lambda p: (S, keep)
    _, h, _ = render(EX('2616-37765')); R.parse = R_parse
    sp = Spec(); hdr_spec(keep, sp, 300)
    cols = ''
    for k, (hn, ht, pb, hy) in enumerate([('37782', '37783', '37787', '37794'), ('37797', '37798', '37802', '37809'), ('37812', '37813', '37817', '37824')]):
        t = lambda i: E(T['2616:' + i])
        cols += (f'<div class="ihk" data-k="{k}"><p class="ihh"><b>{t(hn)}</b>{t(ht)}</p>'
                 f'<div class="ihp"><p class="k">문제</p><p>{t(pb)}</p></div><i class="iha"><s></s></i>'
                 f'<div class="ihy"><p class="k">가설</p><p>{t(hy)}</p></div></div>')
    br = ''.join(f'<path d="M660 0 V26 Q660 38 {660 + (12 if x > 660 else -12 if x < 660 else 0)} 38 H{x + (12 if x < 660 else -12) if x != 660 else 660} Q{x} 38 {x} 50 V72" />' if x != 660 else '<path d="M660 0 V72" />' for x in (218, 660, 1102))
    body = (f'<div class="ihx"><div class="ih0"><p class="k">{E(T["2616:37777"])}</p><p class="t">{E(T["2616:37778"])}</p></div>'
            f'<svg class="ihl" viewBox="0 0 1320 72" preserveAspectRatio="none" aria-hidden="true">{br}</svg><div class="ihc">{cols}</div></div>')
    from svgt import svg_title
    sv, sx_, sy_, sw_, sh_ = svg_title('2616:37770', 'What we believed at first')
    hh_ = apply_spec(h, sp)
    hh_ = re.sub(r'(<p class="fe ft[^"]*" id="f2616-37770"[^>]*?style=")[^"]*("[^>]*>)[^<]*</p>',
                 lambda m: m.group(1) + f'left:{U(700 - sw_ / 2)};top:{U(sy_)};width:{U(sw_)};height:{U(sh_)};color:#097bb5' + m.group(2).replace('<p', '<div') + sv + '</p>', hh_, count=1)
    hh_ = hh_.replace('class="fe ft " id="f2616-37770"', 'class="fe fd fsv" id="f2616-37770"')
    inner = f'<div class="ihhead fx" style="height:{U(300)}">{hh_}</div>{body}'
    return section('06inithyp', 'pinfit', f'<div class="fit">{inner}</div>', None, f' style="background:{S["bg"]}"')

# ------------------------------------------------------------------ 10 user flow
def flow():
    S, nodes = parse(EX('2616-38522'))
    acr = [n for n in nodes if n['id'] == '2616:38532'][0]
    mv = lambda n: 92 if (inside(n, acr) and n['id'] != acr['id']) else 0
    S2, h, _ = render(EX('2616-38522'), dx_fn=mv)
    sp = Spec(); hdr_spec(nodes, sp, 280)
    g = acr['id']; sp.put(g, 'rise', 0, g)
    # strictly in flow order, one step at a time: start → check → pass? (no → 대안 → back) → yes → type → A/B/C → hazard → arrive
    steps = [(['2616:38534', '2616:38535'], 'pop'), (['2616:38554'], 'draw'), (['2616:38536', '2616:38537'], 'pop'),
             (['2616:38555'], 'draw'), (['2616:38538', '2616:38539'], 'pop'),
             (['2616:38558', '2616:38559'], 'drawdown'), (['2616:38540', '2616:38541'], 'pop'), (['2616:38560'], 'drawrev'),
             (['2616:38556', '2616:38557'], 'draw'), (['2616:38542', '2616:38543'], 'pop'),
             (['2616:38561'], 'draw'), (['2616:38544', '2616:38545'], 'pop'), (['2616:38568', '2616:38569'], 'pop'),
             (['2616:38562'], 'draw'), (['2616:38546', '2616:38547'], 'pop'),
             (['2616:38563'], 'draw'), (['2616:38548', '2616:38549'], 'pop'),
             (['2616:38564'], 'draw'), (['2616:38550', '2616:38551'], 'pop'),
             (['2616:38565', '2616:38566', '2616:38567'], 'draw'), (['2616:38552', '2616:38553'], 'pop')]
    seq, t = [], .45
    for ids, a in steps:
        seq.append((ids, a, t)); t += .5 if a.startswith('draw') else .4
    for ids, a, t in seq: sp.put(ids, a, t, g, dur=(.6 if a.startswith('draw') else None))
    sp.put(['2616:38571', '2616:38572'], 'rise', t + .2, g, .12)
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
    t += .2; sp.put('2616:39524', 'rise', t, g); t += .4
    rows = ['2616:39525', '2616:39531', '2616:39537', '2616:39543', '2616:39549']
    for k, r in enumerate(rows):
        sp.put([n['id'] for n in nodes if inside(n, byid[r]) and n['id'] != r and n['k'] != 'G'], 'left', t + k * .3, g, .05)
    return pinfit('15loop', '', apply_spec(h, sp), S)

# ------------------------------------------------------------------ hand-built headers
TITLE_NODE = {'t_iv': ('2616:37830', 'Getting there starts before leaving'), 't_hy': ('2616:38100', '12 interviews rewrote our hypotheses'),
              't_so': ('2616:38290', 'Before you see it.'), 't_ut': ('2616:38579', 'Usability test'), 't_an': ('2616:38908', 'Six things, nothing more')}
def title_img(sec, box, color, name):
    from svgt import svg_title
    if name in TITLE_NODE:
        nid, lab = TITLE_NODE[name]; sv, x, y, w, h = svg_title(nid, lab)
        return f'<span class="htitle hsv" style="width:{U(w)};height:{U(h)}">{sv}</span>'
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
    return pinfit('08hyp', 'hx hy', hd + h)

def solution():
    h = secs5.solution('<section', None).split('>', 1)[1].rsplit('</section>', 1)[0]
    h = re.sub(r'<img class="hdr"[^>]*>', '', h)
    hd = head('06  ·  SOLUTION', title_img('2616:38285', (559.5, 151, 282.5, 33), '#71cbf8', 't_so'),
              '‘갈 수 있는지’는 집에서, ‘위험한지’는 보기 전에 알려줘요',
              [('en', 'Know whether you can get in from home — and see danger coming before it’s in front of you.'),
], dark=True)
    return section('09solution', 'hx so', f'<div class="sx so2"><div class="fit">{hd}{h}</div></div>')

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
    U3 = [('As Is · 1차', 'ut3a', 'ut3az2', ['배터리 %만 보여서, 남은 거리를 머릿속으로 계산해야 했어요'], [(89.6, 80, 6.5, 19)]),
          ('To Be · 3차', 'ut3c', 'ut3cz2', ['배터리를 % 대신 남은 주행 시간(120분)으로 보여줘요', '계산 없이 ‘갔다 올 수 있는지’ 바로 읽혀요'], [(85.1, 4.6, 11.8, 7.6)])]
    for it in secs5.UT:
        vers = U3 if it['n'] == 3 else [(l, im, z, notes, [(36, 72, 28, 26)] if z else []) for l, im, z, notes in it['vers']]
        qs = ''.join(f'<div class="xq"><span class="who">{E(w)}</span><p class="ko">{E(k)}</p><p class="en">{E(e)}</p></div>' for w, k, e in it['q'])
        ps = (f'<div class="xps"><div class="p"><p class="pk">문제</p><p>{E(it["p"])}</p></div><i class="xpa">→</i>'
              f'<div class="s"><p class="sk">해결</p><p class="sv">{E(it["s"])}</p></div></div>')
        why = ''
        if it['why']:
            a1, b1, c1 = it['why']
            why = (f'<div class="xwhy"><p class="wk">{E(a1)}</p><div class="xwm"><figure class="m x"><span><i>✕</i></span><figcaption>As Is · 왼쪽</figcaption></figure><em class="xar">→</em>'
                   f'<figure class="m o"><span><i>✓</i></span><figcaption>To Be · 오른쪽</figcaption></figure></div>'
                   f'<p class="wt">{E(b1)}</p></div>')
        figs, tabs, zs = '', '', ''
        for i, (lab, im, z, notes, zr) in enumerate(vers):
            tobe = lab.startswith('To')
            rr = ''.join(f'<i class="zr{" ok" if tobe else ""}" style="left:{x}%;top:{y}%;width:{w}%;height:{h}%"><em>확대</em></i>' for x, y, w, h in zr)
            if z:
                nn = ''.join(f'<li>{E(t)}</li>' for t in notes)
                zs += f'<div class="xz{" ok" if tobe else ""}" data-i="{i}"><p class="xzk">확대 · {E(lab)}</p><div class="xzi"><img src="s/{z}.webp" alt="{E(lab)} 확대"></div><ul>{nn}</ul></div>'
            figs += (f'<figure class="xf{" tobe" if tobe else ""}" data-i="{i}"><div class="xi"><img src="s/{im}.webp" alt="{E(lab)} 화면" loading="lazy">{rr}'
                     f'<span class="vl{" tb" if tobe else ""}">{E(lab)}</span></div></figure>')
            tabs += f'<button class="xt{" tb" if tobe else ""}" data-i="{i}"><i>{i + 1:02d}</i>{E(lab)}</button>'
        hdr = f'<header class="xh"><p class="xn"><span>UT {it["n"]:02d}</span>{E(it["prob"])}</p><h3>{it["head"].replace("<br>", " ")}</h3></header>'
        side = f'<div class="xzs">{zs}</div>' if zs else why
        out += (f'<article class="ux" data-n="{len(vers)}"><div class="fit"><div class="xg">'
                f'{hdr}<div class="xtabs">{tabs}<span class="xbar"><em></em></span></div>'
                f'<div class="xstage">{figs}</div><aside class="xside">{side}</aside>'
                f'{ps}<div class="xqs">{qs}</div>'
                f'</div></div></article>')
    return section('11iter', 'hx ut', hd + setup + out)

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
    def vid(i): v = vids[i]; return f'<div class="lvid"><video src="media/{v}.mp4" poster="media/{v}.jpg" muted playsinline loop preload="metadata"></video><span class="live">PROTOTYPE · S{i + 1}</span></div>'
    split = lambda i, rev: f'<div class="lsplit{" rev" if rev else ""}" data-i="{i}">{vid(i)}{cap(i)}</div>'
    full = lambda i: f'<div class="lfull" data-i="{i}"><div class="lstick">{vid(i)}</div><div class="lover">{cap(i, "ov")}</div></div>'
    panels = ''.join(f'<div class="hp">{vid(i)}{cap(i, "hc")}</div>' for i in (3, 4))
    dots = ''.join(f'<i data-i="{k}"></i>' for k in range(2))
    track = f'<div class="hwrap"><p class="hkick">건물 입구에서 도착 후까지 · 옆으로 넘겨 보기</p><div class="htrack">{panels}</div><div class="hdots">{dots}</div></div>'
    # triptych opener: the moving scene starts full-bleed, then shrinks to the centre while 'before' and 'at the door' slide in
    def tp(i, cls):
        v = vids[i]; lab = caps[i][0]
        media = (f'<video src="media/{v}.mp4" poster="media/{v}.jpg" muted playsinline loop preload="metadata"></video>' if cls == 'c'
                 else f'<img src="media/{v}.jpg" alt="" loading="lazy">')
        return f'<figure class="tp tp-{cls}"><div class="tpm">{media}</div><figcaption>{E(lab)}</figcaption></figure>'
    trip = (f'<div class="trip"><div class="tstage"><div class="thead"><p class="tkick">PROTOTYPE · 외출 한 번을 따라가 보면</p>'
            f'<h3 class="ttl">출발 전 집에서, 길 위에서, 건물 입구 앞에서<br>olways가 먼저 알려줘요</h3></div>'
            f'<div class="trow">{tp(1, "l")}{tp(2, "c")}{tp(3, "r")}</div></div></div>')
    # one continuous walkthrough: S1 → S5 on the same stage, a rail on top shows where you are in the trip
    rail = ''.join(f'<li data-i="{i}"><i>{i + 1:02d}</i><b>{E(caps[i][0].split(" · ")[0])}</b><span>{E(caps[i][0].split(" · ", 1)[-1])}</span><s><em></em></s></li>' for i in range(5))
    vs = ''.join(f'<div class="lxm" data-i="{i}"><video src="media/{v}.mp4" poster="media/{v}.jpg" muted playsinline loop preload="metadata"></video><span class="live">PROTOTYPE · S{i + 1}</span></div>' for i, v in enumerate(vids))
    cs = ''.join(f'<div class="lxc" data-i="{i}"><p class="lk"><i>{i + 1:02d}</i>{E(a)}</p><h3>{E(b)}</h3><p class="lb">{E(c)}</p><p class="le">{E(d)}</p></div>' for i, (a, b, c, d) in enumerate(caps))
    lx = f'<div class="lx"><div class="fit"><ol class="lxrail">{rail}</ol><div class="lxg"><div class="lxv">{vs}</div><div class="lxcs">{cs}</div></div></div></div>'
    inner = f'<div class="lhead fx" style="height:{U(560)}">{apply_spec(h, sp)}</div>' + trip + lx
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
    # field-of-view grid (Figma 2464:143): the whole lens is divided — clear sky band, left / centre / right panels, voice strip
    Z = [('fz-top', 2.2, 3.8, 65.0, 22.2, '수평선 위 · Keep clear', '시선 위는 비워 둬요'),
         ('fz-l', 2.2, 29.8, 22.8, 66.4, '좌측 패널', '알림 · 메시지'),
         ('fz-c ctr', 26.6, 29.8, 40.6, 44.5, '중앙 — 위험 · 경로만', '시선 수평선 37–40%'),
         ('fz-v', 26.6, 78.0, 40.6, 18.2, '하단 · 음성', '음성 캡슐'),
         ('fz-r', 68.6, 3.8, 29.1, 92.4, '우측 패널', '상태 위젯 + 내비 카드')]
    fov = '<div class="fovz">' + ''.join(f'<div class="z {c}" style="left:{x}%;top:{y}%;width:{w}%;height:{h}%"><span class="zl"><b>{E(b1)}</b><i>{E(i1)}</i></span></div>' for c, x, y, w, h, b1, i1 in Z) + '<i class="hz" style="top:28%;right:32.4%"><span>시선 수평선</span></i></div>'
    fovtxt = (f'<div class="fovt"><p class="fk">{E(t["2616:39119"])}</p><h3>{E(t["2616:39120"])}</h3>'
              f'<div class="fill"><img src="m/fov_ill.webp" alt="아래 · 좌우는 편하고, 위 · 대각선은 보기 어려워요 (Downward · Left and Right · Upward and Diagonal)"></div>'
              f'<p class="fb">{E(t["2616:39168"])}</p><p class="fs2">{E(t["2616:39169"])}</p></div>')
    inner = (f'<div class="sx an1"><div class="fit">{hd}'
             f'<div class="awrap ax"><div class="ashot"><img src="m/anat.jpg" alt="최종 렌즈 화면 — 여섯 요소" loading="lazy"><i class="spot"></i>{badges}</div>'
             f'<div class="agrid">{cards}</div></div></div></div>'
             f'<div class="sx an2"><div class="fit"><div class="fovg">{fovtxt}<div class="fovshot"><img src="m/anat.jpg" alt="" loading="lazy">{fov}</div></div></div></div>')
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
    inner = (f'<div class="sx pj1"><div class="fit"><div class="ahead fx" style="height:{U(300)}">{apply_spec(h, sp)}</div>'
             f'<div class="awrap ax"><div class="ashot ps"><img src="m/pass.jpg" alt="입구 판정 화면" loading="lazy"><i class="spot"></i>{badges}</div>'
             f'<div class="agrid g3">{cards}</div></div></div></div>')
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

def clean_curve():
    """the journey curve raster was cut from the Figma composite, so it carries pieces of the speech bubbles and grid lines.
    keep only the blue stroke, and clear every bubble/tail rectangle"""
    S, nodes = parse(EX('2616-37609')); byid = {n['id']: n for n in nodes}
    cv = byid['2616:37679']; f = OUT + 'm/2616-37679.png'
    a = np.asarray(Image.open(f).convert('RGBA')).astype(np.int32)
    k = a.shape[1] / cv['w']
    r, g, b, al = a[..., 0], a[..., 1], a[..., 2], a[..., 3]
    keep = (b - r > 70) & (b > 110) & (al > 30)
    blue = [n for n in nodes if n['k'] == 'B' and n.get('name') == 'Bubble' and 'e2f3ff' in str(n.get('bg'))]  # orange bubbles carry no blue
    tails = [n for n in nodes if n['k'] == 'B' and n.get('name') == 'Rectangle' and n['w'] < 20 and any(bb['x'] < n['x'] < bb['x'] + bb['w'] and abs(n['y'] - bb['y'] - bb['h']) < 14 for bb in blue)]
    for n in blue + tails:
        if True:
            x0, y0 = int((n['x'] - cv['x']) * k) - 4, int((n['y'] - cv['y']) * k) - 4
            x1, y1 = int((n['x'] + n['w'] - cv['x']) * k) + 4, int((n['y'] + n['h'] - cv['y']) * k) + 6
            keep[max(0, y0):max(0, y1), max(0, x0):max(0, x1)] = False
    a[..., 3] = np.where(keep, al, 0)
    Image.fromarray(a.astype(np.uint8), 'RGBA').save(f, optimize=True)

if __name__ == '__main__':
    prep_assets()
    GEN = {'02overview': overview, '03problem': problem, '04opp': opp, '05journey': journey, '06inithyp': inithyp, '07interview': interview,
           '08hyp': hyp, '09solution': solution, '10flow': flow, '11iter': ut, '12lens': lens, '13anat': anatomy, '14pass': passj, '15loop': loop}
    secs = [chapter(k) if k in CHAPS else GEN[k]() if k in GEN else raster(k) for k in ORDER]
    clean_curve()
    # bubble numbers were cut from the Figma composite and carry a sliver of the label above: keep only the numeral band
    for f in ('2616-37283', '2616-37287', '2616-37291'):
        fp = OUT + 'm/' + f + '.png'; a_ = np.asarray(Image.open(fp).convert('RGBA')).copy()
        rows = (a_[..., 3] > 60).sum(1) > 0; best, cur, start = (0, 0), 0, 0
        for i, r in enumerate(rows):
            if r:
                if cur == 0: start = i
                cur += 1
                if cur > best[1] - best[0]: best = (start, i + 1)
            else: cur = 0
        a_[:max(0, best[0] - 2), :, 3] = 0; a_[best[1] + 2:, :, 3] = 0
        Image.fromarray(a_, 'RGBA').save(fp)
    # small Figma text is hard to read on an iPad: everything under 15 grows by 1.5 design units
    def bump_el(m):
        tag, txt = m.group(0), m.group(2)
        plain = re.sub(r'<[^>]+>', '', txt).strip()
        if not plain or re.fullmatch(r'[A-Z0-9 ·&—\-–:/.()%×+]+', plain) or len(plain) < 6: return tag
        return re.sub(r'font-size:calc\(var\(--u\)\*([\d.]+)\)', lambda q: f'font-size:calc(var(--u)*{float(q.group(1)) + (1.5 if float(q.group(1)) < 15 else 0):.2f})', tag, count=1)
    secs = [x if 'id="s10flow"' in x else re.sub(r'(<p class="fe ft[^"]*"[^>]*>)(.*?)</p>', bump_el, x, flags=re.S) for x in secs]
    # Problem charts share one small-type pair: labels 12, values / chart text 14
    def pmap(x):
        def tag(m):
            t = m.group(0)
            if 'data-g="hdr' in t: return t
            def fs(q):
                v = float(q.group(1)); v = 12 if v < 12.5 else 14 if v < 15.9 else v
                return f'font-size:calc(var(--u)*{v:g})'
            return re.sub(r'font-size:calc\(var\(--u\)\*([\d.]+)\)', fs, t)
        return re.sub(r'<[^>]*class="fe[^"]*"[^>]*>', tag, x) if 'id="s03problem"' in x else x
    secs = [pmap(x) for x in secs]
    def fig_tag(m):
        t = m.group(0)
        if 'data-g="hdr' in t and t.startswith('<p'):
            L = re.search(r'left:calc\(var\(--u\)\*(-?[\d.]+)\)', t); W = re.search(r'width:calc\(var\(--u\)\*([\d.]+)\)', t)
            if L and W and abs(float(L.group(1)) + float(W.group(1)) / 2 - 700) < 40 and 'src=' not in t and 'fsv' not in t and 'fd ' not in t:
                t = t.replace(L.group(0), 'left:calc(var(--u)*40)', 1).replace(W.group(0), 'width:calc(var(--u)*1320)', 1)
                t = re.sub(r'style="([^"]*)"', lambda q: f'style="{q.group(1)};text-align:center"', t, count=1)
            return t
        return t.replace('font-size:calc(var(--u)*', 'font-size:calc(1*var(--u)*')
    secs = [re.sub(r'(<p class="fe[^"]*"[^>]*data-g="hdr[^>]*>)([A-Z0-9 ·&.\-–]+</p>)', lambda m: m.group(1).replace('font-size:calc(var(--u)*', 'font-size:calc(1*var(--u)*') + m.group(2), x) for x in secs]
    secs = [re.sub(r'<[^>]*class="fe[^"]*"[^>]*>', fig_tag, x) for x in secs]
    # speech-bubble text in the journey chart is sized to its bubble: keep it out of the type-scale snap
    secs = [re.sub(r'<[^>]*data-a="btxt"[^>]*>', lambda m: m.group(0).replace('font-size:calc(var(--u)*', 'font-size:calc(1*var(--u)*'), x) for x in secs]
    logo = open('/tmp/claude-0/site/img/logo.svg').read().replace('<svg ', '<svg aria-hidden="true" ')
    tpl = open('/tmp/claude-0/v6/tpl6.html', encoding='utf-8').read()
    css5 = open('/tmp/claude-0/v5/css5.css').read()
    css6 = open('/tmp/claude-0/v6/css6.css').read()
    css = css5 + '\n' + css6
    css = re.sub(r'/\*U\{\*/(.*?)/\*\}U\*/', lambda m: re.sub(r'(?<![\w.#-])(-?\d+(?:\.\d+)?)u\b', lambda n: f'calc(var(--u)*{n.group(1)})', m.group(1)), css, flags=re.S)
    out = tpl.replace('{{CSS}}', css).replace('{{SECTIONS}}', '\n'.join(secs)).replace('{{JS}}', open('/tmp/claude-0/v6/js6.js').read()).replace('{{LOGO}}', json.dumps(logo))
    # one type scale for the whole page: caption 14 · body 17 · title 24 · headline 36 · statement 48 (+ giant kinetic numbers)
    def tier(v):
        v = float(v)
        return 14 if v < 15.5 else 17 if v < 20.5 else 24 if v < 30.5 else 36 if v < 42 else 48 if v < 100 else v
    snap = lambda m: f'{m.group(1)}calc(var(--u)*{tier(m.group(2)):g})'
    out = re.sub(r'(font-size:\s*)calc\(var\(--u\)\*([\d.]+)\)', snap, out)
    out = re.sub(r'(font:[^;{}]*?\s)calc\(var\(--u\)\*([\d.]+)\)(?=/)', snap, out)
    # one voice: sentences end in -요, labels end as nouns
    for x_, y_ in [('것이다.', '거예요.'), ('것이다', '거예요'), ('이어진다.', '이어져요.'), ('놓친다.', '놓쳐요.'), ('쌓인다.', '쌓여요.'),
                   ('보여준다.', '보여줘요.'), ('보조한다.', '보조해요.'), ('알려준다.', '알려줘요.'),
                   ('1곳 이상 방문했다', '1곳 이상 방문'), ('한 곳도 가지 못했다', '한 곳도 못 감')]:
        out = out.replace(x_, y_)
    open(OUT + 'index.html', 'w', encoding='utf-8').write(out)
    print(len(out))
