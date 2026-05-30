# mncook.net

Personal site of **Matt Cook** — spatial computing, digital humanities, and creative practice. A single interactive WebGL landing scene (a slowly rotating stibine-mineral "gem" studded with content pins) opens into themed sections: Textual, Professional, Spatial, Audiovisual, Technical, and Contact.

🌐 **Live:** [mncook.net](https://mncook.net)

## Stack

- **Framework** — [Next.js 16](https://nextjs.org) (App Router) as a fully static export (`output: 'export'`)
- **UI** — [React 19](https://react.dev) + TypeScript, hand-rolled CSS design tokens (no UI library)
- **3D / WebGL** — [three.js](https://threejs.org) via [@react-three/fiber](https://github.com/pmndrs/react-three-fiber), [drei](https://github.com/pmndrs/drei), and [postprocessing](https://github.com/pmndrs/postprocessing) (bloom, vignette, film grain)
- **Procedural art** — canvas-drawn sigil textures + atmospheric "phenomena" driven by [simplex-noise](https://github.com/jwagner/simplex-noise.js)
- **Type** — self-hosted Google fonts via `next/font` (Eczar · IM Fell English · Rajdhani)
- **Forms** — contact form posts to [Web3Forms](https://web3forms.com)
- **Hosting** — GitHub Pages, deployed by GitHub Actions on every push to `main` (custom domain via `CNAME`)

## Structure

```
site/                      # the Next.js application
├─ src/app/                # routes — page.tsx is the 3D landing; each section also has a standalone page
├─ src/components/canvas/  # WebGL scene: TerrainScene, TerrainMesh, ContentPins, Atmosphere, sigils
├─ src/components/ui/      # SiteNav, Footer, CollapsibleSection
├─ src/content/            # data.ts (publications, projects, fiction) + OverlayContent.tsx (section copy)
└─ public/                 # 3D model (.glb), images, audio, and legacy-mirrored assets (/s)
```

## Develop

```bash
cd site
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to site/out
```

## Deploy

Push to `main` — the [`deploy.yml`](.github/workflows/deploy.yml) workflow builds `site/` and publishes `site/out` to GitHub Pages. The `NEXT_PUBLIC_WEB3FORMS_KEY` repository secret supplies the contact-form key at build time.
