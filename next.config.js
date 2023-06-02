/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    domains: [
      "bharathxds-projects.s3.ap-south-1.amazonaws.com",
      "lh3.googleusercontent.com",
      "avatars.githubusercontent.com",
    ],
    imageSizes: [16, 32, 48, 64, 96],
  },
};

module.exports = nextConfig;
