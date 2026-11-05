import type { Metadata } from "next";
import { Sections } from "@/components/sections/Sections";
import { SiteChrome } from "@/components/site/SiteChrome";
import { pages } from "@/content/site";

// Served with a real 404 status for any unknown URL (see src/proxy.ts), so it carries the site chrome itself.
export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <SiteChrome>
      <Sections sections={pages.notfound} pageKey="notfound" path="" />
    </SiteChrome>
  );
}
