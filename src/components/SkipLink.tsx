"use client";

import { useI18n } from "@/i18n/LocaleProvider";

export default function SkipLink() {
  const { messages } = useI18n();

  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:border focus:border-primary-light focus:bg-card focus:px-4 focus:py-2.5 focus:text-sm focus:font-medium focus:text-foreground focus:shadow-panel"
    >
      {messages.a11y.skipToContent}
    </a>
  );
}
