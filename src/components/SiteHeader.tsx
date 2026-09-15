"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useRef, useState } from "react";

const NAV_LINKS = [
  { href: "/", label: "Accueil" },
  { href: "/expertise", label: "Expertise" },
  { href: "/ingenierie", label: "Ingénierie" },
  { href: "/contact", label: "Contact" },
  { href: "/questionnaire", label: "Questionnaire" },
];

const SiteHeader = () => {
  const pathname = usePathname();
  const headerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

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

  return (
    <>
      {/* Top Gradient Line */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] overflow-hidden">
        <div className="animate-gradient-smooth h-full w-[200%] bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 opacity-40 blur-[1px]" />
      </div>

      <header
        ref={headerRef}
        className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/40 px-4 md:px-8 py-8 md:py-3 flex items-center justify-center"
      >
        {/* Logo */}
        <Link
          href="/"
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
        <nav className="hidden md:flex space-x-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link key={href} href={href} className={linkClasses(href)}>
              {label}
            </Link>
          ))}
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
            {NAV_LINKS.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
                className={linkClasses(href)}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </header>
    </>
  );
};

export default SiteHeader;
