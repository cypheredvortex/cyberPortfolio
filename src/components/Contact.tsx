"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import { container, sectionSpacing, buttonClasses } from "@/lib/styles";
import { useI18n } from "@/i18n/LocaleProvider";
import { getProfile } from "@/data/profile";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";

export default function Contact() {
  const { locale, messages } = useI18n();
  const profile = getProfile(locale);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");
  const resetTimer = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) window.clearTimeout(resetTimer.current);
    };
  }, []);

  const mailtoHref = `mailto:${profile.email}?subject=${encodeURIComponent(
    messages.contact.mailtoSubject
  )}`;
  const telHref = `tel:${profile.phone.replace(/[^+\d]/g, "")}`;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopyState("copied");
    } catch {
      setCopyState("failed");
    }
    if (resetTimer.current) window.clearTimeout(resetTimer.current);
    resetTimer.current = window.setTimeout(() => setCopyState("idle"), 2600);
  };

  const copied = copyState === "copied";

  return (
    <section id="contact" className={`${sectionSpacing} relative`}>
      <div className={container}>
        <AnimatedSection>
          <SectionHeader
            label={messages.contact.label}
            title={messages.contact.title}
            description={messages.contact.description}
          />
        </AnimatedSection>

        <AnimatedSection delay={0.08}>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="panel flex min-w-0 items-center gap-3 p-4">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10"
              >
                <Mail size={17} className="text-primary-light" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="mono-label text-faint">
                  {messages.contact.emailLabel}
                </p>
                <a
                  href={mailtoHref}
                  className="mt-1 block truncate text-sm font-medium text-foreground transition-colors hover:text-primary-light"
                >
                  {profile.email}
                </a>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                aria-label={messages.contact.copyEmail}
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-lg border transition-colors duration-200",
                  copied
                    ? "border-[#34d399]/40 bg-[#34d399]/10 text-[#6ee7b7]"
                    : "border-border bg-muted/40 text-muted-foreground hover:border-primary/40 hover:text-foreground"
                )}
              >
                {copied ? (
                  <Check size={15} aria-hidden="true" />
                ) : (
                  <Copy size={15} aria-hidden="true" />
                )}
              </button>
            </div>

            <a
              href={telHref}
              className="panel panel-interactive flex min-w-0 items-center gap-3 p-4"
            >
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10"
              >
                <Phone size={17} className="text-primary-light" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="mono-label text-faint">
                  {messages.contact.phoneLabel}
                </p>
                <p className="mt-1 truncate text-sm font-medium text-foreground">
                  {profile.phone}
                </p>
              </div>
            </a>

            <div className="panel flex min-w-0 items-center gap-3 p-4">
              <span
                aria-hidden="true"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10"
              >
                <MapPin size={17} className="text-primary-light" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="mono-label text-faint">
                  {messages.contact.locationLabel}
                </p>
                <p className="mt-1 truncate text-sm font-medium text-foreground">
                  {profile.location}
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.14}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href={mailtoHref} className={buttonClasses("primary")}>
              <Mail size={15} aria-hidden="true" />
              {messages.contact.openMailClient}
            </a>
            <p
              role="status"
              aria-live="polite"
              className={cn(
                "text-xs",
                copyState === "failed" ? "text-[#ff9b9b]" : "text-faint"
              )}
            >
              {copyState === "copied" && messages.contact.copied}
              {copyState === "failed" && messages.contact.copyFailed}
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
