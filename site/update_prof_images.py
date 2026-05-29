import re

with open("src/content/OverlayContent.tsx", "r") as f:
    content = f.read()

prof_start = content.find("export function ProfessionalContent() {")
prof_end = content.find("export function SpatialContent() {", prof_start)

# We will just rewrite the entire ProfessionalContent function with the images included.
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
        <p>Deployed in virtual and augmented reality, 3D models provide the means for researchers and students to remotely experience diverse scholarly materials first-hand, though this content seldom finds its way into institutional repositories or peer-reviewed literature where it could be reused and cited. Currently, these methods are dispersed; an no single discipline, institution, or practitioner has yet to document a truly citable 3D curation method.</p>
        <p>The IMLS-funded 3D Research Data Curation Framework (3DFrame) grant is our attempt to conceptually unite interrelated - but administratively disparate - 3D data production, (immersive) analytics, and preservation methods, which combine to connect a range of computational processes. Our goal: ensure the scholarly rigor of 3D contents, thereby preserving these materials as credible (i.e., FAIR) primary sources for downstream citation by researchers across disciplines. Here's 3DF so far...</p>
        
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/3DF_testLogo3.webp" alt="3DF Logo" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
        </div>

        <p>Professor Zack and I have been working on the issue of scholarly 3D/VR for about a decade, since the release of the Oculus DK1. Mainly, we've focused on getting VR out of the lab and into the classroom, specifically by providing practical guidance and publishing on the instructional benefits. Increasingly, content has been the issue, not a lack of interest. However, academic rigor for 3D contents remains an issue.</p>
        <p>Accessible scanning techniques like photogrammetry have partially solved the content problem, but the scholarly value of these outputs isn't measurable. To address the question of curation, we've dedicated part of 3DF to studying the state-of-the-3D-production art, across academic and cultural heritage institutions, and another part to understanding the potential impact of quality control methods for 3D content in immersive viewing environments.</p>
        
        <p>Everyone is doing 3D scanning and viewing a little differently, depending on their training, discipline (and budget), home institution mission, and no one is quite sure what constitutes a "good" model at the end of the day. So, we must first understand what's currently being done, and why...</p>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/UMass_3DF_2.webp" alt="UMass 3DF" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
        </div>

        <p>At the core of 3DF is travel. The narrative specifies a range of 3D scanning lab types, where the research team will observe, interview, and test current and future workflows.</p>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/MattZackJosh_3DF_2024.webp" alt="Matt, Zack, Josh 3DF 2024" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
        </div>

        <p>By the end of the grant period (2026) we anticipate visiting upwards of 10 distinct institutions, ranging from public universities, to the Ivy League, to cultural heritage institutions.</p>
        
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/UofU_3DF_8.webp" alt="UofU 3DF" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
        </div>

        <p>Getting back to research question #4 (RQ4), we have a viable protocol and promising early participant data comparing the performance of immersive and "flat" (traditional display-based) viewing experiences for 3D future quality control workflows.</p>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/RQ4_3DF_3.webp" alt="RQ4 3DF" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Longhand">
        <p>Computational workflows can generate machine-actionable data from "raw" (e.g. handwritten) textual source material, allowing the search of vast material collections. But while a keyword search is a useful way to collate and confirm hypotheses, it assumes the researcher has some ideas about where to begin. Keyword search results don't reveal the nature of a corpus as a whole though, nor do they represent the relationships between tokens whose source material might span media, time, or location.</p>
        <p>Longhand is a word cloud generator, but the "words" are 3D models projected in 360 degrees around the user. Longhand exists to explore unwieldy text corpora (including in virtual reality) earlier in the research lifecycle. In addition to exposing text-centric researchers to the historically STEM-oriented benefits of Reality, Longhand leverages our ability to rapidly report object identity or category after just a single brief glimpse of visual input.</p>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/longhandThrougput_updated.webp" alt="Longhand Throughput" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
        </div>
        
        <p>Check out some preliminary test results, below, and the GitHub repo for more.</p>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/Longhand_gif_AmazingStories_AdobeExpress.gif" alt="Longhand GIF" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Widener 360">
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/WidenerScan1_Cook2020.webp" alt="Widener Scan" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>Isometric perspective, with expanded annotation (featuring historical imagery), on the Matterport-hosted Widener Library 3D scan.</p>
        </div>

        <p>Given the increasing size and complexity of research data generally, and the recent advancement of scanning and visualization methods specifically (e.g. photogrammetry and virtual reality), 3D data has the potential to become the asset "of record," or primary source material, for researchers in a wide range of academic disciplines. Moreover, this content can be produced for objects of study at various scales, including large-scale facilities, like Harvard's very own Widener Library.</p>
        <p>Among other applications, digitized library facilities can host virtual visits for non-affiliates, who would typically not be allowed inside private libraries like Widener. This "virtual tours" scenario was our initial motivation for the Widener 360 project, which relied on local experts at Archimedes Digital - and the increasingly popular Matterport scanning/hosting platform - to generate interactive 360 views for some of our most iconic interior spaces.</p>
        
        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe width="100%" height="100%" src="https://my.matterport.com/show/?m=fs3gQv7n1QG&utm_source=4" frameBorder="0" allowFullScreen allow="xr-spatial-tracking"></iframe>
        </div>

        <p>But, as we began annotating the scan with historical imagery, links to Harvard Library materials, and historical information concerning the inspiring architectural history of the building, we began to understand the linked data implications of these virtual facilities. With Widener 360, our stunning architecture functions as a sort of visual index for collections, services, and history.</p>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset.webp" alt="Spotify Podcast" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>Spotify-hosted podcast "hidden" in the book stacks. The podcast can be played in the browser.</p>
        </div>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/Widener360_Blender.webp" alt="Decimating Widener Scan" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>Decimating and cropping Widener scan data for use in shared online environments, like Mozilla's Hubs platform.</p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Instructional Chess">
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/KnightBuild1.webp" alt="Knight Build" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>Using Oculus Medium's "Clay" tool to model the knight piece</p>
        </div>

        <p>There are an estimated 600 million chess players worldwide and a diverse body of peer-reviewed literature speaks to the benefits of learning the game, especially for children. Indeed, some of the most compelling research involves young children (as young as 4), whose spatial concept awareness was strengthened after chess training.</p>
        <p>At the beginning of the summer (2017), I set a personal goal: To sculpt something each week in VR then attempt a 3D print of that work. The combination of that regularly scheduled activity, and a simultaneous series of chess games with friends and family, gave me an idea: An instructional chess set to help with early childhood chess instruction and engender associated benefits (spatial skills).</p>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/Chess_Sketch1.webp" alt="Chess Sketch" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>Brainstorming instructional chess piece design in my pocket notebook.</p>
        </div>

        <p>Complete blindness to the goings-on in your physical surroundings is both a strength and a weakness of virtual reality. Insofar as approachable game design software makes crafting unique VR experiences a single-person endeavour, scholars can leverage this real-world obliviousness to strip away distraction and present to the learner only that content deemed relevant. VR modeling software, like Oculus Medium, is a great example of mostly beneficial full immersion.</p>
        
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset (1).webp" alt="VR Knight Design" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>Early knight design demonstrating the flexibility of VR modeling.</p>
        </div>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset (2).webp" alt="LulzBot Print" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>Early instructional chess prototype printing on LulzBot Mini</p>
        </div>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Instructional Chess - Bishop" width="100%" height="100%" src="https://sketchfab.com/models/6b7f539e814c417a8f02c12eef887271/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking" mozAllowFullScreen={true} webkitAllowFullScreen={true}></iframe>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Sparq Labyrinth">
        <p>The Sparq labyrinth is an interactive meditation tool. With a touch-screen interface, the Sparq user selects from a variety of culturally significant labyrinth patterns and then engages (i.e. walks, performs yoga, or even dances) the projected pattern to attain a refreshing connection to the moment. This five-minute mindfulness technique requires no training, and has been linked to decreases in systolic blood-pressure and increased quality of life, which makes the Sparq the perfect wellness solution for your stressful workplace.</p>
        
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset (3).webp" alt="Sparq Labyrinth" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>The Sparq provides for a uniquely personal meditation experience. With touch-screen access to a variety of patterns - each representing a distinct cultural heritage - the Sparq users connect with history while reconnecting with themselves.</p>
        </div>

        <p>How can we be sure? Because the Sparq has been deployed across the nation in a diversity of different settings. Indeed, everyone from academic researchers (and stressed out students) - to Art Outside festival goers; to Nebraskan wine tasters have experienced the benefits of this interactive mindfulness tool.</p>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset (5).webp" alt="Elder Brother's House" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>In Pima & Papago (native American) cultures the design below represents "Siuu-hu Ki" - "Elder Brother's House"...</p>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title='"Hypnose" - Rapid Prototyping Project'>
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset (6).webp" alt="Clocks & Watches" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>Bruton, Eric. Clocks & Watches. New York: Hamlyn Publishing Group, 1968.</p>
        </div>

        <p>OU Libraries' new makerspace/fab lab/incubator Innovation @ the EDGE is centered on the idea that demystification of emerging technology is critical non-STEM engagement. Since my academic background is in the humanities (philosophy), a demonstration of rapid prototyping that takes inspiration from our large collection seemed important. Hence, the Hypnose smell-clock - a mostly 3D printed prototype that incorporated microcontroller components, and programming, inspired by the sorts of historical examples described in History-of-Timekeeping texts found in the book stacks.</p>
        
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset (7).webp" alt="Hypnose Bronze Head" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>Bronze Head of Hypnose from Civitella d'Arna</p>
        </div>

        <p>The original motivation for the Hypnose was simple: there are problems associated with waking up and checking one's smartphone to figure out if it is indeed time to wake up! Why not train myself to subconsciously to wake up on time by associating different phases of my sleep cycle with distinct scents?</p>
      
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset (8).webp" alt="Arduino Tutorial" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>https://www.sparkfun.com/tutorials/400</p>
        </div>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset (9).webp" alt="Final Prototype" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="NavApp">
        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tTpuYP1of1I?wmode=opaque&enablejsapi=1" frameBorder="0" allowFullScreen></iframe>
        </div>
        <p>We are in a second proof-of-concept stage for a mobile app that guides users through large indoor spaces while providing a plethora of location-based info and relevant push notifications (e.g. events, technology tutorials, etc.) along the way. The ongoing OU libraries-based pilot program has paved the way for a campus wide rollout of this cutting edge technology.</p>
        <p>People tend to refer to the central routing feature as "indoor GPS". It's accurate at up to a meter and it fulfills a goal we started focusing on early last year: simplify an extraordinarily complex physical environment.</p>
      </CollapsibleSection>

      <CollapsibleSection title="OVAL 1.0">
        <p>After months of R&D, OVAL 1.0 is ready for use. With this hardware/software platform, instructors and researchers alike can quickly populate a custom learning space with fully interactive 3D objects from any field. Then, they can share the analysis of those models across a network of virtual reality headsets - regardless of physical location or technical expertise. In this way, you are free to take your students or co-researchers into the "field" without leaving campus!</p>
        
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset (10).webp" alt="RNA fly-through" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>CHEM 4923, group RNA fly-through.</p>
        </div>

        <p>"The impact on the students this week was immeasurable", says one OU faculty member who has already incorporated the OVAL into her coursework. How can we help you achieve the same impact? Please reach out for a personal consultation and let OU Libraries show you how this powerful tool, which is currently available for walk-in use in Innovation @ the EDGE, can support your educational goals.</p>

        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset (11).webp" alt="VR Workstation" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>Custom fabricated, library-designed VR workstation - courtesy of OU Physics dept.</p>
        </div>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tmL3T28Ud1k?wmode=opaque&enablejsapi=1" frameBorder="0" allowFullScreen></iframe>
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="3D Scanning - Experiments & Implications">
        <p>My current professional focus on 3D visualization has led to experimentation with a host of scanning solutions. Basically, the goal is a more accurate digitization - an interactive snapshot with searchable/browsable depth.</p>
        
        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Opuntia (Prickly Pear) Cactus" width="100%" height="100%" src="https://sketchfab.com/models/bbc37de8363e45b5a33175942ffe7368/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking" mozAllowFullScreen={true} webkitAllowFullScreen={true}></iframe>
        </div>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Omar Kayyam" width="100%" height="100%" src="https://sketchfab.com/models/2ca7f8d0a71a4a8696266629c186092c/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking" mozAllowFullScreen={true} webkitAllowFullScreen={true}></iframe>
        </div>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Sheepherder's Cabin" width="100%" height="100%" src="https://sketchfab.com/models/15790973e5b44cf9abdda0fcd9982948/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking" mozAllowFullScreen={true} webkitAllowFullScreen={true}></iframe>
        </div>
        
        <div style={{ margin: '20px 0', textAlign: 'center' }}>
          <img src="/Professional/image-asset (12).webp" alt="VR analysis of ruins" style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
          <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '8px' }}>VR-based analysis of early 20th century sheepherder's ruins. Note the measurement tool.</p>
        </div>

        <p>Combining a few best-practices gleaned from generating high-quality field scans like the sheepherder's cabin with the ability to effectively scan certain living, albeit static, organisms (plants, that is), mean that 3D asset repositories of invasive flora, or endangered orchids, or entire crops are feasible and perhaps inevitable.</p>
      </CollapsibleSection>

      <div style={{ height: '40px' }} />
    </div>
  );
}
"""

new_content = content[:prof_start] + new_prof + content[prof_end:]

with open("src/content/OverlayContent.tsx", "w") as f:
    f.write(new_content)

print("Updated ProfessionalContent with images")
