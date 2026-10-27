import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, CodeBracketSquareIcon, GlobeAltIcon } from "@heroicons/react/24/outline";
import { LOCALES, Locale, OG_LOCALES, QUESTIONNAIRE_KINDS, alternatesFor, paths } from "@/lib/i18n";
import { PICKER, UI } from "@/lib/questionnaire";

type Props = { params: Promise<{ lang: Locale }> };

const META = {
  fr: {
    title: "Questionnaires projet : site web ou logiciel | GD Consulting",
    description:
      "Décrivez votre projet de site web ou de logiciel sur mesure en quelques minutes. GD Consulting revient vers vous sous 48 h avec une proposition adaptée.",
  },
  en: {
    title: "Project questionnaires: website or software | GD Consulting",
    description:
      "Describe your website or custom software project in a few minutes. GD Consulting gets back to you within 2 business days with a tailored proposal.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { title, description } = META[lang];
  return {
    title,
    description,
    alternates: alternatesFor(lang, paths.questionnaires),
    openGraph: { title, description, url: paths.questionnaires(lang), locale: OG_LOCALES[lang], type: "website" },
  };
}

const ICONS = { website: GlobeAltIcon, software: CodeBracketSquareIcon };
const IMAGES = { website: "/images/team-laptops.webp", software: "/images/code-editor.webp" };

export default async function QuestionnairePicker({ params }: Props) {
  const { lang } = await params;
  const t = (x: Record<Locale, string>) => x[lang];

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/70 backdrop-blur-lg">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
          <Link href={paths.home(lang)} className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
              <Image src="/gd-consulting-logo.png" alt="" width={30} height={19} />
            </span>
            <span className="font-heading hidden text-lg font-bold tracking-wide sm:inline">GD Consulting</span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href={paths.home(lang)} className="text-sm text-white/70 hover:text-white">{t(UI.back)}</Link>
            <div className="flex overflow-hidden rounded-full border border-white/15" role="group" aria-label="Langue / Language">
              {LOCALES.map((l) => (
                <Link key={l} href={paths.questionnaires(l)} hrefLang={l} lang={l} aria-current={lang === l ? "true" : undefined}
                  className={`px-3 py-1.5 text-sm font-semibold ${lang === l ? "bg-green-500 text-black" : "text-white/70 hover:text-white"}`}>
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 pb-24 pt-16 md:px-8 md:pt-24">
        <h1 className="mb-5 max-w-3xl text-4xl font-extrabold text-balance md:text-6xl">{t(PICKER.title)}</h1>
        <p className="mb-12 max-w-2xl text-lg text-white/70 md:text-xl">{t(PICKER.text)}</p>

        <div className="grid gap-6 md:grid-cols-2">
          {QUESTIONNAIRE_KINDS.map((kind) => {
            const k = PICKER.kinds[kind];
            const Icon = ICONS[kind];
            return (
              <Link
                key={kind}
                href={paths.questionnaire(lang, kind)}
                className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-green-500/60 hover:bg-green-500/[0.06] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-400"
              >
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src={IMAGES[kind]}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover opacity-80 transition duration-700 ease-out group-hover:scale-105 group-hover:opacity-100 motion-reduce:transition-none"
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                  <Icon aria-hidden="true" className="absolute bottom-5 left-8 h-9 w-9 text-green-400" />
                </div>
                <div className="flex flex-1 flex-col p-8 pt-6">
                <h2 className="mb-3 text-2xl font-bold">{t(k.title)}</h2>
                <p className="mb-8 flex-1 text-lg text-white/70">{t(k.text)}</p>
                <span className="flex items-center justify-between text-sm">
                  <span className="text-white/50">≈ {k.minutes} {t(PICKER.duration)}</span>
                  <span className="flex items-center gap-2 font-semibold text-green-400">
                    {t(PICKER.start)}
                    <ArrowRightIcon aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </span>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
