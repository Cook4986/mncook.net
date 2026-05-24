/* OverlayContent renders Squarespace-migrated content. We intentionally
   use raw <img> and <iframe> (not next/image / next/iframe equivalents) so
   `output: 'export'` can fully prerender; and a few literal apostrophes
   inside captions are escaped at write time. The narrow disables below
   reflect those deliberate choices rather than masking unrelated bugs. */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import CollapsibleSection from '../components/ui/CollapsibleSection';
import { publications, fiction, bizarreBooks } from './data';

const CactusFooter = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '60px 0 20px 0', opacity: 0.45 }}>
    <img src="/cactus-icon.png" alt="Cactus Mark" style={{ width: '28px', height: 'auto', filter: 'brightness(0) invert(1)' }} />
  </div>
);

const TechnicalPreview = ({ src, alt, caption, invert = false, pad = false }: { src: string, alt: string, caption?: string, invert?: boolean, pad?: boolean }) => (
  <div style={{ margin: '1.5rem 0', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ 
      width: '100%', 
      maxHeight: '260px', 
      borderRadius: '6px', 
      overflow: 'hidden', 
      background: pad ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.02)', 
      border: '1px solid var(--rule-dark)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: pad ? '24px' : '0'
    }}>
      <img 
        src={src} 
        alt={alt} 
        style={{ 
          maxWidth: '100%', 
          maxHeight: '260px', 
          objectFit: 'contain',
          filter: invert ? 'invert(1) brightness(1.2) contrast(1.1)' : 'none'
        }} 
      />
    </div>
    {caption && <p style={{ fontSize: '0.8rem', color: 'var(--ivory-dim)', marginTop: '8px', fontStyle: 'italic', textAlign: 'center' }}>{caption}</p>}
  </div>
);

// --- SPATIAL ---

const ImageWithCaption = ({ src, alt, caption }: { src: string, alt: string, caption?: string }) => (
  <div 
    style={{ margin: '2.5rem 0', textAlign: 'center', transition: 'all 0.3s ease', cursor: 'pointer' }} 
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.filter = 'brightness(1.1)';
    }} 
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.filter = 'brightness(1)';
    }}
  >
    <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto', borderRadius: '6px', boxShadow: '0 12px 30px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }} />
    {caption && <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '12px', fontStyle: 'italic', padding: '0 10%' }}>{caption}</p>}
  </div>
);

export function SpatialContent() {
  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>
      <p style={{ fontSize: '1.25rem', color: 'var(--ivory-dim)', fontStyle: 'italic', marginBottom: '32px', paddingLeft: '20px', borderLeft: '3px solid var(--accent)', lineHeight: '1.75' }}>
        "Wisdom sits in places. It’s like water and never dries up. You need to drink water to stay alive, don’t you? Well, you also need to drink from places. You must remember everything about them. You must learn their names. You must remember what happened at them long ago. You must think about it and keep on thinking about it. Then your mind will become smoother and smoother. Then you will see danger before it happens."
        <br/><br/>
        — Chiricahua Apache horsemen
      </p>

      <ImageWithCaption src="/Spatial/Cave.webp" alt="Cave" caption="Cave-like overhang at ~4,700 ft above sea level and the object of our expedition." />

      <CollapsibleSection title="- 2015 — Bull snake, storm, and creek flood">
        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>First, the good: We began cataloguing local flora/fauna (and geological formations) with a 10 mile hike due north across the valley.</p>
        
        <ImageWithCaption src="/Spatial/Bull_Snake.webp" alt="Coachwhip" caption="Eight-foot, tree-climbing Coachwhip (Masticophis flagellum), photographed atop Unnamed Mesa." />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>When you're 50 miles from the nearest medical facility, clustering illusions ("bad news comes in threes", etc) are quite salient. In our case, the massive, striking snake shown below, the lightning storm, and the flash flooding of Garita creek comprised a troubling trilogy of events - all taking place over the span of 12 hours - which led to our ultimate evacuation to Tucumcari on the third day of our expedition.</p>
        
        <ImageWithCaption src="/Spatial/image-asset.webp" alt="Rattlesnake" caption="A similarly sized Western Diamondback Rattler (Crotalus atrox), encountered and photographed as we approached the property the day before." />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>We both moved quickly at that point, turning and running diagonally in opposite directions away from the rock pile. We knew these snakes can strike up to 2/3 their body length. The next thing I knew I was picking myself off the ground 10 feet away, wiping away blood, and pulling cactus needles out of various appendages. The pain in my left thigh was immense. Had I been bitten?</p>
        
        <ImageWithCaption src="/Spatial/Cholla.webp" alt="Cholla Cactus" caption="A Cane Cholla (Cylindropuntia imbricata) of the sort embedded in my thigh following our hasty retreat from the Diamondback rattler." />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>We had thought our adventure complete for the night but a massive (un-forecast) cumulo-stratus thunder-storm soon settled directly overhead, waking us at about 2 AM. Since our tent was pitched directly alongside the metal shipping container... we decided to flee the shelter for the safety of the truck cab. For three hours we watched lightning strike all around us (not three-one-thousands off, but immediate, booming, simultaneous blinding light/sound).</p>
        
        <ImageWithCaption src="/Spatial/Storm.webp" alt="Storm" caption="Rain and darkness in the distance." />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>We awoke damp, slightly hungover, and enormously relieved. Quickly, we packed and headed back across the valley, making it only as far as Garita Creek - which had been bone dry just 12 hours earlier but was now a raging river...</p>
        
        <ImageWithCaption src="/Spatial/image-asset (1).webp" alt="Garita Creek" caption="Garita Creek crossing, where flash-flooding temporarily stranded us." />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>Our last hope, short of hitchhiking back to Tucumcari for a tow, were Bill and Marge, permanent residents of Garita (one of three remaining occupied residences out of 100+ original homesteads) who managed to pull the truck out backwards up a 30 degree incline in the mud...</p>
        
        <ImageWithCaption src="/Spatial/image-asset (2).webp" alt="Stone ruins" caption="Stone ruins of former settlers (center right) - to be explored in subsequent expeditions." />
      </CollapsibleSection>

      <CollapsibleSection title="- 2016 — Driving path, stone ruins, and camper">
        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>In Garita, folklore shapes perception just as readily as more established western religions, and that perception - regardless of origin - informs regional character. Atop the mesa, things were much as we left them, including the shipping container, which had weathered the New Mexican sun and wind admirably.</p>

        <ImageWithCaption src="/Spatial/image-asset (3).webp" alt="Sheepherder's cabin" caption="A sheepherder's stone cabin." />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>But first, we did reach that stone cabin in the distance, and - perhaps more importantly - we've 3D scanned it for analysis off-grid...</p>

        <ImageWithCaption src="/Spatial/image-asset (4).webp" alt="Driveway" caption="Excavating a half-mile driveway." />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>Also, we built a winding, half-mile long driveway. Essentially reclaiming a forgotten public easement, this dirt/rock path connects our land to an actual county road and makes the property accessible to passenger cars - and a heavy equipment delivery truck...</p>

        <ImageWithCaption src="/Spatial/image-asset (5).webp" alt="Mesa" caption="Atop Variadero Mesa, observing a conical stone formation to the Northeast." />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>We completed the year with the installation of the first permanent shelter on the property, a "canned ham" style camper that we renovated inside and out.</p>

        <ImageWithCaption src="/Spatial/file-1-3.webp" alt="Camper" caption="Our home on the property." />
      </CollapsibleSection>

      <CollapsibleSection title="- 2017 — Outlaw hideout and solar power setup">
        <ImageWithCaption src="/Spatial/image-asset (6).webp" alt="Dusk" caption="Dusk in the Garita valley." />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>Solar power, a full-sized bed (under roof), a fire-pit seating/cooking area, and a navigable road to town: These are the fundamental amenities required for prolonged inhabitation, and we've got them all.</p>

        <ImageWithCaption src="/Spatial/file.webp" alt="Shelter interior" />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>The property was never about creature comforts, or fully recreating the at-home living experience in the wild. That's why we spend our days exploring, reading, cataloging flora/fauna, mapping the terrain, and discovering historical artifacts - like the hideout of Vicente Silva and his gang of bandits (active ~1890).</p>

        <ImageWithCaption src="/Spatial/Hideout1.webp" alt="Hideout" caption="Silva Gang hideout - San Miguel County, New Mexico." />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>Pinks in the morning, deep reds and purples in the evening. That's why we are here, right? To experience this landscape in a way impossible for those who simply pass through...</p>

        <ImageWithCaption src="/Spatial/silvagang.webp" alt="Silva gang" />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>Light to read by and an old box fan to move the air during the heat of the 100+ degree summer days. That's about all the camper is meant for.</p>

        <ImageWithCaption src="/Spatial/01890005.webp" alt="Night reading" />
      </CollapsibleSection>

      <CollapsibleSection title="- 2018 — Pecos Pueblo scan and outhouse building">
        <ImageWithCaption src="/Spatial/IMG_1135.webp" alt="Pecos" caption="Pecos National Historic Park" />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>I had the good fortune of visiting NM four times in 2018. Off the property, we hiked the Mora pass and explored the ruins of the Pecos Pueblo, which was abandoned in 1838.</p>

        <ImageWithCaption src="/Spatial/IMG_6818.webp" alt="Pueblo" caption="The ruins of Pecos Pueblo not long after Lieutenant Abert's curious account" />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>Any early description of the Pueblo was penned by a Lt. Abert in September of 1846. He described how the village was constructed around a central plaza, and how the surrounding walls were built to defend against nomadic tribes. However, it was not conflict that ultimately led to the Pueblo's demise...</p>

        <ImageWithCaption src="/Spatial/IMG_2305.webp" alt="Hiking" />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>Climbers camouflaged across sheer rock faces; slithering things of regular size hidden directly beneath our feet. We saw it all this year.</p>

        <ImageWithCaption src="/Spatial/IMG_1120.webp" alt="Reptile" />
      </CollapsibleSection>

      <CollapsibleSection title="- 2019 — Sabinoso Wilderness canyon exploration">
        <ImageWithCaption src="/Spatial/IMG_2027.webp" alt="Trail" />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>In 2017, nearly 30,000 acres of public land became accessible through the opening of public road access to the Sabinoso Wilderness. It's a spectacular landscape of deep canyons and sheer rock walls, and it's practically right in our backyard.</p>

        <ImageWithCaption src="/Spatial/IMG_4163.webp" alt="Canyon" />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>Even with the easement, this land remains unapproachable. There are no amenities besides flattened dirt, and the hike down into the canyon is steep and treacherous.</p>

        <ImageWithCaption src="/Spatial/image-asset (7).webp" alt="Landscape" />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>We ditched the truck at the trailhead amidst pine and juniper and headed down the mesa, reaching the canyon floor about an hour later.</p>

        <ImageWithCaption src="/Spatial/IMG_4202.webp" alt="Canyon Floor" />
      </CollapsibleSection>

      <CollapsibleSection title="- 2020-2024 — Growth, global pause, and return trips">
        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>New Job, new house, new baby. COVID. Missed a few years, which I hope will never happen again.</p>
      </CollapsibleSection>

      <CollapsibleSection title="- 2025 — Dual-sport Serow bike and cabin basecamp">
        <ImageWithCaption src="/Spatial/IMG_1453.webp" alt="Anniversary" />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>This year marks 10 years since development on “the property”/”Porcupine Ranch”/”mini mesa" began in earnest. It’s hard to believe, but the shipping container still stands, the camper still provides shelter, and the road is still washed out.</p>

        <ImageWithCaption src="/Spatial/Untitled+(1).gif" alt="Campfire GIF" />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>No rental vehicle is worth the inevitable damage wrought by mesquite and cholla and all manner of thorny scrub...</p>

        <ImageWithCaption src="/Spatial/serowHero.webp" alt="Yamaha Serow" />

        <p style={{ fontSize: '1.18rem', lineHeight: '1.75', marginBottom: '16px' }}>Where does that leave us, 10 years on? Think bigger: To host - family and friends, of course, but also researchers and artists. The land is uniquely situated for observational astronomy, geology, and biology. It’s a blank canvas.</p>

        <ImageWithCaption src="/Spatial/dragonoid.webp" alt="Sunset" />

        <p style={{ fontStyle: 'italic', color: 'var(--ivory-dim)', marginTop: '20px', fontSize: '1.18rem', lineHeight: '1.75' }}>
          "Stop searching. Face the earth where you can. Literally speaking, it’s all you have to go on."<br/>— Richard Ford
        </p>
      </CollapsibleSection>

      <CactusFooter />
      <div style={{ height: '40px' }} />
    </div>
  );
}
export function TextualContent() {
  const shortFiction = fiction.filter(f => f.title !== 'Scorpio');
  const novel = fiction.filter(f => f.title === 'Scorpio');

  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>

      <CollapsibleSection title="Scholarship — Peer-reviewed journal papers">
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', lineHeight: '1.8' }}>
          {publications.map((pub, i) => (
            <li key={i} style={{ marginBottom: '12px' }}>
              <a 
                href={pub.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: 'var(--ivory)', textDecoration: 'none', borderBottom: '1px solid var(--accent-glow)', transition: 'color 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ivory)'}
              >
                {pub.title}
              </a>
              <span style={{ fontSize: '0.9rem', color: 'var(--ivory-dim)', marginLeft: '8px' }}>
                — {pub.venue} ({pub.year})
              </span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      <CollapsibleSection title="Short Fiction — Selected stories available as PDFs">
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', lineHeight: '1.8' }}>
          {shortFiction.map((story, i) => (
            <li key={i} style={{ marginBottom: '12px' }}>
              {story.pdfUrl ? (
                <a 
                  href={story.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--ivory)', textDecoration: 'none', borderBottom: '1px solid var(--accent-glow)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ivory)'}
                >
                  {story.title}
                </a>
              ) : (
                <span style={{ color: 'var(--ivory)' }}>{story.title}</span>
              )}
              <span style={{ fontSize: '0.9rem', color: 'var(--ivory-dim)', marginLeft: '8px' }}>
                — {story.description}
              </span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      <CollapsibleSection title="Novel — Scorpio: a layered work of fiction">
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', lineHeight: '1.8' }}>
          {novel.map((nov, i) => (
            <li key={i} style={{ marginBottom: '12px' }}>
              {nov.pdfUrl ? (
                <a 
                  href={nov.pdfUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--ivory)', textDecoration: 'none', borderBottom: '1px solid var(--accent-glow)', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.color = 'var(--ivory)'}
                >
                  {nov.title}
                </a>
              ) : (
                <span style={{ color: 'var(--ivory)' }}>{nov.title}</span>
              )}
              <span style={{ fontSize: '0.9rem', color: 'var(--ivory-dim)', marginLeft: '8px' }}>
                — {nov.description}
              </span>
            </li>
          ))}
        </ul>
      </CollapsibleSection>

      <CactusFooter />
      <div style={{ height: '40px' }} />
    </div>
  );
}
export function AudiovisualContent() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>
      
      <CollapsibleSection title="Bizarre Books — Occult folklore non-fiction video series" defaultOpen={true}>
        <p style={{ 
          marginBottom: '28px', 
          color: 'var(--ivory-dim)', 
          fontSize: '1.05rem', 
          lineHeight: '1.6',
          fontFamily: 'var(--font-serif)',
          fontStyle: 'italic'
        }}>
          Experimental, atmospheric video essays exploring regional New England folklore and historical occult stories.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {bizarreBooks.map((episode, i) => (
            <div 
              key={i} 
              onClick={() => setActiveVideo(episode.youtubeId)}
              style={{ 
                background: 'rgba(255,255,255,0.03)', 
                border: '1px solid var(--rule-dark)', 
                borderRadius: '8px', 
                padding: '20px', 
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--rule-dark)';
                e.currentTarget.style.background = 'rgba(255,255,255,0.03)';
              }}
            >
              <div style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: '1.15rem', 
                color: 'var(--ivory)', 
                marginBottom: '8px',
                fontStyle: 'italic'
              }}>
                {episode.title}
              </div>
              <p style={{ 
                fontSize: '0.9rem', 
                color: 'var(--ivory-dim)', 
                lineHeight: '1.5',
                marginBottom: '12px'
              }}>
                {episode.description}
              </p>
              <span style={{ 
                fontFamily: 'var(--font-mono)', 
                fontSize: '0.65rem', 
                color: 'var(--accent)', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em' 
              }}>
                Watch Episode →
              </span>
            </div>
          ))}
        </div>

        {/* Video Lightbox Overlay */}
        {activeVideo && (
          <div 
            onClick={() => setActiveVideo(null)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.85)',
              backdropFilter: 'blur(10px)',
              zIndex: 9999999,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '20px'
            }}
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              style={{
                position: 'relative',
                width: 'min(90vw, 800px)',
                aspectRatio: '16/9',
                borderRadius: '12px',
                overflow: 'hidden',
                background: '#000',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)'
              }}
            >
              <button 
                onClick={() => setActiveVideo(null)}
                style={{
                  position: 'absolute',
                  top: '12px',
                  right: '16px',
                  background: 'rgba(0,0,0,0.6)',
                  border: 'none',
                  color: '#fff',
                  fontSize: '1.5rem',
                  cursor: 'pointer',
                  zIndex: 10,
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                ✕
              </button>
              <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&wmode=opaque&enablejsapi=1`} 
                frameBorder="0" 
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </CollapsibleSection>

      <CollapsibleSection title="Songs — Muted, atmospheric ambient & dub tracks">
        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Red Rock Paranoia</p>
          <audio controls style={{ width: '100%' }} src="/s/RedRockParanoia2.mp3"></audio>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Blue Haze</p>
          <audio controls style={{ width: '100%' }} src="/s/Blue_Haze_instrumental.mp3"></audio>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>SVU</p>
          <audio controls style={{ width: '100%' }} src="/s/svu.mp3"></audio>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Balcony Dub</p>
          <audio controls style={{ width: '100%' }} src="/s/Balcony_Dub.mp3"></audio>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>Project Bluebird: A Study in Rhythm</p>
          <audio controls style={{ width: '100%' }} src="/s/project_bluebird.mp3"></audio>
        </div>
      </CollapsibleSection>

      <CactusFooter />
      <div style={{ height: '40px' }} />
    </div>
  );
}
export function ProfessionalContent() {
  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>
      <p style={{ 
        marginBottom: '32px', 
        color: 'var(--ivory-dim)', 
        fontSize: '1.05rem', 
        lineHeight: '1.7',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        borderLeft: '2px solid var(--accent)',
        paddingLeft: '16px'
      }}>
        As Digital Scholarship Program Manager for Harvard Library (and, formerly, as Head of Emerging Technologies for the University of Oklahoma Libraries), I explore/develop/deploy tech for research and instructional purposes.
      </p>

      <CollapsibleSection title="3D Research Data Curation Framework (3DFrame) — Scholarly 3D data curation">
        <ImageWithCaption src="/Professional/3DF_testLogo3.webp" alt="3DF Logo" />
        
        <p>Deployed in virtual and augmented reality, 3D models provide the means for researchers and students to remotely experience diverse scholarly materials first-hand, though this content seldom finds its way into institutional repositories or peer-reviewed literature where it could be reused and cited. Currently, these methods are dispersed; an no single discipline, institution, or practitioner has yet to document a truly citable 3D curation method.</p>
        
        <ImageWithCaption src="/Professional/UofU_3DF_8.webp" alt="UofU 3DF" />

        <p>Professor Zack and I have been working on the issue of scholarly 3D/VR for about a decade, since the release of the Oculus DK1. Mainly, we've focused on getting VR out of the lab and into the classroom, specifically by providing practical guidance and publishing on the instructional benefits. Increasingly, content has been the issue, not a lack of interest. However, academic rigor for 3D contents remains an issue.</p>
        
        <ImageWithCaption src="/Professional/UMass_3DF_2.webp" alt="UMass 3DF" />

        <p>At the core of 3DF is travel. The narrative specifies a range of 3D scanning lab types, where the research team will observe, interview, and test current and future workflows. The Irshick Lab and its DigitalLife3D project was our first stop in our mission to document the messy true story of 3D data production.</p>

        <ImageWithCaption src="/Professional/RQ4_3DF_3.webp" alt="RQ4 3DF" />

        <p>Getting back to research question #4 (RQ4), we have a viable protocol and promising early participant data comparing the performance of immersive and "flat" (traditional display-based) viewing experiences for 3D future quality control workflows. The experiment we've developed to gather this data begins this prompt:</p>
        <p>Today you will be conducting quality control on 3D models. Momentarily, you will be prompted with a fictional scenario and asked to respond to a question. It is important that you limit your verbal response to "yes" or "no" only. Do you understand? We will now begin with a practice scenario.</p>
        <p>From there, participants are presented with a series of scenes and scenarios, each of which represents quality issues commonly encountered by 3D practitioners.</p>

        <ImageWithCaption src="/Professional/MattZackJosh_3DF_2024.webp" alt="Matt, Zack, Josh 3DF 2024" />
      </CollapsibleSection>

      <CollapsibleSection title="Longhand — VR word-cloud text visualizer">
        <ImageWithCaption src="/Professional/longhandThrougput_updated.webp" alt="Longhand Throughput" />

        <p>Computational workflows can generate machine-actionable data from "raw" (e.g. handwritten) textual source material, allowing the search of vast material collections. But while a keyword search is a useful way to collate and confirm hypotheses, it assumes the researcher has some ideas about where to begin. Keyword search results don't reveal the nature of a corpus as a whole though, nor do they represent the relationships between tokens whose source material might span media, time, or location.</p>
        
        <ImageWithCaption src="/Professional/Longhand_gif_AmazingStories_AdobeExpress.gif" alt="Longhand GIF" />

        <p>So, how might one glimpse the contents of a text corpus, to generate preliminary research questions that might inform downstream search and more sophisticated analyses related to topics, sentiments, parts of speech, or named entities? Visualization - charts, graphs, diagrams, word clouds, etc. - are helpful at this exploratory research stage, when a researcher is simply trying to grasp the contents of a text corpus. This is where Longhand comes in.</p>
        <p>Longhand is a word cloud generator, but the "words" are 3D models projected in 360 degrees around the user. Longhand exists to explore unwieldy text corpora (including in virtual reality) earlier in the research lifecycle. In addition to exposing text-centric researchers to the historically STEM-oriented benefits of Reality, Longhand leverages our ability to rapidly report object identity or category after just a single brief glimpse of visual input.</p>
      </CollapsibleSection>

      <CollapsibleSection title="Widener 360 — Matterport-scanned virtual library tours">
        <ImageWithCaption src="/Professional/WidenerScan1_Cook2020.webp" alt="Widener Scan" caption="Isometric perspective, with expanded annotation (featuring historical imagery), on the Matterport-hosted Widener Library 3D scan." />

        <p>Given the increasing size and complexity of research data generally, and the recent advancement of scanning and visualization methods specifically (e.g. photogrammetry and virtual reality), 3D data has the potential to become the asset "of record," or primary source material, for researchers in a wide range of academic disciplines. Moreover, this content can be produced for objects of study at various scales, including large-scale facilities, like Harvard's very own Widener Library.</p>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe width="100%" height="100%" src="https://my.matterport.com/show/?m=fs3gQv7n1QG&utm_source=4" frameBorder="0" allowFullScreen></iframe>
        </div>

        <p>But, as we began annotating the scan with historical imagery, links to Harvard Library materials, and historical information concerning the inspiring architectural history of the building, we began to understand the linked data implications of these virtual facilities. With Widener 360, our stunning architecture functions as a sort of visual index for collections, services, and history.</p>

        <ImageWithCaption src="/Professional/image-asset.webp" alt="Spotify Podcast" caption='Spotify-hosted podcast "hidden" in the book stacks. The podcast can be played in the browser.' />

        <p>We've seen an encouraging number of site visitors to the tour page in the few months since it has gone live, and I imagine other libraries are seeing similar uptake. These scans also represent an online media type that transcends the traditional wall-of-text...</p>

        <ImageWithCaption src="/Professional/Widener360_Blender.webp" alt="Decimating Widener Scan" caption="Decimating and cropping Widener scan data for use in shared online environments, like Mozilla's Hubs platform." />
      </CollapsibleSection>

      <CollapsibleSection title="Instructional Chess — VR-modeled spatial learning sets">
        <ImageWithCaption src="/Professional/KnightBuild1.webp" alt="Knight Build" caption='Using Oculus Medium&apos;s "Clay" tool to model the knight piece' />

        <p>Motivations: There are an estimated 600 million chess players worldwide and a diverse body of peer-reviewed literature speaks to the benefits of learning the game, especially for children. Indeed, some of the most compelling research involves young children (as young as 4), whose spatial concept awareness was strengthened after chess training.</p>

        <ImageWithCaption src="/Professional/Chess_Sketch1.webp" alt="Chess Sketch" caption="Brainstorming instructional chess piece design in my pocket notebook." />

        <p>VR Modeling: Complete blindness to the goings-on in your physical surroundings is both a strength and a weakness of virtual reality. First, the bad: complete eye coverage makes people uncomfortable, especially in public spaces, where a hand on your shoulder can't be predicted and is seldom appreciated. The benefits of complete immersion may well counterbalance this perceived vulnerability, however.</p>
        
        <ImageWithCaption src="/Professional/giphy+(1).gif" alt="VR Knight Design" caption="Early knight design demonstrating the flexibility of VR modeling." />

        <p>Prepping and Printing: While it's a clear step towards a VR-based rapid prototyping solution, Medium isn't a full-fledged CAD solution. Rather, Medium is an artistic outlet that can be co-opted (so to speak) for downstream output that resembles products rather than sculpture.</p>

        <ImageWithCaption src="/Professional/image-asset.gif" alt="LulzBot Print" caption="Early instructional chess prototype printing on LulzBot Mini" />

        <p>What's Next? Print out a set for yourself! The complete Instructional Chess 3D model set is downloadable from Sketchfab (for free), and I'll be posting 3D printing instructions shortly, to ensure your set prints cleanly and efficiently.</p>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Instructional Chess - Bishop" width="100%" height="100%" src="https://sketchfab.com/models/6b7f539e814c417a8f02c12eef887271/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking"></iframe>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Sparq Labyrinth — Interactive projection meditation maze">
        <ImageWithCaption src="/Professional/image-asset (1).webp" alt="Sparq Labyrinth user" />
        <p>The Sparq labyrinth is an interactive meditation tool. With a touch-screen interface, the Sparq user selects from a variety of culturally significant labyrinth patterns and then engages (i.e. walks, performs yoga, or even dances) the projected pattern to attain a refreshing connection to the moment.</p>
        <ImageWithCaption src="/Professional/image-asset (2).webp" alt="Sparq event" />
        <p>The Sparq provides for a uniquely personal meditation experience. With touch-screen access to a variety of patterns - each representing a distinct cultural heritage - the Sparq users connect with history while reconnecting with themselves.</p>
        <ImageWithCaption src="/Professional/image-asset (3).webp" alt="Sparq projection" />
        <ImageWithCaption src="/Professional/image-asset (4).webp" alt="Sparq device" />
        <p>In Pima & Papago (native American) cultures the design below represents "Siuu-hu Ki" - "Elder Brother's House". Legend has it that, after exploiting the village, the mythical Elder Brother would flee, following an especially devious path back to his mountain lair...</p>
        <ImageWithCaption src="/Professional/image-asset (5).webp" alt="Elder Brother's House" caption='In Pima & Papago (native American) cultures the design below represents "Siuu-hu Ki" - "Elder Brother&apos;s House"' />
      </CollapsibleSection>

      <CollapsibleSection title='"Hypnose" - Rapid Prototyping Project — Smells-based Arduino alarm'>
        <ImageWithCaption src="/Professional/image-asset (6).webp" alt="Clocks & Watches" caption="Bruton, Eric. Clocks & Watches. New York: Hamlyn Publishing Group, 1968." />

        <p>OU Libraries' new makerspace/fab lab/incubator Innovation @ the EDGE is centered on the idea that demystification of emerging technology is critical non-STEM engagement. Since my academic background is in the humanities (philosophy), a demonstration of rapid prototyping that takes inspiration from our large collection seemed important.</p>
        
        <ImageWithCaption src="/Professional/image-asset (7).webp" alt="Hypnose Bronze Head" caption="Bronze Head of Hypnose from Civitella d'Arna" />

        <p>The original motivation for the Hypnose was simple: there are problems associated with waking up and checking one's smartphone to figure out if it is indeed time to wake up! Why not train myself to subconsciously to wake up on time by associating different phases of my sleep cycle with distinct scents?</p>
      
        <ImageWithCaption src="/Professional/image-asset (8).webp" alt="Arduino Tutorial" caption="https://www.sparkfun.com/tutorials/400" />
        <p>This implementation used an Arduino Uno along with a SparkFun motor shield to power a stepper motor via a wall outlet. The precise rotational control provided by a stepper motor (as opposed to a torque-heavy servo) allows the below code to "jump" a measuring spoon - containing a small amount of scented wax melt - to a position directly above a heat lamp.</p>

        <ImageWithCaption src="/Professional/image-asset (9).webp" alt="Code Snippet" />
        <ImageWithCaption src="/Professional/image-asset (10).webp" alt="Original model" caption="The assembly, originally modeled in Sketchup (above), takes its cue from a 1st century bronze sculpture discovered in central Italy." />
        <ImageWithCaption src="/Professional/image-asset (11).webp" alt="Hypnose face" caption='The Hypnose "face" - an amalgamation of a free, low-poly mask model found online and a set of wings' />
        <ImageWithCaption src="/Professional/image-asset (12).webp" alt="Final prototype" caption="More importantly, OU Libraries now offers free training on all the tech associated with this project..." />
      </CollapsibleSection>

      <CollapsibleSection title="NavApp — Indoor wayfinding GPS and library guide">
        <p>We are in a second proof-of-concept stage for a mobile app that guides users through large indoor spaces while providing a plethora of location-based info and relevant push notifications (e.g. events, technology tutorials, etc.) along the way.</p>
        <p>People tend to refer to the central routing feature as "indoor GPS". It's accurate at up to a meter and it fulfills a goal we started focusing on early last year: simplify an extraordinarily complex physical environment.</p>

        <ImageWithCaption src="/Professional/image-asset (13).webp" alt="NavApp" />
        
        <p>At the end of the 2015/16 academic year - the first semester where the NavApp was available for (free) public download - ~2,000+ unique users had downloaded and engaged with this innovative wayfinding tool.</p>

        <ImageWithCaption src="/Professional/image-asset (14).webp" alt="NavApp Usage" />

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tTpuYP1of1I?wmode=opaque&enablejsapi=1" frameBorder="0" allowFullScreen></iframe>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="OVAL 1.0 — Multiplayer VR 3D classroom uploader">
        <p>After months of R&D, OVAL 1.0 is ready for use. With this hardware/software platform, instructors and researchers alike can quickly populate a custom learning space with fully interactive 3D objects from any field.</p>
        
        <ImageWithCaption src="/Professional/image-asset (15).webp" alt="RNA fly-through" caption="CHEM 4923, group RNA fly-through." />

        <p>Not only are previously imperceptible/fragile/distant objects (like chemical molecules, museum artifacts, historical sites, etc.) readily accessible in this shared learning environment, but - using our public facing file uploader - even the most novice users can easily drag-and-drop their 3D files into virtual space for collaborative research and instruction in virtual reality.</p>

        <ImageWithCaption src="/Professional/image-asset (16).webp" alt="VR Workstation" caption="Custom fabricated, library-designed VR workstation - courtesy of OU Physics dept." />

        <p>Finally, natural interaction types - like leaning in get a closer look at a detailed model - are preserved and augmented by body tracking technology. When coupled with intuitive hand-tracked controls (one less piece of software to learn!), and screenshot + video capture functions for output to downstream applications, new perspectives can be achieved and captured to aid your scholarship.</p>
        
        <ImageWithCaption src="/Professional/image-asset (17).webp" alt="VR View" />

        <p>"The impact on the students this week was immeasurable", says one OU faculty member who has already incorporated the OVAL into her coursework. How can we help you achieve the same impact?</p>

        <ImageWithCaption src="/Professional/image-asset (18).webp" alt="OVAL usage" />

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tmL3T28Ud1k?wmode=opaque&enablejsapi=1" frameBorder="0" allowFullScreen></iframe>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="3D Scanning - Experiments & Implications — Field scans & botany trials">
        <p>My current professional focus on 3D visualization has led to experimentation with a host of scanning solutions. Basically, the goal is a more accurate digitization - an interactive snapshot with searchable/browsable depth.</p>
        
        <p>The above prickly pear scan isn't perfect, but it's the only usable botanical scan that I've managed to generate after a half-dozen tries. Narrow-width connecting components (e.g. stems) in particular seem to disappear during Autodesk's cloud-based stitching process...</p>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Opuntia (Prickly Pear) Cactus" width="100%" height="100%" src="https://sketchfab.com/models/bbc37de8363e45b5a33175942ffe7368/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking"></iframe>
        </div>

        <p>This statue of Omar Kayyam is located in the heart of OU's Norman campus. Fortunately, it was an overcast day when the scan was done, otherwise the direct sunlight would have reflected off the white stone.</p>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Omar Kayyam" width="100%" height="100%" src="https://sketchfab.com/models/2ca7f8d0a71a4a8696266629c186092c/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking"></iframe>
        </div>
        
        <p>As described on the spatial page, this Sheepherder's cabin represents a "field scan", whereby off-grid artifacts can be manipulated, analyzed, or otherwise investigated after the fact for details that onsite limitations (like time) simply won't allow for.</p>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Sheepherder's Cabin" width="100%" height="100%" src="https://sketchfab.com/models/15790973e5b44cf9abdda0fcd9982948/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking"></iframe>
        </div>
        
        <ImageWithCaption src="/Professional/image-asset (19).webp" alt="VR analysis of ruins" caption="VR-based analysis of early 20th century sheepherder's ruins. Note the measurement tool." />

        <p>Combining a few best-practices gleaned from generating high-quality field scans like the sheepherder's cabin with the ability to effectively scan certain living, albeit static, organisms (plants, that is), mean that 3D asset repositories of invasive flora, or endangered orchids, or entire crops are feasible and perhaps inevitable.</p>
      </CollapsibleSection>

      <CactusFooter />
      <div style={{ height: '40px' }} />
    </div>
  );
}
export function ContactContent() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [body, setBody] = useState('');
  const [honey, setHoney] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // Silent client-side honeypot protection: if filled, act as if success
    if (honey) {
      setTimeout(() => {
        setStatus('success');
        setTimeout(() => {
          window.location.reload();
        }, 3200);
      }, 600);
      return;
    }

    try {
      const response = await fetch('https://formsubmit.co/ajax/matt@mncook.net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message: body
        })
      });

      if (response.ok) {
        setStatus('success');
        setTimeout(() => {
          window.location.reload();
        }, 3200);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div style={{ 
        padding: '40px 20px', 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          border: '2px solid var(--accent)',
          borderRadius: '50%',
          borderTopColor: 'transparent',
          animation: 'spin 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite',
          marginBottom: '24px'
        }} />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          @keyframes pulse-glow {
            0%, 100% { opacity: 0.6; transform: scale(0.98); }
            50% { opacity: 1; transform: scale(1.02); }
          }
        `}</style>
        <h2 style={{ 
          fontFamily: 'var(--font-display)', 
          fontSize: '1.8rem', 
          color: 'var(--ivory)', 
          marginBottom: '16px',
          fontStyle: 'italic'
        }}>
          Transmission Dispatched
        </h2>
        <p style={{ 
          color: 'var(--ivory-dim)', 
          lineHeight: '1.8', 
          maxWidth: '420px', 
          fontSize: '1.02rem',
          fontFamily: 'var(--font-serif)',
          animation: 'pulse-glow 2s infinite ease-in-out'
        }}>
          The frequencies are aligned. Your message has been encrypted and safely routed to <span style={{ color: 'var(--accent)' }}>matt@mncook.net</span>.
        </p>
        <p style={{ 
          color: 'var(--ink-faint)', 
          fontSize: '0.8rem', 
          marginTop: '32px',
          fontFamily: 'var(--font-mono)',
          letterSpacing: '0.1em'
        }}>
          RELOADING PORTAL IN 3s...
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>
      <form 
        onSubmit={handleSubmit}
        style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="name" style={{ color: 'var(--ivory)', fontSize: '0.9rem' }}>Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            disabled={status === 'submitting'}
            style={{ 
              padding: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--rule-dark)', 
              borderRadius: '4px',
              color: 'var(--ivory)',
              fontSize: '1rem'
            }} 
          />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="email" style={{ color: 'var(--ivory)', fontSize: '0.9rem' }}>Email</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'submitting'}
            style={{ 
              padding: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--rule-dark)', 
              borderRadius: '4px',
              color: 'var(--ivory)',
              fontSize: '1rem'
            }} 
          />
        </div>

        {/* Hidden honeypot field to trap automated spambots */}
        <div style={{ display: 'none' }} aria-hidden="true">
          <label htmlFor="honey">Leave this field blank</label>
          <input
            type="text"
            id="honey"
            name="honey"
            value={honey}
            onChange={(e) => setHoney(e.target.value)}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label htmlFor="body" style={{ color: 'var(--ivory)', fontSize: '0.9rem' }}>What are you working on and how can I help?</label>
          <textarea 
            id="body" 
            name="body" 
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            disabled={status === 'submitting'}
            style={{ 
              padding: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--rule-dark)', 
              borderRadius: '4px',
              color: 'var(--ivory)',
              fontSize: '1rem',
              resize: 'vertical'
            }} 
          />
        </div>

        {status === 'error' && (
          <p style={{ color: '#ff6b6b', fontSize: '0.9rem', margin: 0 }}>
            Transmission failed. Please check your network or email matt@mncook.net directly.
          </p>
        )}

        <button 
          type="submit"
          disabled={status === 'submitting'}
          style={{
            marginTop: '10px',
            padding: '14px 24px',
            background: 'var(--accent)',
            color: '#08080a',
            fontWeight: '600',
            fontFamily: 'var(--font-mono)',
            letterSpacing: '0.05em',
            textTransform: 'uppercase',
            border: 'none',
            borderRadius: '4px',
            fontSize: '0.9rem',
            cursor: 'pointer',
            transition: 'opacity 0.2s ease, transform 0.2s ease',
            alignSelf: 'flex-start',
            opacity: status === 'submitting' ? 0.5 : 1
          }}
          onMouseOver={(e) => { if (status !== 'submitting') e.currentTarget.style.opacity = '0.8'; }}
          onMouseOut={(e) => { if (status !== 'submitting') e.currentTarget.style.opacity = '1'; }}
        >
          {status === 'submitting' ? 'Transmitting...' : 'Submit'}
        </button>
      </form>
      <CactusFooter />
      <div style={{ height: '40px' }} />
    </div>
  );
}

export function TechnicalContent() {
  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>
      <p style={{ 
        marginBottom: '32px', 
        color: 'var(--ivory-dim)', 
        fontSize: '1.1rem', 
        lineHeight: '1.7',
        letterSpacing: '0.02em',
        fontFamily: 'var(--font-serif)',
        fontStyle: 'italic',
        borderLeft: '2px solid var(--accent)',
        paddingLeft: '16px'
      }}>
        High-performance full-stack architectures, WebGL graphics, and edge AI applications bridging physical environments and spatial data.
      </p>

      <CollapsibleSection title="Chatpak — Photobook design generator and layout pipeline">
        <p>An automated publishing platform that transforms photo collections into professional, print-ready hardcover photobooks. Features intelligent AI-powered layout, golden ratio tiling (φ = 1.618), instant preview generation, and premium print quality.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: Next.js 14, Supabase (PostgreSQL), Cloudflare R2, Sharp, MediaPipe WASM, PDFKit</span></li>
        </ul>
        <TechnicalPreview src="/Professional/chatpak-mockup.png" alt="Chatpak Photobook Mockup" caption="AI-powered photobook design layouts." />
      </CollapsibleSection>

      <CollapsibleSection title="Rook Sensor — YOLO-based edge AI object detection">
        <p>An edge-computing surveillance and intelligence gathering pipeline designed to run on constrained hardware (Raspberry Pi). It serves as an SMS-based street monitoring device utilizing custom YOLO models for real-time object detection with low thermal overhead.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: Python, OpenCV, NCNN, Bash, Edge AI, YOLO</span></li>
        </ul>
        <TechnicalPreview src="https://raw.githubusercontent.com/Cook4986/rook-sensor/main/assets/architecture.png" alt="Rook Sensor Pipeline Architecture" caption="Rook object detection pipeline architecture." invert={true} pad={true} />
      </CollapsibleSection>

      <CollapsibleSection title="Scribble — Archival document OCR transcription platform">
        <p>An archival document transcription tool for non-technical researchers. It empowers users to transcribe and natively translate image-based document collections at scale. Researchers upload batches of archival photographs (JPEG, PNG, HEIC, PDF) and receive structured transcription packages via email.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: Next.js 15, FastAPI, Supabase, LLM APIs</span></li>
        </ul>
        <TechnicalPreview src="https://raw.githubusercontent.com/Cook4986/scribble/main/web/public/logo.svg" alt="Scribble Logo" caption="Scribble archival document transcription platform." invert={true} pad={true} />
      </CollapsibleSection>

      <CollapsibleSection title="SliceIT — Browser-based WebGL mesh processing WASM slicer">
        <p>A browser-based tool for slicing 3D meshes using boolean operations. Drop a model, pick a tool, press one button — done. Completely client-side with no installs or sign-ups required.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: React 18, Three.js, Manifold-3D</span></li>
        </ul>
        <TechnicalPreview src="https://raw.githubusercontent.com/Cook4986/SliceIT/main/Slice%20It.png" alt="Slice It Interface" caption="Browser-based mesh slicing." />
      </CollapsibleSection>

      <CollapsibleSection title="Digital Giza Twin — Level-of-Detail 3D spatial index map">
        <p>An interactive 3D Spatial Index for navigating the Digital Giza Corpus. It features a Level of Detail (LOD) system where landmarks scale by zoom, a click-to-explore tomb info panel, and dynamically scraped inline corpus media (photographs, maps, diaries).</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: React, Three.js, React Three Fiber</span></li>
        </ul>
        <TechnicalPreview src="/Professional/throughputAFrame_Cook2025.jpg" alt="Digital Giza Twin Interface" caption="Digital Giza Twin WebGL visualization pipeline." />
      </CollapsibleSection>

      <CollapsibleSection title="AutoTomb — Unity diary-to-3D pipelines and XR coordinate logger">
        <p>A pipeline that takes Digital Giza tomb pages and returns a set of AI-generated 3D models corresponding to ancient Egyptian object references mentioned in early 20th-century excavation diaries. It logs prompts, local outputs, and X,Y,Z coordinates for placing models in downstream XR environments.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: Python, Selenium, OpenAI API, UMAP, Meshy API, AFrame</span></li>
        </ul>
        <TechnicalPreview src="https://raw.githubusercontent.com/Cook4986/AutoTomb/main/autotombScreencap.png" alt="AutoTomb Unity Screencap" caption="AutoTomb generated models visualized in Unity." />
      </CollapsibleSection>

      <CollapsibleSection title="Nieto — Concurrent data scrapers of regional music event networks">
        <p>Automated information gathering pipeline focused on the experimental music scene across Germany, Austria, and Switzerland. Orchestrates concurrent data extraction and network mapping.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: Python, Apify, ETL pipelines</span></li>
        </ul>
        <TechnicalPreview src="https://raw.githubusercontent.com/Cook4986/nieto/main/header.png" alt="Nieto Network" caption="Experimental Music Network." />
      </CollapsibleSection>

      <CactusFooter />
      <div style={{ height: '40px' }} />
    </div>
  );
}
