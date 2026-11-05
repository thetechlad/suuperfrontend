"use client";

import { useState } from "react";
import { chartHeights, convos, insights, type Metric, metrics, panelKeys, stateColors } from "@/content/demo";
import { Bubble, cx } from "@/components/ui";

/** Conversation list, thread and handoff panel. `app` adds the search and reply box used in the dashboard. */
export function InboxPanel({ app = false }: { app?: boolean }) {
  const [sel, setSel] = useState(0);
  const [tookOver, setTookOver] = useState<Record<number, boolean>>({});
  const [replies, setReplies] = useState<Record<number, string[]>>({});
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");

  const convo = convos[sel];
  const list = convos
    .map((c, i) => ({ c, i }))
    .filter(({ c }) => !query || (c.name + " " + c.preview).toLowerCase().includes(query.toLowerCase()));

  const send = () => {
    const text = draft.trim();
    if (!text) return;
    setReplies((r) => ({ ...r, [sel]: [...(r[sel] ?? []), text] }));
    setDraft("");
  };

  return (
    <div
      className={cx(
        "grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))]",
        app ? "gap-px overflow-hidden rounded-[18px] border border-paper/12 bg-paper/10" : "gap-3",
      )}
    >
      <div className={cx("flex flex-col gap-0.5 p-2.5", app ? "bg-ink" : "card")} role="listbox" aria-label="Conversations">
        {app && (
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search conversations"
            aria-label="Search conversations"
            className="mb-2 rounded-[10px] border border-paper/10 bg-panel px-3 py-[11px] text-[13.5px] text-paper outline-none focus:border-teal"
          />
        )}
        {list.map(({ c, i }) => {
          const on = i === sel;
          const state = tookOver[i] ? "HUMAN HANDOFF" : c.state;
          return (
            <button
              key={c.name}
              type="button"
              role="option"
              aria-selected={on}
              onClick={() => setSel(i)}
              className={cx("w-full rounded-xl border-0 p-3.5 text-left", on ? "bg-teal text-ink" : "bg-transparent text-paper")}
            >
              <span className="flex justify-between gap-2 text-sm font-semibold">
                {c.name}
                <span className="font-mono text-[10px] opacity-60">{c.time}</span>
              </span>
              <span className="mt-1 block text-[13px] leading-[1.4] opacity-70">{c.preview}</span>
              <span className="mt-2 flex gap-1.5">
                <span className="rounded-md border border-current px-1.5 py-[3px] font-mono text-[9.5px] tracking-[.08em] opacity-70">
                  {c.channel}
                </span>
                <span
                  className={cx(
                    "rounded-md px-1.5 py-[3px] font-mono text-[9.5px] tracking-[.08em]",
                    on ? "bg-ink text-teal" : cx("bg-paper/8", stateColors[state]),
                  )}
                >
                  {state}
                </span>
              </span>
            </button>
          );
        })}
        {list.length === 0 && <p className="p-3.5 text-[13px] text-paper/50">No conversations match.</p>}
      </div>

      <div className={cx("flex flex-col gap-2.5 p-5 text-sm leading-normal", app ? "bg-ink" : "card")} aria-live="polite">
        {convo.thread.map(([fromCustomer, text], i) => (
          <Bubble key={sel + "-" + i} kind={fromCustomer ? "me" : "ai"}>
            {text}
          </Bubble>
        ))}
        {tookOver[sel] && <p className="self-center p-1.5 font-mono text-[11px] text-paper/50">Ali joined the conversation.</p>}
        {(replies[sel] ?? []).map((text, i) => (
          <Bubble key={"r" + i} kind="aiDark">
            {text}
          </Bubble>
        ))}
        {app && (
          <form
            className="mt-auto flex gap-2 border-t border-paper/8 pt-3.5"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              type="text"
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Reply or add an internal note…"
              aria-label="Reply"
              className="min-w-0 flex-1 rounded-[10px] border border-paper/10 bg-panel px-3 py-[11px] text-[13.5px] text-paper outline-none focus:border-teal"
            />
            <button type="submit" className="rounded-[10px] border-0 bg-teal px-4 font-semibold text-ink">
              Send
            </button>
          </form>
        )}
      </div>

      <div className={cx("flex flex-col gap-3.5 bg-panel", app ? "p-5" : "rounded-[22px] p-[22px]")}>
        <span className="font-mono text-[11px] tracking-[.14em] text-teal">HANDOFF PANEL</span>
        {convo.panel.map((v, i) => (
          <div key={panelKeys[i]}>
            <p className="font-mono text-[10px] tracking-[.12em] text-paper/45">{panelKeys[i]}</p>
            <p className="mt-1 text-sm leading-[1.45]">{v}</p>
          </div>
        ))}
        <button
          type="button"
          disabled={!!tookOver[sel]}
          onClick={() => setTookOver((t) => ({ ...t, [sel]: true }))}
          className="mt-auto rounded-full border-0 bg-teal p-[13px] text-[14.5px] font-semibold text-ink disabled:cursor-default"
        >
          {tookOver[sel] ? "Human handoff complete." : "Take over"}
        </button>
      </div>
    </div>
  );
}

export function MetricGrid({ items, app = false }: { items: Metric[]; app?: boolean }) {
  return (
    <div
      className={cx(
        "flex flex-wrap gap-px",
        app && "overflow-hidden rounded-[18px] border border-paper/10 bg-paper/10",
      )}
    >
      {items.map((m) => (
        <div key={m.label} className={cx("min-w-0", app ? "flex-[1_1_170px] bg-ink p-5" : "card flex-[1_1_180px] p-[22px]")}>
          <p className={cx("font-mono tracking-[.12em] text-paper/50", app ? "text-[10px]" : "text-[10.5px]")}>{m.label}</p>
          <p className={cx("mt-2.5 font-mono font-bold", app ? "text-[26px]" : "text-[28px]")}>{m.value}</p>
          <p className="mt-1.5 font-mono text-[11px] text-teal">{m.delta}</p>
        </div>
      ))}
    </div>
  );
}

export function AnalyticsPanel() {
  const max = Math.max(...chartHeights);
  const [hover, setHover] = useState<number | null>(null);
  return (
    <div className="flex flex-col gap-px overflow-hidden rounded-3xl border border-paper/12 bg-paper/10">
      <MetricGrid items={metrics} />
      <div className="card p-[26px]">
        <p className="mb-[18px] font-mono text-[10.5px] tracking-[.12em] text-paper/50">
          CONVERSATIONS · LAST 14 DAYS
          {hover !== null && <span className="ml-3 text-teal">DAY {hover + 1} · {chartHeights[hover]}</span>}
        </p>
        <div className="flex h-[150px] items-end gap-2" role="img" aria-label="Daily conversations over the last 14 days, rising">
          {chartHeights.map((h, i) => (
            <span
              key={i}
              onMouseEnter={() => setHover(i)}
              onMouseLeave={() => setHover(null)}
              className={cx(
                "flex-1 rounded-[6px_6px_2px_2px] transition-colors",
                i === chartHeights.length - 1 || i === hover ? "bg-teal" : "bg-teal/35",
              )}
              style={{ height: `${(h / max) * 128}px` }}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-px">
        {insights.map((i) => (
          <div key={i.label} className="card min-w-0 flex-[1_1_240px] p-[22px]">
            <p className="font-mono text-[10.5px] tracking-[.12em] text-teal">{i.label}</p>
            <p className="mt-2.5 font-display text-lg font-semibold">{i.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
