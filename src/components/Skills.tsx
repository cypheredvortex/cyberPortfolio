"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";
import { skillCategories } from "@/data/skills";

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].name);
  const current = skillCategories.find((category) => category.name === activeCategory)!;

  return (
    <section id="skills" className="py-24 sm:py-32 bg-card/30">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection><SectionHeader label="Technical profile" title="Competencies, protocols, tooling, and technologies" description="Technical concepts are classified by their professional role and linked to relevant project evidence." /></AnimatedSection>
        <AnimatedSection delay={0.1}>
          <div className="flex flex-wrap gap-2 mb-8 border-b border-border pb-4">
            {skillCategories.map((category) => <button key={category.name} onClick={() => setActiveCategory(category.name)} className={cn("px-3 py-1.5 text-sm font-medium rounded-md transition-colors", activeCategory === category.name ? "bg-primary/10 text-primary border border-primary/20" : "text-muted-foreground hover:text-foreground hover:bg-muted border border-transparent")}>{category.name}</button>)}
          </div>
        </AnimatedSection>
        <AnimatedSection key={activeCategory} delay={0.05}>
          <p className="mb-6 text-sm text-muted-foreground">{current.description}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {current.items.map((item) => <div key={item.name} className="p-3 rounded-lg border border-border bg-card"><span className="text-sm font-medium text-foreground block">{item.name}</span><span className="text-xs text-primary block mt-1">{item.classification}</span>{item.evidence?.length ? <span className="text-xs text-muted-foreground">Applied in {item.evidence.length} project{item.evidence.length > 1 ? "s" : ""}</span> : <span className="text-xs text-muted-foreground">Academic and lab foundation</span>}</div>)}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
