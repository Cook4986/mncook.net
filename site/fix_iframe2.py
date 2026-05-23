import re

with open("src/content/OverlayContent.tsx", "r") as f:
    content = f.read()

content = content.replace(" mozallowfullscreen=\"true\"", "")
content = content.replace(" webkitallowfullscreen=\"true\"", "")

with open("src/content/OverlayContent.tsx", "w") as f:
    f.write(content)
