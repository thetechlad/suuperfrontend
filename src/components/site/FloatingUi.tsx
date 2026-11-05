"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { demoQA, HANDOFF_ANSWER } from "@/content/demo";
import { Bubble, TypingDots } from "@/components/ui";
import { useAskThread } from "@/components/useAskThread";

const EXIT_KEY = "suuper-exit-seen";
const COOKIE_KEY = "suuper-cookie";

// Cookie consent lives in localStorage; the server snapshot counts as answered so the banner never flashes in SSR HTML.
const consentListeners = new Set<() => void>();
const subscribeConsent = (cb: () => void) => {
  consentListeners.add(cb);
  return () => consentListeners.delete(cb);
};
const readConsent = () => {
  try {
    return !!localStorage.getItem(COOKIE_KEY);
  } catch {
    return false;
  }
};
const saveConsent = (value: "all" | "essential") => {
  try {
    localStorage.setItem(COOKIE_KEY, value);
  } catch {}
  consentListeners.forEach((cb) => cb());
};

/** Sticky "Start free" pill, cookie banner, mobile CTA bar, the AI chat widget and the exit-intent guide offer. */
export function FloatingUi({ showSticky = true }: { showSticky?: boolean }) {
  const pathname = usePathname();
  const consented = useSyncExternalStore(subscribeConsent, readConsent, () => true);
  const [scrolled, setScrolled] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [exitOpen, setExitOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 900);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let done = false;
    const onLeave = (e: MouseEvent) => {
      if (e.clientY > 0 || done) return;
      done = true;
      let seen = false;
      try {
        seen = sessionStorage.getItem(EXIT_KEY) === "1";
        sessionStorage.setItem(EXIT_KEY, "1");
      } catch {}
      if (!seen) setExitOpen(true);
    };
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => document.documentElement.removeEventListener("mouseleave", onLeave);
  }, []);

  // Cursor spotlight for cards marked data-spot.
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest?.<HTMLElement>("[data-spot]");
      if (!el) return;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", e.clientX - r.left + "px");
      el.style.setProperty("--my", e.clientY - r.top + "px");
    };
    document.addEventListener("mousemove", onMove, { passive: true });
    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      {!consented && (
        <div
          role="dialog"
          aria-label="Cookie preferences"
          className="fixed bottom-4 left-4 z-90 box-border w-[min(380px,calc(100vw-104px))] animate-[pop_.4s_.8s_both] rounded-[20px] bg-paper p-5 text-ink shadow-[0_24px_60px_rgba(0,0,0,.5)]"
        >
          <p className="font-display text-[17px] font-semibold">We use cookies</p>
          <p className="mt-2 text-[13.5px] leading-normal text-ink/70">
            They keep you signed in and help us understand what&apos;s useful. You can change this any time.
          </p>
          <div className="mt-4 flex gap-2">
            <button type="button" onClick={() => saveConsent("all")} className="flex-1 rounded-full border-0 bg-ink p-3 text-sm font-semibold text-paper">
              Accept all
            </button>
            <button
              type="button"
              onClick={() => saveConsent("essential")}
              className="flex-1 rounded-full border border-ink/25 bg-transparent p-3 text-sm font-semibold text-ink"
            >
              Essential only
            </button>
          </div>
        </div>
      )}

      {consented && scrolled && pathname !== "/demo" && (
        <div className="fixed inset-x-2.5 bottom-2.5 z-90 flex animate-pop items-center gap-2 rounded-full border border-paper/14 bg-ink/70 p-2 shadow-[0_20px_50px_rgba(0,0,0,.45)] backdrop-blur-[20px] backdrop-saturate-160 nav:hidden">
          <Link href="/signup" className="flex-1 rounded-full bg-teal px-4 py-3.5 text-center text-[15px] font-semibold text-ink hover:text-ink">
            Start free · no card
          </Link>
          <Link href="/demo" className="flex-none rounded-full border border-paper/25 px-4 py-3.5 text-sm font-semibold text-paper">
            Demo
          </Link>
        </div>
      )}

      {showSticky && consented && scrolled && !widgetOpen && (
        <div className="fixed bottom-4 left-4 z-70 box-border hidden nav:flex max-w-[calc(100vw-104px)] animate-pop items-center gap-3.5 rounded-full border border-teal/45 bg-ink/95 py-[7px] pr-[7px] pl-5 shadow-[0_20px_50px_rgba(0,0,0,.5)] backdrop-blur-[14px]">
          <span className="truncate text-sm">Free plan · live in 60 seconds</span>
          <Link
            href="/signup"
            className="whitespace-nowrap rounded-full bg-teal px-[18px] py-2.5 text-sm font-semibold text-ink hover:text-ink hover:opacity-88"
          >
            Start free
          </Link>
        </div>
      )}

      <div className="fixed right-4 bottom-4 z-75 flex flex-col items-end gap-3">
        {widgetOpen && <ChatWidget />}
        <button
          type="button"
          aria-label={widgetOpen ? "Close chat" : "Chat with Suuper"}
          aria-expanded={widgetOpen}
          onClick={() => setWidgetOpen((o) => !o)}
          className="size-[60px] animate-pulse-ring rounded-[20px_20px_20px_6px] border-0 bg-teal font-mono text-[15px] font-bold text-ink shadow-[0_18px_40px_rgba(0,194,168,.35)]"
        >
          {widgetOpen ? "✕" : "AI"}
        </button>
      </div>

      {exitOpen && <ExitModal onClose={() => setExitOpen(false)} />}
    </>
  );
}

function ChatWidget() {
  const { asked, typing, ask } = useAskThread();
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [asked, typing]);

  return (
    <div className="w-[min(360px,calc(100vw-32px))] animate-pop overflow-hidden rounded-[22px] border border-paper/14 bg-ink shadow-[0_30px_70px_rgba(0,0,0,.6)]">
      <div className="flex items-center gap-3 px-[18px] py-4 [background-size:14px_14px] teal-dots-sm">
        <span className="size-[34px] flex-none rounded-[12px_12px_12px_4px] bg-ink" />
        <span>
          <span className="block font-display text-base font-bold">Suuper Assistant</span>
          <span className="mt-0.5 block font-mono text-[10px] tracking-[.1em]">● ONLINE · REPLIES IN SECONDS</span>
        </span>
      </div>
      <div
        ref={scroller}
        aria-live="polite"
        className="flex max-h-80 min-h-[200px] flex-col gap-2.5 overflow-y-auto p-4 text-sm leading-normal"
      >
        <Bubble kind="aiDark">Hi! I&apos;m Suuper. Ask me what a customer would ask your business.</Bubble>
        {asked.map((i, n) => (
          <AskPair key={n} index={i} pending={typing && n === asked.length - 1} />
        ))}
        {typing && <TypingDots />}
      </div>
      <div className="flex flex-wrap gap-1.5 border-t border-paper/10 px-3.5 pt-3 pb-3.5">
        {demoQA.map(([q], i) => (
          <button
            key={q}
            type="button"
            onClick={() => ask(i)}
            className="rounded-full border border-paper/20 bg-transparent px-3 py-2 text-[12.5px] text-paper hover:border-teal hover:text-teal"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}

export function AskPair({ index, pending }: { index: number; pending: boolean }) {
  const [q, a] = demoQA[index];
  return (
    <>
      <Bubble kind="me">{q}</Bubble>
      {!pending && <Bubble kind={index === HANDOFF_ANSWER ? "aiDark" : "ai"}>{a}</Bubble>}
    </>
  );
}

function ExitModal({ onClose }: { onClose: () => void }) {
  const [sent, setSent] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-100 grid animate-fadein place-items-center bg-ink/72 p-4 backdrop-blur-[6px]"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="exit-title"
        onClick={(e) => e.stopPropagation()}
        className="grid w-full max-w-[780px] animate-pop grid-cols-[repeat(auto-fit,minmax(280px,1fr))] overflow-hidden rounded-[26px] shadow-[0_40px_90px_rgba(0,0,0,.6)]"
      >
        <div className="relative min-h-60">
          <Image
            src="/images/paperwork-to-digital.jpg"
            alt="Business documents becoming digital data"
            fill
            sizes="(max-width: 640px) 100vw, 390px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-3.5 px-[30px] py-[34px] teal-dots-sm">
          <span className="font-mono text-[11px] tracking-[.16em]">FREE GUIDE</span>
          <p id="exit-title" className="m-0 font-display text-[28px] leading-[1.02] font-bold tracking-[-.03em]">
            50 business processes you can automate with AI.
          </p>
          <p className="m-0 text-[15px] leading-normal">Pick your first workflow before you go. Sent to your inbox, free.</p>
          {sent ? (
            <p className="m-0 font-display text-xl font-bold">✓ On its way. Check your inbox.</p>
          ) : (
            <form
              className="flex flex-col gap-2.5"
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
            >
              <input
                type="email"
                required
                aria-label="Email"
                placeholder="you@business.pk"
                className="rounded-xl border-0 bg-paper p-3.5 text-[15px] text-ink outline-none placeholder:text-ink/40"
              />
              <button type="submit" className="rounded-full border-0 bg-ink p-[15px] text-[15px] font-semibold text-paper">
                Send me the guide
              </button>
            </form>
          )}
          <button
            type="button"
            onClick={onClose}
            className="self-start border-0 bg-transparent p-0 text-[13.5px] text-ink underline"
          >
            No thanks
          </button>
        </div>
      </div>
    </div>
  );
}
