import re
NUM=r'-?(?:\d+\.?\d*|\.\d+)(?:e[-+]?\d+)?'
def toks(d): return re.findall(r'[MLCHVZ]|'+NUM,d)
def subpaths(d):
    out=[];cur=[]
    for t in toks(d):
        if t=='M' and cur: out.append(cur);cur=[]
        cur.append(t)
    if cur: out.append(cur)
    return out
def pts(sp):
    xs=[];ys=[];cmd=None;args=[];lx=ly=0
    i=0
    res=[]
    for t in sp:
        if t in 'MLCHVZ': cmd=t;args=[]
        else:
            args.append(float(t))
            if cmd=='H': xs.append(args[0]);lx=args[0];args=[]
            elif cmd=='V': ys.append(args[0]);ly=args[0];xs.append(lx);args=[]
            elif len(args)==2: xs.append(args[0]);ys.append(args[1]);lx,ly=args;args=[]
    return min(xs),max(xs),min(ys),max(ys)
def shift(sp,dx):
    o=[];cmd=None;n=0
    for t in sp:
        if t in 'MLCHVZ': cmd=t;n=0;o.append(t);continue
        v=float(t)
        if cmd=='H' or (cmd in 'MLC' and n%2==0): v+=dx
        n+=1;o.append(f'{v:.3f}')
    return o
def glyphs(d,text):
    sps=[(pts(s),s) for s in subpaths(d)]
    sps.sort(key=lambda a:a[0][0])
    cl=[]
    for b,s in sps:
        if cl and b[0] < cl[-1]['r']-0.3 and (b[1]-b[0]<(cl[-1]['r']-cl[-1]['l'])+1 or b[0]<cl[-1]['r']-2):
            c=cl[-1];c['r']=max(c['r'],b[1]);c['l']=min(c['l'],b[0]);c['s'].append(s)
        else: cl.append({'l':b[0],'r':b[1],'s':[s]})
    chars=[c for c in text if c!=' ']
    return cl,chars
