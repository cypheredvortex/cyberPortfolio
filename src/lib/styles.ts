import { cn } from "./utils";

/** Page gutter and maximum content width. */
export const container = "mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8";

/** Narrower measure for long-form content such as project details. */
export const containerNarrow = "mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8";

/** Consistent vertical rhythm between page sections. */
export const sectionSpacing = "py-20 sm:py-28 lg:py-32";

export type ButtonVariant = "primary" | "secondary" | "ghost";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-full text-sm font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-primary px-5 py-2.5 text-white shadow-[0_14px_34px_-16px_rgba(79,131,255,0.95)] hover:bg-primary-light hover:text-ink",
  secondary:
    "border border-border-strong bg-card/60 px-5 py-2.5 text-foreground hover:border-primary/50 hover:bg-card-hover",
  ghost:
    "px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground",
};

export function buttonClasses(
  variant: ButtonVariant = "primary",
  className?: string
): string {
  return cn(base, variants[variant], className);
}
