import { articles } from "@/content/site";
import { ContentPage, pageMetadata } from "@/lib/page";

// Every valid param is prerendered; blocking here keeps a real 404 status for unknown URLs.
export const instant = false;

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  return pageMetadata("article-" + slug, "/resources/" + slug);
}

export default async function ArticlePage({ params }: PageProps<"/resources/[slug]">) {
  const { slug } = await params;
  return <ContentPage pageKey={"article-" + slug} path={"/resources/" + slug} />;
}
