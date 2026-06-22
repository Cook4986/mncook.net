import type { Metadata } from 'next';
import SiteNav from '@/components/ui/SiteNav';
import Footer from '@/components/ui/Footer';
import { TechnicalContent } from '@/content/OverlayContent';

export const metadata: Metadata = {
  title: 'Technical — matt cook',
  description:
    'High-performance full-stack architectures, WebGL graphics, and edge-AI applications bridging physical environments and spatial data.',
  alternates: { canonical: '/technical' },
};

export default function TechnicalPage() {
  return (
    <div className="section-dark">
      <SiteNav variant="dark" />

      <main id="main-content" className="content-section" style={{ paddingTop: '120px' }}>
        <div className="section-header" style={{ borderBottomColor: 'var(--rule-dark)' }}>
          <div className="section-label">Engineering</div>
          <h1 className="section-title">Technical</h1>
          <p className="section-desc" style={{ color: 'var(--ivory-dim)' }}>
            Selected software: WebGL graphics, edge AI, and full-stack pipelines.
          </p>
        </div>

        <TechnicalContent />
      </main>

      <Footer variant="dark" />
    </div>
  );
}
