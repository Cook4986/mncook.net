'use client';

import { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction, KernelSize } from 'postprocessing';
import TerrainMesh from './TerrainMesh';
import ContentPins, { PIN_ORDER, type PinSelectOrigin } from './ContentPins';
import Atmosphere from './Atmosphere';
import AlchemicalLoader from './AlchemicalLoader';
import { SpatialContent, TextualContent, TechnicalContent, AudiovisualContent, ProfessionalContent, ContactContent } from '@/content/OverlayContent';

/* Roman numeral helper (1..399 is more than enough for folio markers). */
function roman(n: number): string {
  const m: [number, string][] = [
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
  ];
  let out = '';
  for (const [v, s] of m) {
    while (n >= v) { out += s; n -= v; }
  }
  return out || 'I';
}

/* =========================================================
   TerrainScene — The full-screen 3D hero canvas with 2D Overlay
   ========================================================= */

const OVERLAY_MAP: Record<string, { title: string; component: React.ReactNode }> = {
  textual: { title: 'Textual', component: <TextualContent /> },
  professional: { title: 'Professional', component: <ProfessionalContent /> },
  spatial: { title: 'Spatial', component: <SpatialContent /> },
  audiovisual: { title: 'Audiovisual', component: <AudiovisualContent /> },
  technical: { title: 'Technical', component: <TechnicalContent /> },
  // NOTE: 'ritual' overlay temporarily removed — feature in development, not for production.
  contact: { title: 'Contact', component: <ContactContent /> },
};

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function InteractiveGemRotation({ activePin, children }: { activePin: string | null, children: React.ReactNode }) {
  const groupRef = useRef<THREE.Group>(null);
  const targetRotation = useRef({ x: 0, y: 0.0005, z: 0 });
  const currentVelocity = useRef({ x: 0, y: 0.0005, z: 0 });

  useFrame(() => {
    if (activePin || !groupRef.current) return; // Pause rotation when reading

    // Randomize velocity occasionally to simulate natural drift/tides
    if (Math.random() < 0.005) {
      targetRotation.current.x = (Math.random() - 0.5) * 0.001;
      targetRotation.current.y = (Math.random() - 0.5) * 0.003;
      targetRotation.current.z = (Math.random() - 0.5) * 0.001;
    }

    // Smoothly lerp towards target velocity
    currentVelocity.current.x = THREE.MathUtils.lerp(currentVelocity.current.x, targetRotation.current.x, 0.01);
    currentVelocity.current.y = THREE.MathUtils.lerp(currentVelocity.current.y, targetRotation.current.y, 0.01);
    currentVelocity.current.z = THREE.MathUtils.lerp(currentVelocity.current.z, targetRotation.current.z, 0.01);

    groupRef.current.rotation.x += currentVelocity.current.x;
    groupRef.current.rotation.y += currentVelocity.current.y;
    groupRef.current.rotation.z += currentVelocity.current.z;
  });

  return <group ref={groupRef}>{children}</group>;
}

// Detect a low-power tier (small screens, few CPU cores, or low device
// memory) so the WebGL scene can shed expensive work on weaker hardware.
// Computed once via a lazy useState initializer; defaults to the full-
// quality path when the signals are unavailable. This component only ever
// renders client-side (dynamic import with ssr:false), so window/navigator
// are safe to read here.
function detectLowPower(): boolean {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false;
  const cores = navigator.hardwareConcurrency ?? 8;
  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const smallScreen = window.innerWidth < 768;
  return smallScreen || cores <= 4 || (typeof mem === 'number' && mem <= 4);
}

export default function TerrainScene() {
  const [lowPower] = useState(detectLowPower);
  const [activePin, setActivePin] = useState<string | null>(null);
  const [renderedPin, setRenderedPin] = useState<string | null>(null);
  const [isClosing, setIsClosing] = useState(false);
  // Ink-bleed origin tracked from the clicked pin so the modal grows
  // out of the spot the user actually touched on screen.
  const [bleedOrigin, setBleedOrigin] = useState<PinSelectOrigin>({ x: 0, y: 0 });
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleSelect = (id: string, origin: PinSelectOrigin) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setBleedOrigin(origin);
    setActivePin(id);
    setRenderedPin(id);
    setIsClosing(false);
  };

  const handleClose = () => {
    if (!renderedPin || isClosing) return;
    setIsClosing(true);
    setActivePin(null);

    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
    }

    closeTimeoutRef.current = setTimeout(() => {
      setRenderedPin(null);
      setIsClosing(false);
      closeTimeoutRef.current = null;
    }, 600);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [renderedPin, isClosing]);

  // Clear any pending close timeout if the scene unmounts mid-animation.
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  const folio = renderedPin ? roman(PIN_ORDER[renderedPin] ?? 1) : '';

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <AlchemicalLoader />
      <Canvas
        camera={{
          position: [6, 5, 8],
          fov: 45,
          near: 0.1,
          far: 100,
        }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
        }}
        dpr={lowPower ? [1, 1.5] : [1, 2]}
        style={{
          background: '#0d0d1a',
        }}
      >
        <Suspense fallback={null}>
          <Atmosphere dustCount={lowPower ? 60 : 150} />
          <InteractiveGemRotation activePin={activePin}>
            <TerrainMesh />
            <ContentPins onSelect={handleSelect} activePin={activePin} />
          </InteractiveGemRotation>
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={3}
          maxDistance={12}
          autoRotate={false} // Handled by InteractiveGemRotation
          dampingFactor={0.015} // Heavy inertial drag for user interaction
          enableDamping={true}
        />

        {/* Post-processing — the cheap secret to "cinematic".
            Bloom turns every bright emission (lantern cores, watcher iris,
            cryptkeeper cuffs, comet streaks) into actual light bleed.
            Vignette darkens edges so attention falls on the gem.
            Noise adds film grain so the dark void doesn't read as flat HEX. */}
        <EffectComposer multisampling={lowPower ? 0 : 4}>
          <Bloom
            intensity={0.95}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.5}
            mipmapBlur
            radius={0.8}
            kernelSize={lowPower ? KernelSize.SMALL : KernelSize.LARGE}
          />
          <Vignette
            eskil={false}
            offset={0.45}
            darkness={0.42}
            blendFunction={BlendFunction.NORMAL}
          />
          <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
        </EffectComposer>
      </Canvas>

      {/* Section overlay — printed-almanac plate set in IM Fell English.
          Reveal is a slow zoom-to-window growing out of the clicked pin. */}
      {renderedPin && OVERLAY_MAP[renderedPin] && (
        <>
          {/* Backdrop fades in alongside */}
          <div
            className={`annotation-backdrop ${isClosing ? 'closing' : ''}`}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 999998,
              background: 'rgba(4, 4, 10, 0.55)',
              backdropFilter: 'blur(6px) saturate(0.85)',
            }}
            onClick={handleClose}
          />

          <div
            className={`annotation-overlay ${isClosing ? 'closing' : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={OVERLAY_MAP[renderedPin].title}
            style={{
              position: 'fixed',
              width: 'min(92vw, 900px)',
              height: 'min(85vh, 800px)',
              background: 'linear-gradient(145deg, #0a0a0e 0%, #121218 100%)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '12px',
              padding: 'clamp(20px, 5vw, 40px)',
              color: '#ffffff',
              zIndex: 999999,
              boxShadow: '0 30px 60px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05)',
              display: 'flex',
              flexDirection: 'column',
              ['--bleed-x' as string]: `${bleedOrigin.x}px`,
              ['--bleed-y' as string]: `${bleedOrigin.y}px`,
              transformOrigin: '0 0',
            }}
          >
            {/* Folio chrome — thin inset double rule, evokes a printed plate */}
            <div
              aria-hidden
              style={{
                position: 'absolute',
                inset: '12px',
                borderRadius: '6px',
                pointerEvents: 'none',
                boxShadow:
                  'inset 0 0 0 1px rgba(255,255,255,0.10), inset 0 0 0 5px rgba(0,0,0,0), inset 0 0 0 6px rgba(255,255,255,0.06)',
              }}
            />

            <button
              onClick={handleClose}
              aria-label="Close"
              style={{
                position: 'absolute',
                top: 'clamp(12px, 3vw, 20px)',
                right: 'clamp(16px, 4vw, 24px)',
                background: 'none',
                border: 'none',
                color: 'var(--ivory-dim)',
                cursor: 'pointer',
                fontSize: '1.5rem',
                lineHeight: 1,
                zIndex: 10,
                padding: '8px'
              }}
            >
              ✕
            </button>

            <div style={{
              position: 'relative',
              height: 'clamp(160px, 25vh, 280px)',
              margin: 'calc(-1 * clamp(20px, 5vw, 40px)) calc(-1 * clamp(20px, 5vw, 40px)) 24px calc(-1 * clamp(20px, 5vw, 40px))',
              borderTopLeftRadius: '12px',
              borderTopRightRadius: '12px',
              backgroundImage: `linear-gradient(to bottom, rgba(10, 10, 14, 0.1) 0%, rgba(10, 10, 14, 0.6) 60%, rgba(10, 10, 14, 1) 100%), url('/headers/${renderedPin}.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: renderedPin === 'contact' ? 'bottom center' : 'center',
              display: 'flex',
              alignItems: 'flex-end',
              padding: '20px clamp(20px, 5vw, 40px)',
              flexShrink: 0
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', width: '100%' }}>
                {/* Folio marker — "PARS · III" — pure paper-plate convention */}
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.7rem',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.65)',
                  textShadow: '0 2px 8px rgba(0,0,0,0.8)'
                }}>
                  PARS · {folio}
                </div>
                <h2 style={{
                  fontFamily: 'var(--font-serif)', // IM Fell English — 17th-c. printed type
                  fontStyle: 'italic',
                  fontWeight: 400,
                  fontSize: 'clamp(2.2rem, 6.5vw, 3.4rem)',
                  margin: 0,
                  color: '#ffffff',
                  letterSpacing: '0.01em',
                  textShadow: '0 4px 12px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)',
                  lineHeight: 1
                }}>
                  {OVERLAY_MAP[renderedPin].title}
                </h2>
              </div>
            </div>

            <div style={{ flex: 1, overflow: 'hidden' }}>
              {OVERLAY_MAP[renderedPin].component}
            </div>
          </div>
        </>
      )}

      <style>{`
        /* Zoom-to-window reveal — the plate grows from a tiny rect at the
           clicked pin into its final centered footprint.
           top/left animate from click-origin to viewport-center, while
           scale ramps from near-zero to 1. */
        @keyframes zoomToWindowBackdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes zoomToWindowBackdropClose {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes zoomToWindowPlate {
          0% {
            top:  var(--bleed-y, 50vh);
            left: var(--bleed-x, 50vw);
            transform: translate(-50%, -50%) scale(0.04);
            opacity: 0;
          }
          18% {
            opacity: 1;
          }
          100% {
            top:  50vh;
            left: 50vw;
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
        }
        @keyframes zoomToWindowPlateClose {
          0% {
            top:  50vh;
            left: 50vw;
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          82% {
            opacity: 1;
          }
          100% {
            top:  var(--bleed-y, 50vh);
            left: var(--bleed-x, 50vw);
            transform: translate(-50%, -50%) scale(0.04);
            opacity: 0;
          }
        }
        .annotation-backdrop {
          animation: zoomToWindowBackdrop 1300ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .annotation-backdrop.closing {
          animation: zoomToWindowBackdropClose 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        .annotation-overlay {
          /* Anchored to the click point at 0% and to the viewport center at 100%.
             Slow ease-out so it feels like the pin is unfolding. */
          animation: zoomToWindowPlate 1500ms cubic-bezier(0.16, 1, 0.3, 1) both;
          will-change: top, left, transform, opacity;
        }
        .annotation-overlay.closing {
          animation: zoomToWindowPlateClose 600ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
      `}</style>
    </div>
  );
}
