import type { NextConfig } from "next";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  // Two root layouts ((vi) + /en): global-not-found covers unmatched URLs.
  experimental: { globalNotFound: true },
};

export default nextConfig;
