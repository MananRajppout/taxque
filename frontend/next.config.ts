import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "img.icons8.com",
      "images.unsplash.com",
      "cdn.jsdelivr.net",
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  outputFileTracingRoot: __dirname,
};

export default nextConfig;
