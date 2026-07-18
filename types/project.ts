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