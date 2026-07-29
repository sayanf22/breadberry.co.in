import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Modern formats first; Next falls back automatically per Accept header.
    formats: ["image/avif", "image/webp"],
    // Trimmed to the breakpoints this layout actually requests.
    deviceSizes: [420, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 256, 384],
  },
  poweredByHeader: false,
  compress: true,
  // Keeps the dev overlay badge from sitting on top of the hero CTA.
  devIndicators: false,
};

export default nextConfig;
