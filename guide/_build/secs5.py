# Hand-built HTML sections (interview, hypothesis, solution, usability test, lens)
import json, html
P = json.load(open('/tmp/claude-0/v5/ivparts.json'))
E = html.escape

def cls(head, extra): return head.replace('class="fs', f'class="fs hx {extra}', 1)

# ---------------- 04 · USER INTERVIEW ----------------
def hl(t):
    # **bold blue** markup -> spans
    out = ''; parts = t.split('**')
    for i, p in enumerate(parts): out += (f'<b>{E(p)}</b>' if i % 2 else E(p))
    return out

def quote(who, ko, en):
    return f'<div class="qt"><span class="who">{E(who)}</span><p class="ko">{hl(ko)}</p><p class="en">{E(en)}</p></div>'

def chart(c, order):
    d = P[c]; ps = ''
    for j, p in enumerate(d['parts']):
        ps += (f'<i class="pc {p["kind"]}" data-o="{order[j]}" style="left:calc(var(--u)*{p["x"]:.2f});top:calc(var(--u)*{p["y"]:.2f});'
               f'width:calc(var(--u)*{p["w"]:.2f});height:calc(var(--u)*{p["h"]:.2f})"><img src="{p["src"]}" alt=""></i>')
    return f'<div class="ca" style="width:calc(var(--u)*{d["w"]});height:calc(var(--u)*{d["h"]})">{ps}</div>'

def ivrow(c, order, h, qen, qko, quotes, alt):
    qs = '<div class="dv"></div>'.join(quote(*q) for q in quotes)
    return (f'<div class="row"><figure class="cbox" style="height:calc(var(--u)*{h})" aria-label="{E(alt)}">'
            f'<div class="qh"><span class="qq">Q</span><div><p class="qe">{E(qen)}</p><p class="qk">{E(qko)}</p></div></div>{chart(c, order)}</figure>'
            f'<div class="qcard" style="min-height:calc(var(--u)*{h})"><span class="qm">“</span>{qs}</div></div>')

def grp(tag, tcls, title, en, row):
    t = f'<span class="vt {tcls}">{E(tag)}</span>' if tag else ''
    e = f'<p class="gen">{E(en)}</p>' if en else ''
    return f'<div class="ig"><div class="ih">{t}<h3>{E(title)}</h3>{e}</div>{row}</div>'

def interview(head, s):
    g1 = grp('Validated', 'v1', '휠체어 유저는 휠체어로 갈 수 있는 길과 장소라는 확신이 없으면 아예 출발하지 않아요.', '',
        ivrow('c1', [0, 1, 2], 372, 'How do they check if a place is accessible before going?', '방문 전, 접근 가능 여부를 무엇으로 확인하나요?', [
            ('참여자 D · 전동', '지도에는 있는데 폐업한 곳이라 어이없었던 적 있어요. **이후에는 식당에 전화 먼저** 걸어봐요.', 'It was on the map but had closed down. Now I always call the restaurant first.'),
            ('참여자 C · 수동+전동', '장소도 장소지만 휠체어탄 사람을 어떻게 보는지 시선도 중요해요. 좋지 않은 시선일 때가 많아서 위축되거든요. **그래서 전화를 많이 해요**.', 'It’s not just the place — how people look at wheelchair users matters too. The looks are often unkind and make me shrink, so I call ahead a lot.')],
            '확인 방법 순위: 1위 가게에 직접 전화, 2위 최근 다녀온 지인, 3위 지도 앱·블로그'))
    g2 = grp('Partially validated', 'v2', '방송을 렌즈에 띄우는 것보다, 다가오는 위험을 먼저 감지해 알리는 게 필요해요.', '',
        ivrow('c2', [0, 1, 2], 307, 'What sound put them most at risk on the move?', '이동 중 소리 때문에 가장 위험했던 순간은?', [
            ('참여자 A · 수동+전동', '누가 부르는 소리, **차 지나가는 소리를 못 들어서** 늘 조심해요.', '“I can’t hear people calling me or cars passing, so I’m always on guard.”'),
            ('참여자 B · 수동+반전동', '위험하게 다가오면 알아서 피해주면 좋겠어요. **치고 간 적도 있어요**.', '“I wish it would steer me away when something comes at me. I’ve been hit before.”')],
            '위험했던 소리: 다가오는 차·사람 3명, 부르는 소리 2명, 안내·긴급 방송 0명'))
    g3 = grp('', '', '보지 않아도 위험을 먼저 짚어줘야 해요.', '',
        ivrow('c3', [0, 1, 2, 3, 4], 314, 'What caused their near-misses on the move?', '이동 중 사고가 날 뻔했던 순간, 무엇 때문이었나요?', [
            ('참여자 B · 수동+반전동', '턱이 시야에 있어도 제가 못 알아채면 그냥 지나쳐요. 그걸 먼저 짚어줬으면 해요.', '“Even when a curb is in view, I miss it if I don’t notice. I want it flagged first.”'),
            ('참여자 C · 수동+전동', '시야가 산만해지거나 **사각지대가 생길까 봐** 걱정돼요.', '“I worry the view gets cluttered or creates blind spots.”')],
            '사고가 날 뻔한 원인: 미처 보지 못한 턱·단차 5명, 시야 밖에서 다가온 사람·자전거 4명, 턱이 바닥과 구분이 안 됨 3명, 경사로 2명씩'))
    g4 = grp('New finding', 'v3', '전동 휠체어는 이동 범위를 넓혀주지만, 배터리로 어디까지 갈 수 있는지 몰라 새로운 곳을 망설여요.',
        'Power chairs widen their range, but not knowing how far the battery will go makes new places feel risky.',
        ivrow('c4', [0, 1, 2], 372, 'What worries them most on a power wheelchair?', '전동 휠체어로 이동할 때 무엇이 가장 걱정되나요?', [
            ('참여자 B · 수동+반전동', '전동 휠체어를 타면 덜 힘들어서 혼자 많이 가요. 하지만 충전된 정도에 따라 **얼마나 갈 수 있는지 잘 모르겠고**, 충전소 찾는 것도 힘들어서 **매번 같은 곳만 가게 돼요**.', '“On a power chair I go out alone more — but I can’t tell how far the charge lasts, so I keep going to the same places.”'),
            ('참여자 D · 전동', '외부 충전이 어려워서 **멀리 못 가요**. 잔량은 꼭 확인하고 나가요.', '“Charging outside is hard, so I can’t go far. I always check the battery before leaving.”')],
            '전동 휠체어 걱정: 충전소 찾기 5명, 남은 거리 짐작 4명, 처음 가는 곳 2명'))
    g5 = grp('', '', '‘장애인 화장실 있음’ 표시는 많지만, 실제로 쓸 수 있는 곳은 4곳 중 1곳뿐이었어요', '',
        ivrow('c5', [0, 1, 2, 3], 550, 'Can they actually use a restroom marked “accessible”?', '지도에 ‘장애인 화장실 있음’이면, 정말 쓸 수 있었나요?', [
            ('참여자 F · 전동', '장애인 화장실이라고 해서 다 갈 수 있는 화장실이 아니에요. 문턱도 있고, 공간이 좁은 곳도 있고 그래서 **실제로 갈 수 있는 장애인 화장실은 더 없어요**.', 'Not every “accessible” restroom is usable. Some have thresholds, some are too narrow — so the ones I can actually use are even fewer.'),
            ('참여자 C · 수동+전동', '화장실에 조그마한 턱이 있어서, **사람들 올 때까지 기다렸다가** 나왔어요.', 'There was a small threshold in the restroom — I had to wait until someone came to help me out.'),
            ('참여자 A · 수동+전동', '생각보다 공간이 좁은 곳이 정말 많아요. 그래서 맨날 **안을 한 번 보고 돌아오는 경우가 많아요**.', 'There are so many places that are much smaller than expected. That’s why I usually end up just taking a look inside and turning right')],
            '지도 표시 100% → 문턱 없음 58% → 회전 공간 33% → 혼자 실제 사용 25%'))
    ban = ('<div class="ban"><p class="bk">Insight</p><p class="bt">핵심은 ‘턱 측정’ 하나가 아니라, 출발 전의 불확실성을 없애는 것이었어요</p>'
           '<p class="be">The real value wasn’t measuring a single step — it was removing uncertainty before leaving.</p></div>')
    return (cls(head, 'iv') + '>\n<img class="hdr" src="s/h_07interview.webp" alt="04 · User interview — Getting there starts before leaving">'
            f'<div class="wrap">{g1}<div class="gg">{g2}{g3}</div><div class="gg">{g4}{g5}</div>{ban}</div>\n</section>')

# ---------------- 04 · HYPOTHESIS ----------------
def hyp(head, s):
    ar = lambda c: f'<div class="har" data-c="{c}" aria-hidden="true">→</div>'
    steps = (f'<div class="hs s1" data-c="0"><b>STEP 1</b><span>처음 세운 가설<i>Initial hypothesis</i></span></div>{ar(1)}'
             f'<div class="hs s2" data-c="2"><b>STEP 2</b><span>인터뷰에서 들은 것<i>What we heard</i></span></div>{ar(3)}'
             f'<div class="hs s3" data-c="4"><b>STEP 3</b><span>바뀐 가설<i>Revised hypothesis</i></span></div>')
    rows = [('H1', '출발 전', '실측 기반 AR 안내가 있으면, 현장에서 막히는 일이 줄어들 것이다.',
             '현장보다 출발 전이 더 힘들었어요. 다들 방문 전에 매번 **전화로 문턱을 확인**하고, 확인이 안 되면 아예 가지 않았어요.',
             'Before leaving was harder than being there. Everyone called ahead to check thresholds — and if unsure, they didn’t go.',
             '출발 전에 실측값으로 갈 수 있는지 먼저 판정하고, 휠체어 기준 소요 시간 · 배터리 경로까지 보여준다.'),
            ('H2', '이동 중 · 청각', '안내 방송을 긴급도별로 렌즈에 띄우면, 이동 중 정보 단절이 풀릴 것이다.',
             '방송보다 **뒤에서 오는 차를 못 들어 부딪힌** 경험 개선이 시급했어요',
             'No one mentioned announcements. Instead, many were hit by cars they couldn’t hear coming.',
             '다가오는 차 · 사람을 글라스가 먼저 감지해 시각 · 진동으로 알리고, 방송은 자막으로 보조한다.'),
            ('H3', '이동 중 · 시각', '잔존 시력을 더 선명하게 보여주면, 멈추지 않고 완주할 수 있을 것이다.',
             '내가 파악하는 것보다 글라스가 먼저 내 시야에서의 위험을 알려주길 원했어요 — **놓친 위험을 먼저 알려주길** 원했어요.',
             '“If I’m not looking, how would the glasses know?” — they wanted missed risks flagged first.',
             '시야에 들어왔지만 내가 알아채지 못한 단차 · 장애물을, 글라스가 먼저 빠르게 알려준다.')]
    body = ''
    for h, k, a, heard, en, rev in rows:
        body += (f'<div class="hc c0" data-c="0"><p class="hk"><b>{h}</b>{E(k)}</p><p>{E(a)}</p></div>'
                 f'<div class="har" data-c="1" aria-hidden="true">→</div>'
                 f'<div class="hc c2" data-c="2"><span class="who d">참여자 F · 전동</span><p class="ko">{hl(heard)}</p><p class="en">{E(en)}</p></div>'
                 f'<div class="har" data-c="3" aria-hidden="true">→</div>'
                 f'<div class="hc c4" data-c="4"><p class="hk2">{h} 수정</p><p>{E(rev)}</p></div>')
    fin = ('<div class="hfin"><p class="fk">FINAL HYPOTHESIS</p><p class="ft">출발 전의 정보 공백과 이동 중의 감각 단절을 하나의 글라스로 해소하면,<br>'
           '휠체어 사용자도 타인 의존 없이 전 구간을 혼자 이동할 수 있을 것이다.</p><p class="fe">If one glass closes both gaps, wheelchair users can travel the whole way independently.</p></div>')
    return (cls(head, 'hy') + '>\n<img class="hdr" src="s/h_08hyp.webp" alt="04 · Hypothesis — 12 interviews rewrote our hypotheses">'
            f'<div class="wrap"><div class="hgrid">{steps}{body}</div>{fin}</div>\n</section>')

# ---------------- 06 · SOLUTION ----------------
def solution(head, s):
    def lanes(rows):
        out = ''
        for k, segs, end in rows:
            sg = ''.join(f'<div class="seg {c}" style="width:calc(var(--u)*{w})">{E(t)}</div>' for c, w, t in segs)
            out += f'<div class="lane {"lo" if k=="OLWAYS" else "lt"}"><span class="k">{k}</span>{sg}{end}</div>'
        return out
    c1 = lanes([('TODAY', [('gy', 170, '모른 채 이동'), ('gy', 96, '현장 도착'), ('bad', 104, '문턱 발견')], '<span class="mk x">✕</span><em class="r">헛걸음</em>'),
                ('OLWAYS', [('bl', 150, '집에서 끝나는 확인'), ('bl', 104, '출발 전 판정'), ('gd', 128, '갈 수 있는 곳만')], '<span class="mk o">✓</span><em class="g">도착</em>')])
    c2 = lanes([('TODAY', [('gy', 170, '모르는 채 다가감'), ('gy', 96, '위험 등장'), ('bad', 112, '보고서야 인지')], '<span class="mk x">✕</span><em class="r">급정거</em>'),
                ('OLWAYS', [('gd', 150, '확보된 판단 시간'), ('gy', 90, '위험 등장'), ('bl', 140, '렌즈 · 진동 경보')], '<span class="mk o">✓</span><em class="g">여유 있게</em>')])
    card = lambda h, e, t, en, body: (f'<div class="scard"><div class="sh"><b>{h}</b><span>{e}</span></div><p class="st">{t}</p><p class="se">{en}</p>'
                                     f'<div class="lanes">{body}</div></div>')
    cards = (card('출발 전', 'Before departure', '가는 길은 사진으로 미리 보고, 입구는 집에서 판정해<br>갈 수 있는 곳만 골라 출발해요', 'Preview the route and judge the entrance from home — then go only where you can get in.', c1)
             + card('이동 중', 'On the move', '차 · 자전거 · 턱이 다가오면,<br>급정거하기 전에 안경이 먼저 알려줘요', 'Cars, bikes and curbs — the glasses warn you before you have to brake hard.', c2))
    return (cls(head, 'so') + '>\n<img class="hdr" src="s/h_09solution.webp" alt="06 · Solution — Before you see it.">'
            f'<div class="wrap"><div class="srow">{cards}</div></div>\n</section>')

# ---------------- 08 · USABILITY TEST ----------------
UT = [
 dict(n=1, prob='지도와 장소 목록이 시야 왼쪽에 있어, 보려면 고개를 돌려야 했어요',
      head='지도 · 장소 패널을 모두 익숙한 오른쪽으로 옮기고,<br>경로는 바닥에 붙였어요',
      vers=[('As Is · 1차', 'ut1a', None, []), ('As Is · 2차', 'ut1b', None, []), ('To Be · 3차', 'ut1c', None, [])],
      why=('왜 오른쪽인가요?', '사람들은 내비게이션 앱과 차량 내비에서 지도를 오른쪽에서 보는 데 익숙해요. 패널을 같은 위치로 옮기자, 처음 쓰는 사람도 시선을 찾지 않고 바로 경로 정보를 읽을 수 있었어요.',
           'People are used to reading navigation on the right — matching that habit lets them find route info without searching.'),
      p='지도 · 장소 목록이 왼쪽에 있어, 오른쪽 내비에 익숙한 사용자의 시선이 엇갈렸어요.',
      s='두 패널을 오른쪽으로 옮기고(2차), 소요 시간과 진행 바를 한 카드에 모았어요(3차).',
      q=[('참여자 A · 수동+전동', '“지도가 왼쪽에 있으니까 자꾸 고개가 돌아가요. 내비는 원래 오른쪽에서 보잖아요.”', '“With the map on the left, I keep turning my head. I’m used to navigation on the right.”'),
         ('참여자 D · 전동', '“경로가 바닥에 깔리니까 핸들 잡은 채로 그냥 따라가면 돼서 편해요.”', '“The route on the ground lets me just follow it with my hands on the wheels.”')]),
 dict(n=2, prob='하단 마이크 아이콘이 이동 경로와 겹치고, 듣고 있는지 알기 어려웠어요',
      head='음성 인식을 아이콘 대신,<br>가로로 긴 음성 캡슐과 움직이는 그라데이션으로 바꿨어요',
      vers=[('As Is · 1차', 'ut2a', 'ut2az', ['마이크 아이콘이 경로 위에 겹쳐요', '현위치 마커가 경로 중간에 떠 있어요']),
            ('As Is · 2차', 'ut2b', 'ut2bz', ['말할 때 마이크 아이콘 위에 작은 자막만 떠요', '듣는 중인지 상태가 잘 구분되지 않아요']),
            ('To Be · 3차', 'ut2c', 'ut2cz', ['가로 캡슐로 경로 아래에 분리', '인식 중엔 그라데이션이 흐르며 빛나요'])],
      why=None,
      p='마이크 아이콘이 바닥 경로와 겹치고, 듣고 있는지 알 수 없었어요.',
      s='가로 캡슐로 경로와 분리하고, 듣는 중엔 그라데이션이 흐르게 했어요.',
      q=[('참여자 B · 수동+반전동', '“마이크 아이콘이 길 위에 떠 있으니까 경로가 가려져요.”', '“The mic icon floats on the path and covers the route.”'),
         ('참여자 E · 전동', '“말을 했는데 듣고 있는 건지 아닌지 헷갈려서 한 번 더 말했어요.”', '“I spoke but couldn’t tell if it was listening, so I said it twice.”')]),
 dict(n=3, prob='배터리 %로는 ‘갔다 올 수 있는지’ 알 수 없었어요',
      head='전동 휠체어 배터리 퍼센트를,<br>지금 배터리로 갈 수 있는 시간으로 바꿨어요',
      vers=[('As Is · 1차', 'ut3a', None, []), ('To Be · 3차', 'ut3c', None, [])],
      why=None,
      p='% 게이지는 남은 거리를 머릿속으로 계산하게 했어요.',
      s='‘주행 가능 5km’를 크게, 가까운 충전기는 AR 핀으로 띄웠어요.',
      q=[('참여자 D · 전동', '“12%라고 하면 갔다 올 수 있는지 머릿속으로 계산해야 해요.”', '“With 12%, I have to calculate in my head whether I can get back.”'),
         ('참여자 A · 수동+전동', '“5km, 몇 분이라고 나오니까 저기까진 되겠다 싶어요. 충전기 위치도 같이 보이니까 덜 불안해요.”', '“Seeing 5km, I know I can make it — and seeing chargers makes me less anxious.”')]),
]
def ut(head, s):
    out = ''
    for it in UT:
        n = len(it['vers'])
        seg = ''.join(f'<button class="sb{" tb" if v[0].startswith("To") else ""}" data-i="{i}">{E(v[0])}</button>' for i, v in enumerate(it['vers']))
        imgs = ''
        for i, (lab, im, z, notes) in enumerate(it['vers']):
            tobe = lab.startswith('To')
            zz = ''
            if z:
                nn = ''.join(f'<li>{E(t)}</li>' for t in notes)
                zz = f'<div class="zc{" ok" if tobe else ""}"><img src="s/{z}.webp" alt=""><ul>{nn}</ul></div>'
            imgs += (f'<div class="vv{" tobe" if tobe else ""}" data-i="{i}"><img src="s/{im}.webp" alt="{E(lab)} 화면" loading="lazy">'
                     f'<span class="vl">{E(lab)}</span>{zz}</div>')
        why = ''
        if it['why']:
            a, b, c = it['why']
            why = (f'<div class="why"><div class="wd"><div class="wm"><i class="x">✕</i></div><span class="wa">→</span><div class="wm r"><i class="o">✓</i></div>'
                   f'<p class="wl"><span class="r">As Is · 왼쪽</span><span class="b">To Be · 오른쪽</span></p></div>'
                   f'<div><p class="wk">{E(a)}</p><p class="wt">{E(b)}</p><p class="we">{E(c)}</p></div></div>')
        qs = ''.join(f'<div class="uq"><span class="who d">{E(w)}</span><p class="ko">{E(k)}</p><p class="en">{E(e)}</p></div>' for w, k, e in it['q'])
        out += (f'<article class="ui" data-n="{n}">'
                f'<header class="uh"><p class="up"><span class="un">{it["n"]}</span>{E(it["prob"])}</p><h3>{it["head"]}</h3></header>'
                f'<div class="upin"><div class="stage">{imgs}</div><div class="seg3 bub" role="tablist">{seg}<i class="ind bub"></i></div></div>'
                f'{why}<div class="ups"><div><p class="pk">문제</p><p>{E(it["p"])}</p></div><div><p class="sk">해결</p><p class="sv">{E(it["s"])}</p></div></div>'
                f'<div class="uqs">{qs}</div></article>')
    return (cls(head, 'ut') + '>\n<img class="hdr" src="s/h_11iter.webp" alt="08 · Usability test — Read without stopping">'
            f'<div class="wrap">{out}</div>\n</section>')

# ---------------- 09 · THROUGH THE LENS ----------------
LENS = ['scan', 'route', 'slope', 'door', 'arrive']
def lens(head, s):
    HH = 583
    hb = [b for b in s['blocks'] if b['y'] < HH]
    rest = [b for b in s['blocks'] if b['y'] >= HH]
    caps = [b for b in rest if b['name'] != 'Rectangle']
    pct = lambda v, base: f'{v/base*100:.4f}%'
    hdr = ''.join(f'<div class="b {"title" if b["h"]<=50 and b["w"]>=280 else ("tag" if b["ch"]<60 else "std")}" style="left:{pct(b["cx"],1400)};top:{pct(b["cy"],HH)};width:{pct(b["cw"],1400)};height:{pct(b["ch"],HH)}"><img src="{b["src"]}" alt=""></div>' for b in hb)
    def vid(i): v = LENS[i]; return f'<video src="media/{v}.mp4" poster="media/{v}.jpg" muted playsinline loop preload="metadata"></video><span class="live">PROTOTYPE · S{i}</span>'
    def cap(i, c=''): return f'<div class="lcap {c}"><img src="{caps[i]["src"]}" alt="" style="width:calc(var(--u)*{caps[i]["cw"]:.1f})"></div>'
    full = lambda i: f'<div class="lfull" data-i="{i}"><div class="lstick"><div class="lv">{vid(i)}</div></div><div class="lsheet">{cap(i)}</div></div>'
    panels = ''.join(f'<div class="hp"><div class="hv">{vid(i)}</div>{cap(i,"hc")}</div>' for i in (1, 2, 3))
    dots = ''.join(f'<i data-i="{k}"></i>' for k in range(3))
    track = f'<div class="hwrap"><div class="htrack">{panels}</div><div class="hdots bub">{dots}</div></div>'
    return (cls(head, 'ln') + f'>\n<div class="lhead" style="aspect-ratio:1400/{HH}">{hdr}</div>'
            + full(0) + track + full(4) + '\n</section>')

CUSTOM = {'07interview': interview, '08hyp': hyp, '09solution': solution, '11iter': ut, '12lens': lens}
