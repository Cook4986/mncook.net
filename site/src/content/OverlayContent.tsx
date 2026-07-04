'use client';

/* OverlayContent renders Squarespace-migrated content. We intentionally
   use raw <img> and <iframe> (not next/image / next/iframe equivalents) so
   `output: 'export'` can fully prerender; and a few literal apostrophes
   inside captions are escaped at write time. The narrow disables below
   reflect those deliberate choices rather than masking unrelated bugs. */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import React, { useState, useEffect, useRef } from 'react';
import CollapsibleSection from '../components/ui/CollapsibleSection';
import { publications, fiction, bizarreBooks, songs } from './data';
// NOTE: RitualContent / RitualDossier temporarily removed — feature in
// development, not for production. The source lives in
// src/app/ritual/RitualExperience.tsx (currently orphaned) for easy restore.

const CactusFooter = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '60px 0 20px 0', opacity: 0.45 }}>
    <img src="/cactus-icon.png" alt="Cactus Mark" loading="lazy" style={{ width: '28px', height: 'auto', filter: 'brightness(0) invert(1)' }} />
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
        loading="lazy"
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

const ProjectName = ({ href, children }: { href: string, children: React.ReactNode }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    style={{ color: 'var(--ivory)', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px' }}
  >
    {children}
  </a>
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
    <img src={src} alt={alt} loading="lazy" style={{ maxWidth: '100%', height: 'auto', borderRadius: '6px', boxShadow: '0 12px 30px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }} />
    {caption && <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '12px', fontStyle: 'italic', padding: '0 10%' }}>{caption}</p>}
  </div>
);

const TextLink = ({ href, children }: { href: string, children: React.ReactNode }) => {
  const external = href.startsWith('http');
  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      style={{ color: 'var(--ivory)', textDecoration: 'underline', textUnderlineOffset: '3px' }}
    >
      {children}
    </a>
  );
};

const OverlayEmbed = ({ src, title }: { src: string, title: string }) => (
  <div style={{ margin: '2.5rem 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
    <iframe title={title} width="100%" height="100%" src={src} style={{ border: 0 }} allow="autoplay; fullscreen; xr-spatial-tracking" allowFullScreen loading="lazy" />
  </div>
);

const YearHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ivory)', textAlign: 'center', margin: '56px 0 28px' }}>
    {children}
  </h2>
);

const SectionHeading = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--ivory)', margin: '0 0 28px' }}>
    {children}
  </h2>
);

const OverlayRule = () => (
  <hr style={{ border: 'none', borderTop: '1px solid var(--rule-dark)', margin: '48px 0' }} />
);

export function SpatialContent() {
  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto', fontSize: '1.15rem', lineHeight: 1.75 }}>
      <p style={{ fontSize: '1.25rem', color: 'var(--ivory-dim)', fontStyle: 'italic', marginBottom: '16px', paddingLeft: '20px', borderLeft: '3px solid var(--accent)', lineHeight: '1.75' }}>
        “Wisdom sits in places. It’s like water and never dries up. You need to drink water to stay alive, don’t you? Well, you also need to drink from places. You must remember everything about them. You must learn their names. You must remember what happened at them long ago. You must think about it and keep on thinking about it. Then your mind will become smoother and smoother. Then you will see danger before it happens.”
        <br/><br/>
        — Chiricahua Apache horsemen
      </p>

      <OverlayRule />

      <ImageWithCaption src="/Spatial/Cave.webp" alt="Cave-like overhang on the side of Unnamed Mesa" caption="Cave-like overhang at ~4,700 ft above sea level and the object of our expedition." />

      <YearHeading>- 2015 -</YearHeading>

      <p style={{ marginBottom: '20px' }}>
        First, the good: <strong>We began cataloguing local flora/fauna (and geological formations)</strong> with a 10 mile hike centered on the exploration of a cave-like overhang, located at approximately 4,700 feet up the side of Unnamed Mesa.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Wildlife sightings were constant, and - although we finished the hike dog-tired - we considered the day's expedition a success. It was only upon returning to the property later that evening, after a nap near <TextLink href="https://en.wikipedia.org/wiki/Conchas_Lake">Conchas Lake</TextLink>, that things began to turn against us...
      </p>

      <ImageWithCaption src="/Spatial/Bull_Snake.webp" alt="Coachwhip snake atop Unnamed Mesa" caption="Eight-foot, tree-climbing Coachwhip (Masticophis flagellum), photographed atop Unnamed Mesa." />

      <p style={{ marginBottom: '20px' }}>
        When you're 50 miles from the nearest medical facility, clustering illusions ("bad news comes in threes") sometimes appear more than psychologically grounded. In this case, <strong>it was a trio of near misses that spurred fanciful conjecture of the most preposterous sort.</strong>
      </p>
      <p style={{ marginBottom: '20px' }}>
        We encountered our first threat during a routine trek from the nearest vehicle parking - off Magnolia, ~30 miles from Tucumcari - through an overgrowth of Cane Cholla (<em>Cylindropuntia imbricata</em>), Desert Spoon (<em>asylirion wheeler</em>), and Desert Prickly Pear (<em>Opuntia phaeacantha</em>). <strong>It was the Prickly Pear (sweet, but seedy) that sheltered our attacker.</strong>
      </p>
      <p style={{ marginBottom: '20px' }}>
        "Let's skirt this patch," I suggested, and proceeded to hook to the right of a ~6ft diameter, ankle-high growth of the fruity cactus. My cousin, noted pharmacological technician Sam Bender, retreated abruptly just as we cleared the patch.
      </p>
      <p style={{ marginBottom: '20px' }}>
        "<em>Oh Shit!</em>" - a near scream and altogether natural response accompanied my cousin's flight off the game trail.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>The first thing I perceived was the rattle</strong> - much louder than one might imagine, due, perhaps, to the relative size of the creature. Next, I saw it - a Western Diamondback Rattler (Crotalus atrox) - reared up hip-high and still rising from the edge of the cactus patch. The serpent was easily six feet long and as thick at its center as your biceps.
      </p>
      <p style={{ marginBottom: '20px' }}>
        It glared at us menacingly, less than a yard from where we first stood, ready to inject upwards of 800mg of hemotoxic venom, which - if left untreated - <TextLink href="http://www.toxinology.com/fusebox.cfm?fuseaction=main.snakes.display&id=SN0419">results in death 10-20% of the time.</TextLink>
      </p>

      <ImageWithCaption src="/Spatial/image-asset.webp" alt="Western Diamondback Rattler" caption="A similarly sized Western Diamondback Rattler (Crotalus atrox), encountered and photographed as we approached the property the day before." />

      <p style={{ marginBottom: '20px' }}>
        We both moved quickly at that point, turning and running diagonally in opposite directions away from the rattler. The quickness of that retreat, coupled with <strong>that notably aggressive species' to readiness strike, took me straight into the nearest Cane Cholla</strong>.
      </p>
      <p style={{ marginBottom: '20px' }}>
        The trip back to camp was mostly uneventful, although I limped slightly due to the dozen or so barbed spines embedded in my thigh just above the knee, and the tendency for my denim pants to rub against that wound made for an unpleasant quarter mile. But our adrenaline levels were understandably high at that point and we felt well-nigh invincible. A belt of bourbon later and I was down to my skivvies, tackling the Cholla spines one-by-one with the pliers on my trusty Leatherman. <strong>Surely the worst was over.</strong>
      </p>

      <ImageWithCaption src="/Spatial/Cholla.webp" alt="Cane Cholla cactus" caption="A Cane Cholla (Cylindropuntia imbricata) of the sort embedded in my thigh following our hasty retreat from the Diamondback rattler." />

      <p style={{ marginBottom: '20px' }}>
        We had thought our adventure complete for the night but a massive (un-forecast) cumulo-stratus thunderhead approached from the northeast shortly thereafter. <strong>60mph straight-line gusts encouraged gulps of 100 proof spirits</strong>, and, while I wouldn't recommend drinking in a survival situation, our tent was tied down, reinforced, and there was a darkening field of aggressive rattlesnakes between us and our only means of escape.
      </p>
      <p style={{ marginBottom: '20px' }}>
        The rain hit hard, as did the lightning, while accompanying thunder reverberated continuously off 360 degrees of Mesa. <strong>The sound approximated war-drums</strong> and those deep, bellowed chants encouraged our fear of the storm's electro-magnetic potential. Moreover, the downpour that eventually followed the gale-force gusts was so unfamiliar to the rocky top of our "mini-mesa" that much of the deluge <em>bounced</em> off the ground and back into the tent, effectively circumventing the rain flap.
      </p>

      <ImageWithCaption src="/Spatial/Storm.webp" alt="Storm over the mesa" caption="Rain and darkness in the distance." />

      <p style={{ marginBottom: '20px' }}>
        <strong>We awoke damp, slightly hungover, and enormously relieved.</strong> Quickly, we packed and headed back across the dreaded Cholla field, sticking as much as possible to the game trails that enmesh the area. Fully packed, then, we discussed the prospect of sugary drinks and ice in our water and protein in our diet.
      </p>
      <p style={{ marginBottom: '20px' }}>
        You see, at that point, nearly 24 hours had passed since anything but trail mix and whiskey (and water) were consumed. That fact may first appear silly, negligent even, but we had more food in our possession and simply anticipated a timely arrival at environs with broader culinary options. As it happens, <strong>our departure was <em>not</em> imminent</strong>.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Garita Creek was now flowing rapidly over the only graded road between us and civilization, and, while the silty water was only waist-deep, the clay mud threatened our humble city vehicle with temporary custody, during which <strong>the <em>next</em> summer storm would undoubtedly build up and wash us away along our remaining supplies.</strong>
      </p>
      <p style={{ marginBottom: '20px' }}>
        Fording the flooded creek simply wouldn't do, so we took a couple bites of trail mix and set off for help - three miles away, where the nearest neighbor was dug in to the high desert.
      </p>

      <ImageWithCaption src="/Spatial/image-asset (1).webp" alt="Flooded Garita Creek crossing" caption="Garita Creek crossing, where flash-flooding temporarily stranded us." />

      <p style={{ marginBottom: '20px' }}>
        Our last hope, short of hitchhiking back to Tucumcari for a tow, were Bill and Marge, <em>permanent</em> residents of the area, and generous owners of <strong>a two-ton truck that would eventually dragged our vehicle across the flash-flooded, high-desert creek crossing</strong>. We promised beer and steaks upon our return, arranged to enlist their water dowsing services when the time came to dig a well on Porcupine Ranch, and hit the paved state highway five miles later.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>In six hours were were back in Norman, and ice came easily from the fridge door, and beer was wonderfully cold, and the spider in the bathroom seemed innocuous rather than threatening</strong>. Did I mention we've already already laid out plans for our next expedition? Several cabins dot the valley between the Variadero and Unnamed Mesa, all built (with much labor, no doubt) from unfinished local stone. Artifacts dot the ground surrounding these early 20th century homesteads and the story of their inhabitants demands to be told.
      </p>

      <ImageWithCaption src="/Spatial/image-asset (2).webp" alt="Stone ruins of former settlers" caption="Stone ruins of former settlers (center right) - to be explored in subsequent expeditions." />

      <YearHeading>- 2016 -</YearHeading>

      <p style={{ marginBottom: '20px' }}>
        In Garita, folklore shapes perception just as readily as more established western religions implicitly shape the daily life in the city. Take the issue of water. As the Chihuahua desert creeps north, the average rainfall will continue to decline from an already low ~20 inches annually, and life - already difficult when sheepherder's abandoned their stone cabins to fight in WWII - will be harder to sustain. So, <strong>local practices like <em>water dowsing</em> will undoubtedly proliferate</strong> rather than die out. Where LTE doesn't reach, the sorts of seers and charlatans that characterized <TextLink href="https://en.wikipedia.org/wiki/Burned-over_district">the Burned-Over District</TextLink> command more influence than Google-scholar, and - sometimes - their methods work.
      </p>

      <ImageWithCaption src="/Spatial/image-asset (3).webp" alt="Sheepherder's stone cabin" caption="A sheepherder's stone cabin." />

      <p style={{ marginBottom: '20px' }}>
        But first, we <em>did</em> reach that stone cabin in the distance , and - perhaps more importantly - we've <TextLink href="/professional">3D scanned it for remote analysis</TextLink>. Using a series of high definition still images and a piece of Autodesk software now known as <em>Remake</em>, a surface mesh (with texual imagery superimposed) is now accessible to the general public, in virtual reality, at University of Oklahoma Libraries. <strong>Importantly, we can also take measurements, after the fact, by re-engaging with extremely detailed 3D models that no longer hide rattlesnakes.</strong> With ongoing evolution of low-cost drone equipment, and photogrammetric processing software, the entire Garita Valley can be surveyed and 3D mapped for virtual exploration from anywhere and with anyone.
      </p>

      <ImageWithCaption src="/Spatial/image-asset (4).webp" alt="Excavating a driveway" caption="Excavating a half-mile driveway." />

      <p style={{ marginBottom: '20px' }}>
        Also, we built a winding, half-mile long driveway, Essentially reclaiming a forgotten public easement that only ever existed on a (decidedly low-tech) 70's era surveyor's map. At that time, the nearby <TextLink href="https://en.wikipedia.org/wiki/Conchas_Dam">Concahs Dam</TextLink> - designed and built by the U.S. Army Core of Engineers - was still a going concern, and the resulting lake was supposed to support a community of "ranchos" that never materialized. <strong>Vehicle access allowed the property to function as a staging ground for an ambitious ascent of Variadero Mesa, whose red-hued battlements are sheer.</strong> From atop the mesa, you can see the extreme Southwest fingers of the 25 mile long lake.
      </p>

      <ImageWithCaption src="/Spatial/image-asset (5).webp" alt="Atop Variadero Mesa" caption="Atop Variadero Mesa, observing a conical stone formation to the Northeast." />

      <p style={{ marginBottom: '20px' }}>
        We completed the year with the installation of the first permanent shelter on the property, a "canned ham" travel trailer, complete with brown and orange racing stripes. Once in place, we were able to comfortably wait out the late-December cold. But there, tucked into our 20-degree-rated Marmot mummy bags, dreams of 100 roving tornados - encircling the trailer and stretching out across the Garita valley in every direction - haunted us. The next day a massive storm system swept in from the Northwest and shook the stilted trailer all night long. <strong>Next project?: A viewing deck <em>above</em> the trailer.</strong>
      </p>

      <ImageWithCaption src="/Spatial/file-1-3.webp" alt="Travel trailer on the property" caption="Our home on the property." />

      <YearHeading>-2017-</YearHeading>

      <ImageWithCaption src="/Spatial/image-asset (6).webp" alt="Dusk in the Garita valley" caption="Dusk in the Garita valley." />

      <p style={{ marginBottom: '20px' }}>
        Solar power, a full-sized bed (under roof), a fire-pit seating/cooking area, and a navigable road to the front door - <strong>These are some of the recent additions to the property that have made visiting Porcupine Ranch a relatively comfortable experience.</strong> (Water is still and issue, but, at an estimated ~$10,000 to hit the water table, we may be trucking in drinking/washing/cleaning water for some time to come). These "upgrades" have also brought into question our reasons for being out there, far from home.
      </p>

      <ImageWithCaption src="/Spatial/file.webp" alt="Interior of the trailer" />

      <p style={{ marginBottom: '20px' }}>
        The property was never about creature comforts, or fully recreating the at-home living experience in a place far away (e.g. pure escapism). I have to constantly remind myself (and our guests) that Porcupine Ranch mission "success" is defined by the briefest moments of purest contentment achieved just before sunset, or at dawn, <strong>when one removes blankets or boots from blistered feet and stares out across the dry Garita creek bed towards the exposed sandstone in the distance</strong>, climbing 300 feet up the side of unnamed Mesa. Pinks in the morning, deep reds and purples in the morning.
      </p>

      <ImageWithCaption src="/Spatial/Hideout1.webp" alt="Silva Gang hideout" caption="Silva Gang hideout - San Miguel County, New Mexico." />

      <p style={{ marginBottom: '20px' }}>
        <strong>Pinks in the morning, deep reds and purples in the evening</strong>. That's why we are here, right? To experience the color and the light and the shadowy contours lacking both that define - or begin to hint at - the New Mexican experience that has drawn traders and mystics and outlaws . Outlaws like Vicente Silva who was seen as a Robin Hood-type character by the Garita locals in his day, some of which still own property in the Mesalands between Tucumcari and Las Vegas, bordering the Canadian River. <strong>Did the Silva gang slow down to watch the sunset</strong> - did they emerge from their cave hideout at dawn to see the sun breach the top of the mesalands?
      </p>

      <ImageWithCaption src="/Spatial/silvagang.webp" alt="Vicente Silva and his gang" />

      <p style={{ marginBottom: '20px' }}>
        Light to read by and an old box fan to move the air during the heat of the 100+ degree summer days. <strong>That's not enough to be considered feature creep, surely.</strong> A cabin would be nice though, and an AC window unit, and maybe a stereo or electric guitar amp. But then the property would begin resembling the Conchas Lake State Park campsites, across the lake, where RV generators run all night, drowning out the owls, and the glow of sattelite tv sets diffuses through blackout blinds and drowns out the stars.
      </p>

      <ImageWithCaption src="/Spatial/01890005.webp" alt="Reading light in the trailer at night" />

      <YearHeading>-2018-</YearHeading>

      <ImageWithCaption src="/Spatial/IMG_1135.webp" alt="Pecos National Historic Park" caption="Pecos National Historic Park" />

      <p style={{ marginBottom: '20px' }}>
        I had the good fortune of visiting NM four times in 2018. Off the property, we hiked <TextLink href="https://en.wikipedia.org/wiki/Pecos_Wilderness">the Mora pass</TextLink> and the shore of the Rio Grande near Santa fa while, on the property, we constructed the first permanent structure: an outhouse(!). My <em>first</em> trip of the year, though, concerned a much more impressive construction. In still-bitter February, I set out to take part in <strong>a drone-based 3D scan of Pecos Pueblo</strong>.
      </p>

      <ImageWithCaption src="/Spatial/IMG_6818.webp" alt="Ruins of Pecos Pueblo" caption="The ruins of Pecos Pueblo not long after Lieutenant Abert’s curious account" />

      <p style={{ marginBottom: '20px' }}>
        Any early description of the Pueblo was penned by a Lt. Abert in September of 1846. He described how…
      </p>
      <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>
        The village of Pecos is famed for the residence of a singular race of Indians, about whom many curious legends are told. <strong>In their temples they are said to keep an immense serpent, to which they sacrificed human victims</strong>. Others say that they worshipped a perpetual fire, that they believe to have been kindled by Monteczuma.
      </p>

      <ImageWithCaption src="/Spatial/IMG_2305.webp" alt="Drone scanning at Pecos Pueblo" />

      <p style={{ marginBottom: '20px' }}>
        Climbers camouflaged across sheer rock faces; slithering things of regular size hidden directly beneath our feet. Yet signs of civilization remain across the high desert of the mountain west and the plains that undulate and then crack to meet it. <strong>Soon, we too will have shelter</strong>.
      </p>
      <p style={{ marginBottom: '20px' }}>
        But how? Roadbuilding was but a temporary success, and soon the land will reclaim our efforts. Same for the privy. Perhaps it’s better not to consider such transience, or, better, to embrace it. For the desert is dry, and trash that I wish had disintegrated long ago still blows across the mini mesa, strewn from abandoned habitation miles away. Let us not make the same mistake, when we do build. <strong>Let us vanish as we come</strong>.
      </p>

      <ImageWithCaption src="/Spatial/IMG_1120.webp" alt="Camouflaged climber on rock face" />

      <YearHeading>-2019-</YearHeading>

      <ImageWithCaption src="/Spatial/IMG_2027.webp" alt="Sabinoso Wilderness trailhead" />

      <p style={{ marginBottom: '20px' }}>
        In 2017, nearly <strong>30,000 acres of public land</strong> became accessible through the opening of public road access a mere 30 miles Northwest of the property. Seen from the trailhead off county road C51A, the <TextLink href="https://en.wikipedia.org/wiki/Sabinoso_Wilderness">Sabinoso Wilderness</TextLink> is a veritable canyon, comprising branching paths between mesas rising 5000 feet above sea level, coalescing above Trujillo into flat grazing that sprawls until the base of the Sangres at Las Vegas, NM, some 30 miles further West. It’s the edge of the plains, Sabinoso.
      </p>

      <ImageWithCaption src="/Spatial/IMG_4163.webp" alt="Sabinoso Wilderness canyon" />

      <p style={{ marginBottom: '20px' }}>
        Even with the easement, this land remains unapproachable. There are no amenities besides flattened dirt at the trail-head, which is itself hidden miles from a paved road, and few casual day hikers are comfortable opening and closing livestock fences, driving through streams and over sand , and leaving their vehicles atop a mesa while they venture down on foot, another thousand feet down. One has to have a reason to venture this far. <strong>Most likely, you will not see another vehicle or another soul</strong> at Sabinoso.
      </p>

      <ImageWithCaption src="/Spatial/image-asset (7).webp" alt="Sabinoso Wilderness landscape" />

      <p style={{ marginBottom: '20px' }}>
        We ditched the truck at the trailhead amidst pine and juniper and headed down the mesa, reaching the streambed and cholla patches in half an hour with our light packs. Then through the canyon, flat and 50 yards across, from one sheer sandstone wall to another. Peeking behind boulders and beneath outcroppings, we moved slowly, covering three or four miles in an hour before spotting a spine, which we would attempt to climb. My partner made short work of it. <strong>In denim and snake boots, I struggled</strong>. Beyond the spine was another canyon - a glimpse into denser wilderness. A future adventure…
      </p>

      <ImageWithCaption src="/Spatial/IMG_4202.webp" alt="Canyon floor in the Sabinoso Wilderness" />

      <YearHeading>-2020-2024-</YearHeading>

      <p style={{ marginBottom: '20px' }}>
        New Job, now house, new baby. COVID. Missed a year, which I hope will never happen again. Fortunately, we were back in ‘21, and every year since, despite the vast distances that separate the New England coast from the desert Southwest. We explore the nearby towns and cities, paying special attention to the vintage vehicles. A decade approaches.
      </p>

      <YearHeading>-2025-</YearHeading>

      <ImageWithCaption src="/Spatial/IMG_1453.webp" alt="The property, ten years on" />

      <p style={{ marginBottom: '20px' }}>
        This year marks <strong>10 years</strong> since development on “the property”/”Porcupine Ranch”/”mini mesa began in earnest. Of course I mean development in the broadest sense; more of the self-improvement than commercial variety, as evidenced by the scale and nature of actual structures on the land: A travel trailer and an outhouse. The truth is that the landscape itself - and time spent within it - make further development superfluous. Out there, the more you build, the less raw land you have, so <strong>development equals failure</strong>.
      </p>
      <p style={{ marginBottom: '20px' }}>
        But <strong>one still needs a “clean, well-lighted place”</strong> - a base of operations from which to launch expeditions, deeper into the evergreen fringes of alpine growth that rim the mesa edges, or down into the ravines that frame an ancient seabed, each filled with their own dangers (bodily harm, far from medicine or law enforcement; spiny, sharp, clawed, fanged adversaries). <strong>But the high-desert wilderness and its staggering, desolate beauty</strong> is merely a storybook mantra for an office worker with limited PTO.
      </p>
      <p style={{ marginBottom: '20px' }}>
        And so, a decade into this project, we’ve placed a humble cabin, complete with the <strong>vital sub-systems to sustain life in the desert southwest</strong>, while we plot and plan and otherwise dream of adventures that begin on the doorstep and extend to the dragonoid clouds that twist towards the south, mid-summer, threatening the same rains and floods that would have kept us away for days and weeks in years past.
      </p>

      <ImageWithCaption src="/Spatial/Untitled+(1).gif" alt="Animated view of the cabin" />

      <p style={{ marginBottom: '20px' }}>
        <strong>No rental vehicle is worth the inevitable damage</strong> wrought by mesquite and cholla and all manner of thorny shrub spring up between visits, and the two-track roadway now resembles a cow-path, 8 years since its construction. That leaves <em>powersports</em>. ATV, ATC, Dirt Bike, Side-by-Side, Quad Bike; culturo-mechanical mobility devices united by their utility. Two and four stroke engines bolted onto steel frames, open to the elements, but maneuverable (and forgiving) in a way that highway vehicles are not. Enter the now defunct dual-sport known in Asia as the “Serow”, the miniature deer of woodland Japan.
      </p>
      <p style={{ marginBottom: '20px' }}>
        On two, suspended wheels sporting a knobby tires and achieving triple digit MPG with minimal maintenance required on the (“bullet proof”) Yamaha engine, <strong>the range and scope of our vision has multiplied considerably</strong>. Add to that the water collection, solar array, insulation, wood stove, and emergency radio, and you have a base camp that can sleep 4+ adult humans indefinitely, or at least until things blow over. You can read, strum, shoot, or walk, in any direction, for many miles, until a particularly hearty cow fence outweighs your backcountry fatigue and you stumble home to sip whiskey.
      </p>

      <ImageWithCaption src="/Spatial/serowHero.webp" alt="Yamaha Serow dual-sport motorcycle" />

      <p style={{ marginBottom: '20px' }}>
        Where does that leave us, 10 years on? Think bigger: To host - family and friends ,of course, but also musicians, writers, and dirt bike racers. To uncover forgotten cemeteries, infiltrate cults, calm the local ghost population wandering from the time of Cortez and beyond, and study the sky for traces of the future. With our headquarters (and four stroke transportation) in place, anything goes. But first, the past. The recent past. Specifically, <strong>a 4208 mile road trip</strong>, fully loaded, from Melrose, MA, to Newkirk, NM.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Dramatic terrain as far as Ohio, all through Western New England, right across southern Pennsylvania, crossing briefly through West Virginia. Hills that are nearly mountains, lots of timber, intermittent rain. Hit a blown out truck tire on day 2. Then, green. <strong>Like a miniaturized jungle set a couple feet off the ground.</strong> Yucca, sunflower, mesquite, pinion pine, and those are only the ones I recognize. There are hundreds of species here when it’s wet, plants and animals, and the pasture looks like the Midwest, but spikier.
      </p>
      <p style={{ marginBottom: '20px' }}>
        A millipede dragon crossed the sky, threading the valley from 104 to the lake. Its spiky scales shot out laterally, while legs dangled in the form of rainfall tendrils from a dark belly line, water barely visible by the time it hit ground, but hit the ground it did, and flood it, making travel impossible along the dirt county road . The creature writhed in the sky above, not more than 1000 feet up was its serpentine torso, stretching southwest, towards a distant thunderstorm, which I knew was headed my way.
      </p>

      <ImageWithCaption src="/Spatial/dragonoid.webp" alt="Dragonoid storm cloud over the valley" />

      <p style={{ fontStyle: 'italic', color: 'var(--ivory-dim)', marginTop: '32px', textAlign: 'center' }}>
        Stop searching. Face the earth where you can. Literally speaking, it’s all you have to go on.
        <br/>- Richard Ford
      </p>

      <CactusFooter />
      <div style={{ height: '40px' }} />
    </div>
  );
}
export function TextualContent() {
  const shortFiction = fiction.filter(f => f.category === 'short');
  const novel = fiction.filter(f => f.category === 'novel');

  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>

      <CollapsibleSection title="Scholarship — Peer-reviewed journal papers">
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', lineHeight: '1.8' }}>
          {publications.map((pub) => (
            <li key={pub.url} style={{ marginBottom: '12px' }}>
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
          {shortFiction.map((story) => (
            <li key={story.title} style={{ marginBottom: '12px' }}>
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

      <CollapsibleSection title="Novel — Occult technology in the book stacks">
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', lineHeight: '1.8' }}>
          {novel.map((nov) => (
            <li key={nov.title} style={{ marginBottom: '12px' }}>
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
  const closeVideoRef = useRef<HTMLButtonElement>(null);

  // While the video lightbox is open, move focus to its close button and
  // let Escape dismiss it (dialog semantics for keyboard users).
  useEffect(() => {
    if (!activeVideo) return;
    closeVideoRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveVideo(null);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeVideo]);

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
          {bizarreBooks.map((episode) => (
            <div 
              key={episode.youtubeId} 
              role="button"
              tabIndex={0}
              aria-label={`Watch episode: ${episode.title}`}
              onClick={() => setActiveVideo(episode.youtubeId)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setActiveVideo(episode.youtubeId);
                }
              }}
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
            role="dialog"
            aria-modal="true"
            aria-label="Video player"
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
                ref={closeVideoRef}
                onClick={() => setActiveVideo(null)}
                aria-label="Close video"
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
                title="Bizarre Books Episode Video Player"
                width="100%" 
                height="100%" 
                src={`https://www.youtube-nocookie.com/embed/${activeVideo}?autoplay=1&wmode=opaque&enablejsapi=1`} 
                style={{ border: 0 }} 
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}
      </CollapsibleSection>

      <CollapsibleSection title="Songs — Muted, atmospheric ambient & dub tracks">
        {songs.map((song) => (
          <div key={song.src} style={{ marginBottom: '24px' }}>
            <p style={{ color: 'var(--ivory)', fontSize: '1.1rem', marginBottom: '8px' }}>{song.title}</p>
            <audio controls preload="none" style={{ width: '100%' }} src={song.src}></audio>
          </div>
        ))}
      </CollapsibleSection>

      <CactusFooter />
      <div style={{ height: '40px' }} />
    </div>
  );
}
export function ProfessionalContent() {
  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto', fontSize: '1.15rem', lineHeight: 1.75 }}>
      <p style={{ marginBottom: '16px', color: 'var(--ivory)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '1rem', lineHeight: '1.7' }}>
        As Digital Scholarship Program Manager for <TextLink href="https://library.harvard.edu/">Harvard Library</TextLink> (and, formerly, as Head of <TextLink href="https://libraries.ou.edu/content/edge">Emerging Technologies</TextLink> for the University of Oklahoma Libraries), I explore/develop/deploy tech for research and instructional purposes.
      </p>
      <p style={{ marginBottom: '16px', color: 'var(--ivory)', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '1rem', lineHeight: '1.7' }}>
        Below are a few examples. Please don't hesitate to <TextLink href="/contact">reach out</TextLink> to collaborate.
      </p>

      <OverlayRule />

      {/* --- 3DFrame --- */}

      <ImageWithCaption src="/Professional/3DF_testLogo3.webp" alt="3DFrame project logo" />

      <p style={{ marginBottom: '20px' }}>
        Deployed in virtual and augmented reality, 3D models provide the means for researchers and students to remotely experience diverse scholarly materials <em>first-hand</em>, though this content seldom finds its way into institutional repositories or peer-reviewed literature where it could be reused and cited. Currently, <strong>these methods are dispersed</strong>; an no single discipline, institution, or practitioner has yet to document a truly citable 3D curation method.
      </p>
      <p style={{ marginBottom: '20px' }}>
        The IMLS-funded <TextLink href="https://imls.gov/grants/awarded/lg-254830-ols-23">3D Research Data Curation Framework (3DFrame) grant</TextLink> is our attempt to conceptually unite interrelated - but administratively <em>disparate</em> - 3D data production, (immersive) analytics, and preservation methods, which combine to connect a range of computational processes. <strong>Our goal: ensure the scholarly rigor of 3D contents</strong>, thereby preserving these materials as credible (i.e., FAIR) primary sources for downstream citation by researchers across disciplines. Here’s 3DF so far…
      </p>

      <ImageWithCaption src="/Professional/UofU_3DF_8.webp" alt="3DFrame site visit at the University of Utah" />

      <p style={{ marginBottom: '20px' }}>
        <TextLink href="http://zacklischerkatz.com/">Professor Zack</TextLink> and I have been working on the issue of scholarly 3D/VR for about a decade, <strong>since the release of the Oculus DK1</strong>. Mainly, we’ve focused on getting VR out of the lab and into the classroom, specifically by providing <TextLink href="https://ital.corejournals.org/index.php/ital/article/view/11075">practical guidance and publishing on the instructional benefits</TextLink>. Increasingly, <em>content</em> has been the issue, not a lack of interest. However, academic rigor for 3D contents remains an issue.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Accessible scanning techniques like photogrammetry have partially solved the content problem, but <strong>the scholarly value of these outputs isn’t measurable</strong>. To address the question of curation, we’ve dedicated part of 3DF to studying the-state-of-the-3D-production art, across academic and cultural heritage institutions, and another part (specifically, research question 4) to understanding the potential impact of quality control methods for 3D content in immersive viewing environments.
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>Everyone is doing 3D scanning and viewing a little differently,</strong> depending on their training, discipline (and budget), home institution mission, and no one is quite sure what constitutes a “good” model at the end of the day . So, we must first understand what’s currently being done, and why…
      </p>

      <ImageWithCaption src="/Professional/UMass_3DF_2.webp" alt="3DFrame site visit at UMass Amherst" />

      <p style={{ marginBottom: '20px' }}>
        At the core of 3DF is <em>travel</em>. <TextLink href="https://imls.gov/sites/default/files/project-proposals/lg-254830-ols-23-full-proposal.pdf">The narrative</TextLink> specifies a range of 3D scanning lab types, where the research team will observe, interview, and test current and future (XR-enhanced) workflows. Insofar as we are most interested in the quirks and idiosyncrasies, you can think of <strong>this approach as a sort of <em>ethnography</em></strong>. That is, we seek the sort of secret knowledge that disproportionally inform immature data types like 3D. Science and Technology Studies (STS), whose researchers have studied knowledge creation in weather centers and <TextLink href="https://www.ida.liu.se/~729G12/mtrl/professional_vision.pdf">on research vessels</TextLink> is a useful reference.
      </p>
      <p style={{ marginBottom: '20px' }}>
        The Irshick Lab and its <TextLink href="https://digitallife3d.org/">DigitalLife3D</TextLink> project was our first stop in our mission to document the messy true story of 3D data production. There, at UMASS in the spring of 2024, we were given <strong>a behind-the-scenes look at both the methods and challenges associated with live animal scanning</strong>. Then, in February, we spent a week at Utah, witnessing contrasting end user communities representing public libraries (SLCPL) and flagship universities (UofUtah). Next will be sites geared towards tomographic (e.g., MicroCT) capture, large-scale plant science, and - at one of our home bases in Cambridge, MA - photogrammetric cultural heritage preservation.
      </p>
      <p style={{ marginBottom: '20px' }}>
        By the end of the grant period (2026) we anticipate visiting upwards of 10 distinct institutions, ranging from public universities, to the Ivy League, to cultural heritage institutions (i.e., museums). This diversity of research data will let us <strong>triangulate and then publish on the state and trajectory of 3D data curation</strong>, before extrapolating scalable methods that might help future practitioners, whatever their discipline or institution type. Immersive viewing is central to our forward thinking deliverables…
      </p>

      <ImageWithCaption src="/Professional/RQ4_3DF_3.webp" alt="Immersive quality control experiment for research question 4" />

      <p style={{ marginBottom: '20px' }}>
        Getting back to research question #4 (RQ4), we have a viable protocol and promising early participant data <strong>comparing the performance of immersive and “flat” (traditional display-based) viewing experiences for 3D future quality control workflows</strong>. The experiment we’ve developed to gather this data begins this prompt:
      </p>
      <p style={{ marginBottom: '20px', fontStyle: 'italic' }}>
        Today you will be conducting quality control on 3D models. Momentarily, you will be prompted with a fictional scenario and asked to respond to a question. It is important that you limit your verbal response to "yes" or "no" only. Do you understand? We will now begin with a practice scenario.
      </p>
      <p style={{ marginBottom: '20px' }}>
        From there, <strong>participants are presented with a series of scenes and scenarios, each of which represents quality issues commonly encountered by 3D practitioners</strong>. Questions of mislabeling, feature identification, data loss, and resolution are all posed, and a combination of self-reported (cognitive load and usability) and performance (time and accuracy of task completion) data-gathering methods are deployed.
      </p>

      <ImageWithCaption src="/Professional/MattZackJosh_3DF_2024.webp" alt="Matt, Zack, and Josh during 3DFrame fieldwork, 2024" />

      <OverlayRule />

      {/* --- Longhand --- */}

      <SectionHeading>Longhand</SectionHeading>

      <ImageWithCaption src="/Professional/longhandThrougput_updated.webp" alt="Longhand processing pipeline throughput diagram" />

      <p style={{ marginBottom: '20px' }}>
        <TextLink href="https://github.com/caltechlibrary/handprint">Computational workflows</TextLink> can generate machine-actionable data from “raw” (e.g. handwritten) textual source material, allowing the search of vast material collections. But while a keyword search is a useful way to collate and confirm hypotheses, it assumes the researcher has some ideas about where to begin; some existing research questions. <strong>Keyword search results don’t reveal the nature of a corpus</strong> as a whole though, nor do they represent the relationships between tokens whose source material might span media, time, or location.
      </p>

      <ImageWithCaption src="/Professional/Longhand_gif_AmazingStories_AdobeExpress.gif" alt="Longhand 3D word cloud animation" />

      <p style={{ marginBottom: '20px' }}>
        <strong>So, how might one <em>glimpse</em> the contents of a text corpus</strong>, to generate preliminary research questions that might inform downstream search and more sophisticated analyses related to topics, sentiments, parts of speech, or named entities? Visualization – charts, graphs, diagrams, word clouds, etc. – are helpful at this <em>exploratory</em> research stage, when a researcher is simply trying to grasp the contents of a text corpus. This is where Longhand comes in.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Longhand is a word cloud generator, but the “words” are 3D models projected in 360 degrees around the user. <strong>Longhand exists to explore unwieldy text corpora (including in virtual reality)</strong> earlier in the research lifecycle. In addition to exposing text-centric researchers to the historically STEM-oriented benefits of Reality (e.g. depth cues, body tracking, etc.). Longhand leverages our, “…ability to rapidly report object identiy or category after just a single brief glimpse of visual input” (<TextLink href="https://www.sciencedirect.com/science/article/abs/pii/S1364661307001593">DiCarlo &amp; Cox, 2007</TextLink>).
      </p>
      <p style={{ marginBottom: '20px' }}>
        Check out some preliminary test results, below, and <TextLink href="https://github.com/Cook4986/Longhand">the GitHub repo</TextLink> for more.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', margin: '2.5rem 0' }}>
        {[
          ['ScienceInKitchen_reduced.jpg', 'Longhand test result: Science in the Kitchen'],
          ['Religion.jpg', 'Longhand test result: Religion'],
          ['EvidenceLocker.png', 'Longhand test result: Evidence Locker'],
          ['UFO4.png', 'Longhand test result: UFO'],
          ['JRC_nouns.png', 'Longhand test result: JRC nouns'],
          ['ArmyCookbook3.jpg', 'Longhand test result: Army Cookbook'],
          ['Screen Shot 2023-02-24 at 10.02.14 AM.png', 'Longhand test result: screenshot'],
        ].map(([file, alt]) => (
          <img
            key={file}
            src={`/Professional/longhand-gallery/${file}`}
            alt={alt}
            loading="lazy"
            style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.1)' }}
          />
        ))}
      </div>

      <OverlayRule />

      {/* --- Widener 360 --- */}

      <SectionHeading>Widener 360</SectionHeading>

      <ImageWithCaption src="/Professional/WidenerScan1_Cook2020.webp" alt="Isometric view of the Widener Library 3D scan" caption="Isometric perspective, with expanded annotation (featuring historical imagery), on the Matterport-hosted Widener Library 3D scan." />

      <p style={{ marginBottom: '20px' }}>
        Given the increasing size and complexity of research data generally, and the recent advancement of scanning and visualization methods specifically (e.g. photogrammetry and virtual reality), <strong>3D data has the potential to become the asset “of record,” or primary source material, for researchers in a wide range of academic disciplines.</strong> Moreover, this content can be produced for objects of study at various scales, including large-scale facilities, like Harvard’s very own Widener Library.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Among other applications, digitized library facilities can host virtual visits for non-affiliates, who would typically not be allowed inside private libraries like Widener. <strong>This “virtual tours” scenario was our initial motivation</strong> for the Widener 360 project, which relied on local experts at <TextLink href="https://archimedes.digital/">Archimedes Digital</TextLink> - and the increasingly popular Matterport scanning/hosting platform - to generate interactive 360 views for some (but not all) of our most iconic interior spaces.
      </p>

      <OverlayEmbed src="https://my.matterport.com/show/?m=fs3gQv7n1QG" title="Widener Library 3D tour" />

      <p style={{ marginBottom: '20px' }}>
        But, as we began annotating the scan with historical imagery, links to Harvard Library materials, and historical information concerning <TextLink href="https://en.wikipedia.org/wiki/Julian_Abele">the inspiring architectural history of the building</TextLink>, we began to understand the <em>linked data</em> implications of these virtual facilities. With Widener 360, our stunning architecture functions as a sort of visual index for collections, services, and history. Given the scale of the facility, there’s plenty of virtual space within which to deploy multimedia content. Indeed, <strong>one can even <em>hide</em> content (i.e. easter eggs)</strong> as we managed to do through a Spotify integration, which allowed for in-browser audio associated with Professor Lepore’s new <TextLink href="https://www.thelastarchive.com/"><em>The Last Archive</em> Podcast</TextLink>.
      </p>

      <ImageWithCaption src="/Professional/image-asset.webp" alt="Spotify podcast embed inside the Widener scan" caption="Spotify-hosted podcast “hidden” in the book stacks. The podcast can be played in the browser." />

      <p style={{ marginBottom: '20px' }}>
        We’ve seen an encouraging number of site visitors to the tour page in the few months since it has gone live, and <TextLink href="https://www.atlasobscura.com/articles/7-libraries-you-can-visit-from-home">I imagine other libraries are seeing similar uptake</TextLink>. These scans also represent an online media type that transcends the traditional wall-of-text, the “Brady Bunch” call experience (e.g. Zoom), and the YouTube rabbit holes, all of which we are now experiencing ad nauseam. 3D content, like the Widener 360 tour, is a <strong>spatialized experience that is a very familiar aspect of our offline lives.</strong>
      </p>
      <p style={{ marginBottom: '20px' }}>
        Importantly, these content types also supports stereoscopic, VR viewing (by clicking the little headset icon on the lower right portion of the screen), for example, and, once headset hardware becomes more common - say, with the release of the Apple glasses - and XR web architecture is standardized (<TextLink href="https://medium.com/@gfodor/the-secret-mozilla-hubs-master-plan-2c1364033bec">as per Mozilla</TextLink>), we will reach a point where remote visitors can engage with this content <em>bodily</em> as well. That is, <strong>users will be able to physically walk through virtual scans of spaces - in the company of fellow students and instructors.</strong>
      </p>

      <ImageWithCaption src="/Professional/Widener360_Blender.webp" alt="Widener scan data in Blender" caption="Decimating and cropping Widener scan data for use in shared online environments, like Mozilla’s Hubs platform." />

      <OverlayRule />

      {/* --- Instructional chess --- */}

      <SectionHeading>Instructional chess</SectionHeading>

      <ImageWithCaption src="/Professional/KnightBuild1.webp" alt="Modeling the knight in Oculus Medium" caption='Using Oculus Medium&apos;s "Clay" tool to model the knight piece' />

      <p style={{ marginBottom: '20px' }}>
        <strong><em>Motivations</em></strong>
      </p>
      <p style={{ marginBottom: '20px' }}>
        There are an estimated 600 million chess players worldwide and a diverse body of <TextLink href="https://www.researchgate.net/profile/Ayperi_Dikici_sigirtmac/publication/254229238_Does_chess_training_affect_conceptual_development_of_six-year-old_children_in_Turkey/links/566e95c908ae430ab5002c10.pdf">peer-reviewed literature</TextLink> speaks to the benefits of learning the game, especially for children. Indeed, some of the most compelling research involves <strong>young children (as young as 4), whose spatial concept awareness was strengthened after chess training.</strong>
      </p>
      <p style={{ marginBottom: '20px' }}>
        At the beginning of the summer (2017), I set a personal goal: To sculpt something each week in VR then attempt a 3D print of that work. Basically, I wanted to test what would print and what wouldn't - to see where the freedom of sculpting in a virtual environment ran up against the reality of FDM printing.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Well, I'm a pretty helpless as visual artist, but the combination of that regularly scheduled activity, and a simultaneous series of chess games with friends and family, gave me an idea: An instructional chess set to help with early childhood chess instruction and engender associated benefits (spatial skills).
      </p>

      <ImageWithCaption src="/Professional/Chess_Sketch1.webp" alt="Notebook sketch of chess piece designs" caption="Brainstorming instructional chess piece design in my pocket notebook." />

      <p style={{ marginBottom: '20px' }}>
        <strong>VR Modeling</strong>
      </p>
      <p style={{ marginBottom: '20px' }}>
        Complete blindness to the goings-on in your physical surroundings is both a strength and a weakness of virtual reality. First, the bad: complete eye coverage makes people uncomfortable, especially in public spaces, where a hand on your shoulder can't be predicted and is seldom appreciated. The <em>benefits</em> of complete immersion may well counterbalance this perceived vulnerability, however. Insofar as approachable game design software (e.g. Unity, Unreal, etc.) makes crafting unique VR experiences a single-person endeavour, <strong>scholars - instructors in particular - can leverage this real-world obliviousness to strip away distraction and present to the learner only that content deemed relevant</strong>. VR modeling software, like Oculus Medium, is a great example of mostly beneficial full immersion.
      </p>
      <p style={{ marginBottom: '20px' }}>
        The human mind is beholden to the human body, and specific anatomical axis- of limb and head/foot orientation, for example - constrain not just our movement, but <TextLink href="https://plato.stanford.edu/entries/embodied-cognition/">our thoughts as well.</TextLink> But what if we stripped away the visual cues associated with parallel physical constraints like gravity, or the horizon line, and were able to create a workspace in a vacuum, a deeps-space studio? <strong>Now, imagine if all your making tools were within reach, simultaneously, regardless of their mechanical complexity.</strong> By customizing the sculpting environment and dedicating time to familiarizing yourself with the variety of tools available to the user instantaneously, one can quite quickly inhabit a creative environment where the medium itself (virtual "clay", in this case); the environment within which that medium is modified; and the tools for modification are all divorced from the constraints of analogous physical counterparts.
      </p>
      <p style={{ marginBottom: '20px' }}>
        This is this conceptual context within which I imported <TextLink href="https://www.thingiverse.com/thing:378322">existing</TextLink> (and freely available ) CAD chess models for reinvention within Oculus Medium. After diagramming, in a paper notebook, some movement concepts, I sat down to model each piece in virtual reality. I began with the knight - the crux of the instructional chess "problem" - and moved on from there. <strong>After approximately 10 hours of in-headset design time, I had a prototype of an entire chess set</strong>. While it may sound like a relatively low number, this sort of engagement was only practically possible given the <TextLink href="https://en.wikipedia.org/wiki/GeForce_10_series">10-Series NVidia GPU</TextLink> currently powering VR in my Alienware 15 work laptop. To hit framerate targets for comfortable, long-term VR, this late generation hardware is an absolute must. Indeed, the combination of 1070/1080 grade graphics processing hardware and software like Medium represents - to my mind - the first in what will be a suite of "productivity grade" VR applications. Next step: 3D Printing this first design...
      </p>

      <ImageWithCaption src="/Professional/giphy+(1).gif" alt="Animated knight design in VR" caption="Early knight design demonstrating the flexibility of VR modeling." />

      <p style={{ marginBottom: '20px' }}>
        <strong>Prepping and Printing</strong>
      </p>
      <p style={{ marginBottom: '20px' }}>
        While it's a clear step towards a VR-based rapid prototyping solution, Medium isn't a full-fledged CAD solution.Rather, Medium is an artistic outlet that can be co-opted (so to speak) for downstream output that resembles products rather than sculpture. <strong>Straight line design tools; real-world scaling; and associated measurement capabilities are all noticeably lacking</strong>, and some model cleanup - outside a VR design environment - is therefore necessary prior to 3D printing. To level the piece bases and close any remaining "cracks" in the pieces, for example, I passed each through Autodesk's <TextLink href="http://www.meshmixer.com/"><em>Meshmixer</em></TextLink> application. Fortunately, Meshmixer - as well as the CURA slicing program we use to generate gcode for our Lulzbot printers - is a freely available.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Next, it was time to 3D print the first physical instantiation of Instructional Chess. To print an entire side (since I would have to print each side in a different color) required approximately <strong>34 grams of PLA filament for a CURA-estimated 300 minute 3D print</strong>. That's sixteen pieces - eight pawns and eight back rank pieces. As of now, I've iterated about four times on the models that comprise a full, printed side of Instructional Chess.
      </p>
      <p style={{ marginBottom: '20px' }}>
        The first semi-successful print revealed a host of issues. Most noticeable was the disproportional scaling between the traditional, centered reference pieces, and the modeled directional cues, which printed much larger than then appeared in virtual reality. Indeed, <strong>it was exceedingly difficult to identify differences between the bishop and the rook, for example, so it was "back to the (virtual) drawing board" for a relative re-scaling of this piece components.</strong> Another major, continuing issue is the knight, which has raised arches to represent the jumping ability of the pieces and a somewhat hooked head, both features that require support material. My next goal is to revisit the knight design, in Oculus Medium, and see if <TextLink href="https://developer.oculus.com/blog/medium-under-the-hood-part-1-developing-the-move-tool/">the newly developed "Move Tool"</TextLink> can be used to connect the knights head to its body - sort of natural support workaround. I believe the entire set can be printed <em>without support material</em> if the knight could be fixed.
      </p>

      <ImageWithCaption src="/Professional/image-asset.gif" alt="Chess piece printing on a LulzBot Mini" caption="Early instructional chess prototype printing on LulzBot Mini" />

      <p style={{ marginBottom: '20px' }}>
        <strong>What's Next?</strong>
      </p>
      <p style={{ marginBottom: '20px' }}>
        Print out a set for yourself! <TextLink href="https://skfb.ly/6wCHW"><strong>The complete Instructional Chess 3D model set</strong></TextLink><strong> is downloadable from Sketchfab (for free)</strong>, and I'll be posting 3D printing instructions shortly, to ensure your set prints cleanly and efficiently. Importantly, libraries - of all sorts - offer 3D printing services, which you can use to create your own Instructional Chess set. Just consult <TextLink href="https://www.google.com/maps/d/u/0/viewer?mid=1plLHXcVgwR2Ide4U1Ipl4dknZVU&hl=en_US&ll=17.266592752140593%2C-129.61664684999994&z=3">this handy map</TextLink>, load the Sketchfab model files onto a flash drive, and you are ready to start teaching/learning the game. Looking forward to hearing your feedback and iterating on this design.
      </p>

      <OverlayEmbed src="https://sketchfab.com/models/6b7f539e814c417a8f02c12eef887271/embed" title="Instructional Chess - Bishop" />

      <OverlayRule />

      {/* --- Sparq --- */}

      <ImageWithCaption src="/Professional/image-asset (1).webp" alt="Sparq meditation labyrinth" />

      <p style={{ marginBottom: '20px' }}>
        The Sparq labyrinth is an interactive meditation tool. With a <TextLink href="http://i.imgur.com/65hEd1x.jpg">touch-screen interface</TextLink>, the Sparq user selects from a variety of culturally significant <TextLink href="https://www.google.com/search?q=meditation+labyrinth&tbm=isch">labyrinth patterns</TextLink> and then engages (i.e. walks, performs yoga, or even dances) the projected pattern to attain <TextLink href="http://www.normantranscript.com/headlines/x601933946/Sparq-Labyrinth-meditation-tool-helps-computer-users-relax">a refreshing connection</TextLink> to the moment. This <strong>five-minute <TextLink href="http://www.psychologytoday.com/blog/compassion-matters/201303/benefits-mindfulness">mindfulness</TextLink> technique</strong> requires no training, and has been <TextLink href="http://works.bepress.com/donna_zucker/19/">linked to</TextLink> decreases in systolic blood-pressure and increased quality of life, which makes the Sparq the perfect wellness solution for your <TextLink href="http://www.wired.com/business/2013/06/meditation-mindfulness-silicon-valley/all/">stressful workplace</TextLink>.
      </p>
      <p style={{ marginBottom: '20px' }}>
        How can we be sure? Because <strong>the Sparq has been deployed across the nation in a diversity of different settings</strong>. Indeed, everyone from academic researchers (and stressed out students) - at the <TextLink href="https://www.umass.edu/newsoffice/article/du-bois-library-installs-sparq-meditation">UMass Amherst</TextLink>, the <TextLink href="http://www.normantranscript.com/news/local_news/sparq-labyrinth-meditation-tool-helps-computer-users-relax/article_81d1217a-8a5c-5657-8455-5f69fa8c3d98.html">University of Oklahoma</TextLink>, Concordia University, and <TextLink href="http://www.osu-tulsa.okstate.edu/news/details.php?id=1372">Oklahoma State University</TextLink> - to <TextLink href="http://artoutside.org/">Art Outside</TextLink> festival goers; to Nebraskan wine tasters have experienced the benefits of this interactive mindfulness tool.
      </p>

      <ImageWithCaption src="/Professional/image-asset (2).webp" alt="Sparq labyrinth in use" />

      <p style={{ marginBottom: '20px' }}>
        The Sparq provides for a uniquely personal meditation experience. With <strong>touch-screen access to a variety of patterns</strong> - each representing a distinct cultural heritage - the Sparq users connect with history while reconnecting with themselves.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Unlike traditional labyrinth installations, <strong>the Sparq is mobile and (after the components have shipped) it can be set up in about an hour</strong>. This ease of installation, combined with the stunning beauty of the projected patterns, makes the Sparq a wellness solution suitable for nearly any workplace
      </p>

      <ImageWithCaption src="/Professional/image-asset (3).webp" alt="Sparq labyrinth projection" />

      <p style={{ marginBottom: '20px' }}>
        The Sparq provides for a uniquely personal meditation experience. With <strong>touch-screen access to a variety of patterns</strong> - each representing a distinct cultural heritage - the Sparq users connect with history while reconnecting with themselves.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Ready for a Sparq? <TextLink href="/contact">Contact me</TextLink>, and I'll make available tons more information about the thinking/motivation behind the Sparq, links to documented benefits, and instructions concerning <strong>how to set up the system at your institution</strong>. Then you can experience for yourself the myriad benefits of the Sparq meditation labyrinth.
      </p>

      <ImageWithCaption src="/Professional/image-asset (4).webp" alt="Sparq hardware" />

      <p style={{ marginBottom: '20px' }}>
        In Pima &amp; Papago (native American) cultures the design below represents "Siuu-hu Ki" - "Elder Brother's House". Legend has it that, after exploiting the village, the mythical Elder Brother would flee, following an especially devious path back to his mountain lair so as to make pursuit impossible. <strong>Elder Brother's House is one of several culturally significant labyrinth patterns which lend a powerful gravity to the overall Sparq experience</strong>.
      </p>

      <ImageWithCaption src="/Professional/image-asset (5).webp" alt="Elder Brother's House labyrinth pattern" />

      <OverlayRule />

      {/* --- Hypnose --- */}

      <SectionHeading>"Hypnose" - Rapid Prototying project</SectionHeading>

      <ImageWithCaption src="/Professional/image-asset (6).webp" alt="Historical clock illustrations" caption="Bruton, Eric. Clocks & Watches. New York: Hamlyn Publishing Group, 1968." />

      <p style={{ marginBottom: '20px' }}>
        OU Libraries' new makerspace/fab lab/incubator <TextLink href="http://libraries.ou.edu/edge">Innovation @ the EDGE</TextLink> is centered on the idea that <strong><em>demystification</em> of emerging technology is critical non-STEM engagement.</strong> Since my academic background is in the humanities (philosophy), a demonstration of rapid prototyping that takes inspiration from our large collection seemed important. Hence, <strong>the Hypnose smell-clock - a mostly 3D printed prototype</strong> that incorporated microcontroller components, and programming, inspired by the sorts of historical examples described in History-of-Timekeeping texts found in the book stacks (as above).
      </p>

      <ImageWithCaption src="/Professional/image-asset (7).webp" alt="Bronze head of Hypnos" caption="Bronze Head of Hypnose from Civitella d'Arna" />

      <p style={{ marginBottom: '20px' }}>
        The original motivation for the Hypnose was simple: there are problems associated with waking up and checking one's smartphone to figure out if it is indeed time to wake up! Of course, alarms are a solution, although they aren't necessarily a pleasant way to start your day. Moreover, there are temptations (e.g. social media) associated with picking up your phone in the middle of the night. <strong>How to avoid the phone, then, and still get up for work in time?</strong> Why not train myself to subconsciously to wake up on time by associating different phases of my sleep cycle with distinct scents?
      </p>

      <ImageWithCaption src="/Professional/image-asset (8).webp" alt="Stepper motor wiring diagram" caption="https://www.sparkfun.com/tutorials/400" />

      <p style={{ marginBottom: '20px' }}>
        This implementation used an Arduino Uno along with a SparkFun motor shield to power a stepper motor via a wall outlet. The precise rotational control provided by a stepper motor (as opposed to a torque-heavy <em>servo</em>) allows the below code to <strong>"jump" a measuring spoon - containing a small amount of scented wax melt - to a position directly above a heat lamp</strong>. This jump is programmed to occur every hour (3,600,000 miliseconds in Arduino code time), which can be easily doubled to cover an 8-hour sleep cycle, given four spoons. A certain wax melt, then, would always correspond to the final two hours before one awakes. I will undoubtedly come to dread that smell!
      </p>

      <pre style={{ margin: '2.5rem 0', padding: '20px', background: 'rgba(255,255,255,0.03)', borderRadius: '8px', border: '1px solid var(--rule-dark)', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.5, color: 'var(--ivory-dim)' }}>
{`int dirpin = 2;
int steppin = 3;

void setup()
{
pinMode(dirpin, OUTPUT);
pinMode(steppin, OUTPUT);
}
void loop()
{

  int i;

  digitalWrite(dirpin, LOW);     // Set the direction.
  delay(3600000);


  for (i = 0; i<400; i++)       // Iterate for 4000 microsteps.
  {
    digitalWrite(steppin, LOW);  // This LOW to HIGH change is what creates the
    digitalWrite(steppin, HIGH); // "Rising Edge" so the easydriver knows to when to step.
    delayMicroseconds(1000);      // This delay time is close to top speed for this
  }                              // particular motor. Any faster the motor stalls.

}`}
      </pre>

      <ImageWithCaption src="/Professional/image-asset (9).webp" alt="Hypnose assembly modeled in Sketchup" />

      <p style={{ marginBottom: '20px' }}>
        The assembly, originally modeled in Sketchup (above), takes its cue from <strong>a 1st century bronze sculpture discovered in central Italy.</strong> According to <TextLink href="https://en.wikipedia.org/wiki/Hypnos">Wikipedia</TextLink>, Hypnos' cave had no doors or gates, lest a creaky hinge awake him. It seems we both faced similiar problems. Also, this ancient realization of the greek god of sleep, conveniently lacked eyes, which are actually holes in the sculpture. My thinking was that the scent could vent from those holes with the aid of a small computer fan, although the final prototype uses Hypnos as more of an aesthetic choice.
      </p>

      <ImageWithCaption src="/Professional/image-asset (10).webp" alt="3D printed Hypnose face" />

      <p style={{ marginBottom: '20px' }}>
        The Hypnose "face" - an amalgamation of a free, low-poly mask model found online and a set of wings, scaled and rotated - ultimately took close to 8 hours (and 3 tries) on our Makerbot printer, but <strong>the finished prototype works more or less perfectly</strong>. More importantly, OU Libraries now offers <TextLink href="http://libcal.ou.edu/calendar.php?cid=2267&t=d&d=0000-00-00&cal%5B%5D=2267">free training</TextLink> on all the tech associated with this project, so those once-intimidated humanities majors (like myself) can leverage that creativity they are known for, inspired perhaps by source material in our collection, to design and deploy their own creations.
      </p>

      <ImageWithCaption src="/Professional/image-asset (11).webp" alt="Finished Hypnose prototype" />

      <OverlayRule />

      {/* --- NavApp --- */}

      <ImageWithCaption src="/Professional/image-asset (12).webp" alt="NavApp wayfinding in Bizzell Memorial Library" />

      <p style={{ marginBottom: '20px' }}>
        We are in a second proof-of-concept stage for a mobile app that <strong>guides users through large indoor while providing a plethora of location-based info and relevant push notifications (e.g. events, technology tutorials, etc.) along the way</strong>. The ongoing OU libraries-based pilot program has paved the way for a campus wide rollout of this cutting edge technology. This tier two launch coincides with the <em>Galileo’s World</em> exhibition, which debuted in August of 2015. The tool now provides:
      </p>
      <ul style={{ marginBottom: '20px', paddingLeft: '24px' }}>
        <li style={{ marginBottom: '8px' }}>Integration of Online/offline University of Oklahoma user experience by providing real-time, turn-by-turn navigation.</li>
        <li style={{ marginBottom: '8px' }}>Delivery of hyper-local contents, corresponding to the users location with respect to campus resources both indoors and out.</li>
        <li style={{ marginBottom: '8px' }}>Powerful analytics capabilities, which allow for the analysis of space/service/technology usage throughout navigable areas.</li>
        <li style={{ marginBottom: '8px' }}>Various associated utilities to assist disabled users as well as aid in emergency situations.</li>
      </ul>

      <OverlayEmbed src="https://www.youtube.com/embed/tTpuYP1of1I" title="OU Libraries NavApp" />

      <p style={{ marginBottom: '20px' }}>
        People tend to refer to the central routing feature as “indoor GPS”. It’s accurate at up to a meter and it fulfills a goal we started focusing on early last year: <strong>simplify an extraordinarily complex physical environment.</strong>
      </p>
      <p style={{ marginBottom: '20px' }}>
        <TextLink href="https://en.wikipedia.org/wiki/Bizzell_Memorial_Library">Bizzell</TextLink>, after all, is huge – and filled with services (some of which I’m barely familiar with myself). <strong>What we didn’t want</strong>, then – and is something I've seen personally - is a senior level undergraduate proudly proclaiming that they are using our facilities for the first time.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Basically, our aim from the beginning was to put an end to the intimidation factor that new students might feel when visiting the library for the first time while at the same time making our diverse services visible to visitors using <strong>an increasingly prevalent piece of pocket-sized hardware, the Smartphone.</strong>
      </p>

      <ImageWithCaption src="/Professional/image-asset (13).webp" alt="NavApp interface screenshots" />

      <p style={{ marginBottom: '20px' }}>
        At the end of the 2015/16 academic year – the first semester where the NavApp was available for (free) public download – ~<strong>2,000+ unique users had downloaded and engaged with this innovative wayfinding tool</strong>. Indeed, our engagement factor was particularly encouraging with back-end analytics indicating that, on average, individual users accessed more than 16 in-app screens.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Finally, <TextLink href="http://www.computerworld.com/article/3010270/wireless-networking/oklahoma-sooners-use-beacons-sensors-to-find-rooms-on-massive-campus.html?page=2">the press has been responding positively</TextLink> the NavApp and we've even received <TextLink href="https://campustechnology.com/microsites/innovators-microsite/home.aspx">national awards</TextLink> for our work on this project. <strong>Please <TextLink href="/contact">reach out</TextLink> to find out how to deploy your wayfinding tool.</strong>
      </p>

      <OverlayRule />

      {/* --- OVAL --- */}

      <ImageWithCaption src="/Professional/image-asset (14).webp" alt="OVAL logo" />

      <p style={{ marginBottom: '20px' }}>
        After months of R&amp;D, OVAL 1.0 is ready for use. With this hardware/software platform, instructors and researchers alike can <strong>quickly populate a custom learning space with fully interactive 3D objects from any field.</strong> Then, they can share the analysis of those models across a network of virtual reality headsets - regardless of physical location or technical expertise. In this way, you are free to take your students or co-researchers into the "field" without leaving campus!
      </p>

      <ImageWithCaption src="/Professional/image-asset (15).webp" alt="Group RNA fly-through in virtual reality" caption="CHEM 4923, group RNA fly-through." />

      <p style={{ marginBottom: '20px' }}>
        Not only are previously imperceptible/fragile/distant objects (like chemical molecules, museum artifacts, historical sites, etc.) readily accessible in this shared learning environment, but - using our public facing file uploader - even the most novice users can easily <strong>drag-and-drop their 3D files into virtual space</strong> for collaborative research and instruction in virtual reality. Simply upload and sit down to begin.
      </p>

      <ImageWithCaption src="/Professional/image-asset (16).webp" alt="Library-designed VR workstation" caption="Custom fabricated, library-designed VR workstation - courtesy of OU Physics dept." />

      <p style={{ marginBottom: '20px' }}>
        Finally, natural interaction types - like leaning in get a closer look at a detailed model - are preserved and augmented by body tracking technology. When coupled with intuitive <em>hand-tracked controls</em> (one less piece of software to learn!), and <strong>screenshot + video capture functions for output to downstream applications (e.g. publication + presentations)</strong>, new perspectives can be achieved and captured to aid your scholarship.
      </p>

      <ImageWithCaption src="/Professional/image-asset (17).webp" alt="Student using OVAL in virtual reality" />

      <p style={{ marginBottom: '20px' }}>
        "The impact on the students this week was immeasurable", says one OU faculty member who has already incorporated the OVAL into her coursework. How can we help you achieve the same impact? Please reach out for a personal consultation and let OU Libraries show you how this powerful tool, which is <strong>currently available for walk-in use in <TextLink href="http://libraries.ou.edu/edge">Innovation @ the EDGE</TextLink></strong>, can support your educational goals.
      </p>

      <OverlayEmbed src="https://www.youtube.com/embed/tmL3T28Ud1k" title="University of Oklahoma Libraries Virtual Reality" />

      <OverlayRule />

      {/* --- 3D Scanning --- */}

      <ImageWithCaption src="/Professional/image-asset (18).webp" alt="3D scanning banner" />

      <SectionHeading>3D Scanning - Experiments &amp; Implications</SectionHeading>

      <p style={{ marginBottom: '20px' }}>
        My current <TextLink href="/professional">professional</TextLink> focus on 3D visualization has led to experimentation with a host of scanning solutions. Basically, the goal is a more accurate digitization - <strong>an interactive snapshot with searchable/browsable depth.</strong>
      </p>
      <p style={{ marginBottom: '20px' }}>
        <strong>The 3D assets below</strong> were generated using a the Sony DSC-RX100 (for capturing high-definition, multi-angle stills of the specimens) and <TextLink href="https://memento.autodesk.com/about">Autodesk Memento</TextLink> (for stitching those stills together into a surface mesh).
      </p>
      <p style={{ marginBottom: '20px' }}>
        Please reach out, via <TextLink href="/contact">the personal page</TextLink>, <strong>if you have a collection/antique/artifact/specimen</strong> that you would like to see preserved in this robust digital format.
      </p>

      <OverlayEmbed src="https://sketchfab.com/models/bbc37de8363e45b5a33175942ffe7368/embed" title="Opuntia (Prickly Pear) Cactus" />

      <p style={{ marginBottom: '20px' }}>
        The above prickly pear scan isn't perfect, but it's the only usable botanical scan that I've managed to generate after a half-dozen tries. <strong>Narrow-width connecting components (e.g. <em>stems</em>) in particular seem to disappear</strong> during Autodesk's cloud-based stitching process, which would explain why this opuntia came out while numerous capsicum scans did not. Lesson learned.
      </p>

      <OverlayEmbed src="https://sketchfab.com/models/2ca7f8d0a71a4a8696266629c186092c/embed" title="Omar Kayyam" />

      <p style={{ marginBottom: '20px' }}>
        This statue of Omar Kayyam is located in the heart of OU's Norman campus. Fortunately, it was an overcast day when the scan was done, otherwise the direct sunlight would have reflected off the white stone. The statue is quite tall (about 8 ft.), however, so the imperfect top of <TextLink href="https://en.wikipedia.org/wiki/Omar_Khayyam">this Persian polymath</TextLink>'s cap was sliced off in post production. <strong>Diffuse light and multi-angle access are necessary for a good scan.</strong>
      </p>

      <OverlayEmbed src="https://sketchfab.com/models/15790973e5b44cf9abdda0fcd9982948/embed" title="Sheepherder's Cabin" />

      <p style={{ marginBottom: '20px' }}>
        As described on <TextLink href="/spatial">the spatial page</TextLink>, this Sheepherder's cabin represents a "field scan", whereby off-grid artifacts can be manipulated, analyzed, or otherwise investigated after the fact for details that onsite limitations (like time) simply won't allow for. <strong>Measurements, for example, can be made and recorded later</strong>, after the threat of rattlesnakes has long since passed.
      </p>

      <ImageWithCaption src="/Professional/image-asset (19).webp" alt="VR measurement of the sheepherder's cabin scan" caption="VR-based analysis of early 20th century sheepherder's ruins. Note the measurement tool." />

      <p style={{ marginBottom: '20px' }}>
        Combining a few best-practices gleaned from generating high-quality field scans like the sheepherder's cabin with the ability to effectively scan certain living, albeit <em>static</em>, organisms (plants, that is), mean that <strong>3D asset repositories of invasive flora, or endangered orchids, or entire crops are feasible and perhaps inevitable</strong>.
      </p>
      <p style={{ marginBottom: '20px' }}>
        Downstream analysis of these 3D assets can not only take place centrally - at the local institute of higher-ed, for example - but at the expert's leisure. Moreover, <strong>screen capture software means that new perspectives on distant/fragile/rare data-sets can be output for presentation and publication</strong> regardless of whether that perfect viewing angle was attained at the time of the scan.
      </p>

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

  const resetForm = () => {
    setName('');
    setEmail('');
    setBody('');
    setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    // If honeypot is filled, silent reject (intercept and prevent actual post)
    if (honey) {
      setTimeout(() => setStatus('success'), 600);
      return;
    }

    // Trim and clamp inputs; collapse any newlines in the name so it can't
    // be used to inject extra headers into the email subject line.
    const cleanName = name.trim().replace(/[\r\n]+/g, ' ').slice(0, 100);
    const cleanEmail = email.trim().slice(0, 200);
    const cleanBody = body.trim().slice(0, 5000);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_KEY,
          name: cleanName,
          email: cleanEmail,
          message: cleanBody,
          subject: `New Message from ${cleanName || 'a visitor'} via mncook.net`,
          from_name: "mncook.net Portal",
          botcheck: honey
        }),
      });

      const result = await response.json();
      if (response.ok && result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>
      {status === 'success' && (
        <div role="status" aria-live="polite" style={{ 
          padding: '40px 20px', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center',
          textAlign: 'center',
          marginTop: '40px'
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
            The frequencies are aligned. Your message is on its way to <span style={{ color: 'var(--accent)' }}>matt@mncook.net</span>.
          </p>
          <button
            type="button"
            onClick={resetForm}
            style={{
              marginTop: '32px',
              padding: '10px 18px',
              background: 'transparent',
              color: 'var(--ivory-dim)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontSize: '0.75rem',
              border: '1px solid var(--rule-dark)',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Send another →
          </button>
        </div>
      )}

      <form 
        onSubmit={handleSubmit}
        style={{ 
          display: status === 'success' ? 'none' : 'flex', 
          flexDirection: 'column', 
          gap: '20px', 
          marginTop: '20px' 
        }}
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
            maxLength={100}
            disabled={status === 'submitting'}
            style={{ 
              padding: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--rule-dark)', 
              borderRadius: '4px',
              color: 'var(--ivory)',
              fontSize: '1rem',
              opacity: status === 'submitting' ? 0.6 : 1
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
            maxLength={200}
            disabled={status === 'submitting'}
            style={{ 
              padding: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--rule-dark)', 
              borderRadius: '4px',
              color: 'var(--ivory)',
              fontSize: '1rem',
              opacity: status === 'submitting' ? 0.6 : 1
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
            name="message" 
            rows={5}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
            maxLength={5000}
            disabled={status === 'submitting'}
            style={{ 
              padding: '12px', 
              background: 'rgba(255,255,255,0.05)', 
              border: '1px solid var(--rule-dark)', 
              borderRadius: '4px',
              color: 'var(--ivory)',
              fontSize: '1rem',
              resize: 'vertical',
              opacity: status === 'submitting' ? 0.6 : 1
            }} 
          />
        </div>

        {status === 'error' && (
          <p role="alert" style={{ color: '#ff6b6b', fontSize: '0.9rem', margin: '10px 0 0 0' }}>
            Transmission failed. Please check your network or email matt@mncook.net directly.
          </p>
        )}

        <button 
          type="submit"
          disabled={status === 'submitting'}
          aria-busy={status === 'submitting'}
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
            cursor: status === 'submitting' ? 'not-allowed' : 'pointer',
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
        <p><ProjectName href="https://chatpak.store/">Chatpak</ProjectName> is an automated publishing platform that transforms photo collections into professional, print-ready hardcover photobooks. Features intelligent AI-powered layout, golden ratio tiling (φ = 1.618), instant preview generation, and premium print quality.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: Next.js 14, Supabase (PostgreSQL), Cloudflare R2, Sharp, MediaPipe WASM, PDFKit</span></li>
        </ul>
        <TechnicalPreview src="/Professional/chatpak-mockup.png" alt="Chatpak Photobook Mockup" caption="AI-powered photobook design layouts." />
      </CollapsibleSection>

      <CollapsibleSection title="Rook Sensor — YOLO-based edge AI object detection">
        <p><ProjectName href="https://github.com/Cook4986/rook-sensor">Rook Sensor</ProjectName> is an edge-computing surveillance and intelligence gathering pipeline designed to run on constrained hardware (Raspberry Pi). It serves as an SMS-based street monitoring device utilizing custom YOLO models for real-time object detection with low thermal overhead.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: Python, OpenCV, NCNN, Bash, Edge AI, YOLO</span></li>
        </ul>
        <TechnicalPreview src="https://raw.githubusercontent.com/Cook4986/rook-sensor/main/assets/architecture.png" alt="Rook Sensor Pipeline Architecture" caption="Rook object detection pipeline architecture." invert={true} pad={true} />
      </CollapsibleSection>

      <CollapsibleSection title="Scribble — Archival document OCR transcription platform">
        <p><ProjectName href="https://github.com/Cook4986/scribble">Scribble</ProjectName> is an archival document transcription tool for non-technical researchers. It empowers users to transcribe and natively translate image-based document collections at scale. Researchers upload batches of archival photographs (JPEG, PNG, HEIC, PDF) and receive structured transcription packages via email.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: Next.js 15, FastAPI, Supabase, LLM APIs</span></li>
        </ul>
        <TechnicalPreview src="https://raw.githubusercontent.com/Cook4986/scribble/main/web/public/logo.svg" alt="Scribble Logo" caption="Scribble archival document transcription platform." invert={true} pad={true} />
      </CollapsibleSection>

      <CollapsibleSection title="SliceIT — Browser-based WebGL mesh processing WASM slicer">
        <p><ProjectName href="https://slice-it-chi.vercel.app">SliceIT</ProjectName> is a browser-based tool for slicing 3D meshes using boolean operations. Drop a model, pick a tool, press one button — done. Completely client-side with no installs or sign-ups required.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: React 18, Three.js, Manifold-3D</span></li>
        </ul>
        <TechnicalPreview src="https://raw.githubusercontent.com/Cook4986/SliceIT/main/Slice%20It.png" alt="Slice It Interface" caption="Browser-based mesh slicing." />
      </CollapsibleSection>

      <CollapsibleSection title="Digital Giza Twin — Level-of-Detail 3D spatial index map">
        <p><ProjectName href="https://autotomb.pages.dev">Digital Giza Twin</ProjectName> is an interactive 3D Spatial Index for navigating the Digital Giza Corpus. It features a Level of Detail (LOD) system where landmarks scale by zoom, a click-to-explore tomb info panel, and dynamically scraped inline corpus media (photographs, maps, diaries).</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: React, Three.js, React Three Fiber</span></li>
        </ul>
        <TechnicalPreview src="/Professional/throughputAFrame_Cook2025.jpg" alt="Digital Giza Twin Interface" caption="Digital Giza Twin WebGL visualization pipeline." />
      </CollapsibleSection>

      <CollapsibleSection title="AutoTomb — Unity diary-to-3D pipelines and XR coordinate logger">
        <p><ProjectName href="https://github.com/Cook4986/AutoTomb">AutoTomb</ProjectName> is a pipeline that takes Digital Giza tomb pages and returns a set of AI-generated 3D models corresponding to ancient Egyptian object references mentioned in early 20th-century excavation diaries. It logs prompts, local outputs, and X,Y,Z coordinates for placing models in downstream XR environments.</p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px', color: 'var(--ivory-dim)', marginBottom: '20px' }}>
          <li><span style={{ color: 'var(--ivory)' }}>Stack: Python, Selenium, OpenAI API, UMAP, Meshy API, AFrame</span></li>
        </ul>
        <TechnicalPreview src="https://raw.githubusercontent.com/Cook4986/AutoTomb/main/autotombScreencap.png" alt="AutoTomb Unity Screencap" caption="AutoTomb generated models visualized in Unity." />
      </CollapsibleSection>

      <CollapsibleSection title="Nieto — Concurrent data scrapers of regional music event networks">
        <p><ProjectName href="https://github.com/Cook4986/nieto">Nieto</ProjectName> is an automated information gathering pipeline focused on the experimental music scene across Germany, Austria, and Switzerland. It orchestrates concurrent data extraction and network mapping.</p>
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