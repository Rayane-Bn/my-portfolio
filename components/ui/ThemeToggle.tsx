"use client";

import { TbSun, TbMoon } from "react-icons/tb";

/**
 * No React state on purpose: the inline script in layout.tsx already sets
 * `.dark` on <html> before paint, so which icon shows is pure CSS
 * (`dark:` variant) — zero hydration mismatch risk, nothing to flash.
 */
export function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // localStorage unavailable (private browsing etc) — toggle still works for this visit
    }
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle color theme"
      className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--color-muted)] transition-all duration-300 hover:rotate-12 hover:text-[var(--color-ink)]"
    >
      <TbSun className="h-4 w-4 dark:hidden" aria-hidden />
      <TbMoon className="hidden h-4 w-4 dark:block" aria-hidden />
    </button>
  );
}
