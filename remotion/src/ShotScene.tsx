import { AbsoluteFill, Img, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { body, C, display } from "./theme";

export type ShotSceneProps = { step: string; caption: string; file: string; path: string };

// Source screenshots are 1054 × 634.
const SHOT_W = 840;
const SHOT_H = Math.round((SHOT_W * 634) / 1054);

export const ShotScene: React.FC<ShotSceneProps> = ({ step, caption, file, path }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  const enter = spring({ frame, fps, config: { damping: 200 } });
  const textIn = spring({ frame: frame - 6, fps, config: { damping: 200 } });
  // Slow push-in over the scene, so the screenshot never feels static.
  const zoom = interpolate(frame, [0, durationInFrames], [1, 1.045], { extrapolateRight: "clamp" });
  return (
    <AbsoluteFill style={{ background: `radial-gradient(900px 500px at 50% 110%, rgba(0,194,168,.18), transparent), ${C.ink}`, alignItems: "center" }}>
      <div style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 20, opacity: textIn, transform: `translateY(${interpolate(textIn, [0, 1], [16, 0])}px)` }}>
        <div style={{ fontFamily: body, fontWeight: 600, fontSize: 26, color: C.ink, background: C.teal, borderRadius: 999, padding: "6px 16px" }}>{step}</div>
        <div style={{ fontFamily: display, fontWeight: 700, fontSize: 52, letterSpacing: -1.5, color: C.paper }}>{caption}</div>
      </div>
      <div
        style={{
          marginTop: 26,
          width: SHOT_W,
          borderRadius: 18,
          overflow: "hidden",
          border: "1px solid rgba(247,246,242,.14)",
          background: C.panel,
          boxShadow: "0 40px 90px rgba(0,0,0,.55)",
          opacity: enter,
          transform: `translateY(${interpolate(enter, [0, 1], [60, 0])}px)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", borderBottom: "1px solid rgba(247,246,242,.1)" }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{ width: 11, height: 11, borderRadius: 99, background: "rgba(247,246,242,.22)" }} />
          ))}
          <div style={{ marginLeft: 10, fontFamily: body, fontSize: 17, color: C.muted, background: "rgba(247,246,242,.06)", borderRadius: 99, padding: "4px 14px" }}>
            app.suuper.cc{path}
          </div>
        </div>
        <div style={{ width: SHOT_W, height: SHOT_H, overflow: "hidden" }}>
          <Img src={staticFile(`screens/${file}.webp`)} style={{ width: SHOT_W, height: SHOT_H, transform: `scale(${zoom})`, transformOrigin: "50% 30%" }} />
        </div>
      </div>
    </AbsoluteFill>
  );
};
