"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedSection from "@/components/AnimatedSection";
import SectionHeader from "@/components/SectionHeader";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import type { Project } from "@/data/projects";

const categories: { value: Project["category"] | "all"; label: string }[] = [
  { value: "all", label: "All Projects" },
  { value: "cybersecurity", label: "Cybersecurity" },
  { value: "fullstack", label: "Full-Stack" },
  { value: "networking", label: "Networking" },
];

export default function ProjectsPageClient() {
  const [activeCategory, setActiveCategory] = useState<
    Project["category"] | "all"
  >("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Projects"
            title="Project evidence"
            description="Academic, lab, and internship work across security, networks, and supporting web development."
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  "px-3 py-1.5 text-sm font-medium rounded-md transition-colors",
                  activeCategory === cat.value
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent"
                )}
              >
                {cat.label}
                <span className="ml-1.5 text-xs text-muted-foreground">
                  ({
                    cat.value === "all"
                      ? projects.length
                      : projects.filter((p) => p.category === cat.value).length
                  })
                </span>
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 0.06}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
