"use client";

import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { container } from "@/lib/styles";
import { useI18n } from "@/i18n/LocaleProvider";
import { getProfile } from "@/data/profile";
import type { Messages } from "@/i18n/messages";

interface FooterLink {
  key: keyof Messages["nav"];
  href: string;
}

const FOOTER_LINKS: readonly FooterLink[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/#about" },
  { key: "skills", href: "/#skills" },
  { key: "projects", href: "/projects" },
  { key: "experience", href: "/#experience" },
  { key: "education", href: "/#education" },
  { key: "contact", href: "/#contact" },
];

export default function Footer() {
  const { locale, messages } = useI18n();
  const profile = getProfile(locale);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative mt-8 border-t border-border bg-surface/60">
      <div className={`${container} py-14`}>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12">
          <div className="min-w-0 lg:col-span-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 font-display text-[0.9375rem] font-semibold tracking-tight text-foreground transition-colors hover:text-primary-light"
            >
              <span
                aria-hidden="true"
                className="grid h-8 w-8 place-items-center rounded-[0.6rem] border border-primary/30 bg-primary/10"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none">
                  <path
                    d="M12 3.2 4.6 6.9v6.2c0 3.6 2.9 6.6 7.4 7.7 4.5-1.1 7.4-4.1 7.4-7.7V6.9L12 3.2Z"
                    stroke="var(--primary-light)"
                    strokeWidth="1.4"
                    strokeLinejoin="round"
                  />
                  <circle cx="9.4" cy="11" r="1.15" fill="var(--accent)" />
                  <circle cx="14.6" cy="11" r="1.15" fill="var(--primary-light)" />
                  <path
                    d="M9.4 11h5.2"
                    stroke="var(--accent)"
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              {profile.name}
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {profile.tagline}
            </p>
          </div>

          <nav
            className="min-w-0 lg:col-span-4"
            aria-label={messages.footer.navigationTitle}
          >
            <h2 className="mono-label text-faint">
              {messages.footer.navigationTitle}
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {FOOTER_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {messages.nav[link.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="min-w-0 sm:col-span-2 lg:col-span-3">
            <h2 className="mono-label text-faint">
              {messages.footer.contactTitle}
            </h2>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href={`mailto:${profile.email}`}
                  className="group inline-flex min-w-0 max-w-full items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {/* The address is a single unbreakable token: allow it to wrap
                      rather than widening the column. */}
                  <Mail
                    size={14}
                    className="shrink-0 text-primary-light"
                    aria-hidden="true"
                  />
                  <span className="break-all">{profile.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin size={14} className="text-primary-light" aria-hidden="true" />
                {profile.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 hairline" aria-hidden="true" />

        <div className="mt-6 flex flex-col gap-2 text-xs text-faint sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {currentYear} {profile.name}. {messages.footer.rights}
          </p>
          <p className="font-mono">{messages.footer.builtWith}</p>
        </div>
      </div>
    </footer>
  );
}
