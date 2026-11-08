# olways 전시 가이드 웹

아이패드 11인치 전시용 인터랙티브 페이지. 피그마 보드(경험 캡스톤 · 2616-37211)를 섹션별로 잘라 스크롤 인터랙션을 입혔어요.

- `index.html` — 페이지 (GSAP 3.12.5 · ScrollTrigger, cdnjs)
- `s/` — 피그마 섹션 조각(2x webp)과 배경 판
- `media/` — 프로토타입 녹화 영상
- `_build/` — 피그마 내보내기 → 조각 생성 스크립트

로컬 실행: `cd guide && python3 -m http.server 8000` → http://localhost:8000
