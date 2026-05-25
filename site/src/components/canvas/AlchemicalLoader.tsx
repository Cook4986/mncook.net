'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

/* =========================================================
   WatcherLoader — shown while the stibine GLB is loading.

   Displays the emerald, glowing "Watcher" eye from the landing
   page, blinking and pulsing against the dark void. Underneath sits
   a single Latinate label: INTUITIO.
   ========================================================= */

const LOADER_SIZE = 240;

export default function AlchemicalLoader() {
  const { active, loaded } = useProgress();
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
          'radial-gradient(ellipse at center, #091310 0%, #060908 70%, #020403 100%)',
        zIndex: 500,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        opacity: show ? 1 : 0,
        transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <div style={{ position: 'relative', width: `${LOADER_SIZE}px`, height: `${LOADER_SIZE}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Soft emerald radial glow behind the eye */}
        <div style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74, 176, 132, 0.35) 0%, rgba(31, 90, 58, 0.08) 50%, rgba(0,0,0,0) 70%)',
          animation: 'eye-glow 3.5s infinite ease-in-out',
        }} />

        <svg width={LOADER_SIZE} height={LOADER_SIZE} viewBox="0 0 240 240" style={{ zIndex: 10 }}>
          <defs>
            {/* Emerald inner glow */}
            <radialGradient id="iris-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5cd6a5" />
              <stop offset="45%" stopColor="#1f5a3a" />
              <stop offset="100%" stopColor="#06160c" />
            </radialGradient>
            
            {/* Eye silhouette shadow */}
            <filter id="soft-shadow" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="4" />
            </filter>
          </defs>

          {/* Background Almond Outline Glow */}
          <path 
            d="M 10,120 Q 120,30 230,120 Q 120,210 10,120 Z" 
            fill="none" 
            stroke="#4ab084" 
            strokeWidth="1" 
            opacity="0.25"
            strokeDasharray="2, 4"
          />

          {/* Almond Eyelid Shell */}
          <path 
            d="M 15,120 Q 120,40 225,120 Q 120,200 15,120 Z" 
            fill="#03030a" 
            stroke="#4ab084" 
            strokeWidth="2.2" 
            filter="url(#soft-shadow)"
          />

          {/* Emerald Iris (Rotates subtly) */}
          <g style={{ transformOrigin: '120px 120px', animation: 'iris-rotate 40s linear infinite' }}>
            <circle cx="120" cy="120" r="38" fill="url(#iris-grad)" />
            {/* Iris striations */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i / 24) * Math.PI * 2;
              const r1 = 15;
              const r2 = 36;
              const x1 = 120 + Math.cos(angle) * r1;
              const y1 = 120 + Math.sin(angle) * r1;
              const x2 = 120 + Math.cos(angle) * r2;
              const y2 = 120 + Math.sin(angle) * r2;
              return (
                <line 
                  key={i} 
                  x1={x1} 
                  y1={y1} 
                  x2={x2} 
                  y2={y2} 
                  stroke="rgba(180, 240, 200, 0.45)" 
                  strokeWidth="0.8" 
                />
              );
            })}
          </g>

          {/* Pupil (Pulsates in size and blinks with eyelids) */}
          <ellipse 
            cx="120" 
            cy="120" 
            rx="12" 
            ry="24" 
            fill="#000000" 
            style={{ 
              transformOrigin: '120px 120px', 
              animation: 'pupil-pulse 5s infinite ease-in-out' 
            }} 
          />

          {/* Catchlight */}
          <circle cx="132" cy="108" r="6" fill="rgba(220, 255, 235, 0.95)" />

          {/* Eyelid Eyelashes / Accent ticks */}
          <line x1="120" y1="36" x2="120" y2="28" stroke="#4ab084" strokeWidth="1.5" opacity="0.6" />
          <line x1="120" y1="204" x2="120" y2="212" stroke="#4ab084" strokeWidth="1.5" opacity="0.6" />
        </svg>

        {/* Eyelid blink cover (SVG masking representation utilizing CSS) */}
        <div style={{
          position: 'absolute',
          top: '38px',
          width: '210px',
          height: '164px',
          background: '#020403',
          zIndex: 12,
          transformOrigin: '50% 0%',
          transform: 'scaleY(0)',
          borderRadius: '50% 50% 0 0',
          animation: 'eyelid-blink-top 4.8s infinite cubic-bezier(0.77, 0, 0.175, 1)'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '38px',
          width: '210px',
          height: '164px',
          background: '#020403',
          zIndex: 12,
          transformOrigin: '50% 100%',
          transform: 'scaleY(0)',
          borderRadius: '0 0 50% 50%',
          animation: 'eyelid-blink-bottom 4.8s infinite cubic-bezier(0.77, 0, 0.175, 1)'
        }} />
      </div>

      <div style={{
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        color: '#4ab084',
        fontSize: '1rem',
        letterSpacing: '0.45em',
        textTransform: 'uppercase',
        opacity: 0.85,
        animation: 'text-glow 2.5s infinite ease-in-out',
        paddingLeft: '0.45em' // compensate for letter spacing center offset
      }}>
        Intuitio
      </div>

      <style>{`
        @keyframes eye-glow {
          0%, 100% { transform: scale(0.92); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 0.9; }
        }
        @keyframes text-glow {
          0%, 100% { opacity: 0.65; text-shadow: 0 0 4px rgba(74, 176, 132, 0.2); }
          50% { opacity: 1; text-shadow: 0 0 10px rgba(74, 176, 132, 0.6); }
        }
        @keyframes iris-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pupil-pulse {
          0%, 100% { transform: scale(1.0); }
          45%, 55% { transform: scale(1.15) scaleX(0.9); }
          50% { transform: scale(0.8) scaleX(1.1); }
        }
        @keyframes eyelid-blink-top {
          0%, 8%, 12%, 100% { transform: scaleY(0); }
          10% { transform: scaleY(0.52); }
        }
        @keyframes eyelid-blink-bottom {
          0%, 8%, 12%, 100% { transform: scaleY(0); }
          10% { transform: scaleY(0.52); }
        }
      `}</style>
    </div>
  );
}
