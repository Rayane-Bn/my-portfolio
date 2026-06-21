import { clsx, type ClassValue } from "clsx";

/** Merge conditional class names. One tiny helper, used everywhere instead of manual template strings. */
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
