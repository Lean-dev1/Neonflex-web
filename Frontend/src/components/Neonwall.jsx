import { useEffect, useRef, useSyncExternalStore } from 'react';
import wallImg from '../assets/images/fondo.webp';

/*
  La pared de ladrillo de noche, iluminada por los carteles.
  - Dos luces (roja y azul) respiran y a veces titilan, como un tubo de neón real.
  - La pared se desplaza apenas al hacer scroll (parallax) y, con mouse, una luz tenue la sigue.
  - Se respeta prefers-reduced-motion y el visitante puede pausar todo desde el pie de página.
*/

const KEY = 'nf_motion';
const listeners = new Set();

const read = () => {
  try { return window.localStorage.getItem(KEY) === 'off' ? 'off' : 'on'; } catch { return 'on'; }
};
let pref = read();

const subscribe = (fn) => { listeners.add(fn); return () => listeners.delete(fn); };
const getSnapshot = () => pref;

export const setMotion = (next) => {
  pref = next;
  try { window.localStorage.setItem(KEY, next); } catch { /* sin storage: queda solo en memoria */ }
  listeners.forEach((fn) => fn());
};

export const useMotionPref = () => useSyncExternalStore(subscribe, getSnapshot, () => 'on');

export function MotionToggle() {
  const on = useMotionPref() === 'on';
  return (
    <button type="button" className="nf-toggle" aria-pressed={on} onClick={() => setMotion(on ? 'off' : 'on')}>
      Fondo animado
      <span className="nf-toggle__state" aria-hidden="true">{on ? 'Sí' : 'No'}</span>
    </button>
  );
}

export default function NeonWall() {
  const motion = useMotionPref();
  const bricks = useRef(null);
  const halo = useRef(null);

  useEffect(() => { document.documentElement.dataset.motion = motion; }, [motion]);

  useEffect(() => {
    const bricksEl = bricks.current;
    const haloEl = halo.current;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (motion === 'off' || reduce) {
      bricksEl.style.transform = '';
      return undefined;
    }

    // Parallax: a lo largo de toda la página la pared se corre hasta un 10 % del alto de la pantalla
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
        bricksEl.style.transform = `translate3d(0, ${(-progress * window.innerHeight * 0.1).toFixed(1)}px, 0)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();

    // Luz que acompaña al mouse (no en pantallas táctiles)
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const root = document.documentElement;
    const onMove = (e) => {
      haloEl.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      haloEl.style.opacity = '1';
    };
    const onLeave = () => { haloEl.style.opacity = '0'; };
    if (fine) {
      window.addEventListener('pointermove', onMove, { passive: true });
      root.addEventListener('mouseleave', onLeave);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      window.removeEventListener('pointermove', onMove);
      root.removeEventListener('mouseleave', onLeave);
      haloEl.style.opacity = '0';
    };
  }, [motion]);

  return (
    <div className="nf-wall" aria-hidden="true">
      <div className="nf-wall__bricks" ref={bricks} style={{ backgroundImage: `url(${wallImg})` }} />
      <div className="nf-wall__shade" />
      <div className="nf-wall__glow nf-wall__glow--red" />
      <div className="nf-wall__glow nf-wall__glow--blue" />
      <div className="nf-wall__halo" ref={halo} />
    </div>
  );
}