"use client";

import Image from "next/image";
import { ArrowRightIcon, ArrowUpRightIcon, EnvelopeIcon } from "@heroicons/react/24/outline";
import { RefObject, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Contact from "@/components/Contact";
import type { Dictionary } from "@/lib/dictionaries";
import { Locale, LOCALES, paths } from "@/lib/i18n";

const NAV_IDS = ["accueil", "expertise", "ai", "engineering", "contact"] as const;

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400";

const ctaClass = `inline-block bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-emerald-900/30 transition-transform duration-300 ease-out hover:scale-105 active:scale-[0.98] motion-reduce:transition-none motion-reduce:hover:scale-100 ${focusRing}`;

// Runs a canvas animation sized to its parent, paused while off-screen,
// and drawn as a single still frame when the visitor prefers reduced motion
const useCanvasAnimation = (
  canvasRef: RefObject<HTMLCanvasElement | null>,
  setup: (width: number, height: number) => (ctx: CanvasRenderingContext2D) => void
) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !parent || !ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let draw: (ctx: CanvasRenderingContext2D) => void;
    let animationId = 0;
    let visible = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw = setup(width, height);
      if (reduceMotion || !visible) draw(ctx);
    };

    const loop = () => {
      draw(ctx);
      animationId = requestAnimationFrame(loop);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      cancelAnimationFrame(animationId);
      if (visible && !reduceMotion) loop();
    });

    const resizeObserver = new ResizeObserver(resize);
    resize();
    resizeObserver.observe(parent);
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      cancelAnimationFrame(animationId);
    };
  }, [canvasRef, setup]);
};

const setupBlobs = (width: number, height: number) => {
  const blobs = [
    { x: 0.3, y: 0.4, r: 0.25, dx: 0.000002, dy: 0.0000015 },
    { x: 0.7, y: 0.5, r: 0.3, dx: -0.0000018, dy: 0.000002 },
    { x: 0.5, y: 0.7, r: 0.2, dx: 0.0000015, dy: -0.000002 },
  ];

  return (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    blobs.forEach((b) => {
      // Move blob very slowly
      b.x += b.dx * width;
      b.y += b.dy * height;
      if (b.x < 0 || b.x > 1) b.dx *= -1;
      if (b.y < 0 || b.y > 1) b.dy *= -1;

      const gradient = ctx.createRadialGradient(
        b.x * width,
        b.y * height,
        0,
        b.x * width,
        b.y * height,
        b.r * width
      );
      gradient.addColorStop(0, "rgba(0, 200, 150, 0.15)");
      gradient.addColorStop(1, "rgba(0, 200, 150, 0)");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    });
  };
};

const ElegantBlobs = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasAnimation(canvasRef, setupBlobs);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    />
  );
};

const LINK_DISTANCE = 120;

const setupNetwork = (width: number, height: number) => {
  // Keep the density constant so small screens aren't overcrowded
  const count = Math.max(30, Math.min(90, Math.round((width * height) / 14000)));
  const particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.5,
    vy: (Math.random() - 0.5) * 0.5,
  }));

  return (ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(0,255,128,0.25)";
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fill();

      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dist = Math.hypot(p.x - q.x, p.y - q.y);
        if (dist < LINK_DISTANCE) {
          ctx.strokeStyle = `rgba(0,255,128,${1 - dist / LINK_DISTANCE})`;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }
    }
  };
};

const NeuralNetworkEffect = ({ transparent = false }: { transparent?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useCanvasAnimation(canvasRef, setupNetwork);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute top-0 left-0 w-full h-full ${transparent ? "" : "bg-black"}`}
    />
  );
};

const EXPERTISE_IMAGES = [
  "/images/code-editor.webp",
  "/images/server-panel-green.webp",
  "/images/neon-circuit.webp",
];

const Homepage = ({ lang, dict }: { lang: Locale; dict: Dictionary }) => {
  const [activeSection, setActiveSection] = useState<string>("accueil");
  const [isOpen, setIsOpen] = useState(false);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { root: null, threshold: 0.5 }
    );

    NAV_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(query.matches);
    const onChange = () => setReduceMotion(query.matches);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const wasOpen = useRef(false);

  // Mobile menu: lock page scroll, close with Escape, move focus in and back out
  useEffect(() => {
    if (!isOpen) {
      if (wasOpen.current) menuButtonRef.current?.focus();
      wasOpen.current = false;
      return;
    }
    wasOpen.current = true;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    // Wait a frame so the panel is rendered visible before focusing into it
    const frame = requestAnimationFrame(() =>
      menuRef.current?.querySelector<HTMLElement>("a")?.focus({ preventScroll: true })
    );
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    const onResize = () => window.matchMedia("(min-width: 1280px)").matches && setIsOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(frame);
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  const navLinkClass = (id: string) =>
    `cursor-pointer px-4 py-2 rounded-full transition-colors duration-300 hover:text-white hover:bg-green-500/30 ${focusRing} ${
      activeSection === id ? "bg-green-500/50 text-white" : "text-white/75"
    }`;

  // Staggered entrance for mobile menu content
  const stagger = (i: number) => ({
    className: `duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
      isOpen || reduceMotion ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
    }`,
    // Only opacity and movement: transitioning visibility would keep links unfocusable during the delay
    style: reduceMotion
      ? { transitionProperty: "none" }
      : { transitionProperty: "opacity, translate", transitionDelay: isOpen ? `${80 + i * 45}ms` : "0ms" },
  });

  return (
    <div className="w-full overflow-x-hidden relative">
      {/* Top Gradient Line */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[60] overflow-hidden">
        <div className="animate-gradient-smooth h-full w-[200%] bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 opacity-40 blur-[1px]" />
      </div>

      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-lg bg-black/85 border-b border-white/5 px-2 md:px-8 h-16 grid grid-cols-[1fr_auto] xl:grid-cols-[1fr_auto_1fr] items-center">
        {/* Logo */}
        <a
          href="#accueil"
          className={`justify-self-start ml-2 md:ml-0 flex items-center gap-3 rounded-full ${focusRing}`}
        >
          <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
            <Image
              src="/gd-consulting-logo.png"
              alt=""
              width={30}
              height={19}
            />
          </span>
          <span className="font-heading text-white font-bold text-base md:text-lg tracking-wide">
            GD Consulting
          </span>
        </a>

        {/* Desktop Menu */}
        <nav aria-label={dict.nav.label} className="hidden xl:flex gap-2">
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={activeSection === id ? "true" : undefined}
              className={navLinkClass(id)}
            >
              {dict.nav.items[id]}
            </a>
          ))}
          <Link href={paths.questionnaires(lang)} className={navLinkClass("questionnaire")}>
            {dict.nav.questionnaire}
          </Link>
        </nav>

        <div className="justify-self-end flex items-center gap-1">
          {/* Language switcher */}
          <div role="group" aria-label={dict.nav.language} className="flex rounded-full border border-white/15 p-0.5">
            {LOCALES.map((l) => (
              <Link
                key={l}
                href={paths.home(l)}
                hrefLang={l}
                lang={l}
                aria-current={l === lang ? "true" : undefined}
                className={`px-2.5 py-1 rounded-full text-sm font-semibold transition-colors ${focusRing} ${
                  l === lang ? "bg-green-500 text-black" : "text-white/70 hover:text-white"
                }`}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? dict.nav.closeMenu : dict.nav.openMenu}
            className={`xl:hidden relative w-11 h-11 rounded-full text-white cursor-pointer hover:bg-white/10 transition-colors ${focusRing}`}
          >
            {/* Two lines that morph into a cross */}
            <span
              aria-hidden="true"
              className={`absolute left-1/2 top-1/2 h-[2px] w-5 -translate-x-1/2 rounded-full bg-current transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                isOpen ? "-translate-y-1/2 rotate-45" : "-translate-y-[4px]"
              }`}
            />
            <span
              aria-hidden="true"
              className={`absolute left-1/2 top-1/2 h-[2px] -translate-x-1/2 rounded-full bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none ${
                isOpen ? "w-5 -translate-y-1/2 -rotate-45" : "w-3.5 translate-x-[-3px] translate-y-[3px]"
              }`}
            />
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          id="mobile-menu"
          ref={menuRef}
          inert={!isOpen}
          className={`xl:hidden absolute top-full left-0 w-full h-[calc(100svh-4rem)] overflow-y-auto overscroll-contain bg-black duration-300 ease-out motion-reduce:transition-none ${
            // Visible at once on open (so focus can land), hidden only after the fade on close
            isOpen ? "opacity-100 visible transition-opacity" : "opacity-0 invisible transition-[opacity,visibility]"
          }`}
        >
          {/* Emerald glow and circuit grid, echoing the hero */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="absolute -top-32 -right-24 h-80 w-80 rounded-full bg-emerald-500/25 blur-3xl" />
            <div className="absolute bottom-0 -left-24 h-72 w-72 rounded-full bg-green-600/15 blur-3xl" />
            <div className="absolute inset-0 opacity-[0.07] [background-image:linear-gradient(rgba(52,211,153,1)_1px,transparent_1px),linear-gradient(90deg,rgba(52,211,153,1)_1px,transparent_1px)] [background-size:44px_44px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
          </div>

          <div className="relative flex min-h-full flex-col px-6 pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <nav aria-label={dict.nav.label}>
              <ul className="divide-y divide-white/10 border-y border-white/10">
                {NAV_IDS.map((id, i) => {
                  const active = activeSection === id;
                  return (
                    <li key={id} {...stagger(i)}>
                      <a
                        href={`#${id}`}
                        onClick={closeMenu}
                        aria-current={active ? "true" : undefined}
                        className={`group flex items-center justify-between py-4 font-heading text-2xl font-bold tracking-wide transition-colors ${focusRing} ${
                          active ? "text-emerald-400" : "text-white hover:text-emerald-300"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            aria-hidden="true"
                            className={`h-2 w-2 rounded-full transition-all duration-300 ${
                              active ? "bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" : "bg-white/15"
                            }`}
                          />
                          {dict.nav.items[id]}
                        </span>
                        <ArrowRightIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-white/30 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-emerald-300"
                        />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Questionnaire teaser */}
            <div {...stagger(NAV_IDS.length)}>
              <Link
                href={paths.questionnaires(lang)}
                onClick={closeMenu}
                className={`group mt-8 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3 pr-4 transition-colors hover:border-emerald-500/50 ${focusRing}`}
              >
                <span className="relative h-16 w-20 flex-none overflow-hidden rounded-xl">
                  <Image src="/images/code-editor.webp" alt="" fill sizes="80px" className="object-cover" />
                </span>
                <span className="flex-1">
                  <span className="block font-heading text-sm font-bold text-white">{dict.nav.questionnaire}</span>
                  <span className="block text-white/60">{dict.nav.questionnaireTeaser}</span>
                </span>
                <ArrowUpRightIcon aria-hidden="true" className="h-5 w-5 text-emerald-400 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="mt-auto pt-10">
            <div {...stagger(NAV_IDS.length + 1)}>
            <div className="flex flex-col gap-4">
              <a href="#contact" onClick={closeMenu} className={`${ctaClass} text-center`}>
                {dict.hero.cta}
              </a>
              <a
                href="mailto:contact@gdco.tech"
                className={`flex items-center justify-center gap-2 rounded-xl py-2 text-white/70 hover:text-white transition-colors ${focusRing}`}
              >
                <EnvelopeIcon aria-hidden="true" className="h-5 w-5 text-emerald-400" />
                <span className="sr-only">{dict.nav.writeUs}: </span>
                contact@gdco.tech
              </a>
            </div>
            </div>
            </div>
          </div>
        </div>
      </header>

      <main>
      {/* Hero Section */}
      <section
        id="accueil"
        className="relative min-h-svh flex items-center justify-center text-center text-white bg-black pt-24 pb-32"
      >
        <NeuralNetworkEffect />
        {/* Darkens the network behind the copy so it stays readable */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.85)_0%,rgba(0,0,0,0.55)_45%,transparent_75%)]"
        />
        <div className="relative z-10 px-6 max-w-4xl">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6 neon-text-green text-balance">
            {dict.hero.title}
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-white/85 max-w-2xl mx-auto text-pretty">
            <strong className="text-white">GD Consulting</strong> {dict.hero.lead}
          </p>
          <a href="#contact" className={ctaClass}>
            {dict.hero.cta}
          </a>
        </div>
        {/* Modern Scroll Indicator */}
        <a
          href="#expertise"
          aria-label={dict.hero.scroll}
          className={`absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 cursor-pointer rounded-full p-2 ${focusRing}`}
        >
          {/* Vertical neon line with moving dot */}
          <div className="w-[2px] h-16 bg-green-500/20 rounded-full relative overflow-hidden">
            <div className="w-full h-2 bg-green-500 rounded-full absolute top-0 animate-scrollDot"></div>
          </div>

          {/* Arrow */}
          <svg
            aria-hidden="true"
            className="w-6 h-6 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
          </svg>
        </a>
      </section>

      {/* Expertise Section */}
      <section id="expertise" className="bg-white text-gray-900 py-24 md:py-32 px-6 md:px-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-14 md:mb-16 text-balance">
          {dict.expertise.title}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto">
          {dict.expertise.items.map(({ title, text }, i) => (
            <article
              key={title}
              className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_12px_32px_-12px_rgba(0,0,0,0.18)]"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-black">
                <Image
                  src={EXPERTISE_IMAGES[i]}
                  alt={dict.images.expertise[i]}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-7">
                <h3 className="text-lg md:text-xl font-bold mb-3 text-balance">{title}</h3>
                <p className="text-lg text-gray-600 leading-relaxed">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* AI Section */}
      <section
        id="ai"
        className="relative min-h-svh flex items-center justify-center text-center text-white px-6 py-24 bg-black overflow-hidden"
      >
        <Image
          src="/images/server-rack-green.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-45"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black" />
        <NeuralNetworkEffect transparent />
        <div className="relative z-10 max-w-3xl glass-gradient p-8 md:p-12 rounded-3xl">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight neon-text-green mb-6 text-balance">
            {dict.ai.title}
          </h2>
          <p className="text-xl md:text-2xl mb-10 text-white/85 text-pretty">{dict.ai.text}</p>
          <a href="#contact" className={ctaClass}>
            {dict.ai.cta}
          </a>
        </div>
      </section>

      {/* Engineering Section */}
      <section
        id="engineering"
        className="bg-black text-white py-24 md:py-32 px-6 md:px-8 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-14 md:mb-16 text-center neon-text-green text-balance">
            {dict.engineering.title}
          </h2>
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="relative aspect-[4/3] lg:aspect-[4/5] overflow-hidden rounded-3xl border border-emerald-500/20">
              <Image
                src="/images/developers-lagos.webp"
                alt={dict.images.engineering}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-tr from-emerald-950/50 via-transparent to-transparent" />
            </div>
            <ul className="flex flex-col divide-y divide-white/10">
              {dict.engineering.items.map((item) => (
                <li key={item.title} className="py-8 first:pt-0 last:pb-0">
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold mb-3 text-balance">{item.title}</h3>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      {"text" in item && item.text ? (
                        item.text
                      ) : (
                        <>
                          {item.before}
                          <strong className="text-white">GD Consulting</strong>
                          {item.after}
                        </>
                      )}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative">
        <ElegantBlobs />
        <Contact lang={lang} dict={dict.contact} imageAlt={dict.images.contact} />
      </section>
      </main>

      {/* Styles */}
      <style jsx>{`
        .glass-gradient {
          background: linear-gradient(
            135deg,
            rgba(0, 255, 128, 0.1),
            rgba(0, 255, 128, 0.03)
          );
          backdrop-filter: blur(25px);
          border: 1px solid rgba(0, 255, 128, 0.2);
        }

        .neon-text-green {
          text-shadow: 0 0 6px rgba(0, 255, 128, 0.5),
            0 0 12px rgba(0, 255, 128, 0.3), 0 0 18px rgba(0, 255, 128, 0.2);
        }

        .animate-gradient-smooth {
          background-size: 200% 100%;
          animation: gradientSmooth 12s linear infinite;
        }

        @keyframes gradientSmooth {
          0% {
            transform: translateX(-25%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        @keyframes scrollDot {
          0% {
            top: 0%;
            opacity: 0;
          }
          25% {
            opacity: 1;
          }
          50% {
            top: 50%;
            opacity: 1;
          }
          75% {
            opacity: 1;
          }
          100% {
            top: 100%;
            opacity: 0;
          }
        }

        .animate-scrollDot {
          animation: scrollDot 1.8s infinite ease-in-out;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-gradient-smooth,
          .animate-scrollDot {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default Homepage;
