"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { TbArrowLeft, TbArrowRight, TbExternalLink, TbBrandGithub } from "react-icons/tb";
import { PROJECTS } from "@/data/projects";

export function Work() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = cardRefs.current.findIndex((el) => el === visible.target);
        if (index !== -1) setActive(index);
      },
      { root, threshold: 0.6 },
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsSectionVisible(!!entry?.isIntersecting),
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Replace this function
function goTo(index: number) {
  const track = trackRef.current;
  const card = cardRefs.current[index];
  if (!track || !card) return;
  const trackRect = track.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const cardLeft = cardRect.left - trackRect.left + track.scrollLeft;
  const left = cardLeft - (track.clientWidth - card.clientWidth) / 2;
  track.scrollTo({ left, behavior: "smooth" });
}

// Replace the autoplay useEffect
useEffect(() => {
  if (isPaused || !isSectionVisible) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const id = setInterval(() => {
    const next = (active + 1) % PROJECTS.length;
    goTo(next);
    setActive(next);
  }, 4500);
  return () => clearInterval(id);
}, [isPaused, isSectionVisible, active]);

  const project = PROJECTS[active] ?? PROJECTS[0]!;

  return (
    <section id="work" ref={sectionRef} className="mx-auto max-w-6xl px-6 py-28">
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
        className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl"
      >
        Selected work
      </motion.h2>

      <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(220px,1fr)_2fr] lg:items-start lg:gap-12">
        {/* ── Left: description synced to active card ── */}
        <div className="lg:sticky lg:top-32">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase">
            Now showing
          </p>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              className="mt-3"
            >
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-muted)]">
                {project.subtitle}
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

              {/* Action buttons */}
              <div className="mt-6 flex flex-wrap gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-85"
                  >
                    <TbExternalLink className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                {project.sourceUrl && (
                  <a
                    href={project.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--color-line)] px-4 py-2 text-sm font-medium transition-colors hover:border-[var(--color-ink)]"
                  >
                    <TbBrandGithub className="h-4 w-4" />
                    Source Code
                  </a>
                )}
              </div>

              <Link
                href={`/projects/${project.slug}`}
                className="mt-4 inline-block text-sm text-[var(--color-muted)] underline underline-offset-4 transition-colors hover:text-[var(--color-accent)]"
              >
                View full project →
              </Link>
            </motion.div>
          </AnimatePresence>

          {/* Prev / next + counter */}
          <div className="mt-8 flex items-center gap-3">
            <button
              onClick={() => goTo((active - 1 + PROJECTS.length) % PROJECTS.length)}
              aria-label="Previous project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <TbArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => goTo((active + 1) % PROJECTS.length)}
              aria-label="Next project"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-line)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
            >
              <TbArrowRight className="h-4 w-4" />
            </button>
            <span className="ml-1 font-[family-name:var(--font-mono)] text-xs text-[var(--color-muted)]">
              {String(active + 1).padStart(2, "0")} /{" "}
              {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ── Right: snap-scroll slider ── */}
        <div
          ref={trackRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Spacers ensure first + last cards can reach a true centered
              snap point — without them the browser rejects the position
              and falls back to the previous card. */}
          <div aria-hidden className="w-[7.5%] flex-shrink-0 sm:w-[16%] lg:w-[9%]" />

          {PROJECTS.map((p, i) => (
            <div
  key={p.slug}
  ref={(el) => { cardRefs.current[i] = el; }}
  className="group relative aspect-[4/3] w-[85%] flex-shrink-0 snap-center overflow-hidden rounded-2xl bg-[var(--color-surface)] cursor-pointer transition-opacity duration-500 sm:w-[68%] lg:w-[78%]"
  style={{ opacity: i === active ? 1 : 0.4 }}
>
              <Image
                src={p.coverImage}
                alt={p.title}
                fill
                sizes="(min-width: 1024px) 60vw, 85vw"
className="object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0" />              {i !== active && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                  <p className="font-[family-name:var(--font-display)] text-sm font-bold text-white">
                    {p.title}
                  </p>
                </div>
              )}
            </div>
          ))}

          <div aria-hidden className="w-[7.5%] flex-shrink-0 sm:w-[16%] lg:w-[9%]" />
        </div>
      </div>

      {/* View All Projects */}
      <div className="mt-14 text-center">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-6 py-3 text-sm font-medium transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
        >
          View all {PROJECTS.length} projects →
        </Link>
      </div>
    </section>
  );
}