'use client';

import dynamic from 'next/dynamic';
import SiteNav from '@/components/ui/SiteNav';

/* =========================================================
   Homepage — Dark terrain hero → Warm content pillars

   The hero section renders a full-screen 3D terrain mesh
   with interactive content pins. Below the fold, four theme
   cards link to the content sections in the warm palette.
   ========================================================= */

// Dynamic import to avoid SSR issues with Three.js
const TerrainScene = dynamic(
  () => import('@/components/canvas/TerrainScene'),
  { ssr: false }
);

export default function HomePage() {
  return (
    <div className="section-dark viewport-dvh" style={{ width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <SiteNav variant="dark" />

      <section className="hero" id="hero" style={{ position: 'relative' }}>
        <div className="hero-canvas" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <TerrainScene />
        </div>
      </section>
    </div>
  );
}
