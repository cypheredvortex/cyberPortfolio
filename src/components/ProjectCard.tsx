"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";

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

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/projects/${project.slug}`} className="group block">
      <article className="relative h-full p-6 rounded-xl border border-border bg-card hover:bg-card-hover hover:border-primary/20 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium border ${categoryColors[project.category]}`}
          >
            {categoryLabels[project.category]}
          </span>
          <ArrowUpRight
            size={16}
            className="text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
          />
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-2">
          {project.subtitle}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs font-mono text-muted-foreground bg-muted rounded"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 4 && (
            <span className="px-2 py-0.5 text-xs font-mono text-muted-foreground bg-muted rounded">
              +{project.technologies.length - 4}
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
