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
   AERO — phantom NYMZA airship.
   Reimagined as a fine pen-and-ink etching on void:
     no blue cast, no opaque body, just thin ivory linework
     wrapped in a single delicate haze. Mostly outlines so the
     site background reads THROUGH the sprite.
   ========================================================= */
function paintAero(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);

  // 1. Atmospheric haze — very wide, very subtle ivory wash
  softRadial(ctx, w / 2, h * 0.45, w * 0.62,
    'rgba(255, 250, 235, 0.09)',
    'rgba(255, 245, 220, 0.02)');

  // 2. Ghost envelope — heavy blur so the wisp dissolves into void
  withBlur(ctx, 12, () => {
    ctx.fillStyle = 'rgba(245, 240, 220, 0.18)';
    ctx.beginPath();
    ctx.ellipse(w / 2, h * 0.40, w * 0.38, h * 0.16, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  // 3. Linework — ivory strokes on void, NO opaque fill anywhere
  withBlur(ctx, 0.6, () => {
    ctx.strokeStyle = 'rgba(245, 243, 234, 0.70)';
    ctx.lineWidth = 1.8;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Main envelope outline (elongated oval, asymmetric → suggests motion)
    ctx.beginPath();
    ctx.ellipse(w / 2, h * 0.40, w * 0.40, h * 0.17, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Inner secondary outline (suggests double-skin construction)
    ctx.strokeStyle = 'rgba(245, 243, 234, 0.32)';
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.ellipse(w / 2, h * 0.40, w * 0.36, h * 0.14, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Longitudinal rib
    ctx.strokeStyle = 'rgba(245, 243, 234, 0.50)';
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(w * 0.10, h * 0.40);
    ctx.lineTo(w * 0.90, h * 0.40);
    ctx.stroke();

    // Cross ribs every 1/8th — fine ivory ticks
    ctx.strokeStyle = 'rgba(245, 243, 234, 0.32)';
    ctx.lineWidth = 0.6;
    for (let i = 1; i < 8; i++) {
      const tx = w * (0.10 + 0.80 * (i / 8));
      const halfH = h * 0.17 * Math.sin(Math.PI * (i / 8));
      ctx.beginPath();
      ctx.moveTo(tx, h * 0.40 - halfH);
      ctx.lineTo(tx, h * 0.40 + halfH);
      ctx.stroke();
    }

    // Rear fins (cruciform stabilizers) — characteristic of dirigibles
    ctx.strokeStyle = 'rgba(245, 243, 234, 0.55)';
    ctx.lineWidth = 1.4;
    // Vertical
    ctx.beginPath();
    ctx.moveTo(w * 0.92, h * 0.30);
    ctx.lineTo(w * 0.99, h * 0.40);
    ctx.lineTo(w * 0.92, h * 0.50);
    ctx.stroke();
    // Horizontal
    ctx.beginPath();
    ctx.moveTo(w * 0.92, h * 0.34);
    ctx.lineTo(w * 0.96, h * 0.40);
    ctx.lineTo(w * 0.92, h * 0.46);
    ctx.stroke();

    // Rigging — fine threads from envelope to gondola
    ctx.strokeStyle = 'rgba(245, 243, 234, 0.30)';
    ctx.lineWidth = 0.5;
    for (let i = 0; i < 9; i++) {
      const t = i / 8;
      const xTop = w * (0.20 + 0.60 * t);
      const yTop = h * 0.40 + h * 0.17 * Math.sin(Math.PI * t);
      const xBot = w * (0.42 + 0.16 * t);
      ctx.beginPath();
      ctx.moveTo(xTop, yTop);
      ctx.lineTo(xBot, h * 0.58);
      ctx.stroke();
    }

    // Gondola — fine outline only
    ctx.strokeStyle = 'rgba(245, 243, 234, 0.70)';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(w * 0.42, h * 0.58, w * 0.16, h * 0.06);
    // Horizontal divider
    ctx.strokeStyle = 'rgba(245, 243, 234, 0.40)';
    ctx.lineWidth = 0.6;
    ctx.beginPath();
    ctx.moveTo(w * 0.42, h * 0.61);
    ctx.lineTo(w * 0.58, h * 0.61);
    ctx.stroke();

    // Rope ladder — faint vertical pair with rungs
    ctx.strokeStyle = 'rgba(245, 243, 234, 0.20)';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(w * 0.487, h * 0.64);
    ctx.lineTo(w * 0.484, h * 0.92);
    ctx.moveTo(w * 0.513, h * 0.64);
    ctx.lineTo(w * 0.516, h * 0.92);
    ctx.stroke();
    for (let i = 0; i < 9; i++) {
      const y = h * 0.66 + (i * h * 0.26) / 9;
      ctx.beginPath();
      ctx.moveTo(w * 0.486, y);
      ctx.lineTo(w * 0.514, y);
      ctx.stroke();
    }

    // Trailing etheric wisp — three short curved strokes off the bow
    ctx.strokeStyle = 'rgba(245, 243, 234, 0.18)';
    ctx.lineWidth = 0.8;
    for (let i = 0; i < 3; i++) {
      const oy = h * 0.40 + (i - 1) * h * 0.04;
      ctx.beginPath();
      ctx.moveTo(w * 0.08, oy);
      ctx.quadraticCurveTo(w * 0.02, oy + (i - 1) * h * 0.02, w * -0.02, oy);
      ctx.stroke();
    }
  });

  // 4. Bright accents — five tiny lamp points along the gondola
  //    Bloom will turn each into a tiny phosphor glow.
  ctx.fillStyle = '#ffffff';
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.arc(w * (0.435 + i * 0.0325), h * 0.625, h * 0.010, 0, Math.PI * 2);
    ctx.fill();
  }
  // Nose lamp — brightest
  ctx.beginPath();
  ctx.arc(w * 0.082, h * 0.40, h * 0.012, 0, Math.PI * 2);
  ctx.fill();

  // 5. Edge-feather pass — destination-in alpha mask that guarantees
  //    the canvas borders fade to zero alpha. Without this the radial
  //    haze still has residual alpha at the rectangle edges, which
  //    Bloom amplifies into a visible canvas-shaped halo when the
  //    sprite is clipped by the viewport. Feathers ~10% top/bottom,
  //    ~3% left/right so the gondola windows and fins survive.
  ctx.globalCompositeOperation = 'destination-in';
  const vg = ctx.createLinearGradient(0, 0, 0, h);
  vg.addColorStop(0,    'rgba(0,0,0,0)');
  vg.addColorStop(0.10, 'rgba(0,0,0,1)');
  vg.addColorStop(0.94, 'rgba(0,0,0,1)');
  vg.addColorStop(1,    'rgba(0,0,0,0)');
  ctx.fillStyle = vg;
  ctx.fillRect(0, 0, w, h);
  const hg = ctx.createLinearGradient(0, 0, w, 0);
  hg.addColorStop(0,    'rgba(0,0,0,0)');
  hg.addColorStop(0.03, 'rgba(0,0,0,1)');
  hg.addColorStop(0.97, 'rgba(0,0,0,1)');
  hg.addColorStop(1,    'rgba(0,0,0,0)');
  ctx.fillStyle = hg;
  ctx.fillRect(0, 0, w, h);
  ctx.globalCompositeOperation = 'source-over';
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
   CRYPTKEEPER — body + separate cuff sprite (additive)
   ========================================================= */
function paintCryptkeeperBody(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);

  softRadial(ctx, w / 2, h / 2, w * 0.7,
    'rgba(40, 20, 60, 0.20)',
    'rgba(20, 10, 30, 0.05)');

  withBlur(ctx, 14, () => {
    ctx.fillStyle = 'rgba(2, 2, 6, 0.9)';
    ctx.beginPath();
    ctx.moveTo(w * 0.30, h * 0.60);
    ctx.lineTo(w * 0.24, h * 0.98);
    ctx.lineTo(w * 0.76, h * 0.98);
    ctx.lineTo(w * 0.70, h * 0.60);
    ctx.closePath();
    ctx.fill();
  });

  withBlur(ctx, 1.8, () => {
    ctx.fillStyle = '#02020a';

    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.09, w * 0.075, h * 0.055, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillRect(w * 0.47, h * 0.13, w * 0.06, h * 0.04);

    ctx.beginPath();
    ctx.moveTo(w * 0.36, h * 0.17);
    ctx.quadraticCurveTo(w * 0.33, h * 0.40, w * 0.31, h * 0.58);
    ctx.lineTo(w * 0.27, h * 0.94);
    ctx.lineTo(w * 0.42, h * 0.97);
    ctx.lineTo(w * 0.50, h * 0.80);
    ctx.lineTo(w * 0.58, h * 0.97);
    ctx.lineTo(w * 0.73, h * 0.94);
    ctx.lineTo(w * 0.69, h * 0.58);
    ctx.quadraticCurveTo(w * 0.67, h * 0.40, w * 0.64, h * 0.17);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#d8d8de';
    ctx.fillRect(w * 0.485, h * 0.18, w * 0.03, h * 0.40);

    ctx.fillStyle = '#1a1820';
    ctx.beginPath();
    ctx.ellipse(w * 0.5, h * 0.09, w * 0.062, h * 0.045, 0, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#000000';
  ctx.beginPath();
  ctx.arc(w * 0.48, h * 0.085, h * 0.006, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w * 0.52, h * 0.085, h * 0.006, 0, Math.PI * 2);
  ctx.fill();
}

function paintCryptkeeperCuffs(ctx: CanvasRenderingContext2D, w: number, h: number) {
  ctx.clearRect(0, 0, w, h);
  const draw = (cx: number, cy: number) => {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.10);
    g.addColorStop(0, 'rgba(120, 255, 200, 1)');
    g.addColorStop(0.30, 'rgba(80, 200, 150, 0.7)');
    g.addColorStop(1, 'rgba(20, 80, 60, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(cx, cy, w * 0.10, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#e8ffec';
    ctx.beginPath();
    ctx.arc(cx, cy, h * 0.005, 0, Math.PI * 2);
    ctx.fill();
  };
  draw(w * 0.305, h * 0.56);
  draw(w * 0.695, h * 0.56);
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
  aero: THREE.CanvasTexture;
  eye: THREE.CanvasTexture;
  pupil: THREE.CanvasTexture;
  scorpion: THREE.CanvasTexture;
  cryptkeeper: THREE.CanvasTexture;
  cryptkeeperCuffs: THREE.CanvasTexture;
  haloWarm: THREE.CanvasTexture;
  haloEmerald: THREE.CanvasTexture;
  haloIvory: THREE.CanvasTexture;
  flareMain: THREE.CanvasTexture;
  flareGhost: THREE.CanvasTexture;
} | null = null;

export function getSigilTextures() {
  if (cache) return cache;
  cache = {
    aero: makeTexture(768, 384, paintAero),
    eye: makeTexture(512, 512, paintEyeIris),
    pupil: makeTexture(128, 256, paintPupil),
    scorpion: makeTexture(512, 512, paintScorpion),
    cryptkeeper: makeTexture(384, 768, paintCryptkeeperBody),
    cryptkeeperCuffs: makeTexture(384, 768, paintCryptkeeperCuffs),
    haloWarm: makeTexture(256, 256, paintHalo('rgba(255, 190, 120, 0.7)', 'rgba(255, 140, 70, 0.15)')),
    haloEmerald: makeTexture(256, 256, paintHalo('rgba(80, 240, 170, 0.5)', 'rgba(40, 180, 130, 0.10)')),
    haloIvory: makeTexture(256, 256, paintHalo('rgba(255, 240, 210, 0.7)', 'rgba(255, 220, 170, 0.12)')),
    flareMain: makeTexture(512, 512, paintFlareMain),
    flareGhost: makeTexture(256, 256, paintFlareGhost),
  };
  return cache;
}
