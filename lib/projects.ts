export type ProjectMeta = {
  url: string;
  swatch: string;
  previewBlocked?: boolean;
};

// Index here matches works.items[] order in components/lang/strings.ts.
// previewBlocked: known to set X-Frame-Options: DENY; skip the iframe to save
// memory and the 5s wait. Flip to false once verified embeddable.
export const PROJECTS: ProjectMeta[] = [
  { url: "https://eg-pricey.com/", swatch: "#FFD400" },
  { url: "https://xtranslator.app/", swatch: "#7C5CFF" },
  { url: "https://tilegreen.org/", swatch: "#00E08A" },
  { url: "https://ufeed.thepost.digital/", swatch: "#3D8BFF" },
  { url: "http://jafy.co/", swatch: "#E8E1D2" },
  { url: "https://drgenedy.com/", swatch: "#FF5B2A" },
  { url: "https://nursing.dmu.edu.eg/", swatch: "#A5A29A" },
];
