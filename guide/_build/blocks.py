import json
root=json.load(open('/tmp/claude-0/v3/tree.json'))
SEC={'2616:37212':'01cover','2616:37224':'02overview','2616:37234':'03problem','2616:37374':'04opp','2616:37609':'05journey','2616:37765':'06inithyp','2616:37825':'07interview','2616:38094':'08hyp','2616:38285':'09solution','2616:38522':'10flow','2616:38573':'11iter','2616:38829':'12lens','2616:38903':'13anat','2616:39191':'14pass','2616:39495':'15loop','2616:39555':'16concl','2616:39585':'17thanks'}
BG={'2616:37213','2616:37225','2616:38574'}  # cover image, overview still, iteration ellipse
NOSPLIT={'Knowing point','How to read','Positioning map v2','Journey chart','Define diagram','Bubbles','Lens + callouts','Acrylic','FOV layout','Map + Legend'}
def split(n,ox,oy,H,out,depth=0):
    x,y=ox+n['x'],oy+n['y']
    kids=[k for k in n['kids'] if k['w']>=40 and k['h']>=16]
    big = n['h']>430 and n['w']>200
    side = n['w']>=900 and len(kids)>=2 and all(k['w']<n['w']*0.7 for k in kids) and n['h']>150
    hdr = n['name'] in ('Header','Title block') and depth<3
    cov=sum(k['w']*k['h'] for k in kids)/max(1,n['w']*n['h'])
    if (big or side or hdr) and (hdr or cov>0.62) and len(kids)>=2 and n['name'] not in NOSPLIT and n['id'] not in ('2616:38793',) and depth<4:
        for k in kids: split(k,x,y,H,out,depth+1)
    else:
        out.append(dict(id=n['id'],name=n['name'],x=x,y=y,w=n['w'],h=n['h']))
res={}
for s in root['kids']:
    if s['id'] not in SEC: continue
    out=[]
    for k in s['kids']:
        if k['id'] in BG: continue
        split(k,0,0,s['h'],out)
    # clip to section
    out=[b for b in out if b['y']<s['h'] and b['y']+b['h']>0 and b['w']>=40 and b['h']>=14]
    res[SEC[s['id']]]=dict(id=s['id'],h=s['h'],blocks=out)
    print(SEC[s['id']],len(out),[ (b['name'][:14],int(b['w']),int(b['h'])) for b in out][:12])
json.dump(res,open('/tmp/claude-0/v3/blocks.json','w'),ensure_ascii=False)
