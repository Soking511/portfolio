/**
 * What a visitor finds if they follow the link. "live" links to the running
 * site and "source" to its public code — sending someone to a maintenance
 * page or a login wall from a portfolio is a dead end, so the others render
 * an honest label instead.
 */
export type ProjectStatus = "live" | "source" | "private" | "maintenance" | "offline" | "unreleased";

/** The six tints in app/globals.css. Each featured project owns one. */
export type Tint = "peach" | "lilac" | "sky" | "amber" | "blue" | "mint";

export type ProjectMeta = {
  /** Anchor id on the home page, and the case-study path segment. */
  slug: string;
  url: string | null;
  status: ProjectStatus;
  /** Basename in /public/work — resolves to <slug>-1440.webp and <slug>-720.webp. */
  image: string | null;
  /** An architecture diagram: in place of a missing screenshot on the home
   *  page, and as its own section on the case-study page. */
  diagram?: "xtranslator" | "eg-pricey" | "menuvista" | "ufeed";
  /** The colour its picture sits on, here and on its case study. */
  tint?: Tint;
};

// Index matches works.featured[] in components/lang/strings.ts.
//
// XTranslator has no screenshot (its first screen is a consent banner), so
// its card shows how the system is put together instead.
export const FEATURED: ProjectMeta[] = [
  // Its public domain doesn't serve a valid certificate yet, so no link until
  // it does; then set url and status "live".
  {
    slug: "menuvista",
    url: null,
    status: "unreleased",
    image: "menuvista",
    diagram: "menuvista",
    tint: "peach",
  },
  // Behind a login, so its card shows how it works instead of a screenshot.
  {
    slug: "ufeed",
    url: "https://ufeed.thepost.digital/",
    status: "private",
    image: null,
    diagram: "ufeed",
    tint: "lilac",
  },
  {
    // The university site and every faculty site. The screenshot is the
    // Faculty of Nursing's: the main site's icon font returns 404 just now.
    slug: "damanhour-university",
    url: "https://www.dmu.edu.eg/",
    status: "live",
    image: "nursing",
    tint: "sky",
  },
  {
    slug: "eg-pricey",
    url: "https://eg-pricey.com/",
    status: "live",
    image: "eg-pricey",
    diagram: "eg-pricey",
    tint: "amber",
  },
  {
    slug: "xtranslator",
    url: "https://xtranslator.app/",
    status: "live",
    image: null,
    diagram: "xtranslator",
    tint: "blue",
  },
  {
    slug: "tilegreen",
    url: "https://tilegreen.org/",
    status: "live",
    image: "tilegreen",
    tint: "mint",
  },
];

// Index matches works.selected[] in components/lang/strings.ts.
export const SELECTED: ProjectMeta[] = [
  // Dr. Genedy no longer resolves, so it falls back to a wordmark tile rather
  // than a misleading screenshot.
  // No public deployment, but the code is public and is the clearest look at
  // the back end: auth, validation and real-time record locking.
  {
    slug: "contact-management",
    url: "https://github.com/Soking511/ContactManagement",
    status: "source",
    image: null,
  },
  { slug: "jafy", url: "https://jafy.co/", status: "live", image: "jafy" },
  { slug: "dr-genedy", url: null, status: "offline", image: null },
];
