import { ogImages } from "@/lib/i18n";
import { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact | GD Consulting",
  description:
    "Confiez votre projet logiciel à GD Consulting. Contactez-nous pour discuter de solutions robustes, sécurisées et évolutives adaptées à votre entreprise.",
  alternates: {
    canonical: "https://gdco.tech/contact",
    languages: {
      fr: "https://gdco.tech/contact",
      en: "https://gdco.tech/en/contact",
    },
  },
  openGraph: {
    images: ogImages("fr"),
    title: "Contact | GD Consulting",
    description:
      "Contactez GD Consulting pour discuter de votre projet logiciel.",
    url: "https://gdco.tech/contact",
    siteName: "GD Consulting",
    locale: "fr_FR",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <Contact lang="fr" />
    </div>
  );
}
