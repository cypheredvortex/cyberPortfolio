"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Project } from "@/data/projects";

function CollapsibleSection({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-card-hover transition-colors"
      >
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        <ChevronDown
          size={16}
          className={cn(
            "text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      {open && <div className="px-4 pb-4 border-t border-border pt-4">{children}</div>}
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2.5 text-sm text-muted-foreground leading-relaxed"
        >
          <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary/60 shrink-0" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetailClient({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="space-y-6">
      {/* Tech stack */}
      <div className="p-5 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Technologies, Tools & Protocols
        </h3>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm font-mono text-primary bg-primary/10 border border-primary/20 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Overview */}
      <div className="p-5 rounded-xl border border-border bg-card">
        <h3 className="text-sm font-semibold text-foreground mb-3">Overview</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.overview}
        </p>
      </div>

      {/* Collapsible detailed sections */}
      <CollapsibleSection title="Problem Statement" defaultOpen>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.problem}
        </p>
      </CollapsibleSection>

      <CollapsibleSection title="Objective" defaultOpen>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.objective}
        </p>
      </CollapsibleSection>

      <CollapsibleSection title="Technical Context">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {project.architecture}
        </p>
      </CollapsibleSection>

      <CollapsibleSection title="Implementation Details" defaultOpen>
        <BulletList items={project.implementation} />
      </CollapsibleSection>

      {project.securityConsiderations && project.securityConsiderations.length > 0 && (
        <CollapsibleSection title="Security Considerations">
          <BulletList items={project.securityConsiderations} />
        </CollapsibleSection>
      )}

      {project.challenges && project.challenges.length > 0 && (
        <CollapsibleSection title="Technical Challenges">
          <BulletList items={project.challenges} />
        </CollapsibleSection>
      )}

      {project.results && project.results.length > 0 && (
        <CollapsibleSection title="Results" defaultOpen>
          <BulletList items={project.results} />
        </CollapsibleSection>
      )}
    </div>
  );
}
