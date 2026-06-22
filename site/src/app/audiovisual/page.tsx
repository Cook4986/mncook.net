import type { Metadata } from 'next';
import SiteNav from '@/components/ui/SiteNav';
import Footer from '@/components/ui/Footer';
import { bizarreBooks, songs } from '@/content/data';

export const metadata: Metadata = {
  title: 'Audiovisual — matt cook',
  description: 'Experimental music, sound art, compositions, and media projects.',
};

export default function AudiovisualPage() {
  return (
    <div className="section-warm">
      <SiteNav variant="warm" />

      <main id="main-content" className="content-section" style={{ paddingTop: '120px' }}>
        <div className="section-header">
          <div className="section-label">Media</div>
          <h1 className="section-title">Audiovisual</h1>
          <p className="section-desc">
            Experimental music, sound art, and collaborative media.
          </p>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '8px', color: 'var(--ink)' }}>Bizarre Books</h2>
          <p style={{ marginBottom: '24px', color: 'var(--ink-light)', fontStyle: 'italic', maxWidth: '600px' }}>
            Experimental, atmospheric video essays exploring regional New England folklore and historical occult stories.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px', marginBottom: '60px' }}>
            {bizarreBooks.map((episode, i) => (
              <div key={i} style={{ border: '1px solid var(--rule)', borderRadius: '12px', background: '#fff', overflow: 'hidden' }}>
                <div style={{ aspectRatio: '16 / 9', background: '#000' }}>
                  <iframe
                    width="100%"
                    height="100%"
                    loading="lazy"
                    src={`https://www.youtube-nocookie.com/embed/${episode.youtubeId}${episode.start ? `?start=${episode.start}` : ''}`}
                    title={`Bizarre Books: ${episode.title}`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    style={{ display: 'block', border: 'none' }}
                  ></iframe>
                </div>
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontStyle: 'italic', color: 'var(--ink)', marginBottom: '6px' }}>{episode.title}</div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ink-light)', lineHeight: 1.5 }}>{episode.description}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '24px', color: 'var(--ink)' }}>Songs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {songs.map((song) => (
              <div key={song.src} style={{ padding: '24px', border: '1px solid var(--rule)', borderRadius: '12px', background: '#fff' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '16px' }}>{song.title}</div>
                <audio controls preload="none" src={song.src} style={{ width: '100%', height: '40px' }}></audio>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
