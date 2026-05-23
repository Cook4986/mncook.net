import re

with open("src/content/OverlayContent.tsx", "r") as f:
    content = f.read()

content = content.replace("mozAllowFullScreen={true}", "mozallowfullscreen=\"true\"")
content = content.replace("webkitAllowFullScreen={true}", "webkitallowfullscreen=\"true\"")

with open("src/content/OverlayContent.tsx", "w") as f:
    f.write(content)

