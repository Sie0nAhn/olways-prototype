import re, os, html
D = '/tmp/claude-0/v6/svg/'
def svg_title(nid, label=''):
    """outlined Figma text → (inline svg markup, x, y, w, h) in section coordinates, or None"""
    p = D + nid.replace(':', '-') + '.svg'
    if not os.path.exists(p): return None
    s = open(p, encoding='utf-8').read()
    w, h = map(float, re.search(r'width="([\d.]+)" height="([\d.]+)"', s).groups())
    rects = re.findall(r'<rect width="1400"[^>]*translate\(([-\d.]+) ([-\d.]+)\)', s)
    x, y = -float(rects[1][0]), -float(rects[1][1])
    path = re.search(r'<path [^>]*/>', s).group(0)
    path = re.sub(r' id="[^"]*"', '', path)
    lab = html.escape(label)
    return (f'<svg viewBox="0 0 {w:g} {h:g}" role="img" aria-label="{lab}" preserveAspectRatio="none">{path}</svg>', x, y, w, h)

def left_align(sv):
    """re-flow a centred multi-line outlined title so every line starts at x=0"""
    import re, sys
    sys.path.insert(0, '/tmp/claude-0/v6/gl')
    from glyph import subpaths, pts, shift
    def fix(m):
        sps = subpaths(m.group(1))
        bb = [pts(s) for s in sps]
        ys = sorted(set(round((b[2] + b[3]) / 2) for b in bb))
        mid = (min(b[2] for b in bb) + max(b[3] for b in bb)) / 2
        lines = {}
        for s, b in zip(sps, bb):
            lines.setdefault((b[2] + b[3]) / 2 > mid, []).append((s, b))
        out = []
        for k, items in lines.items():
            l = min(b[0] for _, b in items)
            for s, _ in items: out += shift(s, -l)
        return 'd="' + ' '.join(out) + '"'
    return re.sub(r'd="([^"]*)"', fix, sv)
