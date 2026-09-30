import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.frontdesk.africa",
      },
      {
        protocol: "https",
        hostname: "storage.googleapis.com",
        pathname: "/frontdesk-uploads/**",
      },
    ],
  },
};

export default nextConfig;
