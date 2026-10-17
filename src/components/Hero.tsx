"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Mail } from "lucide-react";
import { container, buttonClasses } from "@/lib/styles";
import { useI18n } from "@/i18n/LocaleProvider";
import { getProfile } from "@/data/profile";
import { getLanguages } from "@/data/skills";
import NetworkBackdrop from "./NetworkBackdrop";
import TiltCard from "./TiltCard";

// Three.js is only downloaded in the browser, after hydration, so it never
// delays the hero's largest contentful paint or the server-rendered copy.
const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(onChange: () => void) {
  const media = window.matchMedia(REDUCED_MOTION_QUERY);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/** Server and hydration render assume motion is allowed, so markup matches. */
function getReducedMotionServerSnapshot() {
  return false;
}

export default function Hero() {
  const { locale, messages } = useI18n();
  const profile = getProfile(locale);
  const languages = getLanguages(locale);
  const [sceneReady, setSceneReady] = useState(false);
  const handleSceneReady = useCallback(() => setSceneReady(true), []);

  // Hydration uses the server snapshot (motion allowed), then React swaps to
  // the real preference. Reduced-motion visitors therefore never mount the
  // scene, and no hydration mismatch or cascading render is introduced.
  const reduceMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  // Proper nouns stay in the same order in both locales.
  const [firstName, ...restOfName] = profile.name.split(" ");

  return (
    <section id="hero" className="relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-20 bg-grid" aria-hidden="true" />
      <div className="absolute inset-x-0 top-0 -z-20 h-[42rem] bg-radial" aria-hidden="true" />
      <NetworkBackdrop
        className="transition-opacity duration-1000"
        style={{ opacity: sceneReady ? 0 : 0.7 }}
      />
      {!reduceMotion && <HeroScene onReady={handleSceneReady} />}

      <div className={container}>
        <div className="grid min-h-[calc(100dvh-4rem)] items-center gap-14 py-16 lg:grid-cols-12 lg:gap-10 lg:py-20">
          <div className="min-w-0 lg:col-span-7">
            <p
              data-enter=""
              className="mono-label flex items-center gap-2.5 text-muted-foreground"
            >
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_0_3px_rgba(34,211,238,0.18)] animate-signal"
              />
              {profile.location}
            </p>

            <h1 className="hero-title mt-6 font-display text-[2.5rem] font-bold leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.25rem]">
              {firstName}{" "}
              <span className="text-gradient">{restOfName.join(" ")}</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg font-light leading-snug text-muted-foreground sm:text-xl">
              {profile.title}
            </p>

            <p className="mt-4 max-w-xl text-[0.9375rem] leading-relaxed text-faint">
              {profile.tagline}
            </p>

            <div
              data-enter=""
              style={{ animationDelay: "0.12s" }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Link href="/projects" className={buttonClasses("primary")}>
                {messages.hero.viewProjects}
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
              <a
                href={`mailto:${profile.email}?subject=${encodeURIComponent(
                  messages.contact.mailtoSubject
                )}`}
                className={buttonClasses("secondary")}
              >
                <Mail size={15} aria-hidden="true" />
                {messages.hero.contactMe}
              </a>
            </div>

            <div data-enter="" style={{ animationDelay: "0.22s" }} className="mt-10">
              <p className="mono-label text-faint">{messages.hero.focusAreas}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {profile.focusAreas.map((area) => (
                  <li key={area} className="chip">
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            data-enter=""
            style={{ animationDelay: "0.16s" }}
            className="min-w-0 lg:col-span-5"
          >
            <TiltCard className="relative h-full" maxTilt={4} glare={false}>
              <span aria-hidden="true" className="hero-card-aura" />
              <aside className="panel panel-glow overflow-hidden">
                <div className="relative aspect-square w-full border-b border-border bg-muted">
                  <Image
                    src="/portrait.jpg"
                    alt={messages.hero.portraitAlt}
                    fill
                    priority
                    sizes="(min-width: 1024px) 30rem, 100vw"
                    className="object-cover object-top"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 bg-gradient-to-t from-card/70 via-transparent to-transparent"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="mono-label text-primary-light">
                      {messages.hero.snapshotTitle}
                    </h2>
                    <span
                      aria-hidden="true"
                      className="flex items-center gap-1.5 font-mono text-[0.625rem] text-faint"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-success" />
                      Rabat
                    </span>
                  </div>

                  <dl className="mt-4 space-y-3 text-sm">
                    <div>
                      <dt className="mono-label text-faint">
                        {messages.hero.specialization}
                      </dt>
                      <dd className="mt-1.5 leading-relaxed text-foreground">
                        {profile.titleShort}
                      </dd>
                    </div>
                    <div className="hairline" aria-hidden="true" />
                    <div>
                      <dt className="mono-label text-faint">
                        {messages.hero.education}
                      </dt>
                      <dd className="mt-1.5 leading-relaxed text-foreground">
                        {profile.educationShort}
                      </dd>
                    </div>
                    <div className="hairline" aria-hidden="true" />
                    <div>
                      <dt className="mono-label text-faint">
                        {messages.hero.languages}
                      </dt>
                      <dd className="mt-2 flex flex-wrap gap-2">
                        {languages.map((language) => (
                          <span key={language.name} className="chip">
                            <span className="text-foreground">
                              {language.name}
                            </span>
                            <span aria-hidden="true" className="text-faint">
                              ·
                            </span>
                            {language.level}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>
                </div>
              </aside>
            </TiltCard>
          </div>
        </div>
      </div>

      <a
        href="#about"
        aria-label={messages.hero.scrollToAbout}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 rounded-full border border-border bg-card/70 p-2 text-muted-foreground backdrop-blur-md transition-colors hover:border-primary/40 hover:text-foreground sm:block"
      >
        <ArrowDown size={16} className="scroll-hint" aria-hidden="true" />
      </a>
    </section>
  );
}
