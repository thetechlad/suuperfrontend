"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { appNav, appTitles } from "@/content/dashboard";
import { cx, Logo } from "@/components/ui";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const view = pathname.split("/")[2] || "overview";

  return (
    <div className="flex min-h-screen">
      <aside className="sticky top-0 box-border hidden h-screen flex-[0_0_236px] flex-col gap-0.5 overflow-y-auto border-r border-paper/8 px-3 py-[18px] md:flex">
        <div className="px-2.5 pt-1.5 pb-[18px]">
          <Logo size="sm" />
        </div>
        <nav className="flex flex-col gap-0.5" aria-label="Dashboard">
          {appNav.map((n) => (
            <NavLink key={n.view} item={n} on={n.view === view} />
          ))}
        </nav>
        <div className="mt-auto rounded-[14px] border border-paper/10 p-3.5">
          <p className="font-mono text-[10px] tracking-[.12em] text-paper/50">STARTER · 1,240 / 2,000 REPLIES</p>
          <div
            role="progressbar"
            aria-valuenow={62}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Replies used"
            className="mt-2.5 h-[5px] overflow-hidden rounded-full bg-paper/10"
          >
            <div className="h-full w-[62%] bg-teal" />
          </div>
          <Link
            href="/app/billing"
            className="mt-3 block rounded-full bg-teal p-[9px] text-center text-[13px] font-semibold text-ink hover:text-ink"
          >
            Upgrade plan
          </Link>
        </div>
      </aside>

      <div className="min-w-0 flex-1">
        <div className="sticky top-0 z-10 border-b border-paper/8 bg-ink/92 backdrop-blur-[14px]">
          <div className="flex items-center gap-3.5 px-7 py-3.5">
            <p className="font-display text-[17px] font-semibold">{appTitles[view] ?? "Overview"}</p>
            <span className="hidden rounded-full border border-teal/40 px-2.5 py-1 font-mono text-[10.5px] tracking-[.1em] text-teal sm:inline">
              ● ASSISTANT LIVE
            </span>
            <span className="ml-auto text-[13.5px] text-paper/55">Kurta House</span>
            <span className="grid size-8 place-items-center rounded-full bg-teal text-[13px] font-bold text-ink" aria-label="Hira Ahmed">
              HA
            </span>
          </div>
          <nav className="flex gap-1 overflow-x-auto px-4 pb-2.5 md:hidden" aria-label="Dashboard">
            {appNav.map((n) => (
              <NavLink key={n.view} item={n} on={n.view === view} compact />
            ))}
          </nav>
        </div>
        <main className="max-w-[1240px] p-7">{children}</main>
      </div>
    </div>
  );
}

function NavLink({ item, on, compact }: { item: (typeof appNav)[number]; on: boolean; compact?: boolean }) {
  return (
    <Link
      href={item.view === "overview" ? "/app" : "/app/" + item.view}
      aria-current={on ? "page" : undefined}
      className={cx(
        "flex items-center gap-1.5 rounded-[10px] text-sm font-medium",
        compact ? "flex-none px-3 py-2" : "px-3 py-2.5",
        on ? "bg-teal/14 text-teal" : "text-paper/72",
      )}
    >
      {!compact && <span className="w-[26px] font-mono text-[9.5px] opacity-60">{item.tag}</span>}
      {item.label}
      {item.badge && (
        <span className="ml-auto rounded-full bg-teal px-[7px] py-0.5 font-mono text-[10px] text-ink">{item.badge}</span>
      )}
    </Link>
  );
}
