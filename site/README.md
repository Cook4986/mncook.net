# mncook.net

Personal portfolio for Matt Cook — spatial computing, digital humanities, and creative practice. A statically exported Next.js site with an interactive React Three Fiber landing scene and themed content sections (Textual, Professional, Spatial, Audiovisual, Technical, Ritual, Contact).

## Stack

- **Next.js 16** (App Router, `output: 'export'` — static site)
- **React 19**
- **three / @react-three/fiber / @react-three/drei / @react-three/postprocessing** — the hero gem scene, content pins, and atmosphere
- **next/font** (Eczar, IM Fell English, Rajdhani — self-hosted)

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Build & deploy

```bash
npm run build    # static export to ./out
```

The site is deployed to GitHub Pages (custom domain via `public/CNAME`). Static assets that mirror the legacy Squarespace URLs (PDFs, audio) live in `public/s/`.

## Project layout

- `src/app/` — routes. `page.tsx` is the 3D landing; each section also has a standalone warm-themed route.
- `src/components/canvas/` — the WebGL scene (`TerrainScene`, `TerrainMesh`, `ContentPins`, `Atmosphere`, procedural `sigils`).
- `src/components/ui/` — `SiteNav`, `Footer`, `CollapsibleSection`.
- `src/content/` — `data.ts` (publications, projects, fiction, episodes) and `OverlayContent.tsx` (modal section content).
- `public/` — images, audio/PDF assets (`s/`), section header images (`headers/`), and the `.glb` model.

> Note: the root-level `*.py` and `*_layout.{html,txt}` files are one-time Squarespace migration artifacts and are not part of the build.

## Contact

The contact form posts to [Web3Forms](https://web3forms.com). Set `NEXT_PUBLIC_WEB3FORMS_KEY` to override the access key.
