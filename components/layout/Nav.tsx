"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/lib/useActiveSection";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const LINKS = [
  { label: "About", href: "about" },
  { label: "Skills", href: "skills" },
  { label: "Work", href: "work" },
  { label: "Services", href: "services" },
  { label: "Contact", href: "contact" },
];

/** Floating pill nav. Highlights the section currently in view. */
export function Nav() {
  const activeId = useActiveSection(LINKS.map((l) => l.href));

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="fixed top-6 left-1/2 z-50 -translate-x-1/2 px-4"
    >
      <nav className="flex items-center gap-1 rounded-full border border-[var(--color-line)] bg-[var(--color-bg)]/85 p-1.5 backdrop-blur-md">
        <a
          href="#top"
          className="draw-underline px-3 py-2 font-[family-name:var(--font-mono)] text-xs font-medium tracking-tight"
        >
          RB
        </a>
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={`#${link.href}`}
            className={cn(
              "relative rounded-full px-3 py-2 text-sm transition-colors",
              activeId === link.href
                ? "text-[var(--color-bg)]"
                : "text-[var(--color-muted)] hover:text-[var(--color-ink)]",
            )}
          >
            {activeId === link.href && (
              <motion.span
                layoutId="nav-pill"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
                className="absolute inset-0 -z-10 rounded-full bg-[var(--color-ink)]"
              />
            )}
            {link.label}
          </a>
        ))}
        <span className="mx-1 h-4 w-px bg-[var(--color-line)]" />
        <ThemeToggle />
      </nav>
    </motion.header>
  );
}
