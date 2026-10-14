# MyPortfolio

Professional portfolio website for Achraf Sghiri, focused on cybersecurity and network infrastructure.

## Stack

Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion, and Lucide icons.

## Local development

```bash
npm install
npm run dev
```

The application is available at `http://localhost:3000`.

## Quality checks

```bash
npm run typecheck   # TypeScript, no emit
npm run lint        # ESLint (next/core-web-vitals + next/typescript)
npm run check:i18n  # English/French completeness and parity
npm run build       # production build
```

Run all four before shipping. `npm run check:i18n` fails the build pipeline when a
French string is missing, empty, or an untranslated copy of its English source
(unless it is a documented language-invariant value such as a product name).

## Internationalisation

The site is bilingual (English and French) without duplicated routes.

- `src/i18n/config.ts` — locale list, metadata, and cookie/storage persistence.
- `src/i18n/messages.ts` — interface copy. `en` is the source of truth and `fr` is
  annotated with the type derived from it, so a missing or misspelled key is a
  **compile-time error** rather than a silent English fallback.
- `src/i18n/LocaleProvider.tsx` — React context exposing `useI18n()`, applying the
  stored preference before paint, and keeping `<html lang>`, `document.title`,
  and meta descriptions in sync with the active locale.
- `src/data/*` — content datasets exposing `Record<Locale, …>` maps. Identifiers
  (slugs, categories, ids, technology names) are shared across locales so
  switching language never changes the current route or the active filter.

The server always renders the default locale, which keeps pages statically
generated and hydration deterministic. A stored French preference is applied by
an inline bootstrap script in `src/app/layout.tsx` before the first paint;
without JavaScript the English content is served normally.

Adding a third language means extending `LOCALES` and `LOCALE_META` in
`src/i18n/config.ts`, then adding the locale to `messagesByLocale` and each
`*ByLocale` map — TypeScript lists every location that still needs content.

## Accessibility notes

- Scroll reveals are CSS-driven and gated behind `html.js-enhanced`, so markup
  never ships with hidden content and `prefers-reduced-motion` disables them.
- The skills selector implements the ARIA tabs pattern with arrow-key support.
- The mobile navigation traps Escape, locks background scroll, and returns focus
  to its trigger.

## Environment variables

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | No | Public base URL used for canonical URLs, Open Graph URLs, and the sitemap. Defaults to `https://achraf-sghiri.vercel.app`. |

Copy `.env.example` to `.env.local` to override locally. Never commit secrets.

## Deployment

The repository root is a standard Next.js application root. Vercel detects Next.js automatically; no `vercel.json` configuration is required.
