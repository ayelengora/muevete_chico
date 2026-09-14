import type { NextConfig } from "next";

const api = process.env.API_URL || "http://127.0.0.1:43124";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      { source: "/api/:path*", destination: `${api}/api/:path*` },
      { source: "/rails/:path*", destination: `${api}/rails/:path*` },
    ];
  },
};

export default nextConfig;
