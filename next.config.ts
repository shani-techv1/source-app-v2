import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ['@types/node'],
  },
  images: {
    dangerouslyAllowSVG: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'videos.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'xcbbarwznolppjnnyxpf.supabase.co',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'plus.unsplash.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'github.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
        pathname: '/**'
      }
    ]
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
