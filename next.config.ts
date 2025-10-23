import type { NextConfig } from "next";

import "./src/env.ts";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "9rueg8wwf4.ufs.sh",
      },
    ],
  },
  typedRoutes: true,
};

export default nextConfig;
