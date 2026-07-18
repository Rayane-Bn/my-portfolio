import { notFound } from "next/navigation";
import Link from "next/link";
import { TbArrowLeft, TbExternalLink, TbBrandGithub } from "react-icons/tb";
import { PROJECTS } from "@/data/projects";
import { ProjectGallery } from "@/components/ui/ProjectGallery";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  return {
    title: project
      ? `${project.title} — Rayane Benkradidja`
      : "Project Not Found",
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);
  if (!project) notFound();

  const images = project.images ?? [project.coverImage];

  return (
    <main className="mx-auto max-w-6xl px-6 py-24">
      <Link
        href="/projects"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-ink)]"
      >
        <TbArrowLeft className="h-4 w-4" />
        Back to All Projects
      </Link>

      <div className="mt-10 grid grid-cols-1 gap-16 lg:grid-cols-[1fr_380px] lg:items-start">

        {/* ── Left: image gallery ── */}
        <ProjectGallery images={images} title={project.title} />

        {/* ── Right: details ── */}
        <div className="flex flex-col gap-8">

          {/* Title */}
          <div>
            <h1 className="font-[family-name:var(--font-display)] text-4xl font-bold tracking-tight md:text-5xl">
              {project.title}
            </h1>
            <p className="mt-2 text-[var(--color-muted)]">{project.subtitle}</p>
          </div>

          {/* About */}
          <div>
            <p className="mb-3 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase">
              About this project
            </p>
            <p className="text-sm leading-relaxed text-[var(--color-muted)]">
              {project.about}
            </p>
          </div>

          {/* Key features */}
          <div>
            <p className="mb-3 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase">
              Key features
            </p>
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {project.features.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2 text-sm text-[var(--color-muted)]"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[var(--color-accent)]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech stack */}
          <div>
            <p className="mb-3 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase">
              Technology stack
            </p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[var(--color-line)] px-3 py-1 font-[family-name:var(--font-mono)] text-xs text-[var(--color-muted)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-3 pt-2">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--color-accent)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85"
              >
                <TbExternalLink className="h-4 w-4" />
                Visit Live
              </a>
            )}
            {project.sourceUrl && (
              <a
                href={project.sourceUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--color-line)] px-5 py-2.5 text-sm font-medium transition-colors hover:border-[var(--color-ink)]"
              >
                <TbBrandGithub className="h-4 w-4" />
                Source Code
              </a>
            )}
          </div>

        </div>
      </div>
    </main>
  );
}