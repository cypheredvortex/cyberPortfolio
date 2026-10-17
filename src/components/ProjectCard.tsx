"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { categoryBadge } from "@/lib/categoryStyles";
import { useI18n } from "@/i18n/LocaleProvider";
import type { Project } from "@/data/projects";
import TiltCard from "./TiltCard";

interface ProjectCardProps {
  project: Project;
  /** Position within the current list, used for the muted ordinal. */
  index?: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const { messages } = useI18n();

  return (
    <TiltCard className="h-full" maxTilt={5}>
      <Link
        href={`/projects/${project.slug}`}
        className="group block h-full rounded-[var(--radius-xl)] focus-visible:outline-offset-4"
      >
        <article className="panel panel-interactive panel-glow relative flex h-full min-w-0 flex-col p-5 sm:p-6">
          <span aria-hidden="true" className="sheen" />

          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span
                className={cn(
                  "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] font-medium",
                  categoryBadge[project.category]
                )}
              >
                {messages.categories[project.category]}
              </span>
              {typeof index === "number" && (
                <span
                  aria-hidden="true"
                  className="font-mono text-[0.6875rem] text-faint"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              )}
            </div>
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-muted/50 text-muted-foreground transition-all duration-300 group-hover:border-primary/50 group-hover:text-primary-light"
            >
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </span>
          </div>

          <h3 className="mt-5 font-display text-lg font-semibold leading-snug tracking-tight text-foreground transition-colors duration-300 group-hover:text-primary-light">
            {project.title}
          </h3>
          <p className="mb-6 mt-2.5 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.subtitle}
          </p>

          <div className="mt-auto flex flex-wrap gap-1.5 border-t border-border/70 pt-4">
            {project.technologies.slice(0, 4).map((technology) => (
              <span key={technology} className="chip">
                {technology}
              </span>
            ))}
            {project.technologies.length > 4 && (
              <span className="chip text-faint">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </article>
      </Link>
    </TiltCard>
  );
}
