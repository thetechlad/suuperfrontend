import type { Scene } from "./Walkthrough";

// Every caption describes what the screenshot actually shows (demo workspace, sample data).
const end: Scene = { kind: "end", frames: 105, line: "AI employees for modern businesses.", cta: "suuper.cc" };

export const overview: Scene[] = [
  { kind: "title", frames: 90, kicker: "SUUPER", title: "A customer messages at 11 pm.", sub: "Here's what happens next." },
  { kind: "shot", frames: 135, step: "1", caption: "Your assistant answers", file: "widget-preview", path: "/bots/widgets" },
  { kind: "shot", frames: 135, step: "2", caption: "Every chat lands in one inbox", file: "inbox-conversation", path: "/bots/conversations" },
  { kind: "shot", frames: 120, step: "3", caption: "Customers book themselves", file: "booking-page", path: "/apps" },
  { kind: "shot", frames: 105, step: "4", caption: "…and get a reference", file: "booking-confirmed", path: "/apps" },
  { kind: "shot", frames: 120, step: "5", caption: "Bookings fill your calendar", file: "app-calendar", path: "/apps" },
  { kind: "shot", frames: 120, step: "6", caption: "Workflows do the follow-up", file: "workflow-builder", path: "/workflows" },
  { kind: "shot", frames: 120, step: "7", caption: "See how it's all going", file: "analytics", path: "/analytics" },
  end,
];

export const bots: Scene[] = [
  { kind: "title", frames: 90, kicker: "BOTS", title: "Build an AI assistant in minutes.", sub: "No code. Your own knowledge." },
  { kind: "shot", frames: 120, step: "1", caption: "Pick a model and knowledge", file: "bot-new", path: "/bots" },
  { kind: "shot", frames: 120, step: "2", caption: "Add documents and FAQs", file: "knowledge", path: "/knowledge" },
  { kind: "shot", frames: 105, step: "3", caption: "Or index your store", file: "knowledge-store", path: "/knowledge" },
  { kind: "shot", frames: 120, step: "4", caption: "Test what it will read", file: "knowledge-test", path: "/knowledge/documents" },
  { kind: "shot", frames: 120, step: "5", caption: "Put it on your website", file: "widget-branded", path: "/bots/widgets" },
  { kind: "shot", frames: 120, step: "6", caption: "Take over when needed", file: "inbox-list", path: "/bots/conversations" },
  end,
];

export const apps: Scene[] = [
  { kind: "title", frames: 90, kicker: "APPS · AGENTS · WORKFLOWS", title: "The work after the conversation.", sub: "Records, agents and automations in one place." },
  { kind: "shot", frames: 120, step: "1", caption: "Pick a ready-made app", file: "apps-discover", path: "/apps" },
  { kind: "shot", frames: 105, step: "2", caption: "Make it yours", file: "app-install", path: "/apps" },
  { kind: "shot", frames: 105, step: "3", caption: "Work from one calendar", file: "app-calendar", path: "/apps" },
  { kind: "shot", frames: 120, step: "4", caption: "Start an agent from a template", file: "agent-templates", path: "/agents/templates" },
  { kind: "shot", frames: 120, step: "5", caption: "See every step it took", file: "agent-run", path: "/agents/runs" },
  { kind: "shot", frames: 120, step: "6", caption: "Automate the follow-up", file: "workflow-templates", path: "/workflows" },
  { kind: "shot", frames: 105, step: "7", caption: "Connect your tools", file: "integrations", path: "/integrations" },
  end,
];
