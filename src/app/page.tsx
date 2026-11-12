import { ogImages } from "@/lib/i18n";
import { Metadata } from "next";
import HomeContent from "@/components/home/HomeContent";

export const metadata: Metadata = {
  title: "GD Consulting - Ingénierie logicielle d’entreprise",
  description:
    "GD Consulting conçoit, développe et opère des applications web d’entreprise, services web, ERP et plateformes e-commerce à grande échelle, de l’exigence métier à la mise en production.",
  keywords: [
    "GD Consulting",
    "Ingénierie Logicielle",
    "Cloud",
    "Services web",
    "ERP",
    "E-commerce",
    "Développement sur mesure",
    "Innovation",
  ],
  alternates: {
    canonical: "https://gdco.tech",
    languages: {
      fr: "https://gdco.tech",
      en: "https://gdco.tech/en",
    },
  },
  openGraph: {
    images: ogImages("fr"),
    title: "GD Consulting",
    description:
      "Solutions logicielles puissantes, scalables et innovantes pour entreprises ambitieuses.",
    url: "https://gdco.tech",
    siteName: "GD Consulting",
    locale: "fr_FR",
  },
};

export default function HomePage() {
  return <HomeContent lang="fr" />;
}
