import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Sections } from "@/components/sections/Sections";
import { JsonLd, pageSchemas } from "@/lib/schema";
import { duplicateOf, HOME_DESCRIPTION, HOME_TITLE } from "@/lib/routes";

export { HOME_DESCRIPTION, HOME_TITLE };
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

/**
 * Search titles, written around what people search for. The " · Suuper" suffix is added by the
 * root layout's title template, so keep these under ~50 characters. Visible headings are unchanged.
 */
const seoTitles: Record<string, string> = {
  agencies: "Start an AI Agency: Resell WhatsApp AI Assistants",
  chat: "AI Assistant for WhatsApp, Telegram & Your Website",
  inbox: "Shared WhatsApp & Telegram Inbox with Human Takeover",
  connectors: "Integrations: Slack, Email, Shopify, HubSpot & Google",
  knowledge: "Train an AI Assistant on Your Business Knowledge",
  apps: "Business Apps: Leads, Appointments, Tickets & Expenses",
  workflows: "Workflow Automation for WhatsApp Businesses",
  agents: "AI Agents That Do the Follow-Up",
  pricing: "Pricing: WhatsApp AI Plans with Capped AI Costs",
  industries: "WhatsApp AI Assistants by Industry",
  resources: "Guides to AI for WhatsApp-First Businesses",
  security: "Security: Roles, Audit Log & Your Data",
  "ind-clinics": "AI Receptionist & WhatsApp Booking for Clinics",
  "ind-restaurants": "WhatsApp Reservation Assistant for Restaurants",
  "ind-ecommerce": "WhatsApp AI Assistant for Online Shops",
  "ind-realestate": "WhatsApp Lead Assistant for Real Estate Agents",
  "ind-gyms": "WhatsApp AI Assistant for Gyms & Coaches",
  "ind-local": "WhatsApp AI Assistant for Service Businesses",
  "article-small-business": "How Small Businesses Can Use AI",
  "article-customer-questions": "10 Questions Your Business Should Answer",
};

/** Descriptions for pages whose content has no usable summary of 120–160 characters. */
const seoDescriptions: Record<string, string> = {
  agencies: "Sell WhatsApp AI assistants and business apps to your clients and keep the monthly revenue. Pilot agencies get a free workspace and wholesale pricing.",
  chat: "An AI assistant that answers customers on WhatsApp, Telegram and your website from your own prices and FAQs, and hands chats to your team.",
  pricing: "Starter $97, Growth $297 and Pro $497 a month, each with AI credits that cap AI costs. Agencies get wholesale pricing through the pilot.",
  contact: "Talk to the Suuper team. Show us what your customers ask you on WhatsApp and we'll show you how Suuper can answer it.",
  demo: "Book a 30-minute Suuper demo, or apply for the agency pilot. We set up an assistant on your own prices, FAQs and WhatsApp questions.",
  privacy: "How Suuper collects, uses and protects your data and your customers' conversation data.",
  terms: "The terms that govern your use of Suuper's AI assistant, inbox, apps and workflows.",
  refunds: "How cancellations and refunds work for Suuper plans.",
};

const OG_IMAGE = "/images/og-boutique.jpg";

/** Canonical URL, Open Graph and Twitter tags for one page. */
export function seo({
  title,
  description,
  path,
  type = "website",
  absoluteTitle = false,
}: {
  title?: string;
  description?: string;
  path: string;
  type?: "website" | "article";
  absoluteTitle?: boolean;
}): Metadata {
  const full = title ? (absoluteTitle ? title : `${title} · Suuper`) : HOME_TITLE;
  return {
    title: title ? (absoluteTitle ? { absolute: title } : title) : undefined,
    description,
    alternates: { canonical: duplicateOf[path] ?? path },
    openGraph: { title: full, description, url: path, type, siteName: "Suuper", images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title: full, description, images: [OG_IMAGE] },
  };
}

/** Renders a content page by key, or the 404 page when the key is unknown. */
export function ContentPage({ pageKey, path }: { pageKey: string; path: string }) {
  const sections = getPage(pageKey);
  if (!sections) notFound();
  return (
    <>
      <JsonLd data={pageSchemas(pageKey, path)} />
      <Sections sections={sections} pageKey={pageKey} path={path} />
    </>
  );
}

export function pageMetadata(pageKey: string, path: string): Metadata {
  if (pageKey === "home") return seo({ title: HOME_TITLE, description: HOME_DESCRIPTION, path: "/", absoluteTitle: true });
  const first = getPage(pageKey)?.[0];
  if (!first) return {};
  if (pageKey.startsWith("article-")) {
    const a = articleBySlug.get(pageKey.slice("article-".length));
    return a ? seo({ title: seoTitles[pageKey] ?? a.title, description: a.lead, path, type: "article" }) : {};
  }
  if (first.type === "article") return seo({ title: first.title, description: first.lead, path, type: "article" });
  const title = seoTitles[pageKey] ?? shortTitles[pageKey] ?? ("title" in first ? first.title : undefined);
  const description = seoDescriptions[pageKey] ?? ("body" in first ? first.body : "sub" in first ? first.sub : undefined);
  return seo({ title, description, path });
}
