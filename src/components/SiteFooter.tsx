"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { o, type Lang } from "@/lib/i18n";
import { COLLECTIONS, OFFERINGS, offeringHref } from "@/lib/offerings";

const COMPANY_LINKS = [
  { base: "/expertise", label: o("Expertise", "Expertise") },
  { base: "/ingenierie", label: o("Ingénierie", "Engineering") },
  { base: "/questionnaire", label: o("Questionnaire projet", "Project questionnaire") },
  { base: "/contact", label: o("Contact", "Contact") },
];

const t = {
  tagline: o(
    "Ingénierie logicielle d’entreprise : applications web, services web, ERP et e-commerce à grande échelle.",
    "Enterprise software engineering: web applications, web services, ERP and high-scale e-commerce."
  ),
  company: o("Entreprise", "Company"),
  rights: o("Tous droits réservés.", "All rights reserved."),
};

const localizeHref = (base: string, lang: Lang) => {
  if (lang === "fr") return base === "" ? "/" : base;
  return base === "" ? "/en" : `/en${base}`;
};

const SiteFooter = () => {
  const pathname = usePathname();
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const lang: Lang = isEn ? "en" : "fr";

  const columns = [
    {
      title: COLLECTIONS.solutions.label[lang],
      links: OFFERINGS.solutions.map((s) => ({
        href: offeringHref("solutions", s.slug, lang),
        label: s.title[lang],
      })),
    },
    {
      title: COLLECTIONS.secteurs.label[lang],
      links: OFFERINGS.secteurs.map((s) => ({
        href: offeringHref("secteurs", s.slug, lang),
        label: s.title[lang],
      })),
    },
    {
      title: t.company[lang],
      links: COMPANY_LINKS.map(({ base, label }) => ({
        href: localizeHref(base, lang),
        label: label[lang],
      })),
    },
  ];

  return (
    <footer className="bg-black text-white/60 px-6 md:px-8 pt-20 pb-10 border-t border-white/10">
      <div className="max-w-7xl mx-auto grid gap-12 lg:grid-cols-[1.3fr_1.4fr_1fr_1fr]">
        <div>
          <Link href={localizeHref("", lang)} className="text-lg font-semibold text-white">
            GD Consulting
          </Link>
          <p className="mt-4 max-w-xs text-sm">{t.tagline[lang]}</p>
          <a
            href="mailto:contact@gdco.tech"
            className="mt-6 inline-block text-sm text-green-400 hover:text-green-300 transition-colors"
          >
            contact@gdco.tech
          </a>
        </div>

        {columns.map(({ title, links }) => (
          <nav key={title} aria-label={title}>
            <p className="mb-4 font-mono text-xs uppercase tracking-[0.16em] text-white/40">
              {title}
            </p>
            <ul className={`space-y-2.5 text-sm ${links.length > 6 ? "sm:columns-2 lg:columns-1 gap-6" : ""}`}>
              {links.map(({ href, label }) => (
                <li key={href} className="break-inside-avoid">
                  <Link href={href} className="hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 text-xs text-white/40">
        © {new Date().getFullYear()} GD Consulting. {t.rights[lang]}
      </div>
    </footer>
  );
};

export default SiteFooter;
