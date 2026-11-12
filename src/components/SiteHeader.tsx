"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRightIcon,
  Bars3Icon,
  BeakerIcon,
  ChatBubbleLeftRightIcon,
  ChevronDownIcon,
  ClipboardDocumentListIcon,
  CpuChipIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useEffect, useRef, useState, type ComponentType, type SVGProps } from "react";
import NavigationProgressBar from "@/components/NavigationProgressBar";
import { o, type Lang, type T } from "@/lib/i18n";
import { COLLECTIONS, OFFERINGS, offeringHref, type Offering } from "@/lib/offerings";

type MenuKey = "solutions" | "secteurs" | "company";

const localizeHref = (base: string, lang: Lang) => {
  if (lang === "fr") return base === "" ? "/" : base;
  return base === "" ? "/en" : `/en${base}`;
};

const COMPANY_LINKS: {
  base: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: T;
  text: T;
}[] = [
  {
    base: "/expertise",
    icon: CpuChipIcon,
    title: o("Expertise", "Expertise"),
    text: o("Nos domaines d’excellence", "Our areas of excellence"),
  },
  {
    base: "/ingenierie",
    icon: BeakerIcon,
    title: o("Ingénierie", "Engineering"),
    text: o("Notre approche et nos standards", "Our approach and standards"),
  },
  {
    base: "/questionnaire",
    icon: ClipboardDocumentListIcon,
    title: o("Questionnaire projet", "Project questionnaire"),
    text: o("Qualifiez votre besoin en 5 minutes", "Scope your needs in 5 minutes"),
  },
  {
    base: "/contact",
    icon: ChatBubbleLeftRightIcon,
    title: o("Contact", "Contact"),
    text: o("Échangez avec nos experts", "Talk to our experts"),
  },
];

const t = {
  home: o("Accueil", "Home"),
  company: o("Entreprise", "Company"),
  viewAll: o("Tout voir", "View all"),
  cta: o("Démarrer un projet", "Start a project"),
  featuredEyebrow: o("Cycle de vie complet", "Full lifecycle"),
  featuredTitle: o(
    "Des exigences à l’exploitation, une seule équipe d’ingénierie",
    "From requirements to operations, one engineering team"
  ),
  featuredText: o(
    "Un interlocuteur unique pour concevoir, construire et opérer vos logiciels critiques.",
    "A single partner to design, build and run your mission-critical software."
  ),
  sectorsTitle: o(
    "Une ingénierie adaptée aux contraintes de votre secteur",
    "Engineering tailored to your industry constraints"
  ),
};

/** Groups offerings by their `group` label, preserving order. */
const groupOfferings = (items: Offering[], lang: Lang) => {
  const groups = new Map<string, Offering[]>();
  for (const item of items) {
    const key = item.group?.[lang] ?? "";
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()];
};

const SiteHeader = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(null);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const lang: Lang = isEn ? "en" : "fr";
  const otherLangHref = isEn
    ? pathname.replace(/^\/en/, "") || "/"
    : pathname === "/"
    ? "/en"
    : `/en${pathname}`;

  // Solidify the bar once the page scrolls so it stays legible over light sections.
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close every menu on navigation.
  useEffect(() => {
    setMobileOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  // Escape and outside clicks close open menus.
  useEffect(() => {
    if (!mobileOpen && !activeMenu) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setActiveMenu(null);
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) setActiveMenu(null);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
    };
  }, [mobileOpen, activeMenu]);

  const openMenu = (key: MenuKey) => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setActiveMenu(key);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setActiveMenu(null), 150);
  };

  const isActive = (href: string) =>
    href === "/" || href === "/en" ? pathname === href : pathname.startsWith(href);

  const sectionActive = (key: MenuKey) =>
    key === "company"
      ? COMPANY_LINKS.some(({ base }) => isActive(localizeHref(base, lang)))
      : isActive(offeringHref(key, null, lang));

  const menuLabel = (key: MenuKey) =>
    key === "company" ? t.company[lang] : COLLECTIONS[key].label[lang];

  const triggerClasses = (active: boolean, open: boolean) =>
    `flex items-center gap-1 cursor-pointer px-4 py-2 rounded-full transition-all duration-300 hover:text-white hover:bg-green-500/20 ${
      active ? "text-white bg-green-500/30" : open ? "text-white bg-white/5" : "text-white/70"
    }`;

  const LanguageSwitcher = () => (
    <div
      className="flex overflow-hidden rounded-full border border-white/15"
      role="group"
      aria-label="Langue / Language"
    >
      {(["fr", "en"] as Lang[]).map((l) => (
        <Link
          key={l}
          href={l === lang ? pathname : otherLangHref}
          aria-current={l === lang}
          className={`px-3 py-1.5 text-xs font-semibold ${
            l === lang ? "bg-green-500 text-black" : "text-white/70 hover:text-white"
          }`}
        >
          {l.toUpperCase()}
        </Link>
      ))}
    </div>
  );

  /* ------------------------------ Panels -------------------------------- */

  const OfferingLink = ({ collection, item }: { collection: "solutions" | "secteurs"; item: Offering }) => (
    <Link
      href={offeringHref(collection, item.slug, lang)}
      className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-green-500/10"
    >
      <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/5 text-green-400 group-hover:border-green-400/60">
        <item.icon className="h-5 w-5" />
      </span>
      <span>
        <span className="block font-semibold text-white group-hover:text-green-300">
          {item.title[lang]}
        </span>
        <span className="block text-sm leading-snug text-white/50 line-clamp-2">
          {item.tagline[lang]}
        </span>
      </span>
    </Link>
  );

  const FeaturedCard = ({ title, href }: { title: string; href: string }) => (
    <div className="hud-card relative flex h-full flex-col justify-between overflow-hidden rounded-2xl p-6">
      <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-green-500/20 blur-3xl" />
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-green-400/80 mb-3">
          {t.featuredEyebrow[lang]}
        </p>
        <p className="text-lg font-bold text-white mb-2">{title}</p>
        <p className="text-sm text-white/60">{t.featuredText[lang]}</p>
      </div>
      <Link
        href={href}
        className="mt-6 inline-flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2.5 text-sm font-bold text-white"
      >
        {t.cta[lang]}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
  );

  const ViewAll = ({ href }: { href: string }) => (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-sm font-semibold text-green-400 hover:text-green-300"
    >
      {t.viewAll[lang]}
      <ArrowRightIcon className="h-4 w-4" />
    </Link>
  );

  const contactHref = localizeHref("/contact", lang);

  const panel = (key: MenuKey) => {
    if (key === "solutions") {
      return (
        <div className="grid grid-cols-[1fr_1fr_1fr_18rem] gap-6">
          {groupOfferings(OFFERINGS.solutions, lang).map(([group, items]) => (
            <div key={group}>
              <p className="mb-2 px-3 font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">
                {group}
              </p>
              <div className="space-y-1">
                {items.map((item) => (
                  <OfferingLink key={item.slug} collection="solutions" item={item} />
                ))}
              </div>
            </div>
          ))}
          <div className="flex flex-col gap-4">
            <FeaturedCard title={t.featuredTitle[lang]} href={contactHref} />
            <div className="px-1">
              <ViewAll href={offeringHref("solutions", null, lang)} />
            </div>
          </div>
        </div>
      );
    }
    if (key === "secteurs") {
      return (
        <div className="grid grid-cols-[1fr_18rem] gap-6">
          <div>
            <div className="grid grid-cols-2 gap-1">
              {OFFERINGS.secteurs.map((item) => (
                <OfferingLink key={item.slug} collection="secteurs" item={item} />
              ))}
            </div>
            <div className="mt-4 px-3">
              <ViewAll href={offeringHref("secteurs", null, lang)} />
            </div>
          </div>
          <FeaturedCard title={t.sectorsTitle[lang]} href={contactHref} />
        </div>
      );
    }
    return (
      <div className="grid grid-cols-[1fr_18rem] gap-6">
        <div className="grid grid-cols-2 gap-1">
          {COMPANY_LINKS.map(({ base, icon: Icon, title, text }) => (
            <Link
              key={base}
              href={localizeHref(base, lang)}
              className="group flex items-start gap-3 rounded-xl p-3 transition-colors hover:bg-green-500/10"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-green-500/20 bg-green-500/5 text-green-400">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold text-white group-hover:text-green-300">
                  {title[lang]}
                </span>
                <span className="block text-sm text-white/50">{text[lang]}</span>
              </span>
            </Link>
          ))}
        </div>
        <FeaturedCard title={t.featuredTitle[lang]} href={contactHref} />
      </div>
    );
  };

  const MENUS: MenuKey[] = ["solutions", "secteurs", "company"];

  return (
    <>
      <NavigationProgressBar />

      <header
        ref={headerRef}
        onMouseLeave={scheduleClose}
        className={`fixed top-0 left-0 w-full h-20 z-50 backdrop-blur-lg px-4 md:px-8 flex items-center justify-between transition-colors duration-300 ${
          scrolled || mobileOpen || activeMenu
            ? "bg-black/90 border-b border-green-500/15 shadow-lg shadow-black/20"
            : "bg-black/40 border-b border-transparent"
        }`}
      >
        {/* Logo */}
        <Link
          href={localizeHref("", lang)}
          className="flex shrink-0 items-center space-x-3 md:space-x-4"
        >
          <Image
            src="/gd-consulting-logo.png"
            alt="GD Consulting Logo"
            width={50}
            height={50}
            className="rounded-full"
          />
          <span className="text-white font-bold text-lg md:text-xl tracking-wide">
            GD Consulting
          </span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navigation principale">
          <Link
            href={localizeHref("", lang)}
            onMouseEnter={scheduleClose}
            className={triggerClasses(isActive(localizeHref("", lang)), false)}
          >
            {t.home[lang]}
          </Link>
          {MENUS.map((key) => (
            <button
              key={key}
              type="button"
              aria-expanded={activeMenu === key}
              aria-haspopup="true"
              onMouseEnter={() => openMenu(key)}
              onClick={() => setActiveMenu(activeMenu === key ? null : key)}
              className={triggerClasses(sectionActive(key), activeMenu === key)}
            >
              {menuLabel(key)}
              <ChevronDownIcon
                className={`h-4 w-4 transition-transform duration-300 ${
                  activeMenu === key ? "rotate-180" : ""
                }`}
              />
            </button>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href={contactHref}
            onMouseEnter={scheduleClose}
            className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2 text-sm font-bold text-white shadow-lg shadow-green-500/20 transition-transform hover:scale-105"
          >
            {t.cta[lang]}
          </Link>
        </div>

        {/* Mega menu panel */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              key="mega"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              onMouseEnter={() => openMenu(activeMenu)}
              className="absolute left-0 top-full hidden w-full border-b border-green-500/15 bg-black/95 backdrop-blur-xl lg:block"
            >
              <div className="mx-auto max-w-7xl px-8 py-8">{panel(activeMenu)}</div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Hamburger */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white focus:outline-none cursor-pointer"
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="absolute top-full left-0 w-full max-h-[calc(100dvh-5rem)] overflow-y-auto bg-black/95 backdrop-blur-md px-4 py-4 lg:hidden">
            <Link
              href={localizeHref("", lang)}
              className="block rounded-xl px-4 py-3 font-semibold text-white hover:bg-green-500/10"
            >
              {t.home[lang]}
            </Link>
            {MENUS.map((key) => {
              const open = mobileSection === key;
              const links =
                key === "company"
                  ? COMPANY_LINKS.map((l) => ({ href: localizeHref(l.base, lang), label: l.title[lang] }))
                  : [
                      ...OFFERINGS[key].map((i) => ({
                        href: offeringHref(key, i.slug, lang),
                        label: i.title[lang],
                      })),
                      { href: offeringHref(key, null, lang), label: `${t.viewAll[lang]} →` },
                    ];
              return (
                <div key={key} className="border-t border-white/5">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => setMobileSection(open ? null : key)}
                    className="flex w-full items-center justify-between rounded-xl px-4 py-3 font-semibold text-white"
                  >
                    {menuLabel(key)}
                    <ChevronDownIcon className={`h-5 w-5 transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && (
                    <div className="pb-3 pl-4">
                      {links.map(({ href, label }) => (
                        <Link
                          key={href}
                          href={href}
                          className={`block rounded-lg px-4 py-2 text-sm hover:bg-green-500/10 ${
                            pathname === href ? "text-green-400" : "text-white/70"
                          }`}
                        >
                          {label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
            <div className="flex items-center justify-between gap-4 border-t border-white/5 px-4 pt-4">
              <LanguageSwitcher />
              <Link
                href={contactHref}
                className="rounded-full bg-gradient-to-r from-green-500 to-emerald-600 px-5 py-2 text-sm font-bold text-white"
              >
                {t.cta[lang]}
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default SiteHeader;
