import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // 在生产构建时忽略TypeScript错误(临时方案)
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
