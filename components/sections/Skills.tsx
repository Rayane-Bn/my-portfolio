"use client";

import { useRef, useState } from "react";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiOpenjdk,
  SiC,
  SiLinux,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiGit,
  SiGithub,
  SiFigma,
  SiTailwindcss,
  SiNpm,
} from "react-icons/si";
import { TbDatabase } from "react-icons/tb";
import type { IconType } from "react-icons";
import { useMarquee } from "@/lib/useMarquee";

type Tool = { name: string; icon: IconType; brand: string };

// Each tool keeps its real brand color, dimmed to grayscale by default —
// hovering one icon brings its actual logo color back. SQL has no single
// brand, so it uses the site accent instead of a fake "brand" color.
const ROW_1: Tool[] = [
  { name: "HTML5", icon: SiHtml5, brand: "#E34F26" },
  { name: "CSS", icon: SiCss, brand: "#1572B6" },
  { name: "JavaScript", icon: SiJavascript, brand: "#F7DF1E" },
  { name: "TypeScript", icon: SiTypescript, brand: "#3178C6" },
  { name: "React", icon: SiReact, brand: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, brand: "#000000" },
  { name: "Tailwind CSS", icon: SiTailwindcss, brand: "#06B6D4" },
  { name: "Figma", icon: SiFigma, brand: "#F24E1E" },
];

const ROW_2: Tool[] = [
  { name: "Node.js", icon: SiNodedotjs, brand: "#339933" },
  { name: "SQL", icon: TbDatabase, brand: "#FF5630" },
  { name: "Java", icon: SiOpenjdk, brand: "#437291" },
  { name: "C", icon: SiC, brand: "#A8B9CC" },
  { name: "Linux", icon: SiLinux, brand: "#FCC624" },
  { name: "Git", icon: SiGit, brand: "#F05032" },
  { name: "GitHub", icon: SiGithub, brand: "#181717" },
  { name: "npm", icon: SiNpm, brand: "#CB3837" },
];

// 4 copies — a generous buffer so the loop never runs out of content,
// even on an ultra-wide screen. See lib/useMarquee.ts for why.
const COPIES = 4;

function Row({ tools, reverse }: { tools: Tool[]; reverse?: boolean }) {
  const loop = Array.from({ length: COPIES }, () => tools).flat();
  const trackRef = useRef<HTMLDivElement>(null);
  const [paused, setPaused] = useState(false);

  useMarquee(trackRef, { speed: reverse ? -60 : 60, paused, copies: COPIES });

  return (
    <div
      className="marquee-fade overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div ref={trackRef} className="flex w-max gap-10 py-3 will-change-transform">
        {loop.map(({ name, icon: Icon, brand }, i) => (
          <div
            key={`${name}-${i}`}
            className="group flex flex-shrink-0 items-center gap-2.5"
            style={{ ["--brand" as string]: brand }}
          >
            <Icon
              className="h-7 w-7 flex-shrink-0 text-[var(--color-muted)] grayscale transition-all duration-300 group-hover:text-[var(--brand)] group-hover:grayscale-0"
              aria-hidden
            />
            <span className="font-[family-name:var(--font-mono)] text-sm whitespace-nowrap text-[var(--color-muted)] transition-colors duration-300 group-hover:text-[var(--color-ink)]">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="py-28">
      <div className="mx-auto max-w-6xl px-8">
        <p className="mb-3 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase">
          02 — Skills
        </p>
        <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl">
          Tools & technologies
        </h2>
        <p className="mt-3 max-w-md text-[var(--color-muted)]">
          Also comfortable with OOP and relational database design — hover a
          row to pause it, hover an icon to see it.
        </p>
      </div>

      <div className="mt-12 flex flex-col gap-2">
        <Row tools={ROW_1} />
        <Row tools={ROW_2} reverse />
      </div>
    </section>
  );
}
