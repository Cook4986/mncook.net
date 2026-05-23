import re

with open("src/content/OverlayContent.tsx", "r") as f:
    content = f.read()

target = """<p>Among other applications, digitized library facilities can host virtual visits for non-affiliates, who would typically not be allowed inside private libraries like Widener. This "virtual tours" scenario was our initial motivation for the Widener 360 project, which relied on local experts at Archimedes Digital - and the increasingly popular Matterport scanning/hosting platform - to generate interactive 360 views for some of our most iconic interior spaces.</p>
        <p>But, as we began annotating the scan with historical imagery, links to Harvard Library materials, and historical information concerning the inspiring architectural history of the building, we began to understand the linked data implications of these virtual facilities. With Widener 360, our stunning architecture functions as a sort of visual index for collections, services, and history.</p>"""

replacement = """<p>Among other applications, digitized library facilities can host virtual visits for non-affiliates, who would typically not be allowed inside private libraries like Widener. This "virtual tours" scenario was our initial motivation for the Widener 360 project, which relied on local experts at Archimedes Digital - and the increasingly popular Matterport scanning/hosting platform - to generate interactive 360 views for some of our most iconic interior spaces.</p>
        
        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden' }}>
          <iframe width="100%" height="100%" src="https://my.matterport.com/show/?m=fs3gQv7n1QG&utm_source=4" frameBorder="0" allowFullScreen allow="xr-spatial-tracking"></iframe>
        </div>

        <p>But, as we began annotating the scan with historical imagery, links to Harvard Library materials, and historical information concerning the inspiring architectural history of the building, we began to understand the linked data implications of these virtual facilities. With Widener 360, our stunning architecture functions as a sort of visual index for collections, services, and history.</p>"""

content = content.replace(target, replacement)

with open("src/content/OverlayContent.tsx", "w") as f:
    f.write(content)

print("Added Matterport iframe")
