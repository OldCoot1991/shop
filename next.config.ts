import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'market.eco07.ru',
        pathname: '/static/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://market.eco07.ru/api/:path*",
      },
      {
        source: "/img-proxy/:path*",
        destination: "https://market.eco07.ru/static/:path*",
      },
    ];
  },
};

export default nextConfig;
