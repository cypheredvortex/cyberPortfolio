"use client";

import { GraduationCap, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { container, sectionSpacing } from "@/lib/styles";
import { useI18n } from "@/i18n/LocaleProvider";
import { getEducation } from "@/data/education";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";

export default function Education() {
  const { locale, messages } = useI18n();
  const education = getEducation(locale);

  return (
    <section
      id="education"
      className={`${sectionSpacing} relative border-y border-border bg-surface/40`}
    >
      <div className={container}>
        <AnimatedSection>
          <SectionHeader
            label={messages.education.label}
            title={messages.education.title}
            description={messages.education.description}
          />
        </AnimatedSection>

        <div className="mt-12 space-y-4">
          {education.map((entry, index) => (
            <AnimatedSection key={entry.id} delay={index * 0.08}>
              <article className="panel panel-glow flex gap-4 p-5 sm:gap-5 sm:p-6">
                <span
                  aria-hidden="true"
                  className="mt-1 hidden h-11 w-11 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 sm:grid"
                >
                  <GraduationCap size={17} className="text-primary-light" />
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-display text-lg font-semibold leading-snug tracking-tight text-foreground">
                      {entry.degree}
                    </h3>
                    <span className="chip shrink-0 self-start">
                      {entry.period}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-primary-light">
                    {entry.institution}
                  </p>

                  <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm text-faint">
                    <MapPin size={12} aria-hidden="true" />
                    {entry.location}
                  </p>

                  {entry.details && (
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {entry.details}
                    </p>
                  )}

                  <p className="mt-4">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.6875rem]",
                        entry.status === "ongoing"
                          ? "border-[#34d399]/30 bg-[#34d399]/10 text-[#6ee7b7]"
                          : "border-border bg-muted/50 text-muted-foreground"
                      )}
                    >
                      {entry.status === "ongoing" && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 rounded-full bg-[#34d399]"
                        />
                      )}
                      {entry.status === "ongoing"
                        ? messages.education.ongoing
                        : messages.education.completed}
                    </span>
                  </p>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
