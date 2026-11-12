import { AbsoluteFill, interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { body, C, display } from "./theme";

export type TitleCardProps = { kicker: string; title: string; sub?: string };

export const TitleCard: React.FC<TitleCardProps> = ({ kicker, title, sub }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const rise = spring({ frame, fps, config: { damping: 200 } });
  const y = interpolate(rise, [0, 1], [40, 0]);
  return (
    <AbsoluteFill style={{ background: `radial-gradient(1200px 600px at 70% 0%, rgba(0,194,168,.22), transparent), ${C.ink}`, justifyContent: "center", padding: "0 110px" }}>
      <div style={{ transform: `translateY(${y}px)`, opacity: rise }}>
        <div style={{ fontFamily: body, fontWeight: 600, fontSize: 30, letterSpacing: 6, color: C.teal }}>{kicker}</div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 96, lineHeight: 1.02, letterSpacing: -3, color: C.paper, marginTop: 22, maxWidth: 1000 }}>
          {title}
        </div>
        {sub && <div style={{ fontFamily: body, fontSize: 40, lineHeight: 1.3, color: C.muted, marginTop: 28, maxWidth: 980 }}>{sub}</div>}
      </div>
    </AbsoluteFill>
  );
};
