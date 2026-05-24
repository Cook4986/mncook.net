import type { NextConfig } from "next";

console.log('NEXT_BUILD_PLATFORM:', {
  VERCEL: process.env.VERCEL,
  GITHUB_ACTIONS: process.env.GITHUB_ACTIONS,
  output_resolved: process.env.VERCEL ? 'hybrid (undefined)' : 'export'
});

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
