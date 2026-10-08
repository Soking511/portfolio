import { notFound } from "next/navigation";
import { NotesIndexPage } from "@/components/pages/notes-index";
import { NotePage } from "@/components/pages/note";
import { JsonLd } from "@/components/json-ld";
import { NOTE_BODIES } from "@/content/notes/bodies";
import { findNote, notesIn } from "@/content/notes/meta";
import { noteJsonLd, noteMetadata, notesIndexMetadata } from "@/lib/seo";

// One optional catch-all for the index (no slug) and every note, so the list
// of static params is never empty — static export rejects an empty list,
// which is exactly the state before the first note is published.
type Props = { params: Promise<{ slug?: string[] }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ slug: [] }, ...notesIn("en").map((n) => ({ slug: [n.slug] }))];
}

export async function generateMetadata({ params }: Props) {
  const [slug] = (await params).slug ?? [];
  return slug ? noteMetadata("en", slug) : notesIndexMetadata("en");
}

export default async function Page({ params }: Props) {
  const [slug] = (await params).slug ?? [];
  if (!slug) return <NotesIndexPage />;

  const Body = NOTE_BODIES.en[slug];
  if (!Body) notFound();
  return (
    <>
      <JsonLd data={noteJsonLd("en", slug)} />
      <NotePage note={findNote("en", slug)}>
        <Body />
      </NotePage>
    </>
  );
}
