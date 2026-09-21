import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Technical projects by Achraf Sghiri spanning cybersecurity, network security, and full-stack development.",
  openGraph: {
    title: "Projects | Achraf Sghiri",
    description:
      "Technical projects spanning cybersecurity, network security, and full-stack development.",
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
