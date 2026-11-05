import { ContentPage, pageMetadata } from "@/lib/page";

export const metadata = pageMetadata("home", "/");

export default function HomePage() {
  return <ContentPage pageKey="home" path="/" />;
}
