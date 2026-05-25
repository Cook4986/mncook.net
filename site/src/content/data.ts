/* =========================================================
   Content Data — Structured content for all site sections
   
   Migrated from Squarespace mncook.net.
   Each section maps to a top-level route.
   ========================================================= */

// --- TEXTUAL ---

export interface Publication {
  title: string;
  venue: string;
  year: number;
  url: string;
}

export interface Fiction {
  title: string;
  description: string;
  pdfUrl?: string;
}

export const publications: Publication[] = [
  {
    title: 'Virtual Serendipity',
    venue: 'The Journal of Academic Librarianship',
    year: 2017,
    url: 'https://doi.org/10.1016/j.acalib.2017.09.003',
  },
  {
    title: 'Interactive Mindfulness Technology',
    venue: 'C&RL News',
    year: 2018,
    url: 'http://crln.acrl.org/index.php/crlnews/article/view/9328/10444',
  },
  {
    title: 'Challenges and Strategies for Educational VR',
    venue: 'Information Technology and Libraries',
    year: 2019,
    url: 'https://ejournals.bc.edu/index.php/ital/article/view/11075',
  },
  {
    title: 'Managing Exploratory Units in Academic Libraries',
    venue: 'Journal of Library Administration',
    year: 2019,
    url: 'https://www.tandfonline.com/doi/full/10.1080/01930826.2019.1626647',
  },
  {
    title: 'Motivations, Design, and Preliminary Testing for a 360° Vision Simulator',
    venue: 'Virtual Reality',
    year: 2021,
    url: 'https://link.springer.com/article/10.1007/s10055-020-00433-x',
  },
  {
    title: 'Banned Objects Week',
    venue: 'Journal of Intellectual Freedom & Privacy',
    year: 2021,
    url: 'https://journals.ala.org/index.php/jifp/article/view/6519',
  },
  {
    title: 'The Lifecycle of Scholarly 3D Content',
    venue: 'The Journal of Academic Librarianship',
    year: 2024,
    url: 'https://www.sciencedirect.com/science/article/abs/pii/S0099133324000946',
  },
  {
    title: 'Immersive Quality Control for 3D Data Curation',
    venue: 'Information Research',
    year: 2026,
    url: 'https://doi.org/10.47989/ir31iConf64136',
  }
];

export const fiction: Fiction[] = [
  { title: 'Walk Your Age and Live Forever', description: 'Every step physically extends your lifespan.', pdfUrl: 'https://mncook.net/s/Walk-Your-Age_Cook2023_website.pdf' },
  { title: 'Ancient Power', description: 'Elite supplicants gather for a dark, subterranean ritual beneath Widener Library.', pdfUrl: 'https://mncook.net/s/AncientPower_Cook2025.pdf' },
  { title: 'Listen to the Dead', description: 'A student sleeping in Mount Auburn Cemetery is cornered by a midnight hunt.', pdfUrl: 'https://mncook.net/s/Listen-to-the-Dead_Cook2022-sg32.pdf' },
  { title: 'First Pizza on Mars', description: 'The sole baker on Mars runs a black-market supply chain under a deadly five-pie limit.', pdfUrl: 'https://mncook.net/s/Best-Pizza_Cook2023_website.pdf' },
  { title: 'Petty Cash', description: 'A burglar is haunted by an antique Ouija board projecting alien geometries on his walls.', pdfUrl: 'https://mncook.net/s/Petty-Cash_Cook2023.pdf' },
  { title: 'Zoning Violation', description: 'A cut-rate psychic in Cambridge begins channeling eccentric, dangerous voices from the beyond.', pdfUrl: 'https://mncook.net/s/theFlorist_Cook2022.pdf' },
  { title: 'Scorpio', description: 'A multi-layered thriller linking a phantom jetpacker with a midnight library researcher.', pdfUrl: 'https://mncook.net/s/Scorpio_Cook2022_October-fwmr.pdf' }
];

// --- PROFESSIONAL ---

export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  emoji: string;
  url?: string;
  liveUrl?: string;
}

export const projects: Project[] = [
  {
    id: 'giza-twin',
    title: 'Giza Digital Twin',
    description: 'Interactive 3D visualization of the Giza Plateau with 4,447 tomb sites, raycasted pin placement, and LOD system. Built for Harvard\'s Giza Project.',
    tags: ['Three.js', 'React', 'Next.js', 'Blender', 'Python'],
    emoji: '🏛️',
    url: 'https://github.com/Cook4986/AutoTomb',
  },
  {
    id: 'scribble',
    title: 'Scribble',
    description: 'AI-powered archival transcription platform. Multi-model pipeline (Gemini, GPT-4o, Claude) for handwriting recognition with human-in-the-loop review.',
    tags: ['Next.js', 'Python', 'FastAPI', 'Gemini', 'Render'],
    emoji: '✒️',
    url: 'https://github.com/Cook4986/scribble',
  },
  {
    id: 'sliceit',
    title: 'SliceIT!',
    description: 'Browser-based 3D mesh slicer using manifold-3d WASM. Knife, lasso, box, and sphere boolean tools with multi-format import/export.',
    tags: ['TypeScript', 'Three.js', 'R3F', 'WASM', 'Vite'],
    emoji: '✂️',
    url: 'https://github.com/Cook4986/SliceIT',
    liveUrl: 'https://slice-it-chi.vercel.app',
  },
  {
    id: 'longhand',
    title: 'Longhand VR',
    description: 'VR word-cloud visualization for exploring text corpora in 3D space. NLP entity extraction rendered as navigable spatial data.',
    tags: ['Three.js', 'Python', 'NLP', 'VR', 'Mozilla Hubs'],
    emoji: '🥽',
    url: 'https://github.com/Cook4986/Longhand',
  },
  {
    id: '3dframe',
    title: '3DFrame',
    description: 'NEH-funded microcontroller frame for 3D-printed museum artifacts. Raspberry Pi + accelerometer drives interactive digital overlays.',
    tags: ['Raspberry Pi', 'Python', 'Arduino', '3D Printing'],
    emoji: '🔧',
  },
  {
    id: 'sparq',
    title: 'Sparq Labyrinth',
    description: 'Tangible maze interface for meditation practice. Laser-cut acrylic with embedded LEDs and capacitive touch sensing.',
    tags: ['Arduino', 'Laser Cutting', 'Electronics', 'UX'],
    emoji: '🌀',
  },
  {
    id: 'nieto',
    title: 'Nieto',
    description: 'Automated scraper for the experimental music scene in Germany-Austria-Switzerland. Aggregates venue/event data from regional sources.',
    tags: ['Python', 'Scraping', 'Data'],
    emoji: '🎵',
    url: 'https://github.com/Cook4986/nieto',
  },
  {
    id: 'rook',
    title: 'Rook Sensor',
    description: 'Off-grid SMS-based environmental monitoring for remote homestead. Temperature, humidity, and soil moisture alerts via Twilio.',
    tags: ['Python', 'Raspberry Pi', 'IoT', 'Twilio'],
    emoji: '📡',
    url: 'https://github.com/Cook4986/rook-sensor',
  },
];

// NOTE: The `expeditions` dataset was removed during cleanup — the
// spatial overlay renders hand-written content directly inline rather
// than rendering from this array. Re-introduce here if a data-driven
// timeline ever returns.

export interface BizarreBookEpisode {
  title: string;
  youtubeId: string;
  start?: number;
  description: string;
}

export const bizarreBooks: BizarreBookEpisode[] = [
  { title: 'Apparitions at Harvard', youtubeId: '5JDxyVpmbJA', start: 16, description: 'Eerie specters and unexplained phenomena within the historic halls of Harvard Yard.' },
  { title: 'Magi in Melrose', youtubeId: 'O_huh3uV63w', start: 13, description: 'Exploring the occult histories and esoteric practitioners hidden in Melrose, Massachusetts.' },
  { title: 'Ipswitches in Essex', youtubeId: '5AWbhtRo9gQ', start: 39, description: 'Tracing folklore, local legends, and witch-trial history along the Essex coast.' },
  { title: 'Devils in Dungeons', youtubeId: 'ap0ned0I5wk', start: 77, description: 'Delving into subterranean structures, dungeons, and early American horror lore.' },
  { title: 'Masks and Monsters', youtubeId: 'c9c04EhvCGg', start: 74, description: 'An investigation into ritualistic masks, local monsters, and the psychology of fear.' },
  { title: 'Wraiths in Wakefield', youtubeId: 'Q-iTRcnKOPs', description: 'Phantom sightings and chilling ghostly reports around the historic Wakefield estates.' },
  { title: 'Sikhs of the Salish Sea', youtubeId: 'O5pukuVXg4M', start: 20, description: 'Uncovering the spiritual histories and early migrations across the Pacific Northwest waters.' },
  { title: 'Firestone Freaks', youtubeId: 'ItuugteW4MI', description: 'Curious reports of anomalies and strange happenings near the Firestone industrial areas.' },
  { title: 'Gothic Goblins', youtubeId: 'M3gL652N2YI', description: 'Gothic architecture and mischievous folklore critters of early New England.' },
  { title: 'Sacrifice in the Stacks', youtubeId: 'vmTXjTLKYfs', description: 'A dark, atmospheric study of rituals and historic bindings hidden inside the library stacks.' }
];
