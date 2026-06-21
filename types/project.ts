export type ProjectVariant = "schema" | "boutique" | "landing";

export type Project = {
  title: string;
  description: string;
  tags: string[];
  variant: ProjectVariant;
  /** Real screenshot, once available — falls back to abstract line art when absent. */
  image?: string;
  href?: string;
  example?: boolean;
};
