export type ProjectVariant = "schema" | "boutique" | "landing";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  about: string;
  features: string[];
  tags: string[];
  coverImage: string;
  images?: string[];
  liveUrl?: string;
  sourceUrl?: string;
};