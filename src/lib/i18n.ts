export type Lang = "fr" | "en";
export type T = Record<Lang, string>;

export const o = (fr: string, en: string): T => ({ fr, en });

// Social sharing image per language (1200×630, in /public/og)
export const ogImages = (lang: Lang) => [
  { url: `/og/gd-consulting-${lang}.jpg`, width: 1200, height: 630, alt: "GD Consulting" },
];
