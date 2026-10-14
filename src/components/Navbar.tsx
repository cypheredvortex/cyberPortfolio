"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { container } from "@/lib/styles";
import { useActiveSection } from "@/lib/useActiveSection";
import { useI18n } from "@/i18n/LocaleProvider";
import type { Messages } from "@/i18n/messages";
import LanguageSwitcher from "./LanguageSwitcher";

type NavKey = keyof Pick<
  Messages["nav"],
  "home" | "about" | "skills" | "projects" | "experience" | "contact"
>;

interface NavItem {
  key: NavKey;
  href: string;
  /** Section id watched on the home page, if any. */
  section?: string;
}

const NAV_ITEMS: readonly NavItem[] = [
  { key: "home", href: "/" },
  { key: "about", href: "/#about", section: "about" },
  { key: "skills", href: "/#skills", section: "skills" },
  { key: "projects", href: "/projects", section: "projects" },
  { key: "experience", href: "/#experience", section: "experience" },
  { key: "contact", href: "/#contact", section: "contact" },
];

/** Watched section ids, defined once so the observer is not rebuilt. */
const WATCHED_SECTIONS = [
  "hero",
  "about",
  "skills",
  "projects",
  "experience",
  "education",
  "contact",
] as const;

export default function Navbar() {
  const { messages } = useI18n();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(WATCHED_SECTIONS);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;
    const evaluate = () => {
      frame = 0;
      setScrolled(window.scrollY > 12);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const closeMenu = useCallback((restoreFocus = false) => {
    setMobileOpen(false);
    if (restoreFocus) menuButtonRef.current?.focus();
  }, []);

  // Close the sheet whenever the route changes, including browser navigation.
  // Adjusting state during render is the recommended alternative to an effect
  // here: React re-renders immediately without an extra commit.
  const [menuPath, setMenuPath] = useState(pathname);
  if (menuPath !== pathname) {
    setMenuPath(pathname);
    setMobileOpen(false);
  }

  // The sheet only exists below the desktop breakpoint; close it on resize so
  // the background scroll lock is always released.
  useEffect(() => {
    if (!mobileOpen) return;
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (desktop.matches) setMobileOpen(false);
    };
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, [mobileOpen]);

  // Escape to close, focus into the panel, and lock background scrolling.
  useEffect(() => {
    if (!mobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeMenu(true);
      }
    };
    document.addEventListener("keydown", onKeyDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTarget = panelRef.current?.querySelector<HTMLElement>("a, button");
    focusTarget?.focus();

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [mobileOpen, closeMenu]);

  const isProjectsRoute = pathname.startsWith("/projects");

  const isActive = (item: NavItem): boolean => {
    if (isProjectsRoute) return item.key === "projects";
    if (pathname !== "/") return item.key === "home";
    if (item.key === "home") {
      return activeSection === "hero" || activeSection === null;
    }
    return activeSection === item.section;
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled || mobileOpen
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className={container}>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            href="/"
            className="group flex items-center gap-2.5 rounded-lg py-1 text-[0.9375rem] font-semibold tracking-tight text-foreground transition-colors hover:text-primary-light"
            aria-label={messages.metadata.siteName}
          >
            <span
              aria-hidden="true"
              className="relative grid h-8 w-8 shrink-0 place-items-center rounded-[0.6rem] border border-primary/30 bg-primary/10 transition-colors group-hover:border-primary/60"
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
            <span className="font-display">
              <span className="text-primary-light">A</span>chraf Sghiri
            </span>
          </Link>

          {/* The full navigation only appears once there is room for the brand,
              six links, and the language switcher: tablet widths use the sheet. */}
          <nav
            className="hidden lg:flex items-center gap-1"
            aria-label={messages.nav.primaryLabel}
          >
            {NAV_ITEMS.map((item) => {
              const active = isActive(item);
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  aria-current={active ? "true" : undefined}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors duration-200",
                    active
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      aria-hidden="true"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 420, damping: 34 }
                      }
                      className="absolute inset-0 -z-10 rounded-full border border-primary/25 bg-primary/12"
                    />
                  )}
                  {messages.nav[item.key]}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden lg:block">
              <LanguageSwitcher />
            </div>
            <div className="lg:hidden">
              <LanguageSwitcher variant="compact" />
            </div>
            <button
              ref={menuButtonRef}
              type="button"
              onClick={() => setMobileOpen((open) => !open)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              aria-label={
                mobileOpen ? messages.a11y.closeMenu : messages.a11y.openMenu
              }
              className="-mr-2 grid h-10 w-10 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
            >
              {mobileOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => closeMenu(true)}
              aria-hidden="true"
              className="fixed inset-0 top-16 bg-ink/70 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              key="panel"
              ref={panelRef}
              id="mobile-navigation"
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              className="relative border-t border-border bg-background/95 pb-4 backdrop-blur-xl lg:hidden"
            >
              <nav aria-label={messages.nav.primaryLabel} className={container}>
                <ul className="flex flex-col py-2">
                  {NAV_ITEMS.map((item, index) => {
                    const active = isActive(item);
                    return (
                      <motion.li
                        key={item.key}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          duration: 0.22,
                          delay: reduceMotion ? 0 : 0.03 * index,
                        }}
                      >
                        <Link
                          href={item.href}
                          onClick={() => closeMenu()}
                          aria-current={active ? "true" : undefined}
                          className={cn(
                            "flex items-center justify-between rounded-xl px-3 py-3 text-base font-medium transition-colors",
                            active
                              ? "bg-primary/10 text-foreground"
                              : "text-muted-foreground hover:bg-muted hover:text-foreground"
                          )}
                        >
                          {messages.nav[item.key]}
                          <span
                            aria-hidden="true"
                            className="font-mono text-xs text-faint"
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
