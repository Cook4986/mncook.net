/* =========================================================
   sigils.ts — Procedural textures for the bestiary and the
   atmospheric phenomena (flare, halos).

   Every texture is composited in multiple passes:

     1. ATMOSPHERIC HALO  — large soft radial gradient
     2. GHOST PASS        — blurred copy of the silhouette
     3. SHARP SILHOUETTE  — slightly blurred so edges stay soft
     4. BRIGHT ACCENTS    — small high-luminance details
                            (Bloom picks these up as actual light)

   Aesthetic: ivory / white / void only. No coloured halos
   except the Watcher's faint emerald iris and the Cryptkeeper's
   emerald cuffs — the only points of saturated colour in the
   composition.
   ========================================================= */

import * as THREE from 'three';

type Painter = (ctx: CanvasRenderingContext2D, w: number, h: number) => void;

function makeTexture(width: number, height: number, painter: Painter): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('sigils.ts: 2D context unavailable');
  painter(ctx, width, height);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.needsUpdate = true;
  return tex;
}

/* ----- shared helpers ----- */

function softRadial(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, inner: string, outer: string) {
  const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  g.addColorStop(0, inner);
  g.addColorStop(0.5, outer);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

function withBlur(ctx: CanvasRenderingContext2D, px: number, draw: () => void) {
  ctx.save();
  ctx.filter = `blur(${px}px)`;
  draw();
  ctx.restore();
}

/* =========================================================
   EYE — Watcher (iris layer + separate pupil sprite).
   Emerald iris kept as the only saturated colour anywhere
   in the scene (apart from Cryptkeeper cuffs).
   ========================================================= */
function paintEyeIris(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);

  // 1. Atmospheric emerald halo
  softRadial(ctx, w / 2, h / 2, w * 0.60,
    'rgba(60, 180, 120, 0.30)',
    'rgba(50, 150, 100, 0.08)');

  // 2. Ghost almond
  withBlur(ctx, 8, () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.beginPath();
    ctx.moveTo(w * 0.04, h * 0.5);
    ctx.quadraticCurveTo(w / 2, h * 0.04, w * 0.96, h * 0.5);
    ctx.quadraticCurveTo(w / 2, h * 0.96, w * 0.04, h * 0.5);
    ctx.closePath();
    ctx.fill();
  });

  // 3. Sharp almond shell
  withBlur(ctx, 1.5, () => {
    ctx.fillStyle = '#03030a';
    ctx.strokeStyle = '#4ab084';
    ctx.lineWidth = 2.2;
    ctx.beginPath();
    ctx.moveTo(w * 0.06, h * 0.5);
    ctx.quadraticCurveTo(w / 2, h * 0.06, w * 0.94, h * 0.5);
    ctx.quadraticCurveTo(w / 2, h * 0.94, w * 0.06, h * 0.5);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  });

  // 4. Iris — emerald engraved
  const iris = ctx.createRadialGradient(w / 2, h / 2, h * 0.05, w / 2, h / 2, h * 0.25);
  iris.addColorStop(0, '#5cd6a5');
  iris.addColorStop(0.45, '#1f5a3a');
  iris.addColorStop(1, '#06160c');
  ctx.fillStyle = iris;
  ctx.beginPath();
  ctx.arc(w / 2, h / 2, h * 0.22, 0, Math.PI * 2);
  ctx.fill();

  // Iris striations
  ctx.strokeStyle = 'rgba(180, 240, 200, 0.35)';
  ctx.lineWidth = 0.8;
  for (let i = 0; i < 24; i++) {
    const a = (i / 24) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 + Math.cos(a) * h * 0.085, h / 2 + Math.sin(a) * h * 0.085);
    ctx.lineTo(w / 2 + Math.cos(a) * h * 0.21, h / 2 + Math.sin(a) * h * 0.21);
    ctx.stroke();
  }

  // Catchlight
  ctx.fillStyle = 'rgba(220, 255, 235, 0.9)';
  ctx.beginPath();
  ctx.arc(w * 0.57, h * 0.43, h * 0.035, 0, Math.PI * 2);
  ctx.fill();
}

function paintPupil(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  withBlur(ctx, 3, () => {
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.ellipse(w / 2, h / 2, w * 0.18, h * 0.42, 0, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.ellipse(w / 2, h / 2, w * 0.10, h * 0.36, 0, 0, Math.PI * 2);
  ctx.fill();
}

/* =========================================================
   SCORPION
   ========================================================= */
function paintScorpion(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);

  softRadial(ctx, w * 0.42, h * 0.78, w * 0.40,
    'rgba(20, 10, 30, 0.30)',
    'rgba(10, 5, 20, 0.08)');

  withBlur(ctx, 5, () => {
    ctx.fillStyle = 'rgba(10, 10, 20, 0.8)';
    ctx.beginPath();
    ctx.ellipse(w * 0.42, h * 0.58, w * 0.14, h * 0.20, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  withBlur(ctx, 0.8, () => {
    ctx.fillStyle = '#08080f';
    ctx.strokeStyle = '#08080f';
    ctx.lineCap = 'round';

    const cx = w * 0.42;
    const cy = h * 0.58;

    ctx.beginPath();
    ctx.ellipse(cx, cy - h * 0.05, w * 0.07, h * 0.09, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(cx, cy + h * 0.05, w * 0.10, h * 0.14, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = h * 0.04;
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.05, cy - h * 0.1);
    ctx.lineTo(cx - w * 0.22, cy - h * 0.18);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(cx + w * 0.05, cy - h * 0.1);
    ctx.lineTo(cx + w * 0.22, cy - h * 0.18);
    ctx.stroke();
    ctx.lineWidth = h * 0.02;
    ctx.beginPath();
    ctx.arc(cx - w * 0.22, cy - h * 0.20, h * 0.05, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + w * 0.22, cy - h * 0.20, h * 0.05, 0, Math.PI * 2);
    ctx.fill();

    ctx.lineWidth = h * 0.018;
    for (let i = 0; i < 4; i++) {
      const offY = (i - 1.5) * h * 0.05;
      ctx.beginPath();
      ctx.moveTo(cx - w * 0.07, cy + offY);
      ctx.lineTo(cx - w * 0.20, cy + offY + h * 0.07);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + w * 0.07, cy + offY);
      ctx.lineTo(cx + w * 0.20, cy + offY + h * 0.07);
      ctx.stroke();
    }

    ctx.lineWidth = h * 0.04;
    ctx.beginPath();
    ctx.moveTo(cx, cy + h * 0.18);
    ctx.bezierCurveTo(cx + w * 0.30, cy + h * 0.18, cx + w * 0.44, cy - h * 0.14, cx + w * 0.34, cy - h * 0.34);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(cx + w * 0.34, cy - h * 0.34, h * 0.028, 0, Math.PI * 2);
    ctx.fill();
    ctx.lineWidth = h * 0.018;
    ctx.beginPath();
    ctx.moveTo(cx + w * 0.34, cy - h * 0.36);
    ctx.lineTo(cx + w * 0.30, cy - h * 0.44);
    ctx.stroke();
  });

  // Stinger glint
  ctx.fillStyle = '#3a8a6a';
  ctx.beginPath();
  ctx.arc(w * 0.76, h * 0.24, h * 0.012, 0, Math.PI * 2);
  ctx.fill();
}

/* =========================================================
   GENERIC HALO — radial gradient, additive
   ========================================================= */
function paintHalo(rIn: string, rOut: string): Painter {
  return (ctx, w, h) => {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.5);
    g.addColorStop(0, rIn);
    g.addColorStop(0.4, rOut);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  };
}

/* =========================================================
   LENS-FLARE TEXTURES — fed into THREE.Lensflare.
   `flareMain`  — central white-hot disc with chromatic rim
   `flareGhost` — soft hollow disc used for the chromatic
                  ghost elements along the lens axis
   ========================================================= */
function paintFlareMain(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  // Outermost chromatic ring (faint cool wash → warm centre)
  const halo = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.5);
  halo.addColorStop(0,    'rgba(255, 255, 255, 1.00)');
  halo.addColorStop(0.10, 'rgba(255, 250, 230, 0.85)');
  halo.addColorStop(0.30, 'rgba(220, 230, 255, 0.40)');
  halo.addColorStop(0.55, 'rgba(180, 200, 240, 0.12)');
  halo.addColorStop(1,    'rgba(0, 0, 0, 0)');
  ctx.fillStyle = halo;
  ctx.fillRect(0, 0, w, h);

  // Tiny white-hot core for Bloom to feast on
  const core = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.08);
  core.addColorStop(0, 'rgba(255, 255, 255, 1)');
  core.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = core;
  ctx.fillRect(0, 0, w, h);
}

function paintFlareGhost(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  // Hollow disc — peak alpha around 0.55r so each ghost reads as a ring
  const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.5);
  g.addColorStop(0,    'rgba(255, 255, 255, 0)');
  g.addColorStop(0.40, 'rgba(255, 255, 255, 0.35)');
  g.addColorStop(0.60, 'rgba(255, 255, 255, 0.55)');
  g.addColorStop(0.75, 'rgba(255, 255, 255, 0.20)');
  g.addColorStop(1,    'rgba(255, 255, 255, 0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

/* =========================================================
   Cache
   ========================================================= */
let cache: {
  eye: THREE.CanvasTexture;
  pupil: THREE.CanvasTexture;
  scorpion: THREE.CanvasTexture;
  haloWarm: THREE.CanvasTexture;
  haloEmerald: THREE.CanvasTexture;
  haloIvory: THREE.CanvasTexture;
  flareMain: THREE.CanvasTexture;
  flareGhost: THREE.CanvasTexture;
} | null = null;

export function getSigilTextures() {
  if (cache) return cache;
  cache = {
    eye: makeTexture(512, 512, paintEyeIris),
    pupil: makeTexture(128, 256, paintPupil),
    scorpion: makeTexture(512, 512, paintScorpion),
    haloWarm: makeTexture(256, 256, paintHalo('rgba(255, 190, 120, 0.7)', 'rgba(255, 140, 70, 0.15)')),
    haloEmerald: makeTexture(256, 256, paintHalo('rgba(80, 240, 170, 0.5)', 'rgba(40, 180, 130, 0.10)')),
    haloIvory: makeTexture(256, 256, paintHalo('rgba(255, 240, 210, 0.7)', 'rgba(255, 220, 170, 0.12)')),
    flareMain: makeTexture(512, 512, paintFlareMain),
    flareGhost: makeTexture(256, 256, paintFlareGhost),
  };
  return cache;
}
