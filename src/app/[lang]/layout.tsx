import "../globals.css";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Orbitron, Rajdhani } from "next/font/google";
import { LOCALES, SITE_URL, isLocale } from "@/lib/i18n";

const orbitron = Orbitron({
  subsets: ["latin"],
  weight: ["500", "700", "800"],
  variable: "--font-orbitron",
});
const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-rajdhani",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "GD Consulting",
};

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <html lang={lang} className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className="bg-gray-50 text-gray-800">{children}</body>
    </html>
  );
}
