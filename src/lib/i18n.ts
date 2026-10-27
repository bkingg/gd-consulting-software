export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export const SITE_URL = "https://gdco.tech";

export const isLocale = (value: string): value is Locale =>
  (LOCALES as readonly string[]).includes(value);

export const otherLocale = (lang: Locale): Locale => (lang === "fr" ? "en" : "fr");

export const OG_LOCALES: Record<Locale, string> = { fr: "fr_FR", en: "en_US" };

export type QuestionnaireKind = "website" | "software";
export const QUESTIONNAIRE_KINDS: QuestionnaireKind[] = ["website", "software"];

// Localized URL slugs: /fr/questionnaire/site-web, /en/questionnaire/website…
export const QUESTIONNAIRE_SLUGS: Record<QuestionnaireKind, Record<Locale, string>> = {
  website: { fr: "site-web", en: "website" },
  software: { fr: "logiciel", en: "software" },
};

export const kindFromSlug = (lang: Locale, slug: string) =>
  QUESTIONNAIRE_KINDS.find((k) => QUESTIONNAIRE_SLUGS[k][lang] === slug);

export const paths = {
  home: (lang: Locale) => `/${lang}`,
  questionnaires: (lang: Locale) => `/${lang}/questionnaire`,
  questionnaire: (lang: Locale, kind: QuestionnaireKind) =>
    `/${lang}/questionnaire/${QUESTIONNAIRE_SLUGS[kind][lang]}`,
};

// canonical + hreflang alternates for a page that exists in every locale
export const alternatesFor = (lang: Locale, pathFor: (l: Locale) => string) => ({
  canonical: pathFor(lang),
  languages: {
    ...Object.fromEntries(LOCALES.map((l) => [l, pathFor(l)])),
    "x-default": pathFor(DEFAULT_LOCALE),
  },
});
