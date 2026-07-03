/* Migrated Squarespace prose contains literal apostrophes/quotes in
   captions that JSX would otherwise complain about. */
/* eslint-disable react/no-unescaped-entities */
/* Raw <img> tags (not next/image) are used intentionally for the static export. */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import SiteNav from '@/components/ui/SiteNav';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Spatial — matt cook',
  description: 'Homesteading in the New Mexico mesalands. Creative inspiration from a blank spot on the map, which is sometimes filled with danger.',
};

function Fig({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure style={{ margin: '48px 0' }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '8px', border: '1px solid var(--rule)' }}
      />
      {caption && (
        <figcaption style={{ marginTop: '10px', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--ink-light)', textAlign: 'center' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

function YearHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '64px 0 24px', color: 'var(--ink)', textAlign: 'center' }}>
      {children}
    </h2>
  );
}

export default function SpatialPage() {
  return (
    <div className="section-warm">
      <SiteNav variant="warm" />

      <main id="main-content" className="content-section" style={{ paddingTop: '120px' }}>
        <div className="section-header">
          <div className="section-label">Field Work</div>
          <h1 className="section-title">Spatial</h1>
          <p className="section-desc">
            Homesteading and creative inspiration in the New Mexico mesalands.
          </p>
        </div>

        {/* Original Squarespace /spatial copy, reproduced verbatim */}
        <div style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.22rem', lineHeight: 1.75, color: 'var(--ink-mid)' }}>

          <blockquote style={{ margin: '0 0 32px', padding: '0 0 0 20px', borderLeft: '3px solid var(--rule)', fontStyle: 'italic', color: 'var(--ink)' }}>
            <p style={{ marginBottom: '16px' }}>
              “Wisdom sits in places. It’s like water and never dries up. You need to drink water to stay alive, don’t you? Well, you also need to drink from places. You must remember everything about them. You must learn their names. You must remember what happened at them long ago. You must think about it and keep on thinking about it. Then your mind will become smoother and smoother. Then you will see danger before it happens.”
            </p>
            <footer style={{ fontStyle: 'normal', fontSize: '1rem', color: 'var(--ink-light)' }}>— Chiricahua Apache horsemen</footer>
          </blockquote>

          <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '40px 0' }} />

          <Fig src="/Spatial/Cave.webp" alt="Cave-like overhang on the side of Unnamed Mesa" caption="Cave-like overhang at ~4,700 ft above sea level and the object of our expedition." />

          <YearHeading>- 2015 -</YearHeading>

          <p style={{ marginBottom: '24px' }}>
            First, the good: <strong>We began cataloguing local flora/fauna (and geological formations)</strong> with a 10 mile hike centered on the exploration of a cave-like overhang, located at approximately 4,700 feet up the side of Unnamed Mesa.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Wildlife sightings were constant, and - although we finished the hike dog-tired - we considered the day's expedition a success. It was only upon returning to the property later that evening, after a nap near <a href="https://en.wikipedia.org/wiki/Conchas_Lake" target="_blank" rel="noopener noreferrer">Conchas Lake</a>, that things began to turn against us...
          </p>

          <Fig src="/Spatial/Bull_Snake.webp" alt="Coachwhip snake atop Unnamed Mesa" caption="Eight-foot, tree-climbing Coachwhip (Masticophis flagellum), photographed atop Unnamed Mesa." />

          <p style={{ marginBottom: '24px' }}>
            When you're 50 miles from the nearest medical facility, clustering illusions ("bad news comes in threes") sometimes appear more than psychologically grounded. In this case, <strong>it was a trio of near misses that spurred fanciful conjecture of the most preposterous sort.</strong>
          </p>
          <p style={{ marginBottom: '24px' }}>
            We encountered our first threat during a routine trek from the nearest vehicle parking - off Magnolia, ~30 miles from Tucumcari - through an overgrowth of Cane Cholla (<em>Cylindropuntia imbricata</em>), Desert Spoon (<em>asylirion wheeler</em>), and Desert Prickly Pear (<em>Opuntia phaeacantha</em>). <strong>It was the Prickly Pear (sweet, but seedy) that sheltered our attacker.</strong>
          </p>
          <p style={{ marginBottom: '24px' }}>
            "Let's skirt this patch," I suggested, and proceeded to hook to the right of a ~6ft diameter, ankle-high growth of the fruity cactus. My cousin, noted pharmacological technician Sam Bender, retreated abruptly just as we cleared the patch.
          </p>
          <p style={{ marginBottom: '24px' }}>
            "<em>Oh Shit!</em>" - a near scream and altogether natural response accompanied my cousin's flight off the game trail.
          </p>
          <p style={{ marginBottom: '24px' }}>
            <strong>The first thing I perceived was the rattle</strong> - much louder than one might imagine, due, perhaps, to the relative size of the creature. Next, I saw it - a Western Diamondback Rattler (Crotalus atrox) - reared up hip-high and still rising from the edge of the cactus patch. The serpent was easily six feet long and as thick at its center as your biceps.
          </p>
          <p style={{ marginBottom: '24px' }}>
            It glared at us menacingly, less than a yard from where we first stood, ready to inject upwards of 800mg of hemotoxic venom, which - if left untreated - <a href="http://www.toxinology.com/fusebox.cfm?fuseaction=main.snakes.display&id=SN0419" target="_blank" rel="noopener noreferrer">results in death 10-20% of the time.</a>
          </p>

          <Fig src="/Spatial/image-asset.webp" alt="Western Diamondback Rattler" caption="A similarly sized Western Diamondback Rattler (Crotalus atrox), encountered and photographed as we approached the property the day before." />

          <p style={{ marginBottom: '24px' }}>
            We both moved quickly at that point, turning and running diagonally in opposite directions away from the rattler. The quickness of that retreat, coupled with <strong>that notably aggressive species' to readiness strike, took me straight into the nearest Cane Cholla</strong>.
          </p>
          <p style={{ marginBottom: '24px' }}>
            The trip back to camp was mostly uneventful, although I limped slightly due to the dozen or so barbed spines embedded in my thigh just above the knee, and the tendency for my denim pants to rub against that wound made for an unpleasant quarter mile. But our adrenaline levels were understandably high at that point and we felt well-nigh invincible. A belt of bourbon later and I was down to my skivvies, tackling the Cholla spines one-by-one with the pliers on my trusty Leatherman. <strong>Surely the worst was over.</strong>
          </p>

          <Fig src="/Spatial/Cholla.webp" alt="Cane Cholla cactus" caption="A Cane Cholla (Cylindropuntia imbricata) of the sort embedded in my thigh following our hasty retreat from the Diamondback rattler." />

          <p style={{ marginBottom: '24px' }}>
            We had thought our adventure complete for the night but a massive (un-forecast) cumulo-stratus thunderhead approached from the northeast shortly thereafter. <strong>60mph straight-line gusts encouraged gulps of 100 proof spirits</strong>, and, while I wouldn't recommend drinking in a survival situation, our tent was tied down, reinforced, and there was a darkening field of aggressive rattlesnakes between us and our only means of escape.
          </p>
          <p style={{ marginBottom: '24px' }}>
            The rain hit hard, as did the lightning, while accompanying thunder reverberated continuously off 360 degrees of Mesa. <strong>The sound approximated war-drums</strong> and those deep, bellowed chants encouraged our fear of the storm's electro-magnetic potential. Moreover, the downpour that eventually followed the gale-force gusts was so unfamiliar to the rocky top of our "mini-mesa" that much of the deluge <em>bounced</em> off the ground and back into the tent, effectively circumventing the rain flap.
          </p>

          <Fig src="/Spatial/Storm.webp" alt="Storm over the mesa" caption="Rain and darkness in the distance." />

          <p style={{ marginBottom: '24px' }}>
            <strong>We awoke damp, slightly hungover, and enormously relieved.</strong> Quickly, we packed and headed back across the dreaded Cholla field, sticking as much as possible to the game trails that enmesh the area. Fully packed, then, we discussed the prospect of sugary drinks and ice in our water and protein in our diet.
          </p>
          <p style={{ marginBottom: '24px' }}>
            You see, at that point, nearly 24 hours had passed since anything but trail mix and whiskey (and water) were consumed. That fact may first appear silly, negligent even, but we had more food in our possession and simply anticipated a timely arrival at environs with broader culinary options. As it happens, <strong>our departure was <em>not</em> imminent</strong>.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Garita Creek was now flowing rapidly over the only graded road between us and civilization, and, while the silty water was only waist-deep, the clay mud threatened our humble city vehicle with temporary custody, during which <strong>the <em>next</em> summer storm would undoubtedly build up and wash us away along our remaining supplies.</strong>
          </p>
          <p style={{ marginBottom: '24px' }}>
            Fording the flooded creek simply wouldn't do, so we took a couple bites of trail mix and set off for help - three miles away, where the nearest neighbor was dug in to the high desert.
          </p>

          <Fig src="/Spatial/image-asset (1).webp" alt="Flooded Garita Creek crossing" caption="Garita Creek crossing, where flash-flooding temporarily stranded us." />

          <p style={{ marginBottom: '24px' }}>
            Our last hope, short of hitchhiking back to Tucumcari for a tow, were Bill and Marge, <em>permanent</em> residents of the area, and generous owners of <strong>a two-ton truck that would eventually dragged our vehicle across the flash-flooded, high-desert creek crossing</strong>. We promised beer and steaks upon our return, arranged to enlist their water dowsing services when the time came to dig a well on Porcupine Ranch, and hit the paved state highway five miles later.
          </p>
          <p style={{ marginBottom: '24px' }}>
            <strong>In six hours were were back in Norman, and ice came easily from the fridge door, and beer was wonderfully cold, and the spider in the bathroom seemed innocuous rather than threatening</strong>. Did I mention we've already already laid out plans for our next expedition? Several cabins dot the valley between the Variadero and Unnamed Mesa, all built (with much labor, no doubt) from unfinished local stone. Artifacts dot the ground surrounding these early 20th century homesteads and the story of their inhabitants demands to be told.
          </p>

          <Fig src="/Spatial/image-asset (2).webp" alt="Stone ruins of former settlers" caption="Stone ruins of former settlers (center right) - to be explored in subsequent expeditions." />

          <YearHeading>- 2016 -</YearHeading>

          <p style={{ marginBottom: '24px' }}>
            In Garita, folklore shapes perception just as readily as more established western religions implicitly shape the daily life in the city. Take the issue of water. As the Chihuahua desert creeps north, the average rainfall will continue to decline from an already low ~20 inches annually, and life - already difficult when sheepherder's abandoned their stone cabins to fight in WWII - will be harder to sustain. So, <strong>local practices like <em>water dowsing</em> will undoubtedly proliferate</strong> rather than die out. Where LTE doesn't reach, the sorts of seers and charlatans that characterized <a href="https://en.wikipedia.org/wiki/Burned-over_district" target="_blank" rel="noopener noreferrer">the Burned-Over District</a> command more influence than Google-scholar, and - sometimes - their methods work.
          </p>

          <Fig src="/Spatial/image-asset (3).webp" alt="Sheepherder's stone cabin" caption="A sheepherder's stone cabin." />

          <p style={{ marginBottom: '24px' }}>
            But first, we <em>did</em> reach that stone cabin in the distance , and - perhaps more importantly - we've <a href="/professional">3D scanned it for remote analysis</a>. Using a series of high definition still images and a piece of Autodesk software now known as <em>Remake</em>, a surface mesh (with texual imagery superimposed) is now accessible to the general public, in virtual reality, at University of Oklahoma Libraries. <strong>Importantly, we can also take measurements, after the fact, by re-engaging with extremely detailed 3D models that no longer hide rattlesnakes.</strong> With ongoing evolution of low-cost drone equipment, and photogrammetric processing software, the entire Garita Valley can be surveyed and 3D mapped for virtual exploration from anywhere and with anyone.
          </p>

          <Fig src="/Spatial/image-asset (4).webp" alt="Excavating a driveway" caption="Excavating a half-mile driveway." />

          <p style={{ marginBottom: '24px' }}>
            Also, we built a winding, half-mile long driveway, Essentially reclaiming a forgotten public easement that only ever existed on a (decidedly low-tech) 70's era surveyor's map. At that time, the nearby <a href="https://en.wikipedia.org/wiki/Conchas_Dam" target="_blank" rel="noopener noreferrer">Concahs Dam</a> - designed and built by the U.S. Army Core of Engineers - was still a going concern, and the resulting lake was supposed to support a community of "ranchos" that never materialized. <strong>Vehicle access allowed the property to function as a staging ground for an ambitious ascent of Variadero Mesa, whose red-hued battlements are sheer.</strong> From atop the mesa, you can see the extreme Southwest fingers of the 25 mile long lake.
          </p>

          <Fig src="/Spatial/image-asset (5).webp" alt="Atop Variadero Mesa" caption="Atop Variadero Mesa, observing a conical stone formation to the Northeast." />

          <p style={{ marginBottom: '24px' }}>
            We completed the year with the installation of the first permanent shelter on the property, a "canned ham" travel trailer, complete with brown and orange racing stripes. Once in place, we were able to comfortably wait out the late-December cold. But there, tucked into our 20-degree-rated Marmot mummy bags, dreams of 100 roving tornados - encircling the trailer and stretching out across the Garita valley in every direction - haunted us. The next day a massive storm system swept in from the Northwest and shook the stilted trailer all night long. <strong>Next project?: A viewing deck <em>above</em> the trailer.</strong>
          </p>

          <Fig src="/Spatial/file-1-3.webp" alt="Travel trailer on the property" caption="Our home on the property." />

          <YearHeading>-2017-</YearHeading>

          <Fig src="/Spatial/image-asset (6).webp" alt="Dusk in the Garita valley" caption="Dusk in the Garita valley." />

          <p style={{ marginBottom: '24px' }}>
            Solar power, a full-sized bed (under roof), a fire-pit seating/cooking area, and a navigable road to the front door - <strong>These are some of the recent additions to the property that have made visiting Porcupine Ranch a relatively comfortable experience.</strong> (Water is still and issue, but, at an estimated ~$10,000 to hit the water table, we may be trucking in drinking/washing/cleaning water for some time to come). These "upgrades" have also brought into question our reasons for being out there, far from home.
          </p>

          <Fig src="/Spatial/file.webp" alt="Interior of the trailer" />

          <p style={{ marginBottom: '24px' }}>
            The property was never about creature comforts, or fully recreating the at-home living experience in a place far away (e.g. pure escapism). I have to constantly remind myself (and our guests) that Porcupine Ranch mission "success" is defined by the briefest moments of purest contentment achieved just before sunset, or at dawn, <strong>when one removes blankets or boots from blistered feet and stares out across the dry Garita creek bed towards the exposed sandstone in the distance</strong>, climbing 300 feet up the side of unnamed Mesa. Pinks in the morning, deep reds and purples in the morning.
          </p>

          <Fig src="/Spatial/Hideout1.webp" alt="Silva Gang hideout" caption="Silva Gang hideout - San Miguel County, New Mexico." />

          <p style={{ marginBottom: '24px' }}>
            <strong>Pinks in the morning, deep reds and purples in the evening</strong>. That's why we are here, right? To experience the color and the light and the shadowy contours lacking both that define - or begin to hint at - the New Mexican experience that has drawn traders and mystics and outlaws . Outlaws like Vicente Silva who was seen as a Robin Hood-type character by the Garita locals in his day, some of which still own property in the Mesalands between Tucumcari and Las Vegas, bordering the Canadian River. <strong>Did the Silva gang slow down to watch the sunset</strong> - did they emerge from their cave hideout at dawn to see the sun breach the top of the mesalands?
          </p>

          <Fig src="/Spatial/silvagang.webp" alt="Vicente Silva and his gang" />

          <p style={{ marginBottom: '24px' }}>
            Light to read by and an old box fan to move the air during the heat of the 100+ degree summer days. <strong>That's not enough to be considered feature creep, surely.</strong> A cabin would be nice though, and an AC window unit, and maybe a stereo or electric guitar amp. But then the property would begin resembling the Conchas Lake State Park campsites, across the lake, where RV generators run all night, drowning out the owls, and the glow of sattelite tv sets diffuses through blackout blinds and drowns out the stars.
          </p>

          <Fig src="/Spatial/01890005.webp" alt="Reading light in the trailer at night" />

          <YearHeading>-2018-</YearHeading>

          <Fig src="/Spatial/IMG_1135.webp" alt="Pecos National Historic Park" caption="Pecos National Historic Park" />

          <p style={{ marginBottom: '24px' }}>
            I had the good fortune of visiting NM four times in 2018. Off the property, we hiked <a href="https://en.wikipedia.org/wiki/Pecos_Wilderness" target="_blank" rel="noopener noreferrer">the Mora pass</a> and the shore of the Rio Grande near Santa fa while, on the property, we constructed the first permanent structure: an outhouse(!). My <em>first</em> trip of the year, though, concerned a much more impressive construction. In still-bitter February, I set out to take part in <strong>a drone-based 3D scan of Pecos Pueblo</strong>.
          </p>

          <Fig src="/Spatial/IMG_6818.webp" alt="Ruins of Pecos Pueblo" caption="The ruins of Pecos Pueblo not long after Lieutenant Abert’s curious account" />

          <p style={{ marginBottom: '24px' }}>
            Any early description of the Pueblo was penned by a Lt. Abert in September of 1846. He described how…
          </p>
          <p style={{ marginBottom: '24px', fontStyle: 'italic' }}>
            The village of Pecos is famed for the residence of a singular race of Indians, about whom many curious legends are told. <strong>In their temples they are said to keep an immense serpent, to which they sacrificed human victims</strong>. Others say that they worshipped a perpetual fire, that they believe to have been kindled by Monteczuma.
          </p>

          <Fig src="/Spatial/IMG_2305.webp" alt="Drone scanning at Pecos Pueblo" />

          <p style={{ marginBottom: '24px' }}>
            Climbers camouflaged across sheer rock faces; slithering things of regular size hidden directly beneath our feet. Yet signs of civilization remain across the high desert of the mountain west and the plains that undulate and then crack to meet it. <strong>Soon, we too will have shelter</strong>.
          </p>
          <p style={{ marginBottom: '24px' }}>
            But how? Roadbuilding was but a temporary success, and soon the land will reclaim our efforts. Same for the privy. Perhaps it’s better not to consider such transience, or, better, to embrace it. For the desert is dry, and trash that I wish had disintegrated long ago still blows across the mini mesa, strewn from abandoned habitation miles away. Let us not make the same mistake, when we do build. <strong>Let us vanish as we come</strong>.
          </p>

          <Fig src="/Spatial/IMG_1120.webp" alt="Camouflaged climber on rock face" />

          <YearHeading>-2019-</YearHeading>

          <Fig src="/Spatial/IMG_2027.webp" alt="Sabinoso Wilderness trailhead" />

          <p style={{ marginBottom: '24px' }}>
            In 2017, nearly <strong>30,000 acres of public land</strong> became accessible through the opening of public road access a mere 30 miles Northwest of the property. Seen from the trailhead off county road C51A, the <a href="https://en.wikipedia.org/wiki/Sabinoso_Wilderness" target="_blank" rel="noopener noreferrer">Sabinoso Wilderness</a> is a veritable canyon, comprising branching paths between mesas rising 5000 feet above sea level, coalescing above Trujillo into flat grazing that sprawls until the base of the Sangres at Las Vegas, NM, some 30 miles further West. It’s the edge of the plains, Sabinoso.
          </p>

          <Fig src="/Spatial/IMG_4163.webp" alt="Sabinoso Wilderness canyon" />

          <p style={{ marginBottom: '24px' }}>
            Even with the easement, this land remains unapproachable. There are no amenities besides flattened dirt at the trail-head, which is itself hidden miles from a paved road, and few casual day hikers are comfortable opening and closing livestock fences, driving through streams and over sand , and leaving their vehicles atop a mesa while they venture down on foot, another thousand feet down. One has to have a reason to venture this far. <strong>Most likely, you will not see another vehicle or another soul</strong> at Sabinoso.
          </p>

          <Fig src="/Spatial/image-asset (7).webp" alt="Sabinoso Wilderness landscape" />

          <p style={{ marginBottom: '24px' }}>
            We ditched the truck at the trailhead amidst pine and juniper and headed down the mesa, reaching the streambed and cholla patches in half an hour with our light packs. Then through the canyon, flat and 50 yards across, from one sheer sandstone wall to another. Peeking behind boulders and beneath outcroppings, we moved slowly, covering three or four miles in an hour before spotting a spine, which we would attempt to climb. My partner made short work of it. <strong>In denim and snake boots, I struggled</strong>. Beyond the spine was another canyon - a glimpse into denser wilderness. A future adventure…
          </p>

          <Fig src="/Spatial/IMG_4202.webp" alt="Canyon floor in the Sabinoso Wilderness" />

          <YearHeading>-2020-2024-</YearHeading>

          <p style={{ marginBottom: '24px' }}>
            New Job, now house, new baby. COVID. Missed a year, which I hope will never happen again. Fortunately, we were back in ‘21, and every year since, despite the vast distances that separate the New England coast from the desert Southwest. We explore the nearby towns and cities, paying special attention to the vintage vehicles. A decade approaches.
          </p>

          <YearHeading>-2025-</YearHeading>

          <Fig src="/Spatial/IMG_1453.webp" alt="The property, ten years on" />

          <p style={{ marginBottom: '24px' }}>
            This year marks <strong>10 years</strong> since development on “the property”/”Porcupine Ranch”/”mini mesa began in earnest. Of course I mean development in the broadest sense; more of the self-improvement than commercial variety, as evidenced by the scale and nature of actual structures on the land: A travel trailer and an outhouse. The truth is that the landscape itself - and time spent within it - make further development superfluous. Out there, the more you build, the less raw land you have, so <strong>development equals failure</strong>.
          </p>
          <p style={{ marginBottom: '24px' }}>
            But <strong>one still needs a “clean, well-lighted place”</strong> - a base of operations from which to launch expeditions, deeper into the evergreen fringes of alpine growth that rim the mesa edges, or down into the ravines that frame an ancient seabed, each filled with their own dangers (bodily harm, far from medicine or law enforcement; spiny, sharp, clawed, fanged adversaries). <strong>But the high-desert wilderness and its staggering, desolate beauty</strong> is merely a storybook mantra for an office worker with limited PTO.
          </p>
          <p style={{ marginBottom: '24px' }}>
            And so, a decade into this project, we’ve placed a humble cabin, complete with the <strong>vital sub-systems to sustain life in the desert southwest</strong>, while we plot and plan and otherwise dream of adventures that begin on the doorstep and extend to the dragonoid clouds that twist towards the south, mid-summer, threatening the same rains and floods that would have kept us away for days and weeks in years past.
          </p>

          <Fig src="/Spatial/Untitled+(1).gif" alt="Animated view of the cabin" />

          <p style={{ marginBottom: '24px' }}>
            <strong>No rental vehicle is worth the inevitable damage</strong> wrought by mesquite and cholla and all manner of thorny shrub spring up between visits, and the two-track roadway now resembles a cow-path, 8 years since its construction. That leaves <em>powersports</em>. ATV, ATC, Dirt Bike, Side-by-Side, Quad Bike; culturo-mechanical mobility devices united by their utility. Two and four stroke engines bolted onto steel frames, open to the elements, but maneuverable (and forgiving) in a way that highway vehicles are not. Enter the now defunct dual-sport known in Asia as the “Serow”, the miniature deer of woodland Japan.
          </p>
          <p style={{ marginBottom: '24px' }}>
            On two, suspended wheels sporting a knobby tires and achieving triple digit MPG with minimal maintenance required on the (“bullet proof”) Yamaha engine, <strong>the range and scope of our vision has multiplied considerably</strong>. Add to that the water collection, solar array, insulation, wood stove, and emergency radio, and you have a base camp that can sleep 4+ adult humans indefinitely, or at least until things blow over. You can read, strum, shoot, or walk, in any direction, for many miles, until a particularly hearty cow fence outweighs your backcountry fatigue and you stumble home to sip whiskey.
          </p>

          <Fig src="/Spatial/serowHero.webp" alt="Yamaha Serow dual-sport motorcycle" />

          <p style={{ marginBottom: '24px' }}>
            Where does that leave us, 10 years on? Think bigger: To host - family and friends ,of course, but also musicians, writers, and dirt bike racers. To uncover forgotten cemeteries, infiltrate cults, calm the local ghost population wandering from the time of Cortez and beyond, and study the sky for traces of the future. With our headquarters (and four stroke transportation) in place, anything goes. But first, the past. The recent past. Specifically, <strong>a 4208 mile road trip</strong>, fully loaded, from Melrose, MA, to Newkirk, NM.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Dramatic terrain as far as Ohio, all through Western New England, right across southern Pennsylvania, crossing briefly through West Virginia. Hills that are nearly mountains, lots of timber, intermittent rain. Hit a blown out truck tire on day 2. Then, green. <strong>Like a miniaturized jungle set a couple feet off the ground.</strong> Yucca, sunflower, mesquite, pinion pine, and those are only the ones I recognize. There are hundreds of species here when it’s wet, plants and animals, and the pasture looks like the Midwest, but spikier.
          </p>
          <p style={{ marginBottom: '24px' }}>
            A millipede dragon crossed the sky, threading the valley from 104 to the lake. Its spiky scales shot out laterally, while legs dangled in the form of rainfall tendrils from a dark belly line, water barely visible by the time it hit ground, but hit the ground it did, and flood it, making travel impossible along the dirt county road . The creature writhed in the sky above, not more than 1000 feet up was its serpentine torso, stretching southwest, towards a distant thunderstorm, which I knew was headed my way.
          </p>

          <Fig src="/Spatial/dragonoid.webp" alt="Dragonoid storm cloud over the valley" />

          <div style={{ margin: '60px 0 20px', padding: '30px', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--ink)' }}>
              Stop searching. Face the earth where you can. Literally speaking, it’s all you have to go on.
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-light)', marginTop: '10px' }}>- Richard Ford</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
