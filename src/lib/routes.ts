import { views } from "@/content/dashboard";
import { articles, customerPages, industryPages, topLevelPages } from "@/content/site";

export const SITE_URL = "https://suuper.cc";

export const HOME_TITLE = "Suuper — AI Chatbot for WhatsApp, Instagram & Your Website";
export const HOME_DESCRIPTION =
  "AI that answers your customers on your website, WhatsApp, Instagram and Messenger, books appointments and captures leads around the clock. Start free.";

/** Pages whose content duplicates another page; they canonicalise to it and stay out of the sitemap. */
export const duplicateOf: Record<string, string> = { "/blog": "/resources" };

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
  "/login",
  "/signup",
  "/app",
  ...Object.keys(views)
    .filter((v) => v !== "overview")
    .map((v) => "/app/" + v),
]);
