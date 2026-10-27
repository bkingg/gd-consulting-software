import { Metadata } from "next";
import { notFound } from "next/navigation";
import Questionnaire from "@/components/Questionnaire";
import {
  LOCALES,
  Locale,
  OG_LOCALES,
  QUESTIONNAIRE_KINDS,
  QUESTIONNAIRE_SLUGS,
  alternatesFor,
  kindFromSlug,
  paths,
} from "@/lib/i18n";

type Props = { params: Promise<{ lang: Locale; slug: string }> };

const META = {
  website: {
    fr: {
      title: "Questionnaire projet site web | GD Consulting",
      description:
        "Décrivez votre projet de site web en 10 minutes : activité, objectifs, contenu et fonctionnalités. GD Consulting revient vers vous sous 48 h.",
    },
    en: {
      title: "Website project questionnaire | GD Consulting",
      description:
        "Describe your website project in 10 minutes: business, goals, content and features. GD Consulting gets back to you within 2 business days.",
    },
  },
  software: {
    fr: {
      title: "Questionnaire projet logiciel | GD Consulting",
      description:
        "Décrivez votre projet logiciel en 15 minutes : besoin, utilisateurs, contexte technique et calendrier. GD Consulting revient vers vous sous 48 h.",
    },
    en: {
      title: "Software project questionnaire | GD Consulting",
      description:
        "Describe your software project in 15 minutes: needs, users, technical context and timeline. GD Consulting gets back to you within 2 business days.",
    },
  },
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((lang) =>
    QUESTIONNAIRE_KINDS.map((kind) => ({ lang, slug: QUESTIONNAIRE_SLUGS[kind][lang] }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const kind = kindFromSlug(lang, slug);
  if (!kind) return {};
  const { title, description } = META[kind][lang];
  return {
    title,
    description,
    alternates: alternatesFor(lang, (l) => paths.questionnaire(l, kind)),
    openGraph: { title, description, url: paths.questionnaire(lang, kind), locale: OG_LOCALES[lang], type: "website" },
    // Form pages stay out of search results; the picker page is indexed instead
    robots: { index: false, follow: true },
  };
}

export default async function QuestionnairePage({ params }: Props) {
  const { lang, slug } = await params;
  const kind = kindFromSlug(lang, slug);
  if (!kind) notFound();
  return <Questionnaire lang={lang} kind={kind} />;
}
