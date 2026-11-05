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
  chat: "AI Chatbot for Your Website, WhatsApp & Instagram",
  inbox: "Unified Inbox for WhatsApp, Instagram & Messenger",
  connectors: "AI Connectors for Your Business Tools",
  knowledge: "AI Knowledge Base Trained on Your Business",
  apps: "Build Custom Business Apps with AI",
  workflows: "No-Code AI Workflow Automation",
  agents: "AI Agents That Work for Your Business",
  analytics: "AI Conversation Analytics",
  pricing: "Pricing: AI Chatbot Plans for Small Business",
  industries: "AI Chatbots by Industry",
  resources: "Guides to AI for Small Business",
  security: "Security & Data Protection",
  "ind-clinics": "AI Receptionist & WhatsApp Booking for Clinics",
  "ind-restaurants": "AI Reservation Chatbot for Restaurants",
  "ind-ecommerce": "AI Chatbot for Ecommerce & Online Stores",
  "ind-realestate": "AI Lead Chatbot for Real Estate Agents",
  "ind-gyms": "AI Chatbot for Gyms & Fitness Coaches",
  "ind-agencies": "AI Lead Qualification for Agencies",
  "ind-local": "AI Chatbot for Local Service Businesses",
  "article-small-business": "How Small Businesses Can Use AI",
  "article-customer-questions": "10 Questions Your Website Should Answer",
};

/** Descriptions for pages whose content has no usable summary of 120–160 characters. */
const seoDescriptions: Record<string, string> = {
  chat: "Train Suuper on your business and put an AI assistant on your website that answers questions, qualifies leads and hands complex chats to your team.",
  "ind-gyms":
    "An AI chatbot for gyms and coaches: Suuper explains packages, schedules and trials on your website and WhatsApp, and turns interest into trial sign-ups.",
  "ind-local":
    "An AI chatbot for local service businesses: get service type, location, urgency and job details on WhatsApp and your website before anyone picks up the phone.",
  "ind-realestate":
    "An AI lead chatbot for property agents: Suuper matches buyers to listings, answers location and price questions on WhatsApp and books viewings.",
  security:
    "How Suuper keeps your business data safe: access controls, permissions, human oversight, encryption and full visibility into what your AI does.",
  contact:
    "Talk to the Suuper team about sales, support or partnerships. Show us one task your team does by hand and we'll show you how AI can handle it.",
  demo: "Book a 30-minute Suuper demo: a live build of an AI assistant on your own website content, pricing for your volume, and answers on security and handoff.",
  help: "Answers to common questions about setting up Suuper, training your AI assistant, connecting WhatsApp and Instagram, billing and your account.",
  status: "Live system status for Suuper's AI assistant, messaging channels and dashboard, with recent incident history.",
  privacy: "How Suuper collects, uses and protects your data and your customers' conversation data.",
  terms: "The terms that govern your use of Suuper's AI assistant, inbox, workflows and other products.",
  refunds: "Suuper's refund policy for monthly and yearly plans, and how to request a refund.",
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
