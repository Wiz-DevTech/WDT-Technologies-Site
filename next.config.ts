/** @type {import('next').NextConfig} */
const nextConfig = {
  // SEO and performance optimizations
  reactStrictMode: true,  // Changed to true for better SEO and development experience
  swcMinify: true,
  
  // Image optimization for SEO
  images: {
    domains: ['wiz-devtech.github.io'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // Security headers for SEO and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  
  // Existing configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable Next.js hot reload (handled by nodemon)
  webpack: (config, { dev }) => {
    if (dev) {
      // Disable webpack's hot module replacement
      config.watchOptions = {
        ignored: ['**/*'], // Ignore all file changes
      };
    }
    return config;
  },
  
  // Ignore ESLint errors during builds
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;