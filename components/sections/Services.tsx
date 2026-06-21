"use client";

import { motion } from "framer-motion";
import { TbDatabase, TbBuildingStore, TbRocket } from "react-icons/tb";

const SERVICES = [
  {
    icon: TbDatabase,
    title: "Database design",
    description:
      "Relational modeling — from entity relationships to working SQL queries.",
  },
  {
    icon: TbBuildingStore,
    title: "Boutique websites",
    description: "Custom sites for independent shops and small brands.",
  },
  {
    icon: TbRocket,
    title: "Landing pages",
    description: "Fast, focused single-page sites built to convert.",
  },
];

/**
 * PENDING — Rayane also mentioned a "statistics page." Built once it's clear
 * whether that means (a) a 4th service offering — building stats/analytics
 * dashboards for clients, or (b) a numbers section elsewhere on the page
 * (e.g. years coding, projects shipped). Three confirmed services below.
 */
export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-8 py-28">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-3 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase"
      >
        04 — Services
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl"
      >
        What I can build
      </motion.h2>

      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="rounded-2xl border border-transparent bg-[var(--color-surface)] p-6 transition-colors duration-300 hover:border-[var(--color-accent)]"
          >
            <Icon className="h-6 w-6 text-[var(--color-accent)]" aria-hidden />
            <h3 className="mt-4 font-[family-name:var(--font-display)] font-bold tracking-tight">
              {title}
            </h3>
            <p className="mt-2 text-sm text-[var(--color-muted)]">
              {description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
