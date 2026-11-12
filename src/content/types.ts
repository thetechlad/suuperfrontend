export type ButtonVariant = "primary" | "outline" | "dark" | "outlineDark";

export type Cta = { label: string; href: string; variant: ButtonVariant };
export type Card = { tag: string; title: string; body: string; href: string; cta: string };
export type Mock = { label: string; ask: string; reply: string };
export type HeroMock = { status: string; sub: string; ask: string; reply: string; time: string };
export type Detail = { n: string; t: string; b: string };
export type TextBlock = { h: string; p: string };

type Base = { id?: string };

export type HeroSection = Base & {
  type: "hero";
  title: string;
  body: string;
  body2?: string;
  pill?: string;
  pillHref?: string;
  ctas: Cta[];
  micro?: string;
  mock?: HeroMock;
  orbit?: string[];
};
export type MarqueeSection = Base & { type: "marquee"; items: string[] };
export type ProblemSection = Base & { type: "problem"; kicker: string; title: string; lines: [string, string][]; punch: string };
export type CardsSection = Base & { type: "cards"; kicker: string; title: string; sub?: string; items: Card[]; min?: number };
export type FlowSection = Base & { type: "flow"; kicker: string; title: string; sub?: string; steps: string[]; detail?: Detail[]; note?: string };
export type FlowsSection = Base & { type: "flows"; kicker: string; title: string; rows: { name: string; steps: string[] }[] };
export type SplitSection = Base & {
  type: "split";
  flip?: boolean;
  kicker: string;
  title: string;
  body: string;
  points: string[];
  ctas: Cta[];
  photo: string;
  mock: Mock;
};
export type GroupsSection = Base & { type: "groups"; kicker: string; title: string; groups: { label: string; items: string[] }[] };
export type ChipsSection = Base & { type: "chips"; kicker: string; title: string; items: string[] };
export type TableSection = Base & { type: "table"; kicker: string; title: string; head: [string, string]; rows: [string, string][] };
export type StorySection = Base & { type: "story"; kicker: string; lines: string[] };
export type StatsSection = Base & { type: "stats"; items: { value: string; label: string }[]; note: string };
export type RoiSection = Base & { type: "roi"; title: string; sub: string; cta: string };
export type IndustriesSection = Base & { type: "industries"; title: string; sub: string; note: string };
export type QuoteSection = Base & {
  type: "quote";
  text: string;
  name: string;
  role: string;
  src: string;
  photo: string;
  metric: string;
  metricLabel: string;
};
export type FaqSection = Base & { type: "faq"; title: string; items: [string, string][] };
export type DemoSection = Base & { type: "demo"; kicker: string; title: string; body: string };
export type ConnectorsSection = Base & { type: "connectors"; kicker: string; title: string; cats: { name: string; tools: string[] }[] };
export type ConnectorSection = Base & { type: "connector"; kicker: string; title: string; sub: string };
export type BuilderSection = Base & { type: "builder"; kicker: string; title: string; prompt: string };
export type InboxSection = Base & { type: "inbox"; kicker: string; title: string };
export type AnalyticsSection = Base & { type: "analytics"; kicker: string; title: string };
export type PricingSection = Base & { type: "pricing"; title: string; sub: string };
export type ContactSection = Base & { type: "contact"; title: string; sub: string; questions: string[] };
export type CtaSection = Base & { type: "cta"; title: string; body: string; ctas: Cta[]; micro?: string };
export type ArticleSection = Base & {
  type: "article";
  tag: string;
  read: string;
  title: string;
  lead: string;
  photo: string;
  sections: TextBlock[];
  nextTitle: string;
  nextHref: string;
};
export type LegalSection = Base & { type: "legal"; title: string; updated: string; sections: TextBlock[] };
export type CompareSection = Base & { type: "compare"; kicker: string; title: string; cols: string[]; rows: string[][] };

// Home-page blocks (v3 of the design).
export type ChatLine = { me: boolean; text: string; check?: string };
export type OHeroSection = Base & {
  type: "ohero";
  badge: string;
  title: string;
  accent: string;
  body: string;
  links: Cta[];
  ctas: Cta[];
  tagline: string;
  phone: { name: string; status: string; channel: string; time: string; lines: ChatLine[] };
  channels: { label: string; icon: string }[];
};
export type LogosSection = Base & { type: "logos" };
export type NumStatsSection = Base & {
  type: "numstats";
  kicker: string;
  note: string;
  title: string;
  accent: string;
  aside: string;
  items: { value: string; label: string; sub: string }[];
};
export type BentoTone = "paper" | "dark" | "teal" | "peach";
export type BentoSection = Base & {
  type: "bento";
  kicker: string;
  title: string;
  accent: string;
  sub: string;
  items: ({ title: string; body: string; href: string; icon: string; tone: BentoTone } | { photo: string; ask: string; answer: string })[];
};
export type UseCasesSection = Base & {
  type: "usecases";
  kicker: string;
  intro: string;
  title: string;
  accent: string;
  items: { tag: string; title: string; stat: string; statLabel: string; stat2: string; stat2Label: string; body: string; href: string }[];
};
export type VsSection = Base & {
  type: "vs";
  kicker: string;
  /** The title is rendered as titleA + circled word + titleC. */
  title: [string, string, string];
  sub: string;
  cols: string[];
  rows: string[][];
  ctas: Cta[];
};
export type ProofSection = Base & {
  type: "proof";
  kicker: string;
  title: string;
  badges: { name: string; score: string; icon?: string }[];
  app: { kicker: string; title: string; body: string };
};
export type ChannelDemoSection = Base & {
  type: "chdemo";
  kicker: string;
  title: string;
  sub: string;
  channels: { key: string; label: string; who: string; stat: string; msgs: { ai: boolean; text: string }[]; action: string }[];
};
export type WorkflowAnimSection = Base & {
  type: "wfanim";
  kicker: string;
  title: string;
  sub: string;
  prompt: string;
  nodes: { tag: string; t: string; meta: string; icon: string }[];
  log: string[];
};
export type SliderSection = Base & {
  type: "slider";
  kicker: string;
  title: string;
  sub: string;
  rows: { n: string; ch: string; m: string; t: string; r: string }[];
  before: string;
  after: string;
};
export type DarkBandSection = Base & { type: "darkband"; kicker: string; title: string; sub: string; points: [string, string][] };
export type TrustSection = Base & { type: "trust"; title: string; items: [string, string][] };
export type CaseStudy = { slug: string; co: string; ind: string; photo: string; metric: string; ml: string; quote: string };
export type CasesSection = Base & { type: "cases"; kicker: string; title: string; items: CaseStudy[] };
export type VideoTestimonial = { name: string; role: string; photo: string; dur: string; q: string };
export type VidTestSection = Base & { type: "vidtest"; kicker: string; title: string; items: VideoTestimonial[] };
type HireSide = { label: string; rows: [string, string][]; total: string; per: string };
export type HireSection = Base & { type: "hire"; kicker: string; title: string; sub: string; a: HireSide; b: HireSide; save: string };

// v3 pages.
export type BookSection = Base & { type: "book"; points: string[] };
export type ChangelogEntry = { d: string; v: string; tag: "NEW" | "IMPROVED" | "FIXED"; t: string; b: string; img: string; points: string[] };
export type ChangelogSection = Base & { type: "changelog"; items: ChangelogEntry[] };
export type HelpSection = Base & {
  type: "help";
  /** [title, description, article count, icon path] */
  cats: [string, string, string, string][];
  /** [category, title] */
  articles: [string, string][];
};
export type JobsSection = Base & { type: "jobs"; kicker: string; title: string; items: [string, string, string, string][] };
export type StatusSection = Base & {
  type: "status";
  /** `bad` lists the days (0 = 90 days ago) with an incident. */
  comps: { n: string; up: string; bad: number[] }[];
  incidents: [string, string, string][];
};

/** A real product screenshot (files in public/screens). */
export type Screen = { src: string; alt: string; label: string; caption: string; path: string };
/** Tabbed tour of product screenshots. */
export type ScreensSection = Base & { type: "screens"; kicker: string; title: string; sub?: string; items: Screen[] };
/** Text beside one framed product screenshot. */
export type ShotSection = Base & {
  type: "shot";
  flip?: boolean;
  kicker: string;
  title: string;
  body: string;
  points: string[];
  ctas: Cta[];
  screen: Screen;
};
/** A product video (files in public/videos). */
export type VideoSection = Base & { type: "video"; kicker: string; title: string; sub?: string; src: string; poster: string; caption: string };

export type Section =
  | ScreensSection
  | ShotSection
  | VideoSection
  | HeroSection
  | MarqueeSection
  | ProblemSection
  | CardsSection
  | FlowSection
  | FlowsSection
  | SplitSection
  | GroupsSection
  | ChipsSection
  | TableSection
  | StorySection
  | StatsSection
  | RoiSection
  | IndustriesSection
  | QuoteSection
  | FaqSection
  | DemoSection
  | ConnectorsSection
  | ConnectorSection
  | BuilderSection
  | InboxSection
  | AnalyticsSection
  | PricingSection
  | ContactSection
  | CtaSection
  | ArticleSection
  | LegalSection
  | CompareSection
  | OHeroSection
  | LogosSection
  | NumStatsSection
  | BentoSection
  | UseCasesSection
  | VsSection
  | ProofSection
  | ChannelDemoSection
  | WorkflowAnimSection
  | SliderSection
  | DarkBandSection
  | TrustSection
  | CasesSection
  | VidTestSection
  | HireSection
  | BookSection
  | ChangelogSection
  | HelpSection
  | JobsSection
  | StatusSection;

export type NavItem = { label: string; href: string; desc: string; tag: string };
export type Industry = { key: string; name: string; src: string; benefit: string; q: string; href: string };
/** A plan feature line; `on: false` renders as not included. */
export type PlanFeature = { t: string; on: boolean };
export type Plan = {
  name: string;
  /** Monthly list price in USD. */
  n: number;
  desc: string;
  /** Monthly AI credits (1 credit = $0.01 of AI provider cost). */
  credits: number;
  /** Monthly bot reply allowance, as displayed. */
  replies: string;
  bots: number;
  seats: number;
  groups: { label: string; items: PlanFeature[] }[];
};
export type BillingCycle = { key: "monthly" | "quarterly" | "halfyearly" | "yearly"; label: string; months: number; discount: number; badge?: string };
export type MegaGroup = { label: string; items: string[] };
export type ResourceTile = { label: string; href: string; color: string; icon: string; isNew?: boolean };
export type FooterColumn = { title: string; links: [string, string][] };
export type Article = {
  slug: string;
  tag: string;
  read: string;
  photo: string;
  title: string;
  lead: string;
  sections: [string, string][];
};
