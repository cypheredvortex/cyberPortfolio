"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { container, sectionSpacing, buttonClasses } from "@/lib/styles";
import { useI18n } from "@/i18n/LocaleProvider";
import { getFeaturedProjects } from "@/data/projects";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import ProjectCard from "./ProjectCard";

export default function FeaturedProjects() {
  const { locale, messages } = useI18n();
  const featured = getFeaturedProjects(locale);

  return (
    <section id="projects" className={`${sectionSpacing} relative`}>
      <div className={container}>
        <AnimatedSection>
          <SectionHeader
            label={messages.projects.label}
            title={messages.projects.homeTitle}
            description={messages.projects.homeDescription}
            actions={
              <Link
                href="/projects"
                className={buttonClasses("secondary", "hidden sm:inline-flex")}
              >
                {messages.projects.viewAll}
                <ArrowRight
                  size={14}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            }
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((project, index) => (
            <AnimatedSection
              key={project.slug}
              delay={index * 0.08}
              className="h-full min-w-0"
            >
              <ProjectCard project={project} index={index} />
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-8 sm:hidden">
          <Link
            href="/projects"
            className={buttonClasses("secondary", "w-full")}
          >
            {messages.projects.viewAllMobile}
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
