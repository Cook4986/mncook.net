import type { Metadata } from 'next';
import Link from 'next/link';
import SiteNav from '@/components/ui/SiteNav';
import Footer from '@/components/ui/Footer';
import { SECTION_LINKS } from '@/content/sections';

export const metadata: Metadata = {
  title: 'Not found — matt cook',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="section-warm">
      <SiteNav variant="warm" />

      <main id="main-content" className="content-section" style={{ paddingTop: '160px', minHeight: '70vh' }}>
        <div className="section-header">
          <div className="section-label">404</div>
          <h1 className="section-title">Lost in the stacks</h1>
          <p className="section-desc">
            That page doesn&apos;t exist — or has drifted somewhere else. Find your way back below.
          </p>
        </div>

        <nav aria-label="Site sections" className="pub-list">
          <div className="pub-card">
            <div className="pub-title">Home</div>
            <Link href="/" className="pub-link">Return to the landing scene →</Link>
          </div>
          {SECTION_LINKS.map((s) => (
            <div key={s.href} className="pub-card">
              <div className="pub-title">{s.label}</div>
              <Link href={s.href} className="pub-link">Visit {s.label} →</Link>
            </div>
          ))}
        </nav>
      </main>

      <Footer />
    </div>
  );
}
