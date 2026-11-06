"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { builtSteps, demoQA } from "@/content/demo";
import { agencyPilot, billingCycles, creditNotes, planIncludes, plans, popularPlan } from "@/content/site";
import type {
  BuilderSection,
  ConnectorSection,
  ContactSection,
  DemoSection,
  FaqSection,
  PricingSection,
  RoiSection,
} from "@/content/types";
import { AskPair } from "@/components/site/FloatingUi";
import { AccentTitle, Chip, cx, Kicker, LogoMark, NumPill, SectionHeader, SectionTitle, TypingDots } from "@/components/ui";
import { HeroBackdrop } from "./Hero";
import { useAskThread } from "@/components/useAskThread";
import { honeypotProps, submitLead } from "@/lib/leads";
import { type Band, Wrap } from "./static";

/** The ROI calculator compares against the Starter plan. */
const SUUPER_COST = 97;
/** Share of recovered conversations assumed to convert into a sale. */
const CONVERSION = 0.35;

export function Roi({ s, band }: { s: RoiSection; band: Band }) {
  const [msgs, setMsgs] = useState(600);
  const [aov, setAov] = useState(20);
  const [miss, setMiss] = useState(25);

  const recoveredLeads = (msgs * miss) / 100;
  const recoveredValue = recoveredLeads * CONVERSION * aov;

  const sliders = [
    { label: "MESSAGES PER MONTH", display: msgs.toLocaleString("en-US"), min: 50, max: 3000, step: 50, value: msgs, set: setMsgs },
    { label: "AVERAGE ORDER VALUE", display: usd(aov), min: 5, max: 500, step: 5, value: aov, set: setAov },
    { label: "MISSED OR LATE REPLIES", display: miss + "%", min: 5, max: 60, step: 1, value: miss, set: setMiss },
  ];

  return (
    <Wrap band={band}>
      <div className="text-center">
        <Kicker>ROI CALCULATOR</Kicker>
        <SectionTitle>
          <AccentTitle title={s.title} />
        </SectionTitle>
        <p className="mx-auto mt-4 max-w-[36em] text-[16.5px] leading-[1.55] text-paper/60">{s.sub}</p>
      </div>
      <div className="mt-10 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
        <div className="card flex flex-col gap-7 p-[34px]">
          {sliders.map((sl) => (
            <label key={sl.label} className="block">
              <span className="flex justify-between font-mono text-xs tracking-[.08em] text-paper/60">
                <span>{sl.label}</span>
                <span className="text-teal">{sl.display}</span>
              </span>
              <input
                type="range"
                min={sl.min}
                max={sl.max}
                step={sl.step}
                value={sl.value}
                onChange={(e) => sl.set(Number(e.target.value))}
                className="mt-3 w-full"
              />
            </label>
          ))}
        </div>
        <div className="rounded-[22px] p-[34px] teal-dots-sm" aria-live="polite">
          <span className="font-mono text-[11px] tracking-[.14em]">RECOVERABLE REVENUE / MONTH</span>
          <p className="mt-3.5 font-mono text-[clamp(36px,5vw,60px)] font-bold tracking-[-.03em] tabular-nums">
            {usd(recoveredValue)}
          </p>
          <div className="my-6 h-px bg-ink/20" />
          <div className="flex flex-col gap-3 text-[15px]">
            <p className="flex justify-between">
              Leads recovered <span className="font-mono">{Math.round(recoveredLeads * CONVERSION)} / month</span>
            </p>
            <p className="flex justify-between">
              Suuper cost <span className="font-mono">{usd(SUUPER_COST)}</span>
            </p>
            <p className="flex justify-between">
              Return on spend <span className="font-mono font-bold">{Math.round(recoveredValue / SUUPER_COST)}x</span>
            </p>
          </div>
          <Link
            href="/signup"
            className="mt-[26px] block rounded-full bg-ink p-[15px] text-center font-semibold text-paper hover:text-paper hover:opacity-85"
          >
            {s.cta}
          </Link>
        </div>
      </div>
    </Wrap>
  );
}

export function Faq({ s, band }: { s: FaqSection; band: Band }) {
  const [open, setOpen] = useState<Record<number, boolean>>({ 0: true });
  return (
    <Wrap band={band} width="max-w-[860px]">
      <h2 className="mb-10 text-center font-display text-[clamp(30px,4.4vw,54px)] leading-none font-semibold tracking-[-.045em]">
        <AccentTitle title={s.title} />
      </h2>
      <div className="border-t border-paper/12">
        {s.items.map(([q, a], i) => {
          const isOpen = !!open[i];
          return (
            <div key={q} className="border-b border-paper/12">
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-${i}`}
                  onClick={() => setOpen((o) => ({ ...o, [i]: !isOpen }))}
                  className="flex w-full items-center gap-4 border-0 bg-transparent px-1 py-[22px] text-left font-display text-[17px] font-medium text-paper"
                >
                  {q}
                  <span aria-hidden className="ml-auto text-xl text-teal">{isOpen ? "−" : "+"}</span>
                </button>
              </h3>
              {isOpen && (
                <p id={`faq-${i}`} className="animate-fadein px-1 pb-[22px] text-[15px] leading-relaxed text-paper/62">
                  {a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Wrap>
  );
}

export function Demo({ s, band, num }: { s: DemoSection; band: Band; num: string }) {
  const { asked, typing, ask } = useAskThread([0]);
  return (
    <section className={band}>
      <div className="mx-auto max-w-[1240px] px-6 py-20">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-3">
          <div className="card flex flex-col justify-center px-10 py-11">
            <NumPill num={num}>{s.kicker}</NumPill>
            <h3 className="mt-4 font-display text-[clamp(28px,3.6vw,46px)] leading-none font-semibold tracking-[-.045em]">
              <AccentTitle title={s.title} />
            </h3>
            <p className="mt-[18px] text-[16.5px] leading-relaxed text-paper/68">{s.body}</p>
            <p className="mt-7 mb-2.5 font-mono text-[11px] tracking-[.12em] text-paper/45">TRY A QUESTION</p>
            <div className="flex flex-wrap gap-2">
              {demoQA.map(([q], i) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => ask(i)}
                  className="rounded-full border border-paper/20 bg-transparent px-3.5 py-2.5 text-[13.5px] text-paper hover:border-teal hover:text-teal"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
          <div className="grid place-items-center rounded-[22px] p-[30px] teal-dots-sm">
            <div className="w-full max-w-[420px] rounded-3xl bg-ink p-[22px] text-paper shadow-[0_30px_60px_rgba(14,18,16,.35)]">
              <div className="flex items-center gap-2.5 border-b border-paper/14 pb-3.5">
                <LogoMark />
                <span className="font-display text-[15px] font-semibold">Suuper Assistant</span>
                <span className="ml-auto font-mono text-[10px] text-teal">ONLINE</span>
              </div>
              <div aria-live="polite" className="mt-4 flex min-h-[260px] flex-col gap-2.5 text-sm leading-normal">
                {asked.map((i, n) => (
                  <AskPair key={n} index={i} pending={typing && n === asked.length - 1} />
                ))}
                {typing && <TypingDots />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const connLabels = ["Select tool", "Authorize", "Choose permissions", "Test", "Connect"];
const permKeys = ["Read", "Search", "Create", "Update", "Send", "Trigger"] as const;
type Perm = (typeof permKeys)[number];

export function ConnectorFlow({ s, band, num }: { s: ConnectorSection; band: Band; num: string }) {
  const [step, setStep] = useState(2);
  const [perms, setPerms] = useState<Record<Perm, boolean>>({
    Read: true, Search: true, Create: false, Update: false, Send: true, Trigger: false,
  });
  const [connected, setConnected] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);

  const connect = () => {
    if (connected) return;
    setStep(3);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setStep(4);
      setConnected(true);
    }, 900);
  };
  const allowed = permKeys.filter((k) => perms[k]).length;

  return (
    <Wrap band={band}>
      <SectionHeader num={num} kicker={s.kicker} title={s.title} sub={s.sub} />
      <div className="mt-12 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
        <ol className="card flex flex-col gap-0.5 p-3.5">
          {connLabels.map((l, i) => (
            <li key={l}>
              <button
                type="button"
                aria-current={i === step ? "step" : undefined}
                onClick={() => setStep(i)}
                className={cx(
                  "flex w-full items-center gap-3 rounded-xl border-0 px-3.5 py-[15px] text-left text-[15px] font-medium",
                  i === step ? "bg-teal text-ink" : i < step ? "bg-transparent text-teal" : "bg-transparent text-paper/70",
                )}
              >
                <span className="w-[22px] font-mono text-[11px] opacity-60">0{i + 1}</span>
                {l}
              </button>
            </li>
          ))}
        </ol>
        <div className="card min-w-0 p-[34px] min-[660px]:col-span-2">
          <span className="font-mono text-[11px] tracking-[.14em] text-paper/50">CONNECTOR · SLACK</span>
          <p className="mt-3 mb-1.5 font-display text-[30px] font-bold tracking-[-.03em]">Connect Slack to Suuper.</p>
          <p className="max-w-[34em] text-[15px] leading-[1.55] text-paper/62">
            Give your AI access to Slack so it can read the information it needs and take the actions you approve.
          </p>
          <p className="mt-7 mb-3 font-mono text-[11px] tracking-[.14em] text-paper/50">CAPABILITIES</p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-2">
            {permKeys.map((k) => {
              const on = perms[k];
              return (
                <button
                  key={k}
                  type="button"
                  role="switch"
                  aria-checked={on}
                  onClick={() => {
                    setPerms((p) => ({ ...p, [k]: !p[k] }));
                    setStep((st) => Math.max(st, 2));
                  }}
                  className={cx(
                    "flex items-center justify-between gap-2.5 rounded-xl border px-3.5 py-[13px] text-sm font-medium",
                    on ? "border-teal/50 bg-teal/12 text-paper" : "border-paper/14 bg-transparent text-paper/60",
                  )}
                >
                  <span>{k}</span>
                  <span className={cx("relative h-[18px] w-[30px] rounded-full transition-colors", on ? "bg-teal" : "bg-paper/20")}>
                    <span
                      className={cx(
                        "absolute top-0.5 size-3.5 rounded-full bg-ink transition-[left]",
                        on ? "left-[14px]" : "left-0.5",
                      )}
                    />
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3.5">
            <button
              type="button"
              onClick={connect}
              className="rounded-full border-0 bg-teal px-7 py-[15px] text-[15px] font-semibold text-ink"
            >
              {connected ? "Connected ✓" : step === 3 ? "Testing…" : "Connect Slack"}
            </button>
            <span aria-live="polite" className="font-mono text-[11.5px] tracking-[.08em] text-teal">
              {connected ? "CONNECTOR CONNECTED." : `${allowed} OF 6 ACTIONS ALLOWED · CHANGE ANYTIME`}
            </span>
          </div>
        </div>
      </div>
    </Wrap>
  );
}

export function Builder({ s, band, num }: { s: BuilderSection; band: Band; num: string }) {
  const [prompt, setPrompt] = useState(s.prompt);
  const [built, setBuilt] = useState(false);
  return (
    <Wrap band={band} width="max-w-[1000px]">
      <SectionHeader num={num} kicker={s.kicker} title={s.title} />
      <div className="mt-11 rounded-3xl border border-paper/14 bg-panel p-[22px]">
        <textarea
          aria-label="Describe the process"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          rows={3}
          className="min-h-20 w-full resize-y border-0 bg-transparent text-[17px] leading-relaxed text-paper outline-none"
        />
        <div className="mt-[18px] flex flex-wrap items-center justify-between gap-2.5 border-t border-paper/10 pt-4">
          <span className="font-mono text-[11px] tracking-[.1em] text-paper/45">USES: KNOWLEDGE · CRM · WEB RESEARCH · EMAIL</span>
          <button
            type="button"
            onClick={() => setBuilt(true)}
            disabled={!prompt.trim()}
            className="rounded-full border-0 bg-teal px-6 py-[13px] text-[14.5px] font-semibold text-ink disabled:opacity-50"
          >
            {built ? "Regenerate" : "Generate app"}
          </button>
        </div>
      </div>
      {built && (
        <>
          <div className="mt-4 flex animate-[pop_.5s_both] flex-wrap gap-3">
            {builtSteps.map((b) => (
              <div key={b.k} className="card min-w-0 flex-[1_1_200px] p-5">
                <span className="font-mono text-[10.5px] tracking-[.12em] text-teal">{b.k}</span>
                <p className="mt-2 text-sm leading-normal text-paper/82">{b.v}</p>
              </div>
            ))}
          </div>
          <div className="mt-[22px] flex justify-center">
            <Link
              href="/signup"
              className="rounded-full bg-paper px-7 py-[15px] text-[15px] font-semibold text-ink hover:text-ink hover:opacity-85"
            >
              Book a demo
            </Link>
          </div>
        </>
      )}
    </Wrap>
  );
}

const usd = (n: number) => "$" + Math.round(n).toLocaleString("en-US");

export function Pricing({ s }: { s: PricingSection }) {
  const [details, setDetails] = useState(true);
  const [cycleKey, setCycleKey] = useState<(typeof billingCycles)[number]["key"]>("monthly");
  const cycle = billingCycles.find((c) => c.key === cycleKey) ?? billingCycles[0];

  return (
    <>
      <section className="p-4">
        <div className="relative mx-auto overflow-hidden rounded-[28px] border border-paper/8 bg-ink px-[clamp(24px,4vw,52px)] py-[clamp(36px,5vw,64px)] max-w-[1240px]">
          <HeroBackdrop focus="60% 30%" waves={2} waveHeight="h-40" />
          <div className="relative max-w-[46em]">
            <span className="rounded-full bg-teal px-[11px] py-1.5 font-mono text-[10.5px] font-bold tracking-[.12em] text-ink">PRICING</span>
            <h1 className="mt-5 max-w-[14em] text-balance font-display text-[clamp(36px,5vw,68px)] leading-[.98] font-semibold tracking-[-.05em]">
              <AccentTitle title={s.title} />
            </h1>
            <p className="mt-4 max-w-[38em] text-[17px] leading-[1.55] text-paper/72">{s.sub}</p>
          </div>
        </div>
      </section>

      <section>
        <div className="mx-auto max-w-[1240px] px-6 pt-8">
          <div
            role="group"
            aria-label="Billing period"
            className="mb-6 grid grid-cols-2 gap-1 rounded-[22px] border border-paper/10 bg-panel p-[5px] sm:inline-flex sm:rounded-full"
          >
            {billingCycles.map((c) => (
              <button
                key={c.key}
                type="button"
                aria-pressed={cycle.key === c.key}
                onClick={() => setCycleKey(c.key)}
                className={cx(
                  "flex flex-col items-center justify-center gap-1 rounded-[18px] border-0 px-3 py-2.5 text-sm font-semibold sm:flex-row sm:gap-2 sm:rounded-full sm:px-[18px]",
                  cycle.key === c.key ? "bg-paper text-ink" : "bg-transparent text-paper/70",
                )}
              >
                {c.label}
                {c.badge && <span className="rounded-full bg-teal px-[7px] py-[3px] font-mono text-[10.5px] font-bold text-ink">{c.badge}</span>}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 items-stretch gap-4 min-[620px]:grid-cols-2 min-[1100px]:grid-cols-4">
            {plans.map((p) => {
              const pop = p.name === popularPlan;
              return (
                <div
                  key={p.name}
                  className={cx(
                    "flex flex-col overflow-hidden rounded-3xl border",
                    pop ? "border-teal bg-teal shadow-[0_30px_80px_rgba(0,194,168,.22)]" : "border-paper/14",
                  )}
                >
                  <div className={cx("py-[9px] text-center font-mono text-[10.5px] font-bold tracking-[.14em] text-ink", !pop && "invisible")}>
                    {pop ? "★ MOST POPULAR" : "\u00a0"}
                  </div>
                  <div
                    className={cx(
                      "flex flex-1 flex-col px-6 pt-[26px] pb-[18px] text-paper",
                      pop ? "rounded-[22px_22px_23px_23px] bg-[linear-gradient(180deg,#0f3b34_0%,var(--color-ink)_70%)]" : "bg-card",
                    )}
                  >
                    <p className="font-display text-[22px] font-bold tracking-[-.02em]">{p.name}</p>
                    <p className="mt-1.5 text-[13.5px] leading-[1.45] opacity-65">{p.desc}</p>
                    {cycle.discount > 0 && <p className="mt-[18px] font-mono text-sm line-through opacity-45">{usd(p.n)}</p>}
                    <p className={cx("flex items-baseline gap-1.5 whitespace-nowrap", cycle.discount > 0 ? "mt-1" : "mt-[18px]")}>
                      <span className="font-mono text-[clamp(26px,2.4vw,32px)] font-bold tracking-[-.02em]">{usd(p.n * (1 - cycle.discount))}</span>
                      <span className="text-[13px] opacity-60">/month</span>
                    </p>
                    <p className="mt-1.5 font-mono text-[10.5px] tracking-[.1em] opacity-55">
                      {cycle.months === 1
                        ? "BILLED MONTHLY"
                        : `BILLED ${usd(p.n * (1 - cycle.discount) * cycle.months)} EVERY ${cycle.months === 12 ? "YEAR" : cycle.months + " MONTHS"}`}
                    </p>
                    <div className={cx("mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-[14px] border", pop ? "border-teal/35 bg-teal/20" : "border-paper/10 bg-paper/10")}>
                      {[
                        [p.credits.toLocaleString("en-US"), "AI credits / month"],
                        [p.replies, "bot replies / month"],
                        [String(p.bots), "bots"],
                        [String(p.seats), "team seats"],
                      ].map(([v, l]) => (
                        <div key={l} className={cx("px-3.5 py-3", pop ? "bg-ink/90" : "bg-card")}>
                          <p className="font-mono text-[15px] font-bold">{v}</p>
                          <p className="mt-0.5 text-[12px] opacity-60">{l}</p>
                        </div>
                      ))}
                    </div>
                    <Link
                      href="/demo"
                      className={cx(
                        "mt-4 block rounded-full px-[18px] py-3.5 text-center text-[15px] font-semibold text-ink hover:text-ink hover:opacity-88",
                        pop ? "bg-teal" : "bg-paper",
                      )}
                    >
                      Get started
                    </Link>
                    {details && (
                      <div className="mt-[26px] flex flex-col gap-[22px]">
                        {p.groups.map((g) => (
                          <div key={g.label}>
                            <p className="mb-2.5 font-mono text-[10.5px] tracking-[.14em] opacity-55">{g.label}</p>
                            <ul className="flex flex-col gap-[9px]">
                              {g.items.map((it) => (
                                <li key={it.t} className={cx("flex gap-2.5 text-[13.5px] leading-[1.4]", !it.on && "text-paper/40")}>
                                  <span
                                    aria-label={it.on ? "Included" : "Not included"}
                                    className={cx("w-3.5 flex-none font-bold", it.on ? "text-teal" : "text-paper/30")}
                                  >
                                    {it.on ? "✓" : "×"}
                                  </span>
                                  {it.t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                    <button
                      type="button"
                      aria-expanded={details}
                      onClick={() => setDetails((d) => !d)}
                      className="mt-auto border-0 bg-transparent pt-[22px] text-[13px] text-inherit opacity-60"
                    >
                      {details ? "Hide details ↑" : "Show details ↓"}
                    </button>
                  </div>
                </div>
              );
            })}

            <div className="flex flex-col overflow-hidden rounded-3xl border border-peach bg-peach">
              <div className="py-[9px] text-center font-mono text-[10.5px] font-bold tracking-[.14em] text-ink">FOR AGENCIES</div>
              <div className="flex flex-1 flex-col rounded-[22px_22px_23px_23px] bg-[linear-gradient(180deg,#2a2220_0%,var(--color-card)_70%)] px-6 pt-[26px] pb-6 text-paper">
                <p className="font-display text-[22px] font-bold tracking-[-.02em]">Agency pilot</p>
                <p className="mt-1.5 text-[13.5px] leading-[1.45] opacity-65">Resell Suuper to your clients and keep the monthly fee.</p>
                <p className="mt-[18px] font-mono text-[clamp(26px,2.4vw,32px)] font-bold tracking-[-.02em]">Wholesale</p>
                <p className="mt-1 text-[13px] opacity-60">per client, below the plans shown here</p>
                <ul className="mt-5 flex flex-col gap-[9px]">
                  {agencyPilot.map((t) => (
                    <li key={t} className="flex gap-2.5 text-[13.5px] leading-[1.4]">
                      <span className="w-3.5 flex-none font-bold text-peach">✓</span>
                      {t}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/demo?for=agency"
                  className="mt-6 block rounded-full bg-peach px-[18px] py-3.5 text-center text-[15px] font-semibold text-ink hover:text-ink hover:opacity-88"
                >
                  Apply for the pilot
                </Link>
                <Link href="/agencies" className="mt-3 text-center text-[13px] opacity-70">
                  How the agency model works →
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-3">
            <div className="rounded-[22px] border border-paper/10 bg-card px-6 py-[22px]">
              <p className="mb-3.5 font-mono text-[11px] tracking-[.14em] text-paper/50">EVERY PLAN INCLUDES</p>
              <ul className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-x-6 gap-y-2.5">
                {planIncludes.map((t) => (
                  <li key={t} className="flex gap-2.5 text-[14px] leading-[1.45]">
                    <span className="font-bold text-teal">✓</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[22px] border border-paper/10 px-6 py-[22px]">
              <p className="mb-3.5 font-mono text-[11px] tracking-[.14em] text-paper/50">HOW AI CREDITS WORK</p>
              <ul className="flex flex-col gap-2.5 text-[14px] leading-[1.5] text-paper/80">
                {creditNotes.map((t) => (
                  <li key={t} className="flex gap-2.5">
                    <span className="text-teal">◆</span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-center font-mono text-[11px] tracking-[.1em] text-paper/45">
            PRICES IN USD · LONGER PERIODS ARE PAID UPFRONT · AI CREDITS RESET MONTHLY · WHATSAPP CHARGES ARE BILLED SEPARATELY BY META
          </p>
        </div>
      </section>
    </>
  );
}

const contactFields = [
  { label: "NAME", type: "text", ph: "Your name", name: "name", auto: "name" },
  { label: "EMAIL", type: "email", ph: "you@business.pk", name: "email", auto: "email" },
  { label: "BUSINESS OR AGENCY", type: "text", ph: "Your business name", name: "company", auto: "organization" },
  { label: "WHATSAPP NUMBER", type: "tel", ph: "+92 300 0000000", name: "whatsapp", auto: "tel" },
];

const fieldClass =
  "rounded-xl border border-paper/16 bg-ink p-3.5 text-[15px] text-paper outline-none focus:border-teal";
const fieldLabel = "font-mono text-[10.5px] tracking-[.12em] text-paper/55";

export function Contact({ s }: { s: ContactSection }) {
  const [intent, setIntent] = useState(0);
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");

  return (
    <section className="p-4">
      <div className="mx-auto grid max-w-[1240px] grid-cols-[repeat(auto-fit,minmax(320px,1fr))] overflow-hidden rounded-[28px]">
        <div className="px-11 py-14 teal-dots">
          <span className="font-mono text-[11.5px] tracking-[.16em]">TALK TO SUUPER</span>
          <h1 className="mt-4 font-display text-[clamp(36px,4.8vw,64px)] leading-[.94] font-bold tracking-[-.05em]">{s.title}</h1>
          <p className="mt-[18px] text-lg leading-normal">{s.sub}</p>
          <p className="mt-9 mb-3 font-mono text-[11px] tracking-[.14em]">WHAT WE&apos;LL ASK YOU</p>
          <ul className="flex flex-col">
            {s.questions.map((q) => (
              <li key={q} className="flex gap-3 border-b border-ink/16 py-2.5 text-[15px] leading-[1.45]">
                <span className="font-bold">→</span>
                {q}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-panel px-11 py-14">
          {sent ? (
            <div className="flex animate-[pop_.4s_both] flex-col items-start gap-3.5" aria-live="polite">
              <span className="grid size-[52px] place-items-center rounded-[16px_16px_16px_4px] bg-teal text-[22px] font-bold text-ink">
                ✓
              </span>
              <p className="font-display text-[30px] font-bold tracking-[-.03em]">Thanks, we&apos;ve got it.</p>
              <p className="text-[15.5px] leading-[1.55] text-paper/65">
                Bring the one process you&apos;d like to automate first. We&apos;ll show you where AI can take it.
              </p>
              <Link href="/" className="mt-2.5 rounded-full border border-paper/35 px-6 py-3.5 font-semibold">
                Back to home
              </Link>
            </div>
          ) : (
            <form
              className="relative flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                setSending(true);
                setError("");
                submitLead("contact", e.currentTarget, { topic: ["Business", "Agency", "Support"][intent] })
                  .then(() => setSent(true))
                  .catch((err: Error) => setError(err.message))
                  .finally(() => setSending(false));
              }}
            >
              <input {...honeypotProps} />
              <p className="font-display text-[26px] font-bold tracking-[-.02em]">Talk to us</p>
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="What is this about?">
                {["I run a business", "I run an agency", "Support"].map((l, i) => (
                  <Chip key={l} on={i === intent} onClick={() => setIntent(i)}>
                    {l}
                  </Chip>
                ))}
              </div>
              {contactFields.map((f) => (
                <label key={f.name} className="flex flex-col gap-1.5">
                  <span className={fieldLabel}>{f.label}</span>
                  <input type={f.type} name={f.name} autoComplete={f.auto} required={f.name !== "whatsapp"} placeholder={f.ph} className={fieldClass} />
                </label>
              ))}
              <label className="flex flex-col gap-1.5">
                <span className={fieldLabel}>ONE THING YOUR TEAM DOES MANUALLY</span>
                <textarea
                  name="process"
                  rows={4}
                  placeholder="We answer the same delivery questions on WhatsApp all day…"
                  className={cx(fieldClass, "resize-y")}
                />
              </label>
              {error && (
                <p role="alert" className="text-sm text-peach">
                  {error}
                </p>
              )}
              <button type="submit" disabled={sending} className="rounded-full border-0 bg-teal p-4 text-[15.5px] font-semibold text-ink disabled:opacity-60">
                {sending ? "Sending…" : "Send"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
