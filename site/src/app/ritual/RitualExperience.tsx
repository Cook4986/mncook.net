'use client';
/* eslint-disable @next/next/no-img-element */

import { useMemo, useState } from 'react';
import Link from 'next/link';
import SiteNav from '@/components/ui/SiteNav';
import Footer from '@/components/ui/Footer';

type TabId = 'identities' | 'map' | 'timeline' | 'anomalies' | 'documents' | 'reconstructions';
type EraId = 'all' | 'early' | 'middle' | 'mexico' | 'assassination' | 'aftermath';

interface LocationData {
  id: string;
  name: string;
  coord: [number, number];
  description: string;
  years: string;
  role: string;
}

interface TimelineEvent {
  year: string;
  title: string;
  era: Exclude<EraId, 'all'>;
  description: string;
  source: string;
}

interface DocumentPage {
  page: number;
  type: string;
  date: string;
  notes: string;
  entities: string[];
}

interface Anomaly {
  label: string;
  title: string;
  body: string[];
}

interface Reconstruction {
  figure: string;
  date: string;
  title: string;
  src: string;
  alt: string;
  caption: string;
  description: string;
  details: string[];
}

const TABS: { id: TabId; label: string }[] = [
  { id: 'identities', label: 'Identities' },
  { id: 'map', label: 'Travel Map' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'anomalies', label: 'Anomalies' },
  { id: 'documents', label: 'Documents' },
  { id: 'reconstructions', label: 'Reconstructions' },
];

const ERAS: { id: EraId; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'early', label: 'Early' },
  { id: 'middle', label: 'Knoxville' },
  { id: 'mexico', label: 'Border' },
  { id: 'assassination', label: 'JFK Crux' },
  { id: 'aftermath', label: 'Aftermath' },
];

const LOCATIONS: LocationData[] = [
  {
    id: 'grimsby',
    name: 'Great Grimsby, England',
    coord: [450, 60],
    years: '1888-1906, Nov 1963',
    role: 'Birthplace & Retreat',
    description: 'Born here on Nov 12, 1888. Returned in November 1963 to visit his sister Ada Amos and brother Walter. Later investigators traced the anonymous Cambridge News warning call to Grimsby before JFK was shot in Dallas.',
  },
  {
    id: 'india',
    name: 'British India',
    coord: [620, 160],
    years: '1906-1910',
    role: 'British Army Garrison',
    description: 'Served as an enlisted soldier in the British Army across posts in India, Gibraltar, Aden, and Bermuda. Later fabricated a missionary biography around those fragments.',
  },
  {
    id: 'bermuda',
    name: 'Bermuda Colony',
    coord: [280, 120],
    years: '1914, 1939',
    role: 'Military Exit & Campfire Trips',
    description: 'Arrived on Jan 7, 1914, and resigned from the British Army on June 29, 1914, one day after Sarajevo. In 1939, led an award trip for Knoxville Campfire boys back to Bermuda.',
  },
  {
    id: 'toronto',
    name: 'Toronto, Canada',
    coord: [225, 80],
    years: '1917-1919',
    role: 'Canadian Army Enlistment',
    description: 'Enlisted in the Canadian Expeditionary Force with discrepancies in height, birth year, and middle names. Medical files include a malaria claim tied to unexplained travel.',
  },
  {
    id: 'washington',
    name: 'Washington, D.C.',
    coord: [240, 105],
    years: '1914-1915, 1920s',
    role: 'Missionary Lectures & Rugs',
    description: 'First appeared in the U.S. lecturing on India, China, and Christianity at Washington Missionary College. After WWI, claimed an itinerant rug-cleaning business with a Syrian partner.',
  },
  {
    id: 'knoxville',
    name: 'Knoxville, Tennessee',
    coord: [205, 120],
    years: '1934-1943, 1962',
    role: 'The Campfire Council Era',
    description: 'Under the name John Howard Bowen, co-founded the Campfire Council and Boysville. Public praise gave way to an FBI neighbor dispute, a sexual abuse scandal, and a sudden flight.',
  },
  {
    id: 'laredo',
    name: 'Laredo, Texas',
    coord: [145, 175],
    years: '1943-1963',
    role: 'The Border Operations Base',
    description: 'After fleeing Knoxville, established a post office box and posed as a missionary to Mixteca communities in Oaxaca, collecting donations from U.S. churches and sponsors.',
  },
  {
    id: 'new_orleans',
    name: 'New Orleans, Louisiana',
    coord: [180, 145],
    years: 'Oct 1963',
    role: 'Passport Manipulation',
    description: 'Visited the Canadian Consulate on Oct 10, 1963, claiming Canadian nationality and obtaining a new passport only days after the Oswald bus trip.',
  },
  {
    id: 'mexico_city',
    name: 'Mexico City, Mexico',
    coord: [130, 220],
    years: 'Sept 26-27, 1963',
    role: "Oswald's Bus Seatmate",
    description: 'Boarded Flecha Roja bus No. 516 at Nuevo Laredo. Multiple witnesses placed Osborne in the front row beside Lee Harvey Oswald for the 19-hour trip to Mexico City.',
  },
  {
    id: 'san_antonio',
    name: 'San Antonio, Texas',
    coord: [150, 160],
    years: '1966',
    role: 'Death & Suppression',
    description: 'Died under the Bowen alias. Rev. Lyman Erickson discovered identity papers in a false-bottom kit bag and later said the FBI ordered him to suppress funeral notices.',
  },
];

const TIMELINE_EVENTS: TimelineEvent[] = [
  { year: 'Nov 12, 1888', title: 'Birth in Great Grimsby', era: 'early', description: 'Born Albert Alexander Osborne in Great Grimsby, Lincolnshire, England, to James and Emily Osborne.', source: 'General Register Office Birth Certificate' },
  { year: 'Dec 12, 1906', title: 'British Army Enlistment', era: 'early', description: 'Enlisted at age 18. Stationed globally, including India, Aden, Gibraltar, and Bermuda. Height recorded as 5 feet, 4.5 inches.', source: 'British Army Service Records' },
  { year: 'June 29, 1914', title: 'Military Resignation & Escape', era: 'early', description: 'Resigned from the British Army in Bermuda one day after Sarajevo and departed for the United States.', source: 'British Army Service Records' },
  { year: 'Late 1914', title: 'Washington Lecture Debut', era: 'early', description: 'Appeared in Washington, D.C., lecturing on India and China at Washington Missionary College.', source: 'The Washington Post' },
  { year: 'Aug 2, 1917', title: 'Canadian Army Enlistment', era: 'early', description: 'Enlisted under his real name but with altered height, birth year, and fake middle names Victor Emmanuel.', source: 'Canadian Expeditionary Force Service Files' },
  { year: 'Jan 31, 1919', title: 'Discharge & Nashville Transition', era: 'early', description: 'Discharged from the Canadian Army and gave Nashville as his intended home address.', source: 'CEF Discharge Certificate' },
  { year: '1924-1925', title: "The Emergence of 'Dr. Albert Osborne'", era: 'middle', description: 'Traversed North Carolina and Virginia as a Lyceum lecturer, claiming missionary parents, Oxford training, and global teaching credentials.', source: 'Charlotte Observer / Winston-Salem Journal' },
  { year: 'Dec 22, 1929', title: 'Meeting the Real John H. Bowen', era: 'middle', description: 'Preached at Aberdeen Methodist Church while J. H. Bowen led devotional service, likely gathering the details later used for identity theft.', source: 'The Charlotte Observer' },
  { year: 'Oct 1934', title: 'Assuming the Bowen Identity', era: 'middle', description: 'Arrived in Knoxville as John Howard Bowen and co-founded the Campfire Council for underprivileged street boys.', source: 'Knoxville News-Sentinel' },
  { year: 'June 1942', title: 'FBI Flag-Stomping Investigation', era: 'middle', description: 'Neighbors complained to the FBI about police dogs and alleged flag desecration. Investigators attributed it to neighbor disputes.', source: 'FBI Field Reports' },
  { year: 'Mid-1943', title: 'Scandal, SSN Application, & Flight', era: 'middle', description: 'Accused of advances toward boys at the Campfire Council, applied for a Social Security number under Bowen, and fled Knoxville.', source: 'Knoxville Police Records / SSN Application' },
  { year: '1944-1953', title: "The Mexican 'Mixteca' Mission", era: 'mexico', description: 'Surfaced on the Texas-Mexico border claiming to run a Protestant mission in the Oaxaca mountains.', source: 'Knoxville Journal' },
  { year: 'Dec 5, 1953', title: 'Faked Retirement & Successor Scam', era: 'mexico', description: "Announced John H. Bowen's retirement and introduced Albert Osborne, his real name, as successor to the mission.", source: 'Knoxville News-Sentinel / Journal' },
  { year: 'Sept 1962', title: 'Anti-Catholic Sermon & Warning', era: 'mexico', description: "Returned to Knoxville to speak against JFK and warned a pastor he did not want to risk getting him involved in something.", source: 'Jim Balloch Investigation' },
  { year: 'Sept 26-27, 1963', title: 'The Bus to Mexico City with Oswald', era: 'assassination', description: 'Boarded Flecha Roja bus No. 516 from Nuevo Laredo. Witnesses placed him in the front row beside Lee Harvey Oswald.', source: 'Warren Commission Exhibit 2195' },
  { year: 'Oct 10, 1963', title: 'Canadian Passport Renewal in New Orleans', era: 'assassination', description: 'Canceled a four-month-old passport and obtained a new one under his real name while concealing decades of border activity.', source: 'Warren Commission Exhibit 2195' },
  { year: 'Nov 13, 1963', title: 'Sudden Exit to Europe', era: 'assassination', description: 'Departed New York for Europe nine days before the assassination and stayed in Grimsby with his sister.', source: 'Knoxville Journal' },
  { year: 'Nov 22, 1963', title: 'The Grimsby Call', era: 'assassination', description: 'The Cambridge News received an anonymous warning to call the American Embassy minutes before JFK was shot. Later traced to Grimsby.', source: 'Michael Eddowes Investigation' },
  { year: 'Jan-Feb 1964', title: 'FBI Interrogations & Perjury', era: 'aftermath', description: 'Lied repeatedly about Bowen, Osborne, the bus trip, and whether the two identities belonged to the same person.', source: 'Warren Commission Exhibit 2195' },
  { year: 'March 3, 1964', title: 'Confession & FBI Shutdown', era: 'aftermath', description: 'Admitted John Howard Bowen was an alias used since WWI. The FBI then closed its separate file.', source: 'Warren Commission Exhibit 2195' },
  { year: 'Aug 31, 1966', title: 'Death & False-Bottom Kit Bag', era: 'aftermath', description: "Died in San Antonio under the Bowen alias. Identity documents were found in a false-bottom bag and allegedly suppressed.", source: 'Texas Death Certificate / Funeral Chapel Archive' },
];

const DOCUMENT_PAGES: DocumentPage[] = [
  { page: 1, type: 'Official Report', date: '1964-03-11', notes: 'FBI synopsis: Osborne sat next to Oswald on the bus. Interrogation timeline of lies.', entities: ['Emory Horton', 'Lee Harvey Oswald', 'Albert Osborne', 'John Howard Bowen'] },
  { page: 2, type: 'Table of Contents', date: '1964-03-11', notes: 'Table of contents for Exhibit 2195 and description of birth and letter enclosures.', entities: ['James Osborne', 'Emily Cole'] },
  { page: 3, type: 'Official Report', date: '1963-12-02', notes: 'Flecha Roja bus manifest analysis, including William S. Shively and Roberto Morales.', entities: ['Roberto Morales', 'Pablo Vasquez', 'William S. Shively', 'Harry J. Mitchell'] },
  { page: 4, type: 'Official Report', date: '1963-12-05', notes: 'Houston effort to locate Bowen. McFarland says Oswald sat with an 80-year-old writing on Lisbon.', entities: ['John McFarland', 'Charles M. Pickel', 'George Sharp'] },
  { page: 5, type: 'Official Report', date: '1964-01-21', notes: "Knoxville Journal records of Bowen's missions and letters praising mission work.", entities: ['Hal C. Stephens', 'Martin Hidalgo', 'C.E. Lacey', 'Clara Bull'] },
  { page: 8, type: 'Official Letter', date: '1964-02-03', notes: "Detroit Police and Canadian Consulate checks into Osborne's aliases.", entities: ['George Blackstock', 'Percy Whatmough', 'Milton Kaack'] },
  { page: 11, type: 'Official Report', date: '1964-02-11', notes: 'Plymouth Brethren and Baptist preacher records check. Itinerant minister history.', entities: ['Wylie Uptain', 'James A. Bowen', 'Emily Bowen', 'Sarah Hall'] },
  { page: 13, type: 'Official Report', date: '1964-02-18', notes: "Timeline of Bowen's border crossings and hotel stays in Laredo and Sabinas Hidalgo.", entities: ['Oscar Ferrino', 'Leopoldo Armijo', 'Walter L. Hluchan'] },
  { page: 15, type: 'Official Report', date: '1964-02-20', notes: 'Flecha Roja ticket details, luggage, typewriters, and religious books.', entities: ['Oscar Ferrino', 'Leopoldo Armijo', 'A.D. Mula'] },
  { page: 19, type: 'Official Report', date: '1964-02-25', notes: 'Somerset House birth registry checks verifying Emily Cole and James Osborne.', entities: ['Ada Amos', 'Emily Osborne', 'James Osborne'] },
  { page: 20, type: 'Official Report', date: '1964-02-25', notes: 'Sister Ada Amos and brother Walter interviewed in Grimsby.', entities: ['Ada Amos', 'Walter Osborne', 'Patricia Winston', 'Pamela Mumford'] },
  { page: 26, type: 'Official Report', date: '1964-02-28', notes: 'Hot Springs and Russellville checks regarding post office box ownership.', entities: ['William Shively', 'Horace Willis'] },
  { page: 30, type: 'Official Report', date: '1964-02-18', notes: 'Cridlin family interview in Jonesville, Virginia, detailing financial gifts to Bowen.', entities: ['Walter Hluchan', 'George Cridlin', 'Joe Cridlin'] },
  { page: 31, type: 'Official Report', date: '1964-02-18', notes: 'Internal Revenue check on Mixteca Baptist Mission contributions and donor list.', entities: ['Fred Allen', 'Louise Fraley'] },
  { page: 34, type: 'Official Report', date: '1963-12-04', notes: "Jones Printing order for Hands Off Cuba handbills placed under the name 'OSBORNE'.", entities: ['Myra Silver', 'John M. McCarthy'] },
  { page: 35, type: 'Official Report', date: '1964-03-04', notes: 'Myra Silver shown Osborne and Bowen photos. Concludes the customer was a young man.', entities: ['Myra Silver', 'Milton Kaack'] },
  { page: 40, type: 'Official Report', date: '1964-02-21', notes: "Passport Office search in Washington, D.C. Osborne's Canadian passport history.", entities: ['Mazie Scogin', 'Thomas White', 'Sidney Davis'] },
  { page: 41, type: 'Official Report', date: '1964-02-25', notes: 'Marina Oswald and Ruth Paine interviewed. Jack Leslie Bowen checked.', entities: ['Marina Oswald', 'Ruth Paine', 'Declan Ford', 'Jack Leslie Bowen'] },
  { page: 43, type: 'Official Report', date: '1964-02-21', notes: 'Jack Leslie Bowen check at Jaggars-Chiles-Stovall and possible Jack Ruby connections.', entities: ['Jack Ruby', 'Jack L. Bowen', 'Alexander Kleinlerer'] },
  { page: 50, type: 'Official Certificate', date: '1964-02-18', notes: 'Certified copy of birth entry for Albert Osborne, Great Grimsby. Father: fisherman.', entities: ['Albert Osborne', 'Emily Osborne', 'James Osborne'] },
];

const ANOMALIES: Anomaly[] = [
  {
    label: 'Focal Point 1',
    title: 'The Flecha Roja Bus Seatmate',
    body: [
      'Six passengers, including British surgeon John McFarland, identified Osborne as the elderly man who sat beside Oswald on the Mexico City bus.',
      "Osborne told the FBI he sat next to a dark-skinned Hispanic young man and that he was the only English speaker. The manifest and witness statements broke that story.",
    ],
  },
  {
    label: 'Focal Point 2',
    title: 'The Oct 10 New Orleans Passport',
    body: [
      'Immediately after the Mexico trip, Osborne canceled a four-month-old Canadian passport and obtained a new one.',
      'He claimed continuous residence in Montreal since 1917, erasing Knoxville, Laredo, and decades of border movement.',
    ],
  },
  {
    label: 'Focal Point 3',
    title: 'The Grimsby Pre-Assassination Call',
    body: [
      'An anonymous caller warned the Cambridge News to call the American Embassy for big news 25 minutes before JFK was shot.',
      "The call was later traced to Grimsby, where Osborne was staying with his sister. His whereabouts at that hour remain the page's live wire.",
    ],
  },
  {
    label: 'Focal Point 4',
    title: 'The False-Bottom Kit Bag',
    body: [
      "After Osborne died under the Bowen alias, Rev. Lyman Erickson found a kit bag with a false bottom containing Osborne's identity papers.",
      'Erickson later said the FBI instructed him to suppress funeral notices and forget what he knew.',
    ],
  },
  {
    label: 'Focal Point 5',
    title: 'The Torbitt Document',
    body: [
      'The controversial Torbitt Document alleges Osborne recruited a professional assassination team from Mexico.',
      'The claim is not direct evidence, but it shows Osborne became an early node for researchers mapping suspicious operational overlaps.',
    ],
  },
  {
    label: 'Focal Point 6',
    title: 'The 1929 Aberdeen Devotional',
    body: [
      'A 1929 newspaper item appears to place Osborne and the real John Howard Bowen in the same church service.',
      'That meeting gives the identity theft a tangible ritual origin: a sermon, a devotional, a name, and a life taken up as cover.',
    ],
  },
];

const RECONSTRUCTIONS: Reconstruction[] = [
  {
    figure: 'Fig 1',
    date: 'September 26-27, 1963',
    title: 'The Flecha Roja Bus Seatmate',
    src: '/Ritual/flecha-roja-bus-seatmate.jpg',
    alt: 'Oswald and Osborne on the Flecha Roja bus in 1963',
    caption: 'Reconstruction of Flecha Roja bus No. 516 leaving Nuevo Laredo.',
    description: 'Multiple passengers placed Albert Osborne, traveling as Bowen, in the front row next to Lee Harvey Oswald during the 19-hour bus ride to Mexico City.',
    details: [
      'Oswald: thin, 23, light jacket and white shirt.',
      'Osborne: elderly, controlled, claiming to be an English teacher writing on the Lisbon earthquake.',
    ],
  },
  {
    figure: 'Fig 2',
    date: '1924-1929',
    title: 'The Chautauqua Stage',
    src: '/Ritual/chautauqua-stage.jpg',
    alt: 'Dr. Albert Osborne lecturing on a Chautauqua stage',
    caption: 'Reconstruction of Dr. Albert B. Osborne on the lecture circuit.',
    description: 'Before the Bowen identity hardened, Osborne moved as a lecturer and performer, fabricating credentials and foreign expertise in front of church and Lyceum audiences.',
    details: [
      'Persona: Oxford graduate, missionary child, India lecturer.',
      'Function: rehearsal space for accent, authority, and biographical invention.',
    ],
  },
  {
    figure: 'Fig 3',
    date: 'August 31, 1966',
    title: 'The False-Bottom Kit Bag',
    src: '/Ritual/false-bottom-kit-bag.jpg',
    alt: 'False-bottom kit bag containing Albert Osborne identity papers',
    caption: "Reconstruction of the secret compartment discovery in San Antonio.",
    description: "At Osborne's death, Rev. Lyman Erickson found identity papers hidden inside a false-bottom bag, turning the alias from rumor into physical evidence.",
    details: [
      'Contents: birth records, passport material, Canadian army papers.',
      'Aftermath: alleged FBI instruction to suppress funeral notices and forget the discovery.',
    ],
  },
  {
    figure: 'Fig 4',
    date: 'March 3, 1964',
    title: 'The Double-Agent Interrogation',
    src: '/Ritual/nashville-confession.jpg',
    alt: 'FBI interrogation of Albert Osborne at the Nashville YMCA',
    caption: 'Reconstruction of the FBI interrogation at the Nashville YMCA.',
    description: 'After months of denial, Osborne admitted that John Howard Bowen was his alias, collapsing the separate identities into one official subject.',
    details: [
      'Setting: Nashville YMCA interrogation room.',
      'Aftermath: the separate FBI file was shut down soon after the confession.',
    ],
  },
  {
    figure: 'Fig 5',
    date: 'Circa 1944-1953',
    title: 'The Staged Highland Mission',
    src: '/Ritual/mixteca-mission.jpg',
    alt: 'Osborne at a staged Mixtecan missionary post in Southern Mexico',
    caption: "Reconstruction of Osborne's staged Mixtecan missionary post.",
    description: 'The Mixteca mission presented a humble religious cover while donations flowed through Laredo and the true operation remained difficult to verify.',
    details: [
      'Cover: isolated mountain mission work among Mixteca communities.',
      'Mechanism: U.S. church donations routed through a Texas border address.',
    ],
  },
  {
    figure: 'Fig 6',
    date: 'October 10, 1963',
    title: 'Consulate Passport Manipulation',
    src: '/Ritual/new-orleans-consulate.jpg',
    alt: 'Osborne manipulating passport records at the Canadian Consulate in New Orleans',
    caption: 'Reconstruction of the New Orleans Canadian Consulate passport episode.',
    description: 'Days after the Mexico City bus trip, Osborne canceled a new passport and created another paper trail under his real name.',
    details: [
      'Claim: continuous Canadian residence since 1917.',
      'Problem: decades of Knoxville, Laredo, and Mexico activity disappear from the story.',
    ],
  },
  {
    figure: 'Fig 7',
    date: 'November 22, 1963',
    title: 'The Pre-Assassination Warning Call',
    src: '/Ritual/grimsby-warning-call.jpg',
    alt: 'Anonymous warning call placed from Grimsby before the JFK assassination',
    caption: 'Reconstruction of the anonymous warning call from Grimsby.',
    description: 'Minutes before the shooting in Dallas, the Cambridge News received a call warning them to contact the American Embassy for big news.',
    details: [
      'Trace: Grimsby, England, where Osborne was staying with his sister.',
      'Unanswered question: where exactly was Osborne when the call was placed?',
    ],
  },
];

const ERA_SUMMARY = ERAS.filter((era): era is { id: Exclude<EraId, 'all'>; label: string } => era.id !== 'all').map((era) => ({
  name: era.label,
  count: TIMELINE_EVENTS.filter((event) => event.era === era.id).length,
}));

const DOCUMENT_TYPE_SUMMARY = Array.from(
  DOCUMENT_PAGES.reduce((counts, doc) => counts.set(doc.type, (counts.get(doc.type) ?? 0) + 1), new Map<string, number>())
).map(([name, count]) => ({ name, count }));

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="ritual-stat">
      <div className="ritual-stat-value">{value}</div>
      <div className="ritual-stat-label">{label}</div>
    </div>
  );
}

function SummaryBars({
  title,
  items,
}: {
  title: string;
  items: { name: string; count: number }[];
}) {
  const max = Math.max(...items.map((item) => item.count));

  return (
    <article className="ritual-viz-card">
      <h3>{title}</h3>
      <div className="ritual-bars">
        {items.map((item) => {
          return (
            <div className="ritual-bar-row" key={item.name}>
              <span>{item.name}</span>
              <div className="ritual-bar-track">
                <div className="ritual-bar-fill" style={{ width: `${(item.count / max) * 100}%` }} />
              </div>
              <strong>{item.count}</strong>
            </div>
          );
        })}
      </div>
    </article>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button className={`ritual-chip ${active ? 'ritual-chip--active' : ''}`} onClick={onClick} type="button">
      {children}
    </button>
  );
}

function IdentitiesTab() {
  return (
    <div className="ritual-stack">
      <section className="ritual-prose">
        <h2>The Crossover & Identity Hijacking</h2>
        <p>
          Ritual begins here as a repeated act of attention: notice an anomaly, arrange traces, test a pattern, return to it later.
          Osborne is the first case file because his life keeps turning under inspection.
        </p>
      </section>

      <div className="ritual-card-grid">
        <article className="ritual-card">
          <span className="ritual-kicker">Real Subject</span>
          <h3>Albert Alexander Osborne</h3>
          <p><strong>Born:</strong> Nov 12, 1888, Grimsby, England.</p>
          <p><strong>Background:</strong> Grocer, British Army garrison soldier, Canadian Expeditionary Force veteran, itinerant lecturer.</p>
          <p className="ritual-quote">Admitted in 1964 that John Howard Bowen had been his alias since shortly after World War I.</p>
        </article>

        <article className="ritual-card">
          <span className="ritual-kicker">The Mask</span>
          <h3>John Howard Bowen</h3>
          <p><strong>Identity formed:</strong> Early 1930s, Knoxville, Tennessee.</p>
          <p><strong>Cover:</strong> Pious missionary, orphanage-raised teacher, Campfire Council founder, and Mixteca Baptist fundraiser.</p>
          <p className="ritual-quote">He could retire one identity by presenting the other as its successor.</p>
        </article>

        <article className="ritual-card">
          <span className="ritual-kicker">Hijacked Citizen</span>
          <h3>John Howard Bowen, Real</h3>
          <p><strong>Born:</strong> Jan 14, 1880, Chester, Pennsylvania.</p>
          <p><strong>Background:</strong> Printer, Railroad YMCA secretary, hotel worker, and vulnerable source of plausible biography.</p>
          <p className="ritual-quote">The two men crossed paths at Aberdeen Methodist Church in December 1929.</p>
        </article>
      </div>

      <article className="ritual-card ritual-card--wide">
        <h3>Military Records Audit</h3>
        <div className="ritual-table-wrap">
          <table className="ritual-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th>British Army, 1906</th>
                <th>Canadian Army, 1917</th>
                <th>Anomalous Discrepancy</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>Birth Year</td><td>1888</td><td>1885</td><td>Altered by three years.</td></tr>
              <tr><td>Height</td><td>5 feet, 4.5 inches</td><td>5 feet, 9 inches</td><td>Impossible adult gain of 4.5 inches.</td></tr>
              <tr><td>Middle Name</td><td>None</td><td>Victor Emmanuel</td><td>Fabricated prestige names.</td></tr>
              <tr><td>Malaria Claim</td><td>N/A</td><td>Egypt, 1915</td><td>No clear record of Egyptian service.</td></tr>
            </tbody>
          </table>
        </div>
      </article>
    </div>
  );
}

function MapTab() {
  const [selectedLocId, setSelectedLocId] = useState('mexico_city');
  const activeLocation = LOCATIONS.find((location) => location.id === selectedLocId) ?? LOCATIONS[0];

  return (
    <div className="ritual-stack">
      <section className="ritual-prose">
        <h2>Interactive Travel Network</h2>
        <p>
          Click the nodes to move through Osborne&apos;s route: garrisons, mission lectures, Knoxville institutions, border operations,
          the Mexico City bus, and the final San Antonio suppression story.
        </p>
      </section>

      <div className="ritual-map-layout">
        <div className="ritual-map-card">
          <div className="ritual-map-header">
            <span>Travel Network</span>
            <strong>1888-1966</strong>
          </div>
          <svg viewBox="0 0 800 320" role="img" aria-label="Travel network map for Albert Osborne">
            <line x1="0" y1="80" x2="800" y2="80" />
            <line x1="0" y1="160" x2="800" y2="160" />
            <line x1="0" y1="240" x2="800" y2="240" />
            <line x1="200" y1="0" x2="200" y2="320" />
            <line x1="400" y1="0" x2="400" y2="320" />
            <line x1="600" y1="0" x2="600" y2="320" />
            <path d="M 450 60 Q 320 50 225 80" />
            <path d="M 225 80 L 240 105 L 205 120" />
            <path d="M 205 120 Q 170 140 145 175" />
            <path className="ritual-route-hot" d="M 145 175 L 130 220" />
            <path d="M 145 175 Q 165 155 180 145" />
            <path d="M 180 145 Q 320 80 450 60" />
            <path d="M 450 60 Q 550 110 620 160" />
            <path d="M 240 105 L 280 120" />
            {LOCATIONS.map((location) => {
              const selected = selectedLocId === location.id;
              return (
                <g
                  key={location.id}
                  className={selected ? 'ritual-node ritual-node--active' : 'ritual-node'}
                  onClick={() => setSelectedLocId(location.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') setSelectedLocId(location.id);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <circle cx={location.coord[0]} cy={location.coord[1]} r={selected ? 8 : 5} />
                  {selected && <circle className="ritual-node-ring" cx={location.coord[0]} cy={location.coord[1]} r={15} />}
                  <text x={location.coord[0]} y={location.coord[1] - 12} textAnchor="middle">
                    {location.id === 'new_orleans' ? 'New Orleans' : location.id === 'mexico_city' ? 'Mexico City' : location.name.split(',')[0]}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <article className="ritual-card ritual-detail-card">
          <span className="ritual-kicker">{activeLocation.years}</span>
          <h3>{activeLocation.name}</h3>
          <p><strong>Role:</strong> {activeLocation.role}</p>
          <p>{activeLocation.description}</p>
          {activeLocation.id === 'mexico_city' && (
            <p className="ritual-alert"><strong>The seatmate match:</strong> witnesses placed Osborne on the row with Oswald for the 19-hour ride.</p>
          )}
          {activeLocation.id === 'grimsby' && (
            <p className="ritual-alert"><strong>The warning call:</strong> traced to the same town where Osborne was staying before the assassination.</p>
          )}
        </article>
      </div>

      <div className="ritual-viz-grid">
        <SummaryBars title="Timeline Events by Era" items={ERA_SUMMARY} />
        <SummaryBars title="Indexed Exhibit Pages by Type" items={DOCUMENT_TYPE_SUMMARY} />
      </div>
    </div>
  );
}

function TimelineTab() {
  const [era, setEra] = useState<EraId>('all');
  const events = era === 'all' ? TIMELINE_EVENTS : TIMELINE_EVENTS.filter((event) => event.era === era);

  return (
    <div className="ritual-stack">
      <div className="ritual-toolbar">
        <h2>The Life Trail</h2>
        <div className="ritual-chip-row">
          {ERAS.map((item) => (
            <Chip key={item.id} active={era === item.id} onClick={() => setEra(item.id)}>
              {item.label}
            </Chip>
          ))}
        </div>
      </div>

      <SummaryBars title="Timeline Events by Era" items={ERA_SUMMARY} />

      <div className="ritual-timeline">
        {events.map((event) => (
          <article className={`ritual-timeline-card ritual-era-${event.era}`} key={`${event.year}-${event.title}`}>
            <div>
              <span className="ritual-year">{event.year}</span>
              <h3>{event.title}</h3>
            </div>
            <p>{event.description}</p>
            <span className="ritual-source">Source: {event.source}</span>
          </article>
        ))}
      </div>
    </div>
  );
}

function AnomaliesTab() {
  return (
    <div className="ritual-stack">
      <section className="ritual-prose">
        <h2>Key Anomalies & Coincidences</h2>
        <p>
          These are not verdicts. They are pressure points: repeated names, altered records, impossible timing, and behavior that keeps
          inviting one more pass through the file.
        </p>
      </section>

      <div className="ritual-card-grid ritual-card-grid--two">
        {ANOMALIES.map((anomaly) => (
          <article className="ritual-card" key={anomaly.title}>
            <span className="ritual-kicker">{anomaly.label}</span>
            <h3>{anomaly.title}</h3>
            {anomaly.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </article>
        ))}
      </div>

      <article className="ritual-card ritual-card--wide">
        <h3>Forensic Spotlight</h3>
        <p>
          The New Orleans &quot;Osborne&quot; handbill and the Jaggars-Chiles-Stovall &quot;Jack Bowen&quot; coincidence form a strange
          name-ring around Oswald: Osborne on a print order, Bowen at a Dallas workplace, Osborne/Bowen on the Mexico City bus.
        </p>
      </article>
    </div>
  );
}

function DocumentsTab() {
  const [search, setSearch] = useState('');
  const filteredDocs = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return DOCUMENT_PAGES;
    return DOCUMENT_PAGES.filter((doc) => (
      doc.type.toLowerCase().includes(term) ||
      doc.notes.toLowerCase().includes(term) ||
      doc.date.toLowerCase().includes(term) ||
      doc.entities.some((entity) => entity.toLowerCase().includes(term))
    ));
  }, [search]);

  return (
    <div className="ritual-stack">
      <div className="ritual-toolbar">
        <div>
          <h2>Exhibit 2195 Browser</h2>
          <p>Indexed metadata from key pages in the Warren Commission Osborne file.</p>
        </div>
        <label className="ritual-search">
          <span>Filter documents</span>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by keyword, type, or entity"
            type="search"
          />
        </label>
      </div>

      <SummaryBars title="Indexed Exhibit Pages by Type" items={DOCUMENT_TYPE_SUMMARY} />

      <div className="ritual-table-wrap">
        <table className="ritual-table ritual-doc-table">
          <thead>
            <tr>
              <th>Page</th>
              <th>Type</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Entities</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map((doc) => (
              <tr key={doc.page}>
                <td>Page {doc.page}</td>
                <td>{doc.type}</td>
                <td>{doc.date}</td>
                <td>{doc.notes}</td>
                <td>
                  <div className="ritual-entity-row">
                    {doc.entities.map((entity) => <span key={entity}>{entity}</span>)}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ReconstructionsTab() {
  return (
    <div className="ritual-stack">
      <section className="ritual-prose">
        <h2>Photorealistic Historical Reconstructions</h2>
        <p>
          Visual representations of key scenes from Osborne&apos;s life, restored from the original local canvas and presented as
          case-file plates.
        </p>
      </section>

      <div className="ritual-reconstruction-stack">
        {RECONSTRUCTIONS.map((scene) => (
          <article className="ritual-reconstruction" key={scene.title}>
            <figure>
              <img src={scene.src} alt={scene.alt} />
              <figcaption>{scene.caption}</figcaption>
            </figure>
            <div className="ritual-reconstruction-body">
              <span className="ritual-kicker">{scene.figure} · {scene.date}</span>
              <h3>{scene.title}</h3>
              <p>{scene.description}</p>
              <div className="ritual-reconstruction-details">
                {scene.details.map((detail) => <p key={detail}>{detail}</p>)}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export function RitualDossier({ embedded = false }: { embedded?: boolean }) {
  const [activeTab, setActiveTab] = useState<TabId>('identities');

  return (
    <div className={embedded ? 'ritual-dossier ritual-dossier--embedded' : 'section-dark ritual-page ritual-dossier'}>
      {!embedded && <SiteNav variant="dark" />}

      <main className={embedded ? 'ritual-shell ritual-shell--embedded' : 'ritual-shell'}>
        <section className="ritual-hero">
          <div>
            {!embedded && <Link href="/" className="ritual-back">Return to terrain</Link>}
            <p className="ritual-label">Current investigations · strange evidence · experiments in attention</p>
            <h1>Ritual</h1>
            <p>
              A working record of the anomalous: case files, recurring signs, field experiments, and the odd events that keep asking
              to be arranged into pattern. The current dossier centers on
              {' '}
              <a href="https://www.history-matters.com/archive/jfk/wc/wcvols/wh25/pdf/WH25_CE_2195.pdf" target="_blank" rel="noopener noreferrer">
                Warren Commission Exhibit 2195
              </a>
              .
            </p>
          </div>
          <div className="ritual-case-card">
            <span className="ritual-kicker">Active Case File</span>
            <div className="ritual-classified">Classified Intelligence</div>
            <h2>The Dual Life of Albert Osborne</h2>
            <p>Oswald&apos;s enigmatic bus seatmate, reconstructed as an interactive dossier.</p>
          </div>
        </section>

        <section className="ritual-stats" aria-label="Albert Osborne case summary">
          <StatCard value="75" label="Age during 1963 bus trip" />
          <StatCard value="2" label="Primary active identities" />
          <StatCard value="19h" label="Oswald bus seatmate window" />
          <StatCard value="50" label="Exhibit pages indexed" />
        </section>

        <section className="ritual-overview">
          <h2>Case Overview</h2>
          <p>
            Albert Alexander Osborne, alias <strong>John Howard Bowen</strong>, operated through missionary lectures, youth philanthropy,
            border religion, suspicious documents, and the JFK investigation. On Sept 26-27, 1963, he sat beside Lee Harvey Oswald on
            Flecha Roja bus No. 516 to Mexico City. His background exhibits falsified military records, passport anomalies, anti-Kennedy
            Baptist circles, and a warning call traced to his UK temporary address before the assassination.
          </p>
        </section>

        <nav className="ritual-tabs" aria-label="Ritual sections">
          {TABS.map((tab) => (
            <Chip key={tab.id} active={activeTab === tab.id} onClick={() => setActiveTab(tab.id)}>
              {tab.label}
            </Chip>
          ))}
        </nav>

        <section className="ritual-panel">
          {activeTab === 'identities' && <IdentitiesTab />}
          {activeTab === 'map' && <MapTab />}
          {activeTab === 'timeline' && <TimelineTab />}
          {activeTab === 'anomalies' && <AnomaliesTab />}
          {activeTab === 'documents' && <DocumentsTab />}
          {activeTab === 'reconstructions' && <ReconstructionsTab />}
        </section>
      </main>

      {!embedded && <Footer />}

      <style jsx>{`
        .ritual-page {
          min-height: 100vh;
          background:
            radial-gradient(circle at 18% 0%, rgba(255, 255, 255, 0.12), transparent 31rem),
            radial-gradient(circle at 92% 18%, rgba(179, 179, 204, 0.13), transparent 26rem),
            linear-gradient(180deg, var(--void) 0%, var(--void-2) 48%, var(--void) 100%);
        }

        .ritual-shell {
          width: min(1180px, calc(100vw - 40px));
          margin: 0 auto;
          padding: 112px 0 80px;
        }

        .ritual-shell--embedded {
          width: 100%;
          padding: 0 20px 48px;
        }

        .ritual-hero {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 360px;
          gap: 32px;
          align-items: end;
          padding-bottom: 34px;
          border-bottom: 1px solid var(--rule-dark);
        }

        .ritual-dossier--embedded .ritual-hero {
          grid-template-columns: 1fr;
          padding-bottom: 24px;
        }

        .ritual-dossier--embedded .ritual-hero h1 {
          display: none;
        }

        .ritual-dossier--embedded .ritual-case-card {
          display: none;
        }

        .ritual-dossier--embedded .ritual-stats {
          margin: 22px 0;
        }

        .ritual-dossier--embedded .ritual-tabs {
          top: 0;
        }

        .ritual-back,
        .ritual-label,
        .ritual-kicker,
        .ritual-stat-label,
        .ritual-year,
        .ritual-source,
        .ritual-search span {
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.13em;
        }

        .ritual-back {
          display: inline-block;
          margin-bottom: 28px;
          color: var(--ivory-dim);
          font-size: 0.72rem;
        }

        .ritual-label {
          color: var(--ivory-dim);
          font-size: 0.68rem;
          margin-bottom: 8px;
        }

        .ritual-hero h1 {
          font-family: var(--font-serif);
          font-style: italic;
          font-size: clamp(4rem, 12vw, 9rem);
          line-height: 0.9;
          margin-bottom: 24px;
        }

        .ritual-hero p,
        .ritual-overview p,
        .ritual-prose p,
        .ritual-toolbar p {
          color: var(--ivory-dim);
          max-width: 720px;
        }

        .ritual-hero a {
          color: var(--ivory);
          border-bottom: 1px solid rgba(255, 255, 255, 0.35);
        }

        .ritual-hero a:hover {
          color: var(--terra);
        }

        .ritual-case-card,
        .ritual-card,
        .ritual-overview,
        .ritual-stat,
        .ritual-map-card,
        .ritual-viz-card,
        .ritual-reconstruction {
          background: rgba(255, 255, 255, 0.065);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-lg);
        }

        .ritual-case-card,
        .ritual-overview,
        .ritual-card,
        .ritual-stat,
        .ritual-viz-card,
        .ritual-reconstruction {
          padding: 24px;
        }

        .ritual-case-card h2,
        .ritual-overview h2,
        .ritual-prose h2,
        .ritual-toolbar h2,
        .ritual-viz-card h3 {
          font-family: var(--font-serif);
          font-style: italic;
          color: var(--ivory);
          margin-bottom: 8px;
        }

        .ritual-classified {
          border: 1px solid rgba(255, 255, 255, 0.36);
          border-radius: 999px;
          color: var(--ivory);
          display: inline-block;
          font-family: var(--font-mono);
          font-size: 0.62rem;
          letter-spacing: 0.1em;
          margin: 0 0 18px;
          padding: 4px 8px;
          text-transform: uppercase;
        }

        .ritual-kicker {
          display: inline-block;
          color: var(--ivory-dim);
          font-size: 0.64rem;
          margin-bottom: 10px;
        }

        .ritual-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
          margin: 28px 0;
        }

        .ritual-stat-value {
          font-family: var(--font-display);
          font-size: 2.2rem;
          line-height: 1;
          color: var(--ivory);
        }

        .ritual-stat-label {
          color: var(--ivory-dim);
          font-size: 0.64rem;
          margin-top: 10px;
        }

        .ritual-overview {
          margin-bottom: 24px;
        }

        .ritual-overview strong {
          color: var(--ivory);
          font-weight: 400;
        }

        .ritual-tabs,
        .ritual-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .ritual-tabs {
          position: sticky;
          top: 74px;
          z-index: 20;
          padding: 12px 0;
          background: rgba(8, 8, 10, 0.86);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--rule-dark);
        }

        .ritual-chip {
          position: relative;
          overflow: hidden;
          border: 1px solid var(--rule-dark);
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.02);
          color: var(--ivory);
          cursor: pointer;
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 400;
          letter-spacing: 0.01em;
          padding: 11px 16px 12px;
          text-align: left;
          transition:
            background var(--duration) var(--ease),
            border-color var(--duration) var(--ease),
            color var(--duration) var(--ease),
            transform var(--duration) var(--ease);
        }

        .ritual-chip::before {
          content: '';
          position: absolute;
          inset: 4px;
          border: 1px solid rgba(255, 255, 255, 0.055);
          border-radius: calc(var(--radius-md) - 3px);
          pointer-events: none;
        }

        .ritual-chip::after {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 2px;
          background: var(--ivory);
          opacity: 0;
          transform: scaleY(0.35);
          transform-origin: center;
          transition:
            opacity var(--duration) var(--ease),
            transform var(--duration) var(--ease);
        }

        .ritual-chip:hover,
        .ritual-chip--active {
          background: rgba(255, 255, 255, 0.055);
          border-color: rgba(255, 255, 255, 0.28);
          color: var(--ivory);
          transform: translateY(-1px);
        }

        .ritual-chip:hover::after,
        .ritual-chip--active::after {
          opacity: 0.7;
          transform: scaleY(1);
        }

        .ritual-chip--active {
          background: rgba(255, 255, 255, 0.09);
          border-color: rgba(255, 255, 255, 0.38);
        }

        .ritual-chip:focus-visible {
          outline: 1px solid var(--ivory);
          outline-offset: 3px;
        }

        .ritual-panel {
          padding-top: 28px;
        }

        .ritual-stack {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }

        .ritual-card-grid,
        .ritual-plate-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 18px;
        }

        .ritual-card-grid--two {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .ritual-card--wide {
          grid-column: 1 / -1;
        }

        .ritual-card h3,
        .ritual-plate h3,
        .ritual-detail-card h3,
        .ritual-timeline-card h3 {
          color: var(--ivory);
          margin-bottom: 12px;
        }

        .ritual-card p,
        .ritual-reconstruction p,
        .ritual-detail-card p,
        .ritual-timeline-card p {
          color: var(--ivory-dim);
          font-size: 0.96rem;
          line-height: 1.65;
          margin-bottom: 10px;
        }

        .ritual-card strong,
        .ritual-detail-card strong {
          color: var(--ivory);
          font-weight: 400;
        }

        .ritual-quote,
        .ritual-alert {
          border-left: 2px solid var(--accent-light);
          padding-left: 14px;
          font-style: italic;
        }

        .ritual-map-layout {
          display: grid;
          grid-template-columns: minmax(0, 2fr) minmax(280px, 1fr);
          gap: 22px;
        }

        .ritual-map-card {
          overflow: hidden;
          padding: 12px;
        }

        .ritual-map-header {
          align-items: center;
          color: var(--ivory-dim);
          display: flex;
          font-family: var(--font-mono);
          font-size: 0.64rem;
          justify-content: space-between;
          letter-spacing: 0.12em;
          padding: 4px 4px 12px;
          text-transform: uppercase;
        }

        .ritual-map-header strong {
          color: var(--ivory);
          font-weight: 500;
        }

        .ritual-map-card svg {
          width: 100%;
          height: auto;
          background:
            radial-gradient(circle at 18% 68%, rgba(26, 26, 46, 0.12), transparent 14rem),
            linear-gradient(180deg, rgba(247, 244, 239, 0.98), rgba(221, 215, 204, 0.96));
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: var(--radius-md);
        }

        .ritual-map-card line,
        .ritual-map-card path {
          fill: none;
          stroke: rgba(26, 26, 46, 0.38);
          stroke-dasharray: 5 5;
        }

        .ritual-map-card path {
          stroke-width: 1.5;
        }

        .ritual-map-card .ritual-route-hot {
          stroke: var(--ink);
          stroke-width: 3;
          stroke-dasharray: none;
        }

        .ritual-node {
          cursor: pointer;
        }

        .ritual-node circle {
          fill: var(--ink-mid);
          stroke: var(--paper);
          stroke-width: 2;
        }

        .ritual-node text {
          fill: var(--ink);
          font-family: var(--font-mono);
          font-size: 10px;
          letter-spacing: 0.04em;
          paint-order: stroke;
          stroke: rgba(247, 244, 239, 0.92);
          stroke-width: 4px;
          user-select: none;
        }

        .ritual-node--active circle {
          fill: var(--void);
        }

        .ritual-node--active text {
          fill: var(--void);
          font-weight: 700;
        }

        .ritual-node .ritual-node-ring {
          fill: none;
          stroke: var(--void);
          opacity: 0.5;
        }

        .ritual-viz-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 18px;
        }

        .ritual-viz-card h3 {
          font-size: 1.25rem;
        }

        .ritual-bars {
          display: grid;
          gap: 11px;
          margin-top: 16px;
        }

        .ritual-bar-row {
          align-items: center;
          display: grid;
          gap: 10px;
          grid-template-columns: 112px minmax(0, 1fr) 28px;
        }

        .ritual-bar-row span,
        .ritual-bar-row strong {
          color: var(--ivory-dim);
          font-family: var(--font-mono);
          font-size: 0.66rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .ritual-bar-row strong {
          color: var(--ivory);
          text-align: right;
        }

        .ritual-bar-track {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 999px;
          height: 10px;
          overflow: hidden;
        }

        .ritual-bar-fill {
          background: var(--ivory);
          height: 100%;
        }

        .ritual-toolbar {
          display: flex;
          justify-content: space-between;
          gap: 18px;
          align-items: start;
        }

        .ritual-timeline {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 14px;
          max-height: 620px;
          overflow: auto;
          padding-right: 8px;
        }

        .ritual-timeline-card {
          border-left: 3px solid var(--rule-dark);
          padding: 18px 18px 16px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: var(--radius-md);
        }

        .ritual-era-assassination {
          border-left-color: var(--ivory);
        }

        .ritual-year,
        .ritual-source {
          color: var(--ivory-dim);
          font-size: 0.62rem;
        }

        .ritual-search {
          display: grid;
          gap: 8px;
          min-width: 300px;
        }

        .ritual-search span {
          color: var(--ivory-dim);
          font-size: 0.62rem;
        }

        .ritual-search input {
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--rule-dark);
          border-radius: var(--radius-md);
          color: var(--ivory);
          font: inherit;
          padding: 10px 12px;
        }

        .ritual-table-wrap {
          overflow-x: auto;
          border: 1px solid var(--rule-dark);
          border-radius: var(--radius-md);
        }

        .ritual-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 720px;
        }

        .ritual-table th,
        .ritual-table td {
          border-bottom: 1px solid var(--rule-dark);
          color: var(--ivory-dim);
          font-size: 0.9rem;
          line-height: 1.55;
          padding: 12px;
          text-align: left;
          vertical-align: top;
        }

        .ritual-table th {
          color: var(--ivory);
          font-family: var(--font-mono);
          font-size: 0.64rem;
          letter-spacing: 0.09em;
          text-transform: uppercase;
        }

        .ritual-table tr:last-child td {
          border-bottom: 0;
        }

        .ritual-entity-row {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .ritual-entity-row span {
          border: 1px solid var(--rule-dark);
          border-radius: 999px;
          color: var(--ivory-dim);
          font-size: 0.72rem;
          padding: 2px 7px;
        }

        .ritual-reconstruction-stack {
          display: grid;
          gap: 24px;
        }

        .ritual-reconstruction {
          align-items: start;
          display: grid;
          gap: 28px;
          grid-template-columns: minmax(0, 1.35fr) minmax(320px, 0.9fr);
        }

        .ritual-reconstruction figure {
          margin: 0;
        }

        .ritual-reconstruction img {
          aspect-ratio: 16 / 9;
          border: 1px solid rgba(255, 255, 255, 0.24);
          border-radius: var(--radius-md);
          display: block;
          object-fit: cover;
          width: 100%;
        }

        .ritual-reconstruction figcaption {
          color: var(--ivory-dim);
          font-size: 0.82rem;
          font-style: italic;
          margin-top: 10px;
          text-align: center;
        }

        .ritual-reconstruction-body h3 {
          color: var(--ivory);
          font-size: 1.45rem;
          margin-bottom: 10px;
        }

        .ritual-reconstruction-details {
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          display: grid;
          gap: 8px;
          margin-top: 18px;
          padding-top: 18px;
        }

        .ritual-reconstruction-details p {
          margin: 0;
        }

        :global(.ritual-page .site-footer) {
          border-top-color: var(--rule-dark);
        }

        :global(.ritual-page .footer-brand),
        :global(.ritual-page .footer-links a) {
          color: var(--ivory-dim);
        }

        @media (max-width: 900px) {
          .ritual-hero,
          .ritual-map-layout,
          .ritual-toolbar {
            grid-template-columns: 1fr;
            display: grid;
          }

          .ritual-stats,
          .ritual-viz-grid,
          .ritual-card-grid,
          .ritual-card-grid--two,
          .ritual-timeline,
          .ritual-plate-grid {
            grid-template-columns: 1fr;
          }

          .ritual-search {
            min-width: 0;
          }
        }

        @media (max-width: 760px) {
          .ritual-reconstruction {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 560px) {
          .ritual-shell {
            width: min(100vw - 28px, 1180px);
            padding-top: 90px;
          }

          .ritual-tabs {
            top: 64px;
          }

          .ritual-plate,
          .ritual-bar-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

export default function RitualExperience() {
  return <RitualDossier />;
}
