import type { Metadata } from "next";
import { Eczar, IM_Fell_English, Rajdhani } from 'next/font/google';
import "./globals.css";

const eczar = Eczar({ 
  subsets: ['latin'], 
  weight: ['400', '700'],
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
      <body>{children}</body>
    </html>
  );
}
