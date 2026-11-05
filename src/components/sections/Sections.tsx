import type { Section } from "@/content/types";
import { AnalyticsPanel, InboxPanel } from "@/components/product";
import { SectionHeader } from "@/components/ui";
import { Hero } from "./Hero";
import { Builder, Contact, ConnectorFlow, Demo, Faq, Pricing, Roi } from "./interactive";
import { Bento, Cases, DarkBand, Hire, Logos, NumStats, OHero, Proof, Status, Trust, Vs, WorkflowAnim } from "./showcase";
import { Book, ChannelDemo, Changelog, Help, Jobs, Slider, UseCases, VideoTestimonials } from "./showcase-interactive";
import {
  Article,
  type Band,
  Cards,
  Chips,
  Compare,
  Connectors,
  CtaBand,
  Flow,
  Flows,
  Groups,
  Industries,
  Legal,
  Marquee,
  Problem,
  Quote,
  Split,
  Stats,
  Story,
  Table,
  Wrap,
} from "./static";

/** Full-bleed sections that don't take part in the alternating plain/dotted bands. */
const bandless = new Set<Section["type"]>([
  "ohero", "logos", "numstats", "bento", "vs", "proof", "hero", "marquee", "cta", "pricing", "contact", "article", "legal",
  "darkband", "trust", "hire", "book", "changelog", "help", "status",
]);
/** Sections numbered in their kicker pill even though they carry no `kicker` field of their own. */
const alwaysNumbered = new Set<Section["type"]>(["industries", "numstats", "bento", "usecases", "vs", "proof"]);

function SectionView({ s, band, num, path }: { s: Section; band: Band; num: string; path: string }) {
  switch (s.type) {
    case "hero": return <Hero s={s} />;
    case "marquee": return <Marquee s={s} />;
    case "problem": return <Problem s={s} band={band} num={num} />;
    case "cards": return <Cards s={s} band={band} num={num} />;
    case "flow": return <Flow s={s} band={band} num={num} />;
    case "flows": return <Flows s={s} band={band} num={num} />;
    case "split": return <Split s={s} band={band} num={num} />;
    case "groups": return <Groups s={s} band={band} num={num} />;
    case "chips": return <Chips s={s} band={band} num={num} />;
    case "table": return <Table s={s} band={band} num={num} />;
    case "story": return <Story s={s} band={band} num={num} />;
    case "stats": return <Stats s={s} band={band} />;
    case "roi": return <Roi s={s} band={band} />;
    case "industries": return <Industries s={s} band={band} num={num} />;
    case "quote": return <Quote s={s} band={band} />;
    case "faq": return <Faq s={s} band={band} />;
    case "demo": return <Demo s={s} band={band} num={num} />;
    case "connectors": return <Connectors s={s} band={band} num={num} />;
    case "connector": return <ConnectorFlow s={s} band={band} num={num} />;
    case "builder": return <Builder s={s} band={band} num={num} />;
    case "inbox":
      return (
        <Wrap band={band}>
          <div className="mb-12">
            <SectionHeader num={num} kicker={s.kicker} title={s.title} />
          </div>
          <InboxPanel />
        </Wrap>
      );
    case "analytics":
      return (
        <Wrap band={band}>
          <div className="mb-12">
            <SectionHeader num={num} kicker={s.kicker} title={s.title} />
          </div>
          <AnalyticsPanel />
        </Wrap>
      );
    case "pricing": return <Pricing s={s} />;
    case "contact": return <Contact s={s} />;
    case "cta": return <CtaBand s={s} />;
    case "article": return <Article s={s} />;
    case "legal": return <Legal s={s} path={path} />;
    case "compare": return <Compare s={s} num={num} />;
    case "ohero": return <OHero s={s} />;
    case "logos": return <Logos />;
    case "numstats": return <NumStats s={s} num={num} />;
    case "bento": return <Bento s={s} num={num} />;
    case "usecases": return <UseCases s={s} num={num} />;
    case "vs": return <Vs s={s} num={num} />;
    case "proof": return <Proof s={s} num={num} />;
    case "chdemo": return <ChannelDemo s={s} band={band} num={num} />;
    case "wfanim": return <WorkflowAnim s={s} band={band} num={num} />;
    case "slider": return <Slider s={s} band={band} num={num} />;
    case "darkband": return <DarkBand s={s} num={num} />;
    case "trust": return <Trust s={s} />;
    case "cases": return <Cases s={s} band={band} num={num} />;
    case "vidtest": return <VideoTestimonials s={s} band={band} num={num} />;
    case "hire": return <Hire s={s} num={num} />;
    case "book": return <Book s={s} />;
    case "changelog": return <Changelog s={s} />;
    case "help": return <Help s={s} />;
    case "jobs": return <Jobs s={s} band={band} num={num} />;
    case "status": return <Status s={s} />;
  }
}

export function Sections({ sections, pageKey, path }: { sections: Section[]; pageKey: string; path: string }) {
  let k = 0;
  let n = 0;
  return (
    <>
      {sections.map((s, idx) => {
        if (!bandless.has(s.type)) k++;
        const band: Band = k % 2 === 0 ? "band-dotted" : "band-plain";
        if (("kicker" in s && s.kicker) || alwaysNumbered.has(s.type)) n++;
        const num = (n < 10 ? "0" : "") + n;
        return (
          <div key={idx} id={s.id ?? `${pageKey}-${idx}`} className="animate-[fadein_.45s_both]">
            <SectionView s={s} band={band} num={num} path={path} />
          </div>
        );
      })}
    </>
  );
}
