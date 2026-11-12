import { Composition, Folder } from "remotion";
import { apps, bots, overview } from "./videos";
import { Walkthrough, walkthroughFrames } from "./Walkthrough";

const W = 1280;
const H = 720;
const FPS = 30;

export const RemotionRoot: React.FC = () => (
  <Folder name="Suuper">
    <Composition id="suuper-overview" component={Walkthrough} width={W} height={H} fps={FPS} durationInFrames={walkthroughFrames(overview)} defaultProps={{ scenes: overview }} />
    <Composition id="suuper-bots" component={Walkthrough} width={W} height={H} fps={FPS} durationInFrames={walkthroughFrames(bots)} defaultProps={{ scenes: bots }} />
    <Composition id="suuper-apps" component={Walkthrough} width={W} height={H} fps={FPS} durationInFrames={walkthroughFrames(apps)} defaultProps={{ scenes: apps }} />
  </Folder>
);
