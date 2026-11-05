import Image from "next/image";
import Link from "next/link";
import type { ButtonVariant, Cta } from "@/content/types";

export function cx(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function LogoMark({ className = "size-7" }: { className?: string }) {
  return <Image src="/logos/suuper.png" alt="" aria-hidden width={128} height={128} className={cx("inline-block flex-none", className)} />;
}

export function Logo({ size = "md", dark = false }: { size?: "sm" | "md"; dark?: boolean }) {
  return (
    <Link
      href="/"
      className={cx(
        "flex items-center gap-2.5 font-display font-bold tracking-[-.03em]",
        size === "sm" ? "text-[19px]" : "text-xl",
        dark && "text-ink hover:text-ink",
      )}
    >
      <LogoMark className={size === "sm" ? "size-6" : "size-[26px]"} />
      suuper
    </Link>
  );
}

const variants: Record<ButtonVariant, string> = {
  primary: "bg-teal text-ink px-7 py-[15px] hover:text-ink",
  outline: "border border-paper/35 text-paper px-[26px] py-[15px] hover:text-paper",
  dark: "bg-ink text-paper px-[30px] py-4 hover:text-paper",
  outlineDark: "border border-ink/50 text-ink px-7 py-4 hover:text-ink",
};

export function CtaLink({ cta, className }: { cta: Cta; className?: string }) {
  return (
    <Link
      href={cta.href}
      className={cx(
        "inline-block whitespace-nowrap rounded-full text-[15px] font-semibold transition-opacity hover:opacity-85",
        variants[cta.variant],
        className,
      )}
    >
      {cta.label}
    </Link>
  );
}

export function Kicker({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cx("font-mono text-[11.5px] tracking-[.16em] text-teal", className)}>{children}</span>;
}

export function MonoLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cx("m-0 font-mono text-[11px] tracking-[.14em] text-paper/50", className)}>{children}</p>;
}

/** Splits a title so its last words can be set as the accent: the last two words of longer titles, else the last one. */
export function splitTitle(title: string): [string, string] {
  const w = title.split(" ");
  const cut = w.length > 3 ? w.length - 2 : w.length > 1 ? w.length - 1 : 0;
  return [w.slice(0, cut).join(" ") + (cut ? " " : ""), w.slice(cut).join(" ")];
}

const underlinePath = "M4 14 C 50 4, 120 4, 196 10 M30 17 C 80 11, 140 11, 176 15";
const circlePath = "M12 40 C 10 14, 120 4, 178 18 C 205 26, 196 56, 140 62 C 80 68, 18 62, 10 44 C 6 34, 30 22, 60 16";

/** Hand-drawn double underline under an accent. */
export function Underline({ className = "-bottom-[.1em] h-[.2em]", stroke = "var(--color-teal)" }: { className?: string; stroke?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 20" preserveAspectRatio="none" className={cx("pointer-events-none absolute left-0 w-full overflow-visible", className)}>
      <path d={underlinePath} fill="none" stroke={stroke} strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

/** Hand-drawn loop circling a word. */
export function Circled({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative inline-block whitespace-nowrap">
      {children}
      <svg
        aria-hidden
        viewBox="0 0 200 70"
        preserveAspectRatio="none"
        className="pointer-events-none absolute -top-[18%] -left-[8%] h-[136%] w-[116%] overflow-visible"
      >
        <path d={circlePath} fill="none" stroke="var(--color-teal)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </span>
  );
}

/** Italic serif accent for the end of a title. `tone` picks the fill: gradients for dark grounds, deep teal for light ones. */
export function Accent({
  children,
  tone = "gradient",
  className,
}: {
  children: React.ReactNode;
  tone?: "gradient" | "deep" | "solid" | "deepSolid";
  className?: string;
}) {
  return (
    <span
      className={cx(
        "pr-[.08em] font-serif font-normal italic tracking-[-.01em]",
        tone === "gradient" && "text-gradient",
        tone === "deep" && "bg-[linear-gradient(90deg,var(--color-teal-deep),var(--color-teal))] bg-clip-text text-transparent",
        tone === "solid" && "text-teal",
        tone === "deepSolid" && "text-teal-deep",
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A title with its last words set as an italic accent. */
export function AccentTitle({ title, tone }: { title: string; tone?: "gradient" | "deep" | "solid" | "deepSolid" }) {
  const [a, b] = splitTitle(title);
  return (
    <>
      {a}
      <Accent tone={tone}>{b}</Accent>
    </>
  );
}

/** Numbered kicker pill: "(01) THE PLATFORM". */
export function NumPill({ num, children, light = false }: { num?: string; children: React.ReactNode; light?: boolean }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-2 self-start rounded-full border py-1 pr-3 pl-1 font-mono text-[11px] tracking-[.1em]",
        light ? "border-ink/18 text-ink" : "border-paper/16 text-paper",
      )}
    >
      {num && (
        <span className={cx("grid size-[22px] place-items-center rounded-full text-[10px]", light ? "bg-ink text-paper" : "bg-paper text-ink")}>
          {num}
        </span>
      )}
      {children}
    </span>
  );
}

export function SectionTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <h2
      className={cx(
        "mx-auto mt-3.5 max-w-[18em] text-balance font-display text-[clamp(30px,4.4vw,54px)] font-semibold leading-none tracking-[-.045em]",
        className,
      )}
    >
      {children}
    </h2>
  );
}

export function SectionHeader({ num, kicker, title, sub }: { num?: string; kicker: string; title: string; sub?: string }) {
  return (
    <div className="text-center">
      <NumPill num={num}>{kicker}</NumPill>
      <SectionTitle>
        <AccentTitle title={title} />
      </SectionTitle>
      {sub && <p className="mx-auto mt-4 max-w-[36em] text-[16.5px] leading-[1.55] text-paper/60">{sub}</p>}
    </div>
  );
}

/** Larger centred header used by the v3 sections. */
export function BigHeader({ num, kicker, title, sub, light = false }: { num?: string; kicker: string; title: string; sub?: string; light?: boolean }) {
  return (
    <div className="flex flex-col items-center text-center">
      <NumPill num={num} light={light}>{kicker}</NumPill>
      <h2 className="mx-auto mt-5 max-w-[16em] text-balance font-display text-[clamp(32px,4.6vw,58px)] leading-[1.02] font-semibold tracking-[-.045em]">
        <AccentTitle title={title} tone={light ? "deepSolid" : "gradient"} />
      </h2>
      {sub && (
        <p className={cx("mx-auto mt-4 max-w-[36em] text-pretty text-[16.5px] leading-[1.55]", light ? "text-ink/62" : "text-paper/60")}>{sub}</p>
      )}
    </div>
  );
}

/** Rounded container whose children are separated by 1px hairlines. */
export const hairline = "overflow-hidden rounded-3xl border border-paper/10 bg-paper/10 gap-px";

export type BubbleKind = "me" | "ai" | "aiDark";

export function Bubble({ kind, children }: { kind: BubbleKind; children: React.ReactNode }) {
  return (
    <div
      className={cx(
        "animate-pop px-3.5 py-[11px]",
        kind === "me"
          ? "max-w-[82%] self-end rounded-[16px_16px_5px_16px] bg-paper text-ink"
          : "max-w-[88%] self-start rounded-[16px_16px_16px_5px]",
        kind === "ai" && "bg-teal text-ink",
        kind === "aiDark" && "bg-bubble text-paper",
      )}
    >
      {children}
    </div>
  );
}

export function TypingDots() {
  return (
    <div className="flex gap-[5px] self-start rounded-full bg-paper/10 px-3.5 py-2.5" aria-label="Typing">
      {[0, 0.2, 0.4].map((d) => (
        <span key={d} className="size-1.5 animate-blink rounded-full bg-paper" style={{ animationDelay: `${d}s` }} />
      ))}
    </div>
  );
}

export function Chip({ on, onClick, children }: { on: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={on}
      className={cx(
        "rounded-full border px-4 py-[11px] text-sm font-medium",
        on ? "border-teal bg-teal text-ink" : "border-paper/20 bg-transparent text-paper",
      )}
    >
      {children}
    </button>
  );
}

export function CheckBox({ on, size = "md" }: { on: boolean; size?: "sm" | "md" }) {
  return (
    <span
      aria-hidden
      className={cx(
        "grid flex-none place-items-center rounded-md font-bold",
        size === "sm" ? "size-[18px] text-[11px]" : "size-5 text-xs",
        on ? "bg-teal text-ink" : size === "sm" ? "border border-paper/25" : "border border-paper/30",
      )}
    >
      {on ? "✓" : ""}
    </span>
  );
}

export const inputClass =
  "rounded-xl border border-paper/16 bg-panel p-[15px] text-[15px] text-paper outline-none focus:border-teal";

const avatars = ["/images/owner-1.jpg", "/images/owner-2.jpg", "/images/owner-3.jpg"];

/** Three overlapping customer photos. */
export function AvatarStack({ size = 28, ring = "border-ink" }: { size?: number; ring?: string }) {
  return (
    <span className="flex">
      {avatars.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          width={size}
          height={size}
          className={cx("rounded-full border-2 object-cover", ring, i > 0 && "-ml-[9px]")}
          style={{ width: size, height: size }}
        />
      ))}
    </span>
  );
}
