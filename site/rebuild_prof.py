import re

with open("src/content/OverlayContent.tsx", "r") as f:
    content = f.read()

# 1. Update quote font size in SpatialContent
content = content.replace("fontSize: '1.4rem'", "fontSize: '1.15rem'")

# 2. Rewrite ProfessionalContent
prof_start = content.find("export function ProfessionalContent() {")
prof_end = content.find("export function ContactContent() {", prof_start)

new_prof = """export function ProfessionalContent() {
  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>
      <p style={{ marginBottom: '16px', color: 'var(--ivory)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '1.6' }}>
        As Digital Scholarship Program Manager for Harvard Library (and, formerly, as Head of Emerging Technologies for the University of Oklahoma Libraries), I explore/develop/deploy tech for research and instructional purposes.
      </p>
      <p style={{ marginBottom: '32px', color: 'var(--ivory)', fontSize: '1.1rem', textTransform: 'uppercase', letterSpacing: '0.05em', lineHeight: '1.6' }}>
        Below are a few examples. Please don't hesitate to reach out (matt@mncook.net) to collaborate.
      </p>

      <CollapsibleSection title="3D Research Data Curation Framework (3DFrame)">
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

      <CollapsibleSection title="Longhand">
        <ImageWithCaption src="/Professional/longhandThrougput_updated.webp" alt="Longhand Throughput" />

        <p>Computational workflows can generate machine-actionable data from "raw" (e.g. handwritten) textual source material, allowing the search of vast material collections. But while a keyword search is a useful way to collate and confirm hypotheses, it assumes the researcher has some ideas about where to begin. Keyword search results don't reveal the nature of a corpus as a whole though, nor do they represent the relationships between tokens whose source material might span media, time, or location.</p>
        
        <ImageWithCaption src="/Professional/Longhand_gif_AmazingStories_AdobeExpress.gif" alt="Longhand GIF" />

        <p>So, how might one glimpse the contents of a text corpus, to generate preliminary research questions that might inform downstream search and more sophisticated analyses related to topics, sentiments, parts of speech, or named entities? Visualization - charts, graphs, diagrams, word clouds, etc. - are helpful at this exploratory research stage, when a researcher is simply trying to grasp the contents of a text corpus. This is where Longhand comes in.</p>
        <p>Longhand is a word cloud generator, but the "words" are 3D models projected in 360 degrees around the user. Longhand exists to explore unwieldy text corpora (including in virtual reality) earlier in the research lifecycle. In addition to exposing text-centric researchers to the historically STEM-oriented benefits of Reality, Longhand leverages our ability to rapidly report object identity or category after just a single brief glimpse of visual input.</p>
      </CollapsibleSection>

      <CollapsibleSection title="Widener 360">
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

      <CollapsibleSection title="Instructional Chess">
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

      <CollapsibleSection title="Sparq Labyrinth">
        <ImageWithCaption src="/Professional/image-asset (1).webp" alt="Sparq Labyrinth user" />
        <p>The Sparq labyrinth is an interactive meditation tool. With a touch-screen interface, the Sparq user selects from a variety of culturally significant labyrinth patterns and then engages (i.e. walks, performs yoga, or even dances) the projected pattern to attain a refreshing connection to the moment.</p>
        <ImageWithCaption src="/Professional/image-asset (2).webp" alt="Sparq event" />
        <p>The Sparq provides for a uniquely personal meditation experience. With touch-screen access to a variety of patterns - each representing a distinct cultural heritage - the Sparq users connect with history while reconnecting with themselves.</p>
        <ImageWithCaption src="/Professional/image-asset (3).webp" alt="Sparq projection" />
        <ImageWithCaption src="/Professional/image-asset (4).webp" alt="Sparq device" />
        <p>In Pima & Papago (native American) cultures the design below represents "Siuu-hu Ki" - "Elder Brother's House". Legend has it that, after exploiting the village, the mythical Elder Brother would flee, following an especially devious path back to his mountain lair...</p>
        <ImageWithCaption src="/Professional/image-asset (5).webp" alt="Elder Brother's House" caption='In Pima & Papago (native American) cultures the design below represents "Siuu-hu Ki" - "Elder Brother&apos;s House"' />
      </CollapsibleSection>

      <CollapsibleSection title='"Hypnose" - Rapid Prototyping Project'>
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

      <CollapsibleSection title="NavApp">
        <p>We are in a second proof-of-concept stage for a mobile app that guides users through large indoor spaces while providing a plethora of location-based info and relevant push notifications (e.g. events, technology tutorials, etc.) along the way.</p>
        <p>People tend to refer to the central routing feature as "indoor GPS". It's accurate at up to a meter and it fulfills a goal we started focusing on early last year: simplify an extraordinarily complex physical environment.</p>

        <ImageWithCaption src="/Professional/image-asset (13).webp" alt="NavApp" />
        
        <p>At the end of the 2015/16 academic year - the first semester where the NavApp was available for (free) public download - ~2,000+ unique users had downloaded and engaged with this innovative wayfinding tool.</p>

        <ImageWithCaption src="/Professional/image-asset (14).webp" alt="NavApp Usage" />

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tTpuYP1of1I?wmode=opaque&enablejsapi=1" frameBorder="0" allowFullScreen></iframe>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="OVAL 1.0">
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

      <CollapsibleSection title="3D Scanning - Experiments & Implications">
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

      <div style={{ height: '40px' }} />
    </div>
  );
}
"""

content = content[:prof_start] + new_prof + content[prof_end:]

with open("src/content/OverlayContent.tsx", "w") as f:
    f.write(content)

