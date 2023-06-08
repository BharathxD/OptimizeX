/** @type {import('next').NextConfig} */
const nextSafe = require('next-safe')

const isDev = process.env.NODE_ENV !== "production";

nextSafe({
  contentTypeOptions: "nosniff",
  contentSecurityPolicy: {
    "base-uri": "'none'",
    "child-src": "'none'",
    "connect-src": "'self'",
    "default-src": "'self'",
    "font-src": "'self'",
    "form-action": "'self'",
    "frame-ancestors": "'none'",
    "frame-src": "'none'",
    "img-src": "'self'",
    "manifest-src": "'self'",
    "object-src": "'none'",
    "prefetch-src": "'self'",
    "script-src": "'self'",
    "style-src": "'self'",
    "worker-src": "'self'",
    reportOnly: false,
  },
  frameOptions: "DENY",
  permissionsPolicy: {},
  permissionsPolicyDirectiveSupport: ["proposed", "standard"],
  isDev: isDev,
  referrerPolicy: "no-referrer",
  xssProtection: "1; mode=block",
});

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
  async headers() {
    return [
      {
        source: "/:path*",
        headers: nextSafe({ isDev }),
      },
    ];
  },
};

module.exports = nextConfig;
