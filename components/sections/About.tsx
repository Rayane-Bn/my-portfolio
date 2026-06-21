"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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

const StickyBioCard = ({
  i,
  section,
  progress,
  range,
  targetScale,
}: {
  i: number;
  section: (typeof BIO_SECTIONS)[0];
  progress: any;
  range: [number, number];
  targetScale: number;
}) => {
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div className="sticky top-0 flex items-center justify-center h-screen">
      <motion.div
        style={{
          scale,
          top: `calc(-8vh + ${i * 30}px)`,
        }}
        className="relative -top-1/3 flex h-72 w-96 origin-top flex-col overflow-hidden rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)]/30 p-6 backdrop-blur-sm group"
      >
        {/* Animated gradient background */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <div className="mb-4 text-3xl">{section.icon}</div>
          <h3 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight">
            {section.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-[var(--color-muted)] flex-1">
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
    </div>
  );
};

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section id="about" className="mx-auto max-w-6xl px-8">
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

      <div
        ref={containerRef}
        className="relative flex w-full flex-col items-center justify-center py-32"
      >
        {BIO_SECTIONS.map((section, i) => {
          const targetScale = Math.max(0.5, 1 - (BIO_SECTIONS.length - i - 1) * 0.1);
          return (
            <StickyBioCard
              key={section.title}
              i={i}
              section={section}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </div>

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
