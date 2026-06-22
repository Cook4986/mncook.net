import type { Metadata } from 'next';
import SiteNav from '@/components/ui/SiteNav';
import Footer from '@/components/ui/Footer';
import { ContactContent } from '@/content/OverlayContent';

export const metadata: Metadata = {
  title: 'Contact — matt cook',
  description: 'Get in touch with matt cook about collaboration, research, or projects.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="section-dark">
      <SiteNav variant="dark" />

      <main id="main-content" className="content-section" style={{ paddingTop: '120px', minHeight: '70vh' }}>
        <div className="section-header" style={{ borderBottomColor: 'var(--rule-dark)' }}>
          <div className="section-label">Get in touch</div>
          <h1 className="section-title">Contact</h1>
          <p className="section-desc" style={{ color: 'var(--ivory-dim)' }}>
            Working on something spatial, textual, or audiovisual? Send a message.
          </p>
        </div>

        <ContactContent />
      </main>

      <Footer variant="dark" />
    </div>
  );
}
