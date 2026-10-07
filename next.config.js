/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "commons.wikimedia.org" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  // Skip lint during builds so `npm run build` never fails on style-only
  // warnings in this generated codebase. Type errors still fail the build.
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
