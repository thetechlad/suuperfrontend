import { AbsoluteFill, Img, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { body, C, display } from "./theme";

export type EndCardProps = { line: string; cta: string };

export const EndCard: React.FC<EndCardProps> = ({ line, cta }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const s = spring({ frame, fps, config: { damping: 200 } });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(900px 500px at 50% 50%, rgba(0,194,168,.25), transparent), ${C.ink}`, alignItems: "center", justifyContent: "center", textAlign: "center" }}>
      <div style={{ opacity: s, transform: `scale(${0.94 + s * 0.06})` }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 22 }}>
          <Img src={staticFile("suuper.png")} style={{ width: 88, height: 88 }} />
          <div style={{ fontFamily: display, fontWeight: 700, fontSize: 104, letterSpacing: -4, color: C.paper }}>suuper</div>
        </div>
        <div style={{ fontFamily: display, fontWeight: 600, fontSize: 52, color: C.paper, marginTop: 30 }}>{line}</div>
        <div style={{ fontFamily: body, fontWeight: 600, fontSize: 38, color: C.teal, marginTop: 22 }}>{cta}</div>
      </div>
    </AbsoluteFill>
  );
};
