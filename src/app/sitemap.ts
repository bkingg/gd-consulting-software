import type { MetadataRoute } from "next";

const BASE_URL = "https://gdco.tech";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/expertise", "/ingenierie", "/contact"];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
