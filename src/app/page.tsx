import { Metadata } from "next";
import Homepage from "@/components/Homepage";

// SEO metadata
export const metadata: Metadata = {
  title: "GD Consulting - Ingénierie logicielle & innovation",
  description:
    "GD Consulting conçoit et développe des logiciels complexes, du prototype à l'infrastructure cloud. Expertise en open source, scalabilité et solutions sur mesure.",
  keywords: [
    "GD Consulting",
    "Ingénierie Logicielle",
    "Cloud",
    "Open Source",
    "Développement sur mesure",
    "Innovation",
  ],
  openGraph: {
    title: "GD Consulting",
    description:
      "Solutions logicielles puissantes, scalables et innovantes pour entreprises ambitieuses.",
    url: "https://gdconsulting.tech",
    siteName: "GD Consulting",
  },
};

export default function HomePage() {
  return <Homepage />;
}
