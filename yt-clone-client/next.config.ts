import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'images.pexels.com', // Add this hostname here
      // If you have other image domains, add them here too
      // e.g., 'another-image-domain.com',
    ],
  },
};

export default nextConfig;
