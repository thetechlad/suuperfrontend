import type { MetadataRoute } from "next";
import { publicPaths, SITE_URL } from "@/lib/routes";

const legal = new Set(["/privacy", "/terms", "/refunds", "/status"]);

export default function sitemap(): MetadataRoute.Sitemap {
  return publicPaths.map((path) => ({
    url: SITE_URL + (path === "/" ? "" : path),
    changeFrequency: legal.has(path) ? "yearly" : "weekly",
    priority: path === "/" ? 1 : legal.has(path) ? 0.3 : path.split("/").length > 2 ? 0.7 : 0.8,
  }));
}
