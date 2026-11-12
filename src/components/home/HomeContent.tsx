import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import HeroScene from "@/components/effects/HeroScene";
import EngineeringSection from "@/components/EngineeringSection";
import Reveal from "@/components/Reveal";
import { o, type Lang } from "@/lib/i18n";
import { OFFERINGS, offeringHref } from "@/lib/offerings";

const copy = {
  tag: o(
    "Génie logiciel · Services web · Cloud · IA",
    "Software engineering · Web services · Cloud · AI"
  ),
  title: o(
    "L’ingénierie logicielle d’entreprise, à l’échelle",
    "Enterprise software engineering, at scale"
  ),
  subtitle: o(
    "GD Consulting conçoit, développe et opère des applications web d’entreprise, des services web, des ERP et des plateformes e-commerce à fort trafic, de l’exigence métier à la mise en production, avec une rigueur d’ingénierie sans compromis.",
    "GD Consulting designs, builds and runs web-based enterprise applications, web services, ERP systems and high-traffic e-commerce platforms, from business requirements to production, with uncompromising engineering rigour."
  ),
  primary: o("Démarrer un projet", "Start a project"),
  secondary: o("Explorer nos services", "Explore our services"),
  servicesEyebrow: o("Nos services", "Our services"),
  servicesTitle: o(
    "Un partenaire unique pour l’ensemble de votre cycle de vie logiciel",
    "One partner across your entire software lifecycle"
  ),
  servicesIntro: o(
    "De la conception à l’exploitation, nous mobilisons des expertises complémentaires pour transformer vos enjeux métier en logiciels robustes, scalables et créateurs de valeur.",
    "From design to operations, we bring complementary expertise together to turn your business challenges into robust, scalable, value-generating software."
  ),
  learnMore: o("En savoir plus", "Learn more"),
  allServices: o("Voir les 11 services", "See all 11 services"),
  ctaTitle: o("Prêt à accélérer votre feuille de route ?", "Ready to accelerate your roadmap?"),
  ctaText: o(
    "Parlons de vos objectifs stratégiques et identifions ensemble les leviers d’ingénierie qui maximiseront votre retour sur investissement.",
    "Let’s discuss your strategic objectives and identify together the engineering levers that will maximise your return on investment."
  ),
  cta: o("Parler à un expert", "Talk to an expert"),
};

const FEATURED = [
  "applications-web",
  "services-web-api",
  "erp",
  "ecommerce",
  "architecture-logicielle",
  "intelligence-artificielle",
];

const HomeContent = ({ lang }: { lang: Lang }) => {
  const prefix = lang === "en" ? "/en" : "";
  const featured = FEATURED.map((slug) => OFFERINGS.solutions.find((s) => s.slug === slug)!);

  return (
    <>
      {/* Hero (dark) */}
      <section className="relative min-h-[100svh] pt-32 pb-24 overflow-hidden flex items-center justify-center text-center text-white bg-black">
        <HeroScene />
        <div className="relative z-10 px-6 max-w-5xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-black/40 px-4 py-1.5 mb-8 font-mono text-[11px] md:text-xs uppercase tracking-[0.16em] text-green-300/90 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            {copy.tag[lang]}
          </p>
          <h1 className="text-4xl md:text-7xl font-semibold mb-6 neon-text-green">
            {copy.title[lang]}
          </h1>
          <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto mb-10">
            {copy.subtitle[lang]}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={`${prefix}/contact`}
              className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-green-500/20 hover:scale-105 transition-transform duration-300"
            >
              {copy.primary[lang]}
            </Link>
            <Link
              href={`${prefix}/solutions`}
              className="border border-white/20 bg-white/5 backdrop-blur text-white px-8 py-4 rounded-xl font-bold hover:border-green-400/60 hover:bg-green-500/10 transition-colors duration-300"
            >
              {copy.secondary[lang]}
            </Link>
          </div>
        </div>
        {/* Scroll indicator */}
        <a
          href="#services"
          aria-label={copy.secondary[lang]}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center"
        >
          <div className="w-[2px] h-16 bg-green-500/20 rounded-full relative overflow-hidden">
            <div className="w-full h-2 bg-green-500 rounded-full absolute top-0 animate-scrollDot" />
          </div>
        </a>
      </section>

      {/* Services (light) */}
      <section
        id="services"
        className="relative isolate overflow-hidden bg-white text-gray-900 py-28 px-6 md:px-8 scroll-mt-20"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 hud-grid-light" />
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center max-w-3xl mx-auto mb-16">
            <p className="font-mono text-sm tracking-[0.18em] uppercase text-green-700 mb-4">
              {copy.servicesEyebrow[lang]}
            </p>
            <h2 className="text-3xl md:text-5xl font-bold mb-6">{copy.servicesTitle[lang]}</h2>
            <p className="text-lg text-gray-600">{copy.servicesIntro[lang]}</p>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.05} className="h-full">
                <Link
                  href={offeringHref("solutions", item.slug, lang)}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-500/60 hover:shadow-xl hover:shadow-green-500/10"
                >
                  <div className="flex items-center justify-between mb-6">
                    <item.icon className="w-10 h-10 text-green-600" />
                    <span className="font-mono text-xs tracking-widest text-gray-400">
                      {item.code}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-3">{item.title[lang]}</h3>
                  <p className="text-gray-600 mb-6 flex-1">{item.tagline[lang]}</p>
                  <span className="inline-flex items-center gap-2 font-semibold text-green-700">
                    {copy.learnMore[lang]}
                    <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
          <Reveal className="text-center mt-14">
            <Link
              href={`${prefix}/solutions`}
              className="inline-block border border-green-600 text-green-700 px-8 py-3 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-colors duration-300"
            >
              {copy.allServices[lang]}
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Engineering (dark) */}
      <EngineeringSection lang={lang} />

      {/* Closing CTA (light) */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-white to-emerald-50 text-gray-900 py-28 px-8 text-center">
        <div className="pointer-events-none absolute inset-0 -z-10 hud-grid-light" />
        <Reveal>
          <h2 className="text-3xl md:text-5xl font-semibold mb-6">{copy.ctaTitle[lang]}</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            {copy.ctaText[lang]}
          </p>
          <Link
            href={`${prefix}/contact`}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300 inline-block"
          >
            {copy.cta[lang]}
          </Link>
        </Reveal>
      </section>
    </>
  );
};

export default HomeContent;
