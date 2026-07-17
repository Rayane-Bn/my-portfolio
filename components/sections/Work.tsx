"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { TbArrowLeft, TbArrowRight } from "react-icons/tb";
import { ProjectArt } from "@/components/ui/ProjectArt";
import type { Project } from "@/types/project";

const PROJECTS: Project[] = [
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

const GAP_PX = 24; // matches gap-6

export function Work() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [offsetX, setOffsetX] = useState(0);

  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Recomputes the exact pixel offset needed to center the active
  // card inside the viewport. Driven entirely by React state — no
  // native scroll-snap, no IntersectionObserver guessing what's
  // "visible enough." The active card is *always* exactly centered,
  // by construction, on every render.
  function recalcOffset(index: number) {
    const viewport = viewportRef.current;
    const card = cardRefs.current[index];
    if (!viewport || !card) return;

    let distance = 0;
    for (let i = 0; i < index; i++) {
      const el = cardRefs.current[i];
      if (el) distance += el.offsetWidth + GAP_PX;
    }

    const centeringPad = (viewport.clientWidth - card.offsetWidth) / 2;
    setOffsetX(-(distance - centeringPad));
  }

  function goTo(index: number) {
    setActive(index);
    recalcOffset(index);
  }

  // Recenter on resize (card widths are responsive %, so pixel offset
  // changes whenever the viewport does).
  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const observer = new ResizeObserver(() => recalcOffset(active));
    observer.observe(viewport);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  // Center the first card once layout has actually happened.
  useEffect(() => {
    const id = requestAnimationFrame(() => recalcOffset(0));
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autoplay only runs while Work is on screen.
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

  useEffect(() => {
    if (isPaused || !isSectionVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % PROJECTS.length;
        recalcOffset(next);
        return next;
      });
    }, 4500);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPaused, isSectionVisible]);

  const project = PROJECTS[active] ?? PROJECTS[0]!;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="mx-auto max-w-6xl px-6 py-28"
    >
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
        {/* Left — description panel, synced to the active card */}
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
              <p className="mt-3 text-sm text-[var(--color-muted)]">
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
            </motion.div>
          </AnimatePresence>

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
              {String(active + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Right — translateX-driven carousel. No native scroll, no
            scroll-snap, no IntersectionObserver: position is a pure
            function of `active`, so it can never desync. */}
        <div
          ref={viewportRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
          className="overflow-hidden"
        >
          <motion.div
            animate={{ x: offsetX }}
            transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
            className="flex"
            style={{ gap: GAP_PX }}
          >
            {PROJECTS.map((p, i) => (
              <motion.div
                key={p.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                animate={{
                  opacity: i === active ? 1 : 0.5,
                  scale: i === active ? 1 : 0.94,
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="group relative aspect-[4/3] w-[85%] flex-shrink-0 overflow-hidden rounded-2xl bg-[var(--color-surface)] sm:w-[68%] lg:w-[82%]"
              >
                {p.example && (
                  <span className="absolute top-4 right-4 z-10 rounded-full border border-[var(--color-line)] bg-[var(--color-bg)]/90 px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] tracking-widest text-[var(--color-muted)] uppercase">
                    Example — concept
                  </span>
                )}

                {p.image ? (
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width: 1024px) 60vw, 85vw"
                    className="object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-14 text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                    <ProjectArt variant={p.variant} />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}