import { MetadataRoute } from "next";
import { DEFAULT_LOCALE, LOCALES, Locale, SITE_URL, paths } from "@/lib/i18n";

// Only indexable pages; the questionnaire forms themselves are noindex
const PAGES: { path: (l: Locale) => string; priority: number }[] = [
  { path: paths.home, priority: 1 },
  { path: paths.questionnaires, priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.flatMap(({ path, priority }) =>
    LOCALES.map((lang) => ({
      url: `${SITE_URL}${path(lang)}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority,
      alternates: {
        languages: {
          ...Object.fromEntries(LOCALES.map((l) => [l, `${SITE_URL}${path(l)}`])),
          "x-default": `${SITE_URL}${path(DEFAULT_LOCALE)}`,
        },
      },
    }))
  );
}
