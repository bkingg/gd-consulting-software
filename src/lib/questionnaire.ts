import { Lang, T, o } from "@/lib/i18n";

export type { Lang, T };

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

export const UI = {
  back: o("Retour au site", "Back to site"),
  heroTitle: o("Parlons de votre projet logiciel", "Let's talk about your software project"),
  heroText: o(
    "Ce questionnaire prend environ 10 minutes. Vos réponses nous permettent de comprendre vos enjeux métier et votre contexte technique, afin de vous proposer une approche d'ingénierie adaptée dès notre premier échange.",
    "This questionnaire takes about 10 minutes. Your answers help us understand your business challenges and technical landscape, so we can propose the right engineering approach from our very first call."
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
  privacy: o(
    "Vos informations restent confidentielles et servent uniquement à préparer votre proposition.",
    "Your information stays confidential and is only used to prepare your proposal."
  ),
};

export const SECTIONS: Section[] = [
  {
    id: "about",
    title: o("Vous et votre organisation", "You and your organisation"),
    intro: o("Pour savoir à qui nous parlons.", "So we know who we're talking to."),
    fields: [
      { id: "name", type: "text", label: o("Nom complet", "Full name"), required: true },
      { id: "company", type: "text", label: o("Entreprise ou organisation", "Company or organisation"), required: true },
      { id: "role", type: "text", label: o("Votre fonction", "Your role"), placeholder: o("Ex. DSI, CTO, directeur des opérations…", "e.g. CIO, CTO, Head of Operations…") },
      { id: "sector", type: "select", label: o("Secteur d'activité", "Industry"), options: [o("Banque & finance", "Banking & finance"), o("Santé & sciences de la vie", "Healthcare & life sciences"), o("Industrie & énergie", "Industry & energy"), o("Retail & e-commerce", "Retail & e-commerce"), o("Secteur public", "Public sector"), o("Technologie / SaaS", "Technology / SaaS"), o("Autre", "Other")] },
      { id: "phone", type: "tel", label: o("Téléphone", "Phone"), placeholder: o("+1 514 …", "+1 514 …"), contact: true },
      { id: "email", type: "email", label: o("E-mail professionnel", "Work email"), contact: true },
      { id: "city", type: "text", label: o("Ville / pays", "City / country") },
      { id: "size", type: "select", label: o("Taille de l'organisation", "Organisation size"), options: [o("1–10 personnes", "1–10 people"), o("11–50 personnes", "11–50 people"), o("51–250 personnes", "51–250 people"), o("251–1 000 personnes", "251–1,000 people"), o("Plus de 1 000", "More than 1,000")] },
      { id: "source", type: "select", label: o("Comment nous avez-vous connus ?", "How did you hear about us?"), full: true, options: [o("Recommandation", "Referral"), o("LinkedIn", "LinkedIn"), o("Recherche Google", "Google search"), o("Événement", "Event"), o("Autre", "Other")] },
    ],
  },
  {
    id: "project",
    title: o("Votre projet", "Your project"),
    intro: o("Ce que vous voulez construire, et pourquoi maintenant.", "What you want to build, and why now."),
    fields: [
      { id: "services", type: "checks", label: o("Services recherchés", "Services you're looking for"), required: true, full: true, hint: o("Plusieurs choix possibles.", "Select all that apply."), options: [o("Exigences & expérience utilisateur", "Requirements & user experience"), o("Architecture & conception logicielle", "Software architecture & design"), o("Application web d'entreprise", "Web-based enterprise application"), o("Services web & API", "Web services & APIs"), o("Logiciel ERP", "ERP software"), o("E-commerce à grande échelle", "High-scale e-commerce"), o("Données & bases de données", "Data & databases"), o("Tests & qualité logicielle", "Software testing & quality"), o("Cloud, réseaux & DevOps", "Cloud, networking & DevOps"), o("Sécurité applicative", "Application security"), o("IA appliquée", "Applied AI"), o("Je ne sais pas encore", "Not sure yet")] },
      { id: "status", type: "radio", label: o("Nature du projet", "Type of project"), required: true, full: true, options: [o("Nouveau produit ou système", "New product or system"), o("Modernisation d'un système existant", "Modernising an existing system"), o("Extension ou intégration", "Extension or integration"), o("Audit, revue ou conseil", "Audit, review or advisory")] },
      { id: "goals", type: "checks", label: o("Objectifs métier", "Business objectives"), full: true, options: [o("Automatiser des processus", "Automate processes"), o("Unifier les données de l'entreprise", "Unify company data"), o("Absorber la croissance et la charge", "Handle growth and load"), o("Lancer un nouveau produit ou canal de vente", "Launch a new product or sales channel"), o("Réduire la dette technique", "Reduce technical debt"), o("Réduire les coûts d'exploitation", "Cut operating costs"), o("Renforcer la sécurité et la conformité", "Strengthen security and compliance")] },
      { id: "why", type: "textarea", label: o("Contexte : pourquoi lancer ce projet maintenant ?", "Context: why start this project now?"), full: true, placeholder: o("Croissance, système en fin de vie, nouvelle réglementation, fusion…", "Growth, end-of-life system, new regulation, merger…") },
      { id: "success", type: "textarea", label: o("Dans 12 mois, à quoi verrez-vous que le projet est un succès ?", "In 12 months, how will you know the project succeeded?"), full: true, placeholder: o("Indicateurs, délais, retours utilisateurs…", "Metrics, lead times, user feedback…") },
    ],
  },
  {
    id: "technical",
    title: o("Contexte technique", "Technical landscape"),
    intro: o("Pour dimensionner l'architecture dès le départ.", "So we can size the architecture from day one."),
    fields: [
      { id: "currentSystems", type: "textarea", label: o("Systèmes et technologies en place", "Current systems and technologies"), full: true, placeholder: o("ERP, CRM, langages, bases de données, hébergeur…", "ERP, CRM, languages, databases, hosting…") },
      { id: "users", type: "select", label: o("Nombre d'utilisateurs visé", "Expected number of users"), options: [o("Moins de 100 (usage interne)", "Fewer than 100 (internal use)"), o("100 à 10 000", "100 to 10,000"), o("10 000 à 1 million", "10,000 to 1 million"), o("Plus de 1 million", "More than 1 million"), o("Je ne sais pas", "Not sure")] },
      { id: "peaks", type: "radio", label: o("Pics de trafic prévisibles ?", "Predictable traffic peaks?"), options: [o("Oui (soldes, campagnes, échéances)", "Yes (sales, campaigns, deadlines)"), o("Non, charge plutôt stable", "No, fairly steady load"), o("Je ne sais pas", "Not sure")] },
      { id: "integrations", type: "checks", label: o("Intégrations nécessaires", "Required integrations"), full: true, options: [o("ERP", "ERP"), o("CRM", "CRM"), o("Comptabilité / finance", "Accounting / finance"), o("Passerelle de paiement", "Payment gateway"), o("Logistique / transporteurs", "Logistics / carriers"), o("Authentification unique (SSO)", "Single sign-on (SSO)"), o("API partenaires", "Partner APIs"), o("Système legacy", "Legacy system"), o("Aucune pour l'instant", "None for now")] },
      { id: "hosting", type: "radio", label: o("Hébergement souhaité", "Preferred hosting"), options: [o("Cloud public", "Public cloud"), o("Cloud privé / sur site", "Private cloud / on-premises"), o("Hybride", "Hybrid"), o("À définir avec vous", "To be defined with you")] },
      { id: "constraints", type: "checks", label: o("Exigences particulières", "Specific requirements"), full: true, options: [o("Protection des données personnelles (RGPD, Loi 25)", "Personal data protection (GDPR, Law 25)"), o("Paiement par carte (PCI-DSS)", "Card payments (PCI-DSS)"), o("Données de santé", "Health data"), o("Haute disponibilité (24/7)", "High availability (24/7)"), o("Accessibilité", "Accessibility"), o("Multilingue", "Multilingual")] },
    ],
  },
  {
    id: "delivery",
    title: o("Organisation et calendrier", "Delivery and timeline"),
    intro: o("Pour proposer le bon format d'accompagnement.", "So we can suggest the right engagement model."),
    fields: [
      { id: "maturity", type: "radio", label: o("Où en êtes-vous ?", "Where are you today?"), full: true, options: [o("Idée ou besoin à formaliser", "Idea or need to formalise"), o("Cahier des charges rédigé", "Written specification"), o("Prototype / MVP existant", "Existing prototype / MVP"), o("Système en production", "System in production")] },
      { id: "team", type: "radio", label: o("Équipe technique interne", "In-house technical team"), options: [o("Aucune", "None"), o("Petite équipe (1–5)", "Small team (1–5)"), o("Direction informatique structurée", "Established IT department")] },
      { id: "engagement", type: "radio", label: o("Format d'accompagnement", "Engagement model"), options: [o("Projet au forfait", "Fixed-scope project"), o("Équipe dédiée", "Dedicated team"), o("Conseil / expertise ponctuelle", "Advisory / ad-hoc expertise"), o("À définir", "To be decided")] },
      { id: "budget", type: "select", label: o("Envergure du budget", "Budget scope"), options: [o("Preuve de concept / MVP", "Proof of concept / MVP"), o("Produit complet", "Full product"), o("Programme de transformation", "Transformation programme"), o("À définir ensemble", "To be defined together")] },
      { id: "timeline", type: "select", label: o("Échéance souhaitée", "Target timeline"), options: [o("Moins de 3 mois", "Under 3 months"), o("3 à 6 mois", "3 to 6 months"), o("6 à 12 mois", "6 to 12 months"), o("Plus de 12 mois", "Over 12 months"), o("Flexible", "Flexible")] },
      { id: "otherNeeds", type: "textarea", label: o("Autres informations utiles", "Anything else we should know"), full: true, placeholder: o("Contraintes, décideurs impliqués, documents disponibles…", "Constraints, decision-makers involved, available documents…") },
    ],
  },
];
