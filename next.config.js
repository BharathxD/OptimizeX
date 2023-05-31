/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["bharathxds-projects.s3.ap-south-1.amazonaws.com"],
    imageSizes: [16, 32, 48, 64, 96],
  },
};

module.exports = nextConfig;
