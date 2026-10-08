import { HomePage } from "@/components/pages/home";
import { JsonLd } from "@/components/json-ld";
import { homeJsonLd, homeMetadata } from "@/lib/seo";

export const metadata = homeMetadata("ar");

export default function Page() {
  return (
    <>
      <JsonLd data={homeJsonLd("ar")} />
      <HomePage />
    </>
  );
}
