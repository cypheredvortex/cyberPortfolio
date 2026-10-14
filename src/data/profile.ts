import type { Locale } from "@/i18n/config";

export interface Profile {
  /** Proper noun: never translated. */
  name: string;
  firstName: string;
  lastName: string;
  /** Full professional title used in the hero and metadata. */
  title: string;
  /** Compact form of the specialisation, used in tight layouts. */
  titleShort: string;
  tagline: string;
  /** Contact details are language independent. */
  email: string;
  phone: string;
  location: string;
  summary: string;
  /** Supporting paragraphs rendered in the profile section. */
  paragraphs: readonly [string, string];
  focusAreas: readonly string[];
  educationShort: string;
  interests: readonly string[];
}

const shared = {
  name: "Achraf Sghiri",
  firstName: "Achraf",
  lastName: "Sghiri",
  email: "achrafsghiri240@gmail.com",
  phone: "+212 600466405",
} as const;

const en: Profile = {
  ...shared,
  title:
    "Computer Science & Networks Engineering Candidate | Cybersecurity & Network Infrastructure",
  titleShort: "Cybersecurity and network infrastructure",
  tagline:
    "Engineering-cycle candidate specializing in cybersecurity and network infrastructure.",
  location: "Rabat, Morocco",
  summary:
    "Engineering-cycle candidate in computer science and networks, specializing in cybersecurity and network infrastructure. Applied work includes IPsec/IKEv2 VPN traffic analysis, intrusion detection and log monitoring, network-service supervision, and quantitative ICS risk assessment. Supporting application-development experience includes React, FastAPI, Django, and MERN projects.",
  paragraphs: [
    "My cybersecurity work is academic and laboratory-based: I have examined IPsec/IKEv2 traffic in a controlled VPN attack simulation, built a SOC simulation with Snort and the Elastic Stack, and automated exposed-service monitoring with Python and Nmap.",
    "Full-stack projects support my primary specialization by demonstrating web-application development capability alongside cybersecurity and network-infrastructure work.",
  ],
  focusAreas: [
    "Network security and VPN analysis",
    "Intrusion detection and log monitoring",
    "Network and Linux infrastructure",
    "ICS risk assessment",
  ],
  educationShort: "Engineering cycle in Computer Science & Networks (EMSI)",
  interests: [
    "Geopolitics",
    "History",
    "Philosophy",
    "Combat sports",
    "Weight training",
  ],
};

const fr: Profile = {
  ...shared,
  title:
    "Candidat ingénieur en informatique et réseaux | Cybersécurité et infrastructure réseau",
  titleShort: "Cybersécurité et infrastructure réseau",
  tagline:
    "Candidat au cycle d’ingénieur, spécialisé en cybersécurité et infrastructure réseau.",
  location: "Rabat, Maroc",
  summary:
    "Candidat au cycle d’ingénieur en informatique et réseaux, spécialisé en cybersécurité et infrastructure réseau. Mes travaux appliqués portent sur l’analyse du trafic VPN IPsec/IKEv2, la détection d’intrusion et la supervision des journaux, la surveillance des services réseau et l’évaluation quantitative du risque des systèmes de contrôle industriels (ICS). En complément, mon expérience de développement d’applications couvre React, FastAPI, Django et la pile MERN.",
  paragraphs: [
    "Mes travaux en cybersécurité sont académiques et réalisés en laboratoire : j’ai analysé du trafic IPsec/IKEv2 dans une simulation contrôlée d’attaque sur VPN, construit une simulation de SOC avec Snort et la pile Elastic, et automatisé la surveillance des services exposés avec Python et Nmap.",
    "Les projets full-stack complètent ma spécialisation principale : ils démontrent une capacité de développement d’applications web en parallèle des travaux de cybersécurité et d’infrastructure réseau.",
  ],
  focusAreas: [
    "Sécurité réseau et analyse de VPN",
    "Détection d’intrusion et supervision des journaux",
    "Infrastructure réseau et Linux",
    "Évaluation du risque ICS",
  ],
  educationShort: "Cycle d’ingénieur en informatique et réseaux (EMSI)",
  interests: [
    "Géopolitique",
    "Histoire",
    "Philosophie",
    "Sports de combat",
    "Musculation",
  ],
};

export const profileByLocale: Record<Locale, Profile> = { en, fr };

export function getProfile(locale: Locale): Profile {
  return profileByLocale[locale];
}
