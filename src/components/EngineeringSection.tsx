import Link from "next/link";
import GlobeVisual from "@/components/effects/GlobeVisual";
import Reveal from "@/components/Reveal";
import { o, type Lang } from "@/lib/i18n";

const copy = {
  eyebrow: o("Génie logiciel", "Software engineering"),
  title: o(
    "Une rigueur d’ingénieur sur tout le cycle de vie",
    "Engineering rigour across the entire lifecycle"
  ),
  intro: o(
    "Exigences traçables, architectures éprouvées, services interopérables et qualité mesurée : nous appliquons les fondamentaux du génie logiciel pour livrer des systèmes qui tiennent la charge, restent sécurisés et évoluent avec votre activité.",
    "Traceable requirements, proven architectures, interoperable services and measured quality: we apply software engineering fundamentals to deliver systems that hold under load, stay secure and grow with your business."
  ),
  hud: o("Topologie des services", "Service topology"),
  cta: o("Découvrir notre ingénierie", "Explore our engineering"),
  ctaHref: o("/ingenierie", "/en/ingenierie"),
};

const capabilities = [
  {
    code: "ARCH",
    title: o("Architecture d’entreprise", "Enterprise architecture"),
    text: o(
      "Patrons de conception, DDD et architectures en couches ou microservices.",
      "Design patterns, DDD and layered or microservice architectures."
    ),
  },
  {
    code: "SOA",
    title: o("Services web & intégration", "Web services & integration"),
    text: o(
      "API REST, SOAP, événements et orchestration de services.",
      "REST and SOAP APIs, events and service orchestration."
    ),
  },
  {
    code: "QA",
    title: o("Vérification & validation", "Verification & validation"),
    text: o(
      "Tests automatisés, métriques qualité et intégration continue.",
      "Automated testing, quality metrics and continuous integration."
    ),
  },
  {
    code: "SEC",
    title: o("Sécurité by design", "Security by design"),
    text: o(
      "Modélisation des menaces, chiffrement et revues de code systématiques.",
      "Threat modelling, encryption and systematic code review."
    ),
  },
];

const pipeline = [
  o("Exigences", "Requirements"),
  o("Architecture", "Architecture"),
  o("Construction", "Build"),
  o("Vérification", "Verify"),
  o("Déploiement", "Deploy"),
  o("Exploitation", "Operate"),
];

const EngineeringSection = ({ lang }: { lang: Lang }) => (
  <section className="relative overflow-hidden bg-black text-white py-28 px-6 md:px-8">
    <div className="pointer-events-none absolute inset-0 hud-grid opacity-60" />
    <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <Reveal>
          <p className="font-mono text-sm tracking-[0.18em] uppercase text-green-400/80 mb-4">
            {copy.eyebrow[lang]}
          </p>
          <h2 className="text-3xl md:text-5xl font-semibold neon-text-green mb-6">
            {copy.title[lang]}
          </h2>
          <p className="text-lg md:text-xl text-white/70 mb-10 max-w-xl">
            {copy.intro[lang]}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-4">
          {capabilities.map((c, i) => (
            <Reveal key={c.code} delay={0.05 + i * 0.08}>
              <div className="hud-card group h-full rounded-xl p-5">
                <span className="font-mono text-xs tracking-widest text-cyan-300/80">
                  {c.code}
                </span>
                <h3 className="text-lg font-bold mt-2 mb-1 group-hover:text-green-300 transition-colors">
                  {c.title[lang]}
                </h3>
                <p className="text-white/60">{c.text[lang]}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <Reveal delay={0.1}>
        <div className="hud-frame relative aspect-square w-full max-w-[560px] mx-auto">
          <span className="hud-corner top-0 left-0 border-t border-l" />
          <span className="hud-corner top-0 right-0 border-t border-r" />
          <span className="hud-corner bottom-0 left-0 border-b border-l" />
          <span className="hud-corner bottom-0 right-0 border-b border-r" />
          <p className="absolute top-4 left-6 font-mono text-[11px] tracking-[0.16em] uppercase text-green-400/70 flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            {copy.hud[lang]}
          </p>
          <GlobeVisual className="absolute inset-0" />
        </div>
      </Reveal>
    </div>

    <Reveal delay={0.15} className="relative max-w-7xl mx-auto mt-20">
      <ol className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-green-500/15 rounded-xl overflow-hidden border border-green-500/15">
        {pipeline.map((step, i) => (
          <li key={step.en} className="bg-black/90 px-6 py-5 flex items-center gap-4">
            <span className="font-mono text-2xl text-green-400/90">
              {String(i + 1).padStart(2, "0")}
            </span>
            <span className="uppercase tracking-widest text-sm text-white/80">
              {step[lang]}
            </span>
          </li>
        ))}
      </ol>
      <div className="text-center mt-12">
        <Link
          href={copy.ctaHref[lang]}
          className="inline-block border border-green-500/60 text-green-300 px-8 py-3 rounded-xl font-bold hover:bg-green-500 hover:text-black transition-colors duration-300"
        >
          {copy.cta[lang]}
        </Link>
      </div>
    </Reveal>
  </section>
);

export default EngineeringSection;
