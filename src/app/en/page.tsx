import { Metadata } from "next";
import Link from "next/link";
import { CpuChipIcon, CloudIcon, SparklesIcon } from "@heroicons/react/24/outline";
import NeuralNetworkBackground from "@/components/effects/NeuralNetworkBackground";
import Reveal from "@/components/Reveal";

export const metadata: Metadata = {
  title: "GD Consulting - Software Engineering & Innovation",
  description:
    "GD Consulting designs and builds complex software, from prototype to cloud infrastructure. Expertise in open source, scalability and custom solutions.",
  keywords: [
    "GD Consulting",
    "Software Engineering",
    "Cloud",
    "Open Source",
    "Custom Development",
    "Innovation",
  ],
  alternates: {
    canonical: "https://gdco.tech/en",
    languages: {
      fr: "https://gdco.tech",
      en: "https://gdco.tech/en",
    },
  },
  openGraph: {
    title: "GD Consulting",
    description:
      "Powerful, scalable and innovative software solutions for ambitious companies.",
    url: "https://gdco.tech/en",
    siteName: "GD Consulting",
    locale: "en_US",
  },
};

export default function HomePageEn() {
  return (
    <>
    <section className="relative h-screen pt-20 flex items-center justify-center text-center text-white bg-black">
      <NeuralNetworkBackground />
      <div className="relative z-10 px-6 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-extrabold glass-gradient mb-6 neon-text-green">
          Reliable, scalable enterprise software
        </h1>
        <p className="text-xl md:text-2xl mb-8 glass-gradient">
          <strong>GD Consulting</strong> designs and deploys complex, secure
          and scalable software solutions in the cloud.
        </p>
        <a
          href="mailto:contact@gdco.tech"
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300"
        >
          Talk to our experts
        </a>
      </div>
      {/* Modern Scroll Indicator */}
      <Link
        href="/en/expertise"
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
          Full-stack expertise, a committed team
        </h2>
      </Reveal>
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto text-center place-items-center">
        <Reveal delay={0.05} className="w-full">
          <Link
            href="/en/expertise"
            className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center h-full hover:-translate-y-1 transition-transform duration-300"
          >
            <CpuChipIcon className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">Custom solutions</h3>
            <p>
              Development of personalized, secure and optimized enterprise
              software tailored to your specific needs.
            </p>
          </Link>
        </Reveal>
        <Reveal delay={0.15} className="w-full">
          <Link
            href="/en/expertise"
            className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center h-full hover:-translate-y-1 transition-transform duration-300"
          >
            <CloudIcon className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">Cloud & Scalability</h3>
            <p>
              Robust, evolving cloud architecture that guarantees performance
              and reliability at scale.
            </p>
          </Link>
        </Reveal>
        <Reveal delay={0.25} className="w-full">
          <Link
            href="/en/expertise"
            className="glass-card p-8 rounded-2xl shadow-xl flex flex-col items-center h-full hover:-translate-y-1 transition-transform duration-300"
          >
            <SparklesIcon className="w-12 h-12 mb-4 text-green-600" />
            <h3 className="text-2xl font-bold mb-4">Artificial Intelligence</h3>
            <p>
              Leveraging AI to automate, optimize and enrich your software
              processes.
            </p>
          </Link>
        </Reveal>
      </div>
      <Reveal delay={0.3} className="text-center mt-16">
        <Link
          href="/en/expertise"
          className="inline-block border border-green-600 text-green-700 px-8 py-3 rounded-xl font-bold hover:bg-green-600 hover:text-white transition-colors duration-300"
        >
          See all our expertise
        </Link>
      </Reveal>
    </section>

    {/* Closing CTA Band */}
    <section className="bg-black text-white py-28 px-8 text-center">
      <Reveal>
        <h2 className="text-3xl md:text-5xl font-extrabold neon-text-green mb-6">
          Ready to start your project?
        </h2>
        <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto mb-10">
          Let's talk about your goals and see how GD Consulting can support
          you, from design to production.
        </p>
        <Link
          href="/en/contact"
          className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform duration-300 inline-block"
        >
          Contact us
        </Link>
      </Reveal>
    </section>
    </>
  );
}
