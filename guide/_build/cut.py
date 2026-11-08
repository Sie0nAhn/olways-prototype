import json,os
import numpy as np, cv2, sys
sys.path.insert(0,'/tmp/claude-0/v3')
from parts import META_PARTS,pixel_parts,erase
from PIL import Image, ImageFilter
Image.MAX_IMAGE_PIXELS=None
B=json.load(open('/tmp/claude-0/v3/blocks.json'))
B['04opp']['blocks']=[b for b in B['04opp']['blocks'] if b['name']!='Map + Legend']
B['09solution']['blocks']=[b for b in B['09solution']['blocks'] if b['name'] in ('Tag','Sub block','Knowing point') or b['name'].startswith('Before you')]
json.dump(B,open('/tmp/claude-0/v3/blocks.json','w'),ensure_ascii=False)
OUT='/tmp/claude-0/site3/s'; os.makedirs(OUT,exist_ok=True)
PAD=6; S=2
for key,sec in B.items():
    im=Image.open(f'/tmp/claude-0/v3/sec/{key}.png').convert('RGB')
    W,H=im.size
    arr=np.array(im)
    mask=np.zeros((H,W),np.uint8)
    for i,b in enumerate(sec['blocks']):
        x0=max(0,int((b['x']-PAD)*S)); y0=max(0,int((b['y']-PAD)*S)); x1=min(W,int((b['x']+b['w']+PAD)*S+.999)); y1=min(H,int((b['y']+b['h']+PAD)*S+.999))
        b['cx'],b['cy'],b['cw'],b['ch']=x0/S,y0/S,(x1-x0)/S,(y1-y0)/S
        b['src']=f's/{key}_{i:02d}.webp'
        crop=im.crop((x0,y0,x1,y1)); b['parts']=[]
        specs=[]
        mp=META_PARTS.get((key,b['name']))
        if mp:
            for p in mp:
                rx,ry,rw,rh=p['r']
                if not (b['cx']<=rx+rw/2<=b['cx']+b['cw'] and b['cy']<=ry+rh/2<=b['cy']+b['ch']): continue
                specs.append((int(rx*S)-x0,int(ry*S)-y0,int(rw*S),int(rh*S),p['kind']))
        elif (key=='07interview' and (b['name']=='box' and b['w']>600)) or (key=='07interview' and b['name'].startswith('Check group')):
            fr=0.6 if b['name'].startswith('Check group') else 1.0
            for p in pixel_parts(crop,0,fr): px,py,pw,ph=p['px']; specs.append((px-6,py-6,pw+12,ph+12,p['kind']))
        if specs:
            ca=np.array(crop); msk=np.zeros(ca.shape[:2],np.uint8)
            for j,(px,py,pw,ph,kind) in enumerate(specs):
                px=max(0,px);py=max(0,py);pw=min(ca.shape[1]-px,pw);ph=min(ca.shape[0]-py,ph)
                src=f's/{key}_{i:02d}_p{j:02d}.webp'
                Image.fromarray(ca[py:py+ph,px:px+pw]).save(f'/tmp/claude-0/site3/{src}',quality=90,method=6)
                b['parts'].append(dict(src=src,x=(x0+px)/S,y=(y0+py)/S,w=pw/S,h=ph/S,kind=kind))
                if kind!='curve': msk[py:py+ph,px:px+pw]=255
                else: msk[py:py+ph,px:px+pw]=255
            crop=Image.fromarray(erase(ca,msk))
        crop.save(f'/tmp/claude-0/site3/{b["src"]}',quality=90,method=6)
        mask[y0:y1,x0:x1]=255
    # plate: per-row linear interpolation across masked spans
    plate=arr.astype(np.float32).copy()
    xs=np.arange(W)
    prev=None
    for y in range(H):
        m=mask[y]>0
        if not m.any(): prev=plate[y]; continue
        v=~m
        if v.sum()<4:
            plate[y]=prev if prev is not None else plate[y]; continue
        for ch in range(3):
            plate[y,m,ch]=np.interp(xs[m],xs[v],plate[y,v,ch])
        prev=plate[y]
    sm=cv2.GaussianBlur(plate,(0,0),6)
    mf=cv2.GaussianBlur(mask.astype(np.float32)/255,(0,0),3)[...,None]
    plate=(arr*(1-mf)+sm*mf).clip(0,255).astype(np.uint8)
    Image.fromarray(plate).save(f'/tmp/claude-0/site3/s/{key}_plate.webp',quality=82,method=6)
    sec['plate']=f's/{key}_plate.webp'
json.dump(B,open('/tmp/claude-0/v3/blocks2.json','w'),ensure_ascii=False)
print('ok')
