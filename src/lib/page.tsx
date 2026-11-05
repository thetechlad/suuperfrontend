import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sections } from "@/components/sections/Sections";
import { articles, getPage, industries, nav } from "@/content/site";

const articleBySlug = new Map(articles.map((a) => [a.slug, a]));

const shortTitles: Record<string, string> = {
  ...Object.fromEntries([...nav.product, ...nav.company].map((n) => [n.href.slice(1), n.label])),
  ...Object.fromEntries(industries.map((i) => ["ind-" + i.href.split("/").pop(), "Suuper for " + i.name.toLowerCase()])),
  "ind-agencies": "Suuper for agencies",
  industries: "Industries",
  pricing: "Pricing",
  resources: "Resources",
  blog: "Blog",
  demo: "Book a demo",
  changelog: "Changelog",
  help: "Help center",
  status: "System status",
  privacy: "Privacy policy",
  terms: "Terms of service",
  refunds: "Refund policy",
};

/** Renders a content page by key, or the 404 page when the key is unknown. */
export function ContentPage({ pageKey, path }: { pageKey: string; path: string }) {
  const sections = getPage(pageKey);
  if (!sections) notFound();
  return <Sections sections={sections} pageKey={pageKey} path={path} />;
}

export function pageMetadata(pageKey: string): Metadata {
  const first = getPage(pageKey)?.[0];
  if (!first || pageKey === "home") return {};
  if (pageKey.startsWith("article-")) {
    const a = articleBySlug.get(pageKey.slice("article-".length));
    return a ? { title: a.title, description: a.lead } : {};
  }
  if (first.type === "article") return { title: first.title, description: first.lead };
  const title = shortTitles[pageKey] ?? ("title" in first ? first.title : undefined);
  const description = "body" in first ? first.body : "sub" in first ? first.sub : undefined;
  return { title, description };
}
