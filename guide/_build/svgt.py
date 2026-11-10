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
