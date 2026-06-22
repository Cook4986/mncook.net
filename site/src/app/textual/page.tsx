import type { Metadata } from 'next';
import SiteNav from '@/components/ui/SiteNav';
import Footer from '@/components/ui/Footer';
import { publications, fiction } from '@/content/data';

export const metadata: Metadata = {
  title: 'Textual — matt cook',
  description: 'Scholarship in book history, digital humanities, and manuscript studies. Short fiction and creative writing.',
};

export default function TextualPage() {
  return (
    <div className="section-warm">
      <SiteNav variant="warm" />

      <main id="main-content" className="content-section" style={{ paddingTop: '120px' }}>
        {/* Scholarship Section */}
        <div className="section-header">
          <div className="section-label">Scholarship</div>
          <h1 className="section-title">Publications</h1>
          <p className="section-desc">
            Scholarship in book history, digital humanities, and manuscript studies.
          </p>
        </div>

        <div className="pub-list">
          {publications.map((pub) => (
            <div key={pub.url} className="pub-card">
              <div className="pub-title">{pub.title}</div>
              <div className="pub-venue">{pub.venue} ({pub.year})</div>
              <a href={pub.url} target="_blank" rel="noopener noreferrer" className="pub-link">
                DOI →
              </a>
            </div>
          ))}
        </div>

        {/* Fiction Section */}
        <div className="section-header" style={{ marginTop: '80px' }}>
          <div className="section-label">Creative Writing</div>
          <h2 className="section-title">Short Fiction</h2>
          <p className="section-desc">
            Selected short stories (PDF).
          </p>
        </div>

        <div className="pub-list">
          {fiction.filter(f => f.category === 'short').map((f) => (
            <div key={f.title} className="pub-card">
              <div className="pub-title">{f.title}</div>
              <div className="pub-venue">{f.description}</div>
              {f.pdfUrl && (
                <a href={f.pdfUrl} target="_blank" rel="noopener noreferrer" className="pub-link">
                  Read PDF →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Novel Section */}
        <div className="section-header" style={{ marginTop: '80px' }}>
          <div className="section-label">Creative Writing</div>
          <h2 className="section-title">Novel</h2>
          <p className="section-desc">
            A novel in parts (PDF).
          </p>
        </div>

        <div className="pub-list">
          {fiction.filter(f => f.category === 'novel').map((f) => (
            <div key={f.title} className="pub-card">
              <div className="pub-title">{f.title}</div>
              <div className="pub-venue">{f.description}</div>
              {f.pdfUrl && (
                <a href={f.pdfUrl} target="_blank" rel="noopener noreferrer" className="pub-link">
                  Read PDF →
                </a>
              )}
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
