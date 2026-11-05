import Link from "next/link";
import type { Cta, HeroSection } from "@/content/types";
import { Accent, CtaLink, cx, splitTitle, Underline } from "@/components/ui";
import { HeroCanvas } from "./HeroCanvas";

const orbitPos = [
  "top-[14%] left-[4%]",
  "top-[10%] right-[6%]",
  "top-[44%] left-[1%]",
  "top-[40%] right-[2%]",
  "bottom-[16%] left-[6%]",
  "bottom-[12%] right-[8%]",
  "bottom-[4%] left-[30%]",
  "top-[4%] left-[34%]",
];

/** Grid, colour glows and wave lines behind the dark hero panels. `focus` is where the grid fades from. */
export function HeroBackdrop({ focus = "50% 30%", waves = 3, waveHeight = "h-[200px]" }: { focus?: string; waves?: 2 | 3; waveHeight?: string }) {
  return (
    <>
      <div
        aria-hidden
        className="hero-grid absolute inset-0"
        style={{ maskImage: `radial-gradient(ellipse at ${focus}, #000 10%, transparent 70%)` }}
      />
      <div
        aria-hidden
        className="absolute -bottom-[440px] -left-[240px] size-[760px] animate-[float_9s_ease-in-out_infinite] rounded-full bg-[radial-gradient(circle,rgb(0_194_168/.5),rgb(0_194_168/0)_65%)] blur-[30px]"
      />
      <div
        aria-hidden
        className="absolute -top-[280px] -right-[180px] size-[560px] rounded-full bg-[radial-gradient(circle,rgb(127_224_210/.26),rgb(127_224_210/0)_65%)] blur-[30px]"
      />
      <div
        aria-hidden
        className="absolute right-[18%] -bottom-[260px] size-[380px] rounded-full bg-[radial-gradient(circle,rgb(255_217_206/.2),rgb(255_217_206/0)_65%)] blur-[24px]"
      />
      <svg aria-hidden viewBox="0 0 1240 200" preserveAspectRatio="none" className={cx("absolute inset-x-0 bottom-0 w-full opacity-50", waveHeight)}>
        <path d="M0 120 C 200 60, 380 180, 620 110 S 1040 40, 1240 120" fill="none" stroke="#00C2A8" strokeWidth="1" />
        <path d="M0 150 C 240 90, 420 200, 640 140 S 1060 80, 1240 150" fill="none" stroke="#7FE0D2" strokeWidth="1" opacity=".6" />
        {waves === 3 && <path d="M0 175 C 260 130, 460 210, 680 165 S 1080 120, 1240 178" fill="none" stroke="#F7F6F2" strokeWidth="1" opacity=".25" />}
      </svg>
    </>
  );
}

// On the dark hero the first CTA is always teal and the rest are outlined.
const heroCta = (c: Cta, i: number): Cta => ({ ...c, variant: i === 0 ? "primary" : "outline" });

export function Hero({ s }: { s: HeroSection }) {
  const [a, b] = splitTitle(s.title);
  return (
    <section className="p-4">
      <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[28px] border border-paper/8 bg-ink text-paper">
        <HeroBackdrop />
        <HeroCanvas className="opacity-12" />
        {s.orbit?.map((label, i) => (
          <span
            key={label}
            aria-hidden
            className={`absolute hidden animate-float rounded-full border border-paper/14 bg-paper/5 px-3 py-2 font-mono text-[10.5px] tracking-[.12em] text-paper/80 shadow-[0_14px_30px_rgba(14,18,16,.3)] backdrop-blur-[8px] lg:inline ${orbitPos[i % orbitPos.length]}`}
            style={{ animationDelay: `-${i * 0.8}s` }}
          >
            {label}
          </span>
        ))}
        <div className="relative flex flex-col items-center px-6 pt-20 pb-16 text-center">
          {s.pill && (
            <Link
              href={s.pillHref ?? "/"}
              className="mb-7 inline-flex animate-[pop_.6s_both] items-center gap-2.5 rounded-full border border-paper/14 bg-paper/5 py-2 pr-2 pl-4 text-[13px] text-paper"
            >
              {s.pill}
              <span className="grid size-[22px] place-items-center rounded-full bg-teal text-xs text-ink">→</span>
            </Link>
          )}
          <h1 className="m-0 max-w-[12em] animate-[pop_.7s_.1s_both] text-balance font-display text-[clamp(44px,7.4vw,108px)] leading-[.9] font-semibold tracking-[-.05em]">
            {a}
            <Accent className="relative inline-block">
              {b}
              <Underline />
            </Accent>
          </h1>
          <p className="mt-[26px] max-w-[34em] animate-[pop_.7s_.2s_both] text-pretty text-[clamp(17px,1.6vw,20px)] leading-normal text-paper/68">
            {s.body}
          </p>
          {s.body2 && (
            <p className="mt-2.5 max-w-[34em] animate-[pop_.7s_.25s_both] text-base leading-normal text-paper/60">{s.body2}</p>
          )}
          <div className="mt-8 flex animate-[pop_.7s_.3s_both] flex-wrap justify-center gap-3">
            {s.ctas.map((c, i) => (
              <CtaLink key={c.label} cta={heroCta(c, i)} />
            ))}
          </div>
          {s.micro && <p className="mt-[18px] font-mono text-[11.5px] tracking-[.08em] text-paper/50">{s.micro}</p>}
          {s.mock && (
            <div className="mt-14 w-full max-w-[520px] animate-[pop_.8s_.45s_both] rounded-3xl border border-paper/12 bg-ink p-[22px] text-left text-paper shadow-[0_34px_70px_rgba(0,0,0,.5)]">
              <div className="flex items-center gap-2.5 border-b border-paper/12 pb-3.5">
                <span className="size-[9px] animate-[blink_1.6s_infinite] rounded-full bg-teal" />
                <span className="font-mono text-[11px] tracking-[.14em] text-teal">{s.mock.status}</span>
                <span className="ml-auto text-right text-xs text-paper/50">{s.mock.sub}</span>
              </div>
              <div className="mt-4 flex flex-col gap-2.5 text-[14.5px] leading-[1.45]">
                <span className="max-w-[84%] self-end rounded-[16px_16px_5px_16px] bg-paper px-3.5 py-[11px] text-ink">
                  “{s.mock.ask}”
                </span>
                <span className="max-w-[88%] self-start rounded-[16px_16px_16px_5px] bg-teal px-3.5 py-[11px] text-ink">
                  “{s.mock.reply}”
                </span>
              </div>
              <span className="mt-3.5 block font-mono text-[10.5px] tracking-[.1em] text-paper/45">{s.mock.time}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
