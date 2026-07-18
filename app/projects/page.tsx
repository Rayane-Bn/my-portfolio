import Link from "next/link";
import Image from "next/image";
import { TbArrowLeft } from "react-icons/tb";
import { PROJECTS } from "@/data/projects";

export const metadata = {
  title: "All Projects — Rayane Benkradidja",
  description: "A full list of projects built by Rayane Benkradidja.",
};

export default function ProjectsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
      >
        <TbArrowLeft className="h-4 w-4" />
        Back to Home
      </Link>

      <h1 className="mt-8 font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-6xl">
        All{" "}
        <span className="text-[var(--color-accent)]">Projects</span>
      </h1>
      <p className="mt-4 max-w-xl text-[var(--color-muted)]">
        A full showcase of my work across front-end development, web apps, and
        multi-agent systems.
      </p>

      <p className="mt-10 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-muted)] uppercase">
        All projects ({PROJECTS.length})
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <Link
            key={project.slug}
            href={`/projects/${project.slug}`}
className="group relative flex flex-col overflow-hidden rounded-2xl border border-transparent bg-[var(--color-surface)] cursor-pointer transition-[border-color,transform] duration-300 hover:border-[var(--color-accent)] hover:-translate-y-1"          >
            {/* Cover image */}
            <div className="relative aspect-video overflow-hidden">
              <Image
                src={project.coverImage}
                alt={project.title}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
className="object-cover grayscale transition-[filter] duration-500 ease-out group-hover:grayscale-0" /> </div>
            <div className="flex flex-1 flex-col p-5">
              <h2 className="font-[family-name:var(--font-display)] text-lg font-bold tracking-tight">
                {project.title}
              </h2>
              <p className="mt-1.5 flex-1 text-sm text-[var(--color-muted)]">
                {project.subtitle}
              </p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {project.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[var(--color-line)] px-2 py-0.5 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-muted)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}