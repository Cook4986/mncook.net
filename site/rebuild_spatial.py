import re

with open("src/content/OverlayContent.tsx", "r") as f:
    content = f.read()

spatial_start = content.find("export function SpatialContent() {")
spatial_end = content.find("export function TextualContent() {", spatial_start)

new_spatial = """export function SpatialContent() {
  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>
      <p style={{ fontSize: '1.15rem', color: 'var(--ivory-dim)', fontStyle: 'italic', marginBottom: '32px', paddingLeft: '20px', borderLeft: '3px solid var(--accent)' }}>
        "Wisdom sits in places. It's like water and never dries up. You need to drink water to stay alive, don't you? Well, you also need to drink from places... You must remember everything about them. You must learn their names. You must remember what happened at them long ago. You must think about it and keep your mind smooth and clear."
        <br/><br/>
        - Dudley Patterson (Western Apache)
      </p>

      <ImageWithCaption src="/Spatial/Cave.webp" alt="Cave" caption="Cave-like overhang at ~4,700 ft above sea level and the object of our expedition." />

      <CollapsibleSection title="- 2015 -">
        <p>First, the good: We began cataloguing local flora/fauna (and geological formations) with a 10 mile hike due north across the valley.</p>
        
        <ImageWithCaption src="/Spatial/Bull_Snake.webp" alt="Coachwhip" caption="Eight-foot, tree-climbing Coachwhip (Masticophis flagellum), photographed atop Unnamed Mesa." />

        <p>When you're 50 miles from the nearest medical facility, clustering illusions ("bad news comes in threes", etc) are quite salient. In our case, the massive, striking snake shown below, the lightning storm, and the flash flooding of Garita creek comprised a troubling trilogy of events - all taking place over the span of 12 hours - which led to our ultimate evacuation to Tucumcari on the third day of our expedition.</p>
        
        <ImageWithCaption src="/Spatial/image-asset.webp" alt="Rattlesnake" caption="A similarly sized Western Diamondback Rattler (Crotalus atrox), encountered and photographed as we approached the property the day before." />

        <p>We both moved quickly at that point, turning and running diagonally in opposite directions away from the rock pile. We knew these snakes can strike up to 2/3 their body length. The next thing I knew I was picking myself off the ground 10 feet away, wiping away blood, and pulling cactus needles out of various appendages. The pain in my left thigh was immense. Had I been bitten?</p>
        
        <ImageWithCaption src="/Spatial/Cholla.webp" alt="Cholla Cactus" caption="A Cane Cholla (Cylindropuntia imbricata) of the sort embedded in my thigh following our hasty retreat from the Diamondback rattler." />

        <p>We had thought our adventure complete for the night but a massive (un-forecast) cumulo-stratus thunder-storm soon settled directly overhead, waking us at about 2 AM. Since our tent was pitched directly alongside the metal shipping container... we decided to flee the shelter for the safety of the truck cab. For three hours we watched lightning strike all around us (not three-one-thousands off, but immediate, booming, simultaneous blinding light/sound).</p>
        
        <ImageWithCaption src="/Spatial/Storm.webp" alt="Storm" caption="Rain and darkness in the distance." />

        <p>We awoke damp, slightly hungover, and enormously relieved. Quickly, we packed and headed back across the valley, making it only as far as Garita Creek - which had been bone dry just 12 hours earlier but was now a raging river...</p>

        <ImageWithCaption src="/Spatial/image-asset (1).webp" alt="Garita Creek" caption="Garita Creek crossing, where flash-flooding temporarily stranded us." />

        <p>Our last hope, short of hitchhiking back to Tucumcari for a tow, were Bill and Marge, permanent residents of Garita (one of three remaining occupied residences out of 100+ original homesteads) who managed to pull the truck out backwards up a 30 degree incline in the mud...</p>

        <ImageWithCaption src="/Spatial/image-asset (2).webp" alt="Stone ruins" caption="Stone ruins of former settlers (center right) - to be explored in subsequent expeditions." />
      </CollapsibleSection>

      <CollapsibleSection title="- 2016 -">
        <p>In Garita, folklore shapes perception just as readily as more established western religions, and that perception - regardless of origin - informs regional character. Atop the mesa, things were much as we left them, including the shipping container, which had weathered the New Mexican sun and wind admirably.</p>

        <ImageWithCaption src="/Spatial/image-asset (3).webp" alt="Sheepherder's cabin" caption="A sheepherder's stone cabin." />

        <p>But first, we did reach that stone cabin in the distance, and - perhaps more importantly - we've 3D scanned it for analysis off-grid...</p>

        <ImageWithCaption src="/Spatial/image-asset (4).webp" alt="Driveway" caption="Excavating a half-mile driveway." />

        <p>Also, we built a winding, half-mile long driveway. Essentially reclaiming a forgotten public easement, this dirt/rock path connects our land to an actual county road and makes the property accessible to passenger cars - and a heavy equipment delivery truck...</p>

        <ImageWithCaption src="/Spatial/image-asset (5).webp" alt="Mesa" caption="Atop Variadero Mesa, observing a conical stone formation to the Northeast." />

        <p>We completed the year with the installation of the first permanent shelter on the property, a "canned ham" style camper that we renovated inside and out.</p>

        <ImageWithCaption src="/Spatial/file-1-3.webp" alt="Camper" caption="Our home on the property." />
      </CollapsibleSection>

      <CollapsibleSection title="- 2017 -">
        <ImageWithCaption src="/Spatial/image-asset (6).webp" alt="Dusk" caption="Dusk in the Garita valley." />

        <p>Solar power, a full-sized bed (under roof), a fire-pit seating/cooking area, and a navigable road to town: These are the fundamental amenities required for prolonged inhabitation, and we've got them all.</p>

        <ImageWithCaption src="/Spatial/file.webp" alt="Shelter interior" />

        <p>The property was never about creature comforts, or fully recreating the at-home living experience in the wild. That's why we spend our days exploring, reading, cataloging flora/fauna, mapping the terrain, and discovering historical artifacts - like the hideout of Vicente Silva and his gang of bandits (active ~1890).</p>

        <ImageWithCaption src="/Spatial/Hideout1.webp" alt="Hideout" caption="Silva Gang hideout - San Miguel County, New Mexico." />

        <p>Pinks in the morning, deep reds and purples in the evening. That's why we are here, right? To experience this landscape in a way impossible for those who simply pass through...</p>

        <ImageWithCaption src="/Spatial/silvagang.webp" alt="Silva gang" />

        <p>Light to read by and an old box fan to move the air during the heat of the 100+ degree summer days. That's about all the camper is meant for.</p>

        <ImageWithCaption src="/Spatial/01890005.webp" alt="Night reading" />
      </CollapsibleSection>

      <CollapsibleSection title="- 2018 -">
        <ImageWithCaption src="/Spatial/IMG_1135.webp" alt="Pecos" caption="Pecos National Historic Park" />

        <p>I had the good fortune of visiting NM four times in 2018. Off the property, we hiked the Mora pass and explored the ruins of the Pecos Pueblo, which was abandoned in 1838.</p>

        <ImageWithCaption src="/Spatial/IMG_6818.webp" alt="Pueblo" caption="The ruins of Pecos Pueblo not long after Lieutenant Abert's curious account" />

        <p>Any early description of the Pueblo was penned by a Lt. Abert in September of 1846. He described how the village was constructed around a central plaza, and how the surrounding walls were built to defend against nomadic tribes. However, it was not conflict that ultimately led to the Pueblo's demise...</p>

        <ImageWithCaption src="/Spatial/IMG_2305.webp" alt="Hiking" />

        <p>Climbers camouflaged across sheer rock faces; slithering things of regular size hidden directly beneath our feet. We saw it all this year.</p>

        <ImageWithCaption src="/Spatial/IMG_1120.webp" alt="Reptile" />
      </CollapsibleSection>

      <CollapsibleSection title="- 2019 -">
        <ImageWithCaption src="/Spatial/IMG_2027.webp" alt="Trail" />

        <p>In 2017, nearly 30,000 acres of public land became accessible through the opening of public road access to the Sabinoso Wilderness. It's a spectacular landscape of deep canyons and sheer rock walls, and it's practically right in our backyard.</p>

        <ImageWithCaption src="/Spatial/IMG_4163.webp" alt="Canyon" />

        <p>Even with the easement, this land remains unapproachable. There are no amenities besides flattened dirt, and the hike down into the canyon is steep and treacherous.</p>

        <ImageWithCaption src="/Spatial/image-asset (7).webp" alt="Landscape" />

        <p>We ditched the truck at the trailhead amidst pine and juniper and headed down the mesa, reaching the canyon floor about an hour later.</p>

        <ImageWithCaption src="/Spatial/IMG_4202.webp" alt="Canyon Floor" />
      </CollapsibleSection>

      <CollapsibleSection title="- 2020-2024 -">
        <p>New Job, new house, new baby. COVID. Missed a few years, which I hope will never happen again.</p>
      </CollapsibleSection>

      <CollapsibleSection title="- 2025 -">
        <ImageWithCaption src="/Spatial/IMG_1453.webp" alt="Anniversary" />

        <p>This year marks 10 years since development on “the property”/”Porcupine Ranch”/”mini mesa" began in earnest. It’s hard to believe, but the shipping container still stands, the camper still provides shelter, and the road is still washed out.</p>

        <ImageWithCaption src="/Spatial/Untitled+(1).gif" alt="Campfire GIF" />

        <p>No rental vehicle is worth the inevitable damage wrought by mesquite and cholla and all manner of thorny scrub...</p>

        <ImageWithCaption src="/Spatial/serowHero.webp" alt="Yamaha Serow" />

        <p>Where does that leave us, 10 years on? Think bigger: To host - family and friends, of course, but also researchers and artists. The land is uniquely situated for observational astronomy, geology, and biology. It’s a blank canvas.</p>

        <ImageWithCaption src="/Spatial/dragonoid.webp" alt="Sunset" />

        <p style={{ fontStyle: 'italic', color: 'var(--ivory-dim)', marginTop: '20px' }}>
          "Stop searching. Face the earth where you can. Literally speaking, it’s all you have to go on."<br/>- Richard Hugo
        </p>
      </CollapsibleSection>

      <div style={{ height: '40px' }} />
    </div>
  );
}
"""

content = content[:spatial_start] + new_spatial + content[spatial_end:]

with open("src/content/OverlayContent.tsx", "w") as f:
    f.write(content)

