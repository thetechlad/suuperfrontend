"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import type {
  BookSection,
  ChangelogEntry,
  ChangelogSection,
  ChannelDemoSection,
  HelpSection,
  JobsSection,
  SliderSection,
  UseCasesSection,
  VidTestSection,
} from "@/content/types";
import { AccentTitle, AvatarStack, BigHeader, cx, NumPill } from "@/components/ui";
import type { Band } from "./static";

/** Outlined filter chip used by the changelog and job filters. */
function FilterChip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cx(
        "rounded-full border px-4 py-[9px] text-[13px] font-medium",
        on ? "border-paper bg-paper text-ink" : "border-paper/18 bg-transparent text-paper/75",
      )}
    >
      {children}
    </button>
  );
}

export function UseCases({ s, num }: { s: UseCasesSection; num: string }) {
  const [open, setOpen] = useState(1);
  return (
    <section className="border-t border-paper/8">
      <div className="mx-auto max-w-[1240px] px-6 py-20">
        <div className="flex flex-wrap items-start justify-between gap-7">
          <div className="flex-[0_1_300px]">
            <NumPill num={num}>{s.kicker}</NumPill>
            <p className="mt-5 text-[14.5px] leading-[1.6] text-paper/60">{s.intro}</p>
          </div>
          <h2 className="m-0 flex-[1_1_460px] text-balance font-display text-[clamp(32px,4.6vw,58px)] leading-none font-semibold tracking-[-.045em]">
            {s.title}
            <span className="text-gradient">{s.accent}</span>
          </h2>
        </div>
        <div className="mt-12 flex flex-col gap-1.5 border-t border-paper/10">
          {s.items.map((u, i) => {
            const isOpen = open === i;
            return (
              <div
                key={u.tag}
                className={cx(
                  "transition-[background] duration-300",
                  isOpen ? "rounded-[22px] bg-[linear-gradient(120deg,var(--color-paper)_30%,var(--color-mint))] text-ink" : "border-b border-paper/10 text-paper",
                )}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="box-border flex w-full cursor-pointer items-center gap-[22px] border-0 bg-transparent px-6 py-[22px] text-left text-inherit"
                >
                  <span className="grid size-[38px] flex-none place-items-center rounded-full border border-current font-mono text-xs opacity-80">
                    0{i + 1}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10.5px] tracking-[.12em] opacity-55">{u.tag}</span>
                    <span className="mt-1 block font-display text-[clamp(17px,2vw,22px)] font-semibold tracking-[-.02em]">{u.title}</span>
                  </span>
                  <span aria-hidden className="flex-none text-xl opacity-70">{isOpen ? "↗" : "↘"}</span>
                </button>
                {isOpen && (
                  <div className="flex animate-[pop_.4s_both] flex-wrap items-stretch gap-4 px-6 pb-6 sm:pl-[84px]">
                    <div className="flex-[0_1_220px] rounded-[18px] bg-paper px-[22px] py-5 shadow-[0_14px_34px_rgba(14,18,16,.12)]">
                      <span className="block font-display text-[52px] leading-none font-semibold tracking-[-.05em]">{u.stat}</span>
                      <span className="mt-[18px] block text-[13px] opacity-70">{u.statLabel}</span>
                    </div>
                    <div className="flex min-w-0 flex-[1_1_280px] flex-col justify-between gap-[18px]">
                      <div>
                        <span className="font-display text-[40px] leading-none font-semibold tracking-[-.04em]">{u.stat2}</span>
                        <span className="ml-2 font-mono text-[10.5px] tracking-[.1em] opacity-60">{u.stat2Label}</span>
                        <p className="mt-2.5 max-w-[32em] text-[14.5px] leading-[1.55] opacity-80">{u.body}</p>
                      </div>
                      <Link href={u.href} className="self-start rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper hover:text-paper">
                        Learn more →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function ChannelDemo({ s, band, num }: { s: ChannelDemoSection; band: Band; num: string }) {
  const [tab, setTab] = useState(0);
  // Number of messages shown; the first channel starts fully played.
  const [step, setStep] = useState(Infinity);
  const timer = useRef<ReturnType<typeof setInterval>>(undefined);
  useEffect(() => () => clearInterval(timer.current), []);

  const ch = s.channels[tab];
  const shown = Math.min(step, ch.msgs.length);
  const done = shown >= ch.msgs.length;
  const typing = !done && ch.msgs[shown].ai;

  const pick = (i: number) => {
    clearInterval(timer.current);
    setTab(i);
    setStep(0);
    timer.current = setInterval(() => {
      setStep((n) => {
        if (n >= s.channels[i].msgs.length) clearInterval(timer.current);
        return n + 1;
      });
    }, 1000);
  };

  return (
    <section className={band}>
      <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-center gap-14 px-6 py-[88px]">
        <div>
          <NumPill num={num}>{s.kicker}</NumPill>
          <h2 className="mt-5 max-w-[16em] text-balance font-display text-[clamp(32px,4.6vw,58px)] leading-[1.02] font-semibold tracking-[-.045em]">
            <AccentTitle title={s.title} />
          </h2>
          <p className="mt-4 max-w-[32em] text-[16.5px] leading-[1.55] text-paper/60">{s.sub}</p>
          <div role="tablist" aria-label="Channels" className="mt-8 flex flex-col gap-2">
            {s.channels.map((c, i) => {
              const on = i === tab;
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => pick(i)}
                  className={cx(
                    "box-border flex w-full cursor-pointer items-center gap-3.5 rounded-2xl border px-3.5 py-3 text-paper transition-[background,border-color] duration-250",
                    on ? "border-teal/55 bg-teal/10" : "border-paper/10 bg-transparent",
                  )}
                >
                  <span className={cx("grid size-9 flex-none place-items-center rounded-[10px]", on ? "bg-teal text-ink" : "bg-paper/8 text-paper")}>
                    {c.key === "web" ? (
                      <span className="font-mono text-[10px] font-bold">WEB</span>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={`/logos/${c.key}.svg`} width={18} height={18} alt="" className="block" />
                    )}
                  </span>
                  <span className="min-w-0 flex-1 text-left">
                    <span className="block text-[15px] font-semibold">{c.label}</span>
                    <span className="mt-0.5 block truncate text-[12.5px] opacity-60">{c.who}</span>
                  </span>
                  <span className="font-mono text-[10.5px] tracking-[.08em] opacity-70">AVG {c.stat}</span>
                </button>
              );
            })}
          </div>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/signup" className="rounded-full bg-teal px-[26px] py-3.5 text-[15px] font-semibold text-ink hover:text-ink hover:opacity-88">
              Try it on my business
            </Link>
            <Link href="/demo" className="rounded-full border border-paper/30 px-6 py-[13px] text-[15px] font-semibold text-paper hover:bg-paper/6 hover:text-paper">
              Book a demo
            </Link>
          </div>
        </div>
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute -inset-x-[6%] -inset-y-[10%] bg-[radial-gradient(closest-side,rgb(0_194_168/.22),transparent)] blur-[30px]" />
          <div data-spot className="glass relative rounded-[28px] p-[18px]">
            <div className="flex items-center gap-3 border-b border-paper/8 px-1.5 pt-1.5 pb-4">
              <span className="grid size-[38px] place-items-center rounded-xl bg-teal">
                <span className="size-4 rounded-[6px_6px_6px_2px] bg-ink" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] font-semibold">Kurta House · {ch.label}</span>
                <span className="block truncate text-[12.5px] text-paper/55">{ch.who}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10.5px] tracking-[.1em] text-mint">
                <span className="size-[7px] animate-pulse-ring rounded-full bg-teal" />
                AI ACTIVE
              </span>
            </div>
            <div role="tabpanel" aria-live="polite" className="flex min-h-[330px] flex-col gap-2.5 px-1 pt-[18px] pb-2">
              {ch.msgs.slice(0, shown).map((m, i) => (
                <div key={tab + "-" + i} className={cx("flex animate-pop", m.ai ? "justify-end" : "justify-start")}>
                  <span
                    className={cx(
                      "max-w-[82%] px-[15px] py-[11px] text-[14.5px] leading-[1.45]",
                      m.ai ? "rounded-[18px_18px_4px_18px] bg-teal text-ink" : "rounded-[18px_18px_18px_4px] bg-paper/8 text-paper",
                    )}
                  >
                    {m.text}
                  </span>
                </div>
              ))}
              {typing && (
                <div className="flex justify-end" aria-label="Typing">
                  <span className="inline-flex gap-1 rounded-[18px_18px_4px_18px] bg-paper/8 px-4 py-3.5">
                    {[0, 0.2, 0.4].map((d) => (
                      <span key={d} className="size-1.5 animate-blink rounded-full bg-paper" style={{ animationDelay: `${d}s` }} />
                    ))}
                  </span>
                </div>
              )}
              {done && (
                <div className="mt-auto flex animate-[pop_.4s_both] items-center gap-2.5 rounded-[14px] border border-teal/40 bg-teal/12 px-3.5 py-3 font-mono text-[11px] tracking-[.08em] text-mint">
                  <span className="grid size-5 place-items-center rounded-full bg-teal text-xs font-bold text-ink">✓</span>
                  {ch.action}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const initials = (n: string) => n.split(" ").map((w) => w[0]).join("").slice(0, 2);

export function Slider({ s, band, num }: { s: SliderSection; band: Band; num: string }) {
  const [pos, setPos] = useState(50);
  return (
    <section className={band}>
      <div className="mx-auto max-w-[1240px] px-6 py-[88px]">
        <BigHeader num={num} kicker={s.kicker} title={s.title} sub={s.sub} />
        <div className="relative mt-11 h-[470px] select-none overflow-hidden rounded-[28px] border border-paper/12">
          <div className="absolute inset-0 bg-[#0f1a17] px-[clamp(16px,3vw,28px)] py-[22px]">
            <div className="flex h-[34px] items-center justify-end gap-2.5">
              <span className="font-mono text-[10.5px] tracking-[.1em] text-paper/55">{s.after}</span>
              <span className="rounded-full bg-teal px-3 py-1.5 font-mono text-[10.5px] tracking-[.12em] text-ink">WITH SUUPER</span>
            </div>
            <div className="mt-3.5 flex flex-col">
              {s.rows.map((r) => (
                <div key={r.n} className="flex items-center gap-3.5 border-t border-paper/7 py-3">
                  <span className="grid size-[38px] flex-none place-items-center rounded-full bg-teal/18 font-semibold text-mint">{initials(r.n)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      {r.n} <span className="font-normal text-paper/45">· {r.ch}</span>
                    </span>
                    <span className="mt-[3px] block truncate text-[13.5px] text-mint">AI: {r.r}</span>
                  </span>
                  <span className="flex-none rounded-full border border-teal/50 px-2.5 py-[5px] font-mono text-[10px] tracking-[.08em] text-mint">REPLIED · 2s</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className="absolute inset-0 bg-[#171312] px-[clamp(16px,3vw,28px)] py-[22px]"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            aria-hidden={pos < 5}
          >
            <div className="flex h-[34px] items-center gap-2.5">
              <span className="rounded-full bg-peach px-3 py-1.5 font-mono text-[10.5px] tracking-[.12em] text-ink">WITHOUT SUUPER</span>
              <span className="font-mono text-[10.5px] tracking-[.1em] text-paper/45">{s.before}</span>
            </div>
            <div className="mt-3.5 flex flex-col">
              {s.rows.map((r) => (
                <div key={r.n} className="flex items-center gap-3.5 border-t border-paper/7 py-3">
                  <span className="grid size-[38px] flex-none place-items-center rounded-full bg-paper/8 font-semibold text-paper/60">{initials(r.n)}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold">
                      {r.n} <span className="font-normal text-paper/45">· {r.ch}</span>
                    </span>
                    <span className="mt-[3px] block truncate text-[13.5px] text-paper/60">{r.m}</span>
                  </span>
                  <span className="flex-none rounded-full bg-peach/12 px-2.5 py-[5px] font-mono text-[10px] tracking-[.08em] text-peach">UNREAD · {r.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="pointer-events-none absolute inset-y-0 z-2 -ml-px w-0.5 bg-paper" style={{ left: `${pos}%` }}>
            <span className="absolute top-1/2 left-1/2 grid size-[46px] -translate-1/2 place-items-center rounded-full bg-paper font-bold text-ink shadow-[0_10px_30px_rgba(0,0,0,.4)]">
              ‹ ›
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            aria-label="Compare before and after"
            className="absolute inset-0 z-3 m-0 size-full cursor-ew-resize opacity-0"
          />
        </div>
      </div>
    </section>
  );
}

export function VideoTestimonials({ s, band, num }: { s: VidTestSection; band: Band; num: string }) {
  const [open, setOpen] = useState(-1);
  const count = s.items.length;
  const vid = s.items[open];

  useEffect(() => {
    if (open < 0) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(-1);
      if (e.key === "ArrowRight") setOpen((i) => (i + 1) % count);
      if (e.key === "ArrowLeft") setOpen((i) => (i + count - 1) % count);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, count]);

  return (
    <section className={band}>
      <div className="mx-auto max-w-[1240px] px-6 py-[88px]">
        <BigHeader num={num} kicker={s.kicker} title={s.title} />
        <div className="mt-11 grid grid-cols-[repeat(auto-fit,minmax(min(100%,240px),1fr))] gap-3">
          {s.items.map((v, i) => (
            <button
              key={v.name}
              type="button"
              data-spot
              onClick={() => setOpen(i)}
              aria-label={`Play ${v.name}, ${v.role}`}
              className="reveal-rise relative h-[400px] cursor-pointer overflow-hidden rounded-3xl border-0 bg-card p-0 text-left text-paper transition-transform duration-300 hover:-translate-y-1.5"
            >
              <Image src={v.photo} alt="" fill sizes="(max-width: 600px) 100vw, 300px" className="object-cover" />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,rgb(14_18_16/0)_40%,rgb(14_18_16/.92))]" />
              <span className="absolute top-3.5 right-3.5 rounded-full bg-ink/60 px-2.5 py-[5px] font-mono text-[10.5px] backdrop-blur-[8px]">▶ {v.dur}</span>
              <span className="absolute top-1/2 left-1/2 box-border grid size-16 -translate-1/2 place-items-center rounded-full border border-paper/40 bg-paper/18 pl-1 text-xl backdrop-blur-[12px]">
                ▶
              </span>
              <span className="absolute inset-x-5 bottom-5">
                <span className="block font-display text-lg font-semibold">{v.name}</span>
                <span className="mt-[3px] block text-[13px] text-paper/70">{v.role}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
      {vid && (
        <div onClick={() => setOpen(-1)} className="fixed inset-0 z-110 grid animate-[fadein_.25s_both] place-items-center bg-[rgb(6_9_8/.82)] p-4 backdrop-blur-[10px]">
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`${vid.name} testimonial`}
            onClick={(e) => e.stopPropagation()}
            className="relative flex w-full max-w-[980px] animate-[zoom_.3s_both] flex-wrap overflow-hidden rounded-[26px] border border-paper/12 bg-ink"
          >
            <div className="relative min-h-[380px] flex-[3_1_420px] bg-card">
              <Image src={vid.photo} alt="" fill sizes="(max-width: 980px) 100vw, 590px" className="object-cover" />
              <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgb(14_18_16/.8))]" />
              <span className="absolute top-1/2 left-1/2 box-border grid size-20 -translate-1/2 place-items-center rounded-full bg-teal pl-[5px] text-[26px] text-ink">▶</span>
              <span className="absolute inset-x-5 bottom-[18px] flex items-center gap-3 font-mono text-[11px] text-paper/80">
                0:00
                <span className="h-[3px] flex-1 rounded-[9px] bg-paper/25">
                  <span className="block h-full w-[8%] rounded-[9px] bg-teal" />
                </span>
                {vid.dur}
              </span>
            </div>
            <div className="flex flex-[2_1_300px] flex-col gap-4 p-8">
              <span className="font-mono text-[11px] tracking-[.14em] text-teal">TRANSCRIPT</span>
              <p className="font-serif text-[28px] leading-[1.25]">“{vid.q}”</p>
              <span className="mt-auto">
                <span className="block font-semibold">{vid.name}</span>
                <span className="mt-0.5 block text-[13.5px] text-paper/60">{vid.role}</span>
              </span>
              <span className="flex gap-2">
                <button type="button" aria-label="Previous" onClick={() => setOpen((open + count - 1) % count)} className="size-[42px] rounded-full border border-paper/25 bg-transparent text-paper">
                  ‹
                </button>
                <button type="button" aria-label="Next" onClick={() => setOpen((open + 1) % count)} className="size-[42px] rounded-full border border-paper/25 bg-transparent text-paper">
                  ›
                </button>
                <Link href="/signup" className="ml-auto rounded-full bg-teal px-5 py-3 text-sm font-semibold text-ink hover:text-ink">
                  Start free
                </Link>
              </span>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(-1)}
              className="absolute top-3 right-3 z-2 size-[38px] rounded-full border-0 bg-ink/70 text-lg text-paper"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const SLOTS = ["10:00 AM", "10:30 AM", "11:30 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:30 PM", "5:30 PM"];
const noSubscribe = () => () => {};
const startOfToday = () => {
  const n = new Date();
  return new Date(n.getFullYear(), n.getMonth(), n.getDate()).getTime();
};
const bookInput = "rounded-xl border border-ink/18 bg-white px-3.5 py-[13px] text-[14.5px] text-ink outline-none placeholder:text-ink/45 focus:border-teal-deep";

export function Book({ s }: { s: BookSection }) {
  // Null on the server, so the calendar renders with every day disabled until it hydrates.
  const todayTs = useSyncExternalStore(noSubscribe, startOfToday, () => null);
  const today = todayTs === null ? null : new Date(todayTs);
  const [month, setMonth] = useState(0);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState("");
  const [done, setDone] = useState(false);

  const base = today ?? new Date(2026, 0, 1);
  const first = new Date(base.getFullYear(), base.getMonth() + month, 1);
  const lead = (first.getDay() + 6) % 7;
  const daysIn = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  const slots = date ? SLOTS.filter((_, i) => (i + date.getDate()) % 4 !== 0) : [];
  const longDate = date ? `${DAYS[date.getDay()]}, ${MONTHS[date.getMonth()]} ${date.getDate()}` : "";
  const shortDate = date ? `${DAYS[date.getDay()].slice(0, 3)}, ${MONTHS[date.getMonth()].slice(0, 3)} ${date.getDate()}` : "";
  const stepLabel = !date ? "STEP 1 OF 3 · PICK A DAY" : !time ? "STEP 2 OF 3 · PICK A TIME" : "STEP 3 OF 3 · YOUR DETAILS";
  const changeMonth = (m: number) => {
    setMonth(Math.max(0, Math.min(2, m)));
    setDate(null);
    setTime("");
  };

  return (
    <section className="p-4">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(min(100%,400px),1fr))] gap-3">
        <div className="relative overflow-hidden rounded-[28px] border border-paper/8 bg-ink bg-[radial-gradient(rgb(247_246_242/.09)_1px,transparent_1px)] bg-size-[22px_22px] p-[clamp(28px,4vw,52px)]">
          <div aria-hidden className="absolute -top-[20%] -right-[20%] h-3/5 w-[70%] bg-[radial-gradient(closest-side,rgb(0_194_168/.25),transparent)] blur-[20px]" />
          <div className="relative">
            <span className="font-mono text-[11px] tracking-[.16em] text-teal">BOOK A DEMO · 30 MIN</span>
            <h1 className="mt-4 text-balance font-display text-[clamp(38px,5vw,64px)] leading-[.98] font-semibold tracking-[-.05em]">
              See Suuper on <span className="font-serif font-normal italic text-teal">your</span> business.
            </h1>
            <p className="mt-[18px] max-w-[30em] text-[17px] leading-[1.55] text-paper/65">
              Bring your website and one process you want off your plate. We&apos;ll build it live.
            </p>
            <ul className="mt-7 flex flex-col gap-3">
              {s.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] leading-normal">
                  <span className="grid size-[22px] flex-none place-items-center rounded-full bg-teal/18 text-xs font-bold text-teal">✓</span>
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex items-center gap-3.5 border-t border-paper/10 pt-6">
              <AvatarStack size={40} />
              <span className="text-sm leading-[1.45] text-paper/70">
                You&apos;ll meet a product specialist, not a sales script. <span className="text-paper">4.9/5 from 300+ demos.</span>
              </span>
            </div>
          </div>
        </div>
        <div className="rounded-[28px] bg-paper p-[clamp(24px,3.5vw,40px)] text-ink">
          {done ? (
            <div className="flex min-h-[460px] animate-[pop_.5s_both] flex-col items-start justify-center gap-4" aria-live="polite">
              <span className="grid size-14 place-items-center rounded-full bg-teal text-[26px] font-bold">✓</span>
              <h2 className="font-display text-[40px] font-semibold tracking-[-.04em]">You&apos;re booked.</h2>
              <p className="text-base leading-[1.55] text-ink/70">
                {longDate} at {time} PKT. A calendar invite and video link are on their way to your inbox.
              </p>
              <div className="mt-2 flex flex-wrap gap-2.5">
                <Link href="/demo" className="rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper hover:text-paper">
                  Add to Google Calendar
                </Link>
                <Link href="/" className="rounded-full border border-ink/30 px-[18px] py-[11px] text-sm font-semibold text-ink hover:text-ink">
                  Back to home
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[11px] tracking-[.14em] text-ink/55">{stepLabel}</span>
                <span className="font-mono text-[11px] text-ink/55">PKT · GMT+5</span>
              </div>
              <div className="mt-[18px] flex items-center justify-between">
                <span className="font-display text-[22px] font-semibold tracking-[-.02em]">
                  {MONTHS[first.getMonth()]} {first.getFullYear()}
                </span>
                <span className="flex gap-1.5">
                  {[
                    ["Previous month", "‹", -1],
                    ["Next month", "›", 1],
                  ].map(([label, glyph, d]) => (
                    <button
                      key={label}
                      type="button"
                      aria-label={label as string}
                      onClick={() => changeMonth(month + (d as number))}
                      className="size-9 rounded-full border border-ink/20 bg-transparent text-base text-ink"
                    >
                      {glyph}
                    </button>
                  ))}
                </span>
              </div>
              <div className="mt-3.5 grid grid-cols-7 gap-1 text-center">
                {["MO", "TU", "WE", "TH", "FR", "SA", "SU"].map((d) => (
                  <span key={d} className="py-1.5 font-mono text-[10.5px] text-ink/45">{d}</span>
                ))}
                {Array.from({ length: lead }, (_, i) => (
                  <span key={"x" + i} />
                ))}
                {Array.from({ length: daysIn }, (_, i) => {
                  const d = new Date(first.getFullYear(), first.getMonth(), i + 1);
                  const off = !today || d <= today || d.getDay() === 0 || d.getDay() === 6;
                  const on = !!date && d.getTime() === date.getTime();
                  return (
                    <button
                      key={i}
                      type="button"
                      disabled={off}
                      aria-pressed={on}
                      onClick={() => {
                        setDate(d);
                        setTime("");
                      }}
                      className={cx(
                        "aspect-square rounded-xl border-0 text-sm",
                        on ? "bg-ink font-semibold text-paper" : off ? "cursor-default bg-transparent text-ink/28" : "bg-teal/16 font-semibold text-ink",
                      )}
                    >
                      {i + 1}
                    </button>
                  );
                })}
              </div>
              {date && (
                <>
                  <p className="mt-[22px] mb-2.5 font-mono text-[11px] tracking-[.12em] text-ink/55">{longDate.toUpperCase()} · 30 MIN</p>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(96px,1fr))] gap-1.5">
                    {slots.map((t) => (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={time === t}
                        onClick={() => setTime(t)}
                        className={cx(
                          "rounded-xl border px-2 py-3 text-sm font-semibold",
                          time === t ? "border-ink bg-ink text-paper" : "border-ink/16 bg-white text-ink",
                        )}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </>
              )}
              {time && (
                <form
                  className="animate-[pop_.35s_both]"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setDone(true);
                  }}
                >
                  <div className="mt-[22px] grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-2">
                    <input required name="name" autoComplete="name" placeholder="Full name" aria-label="Full name" className={bookInput} />
                    <input required name="email" type="email" autoComplete="email" placeholder="Work email" aria-label="Work email" className={bookInput} />
                    <input name="website" autoComplete="url" placeholder="Company website" aria-label="Company website" className={bookInput} />
                    <select name="team" aria-label="Team size" className={bookInput}>
                      <option>Team size: 1–10</option>
                      <option>11–50</option>
                      <option>51–200</option>
                      <option>200+ (Enterprise)</option>
                    </select>
                  </div>
                  <button type="submit" className="mt-3.5 w-full rounded-full border-0 bg-ink p-4 text-[15px] font-semibold text-paper">
                    Confirm {shortDate} · {time}
                  </button>
                  <p className="mt-3 text-center font-mono text-[10.5px] tracking-[.08em] text-ink/50">FREE · NO COMMITMENT · RESCHEDULE ANYTIME</p>
                </form>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

const tagClass: Record<ChangelogEntry["tag"], string> = {
  NEW: "bg-teal text-ink",
  IMPROVED: "bg-peach text-ink",
  FIXED: "border border-paper/30 text-paper",
};

export function Changelog({ s }: { s: ChangelogSection }) {
  const [tag, setTag] = useState("All");
  const [subscribed, setSubscribed] = useState(false);
  const items = s.items.filter((e) => tag === "All" || e.tag === tag.toUpperCase());
  return (
    <section className="mx-auto max-w-[1040px] px-6 pt-8 pb-[88px]">
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter updates">
        {["All", "New", "Improved", "Fixed"].map((t) => (
          <FilterChip key={t} on={tag === t} onClick={() => setTag(t)}>
            {t}
          </FilterChip>
        ))}
      </div>
      {items.map((e) => (
        <article key={e.v} className="reveal-rise mt-6 flex flex-wrap gap-x-10 gap-y-4 border-t border-paper/10 py-11">
          <div className="flex flex-[0_0_170px] flex-col gap-2">
            <span className="font-mono text-[11.5px] tracking-[.1em] text-paper/60">{e.d}</span>
            <span className="font-mono text-[11px] text-paper/40">{e.v}</span>
          </div>
          <div className="min-w-0 flex-[1_1_420px]">
            <span className={cx("inline-block rounded-full px-2.5 py-[5px] font-mono text-[10.5px] tracking-[.12em]", tagClass[e.tag])}>{e.tag}</span>
            <h3 className="mt-3.5 font-display text-[clamp(24px,2.6vw,32px)] leading-[1.1] font-semibold tracking-[-.03em]">{e.t}</h3>
            <p className="mt-3 max-w-[40em] text-base leading-[1.65] text-paper/68">{e.b}</p>
            {e.points.length > 0 && (
              <ul className="mt-3.5 grid list-disc gap-1.5 pl-5 text-[15px] text-paper/80">
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
            {e.img && (
              <div className="relative mt-[22px] aspect-[16/8] overflow-hidden rounded-[20px] border border-paper/10">
                <Image src={e.img} alt="" fill sizes="(max-width: 1040px) 100vw, 780px" className="object-cover" />
              </div>
            )}
          </div>
        </article>
      ))}
      <div id="subscribe" data-spot className="glass relative mt-6 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-7">
        <span>
          <span className="block font-display text-[22px] font-semibold">Get updates in your inbox.</span>
          <span className="mt-1 block text-sm text-paper/60">One short email a month. Unsubscribe anytime.</span>
        </span>
        {subscribed ? (
          <span className="font-mono text-xs tracking-[.1em] text-mint" aria-live="polite">✓ SUBSCRIBED</span>
        ) : (
          <form
            className="flex flex-[0_1_420px] flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSubscribed(true);
            }}
          >
            <input
              type="email"
              required
              placeholder="you@business.com"
              aria-label="Email"
              className="flex-[1_1_200px] rounded-full border border-paper/20 bg-ink/50 px-[18px] py-[13px] text-[14.5px] text-paper outline-none focus:border-teal"
            />
            <button type="submit" className="rounded-full border-0 bg-teal px-[22px] py-[13px] font-semibold text-ink">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

export function Help({ s }: { s: HelpSection }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const needle = q.trim().toLowerCase();
  const list = s.articles.filter(([c, t]) => (!cat || c === cat) && (!needle || (t + " " + c).toLowerCase().includes(needle)));
  const label = needle ? `RESULTS FOR “${q.toUpperCase()}”` : cat ? cat.toUpperCase() : "POPULAR ARTICLES";
  const search = (v: string) => {
    setQ(v);
    setCat("");
  };
  return (
    <section className="p-4">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] border border-paper/8 bg-ink bg-[radial-gradient(rgb(247_246_242/.09)_1px,transparent_1px)] bg-size-[22px_22px] px-6 py-[clamp(48px,7vw,96px)] text-center">
        <div aria-hidden className="absolute -top-[40%] left-1/2 h-[90%] w-4/5 -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(0_194_168/.25),transparent)] blur-[20px]" />
        <div className="relative">
          <span className="font-mono text-[11px] tracking-[.16em] text-teal">HELP CENTER</span>
          <h1 className="mt-4 font-display text-[clamp(40px,6vw,80px)] leading-[.95] font-semibold tracking-[-.05em]">
            How can we <span className="font-serif font-normal italic text-teal">help?</span>
          </h1>
          <form
            role="search"
            onSubmit={(e) => e.preventDefault()}
            className="glass mx-auto mt-8 flex max-w-[620px] items-center gap-3 rounded-full py-1.5 pr-1.5 pl-[22px]"
          >
            <svg aria-hidden viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
              <path d="M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z M21 21l-4.3-4.3" />
            </svg>
            <input
              value={q}
              onChange={(e) => search(e.target.value)}
              placeholder="Search articles, e.g. WhatsApp"
              aria-label="Search help articles"
              className="min-w-0 flex-1 border-0 bg-transparent py-3 text-base text-paper outline-none"
            />
            <button type="submit" className="rounded-full border-0 bg-teal px-5 py-3 text-sm font-semibold text-ink">
              Search
            </button>
          </form>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-[13px] text-paper/60">
            Popular:
            {["WhatsApp", "Refund", "SSO"].map((p) => (
              <button key={p} type="button" onClick={() => search(p)} className="rounded-full border border-paper/18 bg-transparent px-3 py-1 text-[13px] text-paper">
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto mt-3 grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-3">
        {s.cats.map(([t, d, n, icon]) => (
          <button
            key={t}
            type="button"
            data-spot
            aria-pressed={cat === t}
            onClick={() => {
              setCat(t);
              setQ("");
            }}
            className={cx(
              "card relative flex cursor-pointer flex-col gap-2.5 p-6 text-left text-paper transition-[transform,border-color] duration-250 hover:-translate-y-1 hover:border-teal/50",
              cat === t && "border-teal/50",
            )}
          >
            <span className="grid size-[42px] place-items-center rounded-xl bg-teal/14">
              <svg aria-hidden viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--color-teal)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d={icon} />
              </svg>
            </span>
            <span className="mt-2 font-display text-[19px] font-semibold">{t}</span>
            <span className="text-sm leading-normal text-paper/60">{d}</span>
            <span className="font-mono text-[10.5px] tracking-[.1em] text-paper/45">{n} ARTICLES →</span>
          </button>
        ))}
      </div>
      <div className="mx-auto mt-3 flex max-w-[1240px] flex-wrap gap-3">
        <div className="min-w-0 flex-[2_1_520px] rounded-[22px] border border-paper/10 px-6 py-2" aria-live="polite">
          <p className="mt-[18px] mb-2 font-mono text-[11px] tracking-[.14em] text-paper/50">{label}</p>
          {list.map(([c, t]) => (
            <Link key={t} href="/help" className="flex items-center gap-3.5 border-t border-paper/8 py-[15px] hover:text-mint">
              <span className="flex-1 text-[15.5px]">{t}</span>
              <span className="font-mono text-[10px] tracking-[.08em] text-paper/45">{c.toUpperCase()}</span>
              <span className="text-teal">→</span>
            </Link>
          ))}
          {list.length === 0 && <p className="py-6 text-paper/60">No articles match. Ask our AI assistant or email support@suuper.cc.</p>}
        </div>
        <div className="flex flex-[1_1_300px] flex-col gap-3">
          <div className="rounded-[22px] bg-teal p-6 text-ink">
            <span className="font-mono text-[10.5px] tracking-[.12em]">24/7 · AVG 2s</span>
            <span className="mt-2.5 block font-display text-[22px] font-semibold">Chat with Suuper AI</span>
            <span className="mt-1.5 block text-sm opacity-80">Trained on every help article.</span>
          </div>
          <a href="mailto:support@suuper.cc" className="card p-6 hover:border-teal/50 hover:text-paper">
            <span className="font-mono text-[10.5px] tracking-[.12em] text-paper/50">REPLY IN UNDER 4H</span>
            <span className="mt-2.5 block font-display text-xl font-semibold">support@suuper.cc</span>
          </a>
          <Link href="/demo" className="rounded-[22px] bg-paper p-6 text-ink hover:text-ink hover:opacity-90">
            <span className="font-mono text-[10.5px] tracking-[.12em] text-ink/55">FOR TEAMS</span>
            <span className="mt-2.5 block font-display text-xl font-semibold">Book an onboarding call →</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export function Jobs({ s, band, num }: { s: JobsSection; band: Band; num: string }) {
  const [dept, setDept] = useState("All");
  const depts = ["All", "Engineering", "Product", "Sales", "Customer success"];
  const list = s.items.filter((j) => dept === "All" || j[1] === dept);
  return (
    <section className={band}>
      <div className="mx-auto max-w-[1040px] px-6 py-[88px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <NumPill num={num}>{s.kicker}</NumPill>
            <h2 className="mt-5 max-w-[16em] text-balance font-display text-[clamp(32px,4.6vw,58px)] leading-[1.02] font-semibold tracking-[-.045em]">
              <AccentTitle title={s.title} />
            </h2>
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Filter by team">
            {depts.map((d) => (
              <FilterChip key={d} on={dept === d} onClick={() => setDept(d)}>
                {d} {d === "All" ? s.items.length : s.items.filter((j) => j[1] === d).length}
              </FilterChip>
            ))}
          </div>
        </div>
        <div className="mt-9 border-t border-paper/12">
          {list.map(([t, d, l, k]) => (
            <a
              key={t}
              href={"mailto:careers@suuper.cc?subject=" + encodeURIComponent(t)}
              className="flex flex-wrap items-center gap-x-6 gap-y-2.5 border-b border-paper/12 px-1 py-6 transition-[padding] duration-250 hover:pl-3.5 hover:text-mint"
            >
              <span className="flex-[1_1_280px] font-display text-[21px] font-semibold tracking-[-.02em]">{t}</span>
              <span className="font-mono text-[11px] tracking-[.08em] text-paper/55">
                {d} · {l} · {k}
              </span>
              <span className="text-sm font-semibold text-teal">Apply →</span>
            </a>
          ))}
        </div>
        <p className="mt-6 text-[15px] text-paper/60">
          Don&apos;t see your role? Write to{" "}
          <a href="mailto:careers@suuper.cc" className="text-mint">
            careers@suuper.cc
          </a>
        </p>
      </div>
    </section>
  );
}
