import "./globals.css";
import { Orbitron, Rajdhani } from "next/font/google";
import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-orbitron",
});
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://gdco.tech"),
  title: "GD Consulting | Ingénierie Logicielle & Conseil",
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
        className={`${orbitron.variable} ${rajdhani.variable} bg-gray-50 text-gray-800`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
