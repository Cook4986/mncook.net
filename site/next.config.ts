import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
