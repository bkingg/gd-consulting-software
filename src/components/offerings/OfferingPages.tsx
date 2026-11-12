import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import Reveal from "@/components/Reveal";
import { o, type Lang } from "@/lib/i18n";
import {
  COLLECTIONS,
  OFFERINGS,
  offeringHref,
  type Collection,
} from "@/lib/offerings";

const BASE_URL = "https://gdco.tech";

const ui = {
  challenges: o("Vos enjeux", "Your challenges"),
  approach: o("Notre approche", "Our approach"),
  approachIntro: o(
    "Une méthodologie éprouvée, articulée autour de leviers complémentaires pour sécuriser la création de valeur à chaque étape.",
    "A proven methodology built on complementary levers to secure value creation at every stage."
  ),
  outcomes: o("Bénéfices attendus", "Expected benefits"),
  related: o("Découvrir aussi", "Explore more"),
  ctaTitle: o("Construisons ensemble votre avantage compétitif", "Let’s build your competitive edge together"),
  ctaText: o(
    "Échangeons sur vos priorités stratégiques et identifions les leviers de création de valeur les plus pertinents pour votre organisation.",
    "Let’s discuss your strategic priorities and identify the most relevant value-creation levers for your organisation."
  ),
  cta: o("Parler à un expert", "Talk to an expert"),
  ctaHref: o("/contact", "/en/contact"),
  learnMore: o("En savoir plus", "Learn more"),
};

const alternates = (path: string) => ({
  canonical: `${BASE_URL}${path}`,
  languages: {
    fr: `${BASE_URL}${path.replace(/^\/en/, "") || "/"}`,
    en: `${BASE_URL}${path.startsWith("/en") ? path : `/en${path}`}`,
  },
});

/* ------------------------------- Metadata -------------------------------- */

export const offeringIndexMetadata = (collection: Collection, lang: Lang): Metadata => {
  const c = COLLECTIONS[collection];
  const path = offeringHref(collection, null, lang);
  return {
    title: `${c.label[lang]} | GD Consulting`,
    description: c.intro[lang],
    alternates: alternates(path),
    openGraph: { title: `${c.label[lang]} | GD Consulting`, description: c.intro[lang], url: `${BASE_URL}${path}`, siteName: "GD Consulting" },
  };
};

export const offeringDetailMetadata = (
  collection: Collection,
  slug: string,
  lang: Lang
): Metadata => {
  const item = OFFERINGS[collection].find((i) => i.slug === slug);
  if (!item) return {};
  const path = offeringHref(collection, slug, lang);
  return {
    title: `${item.title[lang]} | GD Consulting`,
    description: item.intro[lang],
    alternates: alternates(path),
    openGraph: { title: `${item.title[lang]} | GD Consulting`, description: item.tagline[lang], url: `${BASE_URL}${path}`, siteName: "GD Consulting" },
  };
};

export const offeringStaticParams = (collection: Collection) =>
  OFFERINGS[collection].map(({ slug }) => ({ slug }));

/* ------------------------------ Shared parts ----------------------------- */

const DarkHero = ({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) => (
  <section className="relative isolate overflow-hidden bg-black text-white pt-40 pb-28 px-6 md:px-8">
    <div className="pointer-events-none absolute inset-0 -z-10 hud-grid opacity-70" />
    <div className="pointer-events-none absolute -z-10 left-1/2 top-1/3 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-green-500/15 blur-[120px]" />
    <Reveal className="max-w-4xl mx-auto text-center">
      <p className="font-mono text-sm tracking-[0.18em] uppercase text-green-400/80 mb-5">
        {eyebrow}
      </p>
      <h1 className="text-4xl md:text-6xl font-semibold neon-text-green mb-6">{title}</h1>
      <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">{text}</p>
    </Reveal>
  </section>
);

const ClosingCta = ({ lang }: { lang: Lang }) => (
  <section className="relative isolate overflow-hidden bg-gradient-to-b from-white to-emerald-50 text-gray-900 py-28 px-8 text-center">
    <div className="pointer-events-none absolute inset-0 -z-10 hud-grid-light" />
    <Reveal>
      <h2 className="text-3xl md:text-5xl font-semibold mb-6">{ui.ctaTitle[lang]}</h2>
      <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10">{ui.ctaText[lang]}</p>
      <Link
        href={ui.ctaHref[lang]}
        className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300 inline-block"
      >
        {ui.cta[lang]}
      </Link>
    </Reveal>
  </section>
);

/* --------------------------------- Index --------------------------------- */

export const OfferingIndexPage = ({
  collection,
  lang,
}: {
  collection: Collection;
  lang: Lang;
}) => {
  const c = COLLECTIONS[collection];
  return (
    <>
      <DarkHero eyebrow={c.eyebrow[lang]} title={c.title[lang]} text={c.intro[lang]} />
      <section className="relative isolate overflow-hidden bg-white text-gray-900 py-28 px-6 md:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 hud-grid-light" />
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {OFFERINGS[collection].map((item, i) => (
            <Reveal key={item.slug} delay={i * 0.06} className="h-full">
              <Link
                href={offeringHref(collection, item.slug, lang)}
                className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-green-500/60 hover:shadow-xl hover:shadow-green-500/10"
              >
                <div className="flex items-center justify-between mb-6">
                  <item.icon className="w-10 h-10 text-green-600" />
                  <span className="font-mono text-xs tracking-widest text-gray-400">{item.code}</span>
                </div>
                <h2 className="text-xl font-bold mb-3">{item.title[lang]}</h2>
                <p className="text-gray-600 mb-6 flex-1">{item.tagline[lang]}</p>
                <span className="inline-flex items-center gap-2 font-semibold text-green-700">
                  {ui.learnMore[lang]}
                  <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <ClosingCta lang={lang} />
    </>
  );
};

/* -------------------------------- Detail --------------------------------- */

export const OfferingDetailPage = ({
  collection,
  slug,
  lang,
}: {
  collection: Collection;
  slug: string;
  lang: Lang;
}) => {
  const items = OFFERINGS[collection];
  const item = items.find((i) => i.slug === slug);
  if (!item) notFound();
  const related = items.filter((i) => i.slug !== slug).slice(0, 3);

  return (
    <>
      <DarkHero
        eyebrow={`${COLLECTIONS[collection].label[lang]} · ${item.code}`}
        title={item.tagline[lang]}
        text={item.intro[lang]}
      />

      {/* Challenges + approach (light) */}
      <section className="relative isolate overflow-hidden bg-white text-gray-900 py-28 px-6 md:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 hud-grid-light" />
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-8">{ui.challenges[lang]}</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-4 mb-24">
            {item.challenges.map((c, i) => (
              <Reveal key={c.en} delay={i * 0.06}>
                <div className="h-full rounded-xl border-l-4 border-green-500 bg-gray-50 p-6">
                  <span className="font-mono text-sm text-green-700">0{i + 1}</span>
                  <p className="mt-2 text-lg font-semibold">{c[lang]}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{ui.approach[lang]}</h2>
            <p className="text-lg text-gray-600 max-w-3xl mb-10">{ui.approachIntro[lang]}</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            {item.capabilities.map((cap, i) => (
              <Reveal key={cap.title.en} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-gray-200 p-8 transition-colors hover:border-green-500/60">
                  <h3 className="text-xl font-bold mb-2">{cap.title[lang]}</h3>
                  <p className="text-gray-600">{cap.text[lang]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Outcomes (dark) */}
      <section className="relative isolate overflow-hidden bg-black text-white py-28 px-6 md:px-8">
        <div className="pointer-events-none absolute inset-0 -z-10 hud-grid opacity-60" />
        <div className="max-w-6xl mx-auto">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-semibold neon-text-green mb-10">{ui.outcomes[lang]}</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {item.outcomes.map((out, i) => (
              <Reveal key={out.en} delay={i * 0.06}>
                <div className="hud-card flex items-start gap-4 rounded-xl p-6 h-full">
                  <CheckCircleIcon className="w-7 h-7 shrink-0 text-green-400" />
                  <p className="text-lg text-white/85">{out[lang]}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20">
            <h3 className="font-mono text-sm tracking-[0.18em] uppercase text-green-400/80 mb-6">
              {ui.related[lang]}
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={offeringHref(collection, r.slug, lang)}
                  className="hud-card group flex items-center gap-4 rounded-xl p-5"
                >
                  <r.icon className="w-8 h-8 text-green-400" />
                  <span className="font-semibold flex-1">{r.title[lang]}</span>
                  <ArrowRightIcon className="w-4 h-4 text-green-400 transition-transform group-hover:translate-x-1" />
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <ClosingCta lang={lang} />
    </>
  );
};
