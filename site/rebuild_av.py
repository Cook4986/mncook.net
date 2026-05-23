import re

with open("src/content/OverlayContent.tsx", "r") as f:
    content = f.read()

av_start = content.find("export function AudiovisualContent() {")
av_end = content.find("export function ProfessionalContent() {", av_start)

new_av = """export function AudiovisualContent() {
  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>
      
      <CollapsibleSection title="Bizarre Books">
        
        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Apparitions at Harvard</p>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/5JDxyVpmbJA?start=16&feature=oembed" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Magi in Melrose</p>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/O_huh3uV63w?start=13&feature=oembed" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Ipswitches in Essex</p>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/5AWbhtRo9gQ?start=39&feature=oembed" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Devils in Dungeons</p>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ap0ned0I5wk?start=77&feature=oembed" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Masks and Monsters</p>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/c9c04EhvCGg?start=74&feature=oembed" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Wraiths in Wakefield</p>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/Q-iTRcnKOPs?feature=oembed" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Sikhs of the Salish Sea</p>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/O5pukuVXg4M?start=20&feature=oembed" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Firestone Freaks</p>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/ItuugteW4MI?feature=oembed" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Gothic Goblins</p>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/M3gL652N2YI?feature=oembed" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Sacrifice in the Stacks</p>
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/vmTXjTLKYfs?feature=oembed" frameBorder="0" allowFullScreen></iframe>
          </div>
        </div>

      </CollapsibleSection>

      <CollapsibleSection title="Songs">
        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Red Rock Paranoia</p>
          <audio controls style={{ width: '100%' }} src="https://static1.squarespace.com/static/532b70b6e4b0dca092974dbe/t/558dbfd2e4b054c7c0b195e4/1578417980228/RedRockParanoia2.mp3"></audio>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Blue Haze</p>
          <audio controls style={{ width: '100%' }} src="https://static1.squarespace.com/static/532b70b6e4b0dca092974dbe/t/5627fe25e4b052473f499c2d/1578417980234/Blue_Haze_instrumental.mp3"></audio>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>SVU</p>
          <audio controls style={{ width: '100%' }} src="https://static1.squarespace.com/static/532b70b6e4b0dca092974dbe/t/5627ffefe4b0bace718447ae/1578417980241/svu.mp3"></audio>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Balcony Dub</p>
          <audio controls style={{ width: '100%' }} src="https://static1.squarespace.com/static/532b70b6e4b0dca092974dbe/t/562800a4e4b0337fcedb2169/1578417980248/Balcony_Dub.mp3"></audio>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Project Bluebird: A Study in Rhythm</p>
          <audio controls style={{ width: '100%' }} src="https://static1.squarespace.com/static/532b70b6e4b0dca092974dbe/t/588e0fbb6a4963c410038a03/1578417980255/project_bluebird.mp3"></audio>
        </div>
      </CollapsibleSection>

      <div style={{ height: '40px' }} />
    </div>
  );
}
"""

content = content[:av_start] + new_av + content[av_end:]

with open("src/content/OverlayContent.tsx", "w") as f:
    f.write(content)

