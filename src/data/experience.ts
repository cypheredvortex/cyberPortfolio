import type { Locale } from "@/i18n/config";

export interface Experience {
  id: string;
  role: string;
  /** Proper noun: identical in both locales. */
  company: string;
  location: string;
  period: string;
  /** One-line summary shown under the role. */
  description: string;
  responsibilities: readonly string[];
  /** Technology names: identical in both locales. */
  technologies: readonly string[];
  context: string;
}

const en: Experience[] = [
  {
    id: "jesa-ics",
    role: "Intern — ICS Risk Assessment",
    company: "JESA SA",
    location: "Morocco",
    period: "Year-end internship",
    context:
      "Academic internship focused on a generic framework for quantitative risk assessment of Industrial Control Systems (ICS) using Bayesian networks.",
    description:
      "Developed a full-stack framework for quantitative ICS risk assessment.",
    responsibilities: [
      "Developed a generic framework for quantitative ICS risk assessment based on Bayesian networks",
      "Contributed to the React and TypeScript interface",
      "Used Python and FastAPI for the application backend",
      "Worked with SQLAlchemy 2.0 and SQLite for data persistence",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "SQLAlchemy 2.0",
      "SQLite",
    ],
  },
  {
    id: "dcp-reporting",
    role: "Intern — Reporting Module",
    company: "Direction de la Concurrence, des Prix et de la Compensation",
    location: "Morocco",
    period: "Year-end internship",
    context:
      "Academic internship contributing to the reporting part of an office-supplies order-management application.",
    description:
      "Developed the reporting component of an internal order-management application.",
    responsibilities: [
      "Developed the reporting part of the office-supplies order-management application",
      "Worked with PHP, MySQL, JavaScript, HTML, and CSS",
      "Used Python and Django in the application environment",
    ],
    technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Python", "Django"],
  },
];

const fr: Experience[] = [
  {
    id: "jesa-ics",
    role: "Stagiaire — Évaluation du risque ICS",
    company: "JESA SA",
    location: "Maroc",
    period: "Stage de fin d’année",
    context:
      "Stage académique consacré à un cadre générique d’évaluation quantitative du risque des systèmes de contrôle industriels (ICS) fondé sur les réseaux bayésiens.",
    description:
      "Développement d’un cadre full-stack pour l’évaluation quantitative du risque ICS.",
    responsibilities: [
      "Développement d’un cadre générique d’évaluation quantitative du risque ICS fondé sur les réseaux bayésiens",
      "Contribution à l’interface React et TypeScript",
      "Utilisation de Python et FastAPI pour le backend de l’application",
      "Mise en œuvre de SQLAlchemy 2.0 et SQLite pour la persistance des données",
    ],
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "SQLAlchemy 2.0",
      "SQLite",
    ],
  },
  {
    id: "dcp-reporting",
    role: "Stagiaire — Module de reporting",
    company: "Direction de la Concurrence, des Prix et de la Compensation",
    location: "Maroc",
    period: "Stage de fin d’année",
    context:
      "Stage académique ayant contribué à la partie reporting d’une application de gestion des commandes de fournitures de bureau.",
    description:
      "Développement du composant de reporting d’une application interne de gestion des commandes.",
    responsibilities: [
      "Développement de la partie reporting de l’application de gestion des commandes de fournitures de bureau",
      "Travail avec PHP, MySQL, JavaScript, HTML et CSS",
      "Utilisation de Python et Django dans l’environnement applicatif",
    ],
    technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Python", "Django"],
  },
];

export const experiencesByLocale: Record<Locale, Experience[]> = { en, fr };

export function getExperiences(locale: Locale): Experience[] {
  return experiencesByLocale[locale];
}
