import { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Ingénierie logicielle | GD Consulting",
  description:
    "Technologie, sécurité et innovation : découvrez l'approche d'ingénierie logicielle de GD Consulting, pensée pour durer et scalable pour vos projets les plus ambitieux.",
  alternates: { canonical: "https://gdco.tech/ingenierie" },
  openGraph: {
    title: "Ingénierie logicielle | GD Consulting",
    description:
      "Une approche d'ingénierie logicielle rigoureuse, sécurisée et pensée pour durer.",
    url: "https://gdco.tech/ingenierie",
    siteName: "GD Consulting",
  },
};

export default function IngeniariePage() {
  return (
    <>
      <section
        className="relative flex items-center justify-center text-center text-white px-6 py-32 bg-black overflow-hidden"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(0,255,128,0.12), transparent 60%), radial-gradient(circle at 70% 70%, rgba(0,255,128,0.08), transparent 55%)",
        }}
      >
        <Reveal className="relative z-10 max-w-3xl glass-gradient p-8 rounded-3xl">
          <h1 className="text-5xl md:text-6xl font-extrabold neon-text-green mb-6">
            Technologie, sécurité et innovation
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Nos solutions sont conçues pour les entreprises qui exigent
            fiabilité, haute performance et sécurité. Nous maîtrisons le cloud,
            les architectures scalables et l’IA pour fournir des logiciels à la
            hauteur des projets les plus ambitieux.
          </p>
          <a
            href="mailto:contact@gdco.tech"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300 mb-8"
          >
            Discutons de votre projet
          </a>
        </Reveal>
      </section>

      <section className="bg-black text-white py-32 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-12 text-center neon-text-green">
              L’excellence en ingénierie logicielle
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0.05} className="glass-gradient p-8 rounded-3xl border border-emerald-500/20 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                Architecture pensée pour durer
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Chez <strong>GD Consulting</strong>, chaque ligne de code est
                écrite avec rigueur et intention.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="glass-gradient p-8 rounded-3xl border border-green-400/20 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                Une ingénierie, pas du bricolage
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Contrairement aux approches improvisées, nous appliquons une
                méthodologie d’ingénierie logicielle à chaque étape.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="glass-gradient p-8 rounded-3xl border border-green-500/20 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                La force du savoir-faire local
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Nos ingénieurs conçoivent des solutions au niveau mondial, avec
                une compréhension locale des besoins.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
