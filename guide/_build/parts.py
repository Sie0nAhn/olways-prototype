import numpy as np, cv2
from PIL import Image
# metadata-based parts (section coords, 1x)
logos=[(467,544),(213,596),(286,676),(436,710),(166,756),(346,789),(164,822),(428,835),(263,867),(508,876),(584,868),(333,914)]
PROB=[dict(r=(64-4,479-4,192,81),kind='barh'),dict(r=(64-4,564-4,325,97),kind='barh'),
 dict(r=(745,425,220,225),kind='pop'),dict(r=(950,431,113,113),kind='pop'),dict(r=(966,546,98,98),kind='pop'),
 dict(r=(62,1234-2,144,51),kind='barv'),dict(r=(202,1133-2,164,152),kind='barv'),dict(r=(362,1063-2,224,222),kind='barv'),
 dict(r=(730,1168,146,60),kind='barv'),dict(r=(884,1107,146,122),kind='barv'),dict(r=(1038,1051,146,178),kind='barv'),dict(r=(1192,1035,146,194),kind='barv')]
META_PARTS={
 ('03problem','Frame'): PROB,
 ('04opp','Positioning map v2'): [dict(r=(x-30,y-4,106,80),kind='logo') for x,y in logos]+[dict(r=(760,436,320,268),kind='hero')],
 ('05journey','Journey'): [dict(r=(150,606,1115,104),kind='curve')]
   +[dict(r=(x-3,y-3,24,24),kind='dot') for x,y in [(145,604),(360,694),(539,649),(720,694),(893,649),(1070,649),(1251,649)]]
   +[dict(r=(x-2,y-2,172,h+8),kind='bubble') for x,y,h in [(110,520,69),(287,595,84),(464,566,67),(641,611,67),(818,581,52),(995,581,52)]]
   +[dict(r=(x-2,388-2,172,120),kind='drop') for x in [110,286,462,638,815,991,1167]],
}
def pixel_parts(img, x0frac=0.0, x1frac=1.0, S=2):
    """detect chart marks (bars/bubbles/big numbers) inside a light card"""
    a=np.asarray(img.convert('RGB')).astype(np.int16)
    H,W,_=a.shape
    mx=a.max(2); mn=a.min(2)
    ink=((mn<=236)|((mx-mn)>26)).astype(np.uint8)*255
    ink[:, :int(W*x0frac)]=0; ink[:, int(W*x1frac):]=0
    k=np.ones((13,13),np.uint8)
    op=cv2.morphologyEx(ink,cv2.MORPH_OPEN,k)
    op=cv2.morphologyEx(op,cv2.MORPH_CLOSE,np.ones((5,5),np.uint8))
    n,lab,st,_=cv2.connectedComponentsWithStats(op)
    boxes=[]
    def cut(x,y,w,h,depth=0):
        sub=op[y:y+h,x:x+w]>0
        if depth<6:
            for axis in (1,0):
                prof=sub.any(axis=0 if axis==1 else 1)
                idx=np.where(~prof)[0]
                L=len(prof)
                # find interior gap >= 10px
                runs=[];start=None
                for i2 in range(L):
                    if not prof[i2]:
                        if start is None: start=i2
                    else:
                        if start is not None:
                            if start>0 and i2-start>=10: runs.append((start,i2))
                            start=None
                if runs:
                    a,b2=max(runs,key=lambda r:r[1]-r[0]); m=(a+b2)//2
                    if axis==1: cut(x,y,m,h,depth+1); cut(x+m,y,w-m,h,depth+1)
                    else: cut(x,y,w,m,depth+1); cut(x,y+m,w,h-m,depth+1)
                    return
        ys,xs=np.where(sub)
        if len(xs)==0: return
        boxes.append((x+xs.min(),y+ys.min(),xs.max()-xs.min()+1,ys.max()-ys.min()+1,len(xs)))
    for i in range(1,n):
        x,y,w,h,area=st[i]
        if area<4200: continue
        cut(x,y,w,h)
    out=[]
    bots={}
    for x,y,w,h,area in boxes:
        if area<4200 or w<40 or h<40: continue
        bots.setdefault(round((y+h)/24),[]).append((x,y,w,h))
    for x,y,w,h,area in boxes:
        if area<4200 or w<40 or h<40: continue
        if w>W*0.92 and h>H*0.6: continue
        fill=area/(w*h)
        same=[b for b in bots.get(round((y+h)/24),[]) if b!=(x,y,w,h)]
        if same and any(abs(b[3]-h)>20 for b in same) and abs(w-h)>0.15*max(w,h): kind='barv'
        elif w>1.6*h: kind='barh'
        elif h>1.25*w: kind='barv'
        else: kind='pop'
        out.append(dict(px=(x,y,w,h),kind=kind,fill=fill))
    return out
def erase(arr,mask):
    """row-interpolate masked pixels from neighbours"""
    out=arr.astype(np.float32).copy(); H,W,_=arr.shape; xs=np.arange(W)
    for y in range(H):
        m=mask[y]>0
        if not m.any(): continue
        v=~m
        if v.sum()<2: continue
        for c in range(3): out[y,m,c]=np.interp(xs[m],xs[v],out[y,v,c])
    sm=cv2.GaussianBlur(out,(0,0),2)
    mf=cv2.GaussianBlur(mask.astype(np.float32)/255,(0,0),1.5)[...,None]
    return (arr*(1-mf)+sm*mf).clip(0,255).astype(np.uint8)
