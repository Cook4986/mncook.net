with open("src/content/OverlayContent.tsx", "r") as f:
    content = f.read()

if not content.startswith("/* eslint-disable react/no-unescaped-entities */"):
    content = "/* eslint-disable react/no-unescaped-entities */\n" + content

with open("src/content/OverlayContent.tsx", "w") as f:
    f.write(content)
