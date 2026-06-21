# Portfolio — starter

Next.js (App Router) + TypeScript + Tailwind v4 + Framer Motion. Set up so we can drop
real content/design in without restructuring anything later.

## Stack & why

| Tool             | Why                                                                   |
| ----------------- | ---------------------------------------------------------------------- |
| Next.js 16 (App Router, Turbopack) | Static generation for a portfolio = fastest possible load; Turbopack for fast local builds |
| TypeScript (strict) | Catches mistakes before they ship |
| Tailwind v4        | Design tokens live in `app/globals.css` via `@theme` — no separate config file to keep in sync |
| Framer Motion     | Industry-standard animation library, tree-shaken via `optimizePackageImports` |
| next/image, next/font | Automatic image optimization + zero-layout-shift font loading (added once we pick fonts/photos) |

## Structure

```
app/
  layout.tsx       — root layout, fonts, metadata
  page.tsx          — assembles sections
  globals.css       — design tokens (colors, type, easing) — single source of truth
components/
  layout/           — Nav, Footer, things that wrap every page
  sections/         — Hero, Work, Chart, etc. — one file per page section
  ui/                — small reusable pieces (buttons, badges...)
lib/
  utils.ts          — shared helpers (currently just `cn()` for class names)
types/               — shared TypeScript types
public/images/       — static assets
```

**Convention:** every section of the page is its own component in `components/sections/`,
imported into `app/page.tsx`. Keeps each file small and makes reordering the page a
one-line change.

## Performance choices baked in

- Static rendering (no server work at request time — pages are pre-built HTML)
- `next/image` for automatic AVIF/WebP + responsive sizing (once real photos go in)
- `next/font` for self-hosted, zero-layout-shift type (once fonts are picked)
- `optimizePackageImports` for Framer Motion so unused parts don't ship to the browser
- `prefers-reduced-motion` respected globally in `globals.css`

Once content is in, run `npm run build` and check the Lighthouse score / bundle output —
happy to walk through that with you and show real numbers.

## Commands

```bash
npm install
npm run dev      # local dev server, http://localhost:3000
npm run build    # production build
npm run lint     # ESLint
npm run format   # Prettier, writes fixes
```

## Status — what's done, what's still open

**Built:**
- Hero, About, Skills (double marquee, brand-color hover), Work (3 example
  cards), Services, Contact (real working form) — all wired into `app/page.tsx`
- Coral accent (`#FF5630`) + black/white base, locked into `globals.css`
- Type system: Bricolage Grotesque (display) / Manrope (body) / JetBrains
  Mono (labels) — loaded via `next/font/google`, self-hosted, zero layout shift
- Floating pill nav with scroll-spy (`lib/useActiveSection.ts`)
- Production build passes clean (`npm run build`), zero ESLint warnings

**Still open:**
- **Work section** — the 3 cards are concept placeholders (see "Example —
  concept" badge). Swap in real project photos/links once confirmed.
- **Services** — 3 services confirmed (database design, boutique sites,
  landing pages). A "statistics page" mention is still unclear — either a
  4th service or a stats/numbers section elsewhere — pending an answer.
- **Contact form** — needs `RESEND_API_KEY` and `CONTACT_TO_EMAIL` set (see
  `.env.example`) before it can actually send. Free at resend.com, no card.
- **Resume/CV download** — not added yet, waiting on the file.
- **Social links** (LinkedIn, GitHub, etc.) — not added yet, waiting on the
  list.
- **Hero photo** — uploaded portrait is true grayscale (no color data), so
  it stays static rather than blooming into color on hover. Send a color
  version if you want that interaction on the photo too.

