import re

with open("src/content/OverlayContent.tsx", "r") as f:
    content = f.read()

navapp_target = """<p>People tend to refer to the central routing feature as "indoor GPS". It's accurate at up to a meter and it fulfills a goal we started focusing on early last year: simplify an extraordinarily complex physical environment.</p>"""

navapp_replacement = """<div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tTpuYP1of1I?wmode=opaque&enablejsapi=1" frameBorder="0" allowFullScreen></iframe>
        </div>
        <p>People tend to refer to the central routing feature as "indoor GPS". It's accurate at up to a meter and it fulfills a goal we started focusing on early last year: simplify an extraordinarily complex physical environment.</p>"""

content = content.replace(navapp_target, navapp_replacement)

oval_target = """<p>After months of R&D, OVAL 1.0 is ready for use. With this hardware/software platform, instructors and researchers alike can quickly populate a custom learning space with fully interactive 3D objects from any field. Then, they can share the analysis of those models across a network of virtual reality headsets - regardless of physical location or technical expertise. In this way, you are free to take your students or co-researchers into the "field" without leaving campus!</p>"""

oval_replacement = """<p>After months of R&D, OVAL 1.0 is ready for use. With this hardware/software platform, instructors and researchers alike can quickly populate a custom learning space with fully interactive 3D objects from any field. Then, they can share the analysis of those models across a network of virtual reality headsets - regardless of physical location or technical expertise. In this way, you are free to take your students or co-researchers into the "field" without leaving campus!</p>
        
        <p>"The impact on the students this week was immeasurable", says one OU faculty member who has already incorporated the OVAL into her coursework. How can we help you achieve the same impact? Please reach out for a personal consultation and let OU Libraries show you how this powerful tool, which is currently available for walk-in use in Innovation @ the EDGE, can support your educational goals.</p>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe width="100%" height="100%" src="https://www.youtube.com/embed/tmL3T28Ud1k?wmode=opaque&enablejsapi=1" frameBorder="0" allowFullScreen></iframe>
        </div>"""

content = content.replace(oval_target, oval_replacement)

with open("src/content/OverlayContent.tsx", "w") as f:
    f.write(content)

print("Added Youtube iframes")
