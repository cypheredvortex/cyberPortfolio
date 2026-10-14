"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { containerNarrow, sectionSpacing, buttonClasses } from "@/lib/styles";
import { categoryBadge } from "@/lib/categoryStyles";
import { useI18n } from "@/i18n/LocaleProvider";
import { getProjectBySlug } from "@/data/projects";
import AnimatedSection from "@/components/AnimatedSection";

interface DisclosureProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Disclosure({ title, children, defaultOpen = false }: DisclosureProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const reduceMotion = useReducedMotion();

  return (
    <div className="panel overflow-hidden">
      <h2>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-card-hover"
        >
          <span className="font-display text-[0.9375rem] font-semibold tracking-tight text-foreground">
            {title}
          </span>
          <span
            aria-hidden="true"
            className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-border bg-muted/50 text-muted-foreground"
          >
            <ChevronDown
              size={14}
              className={cn(
                "transition-transform duration-300",
                open && "rotate-180"
              )}
            />
          </span>
        </button>
      </h2>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            key="content"
            initial={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            animate={reduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-5 py-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function BulletList({ items }: { items: readonly string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground"
        >
          <span
            aria-hidden="true"
            className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70"
          />
          {item}
        </li>
      ))}
    </ul>
  );
}

export default function ProjectDetailClient({ slug }: { slug: string }) {
  const { locale, messages } = useI18n();
  const project = getProjectBySlug(locale, slug);

  if (!project) {
    // The route already 404s for unknown slugs; this keeps the component safe if
    // a locale dataset ever diverges.
    return (
      <div className={`${sectionSpacing} ${containerNarrow}`}>
        <div className="panel p-10 text-center">
          <h1 className="font-display text-2xl font-semibold text-foreground">
            {messages.project.notFoundTitle}
          </h1>
          <p className="mt-3 text-sm text-muted-foreground">
            {messages.project.notFoundDescription}
          </p>
          <Link href="/projects" className={`${buttonClasses("primary")} mt-6`}>
            {messages.project.notFoundCta}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`${sectionSpacing} relative`}>
      <div className={containerNarrow}>
        <AnimatedSection>
          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft
              size={14}
              aria-hidden="true"
              className="transition-transform duration-300 group-hover:-translate-x-0.5"
            />
            {messages.project.back}
          </Link>

          <header className="mt-8">
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] font-medium",
                categoryBadge[project.category]
              )}
            >
              {messages.categories[project.category]}
            </span>
            <h1 className="mt-5 font-display text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl">
              {project.title}
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {project.subtitle}
            </p>
          </header>
        </AnimatedSection>

        <AnimatedSection delay={0.08} className="mt-10">
          <div className="panel p-5">
            <h2 className="mono-label text-primary-light">
              {messages.project.technologies}
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((technology) => (
                <li
                  key={technology}
                  className="rounded-md border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs text-primary-light"
                >
                  {technology}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.12} className="mt-4">
          <div className="panel p-5">
            <h2 className="mono-label text-primary-light">
              {messages.project.overview}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {project.overview}
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.16} className="mt-4 space-y-3">
          <Disclosure title={messages.project.problem} defaultOpen>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.problem}
            </p>
          </Disclosure>

          <Disclosure title={messages.project.objective} defaultOpen>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.objective}
            </p>
          </Disclosure>

          <Disclosure title={messages.project.architecture}>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {project.architecture}
            </p>
          </Disclosure>

          <Disclosure title={messages.project.implementation} defaultOpen>
            <BulletList items={project.implementation} />
          </Disclosure>

          {project.securityConsiderations &&
            project.securityConsiderations.length > 0 && (
              <Disclosure title={messages.project.security}>
                <BulletList items={project.securityConsiderations} />
              </Disclosure>
            )}

          {project.challenges && project.challenges.length > 0 && (
            <Disclosure title={messages.project.challenges}>
              <BulletList items={project.challenges} />
            </Disclosure>
          )}

          {project.results && project.results.length > 0 && (
            <Disclosure title={messages.project.results} defaultOpen>
              <BulletList items={project.results} />
            </Disclosure>
          )}
        </AnimatedSection>

        <AnimatedSection delay={0.2} className="mt-10">
          <Link href="/projects" className={buttonClasses("secondary")}>
            <ArrowLeft size={14} aria-hidden="true" />
            {messages.project.back}
          </Link>
        </AnimatedSection>
      </div>
    </div>
  );
}
