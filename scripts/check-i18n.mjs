#!/usr/bin/env node
/**
 * Bilingual completeness check.
 *
 * TypeScript already guarantees that the two interface dictionaries have
 * identical shapes (`fr` is annotated with the type derived from `en`), so this
 * script covers what the type system cannot:
 *
 *   1. Both locales expose the same content paths, which also proves that every
 *      translated list (responsibilities, implementation steps, focus areas,
 *      skill items) has the same number of entries in both languages.
 *   2. No user-facing string is empty or whitespace only.
 *   3. No French string is a byte-identical copy of its English source unless it
 *      is a language-invariant value (proper nouns, product names, identifiers).
 *      This is what catches "the translation was forgotten" regressions.
 *
 * Run with `npm run check:i18n`.
 */

const INVARIANT_PATH_PATTERNS = [
  /\.(slug|id|category|status|featured)$/,
  /\.(company|institution|period)$/,
  /\.(technologies|tags|evidence)\[\d+\]$/,
  /^profile\.(name|firstName|lastName|email|phone)$/,
];

/** Values that are legitimately identical in both languages. */
const INVARIANT_VALUES = new Set([
  // People and contact details
  "Achraf Sghiri",
  "Achraf",
  "Sghiri",
  "achrafsghiri240@gmail.com",
  "+212 600466405",
  "Achraf Sghiri — Portfolio",
  // Technology names used as standalone values
  "React",
  "TypeScript",
  "SQLAlchemy",
  "Wireshark",
  "Nmap",
  "Snort",
  "Filebeat",
  "VirtualBox",
  // Year, category label, and shared short labels
  "2022",
  "Full-Stack",
  "Contact",
  "Navigation",
  "404",
]);

const isInvariantPath = (path) =>
  INVARIANT_PATH_PATTERNS.some((pattern) => pattern.test(path));

function collectLeaves(value, path, out) {
  if (typeof value === "string") {
    out.set(path, value);
    return out;
  }
  if (typeof value === "number" || typeof value === "boolean") {
    out.set(path, String(value));
    return out;
  }
  if (typeof value === "function") return out;
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      collectLeaves(entry, `${path}[${index}]`, out)
    );
    return out;
  }
  if (value && typeof value === "object") {
    Object.entries(value).forEach(([key, entry]) =>
      collectLeaves(entry, path ? `${path}.${key}` : key, out)
    );
  }
  return out;
}

function collectShape(value, path, out) {
  if (value === null || typeof value !== "object") {
    out.add(path);
    return out;
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) =>
      collectShape(entry, `${path}[${index}]`, out)
    );
    return out;
  }
  Object.entries(value).forEach(([key, entry]) =>
    collectShape(entry, path ? `${path}.${key}` : key, out)
  );
  return out;
}

const failures = [];
const notes = [];

function compare(label, enValue, frValue) {
  const enShape = collectShape(enValue, "", new Set());
  const frShape = collectShape(frValue, "", new Set());

  for (const path of enShape) {
    if (!frShape.has(path)) {
      failures.push(`${label}: missing in fr → ${path}`);
    }
  }
  for (const path of frShape) {
    if (!enShape.has(path)) {
      failures.push(`${label}: extra in fr → ${path}`);
    }
  }

  const enLeaves = collectLeaves(enValue, "", new Map());
  const frLeaves = collectLeaves(frValue, "", new Map());

  for (const [path, value] of enLeaves) {
    if (value.trim() === "") failures.push(`${label}: empty en value at ${path}`);
  }
  for (const [path, value] of frLeaves) {
    if (value.trim() === "") failures.push(`${label}: empty fr value at ${path}`);
  }

  let identical = 0;
  for (const [path, value] of frLeaves) {
    const source = enLeaves.get(path);
    if (source === undefined || source !== value) continue;
    identical += 1;
    if (value.trim() === "") continue;
    if (isInvariantPath(path) || INVARIANT_VALUES.has(value)) continue;
    failures.push(
      `${label}: fr is identical to en at ${path} → "${value}" (translate it, or add the value to INVARIANT_VALUES)`
    );
  }

  notes.push(
    `${label}: ${enShape.size} paths checked, ${identical} intentionally shared value(s)`
  );
}

const { messagesByLocale } = await import("../src/i18n/messages.ts");
const { projectsByLocale } = await import("../src/data/projects.ts");
const { profileByLocale } = await import("../src/data/profile.ts");
const { experiencesByLocale } = await import("../src/data/experience.ts");
const { educationByLocale } = await import("../src/data/education.ts");
const {
  skillCategoriesByLocale,
  languagesByLocale,
} = await import("../src/data/skills.ts");

const LOCALES = ["en", "fr"];

/** Structural parity of the interface dictionary. */
compare(
  "messages (en/fr)",
  messagesByLocale.en,
  messagesByLocale.fr
);

/** Prose and structural parity for every content dataset. */
compare("projects", projectsByLocale.en, projectsByLocale.fr);
compare("profile", profileByLocale.en, profileByLocale.fr);
compare("experience", experiencesByLocale.en, experiencesByLocale.fr);
compare("education", educationByLocale.en, educationByLocale.fr);
compare("skills", skillCategoriesByLocale.en, skillCategoriesByLocale.fr);
compare("languages", languagesByLocale.en, languagesByLocale.fr);

/** Content anchors must be identical across locales. */
const enProjects = projectsByLocale.en;
const frProjects = projectsByLocale.fr;
if (enProjects.length !== frProjects.length) {
  failures.push(
    `projects: en has ${enProjects.length} entries, fr has ${frProjects.length}`
  );
}
enProjects.forEach((project, index) => {
  const other = frProjects[index];
  if (!other) return;
  if (project.slug !== other.slug) {
    failures.push(
      `projects[${index}]: slug mismatch (${project.slug} vs ${other.slug})`
    );
  }
  if (project.category !== other.category) {
    failures.push(
      `projects[${index}]: category mismatch (${project.category} vs ${other.category})`
    );
  }
  if (project.featured !== other.featured) {
    failures.push(`projects[${index}]: featured flag mismatch`);
  }
});

const skillIdsEn = skillCategoriesByLocale.en.map((category) => category.id);
const skillIdsFr = skillCategoriesByLocale.fr.map((category) => category.id);
if (skillIdsEn.join("|") !== skillIdsFr.join("|")) {
  failures.push(
    `skills: category ids differ between locales (${skillIdsEn.join(", ")} vs ${skillIdsFr.join(", ")})`
  );
}

const experienceIdsEn = experiencesByLocale.en.map((entry) => entry.id);
const experienceIdsFr = experiencesByLocale.fr.map((entry) => entry.id);
if (experienceIdsEn.join("|") !== experienceIdsFr.join("|")) {
  failures.push("experience: entry ids differ between locales");
}

for (const locale of LOCALES) {
  if (!messagesByLocale[locale]) failures.push(`messages: ${locale} is missing`);
  if (!projectsByLocale[locale]) failures.push(`projects: ${locale} is missing`);
}

notes.forEach((note) => console.log(`  · ${note}`));

if (failures.length > 0) {
  console.error(`\n✖ Bilingual check failed (${failures.length} issue(s)):`);
  failures.forEach((failure) => console.error(`  - ${failure}`));
  process.exit(1);
}

console.log(
  `\n✓ Bilingual check passed: en and fr are complete and structurally identical.`
);
