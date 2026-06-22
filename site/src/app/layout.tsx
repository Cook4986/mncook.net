import type { Metadata } from "next";
import { Eczar, IM_Fell_English, Rajdhani } from 'next/font/google';
import "./globals.css";
import Analytics from "@/components/Analytics";

const eczar = Eczar({ 
  subsets: ['latin'], 
  weight: ['400'],
  variable: '--font-display',
  display: 'swap',
});

const fellEnglish = IM_Fell_English({ 
  subsets: ['latin'], 
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
  display: 'swap',
});

const rajdhani = Rajdhani({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://mncook.net'),
  title: "matt cook — Spatial Computing · Digital Humanities · Creative Practice",
  description: "Personal portfolio of matt cook: spatial computing researcher, digital humanities scholar, and creative practitioner. Projects span 3D visualization, archival transcription, VR, IoT, and literary fiction.",
  alternates: { canonical: '/' },
  openGraph: {
    title: "matt cook",
    description: "Spatial Computing · Digital Humanities · Creative Practice",
    type: "website",
    url: "https://mncook.net",
    siteName: "matt cook",
    images: [{ url: '/headers/professional.jpg', width: 1200, height: 630, alt: 'matt cook' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'matt cook',
    description: 'Spatial Computing · Digital Humanities · Creative Practice',
    images: ['/headers/professional.jpg'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Matt Cook',
  url: 'https://mncook.net',
  jobTitle: 'Digital Scholarship Program Manager',
  worksFor: { '@type': 'Organization', name: 'Harvard Library' },
  sameAs: ['https://github.com/Cook4986'],
  description:
    'Spatial computing researcher, digital humanities scholar, and creative practitioner.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${eczar.variable} ${fellEnglish.variable} ${rajdhani.variable}`}>
      <head>
        {/* Baseline Content-Security-Policy. Tightened from a blanket
            `https:` to explicit allowlists for the origins this static
            site actually talks to (self-hosted assets, Web3Forms, the
            GoatCounter beacon, the Google-hosted Draco decoder, and the
            YouTube / Matterport / Sketchfab embeds). `script-src` still
            carries `unsafe-inline`/`unsafe-eval` because Next's static
            export emits inline bootstrap scripts and the WebGL stack needs
            eval-like behavior; removing those requires nonces, which a
            <meta>-delivered CSP on GitHub Pages cannot supply. */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            "base-uri 'self'",
            "object-src 'none'",
            "form-action 'self'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.gstatic.com https://gc.zgo.at",
            "worker-src 'self' blob:",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: https://raw.githubusercontent.com https://cook4986.goatcounter.com",
            "font-src 'self' data:",
            "media-src 'self' blob:",
            "frame-src https://www.youtube.com https://www.youtube-nocookie.com https://my.matterport.com https://sketchfab.com",
            "connect-src 'self' blob: data: https://api.web3forms.com https://cook4986.goatcounter.com https://gc.zgo.at https://www.gstatic.com",
          ].join('; ')}
        />
        {/* Warm up the hero asset — the GLB is on the critical path for the
            landing scene and is fetched by three.js via fetch/XHR. */}
        <link
          rel="preload"
          href="/models/mineral_-_stibine.glb"
          as="fetch"
          type="model/gltf-binary"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">Skip to content</a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
