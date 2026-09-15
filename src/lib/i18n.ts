export type Lang = "fr" | "en";
export type T = Record<Lang, string>;

export const o = (fr: string, en: string): T => ({ fr, en });
