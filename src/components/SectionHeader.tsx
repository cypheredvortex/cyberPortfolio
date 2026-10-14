"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  /** Rendered on the right of the heading row (links, controls). */
  actions?: React.ReactNode;
  /** Heading level: page-level sections use an `h1`. */
  as?: "h1" | "h2";
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  description,
  actions,
  as: Heading = "h2",
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        className
      )}
    >
      <div className="max-w-2xl">
        <span className="mono-label flex items-center gap-3 text-primary-light">
          <span
            aria-hidden="true"
            className="h-px w-7 bg-gradient-to-r from-transparent to-primary/70"
          />
          {label}
        </span>
        <Heading className="mt-4 font-display text-[1.75rem] font-semibold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
          {title}
        </Heading>
        {description && (
          <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
