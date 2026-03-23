import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ozpro.ru',
        pathname: '/static/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://ozpro.ru/api/:path*",
      },
      {
        source: "/img-proxy/:path*",
        destination: "https://ozpro.ru/static/:path*",
      },
    ];
  },
};

export default nextConfig;
