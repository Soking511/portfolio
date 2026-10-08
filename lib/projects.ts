/**
 * What a visitor finds if they follow the link. Only "live" renders a link —
 * sending someone to a maintenance page or a login wall from a portfolio is a
 * dead end, so the others render an honest label instead.
 */
export type ProjectStatus = "live" | "private" | "maintenance" | "offline";

export type ProjectMeta = {
  /** Anchor id on the home page, and the case-study path segment. */
  slug: string;
  url: string | null;
  status: ProjectStatus;
  /** Basename in /public/work — resolves to <slug>-1440.webp and <slug>-720.webp. */
  image: string | null;
  /** An architecture diagram: in place of a missing screenshot on the home
   *  page, and as its own section on the case-study page. */
  diagram?: "xtranslator" | "eg-pricey";
  /** Brand colour, used for the typographic panel when there is no screenshot. */
  swatch: string;
};

// Index matches works.featured[] in components/lang/strings.ts.
//
// XTranslator is currently serving a maintenance page, so instead of a
// misleading picture its card shows how the system is put together.
export const FEATURED: ProjectMeta[] = [
  {
    slug: "eg-pricey",
    url: "https://eg-pricey.com/",
    status: "live",
    image: "eg-pricey",
    diagram: "eg-pricey",
    swatch: "#0B63E5",
  },
  {
    slug: "xtranslator",
    url: "https://xtranslator.app/",
    status: "maintenance",
    image: null,
    diagram: "xtranslator",
    swatch: "#111318",
  },
  {
    slug: "tilegreen",
    url: "https://tilegreen.org/",
    status: "live",
    image: "tilegreen",
    swatch: "#0E3A2F",
  },
];

// Index matches works.selected[] in components/lang/strings.ts.
export const SELECTED: ProjectMeta[] = [
  // UFeed sits behind a login wall and Dr. Genedy no longer resolves, so both
  // fall back to a wordmark tile rather than a misleading screenshot.
  {
    slug: "ufeed",
    url: "https://ufeed.thepost.digital/",
    status: "private",
    image: null,
    swatch: "#3D5A9E",
  },
  { slug: "jafy", url: "https://jafy.co/", status: "live", image: "jafy", swatch: "#2A1E1A" },
  {
    slug: "nursing",
    url: "https://nursing.dmu.edu.eg/",
    status: "live",
    image: "nursing",
    swatch: "#1E4C8A",
  },
  { slug: "dr-genedy", url: null, status: "offline", image: null, swatch: "#8A4A3C" },
];
