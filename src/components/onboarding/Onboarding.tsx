"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { checkItems } from "@/content/demo";
import { Bubble, CheckBox, Chip, cx, inputClass, Logo } from "@/components/ui";

const stepLabels = ["Account", "Business", "Goal", "Knowledge", "Assistant", "Publish"];
const industries = ["Ecommerce", "Clinic", "Real estate", "Restaurant", "Gym / coach", "Agency", "Local services", "Something else"];
const goals = ["Answer website questions", "Capture leads", "Automate a workflow", "Connect my tools", "Build an AI agent", "Build an app"];
const knowledgeSteps = ["ADD SOURCE", "PROCESS", "INDEX", "TEST", "PUBLISH"];
const testQA: [string, string][] = [
  ["Do you deliver to Karachi?", "Yes — 2 days, PKR 250 flat."],
  ["What are your opening hours?", "Online orders 24/7. Store: 11am–9pm, Monday to Saturday."],
  ["Do you have size XL?", "Yes, most designs come in S to XL. Which one are you looking at?"],
];
const assistantOptions = [
  { label: "TONE", key: "tone", opts: ["Friendly", "Professional", "Concise"] },
  { label: "LANGUAGE", key: "lang", opts: ["English", "Urdu", "Roman Urdu", "Match the customer"] },
  { label: "BUSINESS GOAL", key: "goal", opts: ["Answer questions", "Capture leads", "Book appointments", "Take orders"] },
] as const;
type AssistantKey = (typeof assistantOptions)[number]["key"];

const snippet = '<script src="https://suuper.cc/w.js" data-id="kurta-house">';
const label = "font-mono text-[10.5px] tracking-[.12em] text-paper/55";

export function Onboarding({ mode }: { mode: "signup" | "login" }) {
  const router = useRouter();
  const isLogin = mode === "login";
  const [step, setStep] = useState(0);
  const [industry, setIndustry] = useState(0);
  const [picked, setPicked] = useState<number[]>([0]);
  const [kStep, setKStep] = useState(-1);
  const [assistant, setAssistant] = useState<Record<AssistantKey, number>>({ tone: 0, lang: 3, goal: 0 });
  const [tests, setTests] = useState<number[]>([]);
  const [live, setLive] = useState(false);
  const kTimer = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => () => clearInterval(kTimer.current), []);

  const ob = isLogin ? 0 : step;
  const copy: [string, string, string][] = [
    isLogin
      ? ["WELCOME BACK", "Sign in to Suuper.", "Pick up where your AI left off."]
      : ["STEP 1 OF 6", "Start building your AI.", "Create your Suuper workspace. No complicated setup."],
    ["STEP 2 OF 6", "What does your business do?", "Choose an industry or tell us in your own words."],
    ["STEP 3 OF 6", "What do you want Suuper to do first?", "Pick one or more. You can add the rest later."],
    ["STEP 4 OF 6", "Teach Suuper.", "Add your website or upload your first document."],
    ["STEP 5 OF 6", "Let's build your first assistant.", "Choose a name, tone, language and business goal."],
    ["STEP 6 OF 6", "Your AI is ready.", "Test a few questions. When the answers look right, publish."],
  ];
  const [kicker, title, sub] = copy[ob];
  const done = [ob > 1, kStep >= 4, tests.length > 0, ob > 4, live, false];

  const authFields = isLogin
    ? [
        { label: "EMAIL", type: "email", ph: "you@business.pk", auto: "email" },
        { label: "PASSWORD", type: "password", ph: "••••••••", auto: "current-password" },
      ]
    : [
        { label: "NAME", type: "text", ph: "Hira Ahmed", auto: "name" },
        { label: "BUSINESS NAME", type: "text", ph: "Kurta House", auto: "organization" },
        { label: "EMAIL", type: "email", ph: "you@business.pk", auto: "email" },
        { label: "PASSWORD", type: "password", ph: "At least 8 characters", auto: "new-password", min: 8 },
      ];

  const addKnowledge = () => {
    clearInterval(kTimer.current);
    setKStep(0);
    kTimer.current = setInterval(() => {
      setKStep((k) => {
        if (k >= 3) clearInterval(kTimer.current);
        return Math.min(k + 1, 4);
      });
    }, 550);
  };

  const next = () => (ob === 5 ? setLive(true) : setStep((s) => s + 1));

  return (
    <div className="flex min-h-screen flex-wrap">
      <aside className="relative box-border flex max-w-full flex-[0_0_340px] flex-col gap-9 px-10 py-8 teal-dots">
        <Logo dark />
        <ol className="flex flex-col gap-1">
          {stepLabels.map((l, i) => (
            <li
              key={l}
              aria-current={i === ob ? "step" : undefined}
              className={cx(
                "flex items-center gap-3 py-[9px] text-[15px]",
                i === ob ? "font-bold" : "font-medium",
                i <= ob ? "text-ink" : "text-ink/50",
              )}
            >
              <span
                className={cx(
                  "grid size-[26px] place-items-center rounded-full font-mono text-[11px]",
                  i < ob ? "bg-ink text-teal" : i === ob ? "bg-paper text-ink" : "border border-ink/35",
                )}
              >
                {i < ob ? "✓" : i + 1}
              </span>
              {l}
            </li>
          ))}
        </ol>
        <div className="mt-auto rounded-[20px] bg-ink p-[22px] text-paper">
          <p className="mb-3 font-mono text-[10.5px] tracking-[.14em] text-teal">ACTIVATION CHECKLIST</p>
          {checkItems.map((l, i) => (
            <p key={l} className={cx("flex items-center gap-2.5 py-1.5 text-[13.5px]", done[i] ? "text-paper" : "text-paper/50")}>
              <CheckBox on={done[i]} size="sm" />
              {l}
            </p>
          ))}
        </div>
      </aside>

      <main className="flex min-w-0 flex-[1_1_420px] flex-col justify-center px-[clamp(24px,6vw,96px)] py-12">
        <div key={ob} className="w-full max-w-[620px] animate-[pop_.4s_both]">
          <span className="font-mono text-[11px] tracking-[.14em] text-teal">{kicker}</span>
          <h1 className="mt-3.5 font-display text-[clamp(34px,4.6vw,58px)] leading-[.96] font-bold tracking-[-.045em]">{title}</h1>
          <p className="mt-3.5 mb-8 text-[17px] leading-[1.55] text-paper/62">{sub}</p>

          {ob === 0 && (
            <form
              className="flex flex-col gap-3.5"
              onSubmit={(e) => {
                e.preventDefault();
                if (isLogin) router.push("/app");
                else setStep(1);
              }}
            >
              {authFields.map((f) => (
                <label key={f.label} className="flex flex-col gap-1.5">
                  <span className={label}>{f.label}</span>
                  <input
                    type={f.type}
                    placeholder={f.ph}
                    autoComplete={f.auto}
                    minLength={"min" in f ? f.min : undefined}
                    required
                    className={inputClass}
                  />
                </label>
              ))}
              <button type="submit" className="mt-2 rounded-full border-0 bg-teal p-[17px] text-base font-semibold text-ink">
                {isLogin ? "Sign in" : "Create my workspace"}
              </button>
              <p className="mt-1 text-center text-sm text-paper/55">
                {isLogin ? "New to Suuper?" : "Already have an account?"}{" "}
                <Link href={isLogin ? "/signup" : "/login"} className="text-teal">
                  {isLogin ? "Start free" : "Sign in"}
                </Link>
              </p>
            </form>
          )}

          {ob === 1 && (
            <>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Industry">
                {industries.map((l, i) => (
                  <Chip key={l} on={i === industry} onClick={() => setIndustry(i)}>
                    {l}
                  </Chip>
                ))}
              </div>
              <textarea
                rows={3}
                aria-label="Describe your business"
                placeholder="Or tell us in your own words — e.g. we sell handmade kurtas online and deliver across Pakistan."
                className={cx(inputClass, "mt-[18px] box-border w-full resize-y")}
              />
            </>
          )}

          {ob === 2 && (
            <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-2.5" role="group" aria-label="Goals">
              {goals.map((g, i) => {
                const on = picked.includes(i);
                return (
                  <button
                    key={g}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setPicked((p) => (on ? p.filter((x) => x !== i) : [...p, i]))}
                    className={cx(
                      "flex items-center gap-3 rounded-[14px] border p-4 text-left text-[15px] font-medium text-paper",
                      on ? "border-teal bg-teal/12" : "border-paper/12 bg-panel",
                    )}
                  >
                    <CheckBox on={on} />
                    {g}
                  </button>
                );
              })}
            </div>
          )}

          {ob === 3 && (
            <>
              <label className="flex flex-col gap-1.5">
                <span className={label}>WEBSITE URL</span>
                <input type="url" placeholder="https://yourbusiness.pk" className={inputClass} />
              </label>
              <label className="mt-3.5 block cursor-pointer rounded-2xl border border-dashed border-teal/50 bg-teal/5 p-7 text-center">
                <input type="file" multiple accept=".pdf,.docx,.csv,.txt" className="sr-only" onChange={addKnowledge} />
                <span className="block text-[15px] font-semibold">Drop PDFs, price lists or FAQs here</span>
                <span className="mt-2 block font-mono text-[11px] tracking-[.08em] text-paper/50">PDF · DOCX · CSV · TXT</span>
              </label>
              <button
                type="button"
                onClick={addKnowledge}
                className="mt-4 rounded-full border border-paper/30 bg-transparent px-6 py-[13px] text-[15px] font-semibold text-paper"
              >
                Add knowledge
              </button>
              <div className="mt-5 flex flex-wrap gap-2">
                {knowledgeSteps.map((l, i) => (
                  <span
                    key={l}
                    className={cx(
                      "rounded-lg px-[11px] py-2 font-mono text-[11px] tracking-[.08em] transition-all duration-300",
                      i <= kStep ? "bg-teal text-ink" : "border border-paper/15 text-paper/50",
                    )}
                  >
                    {(i <= kStep ? "✓ " : "") + l}
                  </span>
                ))}
              </div>
              {kStep >= 4 && <p className="mt-4 font-mono text-xs tracking-[.1em] text-teal">✓ KNOWLEDGE CONNECTED.</p>}
            </>
          )}

          {ob === 4 && (
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-1.5">
                <span className={label}>ASSISTANT NAME</span>
                <input type="text" placeholder="Ayesha from Kurta House" className={inputClass} />
              </label>
              {assistantOptions.map((g) => (
                <div key={g.key} role="group" aria-label={g.label}>
                  <p className={cx(label, "mb-2")}>{g.label}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {g.opts.map((o, i) => (
                      <Chip key={o} on={assistant[g.key] === i} onClick={() => setAssistant((a) => ({ ...a, [g.key]: i }))}>
                        {o}
                      </Chip>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {ob === 5 && (
            <>
              <div className="rounded-[20px] border border-paper/14 bg-panel p-[18px]">
                <div aria-live="polite" className="flex min-h-[180px] flex-col gap-2.5 text-sm leading-normal">
                  <Bubble kind="aiDark">Hi! I&apos;m your Suuper assistant. Ask me something a customer would.</Bubble>
                  {tests.map((i, n) => (
                    <TestPair key={n} qa={testQA[i]} />
                  ))}
                </div>
                <div className="mt-3.5 flex flex-wrap gap-1.5 border-t border-paper/10 pt-3.5">
                  {testQA.map(([q], i) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setTests((t) => [...t, i].slice(-3))}
                      className="rounded-full border border-paper/20 bg-transparent px-[13px] py-[9px] text-[13px] text-paper hover:border-teal hover:text-teal"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
              {live && (
                <div className="mt-[18px] flex animate-[pop_.4s_both] flex-wrap items-center justify-between gap-3.5 rounded-[18px] bg-teal px-[22px] py-5 text-ink">
                  <div className="min-w-0">
                    <p className="font-display text-[22px] font-bold">You&apos;re live.</p>
                    <p className="mt-1 text-sm">Paste this snippet on your site to start receiving conversations.</p>
                    <SnippetCopy />
                  </div>
                  <Link href="/app" className="rounded-full bg-ink px-6 py-3.5 font-semibold text-paper hover:text-paper">
                    Open my dashboard →
                  </Link>
                </div>
              )}
            </>
          )}

          {ob > 0 && (
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="rounded-full border border-paper/25 bg-transparent px-6 py-[15px] text-[15px] font-semibold text-paper"
              >
                ← Back
              </button>
              <button
                type="button"
                onClick={next}
                disabled={ob === 5 && live}
                className="rounded-full border-0 bg-teal px-7 py-[15px] text-[15px] font-semibold text-ink disabled:cursor-default"
              >
                {ob === 5 ? (live ? "Live ✓" : "Go live") : ob === 3 ? "Continue" : "Next →"}
              </button>
              <Link href="/app" className="ml-auto text-[13.5px] text-paper/50">
                Skip to dashboard
              </Link>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function TestPair({ qa: [q, a] }: { qa: [string, string] }) {
  return (
    <>
      <Bubble kind="me">{q}</Bubble>
      <Bubble kind="ai">{a}</Bubble>
    </>
  );
}

function SnippetCopy() {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      title="Copy snippet"
      onClick={() => {
        navigator.clipboard?.writeText(snippet).then(() => setCopied(true), () => {});
      }}
      className="mt-2.5 block max-w-full truncate rounded-lg border-0 bg-ink px-3 py-2 text-left font-mono text-xs text-teal"
    >
      {copied ? "✓ Copied to clipboard" : snippet}
    </button>
  );
}
