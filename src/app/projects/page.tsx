import type { Metadata } from "next";
import ProjectsPageClient from "./ProjectsPageClient";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";

const messages = getMessages(DEFAULT_LOCALE);

export const metadata: Metadata = {
  title: messages.metadata.projectsTitle,
  description: messages.metadata.projectsDescription,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: messages.metadata.projectsTitle,
    description: messages.metadata.projectsDescription,
  },
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
