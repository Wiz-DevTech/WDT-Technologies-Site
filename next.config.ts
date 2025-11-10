// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Remove output: 'export' for Vercel
  trailingSlash: true,
  images: {
    // Enable image optimization on Vercel
    unoptimized: false,
  },
  reactStrictMode: true,
  // Enable any experimental features you need
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;