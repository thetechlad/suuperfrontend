import { articles, customerPages, industryPages, topLevelPages } from "@/content/site";

export const SITE_URL = "https://suuper.cc";

export const HOME_TITLE = "Suuper — AI Employees for WhatsApp-First Businesses";
export const HOME_DESCRIPTION =
  "Suuper answers your customers on WhatsApp, Telegram and your website, books appointments, captures leads and hands over to your team. For businesses and agencies.";

/** Pages whose content duplicates another page; they canonicalise to it and stay out of the sitemap. */
export const duplicateOf: Record<string, string> = {};

/** Public marketing pages, in sitemap order. */
export const publicPaths: string[] = [
  "/",
  ...topLevelPages.map((p) => "/" + p).filter((p) => !(p in duplicateOf)),
  "/industries",
  ...industryPages.map((s) => "/industries/" + s),
  "/resources",
  ...articles.map((a) => "/resources/" + a.slug),
  ...customerPages.map((s) => "/customers/" + s),
];

/** Every page path the site serves, including ones kept out of search. Anything else is a 404. */
export const knownPaths = new Set<string>([
  ...publicPaths,
  ...Object.keys(duplicateOf),
]);
