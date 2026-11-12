import type { ComponentType, SVGProps } from "react";
import {
  BanknotesIcon,
  BuildingLibraryIcon,
  CogIcon,
  HeartIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/outline";
import { o, type Lang, type T } from "@/lib/i18n";
import { SOLUTIONS } from "@/lib/solutions";

export type Offering = {
  slug: string;
  /** Optional grouping used by the mega menu. */
  group?: T;
  code: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: T;
  tagline: T;
  intro: T;
  challenges: T[];
  capabilities: { title: T; text: T }[];
  outcomes: T[];
};

export type Collection = "solutions" | "secteurs";

export const COLLECTIONS: Record<
  Collection,
  { label: T; eyebrow: T; title: T; intro: T }
> = {
  solutions: {
    label: o("Services", "Services"),
    eyebrow: o("Ingénierie logicielle", "Software engineering"),
    title: o(
      "L’ingénierie logicielle de bout en bout, des exigences à l’exploitation",
      "End-to-end software engineering, from requirements to operations"
    ),
    intro: o(
      "Un portefeuille intégré de capacités d’ingénierie couvrant l’ensemble du cycle de vie logiciel : exigences, architecture, applications web d’entreprise, services web, données, qualité et exploitation, au service d’une création de valeur durable et mesurable.",
      "An integrated portfolio of engineering capabilities spanning the entire software lifecycle: requirements, architecture, web-based enterprise applications, web services, data, quality and operations, driving sustainable, measurable value creation."
    ),
  },
  secteurs: {
    label: o("Secteurs", "Industries"),
    eyebrow: o("Expertise sectorielle", "Industry expertise"),
    title: o(
      "Une expertise métier au service de vos enjeux sectoriels",
      "Domain expertise tailored to your industry imperatives"
    ),
    intro: o(
      "Chaque secteur a ses contraintes réglementaires, ses cycles et ses leviers de croissance. Nous adaptons nos frameworks d’exécution à la réalité opérationnelle de votre marché.",
      "Every industry has its own regulatory constraints, cycles and growth levers. We tailor our delivery frameworks to the operational reality of your market."
    ),
  },
};

export const SECTEURS: Offering[] = [
  {
    slug: "finance",
    code: "FIN",
    icon: BanknotesIcon,
    title: o("Banque & finance", "Banking & finance"),
    tagline: o(
      "Accélérer l’innovation financière dans un cadre maîtrisé",
      "Accelerating financial innovation within a controlled framework"
    ),
    intro: o(
      "Nous aidons les acteurs financiers à moderniser leurs systèmes cœur, à exploiter la donnée et à lancer de nouveaux services, tout en répondant aux exigences de résilience et de conformité du secteur.",
      "We help financial players modernise core systems, leverage data and launch new services while meeting the sector’s resilience and compliance requirements."
    ),
    challenges: [
      o("Résilience opérationnelle (DORA)", "Operational resilience (DORA)"),
      o("Modernisation des systèmes cœur", "Core system modernisation"),
      o("Lutte contre la fraude et gestion des risques", "Fraud prevention and risk management"),
    ],
    capabilities: [
      { title: o("Open banking & API", "Open banking & APIs"), text: o("Exposition sécurisée de services et intégration avec l’écosystème.", "Secure service exposure and ecosystem integration.") },
      { title: o("Scoring & détection", "Scoring & detection"), text: o("Modèles de risque et de détection d’anomalies gouvernés.", "Governed risk and anomaly-detection models.") },
      { title: o("Reporting réglementaire", "Regulatory reporting"), text: o("Chaînes de données traçables et auditables.", "Traceable, auditable data chains.") },
      { title: o("Plateformes transactionnelles", "Transaction platforms"), text: o("Architectures haute disponibilité à faible latence.", "Low-latency, high-availability architectures.") },
    ],
    outcomes: [
      o("Conformité intégrée by design", "Compliance built in by design"),
      o("Lancement accéléré de nouveaux produits", "Faster launch of new products"),
      o("Réduction du risque opérationnel", "Reduced operational risk"),
      o("Expérience client digitale de premier plan", "Best-in-class digital customer experience"),
    ],
  },
  {
    slug: "sante",
    code: "HLTH",
    icon: HeartIcon,
    title: o("Santé & sciences de la vie", "Healthcare & life sciences"),
    tagline: o(
      "Des solutions numériques au service du parcours de soin",
      "Digital solutions that empower the care journey"
    ),
    intro: o(
      "Nous concevons des solutions sécurisées et interopérables pour les établissements de santé, les medtechs et les laboratoires, au service des patients et des professionnels.",
      "We design secure, interoperable solutions for healthcare providers, medtechs and laboratories, serving patients and professionals alike."
    ),
    challenges: [
      o("Protection des données de santé", "Protecting health data"),
      o("Interopérabilité des systèmes", "Systems interoperability"),
      o("Adoption par les professionnels de santé", "Adoption by healthcare professionals"),
    ],
    capabilities: [
      { title: o("Interopérabilité", "Interoperability"), text: o("Échanges standardisés et intégration aux SI hospitaliers.", "Standardised exchange and hospital IS integration.") },
      { title: o("Hébergement sécurisé", "Secure hosting"), text: o("Architectures adaptées aux exigences d’hébergement de données de santé.", "Architectures suited to health-data hosting requirements.") },
      { title: o("IA d’aide à la décision", "Decision-support AI"), text: o("Outils d’analyse au service des équipes cliniques et de recherche.", "Analytics tools for clinical and research teams.") },
      { title: o("Parcours patient digital", "Digital patient journey"), text: o("Applications patient et praticien centrées sur l’usage.", "Usage-centred patient and practitioner apps.") },
    ],
    outcomes: [
      o("Continuité et qualité du parcours de soin", "Continuity and quality of care"),
      o("Données sécurisées et conformes", "Secure, compliant data"),
      o("Temps médical libéré", "More time for clinical work"),
      o("Recherche accélérée par la donnée", "Data-accelerated research"),
    ],
  },
  {
    slug: "industrie",
    code: "IND",
    icon: CogIcon,
    title: o("Industrie & énergie", "Industry & energy"),
    tagline: o(
      "Connecter l’usine, les actifs et la donnée",
      "Connecting plants, assets and data"
    ),
    intro: o(
      "Nous accompagnons les industriels et énergéticiens dans la convergence IT/OT, la maintenance prédictive et l’optimisation de leurs opérations grâce à la donnée temps réel.",
      "We support manufacturers and energy players with IT/OT convergence, predictive maintenance and operations optimisation powered by real-time data."
    ),
    challenges: [
      o("Convergence IT/OT", "IT/OT convergence"),
      o("Disponibilité des actifs critiques", "Critical asset availability"),
      o("Décarbonation et efficacité énergétique", "Decarbonisation and energy efficiency"),
    ],
    capabilities: [
      { title: o("IoT industriel", "Industrial IoT"), text: o("Collecte et traitement de données capteurs à grande échelle.", "Sensor data collection and processing at scale.") },
      { title: o("Maintenance prédictive", "Predictive maintenance"), text: o("Modèles d’anticipation des défaillances et d’optimisation des interventions.", "Failure-anticipation models and intervention optimisation.") },
      { title: o("Jumeaux numériques", "Digital twins"), text: o("Représentation et simulation de vos actifs et processus.", "Modelling and simulation of your assets and processes.") },
      { title: o("Pilotage énergétique", "Energy management"), text: o("Suivi et optimisation de la performance énergétique.", "Monitoring and optimising energy performance.") },
    ],
    outcomes: [
      o("Disponibilité des équipements améliorée", "Improved equipment availability"),
      o("Opérations pilotées par la donnée", "Data-driven operations"),
      o("Empreinte énergétique optimisée", "Optimised energy footprint"),
      o("Chaîne de valeur industrielle connectée", "A connected industrial value chain"),
    ],
  },
  {
    slug: "retail",
    code: "RTL",
    icon: ShoppingBagIcon,
    title: o("Retail & e-commerce", "Retail & e-commerce"),
    tagline: o(
      "Une expérience omnicanale, personnalisée et performante",
      "A personalised, high-performance omnichannel experience"
    ),
    intro: o(
      "Nous aidons les enseignes à unifier leurs canaux, personnaliser l’expérience client et optimiser leur supply chain grâce à des plateformes composables et pilotées par la donnée.",
      "We help retailers unify channels, personalise customer experience and optimise supply chains with composable, data-driven platforms."
    ),
    challenges: [
      o("Unification des canaux de vente", "Unifying sales channels"),
      o("Personnalisation à grande échelle", "Personalisation at scale"),
      o("Pics de charge et performance", "Traffic peaks and performance"),
    ],
    capabilities: [
      { title: o("Commerce composable", "Composable commerce"), text: o("Architectures headless et MACH, évolutives par brique.", "Headless, MACH architectures that evolve component by component.") },
      { title: o("Personnalisation", "Personalisation"), text: o("Recommandations et segmentation alimentées par l’IA.", "AI-powered recommendations and segmentation.") },
      { title: o("Supply chain", "Supply chain"), text: o("Prévision de la demande et visibilité des stocks.", "Demand forecasting and inventory visibility.") },
      { title: o("Performance web", "Web performance"), text: o("Plateformes conçues pour absorber les pics de trafic.", "Platforms engineered to absorb traffic spikes.") },
    ],
    outcomes: [
      o("Parcours client unifié", "A unified customer journey"),
      o("Conversion et fidélisation renforcées", "Stronger conversion and loyalty"),
      o("Stocks et logistique optimisés", "Optimised inventory and logistics"),
      o("Agilité commerciale accrue", "Greater commercial agility"),
    ],
  },
  {
    slug: "secteur-public",
    code: "GOV",
    icon: BuildingLibraryIcon,
    title: o("Secteur public", "Public sector"),
    tagline: o(
      "Moderniser le service public, en toute souveraineté",
      "Modernising public services, with full sovereignty"
    ),
    intro: o(
      "Nous accompagnons administrations et collectivités dans la modernisation de leurs services numériques, avec une attention particulière à l’accessibilité, la sécurité et la souveraineté des données.",
      "We support government bodies and local authorities in modernising their digital services, with particular focus on accessibility, security and data sovereignty."
    ),
    challenges: [
      o("Souveraineté et sécurité des données", "Data sovereignty and security"),
      o("Accessibilité et inclusion numérique", "Accessibility and digital inclusion"),
      o("Modernisation de systèmes historiques", "Modernising legacy systems"),
    ],
    capabilities: [
      { title: o("Services en ligne", "Online services"), text: o("Démarches dématérialisées simples, accessibles et sécurisées.", "Simple, accessible, secure digital procedures.") },
      { title: o("Cloud souverain", "Sovereign cloud"), text: o("Architectures conformes aux exigences de souveraineté.", "Architectures aligned with sovereignty requirements.") },
      { title: o("Open source", "Open source"), text: o("Solutions ouvertes, mutualisables et pérennes.", "Open, shareable and sustainable solutions.") },
      { title: o("Données publiques", "Public data"), text: o("Ouverture, valorisation et gouvernance des données.", "Opening, leveraging and governing data.") },
    ],
    outcomes: [
      o("Service public plus accessible", "More accessible public services"),
      o("Maîtrise des données et des dépendances", "Control over data and dependencies"),
      o("Coûts de possession maîtrisés", "Controlled cost of ownership"),
      o("Agents et usagers mieux équipés", "Better-equipped staff and citizens"),
    ],
  },
];

export const OFFERINGS: Record<Collection, Offering[]> = {
  solutions: SOLUTIONS,
  secteurs: SECTEURS,
};

export const offeringHref = (collection: Collection, slug: string | null, lang: Lang) =>
  `${lang === "en" ? "/en" : ""}/${collection}${slug ? `/${slug}` : ""}`;

