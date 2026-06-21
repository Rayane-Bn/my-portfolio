"use client";

import { motion } from "framer-motion";
import { ProjectCard, type Project } from "@/components/ui/ProjectCard";

// Three concept examples standing in for real projects — swap these out
// once real photos + links are ready. Card layout, animation, and hover
// behavior stay exactly the same either way.
const EXAMPLE_PROJECTS: Project[] = [
  {
    title: "Schema Studio",
    description:
      "A tool concept for going from a relational model to working SQL — design tables visually, export the queries.",
    tags: ["SQL", "Database design"],
    variant: "schema",
    example: true,
  },
  {
    title: "Boutique storefront",
    description:
      "A small e-commerce concept for an independent brand — product grid, clean checkout, fast on mobile.",
    tags: ["Next.js", "Tailwind CSS"],
    variant: "boutique",
    example: true,
  },
  {
    title: "Product landing page",
    description:
      "A single-page launch site concept — hero, feature row, one clear call to action.",
    tags: ["Next.js", "Framer Motion"],
    variant: "landing",
    example: true,
  },
];

export function Work() {
  return (
    <section id="work" className="mx-auto max-w-5xl px-6 py-28">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-3 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase"
      >
        03 — Work
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="max-w-lg font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl"
      >
        Selected work
      </motion.h2>

      <p className="mt-3 max-w-md text-sm text-[var(--color-muted)]">
        These three are concept placeholders showing the card layout and
        hover animation — confirm the style and real projects drop in here.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMPLE_PROJECTS.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
