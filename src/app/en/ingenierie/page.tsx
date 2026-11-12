import { Metadata } from "next";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Software Engineering | GD Consulting",
  description:
    "Technology, security and innovation: discover GD Consulting's software engineering approach, built to last and to scale for your most ambitious projects.",
  alternates: {
    canonical: "https://gdco.tech/en/ingenierie",
    languages: {
      fr: "https://gdco.tech/ingenierie",
      en: "https://gdco.tech/en/ingenierie",
    },
  },
  openGraph: {
    title: "Software Engineering | GD Consulting",
    description:
      "A rigorous, secure software engineering approach, built to last.",
    url: "https://gdco.tech/en/ingenierie",
    siteName: "GD Consulting",
    locale: "en_US",
  },
};

export default function IngeniariePageEn() {
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
          <h1 className="text-5xl md:text-6xl font-semibold neon-text-green mb-6">
            Technology, security and innovation
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Our solutions are built for companies that demand reliability,
            high performance and security. We master the cloud, scalable
            architectures and AI to deliver software worthy of the most
            ambitious projects.
          </p>
          <a
            href="mailto:contact@gdco.tech"
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300 mb-8"
          >
            Let's discuss your project
          </a>
        </Reveal>
      </section>

      <section className="bg-black text-white py-32 px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <Reveal>
            <h2 className="text-4xl md:text-5xl font-semibold mb-12 text-center neon-text-green">
              Software engineering excellence
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-8">
            <Reveal delay={0.05} className="glass-gradient p-8 rounded-3xl border border-emerald-500/20 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                Architecture built to last
              </h3>
              <p className="text-gray-300 leading-relaxed">
                At <strong>GD Consulting</strong>, every line of code is
                written with rigor and intention.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="glass-gradient p-8 rounded-3xl border border-green-400/20 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                Engineering, not tinkering
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Unlike improvised approaches, we apply a software engineering
                methodology at every step.
              </p>
            </Reveal>
            <Reveal delay={0.25} className="glass-gradient p-8 rounded-3xl border border-green-500/20 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">
                The strength of local expertise
              </h3>
              <p className="text-gray-300 leading-relaxed">
                Our engineers design world-class solutions with a local
                understanding of your needs.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
