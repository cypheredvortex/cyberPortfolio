import type { Locale } from "@/i18n/config";

export interface Education {
  id: string;
  degree: string;
  /** Proper nouns: identical in both locales. */
  institution: string;
  location: string;
  period: string;
  /** Language-independent status code driving the badge style. */
  status: "ongoing" | "completed";
  details?: string;
}

const en: Education[] = [
  {
    id: "msci-engineering",
    degree: "5th Year — Engineering Cycle in Computer Science & Networks",
    institution: "École Marocaine des Sciences et d’Ingénierie (EMSI)",
    location: "Rabat, Morocco",
    period: "2022 – Present",
    status: "ongoing",
    details: "Specialization in cybersecurity and network infrastructure.",
  },
  {
    id: "baccalaureate",
    degree: "Baccalauréat in Mathematical Sciences B",
    institution: "Institut Ben M’Barek",
    location: "Morocco",
    period: "2022",
    status: "completed",
  },
];

const fr: Education[] = [
  {
    id: "msci-engineering",
    degree: "5e année — Cycle d’ingénieur en informatique et réseaux",
    institution: "École Marocaine des Sciences et d’Ingénierie (EMSI)",
    location: "Rabat, Maroc",
    period: "2022 – aujourd’hui",
    status: "ongoing",
    details: "Spécialisation en cybersécurité et infrastructure réseau.",
  },
  {
    id: "baccalaureate",
    degree: "Baccalauréat en sciences mathématiques B",
    institution: "Institut Ben M’Barek",
    location: "Maroc",
    period: "2022",
    status: "completed",
  },
];

export const educationByLocale: Record<Locale, Education[]> = { en, fr };

export function getEducation(locale: Locale): Education[] {
  return educationByLocale[locale];
}
