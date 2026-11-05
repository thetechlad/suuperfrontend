import { articles, getPage, plans } from "@/content/site";
import { SITE_URL } from "@/lib/routes";

// schema.org structured data. Everything here mirrors content that is visible on the page.

type Schema = Record<string, unknown>;

const org: Schema = {
  "@type": "Organization",
  "@id": SITE_URL + "/#org",
  name: "Suuper",
  url: SITE_URL,
  logo: SITE_URL + "/logos/suuper.png",
};

const software: Schema = {
  "@type": "SoftwareApplication",
  name: "Suuper",
  url: SITE_URL,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Web",
  description:
    "AI that answers your customers on your website, WhatsApp, Instagram and Messenger, books appointments and captures leads.",
  publisher: { "@id": SITE_URL + "/#org" },
  offers: plans.map((p) => ({
    "@type": "Offer",
    name: p.name,
    description: p.desc,
    price: p.n,
    priceCurrency: "PKR",
    url: SITE_URL + "/pricing",
  })),
};

const label = (segment: string) =>
  segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function breadcrumbs(path: string, current: string): Schema {
  const parts = path.split("/").filter(Boolean);
  return {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...parts.map((p, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: i === parts.length - 1 ? current : label(p),
        item: SITE_URL + "/" + parts.slice(0, i + 1).join("/"),
      })),
    ],
  };
}

export function pageSchemas(pageKey: string, path: string): Schema[] {
  const sections = getPage(pageKey) ?? [];
  const out: Schema[] = [];

  if (pageKey === "home") {
    out.push(org, { "@type": "WebSite", name: "Suuper", url: SITE_URL, publisher: { "@id": SITE_URL + "/#org" } }, software);
  }
  if (pageKey === "pricing") out.push(software);

  const faqItems = sections.flatMap((s) => (s.type === "faq" ? s.items : []));
  if (faqItems.length) {
    out.push({
      "@type": "FAQPage",
      mainEntity: faqItems.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })),
    });
  }

  if (pageKey.startsWith("article-")) {
    const a = articles.find((x) => "article-" + x.slug === pageKey);
    if (a) {
      out.push({
        "@type": "Article",
        headline: a.title,
        description: a.lead,
        image: SITE_URL + a.photo,
        mainEntityOfPage: SITE_URL + path,
        author: { "@id": SITE_URL + "/#org" },
        publisher: org,
      });
      out.push(breadcrumbs(path, a.title));
    }
  } else if (path.split("/").filter(Boolean).length > 1) {
    const first = sections[0];
    const title = first && "title" in first && typeof first.title === "string" ? first.title : undefined;
    out.push(breadcrumbs(path, title ?? label(path.split("/").pop() ?? "")));
  }

  return out;
}

export function JsonLd({ data }: { data: Schema[] }) {
  if (!data.length) return null;
  const json = JSON.stringify({ "@context": "https://schema.org", "@graph": data }).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
