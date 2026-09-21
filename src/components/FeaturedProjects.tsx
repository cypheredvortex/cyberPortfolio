"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";
import { getFeaturedProjects } from "@/data/projects";

export default function FeaturedProjects() {
  const featured = getFeaturedProjects();

  return (
    <section id="projects" className="py-24 sm:py-32 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-12">
            <SectionHeader
              label="Projects"
              title="Selected technical work"
              description="Security and infrastructure projects first, followed by supporting software-development work."
            />
            <Link
              href="/projects"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors shrink-0 mb-12"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featured.map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 0.08}>
              <ProjectCard project={project} />
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-8 sm:hidden text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            View all projects
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
