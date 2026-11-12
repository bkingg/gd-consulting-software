import type { MetadataRoute } from "next";
import { OFFERINGS } from "@/lib/offerings";

const BASE_URL = "https://gdco.tech";
const ROUTES = [
  "",
  "/expertise",
  "/ingenierie",
  "/contact",
  "/solutions",
  "/secteurs",
  ...OFFERINGS.solutions.map(({ slug }) => `/solutions/${slug}`),
  ...OFFERINGS.secteurs.map(({ slug }) => `/secteurs/${slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entry = (url: string, route: string): MetadataRoute.Sitemap[number] => ({
    url,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.8,
    alternates: {
      languages: {
        fr: `${BASE_URL}${route}`,
        en: `${BASE_URL}/en${route}`,
      },
    },
  });

  return [
    ...ROUTES.map((route) => entry(`${BASE_URL}${route}`, route)),
    ...ROUTES.map((route) => entry(`${BASE_URL}/en${route}`, route)),
  ];
}
