"use client";

import Image from "next/image";
import { useState } from "react";
import type { Screen, ScreensSection, ShotSection, VideoSection } from "@/content/types";
import { AccentTitle, CtaLink, cx, NumPill, SectionHeader } from "@/components/ui";
import { type Band, Wrap } from "./static";

/** A product screenshot in a light browser frame, shown whole (never cropped). */
export function BrowserFrame({ screen, priority = false }: { screen: Screen; priority?: boolean }) {
  return (
    <figure className="m-0 overflow-hidden rounded-2xl border border-paper/12 bg-[#101514] shadow-[0_30px_80px_rgba(0,0,0,.45)]">
      <div className="flex items-center gap-2 border-b border-paper/10 px-3.5 py-2.5">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-paper/20" />
          <span className="size-2.5 rounded-full bg-paper/20" />
          <span className="size-2.5 rounded-full bg-paper/20" />
        </span>
        <span className="ml-2 min-w-0 truncate rounded-full bg-paper/6 px-3 py-1 font-mono text-[11px] text-paper/55">
          app.suuper.cc{screen.path}
        </span>
      </div>
      <Image
        src={screen.src}
        alt={screen.alt}
        width={1054}
        height={634}
        priority={priority}
        sizes="(max-width: 900px) 100vw, 900px"
        className="block h-auto w-full"
      />
    </figure>
  );
}

export function ScreenTour({ s, band, num }: { s: ScreensSection; band: Band; num: string }) {
  const [i, setI] = useState(0);
  const cur = s.items[i];
  return (
    <Wrap band={band}>
      <SectionHeader num={num} kicker={s.kicker} title={s.title} sub={s.sub} />
      <div role="tablist" aria-label="Product screens" className="mt-9 flex flex-wrap justify-center gap-1.5">
        {s.items.map((it, n) => (
          <button
            key={it.label}
            type="button"
            role="tab"
            aria-selected={n === i}
            onClick={() => setI(n)}
            className={cx(
              "rounded-full border px-4 py-2 text-sm font-semibold transition-colors",
              n === i ? "border-teal bg-teal text-ink" : "border-paper/18 bg-transparent text-paper/75 hover:border-teal",
            )}
          >
            {it.label}
          </button>
        ))}
      </div>
      <div className="mx-auto mt-7 max-w-[960px]" role="tabpanel" aria-label={cur.label}>
        <BrowserFrame key={cur.src} screen={cur} />
        <p className="mt-4 text-center text-[15px] leading-relaxed text-paper/65">{cur.caption}</p>
      </div>
    </Wrap>
  );
}

export function Shot({ s, band, num }: { s: ShotSection; band: Band; num: string }) {
  return (
    <Wrap band={band}>
      <div className={cx("flex flex-wrap items-center gap-x-12 gap-y-8", s.flip && "flex-row-reverse")}>
        <div className="min-w-0 flex-[1_1_340px]">
          <NumPill num={num}>{s.kicker}</NumPill>
          <h3 className="mt-4 text-balance font-display text-[clamp(28px,3.6vw,46px)] leading-none font-semibold tracking-[-.045em]">
            <AccentTitle title={s.title} />
          </h3>
          {s.body && <p className="mt-[18px] max-w-[32em] text-[16.5px] leading-relaxed text-paper/68">{s.body}</p>}
          {s.points.length > 0 && (
            <ul className="mt-[22px] flex flex-col gap-2.5">
              {s.points.map((p) => (
                <li key={p} className="flex gap-2.5 text-[14.5px] leading-[1.45] text-paper/84">
                  <span className="text-teal">✓</span>
                  {p}
                </li>
              ))}
            </ul>
          )}
          {s.ctas.length > 0 && (
            <div className="mt-[30px] flex flex-wrap gap-3">
              {s.ctas.map((c) => (
                <CtaLink key={c.label} cta={c} />
              ))}
            </div>
          )}
        </div>
        <div className="min-w-0 flex-[1.4_1_480px]">
          <BrowserFrame screen={s.screen} />
          <p className="mt-3 text-center font-mono text-[11px] tracking-[.1em] text-paper/45">{s.screen.caption.toUpperCase()}</p>
        </div>
      </div>
    </Wrap>
  );
}

export function ProductVideo({ s, band, num }: { s: VideoSection; band: Band; num: string }) {
  return (
    <Wrap band={band}>
      <SectionHeader num={num} kicker={s.kicker} title={s.title} sub={s.sub} />
      <figure className="mx-auto mt-9 max-w-[960px]">
        <div className="overflow-hidden rounded-2xl border border-paper/12 bg-black shadow-[0_30px_80px_rgba(0,0,0,.45)]">
          <video
            className="block aspect-video h-auto w-full"
            src={s.src}
            poster={s.poster}
            controls
            playsInline
            muted
            preload="none"
            aria-label={s.title}
          />
        </div>
        <figcaption className="mt-3 text-center font-mono text-[11px] tracking-[.1em] text-paper/45">{s.caption.toUpperCase()}</figcaption>
      </figure>
    </Wrap>
  );
}
