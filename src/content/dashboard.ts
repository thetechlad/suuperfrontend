import { metrics, type Metric } from "./demo";

export type ListRow = { a: string; b: string; c: string };
export type Template = { name: string; outcome: string; uses: string };

export type Block =
  | { type: "greet"; title: string; sub: string }
  | { type: "metrics"; items: Metric[] }
  | { type: "notices" }
  | { type: "checklist" }
  | { type: "inbox" }
  | { type: "list"; title: string; cta?: string; href?: string; rows: ListRow[] }
  | { type: "empty"; tag: string; title: string; body: string; cta: string; href: string }
  | { type: "templates"; href: string; items: Template[] }
  | { type: "groups"; groups: { label: string; items: string[] }[] }
  | { type: "usage" };

export const appNav: { view: string; label: string; tag: string; badge?: string }[] = [
  { view: "overview", label: "Overview", tag: "OV" },
  { view: "inbox", label: "Inbox", tag: "IN", badge: "6" },
  { view: "knowledge", label: "Knowledge", tag: "KB" },
  { view: "chat", label: "Chat", tag: "AI" },
  { view: "connectors", label: "Connectors", tag: "MCP" },
  { view: "apps", label: "Apps", tag: "APP" },
  { view: "agents", label: "Agents", tag: "AGT" },
  { view: "workflows", label: "Workflows", tag: "WF" },
  { view: "analytics", label: "Analytics", tag: "ANL" },
  { view: "team", label: "Team", tag: "TM" },
  { view: "settings", label: "Settings", tag: "SET" },
  { view: "billing", label: "Billing", tag: "PKR" },
];

export const appTitles: Record<string, string> = {
  overview: "Overview",
  inbox: "Inbox",
  knowledge: "Knowledge",
  chat: "Chat assistant",
  connectors: "Connectors",
  apps: "Apps",
  agents: "Agents",
  workflows: "Workflows",
  analytics: "Analytics",
  team: "Team",
  settings: "Settings",
  billing: "Billing",
};

const aiBehavior = { label: "AI BEHAVIOR", items: ["Tone", "Response length", "Fallback behavior", "Escalation rules", "Allowed topics", "Business instructions"] };
const channels = { label: "CHANNELS", items: ["Website", "WhatsApp", "Instagram", "Messenger"] };

export const views: Record<string, Block[]> = {
  overview: [
    { type: "greet", title: "Good morning. Here's what your AI did.", sub: "Last 24 hours across website, WhatsApp, Instagram and Messenger." },
    {
      type: "metrics",
      items: [
        { label: "CONVERSATIONS", value: "214", delta: "+12%" },
        { label: "LEADS", value: "38", delta: "+6" },
        { label: "AI RESOLUTIONS", value: "196", delta: "92%" },
        { label: "AGENT RUNS", value: "41", delta: "0 failed" },
        { label: "WORKFLOW RUNS", value: "57", delta: "98% success" },
        { label: "NEEDS ATTENTION", value: "2", delta: "see below" },
      ],
    },
    { type: "notices" },
    { type: "checklist" },
    {
      type: "list", title: "RECENT LEADS", cta: "Open inbox", href: "/app/inbox",
      rows: [
        { a: "Ahmed Traders · wholesale 50 units", b: "Website", c: "SCORE 82" },
        { a: "Sana K. · 2 × green kurta", b: "Instagram", c: "HANDOFF" },
        { a: "Bilal R. · Karachi delivery", b: "WhatsApp", c: "AI ACTIVE" },
      ],
    },
  ],
  inbox: [{ type: "inbox" }],
  knowledge: [
    {
      type: "list", title: "KNOWLEDGE SOURCES · 4", cta: "Add knowledge", href: "/app/knowledge",
      rows: [
        { a: "kurtahouse.pk — 38 pages crawled", b: "Website", c: "INDEXED" },
        { a: "price-list-2026.pdf", b: "PDF", c: "INDEXED" },
        { a: "returns-policy.pdf", b: "PDF", c: "INDEXED" },
        { a: "delivery-zones.csv", b: "Structured data", c: "PROCESSING" },
      ],
    },
    {
      type: "list", title: "QUESTIONS NEEDING NEW KNOWLEDGE",
      rows: [
        { a: "Do you deliver to Gwadar?", b: "Asked 7×", c: "ADD ANSWER" },
        { a: "Do you offer gift wrapping?", b: "Asked 4×", c: "ADD ANSWER" },
      ],
    },
  ],
  chat: [{ type: "groups", groups: [aiBehavior, channels] }],
  connectors: [
    { type: "empty", tag: "MCP", title: "No connectors yet.", body: "Connect a tool and give your AI something new to work with.", cta: "Connect a tool", href: "/connectors" },
    {
      type: "templates", href: "/connectors",
      items: [
        { name: "Slack sales alerts", outcome: "Post every qualified lead to #sales.", uses: "Knowledge · Slack · Sales Agent" },
        { name: "CRM sync", outcome: "Create or update a CRM record for every lead.", uses: "Knowledge · CRM" },
        { name: "Asana follow-ups", outcome: "Create a follow-up task after every handoff.", uses: "Inbox · Asana" },
      ],
    },
  ],
  apps: [
    { type: "empty", tag: "APP", title: "Nothing here yet. Build your first one.", body: "Turn a repeatable process into an AI-powered application.", cta: "Build app", href: "/apps" },
    {
      type: "templates", href: "/apps",
      items: [
        { name: "Lead Qualifier", outcome: "Research and score inbound leads.", uses: "Knowledge · CRM · Sales Agent" },
        { name: "Support Desk", outcome: "Classify, answer and route customer requests.", uses: "Knowledge · Inbox" },
        { name: "Approval Desk", outcome: "Collect evidence and route decisions to the right person.", uses: "Workflows · Slack" },
      ],
    },
  ],
  agents: [
    { type: "empty", tag: "AGT", title: "No agents yet.", body: "Build your first AI worker around a goal your team repeats every week.", cta: "Build an agent", href: "/agents" },
    {
      type: "templates", href: "/agents",
      items: [
        { name: "Sales Agent", outcome: "Research, qualify, prepare outreach and update CRM.", uses: "Knowledge · CRM · Email" },
        { name: "Support Agent", outcome: "Answer, troubleshoot, resolve and escalate.", uses: "Knowledge · Inbox" },
        { name: "Research Agent", outcome: "Gather information, compare findings and produce reports.", uses: "Web · Docs" },
      ],
    },
  ],
  workflows: [
    { type: "empty", tag: "WF", title: "Your AI is ready. It just needs something to work on.", body: "If you can describe the process, you can automate it.", cta: "Create workflow", href: "/workflows" },
    {
      type: "templates", href: "/workflows",
      items: [
        { name: "Sales flow", outcome: "Lead arrives → research → qualify → CRM → outreach.", uses: "Knowledge · CRM · Sales Agent" },
        { name: "Customer onboarding", outcome: "Collect data, verify, create records, send welcome.", uses: "Forms · CRM · Email" },
        { name: "Employee onboarding", outcome: "Documents, accounts, tasks and notifications.", uses: "HR · Slack · Asana" },
      ],
    },
  ],
  analytics: [
    { type: "metrics", items: metrics },
    {
      type: "list", title: "TOP QUESTIONS",
      rows: [
        { a: "Do you deliver to Lahore today?", b: "Delivery", c: "212×" },
        { a: "Is medium in stock?", b: "Stock", c: "148×" },
        { a: "What's your return policy?", b: "Policy", c: "96×" },
        { a: "Do you deliver to Gwadar?", b: "Unanswered", c: "7×" },
      ],
    },
  ],
  team: [
    {
      type: "list", title: "TEAM · 4 SEATS", cta: "Invite team", href: "/app/team",
      rows: [
        { a: "Hira Ahmed", b: "Owner", c: "ACTIVE" },
        { a: "Ali Raza", b: "Admin", c: "ACTIVE" },
        { a: "Ayesha N.", b: "Member", c: "ACTIVE" },
        { a: "Accounts", b: "Viewer", c: "INVITED" },
      ],
    },
    { type: "groups", groups: [{ label: "PERMISSIONS", items: ["Owner", "Admin", "Member", "Viewer", "Agent-specific permissions"] }] },
  ],
  settings: [
    {
      type: "groups",
      groups: [
        { label: "WORKSPACE", items: ["Business profile", "Branding", "Languages", "Timezone", "Default behavior"] },
        aiBehavior,
        channels,
        { label: "SECURITY", items: ["Authentication", "Sessions", "API keys", "Audit logs", "Connected account permissions"] },
      ],
    },
  ],
  billing: [
    { type: "usage" },
    {
      type: "list", title: "ADD-ONS", cta: "Manage add-ons", href: "/pricing",
      rows: [
        { a: "WhatsApp Bot", b: "+PKR 300/mo", c: "ACTIVE" },
        { a: "Instagram DM Bot", b: "+PKR 300/mo", c: "ADD" },
        { a: "Messenger Bot", b: "+PKR 300/mo", c: "ADD" },
      ],
    },
    {
      type: "list", title: "INVOICES",
      rows: [
        { a: "October 2026", b: "PKR 800", c: "PAID" },
        { a: "September 2026", b: "PKR 800", c: "PAID" },
        { a: "August 2026", b: "PKR 500", c: "PAID" },
      ],
    },
  ],
};

export const appChecklistDone = [true, true, true, true, true, false];
