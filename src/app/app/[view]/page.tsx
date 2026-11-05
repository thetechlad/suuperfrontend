import { notFound } from "next/navigation";
import { Blocks } from "@/components/dashboard/Blocks";
import { appTitles, views } from "@/content/dashboard";

// Every valid param is prerendered; blocking here keeps a real 404 status for unknown URLs.
export const instant = false;

const viewKeys = Object.keys(views).filter((v) => v !== "overview");

export function generateStaticParams() {
  return viewKeys.map((view) => ({ view }));
}

export async function generateMetadata({ params }: PageProps<"/app/[view]">) {
  const { view } = await params;
  return { title: appTitles[view] };
}

export default async function ViewPage({ params }: PageProps<"/app/[view]">) {
  const { view } = await params;
  if (!viewKeys.includes(view)) notFound();
  return <Blocks blocks={views[view]} />;
}
