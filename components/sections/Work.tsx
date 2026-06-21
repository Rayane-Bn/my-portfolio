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

export function Work() {
  const [active, setActive] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Whichever card is most visible in the scroll track becomes "now
  // showing" on the left — one observer, no scroll-position math.
  useEffect(() => {
    const root = trackRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
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

  // Separate observer on the section itself — autoplay only runs while
  // Work is actually on screen, so it can never fire (and scroll
  // something) while someone's reading the Hero or About.
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

  // Scrolls the slider's own scroll container only — never the page.
  // (scrollIntoView() was the bug: it walks every scrollable ancestor,
  // including the document, so calling it from an off-screen autoplay
  // tick was yanking the whole page down to this section.)
  function goTo(index: number) {
    const track = trackRef.current;
    const card = cardRefs.current[index];
    if (!track || !card) return;
    const left = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({ left, behavior: "smooth" });
  }

  // Auto-advance every 4.5s, loops both directions. Pauses on
  // hover/focus, while off-screen, and for reduced-motion users.
  useEffect(() => {
    if (isPaused || !isSectionVisible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      setActive((current) => {
        const next = (current + 1) % PROJECTS.length;
        goTo(next);
        return next;
      });
    }, 4500);

    return () => clearInterval(id);
  }, [isPaused, isSectionVisible]);

  const project = PROJECTS[active] ?? PROJECTS[0]!;

  return (
    <section
      id="work"
      ref={sectionRef}
      className="mx-auto max-w-6xl px-8 py-28"
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

      <div className="mt-12 flex flex-col gap-10 lg:gap-12">
        {/* Left — description panel, synced to whichever card is centered */}
        <div className="lg:flex lg:items-start lg:justify-between lg:gap-12">
          <div className="lg:sticky lg:top-32 lg:w-72 flex-shrink-0">
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

          {/* Right — snap-scroll slider. Native scroll-snap: smooth, touch-friendly, no per-frame JS. */}
          <div
            ref={trackRef}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-1"
          >
            {PROJECTS.map((p, i) => (
              <div
                key={p.title}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="group relative aspect-[4/3] w-[85%] flex-shrink-0 snap-center overflow-hidden rounded-2xl bg-[var(--color-surface)] transition-all duration-400 ease-out sm:w-[68%] lg:w-[calc(33.333%-1rem)]"
                style={{ opacity: i === active ? 1 : 0.5, transform: i === active ? "scale(1)" : "scale(0.94)" }}
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
                    sizes="(min-width: 1024px) 30vw, 85vw"
                    className="object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center p-14 text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-accent)]">
                    <ProjectArt variant={p.variant} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
