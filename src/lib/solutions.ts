import {
  BeakerIcon,
  BuildingOffice2Icon,
  CircleStackIcon,
  CloudIcon,
  CubeTransparentIcon,
  GlobeAltIcon,
  LinkIcon,
  PencilSquareIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import { o } from "@/lib/i18n";
import type { Offering } from "@/lib/offerings";

// Service lines distilled from a software engineering curriculum
// (Web Services & Applications option), grouped by lifecycle stage.
const DESIGN = o("Conception", "Design");
const BUILD = o("Construction", "Build");
const RUN = o("Qualité & exploitation", "Quality & operations");

export const SOLUTIONS: Offering[] = [
  /* -------------------------------- Design -------------------------------- */
  {
    slug: "exigences-ux",
    group: DESIGN,
    code: "REQ",
    icon: PencilSquareIcon,
    title: o("Exigences & expérience utilisateur", "Requirements & user experience"),
    tagline: o(
      "Aligner vision métier, exigences et expérience utilisateur dès le premier jour",
      "Aligning business vision, requirements and user experience from day one"
    ),
    intro: o(
      "Nous transformons vos ambitions stratégiques en exigences traçables, priorisées et vérifiables, et en interfaces conçues autour de vos utilisateurs, pour sécuriser la valeur avant la première ligne de code.",
      "We translate your strategic ambitions into traceable, prioritised and verifiable requirements, and into interfaces designed around your users, de-risking value before the first line of code."
    ),
    challenges: [
      o("Des besoins flous ou contradictoires entre parties prenantes", "Unclear or conflicting needs across stakeholders"),
      o("Des projets qui dérivent en coût et en périmètre", "Projects drifting in cost and scope"),
      o("Des outils peu adoptés par les équipes terrain", "Tools with poor adoption by front-line teams"),
    ],
    capabilities: [
      { title: o("Ingénierie des exigences", "Requirements engineering"), text: o("Élicitation, cas d’utilisation, user stories, critères d’acceptation et matrice de traçabilité.", "Elicitation, use cases, user stories, acceptance criteria and traceability matrix.") },
      { title: o("Modélisation métier", "Business modelling"), text: o("Modèles de domaine, processus BPMN et diagrammes UML partagés avec le métier.", "Domain models, BPMN processes and UML diagrams shared with the business.") },
      { title: o("Design d’interface & UX", "UI & UX design"), text: o("Recherche utilisateur, prototypes interactifs, tests d’utilisabilité et accessibilité.", "User research, interactive prototypes, usability testing and accessibility.") },
      { title: o("Cadrage & estimation", "Scoping & estimation"), text: o("Découpage, estimation, planification et pilotage du risque projet.", "Work breakdown, estimation, planning and project risk management.") },
    ],
    outcomes: [
      o("Un périmètre clair, partagé et contractualisable", "A clear, shared, contract-ready scope"),
      o("Réduction des retouches et des dérives budgétaires", "Less rework and fewer budget overruns"),
      o("Adoption utilisateur maximisée", "Maximised user adoption"),
      o("Décisions d’investissement objectivées", "Evidence-based investment decisions"),
    ],
  },
  {
    slug: "architecture-logicielle",
    group: DESIGN,
    code: "ARCH",
    icon: CubeTransparentIcon,
    title: o("Architecture & conception logicielle", "Software architecture & design"),
    tagline: o(
      "Des architectures pensées pour évoluer, durer et passer à l’échelle",
      "Architectures built to evolve, endure and scale"
    ),
    intro: o(
      "Nous concevons des architectures logicielles robustes et modulaires, fondées sur les patrons de conception éprouvés et la conception pilotée par le domaine, afin de maîtriser la complexité et la dette technique sur le long terme.",
      "We design robust, modular software architectures grounded in proven design patterns and domain-driven design, keeping complexity and technical debt under control over the long term."
    ),
    challenges: [
      o("Un monolithe devenu difficile à faire évoluer", "A monolith that has become hard to evolve"),
      o("Une dette technique qui ralentit chaque livraison", "Technical debt slowing every release"),
      o("Des choix technologiques difficiles à arbitrer", "Technology choices that are hard to arbitrate"),
    ],
    capabilities: [
      { title: o("Architecture d’entreprise", "Enterprise architecture"), text: o("Styles en couches, hexagonal, microservices et événementiel, choisis selon vos attributs de qualité.", "Layered, hexagonal, microservice and event-driven styles chosen against your quality attributes.") },
      { title: o("Patrons de conception & DDD", "Design patterns & DDD"), text: o("Modèles de domaine riches, contextes bornés et principes SOLID appliqués.", "Rich domain models, bounded contexts and applied SOLID principles.") },
      { title: o("Revue & refactoring", "Review & refactoring"), text: o("Audit d’architecture, ADR et plan de refactoring incrémental piloté par le risque.", "Architecture audits, ADRs and a risk-driven incremental refactoring plan.") },
      { title: o("Méthodes rigoureuses", "Rigorous methods"), text: o("Spécifications formelles et modélisation pour les composants critiques.", "Formal specification and modelling for critical components.") },
    ],
    outcomes: [
      o("Un système modulaire et maintenable", "A modular, maintainable system"),
      o("Une vélocité de livraison durable", "Sustained delivery velocity"),
      o("Des décisions d’architecture documentées et traçables", "Documented, traceable architecture decisions"),
      o("Une base saine pour la croissance", "A healthy foundation for growth"),
    ],
  },

  /* -------------------------------- Build --------------------------------- */
  {
    slug: "applications-web",
    group: BUILD,
    code: "WEB",
    icon: GlobeAltIcon,
    title: o("Applications web d’entreprise", "Web-based enterprise applications"),
    tagline: o(
      "Des applications web critiques, performantes et sécurisées",
      "Mission-critical, high-performance, secure web applications"
    ),
    intro: o(
      "Nous concevons et développons des applications web d’entreprise de bout en bout, en appliquant les patrons d’architecture d’applications d’entreprise : logique de domaine, accès aux données, gestion de la concurrence et de l’état de session.",
      "We design and build end-to-end web-based enterprise applications, applying enterprise application architecture patterns: domain logic, data source access, concurrency control and session state management."
    ),
    challenges: [
      o("Des processus métier complexes à numériser", "Complex business processes to digitise"),
      o("Des performances qui se dégradent avec la charge", "Performance degrading under load"),
      o("Des applications vieillissantes à moderniser", "Ageing applications to modernise"),
    ],
    capabilities: [
      { title: o("Développement full-stack", "Full-stack development"), text: o("Front-ends modernes et back-ends robustes, typés et testés.", "Modern front-ends and robust, typed, tested back-ends.") },
      { title: o("Patrons d’applications d’entreprise", "Enterprise application patterns"), text: o("Couches, Domain Model, Data Mapper, Unit of Work et verrouillage optimiste.", "Layering, Domain Model, Data Mapper, Unit of Work and optimistic locking.") },
      { title: o("Portails & back-offices", "Portals & back-offices"), text: o("Espaces clients, outils internes, workflows et tableaux de bord métier.", "Customer portals, internal tools, workflows and business dashboards.") },
      { title: o("Modernisation applicative", "Application modernisation"), text: o("Migration progressive des applications legacy, sans rupture de service.", "Progressive migration of legacy applications with zero downtime.") },
    ],
    outcomes: [
      o("Processus métier fluidifiés de bout en bout", "End-to-end streamlined business processes"),
      o("Temps de réponse maîtrisés sous charge", "Controlled response times under load"),
      o("Une base de code saine et évolutive", "A healthy, evolvable codebase"),
      o("Un time-to-market accéléré", "Faster time-to-market"),
    ],
  },
  {
    slug: "services-web-api",
    group: BUILD,
    code: "SOA",
    icon: LinkIcon,
    title: o("Services web & API", "Web services & APIs"),
    tagline: o(
      "Un système d’information interopérable, orienté services",
      "An interoperable, service-oriented information system"
    ),
    intro: o(
      "Nous concevons des architectures orientées services et des API qui décloisonnent vos applications, exposent vos capacités métier et orchestrent vos flux à l’échelle de l’écosystème.",
      "We design service-oriented architectures and APIs that break down application silos, expose your business capabilities and orchestrate flows across your ecosystem."
    ),
    challenges: [
      o("Des applications en silos qui ne communiquent pas", "Siloed applications that don’t talk to each other"),
      o("Des intégrations point à point fragiles", "Fragile point-to-point integrations"),
      o("Une exposition sécurisée de services aux partenaires", "Securely exposing services to partners"),
    ],
    capabilities: [
      { title: o("API REST & GraphQL", "REST & GraphQL APIs"), text: o("Conception contract-first, versionnement, documentation OpenAPI.", "Contract-first design, versioning and OpenAPI documentation.") },
      { title: o("SOA & microservices", "SOA & microservices"), text: o("Découpage en services, composition, orchestration et chorégraphie.", "Service decomposition, composition, orchestration and choreography.") },
      { title: o("Intégration & messagerie", "Integration & messaging"), text: o("Bus d’événements, files de messages et intégration SOAP/WSDL des systèmes existants.", "Event buses, message queues and SOAP/WSDL integration with existing systems.") },
      { title: o("API management", "API management"), text: o("Passerelles d’API, authentification, quotas et observabilité.", "API gateways, authentication, rate limiting and observability.") },
    ],
    outcomes: [
      o("Un SI interopérable et composable", "An interoperable, composable IT landscape"),
      o("Intégrations fiables et réutilisables", "Reliable, reusable integrations"),
      o("Ouverture maîtrisée à l’écosystème partenaire", "Controlled opening to your partner ecosystem"),
      o("Nouveaux services lancés plus vite", "New services launched faster"),
    ],
  },
  {
    slug: "erp",
    group: BUILD,
    code: "ERP",
    icon: BuildingOffice2Icon,
    title: o("Logiciels ERP", "ERP software"),
    tagline: o(
      "Un ERP aligné sur vos processus, pas l’inverse",
      "An ERP that fits your processes, not the other way around"
    ),
    intro: o(
      "Nous concevons, personnalisons et intégrons des solutions ERP qui unifient finance, achats, stocks, production, ventes et ressources humaines dans un référentiel unique, au service d’un pilotage de l’entreprise en temps réel.",
      "We design, customise and integrate ERP solutions that unify finance, procurement, inventory, production, sales and HR in a single source of truth, enabling real-time enterprise steering."
    ),
    challenges: [
      o("Des données dispersées entre tableurs et outils isolés", "Data scattered across spreadsheets and isolated tools"),
      o("Un ERP standard mal adapté à vos spécificités", "An off-the-shelf ERP that doesn’t fit your specifics"),
      o("Des intégrations complexes avec l’existant", "Complex integrations with existing systems"),
    ],
    capabilities: [
      { title: o("ERP sur mesure & modules métier", "Custom ERP & business modules"), text: o("Comptabilité, achats, stocks, production, CRM et RH conçus autour de vos flux.", "Accounting, procurement, inventory, production, CRM and HR designed around your flows.") },
      { title: o("Personnalisation d’ERP du marché", "Off-the-shelf ERP customisation"), text: o("Paramétrage, extensions et développements spécifiques maîtrisés.", "Configuration, extensions and controlled custom development.") },
      { title: o("Intégration & migration de données", "Integration & data migration"), text: o("Connecteurs vers e-commerce, banque, logistique et reprise des données historiques.", "Connectors to e-commerce, banking, logistics and legacy data migration.") },
      { title: o("Reporting & pilotage", "Reporting & steering"), text: o("Tableaux de bord financiers et opérationnels en temps réel.", "Real-time financial and operational dashboards.") },
    ],
    outcomes: [
      o("Une source unique de vérité pour toute l’entreprise", "A single source of truth across the enterprise"),
      o("Processus automatisés et sans double saisie", "Automated processes with no double entry"),
      o("Visibilité en temps réel sur l’activité", "Real-time visibility into operations"),
      o("Une plateforme qui évolue avec votre croissance", "A platform that grows with your business"),
    ],
  },
  {
    slug: "ecommerce",
    group: BUILD,
    code: "COM",
    icon: ShoppingCartIcon,
    title: o("E-commerce à grande échelle", "High-scale e-commerce"),
    tagline: o(
      "Des plateformes e-commerce taillées pour les pics de trafic",
      "E-commerce platforms engineered for peak traffic"
    ),
    intro: o(
      "Nous concevons des plateformes e-commerce hautement scalables et composables, capables d’absorber les pics de charge, de servir un catalogue massif et de traiter les commandes de manière fiable, de la vitrine à la logistique.",
      "We build highly scalable, composable e-commerce platforms that absorb traffic spikes, serve massive catalogues and process orders reliably, from storefront to fulfilment."
    ),
    challenges: [
      o("Des pannes ou ralentissements lors des pics de vente", "Outages or slowdowns during sales peaks"),
      o("Un catalogue et des stocks difficiles à synchroniser", "Catalogue and inventory that are hard to keep in sync"),
      o("Une plateforme monolithique qui freine l’innovation", "A monolithic platform holding back innovation"),
    ],
    capabilities: [
      { title: o("Commerce headless & composable", "Headless & composable commerce"), text: o("Vitrines ultra-rapides découplées des services panier, catalogue et commande.", "Ultra-fast storefronts decoupled from cart, catalogue and order services.") },
      { title: o("Scalabilité & performance", "Scalability & performance"), text: o("Mise à l’échelle horizontale, CDN, cache multi-niveaux et tests de charge.", "Horizontal scaling, CDN, multi-tier caching and load testing.") },
      { title: o("Commandes & stocks événementiels", "Event-driven orders & inventory"), text: o("Traitement asynchrone, idempotence et cohérence des stocks en temps réel.", "Asynchronous processing, idempotency and real-time inventory consistency.") },
      { title: o("Paiement, recherche & intégrations", "Payments, search & integrations"), text: o("Passerelles de paiement, moteur de recherche, ERP et transporteurs.", "Payment gateways, search engine, ERP and carrier integrations.") },
    ],
    outcomes: [
      o("Disponibilité maintenue pendant les pics de vente", "Availability maintained through sales peaks"),
      o("Pages rapides et taux de conversion optimisé", "Fast pages and optimised conversion"),
      o("Stocks et commandes toujours synchronisés", "Inventory and orders always in sync"),
      o("Liberté d’innover sur chaque brique", "Freedom to innovate on every component"),
    ],
  },
  {
    slug: "data",
    group: BUILD,
    code: "DATA",
    icon: CircleStackIcon,
    title: o("Données & bases de données", "Data & databases"),
    tagline: o(
      "Faites de la donnée un actif fiable, performant et exploitable",
      "Turn data into a reliable, high-performance, actionable asset"
    ),
    intro: o(
      "Nous modélisons, optimisons et opérons vos systèmes de données, du schéma relationnel normalisé aux plateformes analytiques, pour garantir intégrité, performance et valorisation de votre capital informationnel.",
      "We model, optimise and operate your data systems, from normalised relational schemas to analytics platforms, ensuring integrity, performance and value from your information capital."
    ),
    challenges: [
      o("Des requêtes lentes qui pénalisent les applications", "Slow queries hurting your applications"),
      o("Des données incohérentes ou dupliquées", "Inconsistent or duplicated data"),
      o("Des volumes en forte croissance", "Rapidly growing data volumes"),
    ],
    capabilities: [
      { title: o("Modélisation de données", "Data modelling"), text: o("Modèles entité-association, normalisation et schémas pensés pour l’usage.", "Entity-relationship models, normalisation and usage-driven schemas.") },
      { title: o("Optimisation & performance", "Optimisation & performance"), text: o("Indexation, plans d’exécution, partitionnement et réplication.", "Indexing, query plans, partitioning and replication.") },
      { title: o("SQL & NoSQL", "SQL & NoSQL"), text: o("Choix du bon moteur selon les besoins de cohérence et de volumétrie.", "The right engine for your consistency and volume requirements.") },
      { title: o("Pipelines & analytique", "Pipelines & analytics"), text: o("Ingestion, entrepôts de données et tableaux de bord décisionnels.", "Ingestion, data warehouses and decision dashboards.") },
    ],
    outcomes: [
      o("Intégrité et cohérence garanties", "Guaranteed integrity and consistency"),
      o("Applications plus rapides", "Faster applications"),
      o("Décisions fondées sur des données fiables", "Decisions based on reliable data"),
      o("Un socle prêt pour l’IA", "A foundation ready for AI"),
    ],
  },

  /* ------------------------- Quality & operations ------------------------- */
  {
    slug: "qualite-tests",
    group: RUN,
    code: "QA",
    icon: BeakerIcon,
    title: o("Tests & qualité logicielle", "Software testing & quality"),
    tagline: o(
      "Livrer plus vite, avec une confiance mesurable",
      "Ship faster, with measurable confidence"
    ),
    intro: o(
      "Nous industrialisons la vérification et la validation de vos logiciels grâce à des stratégies de test automatisées et des indicateurs qualité objectivés, intégrés à chaque étape du cycle de livraison.",
      "We industrialise software verification and validation through automated testing strategies and objective quality metrics, built into every stage of the delivery cycle."
    ),
    challenges: [
      o("Des régressions découvertes en production", "Regressions discovered in production"),
      o("Des campagnes de test manuelles longues et coûteuses", "Long, costly manual test campaigns"),
      o("Une qualité difficile à mesurer et à piloter", "Quality that is hard to measure and steer"),
    ],
    capabilities: [
      { title: o("Stratégie de test", "Test strategy"), text: o("Pyramide de tests : unitaires, intégration, système et acceptation.", "Test pyramid: unit, integration, system and acceptance testing.") },
      { title: o("Automatisation", "Automation"), text: o("TDD, tests de bout en bout et intégration continue.", "TDD, end-to-end tests and continuous integration.") },
      { title: o("Tests de performance", "Performance testing"), text: o("Tests de charge, d’endurance et de montée en charge.", "Load, soak and scalability testing.") },
      { title: o("Métriques & contrôle qualité", "Metrics & quality control"), text: o("Couverture, complexité, densité de défauts et revues de code.", "Coverage, complexity, defect density and code review.") },
    ],
    outcomes: [
      o("Moins d’incidents en production", "Fewer production incidents"),
      o("Des mises en production sereines et fréquentes", "Frequent, low-stress releases"),
      o("Une qualité pilotée par les indicateurs", "Metrics-driven quality"),
      o("Coût de maintenance réduit", "Lower maintenance costs"),
    ],
  },
  {
    slug: "cloud-devops",
    group: RUN,
    code: "OPS",
    icon: CloudIcon,
    title: o("Cloud, réseaux & DevOps", "Cloud, networking & DevOps"),
    tagline: o(
      "Une plateforme résiliente, automatisée et pilotée par le code",
      "A resilient, automated, code-driven platform"
    ),
    intro: o(
      "Nous concevons et automatisons l’infrastructure, les réseaux et les chaînes de livraison de vos applications, pour des déploiements fréquents, fiables et observables sur le cloud.",
      "We design and automate the infrastructure, networking and delivery pipelines behind your applications, for frequent, reliable and observable cloud deployments."
    ),
    challenges: [
      o("Des déploiements manuels, lents et risqués", "Slow, manual, risky deployments"),
      o("Une disponibilité et une continuité à garantir", "Availability and continuity to guarantee"),
      o("Une facture cloud difficile à maîtriser", "A cloud bill that is hard to control"),
    ],
    capabilities: [
      { title: o("CI/CD", "CI/CD"), text: o("Pipelines de build, test et déploiement continus et sécurisés.", "Secure continuous build, test and deployment pipelines.") },
      { title: o("Conteneurs & orchestration", "Containers & orchestration"), text: o("Docker, Kubernetes et plateformes en libre-service pour vos équipes.", "Docker, Kubernetes and self-service platforms for your teams.") },
      { title: o("Infrastructure as Code & réseaux", "Infrastructure as Code & networking"), text: o("Environnements reproductibles, réseaux segmentés et équilibrage de charge.", "Reproducible environments, segmented networks and load balancing.") },
      { title: o("Observabilité & FinOps", "Observability & FinOps"), text: o("Logs, métriques, traces, alerting et optimisation des coûts.", "Logs, metrics, traces, alerting and cost optimisation.") },
    ],
    outcomes: [
      o("Déploiements fréquents et sans stress", "Frequent, stress-free deployments"),
      o("Haute disponibilité et reprise rapide", "High availability and fast recovery"),
      o("Coûts d’infrastructure optimisés", "Optimised infrastructure costs"),
      o("Visibilité complète sur la production", "Full visibility into production"),
    ],
  },
  {
    slug: "securite",
    group: RUN,
    code: "SEC",
    icon: ShieldCheckIcon,
    title: o("Sécurité applicative", "Application security"),
    tagline: o(
      "La sécurité intégrée dès la conception, à chaque couche",
      "Security by design, at every layer"
    ),
    intro: o(
      "Nous intégrons la sécurité des systèmes d’information au cœur du cycle de vie logiciel afin de réduire durablement votre surface d’attaque, sans freiner la vélocité de vos équipes.",
      "We embed information-systems security at the heart of the software lifecycle to durably reduce your attack surface without slowing your teams down."
    ),
    challenges: [
      o("Des vulnérabilités découvertes trop tard", "Vulnerabilities discovered too late"),
      o("Des exigences de conformité croissantes", "Growing compliance requirements"),
      o("Des données sensibles à protéger", "Sensitive data to protect"),
    ],
    capabilities: [
      { title: o("Modélisation des menaces", "Threat modelling"), text: o("Analyse de risque dès la conception et contre-mesures priorisées.", "Risk analysis from design and prioritised countermeasures.") },
      { title: o("Authentification & autorisation", "Authentication & authorisation"), text: o("Gestion des identités, SSO, contrôle d’accès et moindre privilège.", "Identity management, SSO, access control and least privilege.") },
      { title: o("Cryptographie & protection des données", "Cryptography & data protection"), text: o("Chiffrement en transit et au repos, gestion des secrets.", "Encryption in transit and at rest, secrets management.") },
      { title: o("DevSecOps & audit", "DevSecOps & audit"), text: o("Analyse de code et de dépendances, revue OWASP et remédiation.", "Code and dependency scanning, OWASP review and remediation.") },
    ],
    outcomes: [
      o("Surface d’attaque réduite et maîtrisée", "A reduced, controlled attack surface"),
      o("Conformité démontrable", "Demonstrable compliance"),
      o("Données clients protégées", "Protected customer data"),
      o("Confiance renforcée des parties prenantes", "Stronger stakeholder trust"),
    ],
  },
  {
    slug: "intelligence-artificielle",
    group: RUN,
    code: "AI",
    icon: SparklesIcon,
    title: o("IA appliquée", "Applied AI"),
    tagline: o(
      "Intégrer l’IA au cœur de vos produits logiciels",
      "Embedding AI at the core of your software products"
    ),
    intro: o(
      "Nous intégrons l’intelligence artificielle dans vos applications avec la même rigueur d’ingénierie que le reste de votre logiciel : cas d’usage priorisés par la valeur, intégration native, tests et gouvernance.",
      "We embed artificial intelligence into your applications with the same engineering rigour as the rest of your software: value-prioritised use cases, native integration, testing and governance."
    ),
    challenges: [
      o("Passer du prototype à la production", "Moving from prototype to production"),
      o("Fiabiliser des résultats non déterministes", "Making non-deterministic outputs reliable"),
      o("Maîtriser coûts et confidentialité", "Controlling cost and confidentiality"),
    ],
    capabilities: [
      { title: o("Assistants & IA générative", "Copilots & generative AI"), text: o("Assistants métiers, RAG sur vos documents et agents outillés.", "Business copilots, RAG over your documents and tool-using agents.") },
      { title: o("Automatisation intelligente", "Intelligent automation"), text: o("Extraction, classification et traitement automatisé des documents.", "Automated document extraction, classification and processing.") },
      { title: o("Intégration applicative", "Application integration"), text: o("IA exposée par API et intégrée à vos workflows existants.", "AI exposed via APIs and integrated into existing workflows.") },
      { title: o("Évaluation & gouvernance", "Evaluation & governance"), text: o("Jeux de tests, suivi de qualité et garde-fous.", "Evaluation suites, quality monitoring and guardrails.") },
    ],
    outcomes: [
      o("Tâches répétitives automatisées", "Repetitive tasks automated"),
      o("Produits différenciants", "Differentiated products"),
      o("IA fiable, testée et gouvernée", "Reliable, tested, governed AI"),
      o("Retour sur investissement mesurable", "Measurable return on investment"),
    ],
  },
];
