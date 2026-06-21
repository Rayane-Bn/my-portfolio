"use client";

import { motion } from "framer-motion";
import { TbArrowUpRight } from "react-icons/tb";

export type ProjectVariant = "schema" | "boutique" | "landing";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  variant: ProjectVariant;
  href?: string;
  example?: boolean;
};

function SchemaArt() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full">
      <rect x="20" y="20" width="64" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="100" width="64" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="156" y="60" width="64" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="34" r="3" fill="currentColor" />
      <circle cx="32" cy="114" r="3" fill="currentColor" />
      <circle cx="168" cy="74" r="3" fill="currentColor" />
      <path d="M84 40 H140 V80 H156" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M84 120 H140 V80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="28" x2="64" y2="28" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="32" y1="46" x2="56" y2="46" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="32" y1="108" x2="64" y2="108" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="32" y1="126" x2="56" y2="126" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="168" y1="68" x2="200" y2="68" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="168" y1="86" x2="192" y2="86" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

function BoutiqueArt() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full">
      <rect x="20" y="16" width="200" height="34" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="64" width="56" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="92" y="64" width="56" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="164" y="64" width="56" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="32" x2="80" y2="32" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="204" cy="32" r="6" fill="currentColor" opacity="0.5" />
      <line x1="20" y1="134" x2="76" y2="134" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="92" y1="134" x2="148" y2="134" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="164" y1="134" x2="220" y2="134" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

function LandingArt() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full">
      <line x1="20" y1="24" x2="220" y2="24" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <rect x="20" y="46" width="120" height="14" rx="3" fill="currentColor" opacity="0.7" />
      <rect x="20" y="68" width="90" height="10" rx="3" fill="currentColor" opacity="0.3" />
      <rect x="20" y="92" width="56" height="22" rx="11" stroke="currentColor" strokeWidth="2" />
      <rect x="156" y="46" width="64" height="64" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="132" width="48" height="16" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <rect x="80" y="132" width="48" height="16" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <rect x="140" y="132" width="48" height="16" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

const ART: Record<ProjectVariant, () => React.ReactElement> = {
  schema: SchemaArt,
  boutique: BoutiqueArt,
  landing: LandingArt,
};

export function ProjectCard({ project, index }: { project: Project; index: number }) {
  const Art = ART[project.variant];

  const card = (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ y: -8, scale: 1.015 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-transparent bg-[var(--color-surface)] transition-colors duration-300 hover:border-[var(--color-accent)]"
    >
      {project.example && (
        <span className="absolute top-4 right-4 z-10 rounded-full border border-[var(--color-line)] bg-[var(--color-bg)]/90 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] tracking-widest text-[var(--color-muted)] uppercase">
          Example — concept
        </span>
      )}

      <div className="flex aspect-[4/3] items-center justify-center bg-[var(--color-bg)] p-10 text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
        <Art />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm text-[var(--color-muted)]">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[var(--color-line)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[11px] text-[var(--color-muted)]"
            >
              {tag}
            </span>
          ))}
        </div>

        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-[var(--color-ink)] transition-all duration-300 group-hover:gap-2 group-hover:text-[var(--color-accent)]">
          View project
          <TbArrowUpRight className="h-4 w-4" aria-hidden />
        </span>
      </div>
    </motion.article>
  );

  if (!project.href) return card;

  return (
    <a href={project.href} className="block h-full" target="_blank" rel="noreferrer">
      {card}
    </a>
  );
}
