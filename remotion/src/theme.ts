import { loadFont as loadDisplay } from "@remotion/google-fonts/SpaceGrotesk";
import { loadFont as loadBody } from "@remotion/google-fonts/Inter";

// Matches suuper.cc: dark ink background, paper text, teal accent.
export const C = { ink: "#0e1210", panel: "#151b19", paper: "#f7f6f2", teal: "#00c2a8", muted: "rgba(247,246,242,.62)" };

export const display = loadDisplay("normal", { weights: ["600", "700"], subsets: ["latin"] }).fontFamily;
export const body = loadBody("normal", { weights: ["400", "600"], subsets: ["latin"] }).fontFamily;
