import type { NextConfig } from "next";

process.env.NEXT_DISABLE_SWC = 'true';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/drdxdfvpp/image/upload/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/**',
      },
    ],
  },
  experimental: {
    forceSwcTransforms: false,
  },
  
  compiler: {
    removeConsole: false,
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};



export default nextConfig;

