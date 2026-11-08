"""Render a Figma extraction dump (ex/*.txt) into absolutely-positioned HTML in design units (u = 1/1400 vw).
Dystopian text and vectors are lifted off the 2x section render with a background-aware matte, so they carry no box."""
import re, html, os, numpy as np
from PIL import Image
Image.MAX_IMAGE_PIXELS = None
OUT = '/tmp/claude-0/site6/'
os.makedirs(OUT + 'm', exist_ok=True)
SECPNG = {'2616:37224': '02overview', '2616:37234': '03problem', '2616:37374': '04opp', '2616:37609': '05journey',
          '2616:37765': '06inithyp', '2616:38522': '10flow', '2616:39495': '15loop', '2616:38829': '12lens',
          '2616:38903': '13anat', '2616:39191': '14pass', '2616:37825': '07interview', '2616:38094': '08hyp',
          '2616:38285': '09solution', '2616:38573': '11iter'}
W = {'Thin': 100, 'ExtraLight': 200, 'Light': 300, 'Regular': 400, 'Medium': 500, 'SemiBold': 600, 'Bold': 700, 'ExtraBold': 800, 'Heavy': 900, 'Black': 900}
FAM = {'Google Sans Flex': 'var(--f-gsf)'}
U = lambda v: f'calc(var(--u)*{float(v):.2f})'
_cache = {}

def secimg(sec):
    k = SECPNG[sec]
    if k not in _cache: _cache[k] = np.asarray(Image.open(f'/tmp/claude-0/v3/sec/{k}.png').convert('RGB')).astype(np.float32)
    return _cache[k]

def parse(path):
    nodes = []; S = None
    for ln in open(path, encoding='utf-8').read().split('\n'):
        if not ln or ln.startswith('/'): continue
        t = ln[0]
        if t == 'S':
            m = re.match(r'S (\S+) ([\d.]+),([\d.]+) bg:(.*)', ln); S = dict(id=m[1], w=float(m[2]), h=float(m[3]), bg=m[4]); continue
        p = ln.split(' ', 3)
        n = dict(k=t, id=p[1], x=0, y=0, w=0, h=0)
        if t in 'BGTDIV':
            x, y, w, h = map(float, p[2].split(',')); n.update(x=x, y=y, w=w, h=h); rest = p[3] if len(p) > 3 else ''
        if t in 'TD':
            meta, txt = rest.split(' | ', 1)
            fam, st, sz = re.match(r'(.+?):(\w+):([\d.]+)', meta).groups()
            n.update(fam=fam, st=st, sz=float(sz), txt=txt,
                     lh=re.search(r'lh:(\S+)', meta)[1], ls=re.search(r'ls:(\S+)', meta)[1],
                     col=meta.split(' ')[3] if False else re.search(r'ls:\S+ (\S+)', meta)[1],
                     al=re.search(r'ls:\S+ \S+ (\w)', meta)[1], nw=' nw' in meta, op=(re.search(r'op:([\d.]+)', meta) or [0, None])[1])
        elif t == 'B':
            nm = rest.split(' ~')[-1] if ' ~' in rest else ''
            body = rest.split(' ~')[0].replace(' clip', '')
            d, r = re.match(r'd(\d+) r:(\S+)', body).groups()
            props = dict(re.findall(r'(bg|sh|bd|op|bm|bb|lb):(.*?)(?= (?:bg|sh|bd|op|bm|bb|lb):|$)', body[len(f'd{d} r:{r}'):].strip()))
            n.update(d=int(d), r=r, name=nm, **props)
        elif t == 'I':
            n.update(r=re.search(r'r:(\S+)', rest)[1], sh=(re.search(r'sh:(.*?)(?= bd:|$)', rest) or [0, ''])[1], bd=(re.search(r'bd:(.*)$', rest) or [0, ''])[1], name=rest)
        elif t == 'V':
            n.update(name=rest)
        elif t == 'G':
            n.update(name=rest.split('~')[-1])
        nodes.append(n)
    return S, nodes

def rad(r):
    if r in ('0', None): return ''
    if r == '50%': return 'border-radius:50%;'
    return 'border-radius:' + ' '.join(U(v) for v in r.split('/')) + ';'

def scale_px(s):
    return re.sub(r'(-?[\d.]+)px', lambda m: U(m[1]), s)

def box_style(n):
    st = rad(n.get('r'))
    if n.get('bg'): st += f"background:{n['bg']};"
    if n.get('sh'): st += f"box-shadow:{scale_px(n['sh'])};"
    if n.get('bd'):
        w, c, a = re.match(r'([\d.]+)px (\S+) (\w)', n['bd']).groups()
        dash = 'dashed' if 'dash' in n['bd'] else 'solid'
        st += (f"outline:{U(w)} {dash} {c};" if a == 'O' else f"border:{U(w)} {dash} {c};box-sizing:border-box;")
    if n.get('op'): st += f"opacity:{n['op']};"
    if n.get('bm'): st += f"mix-blend-mode:{n['bm'].lower().replace('_', '-')};"
    if n.get('bb'): st += f"-webkit-backdrop-filter:blur({U(float(n['bb'])/2)});backdrop-filter:blur({U(float(n['bb'])/2)});"
    if n.get('lb'): st += f"filter:blur({U(float(n['lb'])/2)});"
    return st

def pos(n, dx=0, dy=0):
    return f"left:{U(n['x']+dx)};top:{U(n['y']+dy)};width:{U(n['w'])};height:{U(n['h'])};"

def seg_html(txt, base_w):
    out = ''; i = 0
    for m in re.finditer(r'\{(\w+)\|([^|]*)\|([\d.]+)\}(.*?)\{/\}', txt):
        out += html.escape(txt[i:m.start()])
        out += f'<span style="font-weight:{W.get(m[1],400)};color:{m[2]};font-size:{U(m[3])}">{html.escape(m[4])}</span>'
        i = m.end()
    out += html.escape(txt[i:])
    return out.replace('⏎', '<br>')

def text_html(n, dx=0, dy=0, cls=''):
    lh = n['lh']; lh = 'normal' if lh == 'n' else (U(lh[:-2]) if lh.endswith('px') else lh)
    ls = n['ls']; ls = '0' if ls == '0' else (ls if ls.endswith('em') else U(ls[:-2]))
    fam = FAM.get(n['fam'], 'var(--f-suit)')
    al = {'L': 'left', 'C': 'center', 'R': 'right', 'J': 'justify'}[n['al']]
    w = n['w'] + (4 if n['nw'] else 2)
    x = n['x'] + dx - (2 if (n['nw'] and al == 'center') else (1 if al == 'center' else 0))
    st = (f"left:{U(x)};top:{U(n['y']+dy)};width:{U(w)};font-family:{fam};font-weight:{W.get(n['st'],400)};font-size:{U(n['sz'])};"
          f"line-height:{lh};letter-spacing:{ls};color:{n['col']};text-align:{al};" + ('white-space:nowrap;' if n['nw'] else '') + (f"opacity:{n['op']};" if n['op'] else ''))
    return f'<p class="fe ft {cls}" id="f{n["id"].replace(":","-")}" style="{st}">{seg_html(n["txt"], n["w"])}</p>'

def hex2rgb(c):
    if c.startswith('#'): return np.array([int(c[i:i+2], 16) for i in (1, 3, 5)], np.float32), 1.0
    v = re.findall(r'[\d.]+', c); return np.array(list(map(float, v[:3])), np.float32), float(v[3]) if len(v) > 3 else 1.0

def matte(sec, n, fg=None, pad=3, name=None, bgfill=None):
    """lift a glyph/vector off the section render. fg: known colour (#hex) or None for colour-to-alpha."""
    A = secimg(sec); S = 2
    x0, y0 = int((n['x']-pad)*S), int((n['y']-pad)*S); x1, y1 = int(np.ceil((n['x']+n['w']+pad)*S)), int(np.ceil((n['y']+n['h']+pad)*S))
    H, Wd, _ = A.shape; x0, y0 = max(0, x0), max(0, y0); x1, y1 = min(Wd, x1), min(H, y1)
    I = A[y0:y1, x0:x1]
    if bgfill is not None:
        B = np.broadcast_to(np.array(bgfill, np.float32), I.shape).copy()
    else:
        top, bot = I[0], I[-1]; h = I.shape[0]
        t = np.linspace(0, 1, h)[:, None, None]
        B = top[None] * (1 - t) + bot[None] * t
        # where top/bottom borders disagree strongly with left/right ones, blend toward left-right interpolation
        lef, rig = I[:, 0], I[:, -1]; s = np.linspace(0, 1, I.shape[1])[None, :, None]
        B2 = lef[:, None] * (1 - s) + rig[:, None] * s
        B = (B + B2) / 2
    if fg is not None:
        F, fa = hex2rgb(fg)
        d = F - B; den = (d * d).sum(-1); den[den < 1] = 1
        a = np.clip(((I - B) * d).sum(-1) / den, 0, 1)
        rgb = np.broadcast_to(F, I.shape)
    else:
        diff = I - B
        lim = np.where(diff > 0, 255 - B, B); lim[lim < 1] = 1
        a = np.clip((np.abs(diff) / lim).max(-1), 0, 1)
        a[a < 0.02] = 0
        safe = np.where(a > 0, a, 1)[..., None]
        rgb = np.clip(B + diff / safe, 0, 255)
    out = np.dstack([rgb, a * 255]).astype(np.uint8)
    fn = f'm/{name or n["id"].replace(":","-")}.png'
    Image.fromarray(out, 'RGBA').save(OUT + fn, optimize=True)
    return fn, (x0/S, y0/S, (x1-x0)/S, (y1-y0)/S)

def crop(sec, n, name=None, q=88):
    A = secimg(sec); S = 2
    x0, y0, x1, y1 = [int(round(v*S)) for v in (n['x'], n['y'], n['x']+n['w'], n['y']+n['h'])]
    fn = f'm/{name or n["id"].replace(":","-")}.webp'
    Image.fromarray(A[y0:y1, x0:x1].astype(np.uint8)).save(OUT + fn, quality=q, method=6)
    return fn

def img_html(fn, box, dx=0, dy=0, cls='', idn='', style=''):
    x, y, w, h = box
    return f'<img class="fe fi {cls}" {idn} src="{fn}" alt="" style="left:{U(x+dx)};top:{U(y+dy)};width:{U(w)};height:{U(h)};{style}">'

def render(path, skip=(), dx_fn=None, dy_fn=None, cls_fn=None, matte_bg=None):
    """returns (S, html, nodes). dx_fn(n)->dx shift; cls_fn(n)->extra classes"""
    S, nodes = parse(path); sec = S['id']; out = []
    skipped = set(skip)
    for n in nodes:
        if n['id'] in skipped or n['k'] == 'G': continue
        dx = dx_fn(n) if dx_fn else 0; dy = dy_fn(n) if dy_fn else 0; c = cls_fn(n) if cls_fn else ''
        idn = f'id="f{n["id"].replace(":","-")}"'
        if n['k'] == 'B':
            st = box_style(n)
            if not (n.get('bg') or n.get('sh') or n.get('bd')): continue
            out.append(f'<div class="fe fb {c}" {idn} data-d="{n["d"]}" style="{pos(n,dx,dy)}{st}"></div>')
        elif n['k'] == 'T':
            out.append(text_html(n, dx, dy, c))
        elif n['k'] == 'D':
            fn, box = matte(sec, n, fg=n['col'].split(' ')[0])
            out.append(img_html(fn, box, dx, dy, 'fd ' + c, idn))
        elif n['k'] == 'V':
            fn, box = matte(sec, n, fg=None, pad=2)
            out.append(img_html(fn, box, dx, dy, 'fv ' + c, idn))
        elif n['k'] == 'I':
            fn = crop(sec, n)
            st = rad(n['r']) + (f"box-shadow:{scale_px(n['sh'])};" if n.get('sh') else '')
            if n.get('bd'):
                w, col, a = re.match(r'([\d.]+)px (\S+) (\w)', n['bd']).groups()
                st += f"outline:{U(w)} solid {col};" + ('outline-offset:0;' if a == 'O' else f'outline-offset:{U(-float(w))};')
            out.append(f'<img class="fe fi {c}" {idn} src="{fn}" alt="" style="{pos(n,dx,dy)}{st}object-fit:cover">')
    return S, '\n'.join(out), nodes
