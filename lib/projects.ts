export type ProjectMeta = {
  /** Live URL, or null when the site is no longer reachable. */
  url: string | null;
  /** Basename in /public/work — resolves to <slug>-1440.webp and <slug>-720.webp. */
  image: string | null;
  /** Brand colour, used for the typographic panel when there is no screenshot. */
  swatch: string;
};

// Index matches works.featured[] in components/lang/strings.ts.
//
// image: null means there is no honest screenshot to show — XTranslator is
// currently serving a maintenance page — so the card falls back to a designed
// typographic panel rather than a misleading picture.
export const FEATURED: ProjectMeta[] = [
  { url: "https://eg-pricey.com/", image: "eg-pricey", swatch: "#0B63E5" },
  { url: "https://xtranslator.app/", image: null, swatch: "#111318" },
  { url: "https://tilegreen.org/", image: "tilegreen", swatch: "#0E3A2F" },
];

// Index matches works.selected[] in components/lang/strings.ts.
// url: null means the domain no longer resolves, so no link is rendered.
export const SELECTED: ProjectMeta[] = [
  // UFeed sits behind a login wall and Dr. Genedy no longer resolves, so both
  // fall back to a wordmark tile rather than a misleading screenshot.
  { url: "https://ufeed.thepost.digital/", image: null, swatch: "#3D5A9E" },
  { url: "https://jafy.co/", image: "jafy", swatch: "#2A1E1A" },
  { url: "https://nursing.dmu.edu.eg/", image: "nursing", swatch: "#1E4C8A" },
  { url: null, image: null, swatch: "#8A4A3C" },
];
