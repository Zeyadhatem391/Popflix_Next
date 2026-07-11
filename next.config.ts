import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "survey.afaaqware.com",
      },
      {
        protocol: "https",
        hostname: "pub-0c119b6b44b743258bcfdf8aa340f009.r2.dev",
      },
    ],
  },
};

export default nextConfig;
