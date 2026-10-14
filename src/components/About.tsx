"use client";

import { Compass, Languages, Sparkles } from "lucide-react";
import { container, sectionSpacing } from "@/lib/styles";
import { useI18n } from "@/i18n/LocaleProvider";
import { getProfile } from "@/data/profile";
import { getLanguages } from "@/data/skills";
import AnimatedSection from "./AnimatedSection";
import SectionHeader from "./SectionHeader";

export default function About() {
  const { locale, messages } = useI18n();
  const profile = getProfile(locale);
  const languages = getLanguages(locale);

  return (
    <section id="about" className={`${sectionSpacing} relative`}>
      <div className={container}>
        <AnimatedSection>
          <SectionHeader
            label={messages.about.label}
            title={messages.about.title}
            description={messages.about.description}
          />
        </AnimatedSection>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <AnimatedSection className="lg:col-span-7">
            <div className="space-y-5 text-[0.9375rem] leading-relaxed text-muted-foreground sm:text-base">
              <p className="text-foreground/90">{profile.summary}</p>
              {profile.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </AnimatedSection>

          <div className="space-y-4 lg:col-span-5">
            <AnimatedSection delay={0.1}>
              <div className="panel p-5">
                <h3 className="mono-label flex items-center gap-2 text-primary-light">
                  <Compass size={14} aria-hidden="true" />
                  {messages.about.focusTitle}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {profile.focusAreas.map((area) => (
                    <li
                      key={area}
                      className="flex items-start gap-2.5 text-sm text-muted-foreground"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-[0.4rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary shadow-[0_0_0_3px_rgba(79,131,255,0.14)]"
                      />
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.16}>
              <div className="panel p-5">
                <h3 className="mono-label flex items-center gap-2 text-primary-light">
                  <Languages size={14} aria-hidden="true" />
                  {messages.about.languagesTitle}
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {languages.map((language) => (
                    <li
                      key={language.name}
                      className="flex items-center justify-between gap-4 text-sm"
                    >
                      <span className="text-foreground/90">{language.name}</span>
                      <span className="font-mono text-xs text-faint">
                        {language.level}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.22}>
              <div className="panel p-5">
                <h3 className="mono-label flex items-center gap-2 text-primary-light">
                  <Sparkles size={14} aria-hidden="true" />
                  {messages.about.interestsTitle}
                </h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {profile.interests.map((interest) => (
                    <li key={interest} className="chip">
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
