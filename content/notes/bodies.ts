import type { ComponentType } from "react";
import type { Lang } from "@/components/lang/strings";

/**
 * Each published note's MDX body, by language and slug. Kept apart from
 * meta.ts so the nav and the home strip can list notes without pulling every
 * body into the browser bundle — only the note pages, rendered at build
 * time, import this.
 *
 *   import staleEn from "./en/a-stale-price.mdx";
 *   export const NOTE_BODIES = { en: { "a-stale-price": staleEn }, ar: {} };
 */
export const NOTE_BODIES: Record<Lang, Record<string, ComponentType>> = { en: {}, ar: {} };
