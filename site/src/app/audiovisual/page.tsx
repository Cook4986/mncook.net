import type { Metadata } from 'next';
import SiteNav from '@/components/ui/SiteNav';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Audiovisual — M.N. Cook',
  description: 'Experimental music, sound art, compositions, and media projects.',
};

export default function AudiovisualPage() {
  return (
    <div className="section-warm">
      <SiteNav variant="warm" />

      <div className="content-section" style={{ paddingTop: '120px' }}>
        <div className="section-header">
          <div className="section-label">Media</div>
          <h1 className="section-title">Audiovisual</h1>
          <p className="section-desc">
            Experimental music, sound art, and collaborative media.
          </p>
        </div>

        <div style={{ marginTop: '40px' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '24px', color: 'var(--ink)' }}>Bizarre Books</h2>
          <div style={{ marginBottom: '60px' }}>
            <iframe width="100%" height="450" loading="lazy" src="https://www.youtube.com/embed/vmTXjTLKYfs?feature=oembed" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen title="Bizarre Books: Sacrifice in the Stacks" style={{ borderRadius: '12px' }}></iframe>
          </div>

          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', marginBottom: '24px', color: 'var(--ink)' }}>Songs</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {[
              { title: "Red Rock Paranoia", src: "/s/RedRockParanoia2.mp3" },
              { title: "Blue Haze", src: "/s/Blue_Haze_instrumental.mp3" },
              { title: "SVU", src: "/s/svu.mp3" },
              { title: "Balcony Dub", src: "/s/Balcony_Dub.mp3" },
              { title: "Project Bluebird: A Study in Rhythm", src: "/s/project_bluebird.mp3" }
            ].map((song, i) => (
              <div key={i} style={{ padding: '24px', border: '1px solid var(--rule)', borderRadius: '12px', background: '#fff' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', color: 'var(--ink)', marginBottom: '16px' }}>{song.title}</div>
                <audio controls src={song.src} style={{ width: '100%', height: '40px' }}></audio>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
