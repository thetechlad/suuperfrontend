"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import {
  industries,
  industryChips,
  industryGroups,
  nav,
  productGroups,
  productImages,
  resourceTiles,
} from "@/content/site";
import type { NavItem } from "@/content/types";
import { cx, Logo } from "@/components/ui";

type Menu = "product" | "industries" | "resources" | null;

/** The product app lives on its own subdomain; the marketing site has no sign-in of its own. */
export const APP_LOGIN = "https://app.suuper.cc/login";

const productPaths = nav.product.map((n) => n.href);
const resourcePaths = ["/resources", ...nav.company.map((n) => n.href)];
const productByHref = new Map<string, NavItem>(nav.product.map((n) => [n.href, n]));
const industryByKey = new Map(industries.map((i) => [i.key, i]));
const groupOf = (groups: { label: string; items: string[] }[], key: string) => groups.find((g) => g.items.includes(key))?.label ?? "";

const tileColor: Record<string, string> = { teal: "text-teal", peach: "text-peach", mint: "text-mint" };

function NavTag({ children }: { children: React.ReactNode }) {
  return (
    <span className="grid size-[34px] flex-none place-items-center rounded-[10px] border border-teal/40 font-mono text-[9.5px] text-teal">
      {children}
    </span>
  );
}

function Caret({ open }: { open: boolean }) {
  return (
    <span aria-hidden className={cx("inline-block text-[11px] opacity-60 transition-transform duration-200", open && "rotate-180")}>
      ▾
    </span>
  );
}

/** Full-width panel hanging from the header. */
function MegaPanel({ children, footer }: { children: React.ReactNode; footer: React.ReactNode }) {
  return (
    <div className="absolute inset-x-0 top-full animate-[pop_.2s_both] px-4 pb-4">
      <div className="mx-auto max-w-[1240px] overflow-hidden rounded-[22px] border border-paper/10 bg-panel shadow-[0_40px_90px_rgba(0,0,0,.6)]">
        {children}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-paper/8 bg-ink px-[26px] py-4 text-sm">{footer}</div>
      </div>
    </div>
  );
}

function ProductMenu() {
  const [hover, setHover] = useState("/chat");
  const feat = productByHref.get(hover)!;
  return (
    <MegaPanel
      footer={
        <>
          <Link href="/#platform" className="font-semibold text-teal">See the whole platform →</Link>
          <div className="flex flex-wrap items-center gap-6">
            <Link href="/security">Security</Link>
            <Link href="/pricing">Pricing</Link>
            <Link href="/signup">Get started</Link>
          </div>
        </>
      }
    >
      <div className="grid grid-cols-[repeat(4,minmax(0,1fr))_minmax(280px,1.35fr)]">
        {productGroups.map((g) => (
          <div key={g.label} className="border-r border-paper/8 px-[26px] py-[30px]">
            <p className="mb-[22px] text-[13.5px] text-paper/55">{g.label}</p>
            <div className="flex flex-col gap-6">
              {g.items.map((href) => {
                const p = productByHref.get(href)!;
                return (
                  <Link key={href} href={href} onMouseEnter={() => setHover(href)} onFocus={() => setHover(href)} className="block">
                    <span
                      className={cx(
                        "block font-display text-[17px] font-semibold tracking-[-.01em]",
                        href === hover ? "text-teal" : "text-paper",
                      )}
                    >
                      {p.label}
                    </span>
                    <span className="mt-1.5 block text-[13.5px] leading-normal text-paper/55">{p.desc}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
        <Link href={hover} className="relative flex min-h-[380px] flex-col justify-end overflow-hidden p-7">
          <span
            role="img"
            aria-label={feat.label}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${productImages[hover]})` }}
          />
          <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(14,18,16,0)_25%,rgba(14,18,16,.95)_88%)]" />
          <span className="relative text-[13px] text-paper/70">{groupOf(productGroups, hover)}</span>
          <span className="relative mt-1.5 font-display text-[26px] font-bold tracking-[-.02em] text-paper">{feat.label}</span>
          <span className="relative mt-1.5 text-[14.5px] leading-normal text-paper/80">{feat.desc}</span>
          <span className="relative mt-4 text-[14.5px] font-semibold text-teal">Explore {feat.label} →</span>
        </Link>
      </div>
    </MegaPanel>
  );
}

function IndustriesMenu() {
  const [hover, setHover] = useState("ecommerce");
  const feat = industryByKey.get(hover)!;
  return (
    <MegaPanel
      footer={
        <>
          <span className="text-paper/50">7 industries · trained on how each one sells</span>
          <Link href="/industries" className="font-semibold text-teal">View all industries →</Link>
        </>
      }
    >
      <div className="grid grid-cols-[minmax(0,2fr)_minmax(300px,1fr)]">
        <div className="grid grid-cols-3 content-start gap-x-[30px] gap-y-7 px-[30px] py-8">
          {industryGroups.map((g) => (
            <div key={g.label}>
              <p className="border-b border-paper/10 pb-3.5 text-[13.5px] text-paper/55">{g.label}</p>
              <div className="mt-3.5 flex flex-col gap-1">
                {g.items.map((key) => {
                  const it = industryByKey.get(key)!;
                  const on = key === hover;
                  return (
                    <Link
                      key={key}
                      href={it.href}
                      onMouseEnter={() => setHover(key)}
                      onFocus={() => setHover(key)}
                      className={cx(
                        "flex items-center justify-between border-l-2 px-3 py-[9px] text-base",
                        on ? "border-teal bg-teal/6 text-paper" : "border-transparent text-paper/82",
                      )}
                    >
                      {it.name}
                      <span aria-hidden className={cx("text-xs text-teal", !on && "opacity-0")}>↗</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col border-l border-paper/8 px-[30px] py-8">
          <span
            role="img"
            aria-label={feat.name}
            className="block h-[150px] w-full rounded-[14px] bg-cover bg-center"
            style={{ backgroundImage: `url(${feat.src})` }}
          />
          <p className="mt-[18px] text-[13px] text-paper/55">{groupOf(industryGroups, hover)}</p>
          <p className="mt-1.5 font-display text-[26px] font-bold tracking-[-.02em]">{feat.name}</p>
          <p className="mt-[18px] border-b border-paper/10 pb-3 font-mono text-[11px] tracking-[.14em] text-paper/60">SUUPER HANDLES</p>
          <div className="mt-3.5 flex flex-wrap gap-2">
            {(industryChips[hover] ?? []).map((ch) => (
              <span key={ch} className="rounded-lg bg-paper/7 px-[11px] py-[7px] text-[13px]">{ch}</span>
            ))}
          </div>
          <Link href={feat.href} className="mt-auto pt-[22px] text-[14.5px] font-semibold text-teal">Explore this industry ↗</Link>
        </div>
      </div>
    </MegaPanel>
  );
}

function ResourcesMenu() {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 animate-[pop_.2s_both] pt-3">
      <div className="w-[380px] rounded-[30px] border border-paper/12 bg-panel p-2.5 shadow-[0_40px_90px_rgba(0,0,0,.6)]">
        <div className="rounded-[22px] bg-ink px-[18px] pt-[22px] pb-[18px]">
          <p className="mb-4 ml-1.5 text-sm text-paper/55">Featured</p>
          <div className="grid grid-cols-3 gap-x-2 gap-y-[18px]">
            {resourceTiles.map((t) => (
              <Link key={t.label} href={t.href} className="group relative flex flex-col items-center gap-2.5">
                <span className="grid size-16 place-items-center rounded-[20px] bg-[#1a211e] transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:bg-[#213029]">
                  <svg
                    aria-hidden
                    width="26"
                    height="26"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={tileColor[t.color]}
                  >
                    <path d={t.icon} />
                  </svg>
                </span>
                {t.isNew && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 rounded-md bg-teal px-[7px] py-[3px] font-mono text-[10px] font-bold tracking-[.08em] text-ink">
                    NEW
                  </span>
                )}
                <span className="text-center text-sm text-paper">{t.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <Link href="/resources" className="block pt-3.5 pb-1.5 text-center text-[15px] font-semibold text-paper hover:text-teal">
          See all resources →
        </Link>
      </div>
    </div>
  );
}

// The theme lives on <html data-theme>, set before paint by the root layout's script.
const themeListeners = new Set<() => void>();
const subscribeTheme = (cb: () => void) => {
  themeListeners.add(cb);
  return () => themeListeners.delete(cb);
};
const readTheme = () => document.documentElement.dataset.theme ?? "dark";

function ThemeToggle() {
  const theme = useSyncExternalStore(subscribeTheme, readTheme, () => "dark");
  const toggle = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("suuper-theme", next);
    } catch {}
    themeListeners.forEach((cb) => cb());
  };
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      className="grid size-[38px] flex-none place-items-center rounded-full border border-paper/18 bg-paper/4 text-paper hover:border-teal"
    >
      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        <path
          d={
            theme === "light"
              ? "M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"
              : "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10z M12 1v2 M12 21v2 M4.2 4.2l1.4 1.4 M18.4 18.4l1.4 1.4 M1 12h2 M21 12h2 M4.2 19.8l1.4-1.4 M18.4 5.6l1.4-1.4"
          }
        />
      </svg>
    </button>
  );
}

function AnnouncementBar() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="relative bg-teal text-[13.5px] text-ink">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-center gap-2.5 px-[52px] py-[9px] text-center">
        <span className="rounded-full bg-ink px-2 py-[3px] font-mono text-[10.5px] tracking-[.12em] text-teal">AGENCY PILOT</span>
        <span className="font-medium">Run a digital agency? Pilot agencies get a free agency workspace and wholesale pricing.</span>
        <Link href="/agencies" className="border-b-[1.5px] border-ink font-bold text-ink hover:text-ink">
          Learn more →
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setOpen(false)}
        aria-label="Dismiss announcement"
        className="absolute top-1/2 right-3 size-7 -translate-y-1/2 rounded-full border-0 bg-ink/12 text-xs text-ink"
      >
        ✕
      </button>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const [menu, setMenu] = useState<Menu>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    if (!menu) return;
    const onDoc = (e: MouseEvent) => {
      if (!navRef.current?.contains(e.target as Node)) setMenu(null);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenu(null);
    document.addEventListener("click", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const navBtn = (on: boolean) =>
    cx(
      "flex items-center gap-1.5 rounded-full border-0 bg-transparent px-3 py-2 text-sm font-medium",
      on ? "text-teal" : "text-paper/78",
    );

  return (
    <>
      <AnnouncementBar />
      <header
        className="sticky top-0 z-80 border-b border-paper/10 bg-ink/58 shadow-[inset_0_-1px_0_rgb(255_255_255/.03)] backdrop-blur-[22px] backdrop-saturate-170"
        onMouseLeave={() => setMenu(null)}
      >
        <div className="mx-auto flex max-w-[1240px] items-center gap-[22px] px-6 py-3">
          <Logo />
          <nav ref={navRef} className="mx-auto hidden items-center gap-1 text-sm font-medium nav:flex">
            <div onMouseEnter={() => setMenu("product")}>
              <button
                type="button"
                aria-expanded={menu === "product"}
                onClick={() => setMenu("product")}
                className={navBtn(productPaths.includes(pathname) || menu === "product")}
              >
                Product <Caret open={menu === "product"} />
              </button>
              {menu === "product" && <ProductMenu />}
            </div>
            <div onMouseEnter={() => setMenu("industries")}>
              <button
                type="button"
                aria-expanded={menu === "industries"}
                onClick={() => setMenu("industries")}
                className={navBtn(pathname.startsWith("/industries") || menu === "industries")}
              >
                Industries <Caret open={menu === "industries"} />
              </button>
              {menu === "industries" && <IndustriesMenu />}
            </div>
            <Link
              href="/agencies"
              onMouseEnter={() => setMenu(null)}
              className={cx("rounded-full px-3 py-2", pathname === "/agencies" ? "text-teal" : "text-paper/78")}
            >
              Agencies
            </Link>
            <Link
              href="/pricing"
              onMouseEnter={() => setMenu(null)}
              className={cx("rounded-full px-3 py-2", pathname === "/pricing" ? "text-teal" : "text-paper/78")}
            >
              Pricing
            </Link>
            <div className="relative" onMouseEnter={() => setMenu("resources")}>
              <button
                type="button"
                aria-expanded={menu === "resources"}
                onClick={() => setMenu("resources")}
                className={navBtn(resourcePaths.some((p) => pathname.startsWith(p)) || menu === "resources")}
              >
                Resources <Caret open={menu === "resources"} />
              </button>
              {menu === "resources" && <ResourcesMenu />}
            </div>
          </nav>
          <span className="flex-1 nav:hidden" />
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <a href={APP_LOGIN} className="hidden text-sm text-paper/75 nav:inline">Sign in</a>
            <Link
              href="/signup"
              className="whitespace-nowrap rounded-full bg-teal px-[18px] py-2.5 text-sm font-semibold text-ink hover:text-ink hover:opacity-88"
            >
              Get started →
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="flex size-[42px] flex-col items-center justify-center gap-[5px] rounded-xl border border-paper/20 bg-transparent nav:hidden"
            >
              <span className="h-0.5 w-[18px] rounded-sm bg-paper" />
              <span className="h-0.5 w-[18px] rounded-sm bg-paper" />
              <span className="ml-1.5 h-0.5 w-3 rounded-sm bg-teal" />
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-95 animate-[fadein_.25s_both] overflow-y-auto bg-ink px-6 pt-4 pb-10"
        >
          <div className="flex items-center justify-between border-b border-paper/10 pb-[18px]">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              className="size-[42px] rounded-xl border border-paper/20 bg-transparent text-lg text-paper"
            >
              ✕
            </button>
          </div>
          <p className="mt-6 mb-2 font-mono text-[11px] tracking-[.14em] text-paper/45">PRODUCT</p>
          <div className="flex flex-wrap gap-0.5">
            {nav.product.map((n) => (
              <Link key={n.href} href={n.href} className="flex min-w-0 flex-[1_1_240px] items-center gap-3 border-b border-paper/6 px-1 py-3">
                <NavTag>{n.tag}</NavTag>
                <span className="font-display text-lg font-semibold text-paper">{n.label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-[18px] flex flex-col">
            {[["Agencies", "/agencies"], ["Industries", "/industries"], ["Pricing", "/pricing"], ["Resources", "/resources"]].map(([l, h]) => (
              <Link key={h} href={h} className="border-b border-paper/6 px-1 py-3 font-display text-2xl font-semibold">
                {l}
              </Link>
            ))}
          </div>
          <p className="mt-6 mb-2 font-mono text-[11px] tracking-[.14em] text-paper/45">COMPANY</p>
          <div className="flex flex-wrap gap-2">
            {nav.company.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-full border border-paper/18 px-4 py-2.5 text-[14.5px]">
                {n.label}
              </Link>
            ))}
          </div>
          <div className="mt-[30px] flex flex-col gap-2.5">
            <Link href="/signup" className="rounded-full bg-teal p-4 text-center text-base font-semibold text-ink hover:text-ink">
              Get started
            </Link>
            <a href={APP_LOGIN} className="rounded-full border border-paper/30 p-4 text-center text-base font-semibold">
              Sign in
            </a>
          </div>
        </div>
      )}
    </>
  );
}
