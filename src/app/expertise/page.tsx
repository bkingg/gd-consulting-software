import { Metadata } from "next";
import { CpuChipIcon, CloudIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Notre expertise | GD Consulting",
  description:
    "Développement de logiciels sur mesure, architecture cloud scalable et intelligence artificielle : découvrez l'expertise de GD Consulting.",
  alternates: { canonical: "https://gdco.tech/expertise" },
  openGraph: {
    title: "Notre expertise | GD Consulting",
    description:
      "Développement de logiciels sur mesure, architecture cloud scalable et intelligence artificielle.",
    url: "https://gdco.tech/expertise",
    siteName: "GD Consulting",
  },
};

export default function ExpertisePage() {
  return (
    <section className="bg-white text-black py-40 px-8 min-h-screen">
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Notre expertise
        </h1>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center place-items-center">
        <Reveal delay={0.05} className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <CpuChipIcon className="w-12 h-12 mb-4 text-green-600" />
          <h3 className="text-2xl font-bold mb-4">Solutions sur-mesure</h3>
          <p>
            Développement de logiciels d’entreprise personnalisés, sécurisés
            et optimisés pour vos besoins spécifiques.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <CloudIcon className="w-12 h-12 mb-4 text-green-600" />
          <h3 className="text-2xl font-bold mb-4">Cloud & Scalabilité</h3>
          <p>
            Architecture cloud robuste et évolutive pour garantir performance
            et fiabilité à grande échelle.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <SparklesIcon className="w-12 h-12 mb-4 text-green-600" />
          <h3 className="text-2xl font-bold mb-4">Intelligence Artificielle</h3>
          <p>
            Exploitation de l’IA pour automatiser, optimiser et enrichir vos
            processus logiciels.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
