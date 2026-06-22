'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import SiteNav from '@/components/ui/SiteNav';
import { SECTION_LINKS } from '@/content/sections';

/* =========================================================
   Homepage — full-screen 3D terrain hero.

   The hero is intentionally a single interactive WebGL scene.
   A screen-reader / keyboard-reachable section nav and a
   <noscript> fallback sit alongside it so the site is never a
   dead end without JS, WebGL, or a pointing device.
   ========================================================= */

// Dynamic import to avoid SSR issues with Three.js
const TerrainScene = dynamic(
  () => import('@/components/canvas/TerrainScene'),
  {
    ssr: false,
    loading: () => (
      <div
        aria-hidden
        style={{ position: 'absolute', inset: 0, background: '#0d0d1a' }}
      />
    ),
  }
);

export default function HomePage() {
  return (
    <div className="section-dark viewport-dvh" style={{ width: '100vw', overflow: 'hidden', position: 'relative' }}>
      <SiteNav variant="dark" />

      <h1 className="sr-only">matt cook — spatial computing, digital humanities, and creative practice</h1>

      <main id="main-content" className="hero" style={{ position: 'relative' }}>
        <div className="hero-canvas" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
          <TerrainScene />
        </div>

        {/* Keyboard / screen-reader path to every section without the 3D
            pins. Visually hidden so the hero stays a clean single scene. */}
        <nav className="sr-only" aria-label="Site sections">
          <ul>
            {SECTION_LINKS.map((s) => (
              <li key={s.href}>
                <Link href={s.href}>{s.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Visible fallback when JavaScript (and thus the WebGL scene) is
            unavailable. */}
        <noscript>
          <nav className="home-sections" aria-label="Site sections">
            {SECTION_LINKS.map((s) => (
              <Link key={s.href} href={s.href}>{s.label}</Link>
            ))}
          </nav>
        </noscript>
      </main>
    </div>
  );
}
