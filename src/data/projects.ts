import type { Locale } from "@/i18n/config";

export type ProjectCategory = "cybersecurity" | "fullstack" | "networking" | "systems";

export interface Project {
  /** URL segment: identical in every locale so language switching keeps the page. */
  slug: string;
  title: string;
  subtitle: string;
  /** Language-independent classification used for filters and badges. */
  category: ProjectCategory;
  tags: readonly string[];
  overview: string;
  problem: string;
  objective: string;
  architecture: string;
  /** Product, protocol, and library names: identical in every locale. */
  technologies: readonly string[];
  implementation: readonly string[];
  securityConsiderations?: readonly string[];
  challenges?: readonly string[];
  results?: readonly string[];
  featured: boolean;
}

const en: Project[] = [
  {
    slug: "ics-risk-framework",
    title: "ICS Risk Assessment Framework",
    subtitle: "Quantitative risk assessment for industrial control systems",
    category: "cybersecurity",
    tags: ["Bayesian Networks", "ICS", "React", "TypeScript", "Python", "FastAPI"],
    overview:
      "A generic framework for quantitative risk assessment of industrial control systems (ICS), developed during a year-end internship at JESA SA.",
    problem:
      "Assessing risk in industrial control systems requires a structured way to represent dependencies and uncertainty.",
    objective:
      "Develop a framework based on Bayesian networks for quantitative ICS risk assessment.",
    architecture:
      "A web application developed with React and TypeScript on the frontend, and Python with FastAPI on the backend. SQLAlchemy 2.0 and SQLite were used for data persistence.",
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "SQLAlchemy 2.0",
      "SQLite",
      "Bayesian Networks",
    ],
    implementation: [
      "Developed a generic quantitative ICS risk-assessment framework",
      "Used Bayesian networks to support the risk-assessment model",
      "Used React, TypeScript, Python, FastAPI, SQLAlchemy 2.0, and SQLite",
    ],
    securityConsiderations: [
      "Applied the framework to the cybersecurity risk-assessment context of industrial control systems",
    ],
    featured: true,
  },
  {
    slug: "mitm-vpn",
    title: "IPsec/IKEv2 VPN MITM Simulation",
    subtitle: "Controlled-lab network security analysis",
    category: "cybersecurity",
    tags: ["IPsec", "IKEv2", "StrongSwan", "ARP spoofing", "Wireshark", "hping3"],
    overview:
      "An academic simulation of a man-in-the-middle scenario involving an IPsec/IKEv2 VPN in a controlled lab environment.",
    problem:
      "The project examined VPN traffic and availability when ARP spoofing and IKE traffic flooding are introduced in a lab network.",
    objective:
      "Capture IKE and ESP traffic, observe ARP interception, and test the effect of traffic flooding on IKE over UDP port 500.",
    architecture:
      "A virtualized lab using StrongSwan to establish an IPsec/IKEv2 VPN, with Wireshark used for packet capture and analysis.",
    technologies: ["IPsec", "IKEv2", "StrongSwan", "Wireshark", "hping3", "ARP spoofing"],
    implementation: [
      "Performed ARP spoofing in the lab",
      "Captured IKE and ESP traffic",
      "Used hping3 for IKE traffic-flooding tests on UDP port 500",
      "Analyzed captured traffic with Wireshark",
    ],
    securityConsiderations: [
      "The work was performed as a controlled academic simulation",
      "Examined IPsec/IKEv2 traffic and VPN availability rather than claiming payload decryption",
    ],
    featured: true,
  },
  {
    slug: "soc-sim",
    title: "SOC Simulation: Log Detection and Correlation",
    subtitle: "Network intrusion detection and centralized log monitoring",
    category: "cybersecurity",
    tags: ["Snort", "Filebeat", "Elasticsearch", "Logstash", "Kibana", "Nmap"],
    overview:
      "A simulated SOC environment for detecting and correlating security logs using Snort, Filebeat, and the Elastic Stack.",
    problem:
      "Security monitoring requires collecting, correlating, and reviewing events from network detection and log sources.",
    objective:
      "Detect Nmap scans and SSH-related events, then visualize the resulting data in Kibana.",
    architecture:
      "Snort produces alerts; Filebeat forwards logs to the Elastic Stack, where Logstash processes them, Elasticsearch indexes them, and Kibana visualizes them.",
    technologies: ["Snort", "Filebeat", "Elasticsearch", "Logstash", "Kibana"],
    implementation: [
      "Configured Snort for network intrusion detection",
      "Used Filebeat and the Elastic Stack for log collection and processing",
      "Created Kibana dashboards",
      "Detected Nmap scans and SSH-related events",
    ],
    securityConsiderations: [
      "Focused on security-event detection, log correlation, and visualization",
    ],
    featured: true,
  },
  {
    slug: "net-supervision",
    title: "Network Security Supervision",
    subtitle: "Automated monitoring of exposed ports and services",
    category: "networking",
    tags: ["Python", "Nmap", "cron", "Linux"],
    overview:
      "A Python-based network supervision project that compares current Nmap scan results with a baseline to identify changes in exposed ports and services.",
    problem:
      "Changes in exposed ports and services can go unnoticed without repeated monitoring and a reference baseline.",
    objective:
      "Automate scans, compare baseline and current states, detect anomalies, and record results.",
    architecture:
      "Python scripts invoke Nmap and are scheduled with cron; comparison output and anomalies are recorded in logs.",
    technologies: ["Python", "Nmap", "cron", "Linux"],
    implementation: [
      "Automated port and service scans with Python and Nmap",
      "Compared baseline and current scan results",
      "Detected anomalies",
      "Recorded results in logs",
      "Scheduled execution with cron",
    ],
    featured: false,
  },
  {
    slug: "elearning",
    title: "E-Learning Platform",
    subtitle: "Full-stack web application using MERN",
    category: "fullstack",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    overview:
      "A full-stack e-learning web application developed with MongoDB, Express, React, and Node.js.",
    problem: "Provide an e-learning platform through a full-stack web application.",
    objective: "Develop an e-learning platform using the MERN stack.",
    architecture: "A MERN application using MongoDB, Express, React, and Node.js.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    implementation: [
      "Developed a full-stack e-learning platform with the MERN stack",
    ],
    featured: false,
  },
  {
    slug: "stock-app",
    title: "Stock Management Web Application",
    subtitle: "Inventory-management application using Django",
    category: "fullstack",
    tags: ["Django", "Python", "SQLite", "JavaScript", "HTML", "CSS"],
    overview:
      "A web application for stock management developed with Django, Python, SQLite, JavaScript, HTML, and CSS.",
    problem: "Provide a web application for managing stock.",
    objective: "Develop a stock-management web application with Django.",
    architecture:
      "A Django web application using SQLite, enhanced with JavaScript, HTML, and CSS.",
    technologies: ["Django", "Python", "SQLite", "JavaScript", "HTML", "CSS"],
    implementation: [
      "Developed a stock-management web application using Django, Python, SQLite, JavaScript, HTML, and CSS",
    ],
    featured: false,
  },
];

const fr: Project[] = [
  {
    slug: "ics-risk-framework",
    title: "Cadre d’évaluation du risque ICS",
    subtitle:
      "Évaluation quantitative du risque des systèmes de contrôle industriels",
    category: "cybersecurity",
    tags: ["Réseaux bayésiens", "ICS", "React", "TypeScript", "Python", "FastAPI"],
    overview:
      "Un cadre générique d’évaluation quantitative du risque des systèmes de contrôle industriels (ICS), développé lors d’un stage de fin d’année chez JESA SA.",
    problem:
      "L’évaluation du risque dans les systèmes de contrôle industriels exige une représentation structurée des dépendances et de l’incertitude.",
    objective:
      "Développer un cadre fondé sur les réseaux bayésiens pour l’évaluation quantitative du risque ICS.",
    architecture:
      "Une application web développée avec React et TypeScript côté front-end, et Python avec FastAPI côté back-end. SQLAlchemy 2.0 et SQLite assurent la persistance des données.",
    technologies: [
      "React",
      "TypeScript",
      "Python",
      "FastAPI",
      "SQLAlchemy 2.0",
      "SQLite",
      "Réseaux bayésiens",
    ],
    implementation: [
      "Développement d’un cadre générique d’évaluation quantitative du risque ICS",
      "Utilisation de réseaux bayésiens pour le modèle d’évaluation du risque",
      "Mise en œuvre de React, TypeScript, Python, FastAPI, SQLAlchemy 2.0 et SQLite",
    ],
    securityConsiderations: [
      "Application du cadre au contexte d’évaluation du risque de cybersécurité des systèmes de contrôle industriels",
    ],
    featured: true,
  },
  {
    slug: "mitm-vpn",
    title: "Simulation MITM d’un VPN IPsec/IKEv2",
    subtitle: "Analyse de sécurité réseau en laboratoire contrôlé",
    category: "cybersecurity",
    tags: ["IPsec", "IKEv2", "StrongSwan", "Usurpation ARP", "Wireshark", "hping3"],
    overview:
      "Une simulation académique d’un scénario d’interception (man-in-the-middle) visant un VPN IPsec/IKEv2, dans un environnement de laboratoire contrôlé.",
    problem:
      "Le projet a examiné le trafic et la disponibilité du VPN lors de l’introduction d’une usurpation ARP et d’une inondation de trafic IKE dans un réseau de laboratoire.",
    objective:
      "Capturer le trafic IKE et ESP, observer l’interception ARP et tester l’effet d’une inondation de trafic sur IKE via le port UDP 500.",
    architecture:
      "Un laboratoire virtualisé utilisant StrongSwan pour établir un VPN IPsec/IKEv2, avec Wireshark pour la capture et l’analyse des paquets.",
    technologies: ["IPsec", "IKEv2", "StrongSwan", "Wireshark", "hping3", "Usurpation ARP"],
    implementation: [
      "Réalisation d’une usurpation ARP en laboratoire",
      "Capture du trafic IKE et ESP",
      "Utilisation de hping3 pour les tests d’inondation du trafic IKE sur le port UDP 500",
      "Analyse du trafic capturé avec Wireshark",
    ],
    securityConsiderations: [
      "Travaux menés dans le cadre d’une simulation académique contrôlée",
      "Étude du trafic IPsec/IKEv2 et de la disponibilité du VPN, sans prétendre au déchiffrement des données utiles",
    ],
    featured: true,
  },
  {
    slug: "soc-sim",
    title: "Simulation de SOC : détection et corrélation des journaux",
    subtitle:
      "Détection d’intrusion réseau et supervision centralisée des journaux",
    category: "cybersecurity",
    tags: ["Snort", "Filebeat", "Elasticsearch", "Logstash", "Kibana", "Nmap"],
    overview:
      "Un environnement de SOC simulé pour détecter et corréler des journaux de sécurité à l’aide de Snort, Filebeat et de la pile Elastic.",
    problem:
      "La supervision de sécurité suppose de collecter, corréler et analyser les événements issus de la détection réseau et des sources de journaux.",
    objective:
      "Détecter les scans Nmap et les événements liés à SSH, puis visualiser les données obtenues dans Kibana.",
    architecture:
      "Snort génère les alertes ; Filebeat transmet les journaux à la pile Elastic, où Logstash les traite, Elasticsearch les indexe et Kibana les visualise.",
    technologies: ["Snort", "Filebeat", "Elasticsearch", "Logstash", "Kibana"],
    implementation: [
      "Configuration de Snort pour la détection d’intrusion réseau",
      "Utilisation de Filebeat et de la pile Elastic pour la collecte et le traitement des journaux",
      "Création de tableaux de bord Kibana",
      "Détection des scans Nmap et des événements liés à SSH",
    ],
    securityConsiderations: [
      "Travail centré sur la détection d’événements de sécurité, la corrélation des journaux et leur visualisation",
    ],
    featured: true,
  },
  {
    slug: "net-supervision",
    title: "Supervision de la sécurité réseau",
    subtitle: "Surveillance automatisée des ports et services exposés",
    category: "networking",
    tags: ["Python", "Nmap", "cron", "Linux"],
    overview:
      "Un projet de supervision réseau en Python qui compare les résultats d’un scan Nmap courant à une référence afin d’identifier les changements de ports et de services exposés.",
    problem:
      "Les changements de ports et de services exposés peuvent passer inaperçus sans surveillance répétée ni état de référence.",
    objective:
      "Automatiser les scans, comparer l’état de référence et l’état courant, détecter les anomalies et consigner les résultats.",
    architecture:
      "Des scripts Python appellent Nmap et sont planifiés avec cron ; les résultats de comparaison et les anomalies sont consignés dans des journaux.",
    technologies: ["Python", "Nmap", "cron", "Linux"],
    implementation: [
      "Automatisation des scans de ports et de services avec Python et Nmap",
      "Comparaison des résultats de scan de référence et courants",
      "Détection des anomalies",
      "Consignation des résultats dans des journaux",
      "Planification de l’exécution avec cron",
    ],
    featured: false,
  },
  {
    slug: "elearning",
    title: "Plateforme d’apprentissage en ligne",
    subtitle: "Application web full-stack avec la pile MERN",
    category: "fullstack",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    overview:
      "Une application web d’apprentissage en ligne full-stack développée avec MongoDB, Express, React et Node.js.",
    problem:
      "Fournir une plateforme d’apprentissage en ligne au moyen d’une application web full-stack.",
    objective: "Développer une plateforme d’apprentissage en ligne avec la pile MERN.",
    architecture:
      "Une application MERN reposant sur MongoDB, Express, React et Node.js.",
    technologies: ["MongoDB", "Express", "React", "Node.js"],
    implementation: [
      "Développement d’une plateforme d’apprentissage en ligne full-stack avec la pile MERN",
    ],
    featured: false,
  },
  {
    slug: "stock-app",
    title: "Application web de gestion de stock",
    subtitle: "Application de gestion des stocks avec Django",
    category: "fullstack",
    tags: ["Django", "Python", "SQLite", "JavaScript", "HTML", "CSS"],
    overview:
      "Une application web de gestion de stock développée avec Django, Python, SQLite, JavaScript, HTML et CSS.",
    problem: "Fournir une application web de gestion de stock.",
    objective: "Développer une application web de gestion de stock avec Django.",
    architecture:
      "Une application web Django utilisant SQLite, enrichie avec JavaScript, HTML et CSS.",
    technologies: ["Django", "Python", "SQLite", "JavaScript", "HTML", "CSS"],
    implementation: [
      "Développement d’une application web de gestion de stock avec Django, Python, SQLite, JavaScript, HTML et CSS",
    ],
    featured: false,
  },
];

export const projectsByLocale: Record<Locale, Project[]> = { en, fr };

/** Stable, locale-independent order used by filters and the sitemap. */
export const PROJECT_CATEGORIES = [
  "cybersecurity",
  "fullstack",
  "networking",
  "systems",
] as const satisfies readonly ProjectCategory[];

export function getProjects(locale: Locale): Project[] {
  return projectsByLocale[locale];
}

export function getProjectSlugs(): string[] {
  return projectsByLocale.en.map((project) => project.slug);
}

export function getProjectBySlug(
  locale: Locale,
  slug: string
): Project | undefined {
  return projectsByLocale[locale].find((project) => project.slug === slug);
}

export function getFeaturedProjects(locale: Locale): Project[] {
  return projectsByLocale[locale].filter((project) => project.featured);
}

export function getProjectsByCategory(
  locale: Locale,
  category: ProjectCategory | "all"
): Project[] {
  if (category === "all") return projectsByLocale[locale];
  return projectsByLocale[locale].filter(
    (project) => project.category === category
  );
}
