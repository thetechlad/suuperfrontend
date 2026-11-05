"use client";

import Link from "next/link";
import { useState } from "react";
import { appChecklistDone, type Block } from "@/content/dashboard";
import { checkItems } from "@/content/demo";
import { InboxPanel, MetricGrid } from "@/components/product";
import { CheckBox, cx } from "@/components/ui";

const mono = "font-mono text-[10.5px] tracking-[.14em]";

function Notices() {
  const [approved, setApproved] = useState(false);
  const pill = "rounded-full px-4 py-[9px] text-[13px] font-semibold";
  return (
    <div className="flex flex-wrap gap-3" aria-live="polite">
      {approved ? (
        <div className="min-w-0 flex-[1_1_300px] rounded-[18px] border border-teal/40 bg-teal/8 p-5">
          <p className="font-display text-[17px] font-semibold">Approved.</p>
          <p className="mt-1.5 mb-3.5 text-sm leading-normal opacity-75">
            The refund workflow continued and the customer has been notified.
          </p>
        </div>
      ) : (
        <div className="min-w-0 flex-[1_1_300px] rounded-[18px] bg-peach p-5 text-ink">
          <p className="font-display text-[17px] font-semibold">AI needs your approval.</p>
          <p className="mt-1.5 mb-3.5 text-sm leading-normal opacity-75">
            One workflow is waiting for a human decision: refund PKR 12,000 to Usman A.
          </p>
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setApproved(true)} className={cx(pill, "border-0 bg-ink text-paper")}>
              Approve
            </button>
            <button type="button" onClick={() => setApproved(true)} className={cx(pill, "border border-ink/40 bg-transparent text-ink")}>
              Reject
            </button>
          </div>
        </div>
      )}
      <div className="min-w-0 flex-[1_1_300px] rounded-[18px] border border-paper/12 bg-ink p-5">
        <p className="font-display text-[17px] font-semibold">Knowledge needs attention.</p>
        <p className="mt-1.5 mb-3.5 text-sm leading-normal opacity-75">
          Some questions could not be answered from your current knowledge base.
        </p>
        <Link href="/app/knowledge" className={cx(pill, "inline-block bg-paper text-ink hover:text-ink")}>
          Add knowledge
        </Link>
      </div>
    </div>
  );
}

function BlockView({ b }: { b: Block }) {
  switch (b.type) {
    case "greet":
      return (
        <>
          <h1 className="mt-1 font-display text-[clamp(28px,3.4vw,42px)] font-bold tracking-[-.04em]">{b.title}</h1>
          <p className="mt-2 text-[15px] text-paper/55">{b.sub}</p>
        </>
      );
    case "metrics":
      return <MetricGrid items={b.items} app />;
    case "notices":
      return <Notices />;
    case "checklist": {
      const done = appChecklistDone.filter(Boolean).length;
      return (
        <div className="rounded-[18px] border border-paper/10 bg-ink p-[22px]">
          <p className={cx(mono, "mb-3.5 text-teal")}>
            ACTIVATION CHECKLIST · {done} OF {checkItems.length}
          </p>
          <div className="flex flex-wrap gap-2">
            {checkItems.map((l, i) => (
              <p
                key={l}
                className={cx("flex min-w-0 flex-[1_1_240px] items-center gap-2.5 py-1.5 text-[13.5px]", appChecklistDone[i] ? "text-paper" : "text-paper/50")}
              >
                <CheckBox on={appChecklistDone[i]} size="sm" />
                {l}
              </p>
            ))}
          </div>
        </div>
      );
    }
    case "inbox":
      return <InboxPanel app />;
    case "list":
      return (
        <div className="overflow-hidden rounded-[18px] border border-paper/10 bg-ink">
          <div className="flex items-center justify-between gap-3 border-b border-paper/10 px-5 py-4">
            <p className={cx(mono, "text-paper/50")}>{b.title}</p>
            {b.cta && b.href && (
              <Link href={b.href} className="rounded-full bg-teal px-4 py-[9px] text-[13px] font-semibold text-ink hover:text-ink">
                {b.cta}
              </Link>
            )}
          </div>
          {b.rows.map((r) => (
            <div
              key={r.a}
              className="grid grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1fr)] items-center gap-3 border-b border-paper/6 px-5 py-3.5 text-sm hover:bg-panel"
            >
              <span className="font-medium">{r.a}</span>
              <span className="text-paper/55">{r.b}</span>
              <span className="text-right font-mono text-[11px] text-teal">{r.c}</span>
            </div>
          ))}
        </div>
      );
    case "empty":
      return (
        <div className="rounded-[22px] border border-dashed border-paper/20 bg-[radial-gradient(rgb(247_246_242/.08)_1px,transparent_1px)] bg-size-[20px_20px] px-6 py-16 text-center">
          <span className="inline-grid size-[54px] place-items-center rounded-[16px_16px_16px_4px] bg-teal font-mono text-xs font-bold text-ink">
            {b.tag}
          </span>
          <p className="mt-[18px] font-display text-[26px] font-bold tracking-[-.03em]">{b.title}</p>
          <p className="mx-auto mt-2.5 max-w-[30em] text-[15px] leading-[1.55] text-paper/60">{b.body}</p>
          <Link
            href={b.href}
            className="mt-[22px] inline-block rounded-full bg-teal px-6 py-[13px] text-[14.5px] font-semibold text-ink hover:text-ink"
          >
            {b.cta}
          </Link>
        </div>
      );
    case "templates":
      return (
        <>
          <p className="mt-2 mb-1 font-display text-[22px] font-bold tracking-[-.02em]">Don&apos;t build from zero.</p>
          <p className="mb-4 text-[14.5px] text-paper/55">
            Start with an agent, app or workflow built for the job you need. Customize it with your knowledge, tools and rules.
          </p>
          <div className="flex flex-wrap gap-3">
            {b.items.map((t) => (
              <div key={t.name} className="flex min-w-0 flex-[1_1_240px] flex-col gap-2 rounded-[18px] border border-paper/10 bg-ink p-5 hover:border-teal/50">
                <p className="font-display text-[17px] font-semibold">{t.name}</p>
                <p className="text-[13.5px] leading-normal text-paper/60">{t.outcome}</p>
                <p className="mt-1 font-mono text-[10.5px] text-paper/45">USES: {t.uses}</p>
                <Link href={b.href} className="mt-2 text-[13.5px] font-semibold text-teal">
                  Use template →
                </Link>
              </div>
            ))}
          </div>
        </>
      );
    case "groups":
      return (
        <div className="flex flex-wrap gap-3">
          {b.groups.map((g) => (
            <div key={g.label} className="min-w-0 flex-[1_1_260px] rounded-[18px] border border-paper/10 bg-ink p-5">
              <p className={cx(mono, "mb-2.5 text-teal")}>{g.label}</p>
              {g.items.map((it) => (
                <button
                  key={it}
                  type="button"
                  className="flex w-full items-center justify-between gap-2.5 border-0 border-b border-solid border-paper/6 bg-transparent py-[11px] text-left text-sm text-paper hover:text-teal"
                >
                  <span>{it}</span>
                  <span aria-hidden className="text-paper/35">›</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      );
    case "usage":
      return (
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px overflow-hidden rounded-[18px] border border-paper/10 bg-paper/10">
          <div className="p-6 teal-dots-sm">
            <p className={mono}>CURRENT PLAN</p>
            <p className="mt-2 font-display text-[30px] font-bold">Starter</p>
            <p className="mt-1 font-mono text-sm">PKR 500 / month</p>
            <Link
              href="/pricing"
              className="mt-4 inline-block rounded-full bg-ink px-[18px] py-2.5 text-[13.5px] font-semibold text-paper hover:text-paper"
            >
              Upgrade plan
            </Link>
          </div>
          <div className="bg-ink p-6">
            <p className={cx(mono, "text-paper/50")}>USAGE THIS MONTH</p>
            <p className="mt-2.5 font-mono text-[26px] font-bold">1,240 / 2,000</p>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-paper/10">
              <div className="h-full w-[62%] bg-teal" />
            </div>
            <p className="mt-3 text-[13px] text-paper/55">You&apos;ve used 62% of your included AI usage.</p>
          </div>
        </div>
      );
  }
}

export function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => (
        <div key={i} className="mb-5">
          <BlockView b={b} />
        </div>
      ))}
    </>
  );
}
