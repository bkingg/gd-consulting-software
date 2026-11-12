import { ogImages } from "@/lib/i18n";
import "./globals.css";
import { Inter, JetBrains_Mono } from "next/font/google";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import HtmlLangSync from "@/components/HtmlLangSync";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gdco.tech"),
  title: "GD Consulting | Ingénierie Logicielle & Conseil",
  openGraph: { images: ogImages("fr"), siteName: "GD Consulting" },
  description:
    "Solutions logicielles sur mesure — Conseil, Ingénierie et Développement.",
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "GD Consulting",
  url: "https://gdco.tech",
  email: "contact@gdco.tech",
  description:
    "GD Consulting conçoit et développe des logiciels d'entreprise complexes, sécurisés et scalables sur le cloud.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${inter.variable} ${mono.variable} antialiased bg-gray-50 text-gray-800`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <HtmlLangSync />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
