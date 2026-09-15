import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/questionnaire", "/en/questionnaire", "/api/"],
      },
    ],
    sitemap: "https://gdco.tech/sitemap.xml",
  };
}
