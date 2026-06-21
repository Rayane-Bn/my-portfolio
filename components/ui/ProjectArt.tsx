import type { ProjectVariant } from "@/types/project";

function SchemaArt() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full">
      <rect x="20" y="20" width="64" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="100" width="64" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="156" y="60" width="64" height="40" rx="6" stroke="currentColor" strokeWidth="2" />
      <circle cx="32" cy="34" r="3" fill="currentColor" />
      <circle cx="32" cy="114" r="3" fill="currentColor" />
      <circle cx="168" cy="74" r="3" fill="currentColor" />
      <path d="M84 40 H140 V80 H156" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M84 120 H140 V80" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="28" x2="64" y2="28" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="32" y1="46" x2="56" y2="46" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="32" y1="108" x2="64" y2="108" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="32" y1="126" x2="56" y2="126" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="168" y1="68" x2="200" y2="68" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="168" y1="86" x2="192" y2="86" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

function BoutiqueArt() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full">
      <rect x="20" y="16" width="200" height="34" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="64" width="56" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="92" y="64" width="56" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
      <rect x="164" y="64" width="56" height="56" rx="6" stroke="currentColor" strokeWidth="2" />
      <line x1="32" y1="32" x2="80" y2="32" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <circle cx="204" cy="32" r="6" fill="currentColor" opacity="0.5" />
      <line x1="20" y1="134" x2="76" y2="134" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="92" y1="134" x2="148" y2="134" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <line x1="164" y1="134" x2="220" y2="134" stroke="currentColor" strokeWidth="2" opacity="0.4" />
    </svg>
  );
}

function LandingArt() {
  return (
    <svg viewBox="0 0 240 160" fill="none" className="h-full w-full">
      <line x1="20" y1="24" x2="220" y2="24" stroke="currentColor" strokeWidth="2" opacity="0.4" />
      <rect x="20" y="46" width="120" height="14" rx="3" fill="currentColor" opacity="0.7" />
      <rect x="20" y="68" width="90" height="10" rx="3" fill="currentColor" opacity="0.3" />
      <rect x="20" y="92" width="56" height="22" rx="11" stroke="currentColor" strokeWidth="2" />
      <rect x="156" y="46" width="64" height="64" rx="8" stroke="currentColor" strokeWidth="2" />
      <rect x="20" y="132" width="48" height="16" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <rect x="80" y="132" width="48" height="16" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
      <rect x="140" y="132" width="48" height="16" rx="4" stroke="currentColor" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}

const ART: Record<ProjectVariant, () => React.ReactElement> = {
  schema: SchemaArt,
  boutique: BoutiqueArt,
  landing: LandingArt,
};

/** Abstract line-art placeholder, used until a project has a real screenshot. */
export function ProjectArt({ variant }: { variant: ProjectVariant }) {
  const Art = ART[variant];
  return <Art />;
}
