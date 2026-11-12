import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep URLs from the earlier /fr-prefixed site working: French now lives at
  // the root, and the questionnaire no longer has per-type sub-pages.
  async redirects() {
    return [
      { source: "/fr/questionnaire/:slug", destination: "/questionnaire", permanent: true },
      { source: "/en/questionnaire/:slug", destination: "/en/questionnaire", permanent: true },
      { source: "/fr", destination: "/", permanent: true },
      { source: "/fr/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
