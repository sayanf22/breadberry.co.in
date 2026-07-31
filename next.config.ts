import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // OpenNext packages this standalone server into the Cloudflare Worker.
  output: "standalone",
  images: {
    // Serve pre-optimized local WebP static assets directly with 100% reliability
    unoptimized: true,
  },
  poweredByHeader: false,
  compress: true,
  // Keeps the dev overlay badge from sitting on top of the hero CTA.
  devIndicators: false,
};

export default nextConfig;
