import { CaseStudyPage } from "@/components/pages/case-study";
import { JsonLd } from "@/components/json-ld";
import { FEATURED } from "@/lib/projects";
import { caseStudyJsonLd, caseStudyMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return FEATURED.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props) {
  return caseStudyMetadata("ar", (await params).slug);
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  return (
    <>
      <JsonLd data={caseStudyJsonLd("ar", slug)} />
      <CaseStudyPage slug={slug} />
    </>
  );
}
