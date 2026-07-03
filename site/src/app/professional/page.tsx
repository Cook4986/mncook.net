/* Migrated Squarespace prose contains literal apostrophes/quotes in
   captions that JSX would otherwise complain about. */
/* eslint-disable react/no-unescaped-entities */
/* Raw <img> tags (not next/image) are used intentionally for the static export. */
/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import SiteNav from '@/components/ui/SiteNav';
import Footer from '@/components/ui/Footer';

export const metadata: Metadata = {
  title: 'Professional — matt cook',
  description: 'Experiments with microcontrollers, virtual reality, 3D scanning, mindfulness and more.',
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

function Embed({ src, title }: { src: string; title: string }) {
  return (
    <div style={{ margin: '48px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
      <iframe
        title={title}
        width="100%"
        height="100%"
        src={src}
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        allowFullScreen
        loading="lazy"
      />
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', margin: '0 0 32px', color: 'var(--ink)' }}>
      {children}
    </h2>
  );
}

function Rule() {
  return <hr style={{ border: 'none', borderTop: '1px solid var(--rule)', margin: '64px 0' }} />;
}

export default function ProfessionalPage() {
  return (
    <div className="section-warm">
      <SiteNav variant="warm" />

      <main id="main-content" className="content-section" style={{ paddingTop: '120px' }}>
        <div className="section-header">
          <div className="section-label">Engineering</div>
          <h1 className="section-title">Professional</h1>
        </div>

        {/* Original Squarespace /professional copy, reproduced verbatim */}
        <div style={{ maxWidth: '750px', margin: '0 auto', fontSize: '1.22rem', lineHeight: 1.75, color: 'var(--ink-mid)' }}>

          <p style={{ marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '1.05rem', color: 'var(--ink)' }}>
            As Digital Scholarship Program Manager for <a href="https://library.harvard.edu/" target="_blank" rel="noopener noreferrer">Harvard Library</a> (and, formerly, as Head of <a href="https://libraries.ou.edu/content/edge" target="_blank" rel="noopener noreferrer">Emerging Technologies</a> for the University of Oklahoma Libraries), I explore/develop/deploy tech for research and instructional purposes.
          </p>
          <p style={{ marginBottom: '24px', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '1.05rem', color: 'var(--ink)' }}>
            Below are a few examples. Please don't hesitate to <a href="/contact">reach out</a> to collaborate.
          </p>

          <Rule />

          {/* --- 3DFrame --- */}

          <Fig src="/Professional/3DF_testLogo3.webp" alt="3DFrame project logo" />

          <p style={{ marginBottom: '24px' }}>
            Deployed in virtual and augmented reality, 3D models provide the means for researchers and students to remotely experience diverse scholarly materials <em>first-hand</em>, though this content seldom finds its way into institutional repositories or peer-reviewed literature where it could be reused and cited. Currently, <strong>these methods are dispersed</strong>; an no single discipline, institution, or practitioner has yet to document a truly citable 3D curation method.
          </p>
          <p style={{ marginBottom: '24px' }}>
            The IMLS-funded <a href="https://imls.gov/grants/awarded/lg-254830-ols-23" target="_blank" rel="noopener noreferrer">3D Research Data Curation Framework (3DFrame) grant</a> is our attempt to conceptually unite interrelated - but administratively <em>disparate</em> - 3D data production, (immersive) analytics, and preservation methods, which combine to connect a range of computational processes. <strong>Our goal: ensure the scholarly rigor of 3D contents</strong>, thereby preserving these materials as credible (i.e., FAIR) primary sources for downstream citation by researchers across disciplines. Here’s 3DF so far…
          </p>

          <Fig src="/Professional/UofU_3DF_8.webp" alt="3DFrame site visit at the University of Utah" />

          <p style={{ marginBottom: '24px' }}>
            <a href="http://zacklischerkatz.com/" target="_blank" rel="noopener noreferrer">Professor Zack</a> and I have been working on the issue of scholarly 3D/VR for about a decade, <strong>since the release of the Oculus DK1</strong>. Mainly, we’ve focused on getting VR out of the lab and into the classroom, specifically by providing <a href="https://ital.corejournals.org/index.php/ital/article/view/11075" target="_blank" rel="noopener noreferrer">practical guidance and publishing on the instructional benefits</a>. Increasingly, <em>content</em> has been the issue, not a lack of interest. However, academic rigor for 3D contents remains an issue.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Accessible scanning techniques like photogrammetry have partially solved the content problem, but <strong>the scholarly value of these outputs isn’t measurable</strong>. To address the question of curation, we’ve dedicated part of 3DF to studying the-state-of-the-3D-production art, across academic and cultural heritage institutions, and another part (specifically, research question 4) to understanding the potential impact of quality control methods for 3D content in immersive viewing environments.
          </p>
          <p style={{ marginBottom: '24px' }}>
            <strong>Everyone is doing 3D scanning and viewing a little differently,</strong> depending on their training, discipline (and budget), home institution mission, and no one is quite sure what constitutes a “good” model at the end of the day . So, we must first understand what’s currently being done, and why…
          </p>

          <Fig src="/Professional/UMass_3DF_2.webp" alt="3DFrame site visit at UMass Amherst" />

          <p style={{ marginBottom: '24px' }}>
            At the core of 3DF is <em>travel</em>. <a href="https://imls.gov/sites/default/files/project-proposals/lg-254830-ols-23-full-proposal.pdf" target="_blank" rel="noopener noreferrer">The narrative</a> specifies a range of 3D scanning lab types, where the research team will observe, interview, and test current and future (XR-enhanced) workflows. Insofar as we are most interested in the quirks and idiosyncrasies, you can think of <strong>this approach as a sort of <em>ethnography</em></strong>. That is, we seek the sort of secret knowledge that disproportionally inform immature data types like 3D. Science and Technology Studies (STS), whose researchers have studied knowledge creation in weather centers and <a href="https://www.ida.liu.se/~729G12/mtrl/professional_vision.pdf" target="_blank" rel="noopener noreferrer">on research vessels</a> is a useful reference.
          </p>
          <p style={{ marginBottom: '24px' }}>
            The Irshick Lab and its <a href="https://digitallife3d.org/" target="_blank" rel="noopener noreferrer">DigitalLife3D</a> project was our first stop in our mission to document the messy true story of 3D data production. There, at UMASS in the spring of 2024, we were given <strong>a behind-the-scenes look at both the methods and challenges associated with live animal scanning</strong>. Then, in February, we spent a week at Utah, witnessing contrasting end user communities representing public libraries (SLCPL) and flagship universities (UofUtah). Next will be sites geared towards tomographic (e.g., MicroCT) capture, large-scale plant science, and - at one of our home bases in Cambridge, MA - photogrammetric cultural heritage preservation.
          </p>
          <p style={{ marginBottom: '24px' }}>
            By the end of the grant period (2026) we anticipate visiting upwards of 10 distinct institutions, ranging from public universities, to the Ivy League, to cultural heritage institutions (i.e., museums). This diversity of research data will let us <strong>triangulate and then publish on the state and trajectory of 3D data curation</strong>, before extrapolating scalable methods that might help future practitioners, whatever their discipline or institution type. Immersive viewing is central to our forward thinking deliverables…
          </p>

          <Fig src="/Professional/RQ4_3DF_3.webp" alt="Immersive quality control experiment for research question 4" />

          <p style={{ marginBottom: '24px' }}>
            Getting back to research question #4 (RQ4), we have a viable protocol and promising early participant data <strong>comparing the performance of immersive and “flat” (traditional display-based) viewing experiences for 3D future quality control workflows</strong>. The experiment we’ve developed to gather this data begins this prompt:
          </p>
          <p style={{ marginBottom: '24px', fontStyle: 'italic' }}>
            Today you will be conducting quality control on 3D models. Momentarily, you will be prompted with a fictional scenario and asked to respond to a question. It is important that you limit your verbal response to "yes" or "no" only. Do you understand? We will now begin with a practice scenario.
          </p>
          <p style={{ marginBottom: '24px' }}>
            From there, <strong>participants are presented with a series of scenes and scenarios, each of which represents quality issues commonly encountered by 3D practitioners</strong>. Questions of mislabeling, feature identification, data loss, and resolution are all posed, and a combination of self-reported (cognitive load and usability) and performance (time and accuracy of task completion) data-gathering methods are deployed.
          </p>

          <Fig src="/Professional/MattZackJosh_3DF_2024.webp" alt="Matt, Zack, and Josh during 3DFrame fieldwork, 2024" />

          <Rule />

          {/* --- Longhand --- */}

          <SectionHeading>Longhand</SectionHeading>

          <Fig src="/Professional/longhandThrougput_updated.webp" alt="Longhand processing pipeline throughput diagram" />

          <p style={{ marginBottom: '24px' }}>
            <a href="https://github.com/caltechlibrary/handprint" target="_blank" rel="noopener noreferrer">Computational workflows</a> can generate machine-actionable data from “raw” (e.g. handwritten) textual source material, allowing the search of vast material collections. But while a keyword search is a useful way to collate and confirm hypotheses, it assumes the researcher has some ideas about where to begin; some existing research questions. <strong>Keyword search results don’t reveal the nature of a corpus</strong> as a whole though, nor do they represent the relationships between tokens whose source material might span media, time, or location.
          </p>

          <Fig src="/Professional/Longhand_gif_AmazingStories_AdobeExpress.gif" alt="Longhand 3D word cloud animation" />

          <p style={{ marginBottom: '24px' }}>
            <strong>So, how might one <em>glimpse</em> the contents of a text corpus</strong>, to generate preliminary research questions that might inform downstream search and more sophisticated analyses related to topics, sentiments, parts of speech, or named entities? Visualization – charts, graphs, diagrams, word clouds, etc. – are helpful at this <em>exploratory</em> research stage, when a researcher is simply trying to grasp the contents of a text corpus. This is where Longhand comes in.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Longhand is a word cloud generator, but the “words” are 3D models projected in 360 degrees around the user. <strong>Longhand exists to explore unwieldy text corpora (including in virtual reality)</strong> earlier in the research lifecycle. In addition to exposing text-centric researchers to the historically STEM-oriented benefits of Reality (e.g. depth cues, body tracking, etc.). Longhand leverages our, “…ability to rapidly report object identiy or category after just a single brief glimpse of visual input” (<a href="https://www.sciencedirect.com/science/article/abs/pii/S1364661307001593" target="_blank" rel="noopener noreferrer">DiCarlo &amp; Cox, 2007</a>).
          </p>
          <p style={{ marginBottom: '24px' }}>
            Check out some preliminary test results, below, and <a href="https://github.com/Cook4986/Longhand" target="_blank" rel="noopener noreferrer">the GitHub repo</a> for more.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', margin: '48px 0' }}>
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
                style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '6px', border: '1px solid var(--rule)' }}
              />
            ))}
          </div>

          <Rule />

          {/* --- Widener 360 --- */}

          <SectionHeading>Widener 360</SectionHeading>

          <Fig src="/Professional/WidenerScan1_Cook2020.webp" alt="Isometric view of the Widener Library 3D scan" caption="Isometric perspective, with expanded annotation (featuring historical imagery), on the Matterport-hosted Widener Library 3D scan." />

          <p style={{ marginBottom: '24px' }}>
            Given the increasing size and complexity of research data generally, and the recent advancement of scanning and visualization methods specifically (e.g. photogrammetry and virtual reality), <strong>3D data has the potential to become the asset “of record,” or primary source material, for researchers in a wide range of academic disciplines.</strong> Moreover, this content can be produced for objects of study at various scales, including large-scale facilities, like Harvard’s very own Widener Library.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Among other applications, digitized library facilities can host virtual visits for non-affiliates, who would typically not be allowed inside private libraries like Widener. <strong>This “virtual tours” scenario was our initial motivation</strong> for the Widener 360 project, which relied on local experts at <a href="https://archimedes.digital/" target="_blank" rel="noopener noreferrer">Archimedes Digital</a> - and the increasingly popular Matterport scanning/hosting platform - to generate interactive 360 views for some (but not all) of our most iconic interior spaces.
          </p>

          <Embed src="https://my.matterport.com/show/?m=fs3gQv7n1QG" title="Widener Library 3D tour" />

          <p style={{ marginBottom: '24px' }}>
            But, as we began annotating the scan with historical imagery, links to Harvard Library materials, and historical information concerning <a href="https://en.wikipedia.org/wiki/Julian_Abele" target="_blank" rel="noopener noreferrer">the inspiring architectural history of the building</a>, we began to understand the <em>linked data</em> implications of these virtual facilities. With Widener 360, our stunning architecture functions as a sort of visual index for collections, services, and history. Given the scale of the facility, there’s plenty of virtual space within which to deploy multimedia content. Indeed, <strong>one can even <em>hide</em> content (i.e. easter eggs)</strong> as we managed to do through a Spotify integration, which allowed for in-browser audio associated with Professor Lepore’s new <a href="https://www.thelastarchive.com/" target="_blank" rel="noopener noreferrer"><em>The Last Archive</em> Podcast</a>.
          </p>

          <Fig src="/Professional/image-asset.webp" alt="Spotify podcast embed inside the Widener scan" caption="Spotify-hosted podcast “hidden” in the book stacks. The podcast can be played in the browser." />

          <p style={{ marginBottom: '24px' }}>
            We’ve seen an encouraging number of site visitors to the tour page in the few months since it has gone live, and <a href="https://www.atlasobscura.com/articles/7-libraries-you-can-visit-from-home" target="_blank" rel="noopener noreferrer">I imagine other libraries are seeing similar uptake</a>. These scans also represent an online media type that transcends the traditional wall-of-text, the “Brady Bunch” call experience (e.g. Zoom), and the YouTube rabbit holes, all of which we are now experiencing ad nauseam. 3D content, like the Widener 360 tour, is a <strong>spatialized experience that is a very familiar aspect of our offline lives.</strong>
          </p>
          <p style={{ marginBottom: '24px' }}>
            Importantly, these content types also supports stereoscopic, VR viewing (by clicking the little headset icon on the lower right portion of the screen), for example, and, once headset hardware becomes more common - say, with the release of the Apple glasses - and XR web architecture is standardized (<a href="https://medium.com/@gfodor/the-secret-mozilla-hubs-master-plan-2c1364033bec" target="_blank" rel="noopener noreferrer">as per Mozilla</a>), we will reach a point where remote visitors can engage with this content <em>bodily</em> as well. That is, <strong>users will be able to physically walk through virtual scans of spaces - in the company of fellow students and instructors.</strong>
          </p>

          <Fig src="/Professional/Widener360_Blender.webp" alt="Widener scan data in Blender" caption="Decimating and cropping Widener scan data for use in shared online environments, like Mozilla’s Hubs platform." />

          <Rule />

          {/* --- Instructional chess --- */}

          <SectionHeading>Instructional chess</SectionHeading>

          <Fig src="/Professional/KnightBuild1.webp" alt="Modeling the knight in Oculus Medium" caption='Using Oculus Medium&apos;s "Clay" tool to model the knight piece' />

          <p style={{ marginBottom: '24px' }}>
            <strong><em>Motivations</em></strong>
          </p>
          <p style={{ marginBottom: '24px' }}>
            There are an estimated 600 million chess players worldwide and a diverse body of <a href="https://www.researchgate.net/profile/Ayperi_Dikici_sigirtmac/publication/254229238_Does_chess_training_affect_conceptual_development_of_six-year-old_children_in_Turkey/links/566e95c908ae430ab5002c10.pdf" target="_blank" rel="noopener noreferrer">peer-reviewed literature</a> speaks to the benefits of learning the game, especially for children. Indeed, some of the most compelling research involves <strong>young children (as young as 4), whose spatial concept awareness was strengthened after chess training.</strong>
          </p>
          <p style={{ marginBottom: '24px' }}>
            At the beginning of the summer (2017), I set a personal goal: To sculpt something each week in VR then attempt a 3D print of that work. Basically, I wanted to test what would print and what wouldn't - to see where the freedom of sculpting in a virtual environment ran up against the reality of FDM printing.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Well, I'm a pretty helpless as visual artist, but the combination of that regularly scheduled activity, and a simultaneous series of chess games with friends and family, gave me an idea: An instructional chess set to help with early childhood chess instruction and engender associated benefits (spatial skills).
          </p>

          <Fig src="/Professional/Chess_Sketch1.webp" alt="Notebook sketch of chess piece designs" caption="Brainstorming instructional chess piece design in my pocket notebook." />

          <p style={{ marginBottom: '24px' }}>
            <strong>VR Modeling</strong>
          </p>
          <p style={{ marginBottom: '24px' }}>
            Complete blindness to the goings-on in your physical surroundings is both a strength and a weakness of virtual reality. First, the bad: complete eye coverage makes people uncomfortable, especially in public spaces, where a hand on your shoulder can't be predicted and is seldom appreciated. The <em>benefits</em> of complete immersion may well counterbalance this perceived vulnerability, however. Insofar as approachable game design software (e.g. Unity, Unreal, etc.) makes crafting unique VR experiences a single-person endeavour, <strong>scholars - instructors in particular - can leverage this real-world obliviousness to strip away distraction and present to the learner only that content deemed relevant</strong>. VR modeling software, like Oculus Medium, is a great example of mostly beneficial full immersion.
          </p>
          <p style={{ marginBottom: '24px' }}>
            The human mind is beholden to the human body, and specific anatomical axis- of limb and head/foot orientation, for example - constrain not just our movement, but <a href="https://plato.stanford.edu/entries/embodied-cognition/" target="_blank" rel="noopener noreferrer">our thoughts as well.</a> But what if we stripped away the visual cues associated with parallel physical constraints like gravity, or the horizon line, and were able to create a workspace in a vacuum, a deeps-space studio? <strong>Now, imagine if all your making tools were within reach, simultaneously, regardless of their mechanical complexity.</strong> By customizing the sculpting environment and dedicating time to familiarizing yourself with the variety of tools available to the user instantaneously, one can quite quickly inhabit a creative environment where the medium itself (virtual "clay", in this case); the environment within which that medium is modified; and the tools for modification are all divorced from the constraints of analogous physical counterparts.
          </p>
          <p style={{ marginBottom: '24px' }}>
            This is this conceptual context within which I imported <a href="https://www.thingiverse.com/thing:378322" target="_blank" rel="noopener noreferrer">existing</a> (and freely available ) CAD chess models for reinvention within Oculus Medium. After diagramming, in a paper notebook, some movement concepts, I sat down to model each piece in virtual reality. I began with the knight - the crux of the instructional chess "problem" - and moved on from there. <strong>After approximately 10 hours of in-headset design time, I had a prototype of an entire chess set</strong>. While it may sound like a relatively low number, this sort of engagement was only practically possible given the <a href="https://en.wikipedia.org/wiki/GeForce_10_series" target="_blank" rel="noopener noreferrer">10-Series NVidia GPU</a> currently powering VR in my Alienware 15 work laptop. To hit framerate targets for comfortable, long-term VR, this late generation hardware is an absolute must. Indeed, the combination of 1070/1080 grade graphics processing hardware and software like Medium represents - to my mind - the first in what will be a suite of "productivity grade" VR applications. Next step: 3D Printing this first design...
          </p>

          <Fig src="/Professional/giphy+(1).gif" alt="Animated knight design in VR" caption="Early knight design demonstrating the flexibility of VR modeling." />

          <p style={{ marginBottom: '24px' }}>
            <strong>Prepping and Printing</strong>
          </p>
          <p style={{ marginBottom: '24px' }}>
            While it's a clear step towards a VR-based rapid prototyping solution, Medium isn't a full-fledged CAD solution.Rather, Medium is an artistic outlet that can be co-opted (so to speak) for downstream output that resembles products rather than sculpture. <strong>Straight line design tools; real-world scaling; and associated measurement capabilities are all noticeably lacking</strong>, and some model cleanup - outside a VR design environment - is therefore necessary prior to 3D printing. To level the piece bases and close any remaining "cracks" in the pieces, for example, I passed each through Autodesk's <a href="http://www.meshmixer.com/" target="_blank" rel="noopener noreferrer"><em>Meshmixer</em></a> application. Fortunately, Meshmixer - as well as the CURA slicing program we use to generate gcode for our Lulzbot printers - is a freely available.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Next, it was time to 3D print the first physical instantiation of Instructional Chess. To print an entire side (since I would have to print each side in a different color) required approximately <strong>34 grams of PLA filament for a CURA-estimated 300 minute 3D print</strong>. That's sixteen pieces - eight pawns and eight back rank pieces. As of now, I've iterated about four times on the models that comprise a full, printed side of Instructional Chess.
          </p>
          <p style={{ marginBottom: '24px' }}>
            The first semi-successful print revealed a host of issues. Most noticeable was the disproportional scaling between the traditional, centered reference pieces, and the modeled directional cues, which printed much larger than then appeared in virtual reality. Indeed, <strong>it was exceedingly difficult to identify differences between the bishop and the rook, for example, so it was "back to the (virtual) drawing board" for a relative re-scaling of this piece components.</strong> Another major, continuing issue is the knight, which has raised arches to represent the jumping ability of the pieces and a somewhat hooked head, both features that require support material. My next goal is to revisit the knight design, in Oculus Medium, and see if <a href="https://developer.oculus.com/blog/medium-under-the-hood-part-1-developing-the-move-tool/" target="_blank" rel="noopener noreferrer">the newly developed "Move Tool"</a> can be used to connect the knights head to its body - sort of natural support workaround. I believe the entire set can be printed <em>without support material</em> if the knight could be fixed.
          </p>

          <Fig src="/Professional/image-asset.gif" alt="Chess piece printing on a LulzBot Mini" caption="Early instructional chess prototype printing on LulzBot Mini" />

          <p style={{ marginBottom: '24px' }}>
            <strong>What's Next?</strong>
          </p>
          <p style={{ marginBottom: '24px' }}>
            Print out a set for yourself! <a href="https://skfb.ly/6wCHW" target="_blank" rel="noopener noreferrer"><strong>The complete Instructional Chess 3D model set</strong></a><strong> is downloadable from Sketchfab (for free)</strong>, and I'll be posting 3D printing instructions shortly, to ensure your set prints cleanly and efficiently. Importantly, libraries - of all sorts - offer 3D printing services, which you can use to create your own Instructional Chess set. Just consult <a href="https://www.google.com/maps/d/u/0/viewer?mid=1plLHXcVgwR2Ide4U1Ipl4dknZVU&hl=en_US&ll=17.266592752140593%2C-129.61664684999994&z=3" target="_blank" rel="noopener noreferrer">this handy map</a>, load the Sketchfab model files onto a flash drive, and you are ready to start teaching/learning the game. Looking forward to hearing your feedback and iterating on this design.
          </p>

          <Embed src="https://sketchfab.com/models/6b7f539e814c417a8f02c12eef887271/embed" title="Instructional Chess - Bishop" />

          <Rule />

          {/* --- Sparq --- */}

          <Fig src="/Professional/image-asset (1).webp" alt="Sparq meditation labyrinth" />

          <p style={{ marginBottom: '24px' }}>
            The Sparq labyrinth is an interactive meditation tool. With a <a href="http://i.imgur.com/65hEd1x.jpg" target="_blank" rel="noopener noreferrer">touch-screen interface</a>, the Sparq user selects from a variety of culturally significant <a href="https://www.google.com/search?q=meditation+labyrinth&tbm=isch" target="_blank" rel="noopener noreferrer">labyrinth patterns</a> and then engages (i.e. walks, performs yoga, or even dances) the projected pattern to attain <a href="http://www.normantranscript.com/headlines/x601933946/Sparq-Labyrinth-meditation-tool-helps-computer-users-relax" target="_blank" rel="noopener noreferrer">a refreshing connection</a> to the moment. This <strong>five-minute <a href="http://www.psychologytoday.com/blog/compassion-matters/201303/benefits-mindfulness" target="_blank" rel="noopener noreferrer">mindfulness</a> technique</strong> requires no training, and has been <a href="http://works.bepress.com/donna_zucker/19/" target="_blank" rel="noopener noreferrer">linked to</a> decreases in systolic blood-pressure and increased quality of life, which makes the Sparq the perfect wellness solution for your <a href="http://www.wired.com/business/2013/06/meditation-mindfulness-silicon-valley/all/" target="_blank" rel="noopener noreferrer">stressful workplace</a>.
          </p>
          <p style={{ marginBottom: '24px' }}>
            How can we be sure? Because <strong>the Sparq has been deployed across the nation in a diversity of different settings</strong>. Indeed, everyone from academic researchers (and stressed out students) - at the <a href="https://www.umass.edu/newsoffice/article/du-bois-library-installs-sparq-meditation" target="_blank" rel="noopener noreferrer">UMass Amherst</a>, the <a href="http://www.normantranscript.com/news/local_news/sparq-labyrinth-meditation-tool-helps-computer-users-relax/article_81d1217a-8a5c-5657-8455-5f69fa8c3d98.html" target="_blank" rel="noopener noreferrer">University of Oklahoma</a>, Concordia University, and <a href="http://www.osu-tulsa.okstate.edu/news/details.php?id=1372" target="_blank" rel="noopener noreferrer">Oklahoma State University</a> - to <a href="http://artoutside.org/" target="_blank" rel="noopener noreferrer">Art Outside</a> festival goers; to Nebraskan wine tasters have experienced the benefits of this interactive mindfulness tool.
          </p>

          <Fig src="/Professional/image-asset (2).webp" alt="Sparq labyrinth in use" />

          <p style={{ marginBottom: '24px' }}>
            The Sparq provides for a uniquely personal meditation experience. With <strong>touch-screen access to a variety of patterns</strong> - each representing a distinct cultural heritage - the Sparq users connect with history while reconnecting with themselves.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Unlike traditional labyrinth installations, <strong>the Sparq is mobile and (after the components have shipped) it can be set up in about an hour</strong>. This ease of installation, combined with the stunning beauty of the projected patterns, makes the Sparq a wellness solution suitable for nearly any workplace
          </p>

          <Fig src="/Professional/image-asset (3).webp" alt="Sparq labyrinth projection" />

          <p style={{ marginBottom: '24px' }}>
            The Sparq provides for a uniquely personal meditation experience. With <strong>touch-screen access to a variety of patterns</strong> - each representing a distinct cultural heritage - the Sparq users connect with history while reconnecting with themselves.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Ready for a Sparq? <a href="/contact">Contact me</a>, and I'll make available tons more information about the thinking/motivation behind the Sparq, links to documented benefits, and instructions concerning <strong>how to set up the system at your institution</strong>. Then you can experience for yourself the myriad benefits of the Sparq meditation labyrinth.
          </p>

          <Fig src="/Professional/image-asset (4).webp" alt="Sparq hardware" />

          <p style={{ marginBottom: '24px' }}>
            In Pima &amp; Papago (native American) cultures the design below represents "Siuu-hu Ki" - "Elder Brother's House". Legend has it that, after exploiting the village, the mythical Elder Brother would flee, following an especially devious path back to his mountain lair so as to make pursuit impossible. <strong>Elder Brother's House is one of several culturally significant labyrinth patterns which lend a powerful gravity to the overall Sparq experience</strong>.
          </p>

          <Fig src="/Professional/image-asset (5).webp" alt="Elder Brother's House labyrinth pattern" />

          <Rule />

          {/* --- Hypnose --- */}

          <SectionHeading>"Hypnose" - Rapid Prototying project</SectionHeading>

          <Fig src="/Professional/image-asset (6).webp" alt="Historical clock illustrations" caption="Bruton, Eric. Clocks & Watches. New York: Hamlyn Publishing Group, 1968." />

          <p style={{ marginBottom: '24px' }}>
            OU Libraries' new makerspace/fab lab/incubator <a href="http://libraries.ou.edu/edge" target="_blank" rel="noopener noreferrer">Innovation @ the EDGE</a> is centered on the idea that <strong><em>demystification</em> of emerging technology is critical non-STEM engagement.</strong> Since my academic background is in the humanities (philosophy), a demonstration of rapid prototyping that takes inspiration from our large collection seemed important. Hence, <strong>the Hypnose smell-clock - a mostly 3D printed prototype</strong> that incorporated microcontroller components, and programming, inspired by the sorts of historical examples described in History-of-Timekeeping texts found in the book stacks (as above).
          </p>

          <Fig src="/Professional/image-asset (7).webp" alt="Bronze head of Hypnos" caption="Bronze Head of Hypnose from Civitella d'Arna" />

          <p style={{ marginBottom: '24px' }}>
            The original motivation for the Hypnose was simple: there are problems associated with waking up and checking one's smartphone to figure out if it is indeed time to wake up! Of course, alarms are a solution, although they aren't necessarily a pleasant way to start your day. Moreover, there are temptations (e.g. social media) associated with picking up your phone in the middle of the night. <strong>How to avoid the phone, then, and still get up for work in time?</strong> Why not train myself to subconsciously to wake up on time by associating different phases of my sleep cycle with distinct scents?
          </p>

          <Fig src="/Professional/image-asset (8).webp" alt="Stepper motor wiring diagram" caption="https://www.sparkfun.com/tutorials/400" />

          <p style={{ marginBottom: '24px' }}>
            This implementation used an Arduino Uno along with a SparkFun motor shield to power a stepper motor via a wall outlet. The precise rotational control provided by a stepper motor (as opposed to a torque-heavy <em>servo</em>) allows the below code to <strong>"jump" a measuring spoon - containing a small amount of scented wax melt - to a position directly above a heat lamp</strong>. This jump is programmed to occur every hour (3,600,000 miliseconds in Arduino code time), which can be easily doubled to cover an 8-hour sleep cycle, given four spoons. A certain wax melt, then, would always correspond to the final two hours before one awakes. I will undoubtedly come to dread that smell!
          </p>

          <pre style={{ margin: '48px 0', padding: '20px', background: 'var(--paper-2)', borderRadius: '8px', border: '1px solid var(--rule)', overflowX: 'auto', fontSize: '0.85rem', lineHeight: 1.5 }}>
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

          <Fig src="/Professional/image-asset (9).webp" alt="Hypnose assembly modeled in Sketchup" />

          <p style={{ marginBottom: '24px' }}>
            The assembly, originally modeled in Sketchup (above), takes its cue from <strong>a 1st century bronze sculpture discovered in central Italy.</strong> According to <a href="https://en.wikipedia.org/wiki/Hypnos" target="_blank" rel="noopener noreferrer">Wikipedia</a>, Hypnos' cave had no doors or gates, lest a creaky hinge awake him. It seems we both faced similiar problems. Also, this ancient realization of the greek god of sleep, conveniently lacked eyes, which are actually holes in the sculpture. My thinking was that the scent could vent from those holes with the aid of a small computer fan, although the final prototype uses Hypnos as more of an aesthetic choice.
          </p>

          <Fig src="/Professional/image-asset (10).webp" alt="3D printed Hypnose face" />

          <p style={{ marginBottom: '24px' }}>
            The Hypnose "face" - an amalgamation of a free, low-poly mask model found online and a set of wings, scaled and rotated - ultimately took close to 8 hours (and 3 tries) on our Makerbot printer, but <strong>the finished prototype works more or less perfectly</strong>. More importantly, OU Libraries now offers <a href="http://libcal.ou.edu/calendar.php?cid=2267&t=d&d=0000-00-00&cal%5B%5D=2267" target="_blank" rel="noopener noreferrer">free training</a> on all the tech associated with this project, so those once-intimidated humanities majors (like myself) can leverage that creativity they are known for, inspired perhaps by source material in our collection, to design and deploy their own creations.
          </p>

          <Fig src="/Professional/image-asset (11).webp" alt="Finished Hypnose prototype" />

          <Rule />

          {/* --- NavApp --- */}

          <Fig src="/Professional/image-asset (12).webp" alt="NavApp wayfinding in Bizzell Memorial Library" />

          <p style={{ marginBottom: '24px' }}>
            We are in a second proof-of-concept stage for a mobile app that <strong>guides users through large indoor while providing a plethora of location-based info and relevant push notifications (e.g. events, technology tutorials, etc.) along the way</strong>. The ongoing OU libraries-based pilot program has paved the way for a campus wide rollout of this cutting edge technology. This tier two launch coincides with the <em>Galileo’s World</em> exhibition, which debuted in August of 2015. The tool now provides:
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Integration of Online/offline University of Oklahoma user experience by providing real-time, turn-by-turn navigation.</li>
            <li style={{ marginBottom: '8px' }}>Delivery of hyper-local contents, corresponding to the users location with respect to campus resources both indoors and out.</li>
            <li style={{ marginBottom: '8px' }}>Powerful analytics capabilities, which allow for the analysis of space/service/technology usage throughout navigable areas.</li>
            <li style={{ marginBottom: '8px' }}>Various associated utilities to assist disabled users as well as aid in emergency situations.</li>
          </ul>

          <Embed src="https://www.youtube.com/embed/tTpuYP1of1I" title="OU Libraries NavApp" />

          <p style={{ marginBottom: '24px' }}>
            People tend to refer to the central routing feature as “indoor GPS”. It’s accurate at up to a meter and it fulfills a goal we started focusing on early last year: <strong>simplify an extraordinarily complex physical environment.</strong>
          </p>
          <p style={{ marginBottom: '24px' }}>
            <a href="https://en.wikipedia.org/wiki/Bizzell_Memorial_Library" target="_blank" rel="noopener noreferrer">Bizzell</a>, after all, is huge – and filled with services (some of which I’m barely familiar with myself). <strong>What we didn’t want</strong>, then – and is something I've seen personally - is a senior level undergraduate proudly proclaiming that they are using our facilities for the first time.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Basically, our aim from the beginning was to put an end to the intimidation factor that new students might feel when visiting the library for the first time while at the same time making our diverse services visible to visitors using <strong>an increasingly prevalent piece of pocket-sized hardware, the Smartphone.</strong>
          </p>

          <Fig src="/Professional/image-asset (13).webp" alt="NavApp interface screenshots" />

          <p style={{ marginBottom: '24px' }}>
            At the end of the 2015/16 academic year – the first semester where the NavApp was available for (free) public download – ~<strong>2,000+ unique users had downloaded and engaged with this innovative wayfinding tool</strong>. Indeed, our engagement factor was particularly encouraging with back-end analytics indicating that, on average, individual users accessed more than 16 in-app screens.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Finally, <a href="http://www.computerworld.com/article/3010270/wireless-networking/oklahoma-sooners-use-beacons-sensors-to-find-rooms-on-massive-campus.html?page=2" target="_blank" rel="noopener noreferrer">the press has been responding positively</a> the NavApp and we've even received <a href="https://campustechnology.com/microsites/innovators-microsite/home.aspx" target="_blank" rel="noopener noreferrer">national awards</a> for our work on this project. <strong>Please <a href="/contact">reach out</a> to find out how to deploy your wayfinding tool.</strong>
          </p>

          <Rule />

          {/* --- OVAL --- */}

          <Fig src="/Professional/image-asset (14).webp" alt="OVAL logo" />

          <p style={{ marginBottom: '24px' }}>
            After months of R&amp;D, OVAL 1.0 is ready for use. With this hardware/software platform, instructors and researchers alike can <strong>quickly populate a custom learning space with fully interactive 3D objects from any field.</strong> Then, they can share the analysis of those models across a network of virtual reality headsets - regardless of physical location or technical expertise. In this way, you are free to take your students or co-researchers into the "field" without leaving campus!
          </p>

          <Fig src="/Professional/image-asset (15).webp" alt="Group RNA fly-through in virtual reality" caption="CHEM 4923, group RNA fly-through." />

          <p style={{ marginBottom: '24px' }}>
            Not only are previously imperceptible/fragile/distant objects (like chemical molecules, museum artifacts, historical sites, etc.) readily accessible in this shared learning environment, but - using our public facing file uploader - even the most novice users can easily <strong>drag-and-drop their 3D files into virtual space</strong> for collaborative research and instruction in virtual reality. Simply upload and sit down to begin.
          </p>

          <Fig src="/Professional/image-asset (16).webp" alt="Library-designed VR workstation" caption="Custom fabricated, library-designed VR workstation - courtesy of OU Physics dept." />

          <p style={{ marginBottom: '24px' }}>
            Finally, natural interaction types - like leaning in get a closer look at a detailed model - are preserved and augmented by body tracking technology. When coupled with intuitive <em>hand-tracked controls</em> (one less piece of software to learn!), and <strong>screenshot + video capture functions for output to downstream applications (e.g. publication + presentations)</strong>, new perspectives can be achieved and captured to aid your scholarship.
          </p>

          <Fig src="/Professional/image-asset (17).webp" alt="Student using OVAL in virtual reality" />

          <p style={{ marginBottom: '24px' }}>
            "The impact on the students this week was immeasurable", says one OU faculty member who has already incorporated the OVAL into her coursework. How can we help you achieve the same impact? Please reach out for a personal consultation and let OU Libraries show you how this powerful tool, which is <strong>currently available for walk-in use in <a href="http://libraries.ou.edu/edge" target="_blank" rel="noopener noreferrer">Innovation @ the EDGE</a></strong>, can support your educational goals.
          </p>

          <Embed src="https://www.youtube.com/embed/tmL3T28Ud1k" title="University of Oklahoma Libraries Virtual Reality" />

          <Rule />

          {/* --- 3D Scanning --- */}

          <Fig src="/Professional/image-asset (18).webp" alt="3D scanning banner" />

          <SectionHeading>3D Scanning - Experiments &amp; Implications</SectionHeading>

          <p style={{ marginBottom: '24px' }}>
            My current <a href="/professional">professional</a> focus on 3D visualization has led to experimentation with a host of scanning solutions. Basically, the goal is a more accurate digitization - <strong>an interactive snapshot with searchable/browsable depth.</strong>
          </p>
          <p style={{ marginBottom: '24px' }}>
            <strong>The 3D assets below</strong> were generated using a the Sony DSC-RX100 (for capturing high-definition, multi-angle stills of the specimens) and <a href="https://memento.autodesk.com/about" target="_blank" rel="noopener noreferrer">Autodesk Memento</a> (for stitching those stills together into a surface mesh).
          </p>
          <p style={{ marginBottom: '24px' }}>
            Please reach out, via <a href="/contact">the personal page</a>, <strong>if you have a collection/antique/artifact/specimen</strong> that you would like to see preserved in this robust digital format.
          </p>

          <Embed src="https://sketchfab.com/models/bbc37de8363e45b5a33175942ffe7368/embed" title="Opuntia (Prickly Pear) Cactus" />

          <p style={{ marginBottom: '24px' }}>
            The above prickly pear scan isn't perfect, but it's the only usable botanical scan that I've managed to generate after a half-dozen tries. <strong>Narrow-width connecting components (e.g. <em>stems</em>) in particular seem to disappear</strong> during Autodesk's cloud-based stitching process, which would explain why this opuntia came out while numerous capsicum scans did not. Lesson learned.
          </p>

          <Embed src="https://sketchfab.com/models/2ca7f8d0a71a4a8696266629c186092c/embed" title="Omar Kayyam" />

          <p style={{ marginBottom: '24px' }}>
            This statue of Omar Kayyam is located in the heart of OU's Norman campus. Fortunately, it was an overcast day when the scan was done, otherwise the direct sunlight would have reflected off the white stone. The statue is quite tall (about 8 ft.), however, so the imperfect top of <a href="https://en.wikipedia.org/wiki/Omar_Khayyam" target="_blank" rel="noopener noreferrer">this Persian polymath</a>'s cap was sliced off in post production. <strong>Diffuse light and multi-angle access are necessary for a good scan.</strong>
          </p>

          <Embed src="https://sketchfab.com/models/15790973e5b44cf9abdda0fcd9982948/embed" title="Sheepherder's Cabin" />

          <p style={{ marginBottom: '24px' }}>
            As described on <a href="/spatial">the spatial page</a>, this Sheepherder's cabin represents a "field scan", whereby off-grid artifacts can be manipulated, analyzed, or otherwise investigated after the fact for details that onsite limitations (like time) simply won't allow for. <strong>Measurements, for example, can be made and recorded later</strong>, after the threat of rattlesnakes has long since passed.
          </p>

          <Fig src="/Professional/image-asset (19).webp" alt="VR measurement of the sheepherder's cabin scan" caption="VR-based analysis of early 20th century sheepherder's ruins. Note the measurement tool." />

          <p style={{ marginBottom: '24px' }}>
            Combining a few best-practices gleaned from generating high-quality field scans like the sheepherder's cabin with the ability to effectively scan certain living, albeit <em>static</em>, organisms (plants, that is), mean that <strong>3D asset repositories of invasive flora, or endangered orchids, or entire crops are feasible and perhaps inevitable</strong>.
          </p>
          <p style={{ marginBottom: '24px' }}>
            Downstream analysis of these 3D assets can not only take place centrally - at the local institute of higher-ed, for example - but at the expert's leisure. Moreover, <strong>screen capture software means that new perspectives on distant/fragile/rare data-sets can be output for presentation and publication</strong> regardless of whether that perfect viewing angle was attained at the time of the scan.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
