import { Sections } from "@/components/sections/Sections";
import { pages } from "@/content/site";

// The (site) layout already renders the header and footer around this.
export default function SiteNotFound() {
  return <Sections sections={pages.notfound} pageKey="notfound" path="" />;
}
