export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  period: string;
  status: "ongoing" | "completed";
  details?: string;
}

export const education: Education[] = [
  {
    id: "msci-engineering",
    degree: "5th Year — Engineering Cycle in Computer Science & Networks",
    institution: "École Marocaine des Sciences et d'Ingénierie (EMSI)",
    location: "Rabat, Morocco",
    period: "2022 – Present",
    status: "ongoing",
    details:
      "Specialization in cybersecurity and network infrastructure.",
  },
  {
    id: "baccalaureate",
    degree: "Baccalauréat in Mathematical Sciences B",
    institution: "Institut Ben M'Barek",
    location: "Morocco",
    period: "2022",
    status: "completed",
  },
];
