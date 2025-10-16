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
        hostname: "udbyd4avvz.ufs.sh",
      },
    ],
  },
  typedRoutes: true,
};

export default nextConfig;
