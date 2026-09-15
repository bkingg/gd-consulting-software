import { Metadata } from "next";
import Link from "next/link";
import { CpuChipIcon, CloudIcon, SparklesIcon } from "@heroicons/react/24/outline";
import NeuralNetworkBackground from "@/components/effects/NeuralNetworkBackground";
import Reveal from "@/components/Reveal";

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
  alternates: {
    canonical: "https://gdco.tech",
    languages: {
      fr: "https://gdco.tech",
      en: "https://gdco.tech/en",
    },
  },
  openGraph: {
    title: "GD Consulting",
    description:
      "Solutions logicielles puissantes, scalables et innovantes pour entreprises ambitieuses.",
    url: "https://gdco.tech",
    siteName: "GD Consulting",
    locale: "fr_FR",
  },
};

export default function HomePage() {
  return (
    <>
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

    {/* Services Teaser */}
    <section className="bg-white text-black py-32 px-8">
      <Reveal>
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Une expertise complète, une équipe engagée
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center place-items-center">
        <Reveal delay={0.05} className="w-full">
          <Link
            href="/expertise"
            className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center h-full hover:-translate-y-1 transition-transform duration-300"
          >
            <CpuChipIcon className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">Solutions sur-mesure</h3>
            <p>
              Développement de logiciels d’entreprise personnalisés,
              sécurisés et optimisés pour vos besoins spécifiques.
            </p>
          </Link>
        </Reveal>
        <Reveal delay={0.15} className="w-full">
          <Link
            href="/expertise"
            className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center h-full hover:-translate-y-1 transition-transform duration-300"
          >
            <CloudIcon className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">Cloud & Scalabilité</h3>
            <p>
              Architecture cloud robuste et évolutive pour garantir
              performance et fiabilité à grande échelle.
            </p>
          </Link>
        </Reveal>
        <Reveal delay={0.25} className="w-full">
          <Link
            href="/expertise"
            className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center h-full hover:-translate-y-1 transition-transform duration-300"
          >
            <SparklesIcon className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">Intelligence Artificielle</h3>
            <p>
              Exploitation de l’IA pour automatiser, optimiser et enrichir vos
              processus logiciels.
            </p>
          </Link>
        </Reveal>
      </div>
      <Reveal delay={0.3} className="text-center mt-16">
        <Link
          href="/expertise"
          className="inline-block border border-green-600 text-green-700 px-8 py-3 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-colors duration-300"
        >
          Voir toute notre expertise
        </Link>
      </Reveal>
    </section>

    {/* Closing CTA Band */}
    <section className="bg-black text-white py-28 px-8 text-center">
      <Reveal>
        <h2 className="text-3xl md:text-5xl font-extrabold neon-text-green mb-6">
          Prêt à lancer votre projet ?
        </h2>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Parlons de vos objectifs et voyons comment GD Consulting peut vous
          accompagner, de la conception à la mise en production.
        </p>
        <Link
          href="/contact"
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300 inline-block"
        >
          Contactez-nous
        </Link>
      </Reveal>
    </section>
    </>
  );
}
