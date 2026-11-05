import Image from "next/image";
import Link from "next/link";
import { industries, popularPlan } from "@/content/site";
import type {
  ArticleSection,
  CardsSection,
  ChipsSection,
  CompareSection,
  ConnectorsSection,
  CtaSection,
  FlowSection,
  FlowsSection,
  GroupsSection,
  IndustriesSection,
  LegalSection,
  MarqueeSection,
  ProblemSection,
  QuoteSection,
  SplitSection,
  StatsSection,
  StorySection,
  TableSection,
} from "@/content/types";
import { Accent, AccentTitle, CtaLink, cx, LogoMark, NumPill, SectionHeader, SectionTitle, splitTitle } from "@/components/ui";

export type Band = "band-plain" | "band-dotted";

export function Wrap({
  band,
  children,
  width = "max-w-[1240px]",
  pad = "py-20",
}: {
  band: Band;
  children: React.ReactNode;
  width?: string;
  pad?: string;
}) {
  return (
    <section className={band}>
      <div className={cx("mx-auto px-6", width, pad)}>{children}</div>
    </section>
  );
}

const pad2 = (i: number) => (i < 9 ? "0" : "") + (i + 1);

/** Marquee labels that have a logo in /public/logos. */
const logoSlugs: Record<string, string> = {
  WHATSAPP: "whatsapp",
  INSTAGRAM: "instagram",
  MESSENGER: "messenger",
  SLACK: "slack",
  ASANA: "asana",
  NOTION: "notion",
  HUBSPOT: "hubspot",
  SALESFORCE: "salesforce",
  GMAIL: "gmail",
  STRIPE: "stripe",
  ZAPIER: "zapier",
  SHOPIFY: "shopify",
  WORDPRESS: "wordpress",
  TELEGRAM: "telegram",
  TIKTOK: "tiktok",
  JIRA: "jira",
  POSTGRESQL: "postgresql",
  MONGODB: "mongodb",
  MCP: "modelcontextprotocol",
};

export function Marquee({ s }: { s: MarqueeSection }) {
  const loop = [...s.items, ...s.items];
  return (
    <section className="mt-6 overflow-hidden border-y border-paper/8">
      <div className="flex w-max animate-marquee gap-14 py-5 hover:[animation-play-state:paused]">
        {loop.map((label, i) => (
          <span
            key={i}
            aria-hidden={i >= s.items.length}
            className="inline-flex items-center gap-2.5 whitespace-nowrap font-mono text-xs tracking-[.14em] text-paper/42"
          >
            {logoSlugs[label] && (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={`/logos/${logoSlugs[label]}.svg`} alt="" width={18} height={18} loading="lazy" className="opacity-50" />
            )}
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}

export function Problem({ s, band, num }: { s: ProblemSection; band: Band; num: string }) {
  return (
    <Wrap band={band}>
      <div className="text-center">
        <NumPill num={num}>{s.kicker}</NumPill>
        <SectionTitle>
          <AccentTitle title={s.title} />
        </SectionTitle>
      </div>
      <div className="mt-10 flex flex-wrap gap-3">
        {s.lines.map(([a, b]) => (
          <div key={a + b} className="reveal-rise card min-w-0 flex-[1_1_240px] px-6 py-7">
            <p className="text-sm text-paper/55">{a}</p>
            <p className="mt-1.5 font-display text-[26px] font-bold tracking-[-.02em]">{b}</p>
          </div>
        ))}
        <div className="flex items-center rounded-[22px] px-6 py-7 teal-dots-sm">
          <p className="font-display text-[28px] leading-none font-bold tracking-[-.03em]">{s.punch}</p>
        </div>
      </div>
    </Wrap>
  );
}

/** Card colours cycle through paper, dark, teal, dark, peach, dark. */
const cardTones = [
  "bg-paper text-ink",
  "bg-card text-paper border border-paper/8",
  "bg-teal text-ink",
  "bg-card text-paper border border-paper/8",
  "bg-peach text-ink",
  "bg-card text-paper border border-paper/8",
];

export function Cards({ s, band, num }: { s: CardsSection; band: Band; num: string }) {
  return (
    <Wrap band={band}>
      <SectionHeader num={num} kicker={s.kicker} title={s.title} sub={s.sub} />
      <div className="mt-[52px] flex flex-wrap gap-3">
        {s.items.map((c, i) => (
          <div
            key={c.title}
            className={cx(
              "reveal-rise box-border flex min-h-[220px] min-w-0 flex-col gap-3 rounded-[22px] p-6 transition-transform duration-250 hover:-translate-y-1.5 hover:-rotate-[.4deg] hover:shadow-[0_24px_60px_rgba(0,0,0,.35)]",
              cardTones[i % cardTones.length],
            )}
            style={{ flex: `1 1 ${s.min ?? 250}px` }}
          >
            <span className="box-border grid h-[34px] min-w-[34px] place-items-center self-start rounded-[10px] border border-current px-2 font-mono text-[10.5px] opacity-75">
              {c.tag}
            </span>
            <p className="mt-1.5 font-display text-[19px] leading-tight font-semibold">{c.title}</p>
            {c.body && <p className="text-[14.5px] leading-[1.55] opacity-72">{c.body}</p>}
            {c.cta && (
              <Link
                href={c.href}
                className="mt-auto self-start border-b-[1.5px] border-current pt-2 text-sm font-semibold text-inherit hover:text-inherit"
              >
                {c.cta} →
              </Link>
            )}
          </div>
        ))}
      </div>
    </Wrap>
  );
}

export function Flow({ s, band, num }: { s: FlowSection; band: Band; num: string }) {
  return (
    <Wrap band={band}>
      <SectionHeader num={num} kicker={s.kicker} title={s.title} sub={s.sub} />
      <div className="relative mt-[52px]">
        <div className="reveal-flow absolute inset-x-0 top-1/2 h-px bg-teal opacity-50" />
        <ol className="relative flex flex-wrap justify-center gap-2.5">
          {s.steps.map((label, i) => (
            <li
              key={label}
              className="reveal-pop flex items-center gap-2.5 rounded-full border border-paper/16 bg-ink py-2.5 pr-[18px] pl-2.5 hover:border-teal"
            >
              <span className="grid size-7 place-items-center rounded-full bg-teal font-mono text-[10.5px] font-bold text-ink">
                {pad2(i)}
              </span>
              <span className="whitespace-nowrap text-[14.5px] font-medium">{label}</span>
            </li>
          ))}
        </ol>
      </div>
      {s.detail && s.detail.length > 0 && (
        <div className="mt-10 flex flex-wrap gap-3">
          {s.detail.map((d) => (
            <div key={d.n} className="card min-w-0 flex-[1_1_230px] px-6 py-[26px]">
              <span className="font-mono text-xs text-teal">{d.n}</span>
              <p className="mt-3 mb-2 font-display text-lg font-semibold">{d.t}</p>
              <p className="text-sm leading-[1.55] text-paper/60">{d.b}</p>
            </div>
          ))}
        </div>
      )}
      {s.note && <p className="mt-8 text-center font-mono text-xs tracking-[.14em] text-paper/50">{s.note}</p>}
    </Wrap>
  );
}

export function Flows({ s, band, num }: { s: FlowsSection; band: Band; num: string }) {
  return (
    <Wrap band={band}>
      <SectionHeader num={num} kicker={s.kicker} title={s.title} />
      <div className="mt-10 flex flex-col gap-3">
        {s.rows.map((r) => (
          <div key={r.name} className="reveal-rise card flex flex-wrap items-center gap-x-6 gap-y-3.5 px-[26px] py-6">
            <p className="flex-[0_0_200px] font-display text-lg font-semibold">{r.name}</p>
            <div className="flex flex-[1_1_400px] flex-wrap items-center gap-1.5">
              {r.steps.map((x, i) => (
                <span key={x} className="inline-flex items-center gap-1.5">
                  <span className="rounded-lg border border-paper/14 px-2.5 py-[7px] font-mono text-[11.5px] tracking-[.04em] text-paper/82">
                    {x}
                  </span>
                  {i < r.steps.length - 1 && <span className="text-xs text-teal">→</span>}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

export function Split({ s, band, num }: { s: SplitSection; band: Band; num: string }) {
  return (
    <Wrap band={band}>
      <div className={cx("flex flex-wrap gap-3", s.flip && "flex-row-reverse")}>
        <div className="reveal-rise card flex min-w-0 flex-[1_1_380px] flex-col justify-center px-10 py-11">
          <NumPill num={num}>{s.kicker}</NumPill>
          <h3 className="mt-4 text-balance font-display text-[clamp(28px,3.6vw,46px)] leading-none font-semibold tracking-[-.045em]">
            <AccentTitle title={s.title} />
          </h3>
          {s.body && <p className="mt-[18px] max-w-[32em] text-[16.5px] leading-relaxed text-paper/68">{s.body}</p>}
          {s.points.length > 0 && (
            <ul className="mt-[22px] flex flex-wrap gap-x-[18px] gap-y-2.5">
              {s.points.map((p) => (
                <li key={p} className="flex min-w-0 flex-[1_1_180px] gap-2.5 text-[14.5px] leading-[1.45] text-paper/84">
                  <span className="text-teal">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          )}
          <div className="mt-[30px] flex flex-wrap gap-3">
            {s.ctas.map((c) => (
              <CtaLink key={c.label} cta={c} />
            ))}
          </div>
        </div>
        <div className="card min-w-0 flex-[1_1_380px] p-3.5">
          <div className="reveal-zoom relative h-full min-h-[400px] overflow-hidden rounded-2xl">
            <Image src={s.photo} alt={s.kicker} fill sizes="(max-width: 860px) 100vw, 600px" className="object-cover" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(14,18,16,.7)_100%)]" />
            <div className="absolute bottom-5 left-5 w-[min(280px,80%)] animate-float rounded-[18px] bg-paper p-3.5 text-ink shadow-[0_24px_50px_rgba(0,0,0,.5)]">
              <div className="flex items-center gap-2 border-b border-ink/10 pb-[9px]">
                <LogoMark className="size-5" />
                <span className="font-mono text-[9.5px] tracking-[.1em] text-ink/60">{s.mock.label}</span>
              </div>
              <div className="mt-2.5 flex flex-col gap-[7px] text-[12.5px] leading-[1.4]">
                <span className="max-w-[90%] self-end rounded-[12px_12px_4px_12px] bg-ink px-[11px] py-2 text-paper">
                  {s.mock.ask}
                </span>
                <span className="max-w-[92%] self-start rounded-[12px_12px_12px_4px] bg-teal/24 px-[11px] py-2">
                  {s.mock.reply}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

export function Groups({ s, band, num }: { s: GroupsSection; band: Band; num: string }) {
  return (
    <Wrap band={band}>
      <SectionHeader num={num} kicker={s.kicker} title={s.title} />
      <div className="mt-10 flex flex-wrap gap-3">
        {s.groups.map((g) => (
          <div key={g.label} className="card min-w-0 flex-[1_1_300px] p-8">
            <span className="font-mono text-[11px] tracking-[.14em] text-paper/50">{g.label}</span>
            <ul className="mt-4 flex flex-col">
              {g.items.map((it) => (
                <li key={it} className="flex gap-3 border-b border-paper/8 py-3 text-[15.5px] leading-[1.4]">
                  <span className="text-teal">✓</span>
                  {it}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

export function Chips({ s, band, num }: { s: ChipsSection; band: Band; num: string }) {
  return (
    <Wrap band={band}>
      <div className="text-center">
        <NumPill num={num}>{s.kicker}</NumPill>
        <SectionTitle className="text-[clamp(28px,4vw,48px)]">
          <AccentTitle title={s.title} />
        </SectionTitle>
      </div>
      <ul className="mt-11 flex flex-wrap gap-3">
        {s.items.map((it) => (
          <li key={it} className="reveal-rise card flex min-w-0 flex-[1_1_260px] items-start gap-3 px-[22px] py-5 hover:bg-panel">
            <span className="mt-[7px] size-[7px] flex-none rounded-full bg-teal" />
            <span className="text-[15px] leading-[1.45]">{it}</span>
          </li>
        ))}
      </ul>
    </Wrap>
  );
}

export function Table({ s, band, num }: { s: TableSection; band: Band; num: string }) {
  const cols = "grid grid-cols-[minmax(130px,1fr)_minmax(0,2.4fr)]";
  return (
    <Wrap band={band} width="max-w-[1000px]">
      <SectionHeader num={num} kicker={s.kicker} title={s.title} />
      <div className="mt-12 overflow-hidden rounded-3xl border border-paper/10 bg-ink">
        <div className={cx(cols, "border-b border-paper/10 px-[26px] py-3.5 font-mono text-[11px] tracking-[.14em] text-paper/45")}>
          <span>{s.head[0]}</span>
          <span>{s.head[1]}</span>
        </div>
        {s.rows.map(([a, b], i) => (
          <div key={a} className={cx(cols, "reveal-rise items-center gap-4 border-b border-paper/7 px-[26px] py-[18px] hover:bg-panel")}>
            <span className="flex items-center gap-2.5 font-display text-[17px] font-semibold">
              <span className="font-mono text-[11px] text-teal">{pad2(i)}</span>
              {a}
            </span>
            <span className="text-[15px] leading-normal text-paper/70">{b}</span>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

export function Story({ s, band, num }: { s: StorySection; band: Band; num: string }) {
  return (
    <Wrap band={band} width="max-w-[1000px]" pad="py-[84px]">
      <div className="text-center">
        <NumPill num={num}>{s.kicker}</NumPill>
        <div className="mt-6 flex flex-col gap-1.5">
          {s.lines.map((l) => (
            <p
              key={l}
              className="reveal-rise text-balance font-display text-[clamp(24px,3.4vw,42px)] leading-[1.15] font-semibold tracking-[-.03em]"
            >
              {l}
            </p>
          ))}
        </div>
      </div>
    </Wrap>
  );
}

const barHeights = [8, 12, 10, 16, 13, 18, 15, 20, 17, 22, 19, 26];

export function Stats({ s, band }: { s: StatsSection; band: Band }) {
  return (
    <Wrap band={band}>
      <div className="overflow-hidden rounded-3xl border border-paper/10 bg-ink">
        <div className="flex flex-wrap gap-3">
          {s.items.map((c, j) => (
            <div key={c.label} className="card min-w-0 flex-[1_1_220px] px-[26px] py-[30px]">
              <div aria-hidden className="flex h-[26px] items-end gap-[3px]">
                {barHeights.map((h, i) => (
                  <span
                    key={i}
                    className={cx("w-[5px] rounded-[2px]", i < 6 + j * 2 ? "bg-teal" : "bg-paper/14")}
                    style={{ height: h }}
                  />
                ))}
              </div>
              <p className="mt-[18px] font-mono text-[clamp(30px,3.4vw,44px)] font-bold tracking-[-.03em]">{c.value}</p>
              <p className="mt-1.5 text-[13.5px] leading-[1.45] text-paper/55">{c.label}</p>
            </div>
          ))}
        </div>
        <div className="border-t border-paper/10 px-[26px] py-4 font-mono text-[11px] tracking-[.1em] text-paper/45">{s.note}</div>
      </div>
    </Wrap>
  );
}

export function Industries({ s, band, num }: { s: IndustriesSection; band: Band; num: string }) {
  return (
    <Wrap band={band}>
      <div className="text-center">
        <NumPill num={num}>INDUSTRIES</NumPill>
        <SectionTitle className="text-[clamp(32px,4.6vw,58px)] leading-[1.06]">
          <AccentTitle title={s.title} />
        </SectionTitle>
        <p className="mx-auto mt-4 max-w-[36em] text-[16.5px] leading-[1.55] text-paper/60">{s.sub}</p>
      </div>
      <div className="mt-10 overflow-hidden rounded-3xl border border-paper/10">
        <div className="flex flex-wrap gap-3">
          {industries.map((i) => (
            <Link key={i.key} href={i.href} className="reveal-rise card block min-w-0 flex-[1_1_260px] p-3.5 hover:bg-panel">
              <div className="relative h-[150px] overflow-hidden rounded-[14px]">
                <Image src={i.src} alt={i.name} fill sizes="(max-width: 640px) 100vw, 300px" className="object-cover" />
              </div>
              <div className="px-1.5 pt-4 pb-2">
                <p className="flex items-center gap-2 font-display text-[16.5px] font-semibold text-paper">
                  <span className="size-[7px] rounded-full bg-teal" />
                  {i.name}
                </p>
                <p className="mt-2 text-[13.5px] leading-normal text-paper/58">{i.benefit}</p>
                <p className="mt-3 font-mono text-[11px] text-paper/40">“{i.q}”</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-paper/10 px-[26px] py-4 font-mono text-[11px] tracking-[.1em] text-paper/45">
          <span>{s.note}</span>
          <Link href="/signup" className="text-teal">START FREE →</Link>
        </div>
      </div>
    </Wrap>
  );
}

export function Quote({ s, band }: { s: QuoteSection; band: Band }) {
  return (
    <Wrap band={band}>
      <figure className="m-0 grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3">
        <div className="card flex flex-col justify-between gap-8 p-11">
          <span aria-hidden className="font-display text-[64px] leading-[.5] text-teal">“</span>
          <blockquote className="m-0 font-display text-[clamp(22px,2.6vw,32px)] leading-tight font-semibold tracking-[-.02em]">
            {s.text}
          </blockquote>
          <figcaption className="flex items-center gap-3.5">
            <Image src={s.src} alt={s.name} width={52} height={52} className="size-[52px] rounded-full object-cover" />
            <div>
              <p className="text-[15px] font-semibold">{s.name}</p>
              <p className="mt-[3px] text-[13px] text-paper/55">{s.role}</p>
            </div>
          </figcaption>
        </div>
        <div className="card flex flex-col gap-3.5 p-3.5">
          <div className="relative h-[280px] overflow-hidden rounded-2xl">
            <Image src={s.photo} alt={s.role} fill sizes="(max-width: 700px) 100vw, 600px" className="object-cover" />
          </div>
          <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[14px] bg-paper/10">
            <div className="card p-[18px]">
              <p className="font-mono text-[26px] font-bold text-teal">{s.metric}</p>
              <p className="mt-1 text-[12.5px] text-paper/55">{s.metricLabel}</p>
            </div>
            <div className="card p-[18px]">
              <p className="font-mono text-[26px] font-bold">1st week</p>
              <p className="mt-1 text-[12.5px] text-paper/55">to see results</p>
            </div>
          </div>
        </div>
      </figure>
    </Wrap>
  );
}

export function Connectors({ s, band, num }: { s: ConnectorsSection; band: Band; num: string }) {
  return (
    <Wrap band={band}>
      <SectionHeader num={num} kicker={s.kicker} title={s.title} />
      <div className="mt-10 flex flex-wrap gap-3">
        {s.cats.map((c) => (
          <div key={c.name} className="reveal-rise card min-w-0 flex-[1_1_270px] p-[26px] hover:bg-panel">
            <p className="font-display text-lg font-semibold">{c.name}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {c.tools.map((t) => (
                <span key={t} className="rounded-lg border border-teal/35 px-2.5 py-1.5 font-mono text-[11.5px] text-teal">
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Wrap>
  );
}

const ctaTiles: { label: string; pos: string; rot: number }[] = [
  { label: "WEB", pos: "top-[14%] left-[6%]", rot: -10 },
  { label: "WA", pos: "top-[58%] left-[3%]", rot: 8 },
  { label: "TG", pos: "bottom-[10%] left-[15%]", rot: -4 },
  { label: "AGT", pos: "top-[12%] right-[7%]", rot: 10 },
  { label: "APP", pos: "top-[54%] right-[3%]", rot: -8 },
  { label: "24/7", pos: "bottom-[12%] right-[14%]", rot: 5 },
];

export function CtaBand({ s }: { s: CtaSection }) {
  const [a, b] = splitTitle(s.title);
  return (
    <section className="p-4">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] text-center teal-dots">
        {ctaTiles.map((t) => (
          <span
            key={t.label}
            aria-hidden
            className={cx(
              "absolute hidden size-14 place-items-center rounded-2xl bg-ink font-mono text-[10.5px] text-teal shadow-[0_18px_36px_rgba(14,18,16,.3)] md:grid",
              t.pos,
            )}
            style={{ transform: `rotate(${t.rot}deg)` }}
          >
            {t.label}
          </span>
        ))}
        <div className="relative px-6 py-28">
          <h2 className="mx-auto max-w-[12em] text-balance font-display text-[clamp(36px,6vw,80px)] leading-[.92] font-semibold tracking-[-.05em]">
            {a}
            <span className="relative inline-block whitespace-nowrap pr-[.08em] font-serif font-normal italic tracking-[-.01em]">
              {b}
              <svg
                aria-hidden
                viewBox="0 0 200 24"
                preserveAspectRatio="none"
                className="pointer-events-none absolute -bottom-[.16em] left-[2%] h-[.22em] w-[96%] overflow-visible"
              >
                <path
                  d="M4 16 C 50 6, 120 5, 196 11 M34 21 C 84 14, 140 14, 172 18"
                  fill="none"
                  stroke="var(--color-ink)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h2>
          <p className="mx-auto mt-[22px] mb-8 max-w-[30em] text-lg leading-normal text-ink/80">{s.body}</p>
          <div className="flex flex-wrap justify-center gap-3">
            {s.ctas.map((c) => (
              <CtaLink key={c.label} cta={c} />
            ))}
          </div>
          {s.micro && <p className="mt-[18px] font-mono text-[11px] tracking-[.1em] text-ink/65">{s.micro}</p>}
        </div>
      </div>
    </section>
  );
}

export function Article({ s }: { s: ArticleSection }) {
  return (
    <article className="mx-auto max-w-[780px] px-6 pt-16 pb-12">
      <Link href="/resources" className="font-mono text-[11.5px] tracking-[.12em] text-paper/55">
        ← ALL RESOURCES
      </Link>
      <p className="mt-8 font-mono text-[11.5px] tracking-[.14em] text-teal">
        {s.tag} · {s.read}
      </p>
      <h1 className="mt-3.5 text-balance font-display text-[clamp(34px,5vw,60px)] leading-[.98] font-bold tracking-[-.045em]">
        {s.title}
      </h1>
      <p className="mt-[22px] text-pretty text-xl leading-[1.55] text-paper/72">{s.lead}</p>
      <div className="relative mt-9 h-[clamp(240px,42vw,420px)] overflow-hidden rounded-[22px]">
        <Image src={s.photo} alt={s.title} fill priority sizes="(max-width: 780px) 100vw, 732px" className="object-cover" />
      </div>
      <div className="mt-5 flex flex-col">
        {s.sections.map((sec) => (
          <div key={sec.h} className="reveal-rise grid grid-cols-[34px_minmax(0,1fr)] gap-4 border-b border-paper/8 py-[26px]">
            <span className="mt-3 size-[9px] rounded-full bg-teal" />
            <div>
              <h2 className="font-display text-2xl font-semibold tracking-[-.02em]">{sec.h}</h2>
              <p className="mt-2.5 text-[16.5px] leading-[1.7] text-paper/72">{sec.p}</p>
            </div>
          </div>
        ))}
      </div>
      <Link href={s.nextHref} className="mt-9 block rounded-[18px] border border-paper/12 px-6 py-[22px] hover:border-teal">
        <span className="font-mono text-[11px] tracking-[.14em] text-paper/50">NEXT ARTICLE →</span>
        <span className="mt-2 block font-display text-xl font-semibold text-paper">{s.nextTitle}</span>
      </Link>
    </article>
  );
}

const legalTabs = [
  ["Privacy", "/privacy"],
  ["Terms", "/terms"],
  ["Refunds", "/refunds"],
];

export function Legal({ s, path }: { s: LegalSection; path: string }) {
  return (
    <section className="mx-auto max-w-[820px] px-6 pt-16 pb-10">
      <nav className="flex flex-wrap gap-2" aria-label="Legal">
        {legalTabs.map(([label, href]) => (
          <Link
            key={href}
            href={href}
            aria-current={href === path ? "page" : undefined}
            className={cx(
              "rounded-full px-[15px] py-[9px] font-mono text-[11.5px] tracking-[.1em]",
              href === path ? "bg-teal text-ink hover:text-ink" : "border border-paper/20 text-paper/75",
            )}
          >
            {label}
          </Link>
        ))}
      </nav>
      <h1 className="mt-8 font-display text-[clamp(36px,5vw,60px)] leading-none font-bold tracking-[-.045em]">{s.title}</h1>
      <p className="mt-3.5 font-mono text-[11.5px] tracking-[.12em] text-paper/50">LAST UPDATED {s.updated}</p>
      <div className="mt-7 overflow-hidden rounded-[22px] border border-paper/10">
        {s.sections.map((sec) => (
          <div key={sec.h} className="border-b border-paper/8 px-[26px] py-6">
            <h2 className="font-display text-[19px] font-semibold">{sec.h}</h2>
            <p className="mt-2 text-[15.5px] leading-[1.7] text-paper/70">{sec.p}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Plan comparison on a light panel. */
export function Compare({ s, num }: { s: CompareSection; num: string }) {
  const popIdx = s.cols.indexOf(popularPlan);
  const [a, b] = splitTitle(s.title);
  const cols = "grid grid-cols-[minmax(200px,2fr)_repeat(6,minmax(100px,1fr))]";
  return (
    <section className="p-4">
      <div className="mx-auto box-border max-w-[1240px] rounded-[28px] bg-paper p-[clamp(28px,4vw,52px)] text-ink">
        <div className="flex flex-col items-center text-center">
          <NumPill num={num} light>{s.kicker}</NumPill>
          <h2 className="mt-3.5 font-display text-[clamp(30px,4.4vw,54px)] leading-none font-semibold tracking-[-.045em]">
            {a}
            <Accent tone="deep">{b}</Accent>
          </h2>
        </div>
        <div className="mt-11 overflow-x-auto rounded-[22px] border border-ink/12 bg-white">
          <div role="table" className="min-w-[900px]">
            <div role="row" className={cx(cols, "border-b border-ink/12")}>
              <span role="columnheader" className="px-[22px] py-[18px] font-mono text-[11px] tracking-[.14em] text-ink/50">
                FEATURE
              </span>
              {s.cols.map((n, i) => (
                <span
                  role="columnheader"
                  key={n}
                  className={cx("px-2 py-[18px] text-center font-display text-base font-semibold", i === popIdx && "bg-teal text-ink")}
                >
                  {n}
                </span>
              ))}
            </div>
            {s.rows.map(([f, ...cells]) =>
              cells.length === 0 ? (
                <div role="row" key={f} className={cx(cols, "border-b border-ink/7")}>
                  <span role="rowheader" className="px-[22px] pt-[26px] pb-2.5 font-display text-[17px] font-bold text-teal-deep">
                    {f}
                  </span>
                </div>
              ) : (
                <div role="row" key={f} className={cx(cols, "border-b border-ink/7 hover:bg-[#f4f3ee]")}>
                  <span role="rowheader" className="px-[22px] py-[15px] text-[14.5px]">{f}</span>
                  {cells.map((v, i) => (
                    <span
                      role="cell"
                      key={i}
                      className={cx(
                        "px-2 py-[15px] text-center font-mono text-[13px]",
                        i === popIdx && "bg-teal/14",
                        v === "✓" ? "font-bold text-teal-deep" : v === "—" ? "text-ink/30" : "text-ink",
                      )}
                    >
                      {v === "—" ? <span aria-label="Not included">—</span> : v === "✓" ? <span aria-label="Included">✓</span> : v}
                    </span>
                  ))}
                </div>
              ),
            )}
            <div className={cx(cols, "py-4")}>
              <span />
              {s.cols.map((n, i) => (
                <span key={n} className="px-2 text-center">
                  <Link
                    href={n === "Enterprise" ? "/contact" : "/signup"}
                    className={cx(
                      "inline-block rounded-full px-4 py-2.5 text-[13px] font-semibold text-ink hover:text-ink",
                      i === popIdx ? "bg-teal" : "border border-ink/30",
                    )}
                  >
                    {i === 0 ? "Get started" : n === "Enterprise" ? "Talk to sales" : "Choose"}
                  </Link>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
