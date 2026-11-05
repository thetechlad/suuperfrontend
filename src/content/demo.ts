export const demoQA: [string, string][] = [
  ["Do you have the gold kurta in medium?", "Yes, 3 left in medium — PKR 4,500. Want me to hold one?"],
  ["Do you deliver to Karachi?", "Yes — 2 days, PKR 250 flat. Want me to help you place the order?"],
  ["What's your return policy?", "7 days, unworn, with receipt. I can start a return for you."],
  ["Can someone call me?", "HANDING OFF · WHATSAPP — Sharing this chat with Ali from sales. He'll message you in a minute."],
];
/** Index of the demo answer that is a human handoff (rendered in the dark bubble). */
export const HANDOFF_ANSWER = 3;

export type ConvoState = "NEW" | "AI ACTIVE" | "QUALIFIED" | "HUMAN HANDOFF" | "RESOLVED";

export type Convo = {
  name: string;
  channel: string;
  state: ConvoState;
  time: string;
  preview: string;
  /** [fromCustomer, text] */
  thread: [boolean, string][];
  /** Customer, intent, context, AI actions, next step */
  panel: [string, string, string, string, string];
};

export const panelKeys = ["CUSTOMER", "INTENT", "CONTEXT", "AI ACTIONS", "NEXT STEP"];

export const stateColors: Record<ConvoState, string> = {
  NEW: "text-paper",
  "AI ACTIVE": "text-teal",
  QUALIFIED: "text-teal",
  "HUMAN HANDOFF": "text-peach",
  RESOLVED: "text-paper/45",
};

export const convos: Convo[] = [
  {
    name: "Sana K.", channel: "INSTAGRAM", state: "HUMAN HANDOFF", time: "2m", preview: "Price of the green kurta in M?",
    thread: [[true, "Price of the green kurta in M?"], [false, "PKR 3,200. I can hold a medium for you."], [true, "I want 2. Can you deliver to DHA by Friday?"], [false, "Let me get Ali to confirm Friday delivery — one moment."]],
    panel: ["Sana K. · +92 300 •••• 412", "Buy 2 green kurtas, size M", "Asked price, wants 2 units, needs delivery by Friday", "Quoted PKR 3,200 · held 2 × M · captured number", "Confirm Friday delivery to DHA and take payment"],
  },
  {
    name: "Ahmed Traders", channel: "WEBSITE", state: "QUALIFIED", time: "8m", preview: "We need 50 units wholesale.",
    thread: [[true, "We need 50 units wholesale."], [false, "Great — which design and by when?"], [true, "Gold kurta, mixed sizes, by the 20th."], [false, "Noted. Wholesale pricing starts at PKR 3,600. Shall I set a call?"]],
    panel: ["Ahmed Traders · Lahore", "Wholesale order, 50 units", "Gold kurta, mixed sizes, deadline the 20th", "Shared wholesale price · lead scored 82/100", "Call to confirm size split and quote"],
  },
  {
    name: "Bilal R.", channel: "WHATSAPP", state: "AI ACTIVE", time: "14m", preview: "Do you deliver to Karachi?",
    thread: [[true, "Do you deliver to Karachi?"], [false, "Yes — 2 days, PKR 250 flat. Want me to help you place the order?"]],
    panel: ["Bilal R. · WhatsApp", "Delivery question", "Asked about Karachi delivery", "Answered from delivery policy", "No action needed yet"],
  },
  {
    name: "Maryam S.", channel: "MESSENGER", state: "NEW", time: "21m", preview: "Is the offer still live?",
    thread: [[true, "Is the offer still live?"]],
    panel: ["Maryam S. · Messenger", "Offer question", "First message", "AI reply queued", "None"],
  },
  {
    name: "Usman A.", channel: "WEBSITE", state: "RESOLVED", time: "1h", preview: "What's your return policy?",
    thread: [[true, "What's your return policy?"], [false, "7 days, unworn, with receipt."], [true, "Thanks!"]],
    panel: ["Usman A.", "Returns question", "Asked return policy", "Answered from returns-policy.pdf", "Resolved"],
  },
];

export type Metric = { label: string; value: string; delta: string };

export const metrics: Metric[] = [
  { label: "TOTAL CONVERSATIONS", value: "1,482", delta: "+18% vs last week" },
  { label: "AI RESOLUTION", value: "91%", delta: "+4 pts" },
  { label: "HUMAN HANDOFF", value: "6.2%", delta: "92 conversations" },
  { label: "LEAD CAPTURE", value: "24%", delta: "356 leads" },
  { label: "AVG RESPONSE", value: "1.4s", delta: "day and night" },
  { label: "TIME SAVED", value: "61 hrs", delta: "this week" },
];

export const chartHeights = [44, 58, 52, 70, 64, 82, 76, 90, 72, 96, 88, 110, 102, 128];

export const insights = [
  { label: "MOST ASKED", value: "Delivery to Lahore — 212×" },
  { label: "QUESTIONS NEEDING NEW KNOWLEDGE", value: "Gwadar delivery, gift wrapping" },
  { label: "TOP CONVERTING CHANNEL", value: "WhatsApp · 31% to lead" },
  { label: "AI RESOLUTION", value: "1,349 of 1,482" },
  { label: "HUMAN HANDOFFS", value: "92 · avg 3 min to pick up" },
  { label: "TIME SAVED", value: "61 hours of manual replies" },
];

export const builtSteps = [
  { k: "INPUTS", v: "New lead from website form or WhatsApp" },
  { k: "KNOWLEDGE", v: "Ideal customer profile, pricing, past deals" },
  { k: "LOGIC", v: "Research company → score 0–100 → route by score" },
  { k: "TOOLS", v: "Web research · CRM · Email" },
  { k: "HUMAN STEPS", v: "Approve outreach for scores above 80" },
  { k: "OUTPUTS", v: "Lead score, research brief, draft message" },
  { k: "ACTIONS", v: "Update CRM record · alert sales on Slack" },
];

export const checkItems = [
  "Business profile complete",
  "Knowledge source connected",
  "First test completed",
  "Assistant configured",
  "Channel connected",
  "First conversation received",
];

export const addons = [
  { name: "WhatsApp Bot", price: "+PKR 300/mo" },
  { name: "Instagram DM Bot", price: "+PKR 300/mo" },
  { name: "Messenger Bot", price: "+PKR 300/mo" },
  { name: "All three", price: "+PKR 700/mo", featured: true },
];

export const reassure = ["No setup cost.", "Start free.", "Upgrade later.", "Cancel anytime.", "14-day money back."];

export function pkr(n: number) {
  return "PKR " + Math.round(n).toLocaleString("en-US");
}

