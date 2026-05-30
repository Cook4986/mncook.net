import type { Metadata } from "next";
import { Eczar, IM_Fell_English, Rajdhani } from 'next/font/google';
import "./globals.css";

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
  weight: ['400', '500', '600', '700'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "matt cook — Spatial Computing · Digital Humanities · Creative Practice",
  description: "Personal portfolio of matt cook: spatial computing researcher, digital humanities scholar, and creative practitioner. Projects span 3D visualization, archival transcription, VR, IoT, and literary fiction.",
  openGraph: {
    title: "matt cook",
    description: "Spatial Computing · Digital Humanities · Creative Practice",
    type: "website",
    url: "https://mncook.net",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${eczar.variable} ${fellEnglish.variable} ${rajdhani.variable}`}>
      <head>
        {/* Baseline Content-Security-Policy. Deliberately permissive for the
            sources this static site actually uses (self-hosted assets, inline
            styles/scripts emitted by Next, the WebGL scene, Google-hosted Draco
            decoder, YouTube embeds, Web3Forms) so it adds defense-in-depth
            without breaking anything. Tighten later if inline usage is removed. */}
        <meta
          httpEquiv="Content-Security-Policy"
          content={[
            "default-src 'self'",
            "base-uri 'self'",
            "object-src 'none'",
            "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: https://www.gstatic.com",
            "worker-src 'self' blob:",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: https:",
            "font-src 'self' data:",
            "media-src 'self' blob: https:",
            "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
            "connect-src 'self' https: blob: data:",
          ].join('; ')}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
