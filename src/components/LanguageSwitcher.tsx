"use client";

import { Languages } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/i18n/LocaleProvider";
import { LOCALES, LOCALE_META } from "@/i18n/config";

interface LanguageSwitcherProps {
  /** `compact` is used in the mobile header, `full` in the mobile menu sheet. */
  variant?: "compact" | "full";
  className?: string;
}

export default function LanguageSwitcher({
  variant = "full",
  className,
}: LanguageSwitcherProps) {
  const { locale, messages, setLocale } = useI18n();

  return (
    <div
      className={cn("flex items-center gap-2", className)}
      role="group"
      aria-label={messages.a11y.language}
    >
      {variant === "full" && (
        <span className="mono-label flex items-center gap-1.5 text-faint">
          <Languages size={13} aria-hidden="true" />
          {messages.a11y.language}
        </span>
      )}
      <div className="flex items-center rounded-full border border-border bg-muted/60 p-0.5">
        {LOCALES.map((candidate) => {
          const isActive = candidate === locale;
          return (
            <button
              key={candidate}
              type="button"
              lang={LOCALE_META[candidate].htmlLang}
              onClick={() => setLocale(candidate)}
              aria-pressed={isActive}
              aria-label={
                isActive
                  ? `${LOCALE_META[candidate].label} — ${messages.a11y.currentLanguage}`
                  : messages.a11y.switchToOther
              }
              className={cn(
                "rounded-full px-2.5 py-1 font-mono text-[0.6875rem] font-semibold tracking-wider transition-colors duration-200",
                isActive
                  ? "bg-primary text-white shadow-[0_2px_10px_-2px_rgba(79,131,255,0.7)]"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {LOCALE_META[candidate].short}
            </button>
          );
        })}
      </div>
    </div>
  );
}
