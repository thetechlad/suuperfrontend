import Link from "next/link";
import { footer } from "@/content/site";
import { LogoMark } from "@/components/ui";
import { CurrencyNote } from "./CurrencyNote";

export function Footer() {
  return (
    <footer className="mt-10 border-t border-paper/8">
      <div className="mx-auto grid max-w-[1240px] grid-cols-1 gap-11 px-6 pt-16 pb-10">
        <div className="min-w-0 border-b border-paper/8 pb-9">
          <p className="m-0 flex items-center gap-2.5 font-display text-xl font-bold">
            <LogoMark className="size-[26px]" />
            suuper
          </p>
          <p className="mt-[18px] font-display text-[22px] font-semibold tracking-[-.02em]">Your business, on autopilot.</p>
          <p className="mt-2.5 max-w-[24em] text-sm leading-relaxed text-paper/55">
            Connect everything. Automate anything. Build your AI workforce.
          </p>
          <Link
            href="/signup"
            className="mt-5 inline-block rounded-full bg-teal px-[22px] py-3 text-sm font-semibold text-ink hover:text-ink"
          >
            Start free
          </Link>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-8">
        {footer.map((c) => (
          <div key={c.title}>
            <p className="mb-3.5 font-mono text-[11px] tracking-[.12em] text-paper/40">{c.title}</p>
            <div className="flex flex-col gap-[9px]">
              {c.links.map(([label, href]) => (
                <Link key={label} href={href} className="text-sm text-paper/70 hover:text-teal">
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
        </div>
      </div>
      <div className="mx-auto flex max-w-[1240px] flex-wrap justify-between gap-3 border-t border-paper/8 px-6 pt-[18px] pb-[30px] font-mono text-[11px] tracking-[.08em] text-paper/40">
        <span className="flex flex-wrap items-center gap-[18px]">
          <span>© 2026 SUUPER.CC</span>
          <Link
            href="/status"
            className="inline-flex items-center gap-2 rounded-full border border-teal/35 px-3 py-[5px] text-mint hover:text-mint"
          >
            <span className="size-[7px] animate-pulse-ring rounded-full bg-teal" />
            ALL SYSTEMS OPERATIONAL · 99.98% UPTIME
          </Link>
        </span>
        <span className="flex flex-wrap items-center gap-[18px]">
          <CurrencyNote />
          <label className="inline-flex items-center gap-1.5 rounded-full border border-paper/18 py-1 pr-1.5 pl-3">
            <span aria-hidden>🌐</span>
            <select
              aria-label="Language"
              defaultValue="EN"
              className="cursor-pointer border-0 bg-transparent font-mono text-[11px] tracking-[.08em] text-paper"
            >
              <option value="EN" className="text-ink">EN</option>
              <option value="UR" className="text-ink">اردو</option>
              <option value="AR" className="text-ink">العربية</option>
            </select>
          </label>
        </span>
      </div>
    </footer>
  );
}
