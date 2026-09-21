"use client";

import { GraduationCap } from "lucide-react";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { education } from "@/data/education";

export default function Education() {
  return (
    <section id="education" className="py-24 sm:py-32 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Education"
            title="Academic Background"
            description="My formal education and engineering training."
          />
        </AnimatedSection>

        <div className="space-y-6">
          {education.map((edu, i) => (
            <AnimatedSection key={edu.id} delay={i * 0.1}>
              <article className="relative p-6 rounded-xl border border-border bg-card hover:border-primary/20 transition-colors">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 mt-1">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <GraduationCap size={18} className="text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                      <h3 className="text-lg font-semibold text-foreground">
                        {edu.degree}
                      </h3>
                      <span className="text-xs font-mono text-muted-foreground shrink-0">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-sm text-primary mb-2">
                      {edu.institution}
                    </p>
                    {edu.details && (
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {edu.details}
                      </p>
                    )}
                    <div className="mt-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                          edu.status === "ongoing"
                            ? "bg-green-400/10 text-green-400 border border-green-400/20"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {edu.status === "ongoing" ? "In Progress" : "Completed"}
                      </span>
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
