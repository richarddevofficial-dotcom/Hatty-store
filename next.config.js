/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add any external image domains if needed
    unoptimized: process.env.NODE_ENV === "development",
  },
};

module.exports = nextConfig;
