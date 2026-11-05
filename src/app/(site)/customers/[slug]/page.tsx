import { customerPages } from "@/content/site";
import { ContentPage, pageMetadata } from "@/lib/page";

// Every valid param is prerendered; blocking here keeps a real 404 status for unknown URLs.
export const instant = false;

export function generateStaticParams() {
  return customerPages.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/customers/[slug]">) {
  const { slug } = await params;
  return pageMetadata("case-" + slug);
}

export default async function CustomerStoryPage({ params }: PageProps<"/customers/[slug]">) {
  const { slug } = await params;
  return <ContentPage pageKey={"case-" + slug} path={"/customers/" + slug} />;
}
