import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile workspace packages
  transpilePackages: ["@golfbuddy/shared", "@golfbuddy/firebase"],

  // Exclude Node.js packages from server component bundling
  serverExternalPackages: ["firebase-admin"],
};

export default nextConfig;
