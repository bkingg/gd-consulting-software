import { Metadata } from "next";
import Homepage from "@/components/Homepage";
import { getDictionary } from "@/lib/dictionaries";
import { Locale, OG_LOCALES, SITE_URL, alternatesFor, otherLocale, paths } from "@/lib/i18n";

type Props = { params: Promise<{ lang: Locale }> };

// SEO metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const { meta } = getDictionary(lang);
  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    alternates: alternatesFor(lang, paths.home),
    openGraph: {
      title: "GD Consulting",
      description: meta.ogDescription,
      url: paths.home(lang),
      siteName: "GD Consulting",
      locale: OG_LOCALES[lang],
      alternateLocale: OG_LOCALES[otherLocale(lang)],
      type: "website",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.ogDescription },
  };
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const dict = getDictionary(lang);

  // Structured data so search engines understand who GD Consulting is
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "GD Consulting",
    url: `${SITE_URL}${paths.home(lang)}`,
    logo: `${SITE_URL}/gd-consulting-logo.png`,
    email: "contact@gdco.tech",
    description: dict.meta.description,
    inLanguage: lang,
    knowsAbout: dict.meta.keywords.slice(1),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Homepage lang={lang} dict={dict} />
    </>
  );
}
