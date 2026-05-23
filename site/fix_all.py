import re

# 1. Fix OverlayContent.tsx

with open("src/content/OverlayContent.tsx", "r") as f:
    content = f.read()

# Fix parsing error
content = content.replace('title=""Hypnose" - Rapid Prototyping Project"', "title='\"Hypnose\" - Rapid Prototyping Project'")

# Insert sketchfab for chess
chess_target = """<p>Complete blindness to the goings-on in your physical surroundings is both a strength and a weakness of virtual reality. Insofar as approachable game design software makes crafting unique VR experiences a single-person endeavour, scholars can leverage this real-world obliviousness to strip away distraction and present to the learner only that content deemed relevant. VR modeling software, like Oculus Medium, is a great example of mostly beneficial full immersion.</p>"""

chess_embed = """<p>Complete blindness to the goings-on in your physical surroundings is both a strength and a weakness of virtual reality. Insofar as approachable game design software makes crafting unique VR experiences a single-person endeavour, scholars can leverage this real-world obliviousness to strip away distraction and present to the learner only that content deemed relevant. VR modeling software, like Oculus Medium, is a great example of mostly beneficial full immersion.</p>
        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Instructional Chess - Bishop" width="100%" height="100%" src="https://sketchfab.com/models/6b7f539e814c417a8f02c12eef887271/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>"""

content = content.replace(chess_target, chess_embed)

# Insert sketchfabs for 3d scanning
scanning_target = """<p>Combining a few best-practices gleaned from generating high-quality field scans like the sheepherder's cabin with the ability to effectively scan certain living, albeit static, organisms (plants, that is), mean that 3D asset repositories of invasive flora, or endangered orchids, or entire crops are feasible and perhaps inevitable.</p>"""

scanning_embed = """<div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Opuntia (Prickly Pear) Cactus" width="100%" height="100%" src="https://sketchfab.com/models/bbc37de8363e45b5a33175942ffe7368/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Omar Kayyam" width="100%" height="100%" src="https://sketchfab.com/models/2ca7f8d0a71a4a8696266629c186092c/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>

        <div style={{ margin: '20px 0', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', background: '#000' }}>
          <iframe title="Sheepherder's Cabin" width="100%" height="100%" src="https://sketchfab.com/models/15790973e5b44cf9abdda0fcd9982948/embed?autostart=0&ui_controls=1&ui_infos=1&ui_inspector=1&ui_stop=1&ui_watermark=1&ui_watermark_link=1" frameBorder="0" allow="autoplay; fullscreen; xr-spatial-tracking" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>
        </div>
        
        <p>Combining a few best-practices gleaned from generating high-quality field scans like the sheepherder's cabin with the ability to effectively scan certain living, albeit static, organisms (plants, that is), mean that 3D asset repositories of invasive flora, or endangered orchids, or entire crops are feasible and perhaps inevitable.</p>"""

content = content.replace(scanning_target, scanning_embed)

with open("src/content/OverlayContent.tsx", "w") as f:
    f.write(content)

print("Fixed OverlayContent.tsx")
