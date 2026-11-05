import { industryPages } from "@/content/site";
import { ContentPage, pageMetadata } from "@/lib/page";

// Every valid param is prerendered; blocking here keeps a real 404 status for unknown URLs.
export const instant = false;

export function generateStaticParams() {
  return industryPages.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  return pageMetadata("ind-" + slug, "/industries/" + slug);
}

export default async function IndustryPage({ params }: PageProps<"/industries/[slug]">) {
  const { slug } = await params;
  return <ContentPage pageKey={"ind-" + slug} path={"/industries/" + slug} />;
}
