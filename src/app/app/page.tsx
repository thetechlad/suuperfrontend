import { Blocks } from "@/components/dashboard/Blocks";
import { views } from "@/content/dashboard";

export default function OverviewPage() {
  return <Blocks blocks={views.overview} />;
}
