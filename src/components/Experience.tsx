"use client";

import { Briefcase, MapPin } from "lucide-react";
import { container, sectionSpacing } from "@/lib/styles";
import { useI18n } from "@/i18n/LocaleProvider";
import { getExperiences } from "@/data/experience";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";

export default function Experience() {
  const { locale, messages } = useI18n();
  const experiences = getExperiences(locale);

  return (
    <section id="experience" className={`${sectionSpacing} relative`}>
      <div className={container}>
        <AnimatedSection>
          <SectionHeader
            label={messages.experience.label}
            title={messages.experience.title}
            description={messages.experience.description}
          />
        </AnimatedSection>

        <ol className="relative mt-12 space-y-5">
          <span
            aria-hidden="true"
            className="absolute bottom-10 left-[1.4rem] top-10 hidden w-px bg-gradient-to-b from-primary/45 via-border to-transparent sm:block"
          />

          {experiences.map((experience, index) => (
            <li key={experience.id}>
              <AnimatedSection delay={index * 0.08}>
                <article className="relative flex gap-4 sm:gap-5">
                  <span
                    aria-hidden="true"
                    className="relative z-10 mt-6 hidden h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/25 bg-card shadow-panel sm:grid"
                  >
                    <Briefcase size={17} className="text-primary-light" />
                  </span>

                  <div className="panel panel-glow w-full p-5 sm:p-6">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
                          {experience.role}
                        </h3>
                        <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                          <span className="text-primary-light">
                            {experience.company}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-faint">
                            <MapPin size={12} aria-hidden="true" />
                            {experience.location}
                          </span>
                        </p>
                      </div>
                      <span className="chip shrink-0 self-start">
                        {experience.period}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-medium leading-relaxed text-foreground/90">
                      {experience.description}
                    </p>

                    <p className="mt-4 flex flex-col gap-1.5 text-sm leading-relaxed text-muted-foreground">
                      <span className="mono-label text-faint">
                        {messages.experience.contextTitle}
                      </span>
                      {experience.context}
                    </p>

                    <div className="mt-5 border-t border-border/70 pt-4">
                      <h4 className="mono-label text-faint">
                        {messages.experience.responsibilitiesTitle}
                      </h4>
                      <ul className="mt-3 space-y-2">
                        {experience.responsibilities.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
                          >
                            <span
                              aria-hidden="true"
                              className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-primary/70"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-5">
                      <h4 className="mono-label text-faint">
                        {messages.experience.technologiesTitle}
                      </h4>
                      <ul className="mt-3 flex flex-wrap gap-1.5">
                        {experience.technologies.map((technology) => (
                          <li key={technology} className="chip">
                            {technology}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              </AnimatedSection>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
