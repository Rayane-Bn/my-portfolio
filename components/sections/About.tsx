"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const BIO_SECTIONS = [
  {
    title: "Front-end Development",
    icon: "💻",
    content:
      "3rd-year Computer Science student at ESI — École nationale Supérieure d'Informatique. Passionate about crafting clean, performant interfaces with modern web technologies.",
  },
  {
    title: "Club Scientifique de l'ESI",
    icon: "🚀",
    content:
      "Active member and former Project Assistant Manager. Worked on 3+ projects coordinating teams and delivering technical solutions. Bringing organizational excellence to every initiative.",
  },
  {
    title: "Behind the Code",
    icon: "🔧",
    content:
      "Constantly learning new technologies and staying updated with the latest tools. I believe in continuous growth and adapting to evolving tech landscapes.",
  },
];

export function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-80px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 1, 0.5, 1],
      },
    },
  };

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

      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="font-[family-name:var(--font-display)] text-3xl leading-snug font-bold tracking-tight md:text-4xl"
      >
        Front-end developer focused on clean code and interfaces that feel
        considered, not decorated.
      </motion.h2>

      <motion.div
        ref={containerRef}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {BIO_SECTIONS.map((section, i) => (
          <motion.div
            key={section.title}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)]/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-surface)]/60"
          >
            {/* Animated gradient background on hover */}
            <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 via-transparent to-transparent" />
            </div>

            <div className="relative z-10">
              <div className="mb-4 text-2xl">{section.icon}</div>
              <h3 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
                {section.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)]">
                {section.content}
              </p>
            </div>

            {/* Animated underline on hover */}
            <motion.div
              className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[var(--color-accent)] to-transparent"
              initial={{ width: "0%" }}
              whileHover={{ width: "100%" }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="mt-12 max-w-2xl rounded-lg border border-[var(--color-line)]/50 bg-[var(--color-surface)]/30 p-6 backdrop-blur-sm"
      >
        <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase">
          Base Information
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase">
              Location
            </p>
            <p className="mt-1 text-sm">Algiers, Algeria</p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase">
              Education
            </p>
            <p className="mt-1 text-sm">ESI — CS 3rd Year</p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase">
              Focus
            </p>
            <p className="mt-1 text-sm">Front-end Dev</p>
          </div>
          <div>
            <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase">
              Activity
            </p>
            <p className="mt-1 text-sm">CSE Club Member</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
