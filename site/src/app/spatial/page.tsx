/* Migrated Squarespace prose contains literal apostrophes/quotes in
   captions that JSX would otherwise complain about. */
/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import SiteNav from '@/components/ui/SiteNav';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Spatial — M.N. Cook',
  description: 'Homesteading in the New Mexico mesalands. Creative inspiration from a blank spot on the map, which is sometimes filled with danger.',
};

export default function SpatialPage() {
  return (
    <div className="section-warm">
      <SiteNav variant="warm" />

      <div className="content-section" style={{ paddingTop: '120px' }}>
        <div className="section-header">
          <div className="section-label">Field Work</div>
          <h1 className="section-title">Spatial</h1>
          <p className="section-desc">
            Homesteading in the New Mexico mesalands. Creative inspiration from a blank spot on the map, which is sometimes filled with danger.
          </p>
        </div>

        {/* Salvaged Spatial Content */}
        <div style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.22rem', lineHeight: 1.75, color: 'var(--ink-mid)' }}>
          <p style={{ marginBottom: '24px' }}>
            First, the good: We began cataloguing local flora/fauna (and geological formations) with a 10 mile hike centered on the exploration of a cave-like overhang, located at approximately 4,700 feet up the side of Unnamed Mesa.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Wildlife sightings were constant, and - although we finished the hike dog-tired - we considered the day's expedition a success. It was only upon returning to the property later that evening, after a nap near Conchas Lake, that things began to turn against us...
          </p>

          <div style={{ margin: '40px 0', padding: '20px', background: 'var(--paper-2)', borderRadius: '8px', border: '1px solid var(--rule)' }}>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--ink-light)', textAlign: 'center' }}>
              "Eight-foot, tree-climbing Coachwhip (Masticophis flagellum), photographed atop Unnamed Mesa."
            </p>
          </div>

          <p style={{ marginBottom: '24px' }}>
            When you're 50 miles from the nearest medical facility, clustering illusions ("bad news comes in threes") sometimes appear more than psychologically grounded. In this case, it was a trio of near misses that spurred fanciful conjecture of the most preposterous sort.
          </p>
          <p style={{ marginBottom: '24px' }}>
            We encountered our first threat during a routine trek from the nearest vehicle parking - off Magnolia, ~30 miles from Tucumcari - through an overgrowth of Cane Cholla (Cylindropuntia imbricata), Desert Spoon (asylirion wheeler), and Desert Prickly Pear (Opuntia phaeacantha). It was the Prickly Pear (sweet, but seedy) that sheltered our attacker.
          </p>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: '40px 0 16px', color: 'var(--ink)' }}>The Rattler Encounter</h3>
          <p style={{ marginBottom: '24px' }}>
            "Let's skirt this patch," I suggested, and proceeded to hook to the right of a ~6ft diameter, ankle-high growth of the fruity cactus. My cousin, noted pharmacological technician Sam Bender, retreated abruptly just as we cleared the patch.
          </p>
          <p style={{ marginBottom: '24px' }}>
            "Oh Shit!" - a near scream and altogether natural response accompanied my cousin's flight off the game trail.
          </p>
          <p style={{ marginBottom: '24px' }}>
            The first thing I perceived was the rattle - much louder than one might imagine, due, perhaps, to the relative size of the creature. Next, I saw it - a Western Diamondback Rattler (Crotalus atrox) - reared up hip-high and still rising from the edge of the cactus patch. The serpent was easily six feet long and as thick at its center as your biceps.
          </p>

          <div style={{ margin: '40px 0', padding: '20px', background: 'var(--paper-2)', borderRadius: '8px', border: '1px solid var(--rule)' }}>
            <p style={{ fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--ink-light)', textAlign: 'center' }}>
              "A Cane Cholla (Cylindropuntia imbricata) of the sort embedded in my thigh following our hasty retreat from the Diamondback rattler."
            </p>
          </div>

          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: '40px 0 16px', color: 'var(--ink)' }}>2017 & Beyond</h3>
          <p style={{ marginBottom: '24px' }}>
            Solar power, a full-sized bed (under roof), a fire-pit seating/cooking area, and a navigable road to the front door - These are some of the recent additions to the property that have made visiting Porcupine Ranch a relatively comfortable experience... These "upgrades" have also brought into question our reasons for being out there, far from home.
          </p>
          <p style={{ marginBottom: '24px' }}>
            The property was never about creature comforts, or fully recreating the at-home living experience in a place far away (e.g. pure escapism). I have to constantly remind myself (and our guests) that Porcupine Ranch mission "success" is defined by the briefest moments of purest contentment achieved just before sunset, or at dawn, when one removes blankets or boots from blistered feet and stares out across the dry Garita creek bed towards the exposed sandstone in the distance...
          </p>
          
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', margin: '40px 0 16px', color: 'var(--ink)' }}>A Decade On (2020-2024)</h3>
          <p style={{ marginBottom: '24px' }}>
            New Job, now house, new baby. COVID. Missed a year, which I hope will never happen again. Fortunately, we were back in ‘21, and every year since, despite the vast distances that separate the New England coast from the desert Southwest.
          </p>
          <p style={{ marginBottom: '24px' }}>
            This year marks 10 years since development on "the property"/"Porcupine Ranch"/"mini mesa" began in earnest. Of course I mean development in the broadest sense; more of the self-improvement than commercial variety, as evidenced by the scale and nature of actual structures on the land: A travel trailer and an outhouse. The truth is that the landscape itself - and time spent within it - make further development superfluous.
          </p>
          <p style={{ marginBottom: '24px' }}>
            But one still needs a "clean, well-lighted place" - a base of operations from which to launch expeditions, deeper into the evergreen fringes of alpine growth that rim the mesa edges, or down into the ravines that frame an ancient seabed, each filled with their own dangers.
          </p>
          <p style={{ marginBottom: '24px' }}>
            And so, a decade into this project, we’ve placed a humble cabin, complete with the vital sub-systems to sustain life in the desert southwest... You can read, strum, shoot, or walk, in any direction, for many miles, until a particularly hearty cow fence outweighs your backcountry fatigue and you stumble home to sip whiskey.
          </p>

          <div style={{ margin: '60px 0 20px', padding: '30px', borderTop: '1px solid var(--rule)', borderBottom: '1px solid var(--rule)', textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.3rem', color: 'var(--ink)' }}>
              "Stop searching. Face the earth where you can. Literally speaking, it’s all you have to go on."
            </p>
            <p style={{ fontSize: '0.9rem', color: 'var(--ink-light)', marginTop: '10px' }}>— Richard Ford</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
