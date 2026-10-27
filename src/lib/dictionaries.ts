import { Locale } from "@/lib/i18n";

const fr = {
  meta: {
    title: "GD Consulting - Ingénierie logicielle & innovation",
    description:
      "GD Consulting conçoit et développe des logiciels complexes, du prototype à l'infrastructure cloud. Expertise en open source, scalabilité et solutions sur mesure.",
    ogDescription:
      "Solutions logicielles puissantes, scalables et innovantes pour entreprises ambitieuses.",
    keywords: ["GD Consulting", "Ingénierie logicielle", "Cloud", "Open source", "Développement sur mesure", "Innovation"],
  },
  nav: {
    label: "Navigation principale",
    items: { accueil: "Accueil", expertise: "Expertise", ai: "IA", engineering: "Ingénierie", contact: "Contact" },
    questionnaire: "Questionnaire",
    openMenu: "Ouvrir le menu",
    closeMenu: "Fermer le menu",
    language: "Langue",
  },
  hero: {
    title: "Logiciels d’entreprise fiables et évolutifs",
    lead: "conçoit et déploie des solutions logicielles complexes, sécurisées et scalables sur le cloud.",
    cta: "Parlez à nos experts",
    scroll: "Découvrir notre expertise",
  },
  expertise: {
    title: "Notre expertise",
    items: [
      {
        title: "Solutions sur-mesure",
        text: "Développement de logiciels d’entreprise personnalisés, sécurisés et optimisés pour vos besoins spécifiques.",
      },
      {
        title: "Cloud & Scalabilité",
        text: "Architecture cloud robuste et évolutive pour garantir performance et fiabilité à grande échelle.",
      },
      {
        title: "Intelligence Artificielle",
        text: "Exploitation de l’IA pour automatiser, optimiser et enrichir vos processus logiciels.",
      },
    ],
  },
  ai: {
    title: "Technologie, sécurité et innovation",
    text: "Nos solutions sont conçues pour les entreprises qui exigent fiabilité, haute performance et sécurité. Nous maîtrisons le cloud, les architectures scalables et l’IA pour fournir des logiciels à la hauteur des projets les plus ambitieux.",
    cta: "Discutons de votre projet",
  },
  engineering: {
    title: "L’excellence en ingénierie logicielle",
    items: [
      { title: "Architecture pensée pour durer", before: "Chez ", after: ", chaque ligne de code est écrite avec rigueur et intention." },
      { title: "Une ingénierie, pas du bricolage", text: "Contrairement aux approches improvisées, nous appliquons une méthodologie d’ingénierie logicielle à chaque étape." },
      { title: "La force du savoir-faire local", text: "Nos ingénieurs conçoivent des solutions au niveau mondial, avec une compréhension locale des besoins." },
    ],
  },
  images: {
    expertise: [
      "Éditeur de code affichant une application TypeScript",
      "Baie de serveurs éclairée en vert dans un centre de données",
      "Circuit électronique abstrait aux lueurs vertes",
    ],
    engineering: "Deux développeurs relisent du code ensemble sur un ordinateur portable",
    contact: "Un développeur travaille sur son ordinateur portable",
  },
  contact: {
    title: "Votre vision, notre expertise",
    text: "Confiez votre projet à des professionnels de confiance. Nous concevons des solutions logicielles robustes, sécurisées et évolutives, adaptées aux besoins de votre entreprise.",
    questionnaireBefore: "Un projet précis ?",
    questionnaireLink: "Remplissez notre questionnaire",
    questionnaireAfter: "pour recevoir une proposition adaptée.",
    name: "Votre nom",
    email: "Votre email",
    message: "Votre message",
    submit: "Envoyer le message",
    sending: "Envoi...",
    success: "Message envoyé avec succès !",
    errors: {
      name: "Le nom est requis",
      nameLong: "Le nom est trop long (100 caractères max)",
      email: "Email invalide",
      emailLong: "Email trop long",
      message: "Le message est trop court",
      messageLong: "Le message est trop long (5000 caractères max)",
      rateLimited: "Trop de messages envoyés. Réessayez dans quelques minutes.",
      send: "Erreur lors de l'envoi. Réessayez plus tard.",
      server: "Erreur serveur. Réessayez plus tard.",
    },
  },
};

export type Dictionary = typeof fr;

const en: Dictionary = {
  meta: {
    title: "GD Consulting - Software engineering & innovation",
    description:
      "GD Consulting designs and builds complex software, from prototype to cloud infrastructure. Expertise in open source, scalability and custom solutions.",
    ogDescription:
      "Powerful, scalable and innovative software solutions for ambitious companies.",
    keywords: ["GD Consulting", "Software engineering", "Cloud", "Open source", "Custom software development", "Innovation"],
  },
  nav: {
    label: "Main navigation",
    items: { accueil: "Home", expertise: "Expertise", ai: "AI", engineering: "Engineering", contact: "Contact" },
    questionnaire: "Questionnaire",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    language: "Language",
  },
  hero: {
    title: "Reliable, scalable enterprise software",
    lead: "designs and deploys complex, secure and scalable software solutions in the cloud.",
    cta: "Talk to our experts",
    scroll: "Discover our expertise",
  },
  expertise: {
    title: "Our expertise",
    items: [
      {
        title: "Custom solutions",
        text: "Bespoke enterprise software, secure and optimised for your specific needs.",
      },
      {
        title: "Cloud & Scalability",
        text: "Robust, scalable cloud architecture that delivers performance and reliability at scale.",
      },
      {
        title: "Artificial Intelligence",
        text: "Putting AI to work to automate, optimise and enrich your software processes.",
      },
    ],
  },
  ai: {
    title: "Technology, security and innovation",
    text: "Our solutions are built for companies that demand reliability, high performance and security. We master the cloud, scalable architectures and AI to deliver software that lives up to the most ambitious projects.",
    cta: "Let's discuss your project",
  },
  engineering: {
    title: "Excellence in software engineering",
    items: [
      { title: "Architecture built to last", before: "At ", after: ", every line of code is written with rigour and intent." },
      { title: "Engineering, not guesswork", text: "Unlike improvised approaches, we apply a software engineering methodology at every step." },
      { title: "The strength of local know-how", text: "Our engineers build world-class solutions with a local understanding of your needs." },
    ],
  },
  images: {
    expertise: [
      "Code editor showing a TypeScript application",
      "Server rack lit in green in a data centre",
      "Abstract electronic circuit glowing green",
    ],
    engineering: "Two developers reviewing code together on a laptop",
    contact: "A developer working on a laptop",
  },
  contact: {
    title: "Your vision, our expertise",
    text: "Entrust your project to professionals you can rely on. We build robust, secure and scalable software solutions tailored to your business.",
    questionnaireBefore: "Have a specific project?",
    questionnaireLink: "Fill in our questionnaire",
    questionnaireAfter: "to receive a tailored proposal.",
    name: "Your name",
    email: "Your email",
    message: "Your message",
    submit: "Send message",
    sending: "Sending...",
    success: "Message sent successfully!",
    errors: {
      name: "Name is required",
      nameLong: "Name is too long (100 characters max)",
      email: "Invalid email",
      emailLong: "Email is too long",
      message: "Message is too short",
      messageLong: "Message is too long (5000 characters max)",
      rateLimited: "Too many messages sent. Try again in a few minutes.",
      send: "Sending failed. Please try again later.",
      server: "Server error. Please try again later.",
    },
  },
};

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export const getDictionary = (lang: Locale) => dictionaries[lang];
