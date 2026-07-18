import { TbArrowUp } from "react-icons/tb";

const PAGES = [
  { label: "Projects Page", href: "/projects" },
  { label: "Services", href: "/#services" },
];

const REACH = [
  { label: "nr_benkradidja@esi.dz", href: "mailto:nr_benkradidja@esi.dz" },
  {
    label: "GitHub",
    href: "https://github.com/Rayane-Bn",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/benkradidja-rayane-93a6132b6/",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/rayane_dz_05/",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/213657176064",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)]">
      {/* Main footer grid */}
     <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        {/* Left — identity */}
        <div className="sm:col-span-1">
          <p className="font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase">
            Front-end Developer
          </p>
          <p className="mt-3 font-[family-name:var(--font-display)] text-2xl font-bold tracking-tight">
            Rayane Benkradidja
          </p>
          <p className="mt-3 text-sm text-[var(--color-muted)]">
            Building clean, fast, animated web experiences.
            <br />
            Open to internships & freelance.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {["Next.js", "React", "TypeScript", "Tailwind CSS"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-[var(--color-line)] px-2.5 py-1 font-[family-name:var(--font-mono)] text-[10px] text-[var(--color-muted)]"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Pages */}
        <div>
          <p className="mb-4 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase">
            Pages
          </p>
          <ul className="flex flex-col gap-3">
            {PAGES.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  className="inline-flex items-center gap-1 text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {label}
                  <span className="text-xs">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Reach me */}
        <div>
          <p className="mb-4 font-[family-name:var(--font-mono)] text-xs tracking-widest text-[var(--color-accent)] uppercase">
            Reach me
          </p>
          <ul className="flex flex-col gap-3">
            {REACH.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-[var(--color-muted)] transition-colors hover:text-[var(--color-accent)]"
                >
                  {label}
                </a>
              </li>
            ))}
            <li className="mt-1 text-sm text-[var(--color-muted)]">
              Algiers, Algeria
            </li>
          </ul>
          
        </div>
        <div className="flex flex-col">
  <p className="mb-4 font-[family-name:var(--font-mono)] text-xs tracking-widest uppercase text-[var(--color-accent)]">
    Available for
  </p>

  <ul className="flex flex-col gap-3 text-sm text-[var(--color-muted)]">
    <li>Internships</li>
    <li>Freelance</li>
    <li>Part-time jobs</li>
  </ul>
</div>
        
          
      </div>

      {/* Copyright bar */}
      <div className="border-t border-[var(--color-line)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <p className="font-[family-name:var(--font-mono)] text-xs text-[var(--color-muted)]">
            © {new Date().getFullYear()} Rayane Benkradidja
          </p>
          <a
            href="#top"
            aria-label="Back to top"
            className="flex items-center gap-1.5 rounded-full border border-[var(--color-line)] px-3 py-1.5 font-[family-name:var(--font-mono)] text-xs text-[var(--color-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <TbArrowUp className="h-3 w-3" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
}