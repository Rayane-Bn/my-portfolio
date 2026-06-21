import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Modern, compressed image formats served automatically by next/image
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Smaller client JS: lets Next tree-shake these packages per-import
  experimental: {
    optimizePackageImports: ["framer-motion"],
  },
  compress: true,
};

export default nextConfig;
