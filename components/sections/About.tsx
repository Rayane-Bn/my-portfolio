"use client";

import { motion } from "framer-motion";

const FACTS = [
  { label: "Based in", value: "Algiers, Algeria" },
  { label: "Studying at", value: "ESI — Algiers" },
  { label: "Year", value: "3rd-year CS student" },
  { label: "Past role", value: "Project Assistant Manager, Club Scientifique ESI" },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-8 py-28">
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-3 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase"
      >
        01 — About
      </motion.p>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="font-[family-name:var(--font-display)] text-3xl leading-snug font-bold tracking-tight md:text-4xl"
          >
            Front-end developer focused on clean code and interfaces that
            feel considered, not decorated.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
            className="mt-6 max-w-xl text-[var(--color-muted)]"
          >
            Currently a 3rd-year Computer Science student at ESI — École
            nationale Supérieure d&apos;Informatique, Algiers, one of
            Algeria&apos;s leading computer science schools. Previously a
            project assistant manager for Club Scientifique de l&apos;ESI,
            coordinating projects alongside coursework.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 gap-6 border-t border-[var(--color-line)] pt-8 sm:grid-cols-2 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
          {FACTS.map((fact, i) => (
            <motion.div
              key={fact.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
            >
              <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase">
                {fact.label}
              </p>
              <p className="mt-1 text-sm">{fact.value}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
