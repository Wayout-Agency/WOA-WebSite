/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: { images: { allowFutureImage: true } },
  images: {
    domains: ["localhost", "wayout-backend", "wayout.agency"],
  },
};

module.exports = nextConfig;
