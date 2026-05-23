'use client';

/* =========================================================
   Atmosphere — the sky-bestiary of SCORPIO.

   All phenomena now lean toward "uncanny / erratic":
     • motion is driven by multi-octave simplex noise plus
       quantised glitch offsets that produce sudden discrete
       lurches at random intervals
     • opacity carries a rare-blink modifier that drops the
       sprite to near-zero for a single frame
     • durations are short on average and concurrent count is
       low so the void mostly STAYS empty — anticipation does
       the work

   The two ambient effects (solar flare, lightning) are kept
   in this same file:
     • flare is now a VISIBLE body — a small bright orb +
       halo sprite + point light + chromatic streak — that
       arcs across the back of the scene every ~12-22 s
     • lightning is a high-intensity point light that pumps
       the fog colour toward white in rapid bursts every
       ~18-32 s

   See sigils.ts for the procedural textures.
   ========================================================= */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { Float } from '@react-three/drei';
import { createNoise2D } from 'simplex-noise';
import { getSigilTextures } from './sigils';

const noise2D = createNoise2D();

// Scratch Color reused across frames to avoid allocating a new THREE.Color
// every lightning tick (which previously generated GC pressure mid-storm).
const scratchColor = new THREE.Color();

/* ---------------------------------------------------------------
   Erratic-motion helpers — pure, no React state.
   --------------------------------------------------------------- */

/** Quantised glitch: returns a random unit-vector multiplier that
    only "fires" at occasional time-slots, then decays to zero.
    Used to inject sudden discrete spatial lurches. */
function glitchTick(time: number, seed: number, every = 1.3, chance = 0.18): number {
  const slot = Math.floor(time / every + seed);
  const trigger = ((slot * 9301 + Math.floor(seed * 100)) % 100) / 100;
  if (trigger > chance) return 0;
  // Within-slot decay so the lurch lasts ~80 ms
  const phase = (time / every + seed) - slot;
  return Math.max(0, 1 - phase * 12);
}

/** Rare blink — returns 1 most of the time, occasionally drops
    to a low value for one or two frames. Stable per second-slot. */
function rareBlink(time: number, seed: number, perSecond = 0.5): number {
  const slot = Math.floor(time * perSecond + seed);
  const hash = ((slot * 13 + Math.floor(seed * 100)) % 100) / 100;
  if (hash < 0.04) {
    const phase = (time * perSecond + seed) - slot;
    if (phase < 0.08) return 0.08; // brief near-invisibility
  }
  return 1;
}

/** Stepped noise — quantises simplex into discrete steps for
    a jaggy, less predictable look. */
function steppedDrift(time: number, seed: number, stepRate = 4, scale = 0.4): number {
  const stepTime = Math.floor(time * stepRate) / stepRate;
  return noise2D(stepTime + seed, seed * 0.3) * scale;
}

/* ---------------------------------------------------------------
   Dust — slow particulate drift behind the gem.
   --------------------------------------------------------------- */
// Deterministic PRNG so initial positions are stable across renders and
// satisfy react-hooks/purity. Seed is per-instance via a useState init.
function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function DustParticles({ count = 150 }) {
  const meshRef = useRef<THREE.Points>(null);
  const [seed] = useState(() => (Math.random() * 0xffffffff) >>> 0);

  const { positions, sizes } = React.useMemo(() => {
    const rand = mulberry32(seed);
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (rand() - 0.5) * 60;
      pos[i * 3 + 1] = rand() * 20 - 5;
      pos[i * 3 + 2] = -15 - rand() * 30;
      sz[i] = rand() * 1.5 + 0.5;
    }
    return { positions: pos, sizes: sz };
  }, [count, seed]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position;
    const t = clock.elapsedTime * 0.03;
    for (let i = 0; i < count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      const z = pos.getZ(i);
      pos.setX(i, x + Math.sin(t + i * 0.1) * 0.002);
      pos.setY(i, y + Math.cos(t + i * 0.05) * 0.001);
      pos.setZ(i, z + Math.sin(t * 0.7 + i * 0.08) * 0.002);
    }
    pos.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial color="#c4923a" size={0.04} transparent opacity={0.15} depthWrite={true} blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ===============================================================
   Shared types
   =============================================================== */

type PhenomenonType =
  | 'aero'
  | 'pilgrim'
  | 'lantern'
  | 'watcher'
  | 'whisper'
  | 'scorpion'
  | 'cryptkeeper';

interface Phenomenon {
  id: string;
  type: PhenomenonType;
  start: THREE.Vector3;
  end: THREE.Vector3;
  duration: number;
  seed: number;
}

interface PhenomenonProps {
  start: THREE.Vector3;
  end: THREE.Vector3;
  duration: number;
  onComplete: () => void;
  seed: number;
}

function useNoiseDrift(seed: number, scale = 0.3, speed = 0.4) {
  return (time: number, out: THREE.Vector3) => {
    out.x = noise2D(time * speed + 0, seed) * scale;
    out.y = noise2D(time * speed + 100, seed) * scale * 0.7;
    out.z = noise2D(time * speed + 200, seed) * scale * 0.5;
    return out;
  };
}

/* ===============================================================
   THE AERO — phantom airship.
   Linework-only sprite + rare lurch + slow swing.
   =============================================================== */
function PhenomenonAero({ start, end, duration, onComplete, seed }: PhenomenonProps) {
  const ref = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Sprite>(null);
  const startTime = useRef(0);
  const { aero } = getSigilTextures();
  const drift = useMemo(() => new THREE.Vector3(), []);
  // Tight drift — keeps the airship in its lane within the frustum
  const sampleDrift = useNoiseDrift(seed * 0.013, 0.12, 0.28);

  useEffect(() => { startTime.current = performance.now() / 1000; }, []);

  useFrame(({ clock }) => {
    if (!ref.current || startTime.current === 0) return;
    const t = (clock.elapsedTime - startTime.current) / duration;
    if (t > 1.0) { onComplete(); return; }

    sampleDrift(clock.elapsedTime, drift);

    // Base path + slow sin bob + rare lurch (lurchY tamed so the
    // airship can't pop above the viewport during a glitch tick)
    const lurchX = glitchTick(clock.elapsedTime, seed, 5.0, 0.20) * Math.sin(seed * 31) * 0.6;
    const lurchY = glitchTick(clock.elapsedTime, seed + 1, 4.5, 0.20) * Math.cos(seed * 19) * 0.2;

    ref.current.position.lerpVectors(start, end, t).add(drift);
    ref.current.position.x += lurchX;
    ref.current.position.y += Math.sin(t * Math.PI * 2.8 + seed) * 0.08 + lurchY;

    // Slow tilt swing as it drifts
    ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.45 + seed) * 0.06;

    if (bodyRef.current) {
      const mat = bodyRef.current.material as THREE.SpriteMaterial;
      const env = Math.min(1, Math.sin(t * Math.PI) * 1.8);
      mat.opacity = env * rareBlink(clock.elapsedTime, seed, 0.4) * 0.92;
    }
  });

  return (
    <group ref={ref}>
      <sprite ref={bodyRef} scale={[6.2, 3.1, 1]}>
        <spriteMaterial map={aero} transparent opacity={0} depthWrite={false} toneMapped={false} />
      </sprite>
    </group>
  );
}

/* ===============================================================
   THE PILGRIM — bright comet (no glyph stamp).
   Multi-segment jaggy path via stepped noise modulating the
   straight-line lerp.
   =============================================================== */
function PhenomenonPilgrim({ start, end, duration, onComplete, seed }: PhenomenonProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const haloRef = useRef<THREE.Sprite>(null);
  const startTime = useRef(0);
  const { haloIvory } = getSigilTextures();
  const drift = useMemo(() => new THREE.Vector3(), []);
  const sampleDrift = useNoiseDrift(seed * 0.017, 0.45, 1.1);

  useEffect(() => { startTime.current = performance.now() / 1000; }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || startTime.current === 0) return;
    const t = (clock.elapsedTime - startTime.current) / duration;
    if (t > 1.0) { onComplete(); return; }

    sampleDrift(clock.elapsedTime, drift);
    // Jagged path — stepped noise quantised at 8 Hz gives discrete kinks
    const jagX = steppedDrift(clock.elapsedTime, seed, 8, 0.35);
    const jagY = steppedDrift(clock.elapsedTime, seed + 0.5, 8, 0.25);

    groupRef.current.position.lerpVectors(start, end, t).add(drift);
    groupRef.current.position.x += jagX;
    groupRef.current.position.y += jagY;

    const env = Math.min(1, Math.sin(t * Math.PI) * 1.7);
    const flicker = 0.75 + 0.25 * Math.sin(clock.elapsedTime * 17 + seed);
    const blink = rareBlink(clock.elapsedTime, seed, 1.2);
    if (headMatRef.current) headMatRef.current.opacity = env * flicker * blink;
    if (haloRef.current) (haloRef.current.material as THREE.SpriteMaterial).opacity = env * 0.78 * blink;
  });

  return (
    <group ref={groupRef}>
      <sprite ref={haloRef} scale={[2.4, 2.4, 1]}>
        <spriteMaterial map={haloIvory} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </sprite>
      <mesh>
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshBasicMaterial ref={headMatRef} color="#ffffff" transparent opacity={0} toneMapped={false} />
      </mesh>
      <pointLight color="#fff8e6" intensity={4} distance={22} decay={2} />
    </group>
  );
}

/* ===============================================================
   THE LANTERN — drifting witch-light.
   Violent flicker + occasional horizontal jerk.
   =============================================================== */
function PhenomenonLantern({ start, end, duration, onComplete, seed }: PhenomenonProps) {
  const ref = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.SpriteMaterial>(null);
  const coreRef = useRef<THREE.MeshBasicMaterial>(null);
  const innerHaloRef = useRef<THREE.SpriteMaterial>(null);
  const startTime = useRef(0);
  const { haloWarm } = getSigilTextures();
  const drift = useMemo(() => new THREE.Vector3(), []);
  const sampleDrift = useNoiseDrift(seed * 0.019, 0.55, 0.7);

  useEffect(() => { startTime.current = performance.now() / 1000; }, []);

  useFrame(({ clock }) => {
    if (!ref.current || startTime.current === 0) return;
    const t = (clock.elapsedTime - startTime.current) / duration;
    if (t > 1.0) { onComplete(); return; }

    sampleDrift(clock.elapsedTime, drift);
    const rise = Math.pow(t, 0.7) * 1.5;
    const base = new THREE.Vector3().lerpVectors(start, end, t);
    // Horizontal jerk — quantised glitch
    const jerk = glitchTick(clock.elapsedTime, seed, 2.0, 0.22) * Math.sign(Math.sin(seed * 11)) * 0.5;
    ref.current.position.set(base.x + drift.x + jerk, base.y + drift.y + rise, base.z + drift.z);

    // Three-octave flicker — candle-like
    const flicker =
      0.55 +
      0.30 * Math.sin(clock.elapsedTime * 22 + seed) +
      0.18 * Math.sin(clock.elapsedTime * 7.3 + seed * 2) +
      0.10 * Math.sin(clock.elapsedTime * 41 + seed * 0.7);
    const envelope = Math.min(1, Math.sin(t * Math.PI) * 1.3);
    const blink = rareBlink(clock.elapsedTime, seed, 0.9);

    if (coreRef.current) coreRef.current.opacity = envelope * flicker * blink;
    if (haloRef.current) haloRef.current.opacity = envelope * (0.35 + 0.30 * flicker) * blink;
    if (innerHaloRef.current) innerHaloRef.current.opacity = envelope * (0.55 + 0.20 * flicker) * blink;
  });

  return (
    <group ref={ref}>
      <sprite scale={[3.0, 3.0, 1]}>
        <spriteMaterial ref={haloRef} map={haloWarm} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite scale={[1.4, 1.4, 1]}>
        <spriteMaterial ref={innerHaloRef} map={haloWarm} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <mesh>
        <sphereGeometry args={[0.20, 20, 20]} />
        <meshBasicMaterial ref={coreRef} color="#ffcc66" transparent opacity={0} toneMapped={false} />
      </mesh>
      <pointLight color="#ffaa55" intensity={6} distance={22} decay={1.6} />
    </group>
  );
}

/* ===============================================================
   THE WATCHER — eye that tracks the camera.
   Snap-tracks (faster lerp), multi-frequency blinks,
   rare total invisibility, iris twitches.
   =============================================================== */
function PhenomenonWatcher({ start, end, duration, onComplete, seed }: PhenomenonProps) {
  const ref = useRef<THREE.Group>(null);
  const haloRef = useRef<THREE.SpriteMaterial>(null);
  const irisRef = useRef<THREE.Sprite>(null);
  const pupilRef = useRef<THREE.Sprite>(null);
  const startTime = useRef(0);
  const { eye, pupil, haloEmerald } = getSigilTextures();
  const { camera } = useThree();
  const drift = useMemo(() => new THREE.Vector3(), []);
  const sampleDrift = useNoiseDrift(seed * 0.023, 0.50, 0.55);
  const lookDir = useMemo(() => new THREE.Vector2(), []);

  useEffect(() => { startTime.current = performance.now() / 1000; }, []);

  useFrame(({ clock }) => {
    if (!ref.current || startTime.current === 0) return;
    const t = (clock.elapsedTime - startTime.current) / duration;
    if (t > 1.0) { onComplete(); return; }

    sampleDrift(clock.elapsedTime, drift);
    const base = new THREE.Vector3().lerpVectors(start, end, t);
    // Small positional glitch
    const px = glitchTick(clock.elapsedTime, seed, 3.5, 0.22) * 0.3;
    ref.current.position.copy(base).add(drift);
    ref.current.position.x += px;

    // Compound lid envelope + multi-frequency blinks
    const open = Math.pow(Math.sin(t * Math.PI), 0.6);
    const blinkSlow = 1 - 0.85 * Math.pow(Math.max(0, Math.sin(clock.elapsedTime * 1.7 + seed)), 32);
    const blinkFast = 1 - 0.70 * Math.pow(Math.max(0, Math.sin(clock.elapsedTime * 4.3 + seed * 0.7)), 64);
    const rareGone = rareBlink(clock.elapsedTime, seed, 0.6);
    const lidScale = open * blinkSlow * blinkFast;

    if (irisRef.current) {
      const mat = irisRef.current.material as THREE.SpriteMaterial;
      mat.opacity = Math.min(1, open * 1.3) * 0.95 * rareGone;
      irisRef.current.scale.set(1.6, 1.6 * Math.max(0.04, lidScale) + 0.04, 1);
    }
    if (haloRef.current) haloRef.current.opacity = open * 0.7 * rareGone;

    // Pupil — TRACKS the camera. Snap rather than smooth lerp.
    if (pupilRef.current) {
      const pmat = pupilRef.current.material as THREE.SpriteMaterial;
      pmat.opacity = Math.min(1, open * 1.4) * blinkSlow * blinkFast * rareGone;
      lookDir.set(camera.position.x - ref.current.position.x, camera.position.y - ref.current.position.y).normalize();
      // Occasional discrete snap to a random direction (uncanny)
      const snap = glitchTick(clock.elapsedTime, seed + 9, 2.4, 0.18);
      const snapAngle = (snap > 0 ? (Math.sin(Math.floor(clock.elapsedTime * 2 + seed) * 17) * Math.PI) : 0);
      const offsetMag = 0.10;
      pupilRef.current.position.x = lookDir.x * offsetMag + Math.cos(snapAngle) * snap * 0.06;
      pupilRef.current.position.y = lookDir.y * offsetMag * Math.max(0.04, lidScale) + Math.sin(snapAngle) * snap * 0.06;

      // Iris contraction "tic"
      const dilation = 0.85 + 0.20 * Math.sin(clock.elapsedTime * 0.6 + seed)
                            + 0.20 * glitchTick(clock.elapsedTime, seed + 17, 3.2, 0.20);
      pupilRef.current.scale.set(0.20 * dilation, 0.55 * dilation * Math.max(0.04, lidScale) + 0.04, 1);
    }
  });

  return (
    <group ref={ref}>
      <sprite scale={[3.6, 3.6, 1]}>
        <spriteMaterial ref={haloRef} map={haloEmerald} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <sprite ref={irisRef} scale={[1.6, 1.6, 1]}>
        <spriteMaterial map={eye} transparent opacity={0} depthWrite={false} />
      </sprite>
      <sprite ref={pupilRef} scale={[0.2, 0.55, 1]}>
        <spriteMaterial map={pupil} transparent opacity={0} depthWrite={false} />
      </sprite>
    </group>
  );
}

/* ===============================================================
   THE WHISPER — fast bright streak (no glyph stamp).
   Jaggy path + opacity flickers throughout.
   =============================================================== */
function PhenomenonWhisper({ start, end, duration, onComplete, seed }: PhenomenonProps) {
  const groupRef = useRef<THREE.Group>(null);
  const headMatRef = useRef<THREE.MeshBasicMaterial>(null);
  const haloRef = useRef<THREE.Sprite>(null);
  const startTime = useRef(0);
  const { haloIvory } = getSigilTextures();

  useEffect(() => { startTime.current = performance.now() / 1000; }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current || startTime.current === 0) return;
    const t = (clock.elapsedTime - startTime.current) / duration;
    if (t > 1.0) { onComplete(); return; }

    // Jaggy path — stepped noise stronger than pilgrim
    const jagX = steppedDrift(clock.elapsedTime, seed, 10, 0.5);
    const jagY = steppedDrift(clock.elapsedTime, seed + 1, 10, 0.4);
    groupRef.current.position.lerpVectors(start, end, t);
    groupRef.current.position.x += jagX;
    groupRef.current.position.y += jagY;

    const env = Math.min(1, Math.sin(t * Math.PI) * 1.9);
    // Sharp opacity flicker — square-wave-ish via threshold
    const sq = Math.sin(clock.elapsedTime * 28 + seed) > 0.2 ? 1 : 0.25;
    const blink = rareBlink(clock.elapsedTime, seed, 2.0);
    if (headMatRef.current) headMatRef.current.opacity = env * sq * blink;
    if (haloRef.current) (haloRef.current.material as THREE.SpriteMaterial).opacity = env * 0.72 * sq * blink;
  });

  return (
    <group ref={groupRef}>
      <sprite ref={haloRef} scale={[1.7, 1.7, 1]}>
        <spriteMaterial map={haloIvory} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </sprite>
      <mesh>
        <sphereGeometry args={[0.10, 12, 12]} />
        <meshBasicMaterial ref={headMatRef} color="#ffffff" transparent opacity={0} toneMapped={false} />
      </mesh>
    </group>
  );
}

/* ===============================================================
   THE SCORPION — long pauses, sudden bursts, possible reversal.
   =============================================================== */
function PhenomenonScorpion({ start, end, duration, onComplete, seed }: PhenomenonProps) {
  const ref = useRef<THREE.Sprite>(null);
  const startTime = useRef(0);
  const { scorpion } = getSigilTextures();
  const drift = useMemo(() => new THREE.Vector3(), []);
  const sampleDrift = useNoiseDrift(seed * 0.029, 0.06, 5);

  useEffect(() => { startTime.current = performance.now() / 1000; }, []);

  useFrame(({ clock }) => {
    if (!ref.current || startTime.current === 0) return;
    const t = (clock.elapsedTime - startTime.current) / duration;
    if (t > 1.0) { onComplete(); return; }

    // Burst-pause: long stillness intermittently broken by hard bursts.
    // Square-wave on slow sin, modulated by a higher-freq cosine.
    const slow = Math.sin(t * Math.PI * 5 + seed);
    const burst = slow > 0.3 ? 1 : 0;
    const dashSpeed = burst * (1 + 0.4 * Math.sin(clock.elapsedTime * 35 + seed));
    const eased = 0.2 * t + 0.8 * t * dashSpeed;

    sampleDrift(clock.elapsedTime, drift);
    ref.current.position.lerpVectors(start, end, Math.min(1, eased)).add(drift);
    ref.current.position.y += Math.abs(Math.sin(t * 28)) * 0.08 * burst;

    const mat = ref.current.material as THREE.SpriteMaterial;
    // Body rotation tilt during bursts only
    mat.rotation = Math.sin(clock.elapsedTime * 22) * 0.20 * burst;
    const env = Math.min(1, Math.sin(t * Math.PI) * 1.7);
    mat.opacity = env * 0.98 * rareBlink(clock.elapsedTime, seed, 0.5);
  });

  return (
    <sprite ref={ref} scale={[1.6, 1.6, 1]}>
      <spriteMaterial map={scorpion} transparent opacity={0} depthWrite={false} />
    </sprite>
  );
}

/* ===============================================================
   THE CRYPTKEEPER — frequent glitch jumps, long flicker dips.
   =============================================================== */
function PhenomenonCryptkeeper({ start, end, duration, onComplete, seed }: PhenomenonProps) {
  const ref = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Sprite>(null);
  const cuffsRef = useRef<THREE.Sprite>(null);
  const startTime = useRef(0);
  const { cryptkeeper, cryptkeeperCuffs } = getSigilTextures();
  const lastGlitchAt = useRef(0);
  const glitchOffset = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => { startTime.current = performance.now() / 1000; }, []);

  useFrame(({ clock }) => {
    if (!ref.current || startTime.current === 0) return;
    const t = (clock.elapsedTime - startTime.current) / duration;
    if (t > 1.0) { onComplete(); return; }

    // Limp step modulation
    const stepPhase = Math.abs(Math.sin(t * 14));

    // Glitch jumps — more frequent than before
    const since = clock.elapsedTime - lastGlitchAt.current;
    if (since > 1.6 && Math.random() < 0.0065) {
      glitchOffset.set(
        (Math.random() - 0.5) * 1.4,
        (Math.random() - 0.5) * 0.5,
        (Math.random() - 0.5) * 0.7,
      );
      lastGlitchAt.current = clock.elapsedTime;
    }
    glitchOffset.multiplyScalar(0.84);
    const glitchActive = glitchOffset.lengthSq() > 0.001;

    const base = new THREE.Vector3().lerpVectors(start, end, t);
    ref.current.position.copy(base).add(glitchOffset);
    ref.current.position.y += stepPhase * 0.05 - 0.025;

    const env = Math.pow(Math.sin(t * Math.PI), 0.5);
    const flick = 1 - 0.10 * Math.pow(Math.sin(clock.elapsedTime * 2.3 + seed), 12);
    // Stronger long-flicker — rare dips to ~10% opacity
    const blink = rareBlink(clock.elapsedTime, seed, 0.7);
    if (bodyRef.current) {
      const mat = bodyRef.current.material as THREE.SpriteMaterial;
      mat.opacity = env * 0.93 * flick * blink * (glitchActive ? 0.45 : 1.0);
    }
    if (cuffsRef.current) {
      const mat = cuffsRef.current.material as THREE.SpriteMaterial;
      mat.opacity = env * (glitchActive ? 1.0 : 0.9) * blink;
    }
  });

  return (
    <group ref={ref}>
      <sprite ref={bodyRef} scale={[2.0, 4.0, 1]}>
        <spriteMaterial map={cryptkeeper} transparent opacity={0} depthWrite={false} />
      </sprite>
      <sprite ref={cuffsRef} scale={[2.0, 4.0, 1]}>
        <spriteMaterial map={cryptkeeperCuffs} transparent opacity={0} depthWrite={false} blending={THREE.AdditiveBlending} toneMapped={false} />
      </sprite>
    </group>
  );
}

/* ===============================================================
   FAKE LENSFLARE — sprite-based chromatic ghost chain.

   Replaces THREE.Lensflare (which uses framebuffer textures +
   raw shader materials internally and crashes when the WebGL
   context is lost during HMR alongside EffectComposer).

   Implementation:
     • project the sun's world position to NDC
     • position ghost sprites in camera-LOCAL space along the
       line from sun to its mirror across screen centre
     • fade the chain when the sun moves toward / off the edges

   No framebuffers, no shader materials, no occlusion test. HMR-
   safe and cheaper to render than the addon.
   =============================================================== */
type Ghost = { f: number; size: number; tex: 'main' | 'ghost'; color: string; alpha: number };

function FakeLensflare({ sunRef }: { sunRef: React.RefObject<THREE.PointLight | null> }) {
  const groupRef = useRef<THREE.Group>(null);
  const spriteRefs = useRef<(THREE.Sprite | null)[]>([]);
  const { camera } = useThree();
  const { flareMain, flareGhost } = getSigilTextures();
  const tmp = useMemo(() => new THREE.Vector3(), []);

  // f=0 sits at the sun, f=1 mirrors across screen centre.
  // Mix of sizes + faint chromatic tints reads as a real lens flare.
  const ghosts = useMemo<Ghost[]>(() => [
    { f: 0.00, size: 0.55, tex: 'main',  color: '#ffffff', alpha: 1.00 },
    { f: 0.55, size: 0.07, tex: 'ghost', color: '#d6e0ff', alpha: 0.70 },
    { f: 0.68, size: 0.11, tex: 'ghost', color: '#ffe6c8', alpha: 0.65 },
    { f: 0.78, size: 0.05, tex: 'ghost', color: '#ffcdc8', alpha: 0.85 },
    { f: 0.90, size: 0.16, tex: 'ghost', color: '#d0e8ff', alpha: 0.50 },
    { f: 1.00, size: 0.08, tex: 'ghost', color: '#ffe2b8', alpha: 0.60 },
  ], []);

  // Attach the lens-flare group to the camera so its children's
  // positions are camera-local and naturally follow camera motion.
  useEffect(() => {
    const g = groupRef.current;
    if (!g) return;
    camera.add(g);
    return () => { camera.remove(g); };
  }, [camera]);

  useFrame(() => {
    const g = groupRef.current;
    const sun = sunRef.current;
    if (!g || !sun) return;

    if (sun.intensity <= 0.001) {
      g.visible = false;
      return;
    }

    tmp.copy(sun.position).project(camera);
    const sx = tmp.x, sy = tmp.y, sz = tmp.z;

    // sz > 1 → sun is behind the camera; hide entirely
    if (sz > 1) { g.visible = false; return; }

    // Soft fade as the sun drifts off-axis
    const screenDist = Math.sqrt(sx * sx + sy * sy);
    const visibility = THREE.MathUtils.clamp(1.3 - screenDist, 0, 1);
    const intensity = THREE.MathUtils.clamp(sun.intensity / 110, 0, 1);

    g.visible = true;

    // Camera-local frustum half-extents at the depth where ghosts sit
    const cam = camera as THREE.PerspectiveCamera;
    const depth = 5;
    const halfH = depth * Math.tan((cam.fov * Math.PI) / 360);
    const halfW = halfH * cam.aspect;

    ghosts.forEach((ghost, i) => {
      const sprite = spriteRefs.current[i];
      if (!sprite) return;
      // Each ghost slides along the line from sun to its mirror
      const tx = sx * (1 - 2 * ghost.f);
      const ty = sy * (1 - 2 * ghost.f);
      sprite.position.set(tx * halfW, ty * halfH, -depth);
      // size is expressed as a fraction of screen height
      const world = ghost.size * 2 * halfH;
      sprite.scale.set(world, world, 1);
      const mat = sprite.material as THREE.SpriteMaterial;
      mat.opacity = intensity * visibility * ghost.alpha;
    });
  });

  return (
    <group ref={groupRef}>
      {ghosts.map((ghost, i) => (
        <sprite key={i} ref={el => { spriteRefs.current[i] = el; }}>
          <spriteMaterial
            map={ghost.tex === 'main' ? flareMain : flareGhost}
            color={ghost.color}
            transparent
            opacity={0}
            depthWrite={false}
            depthTest={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </sprite>
      ))}
    </group>
  );
}

/* ===============================================================
   CELESTIAL SUN — off-camera bright pass that drives the
   FakeLensflare. The light arcs through the upper hemisphere
   every 20-38 s; lights the gem from one side AND triggers
   the chromatic ghost chain when it enters the frame.
   =============================================================== */
function CelestialSun() {
  const lightRef = useRef<THREE.PointLight>(null);

  // Defaults are deterministic so render stays pure. A mount-only useEffect
  // below jitters the initial `timer` so the first pass doesn't land on the
  // same beat every reload.
  const state = useRef<{
    active: boolean;
    progress: number;
    timer: number;
    duration: number;
    start: THREE.Vector3;
    end: THREE.Vector3;
  } | null>(null);
  if (state.current == null) {
    state.current = {
      active: false,
      progress: 0,
      timer: 5,
      duration: 8,
      start: new THREE.Vector3(),
      end: new THREE.Vector3(),
    };
  }

  useEffect(() => {
    if (state.current) state.current.timer = 5 + Math.random() * 8; // first pass ~ 5-13 s in
  }, []);

  useFrame((_, delta) => {
    const s = state.current;
    if (!s) return;
    if (s.active) {
      s.progress += delta / s.duration;
      if (s.progress >= 1) {
        s.active = false;
        if (lightRef.current) lightRef.current.intensity = 0;
      } else if (lightRef.current) {
        lightRef.current.position.lerpVectors(s.start, s.end, s.progress);
        // Bell-curve intensity so the flare fades in/out smoothly
        lightRef.current.intensity = Math.sin(s.progress * Math.PI) * 110;
      }
    } else {
      s.timer -= delta;
      if (s.timer <= 0) {
        s.active = true;
        s.progress = 0;
        s.duration = 7 + Math.random() * 6;
        // Arc through the upper hemisphere — radius 14-22 from gem,
        // y between 4-9. Skips around in azimuth so each pass is fresh.
        const r1 = 14 + Math.random() * 8;
        const r2 = 14 + Math.random() * 8;
        const a1 = Math.random() * Math.PI * 2;
        const dir = Math.random() < 0.5 ? -1 : 1;
        const span = Math.PI * (0.5 + Math.random() * 0.6);
        const a2 = a1 + dir * span;
        s.start.set(Math.cos(a1) * r1, 4 + Math.random() * 5, Math.sin(a1) * r1);
        s.end.set(Math.cos(a2) * r2, 4 + Math.random() * 5, Math.sin(a2) * r2);
        s.timer = 20 + Math.random() * 18; // next pass in 20-38 s
      }
    }
  });

  return (
    <>
      <pointLight ref={lightRef} color="#fff5e0" intensity={0} distance={140} decay={1.2} />
      <FakeLensflare sunRef={lightRef} />
    </>
  );
}

/* ===============================================================
   GEM RIM LIGHT — the off-camera lightsource the user feels on
   the gem's surface. Closer than the sun, no visible body, no
   lens flare. Just a roving point light that rakes the mineral
   from a different direction every 12-26 s.
   =============================================================== */
function GemRimLight() {
  const lightRef = useRef<THREE.PointLight>(null);

  // Cool palette — picked to read clearly against the dark gem
  const palette = useMemo(() => [
    new THREE.Color('#ffd9a0'), // warm amber
    new THREE.Color('#c9e0ff'), // cool ivory
    new THREE.Color('#b8ffd4'), // pale emerald
    new THREE.Color('#ffe1c4'), // candle
    new THREE.Color('#a0c4ff'), // moonlight
  ], []);

  const state = useRef<{
    active: boolean;
    progress: number;
    timer: number;
    duration: number;
    start: THREE.Vector3;
    end: THREE.Vector3;
    color: THREE.Color;
  } | null>(null);
  if (state.current == null) {
    state.current = {
      active: false,
      progress: 0,
      timer: 3,
      duration: 2.5,
      start: new THREE.Vector3(),
      end: new THREE.Vector3(),
      color: new THREE.Color(),
    };
  }

  useEffect(() => {
    if (state.current) state.current.timer = 3 + Math.random() * 4;
  }, []);

  useFrame((_, delta) => {
    const s = state.current;
    if (!s) return;
    if (s.active) {
      s.progress += delta / s.duration;
      if (s.progress >= 1) {
        s.active = false;
        if (lightRef.current) lightRef.current.intensity = 0;
      } else if (lightRef.current) {
        lightRef.current.position.lerpVectors(s.start, s.end, s.progress);
        lightRef.current.intensity = Math.sin(s.progress * Math.PI) * 140;
        lightRef.current.color.copy(s.color);
      }
    } else {
      s.timer -= delta;
      if (s.timer <= 0) {
        s.active = true;
        s.progress = 0;
        s.duration = 2 + Math.random() * 2.5;
        // Closer in than the sun — radius 6-8 — for stronger rim contrast
        const r = 6 + Math.random() * 2;
        const a1 = Math.random() * Math.PI * 2;
        const dir = Math.random() < 0.5 ? -1 : 1;
        const span = Math.PI * (0.35 + Math.random() * 0.35);
        const a2 = a1 + dir * span;
        s.start.set(Math.cos(a1) * r, 1 + Math.random() * 4, Math.sin(a1) * r);
        s.end.set(Math.cos(a2) * r, 1 + Math.random() * 4, Math.sin(a2) * r);
        s.color.copy(palette[Math.floor(Math.random() * palette.length)]);
        s.timer = 12 + Math.random() * 14; // next sweep in 12-26 s
      }
    }
  });

  return <pointLight ref={lightRef} color="#ffffff" intensity={0} distance={22} decay={1.4} />;
}

/* ===============================================================
   Atmosphere — orchestrator
   =============================================================== */
export default function Atmosphere() {
  const { scene } = useThree();
  const lightningLight = useRef<THREE.PointLight>(null);
  const lightningDir = useRef<THREE.DirectionalLight>(null);

  const [phenomena, setPhenomena] = useState<Phenomenon[]>([]);

  // Defaults are deterministic so render stays pure (react-hooks/purity).
  // A mount-only useEffect below seeds the randomized timers and the
  // `lastActiveAt` baseline via `performance.now()`.
  const state = useRef<{
    lightningTimer: number;
    lightningFlashCount: number;
    phenomenaTimer: number;
    cryptkeeperCooldown: number;
    lastActiveAt: number;
    idleApparitionFired: boolean;
  } | null>(null);
  if (state.current == null) {
    state.current = {
      lightningTimer: 14,
      lightningFlashCount: 0,
      phenomenaTimer: 4,
      cryptkeeperCooldown: 90,
      lastActiveAt: 0,
      idleApparitionFired: false,
    };
  }

  useEffect(() => {
    const s = state.current;
    if (!s) return;
    s.lightningTimer = 12 + Math.random() * 18;
    s.phenomenaTimer = 4 + Math.random() * 6;
    s.cryptkeeperCooldown = 60 + Math.random() * 60;
    s.lastActiveAt = performance.now() / 1000;
  }, []);

  // Idle detection — refreshes on any pointer / keyboard event.
  useEffect(() => {
    const refresh = () => {
      const s = state.current;
      if (!s) return;
      s.lastActiveAt = performance.now() / 1000;
      s.idleApparitionFired = false;
    };
    window.addEventListener('mousemove', refresh, { passive: true });
    window.addEventListener('pointerdown', refresh, { passive: true });
    window.addEventListener('keydown', refresh);
    window.addEventListener('wheel', refresh, { passive: true });
    return () => {
      window.removeEventListener('mousemove', refresh);
      window.removeEventListener('pointerdown', refresh);
      window.removeEventListener('keydown', refresh);
      window.removeEventListener('wheel', refresh);
    };
  }, []);

  function rollType(): PhenomenonType {
    const cooldown = state.current?.cryptkeeperCooldown ?? 0;
    const wheel: Array<[PhenomenonType, number]> = [
      ['pilgrim', 32],
      ['scorpion', 18],
      ['lantern', 16],
      ['watcher', 16],
      ['whisper', 18],
      ['cryptkeeper', cooldown <= 0 ? 4 : 0],
    ];
    const total = wheel.reduce((s, [, w]) => s + w, 0);
    let r = Math.random() * total;
    for (const [t, w] of wheel) if ((r -= w) < 0) return t;
    return 'pilgrim';
  }

  function makeSpawnFor(type: PhenomenonType) {
    let startX, startY, startZ, endX, endY, endZ, duration;
    const sideSign = Math.random() < 0.5 ? -1 : 1;

    switch (type) {
      case 'aero':
        // At fov 45 with camera at [6,5,8], anything above world-y≈2
        // at z≈-12 projects above the viewport top edge. We pin
        // y ∈ [0.4, 1.4] and push z back to -12…-16 so the airship
        // reads as a distant miniature and the sprite quad has clear
        // padding around it within the camera frustum.
        startX = sideSign * (14 + Math.random() * 3);
        startY = 0.4 + Math.random() * 1.0;
        startZ = -12 - Math.random() * 4;
        endX = -sideSign * (12 + Math.random() * 3);
        endY = startY + (Math.random() - 0.5) * 0.6;
        endZ = startZ + (Math.random() - 0.5) * 2;
        duration = 10 + Math.random() * 4;
        break;
      case 'scorpion':
        startX = sideSign * (11 + Math.random() * 3);
        startY = -2 + Math.random() * 2;
        startZ = -3 - Math.random() * 2;
        endX = -sideSign * (10 + Math.random() * 3);
        endY = startY + (Math.random() - 0.5) * 0.5;
        endZ = startZ + (Math.random() - 0.5) * 1.2;
        duration = 3.0 + Math.random() * 2.0;
        break;
      case 'lantern':
        startX = (Math.random() - 0.5) * 12;
        startY = -2 + Math.random() * 3;
        startZ = -4 - Math.random() * 3;
        endX = startX + (Math.random() - 0.5) * 3;
        endY = startY + 3 + Math.random() * 3;
        endZ = startZ + (Math.random() - 0.5) * 1.5;
        duration = 6 + Math.random() * 3;
        break;
      case 'watcher':
        startX = sideSign * (8 + Math.random() * 3);
        startY = 0 + Math.random() * 3;
        startZ = -4 - Math.random() * 2;
        endX = -sideSign * (6 + Math.random() * 3);
        endY = startY + (Math.random() - 0.5) * 1.5;
        endZ = startZ + (Math.random() - 0.5) * 1;
        duration = 5 + Math.random() * 2;
        break;
      case 'whisper':
        startX = sideSign * (10 + Math.random() * 3);
        startY = -1 + Math.random() * 5;
        startZ = -3 - Math.random() * 3;
        endX = -sideSign * (8 + Math.random() * 3);
        endY = startY + (Math.random() - 0.5) * 3;
        endZ = startZ + (Math.random() - 0.5) * 1.5;
        duration = 3.5 + Math.random() * 1.5;
        break;
      case 'cryptkeeper':
        startX = sideSign * (12 + Math.random() * 2);
        startY = -1 + Math.random() * 1.5;
        startZ = -4 - Math.random() * 1.5;
        endX = -sideSign * (11 + Math.random() * 2);
        endY = startY + (Math.random() - 0.5) * 0.3;
        endZ = startZ;
        duration = 9 + Math.random() * 3;
        break;
      case 'pilgrim':
      default:
        startX = sideSign * (9 + Math.random() * 3);
        startY = -1 + Math.random() * 5;
        startZ = -3 - Math.random() * 4;
        endX = -sideSign * (8 + Math.random() * 3);
        endY = startY + (Math.random() - 0.5) * 4;
        endZ = startZ + (Math.random() - 0.5) * 2;
        duration = 1.4 + Math.random() * 0.8;
        break;
    }

    return {
      start: new THREE.Vector3(startX, startY, startZ),
      end: new THREE.Vector3(endX, endY, endZ),
      duration,
    };
  }

  useFrame((_, delta) => {
    const s = state.current;
    if (!s) return;

    /* LIGHTNING — fog pump + point burst + directional flash from
       above. The directional gives the gem a clean white rake so
       it's unmistakable when a strike happens. */
    s.lightningTimer -= delta;
    if (s.lightningTimer <= 0) {
      s.lightningFlashCount = 5 + Math.random() * 5;
      // 18-32 s between storms
      s.lightningTimer = 18 + Math.random() * 14;
    }
    if (s.lightningFlashCount > 0) {
      const strike = Math.random() > 0.35;
      if (lightningLight.current) {
        lightningLight.current.intensity = strike ? (1200 + Math.random() * 1400) : 0;
        lightningLight.current.position.set((Math.random() - 0.5) * 50, 20 + Math.random() * 20, (Math.random() - 0.5) * 50 - 10);
      }
      if (lightningDir.current) {
        lightningDir.current.intensity = strike ? (8 + Math.random() * 6) : 0;
        lightningDir.current.position.set((Math.random() - 0.5) * 6, 28 + Math.random() * 6, (Math.random() - 0.5) * 6);
      }
      if (scene.fog && 'color' in scene.fog) {
        // Reuse the cached scratch colour to avoid GC churn each frame
        scratchColor.set(strike ? '#ffffff' : '#0d0d1a');
        (scene.fog as THREE.Fog).color.lerp(scratchColor, 0.7);
      }
      s.lightningFlashCount -= delta * 12;
      if (s.lightningFlashCount <= 0) {
        if (lightningLight.current) lightningLight.current.intensity = 0;
        if (lightningDir.current) lightningDir.current.intensity = 0;
        if (scene.fog && 'color' in scene.fog) (scene.fog as THREE.Fog).color.set('#0d0d1a');
      }
    }

    /* PHENOMENA SPAWN DISPATCHER — at most one at a time, with a
       long wait between. Pure anticipation. */
    s.cryptkeeperCooldown -= delta;
    s.phenomenaTimer -= delta;
    if (s.phenomenaTimer <= 0) {
      if (phenomena.length < 1) {
        const type = rollType();
        const { start, end, duration } = makeSpawnFor(type);
        const newP: Phenomenon = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          type, start, end, duration,
          seed: Math.floor(Math.random() * 1024),
        };
        setPhenomena(prev => [...prev, newP]);
        if (type === 'cryptkeeper') {
          s.cryptkeeperCooldown = 120 + Math.random() * 90;
        }
      }
      // 10-25 s between spawns
      s.phenomenaTimer = 10 + Math.random() * 15;
    }

    /* IDLE APPARITION — extends the idle threshold a touch since
       phenomena are now rarer overall. */
    const idleSec = (performance.now() / 1000) - s.lastActiveAt;
    if (
      idleSec > 45 &&
      !s.idleApparitionFired &&
      phenomena.length < 1
    ) {
      s.idleApparitionFired = true;
      const type: PhenomenonType = Math.random() < 0.55 ? 'watcher' : 'cryptkeeper';
      const { start, end, duration } = makeSpawnFor(type);
      const idle: Phenomenon = {
        id: `idle-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        type, start, end,
        duration: duration * 1.6,
        seed: Math.floor(Math.random() * 1024),
      };
      setPhenomena(prev => [...prev, idle]);
      s.cryptkeeperCooldown = 180 + Math.random() * 60;
    }
  });

  return (
    <>
      {/* BASE LIGHTING — warm amber key + cool ambient */}
      <directionalLight position={[8, 12, 4]} intensity={0.8} color="#ffd4a0" />
      <ambientLight intensity={0.25} color="#c4923a" />
      <Float speed={0.5} floatIntensity={0.3}>
        <pointLight position={[0, 4, 0]} intensity={0.4} color="#d4a854" distance={20} />
      </Float>

      {/* CELESTIAL SUN — off-camera bright pass with real lens flare.
          Visible artefact when the light enters frame. */}
      <CelestialSun />

      {/* GEM RIM LIGHT — closer roving point light that rakes the
          mineral from a different angle every 12-26 s. No flare. */}
      <GemRimLight />

      {/* LIGHTNING — point burst + directional rake + fog pump.
          Three coordinated channels so the flash is unmistakable. */}
      <pointLight ref={lightningLight} color="#ffffff" intensity={0} distance={250} decay={1} />
      <directionalLight ref={lightningDir} color="#ffffff" intensity={0} position={[2, 30, -4]} />

      <fog attach="fog" args={['#0d0d1a', 15, 60]} />

      <DustParticles count={150} />

      {phenomena.map(p => {
        const remove = () => setPhenomena(curr => curr.filter(x => x.id !== p.id));
        const common = { start: p.start, end: p.end, duration: p.duration, onComplete: remove, seed: p.seed };
        switch (p.type) {
          case 'aero':        return <PhenomenonAero        key={p.id} {...common} />;
          case 'pilgrim':     return <PhenomenonPilgrim     key={p.id} {...common} />;
          case 'lantern':     return <PhenomenonLantern     key={p.id} {...common} />;
          case 'watcher':     return <PhenomenonWatcher     key={p.id} {...common} />;
          case 'whisper':     return <PhenomenonWhisper     key={p.id} {...common} />;
          case 'scorpion':    return <PhenomenonScorpion    key={p.id} {...common} />;
          case 'cryptkeeper': return <PhenomenonCryptkeeper key={p.id} {...common} />;
          default: return null;
        }
      })}
    </>
  );
}
