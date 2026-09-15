import { Metadata } from "next";
import Link from "next/link";
import NeuralNetworkBackground from "@/components/effects/NeuralNetworkBackground";

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
  alternates: { canonical: "https://gdco.tech" },
  openGraph: {
    title: "GD Consulting",
    description:
      "Solutions logicielles puissantes, scalables et innovantes pour entreprises ambitieuses.",
    url: "https://gdco.tech",
    siteName: "GD Consulting",
  },
};

export default function HomePage() {
  return (
    <section className="relative h-screen pt-20 flex items-center justify-center text-center text-white bg-black">
      <NeuralNetworkBackground />
      <div className="relative z-10 px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold glass-gradient mb-6 neon-text-green">
          Logiciels d’entreprise fiables et évolutifs
        </h1>
        <p className="text-xl md:text-2xl mb-8 glass-gradient">
          <strong>GD Consulting</strong> conçoit et déploie des solutions
          logicielles complexes, sécurisées et scalables sur le cloud.
        </p>
        <a
          href="mailto:contact@gdco.tech"
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Parlez à nos experts
        </a>
      </div>
      {/* Modern Scroll Indicator */}
      <Link
        href="/expertise"
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center space-y-2 cursor-pointer"
      >
        <div className="w-[2px] h-16 bg-green-500/20 rounded-full relative overflow-hidden">
          <div className="w-full h-2 bg-green-500 rounded-full absolute top-0 animate-scrollDot"></div>
        </div>
        <svg
          className="w-6 h-6 text-green-500 animate-bounce"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          ></path>
        </svg>
      </Link>
    </section>
  );
}
