import type { Metadata } from "next";
import { STRINGS, type Lang } from "@/components/lang/strings";
import { FEATURED } from "@/lib/projects";
import { EMAIL, GITHUB_URL, LINKEDIN_URL, SITE_URL } from "@/lib/site";
import { languageAlternates, localize, notesPath, workPath } from "@/lib/i18n";
import { findNote, notesIn } from "@/content/notes/meta";

const OG_LOCALE: Record<Lang, string> = { en: "en_US", ar: "ar_EG" };

/**
 * Metadata for one page. Every page sets its own canonical and hreflang set:
 * a layout-level canonical would be inherited by every child page and tell
 * search engines that each case study is a copy of the home page.
 */
function pageMetadata({
  lang,
  path,
  title,
  description,
  image,
  imageAlt,
  type = "website",
  languages = languageAlternates(path),
  extra = {},
}: {
  lang: Lang;
  /** Language-neutral path, e.g. "/" or "/work/eg-pricey/". */
  path: string;
  /** Null uses the layout's default (un-templated) title. */
  title: string | null;
  description: string;
  image: string;
  imageAlt: string;
  type?: "website" | "article";
  /** hreflang map; defaults to the page's twin in the other language. */
  languages?: Record<string, string>;
  extra?: Partial<Metadata>;
}): Metadata {
  const url = localize(lang, path);
  const fullTitle = title ?? STRINGS[lang].seo.title;
  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url, languages },
    openGraph: {
      type,
      url,
      siteName: "Youseef Tareq",
      title: fullTitle,
      description,
      locale: OG_LOCALE[lang],
      alternateLocale: [OG_LOCALE[lang === "en" ? "ar" : "en"]],
      images: [{ url: image, width: 1200, height: 630, alt: imageAlt }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description, images: [image] },
    ...extra,
  };
}

/** Shared by both root layouts: everything that is not page-specific. */
export function layoutMetadata(lang: Lang): Metadata {
  const S = STRINGS[lang].seo;
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: S.title, template: S.title_template },
    description: S.description,
    authors: [{ name: "Youseef Tareq", url: SITE_URL }],
    creator: "Youseef Tareq",
    robots: { index: true, follow: true },
    icons: {
      icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
      apple: "/apple-icon.png",
    },
  };
}

export function homeMetadata(lang: Lang): Metadata {
  const S = STRINGS[lang].seo;
  return pageMetadata({
    lang,
    path: "/",
    title: null,
    description: S.description,
    image: "/og.png",
    imageAlt: S.og_alt,
  });
}

export function caseStudyMetadata(lang: Lang, slug: string): Metadata {
  const { project } = findProject(lang, slug);
  return pageMetadata({
    lang,
    path: `/work/${slug}/`,
    title: `${project.title} — ${project.kicker}`,
    description: `${project.problem} ${project.built}`,
    image: `/og/${slug}.png`,
    imageAlt: `${project.title} — ${project.kicker}`,
    type: "article",
  });
}

const FEED_TYPE = "application/rss+xml";

/**
 * Notes are written per language, so hreflang only names a counterpart that
 * exists. An index with no notes yet is kept out of search entirely.
 */
export function notesIndexMetadata(lang: Lang): Metadata {
  const N = STRINGS[lang].notes;
  const other: Lang = lang === "en" ? "ar" : "en";
  const languages: Record<string, string> = { [lang]: notesPath(lang) };
  if (notesIn(other).length) languages[other] = notesPath(other);
  const hasNotes = notesIn(lang).length > 0;
  return pageMetadata({
    lang,
    path: "/notes/",
    title: N.title,
    description: N.intro,
    image: "/og.png",
    imageAlt: STRINGS[lang].seo.og_alt,
    languages,
    extra: {
      robots: { index: hasNotes, follow: true },
      alternates: {
        canonical: notesPath(lang),
        languages,
        types: { [FEED_TYPE]: localize(lang, "/notes/feed.xml") },
      },
    },
  });
}

export function noteMetadata(lang: Lang, slug: string): Metadata {
  const note = findNote(lang, slug);
  const other: Lang = lang === "en" ? "ar" : "en";
  const languages: Record<string, string> = { [lang]: notesPath(lang, slug) };
  if (note.translation) languages[other] = notesPath(other, note.translation);
  return pageMetadata({
    lang,
    path: `/notes/${slug}/`,
    title: note.title,
    description: note.description,
    image: "/og.png",
    imageAlt: note.title,
    type: "article",
    languages,
    extra: {
      alternates: {
        canonical: notesPath(lang, slug),
        languages,
        types: { [FEED_TYPE]: localize(lang, "/notes/feed.xml") },
      },
    },
  });
}

export function noteJsonLd(lang: Lang, slug: string) {
  const note = findNote(lang, slug);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: note.title,
    description: note.description,
    datePublished: note.date,
    inLanguage: lang,
    url: `${SITE_URL}${notesPath(lang, slug)}`,
    image: `${SITE_URL}/og.png`,
    author: person(lang),
  };
}

export function findProject(lang: Lang, slug: string) {
  const index = FEATURED.findIndex((m) => m.slug === slug);
  if (index < 0) throw new Error(`Unknown case study: ${slug}`);
  return { index, meta: FEATURED[index], project: STRINGS[lang].works.featured[index] };
}

// ── structured data ────────────────────────────────────────────────────────

function person(lang: Lang) {
  return {
    "@type": "Person",
    "@id": `${SITE_URL}/#person`,
    name: "Youseef Tareq",
    alternateName: "يوسف طارق",
    url: SITE_URL,
    jobTitle: lang === "ar" ? "مهندس ويب شامل" : "Full-Stack Engineer",
    description: STRINGS[lang].seo.description,
    knowsLanguage: ["en", "ar"],
    knowsAbout: ["Angular", "Node.js", "TypeScript", "MongoDB", "PostgreSQL", "Django", "Cloudflare", "RTL web development"],
    worksFor: { "@type": "Organization", name: "The POST" },
    address: { "@type": "PostalAddress", addressLocality: "Cairo", addressCountry: "EG" },
    email: EMAIL,
    sameAs: [GITHUB_URL, LINKEDIN_URL],
  };
}

export function homeJsonLd(lang: Lang) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      person(lang),
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: `${SITE_URL}${localize(lang, "/")}`,
        name: "Youseef Tareq",
        inLanguage: lang,
        author: { "@id": `${SITE_URL}/#person` },
      },
    ],
  };
}

export function caseStudyJsonLd(lang: Lang, slug: string) {
  const { meta, project } = findProject(lang, slug);
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: `${project.title} — ${project.kicker}`,
    description: project.built,
    url: `${SITE_URL}${workPath(lang, slug)}`,
    inLanguage: lang,
    dateCreated: toLatinDigits(project.year),
    image: `${SITE_URL}/og/${slug}.png`,
    keywords: project.stack.join(", "),
    author: person(lang),
    ...(meta.status === "live" && meta.url ? { sameAs: meta.url } : {}),
  };
}

/** "٢٠٢٥" → "2025": schema.org dates must be ISO digits. */
function toLatinDigits(s: string) {
  return s.replace(/[٠-٩]/g, (d) => String("٠١٢٣٤٥٦٧٨٩".indexOf(d)));
}
