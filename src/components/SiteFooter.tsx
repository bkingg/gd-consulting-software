"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Lang } from "@/lib/i18n";

const NAV_LINKS: { base: string; label: Record<Lang, string> }[] = [
  { base: "", label: { fr: "Accueil", en: "Home" } },
  { base: "/expertise", label: { fr: "Expertise", en: "Expertise" } },
  { base: "/ingenierie", label: { fr: "Ingénierie", en: "Engineering" } },
  { base: "/contact", label: { fr: "Contact", en: "Contact" } },
  { base: "/questionnaire", label: { fr: "Questionnaire", en: "Questionnaire" } },
];

const RIGHTS: Record<Lang, string> = {
  fr: "Tous droits réservés.",
  en: "All rights reserved.",
};

const localizeHref = (base: string, lang: Lang) => {
  if (lang === "fr") return base === "" ? "/" : base;
  return base === "" ? "/en" : `/en${base}`;
};

const SiteFooter = () => {
  const pathname = usePathname();
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const lang: Lang = isEn ? "en" : "fr";

  return (
    <footer className="bg-black text-white/70 px-6 py-12 border-t border-white/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <span className="font-bold text-white tracking-wide">
          GD Consulting
        </span>

        <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
          {NAV_LINKS.map(({ base, label }) => (
            <Link
              key={base}
              href={localizeHref(base, lang)}
              className="hover:text-white transition-colors"
            >
              {label[lang]}
            </Link>
          ))}
        </nav>

        <a
          href="mailto:contact@gdco.tech"
          className="text-sm hover:text-white transition-colors"
        >
          contact@gdco.tech
        </a>
      </div>

      <p className="text-center text-xs text-white/40 mt-8">
        © {new Date().getFullYear()} GD Consulting. {RIGHTS[lang]}
      </p>
    </footer>
  );
};

export default SiteFooter;
