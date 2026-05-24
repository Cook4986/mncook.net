import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // If building on Vercel, use standard hybrid mode to enable Serverless API routes.
  // Otherwise, use 'export' for static GitHub Pages builds.
  output: process.env.VERCEL ? undefined : 'export',
  // Disable image optimization for static export, or configure unoptimized: true
  images: {
    unoptimized: true,
  },
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
