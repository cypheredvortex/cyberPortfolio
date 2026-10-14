"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import {
  DEFAULT_LOCALE,
  LOCALE_META,
  otherLocales,
  persistLocale,
  resolveStoredLocale,
  type Locale,
  type LocaleMeta,
} from "./config";
import { getMessages, type Messages } from "./messages";
import { projectsByLocale } from "@/data/projects";

interface I18nContextValue {
  /** Active locale. */
  locale: Locale;
  /** Full interface dictionary for the active locale. */
  messages: Messages;
  /** Metadata for the active locale (labels, `lang`, `og:locale`). */
  meta: LocaleMeta;
  /** Set an explicit locale and persist the preference. */
  setLocale: (locale: Locale) => void;
  /** Switch to the next available locale. */
  toggleLocale: () => void;
  /** Locale that would be activated by `toggleLocale`. */
  alternateLocale: Locale;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/** The gate class is added by the inline bootstrap script before paint. */
const PENDING_CLASS = "locale-pending";

// Layout effects are used so the stored preference is applied before the first
// paint that follows hydration; the server render itself stays deterministic.
const useIsomorphicLayoutEffect =
  typeof window === "undefined" ? useEffect : useLayoutEffect;

function applyDocumentLanguage(locale: Locale): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  root.lang = LOCALE_META[locale].htmlLang;
  root.dataset.locale = locale;
}

function metaContent(selector: string): HTMLMetaElement | null {
  return document.head.querySelector<HTMLMetaElement>(selector);
}

function setMeta(selector: string, attribute: "name" | "property", key: string, value: string) {
  let element = metaContent(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", value);
}

export default function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  // The server always renders the default locale so markup is deterministic and
  // no hydration mismatch is possible. The stored preference is applied in the
  // layout effect below, before the browser paints the hydrated tree.
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);
  const [announcement, setAnnouncement] = useState("");
  const hasResolvedPreference = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (hasResolvedPreference.current) return;
    hasResolvedPreference.current = true;
    const stored = resolveStoredLocale();
    if (stored !== DEFAULT_LOCALE) setLocaleState(stored);
    const root = document.documentElement;
    root.classList.remove(PENDING_CLASS);
    // Signals a successful hydration: the bootstrap script only releases the
    // scroll-reveal styles early if this marker never appears.
    root.setAttribute("data-hydrated", "");
  }, []);

  // Keep the document language, translations and page metadata in sync.
  useEffect(() => {
    applyDocumentLanguage(locale);
  }, [locale]);

  const messages = getMessages(locale);

  useEffect(() => {
    const base = messages.metadata;
    // Outside the Next.js title template the brand has to be composed manually.
    const brand = base.brandShort;
    let title = base.homeTitle;
    let description = base.homeDescription;

    if (pathname === "/projects") {
      title = `${base.projectsTitle} | ${brand}`;
      description = base.projectsDescription;
    } else if (pathname.startsWith("/projects/")) {
      const slug = pathname.split("/")[2] ?? "";
      const project = projectsByLocale[locale].find((item) => item.slug === slug);
      if (project) {
        title = `${project.title} | ${brand}`;
        description = project.subtitle;
      } else {
        title = `${base.projectNotFoundTitle} | ${brand}`;
        description = messages.project.notFoundDescription;
      }
    } else if (pathname !== "/") {
      title = `${base.notFoundTitle} | ${brand}`;
      description = messages.notFound.description;
    }

    // React owns the server-rendered <title> element and re-asserts its content
    // when the head is reconciled after hydration. Writing the localized title
    // is therefore guarded: it is applied immediately, re-applied while that
    // reconciliation settles, and then the guard is removed so later title
    // changes (including any made outside React) are left alone.
    const applyTitle = () => {
      if (document.title !== title) document.title = title;
    };
    applyTitle();

    const titleElement = document.querySelector("title");
    const observer = titleElement
      ? new MutationObserver(applyTitle)
      : null;
    observer?.observe(titleElement as Node, {
      childList: true,
      characterData: true,
      subtree: true,
    });
    const settle = window.setTimeout(() => observer?.disconnect(), 1500);

    setMeta('meta[name="description"]', "name", "description", description);
    setMeta('meta[property="og:title"]', "property", "og:title", title);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:locale"]', "property", "og:locale", LOCALE_META[locale].ogLocale);

    return () => {
      observer?.disconnect();
      window.clearTimeout(settle);
    };
  }, [locale, pathname, messages]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    persistLocale(next);
    setAnnouncement(getMessages(next).a11y.localeChanged);
  }, []);

  const alternateLocale = otherLocales(locale)[0] ?? DEFAULT_LOCALE;

  const toggleLocale = useCallback(() => {
    setLocale(alternateLocale);
  }, [alternateLocale, setLocale]);

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      messages,
      meta: LOCALE_META[locale],
      setLocale,
      toggleLocale,
      alternateLocale,
    }),
    [locale, messages, setLocale, toggleLocale, alternateLocale]
  );

  return (
    <I18nContext.Provider value={value}>
      {children}
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        data-testid="locale-announcement"
      >
        {announcement}
      </span>
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used inside LocaleProvider.");
  }
  return context;
}
