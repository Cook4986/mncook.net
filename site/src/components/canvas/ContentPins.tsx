'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

/* =========================================================
   ContentPins — simple glowing-white pin heads tethered to
   the gem surface by a thin white thread.

   Each pin: raycast once at mount from rayOrigin towards
   the gem centroid, store the hit point and a point 1.4 units
   further outward along the same direction. The thread goes
   from hit → head, so it touches the surface and the head
   floats just off it.

   Now that MineralMesh no longer self-rotates, both surface
   and head live in the InteractiveGemRotation group and stay
   in lock-step with the gem.
   ========================================================= */

interface PinData {
  id: string;
  label: string;
  rayOrigin: [number, number, number];
}

const PINS: PinData[] = [
  { id: 'textual', label: 'Textual', rayOrigin: [-10, 10, -10] },
  { id: 'professional', label: 'Professional', rayOrigin: [-10, -5, 10] },
  { id: 'spatial', label: 'Spatial', rayOrigin: [10, 5, -10] },
  { id: 'technical', label: 'Technical', rayOrigin: [0, 15, 0] },
  // NOTE: 'ritual' pin temporarily removed — feature in development, not for production.
  { id: 'audiovisual', label: 'Audiovisual', rayOrigin: [10, -10, 10] },
  { id: 'contact', label: 'Contact', rayOrigin: [0, -15, 0] },
];

export interface PinSelectOrigin {
  x: number;
  y: number;
}

interface ContentPinsProps {
  onSelect: (id: string, origin: PinSelectOrigin) => void;
  activePin: string | null;
}

function Pin({ pin, onSelect, isActive }: { pin: PinData, onSelect: (id: string, origin: PinSelectOrigin) => void, isActive: boolean }) {
  const headMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const haloMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const { scene } = useThree();

  const [surfacePoint, setSurfacePoint] = useState<THREE.Vector3 | null>(null);
  const [offsetPoint, setOffsetPoint] = useState<THREE.Vector3 | null>(null);

  // Phase offset so each pin breathes out of sync.
  // Lazy useState init keeps the value stable across re-renders without
  // re-rolling Math.random() each render (react-hooks/purity).
  const [phaseSeed] = useState(() => Math.random() * Math.PI * 2);
  const phaseRef = useRef(phaseSeed);

  // Line material lives in a ref so useFrame can safely mutate its opacity
  // without violating react-hooks/immutability. Constructed lazily and
  // disposed on unmount so each Pin contributes exactly one GPU material.
  const lineMatRef = useRef<THREE.LineBasicMaterial | null>(null);
  if (lineMatRef.current == null) {
    lineMatRef.current = new THREE.LineBasicMaterial({ color: '#ffffff', transparent: true, opacity: 0.35 });
  }

  // Raycast against the gem surface ONCE
  useEffect(() => {
    const timeout = setTimeout(() => {
      const mineral = scene.getObjectByName('MineralMesh');
      const originVec = new THREE.Vector3(...pin.rayOrigin);
      const direction = new THREE.Vector3(0, 0, 0).sub(originVec).normalize();

      if (mineral) {
        const raycaster = new THREE.Raycaster(originVec, direction);
        const intersects = raycaster.intersectObject(mineral, true);
        if (intersects.length > 0) {
          const point = intersects[0].point.clone();
          const box = new THREE.Box3().setFromObject(mineral);
          const centroid = box.getCenter(new THREE.Vector3());
          const outward = point.clone().sub(centroid).normalize();
          setSurfacePoint(point);
          setOffsetPoint(point.clone().add(outward.multiplyScalar(1.4)));
          return;
        }
      }
      // Fallback — no hit (model not loaded yet)
      const fallback = originVec.clone().normalize().multiplyScalar(2);
      setSurfacePoint(fallback);
      setOffsetPoint(fallback.clone().add(new THREE.Vector3(0, 0.5, 0)));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [scene, pin.rayOrigin]);

  // Build geometry + Line object once per (surfacePoint, offsetPoint) pair
  // and clean up the GPU buffers on unmount or update. Previously a fresh
  // THREE.Line was constructed on every render via `new THREE.Line(...)`
  // inside JSX — that leaked geometry + the line object on each frame.
  const [line, setLine] = useState<THREE.Line | null>(null);
  useEffect(() => {
    if (!surfacePoint || !offsetPoint || !lineMatRef.current) return;
    const geo = new THREE.BufferGeometry().setFromPoints([surfacePoint, offsetPoint]);
    const next = new THREE.Line(geo, lineMatRef.current);
    setLine(next);
    return () => { geo.dispose(); };
  }, [surfacePoint, offsetPoint]);

  // Dispose the material when the Pin unmounts.
  useEffect(() => {
    const mat = lineMatRef.current;
    return () => { mat?.dispose(); };
  }, []);

  useFrame((_, delta) => {
    phaseRef.current += delta;
    const active = hovered || isActive;

    if (headMatRef.current) {
      // Subtle gentle pulse, brighter on hover
      const base = active ? 1.0 : 0.85;
      const pulse = 0.10 * Math.sin(phaseRef.current * 1.4);
      headMatRef.current.opacity = base + pulse * 0.5;
    }
    if (haloMatRef.current) {
      const target = active ? 0.55 : 0.22;
      const pulse = 0.07 * Math.sin(phaseRef.current * 0.9 + 1);
      haloMatRef.current.opacity = target + pulse;
    }
    // Line stays a constant subtle white; brighten slightly on hover.
    // Mutating the ref-owned material is fine for the immutability rule.
    if (lineMatRef.current) lineMatRef.current.opacity = active ? 0.62 : 0.32;
  });

  if (!surfacePoint || !offsetPoint) return null;

  const headScale = hovered || isActive ? 1.45 : 1.0;

  return (
    <>
      {line && <primitive object={line} />}

      <group
        position={offsetPoint}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); setHovered(false); document.body.style.cursor = 'default'; }}
        onClick={(e) => {
          e.stopPropagation();
          const native = e.nativeEvent as PointerEvent | MouseEvent;
          onSelect(pin.id, { x: native.clientX, y: native.clientY });
        }}
        scale={[headScale, headScale, headScale]}
      >
        {/* Outer halo — bloom-bait, fades on hover */}
        <mesh>
          <sphereGeometry args={[0.22, 24, 24]} />
          <meshBasicMaterial ref={haloMatRef} color="#ffffff" transparent opacity={0.22} depthWrite={false} toneMapped={false} blending={THREE.AdditiveBlending} />
        </mesh>
        {/* Core */}
        <mesh>
          <sphereGeometry args={[0.085, 24, 24]} />
          <meshBasicMaterial ref={headMatRef} color="#ffffff" transparent opacity={0.85} depthWrite={false} toneMapped={false} />
        </mesh>

        <Html
          position={[0, 0.32, 0]}
          center
          zIndexRange={[10, 80]}
          style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
        >
          <div style={{
            fontFamily: 'var(--font-mono)', // Rajdhani — bolder, cleaner sans
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.18em',
            color: hovered || isActive ? '#ffffff' : 'rgba(255,255,255,0.82)',
            fontSize: hovered || isActive ? '14px' : '12px',
            textShadow: '0 2px 12px rgba(0,0,0,0.9)',
            transition: 'all 0.25s cubic-bezier(0.22, 1, 0.36, 1)',
            transform: hovered || isActive ? 'translateY(-2px)' : 'none'
          }}>
            {pin.label}
          </div>
        </Html>
      </group>
    </>
  );
}

// PIN_ORDER gives each pin a stable index for the modal's folio numeral.
export const PIN_ORDER: Record<string, number> = Object.fromEntries(
  PINS.map((p, i) => [p.id, i + 1])
);

export default function ContentPins({ onSelect, activePin }: ContentPinsProps) {
  return (
    <group>
      {PINS.map(pin => (
        <Pin key={pin.id} pin={pin} onSelect={onSelect} isActive={activePin === pin.id} />
      ))}
    </group>
  );
}
