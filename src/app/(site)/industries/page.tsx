import { ContentPage, pageMetadata } from "@/lib/page";

export const metadata = pageMetadata("industries");

export default function IndustriesPage() {
  return <ContentPage pageKey="industries" path="/industries" />;
}
