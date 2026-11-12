import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { Fragment } from "react";
import { EndCard, type EndCardProps } from "./EndCard";
import { ShotScene, type ShotSceneProps } from "./ShotScene";
import { TitleCard, type TitleCardProps } from "./TitleCard";

export const FADE = 12;

export type Scene =
  | ({ kind: "title"; frames: number } & TitleCardProps)
  | ({ kind: "shot"; frames: number } & ShotSceneProps)
  | ({ kind: "end"; frames: number } & EndCardProps);

export type WalkthroughProps = { scenes: Scene[] };

/** Total length: every scene, minus the overlap of each fade between scenes. */
export const walkthroughFrames = (scenes: Scene[]) => scenes.reduce((n, s) => n + s.frames, 0) - FADE * (scenes.length - 1);

export const Walkthrough: React.FC<WalkthroughProps> = ({ scenes }) => (
  <TransitionSeries>
    {scenes.map((s, i) => (
      <Fragment key={i}>
        {i > 0 && <TransitionSeries.Transition presentation={fade()} timing={linearTiming({ durationInFrames: FADE })} />}
        <TransitionSeries.Sequence name={s.kind === "shot" ? s.caption : s.kind === "title" ? s.title : "End"} durationInFrames={s.frames}>
          {s.kind === "title" ? <TitleCard {...s} /> : s.kind === "shot" ? <ShotScene {...s} /> : <EndCard {...s} />}
        </TransitionSeries.Sequence>
      </Fragment>
    ))}
  </TransitionSeries>
);
