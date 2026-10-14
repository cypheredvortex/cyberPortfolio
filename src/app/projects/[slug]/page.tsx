import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getProjectSlugs } from "@/data/projects";
import { DEFAULT_LOCALE } from "@/i18n/config";
import { getMessages } from "@/i18n/messages";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Server metadata always reflects the default locale; the client keeps the
  // document title and description in sync when another locale is active.
  const project = getProjectBySlug(DEFAULT_LOCALE, slug);

  if (!project) {
    return { title: getMessages(DEFAULT_LOCALE).metadata.projectNotFoundTitle };
  }

  return {
    title: project.title,
    description: project.subtitle,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: `${project.title} | Achraf Sghiri`,
      description: project.subtitle,
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const exists = getProjectBySlug(DEFAULT_LOCALE, slug);

  if (!exists) {
    notFound();
  }

  return <ProjectDetailClient slug={slug} />;
}
