import { Metadata } from "next";
import { CpuChipIcon, CloudIcon, SparklesIcon } from "@heroicons/react/24/outline";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "Our expertise | GD Consulting",
  description:
    "Custom software development, scalable cloud architecture and artificial intelligence: discover GD Consulting's expertise.",
  alternates: {
    canonical: "https://gdco.tech/en/expertise",
    languages: {
      fr: "https://gdco.tech/expertise",
      en: "https://gdco.tech/en/expertise",
    },
  },
  openGraph: {
    title: "Our expertise | GD Consulting",
    description:
      "Custom software development, scalable cloud architecture and artificial intelligence.",
    url: "https://gdco.tech/en/expertise",
    siteName: "GD Consulting",
    locale: "en_US",
  },
};

export default function ExpertisePageEn() {
  return (
    <section className="bg-white text-black py-40 px-8 min-h-screen">
      <Reveal>
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">
          Our expertise
        </h1>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center place-items-center">
        <Reveal delay={0.05} className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <CpuChipIcon className="w-12 h-12 mb-4 text-green-600" />
          <h3 className="text-2xl font-bold mb-4">Custom solutions</h3>
          <p>
            Development of personalized, secure and optimized enterprise
            software tailored to your specific needs.
          </p>
        </Reveal>
        <Reveal delay={0.15} className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <CloudIcon className="w-12 h-12 mb-4 text-green-600" />
          <h3 className="text-2xl font-bold mb-4">Cloud & Scalability</h3>
          <p>
            Robust, evolving cloud architecture that guarantees performance
            and reliability at scale.
          </p>
        </Reveal>
        <Reveal delay={0.25} className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center">
          <SparklesIcon className="w-12 h-12 mb-4 text-green-600" />
          <h3 className="text-2xl font-bold mb-4">Artificial Intelligence</h3>
          <p>
            Leveraging AI to automate, optimize and enrich your software
            processes.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
