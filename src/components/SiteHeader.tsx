"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";
import NavigationProgressBar from "@/components/NavigationProgressBar";
import type { Lang } from "@/lib/i18n";

const NAV_LINKS: { base: string; label: Record<Lang, string> }[] = [
  { base: "", label: { fr: "Accueil", en: "Home" } },
  { base: "/expertise", label: { fr: "Expertise", en: "Expertise" } },
  { base: "/ingenierie", label: { fr: "Ingénierie", en: "Engineering" } },
  { base: "/contact", label: { fr: "Contact", en: "Contact" } },
  { base: "/questionnaire", label: { fr: "Questionnaire", en: "Questionnaire" } },
];

const localizeHref = (base: string, lang: Lang) => {
  if (lang === "fr") return base === "" ? "/" : base;
  return base === "" ? "/en" : `/en${base}`;
};

const SiteHeader = () => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const lang: Lang = isEn ? "en" : "fr";
  const otherLangHref = isEn
    ? pathname.replace(/^\/en/, "") || "/"
    : pathname === "/"
    ? "/en"
    : `/en${pathname}`;

  useEffect(() => {
    let ticking = false;

    const applyParallax = () => {
      if (headerRef.current) {
        headerRef.current.style.transform = `translateY(${
          window.scrollY * 0.2
        }px)`;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(applyParallax);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkClasses = (href: string) =>
    `cursor-pointer px-4 py-2 rounded-full transition-all duration-300 hover:text-white hover:bg-green-500/30 ${
      pathname === href ? "bg-green-500/50 text-white" : "text-white/70"
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

  return (
    <>
      <NavigationProgressBar />

      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full h-20 z-50 backdrop-blur-lg bg-black/40 px-4 md:px-8 flex items-center justify-center"
      >
        {/* Logo */}
        <Link
          href={localizeHref("", lang)}
          className="absolute left-4 md:left-8 flex items-center space-x-3 md:space-x-4"
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
        <nav className="hidden md:flex items-center space-x-6">
          {NAV_LINKS.map(({ base, label }) => {
            const href = localizeHref(base, lang);
            return (
              <Link key={base} href={href} className={linkClasses(href)}>
                {label[lang]}
              </Link>
            );
          })}
          <LanguageSwitcher />
        </nav>

        {/* Mobile Hamburger */}
        <div className="md:hidden absolute right-4 flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none cursor-pointer"
            aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-black/90 backdrop-blur-md flex flex-col items-center py-4 space-y-3 md:hidden">
            {NAV_LINKS.map(({ base, label }) => {
              const href = localizeHref(base, lang);
              return (
                <Link
                  key={base}
                  href={href}
                  onClick={() => setIsOpen(false)}
                  className={linkClasses(href)}
                >
                  {label[lang]}
                </Link>
              );
            })}
            <div onClick={() => setIsOpen(false)}>
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default SiteHeader;
