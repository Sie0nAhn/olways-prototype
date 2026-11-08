import json
from PIL import Image
Image.MAX_IMAGE_PIXELS=None
T=json.load(open('/tmp/claude-0/v3/tree.json'))
par={};idx={}
def walk(n,p=None):
    idx[n['id']]=n;par[n['id']]=p
    for c in n.get('kids',[]): walk(c,n['id'])
walk(T)
def absr(i,sec):
    n=idx[i];x,y=0,0;c=i
    while c!=sec: x+=idx[c]['x'];y+=idx[c]['y'];c=par[c]
    return x,y,n['w'],n['h']
O='/tmp/claude-0/site5/s/'
S=2
def save(im,name,q=90): im.save(O+name,quality=q,method=6)
# headers
for k,y0,y1 in [('07interview',72,306),('08hyp',72,292),('09solution',72,312),('11iter',72,900)]:
    im=Image.open(f'/tmp/claude-0/v3/sec/{k}.png').convert('RGB')
    save(im.crop((0,y0*S,2800,y1*S)),f'h_{k}.webp',88)
# interview chart pieces
SEC='2616:37825'
im=Image.open('/tmp/claude-0/v3/sec/07interview.png').convert('RGB')
CH={'c1':('2616:37860',[('2616:37861','barh',(4,4,4,4)),('2616:37866','barh',(4,4,4,4)),('2616:37871','barh',(4,4,16,26))]),
    'c2':('2616:37908',[('2616:37909','barv',(3,4,3,4)),('2616:37914','barv',(3,4,3,4)),('2616:37919','barv',(3,4,16,4))]),
    'c3':('2616:37953',[('2616:37966','pop',(5,5,5,4)),('2616:37963','pop',(5,5,5,5)),('2616:37960','pop',(5,4,5,6)),('2616:37957','pop',(8,8,8,8)),('2616:37954','pop',(16,10,10,26))]),
    'c4':('2616:38001',[('2616:38002','barv',(5,4,5,4)),('2616:38006','barv',(5,4,5,4)),('2616:38010','barv',(5,4,16,4))]),
    'c5':('2616:38042',[('2616:38043','barh',(4,4,4,4)),('2616:38048','barh',(4,4,4,4)),('2616:38054','barh',(4,4,4,4)),('2616:38060','barh',(4,4,16,26))])}
out={}
for c,(fid,ps) in CH.items():
    fx,fy,fw,fh=absr(fid,SEC); L=[]
    for j,(pid,kind,(pl,pt,pr,pb)) in enumerate(ps):
        x,y,w,h=absr(pid,SEC)
        x0,y0,x1,y1=x-pl,y-pt,x+w+pr,y+h+pb
        save(im.crop((round(x0*S),round(y0*S),round(x1*S),round(y1*S))),f'iv_{c}_{j}.webp')
        L.append(dict(src=f's/iv_{c}_{j}.webp',kind=kind,x=x0-fx,y=y0-fy,w=x1-x0,h=y1-y0))
    out[c]=dict(w=fw,h=fh,parts=L)
json.dump(out,open('/tmp/claude-0/v5/ivparts.json','w'),indent=0)
# UT images
U='/tmp/claude-0/ut/'
def big(src,name,maxw=2400):
    a=Image.open(U+src).convert('RGB')
    if a.width>maxw: a=a.resize((maxw,round(a.height*maxw/a.width)),Image.LANCZOS)
    save(a,name,86); return a.size
def zoom(src,name,fx,fw,fy,fh):
    a=Image.open(U+src).convert('RGB');W,H=a.size
    z=a.crop((round(fx*W),round(fy*H),round((fx+fw)*W),round((fy+fh)*H)))
    if z.width>1200: z=z.resize((1200,round(z.height*1200/z.width)),Image.LANCZOS)
    save(z,name,88); return z.size
sz={}
for src,n in [('imgRectangle.png','ut1a'),('imgRectangle1.png','ut1b'),('imgRectangle2.png','ut1c'),('imgRectangle3.png','ut2a'),('imgRectangle4.png','ut2b'),('imgRectangle5.png','ut2c'),('imgRectangle7.png','ut3a'),('imgRectangle8.png','ut3c')]:
    sz[n]=big(src,n+'.webp')
sz['ut2az']=zoom('imgRectangle3.png','ut2az.webp',164.33/428.67,100/428.67,473.02/574.11,100/574.11)
sz['ut2bz']=zoom('imgRectangle4.png','ut2bz.webp',51.21/202.42,100/202.42,167.83/270.72,100/270.72)
sz['ut2cz']=zoom('imgRectangle6.png','ut2cz.webp',69.87/239.74,100/239.74,298.38/398.24,100/398.24)
print(sz); print({k:(v['w'],v['h']) for k,v in out.items()})
