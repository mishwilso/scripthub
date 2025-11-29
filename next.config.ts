import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  serverExternalPackages: ["@supabase/supabase-js"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "monpveagptvfcvvluvwi.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
