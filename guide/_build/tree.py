import re,json
t=open('/tmp/claude-0/meta2.xml').read()
nodes=[];stack=[]
for l in t.split('\n'):
    m=re.match(r'^(\s*)<([\w-]+) id="([^"]+)" name="([^"]*)" x="([^"]+)" y="([^"]+)" width="([^"]+)" height="([^"]+)"(.*?)(/?)>\s*$',l)
    if m:
        d=len(m.group(1))//2
        n=dict(id=m.group(3),type=m.group(2),name=m.group(4),x=float(m.group(5)),y=float(m.group(6)),w=float(m.group(7)),h=float(m.group(8)),kids=[],depth=d,hidden='visible="false"' in m.group(9))
        while stack and stack[-1]['depth']>=d: stack.pop()
        if stack: stack[-1]['kids'].append(n)
        nodes.append(n)
        if m.group(10)!='/': stack.append(n)
    elif re.match(r'^\s*</',l):
        pass
root=nodes[0]
json.dump(root,open('/tmp/claude-0/v3/tree.json','w'))
print(root['name'],len(root['kids']))
print(set(re.findall(r'visible="[^"]*"',t)))
for s in root['kids']: print(s['id'],s['name'],s['y'],s['h'],len(s['kids']))
