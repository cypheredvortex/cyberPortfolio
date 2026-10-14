import type { Locale } from "./config";

/**
 * Interface copy for every locale.
 *
 * `en` is the source of truth: `Messages` is derived from it and the French
 * dictionary is annotated with that type, so a missing, misspelled, or
 * differently-shaped key is a compile-time error rather than a silent English
 * fallback at runtime. Tuples are used for fixed-length lists so both locales
 * must agree on how many items exist.
 */
const en = {
  a11y: {
    skipToContent: "Skip to main content",
    openMenu: "Open navigation menu",
    closeMenu: "Close navigation menu",
    backToTop: "Back to top",
    language: "Language",
    currentLanguage: "Current language",
    switchToOther: "Switch to French",
    localeChanged: "Language changed to French.",
  },
  nav: {
    home: "Home",
    about: "About",
    skills: "Skills",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    contact: "Contact",
    primaryLabel: "Primary",
  },
  hero: {
    viewProjects: "View projects",
    contactMe: "Contact me",
    scrollToAbout: "Scroll to the about section",
    snapshotTitle: "Profile snapshot",
    specialization: "Specialization",
    education: "Education",
    location: "Location",
    languages: "Languages",
    focusAreas: "Focus areas",
  },
  about: {
    label: "Professional profile",
    title: "Computer science and networks engineering",
    description:
      "Engineering-cycle specialization in cybersecurity and network infrastructure, backed by applied security, networking, systems, and software work.",
    focusTitle: "Focus areas",
    languagesTitle: "Languages",
    interestsTitle: "Interests",
  },
  skills: {
    label: "Technical profile",
    title: "Competencies, protocols, tooling, and technologies",
    description:
      "Technical concepts are classified by their professional role and linked to the projects that demonstrate them.",
    categoriesLabel: "Skill categories",
    evidence: (count: number) =>
      count === 1 ? "Applied in 1 project" : `Applied in ${count} projects`,
    foundation: "Academic and laboratory foundation",
  },
  projects: {
    label: "Projects",
    homeTitle: "Selected technical work",
    homeDescription:
      "Security and infrastructure projects first, followed by the supporting software-development work.",
    viewAll: "View all",
    viewAllMobile: "View all projects",
    pageTitle: "All projects",
    pageDescription:
      "Academic, laboratory, and internship work across security, networks, and supporting web development.",
    filterLabel: "Filter projects by category",
    filterCount: (count: number) => `${count}`,
    emptyState: "No project matches this filter.",
    emptyStateHint: "Select another category to see the other projects.",
  },
  project: {
    back: "All projects",
    technologies: "Technologies, tools, and protocols",
    overview: "Overview",
    problem: "Problem statement",
    objective: "Objective",
    architecture: "Technical context",
    implementation: "Implementation",
    security: "Security considerations",
    challenges: "Technical challenges",
    results: "Results",
    notFoundTitle: "Project not found",
    notFoundDescription:
      "This project does not exist or is no longer published.",
    notFoundCta: "Back to all projects",
  },
  categories: {
    all: "All",
    cybersecurity: "Cybersecurity",
    networking: "Networking",
    fullstack: "Full-Stack",
    systems: "Systems",
  },
  experience: {
    label: "Experience",
    title: "Professional background",
    description: "Internships and applied engineering work.",
    contextTitle: "Context",
    responsibilitiesTitle: "Responsibilities",
    technologiesTitle: "Technologies and tools",
  },
  education: {
    label: "Education",
    title: "Academic background",
    description: "Formal education and engineering training.",
    ongoing: "In progress",
    completed: "Completed",
  },
  contact: {
    label: "Contact",
    title: "Get in touch",
    description:
      "For professional enquiries, project discussions, or collaboration proposals, get in touch directly.",
    emailLabel: "Email",
    phoneLabel: "Phone",
    locationLabel: "Location",
    copyEmail: "Copy email address",
    copied: "Email address copied to the clipboard",
    copyFailed: "Copying failed — please select the address manually.",
    mailtoSubject: "Portfolio enquiry",
    openMailClient: "Write an email",
  },
  footer: {
    navigationTitle: "Navigation",
    contactTitle: "Contact",
    builtWith: "Built with Next.js and TypeScript.",
    rights: "All rights reserved.",
  },
  notFound: {
    code: "404",
    title: "Page not found",
    description: "The page you are looking for does not exist or has been moved.",
    cta: "Back to home",
  },
  metadata: {
    siteName: "Achraf Sghiri — Portfolio",
    /** Brand used to compose page titles outside the Next.js title template. */
    brandShort: "Achraf Sghiri",
    homeTitle: "Achraf Sghiri — Cybersecurity & Network Infrastructure",
    homeDescription:
      "Portfolio of Achraf Sghiri, a computer science and networks engineering candidate specializing in cybersecurity and network infrastructure.",
    /** Short form: the root layout's title template appends the brand. */
    projectsTitle: "Projects",
    projectsDescription:
      "Technical projects by Achraf Sghiri spanning cybersecurity, network security, and full-stack development.",
    projectNotFoundTitle: "Project not found",
    notFoundTitle: "Page not found",
  },
};

export type Messages = typeof en;

const fr: Messages = {
  a11y: {
    skipToContent: "Aller au contenu principal",
    openMenu: "Ouvrir le menu de navigation",
    closeMenu: "Fermer le menu de navigation",
    backToTop: "Revenir en haut de la page",
    language: "Langue",
    currentLanguage: "Langue actuelle",
    switchToOther: "Passer en anglais",
    localeChanged: "Langue modifiée : français.",
  },
  nav: {
    home: "Accueil",
    about: "À propos",
    skills: "Compétences",
    projects: "Projets",
    experience: "Expérience",
    education: "Formation",
    contact: "Contact",
    primaryLabel: "Principale",
  },
  hero: {
    viewProjects: "Voir les projets",
    contactMe: "Me contacter",
    scrollToAbout: "Faire défiler jusqu’à la section « À propos »",
    snapshotTitle: "Profil en bref",
    specialization: "Spécialisation",
    education: "Formation",
    location: "Localisation",
    languages: "Langues",
    focusAreas: "Domaines d’expertise",
  },
  about: {
    label: "Profil professionnel",
    title: "Informatique et réseaux : un profil d’ingénierie",
    description:
      "Spécialisation en cybersécurité et infrastructure réseau au sein du cycle d’ingénieur, appuyée par des travaux appliqués en sécurité, réseaux, systèmes et développement logiciel.",
    focusTitle: "Domaines d’expertise",
    languagesTitle: "Langues",
    interestsTitle: "Centres d’intérêt",
  },
  skills: {
    label: "Profil technique",
    title: "Compétences, protocoles, outils et technologies",
    description:
      "Chaque notion technique est classée selon son rôle professionnel et reliée aux projets qui la démontrent.",
    categoriesLabel: "Catégories de compétences",
    evidence: (count: number) =>
      count === 1 ? "Mis en œuvre dans 1 projet" : `Mis en œuvre dans ${count} projets`,
    foundation: "Acquis académiques et en laboratoire",
  },
  projects: {
    label: "Projets",
    homeTitle: "Travaux techniques sélectionnés",
    homeDescription:
      "D’abord les projets de sécurité et d’infrastructure, puis les travaux de développement logiciel complémentaires.",
    viewAll: "Voir tout",
    viewAllMobile: "Voir tous les projets",
    pageTitle: "Tous les projets",
    pageDescription:
      "Travaux académiques, en laboratoire et en entreprise, en sécurité, réseaux et développement web complémentaire.",
    filterLabel: "Filtrer les projets par catégorie",
    filterCount: (count: number) => `${count}`,
    emptyState: "Aucun projet ne correspond à ce filtre.",
    emptyStateHint: "Sélectionnez une autre catégorie pour afficher les autres projets.",
  },
  project: {
    back: "Tous les projets",
    technologies: "Technologies, outils et protocoles",
    overview: "Vue d’ensemble",
    problem: "Problématique",
    objective: "Objectif",
    architecture: "Contexte technique",
    implementation: "Mise en œuvre",
    security: "Considérations de sécurité",
    challenges: "Défis techniques",
    results: "Résultats",
    notFoundTitle: "Projet introuvable",
    notFoundDescription:
      "Ce projet n’existe pas ou n’est plus publié.",
    notFoundCta: "Retour à tous les projets",
  },
  categories: {
    all: "Tous",
    cybersecurity: "Cybersécurité",
    networking: "Réseaux",
    fullstack: "Full-Stack",
    systems: "Systèmes",
  },
  experience: {
    label: "Expérience",
    title: "Parcours professionnel",
    description: "Stages et travaux d’ingénierie appliquée.",
    contextTitle: "Contexte",
    responsibilitiesTitle: "Missions",
    technologiesTitle: "Technologies et outils",
  },
  education: {
    label: "Formation",
    title: "Parcours académique",
    description: "Formation académique et cursus d’ingénierie.",
    ongoing: "En cours",
    completed: "Terminé",
  },
  contact: {
    label: "Contact",
    title: "Me contacter",
    description:
      "Pour toute demande professionnelle, échange sur un projet ou proposition de collaboration, écrivez-moi directement.",
    emailLabel: "E-mail",
    phoneLabel: "Téléphone",
    locationLabel: "Localisation",
    copyEmail: "Copier l’adresse e-mail",
    copied: "Adresse e-mail copiée dans le presse-papiers",
    copyFailed: "Copie impossible — veuillez sélectionner l’adresse manuellement.",
    mailtoSubject: "Demande via le portfolio",
    openMailClient: "Écrire un e-mail",
  },
  footer: {
    navigationTitle: "Navigation",
    contactTitle: "Contact",
    builtWith: "Conçu avec Next.js et TypeScript.",
    rights: "Tous droits réservés.",
  },
  notFound: {
    code: "404",
    title: "Page introuvable",
    description: "La page recherchée n’existe pas ou a été déplacée.",
    cta: "Retour à l’accueil",
  },
  metadata: {
    siteName: "Achraf Sghiri — Portfolio",
    brandShort: "Achraf Sghiri",
    homeTitle: "Achraf Sghiri — Cybersécurité et infrastructure réseau",
    homeDescription:
      "Portfolio d’Achraf Sghiri, candidat ingénieur en informatique et réseaux, spécialisé en cybersécurité et infrastructure réseau.",
    projectsTitle: "Projets",
    projectsDescription:
      "Projets techniques d’Achraf Sghiri en cybersécurité, sécurité réseau et développement full-stack.",
    projectNotFoundTitle: "Projet introuvable",
    notFoundTitle: "Page introuvable",
  },
};

export const messagesByLocale: Record<Locale, Messages> = { en, fr };

export function getMessages(locale: Locale): Messages {
  return messagesByLocale[locale];
}
