/**
 * Central localization configuration.
 *
 * The site is a fully static Next.js application, so the locale is resolved on
 * the client and persisted in a cookie (readable before paint by the inline
 * bootstrap script in the root layout) plus `localStorage` as a secondary
 * store. English is the source language and therefore the predictable default
 * for first-time visitors.
 */

export const LOCALES = ["en", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/** Cookie read by the pre-paint bootstrap script and by the provider. */
export const LOCALE_COOKIE = "site-locale";

/** How long the locale preference is kept (1 year). */
export const LOCALE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export interface LocaleMeta {
  /** Short code shown in the switcher. */
  short: string;
  /** Endonym shown in the switcher and screen-reader announcements. */
  label: string;
  /** Value applied to the `lang` attribute. */
  htmlLang: string;
  /** Value used for `og:locale`-style metadata. */
  ogLocale: string;
}

export const LOCALE_META: Record<Locale, LocaleMeta> = {
  en: { short: "EN", label: "English", htmlLang: "en", ogLocale: "en_US" },
  fr: { short: "FR", label: "Français", htmlLang: "fr", ogLocale: "fr_FR" },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

/** Other locales, used by the switcher. */
export function otherLocales(locale: Locale): Locale[] {
  return LOCALES.filter((candidate) => candidate !== locale);
}

/** Reads the persisted preference from `document.cookie`. */
export function readLocaleCookie(): Locale | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(
    new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]*)`)
  );
  if (!match) return null;
  const value = decodeURIComponent(match[1]);
  return isLocale(value) ? value : null;
}

/** Reads the persisted preference from `localStorage`. */
export function readLocaleStorage(): Locale | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(LOCALE_COOKIE);
    return isLocale(value) ? value : null;
  } catch {
    // Storage can be unavailable in private modes or sandboxed frames.
    return null;
  }
}

/** Persists the preference in both the cookie and `localStorage`. */
export function persistLocale(locale: Locale): void {
  if (typeof document === "undefined") return;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${LOCALE_COOKIE}=${locale}; Path=/; Max-Age=${LOCALE_COOKIE_MAX_AGE}; SameSite=Lax${secure}`;
  try {
    window.localStorage.setItem(LOCALE_COOKIE, locale);
  } catch {
    // Non-fatal: the cookie still carries the preference.
  }
}

/**
 * Resolves the current preference, preferring the cookie written by the
 * bootstrap script and falling back to `localStorage`.
 */
export function resolveStoredLocale(): Locale {
  return readLocaleCookie() ?? readLocaleStorage() ?? DEFAULT_LOCALE;
}
