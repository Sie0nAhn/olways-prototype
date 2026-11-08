import { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  SoapBubbleIconButton,
  SoapBubbleMaterial,
  SoapBubbleSurface,
} from './components/soap-bubble';
import './components/soap-bubble/soap-bubble.css';

// Approved catalog defaults: Light glass on light pages, Rainbow glass on dark pages.
const LIGHT = { glass: 0.95, iridescence: 0.5, filmScale: 4.85, oilOpacity: 1, oilCoverage: 0.73, oilEdge: 18, oilEdgeFade: 2.33, clearCenter: 0.57, thickness: 480, drainage: 0.35, swirl: 0.5, reflectivity: 1.3, refraction: 0.15, dispersion: 1, bevel: 14 };
const DARK = { ...LIGHT, iridescence: 2, oilCoverage: 1, oilEdgeFade: 1, clearCenter: 0.73 };
const WINDOW = { windowLength: 1.3, windowMargin: 0.85, windowBend: 0.75, windowSize: 0.75, windowWidth: 0.8, windowGradient: 0.96, windowHead: 0.7, windowTail: 0.6, glintSize: 1.65, glintIntensity: 0, glintDistance: -0.45, glintHeight: 0.65, windowIntensity: 0.85, windowTwin: false };

type State = { groups: string[]; active: number; now: string; idx: string; dark: boolean; prog: number; hidden: boolean };
type Api = { onGroup: (i: number) => void; onLogo: () => void; onNext: () => void };

function Nav({ api, logo }: { api: Api; logo: string }) {
  const [s, set] = useState<State>({ groups: [], active: -1, now: 'olways', idx: '01', dark: true, prog: 0, hidden: false });
  const bar = useRef<HTMLDivElement>(null);
  const [ind, setInd] = useState({ left: 0, width: 0 });
  useEffect(() => { (window as any).__olwaysNav = (p: Partial<State>) => set((o) => ({ ...o, ...p })); (window as any).__olwaysNavReady?.(); }, []);
  useEffect(() => {
    const b = bar.current?.querySelectorAll<HTMLButtonElement>('.gl')[s.active];
    if (b) setInd({ left: b.offsetLeft, width: b.offsetWidth });
  }, [s.active, s.groups.length]);
  const m = { ...(s.dark ? DARK : LIGHT), ...WINDOW, bottomShadeColor: s.dark ? '#0b2a3a' : '#ffffff' };
  return (
    <SoapBubbleMaterial {...m}>
      <div className={`sbnav${s.dark ? ' dk' : ''}${s.hidden ? ' hide' : ''}`}>
        <SoapBubbleSurface className="sbbar" radius={9999} interactive={0.35}>
          <div className="sbin" ref={bar}>
            <button className="lg" aria-label="처음으로" onClick={api.onLogo} dangerouslySetInnerHTML={{ __html: logo }} />
            {s.active >= 0 && (
              <SoapBubbleSurface className="sbind" radius={9999} interactive aria-hidden
                style={{ transform: `translateX(${ind.left}px)`, width: ind.width }} reboundKey={s.active} />
            )}
            {s.groups.map((g, i) => (
              <button key={g} className={`gl${i === s.active ? ' on' : ''}`} onClick={() => api.onGroup(i)}>{g}</button>
            ))}
          </div>
        </SoapBubbleSurface>
        <div className="sbrt">
          <SoapBubbleSurface className="sbnow" radius={9999} reboundKey={s.now}>
            <span className="sbnowi"><i>{s.idx}</i>{s.now}</span>
          </SoapBubbleSurface>
          <SoapBubbleIconButton aria-label="다음 섹션" className="sbgo" onClick={api.onNext} style={{ ['--prog' as any]: s.prog }}>
            <svg className="ring" viewBox="0 0 44 44" aria-hidden><circle cx="22" cy="22" r="20" /></svg>
            <svg className="ar" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 5v14M6 13l6 6 6-6" /></svg>
          </SoapBubbleIconButton>
        </div>
      </div>
    </SoapBubbleMaterial>
  );
}

(window as any).mountOlwaysNav = (el: HTMLElement, api: Api, logo: string) => createRoot(el).render(<Nav api={api} logo={logo} />);
