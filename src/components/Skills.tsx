"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { container, sectionSpacing } from "@/lib/styles";
import { useI18n } from "@/i18n/LocaleProvider";
import { getSkillCategories } from "@/data/skills";
import { getProjects } from "@/data/projects";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";

export default function Skills() {
  const { locale, messages } = useI18n();
  const categories = getSkillCategories(locale);
  const projects = getProjects(locale);
  // Category ids are locale independent, so the selection survives a language
  // switch instead of resetting or pointing at a translated name.
  const [activeId, setActiveId] = useState(categories[0].id);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeIndex = Math.max(
    0,
    categories.findIndex((category) => category.id === activeId)
  );
  const current = categories[activeIndex] ?? categories[0];

  const focusTab = (index: number) => {
    setActiveId(categories[index].id);
    tabRefs.current[index]?.focus();
  };

  const onTabKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = categories.length - 1;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        focusTab(activeIndex === last ? 0 : activeIndex + 1);
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        focusTab(activeIndex === 0 ? last : activeIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        focusTab(0);
        break;
      case "End":
        event.preventDefault();
        focusTab(last);
        break;
      default:
        break;
    }
  };

  return (
    <section
      id="skills"
      className={`${sectionSpacing} relative border-y border-border bg-surface/40`}
    >
      <div className={container}>
        <AnimatedSection>
          <SectionHeader
            label={messages.skills.label}
            title={messages.skills.title}
            description={messages.skills.description}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div
            role="tablist"
            aria-label={messages.skills.categoriesLabel}
            className="mt-10 flex flex-wrap gap-2"
          >
            {categories.map((category, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={category.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`skill-tab-${category.id}`}
                  aria-selected={selected}
                  aria-controls={`skill-panel-${category.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveId(category.id)}
                  onKeyDown={onTabKeyDown}
                  className={cn(
                    "rounded-full border px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    selected
                      ? "border-primary/40 bg-primary/12 text-foreground"
                      : "border-transparent bg-muted/50 text-muted-foreground hover:border-border hover:text-foreground"
                  )}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </AnimatedSection>

        <div
          role="tabpanel"
          id={`skill-panel-${current.id}`}
          aria-labelledby={`skill-tab-${current.id}`}
          className="mt-8"
        >
          <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
            {current.description}
          </p>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {current.items.map((item, index) => {
              const related = (item.evidence ?? [])
                .map((slug) => projects.find((project) => project.slug === slug))
                .filter((project) => project !== undefined);

              return (
                <AnimatedSection
                  key={item.name}
                  delay={Math.min(index, 6) * 0.04}
                  className="h-full min-w-0"
                >
                  <div
                    className={cn(
                      "group flex h-full min-w-0 flex-col rounded-lg border border-border bg-card/80 p-4",
                      "transition-colors duration-300 hover:border-primary/35 hover:bg-card-hover"
                    )}
                  >
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-display text-[0.9375rem] font-semibold leading-snug text-foreground">
                      {item.name}
                    </h3>
                    <span
                      aria-hidden="true"
                      className="mt-1 font-mono text-[0.625rem] text-faint"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <p className="mt-2 font-mono text-[0.6875rem] leading-relaxed text-primary-light">
                    {item.classification}
                  </p>

                  {related.length > 0 ? (
                    <div className="mt-auto pt-4">
                      <p className="mono-label text-faint">
                        {messages.skills.evidence(related.length)}
                      </p>
                      <ul className="mt-2 flex flex-wrap gap-1.5">
                        {related.map((project) => (
                          <li key={project.slug}>
                            <Link
                              href={`/projects/${project.slug}`}
                              className="chip border-primary/25 text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
                            >
                              {project.title}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                    ) : (
                      <p className="mt-auto pt-4 font-mono text-[0.6875rem] text-faint">
                        {messages.skills.foundation}
                      </p>
                    )}
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
