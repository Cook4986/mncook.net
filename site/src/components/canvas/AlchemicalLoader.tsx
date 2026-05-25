'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';

/* =========================================================
   WatcherLoader — shown while the stibine GLB is loading.

   Displays the emerald, glowing "Watcher" eye from the landing
   page, blinking and pulsing against the dark void. Clean, minimal,
   with no text and slower, organic speed.
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
        opacity: show ? 1 : 0,
        transition: 'opacity 700ms cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: show ? 'auto' : 'none',
      }}
    >
      <div style={{ position: 'relative', width: `${LOADER_SIZE}px`, height: `${LOADER_SIZE}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Soft emerald radial glow behind the eye — slowed to 12s */}
        <div style={{
          position: 'absolute',
          width: '180px',
          height: '180px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(74, 176, 132, 0.35) 0%, rgba(31, 90, 58, 0.08) 50%, rgba(0,0,0,0) 70%)',
          animation: 'eye-glow 12s infinite ease-in-out',
        }} />

        <svg width={LOADER_SIZE} height={LOADER_SIZE} viewBox="0 0 240 240" style={{ zIndex: 10, overflow: 'visible' }}>
          <defs>
            {/* Clip-path matching the exact eye almond outline — confines the iris & pupil and prevents square/rectangular background bleed */}
            <clipPath id="eye-inner-clip">
              <path d="M 15,120 Q 120,40 225,120 Q 120,200 15,120 Z" />
            </clipPath>

            {/* Emerald inner glow */}
            <radialGradient id="iris-grad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#5cd6a5" />
              <stop offset="45%" stopColor="#1f5a3a" />
              <stop offset="100%" stopColor="#06160c" />
            </radialGradient>
          </defs>

          {/* Background Almond Outline Glow */}
          <path 
            d="M 10,120 Q 120,30 230,120 Q 120,210 10,120 Z" 
            fill="none" 
            stroke="#4ab084" 
            strokeWidth="1" 
            opacity="0.15"
            strokeDasharray="2, 4"
          />

          {/* Group clipped strictly to the almond socket — no rectangular overlays can bleed outside */}
          <g clipPath="url(#eye-inner-clip)">
            {/* Dark sclera base */}
            <path d="M 15,120 Q 120,40 225,120 Q 120,200 15,120 Z" fill="#03030a" />

            {/* Emerald Iris — rotation slowed from 80s to 120s */}
            <g style={{ transformOrigin: '120px 120px', animation: 'iris-rotate 120s linear infinite' }}>
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
                    stroke="rgba(180, 240, 200, 0.40)" 
                    strokeWidth="0.8" 
                  />
                );
              })}
            </g>

            {/* Pupil — slowed to 12s */}
            <ellipse 
              cx="120" 
              cy="120" 
              rx="12" 
              ry="24" 
              fill="#000000" 
              style={{ 
                transformOrigin: '120px 120px', 
                animation: 'pupil-pulse 12s infinite ease-in-out' 
              }} 
            />

            {/* Catchlight */}
            <circle cx="132" cy="108" r="6" fill="rgba(220, 255, 235, 0.95)" />

            {/* SVG Top Eyelid (Clipped, meets perfectly at y=120) — slowed to 14s */}
            <rect 
              x="0" 
              y="0" 
              width="240" 
              height="120" 
              fill="#020403" 
              style={{ 
                transformOrigin: '50% 0%',
                animation: 'eyelid-blink-top 14s infinite cubic-bezier(0.77, 0, 0.175, 1)'
              }} 
            />

            {/* SVG Bottom Eyelid (Clipped, meets perfectly at y=120) — slowed to 14s */}
            <rect 
              x="0" 
              y="120" 
              width="240" 
              height="120" 
              fill="#020403" 
              style={{ 
                transformOrigin: '50% 100%',
                animation: 'eyelid-blink-bottom 14s infinite cubic-bezier(0.77, 0, 0.175, 1)'
              }} 
            />
          </g>

          {/* Sharp Almond outline border placed on top of the clipped stack so the stroke stays perfectly clean */}
          <path 
            d="M 15,120 Q 120,40 225,120 Q 120,200 15,120 Z" 
            fill="none" 
            stroke="#4ab084" 
            strokeWidth="2.2" 
          />

          {/* Eyelid Eyelashes / Accent ticks */}
          <line x1="120" y1="36" x2="120" y2="28" stroke="#4ab084" strokeWidth="1.5" opacity="0.6" />
          <line x1="120" y1="204" x2="120" y2="212" stroke="#4ab084" strokeWidth="1.5" opacity="0.6" />
        </svg>
      </div>

      <style>{`
        @keyframes eye-glow {
          0%, 100% { transform: scale(0.92); opacity: 0.6; }
          50% { transform: scale(1.08); opacity: 0.9; }
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
          0%, 6%, 10%, 100% { transform: translateY(-120px); }
          8% { transform: translateY(0px); }
        }
        @keyframes eyelid-blink-bottom {
          0%, 6%, 10%, 100% { transform: translateY(120px); }
          8% { transform: translateY(0px); }
        }
      `}</style>
    </div>
  );
}
