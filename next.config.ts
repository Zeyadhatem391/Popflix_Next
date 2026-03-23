import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
        hostname: "grocery.newcinderella.online",
      },
     
    ],
  },
};

export default nextConfig;
