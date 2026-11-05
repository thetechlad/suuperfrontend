import { topLevelPages } from "@/content/site";
import { ContentPage, pageMetadata } from "@/lib/page";

// Every valid param is prerendered; blocking here keeps a real 404 status for unknown URLs.
export const instant = false;

export function generateStaticParams() {
  return topLevelPages.map((page) => ({ page }));
}

export async function generateMetadata({ params }: PageProps<"/[page]">) {
  const { page } = await params;
  return pageMetadata(page, "/" + page);
}

export default async function Page({ params }: PageProps<"/[page]">) {
  const { page } = await params;
  return <ContentPage pageKey={topLevelPages.includes(page) ? page : ""} path={"/" + page} />;
}
