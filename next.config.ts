import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    // Proxy API calls to tabularis-server to avoid CORS in local dev.
    // - Browser hits Next.js at /api/*
    // - Next.js forwards to TABULARIS_SERVER_URL (or NEXT_PUBLIC_API_URL fallback)
    const target = (
      process.env.TABULARIS_SERVER_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "http://localhost:8000"
    ).replace(/\/$/, "");

    return [
      {
        source: "/api/:path*",
        destination: `${target}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
