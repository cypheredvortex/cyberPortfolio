"use client";

import { Briefcase } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { experiences } from "@/data/experience";

export default function Experience() {
  return (
    <section id="experience" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Experience"
            title="Professional Background"
            description="Internships and applied engineering work."
          />
        </AnimatedSection>

        <div className="space-y-8">
          {experiences.map((exp, i) => (
            <AnimatedSection key={exp.id} delay={i * 0.1}>
              <article className="relative p-6 rounded-xl border border-border bg-card hover:border-primary/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase size={18} className="text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">
                          {exp.role}
                        </h3>
                        <p className="text-sm text-primary">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs font-mono text-muted-foreground shrink-0">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {exp.context}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        What I Did
                      </h4>
                      <ul className="space-y-1.5">
                        {exp.responsibilities.map((resp, j) => (
                          <li
                            key={j}
                            className="flex items-start gap-2 text-sm text-muted-foreground"
                          >
                            <span className="mt-1.5 h-1 w-1 rounded-full bg-primary/60 shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-foreground uppercase tracking-wider mb-2">
                        Technologies & Tools
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {exp.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-xs font-mono text-muted-foreground bg-muted rounded"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
