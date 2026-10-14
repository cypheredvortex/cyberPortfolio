import type { Locale } from "@/i18n/config";

export interface SkillItem {
  name: string;
  classification: string;
  /** Project slugs that demonstrate the item, if any. */
  evidence?: readonly string[];
}

export interface SkillCategory {
  /** Stable identifier used for selection state, independent of locale. */
  id: string;
  name: string;
  description: string;
  items: readonly SkillItem[];
}

export interface LanguageSkill {
  name: string;
  level: string;
}

const en: SkillCategory[] = [
  {
    id: "engineering",
    name: "Engineering competencies",
    description:
      "Applied technical competencies supported by internship, academic, and laboratory work.",
    items: [
      {
        name: "Network security analysis",
        classification: "Competency",
        evidence: ["mitm-vpn", "soc-sim"],
      },
      {
        name: "Network monitoring and baseline comparison",
        classification: "Competency",
        evidence: ["net-supervision"],
      },
      {
        name: "Intrusion detection and log analysis",
        classification: "Competency",
        evidence: ["soc-sim"],
      },
      {
        name: "Quantitative ICS risk assessment",
        classification: "Competency",
        evidence: ["ics-risk-framework"],
      },
      {
        name: "Frontend and backend web application development",
        classification: "Competency",
        evidence: ["ics-risk-framework", "elearning", "stock-app"],
      },
      {
        name: "Linux and network administration",
        classification: "Competency",
      },
    ],
  },
  {
    id: "protocols",
    name: "Protocols & infrastructure",
    description:
      "Protocol and infrastructure knowledge applied in networking and security labs.",
    items: [
      {
        name: "TCP/IP, static routing, ARP, and IP forwarding",
        classification: "Networking protocols and concepts",
      },
      {
        name: "IPsec / ESP and IKEv2",
        classification: "VPN and security protocols",
        evidence: ["mitm-vpn"],
      },
      {
        name: "Linux: Kali, Ubuntu Server, and Lubuntu",
        classification: "Operating-system environments",
      },
      {
        name: "Netplan and cron",
        classification: "System configuration and scheduling",
      },
      {
        name: "VirtualBox",
        classification: "Type-2 hypervisor",
        evidence: ["mitm-vpn"],
      },
    ],
  },
  {
    id: "tooling",
    name: "Security & network tooling",
    description:
      "Tools used to observe traffic, detect events, scan services, and support lab exercises.",
    items: [
      {
        name: "Wireshark",
        classification: "Network protocol analyzer",
        evidence: ["mitm-vpn"],
      },
      {
        name: "Nmap",
        classification: "Network discovery and security-auditing tool",
        evidence: ["soc-sim", "net-supervision"],
      },
      {
        name: "Snort",
        classification: "Network intrusion detection system",
        evidence: ["soc-sim"],
      },
      {
        name: "Filebeat",
        classification: "Log shipper",
        evidence: ["soc-sim"],
      },
      {
        name: "Elasticsearch, Logstash, and Kibana",
        classification: "Search, log-processing, and visualization stack",
        evidence: ["soc-sim"],
      },
      {
        name: "StrongSwan and hping3",
        classification: "IPsec implementation and packet-crafting tool",
        evidence: ["mitm-vpn"],
      },
    ],
  },
  {
    id: "software",
    name: "Software technologies",
    description:
      "Languages, frameworks, libraries, runtimes, and data stores used in application projects.",
    items: [
      {
        name: "Python, JavaScript, Bash, and SQL",
        classification: "Programming, scripting, and query languages",
      },
      {
        name: "React",
        classification: "JavaScript UI library",
        evidence: ["ics-risk-framework", "elearning"],
      },
      {
        name: "FastAPI and Django",
        classification: "Python web frameworks",
        evidence: ["ics-risk-framework", "stock-app"],
      },
      {
        name: "Express and Node.js",
        classification: "Web framework and JavaScript runtime",
        evidence: ["elearning"],
      },
      {
        name: "TypeScript",
        classification: "Typed JavaScript language",
        evidence: ["ics-risk-framework"],
      },
      {
        name: "SQLAlchemy",
        classification: "Python SQL toolkit and ORM",
        evidence: ["ics-risk-framework"],
      },
      {
        name: "MongoDB, MySQL, and SQLite",
        classification: "Database management systems",
        evidence: ["ics-risk-framework", "elearning", "stock-app"],
      },
    ],
  },
];

const fr: SkillCategory[] = [
  {
    id: "engineering",
    name: "Compétences d’ingénierie",
    description:
      "Compétences techniques appliquées, acquises en stage, en formation et en laboratoire.",
    items: [
      {
        name: "Analyse de la sécurité réseau",
        classification: "Compétence",
        evidence: ["mitm-vpn", "soc-sim"],
      },
      {
        name: "Supervision réseau et comparaison à une référence",
        classification: "Compétence",
        evidence: ["net-supervision"],
      },
      {
        name: "Détection d’intrusion et analyse des journaux",
        classification: "Compétence",
        evidence: ["soc-sim"],
      },
      {
        name: "Évaluation quantitative du risque ICS",
        classification: "Compétence",
        evidence: ["ics-risk-framework"],
      },
      {
        name: "Développement d’applications web front-end et back-end",
        classification: "Compétence",
        evidence: ["ics-risk-framework", "elearning", "stock-app"],
      },
      {
        name: "Administration Linux et réseau",
        classification: "Compétence",
      },
    ],
  },
  {
    id: "protocols",
    name: "Protocoles et infrastructure",
    description:
      "Connaissances des protocoles et de l’infrastructure mises en pratique dans les travaux de réseaux et de sécurité.",
    items: [
      {
        name: "TCP/IP, routage statique, ARP et transfert IP",
        classification: "Protocoles et concepts réseaux",
      },
      {
        name: "IPsec / ESP et IKEv2",
        classification: "Protocoles VPN et de sécurité",
        evidence: ["mitm-vpn"],
      },
      {
        name: "Linux : Kali, Ubuntu Server et Lubuntu",
        classification: "Environnements systèmes",
      },
      {
        name: "Netplan et cron",
        classification: "Configuration système et planification",
      },
      {
        name: "VirtualBox",
        classification: "Hyperviseur de type 2",
        evidence: ["mitm-vpn"],
      },
    ],
  },
  {
    id: "tooling",
    name: "Outils de sécurité et de réseau",
    description:
      "Outils utilisés pour observer le trafic, détecter des événements, scanner des services et appuyer les travaux pratiques.",
    items: [
      {
        name: "Wireshark",
        classification: "Analyseur de protocoles réseau",
        evidence: ["mitm-vpn"],
      },
      {
        name: "Nmap",
        classification: "Outil de découverte réseau et d’audit de sécurité",
        evidence: ["soc-sim", "net-supervision"],
      },
      {
        name: "Snort",
        classification: "Système de détection d’intrusion réseau",
        evidence: ["soc-sim"],
      },
      {
        name: "Filebeat",
        classification: "Collecteur et expéditeur de journaux",
        evidence: ["soc-sim"],
      },
      {
        name: "Elasticsearch, Logstash et Kibana",
        classification:
          "Pile de recherche, de traitement des journaux et de visualisation",
        evidence: ["soc-sim"],
      },
      {
        name: "StrongSwan et hping3",
        classification: "Implémentation IPsec et outil de forge de paquets",
        evidence: ["mitm-vpn"],
      },
    ],
  },
  {
    id: "software",
    name: "Technologies logicielles",
    description:
      "Langages, frameworks, bibliothèques, environnements d’exécution et bases de données utilisés dans les projets applicatifs.",
    items: [
      {
        name: "Python, JavaScript, Bash et SQL",
        classification: "Langages de programmation, de script et de requête",
      },
      {
        name: "React",
        classification: "Bibliothèque d’interface JavaScript",
        evidence: ["ics-risk-framework", "elearning"],
      },
      {
        name: "FastAPI et Django",
        classification: "Frameworks web Python",
        evidence: ["ics-risk-framework", "stock-app"],
      },
      {
        name: "Express et Node.js",
        classification: "Framework web et environnement d’exécution JavaScript",
        evidence: ["elearning"],
      },
      {
        name: "TypeScript",
        classification: "Langage JavaScript typé",
        evidence: ["ics-risk-framework"],
      },
      {
        name: "SQLAlchemy",
        classification: "Boîte à outils SQL et ORM Python",
        evidence: ["ics-risk-framework"],
      },
      {
        name: "MongoDB, MySQL et SQLite",
        classification: "Systèmes de gestion de bases de données",
        evidence: ["ics-risk-framework", "elearning", "stock-app"],
      },
    ],
  },
];

const languagesEn: LanguageSkill[] = [
  { name: "Arabic", level: "Native" },
  { name: "French", level: "Professional" },
  { name: "English", level: "Professional" },
];

const languagesFr: LanguageSkill[] = [
  { name: "Arabe", level: "Langue maternelle" },
  { name: "Français", level: "Professionnel" },
  { name: "Anglais", level: "Professionnel" },
];

export const skillCategoriesByLocale: Record<Locale, SkillCategory[]> = {
  en,
  fr,
};

export const languagesByLocale: Record<Locale, LanguageSkill[]> = {
  en: languagesEn,
  fr: languagesFr,
};

export function getSkillCategories(locale: Locale): SkillCategory[] {
  return skillCategoriesByLocale[locale];
}

export function getLanguages(locale: Locale): LanguageSkill[] {
  return languagesByLocale[locale];
}
