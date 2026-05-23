import re

with open("src/content/OverlayContent.tsx", "r") as f:
    content = f.read()

# Add the ImageWithCaption component at the top
if "ImageWithCaption" not in content:
    image_comp = """
const ImageWithCaption = ({ src, alt, caption }: { src: string, alt: string, caption?: string }) => (
  <div 
    style={{ margin: '2.5rem 0', textAlign: 'center', transition: 'all 0.3s ease', cursor: 'pointer' }} 
    onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.filter = 'brightness(1.1)';
    }} 
    onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.filter = 'brightness(1)';
    }}
  >
    <img src={src} alt={alt} style={{ maxWidth: '100%', height: 'auto', borderRadius: '6px', boxShadow: '0 12px 30px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }} />
    {caption && <p style={{ fontSize: '0.85rem', color: 'var(--ivory-dim)', marginTop: '12px', fontStyle: 'italic', padding: '0 10%' }}>{caption}</p>}
  </div>
);
"""
    content = content.replace("export function SpatialContent() {", image_comp + "\nexport function SpatialContent() {")


# Replace image divs with ImageWithCaption in ProfessionalContent
# Regex to match: <div style={{ margin: '20px 0', textAlign: 'center' }}>\n          <img src="(.+?)" alt="(.+?)" style={.+?} />\n(?:          <p style={.+?}>(.+?)</p>\n)?        </div>
import re
pattern = r"<div style=\{\{ margin: '20px 0', textAlign: 'center' \}\}>\s*<img src=\"([^\"]+)\" alt=\"([^\"]+)\" style=\{[^}]+\} />\s*(?:<p style=\{[^}]+\}>(.*?)</p>\s*)?</div>"

def repl(match):
    src = match.group(1)
    alt = match.group(2)
    caption = match.group(3)
    if caption:
        return f'<ImageWithCaption src="{src}" alt="{alt}" caption="{caption}" />'
    else:
        return f'<ImageWithCaption src="{src}" alt="{alt}" />'

content = re.sub(pattern, repl, content)


# Add back ContactContent and TechnicalContent
if "export function ContactContent" not in content:
    content += """

export function ContactContent() {
  return (
    <div style={{ padding: '0 20px', height: '100%', overflowY: 'auto' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '20px' }}>
        <a href="mailto:matt@mncook.net" style={{ color: 'var(--accent)', textDecoration: 'underline', fontSize: '1.2rem' }}>
          matt@mncook.net
        </a>
      </div>
      <div style={{ height: '40px' }} />
    </div>
  );
}

export function TechnicalContent() {
  return null;
}
"""

with open("src/content/OverlayContent.tsx", "w") as f:
    f.write(content)

print("Applied fixes and aesthetic improvements")
