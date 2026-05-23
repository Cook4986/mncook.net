'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

/* =========================================================
   AlchemicalLoader — shown while the stibine GLB is loading.

   A two-ring sigil wheel rotating against the void, with a
   central antimony glyph (♁) — the metal of which stibine
   is the principal ore. Below sits a single Latinate label
   set in IM Fell English: DISTILLATIO.

   We don't show progress percentage; the alchemist's apparatus
   does not announce its work.
   ========================================================= */

const RING_SIZE = 220;

export default function AlchemicalLoader() {
  // useProgress works outside Canvas (it subscribes to three.DefaultLoadingManager)
  const { active, loaded } = useProgress();

  // We always start visible on first mount, then transition out
  // once loading is *done* (active=false AND at least one asset reached
  // the loaded state). A 6 s hard fallback covers the all-cached path.
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!active && loaded > 0) {
      const t = setTimeout(() => setShow(false), 700);
      return () => clearTimeout(t);
    }
  }, [active, loaded]);

  useEffect(() => {
    const t = setTimeout(() => setShow(false), 6000);
    return () => clearTimeout(t);
  }, []);

  if (!show && !active) return null;

  return (
    <div
      aria-hidden={!active}
      style={{
        position: 'absolute',
        inset: 0,
        background:
          'radial-gradient(ellipse at center, #14101e 0%, #0a080f 70%, #06050a 100%)',
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '28px',
        opacity: show ? 1 : 0,
        transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <svg width={RING_SIZE} height={RING_SIZE} viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}>
        <defs>
          <radialGradient id="al-center-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.45)" />
            <stop offset="60%" stopColor="rgba(255, 255, 255, 0.10)" />
            <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
          </radialGradient>
          <filter id="al-soft" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="0.7" />
          </filter>
        </defs>

        {/* Center atmospheric glow */}
        <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={56} fill="url(#al-center-glow)" />

        {/* OUTER RING — rotates clockwise. 12 tick marks. */}
        <g style={{ transformOrigin: `${RING_SIZE / 2}px ${RING_SIZE / 2}px`, animation: 'al-spin 24s linear infinite' }}>
          <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={96} fill="none" stroke="#ffffff" strokeWidth="0.6" opacity="0.40" />
          {Array.from({ length: 12 }).map((_, i) => {
            const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
            const cx = RING_SIZE / 2, cy = RING_SIZE / 2;
            const major = i % 3 === 0;
            const ri = major ? 90 : 92;
            const ro = major ? 102 : 100;
            const x1 = cx + Math.cos(a) * ri;
            const y1 = cy + Math.sin(a) * ri;
            const x2 = cx + Math.cos(a) * ro;
            const y2 = cy + Math.sin(a) * ro;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#ffffff" strokeWidth={major ? 1.4 : 0.8} strokeLinecap="round" opacity={major ? 0.85 : 0.55} />;
          })}
        </g>

        {/* MIDDLE RING — counter-rotation. 4 cardinal marks. */}
        <g style={{ transformOrigin: `${RING_SIZE / 2}px ${RING_SIZE / 2}px`, animation: 'al-spin 14s linear infinite reverse' }}>
          <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2} r={72} fill="none" stroke="#ffffff" strokeWidth="0.5" opacity="0.50" />
          {[0, 1, 2, 3].map((i) => {
            const a = (i / 4) * Math.PI * 2 - Math.PI / 2;
            const cx = RING_SIZE / 2 + Math.cos(a) * 72;
            const cy = RING_SIZE / 2 + Math.sin(a) * 72;
            return (
              <g key={i} transform={`translate(${cx}, ${cy})`} stroke="#ffffff" strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.85">
                {i === 0 && <polygon points="0,-6 5.2,3 -5.2,3" />}
                {i === 1 && (
                  <>
                    <path d="M -5 -4 Q 0 -7 5 -4" />
                    <circle cx="0" cy="2" r="3.5" />
                  </>
                )}
                {i === 2 && (
                  <>
                    <line x1="-6" y1="0" x2="6" y2="0" />
                    <line x1="0" y1="-6" x2="0" y2="6" />
                  </>
                )}
                {i === 3 && (
                  <>
                    <circle cx="0" cy="-2" r="3.5" />
                    <line x1="0" y1="2" x2="0" y2="7" />
                    <line x1="-3.5" y1="5" x2="3.5" y2="5" />
                  </>
                )}
              </g>
            );
          })}
        </g>

        {/* INNER — antimony sigil (circle over cross). Static. */}
        <g stroke="#ffffff" strokeWidth="1.6" fill="none" strokeLinecap="round" filter="url(#al-soft)" opacity="0.95">
          <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2 - 10} r={14} />
          <line x1={RING_SIZE / 2} y1={RING_SIZE / 2 + 4} x2={RING_SIZE / 2} y2={RING_SIZE / 2 + 28} />
          <line x1={RING_SIZE / 2 - 10} y1={RING_SIZE / 2 + 17} x2={RING_SIZE / 2 + 10} y2={RING_SIZE / 2 + 17} />
        </g>

        {/* Center pulse */}
        <circle cx={RING_SIZE / 2} cy={RING_SIZE / 2 - 10} r={2} fill="#ffffff">
          <animate attributeName="r" values="1.2;3;1.2" dur="2.6s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.55;1;0.55" dur="2.6s" repeatCount="indefinite" />
        </circle>
      </svg>

      <div style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        color: 'rgba(255, 255, 255, 0.88)',
        fontSize: '0.95rem',
        letterSpacing: '0.32em',
        textTransform: 'uppercase',
      }}>
        Distillatio
      </div>

      <style>{`
        @keyframes al-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
