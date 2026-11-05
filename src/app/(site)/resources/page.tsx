import { ContentPage, pageMetadata } from "@/lib/page";

export const metadata = pageMetadata("resources", "/resources");

export default function ResourcesPage() {
  return <ContentPage pageKey="resources" path="/resources" />;
}
