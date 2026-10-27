export type Lang = "fr" | "en";
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
  heroTitle: o("Parlons de votre futur site web", "Let's talk about your new website"),
  heroText: o(
    "Ce questionnaire prend environ 10 minutes. Vos réponses nous aident à comprendre votre activité et vos objectifs, pour vous proposer la bonne solution dès notre premier échange.",
    "This questionnaire takes about 10 minutes. Your answers help us understand your business and goals, so we can suggest the right solution from our very first call."
  ),
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

export const SECTIONS: Section[] = [
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
  },
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
