import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  agentRules: false,
  images: {
    // Sirv is the primary asset host for product, hero, category and
    // testimonial images (see PurelyBaby admin image workflow).
    remotePatterns: [
      { protocol: "https", hostname: "*.sirv.com" },
      { protocol: "https", hostname: "sirv.com" },
      // Supabase Storage — product/category/banner/logo uploads.
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
};

export default nextConfig;
