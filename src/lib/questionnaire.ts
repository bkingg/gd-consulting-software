import type { Locale, QuestionnaireKind } from "@/lib/i18n";

export type Lang = Locale;
export type T = Record<Lang, string>;

export type Field = {
  id: string;
  type: "text" | "email" | "tel" | "url" | "textarea" | "select" | "radio" | "checks";
  label: T;
  options?: T[];
  placeholder?: T;
  hint?: T;
  required?: boolean;
  contact?: boolean; // at least one contact field is required
  full?: boolean;
};

export type Section = { id: string; title: T; intro: T; fields: Field[] };

const o = (fr: string, en: string): T => ({ fr, en });

export const UI = {
  back: o("Retour au site", "Back to site"),
  progress: o("sections complétées", "sections completed"),
  select: o("Choisir…", "Choose…"),
  required: o("Ce champ est requis.", "This field is required."),
  contactReq: o("Indiquez au moins un téléphone ou un e-mail.", "Enter at least a phone number or an email."),
  invalidEmail: o("Adresse e-mail invalide.", "Invalid email address."),
  fixErrors: o("Complétez les champs en rouge avant d'envoyer.", "Complete the fields highlighted in red before sending."),
  finishTitle: o("Envoyer vos réponses", "Send your answers"),
  finishText: o(
    "Nous étudions votre projet et revenons vers vous sous 48 h ouvrées.",
    "We'll review your project and get back to you within 2 business days."
  ),
  submit: o("Envoyer le questionnaire", "Send questionnaire"),
  sending: o("Envoi…", "Sending…"),
  successTitle: o("Merci, c'est envoyé !", "Thank you, it's sent!"),
  successText: o(
    "Nous avons bien reçu votre questionnaire. Nous revenons vers vous sous 48 h ouvrées.",
    "We've received your questionnaire. We'll get back to you within 2 business days."
  ),
  error: o(
    "L'envoi a échoué. Réessayez, ou écrivez-nous à contact@gdco.tech.",
    "Sending failed. Try again, or email us at contact@gdco.tech."
  ),
  rateLimited: o(
    "Trop d'envois depuis votre connexion. Réessayez dans quelques minutes.",
    "Too many submissions from your connection. Try again in a few minutes."
  ),
  privacy: o(
    "Vos informations restent confidentielles et servent uniquement à préparer votre proposition.",
    "Your information stays confidential and is only used to prepare your proposal."
  ),
};

const ABOUT_SECTION: Section =
  {
    id: "about",
    title: o("Vous et votre activité", "You and your business"),
    intro: o("Pour savoir à qui nous parlons.", "So we know who we're talking to."),
    fields: [
      { id: "name", type: "text", label: o("Nom complet", "Full name"), required: true },
      { id: "company", type: "text", label: o("Entreprise ou organisation", "Company or organisation"), required: true },
      { id: "role", type: "text", label: o("Votre fonction", "Your role") },
      { id: "sector", type: "text", label: o("Secteur d'activité", "Industry"), placeholder: o("Ex. restauration, immobilier, santé…", "e.g. hospitality, real estate, health…") },
      { id: "phone", type: "tel", label: o("Téléphone / WhatsApp", "Phone / WhatsApp"), placeholder: o("+221 …", "+221 …"), contact: true },
      { id: "email", type: "email", label: o("E-mail", "Email"), contact: true },
      { id: "city", type: "text", label: o("Ville / pays", "City / country") },
      { id: "size", type: "select", label: o("Taille de l'entreprise", "Company size"), options: [o("Indépendant", "Self-employed"), o("2–10 personnes", "2–10 people"), o("11–50 personnes", "11–50 people"), o("Plus de 50", "More than 50")] },
      { id: "source", type: "select", label: o("Comment nous avez-vous connus ?", "How did you hear about us?"), full: true, options: [o("Recommandation", "Referral"), o("Réseaux sociaux", "Social media"), o("Recherche Google", "Google search"), o("Événement", "Event"), o("Autre", "Other")] },
    ],
  };

const WEBSITE_SECTIONS: Section[] = [
  ABOUT_SECTION,
  {
    id: "project",
    title: o("Votre projet", "Your project"),
    intro: o("Ce que vous voulez construire, et pourquoi maintenant.", "What you want to build, and why now."),
    fields: [
      { id: "status", type: "radio", label: o("Situation actuelle", "Current situation"), required: true, full: true, options: [o("Création d'un premier site", "Brand-new website"), o("Refonte d'un site existant", "Redesign of an existing site"), o("Ajout de fonctionnalités", "Adding features to a site")] },
      { id: "currentUrl", type: "url", label: o("Adresse du site actuel", "Current website address"), placeholder: o("https://", "https://"), hint: o("Si vous en avez un.", "If you have one.") },
      { id: "siteType", type: "select", label: o("Type de site", "Type of website"), required: true, options: [o("Site vitrine (présentation)", "Brochure / showcase site"), o("Boutique en ligne", "Online store"), o("Réservation / prise de rendez-vous", "Booking / appointments"), o("Page unique (landing page)", "Single landing page"), o("Blog / média", "Blog / media"), o("Plateforme ou application web", "Web platform or app"), o("Je ne sais pas encore", "Not sure yet")] },
      { id: "goals", type: "checks", label: o("Objectifs principaux", "Main goals"), full: true, options: [o("Gagner en crédibilité", "Build credibility"), o("Attirer de nouveaux clients", "Attract new customers"), o("Vendre en ligne", "Sell online"), o("Recevoir des réservations", "Take bookings"), o("Informer / présenter l'offre", "Present our offer"), o("Recruter", "Recruit"), o("Réduire les appels et messages répétitifs", "Cut repetitive calls and messages")] },
      { id: "why", type: "textarea", label: o("Pourquoi lancer ce projet maintenant ?", "Why start this project now?"), full: true, placeholder: o("Ouverture, lancement de produit, site actuel dépassé…", "Opening, product launch, outdated site…") },
      { id: "success", type: "textarea", label: o("Dans 6 mois, à quoi verrez-vous que le site est un succès ?", "In 6 months, how will you know the website worked?"), full: true },
    ],
  },
  {
    id: "audience",
    title: o("Public et contenu", "Audience and content"),
    intro: o("Pour qui est le site, et ce qui est déjà prêt.", "Who the site is for, and what's already ready."),
    fields: [
      { id: "audience", type: "textarea", label: o("Qui sont vos clients cibles ?", "Who are your target customers?"), full: true, placeholder: o("Âge, localisation, particuliers ou entreprises, diaspora…", "Age, location, individuals or businesses, diaspora…") },
      { id: "languages", type: "checks", label: o("Langues du site", "Website languages"), full: true, options: [o("Français", "French"), o("Anglais", "English"), o("Wolof", "Wolof"), o("Arabe", "Arabic"), o("Autre", "Other")] },
      { id: "assets", type: "checks", label: o("Ce que vous avez déjà", "What you already have"), full: true, options: [o("Logo", "Logo"), o("Charte graphique", "Brand guidelines"), o("Textes rédigés", "Written copy"), o("Photos professionnelles", "Professional photos"), o("Vidéos", "Videos"), o("Nom de domaine", "Domain name"), o("Hébergement", "Hosting"), o("Rien pour l'instant", "Nothing yet")] },
      { id: "contentHelp", type: "radio", label: o("Besoin d'aide pour le contenu ?", "Need help with content?"), full: true, options: [o("Oui, rédaction et photos", "Yes, copywriting and photos"), o("Oui, rédaction seulement", "Yes, copywriting only"), o("Non, je fournis tout", "No, I'll provide everything")] },
    ],
  },
  {
    id: "features",
    title: o("Fonctionnalités", "Features"),
    intro: o("Cochez tout ce qui vous semble utile, même si vous hésitez.", "Tick everything that seems useful, even if you're unsure."),
    fields: [
      { id: "featureList", type: "checks", label: o("Fonctionnalités souhaitées", "Features you'd like"), full: true, options: [o("Formulaire de contact", "Contact form"), o("Bouton WhatsApp", "WhatsApp button"), o("Paiement Wave / Orange Money", "Wave / Orange Money payments"), o("Paiement par carte", "Card payments"), o("Catalogue de produits", "Product catalogue"), o("Réservation en ligne", "Online booking"), o("Espace client / comptes", "Customer accounts"), o("Blog / actualités", "Blog / news"), o("Galerie photos", "Photo gallery"), o("Carte Google Maps", "Google Maps"), o("Intégration réseaux sociaux", "Social media feed"), o("Newsletter", "Newsletter"), o("Avis clients", "Customer reviews"), o("Tableau d'administration", "Admin dashboard")] },
      { id: "pages", type: "select", label: o("Nombre de pages estimé", "Estimated number of pages"), options: [o("1 page", "1 page"), o("2 à 5 pages", "2 to 5 pages"), o("6 à 15 pages", "6 to 15 pages"), o("Plus de 15", "More than 15"), o("Je ne sais pas", "Not sure")] },
      { id: "update", type: "radio", label: o("Qui mettra le site à jour ?", "Who will update the site?"), options: [o("Moi / mon équipe", "Me / my team"), o("GD Consulting", "GD Consulting"), o("À définir", "To be decided")] },
      { id: "otherFeatures", type: "textarea", label: o("Autres besoins particuliers", "Any other specific needs"), full: true, placeholder: o("Connexion à un logiciel de caisse, livraison, multi-sites…", "Link to a POS system, delivery, multiple locations…") },
    ],
  },
  {
    id: "inspiration",
    title: o("Inspiration et style", "Inspiration and style"),
    intro: o("Quelques exemples valent mieux que de longues descriptions.", "A few examples beat long descriptions."),
    fields: [
      { id: "likes", type: "textarea", label: o("Sites que vous aimez (et pourquoi)", "Websites you like (and why)"), full: true },
      { id: "competitors", type: "textarea", label: o("Vos principaux concurrents", "Your main competitors"), full: true, hint: o("Noms ou liens.", "Names or links.") },
      { id: "mood", type: "checks", label: o("L'image à donner", "The impression to give"), full: true, options: [o("Premium / haut de gamme", "Premium / upscale"), o("Chaleureux / accessible", "Warm / approachable"), o("Moderne / tech", "Modern / tech"), o("Institutionnel / sérieux", "Institutional / serious"), o("Créatif / audacieux", "Creative / bold"), o("Local / authentique", "Local / authentic")] },
      { id: "avoid", type: "textarea", label: o("Ce que vous ne voulez surtout pas", "What you definitely don't want"), full: true },
    ],
  },
];

const SOFTWARE_SECTIONS: Section[] = [
  ABOUT_SECTION,
  {
    id: "project",
    title: o("Votre projet", "Your project"),
    intro: o("Le problème à résoudre compte plus que la solution imaginée.", "The problem to solve matters more than the solution you have in mind."),
    fields: [
      { id: "status", type: "radio", label: o("Situation actuelle", "Current situation"), required: true, full: true, options: [o("Nouveau logiciel", "Brand-new software"), o("Refonte ou modernisation d'un système existant", "Rebuild or modernise an existing system"), o("Évolution d'un logiciel existant", "Extend existing software"), o("Audit ou conseil technique", "Technical audit or advice")] },
      { id: "softwareType", type: "select", label: o("Type de logiciel", "Type of software"), required: true, options: [o("Application web métier", "Business web application"), o("Application mobile", "Mobile app"), o("Plateforme SaaS", "SaaS platform"), o("API / intégration entre systèmes", "API / system integration"), o("Automatisation / outil interne", "Automation / internal tool"), o("Data / intelligence artificielle", "Data / artificial intelligence"), o("Je ne sais pas encore", "Not sure yet")] },
      { id: "problem", type: "textarea", label: o("Quel problème ce logiciel doit-il résoudre ?", "What problem should this software solve?"), required: true, full: true, placeholder: o("Saisie manuelle, outils qui ne communiquent pas, process lent, perte de données…", "Manual data entry, tools that don't talk to each other, slow process, lost data…") },
      { id: "currentProcess", type: "textarea", label: o("Comment faites-vous aujourd'hui ?", "How do you handle it today?"), full: true, placeholder: o("Excel, papier, un logiciel existant…", "Spreadsheets, paper, existing software…") },
      { id: "why", type: "textarea", label: o("Pourquoi lancer ce projet maintenant ?", "Why start this project now?"), full: true },
      { id: "success", type: "textarea", label: o("Dans 6 mois, à quoi verrez-vous que le projet est un succès ?", "In 6 months, how will you know the project worked?"), full: true },
    ],
  },
  {
    id: "users",
    title: o("Utilisateurs et usages", "Users and usage"),
    intro: o("Qui utilisera le logiciel, où et à quelle échelle.", "Who will use the software, where and at what scale."),
    fields: [
      { id: "users", type: "textarea", label: o("Qui utilisera le logiciel ?", "Who will use the software?"), full: true, placeholder: o("Employés, clients, partenaires, agents terrain…", "Staff, customers, partners, field agents…") },
      { id: "userCount", type: "select", label: o("Nombre d'utilisateurs prévus", "Expected number of users"), options: [o("Moins de 10", "Fewer than 10"), o("10 à 100", "10 to 100"), o("100 à 1 000", "100 to 1,000"), o("Plus de 1 000", "More than 1,000"), o("Je ne sais pas", "Not sure")] },
      { id: "platforms", type: "checks", label: o("Plateformes", "Platforms"), full: true, options: [o("Navigateur web", "Web browser"), o("iOS", "iOS"), o("Android", "Android"), o("Ordinateur (Windows / macOS)", "Desktop (Windows / macOS)"), o("API uniquement", "API only")] },
      { id: "offline", type: "radio", label: o("Usage sans connexion internet ?", "Needs to work offline?"), full: true, options: [o("Oui, indispensable", "Yes, essential"), o("Utile mais pas indispensable", "Nice to have"), o("Non", "No")] },
      { id: "languages", type: "checks", label: o("Langues de l'interface", "Interface languages"), full: true, options: [o("Français", "French"), o("Anglais", "English"), o("Wolof", "Wolof"), o("Arabe", "Arabic"), o("Autre", "Other")] },
    ],
  },
  {
    id: "technical",
    title: o("Contexte technique", "Technical context"),
    intro: o("Répondez à ce que vous savez : nous complétons le reste ensemble.", "Answer what you know: we'll fill in the rest together."),
    fields: [
      { id: "existingSystems", type: "textarea", label: o("Outils et systèmes déjà en place", "Tools and systems already in place"), full: true, placeholder: o("ERP, CRM, comptabilité, base de données, site web…", "ERP, CRM, accounting, database, website…") },
      { id: "integrations", type: "checks", label: o("Intégrations nécessaires", "Integrations needed"), full: true, options: [o("Paiement Wave / Orange Money", "Wave / Orange Money payments"), o("Paiement par carte", "Card payments"), o("ERP / CRM", "ERP / CRM"), o("Comptabilité / facturation", "Accounting / invoicing"), o("SMS / WhatsApp", "SMS / WhatsApp"), o("E-mail", "Email"), o("Cartographie / géolocalisation", "Maps / geolocation"), o("IA / modèles de langage", "AI / language models"), o("Authentification d'entreprise (SSO)", "Company sign-in (SSO)")] },
      { id: "sensitiveData", type: "checks", label: o("Données sensibles traitées", "Sensitive data handled"), full: true, options: [o("Données personnelles", "Personal data"), o("Données financières", "Financial data"), o("Données de santé", "Health data"), o("Aucune donnée sensible", "No sensitive data"), o("Je ne sais pas", "Not sure")] },
      { id: "hosting", type: "radio", label: o("Hébergement souhaité", "Preferred hosting"), full: true, options: [o("Cloud (AWS, Azure, Google Cloud…)", "Cloud (AWS, Azure, Google Cloud…)"), o("Serveurs internes", "On-premise servers"), o("À définir", "To be decided")] },
      { id: "constraints", type: "textarea", label: o("Contraintes techniques ou réglementaires", "Technical or regulatory constraints"), full: true, placeholder: o("Technologie imposée, normes, sécurité, audit…", "Required technology, standards, security, audits…") },
    ],
  },
  {
    id: "organisation",
    title: o("Organisation et calendrier", "Organisation and timeline"),
    intro: o("Pour proposer un plan réaliste dès le premier échange.", "So we can suggest a realistic plan from the first call."),
    fields: [
      { id: "documents", type: "checks", label: o("Ce que vous avez déjà", "What you already have"), full: true, options: [o("Cahier des charges", "Requirements document"), o("Maquettes / prototype", "Mock-ups / prototype"), o("Documentation technique", "Technical documentation"), o("Code source existant", "Existing source code"), o("Rien pour l'instant", "Nothing yet")] },
      { id: "team", type: "radio", label: o("Avez-vous une équipe technique interne ?", "Do you have an in-house tech team?"), options: [o("Oui", "Yes"), o("Partiellement", "Partly"), o("Non", "No")] },
      { id: "maintenance", type: "radio", label: o("Qui assurera la maintenance ?", "Who will maintain it?"), options: [o("GD Consulting", "GD Consulting"), o("Notre équipe", "Our team"), o("À définir", "To be decided")] },
      { id: "timeline", type: "select", label: o("Délai souhaité", "Desired timeline"), options: [o("Moins de 3 mois", "Under 3 months"), o("3 à 6 mois", "3 to 6 months"), o("6 à 12 mois", "6 to 12 months"), o("Plus de 12 mois", "Over 12 months"), o("Pas de date fixe", "No fixed date")] },
      { id: "budget", type: "text", label: o("Budget envisagé", "Budget in mind"), hint: o("Une fourchette suffit.", "A range is fine.") },
      { id: "notes", type: "textarea", label: o("Autre chose à nous dire ?", "Anything else we should know?"), full: true },
    ],
  },
];

export type QuestionnaireConfig = { heroTitle: T; heroText: T; sections: Section[] };

export const QUESTIONNAIRES: Record<QuestionnaireKind, QuestionnaireConfig> = {
  website: {
    heroTitle: o("Parlons de votre futur site web", "Let's talk about your new website"),
    heroText: o(
      "Ce questionnaire prend environ 10 minutes. Vos réponses nous aident à comprendre votre activité et vos objectifs, pour vous proposer la bonne solution dès notre premier échange.",
      "This questionnaire takes about 10 minutes. Your answers help us understand your business and goals, so we can suggest the right solution from our very first call."
    ),
    sections: WEBSITE_SECTIONS,
  },
  software: {
    heroTitle: o("Parlons de votre projet logiciel", "Let's talk about your software project"),
    heroText: o(
      "Ce questionnaire prend environ 15 minutes. Vos réponses nous aident à comprendre votre besoin, vos utilisateurs et votre contexte technique, pour vous proposer une approche adaptée dès notre premier échange.",
      "This questionnaire takes about 15 minutes. Your answers help us understand your needs, your users and your technical context, so we can suggest the right approach from our very first call."
    ),
    sections: SOFTWARE_SECTIONS,
  },
};

// Copy for the /questionnaire page where visitors pick a project type
export const PICKER = {
  title: o("Quel est votre projet ?", "What's your project?"),
  text: o(
    "Choisissez le questionnaire qui correspond à votre besoin. Nous revenons vers vous sous 48 h ouvrées avec une proposition adaptée.",
    "Pick the questionnaire that fits your needs. We'll get back to you within 2 business days with a tailored proposal."
  ),
  duration: o("min", "min"),
  start: o("Commencer", "Start"),
  kinds: {
    website: {
      title: o("Site web", "Website"),
      text: o("Site vitrine, boutique en ligne, réservation, landing page, blog…", "Showcase site, online store, booking, landing page, blog…"),
      minutes: 10,
    },
    software: {
      title: o("Logiciel sur mesure", "Custom software"),
      text: o("Application métier, plateforme SaaS, application mobile, intégrations, data et IA…", "Business application, SaaS platform, mobile app, integrations, data and AI…"),
      minutes: 15,
    },
  } satisfies Record<QuestionnaireKind, { title: T; text: T; minutes: number }>,
};
