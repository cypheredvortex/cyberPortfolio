import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import type { Project } from "@/data/projects";
import type { Metadata } from "next";
import ProjectDetailClient from "./ProjectDetailClient";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return { title: "Project Not Found" };
  }

  return {
    title: project.title,
    description: project.subtitle,
    openGraph: {
      title: `${project.title} | Achraf Sghiri`,
      description: project.subtitle,
    },
  };
}

const categoryColors: Record<Project["category"], string> = {
  cybersecurity: "text-red-400 bg-red-400/10 border-red-400/20",
  networking: "text-cyan-400 bg-cyan-400/10 border-cyan-400/20",
  fullstack: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  systems: "text-amber-400 bg-amber-400/10 border-amber-400/20",
};

const categoryLabels: Record<Project["category"], string> = {
  cybersecurity: "Cybersecurity",
  networking: "Networking",
  fullstack: "Full-Stack",
  systems: "Systems",
};

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft size={14} />
          All Projects
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${categoryColors[project.category]}`}
            >
              {categoryLabels[project.category]}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground mb-3">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground">{project.subtitle}</p>
        </div>

        <ProjectDetailClient project={project} />
      </div>
    </div>
  );
}
