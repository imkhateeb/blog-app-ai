import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com", "utfs.io"], // Allow Cloudinary images
  },
};

export default nextConfig;
