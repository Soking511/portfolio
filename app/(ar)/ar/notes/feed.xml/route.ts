import { notesFeed } from "@/lib/feed";

export const dynamic = "force-static";

export function GET() {
  return notesFeed("ar");
}
