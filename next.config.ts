// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    unoptimized: false,
  },
  reactStrictMode: true,
};

export default nextConfig;