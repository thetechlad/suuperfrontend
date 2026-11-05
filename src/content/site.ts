// Suuper site content.
//
// Accuracy rule: product claims here must match what is built and live (Suuper Business Pitch,
// Oct 26 2026, "Built and live"). Anything on the roadmap is labelled as such. No customer
// results, ratings, testimonials or usage numbers until they are real and verifiable.
import type { Article, ButtonVariant, Card, Cta, CtaSection, FooterColumn, Industry, MegaGroup, Mock, NavItem, Plan, ResourceTile, Section } from "./types";

const img = (name: string) => `/images/${name}.jpg`;
const btn = (label: string, href: string, variant: ButtonVariant): Cta => ({ label, href, variant });
const card = (tag: string, title: string, body: string, href = "", cta = ""): Card => ({ tag, title, body, href, cta });
const orbit = (labels: string[]) => labels;
const steps = (labels: string[]) => labels;
const mock = (label: string, ask: string, reply: string): Mock => ({ label, ask, reply });

/** Where people start: a demo for businesses, the pilot application for agencies (both on /demo). */
const DEMO = "/demo";
const AGENCY_APPLY = "/demo?for=agency";

// ---------- Industries ----------

const indRoute: Record<string, string> = { clinics: "clinics", ecommerce: "ecommerce", restaurants: "restaurants", realestate: "realestate", gyms: "gyms", local: "local" };

export const industries: Industry[] = [
  { key: "clinics", name: "Clinics & doctors", src: img("clinic-reception"), benefit: "Fees, timings and appointments.", q: "Any slot tomorrow?" },
  { key: "ecommerce", name: "Online shops", src: img("warehouse-packing"), benefit: "Products, COD orders and order status.", q: "Is medium in stock?" },
  { key: "restaurants", name: "Restaurants & cafes", src: img("bistro-reservations"), benefit: "Menus, reservations and delivery.", q: "Table for 6 tonight?" },
  { key: "realestate", name: "Real estate", src: img("apartment-viewing"), benefit: "Budget, area and viewing requests.", q: "3-bed in DHA?" },
  { key: "gyms", name: "Gyms & coaches", src: img("gym-floor"), benefit: "Packages, schedules and trials.", q: "Monthly fee?" },
  { key: "local", name: "Service businesses", src: img("hvac-technician"), benefit: "Job details, complaints and tickets.", q: "AC repair in Gulberg?" },
].map((i) => ({ ...i, href: "/industries/" + indRoute[i.key] }));

// ---------- FAQs ----------

export const faqs: [string, string][] = [
  ["What is Suuper?", "Suuper gives a business an AI employee. It answers customers on WhatsApp, Telegram and your website, records leads, bookings and complaints in simple business apps, and hands the conversation to your team when it matters."],
  ["Is Suuper just a chatbot?", "No. The bot is one part. Every conversation lands in a shared inbox, leads and bookings are saved in business apps, and AI agents and workflows handle the follow-up, such as updating your CRM or emailing your team."],
  ["Which channels does it work on?", "WhatsApp (through Meta's official WhatsApp Cloud API), Telegram and a chat bubble on your website. Instagram and Facebook Messenger are on our roadmap and are not available yet."],
  ["How do I connect WhatsApp?", "Today, a WhatsApp number is connected through Meta's WhatsApp Cloud API, which takes some setup in Meta's tools. We do this with you during onboarding. Two-click setup through Meta's Embedded Signup is next on our roadmap."],
  ["Can I train it on my own information?", "Yes. Upload PDFs and documents, add FAQs, paste text, or point it at your website or online store so it can recommend products. You can test it in the Playground before it talks to customers."],
  ["What happens when the bot doesn't know an answer?", "It says so politely instead of guessing. The inbox shows the questions it couldn't answer, and your team can take over any WhatsApp or Telegram chat and reply themselves."],
  ["Which AI models can I use?", "Claude, GPT, Gemini or a free local model. Use the AI credits included in your plan, or bring your own API key."],
  ["What are AI credits?", "One credit is one cent ($0.01) of AI model cost. Bigger models use more credits per reply. Free local models and your own AI keys use no credits. Each plan's credits cap its AI spend, so AI costs stay predictable."],
  ["Does it understand Urdu and Roman Urdu?", "The AI models Suuper uses can read and reply in Urdu and Roman Urdu. Dedicated Urdu and Roman Urdu tuning and ready-made templates are on our roadmap."],
  ["I run an agency. Can I resell Suuper?", "Yes. Join the agency pilot: a free agency workspace during the pilot, wholesale pricing, and hands-on help setting up your first three clients. One agency login for all clients and your own branding are being built now."],
  ["Do WhatsApp messages cost extra?", "Meta charges for some WhatsApp business conversations. Those charges are set and billed by Meta, separately from your Suuper plan."],
  ["How do I get started?", "Book a demo. During launch we set up every new business and agency personally, so your first assistant is configured with you on a call."],
];

// ---------- Shared pieces ----------

const finalCta: CtaSection = {
  type: "cta",
  title: "Your customers message at midnight. Suuper answers.",
  body: "See Suuper on your own WhatsApp, price list and FAQs. Agencies: ask about the pilot.",
  ctas: [btn("Book a demo", DEMO, "dark"), btn("I run an agency", "/agencies", "outlineDark")],
};
const cta = (title: string, body: string, ctas: Cta[] = finalCta.ctas): CtaSection => ({ ...finalCta, title, body, ctas });

export const nav: { product: NavItem[]; company: NavItem[] } = {
  product: [
    { label: "AI assistant", href: "/chat", desc: "Answers on WhatsApp, Telegram and your website.", tag: "AI" },
    { label: "Inbox", href: "/inbox", desc: "Every chat in one place, with human takeover.", tag: "INB" },
    { label: "Knowledge", href: "/knowledge", desc: "What your assistant knows.", tag: "KB" },
    { label: "Business apps", href: "/apps", desc: "Leads, bookings, tickets and more.", tag: "APP" },
    { label: "Agents", href: "/agents", desc: "AI helpers that do multi-step work.", tag: "AGT" },
    { label: "Workflows", href: "/workflows", desc: "When this happens, do that.", tag: "WF" },
    { label: "Integrations", href: "/connectors", desc: "Slack, email, Shopify, HubSpot, Google.", tag: "INT" },
  ],
  company: [
    { label: "For agencies", href: "/agencies", desc: "Resell Suuper. Join the agency pilot.", tag: "AGY" },
    { label: "About", href: "/about", desc: "Why we're building Suuper.", tag: "ABT" },
    { label: "Security", href: "/security", desc: "Roles, audit log and your data.", tag: "SEC" },
    { label: "Contact", href: "/contact", desc: "Talk to the team.", tag: "HI" },
  ],
};

// ---------- Pages ----------

export const pages: Record<string, Section[]> = {
  home: [
    {
      type: "ohero", id: "top", badge: "WhatsApp-first AI for businesses and agencies",
      title: "Your business has customers. ", accent: "Give them an AI employee.",
      body: "Suuper answers every customer on WhatsApp, Telegram and your website in seconds, books appointments, captures every lead, and hands over to your team when it matters.",
      links: [btn("BOOK A DEMO", DEMO, "primary"), btn("FOR AGENCIES", "/agencies", "outline")],
      ctas: [btn("Book a demo", DEMO, "primary"), btn("I run an agency", "/agencies", "outline")],
      tagline: "AI EMPLOYEES\nFOR MODERN BUSINESSES",
      phone: {
        name: "Sample clinic", status: "AI assistant", channel: "WHATSAPP", time: "11:04 PM",
        lines: [
          { me: true, text: "How much is a check-up, and can I come tomorrow?" },
          { me: false, text: "A check-up is PKR 2,500. Tomorrow we have 10:00 am, 12:30 pm and 4:00 pm. Which suits you?" },
          { me: true, text: "10 am please. Sara" },
          { me: false, check: "✓ Booked", text: "Done, Sara: check-up tomorrow at 10:00 am. We'll send a reminder in the morning." },
        ],
      },
      channels: [{ label: "WHATSAPP", icon: "whatsapp" }, { label: "TELEGRAM", icon: "telegram" }, { label: "WEBSITE CHAT", icon: "web" }],
    },
    {
      type: "cards", id: "paths", kicker: "TWO WAYS TO USE SUUPER", title: "Built for businesses. Made to resell.",
      items: [
        card("BUSINESSES", "Put an AI employee on your WhatsApp.", "It answers customers in seconds, day and night, records every lead, booking and complaint, and passes the chat to you when a person is needed.", DEMO, "Book a demo"),
        card("AGENCIES", "Launch your own AI services business.", "Set up WhatsApp AI assistants and business apps for your clients and keep the monthly recurring revenue. Pilot agencies get a free agency workspace.", "/agencies", "See the agency pilot"),
      ], min: 320,
    },
    {
      type: "flow", id: "how", kicker: "HOW IT WORKS", title: "One message. Three outcomes.",
      sub: "Every customer message is answered, recorded where your team can act on it, or handed over to a person.",
      steps: steps(["Customer messages", "Bot reads your knowledge", "Answers in seconds", "Saves it in an app", "Hands over to your team"]),
      detail: [
        { n: "01", t: "11 pm, a question", b: "Sara messages a clinic on WhatsApp: how much is a check-up, and can she come tomorrow?" },
        { n: "02", t: "An answer from your own information", b: "The bot replies with the fee and open slots, taken from the clinic's own price list and timings." },
        { n: "03", t: "A booking, recorded", b: "Sara picks 10 am. The bot books it in the clinic's Appointments app and confirms on WhatsApp." },
        { n: "04", t: "The follow-up, automated", b: "A workflow emails the receptionist, and Sara gets a reminder the next morning. Anything the bot can't answer, the receptionist takes over from the inbox." },
      ],
      note: "AN EXAMPLE OF HOW A SUUPER SETUP WORKS · SAMPLE BUSINESS",
    },
    {
      type: "chdemo", id: "live", kicker: "CHANNELS", title: "One assistant. Every channel your customers use.",
      sub: "The same knowledge answers on WhatsApp, Telegram and your website. A scripted example for a sample store:",
      channels: [
        { key: "whatsapp", label: "WhatsApp", who: "Customer · +92 300 ••• 412", stat: "SAMPLE", action: "LEAD SAVED IN THE LEADS APP",
          msgs: [{ ai: false, text: "Assalam o alaikum, Karachi delivery kitne din mein?" }, { ai: true, text: "Walaikum assalam! Karachi mein 2 din, PKR 250 flat." }, { ai: false, text: "Theek hai, 2 pieces chahiye" }, { ai: true, text: "Zaroor. Sizes bata dein, main order tayyar kar deta hoon." }] },
        { key: "web", label: "Website chat", who: "Visitor on your store", stat: "SAMPLE", action: "CASH-ON-DELIVERY ORDER CAPTURED · TEAM NOTIFIED",
          msgs: [{ ai: false, text: "Do you have the green kurta in medium?" }, { ai: true, text: "Yes, it's in stock in medium. It's PKR 4,500 and ships to Lahore in 2 days." }, { ai: false, text: "Can I pay cash on delivery?" }, { ai: true, text: "Yes, COD is available. Shall I take your order details?" }] },
        { key: "telegram", label: "Telegram", who: "Customer via your Telegram bot", stat: "SAMPLE", action: "HANDED TO THE TEAM IN THE INBOX",
          msgs: [{ ai: false, text: "I want to return an order" }, { ai: true, text: "Sorry about that. Can you share your order number?" }, { ai: false, text: "#1987" }, { ai: true, text: "Thanks. I've passed this to our team with your order number, and they'll reply here shortly." }] },
      ],
    },
    {
      type: "bento", id: "platform", kicker: "THE PLATFORM", title: "Conversations that turn into ", accent: "business actions.",
      sub: "One dashboard to answer customers and run the work that follows.",
      items: [
        { title: "Bots", body: "Your AI assistant: a name, instructions and your business information. Test it in the Playground first.", href: "/chat", tone: "paper", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
        { title: "Inbox", body: "Every chat in one place. See where the bot couldn't answer and take over any chat.", href: "/inbox", tone: "dark", icon: "M22 12h-6l-2 3h-4l-2-3H2 M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z" },
        { title: "Knowledge", body: "PDFs, FAQs, pasted text, your website or your online store.", href: "/knowledge", tone: "teal", icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" },
        { title: "Business apps", body: "Leads & CRM, tickets, appointments and expenses, each with records, a dashboard and public forms.", href: "/apps", tone: "peach", icon: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z" },
        { photo: img("clinic-reception"), ask: "“Any slot tomorrow?”", answer: "Booked in Appointments" },
        { title: "Agents", body: "AI helpers that look up an order, update the CRM or write a follow-up, on demand or on a schedule.", href: "/agents", tone: "teal", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0" },
        { title: "Workflows", body: "When this happens, do that: a new lead sends a Slack message and an email.", href: "/workflows", tone: "dark", icon: "M5 6h4v4H5z M15 14h4v4h-4z M9 8h3a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2" },
        { title: "Integrations", body: "Slack, email, Shopify, HubSpot and Google, so bots and agents can act in them.", href: "/connectors", tone: "dark", icon: "M9 7H6a5 5 0 0 0 0 10h3 M15 7h3a5 5 0 0 1 0 10h-3 M8 12h8" },
        { title: "Any AI model", body: "Claude, GPT, Gemini or a free local model. Use Suuper's credits or your own key.", href: "/pricing", tone: "paper", icon: "M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z" },
      ],
    },
    {
      type: "wfanim", id: "builder", kicker: "WORKFLOWS", title: "When this happens, do that.",
      sub: "Workflows run the follow-up for you, every time, using the apps and tools you connect.",
      prompt: "When a booking is made on WhatsApp, email the receptionist and send the customer a reminder the next morning.",
      nodes: [
        { tag: "TRIGGER", t: "New WhatsApp message", meta: "Customer asks for a slot", icon: "whatsapp" },
        { tag: "AI STEP", t: "Answer from knowledge", meta: "Fees and open slots", icon: "" },
        { tag: "APP", t: "Create appointment", meta: "Appointments app", icon: "" },
        { tag: "NOTIFY", t: "Email the receptionist", meta: "Email", icon: "gmail" },
        { tag: "FOLLOW-UP", t: "Morning reminder", meta: "WhatsApp", icon: "whatsapp" },
      ],
      log: ["23:04:12  TRIGGER   WhatsApp message from Sara", "23:04:13  AI        Answered fee + 3 open slots", "23:04:41  APP       Appointment created · 10:00", "23:04:41  EMAIL     Receptionist notified", "08:00:00  WHATSAPP  Reminder sent"],
    },
    {
      type: "slider", id: "before-after", kicker: "BEFORE / AFTER", title: "Same messages. Very different night.", sub: "Drag the handle to see 11 pm with and without an assistant. Sample conversations.",
      rows: [
        { n: "Ali R.", ch: "WhatsApp", m: "Karachi delivery kitne din?", t: "11:09 PM", r: "2 din, PKR 250 flat. Order kar doon?" },
        { n: "Mehwish", ch: "Website", m: "Is medium in stock?", t: "11:15 PM", r: "Yes, medium is in stock. Want to order?" },
        { n: "Usman A.", ch: "WhatsApp", m: "Need 50 pieces for an event", t: "11:31 PM", r: "Saved as a wholesale lead. The team will call you." },
        { n: "Hamza", ch: "Telegram", m: "COD available?", t: "11:48 PM", r: "Yes, cash on delivery is available." },
      ],
      before: "4 UNREAD · REPLIES TOMORROW", after: "4 ANSWERED · 1 LEAD SAVED",
    },
    {
      type: "split", id: "agencies", kicker: "FOR AGENCIES", title: "Your clients need AI. Build a recurring service around it.",
      body: "Digital agencies already serve small businesses with ads and social media. With Suuper, you set up a WhatsApp AI assistant and business apps for each client and charge a monthly fee. You pay Suuper a wholesale price per client and keep the difference.",
      points: ["Free agency workspace during the pilot", "Wholesale pricing for pilot agencies", "Hands-on help with your first three clients", "Agency branding and client workspaces: being built now"],
      ctas: [btn("See the agency pilot", "/agencies", "primary"), btn("Apply now", AGENCY_APPLY, "outline")],
      photo: img("creative-studio"), mock: mock("AGENCY PILOT", "Can I set this up for my clients?", "Yes. Apply and we'll set up your first three clients with you."),
    },
    {
      type: "split", flip: true, id: "models", kicker: "ANY AI MODEL", title: "Choose the AI. Keep the cost capped.",
      body: "Pick Claude, GPT, Gemini or a free local model for each bot. Use the AI credits included in your plan, or bring your own API key. Credits cap each plan's AI spend, so a busy month doesn't turn into a surprise AI bill.",
      points: ["1 AI credit = $0.01 of AI model cost", "Free local models use no credits", "Your own API keys use no credits"],
      ctas: [btn("See plans", "/pricing", "primary")],
      photo: img("coding-workspace"), mock: mock("AI MODEL", "Which model answers my customers?", "Your choice: Claude, GPT, Gemini or a local model."),
    },
    { type: "roi", title: "Count what silence costs you.", sub: "Move the sliders to estimate how much revenue unanswered messages could be costing you. An estimate, not a promise.", cta: "Book a demo" },
    { type: "industries", title: "Built for businesses that live on WhatsApp.", sub: "Clinics, shops, restaurants, real estate, salons, schools and service businesses.", note: "DON'T SEE YOUR BUSINESS? SUUPER LEARNS FROM THE INFORMATION YOU GIVE IT." },
    {
      type: "table", id: "compare", kicker: "WHY SUUPER", title: "Most tools do one part. Suuper puts them together.",
      head: ["TOOL TYPE", "WHERE IT FALLS SHORT FOR WHATSAPP-FIRST BUSINESSES"],
      rows: [
        ["AI website chatbots", "Website-first, with no business apps behind the chat."],
        ["WhatsApp inbox tools", "Mostly broadcast and inbox; AI and business records are add-ons."],
        ["Automation tools", "No customer chat and no bot, and they need technical setup."],
        ["Agency platforms", "Built around US marketing (CRM, funnels, email, SMS) and expensive for small businesses in our markets."],
        ["Suuper", "WhatsApp-first AI, business apps, agents and workflows in one platform, made for agencies to resell."],
      ],
    },
    { type: "faq", title: "Frequently asked questions.", items: faqs.slice(0, 8) },
    finalCta,
  ],

  agencies: [
    {
      type: "hero", pill: "Agency pilot · applications open", pillHref: AGENCY_APPLY,
      title: "Launch your own AI services business.",
      body: "Sell WhatsApp AI assistants and business apps to your clients, and keep the monthly recurring revenue. You pay Suuper a wholesale price per client and set your own retail price.",
      ctas: [btn("Apply for the pilot", AGENCY_APPLY, "dark"), btn("See plans", "/pricing", "outlineDark")],
      micro: "FREE AGENCY WORKSPACE DURING THE PILOT",
      mock: { status: "CLIENT ASSISTANT", sub: "Set up by your agency for a client clinic", ask: "Any slot tomorrow?", reply: "10:00 am or 4:00 pm. Shall I book one?", time: "BOOKED IN APPOINTMENTS" },
      orbit: orbit(["CLINICS", "SHOPS", "RESTAURANTS", "REAL ESTATE", "SALONS", "SCHOOLS"]),
    },
    {
      type: "cards", kicker: "WHY AGENCIES", title: "Something to sell every month.",
      items: [
        card("01", "Your clients live on WhatsApp", "Clinics, shops and restaurants get dozens of WhatsApp messages a day and can't answer them all. That's a problem you can solve for them."),
        card("02", "Building AI yourself is slow", "Bots, a shared inbox, business apps, AI models and billing take months to build. Suuper has them today."),
        card("03", "Monthly revenue, not one-off projects", "Charge each client a monthly fee for their assistant and apps, on top of the ads and social media you already sell."),
      ], min: 280,
    },
    {
      type: "flow", kicker: "HOW THE PILOT WORKS", title: "From application to your first paying clients.",
      steps: steps(["Apply", "Agency workspace", "Set up a client", "Connect channels", "Go live", "Charge monthly"]),
      detail: [
        { n: "01", t: "Apply", b: "Tell us about your agency and the businesses you serve." },
        { n: "02", t: "Get your agency workspace", b: "Free during the pilot, with wholesale pricing for your clients." },
        { n: "03", t: "Set up a client's assistant", b: "Add the client's prices, FAQs and documents, and test the bot in the Playground. We help with your first three clients." },
        { n: "04", t: "Connect channels", b: "WhatsApp (through Meta's official Cloud API), Telegram and the website chat bubble." },
        { n: "05", t: "Add apps and workflows", b: "Leads, appointments or tickets, plus the follow-ups that should happen automatically." },
        { n: "06", t: "Charge your client monthly", b: "You set the retail price and keep the margin over Suuper's wholesale price." },
      ],
    },
    {
      type: "table", kicker: "WHAT'S READY, WHAT'S COMING", title: "We'll always tell you which is which.", head: ["CAPABILITY", "STATUS"],
      rows: [
        ["Bots with your clients' knowledge", "Available"],
        ["WhatsApp, Telegram and website channels", "Available"],
        ["Shared inbox with human takeover", "Available"],
        ["Business apps: leads, tickets, appointments, expenses", "Available"],
        ["AI agents and workflows, integrations", "Available"],
        ["Plans, AI credits and usage tracking", "Available"],
        ["Team roles, audit log and API keys", "Available"],
        ["One agency login with a workspace per client", "In development"],
        ["Your logo, colours, domain and email name", "In development"],
        ["Two-click WhatsApp setup (Meta Embedded Signup)", "Planned"],
        ["Billing your clients through Suuper", "Planned"],
        ["Client ROI reports and app template store", "Planned"],
      ],
    },
    {
      type: "cards", kicker: "WHAT PILOT AGENCIES GET", title: "The pilot offer.",
      items: [
        card("FREE", "Agency workspace", "No cost for your agency workspace during the pilot."),
        card("PRICE", "Wholesale pricing", "Wholesale pricing per client for pilot agencies, for life."),
        card("SETUP", "Your first three clients", "Hands-on help setting up your first three clients, end to end."),
        card("YOURS", "The client relationship", "You keep the client and the monthly fee. Suuper stays in the background."),
      ], min: 240,
    },
    {
      type: "faq", id: "faq", title: "Agency questions.",
      items: [
        ["How much do I pay Suuper?", "Pilot agencies pay a wholesale price per client, below the plans on our pricing page. We agree it with you during onboarding, based on the plans your clients need."],
        ["Can Suuper carry my agency's brand?", "Agency branding (your logo, colours, domain and email name) is being built now as the first item on our roadmap. Pilot agencies get it as soon as it ships."],
        ["Can I manage all my clients from one login?", "One agency login with a separate workspace per client is in development. Until then, each client has its own workspace."],
        ["Who handles WhatsApp setup?", "During the pilot, we help you connect each client's WhatsApp number through Meta's official Cloud API. Two-click setup through Meta's Embedded Signup is planned next."],
        ["Which clients work best?", "Businesses that get a lot of WhatsApp messages: clinics, online shops, restaurants, real estate, salons, schools and service businesses."],
        ["Do I need to be technical?", "No coding is needed to set up a bot, knowledge, channels and apps. Connecting WhatsApp takes some setup in Meta's tools, and we'll do it with you."],
      ],
    },
    cta("Become one of the first Suuper agencies.", "Apply for the pilot: a free agency workspace, wholesale pricing and help with your first three clients.", [btn("Apply for the pilot", AGENCY_APPLY, "dark"), btn("Talk to us", "/contact", "outlineDark")]),
  ],

  chat: [
    {
      type: "hero", title: "An AI assistant on your WhatsApp, Telegram and website.",
      body: "Give it a name, instructions and your business information, and it answers customers in your voice, day and night. When a person is needed, it hands the chat to your team.",
      ctas: [btn("Book a demo", DEMO, "dark"), btn("See a demo", "/chat#demo", "outlineDark")],
      mock: { status: "WHATSAPP", sub: "Sample store · knowledge connected", ask: "Do you have the gold kurta in medium?", reply: "Yes, medium is in stock: PKR 4,500. Want me to take your order?", time: "SAMPLE CONVERSATION" },
      orbit: orbit(["PRICES", "FAQS", "TIMINGS", "DELIVERY", "POLICIES", "CATALOGUE"]),
    },
    {
      type: "groups", kicker: "CAPABILITIES", title: "What it knows. What it does.",
      groups: [
        { label: "WHAT IT KNOWS", items: ["Your prices and services", "FAQs you add", "PDFs and documents", "Text you paste in", "Your website", "Your online store's catalogue", "Your instructions and tone of voice"] },
        { label: "WHAT IT DOES", items: ["Answers customer questions", "Recommends products from your catalogue", "Captures leads into your apps", "Books appointments", "Says so when it doesn't know", "Hands the chat to your team"] },
      ],
    },
    { type: "demo", id: "demo", kicker: "DEMO", title: "See how a Suuper assistant replies.", body: "A scripted demo for a sample store: it answers from the store's own information and passes the tricky ones to the team." },
    {
      type: "cards", kicker: "CHANNELS", title: "One assistant. Every channel your customers use.",
      items: [
        card("WA", "WhatsApp", "Through Meta's official WhatsApp Cloud API, with human takeover from the inbox."),
        card("TG", "Telegram", "Connect a Telegram bot and answer there with the same knowledge."),
        card("WEB", "Website chat", "A chat bubble in your colours and logo, added to any site with one line of code."),
        card("SOON", "Instagram & Messenger", "On our roadmap. Not available yet."),
      ], min: 230,
    },
    {
      type: "split", flip: true, kicker: "HUMAN TAKEOVER", title: "When it matters, a person takes over.",
      body: "If a customer asks something the bot can't answer, it says so politely. Your team sees the conversation in the inbox and can take over any WhatsApp or Telegram chat to reply themselves.",
      points: [], ctas: [btn("See the inbox", "/inbox", "primary")],
      photo: img("support-workspace"), mock: mock("TAKEOVER · WHATSAPP", "I want 50 units wholesale.", "Passing you to our sales team now."),
    },
    {
      type: "flow", kicker: "SETUP", title: "Set up in three steps.", steps: steps(["Teach it", "Test it", "Connect a channel"]),
      detail: [
        { n: "01", t: "Teach it", b: "Add your prices, FAQs and documents, or point it at your website or store." },
        { n: "02", t: "Test it", b: "Ask it real customer questions in the Playground before anyone else sees it." },
        { n: "03", t: "Connect a channel", b: "Add the website chat bubble with one line of code, connect Telegram, or connect WhatsApp with our help." },
      ],
    },
    cta("Put an AI employee on your WhatsApp.", "Book a demo and we'll set up your first assistant with you."),
  ],

  inbox: [
    {
      type: "hero", title: "Every customer conversation, in one inbox.",
      body: "WhatsApp, Telegram and website chats in one place. Search and filter, see where the bot couldn't answer, and take over any chat when a person is needed.",
      ctas: [btn("Book a demo", DEMO, "dark"), btn("I run an agency", "/agencies", "outlineDark")],
      mock: { status: "INBOX", sub: "WhatsApp · Telegram · Website", ask: "Ali · WhatsApp · wants 50 units wholesale", reply: "Bot couldn't quote wholesale → flagged for the team", time: "TAKE OVER IN ONE CLICK" },
      orbit: orbit(["WHATSAPP", "TELEGRAM", "WEBSITE"]),
    },
    { type: "inbox", kicker: "PRODUCT", title: "Your team sees the whole picture." },
    { type: "chips", kicker: "INBOX", title: "What the inbox does.", items: ["Every chat in one place", "WhatsApp, Telegram and website", "Search and filter", "See where the bot couldn't answer", "Take over WhatsApp and Telegram chats", "Full conversation history"] },
    cta("Never lose a customer conversation again.", "Book a demo to see the inbox with your own channels."),
  ],

  knowledge: [
    {
      type: "hero", title: "Teach Suuper your business.",
      body: "Your assistant answers from your own information: prices, timings, policies and products. Add it once, and every channel uses it.",
      ctas: [btn("Book a demo", DEMO, "dark"), btn("How it learns", "/knowledge#flow", "outlineDark")],
      mock: { status: "KNOWLEDGE", sub: "Price list · FAQs · Website", ask: "What's your return policy?", reply: "7 days, unworn, with receipt.", time: "ANSWER FROM YOUR POLICY" },
      orbit: orbit(["PDFS", "FAQS", "WEBSITE", "STORE", "TEXT", "DOCUMENTS"]),
    },
    { type: "chips", kicker: "KNOWLEDGE SOURCES", title: "Add what your team already uses.", items: ["PDFs and documents", "FAQs", "Pasted text", "Your website", "Your online store's catalogue"] },
    { type: "flow", id: "flow", kicker: "HOW IT LEARNS", title: "From your documents to a trusted answer.", steps: steps(["Add knowledge", "Test in the Playground", "Go live on your channels"]) },
    {
      type: "split", kicker: "TRUST", title: "When it doesn't know, it says so.",
      body: "Answers come from your own information. If something isn't there, the assistant says so politely instead of guessing, and the inbox flags the question for your team.",
      points: [], ctas: [btn("Book a demo", DEMO, "primary")],
      photo: img("paperwork-to-digital"), mock: mock("NOT IN KNOWLEDGE", "Do you deliver to Gwadar?", "I don't have that information. I've asked the team to reply."),
    },
    cta("Your knowledge, answering customers.", "Book a demo and bring your price list and FAQs."),
  ],

  apps: [
    {
      type: "hero", title: "Business apps behind every conversation.",
      body: "Leads, bookings, tickets and expenses land in simple apps your team actually uses, each with its own records, dashboard and public forms. No more leads lost in chat threads.",
      ctas: [btn("Book a demo", DEMO, "dark"), btn("See the apps", "/apps#apps", "outlineDark")],
      mock: { status: "APP · APPOINTMENTS", sub: "Records · Dashboard · Public form", ask: "New booking from WhatsApp", reply: "Sara · check-up · tomorrow 10:00 am", time: "SAVED AUTOMATICALLY" },
      orbit: orbit(["LEADS", "CRM", "TICKETS", "APPOINTMENTS", "EXPENSES"]),
    },
    {
      type: "cards", id: "apps", kicker: "READY-MADE APPS", title: "Start with the app you need.",
      items: [
        card("CRM", "Leads & CRM", "Every lead from every channel, with its conversation and status."),
        card("BOOK", "Appointments", "Bookings made by the bot or your team, in one calendar of records."),
        card("TKT", "Support tickets", "Complaints logged as tickets and tracked until they're resolved."),
        card("EXP", "Expenses", "Simple records for the money going out."),
      ], min: 240,
    },
    { type: "chips", kicker: "EVERY APP HAS", title: "Built in.", items: ["Its own records", "A dashboard", "Public forms", "Bot access to create records", "Workflow triggers"] },
    cta("Stop losing leads in chat threads.", "Book a demo to see your leads and bookings land in apps automatically."),
  ],

  agents: [
    {
      type: "hero", title: "AI agents that do the follow-up.",
      body: "Agents are AI helpers for your team that do multi-step work: look up an order, update the CRM, write a follow-up. Run them on demand or on a schedule.",
      ctas: [btn("Book a demo", DEMO, "dark"), btn("See examples", "/agents#examples", "outlineDark")],
      mock: { status: "AGENT", sub: "Tools · Schedule", ask: "Follow up with yesterday's leads", reply: "8 leads found · follow-ups drafted · CRM updated", time: "RUNS EVERY MORNING" },
      orbit: orbit(["LOOK UP", "UPDATE", "WRITE", "SCHEDULE"]),
    },
    {
      type: "cards", id: "examples", kicker: "EXAMPLES", title: "Work you can hand to an agent.",
      items: [
        card("ORD", "Order lookup", "Find a customer's order and its status in your connected store."),
        card("CRM", "CRM updates", "Keep lead records up to date after every conversation."),
        card("FUP", "Follow-ups", "Write follow-up messages for leads that went quiet."),
        card("SCH", "Scheduled jobs", "Run the same job every morning, without anyone remembering to."),
      ], min: 240,
    },
    {
      type: "split", kicker: "CONTROL", title: "Your team stays in control.",
      body: "Agents work with the tools you connect. Team roles decide who can set them up, and the audit log records every change.",
      points: ["Agents use only the tools you connect", "Team roles and permissions", "Audit log of every change"], ctas: [btn("Security", "/security", "primary")],
      photo: img("refund-approval"), mock: mock("AUDIT LOG", "Agent updated lead · Ahmed Traders", "Recorded with time and user"),
    },
    cta("Hand the follow-up to an agent.", "Book a demo to see agents working on your own leads."),
  ],

  workflows: [
    {
      type: "hero", title: "When this happens, do that.",
      body: "Workflows are simple automations: a new lead sends a Slack message and an email, a form fills a record, a booking triggers a reminder. Set it up once and it runs every time.",
      ctas: [btn("Book a demo", DEMO, "dark"), btn("See examples", "/workflows#examples", "outlineDark")],
      mock: { status: "WORKFLOW", sub: "Trigger · Actions", ask: "When: new lead from WhatsApp", reply: "Then: Slack message to #sales + email to the owner", time: "RUNS ON EVERY NEW LEAD" },
      orbit: orbit(["TRIGGER", "ACTIONS", "APPS", "INTEGRATIONS"]),
    },
    {
      type: "flows", id: "examples", kicker: "EXAMPLES", title: "Follow-ups that happen on their own.",
      rows: [
        { name: "New lead", steps: ["Lead saved from WhatsApp", "Slack message to #sales", "Email to the owner"] },
        { name: "New booking", steps: ["Appointment created", "Email the receptionist", "Reminder to the customer"] },
        { name: "Website form", steps: ["Form submitted", "Record created in the app", "Team notified"] },
        { name: "Complaint", steps: ["Ticket created", "Team notified", "Customer kept updated"] },
      ],
    },
    cta("Automate the follow-up.", "Book a demo and tell us the one thing your team does by hand every day."),
  ],

  connectors: [
    {
      type: "hero", title: "Connect the tools your business already uses.",
      body: "Integrations let bots, agents and workflows act in your other tools: post to Slack, send an email, check your Shopify store, update HubSpot, use Google.",
      ctas: [btn("Book a demo", DEMO, "dark"), btn("See integrations", "/connectors#cats", "outlineDark")],
      mock: { status: "INTEGRATIONS", sub: "Slack · Email · Shopify · HubSpot · Google", ask: "New lead: Ahmed Traders", reply: "Added to HubSpot and posted to #sales.", time: "SAMPLE WORKFLOW" },
      orbit: orbit(["SLACK", "EMAIL", "SHOPIFY", "HUBSPOT", "GOOGLE"]),
    },
    {
      type: "connectors", id: "cats", kicker: "INTEGRATIONS", title: "Available integrations",
      cats: [
        { name: "Customer channels", tools: ["WhatsApp", "Telegram", "Website chat"] },
        { name: "Team", tools: ["Slack", "Email"] },
        { name: "Commerce", tools: ["Shopify"] },
        { name: "CRM", tools: ["HubSpot"] },
        { name: "Productivity", tools: ["Google"] },
        { name: "Developers", tools: ["API keys"] },
      ],
    },
    { type: "flow", kicker: "EXAMPLE", title: "From new lead to follow-up, without copy-paste.", steps: steps(["Lead on WhatsApp", "Saved in Leads", "Added to HubSpot", "Slack alert", "Follow-up email"]) },
    cta("Your tools, working with your AI.", "Book a demo and tell us which tools you use."),
  ],

  industries: [
    {
      type: "hero", title: "Built for businesses that live on WhatsApp.",
      body: "Clinics, shops, restaurants, property agents, salons, schools and service businesses get dozens of messages a day. Suuper answers them and records what matters.",
      ctas: [btn("Book a demo", DEMO, "dark"), btn("I run an agency", "/agencies", "outlineDark")],
      mock: { status: "SAMPLE CONVERSATION", sub: "Service business · WhatsApp", ask: "AC repair in Gulberg today?", reply: "Yes. Share your address and a time that suits you, and I'll log the job.", time: "TICKET CREATED" },
      orbit: orbit(["CLINICS", "SHOPS", "RESTAURANTS", "REAL ESTATE", "GYMS", "SERVICES"]),
    },
    { type: "split", kicker: "CLINICS", title: "Turn questions into appointments.", body: "", points: ["Fees and timings", "Services", "Open slots", "Appointment booking", "Reminders", "Handover to reception"], ctas: [btn("Book a demo", DEMO, "primary")], photo: img("clinic-reception"), mock: mock("CLINIC · WHATSAPP", "Any slot tomorrow?", "10:00 am or 4:00 pm. Shall I book one?") },
    { type: "split", flip: true, kicker: "ONLINE SHOPS", title: "Answer product questions and capture the order.", body: "", points: ["Product recommendations from your catalogue", "Stock and sizing", "Delivery questions", "Cash-on-delivery orders", "\"Where is my order?\"", "Handover to your team"], ctas: [btn("Book a demo", DEMO, "primary")], photo: img("warehouse-packing"), mock: mock("STORE · WHATSAPP", "Is medium in stock?", "Yes, medium is in stock. Want to order?") },
    { type: "split", kicker: "RESTAURANTS", title: "Menus, reservations and delivery, answered.", body: "", points: ["Menu questions", "Table reservations", "Timings", "Delivery questions", "Location"], ctas: [btn("Book a demo", DEMO, "primary")], photo: img("bistro-reservations"), mock: mock("RESTAURANT · WHATSAPP", "Table for 6 tonight?", "8:30 pm is free. Name for the booking?") },
    { type: "split", flip: true, kicker: "REAL ESTATE", title: "From property question to viewing.", body: "", points: ["Budget, area and property type", "Viewing requests", "Lead capture", "Hot leads to an agent"], ctas: [btn("Book a demo", DEMO, "primary")], photo: img("apartment-viewing"), mock: mock("PROPERTY · WHATSAPP", "3-bed in DHA?", "What's your budget? I'll match options and book a viewing.") },
    { type: "split", kicker: "GYMS & COACHES", title: "Turn membership questions into trial sign-ups.", body: "", points: ["Packages and fees", "Schedules", "Trial sign-ups", "Lead capture"], ctas: [btn("Book a demo", DEMO, "primary")], photo: img("gym-floor"), mock: mock("GYM · WEBSITE", "Monthly fee?", "PKR 6,000. Want to book a trial session?") },
    { type: "split", flip: true, kicker: "SERVICE BUSINESSES", title: "Get the details before anyone picks up the phone.", body: "", points: ["Service type and location", "Job details", "Complaints logged as tickets", "Customers kept updated"], ctas: [btn("Book a demo", DEMO, "primary")], photo: img("hvac-technician"), mock: mock("SERVICES · WHATSAPP", "AC repair in Gulberg?", "Yes. What's the address and AC model?") },
    finalCta,
  ],

  pricing: [
    { type: "pricing", title: "Simple plans. Capped AI costs.", sub: "Every plan includes the full platform and a monthly budget of AI credits, so your AI bill can't run away. Agencies get wholesale pricing through the pilot." },
    { type: "roi", title: "Count what silence costs you.", sub: "Move the sliders to estimate how much revenue unanswered messages could be costing you. An estimate, not a promise.", cta: "Book a demo" },
    { type: "faq", title: "Pricing questions.", items: [faqs[7], faqs[6], faqs[10], faqs[9], faqs[11], ["Can I change plans later?", "Yes. Talk to us and we'll move you to the plan that fits your volume."]] },
    finalCta,
  ],

  security: [
    {
      type: "hero", title: "AI that works for your business, under your control.",
      body: "Team roles decide who can do what, an audit log records every change, and your assistant answers from your own information.",
      ctas: [btn("Talk to us", "/contact", "dark"), btn("Book a demo", DEMO, "outlineDark")],
      mock: { status: "AUDIT LOG", sub: "Every change recorded", ask: "Who changed the bot's instructions?", reply: "Ayesha (Admin) · today 2:14 pm", time: "RECORDED" },
      orbit: orbit(["ROLES", "AUDIT LOG", "API KEYS", "YOUR KEYS", "OFFICIAL API"]),
    },
    {
      type: "cards", kicker: "WHAT'S IN PLACE", title: "Controls built into Suuper.",
      items: [
        card("ROLE", "Team roles", "Give each team member a role, so people only change what they're responsible for."),
        card("LOG", "Audit log", "Every change in your workspace is recorded."),
        card("API", "API keys", "Separate API keys for developers, which you can create and revoke."),
        card("KEY", "Bring your own AI key", "Use your own Claude, GPT or Gemini account, or a free local model."),
        card("WA", "Official WhatsApp API", "WhatsApp runs on Meta's official WhatsApp Cloud API only."),
        card("KB", "Answers from your information", "The assistant answers from your own knowledge and says so when it doesn't know."),
      ], min: 250,
    },
    cta("Questions about your data?", "Talk to us about roles, data handling and how your assistant answers.", [btn("Talk to us", "/contact", "dark"), btn("Book a demo", DEMO, "outlineDark")]),
  ],

  about: [
    {
      type: "hero", title: "AI employees for the businesses that run on WhatsApp.",
      body: "In Pakistan, the Gulf, South Asia and Africa, customers do business on WhatsApp, and small businesses can't keep up. We're building Suuper so every one of them can answer every customer.",
      ctas: [btn("Talk to us", "/contact", "dark"), btn("For agencies", "/agencies", "outlineDark")],
      mock: { status: "OUR MISSION", sub: "Starting in Pakistan, then the Gulf", ask: "What is Suuper?", reply: "An AI employee that answers customers and records the work that follows.", time: "SUUPER.CC" },
      orbit: orbit(["WHATSAPP", "SMALL BUSINESS", "AGENCIES", "AI"]),
    },
    { type: "story", kicker: "WHY WE BUILT IT", lines: ["Messages pile up and late replies lose sales.", "Leads, bookings and complaints live in chat threads.", "Hiring someone to answer costs more than most small businesses can afford.", "And most AI tools are built for websites, priced for Western companies.", "That's why we built Suuper."] },
    {
      type: "cards", kicker: "WHAT WE BELIEVE", title: "What we believe.",
      items: [
        card("01", "WhatsApp first", "Meet customers where they already are, not on a website widget they never open."),
        card("02", "Record the work", "Every lead, booking and complaint belongs in a record your team can act on."),
        card("03", "People in control", "The bot hands over when it matters, and your team can always take over."),
        card("04", "Honest by default", "We'll always tell you what's ready today and what's still on the roadmap."),
      ], min: 220,
    },
    cta("Let's talk.", "Whether you run a business or an agency, we'd like to hear what your customers ask you.", [btn("Talk to us", "/contact", "dark"), btn("Book a demo", DEMO, "outlineDark")]),
  ],

  resources: [
    {
      type: "hero", title: "Guides to AI for WhatsApp-first businesses.",
      body: "Practical guides on answering customers, capturing leads and automating the follow-up.",
      ctas: [btn("Read the guides", "/resources#articles", "dark"), btn("Book a demo", DEMO, "outlineDark")],
      mock: { status: "GUIDE", sub: "How to Connect WhatsApp to Your AI Workflow", ask: "Where should I start?", reply: "With the questions your team answers every day.", time: "FREE TO READ" },
      orbit: orbit(["WHATSAPP", "SALES", "SUPPORT", "AGENTS", "SMALL BUSINESS"]),
    },
    { type: "cards", id: "articles", kicker: "GUIDES", title: "Latest guides.", items: [], min: 280 },
    finalCta,
  ],

  contact: [
    {
      type: "contact", title: "Show us what your customers ask you.", sub: "We'll show you how Suuper can answer it.",
      questions: ["Where do customer messages arrive today?", "What questions does your team answer again and again?", "Where are your prices, timings and policies written down?", "Where do leads and bookings get lost?", "Do you run an agency with small-business clients?"],
    },
    {
      type: "flow", kicker: "WHAT YOUR DEMO COVERS", title: "A demo built around your business.", steps: steps(["Your questions", "Your knowledge", "A real answer", "A saved lead", "Takeover", "A workflow"]),
      detail: [
        { n: "01", t: "Your questions", b: "We start with what customers ask you every day." },
        { n: "02", t: "Your knowledge", b: "We add your price list, FAQs or website." },
        { n: "03", t: "A real answer", b: "The assistant answers a real customer question." },
        { n: "04", t: "A saved lead", b: "We show the lead or booking landing in an app." },
        { n: "05", t: "Human takeover", b: "We show how your team takes over a chat." },
        { n: "06", t: "A workflow", b: "We show a follow-up running on its own." },
      ],
    },
    cta("Start with your most-asked question.", "You don't need to automate the whole business on day one.", [btn("Book a demo", DEMO, "dark"), btn("I run an agency", "/agencies", "outlineDark")]),
  ],
};

// ---------- Pricing (Suuper Business Pitch, Oct 26 2026) ----------

const Y = (t: string) => ({ t, on: true });

/** Retail plans. 1 AI credit = $0.01 of AI provider cost; credits cap each plan's AI spend. */
export const plans: Plan[] = [
  {
    name: "Starter", n: 97, desc: "One business getting started with AI on WhatsApp.", credits: 1500, replies: "2,000", bots: 3, seats: 3,
    groups: [{ label: "AI COST CAP", items: [Y("AI spend capped at $15 a month"), Y("Own AI keys and local models use no credits")] }],
  },
  {
    name: "Growth", n: 297, desc: "Busy businesses with several channels and a team.", credits: 6000, replies: "10,000", bots: 10, seats: 10,
    groups: [{ label: "AI COST CAP", items: [Y("AI spend capped at $60 a month"), Y("Own AI keys and local models use no credits")] }],
  },
  {
    name: "Pro", n: 497, desc: "High-volume businesses and multi-location teams.", credits: 15000, replies: "50,000", bots: 25, seats: 25,
    groups: [{ label: "AI COST CAP", items: [Y("AI spend capped at $150 a month"), Y("Own AI keys and local models use no credits")] }],
  },
];
export const popularPlan = "Growth";

export const planIncludes = [
  "WhatsApp, Telegram and website chat",
  "Shared inbox with human takeover",
  "Knowledge from documents, FAQs, websites and stores",
  "Business apps: leads & CRM, tickets, appointments, expenses",
  "AI agents with tools and schedules",
  "Workflows and integrations",
  "Claude, GPT, Gemini or free local models",
  "Team roles, audit log and API keys",
];

export const creditNotes = [
  "1 AI credit = $0.01 of AI model cost.",
  "A typical reply uses about 0.03 credits on GPT-6 Luna, 0.3 on Claude Haiku and 1.2 on Claude Opus.",
  "Free local models and your own AI keys use no credits at all.",
  "Credit top-up packs are on our roadmap.",
];

export const agencyPilot = [
  "Free agency workspace during the pilot",
  "Wholesale price per client, you set the retail price",
  "Hands-on setup of your first three clients",
  "Agency branding and client workspaces: in development",
];

// ---------- Navigation ----------

export const productGroups: MegaGroup[] = [
  { label: "Talk to customers", items: ["/chat", "/inbox"] },
  { label: "Know your business", items: ["/knowledge", "/connectors"] },
  { label: "Record the work", items: ["/apps"] },
  { label: "Automate the follow-up", items: ["/agents", "/workflows"] },
];
export const productImages: Record<string, string> = {
  "/chat": img("boutique-assistant"), "/inbox": img("unified-support-desk"), "/connectors": img("coding-workspace"), "/knowledge": img("paperwork-to-digital"),
  "/apps": img("welcoming-team"), "/workflows": img("workflow-meeting"), "/agents": img("sunrise-tasks"),
};
export const industryGroups: MegaGroup[] = [
  { label: "Health & bookings", items: ["clinics", "gyms"] },
  { label: "Commerce & hospitality", items: ["ecommerce", "restaurants"] },
  { label: "Property & services", items: ["realestate", "local"] },
];
export const industryChips: Record<string, string[]> = {
  clinics: ["Fees & timings", "Appointments", "Reminders"],
  ecommerce: ["Products", "COD orders", "Order status"],
  restaurants: ["Menu", "Reservations", "Delivery"],
  realestate: ["Budget & area", "Viewings", "Hot leads"],
  gyms: ["Packages", "Schedules", "Trials"],
  local: ["Job details", "Tickets", "Updates"],
};
export const resourceTiles: ResourceTile[] = [
  { label: "Guides", href: "/resources#articles", color: "teal", icon: "M4 4h16v16H4z M8 8h8 M8 12h8 M8 16h5" },
  { label: "For agencies", href: "/agencies", color: "peach", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.9", isNew: true },
  { label: "Pricing", href: "/pricing", color: "mint", icon: "M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z M7 7h.01" },
  { label: "Security", href: "/security", color: "teal", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { label: "About", href: "/about", color: "peach", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0" },
  { label: "Contact", href: "/contact", color: "mint", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
];

export const footer: FooterColumn[] = [
  { title: "PRODUCT", links: [["AI assistant", "/chat"], ["Inbox", "/inbox"], ["Knowledge", "/knowledge"], ["Business apps", "/apps"], ["Agents", "/agents"], ["Workflows", "/workflows"], ["Integrations", "/connectors"], ["Pricing", "/pricing"]] },
  { title: "INDUSTRIES", links: industries.map((i) => [i.name, i.href] as [string, string]) },
  { title: "COMPANY", links: [["For agencies", "/agencies"], ["About", "/about"], ["Security", "/security"], ["Contact", "/contact"], ["Book a demo", DEMO]] },
  { title: "RESOURCES", links: [["Guides", "/resources"], ["ROI calculator", "/pricing"], ["Sign in", "https://app.suuper.cc/login"]] },
  { title: "LEGAL", links: [["Privacy", "/privacy"], ["Terms", "/terms"], ["Refunds", "/refunds"]] },
];

// ---------- Industry pages ----------

const indCopy: Record<string, [string, string, string[]]> = {
  clinics: ["clinics", "Patients ask about fees, timings and availability at all hours. Suuper answers on WhatsApp, books the appointment and lets your reception take over when needed.", ["Patient asks", "Fees & open slots", "Picks a time", "Appointment booked", "Reception notified", "Reminder sent"]],
  ecommerce: ["online shops", "Suuper recommends products from your catalogue, answers stock and delivery questions, confirms cash-on-delivery orders and answers \"where is my order?\"", ["Shopper asks", "Checks catalogue", "Answers price & stock", "Captures the order", "Saved as a lead", "Team confirms"]],
  restaurants: ["restaurants", "Menu, timings, reservations and delivery questions answered instantly on WhatsApp, even during the dinner rush.", ["Guest asks", "Shares menu & hours", "Takes reservation", "Confirms party size", "Reservation recorded", "Host notified"]],
  realestate: ["property agents", "Suuper asks budget, area and property type, books viewings and hands hot leads to an agent.", ["Buyer asks", "Budget, area, type", "Saves the lead", "Books a viewing", "Routes to an agent", "Agent follows up"]],
  gyms: ["gyms and coaches", "Suuper explains packages, schedules and trials, and turns interest into trial sign-ups.", ["Prospect asks", "Shares packages", "Answers schedule", "Offers a trial", "Saves the lead", "Coach follows up"]],
  local: ["service businesses", "Get service type, location and job details before anyone picks up the phone, log complaints as tickets and keep customers updated.", ["Customer asks", "Identifies service", "Collects location", "Captures job details", "Ticket created", "Customer updated"]],
};
const kmap: Record<string, string> = { "CLINICS": "clinics", "ONLINE SHOPS": "ecommerce", "RESTAURANTS": "restaurants", "REAL ESTATE": "realestate", "GYMS & COACHES": "gyms", "SERVICE BUSINESSES": "local" };
pages.industries.forEach((s) => {
  if (s.type !== "split" || !kmap[s.kicker]) return;
  const key = kmap[s.kicker];
  const ic = indCopy[key];
  s.ctas = [s.ctas[0], btn("See the full page", "/industries/" + key, "outline")];
  pages["ind-" + key] = [
    { type: "hero", pill: "Industries · " + s.kicker.toLowerCase(), pillHref: "/industries", title: s.title, body: ic[1],
      ctas: [btn("Book a demo", DEMO, "dark"), btn("I run an agency", "/agencies", "outlineDark")],
      mock: { status: s.kicker + " · SAMPLE", sub: s.mock.label, ask: s.mock.ask, reply: s.mock.reply, time: "SAMPLE CONVERSATION" },
      orbit: orbit(s.points.slice(0, 6).map((p) => p.toUpperCase())) },
    { type: "chips", kicker: "WHAT SUUPER HANDLES", title: "The questions your customers ask most.", items: s.points },
    { type: "flow", kicker: "HOW IT WORKS", title: "From question to outcome.", steps: steps(ic[2]) },
    { type: "split", flip: true, kicker: "HUMAN TAKEOVER", title: "Your team steps in when it matters.",
      body: "When the bot can't answer, it says so politely. Your team sees the chat in the inbox and can take over any WhatsApp or Telegram conversation.",
      points: ["Leads and bookings saved in apps", "Unanswered questions flagged", "Take over any chat", "Full conversation history"],
      ctas: [btn("Book a demo", DEMO, "primary")], photo: s.photo, mock: mock("TAKEOVER", s.mock.ask, "Passing you to the team.") },
    { type: "roi", title: "Count what silence costs you.", sub: "Estimate the revenue unanswered messages could be costing you. An estimate, not a promise.", cta: "Book a demo" },
    { type: "faq", title: "Questions from " + ic[0] + ".", items: faqs.slice(0, 6) },
    cta("Answer every " + (key === "clinics" ? "patient" : "customer") + ", even at midnight.", "Book a demo with your own prices and FAQs. Agencies serving " + ic[0] + ": ask about the pilot."),
  ];
});

// ---------- Guides ----------

export const articles: Article[] = [
  { slug: "whatsapp", tag: "WHATSAPP", read: "4 MIN READ", photo: img("support-workspace"), title: "How to Connect WhatsApp to Your AI Workflow",
    lead: "WhatsApp is where your customers already message you. Connecting it to an AI assistant means every message gets an answer, and every lead gets recorded.",
    sections: [
      ["Use the official API", "Suuper connects through Meta's official WhatsApp Cloud API. Unofficial WhatsApp tools risk getting your number banned."],
      ["One knowledge base", "Your WhatsApp assistant answers from the same knowledge as your website chat, so customers get consistent answers on every channel."],
      ["Decide when a person takes over", "High-value or sensitive conversations should reach a person. With Suuper, your team can take over any WhatsApp chat from the inbox."],
      ["Record what happens", "A WhatsApp lead can be saved in your Leads app and trigger a workflow that alerts your team, so nothing stays buried in a chat thread."],
    ] },
  { slug: "sales-assistant", tag: "SALES", read: "6 MIN READ", photo: img("boutique-assistant"), title: "How to Build an AI Sales Assistant for Your Business",
    lead: "An assistant that sells needs three things: the right knowledge, a clear goal and a way to hand serious buyers to your team.",
    sections: [
      ["Start with the questions you already answer", "Pull the last month of WhatsApp chats, emails and DMs. The same twenty questions usually cover most of what customers ask: price, stock, delivery, timings and returns."],
      ["Give it your real knowledge", "Upload your price list, policies and FAQs, and point the assistant at your website or store. Answers come from your content, so they stay accurate when you update it."],
      ["Decide what a good outcome looks like", "For a shop it might be an order. For a clinic it's a booked appointment. Set that as the assistant's goal so every conversation moves toward it."],
      ["Capture the lead at the right moment", "Ask for a name and number once the customer shows intent, not in the first message, and save it where your team will see it."],
      ["Hand off the serious buyers", "Wholesale orders, complaints and custom requests should reach a person, with the full conversation attached."],
      ["Test, then publish", "Ask the questions your customers ask. When the answers look right, connect your channels and go live."],
    ] },
  { slug: "customer-questions", tag: "SUPPORT", read: "4 MIN READ", photo: img("unified-support-desk"), title: "10 Customer Questions Your Business Should Answer Automatically",
    lead: "If your team answers it more than five times a week, an assistant should answer it instantly.",
    sections: [
      ["Price and availability", "1. How much is it? 2. Is it in stock? Answer with the current price and size or slot availability."],
      ["Delivery", "3. Do you deliver to my city? 4. How long will it take? 5. How much is delivery?"],
      ["Policies", "6. What's your return or cancellation policy? 7. Do you offer cash on delivery or instalments?"],
      ["Timings and location", "8. Are you open today? 9. Where are you located?"],
      ["The handoff question", "10. Can someone call me? This is a buying signal. Capture the number and route it to your team straight away."],
    ] },
  { slug: "ai-agent", tag: "AGENTS", read: "4 MIN READ", photo: img("sunrise-tasks"), title: "What Is an AI Agent?",
    lead: "A chatbot answers. An AI agent can also act: look up an order, update a record or write a follow-up.",
    sections: [
      ["More than a chatbot", "A chatbot replies to a message. An agent works through several steps with tools, such as finding a customer's order and drafting the reply."],
      ["Where agents work well", "Repeatable jobs with clear outcomes: following up with leads, keeping CRM records current, preparing a daily summary."],
      ["On demand or on a schedule", "Some jobs run when someone asks. Others, like a morning follow-up, are better on a schedule."],
      ["Keeping people in control", "Give each agent only the tools it needs, and keep a record of what changed."],
    ] },
  { slug: "small-business", tag: "SMB", read: "5 MIN READ", photo: img("og-boutique"), title: "How Small Businesses Can Use AI Without Replacing Their Existing Tools",
    lead: "You don't need a new stack to use AI. You need AI that works with the tools you already have.",
    sections: [
      ["Start where the work piles up", "Usually that's customer messages on WhatsApp. An assistant there is the fastest way to see value."],
      ["Connect, don't migrate", "Keep your store, CRM and team chat. Connect them so AI can work with them."],
      ["Automate one process", "Pick the follow-up that causes the most repetitive work and automate it before adding more."],
      ["Measure what changed", "Track messages answered, leads captured and bookings made. Expand when the numbers justify it."],
    ] },
];
articles.forEach((a, i) => {
  const next = articles[(i + 1) % articles.length];
  pages["article-" + a.slug] = [
    { type: "article", tag: a.tag, read: a.read, title: a.title, lead: a.lead, photo: a.photo,
      sections: a.sections.map((s) => ({ h: s[0], p: s[1] })), nextTitle: next.title, nextHref: "/resources/" + next.slug },
    cta("Try it on your own business.", "Book a demo and we'll set up your first assistant with you."),
  ];
});
{
  const list = pages.resources.find((x) => x.id === "articles");
  if (list?.type === "cards") list.items = articles.map((a) => card(a.tag, a.title, "", "/resources/" + a.slug, "Read guide"));
}

// ---------- Legal ----------
// Placeholder policy text: must be reviewed by the business (and ideally a lawyer) before paid plans open.

const legal = (title: string, sections: [string, string][]): Section[] => [{ type: "legal", title, updated: "NOVEMBER 2026", sections: sections.map((s) => ({ h: s[0], p: s[1] })) }];
pages.privacy = legal("Privacy policy", [
  ["What we collect", "Account details, business content you upload, conversation data we process on your behalf, product usage data, and the details you send us through forms on this website."],
  ["How we use it", "To provide and improve the service, reply to your customers on your behalf, give support and meet legal obligations."],
  ["Your customers' data", "Conversation data belongs to you. We process it to deliver replies, takeovers and records in your workspace."],
  ["Sharing", "We use providers for hosting, AI processing and messaging channels (such as Meta for WhatsApp). We do not sell personal data."],
  ["Cookies", "Essential storage keeps the site working. Analytics and advertising cookies are only used if you accept them."],
  ["Retention and deletion", "You can delete knowledge sources and conversations from your workspace at any time. Ask us to delete website form submissions at any time."],
  ["Contact", "Questions about privacy: use the contact form on this website."],
]);
pages.terms = legal("Terms of service", [
  ["Using Suuper", "These terms apply to your use of the Suuper website, dashboard and assistants."],
  ["Your account", "You are responsible for your workspace, your team's access and keeping credentials secure."],
  ["Your content", "You keep ownership of the knowledge and data you add. You give us permission to process it to run the service."],
  ["Acceptable use", "Don't use Suuper for spam, unlawful content or to mislead customers about who they are talking to. WhatsApp use must follow Meta's policies."],
  ["Plans and billing", "Prices are shown in US dollars. Paid plans renew each billing period until cancelled. WhatsApp conversation charges are billed by Meta."],
  ["Changes and termination", "We may update these terms with notice. You can close your workspace at any time."],
]);
pages.refunds = legal("Refund policy", [
  ["Cancelling", "You can cancel a paid plan at any time. Your plan stays active until the end of the period you've paid for."],
  ["Refunds", "If something went wrong with a payment, contact us through the contact form and we'll review it with you."],
  ["Meta charges", "WhatsApp conversation charges are billed by Meta, not Suuper, and follow Meta's own terms."],
]);

pages.notfound = [
  { type: "hero", title: "This page went quiet.", body: "The link may be old or mistyped. Everything else on Suuper is still answering.",
    ctas: [btn("Back to home", "/", "dark"), btn("Talk to us", "/contact", "outlineDark")], micro: "ERROR 404", orbit: orbit(["404", "NOT FOUND", "TRY HOME", "OR PRICING"]) },
];

pages.demo = [{ type: "book", points: ["A live setup on your own prices, FAQs and WhatsApp questions", "How leads and bookings land in your apps", "Which plan fits your message volume", "30 minutes, no slides"] }];

export function getPage(key: string): Section[] | undefined {
  return Object.hasOwn(pages, key) ? pages[key] : undefined;
}

const reserved = new Set(["home", "industries", "resources", "notfound"]);
const prefixed = (k: string) => k.startsWith("ind-") || k.startsWith("article-") || k.startsWith("case-");
export const topLevelPages = Object.keys(pages).filter((k) => !reserved.has(k) && !prefixed(k));
export const industryPages = Object.keys(pages).filter((k) => k.startsWith("ind-")).map((k) => k.slice(4));
export const customerPages = Object.keys(pages).filter((k) => k.startsWith("case-")).map((k) => k.slice(5));
