"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { container, sectionSpacing } from "@/lib/styles";
import { useI18n } from "@/i18n/LocaleProvider";
import { getProjects, type ProjectCategory } from "@/data/projects";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";

type Filter = ProjectCategory | "all";

const FILTERS: readonly Filter[] = [
  "all",
  "cybersecurity",
  "fullstack",
  "networking",
];

export default function ProjectsPageClient() {
  const { locale, messages } = useI18n();
  const projects = getProjects(locale);
  const [activeFilter, setActiveFilter] = useState<Filter>("all");

  const counts = useMemo(() => {
    const result = new Map<Filter, number>();
    FILTERS.forEach((filter) => {
      result.set(
        filter,
        filter === "all"
          ? projects.length
          : projects.filter((project) => project.category === filter).length
      );
    });
    return result;
  }, [projects]);

  const filtered =
    activeFilter === "all"
      ? projects
      : projects.filter((project) => project.category === activeFilter);

  return (
    <div className={`${sectionSpacing} relative`}>
      <div className={container}>
        <AnimatedSection>
          <SectionHeader
            as="h1"
            label={messages.projects.label}
            title={messages.projects.pageTitle}
            description={messages.projects.pageDescription}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div
            role="group"
            aria-label={messages.projects.filterLabel}
            className="mt-10 flex flex-wrap gap-2"
          >
            {FILTERS.map((filter) => {
              const selected = filter === activeFilter;
              const count = counts.get(filter) ?? 0;
              return (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setActiveFilter(filter)}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    selected
                      ? "border-primary/40 bg-primary/12 text-foreground"
                      : "border-transparent bg-muted/50 text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  {messages.categories[filter]}
                  <span
                    className={cn(
                      "font-mono text-[0.6875rem]",
                      selected ? "text-primary-light" : "text-faint"
                    )}
                  >
                    {messages.projects.filterCount(count)}
                  </span>
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        {filtered.length > 0 ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project, index) => (
              <AnimatedSection
                key={`${activeFilter}-${project.slug}`}
                delay={Math.min(index, 5) * 0.06}
                className="h-full min-w-0"
              >
                <ProjectCard project={project} index={index} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="panel mt-8 flex flex-col items-center gap-2 p-12 text-center">
            <Search size={20} className="text-faint" aria-hidden="true" />
            <p className="text-sm font-medium text-foreground">
              {messages.projects.emptyState}
            </p>
            <p className="text-sm text-muted-foreground">
              {messages.projects.emptyStateHint}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
