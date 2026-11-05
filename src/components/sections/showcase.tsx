import Image from "next/image";
import Link from "next/link";
import type {
  BentoSection,
  BentoTone,
  CasesSection,
  DarkBandSection,
  HireSection,
  NumStatsSection,
  OHeroSection,
  ProofSection,
  StatusSection,
  TrustSection,
  VsSection,
  WorkflowAnimSection,
} from "@/content/types";
import { AccentTitle, AvatarStack, BigHeader, Circled, CtaLink, cx, NumPill, Underline } from "@/components/ui";
import { HeroBackdrop } from "./Hero";
import type { Band } from "./static";

/** Scroll-linked entrance with a per-item offset; browsers without view timelines just show the element. */
const riseAt = (from: number, to: number): React.CSSProperties => ({
  animation: "rise linear both",
  animationTimeline: "view()",
  animationRange: `entry ${from}% cover ${to}%`,
});

export function OHero({ s }: { s: OHeroSection }) {
  return (
    <section className="p-4">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] border border-paper/8 bg-ink">
        <HeroBackdrop focus="70% 30%" />
        <div className="relative flex flex-col gap-8 px-[clamp(20px,3.4vw,48px)] pt-[clamp(28px,4vw,48px)] pb-8">
          <div className="flex flex-wrap items-center justify-between gap-10">
            <div className="min-w-0 flex-[1_1_400px]">
              <Link
                href="/signup"
                className="inline-flex animate-[pop_.6s_both] items-center gap-3 rounded-full border border-paper/14 bg-paper/4 py-1.5 pr-1.5 pl-2"
              >
                <AvatarStack />
                <span className="text-[13px] text-paper/82">{s.badge}</span>
                <span className="rounded-full bg-teal px-3 py-1.5 text-xs font-semibold text-ink">Start free →</span>
              </Link>
              <div className="mt-7 max-w-[560px] animate-[pop_.7s_.1s_both]">
                <h1 className="m-0 text-balance font-display text-[clamp(32px,3.6vw,48px)] leading-[1.04] font-medium tracking-[-.03em]">
                  {s.title}
                  <span className="text-gradient">{s.accent}</span>
                </h1>
                <p className="mt-3.5 text-pretty text-[15.5px] leading-[1.55] text-paper/66">{s.body}</p>
                <div className="mt-5 flex flex-wrap gap-[22px] font-mono text-xs tracking-[.12em]">
                  {s.links.map((l, i) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className={cx("border-b pb-1", i === 0 ? "border-teal text-paper" : "border-paper/25 text-paper/60")}
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <div
                  aria-label="suuper"
                  className="mt-9 animate-[pop_.8s_.15s_both] whitespace-nowrap font-display text-[clamp(80px,13vw,190px)] leading-[.9] font-bold tracking-[-.07em]"
                >
                  <span aria-hidden>suup</span>
                  <span
                    aria-hidden
                    className="bg-[linear-gradient(90deg,var(--color-paper)_30%,rgb(247_246_242/.35))] bg-clip-text text-transparent blur-[1.5px] [text-shadow:.08em_0_.1em_rgb(247_246_242/.45),.2em_0_.18em_rgb(247_246_242/.2)]"
                  >
                    er
                  </span>
                </div>
                <div className="mt-7 flex flex-wrap items-center gap-x-7 gap-y-3.5">
                  {s.ctas.map((c, i) => (
                    <Link
                      key={c.label}
                      href={c.href}
                      className={cx(
                        "rounded-full text-[15px] font-semibold",
                        i === 0
                          ? "animate-pulse-ring bg-teal px-[26px] py-[15px] text-ink hover:text-ink hover:opacity-88"
                          : "border border-paper/25 px-6 py-3.5 text-paper hover:border-teal hover:text-paper",
                      )}
                    >
                      {c.label}
                    </Link>
                  ))}
                  <span className="whitespace-pre-line font-mono text-[10.5px] leading-normal tracking-[.12em] text-paper/50">{s.tagline}</span>
                </div>
              </div>
            </div>
            <Phone phone={s.phone} />
          </div>
          <div className="flex flex-wrap items-center gap-x-[26px] gap-y-2.5 border-t border-paper/10 pt-[22px] font-mono text-[11px] tracking-[.12em] text-paper/50">
            <span>ONE AI, EVERY CHANNEL</span>
            {s.channels.map((c) => (
              <span key={c.label} className="inline-flex items-center gap-2 text-paper/78">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/logos/${c.icon}.svg`} alt="" width={15} height={15} className="opacity-80" />
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Phone({ phone }: { phone: OHeroSection["phone"] }) {
  return (
    <div className="mx-auto flex-none animate-float" aria-label={`${phone.name} chat on ${phone.channel.toLowerCase()}`} role="img">
      <div className="box-border h-[532px] w-[262px] rotate-3 rounded-[46px] bg-[linear-gradient(160deg,#3a423e,#121614_40%,#2a302d)] p-2.5 shadow-[0_40px_90px_rgba(0,0,0,.6),inset_0_0_0_1px_rgb(247_246_242/.12)]">
        <div className="relative flex size-full flex-col overflow-hidden rounded-[37px] bg-[#0b0f0d]">
          <span className="absolute top-[9px] left-1/2 h-6 w-[84px] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex justify-between px-[22px] pt-3 text-[11px] font-semibold">
            <span>9:41</span>
            <span className="tracking-[2px]">▮▮▮</span>
          </div>
          <div className="flex items-center gap-2.5 border-b border-paper/8 px-3.5 pt-[18px] pb-3">
            <Image src="/images/bistro-reservations.jpg" alt="" width={32} height={32} className="size-8 rounded-full object-cover" />
            <span className="min-w-0 flex-1">
              <span className="block text-[13px] font-semibold">{phone.name}</span>
              <span className="block text-[10.5px] text-teal">{phone.status}</span>
            </span>
            <span className="font-mono text-[9px] tracking-[.1em] text-paper/45">{phone.channel}</span>
          </div>
          <div className="flex flex-1 flex-col gap-2 bg-[radial-gradient(rgb(247_246_242/.05)_1px,transparent_1px)] bg-size-[14px_14px] px-3 py-3.5 text-xs leading-[1.4]">
            <span className="self-center font-mono text-[9px] tracking-[.1em] text-paper/40">{phone.time}</span>
            {phone.lines.map((l, i) => (
              <span
                key={i}
                className={cx(
                  "px-[11px] py-2",
                  l.me && "max-w-[80%] self-end rounded-[14px_14px_4px_14px] bg-paper text-ink",
                  !l.me && !l.check && "max-w-[84%] self-start rounded-[14px_14px_14px_4px] bg-[#1c2320]",
                  l.check && "max-w-[86%] self-start rounded-[14px_14px_14px_4px] bg-teal py-2.5 text-ink",
                )}
                style={{ animation: `pop .5s ${0.6 + i * 0.6}s both` }}
              >
                {l.check && <span className="block font-bold">{l.check}</span>}
                {l.text}
              </span>
            ))}
            <span className="flex gap-1 self-start rounded-[14px] bg-[#1c2320] px-3 py-2.5" style={{ animation: `pop .5s ${0.6 + phone.lines.length * 0.6}s both` }}>
              {[0, 0.2, 0.4].map((d) => (
                <span key={d} className="size-[5px] animate-blink rounded-full bg-paper" style={{ animationDelay: `${d}s` }} />
              ))}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 pt-2.5 pb-4">
            <span className="flex-1 rounded-full bg-[#1c2320] px-3 py-[9px] text-[11px] text-paper/40">Message</span>
            <span className="grid size-[30px] place-items-center rounded-full bg-teal text-[13px] text-ink">➤</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Logos() {
  return (
    <section className="mx-auto max-w-[1240px] px-6 pt-12 pb-10">
      <p className="text-balance text-center text-base leading-normal text-paper/62">
        Trusted by <span className="font-semibold text-paper">1,200+ businesses</span> answering{" "}
        <span className="font-semibold text-paper">2.4M customer messages</span> every month
      </p>
      <div aria-hidden className="mt-7 flex flex-wrap items-center justify-between gap-x-12 gap-y-7 text-paper/48">
        <span className="font-display text-2xl font-bold tracking-[-.04em]">northwind</span>
        <span className="font-mono text-[17px] font-bold tracking-[.2em]">LUMEN&amp;CO</span>
        <span className="font-[Georgia,serif] text-2xl italic">Kestrel</span>
        <span className="inline-flex items-center gap-2 font-display text-[23px] font-medium">
          <span className="size-4 rotate-45 rounded border-[2.5px] border-current" />
          halden
        </span>
        <span className="text-[19px] font-semibold tracking-[.08em]">ORCHARD</span>
        <span className="font-display text-[25px] font-light tracking-[-.02em]">
          basalt<span className="text-teal">.</span>
        </span>
      </div>
    </section>
  );
}

const statHeights = ["min-h-[150px]", "min-h-[200px]", "min-h-[250px]", "min-h-[300px]"];

export function NumStats({ s, num }: { s: NumStatsSection; num: string }) {
  return (
    <section className="p-4">
      <div className="mx-auto box-border max-w-[1240px] rounded-[28px] bg-paper p-[clamp(28px,4vw,52px)] text-ink">
        <div className="flex flex-wrap items-center justify-between gap-5">
          <NumPill num={num} light>{s.kicker}</NumPill>
          <span className="font-mono text-[10.5px] tracking-[.12em] text-ink/50">{s.note}</span>
        </div>
        <h2 className="mt-[26px] max-w-[14em] text-balance font-display text-[clamp(32px,4.6vw,60px)] leading-none font-semibold tracking-[-.045em]">
          {s.title}
          <Circled>{s.accent}</Circled>
        </h2>
        <div className="mt-12 flex flex-wrap items-end justify-between gap-8">
          <p className="flex-[0_1_260px] font-mono text-[11px] leading-[1.6] tracking-[.1em] text-ink/55">{s.aside}</p>
          <div className="flex min-w-0 flex-[1_1_640px] flex-wrap items-end">
            {s.items.map((it, i) => (
              <div
                key={it.value}
                className={cx(
                  "reveal-rise box-border flex min-w-0 flex-[1_1_200px] flex-col justify-between gap-6 border-l border-ink/16 px-5 pt-5 pb-[18px]",
                  statHeights[i % statHeights.length],
                  i === s.items.length - 1 && "rounded-[0_0_18px_0] bg-[linear-gradient(180deg,rgb(0_194_168/0),rgb(0_194_168/.32))]",
                )}
              >
                <span className="border-b border-ink/16 pb-3.5 font-display text-[clamp(40px,4.6vw,60px)] leading-none font-medium tracking-[-.05em]">
                  {it.value}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{it.label}</span>
                  <span className="mt-1 block text-[12.5px] leading-[1.45] text-ink/60">{it.sub}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const bentoTones: Record<BentoTone, string> = {
  paper: "bg-paper text-ink hover:text-ink",
  dark: "bg-card text-paper border border-paper/8 hover:text-paper",
  teal: "bg-teal text-ink hover:text-ink",
  peach: "bg-peach text-ink hover:text-ink",
};

export function Bento({ s, num }: { s: BentoSection; num: string }) {
  return (
    <section className="band-dotted mt-12">
      <div className="mx-auto max-w-[1240px] px-6 py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <NumPill num={num}>{s.kicker}</NumPill>
            <h2 className="mt-5 max-w-[12em] text-balance font-display text-[clamp(32px,4.6vw,58px)] leading-none font-semibold tracking-[-.045em]">
              {s.title}
              <span className="text-gradient relative inline-block">
                {s.accent}
                <Underline className="-bottom-[.18em] h-[.32em]" />
              </span>
            </h2>
          </div>
          <p className="max-w-[24em] text-base leading-[1.55] text-paper/60">{s.sub}</p>
        </div>
        <div className="mt-12 flex flex-wrap gap-3">
          {s.items.map((it, i) =>
            "photo" in it ? (
              <div key={i} className="reveal-rise relative h-[230px] min-w-0 flex-[1_1_200px] overflow-hidden rounded-[22px] bg-card">
                <Image src={it.photo} alt="" fill sizes="(max-width: 640px) 100vw, 260px" className="object-cover" />
                <span className="absolute inset-x-3.5 bottom-3.5 rounded-[14px] bg-ink/82 px-3 py-2.5 text-[12.5px] leading-[1.4] text-paper backdrop-blur-[10px]">
                  {it.ask} <span className="text-teal">{it.answer}</span>
                </span>
              </div>
            ) : (
              <Link
                key={it.href}
                href={it.href}
                data-spot
                className={cx(
                  "reveal-rise relative box-border flex h-[230px] min-w-0 flex-[1_1_200px] flex-col justify-between rounded-[22px] p-[22px] transition-transform duration-250 hover:-translate-y-1.5 hover:-rotate-[.4deg] hover:shadow-[0_24px_60px_rgba(0,0,0,.35)]",
                  bentoTones[it.tone],
                )}
              >
                <span className="flex items-start justify-between">
                  <svg aria-hidden viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d={it.icon} />
                  </svg>
                  <span aria-hidden className="text-base opacity-55">↗</span>
                </span>
                <span>
                  <span className="block font-display text-[19px] font-semibold tracking-[-.02em]">{it.title}</span>
                  <span className="mt-1.5 block text-[13px] leading-[1.45] opacity-72">{it.body}</span>
                </span>
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

export function Vs({ s, num }: { s: VsSection; num: string }) {
  const [a, circled, c] = s.title;
  const cell = (v: string, first: boolean) =>
    cx(
      "min-w-0 flex-1 px-2 py-[15px] text-center font-mono text-[13px]",
      first && "bg-teal/14 font-bold",
      v === "✓" ? "text-teal-deep" : v === "—" ? "text-ink/30" : "text-ink/70",
    );
  return (
    <section className="p-4">
      <div className="mx-auto box-border max-w-[1240px] rounded-[28px] bg-paper p-[clamp(28px,4vw,52px)] text-ink">
        <div className="flex flex-col items-center text-center">
          <NumPill num={num} light>{s.kicker}</NumPill>
          <h2 className="mt-[22px] max-w-[14em] text-balance font-display text-[clamp(32px,4.6vw,58px)] leading-none font-semibold tracking-[-.045em]">
            {a}
            <Circled>{circled}</Circled>
            {c}
          </h2>
          <p className="mt-4 max-w-[34em] text-base leading-[1.55] text-ink/62">{s.sub}</p>
        </div>
        <div className="mt-11 overflow-x-auto rounded-[22px] border border-ink/12 bg-white">
          <div role="table" className="min-w-[760px]">
            <div role="row" className="flex items-stretch">
              <span role="columnheader" className="flex-[2.2_1_0] self-center px-5 py-[18px] font-mono text-[10.5px] tracking-[.12em] text-ink/50">
                FEATURE
              </span>
              {s.cols.map((col, i) => (
                <span
                  role="columnheader"
                  key={col}
                  className={cx(
                    "flex-1 px-2 py-[18px] text-center",
                    i === 0 ? "bg-teal font-display text-[17px] font-bold" : "text-[13.5px] font-semibold",
                  )}
                >
                  {col}
                </span>
              ))}
            </div>
            {s.rows.map(([f, ...vals]) => (
              <div role="row" key={f} className="flex border-t border-ink/10">
                <span role="rowheader" className="min-w-0 flex-[2.2_1_0] px-5 py-[15px] text-[14.5px]">{f}</span>
                {vals.map((v, i) => (
                  <span role="cell" key={i} className={cell(v, i === 0)}>
                    {v === "✓" ? <span aria-label="Yes">✓</span> : v === "—" ? <span aria-label="No">—</span> : v}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {s.ctas.map((c) => (
            <CtaLink key={c.label} cta={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

const waveBars = [14, 30, 48, 22, 56, 36, 18, 44, 60, 28, 40, 16, 34, 52, 24];

export function Proof({ s, num }: { s: ProofSection; num: string }) {
  return (
    <section className="mt-12 border-t border-paper/8">
      <div className="mx-auto flex max-w-[1240px] flex-wrap gap-3 px-6 py-20">
        <div className="min-w-0 flex-[1_1_520px] rounded-3xl border border-paper/10 bg-[radial-gradient(rgb(247_246_242/.08)_1px,transparent_1px)] bg-size-[20px_20px] p-8">
          <NumPill num={num}>{s.kicker}</NumPill>
          <h3 className="mt-5 font-display text-[clamp(26px,3vw,36px)] leading-[1.05] font-semibold tracking-[-.035em]">{s.title}</h3>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {s.badges.map((r) => (
              <div key={r.name} className="min-w-0 flex-[1_1_140px] rounded-2xl bg-paper px-[18px] py-4 text-ink">
                <span className="flex items-center gap-2 text-sm font-bold">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {r.icon && <img src={`/logos/${r.icon}.svg`} alt="" width={18} height={18} />}
                  {r.name}
                </span>
                <span aria-label="5 stars" className="mt-2.5 block text-sm tracking-[2px] text-teal-deep">★★★★★</span>
                <span className="mt-0.5 block font-display text-[26px] font-semibold tracking-[-.03em]">{r.score}</span>
                <span className="mt-1 block font-mono text-[9.5px] tracking-[.1em] text-ink/50">SAMPLE RATING</span>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex min-w-0 flex-[1_1_360px] flex-col justify-between gap-7 overflow-hidden rounded-3xl bg-teal p-8 text-ink">
          <div aria-hidden className="absolute top-7 right-6 flex h-[60px] items-center gap-1">
            {waveBars.map((h, i) => (
              <span
                key={i}
                className="w-[3px] animate-blink rounded-[3px] bg-ink/35"
                style={{ height: h, animationDuration: `${1.2 + (i % 4) * 0.25}s`, animationDelay: `${i * 0.08}s` }}
              />
            ))}
          </div>
          <div>
            <span className="font-mono text-[11px] tracking-[.14em]">{s.app.kicker}</span>
            <h3 className="mt-3.5 max-w-[9em] font-display text-[clamp(26px,3vw,36px)] leading-[1.05] font-semibold tracking-[-.035em]">
              {s.app.title}
            </h3>
            <p className="mt-3 max-w-[24em] text-[14.5px] leading-[1.55] text-ink/75">{s.app.body}</p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {[
              ["apple", "Download on the", "App Store"],
              ["googleplay", "Get it on", "Google Play"],
            ].map(([icon, small, big]) => (
              <Link key={icon} href="/signup" className="inline-flex items-center gap-2.5 rounded-xl bg-ink py-[9px] pr-4 pl-3 text-paper hover:text-paper">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/logos/${icon}.svg`} alt="" width={22} height={22} />
                <span>
                  <span className="block text-[9.5px] opacity-70">{small}</span>
                  <span className="-mt-px block text-[15px] font-semibold">{big}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function WorkflowAnim({ s, band, num }: { s: WorkflowAnimSection; band: Band; num: string }) {
  return (
    <section className={band}>
      <div className="mx-auto max-w-[1240px] px-6 py-[88px]">
        <BigHeader num={num} kicker={s.kicker} title={s.title} sub={s.sub} />
        <div
          data-spot
          className="relative mt-12 overflow-hidden rounded-[28px] border border-paper/10 bg-[#0a0e0c] bg-[radial-gradient(rgb(247_246_242/.08)_1px,transparent_1px)] bg-size-[20px_20px] p-[clamp(18px,3vw,32px)]"
        >
          <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-teal/35 bg-teal/6 px-[18px] py-3.5">
            <span className="font-mono text-[10.5px] tracking-[.14em] text-teal">PROMPT</span>
            <span className="flex-[1_1_300px] text-[15.5px] leading-normal">{s.prompt}</span>
            <span className="rounded-full bg-teal px-3 py-[7px] font-mono text-[10.5px] tracking-[.1em] text-ink">BUILD ↵</span>
          </div>
          <ol className="mt-9 flex items-stretch overflow-x-auto px-0.5 pt-1 pb-3">
            {s.nodes.map((n, i) => (
              <li key={n.t} className="flex flex-[1_0_auto] items-center">
                {i > 0 && (
                  <span
                    aria-hidden
                    className="h-0.5 min-w-9 flex-[1_0_36px] origin-left bg-[linear-gradient(90deg,var(--color-teal),var(--color-mint))]"
                    style={{ animation: "grow linear both", animationTimeline: "view()", animationRange: `entry ${25 + i * 7}% cover ${35 + i * 7}%` }}
                  />
                )}
                <div
                  className={cx(
                    "relative box-border flex-[0_0_184px] rounded-[18px] border bg-paper/5 p-4 shadow-[inset_0_1px_0_rgb(255_255_255/.06)] backdrop-blur-[12px]",
                    i === 0 ? "border-teal/55" : "border-paper/12",
                  )}
                  style={riseAt(10 + i * 7, 28 + i * 7)}
                >
                  <span className="flex items-center justify-between">
                    <span className="font-mono text-[10px] tracking-[.14em] text-teal">{n.tag}</span>
                    <span className="grid size-7 place-items-center rounded-[9px] bg-paper/8">
                      {n.icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={`/logos/${n.icon}.svg`} alt="" width={15} height={15} className="block" />
                      ) : (
                        <span className="font-mono text-[9px] text-mint">AI</span>
                      )}
                    </span>
                  </span>
                  <span className="mt-[18px] block font-display text-base font-semibold tracking-[-.01em]">{n.t}</span>
                  <span className="mt-2 inline-flex items-center gap-1.5 font-mono text-[10.5px] text-paper/55">
                    <span className="size-1.5 rounded-full bg-teal" />
                    {n.meta}
                  </span>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-6 grid gap-1.5 border-t border-dashed border-paper/14 pt-[18px]">
            {s.log.map((t, i) => (
              <span key={t} className="truncate whitespace-pre font-mono text-xs text-paper/70" style={riseAt(i * 4, 18 + i * 4)}>
                {t}
                <span className="text-teal">  ✓</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const dbConvos = [
  ["instagram", "Sana K.", "yes please, and can I get it in M", "YOU"],
  ["whatsapp", "Ali R.", "2 pieces chahiye", "AI"],
  ["shopify", "Mehwish", "Is medium in stock?", "AI"],
  ["messenger", "Bilal R.", "#1987", "HANDOFF"],
  ["whatsapp", "Hamza", "COD available?", "AI"],
];

export function DarkBand({ s, num }: { s: DarkBandSection; num: string }) {
  return (
    <section className="p-4">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px] border border-paper/8 bg-deep px-[clamp(18px,4vw,52px)] pt-[clamp(48px,7vw,96px)] pb-[clamp(28px,4vw,52px)]">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-[30%] left-1/2 h-4/5 w-[120%] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(0_194_168/.28),transparent)] blur-[20px]"
        />
        <div className="relative">
          <BigHeader num={num} kicker={s.kicker} title={s.title} sub={s.sub} />
          <div data-spot className="reveal-rise glass relative mt-[52px] overflow-hidden rounded-[22px]">
            <div className="flex items-center gap-2 border-b border-paper/8 px-4 py-3">
              {[0, 1, 2].map((i) => (
                <span key={i} className="size-2.5 rounded-full bg-paper/20" />
              ))}
              <span className="ml-3 font-mono text-[11px] text-paper/45">app.suuper.cc/inbox</span>
            </div>
            <div className="flex min-h-[420px] flex-wrap">
              <div className="min-w-0 flex-[1_1_240px] border-r border-paper/8 p-3.5">
                <div className="flex gap-1.5 font-mono text-[10.5px] tracking-[.08em]">
                  <span className="rounded-full bg-teal/16 px-2.5 py-[5px] text-mint">ALL 24</span>
                  <span className="px-2 py-[5px] text-paper/50">MINE 3</span>
                  <span className="px-2 py-[5px] text-paper/50">AI 21</span>
                </div>
                <div className="mt-3 flex flex-col gap-1">
                  {dbConvos.map(([icon, n, m, st], i) => (
                    <div
                      key={n + i}
                      className={cx("flex items-center gap-2.5 rounded-xl border p-2.5", i === 0 ? "border-teal/30 bg-teal/10" : "border-transparent")}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={`/logos/${icon}.svg`} alt="" width={16} height={16} className="flex-none" />
                      <span className="min-w-0 flex-1">
                        <span className="block text-[13.5px] font-semibold">{n}</span>
                        <span className="block truncate text-[12.5px] text-paper/55">{m}</span>
                      </span>
                      <span
                        className={cx(
                          "flex-none rounded-full px-2 py-[3px] font-mono text-[9.5px] tracking-[.06em]",
                          st === "AI" ? "border border-teal/40 text-mint" : st === "YOU" ? "bg-paper text-ink" : "bg-peach text-ink",
                        )}
                      >
                        {st}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex min-w-0 flex-[2_1_360px] flex-col gap-2.5 p-[18px]">
                <div className="flex items-center justify-between gap-3 border-b border-paper/8 pb-3">
                  <span className="font-semibold">
                    Sana K. <span className="font-normal text-paper/50">· Instagram</span>
                  </span>
                  <span className="rounded-full bg-paper px-3.5 py-[7px] text-[12.5px] font-semibold text-ink">Take over</span>
                </div>
                <div className="max-w-[78%] self-start rounded-[16px_16px_16px_4px] bg-paper/8 px-3.5 py-[11px] text-sm">does the Noor set come in black?</div>
                <div className="max-w-[78%] self-end rounded-[16px_16px_4px_16px] bg-teal px-3.5 py-[11px] text-sm text-ink">
                  Black is back Friday. Want a DM the moment it lands?
                </div>
                <div className="max-w-[78%] self-start rounded-[16px_16px_16px_4px] bg-paper/8 px-3.5 py-[11px] text-sm">yes please, and can I get it in M</div>
                <div className="mt-auto flex flex-wrap items-center gap-2.5 rounded-[14px] border border-dashed border-teal/50 px-3.5 py-3">
                  <span className="font-mono text-[10px] tracking-[.12em] text-teal">COPILOT DRAFT</span>
                  <span className="flex-[1_1_220px] text-[13.5px] text-paper/80">Done. M is reserved for you, I&apos;ll message you Friday morning.</span>
                  <span className="rounded-full border border-paper/25 px-2.5 py-[5px] font-mono text-[10.5px]">TAB ⇥</span>
                </div>
              </div>
              <div className="flex min-w-0 flex-[1_1_220px] flex-col gap-3.5 border-l border-paper/8 p-[18px]">
                <span className="font-mono text-[10.5px] tracking-[.12em] text-paper/45">CUSTOMER</span>
                <div className="flex items-center gap-2.5">
                  <span className="grid size-10 place-items-center rounded-full bg-peach font-bold text-ink">SK</span>
                  <span>
                    <span className="block font-semibold">Sana Khan</span>
                    <span className="block text-[12.5px] text-paper/55">Lahore · 4 orders</span>
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span className="rounded-xl border border-paper/10 p-2.5">
                    <span className="block font-mono text-[9.5px] text-paper/45">LIFETIME</span>
                    <span className="mt-1 block font-semibold">PKR 18,400</span>
                  </span>
                  <span className="rounded-xl border border-paper/10 p-2.5">
                    <span className="block font-mono text-[9.5px] text-paper/45">INTENT</span>
                    <span className="mt-1 block font-semibold text-teal">High</span>
                  </span>
                </div>
                <span className="font-mono text-[10.5px] tracking-[.12em] text-paper/45">NEXT BEST ACTION</span>
                <span className="rounded-xl border border-teal/35 bg-teal/12 px-3 py-2.5 text-[13px] leading-[1.45]">
                  Reserve size M and add to Friday restock alert
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {["VIP", "RESTOCK", "LAHORE"].map((t) => (
                    <span key={t} className="rounded-full border border-paper/18 px-[9px] py-1 font-mono text-[10px]">{t}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-px overflow-hidden rounded-[22px] border border-paper/10 bg-paper/10">
            {s.points.map(([t, b]) => (
              <div key={t} className="bg-deep p-6">
                <span className="block font-display text-lg font-semibold">{t}</span>
                <span className="mt-2 block text-sm leading-[1.55] text-paper/60">{b}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function Trust({ s }: { s: TrustSection }) {
  return (
    <section className="p-4">
      <div data-spot className="glass relative mx-auto box-border flex max-w-[1240px] flex-wrap items-center gap-8 rounded-[28px] p-[clamp(28px,4vw,44px)]">
        <div className="flex-[1_1_300px]">
          <span className="font-mono text-[11px] tracking-[.16em] text-teal">TRUST &amp; SECURITY</span>
          <h3 className="mt-3 max-w-[12em] font-display text-[clamp(26px,3vw,36px)] leading-[1.05] font-semibold tracking-[-.035em]">{s.title}</h3>
          <Link href="/security" className="mt-[18px] inline-block text-[14.5px] font-semibold text-mint hover:text-paper">
            See how we protect your data →
          </Link>
        </div>
        <ul className="grid flex-[2_1_520px] grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5">
          {s.items.map(([a, b]) => (
            <li key={a} className="flex flex-col gap-2 rounded-2xl border border-paper/12 bg-ink/40 p-4">
              <svg aria-hidden viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z M9 12l2 2 4-4" />
              </svg>
              <span className="font-display text-[19px] font-bold">{a}</span>
              <span className="font-mono text-[9.5px] tracking-[.1em] text-paper/50">{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Cases({ s, band, num }: { s: CasesSection; band: Band; num: string }) {
  return (
    <section className={band}>
      <div className="mx-auto max-w-[1240px] px-6 py-[88px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <NumPill num={num}>{s.kicker}</NumPill>
            <h2 className="mt-5 max-w-[16em] text-balance font-display text-[clamp(32px,4.6vw,58px)] leading-[1.02] font-semibold tracking-[-.045em]">
              <AccentTitle title={s.title} />
            </h2>
          </div>
          <Link href="/resources" className="rounded-full border border-paper/25 px-5 py-[11px] text-[14.5px] font-semibold hover:bg-paper/6">
            All stories →
          </Link>
        </div>
        <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-3">
          {s.items.map((c) => (
            <Link
              key={c.slug}
              href={"/customers/" + c.slug}
              data-spot
              className="reveal-rise relative flex flex-col overflow-hidden rounded-3xl border border-paper/8 bg-card transition-[transform,border-color] duration-300 hover:-translate-y-1.5 hover:border-teal/50 hover:text-paper"
            >
              <div className="relative h-[220px]">
                <Image src={c.photo} alt="" fill sizes="(max-width: 700px) 100vw, 400px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <span className="font-mono text-[10.5px] tracking-[.12em] text-paper/50">{c.ind}</span>
                <span className="flex flex-wrap items-baseline gap-2.5">
                  <span className="font-display text-[54px] leading-none font-semibold tracking-[-.05em] text-teal">{c.metric}</span>
                  <span className="text-sm text-paper/70">{c.ml}</span>
                </span>
                <span className="text-[15px] leading-[1.55] text-paper/82">“{c.quote}”</span>
                <span className="mt-auto flex justify-between border-t border-paper/8 pt-3.5 text-sm font-semibold">
                  {c.co}
                  <span className="text-teal">Read story →</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Hire({ s, num }: { s: HireSection; num: string }) {
  return (
    <section className="p-4">
      <div className="mx-auto box-border max-w-[1240px] rounded-[28px] bg-paper p-[clamp(28px,4vw,56px)] text-ink">
        <BigHeader num={num} kicker={s.kicker} title={s.title} sub={s.sub} light />
        <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] gap-3">
          <div className="rounded-[22px] border border-ink/10 bg-white p-7">
            <span className="font-mono text-[11px] tracking-[.14em] text-ink/55">{s.a.label}</span>
            {s.a.rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-dashed border-ink/14 py-3.5 text-[15px]">
                <span className="text-ink/62">{k}</span>
                <span className="text-right font-semibold">{v}</span>
              </div>
            ))}
            <div className="mt-5 flex items-baseline gap-1.5">
              <span className="font-display text-[40px] font-semibold tracking-[-.04em] text-ink/50 line-through decoration-2">{s.a.total}</span>
              <span className="text-ink/50">{s.a.per}</span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-[22px] bg-ink p-7 text-paper">
            <span className="absolute top-[18px] right-[18px] rounded-full bg-teal px-2.5 py-[5px] font-mono text-[10px] tracking-[.1em] text-ink">SAVE 96%</span>
            <span className="font-mono text-[11px] tracking-[.14em] text-teal">{s.b.label}</span>
            {s.b.rows.map(([k, v]) => (
              <div key={k} className="flex justify-between gap-3 border-b border-dashed border-paper/14 py-3.5 text-[15px]">
                <span className="text-paper/62">{k}</span>
                <span className="text-right font-semibold">{v}</span>
              </div>
            ))}
            <div className="mt-5 flex items-baseline gap-1.5">
              <span className="font-display text-[40px] font-semibold tracking-[-.04em] text-teal">{s.b.total}</span>
              <span className="text-paper/60">{s.b.per}</span>
            </div>
          </div>
        </div>
        <div aria-hidden className="mt-7 flex flex-col gap-2.5">
          <div className="flex items-center gap-3.5">
            <span className="flex-[0_0_120px] font-mono text-[11px] text-ink/55">HIRE</span>
            <span className="reveal-grow h-3.5 flex-1 rounded-full bg-ink/75" />
          </div>
          <div className="flex items-center gap-3.5">
            <span className="flex-[0_0_120px] font-mono text-[11px] text-ink/55">SUUPER</span>
            <span className="flex flex-1">
              <span className="h-3.5 w-[4.1%] min-w-3.5 rounded-full bg-teal" />
            </span>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-6">
          <span className="font-display text-xl font-semibold tracking-[-.02em]">{s.save}</span>
          <span className="flex flex-wrap gap-2.5">
            <CtaLink cta={{ label: "Start free", href: "/signup", variant: "dark" }} />
            <CtaLink cta={{ label: "Talk to sales", href: "/demo", variant: "outlineDark" }} />
          </span>
        </div>
      </div>
    </section>
  );
}

export function Status({ s }: { s: StatusSection }) {
  return (
    <section className="mx-auto max-w-[1040px] px-6 pt-16 pb-[88px]">
      <span className="font-mono text-[11px] tracking-[.16em] text-paper/50">STATUS.SUUPER.CC</span>
      <h1 className="mt-3.5 font-display text-[clamp(36px,5vw,60px)] leading-none font-semibold tracking-[-.045em]">System status</h1>
      <div className="mt-7 flex flex-wrap items-center justify-between gap-3 rounded-[20px] bg-teal px-6 py-5 text-ink">
        <span className="flex items-center gap-3 font-display text-xl font-semibold">
          <span className="size-3 animate-pulse-ring rounded-full bg-ink" />
          All systems operational
        </span>
        <span className="font-mono text-[11px] tracking-[.08em]">99.98% UPTIME · LAST 90 DAYS</span>
      </div>
      <div className="mt-4 rounded-[20px] border border-paper/10 px-6 py-1">
        {s.comps.map((c) => (
          <div key={c.n} className="border-b border-paper/8 py-5 last:border-b-0">
            <div className="flex justify-between gap-3 text-[15px]">
              <span className="font-semibold">{c.n}</span>
              <span className="font-mono text-xs text-mint">{c.up}</span>
            </div>
            <div className="mt-2.5 flex h-[30px] gap-0.5" role="img" aria-label={`${c.n}: ${c.bad.length ? c.bad.length + " day(s) with incidents" : "no incidents"} in the last 90 days`}>
              {Array.from({ length: 90 }, (_, j) => (
                <span key={j} className={cx("flex-1 rounded-[2px]", c.bad.includes(j) ? "bg-peach" : "bg-teal/80")} />
              ))}
            </div>
            <div className="mt-1.5 flex justify-between font-mono text-[10px] text-paper/40">
              <span>90 DAYS AGO</span>
              <span>TODAY</span>
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-11 font-display text-2xl font-semibold tracking-[-.02em]">Past incidents</h2>
      {s.incidents.map(([d, t, b]) => (
        <div key={d} className="flex flex-wrap gap-x-6 gap-y-2 border-b border-paper/8 py-[18px]">
          <span className="flex-[0_0_140px] font-mono text-[11px] text-paper/50">{d}</span>
          <span className="flex-[1_1_360px]">
            <span className="block font-semibold">{t}</span>
            <span className="mt-1 block text-sm text-paper/60">{b}</span>
          </span>
        </div>
      ))}
    </section>
  );
}

