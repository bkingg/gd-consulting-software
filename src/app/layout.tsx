import "./globals.css";
import { Orbitron, Rajdhani } from "next/font/google";

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

export const metadata = {
  title: "GD Consulting | Ingénierie Logicielle & Conseil",
  description:
    "Solutions logicielles sur mesure — Conseil, Ingénierie et Développement.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-gray-50 text-gray-800">{children}</body>
    </html>
  );
}
