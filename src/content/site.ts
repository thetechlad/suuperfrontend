// Suuper site content, ported from the Claude Design file (copy from Suuper_Master_Copy_Bible.docx).
import type {
  Article,
  BillingCycle,
  ButtonVariant,
  Card,
  CaseStudy,
  Cta,
  CtaSection,
  FooterColumn,
  HireSection,
  Industry,
  LogosSection,
  MegaGroup,
  Mock,
  NavItem,
  Plan,
  ProofSection,
  ResourceTile,
  Section,
  TrustSection,
} from "./types";

const img = (name: string) => `/images/${name}.jpg`;
const btn = (label: string, href: string, variant: ButtonVariant): Cta => ({ label, href, variant });
const card = (tag: string, title: string, body: string, href = "", cta = ""): Card => ({ tag, title, body, href, cta });
const orbit = (labels: string[]) => labels;
const steps = (labels: string[]) => labels;
const mock = (label: string, ask: string, reply: string): Mock => ({ label, ask, reply });

const indRoute: Record<string, string> = { ecommerce: "ecommerce", clinics: "clinics", realestate: "realestate", restaurants: "restaurants", gyms: "gyms", sales: "agencies", marketing: "agencies", local: "local" };

export const industries: Industry[] = [
  { key: "ecommerce", name: "Ecommerce", src: img("warehouse-packing"), benefit: "Sizing, stock and delivery.", q: "Is medium in stock?" },
  { key: "clinics", name: "Clinics", src: img("clinic-reception"), benefit: "Appointments, timings and services.", q: "Any slot tomorrow?" },
  { key: "realestate", name: "Real estate", src: img("apartment-viewing"), benefit: "Listings, availability and viewing requests.", q: "3-bed in DHA?" },
  { key: "restaurants", name: "Restaurants", src: img("bistro-reservations"), benefit: "Menus, timings, orders and reservations.", q: "Table for 6 tonight?" },
  { key: "gyms", name: "Gyms & coaches", src: img("gym-floor"), benefit: "Packages, schedules and trials.", q: "Monthly fee?" },
  { key: "sales", name: "Sales agencies", src: img("night-shift-sales"), benefit: "Qualification and lead routing.", q: "Can I get a quote?" },
  { key: "marketing", name: "Marketing agencies", src: img("creative-studio"), benefit: "Inbound enquiries and lead capture.", q: "Do you run Meta ads?" },
  { key: "local", name: "Local services", src: img("hvac-technician"), benefit: "Job details, locations and quote requests.", q: "AC repair in Gulberg?" }
].map((i) => ({ ...i, href: "/industries/" + indRoute[i.key] }));

export const faqs: [string, string][] = [
  ["What is Suuper?", "Suuper is an AI operating layer that connects business knowledge, tools, workflows, apps and agents."],
  ["Is Suuper just a chatbot?", "No. AI chat is one part of Suuper. You can also connect tools, build workflows, create apps and deploy agents."],
  ["Can I train it on my own data?", "Yes. Add your website, documents and other supported knowledge sources."],
  ["Can I use it on my website?", "Yes. The current product is designed around a website widget and a simple embed flow."],
  ["Can it work on WhatsApp?", "Yes, where the relevant WhatsApp integration is enabled for the plan/account."],
  ["Can it work with Instagram?", "Yes, where the relevant Instagram integration is enabled."],
  ["Can I connect Slack or Asana?", "Suuper is designed to connect business tools through connectors and MCP."],
  ["What can I automate?", "Any supported process that can be expressed as a workflow using triggers, knowledge, tools, logic and actions."],
  ["What is an agent?", "An AI worker configured with a goal, knowledge, tools, instructions, permissions and actions."],
  ["Do I need a developer?", "The core experience is designed to make common AI setup and automation accessible without building everything from scratch."],
  ["Can a human take over?", "Yes. Human handoff and approval are core patterns for conversations and sensitive workflows."],
  ["Can I start free?", "Yes. The Free plan includes 200 AI replies a month and the website widget."],
  ["Can I upgrade later?", "Yes, subject to the current billing model."],
  ["How long does setup take?", "The basic assistant setup is a 60-second, three-step experience. Actual setup time depends on the amount of knowledge and integrations involved."]
];

const finalCta: CtaSection = {
  type: "cta",
  title: "Your competitors are still answering at midnight.",
  body: "Go live with Suuper and give every customer a reply, every hour of the day.",
  ctas: [btn("Start free", "/signup", "dark"), btn("Talk to sales", "/demo", "outlineDark")],
  micro: "FREE PLAN · NO CARD · CANCEL ANYTIME"
};

export const nav: { product: NavItem[]; company: NavItem[] } = {
  product: [
    { label: "AI Chat", href: "/chat", desc: "AI that knows your business and replies 24/7.", tag: "AI" },
    { label: "Connectors", href: "/connectors", desc: "Connect AI to the tools you already use.", tag: "MCP" },
    { label: "Apps", href: "/apps", desc: "AI-powered software around your processes.", tag: "APP" },
    { label: "Agents", href: "/agents", desc: "Specialized AI workers that reason and act.", tag: "AGT" },
    { label: "Workflows", href: "/workflows", desc: "Automate any process you can describe.", tag: "WF" },
    { label: "One Inbox", href: "/inbox", desc: "Every customer conversation in one place.", tag: "INB" },
    { label: "Knowledge base", href: "/knowledge", desc: "Teach Suuper your business.", tag: "KB" },
    { label: "Analytics", href: "/analytics", desc: "See what your AI is doing.", tag: "ANL" }
  ],
  company: [
    { label: "About", href: "/about", desc: "Mission, philosophy and trust.", tag: "ABT" },
    { label: "Security", href: "/security", desc: "Access, permissions and oversight.", tag: "SEC" },
    { label: "Careers", href: "/careers", desc: "Build the AI layer for small business.", tag: "JOB" },
    { label: "Partners", href: "/partners", desc: "Earn 30% recurring or resell Suuper.", tag: "PRT" },
    { label: "Contact", href: "/contact", desc: "Talk to sales or support.", tag: "HI" }
  ]
};

export const pages: Record<string, Section[]> = {
  home: [
    {
      type: "hero", pill: "WhatsApp Business API is now live on every plan", pillHref: "/chat",
      title: "Your business, on autopilot.",
      body: "Suuper connects your knowledge, tools, workflows and AI agents into one intelligent operating layer.",
      body2: "Build an AI that knows your business, connects to your tools and gets real work done.",
      ctas: [btn("Start free", "/signup", "dark"), btn("See how it works", "/#how", "outlineDark")],
      micro: "No developer required to get started.",
      mock: { status: "AI ACTIVE", sub: "Knowledge connected · Tools connected · Ready to work", ask: "Do we deliver to Karachi?", reply: "Yes — 2 days, PKR 250 flat. Want me to help you place the order?", time: "REPLIED IN 1.2s" },
      orbit: orbit(["WEBSITE", "WHATSAPP", "INSTAGRAM", "MESSENGER", "SLACK", "ASANA", "CRM", "DATABASE"])
    },
    { type: "marquee", items: ["WEBSITE", "WHATSAPP", "INSTAGRAM", "MESSENGER", "SLACK", "ASANA", "JIRA", "NOTION", "POSTGRESQL", "MONGODB", "REST APIS", "WEBHOOKS", "MCP"] },
    {
      type: "problem", kicker: "THE PROBLEM", title: "Your business is already full of information. It's just everywhere.",
      lines: [["Your knowledge is in", "documents."], ["Your conversations are in", "Slack."], ["Your leads are in your", "CRM."], ["Your customers are on", "WhatsApp."], ["Your projects are in", "Asana."], ["Your audience is on", "Instagram."], ["Your processes live in", "people's heads."]],
      punch: "Suuper connects it all."
    },
    {
      type: "cards", kicker: "THE PLATFORM", title: "One platform. Four ways to put AI to work.", sub: "Connect your knowledge. Connect your tools. Build your AI. Automate the work.",
      items: [
        card("AI", "AI Chat", "Turn your business knowledge into conversations that answer, qualify and convert.", "/chat", "Explore AI Chat"),
        card("MCP", "Connectors", "Connect AI to the tools and systems your team already uses.", "/connectors", "Explore connectors"),
        card("APP", "Apps", "Turn sales, HR, onboarding, research and operations into AI-powered applications.", "/apps", "Explore apps"),
        card("AGT", "Agents", "Build specialized AI workers for the jobs you want AI to own.", "/agents", "Explore agents")
      ], min: 250
    },
    {
      type: "flow", id: "how", kicker: "PLATFORM FLOW", title: "Teach it. Connect it. Build it. Let it work.",
      sub: "Your knowledge gives AI context. Connectors give AI access. Apps give AI a place to operate. Agents give AI autonomy.",
      steps: steps(["Teach it", "Connect it", "Build it", "Let it work"]),
      detail: [
        { n: "01", t: "Teach it", b: "Upload documents, connect your website, add knowledge and define the context AI needs." },
        { n: "02", t: "Connect it", b: "Give AI access to approved tools, data sources, APIs and channels." },
        { n: "03", t: "Build it", b: "Create assistants, workflows, apps and agents." },
        { n: "04", t: "Let it work", b: "AI answers, routes, researches, updates, communicates and executes." }
      ],
      note: "KNOWLEDGE → CONTEXT → CONNECT → REASON → ACT → RESULT → LEARN"
    },
    {
      type: "split", kicker: "AI CHAT", title: "The widget that sells while you sleep.",
      body: "One snippet puts a trained assistant on your website, answering price, stock, delivery and service questions when intent is highest.",
      points: ["Answers from your own price list and policies", "Captures leads inside the chat", "Hands complex conversations to your team"],
      ctas: [btn("Add it to my website", "/chat", "primary"), btn("See it live", "/chat#demo", "outline")],
      photo: img("boutique-assistant"), mock: mock("SUUPER.CC · WIDGET", "Do you ship to Karachi?", "Yes — 2 days, PKR 250 flat.")
    },
    {
      type: "split", flip: true, kicker: "CONNECTORS", title: "AI is more useful when it can do something.",
      body: "Connect Suuper to Slack, Asana, WhatsApp, Instagram, CRMs, databases, APIs and internal tools. Give AI access to the systems where work actually happens.",
      points: [], ctas: [btn("Explore connectors", "/connectors", "primary")],
      photo: img("multiscreen-workspace"), mock: mock("CONNECTOR · SLACK", "New lead from website", "Posted to #sales with company research.")
    },
    {
      type: "split", kicker: "APPS", title: "Turn your business process into software.",
      body: "Build an AI-powered app for sales, HR, onboarding, offboarding, research, support, approvals or any repeatable process.",
      points: [], ctas: [btn("Build an app", "/apps", "primary")],
      photo: img("welcoming-team"), mock: mock("APP · LEAD QUALIFIER", "Score: Ahmed Traders", "82/100 — strong fit. Outreach drafted.")
    },
    {
      type: "split", flip: true, kicker: "AGENTS", title: "Build your AI workforce.",
      body: "Give an agent a goal, knowledge, tools, instructions and permissions. Then let it work.",
      points: [], ctas: [btn("Build an agent", "/agents", "primary")],
      photo: img("sunrise-tasks"), mock: mock("AGENT · SALES", "Goal: qualify inbound leads", "12 researched · 5 qualified · CRM updated")
    },
    { type: "roi", title: "Count what silence costs you.", sub: "Move the sliders to estimate how much revenue could be recovered from enquiries nobody answers in time.", cta: "Calculate my opportunity" },
    { type: "industries", title: "Built for the questions your customers actually ask.", sub: "Pre-built answers for the questions each industry gets most.", note: "DON'T SEE YOUR INDUSTRY? SUUPER LEARNS ANY BUSINESS FROM THE CONTENT YOU PROVIDE." },
    {
      type: "stats", items: [
        { value: "1,200+", label: "businesses using Suuper" },
        { value: "96%", label: "questions answered without a human" },
        { value: "42s", label: "average first reply, day or night" },
        { value: "60 sec", label: "from snippet to live assistant" }
      ], note: "DATA FROM 1,200+ ACTIVE ACCOUNTS · SEP 2026"
    },
    {
      type: "quote", text: "It answers what my staff used to answer thirty times a day. We stopped losing evening orders the first week.",
      name: "Hira Ahmed", role: "Owner, online clothing store", src: img("studio-portrait"), photo: img("boutique-closing"),
      metric: "-40%", metricLabel: "missed messages"
    },
    { type: "faq", title: "Frequently asked questions.", items: faqs.slice(0, 7) },
    finalCta
  ],

  chat: [
    {
      type: "hero", title: "Your website just got an AI sales team.",
      body: "Train Suuper on your business knowledge and put an AI assistant directly on your website. It answers questions, qualifies leads, recommends next steps and hands complex conversations to your team.",
      ctas: [btn("Build my AI assistant", "/signup", "dark"), btn("See a live demo", "/chat#demo", "outlineDark")],
      mock: { status: "WEBSITE CHAT", sub: "Trained on 14 sources · Online", ask: "Do you have the gold kurta in medium?", reply: "Yes, 3 left in medium — PKR 4,500. Want me to hold one?", time: "REPLIED IN 0.9s" },
      orbit: orbit(["PRICES", "POLICIES", "FAQS", "DELIVERY", "HOURS", "PRODUCTS"])
    },
    {
      type: "groups", kicker: "CAPABILITIES", title: "What it knows. What it does.",
      groups: [
        { label: "WHAT IT KNOWS", items: ["Products and services", "Prices and packages", "Policies and returns", "Opening hours", "Delivery areas and fees", "FAQs", "Documents and guides", "Website content", "Custom business instructions"] },
        { label: "WHAT IT DOES", items: ["Answers questions", "Captures names and contact details", "Qualifies leads", "Recommends products or services", "Handles common objections", "Collects requirements", "Routes conversations", "Hands off to humans", "Creates follow-up context"] }
      ]
    },
    { type: "flow", kicker: "CHAT FLOW", title: "Chat flow", steps: steps(["Visitor", "Question", "Retrieve knowledge", "Answer", "Qualify", "Capture", "Handoff / action"]) },
    { type: "demo", id: "demo", kicker: "LIVE DEMO", title: "See Suuper reply like a real assistant.", body: "It answers from your own content, captures the lead, and passes the tricky ones to your team on WhatsApp." },
    {
      type: "split", flip: true, kicker: "HUMAN HANDOFF", title: "When it matters, a human takes over.",
      body: "Suuper passes the conversation to your team with the context they need — what the customer asked, what the AI answered, what the customer wants and any information already collected.",
      points: [], ctas: [btn("Set up human handoff", "/signup", "primary")],
      photo: img("support-workspace"), mock: mock("HANDING OFF · WHATSAPP", "I want 50 units wholesale.", "Connecting you with Ali from sales now.")
    },
    {
      type: "cards", kicker: "CHANNELS", title: "One knowledge base. One inbox. Multiple customer channels.",
      items: [
        card("WEB", "Website chat", "A trained widget on every page of your site."),
        card("WA", "WhatsApp", "Instant replies on the official WhatsApp Business API."),
        card("IG", "Instagram DMs", "Answers DMs and story replies in seconds."),
        card("FB", "Messenger", "Page and ad enquiries answered with the same knowledge.")
      ], min: 230
    },
    { type: "flow", kicker: "KNOWLEDGE ONBOARDING", title: "Knowledge onboarding", sub: "Upload documents or point Suuper at your website. Test the answers before you put the assistant live.", steps: steps(["Upload", "Crawl", "Clean", "Index", "Test", "Publish"]) },
    {
      type: "flow", kicker: "SETUP", title: "Three steps. Sixty seconds.", steps: steps(["Train your AI", "Copy one snippet", "Go live"]),
      detail: [
        { n: "01", t: "Train your AI", b: "Upload documents or point Suuper at your website." },
        { n: "02", t: "Copy one snippet", b: "Paste a single line into your site. No developer needed." },
        { n: "03", t: "Go live", b: "Reply instantly, capture leads and hand off complex conversations." }
      ]
    },
    Object.assign({}, finalCta, { ctas: [btn("Build your AI assistant", "/signup", "dark"), btn("Talk to sales", "/demo", "outlineDark")] })
  ],

  connectors: [
    {
      type: "hero", title: "Connect AI to the tools that run your business.",
      body: "AI becomes powerful when it can do more than talk. Suuper Connectors give your AI controlled access to the tools, APIs and systems where work happens.",
      ctas: [btn("Explore connectors", "/connectors#cats", "dark"), btn("Build a connection", "/signup", "outlineDark")],
      mock: { status: "CONNECTED", sub: "Slack · Asana · CRM · PostgreSQL", ask: "New lead: Ahmed Traders", reply: "Researched, added to CRM and posted to #sales.", time: "4 TOOL ACTIONS · 3.1s" },
      orbit: orbit(["SLACK", "ASANA", "JIRA", "NOTION", "POSTGRESQL", "WEBHOOKS", "TEAMS", "MCP"])
    },
    { type: "story", kicker: "WHY CONNECTORS", lines: ["Your CRM knows your customers.", "Slack knows your conversations.", "Asana knows your projects.", "Your database knows your data.", "Your AI should not have to work in isolation."] },
    {
      type: "connectors", id: "cats", kicker: "CATEGORIES", title: "Connector categories",
      cats: [
        { name: "Communication", tools: ["Slack", "WhatsApp", "Email", "Microsoft Teams"] },
        { name: "Work management", tools: ["Asana", "Jira", "Trello", "Notion"] },
        { name: "Social", tools: ["Instagram", "Messenger"] },
        { name: "CRM", tools: ["Customer systems", "Sales systems"] },
        { name: "Data", tools: ["PostgreSQL", "MongoDB", "MySQL", "SQL Server"] },
        { name: "APIs", tools: ["REST", "Webhooks", "Custom endpoints"] },
        { name: "Internal tools", tools: ["Private business applications"] },
        { name: "MCP", tools: ["Model Context Protocol"] }
      ]
    },
    { type: "connector", kicker: "CONNECTION FLOW", title: "Give AI only the access it needs.", sub: "Choose which actions the connection can perform. You can review and change permissions later." },
    { type: "flow", kicker: "AUTOMATION EXAMPLE", title: "From new lead to follow-up, without copy-paste.", steps: steps(["New lead", "AI research", "CRM update", "Personalized message", "Sales alert", "Follow-up task"]) },
    {
      type: "split", kicker: "MCP", title: "Model Context Protocol, made useful.",
      body: "MCP gives AI a standard way to interact with tools. Suuper turns those connections into usable business capabilities that can be combined inside assistants, apps, workflows and agents.",
      points: [], ctas: [btn("Connect your tools", "/signup", "primary")],
      photo: img("coding-workspace"), mock: mock("MCP · TOOL CALL", "crm.search(company: 'Ahmed Traders')", "1 record found · last contact 12 days ago")
    },
    Object.assign({}, finalCta, { title: "AI is more useful when it can do something.", body: "Connect a tool and give your AI something new to work with.", ctas: [btn("Connect your tools", "/signup", "dark"), btn("Talk to sales", "/demo", "outlineDark")] })
  ],

  apps: [
    {
      type: "hero", title: "Build the software your business actually needs.",
      body: "Not every business process fits inside an off-the-shelf tool. Build AI-powered applications around the way your team actually works.",
      ctas: [btn("Build an app", "/signup", "dark"), btn("Explore app templates", "/apps#templates", "outlineDark")],
      mock: { status: "APP · LEAD QUALIFIER", sub: "Inputs · Knowledge · Logic · Tools · Outputs", ask: "New lead: Ahmed Traders, Lahore", reply: "Scored 82/100. CRM checked. Outreach message ready for review.", time: "RUN COMPLETE · 6.4s" },
      orbit: orbit(["SALES", "HR", "ONBOARDING", "RESEARCH", "SUPPORT", "APPROVALS"])
    },
    { type: "chips", kicker: "APP TYPES", title: "What you can build.", items: ["Sales apps", "Lead qualification apps", "Client intake apps", "HR apps", "Employee onboarding apps", "Offboarding apps", "Research apps", "Support apps", "Approval apps", "Operations apps", "Internal knowledge apps", "Reporting apps"] },
    { type: "flow", kicker: "APP BUILDER", title: "Describe it. Suuper builds it.", steps: steps(["Describe", "Generate", "Connect", "Test", "Publish", "Improve"]) },
    { type: "builder", kicker: "TRY IT", title: "Describe the process in plain words.", prompt: "Build an application that receives new sales leads, researches the company, scores the opportunity, checks our CRM and prepares a personalized outreach message." },
    {
      type: "table", kicker: "APP ANATOMY", title: "What every Suuper app is made of.", head: ["PART", "WHAT IT DEFINES"],
      rows: [["Inputs", "What enters the application."], ["Knowledge", "What the application knows."], ["Logic", "How it decides what to do."], ["Tools", "What it can access."], ["Human steps", "Where approval is required."], ["Outputs", "What the application produces."], ["Actions", "What happens in external systems."]]
    },
    {
      type: "cards", id: "templates", kicker: "TEMPLATES", title: "Don't build from zero.", sub: "Start with an app built for the job you need. Customize it with your knowledge, tools and rules.",
      items: [
        card("01", "Lead Qualifier", "Research and score inbound leads.", "/signup", "Use template"),
        card("02", "Client Onboarding", "Collect information and create required records.", "/signup", "Use template"),
        card("03", "Employee Onboarding", "Coordinate documents, accounts, tasks and notifications.", "/signup", "Use template"),
        card("04", "Research Desk", "Turn a research question into a structured report.", "/signup", "Use template"),
        card("05", "Support Desk", "Classify, answer and route customer requests.", "/signup", "Use template"),
        card("06", "Approval Desk", "Collect evidence and route decisions to the right person.", "/signup", "Use template")
      ], min: 300
    },
    Object.assign({}, finalCta, { title: "Some software doesn't exist because your process is too specific.", body: "Build it with Suuper.", ctas: [btn("Build an app", "/signup", "dark"), btn("Talk to sales", "/demo", "outlineDark")] })
  ],

  agents: [
    {
      type: "hero", title: "Build your AI workforce.",
      body: "Create specialized AI agents for the work you want AI to own. Give each agent a mission, knowledge, tools and permissions.",
      ctas: [btn("Build an agent", "/signup", "dark"), btn("Explore agent templates", "/agents#examples", "outlineDark")],
      mock: { status: "AGENT · SALES", sub: "Goal · Knowledge · Tools · Permissions", ask: "Goal: qualify every inbound lead within 5 minutes", reply: "12 researched · 5 qualified · CRM updated · 2 awaiting approval", time: "RUNNING · 3 TOOLS" },
      orbit: orbit(["SALES", "SUPPORT", "RESEARCH", "HR", "OPERATIONS", "MARKETING", "FINANCE"])
    },
    {
      type: "table", kicker: "ANATOMY", title: "An agent needs", head: ["COMPONENT", "QUESTION"],
      rows: [["Goal", "What outcome is this agent responsible for?"], ["Knowledge", "What should it know?"], ["Tools", "What systems can it access?"], ["Instructions", "How should it behave?"], ["Permissions", "What is it allowed to do?"], ["Memory", "What context should it retain?"], ["Actions", "What can it execute?"], ["Escalation", "When must a human take over?"]]
    },
    { type: "flow", kicker: "LIFECYCLE", title: "Agent lifecycle", steps: steps(["Define", "Teach", "Equip", "Test", "Deploy", "Observe", "Improve"]) },
    {
      type: "cards", id: "examples", kicker: "AGENT EXAMPLES", title: "What would you give an AI employee?",
      items: [
        card("SAL", "Sales Agent", "Research, qualify, prepare outreach and update CRM.", "/signup", "Use template"),
        card("SUP", "Support Agent", "Answer, troubleshoot, resolve and escalate.", "/signup", "Use template"),
        card("RES", "Research Agent", "Gather information, compare findings and produce reports.", "/signup", "Use template"),
        card("HR", "HR Agent", "Answer employee questions and coordinate HR workflows.", "/signup", "Use template"),
        card("OPS", "Operations Agent", "Monitor processes and handle exceptions.", "/signup", "Use template"),
        card("MKT", "Marketing Agent", "Support campaign research, briefs and execution.", "/signup", "Use template"),
        card("FIN", "Finance Agent", "Process information, flag anomalies and prepare summaries.", "/signup", "Use template")
      ], min: 260
    },
    {
      type: "split", kicker: "SAFETY", title: "Let AI move fast. Keep people in control.",
      body: "Define what the agent can access and what it can do. Require human approval for sensitive actions.",
      points: ["Per-agent tool access", "Approval for sensitive actions", "Every action logged"], ctas: [btn("Build an agent", "/signup", "primary")],
      photo: img("refund-approval"), mock: mock("APPROVAL REQUIRED", "Send refund of PKR 12,000?", "Waiting for Ayesha · Approve / Reject")
    },
    Object.assign({}, finalCta, { title: "Build your next AI employee.", body: "Give an agent a goal, knowledge, tools and permissions. Then let it handle the work.", ctas: [btn("Build an agent", "/signup", "dark"), btn("Talk to sales", "/demo", "outlineDark")] })
  ],

  workflows: [
    {
      type: "hero", title: "If you can describe the process, you can automate it.",
      body: "Suuper turns repeatable work into intelligent workflows that can use knowledge, tools, apps and agents.",
      ctas: [btn("Automate a workflow", "/signup", "dark"), btn("See examples", "/workflows#examples", "outlineDark")],
      mock: { status: "WORKFLOW · SALES", sub: "Trigger · Context · Reasoning · Actions", ask: "Trigger: lead arrives from website", reply: "Researched → scored 74 → CRM updated → outreach sent → follow-up scheduled", time: "7 STEPS · 0 ERRORS" },
      orbit: orbit(["TRIGGER", "CONTEXT", "REASONING", "ACTIONS", "APPROVAL", "RESULT"])
    },
    { type: "flow", kicker: "WORKFLOW BUILDER", title: "Every workflow, the same building blocks.", steps: steps(["Trigger", "Context", "AI reasoning", "Tool actions", "Conditions", "Human approval", "Result"]) },
    {
      type: "flows", id: "examples", kicker: "EXAMPLES", title: "Real business processes, automated.",
      rows: [
        { name: "Sales flow", steps: ["Lead arrives", "Research", "Qualify", "Score", "CRM", "Outreach", "Alert", "Follow-up"] },
        { name: "Customer onboarding", steps: ["Signup", "Collect data", "Verify", "Create records", "Notify team", "Send welcome", "Schedule follow-up"] },
        { name: "Employee onboarding", steps: ["New employee", "Collect documents", "Create accounts", "Assign tasks", "Notify teams", "Send material", "Track completion"] },
        { name: "Offboarding", steps: ["Departure", "Notify HR", "Revoke access", "Collect assets", "Update systems", "Notify teams", "Close process"] },
        { name: "Research flow", steps: ["Question", "Plan", "Search / connect sources", "Analyze", "Cross-check", "Draft", "Human review", "Report"] }
      ]
    },
    {
      type: "split", kicker: "HUMAN-IN-THE-LOOP", title: "Automation does not mean giving up control.",
      body: "When a decision is sensitive, uncertain or high-impact, Suuper can pause and ask a person to approve or reject the next action.",
      points: [], ctas: [btn("Automate a workflow", "/signup", "primary")],
      photo: img("workflow-meeting"), mock: mock("AI NEEDS YOUR APPROVAL", "Revoke access for 3 systems?", "Paused · Approve / Reject")
    },
    Object.assign({}, finalCta, { title: "Start with one workflow. Then scale.", body: "You don't need to automate the whole business on day one.", ctas: [btn("Automate a workflow", "/signup", "dark"), btn("Book a demo", "/contact", "outlineDark")] })
  ],

  inbox: [
    {
      type: "hero", title: "One place for every customer conversation.",
      body: "Bring website chat, WhatsApp, Instagram and Messenger into one workspace. Give your team context instead of scattered conversations.",
      ctas: [btn("Open inbox", "/app", "dark"), btn("Start free", "/signup", "outlineDark")],
      mock: { status: "ONE INBOX", sub: "4 channels · 38 open · 6 need a human", ask: "Sana · Instagram · price of the green kurta?", reply: "AI ACTIVE → QUALIFIED → handed to Ali with context", time: "HANDOFF IN 1 CLICK" },
      orbit: orbit(["WEBSITE", "WHATSAPP", "INSTAGRAM", "MESSENGER"])
    },
    { type: "inbox", kicker: "PRODUCT", title: "Your team sees the whole picture." },
    { type: "flow", kicker: "CONVERSATION STATES", title: "Every conversation has a clear status.", steps: steps(["New", "AI active", "Qualified", "Human handoff", "Resolved"]) },
    { type: "chips", kicker: "INBOX FEATURES", title: "Everything your team needs to finish the job.", items: ["Unified conversations", "Channel labels", "AI / human status", "Lead details", "Conversation history", "Handoff", "Internal notes", "Assignment", "Tags", "Search", "Conversation analytics"] },
    {
      type: "split", flip: true, kicker: "HANDOFF PANEL", title: "Don't make your team read the whole conversation.",
      body: "Give them the context they need to finish the job.",
      points: ["Customer and intent", "Relevant conversation summary", "What the AI already did", "The next step for the human"], ctas: [btn("Open inbox", "/app", "primary")],
      photo: img("unified-support-desk"), mock: mock("HANDOFF · SANA K.", "Intent: buy 2 kurtas, size M", "Next step: confirm delivery to DHA")
    },
    Object.assign({}, finalCta, { ctas: [btn("Open inbox", "/app", "dark"), btn("Talk to sales", "/demo", "outlineDark")] })
  ],

  knowledge: [
    {
      type: "hero", title: "Teach Suuper your business.",
      body: "Your AI is only useful when it understands your business. Give it the information your team already uses and keep that knowledge organized in one place.",
      ctas: [btn("Add knowledge", "/signup", "dark"), btn("See how it learns", "/knowledge#flow", "outlineDark")],
      mock: { status: "KNOWLEDGE CONNECTED", sub: "14 sources · 1,240 answers indexed", ask: "What's your return policy?", reply: "7 days, unworn, with receipt. Source: returns-policy.pdf", time: "SOURCE-AWARE ANSWER" },
      orbit: orbit(["PDFS", "WEBSITE", "FAQS", "POLICIES", "CATALOGS", "PRICE LISTS", "DATABASES"])
    },
    { type: "chips", kicker: "KNOWLEDGE SOURCES", title: "Add what your team already uses.", items: ["PDFs", "Documents", "Website pages", "FAQs", "Policies", "Product catalogs", "Price lists", "Internal guides", "Structured data", "Connected databases"] },
    { type: "flow", id: "flow", kicker: "KNOWLEDGE WORKFLOW", title: "From document to trusted answer.", steps: steps(["Add source", "Process", "Index", "Test", "Publish"]) },
    { type: "chips", kicker: "ANSWER QUALITY CONTROLS", title: "Answers you can stand behind.", items: ["Source-aware answers", "Fallback when information is missing", "Business-specific instructions", "Knowledge versioning", "Test questions", "Content refresh", "Channel-specific behavior"] },
    {
      type: "split", kicker: "TRUST", title: "No generic answers when the right answer is in your business knowledge.",
      body: "If Suuper doesn't have enough information to answer confidently, it should say so and follow your configured escalation path.",
      points: [], ctas: [btn("Add knowledge", "/signup", "primary")],
      photo: img("paperwork-to-digital"), mock: mock("FALLBACK", "Do you deliver to Gwadar?", "I don't have that yet — connecting you with the team.")
    },
    Object.assign({}, finalCta, { title: "Add knowledge to make your AI more useful.", body: "Add your website or upload your first document.", ctas: [btn("Add knowledge", "/signup", "dark"), btn("Talk to sales", "/demo", "outlineDark")] })
  ],

  analytics: [
    {
      type: "hero", title: "See what your AI is doing.",
      body: "Know which questions customers ask, which conversations become leads, where humans step in and what your AI is saving your team from doing manually.",
      ctas: [btn("View analytics", "/app", "dark"), btn("Start free", "/signup", "outlineDark")],
      mock: { status: "THIS WEEK", sub: "1,482 conversations · 91% AI resolution", ask: "Most asked question?", reply: "Delivery to Lahore — asked 212 times.", time: "INSIGHT · UPDATED HOURLY" },
      orbit: orbit(["RESOLUTION", "HANDOFFS", "LEADS", "TIME SAVED", "CHANNELS"])
    },
    { type: "analytics", kicker: "DASHBOARD", title: "Your conversations, measured." },
    { type: "chips", kicker: "DASHBOARD METRICS", title: "Everything you can track.", items: ["Total conversations", "AI resolution rate", "Human handoff rate", "Lead capture rate", "Average response time", "Channel volume", "Top questions", "Unanswered questions", "Conversion / outcome tracking", "Agent runs", "Workflow success rate", "Tool actions"] },
    { type: "story", kicker: "INSIGHT", lines: ["Your conversations are telling you what your customers want.", "Suuper turns those conversations into operational insight."] },
    Object.assign({}, finalCta, { ctas: [btn("View analytics", "/app", "dark"), btn("Talk to sales", "/demo", "outlineDark")] })
  ],

  industries: [
    {
      type: "hero", title: "Built for the questions your customers actually ask.",
      body: "Don't see your industry? Suuper learns any business from the content you provide.",
      ctas: [btn("Start with your industry", "/signup", "dark"), btn("Talk to sales", "/demo", "outlineDark")],
      mock: { status: "INDUSTRY TEMPLATES", sub: "Ecommerce · Clinics · Real estate · Restaurants · Gyms · Agencies · Local", ask: "AC repair in Gulberg today?", reply: "Yes — share your address and a time that suits you.", time: "REPLIED IN 1.1s" },
      orbit: orbit(["ECOMMERCE", "CLINICS", "REAL ESTATE", "RESTAURANTS", "GYMS", "AGENCIES", "LOCAL"])
    },
    { type: "split", kicker: "ECOMMERCE", title: "Answer product questions before they become abandoned carts.", body: "", points: ["Sizing", "Stock", "Delivery", "Returns", "Product recommendations", "Order questions", "Lead capture"], ctas: [btn("Build my store assistant", "/signup", "primary")], photo: img("warehouse-packing"), mock: mock("STORE · WIDGET", "Is medium in stock?", "Yes, 3 left — PKR 4,500.") },
    { type: "split", flip: true, kicker: "CLINICS", title: "Turn questions into appointments.", body: "", points: ["Opening hours", "Services", "Availability", "Booking requests", "Preparation instructions", "Common questions"], ctas: [btn("Build my clinic assistant", "/signup", "primary")], photo: img("clinic-reception"), mock: mock("CLINIC · WHATSAPP", "Any slot tomorrow?", "11:30am or 4pm. Shall I book one?") },
    { type: "split", kicker: "REAL ESTATE", title: "From property question to viewing.", body: "", points: ["Property matching", "Availability", "Location questions", "Price questions", "Viewing requests", "Lead qualification"], ctas: [btn("Build my property assistant", "/signup", "primary")], photo: img("apartment-viewing"), mock: mock("PROPERTY · INSTAGRAM", "3-bed in DHA?", "2 available. Viewing Saturday?") },
    { type: "split", flip: true, kicker: "RESTAURANTS", title: "Let customers ask. Let AI handle the first response.", body: "", points: ["Menu questions", "Opening hours", "Reservations", "Orders", "Delivery", "Location"], ctas: [btn("Build my restaurant assistant", "/signup", "primary")], photo: img("bistro-reservations"), mock: mock("RESTAURANT · MESSENGER", "Table for 6 tonight?", "8:30pm is free. Name for the booking?") },
    { type: "split", kicker: "GYMS & COACHES", title: "Turn questions about memberships into members.", body: "", points: ["Packages", "Pricing", "Schedules", "Trials", "Trainer information", "Lead capture"], ctas: [btn("Build my gym assistant", "/signup", "primary")], photo: img("gym-floor"), mock: mock("GYM · WEBSITE", "Monthly fee?", "PKR 6,000. First week free — want a trial?") },
    { type: "split", flip: true, kicker: "AGENCIES", title: "Qualify inbound leads before they reach your team.", body: "", points: ["Service questions", "Budget qualification", "Lead research", "Meeting requests", "CRM updates", "Follow-up"], ctas: [btn("Build my agency assistant", "/signup", "primary")], photo: img("creative-studio"), mock: mock("AGENCY · WEBSITE", "Do you run Meta ads?", "Yes. What's your monthly budget?") },
    { type: "split", kicker: "LOCAL SERVICES", title: "Get the details you need before the call.", body: "", points: ["Service type", "Location", "Urgency", "Job details", "Quote request", "Scheduling"], ctas: [btn("Automate my enquiries", "/signup", "primary")], photo: img("hvac-technician"), mock: mock("SERVICES · WHATSAPP", "AC repair in Gulberg?", "Today 3–5pm. What's the AC model?") },
    finalCta
  ],

  pricing: [
    { type: "pricing", title: "Choose a plan that fits your business.", sub: "Start small and scale when AI starts paying for itself. Pay yearly before the offer ends and get 12 months for the price of 10." },
    { type: "roi", title: "Count what silence costs you.", sub: "Move the sliders to estimate how much revenue could be recovered from enquiries nobody answers in time.", cta: "Calculate my opportunity" },
    { type: "faq", title: "Frequently asked questions.", items: faqs },
    finalCta
  ],

  security: [
    {
      type: "hero", title: "AI that works with your business. Without losing control of it.",
      body: "Suuper is designed around access, permissions, human oversight and visibility.",
      ctas: [btn("Talk to sales", "/demo", "dark"), btn("Start free", "/signup", "outlineDark")],
      mock: { status: "PERMISSIONS", sub: "Read · Search · Create · Update · Send · Trigger", ask: "Agent requests: CRM · Update", reply: "Allowed for Sales Agent. Approval required above PKR 10,000.", time: "LOGGED TO AUDIT TRAIL" },
      orbit: orbit(["ACCESS", "PERMISSIONS", "APPROVAL", "AUDIT", "ROLES"])
    },
    { type: "chips", kicker: "CONTROL", title: "You decide what AI can do.", items: ["Define what each assistant or agent can access.", "Choose which tools can be connected.", "Control actions and permissions.", "Require human approval for sensitive actions.", "Review activity and outcomes."] },
    {
      type: "split", kicker: "TRUST ARCHITECTURE", title: "Your data. Your rules. Your AI.",
      body: "Suuper makes it clear what information an AI can access, what tools it can use and what actions it is allowed to take.",
      points: [], ctas: [btn("Talk to sales", "/demo", "primary")],
      photo: img("access-management"), mock: mock("AUDIT LOG", "Support Agent · refund.create", "Blocked · needs approval from Owner")
    },
    {
      type: "cards", kicker: "ENTERPRISE ROADMAP", title: "On the roadmap.", sub: "Published as each capability ships and is documented.",
      items: [card("SOON", "SSO", ""), card("SOON", "RBAC", ""), card("SOON", "Audit logs", ""), card("SOON", "Workspace controls", ""), card("SOON", "Advanced API security", ""), card("SOON", "Private / controlled deployment options", ""), card("SOON", "Data retention controls", "")], min: 220
    },
    Object.assign({}, finalCta, { title: "Let AI move fast. Keep people in control.", body: "Talk to us about access, permissions and approvals for your team.", ctas: [btn("Talk to sales", "/demo", "dark"), btn("Start free", "/signup", "outlineDark")] })
  ],

  about: [
    {
      type: "hero", title: "We believe software should work for people.",
      body: "Businesses spend too much time moving information between systems, answering repetitive questions and manually operating processes.",
      ctas: [btn("Talk to us", "/contact", "dark"), btn("Start free", "/signup", "outlineDark")],
      mock: { status: "OUR MISSION", sub: "Built in Pakistan", ask: "What is Suuper?", reply: "An AI layer that understands how your business works and helps it work better.", time: "SINCE 2025" },
      orbit: orbit(["KNOWLEDGE", "CONTEXT", "TOOLS", "PERMISSIONS", "WORKFLOWS", "ACTION"])
    },
    { type: "story", kicker: "WHY WE BUILT IT", lines: ["AI changes what's possible.", "But AI alone isn't enough.", "AI needs knowledge. Context. Tools. Permissions. Workflows. Action.", "That's why we built Suuper."] },
    {
      type: "split", kicker: "MISSION", title: "Make every business capable of operating with AI.",
      body: "A future where every business has an AI layer that understands how it works and helps it work better.",
      points: [], ctas: [btn("Talk to us", "/contact", "primary")],
      photo: img("strategy-session"), mock: mock("VISION", "Where is this going?", "Every business, with its own AI layer.")
    },
    {
      type: "cards", kicker: "WHAT WE BELIEVE", title: "What we believe.",
      items: [
        card("01", "Context first", "AI should know the context before it acts."),
        card("02", "Outcomes", "Automation should create outcomes, not just move data."),
        card("03", "Keep your tools", "Businesses should not have to replace their tools to use AI."),
        card("04", "People in control", "People should stay in control of important decisions."),
        card("05", "Day-one value", "AI should be useful on day one, not after months of implementation.")
      ], min: 220
    },
    { type: "story", kicker: "THE SUUPER STORY", lines: ["Teach AI what your business knows.", "Connect it to the tools your team already uses.", "Turn your processes into AI-powered apps and workflows.", "Build agents that can take ownership of specific jobs.", "Then let AI do the work — while keeping people in control when it matters."] },
    Object.assign({}, finalCta, { title: "One platform. One intelligent layer.", body: "Your business, on autopilot. That's Suuper.", ctas: [btn("Talk to us", "/contact", "dark"), btn("Start free", "/signup", "outlineDark")] })
  ],

  resources: [
    {
      type: "hero", title: "Learn what to automate next.",
      body: "Practical guides for turning repetitive business work into AI-powered workflows.",
      ctas: [btn("Explore resources", "/resources#articles", "dark"), btn("Start free", "/signup", "outlineDark")],
      mock: { status: "NEW GUIDE", sub: "Website AI Chatbot Setup Guide", ask: "How long does it take?", reply: "About 10 minutes from reading to live assistant.", time: "FREE DOWNLOAD" },
      orbit: orbit(["AI FOR BUSINESS", "AUTOMATION", "AGENTS", "MCP", "SALES", "HR"])
    },
    { type: "chips", kicker: "CATEGORIES", title: "Browse by topic.", items: ["AI for business", "Automation", "AI agents", "MCP & integrations", "Customer support", "Sales", "HR", "Operations", "Research"] },
    {
      type: "cards", kicker: "FREE DOWNLOADS", title: "Kits, templates and calculators.",
      items: [
        card("PDF", "50 business processes you can automate with AI", "", "/signup", "Download"),
        card("KIT", "AI Automation Starter Kit for Pakistani Businesses", "", "/signup", "Download"),
        card("ROI", "Customer Enquiry ROI Calculator", "", "/pricing", "Open calculator"),
        card("TPL", "AI Agent Planning Template", "", "/signup", "Download"),
        card("CHK", "MCP Connector Checklist", "", "/signup", "Download"),
        card("GDE", "Website AI Chatbot Setup Guide", "", "/signup", "Download")
      ], min: 280
    },
    {
      type: "cards", id: "articles", kicker: "ARTICLES", title: "Latest from the blog.",
      items: [
        card("SALES", "How to Build an AI Sales Assistant for Your Website", "", "/resources", "Read article"),
        card("AGENTS", "What Is an AI Agent?", "", "/resources", "Read article"),
        card("MCP", "MCP Explained for Business Teams", "", "/resources", "Read article"),
        card("SUPPORT", "10 Customer Questions Your Website Should Answer Automatically", "", "/resources", "Read article"),
        card("HR", "How to Automate Employee Onboarding", "", "/resources", "Read article"),
        card("WHATSAPP", "How to Connect WhatsApp to Your AI Workflow", "", "/resources", "Read article"),
        card("SMB", "How Small Businesses Can Use AI Without Replacing Their Existing Tools", "", "/resources", "Read article")
      ], min: 280
    },
    finalCta
  ],

  contact: [
    {
      type: "contact", title: "Show us one thing your team does manually.", sub: "We'll show you where AI can take it.",
      questions: ["Where do customer enquiries arrive?", "What questions does your team answer repeatedly?", "Where is your business knowledge stored?", "Which tools do employees move information between?", "Which process causes the most repetitive work?", "Where do leads get lost?", "What requires human approval?", "What would you automate first if you had an AI employee?"]
    },
    {
      type: "flow", kicker: "WHAT YOUR DEMO COVERS", title: "A demo built around your business.", steps: steps(["Your pain", "Your knowledge", "Real answer", "Lead captured", "Handoff", "Tool connected", "Workflow", "Agent", "Analytics", "First deployment"]),
      detail: [
        { n: "01", t: "Your current pain", b: "We start with what your team does manually today." },
        { n: "02", t: "Your knowledge", b: "We connect or import your knowledge." },
        { n: "03", t: "A real answer", b: "The AI answers a real business question." },
        { n: "04", t: "A captured lead", b: "We show a lead being captured." },
        { n: "05", t: "Human handoff", b: "We show how your team takes over." },
        { n: "06", t: "A connected tool", b: "We connect one of your tools." },
        { n: "07", t: "A workflow", b: "We trigger a workflow." },
        { n: "08", t: "An agent", b: "We show an agent performing a task." },
        { n: "09", t: "Analytics and controls", b: "We show what you can measure and control." },
        { n: "10", t: "Your first deployment", b: "We close with the smallest useful first deployment." }
      ]
    },
    Object.assign({}, finalCta, { title: "Start with one workflow. Then scale.", body: "You don't need to automate the whole business on day one.", ctas: [btn("Start free", "/signup", "dark"), btn("Explore use cases", "/industries", "outlineDark")] })
  ]
};

const Y = (t: string) => ({ t, on: true });
const N = (t: string) => ({ t, on: false });

/** Paid plans shown as cards on the pricing page; Free has its own strip and Enterprise its own block. */
export const plans: Plan[] = [
  {
    name: "Starter", n: 500, desc: "Add AI to one website today.", replies: "2,000",
    groups: [
      { label: "ASSISTANT", items: [Y("1 AI assistant"), Y("Knowledge base upload"), Y("Website widget"), Y("Suuper badge removed")] },
      { label: "CHANNELS", items: [Y("Website"), N("WhatsApp + Instagram (add-on)"), N("Messenger (add-on)")] },
      { label: "TEAM", items: [Y("Email lead alerts"), N("Human handoff"), N("Analytics"), Y("1 seat")] }
    ]
  },
  {
    name: "Growth", n: 2999, desc: "Growing businesses with real traffic.", replies: "15,000",
    groups: [
      { label: "ASSISTANT", items: [Y("3 AI assistants"), Y("Knowledge base upload"), Y("Website widget"), Y("Suuper badge removed")] },
      { label: "CHANNELS", items: [Y("Website"), Y("WhatsApp + Instagram"), N("Messenger (add-on)")] },
      { label: "TEAM", items: [Y("Lead capture & alerts"), Y("Human handoff"), Y("Analytics"), Y("3 seats")] }
    ]
  },
  {
    name: "Pro", n: 7999, desc: "High-volume stores and clinics.", replies: "50,000",
    groups: [
      { label: "ASSISTANT", items: [Y("10 AI assistants"), Y("Knowledge base upload"), Y("Website widget"), Y("Suuper badge removed")] },
      { label: "CHANNELS", items: [Y("Website"), Y("WhatsApp + Instagram"), Y("Messenger")] },
      { label: "TEAM", items: [Y("Lead capture & alerts"), Y("Human handoff"), Y("Analytics"), Y("Priority support"), Y("6 seats")] }
    ]
  },
  {
    name: "Agency", n: 19999, desc: "Run Suuper for every client.", replies: "Custom", ribbon: "FOR AGENCIES",
    groups: [
      { label: "ASSISTANT", items: [Y("Unlimited assistants"), Y("Unlimited client workspaces"), Y("White-label widget")] },
      { label: "CHANNELS", items: [Y("Website"), Y("WhatsApp + Instagram"), Y("Messenger")] },
      { label: "TEAM", items: [Y("Team seats & roles"), Y("Human handoff"), Y("Client analytics"), Y("Priority support")] }
    ]
  }
];

export const billingCycles: BillingCycle[] = [
  { key: "monthly", label: "Monthly", discount: 0 },
  { key: "quarterly", label: "Quarterly", discount: 0.1, badge: "−10%" },
  { key: "yearly", label: "Yearly", discount: 1 / 6, badge: "−17%" }
];

export const enterpriseItems = [
  "Custom AI reply volume", "Unlimited assistants and seats", "SSO and role-based access", "Audit logs and data retention controls",
  "Dedicated success manager", "Guided onboarding and training", "Uptime SLA and priority support", "Invoice billing in PKR or USD"
];

export const payMethods = ["Visa", "Mastercard", "JazzCash", "Easypaisa", "Raast", "Bank transfer"];

// Mega-menus in the header.
export const productGroups: MegaGroup[] = [
  { label: "Talk to customers", items: ["/chat", "/inbox"] },
  { label: "Connect your stack", items: ["/connectors", "/knowledge"] },
  { label: "Build & automate", items: ["/apps", "/workflows"] },
  { label: "Act & measure", items: ["/agents", "/analytics"] }
];
export const productImages: Record<string, string> = {
  "/chat": img("boutique-assistant"), "/inbox": img("unified-support-desk"), "/connectors": img("coding-workspace"), "/knowledge": img("paperwork-to-digital"),
  "/apps": img("welcoming-team"), "/workflows": img("workflow-meeting"), "/agents": img("sunrise-tasks"), "/analytics": img("multiscreen-workspace")
};
export const industryGroups: MegaGroup[] = [
  { label: "Commerce & hospitality", items: ["ecommerce", "restaurants"] },
  { label: "Health & services", items: ["clinics", "gyms", "local"] },
  { label: "Property & sales", items: ["realestate", "sales", "marketing"] }
];
export const industryChips: Record<string, string[]> = {
  ecommerce: ["Sizing & stock", "Delivery", "Returns", "Order capture", "Wholesale leads"],
  restaurants: ["Menu questions", "Reservations", "Timings", "Delivery"],
  clinics: ["Appointments", "Timings", "Services", "Booking requests"],
  gyms: ["Packages", "Schedules", "Trial sign-ups", "Follow-ups"],
  local: ["Service type", "Location", "Urgency", "Quote ranges", "Visits"],
  realestate: ["Listing match", "Viewings", "Budget", "Location"],
  sales: ["Lead scoring", "Research", "CRM updates", "Meetings"],
  marketing: ["Campaign enquiries", "Client briefs", "Lead routing"]
};
export const resourceTiles: ResourceTile[] = [
  { label: "Articles", href: "/resources#articles", color: "teal", icon: "M4 4h16v16H4z M8 8h8 M8 12h8 M8 16h5" },
  { label: "Blog", href: "/blog", color: "peach", icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" },
  { label: "Changelog", href: "/changelog", color: "mint", icon: "M12 8v4l3 3 M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z", isNew: true },
  { label: "Workflows", href: "/workflows", color: "teal", icon: "M5 6h4v4H5z M15 14h4v4h-4z M9 8h3a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2" },
  { label: "Security", href: "/security", color: "peach", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" },
  { label: "About", href: "/about", color: "mint", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0" },
  { label: "Contact", href: "/contact", color: "teal", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
  { label: "Pricing", href: "/pricing", color: "peach", icon: "M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z M7 7h.01" },
  { label: "Careers", href: "/careers", color: "teal", icon: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" },
  { label: "Partners", href: "/partners", color: "peach", icon: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M23 21v-2a4 4 0 0 0-3-3.9" },
  { label: "Status", href: "/status", color: "teal", icon: "M22 12h-4l-3 9L9 3l-3 9H2" },
  { label: "Help", href: "/help", color: "mint", icon: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3 M12 17h.01" }
];

export const footer: FooterColumn[] = [
  { title: "PRODUCT", links: [["AI Chat", "/chat"], ["Connectors", "/connectors"], ["Apps", "/apps"], ["Agents", "/agents"], ["Workflows", "/workflows"], ["One Inbox", "/inbox"], ["Knowledge base", "/knowledge"], ["Analytics", "/analytics"]] },
  { title: "INDUSTRIES", links: [["Ecommerce", "/industries"], ["Clinics", "/industries"], ["Real estate", "/industries"], ["Restaurants", "/industries"], ["Gyms & coaches", "/industries"], ["Agencies", "/industries"], ["Local services", "/industries"]] },
  { title: "COMPANY", links: [["About", "/about"], ["Careers", "/careers"], ["Partners", "/partners"], ["Security", "/security"], ["Contact", "/contact"], ["Book a demo", "/demo"]] },
  { title: "RESOURCES", links: [["Blog", "/blog"], ["Help center", "/help"], ["Changelog", "/changelog"], ["System status", "/status"], ["ROI calculator", "/pricing"], ["Sign in", "/login"]] }
];


const indCopy: Record<string, [string, string, string[]]> = {
  ecommerce: ["store owners", "Suuper answers sizing, stock, delivery and returns questions on your store, WhatsApp and Instagram, then hands serious buyers to your team.", ["Shopper asks", "Checks catalog", "Price & stock", "Reserves item", "Captures contact", "Team confirms"]],
  clinics: ["clinics", "Patients ask about timings, services and availability at all hours. Suuper answers and collects booking requests for your front desk.", ["Patient asks", "Checks services", "Shares availability", "Collects details", "Booking request", "Front desk confirms"]],
  realestate: ["property agents", "Suuper matches buyers to listings, answers location and price questions and books viewings.", ["Buyer asks", "Matches listings", "Shares details", "Qualifies budget", "Books viewing", "Agent follows up"]],
  restaurants: ["restaurants", "Menu, timings, reservations and delivery questions answered instantly, even during the dinner rush.", ["Guest asks", "Checks menu & hours", "Answers or books", "Confirms party size", "Reservation logged", "Host notified"]],
  gyms: ["gyms and coaches", "Suuper explains packages, schedules and trials, and turns interest into trial sign-ups.", ["Prospect asks", "Shares packages", "Answers schedule", "Offers trial", "Captures contact", "Coach follows up"]],
  agencies: ["agencies", "Qualify inbound leads, answer service questions and route the right enquiries to your team with research attached.", ["Lead arrives", "Answers services", "Qualifies budget", "Researches company", "Updates CRM", "Books meeting"]],
  local: ["local service businesses", "Get service type, location, urgency and job details before anyone picks up the phone.", ["Customer asks", "Identifies service", "Collects location", "Captures job details", "Shares quote range", "Schedules visit"]]
};
const kmap: Record<string, string> = { "ECOMMERCE": "ecommerce", "CLINICS": "clinics", "REAL ESTATE": "realestate", "RESTAURANTS": "restaurants", "GYMS & COACHES": "gyms", "AGENCIES": "agencies", "LOCAL SERVICES": "local" };
pages.industries.forEach((s) => {
  if (s.type !== "split" || !kmap[s.kicker]) return;
  const key = kmap[s.kicker];
  const ic = indCopy[key];
  const firstCta = s.ctas[0];
  s.ctas = [firstCta, btn("See the full page", "/industries/" + key, "outline")];
  pages["ind-" + key] = [
    { type: "hero", pill: "Industries · " + s.kicker.toLowerCase(), pillHref: "/industries", title: s.title, body: ic[1],
      ctas: [btn(firstCta.label, "/signup", "dark"), btn("Talk to sales", "/demo", "outlineDark")], micro: "FREE PLAN · LIVE IN 60 SECONDS",
      mock: { status: s.kicker + " ASSISTANT", sub: s.mock.label, ask: s.mock.ask, reply: s.mock.reply, time: "REPLIED IN 1.1s" },
      orbit: orbit(s.points.slice(0, 6).map((p) => p.toUpperCase())) },
    { type: "chips", kicker: "WHAT SUUPER HANDLES", title: "The questions your customers ask most.", items: s.points },
    { type: "flow", kicker: "HOW IT WORKS", title: "From question to outcome.", steps: steps(ic[2]) },
    { type: "split", flip: true, kicker: "HUMAN HANDOFF", title: "Your team steps in when it matters.",
      body: "When a conversation needs a person, Suuper passes it on with the customer's details, intent and what the AI already answered.",
      points: ["Customer details captured", "Intent and context summarised", "Routed to the right person", "Full chat history attached"],
      ctas: [btn("Set up handoff", "/signup", "primary")], photo: s.photo, mock: mock("HANDOFF", s.mock.ask, "Passing you to the team with full context.") },
    { type: "roi", title: "Count what silence costs you.", sub: "Estimate the revenue recovered from enquiries nobody answers in time.", cta: "Calculate my opportunity" },
    { type: "faq", title: "Questions from " + ic[0] + ".", items: faqs.slice(0, 6) },
    Object.assign({}, finalCta, { ctas: [btn(firstCta.label, "/signup", "dark"), btn("Talk to sales", "/demo", "outlineDark")] })
  ];
});

export const articles: Article[] = [
  { slug: "sales-assistant", tag: "SALES", read: "6 MIN READ", photo: img("boutique-assistant"), title: "How to Build an AI Sales Assistant for Your Website",
    lead: "A website assistant that sells needs three things: the right knowledge, a clear goal and a way to hand serious buyers to your team.",
    sections: [
      ["Start with the questions you already answer", "Pull the last month of WhatsApp chats, emails and DMs. The same twenty questions usually cover most of what customers ask: price, stock, delivery, timings and returns."],
      ["Give it your real knowledge", "Upload your price list, policies and FAQs, and point Suuper at your website. Answers come from your content, so they stay accurate when prices change."],
      ["Decide what a good outcome looks like", "For a store it might be an order or a reserved item. For a clinic it's a booked appointment. Set that as the assistant's goal so every conversation moves toward it."],
      ["Capture the lead at the right moment", "Ask for a name and number once the customer shows intent, not in the first message. Suuper stores it with the conversation so your team has context."],
      ["Hand off the serious buyers", "Wholesale orders, complaints and custom requests should reach a person. Set handoff rules and the full conversation goes with it."],
      ["Test, then publish", "Ask the questions your customers ask. When the answers look right, paste one snippet into your site and go live."]
    ] },
  { slug: "ai-agent", tag: "AGENTS", read: "4 MIN READ", photo: img("sunrise-tasks"), title: "What Is an AI Agent?",
    lead: "An AI agent is an AI worker configured with a goal, knowledge, tools, instructions, permissions and actions.",
    sections: [
      ["More than a chatbot", "A chatbot answers. An agent can also act: research a company, update a CRM record, send a message or start a workflow."],
      ["The parts of an agent", "Goal, knowledge, tools, instructions, permissions, memory, actions and escalation. Each one answers a simple question about what the agent is for and what it may do."],
      ["Where agents work well", "Repeatable jobs with clear outcomes: qualifying leads, resolving common support requests, preparing research summaries or flagging anomalies."],
      ["Keeping people in control", "Give each agent only the access it needs, and require approval for sensitive actions like refunds or account changes."]
    ] },
  { slug: "mcp", tag: "MCP", read: "5 MIN READ", photo: img("coding-workspace"), title: "MCP Explained for Business Teams",
    lead: "MCP, the Model Context Protocol, gives AI a standard way to interact with tools.",
    sections: [
      ["Why it matters", "Without a standard, every AI-to-tool connection is custom work. MCP makes connections reusable, so adding a new tool is closer to plugging something in."],
      ["What it looks like in practice", "An agent asks your CRM for a customer record, posts a summary to Slack and creates a task in Asana, each through a defined connection."],
      ["Permissions come first", "Each connection exposes specific actions such as read, search, create, update, send or trigger. You choose which ones the AI may use."],
      ["How Suuper uses it", "Suuper turns MCP connections into business capabilities you can combine inside assistants, apps, workflows and agents."]
    ] },
  { slug: "customer-questions", tag: "SUPPORT", read: "4 MIN READ", photo: img("unified-support-desk"), title: "10 Customer Questions Your Website Should Answer Automatically",
    lead: "If your team answers it more than five times a week, your website should answer it instantly.",
    sections: [
      ["Price and availability", "1. How much is it? 2. Is it in stock? Answer with the current price and size or slot availability."],
      ["Delivery", "3. Do you deliver to my city? 4. How long will it take? 5. How much is delivery?"],
      ["Policies", "6. What's your return or cancellation policy? 7. Do you offer cash on delivery or instalments?"],
      ["Timings and location", "8. Are you open today? 9. Where are you located?"],
      ["The handoff question", "10. Can someone call me? This is a buying signal. Capture the number and route it to your team straight away."]
    ] },
  { slug: "employee-onboarding", tag: "HR", read: "5 MIN READ", photo: img("welcoming-team"), title: "How to Automate Employee Onboarding",
    lead: "Onboarding is a checklist that touches HR, IT, managers and the new hire. That makes it a strong first workflow.",
    sections: [
      ["Map the steps", "New employee, collect documents, create accounts, assign tasks, notify teams, send material and track completion."],
      ["Automate the handoffs", "Most delay happens between teams. A workflow can notify IT, request accounts and remind the manager without anyone chasing."],
      ["Keep approvals human", "System access and equipment requests can pause for a person to approve before the workflow continues."],
      ["Answer new-hire questions", "Connect your handbook to an internal assistant so new employees get answers on day one."]
    ] },
  { slug: "whatsapp", tag: "WHATSAPP", read: "4 MIN READ", photo: img("support-workspace"), title: "How to Connect WhatsApp to Your AI Workflow",
    lead: "WhatsApp is where many customers already message you. Connecting it to Suuper means those messages get the same trained answers as your website.",
    sections: [
      ["Use the official API", "Suuper connects through the WhatsApp Business API, where it is enabled for your plan or account."],
      ["One knowledge base", "Your WhatsApp assistant answers from the same knowledge as your website widget, so customers get consistent answers."],
      ["Route the right conversations", "Set rules so high-value or sensitive conversations reach a person, with the full chat attached."],
      ["Trigger workflows from chats", "A qualified WhatsApp lead can create a CRM record, alert sales and schedule a follow-up automatically."]
    ] },
  { slug: "small-business", tag: "SMB", read: "5 MIN READ", photo: img("og-boutique"), title: "How Small Businesses Can Use AI Without Replacing Their Existing Tools",
    lead: "You don't need a new stack to use AI. You need AI that works with the tools you already have.",
    sections: [
      ["Start where the work piles up", "Usually that's customer messages. A website or WhatsApp assistant is the fastest way to see value."],
      ["Connect, don't migrate", "Keep your spreadsheet, CRM or project board. Connect them so AI can read and update them with your permission."],
      ["Automate one process", "Pick the process that causes the most repetitive work and automate it end to end before adding more."],
      ["Measure what changed", "Track replies, leads and time saved. Expand when the numbers justify it."]
    ] }
];
articles.forEach((a, i) => {
  const next = articles[(i + 1) % articles.length];
  pages["article-" + a.slug] = [
    { type: "article", tag: a.tag, read: a.read, title: a.title, lead: a.lead, photo: a.photo,
      sections: a.sections.map((s) => ({ h: s[0], p: s[1] })), nextTitle: next.title, nextHref: "/resources/" + next.slug },
    Object.assign({}, finalCta, { title: "Try it on your own business.", body: "Start free and have your first assistant answering in about a minute." })
  ];
});
const artSection = pages.resources.find((x) => x.id === "articles");
const artCards = artSection?.type === "cards" ? artSection.items : [];
artCards.forEach((cd) => { const a = articles.find((x) => x.title === cd.title); if (a) cd.href = "/resources/" + a.slug; });

const legal = (title: string, sections: [string, string][]): Section[] => [{ type: "legal", title, updated: "OCTOBER 2026", sections: sections.map((s) => ({ h: s[0], p: s[1] })) }];
pages.privacy = legal("Privacy policy", [
  ["What we collect", "Account details, business content you upload, conversation data we process on your behalf, and product usage data."],
  ["How we use it", "To provide and improve the service, reply to your customers on your behalf, give support and meet legal obligations."],
  ["Your customers' data", "Conversation data belongs to you. We process it to deliver replies, handoffs and analytics for your workspace."],
  ["Sharing", "We use vetted providers for hosting, AI processing and messaging channels. We do not sell personal data."],
  ["Retention and deletion", "You can delete knowledge sources and conversations from your workspace at any time."],
  ["Contact", "Questions about privacy: privacy@suuper.cc"]
]);
pages.terms = legal("Terms of service", [
  ["Using Suuper", "These terms apply to your use of the Suuper website, dashboard and assistants."],
  ["Your account", "You are responsible for your workspace, your team's access and keeping credentials secure."],
  ["Your content", "You keep ownership of the knowledge and data you add. You give us permission to process it to run the service."],
  ["Acceptable use", "Don't use Suuper for spam, unlawful content or to mislead customers about who they are talking to."],
  ["Plans and billing", "Paid plans renew each billing period until cancelled. Prices are shown in PKR and include applicable taxes."],
  ["Changes and termination", "We may update these terms with notice. You can close your workspace at any time."]
]);
pages.refunds = legal("Refund policy", [
  ["Free plan", "The Free plan costs nothing and needs no card."],
  ["14-day money back", "If a paid plan doesn't work for you, ask within 14 days of your first payment for a full refund of that payment."],
  ["Cancelling", "Cancel from Billing at any time. Your plan stays active until the end of the period you've paid for."],
  ["Add-ons", "Channel add-ons follow the same 14-day policy from the date they are added."],
  ["How to request a refund", "Email billing@suuper.cc from your account email with your workspace name."]
]);

pages.notfound = [
  { type: "hero", title: "This page went quiet.", body: "The link may be old or mistyped. Everything else on Suuper is still answering.",
    ctas: [btn("Back to home", "/", "dark"), btn("Talk to us", "/contact", "outlineDark")], micro: "ERROR 404", orbit: orbit(["404", "NOT FOUND", "TRY HOME", "OR PRICING"]) }
];

pages.pricing.splice(1, 0, {
  type: "compare", kicker: "COMPARE PLANS", title: "Everything in each plan.", cols: ["Free", "Starter", "Growth", "Pro", "Agency", "Enterprise"],
  // One-item rows are group headings.
  rows: [
    ["Usage"],
    ["AI replies / month", "200", "2,000", "15,000", "50,000", "Custom", "Custom"],
    ["AI assistants", "1", "1", "3", "10", "Unlimited", "Unlimited"],
    ["Knowledge base upload", "—", "✓", "✓", "✓", "✓", "✓"],
    ["Channels"],
    ["Website widget", "✓", "✓", "✓", "✓", "✓", "✓"],
    ["WhatsApp + Instagram", "Add-on", "Add-on", "✓", "✓", "✓", "✓"],
    ["Messenger", "Add-on", "Add-on", "Add-on", "✓", "✓", "✓"],
    ["Team & handoff"],
    ["Lead capture & alerts", "—", "✓", "✓", "✓", "✓", "✓"],
    ["Human handoff", "—", "—", "✓", "✓", "✓", "✓"],
    ["Analytics", "—", "—", "✓", "✓", "✓", "✓"],
    ["Team seats", "1", "1", "3", "6", "Unlimited", "Unlimited"],
    ["Branding"],
    ["Suuper badge removed", "—", "✓", "✓", "✓", "✓", "✓"],
    ["White-label widget", "—", "—", "—", "—", "✓", "✓"],
    ["Client workspaces", "—", "—", "—", "—", "Unlimited", "Unlimited"],
    ["Security & support"],
    ["SSO & audit logs", "—", "—", "—", "—", "—", "✓"],
    ["Uptime SLA", "—", "—", "—", "—", "—", "✓"],
    ["Support", "Community", "Email", "Email", "Priority", "Priority", "Dedicated"]
  ]
});

// ===== v3: conversion, trust, live product, new pages =====
export const caseStudies: CaseStudy[] = [
  { slug: "kurta-house", co: "Kurta House", ind: "ECOMMERCE · LAHORE", photo: img("boutique-closing"), metric: "+31%", ml: "evening orders in 60 days", quote: "We stopped losing orders after 9pm. The assistant closes them while we sleep." },
  { slug: "smilecare", co: "SmileCare Dental", ind: "CLINICS · KARACHI", photo: img("clinic-reception"), metric: "2.4×", ml: "booking requests per week", quote: "Patients get timings and prices at midnight. Our front desk starts the day with a full list." },
  { slug: "basil-ember", co: "Basil & Ember", ind: "RESTAURANTS · ISLAMABAD", photo: img("bistro-reservations"), metric: "-68%", ml: "phone calls during dinner rush", quote: "Reservations and menu questions moved to WhatsApp. The phone finally stopped ringing at 8pm." }
];

export const trust: TrustSection = {
  type: "trust", id: "trust", title: "Security your IT team will sign off on.",
  items: [["SOC 2", "TYPE II · IN AUDIT"], ["GDPR", "DPA AVAILABLE"], ["AES-256", "ENCRYPTED AT REST"], ["TLS 1.3", "ENCRYPTED IN TRANSIT"], ["SSO", "SAML · GOOGLE"], ["99.9%", "UPTIME SLA"]]
};
const proof: ProofSection = {
  type: "proof", id: "reviews", kicker: "REVIEWS", title: "Rated highly by owners who stopped missing messages.",
  badges: [{ name: "G2", score: "4.8 / 5", icon: "g2" }, { name: "Capterra", score: "4.7 / 5" }, { name: "Product Hunt", score: "4.9 / 5", icon: "producthunt" }],
  app: { kicker: "MOBILE APP", title: "Your inbox, in your pocket.", body: "Take over any conversation, approve actions and get alerts for hot leads from your phone." }
};
const logos: LogosSection = { type: "logos" };

const pick = <T extends Section["type"]>(list: Section[], t: T) => list.filter((x): x is Extract<Section, { type: T }> => x.type === t);
const oldHome = pages.home;
pages.home = [
  {
    type: "ohero", id: "top", badge: "Join 1,200+ businesses", title: "Your business, ", accent: "on autopilot.",
    body: "Suuper connects your knowledge, tools, workflows and AI agents into one intelligent operating layer.",
    links: [btn("START FREE", "/signup", "primary"), btn("SEE HOW IT WORKS", "/#how", "outline")],
    ctas: [btn("Start free, no card needed", "/signup", "primary"), btn("Book a demo", "/contact", "outline")],
    tagline: "THE AI OPERATING LAYER\nFOR MODERN BUSINESS",
    phone: {
      name: "Bella Bistro", status: "AI assistant · online", channel: "WHATSAPP", time: "TODAY · 11:48 PM",
      lines: [
        { me: true, text: "Table for 4 tonight at 8? 🙏" },
        { me: false, text: "8:00 PM is open for 4. Shall I book it under your name?" },
        { me: true, text: "Yes please, Sara" },
        { me: false, check: "✓ Booked", text: "Table for 4 · 8:00 PM · Sara. See you tonight!" }
      ]
    },
    channels: [{ label: "WHATSAPP", icon: "whatsapp" }, { label: "INSTAGRAM", icon: "instagram" }, { label: "MESSENGER", icon: "messenger" }]
  },
  logos,
  ...pick(oldHome, "marquee"),
  {
    type: "numstats", id: "why", kicker: "WHY SUUPER", note: "SAMPLE FIGURES", title: "Every tool works alone, until Suuper ", accent: "connects them.",
    aside: "YOUR KNOWLEDGE IS IN DOCUMENTS. YOUR CUSTOMERS ARE ON WHATSAPP. YOUR LEADS ARE IN YOUR CRM. SUUPER PUTS THEM TO WORK TOGETHER.",
    items: [
      { value: "1,200+", label: "businesses live", sub: "Across retail, clinics, restaurants and services." },
      { value: "96%", label: "answered without a human", sub: "Routine questions resolved in the first reply." },
      { value: "24/7", label: "always on", sub: "Every channel covered, including nights and weekends." },
      { value: "60s", label: "to go live", sub: "One snippet. No developer needed." }
    ]
  },
  {
    type: "bento", id: "platform", kicker: "THE PLATFORM", title: "Everything AI can do for you, in ", accent: "one place.",
    sub: "Connect your knowledge. Connect your tools. Build your AI. Automate the work.",
    items: [
      { title: "AI Chat", body: "Answers, qualifies and converts from your own knowledge.", href: "/chat", tone: "paper", icon: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" },
      { title: "Inbox", body: "Website, WhatsApp, Instagram and Messenger in one place.", href: "/inbox", tone: "dark", icon: "M22 12h-6l-2 3h-4l-2-3H2 M5.5 5h13L22 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6z" },
      { title: "Connectors", body: "Give AI controlled access to Slack, CRMs, APIs and more.", href: "/connectors", tone: "dark", icon: "M9 7H6a5 5 0 0 0 0 10h3 M15 7h3a5 5 0 0 1 0 10h-3 M8 12h8" },
      { title: "Knowledge", body: "Docs, sites and policies, turned into answers.", href: "/knowledge", tone: "teal", icon: "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5" },
      { title: "Apps", body: "Turn any business process into software.", href: "/apps", tone: "peach", icon: "M3 3h7v7H3z M14 3h7v7h-7z M3 14h7v7H3z M14 14h7v7h-7z" },
      { photo: img("boutique-assistant"), ask: "“Do you ship to Lahore?”", answer: "Answered in 2s" },
      { title: "Workflows", body: "Describe a process once. Suuper runs it every time.", href: "/workflows", tone: "dark", icon: "M5 6h4v4H5z M15 14h4v4h-4z M9 8h3a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2" },
      { title: "Agents", body: "AI employees with goals, tools and permissions.", href: "/agents", tone: "teal", icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0" },
      { title: "Analytics", body: "See what customers ask and where revenue is lost.", href: "/analytics", tone: "dark", icon: "M3 3v18h18 M7 15l4-4 3 3 5-6" },
      { title: "Enterprise", body: "SSO, audit logs, custom limits and a dedicated team.", href: "/pricing", tone: "paper", icon: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" }
    ]
  },
  {
    type: "chdemo", id: "live", kicker: "LIVE DEMO", title: "One assistant. Every channel your customers use.",
    sub: "Pick a channel and watch the same AI answer in the right tone, then take the next step for you.",
    channels: [
      { key: "web", label: "Website", who: "Visitor on kurtahouse.pk", stat: "2.1s", action: "ORDER #2041 RESERVED · TEAM NOTIFIED",
        msgs: [{ ai: false, text: "Do you have the green kurta in medium?" }, { ai: true, text: "Yes, 6 left in medium. It's PKR 4,500 and ships to Lahore in 2 days." }, { ai: false, text: "Can I pay cash on delivery?" }, { ai: true, text: "Yes, COD is available. Shall I reserve one for you?" }] },
      { key: "whatsapp", label: "WhatsApp", who: "Ali · +92 300 ••• 412", stat: "1.4s", action: "LEAD SAVED TO HUBSPOT",
        msgs: [{ ai: false, text: "Assalam o alaikum, Karachi delivery kitne din mein?" }, { ai: true, text: "Walaikum assalam! Karachi mein 2 din, PKR 250 flat." }, { ai: false, text: "Theek hai, 2 pieces chahiye" }, { ai: true, text: "Zaroor. Sizes bata dein, main order tayyar kar deta hoon." }] },
      { key: "instagram", label: "Instagram", who: "@sana.styles replied to your story", stat: "1.8s", action: "ADDED TO RESTOCK LIST · 38 WAITING",
        msgs: [{ ai: false, text: "price for this one?" }, { ai: true, text: "That's the Noor set, PKR 6,800. Available in S to XL." }, { ai: false, text: "does it come in black" }, { ai: true, text: "Black is back in stock Friday. Want a DM the moment it lands?" }] },
      { key: "messenger", label: "Messenger", who: "Bilal R. via your Facebook page", stat: "2.4s", action: "HANDED OFF TO AYESHA · FULL CONTEXT",
        msgs: [{ ai: false, text: "I want to return an order" }, { ai: true, text: "Sorry about that. Can you share your order number?" }, { ai: false, text: "#1987" }, { ai: true, text: "Found it. It's inside the 14-day window, so I've passed it to Ayesha with the details." }] }
    ]
  },
  ...pick(oldHome, "flow"),
  {
    type: "wfanim", id: "builder", kicker: "WORKFLOW BUILDER", title: "Describe it once. Watch it run every time.",
    sub: "Type the process in plain words. Suuper turns it into steps, connects the tools and runs it on every new message.",
    prompt: "When a WhatsApp order comes in, check stock in Shopify, create the order and tell #sales on Slack.",
    nodes: [
      { tag: "TRIGGER", t: "New WhatsApp message", meta: "Any number", icon: "whatsapp" },
      { tag: "AI STEP", t: "Detect order intent", meta: "Confidence 0.94", icon: "" },
      { tag: "CHECK", t: "Stock in Shopify", meta: "6 in stock", icon: "shopify" },
      { tag: "ACTION", t: "Create order", meta: "Order #2041", icon: "stripe" },
      { tag: "NOTIFY", t: "Post to #sales", meta: "Slack", icon: "slack" }
    ],
    log: ["09:41:02  TRIGGER   WhatsApp message from Ali", "09:41:03  AI        Intent = order (0.94)", "09:41:03  SHOPIFY   Green kurta · M · 6 in stock", "09:41:04  ORDER     #2041 created · PKR 9,000", "09:41:04  SLACK     Posted to #sales"]
  },
  {
    type: "usecases", id: "usecases", kicker: "USE CASES", intro: "Suuper brings every channel your customers use into one system that answers, acts and improves.",
    title: "What can Suuper do for ", accent: "your business?",
    items: [
      { tag: "SUUPER SALES", title: "Sales: qualifies leads without anyone chasing them.", stat: "3x", statLabel: "more enquiries answered · sample", stat2: "<60s", stat2Label: "FIRST REPLY", body: "Suuper asks the right questions, scores the lead and books the next step, then updates your CRM.", href: "/agents" },
      { tag: "SUUPER SUPPORT", title: "Support: closes routine questions without escalations.", stat: "92%", statLabel: "questions resolved without a human · sample", stat2: "24/7", stat2Label: "COVERAGE", body: "Suuper answers on its own and hands the hard ones to the right person with the full conversation attached.", href: "/inbox" },
      { tag: "SUUPER OPS", title: "Operations: runs your workflows while you sleep.", stat: "14h", statLabel: "saved per person, per week · sample", stat2: "0", stat2Label: "COPY-PASTE", body: "Describe a process once. Suuper triggers it, gathers context, takes actions and asks for approval when needed.", href: "/workflows" },
      { tag: "SUUPER COMMERCE", title: "Commerce: answers stock, sizing and delivery, then takes the order.", stat: "-40%", statLabel: "missed messages · sample", stat2: "2s", stat2Label: "AVG. ANSWER", body: "Your price list, stock and delivery rules become instant answers on your website, WhatsApp and Instagram.", href: "/chat" }
    ]
  },
  {
    type: "slider", id: "before-after", kicker: "BEFORE / AFTER", title: "Same inbox. Very different night.", sub: "Drag the handle to see 11pm with and without Suuper.",
    rows: [
      { n: "Sana K.", ch: "Instagram", m: "price for this one?", t: "11:02 PM", r: "PKR 6,800, S to XL. Want me to hold one?" },
      { n: "Ali R.", ch: "WhatsApp", m: "Karachi delivery kitne din?", t: "11:09 PM", r: "2 din, PKR 250 flat. Order kar doon?" },
      { n: "Mehwish", ch: "Website", m: "Is medium in stock?", t: "11:15 PM", r: "Yes, 6 left in medium. Reserved for 24h." },
      { n: "Usman A.", ch: "Messenger", m: "Need 50 pieces for an event", t: "11:31 PM", r: "Wholesale lead scored 82. Sent to sales." },
      { n: "Hamza", ch: "WhatsApp", m: "COD available?", t: "11:48 PM", r: "Yes, cash on delivery is available." }
    ],
    before: "5 UNREAD · REPLIES TOMORROW", after: "5 ANSWERED · 2 ORDERS · 1 LEAD"
  },
  ...pick(oldHome, "split"),
  {
    type: "darkband", id: "workspace", kicker: "THE WORKSPACE", title: "Your whole customer operation on one screen.",
    sub: "AI handles the routine. Your team sees everything, steps in with one click and hands back when done.",
    points: [["One inbox", "Website, WhatsApp, Instagram and Messenger in a single queue."], ["AI copilot", "Drafted replies, customer history and next best action beside every chat."], ["Clean handoff", "Take over in one click. The AI waits, then picks up where you left off."]]
  },
  ...pick(oldHome, "roi"),
  ...pick(oldHome, "industries"),
  {
    type: "vs", id: "compare", kicker: "COMPARE", title: ["Why teams ", "switch", " to Suuper."],
    sub: "Chatbots talk. Helpdesks route. Suuper answers, acts and hands off when it matters.",
    cols: ["suuper", "Chatbot builders", "Helpdesk suites", "Hiring more staff"],
    rows: [
      ["Answers from your own knowledge", "✓", "✓", "Limited", "✓"],
      ["Website, WhatsApp, Instagram and Messenger in one inbox", "✓", "Limited", "✓", "—"],
      ["Takes actions in your tools", "✓", "—", "Limited", "✓"],
      ["Builds apps, workflows and agents", "✓", "—", "—", "—"],
      ["Human handoff with full context", "✓", "Limited", "✓", "—"],
      ["Works 24/7, including holidays", "✓", "✓", "—", "—"],
      ["Live in 60 seconds", "✓", "—", "—", "—"],
      ["Free plan", "✓", "Limited", "—", "—"]
    ],
    ctas: [btn("Start free", "/signup", "dark"), btn("Compare plans", "/pricing", "outlineDark")]
  },
  { type: "cases", id: "stories", kicker: "CUSTOMER STORIES", title: "Real businesses. Measurable results.", items: caseStudies },
  ...pick(oldHome, "quote"),
  {
    type: "vidtest", id: "videos", kicker: "IN THEIR WORDS", title: "Hear it from the owners.",
    items: [
      { name: "Hira Ahmed", role: "Owner, Kurta House", photo: img("studio-portrait"), dur: "0:48", q: "It answers what my staff used to answer thirty times a day. We stopped losing evening orders the first week, and I finally have my evenings back." },
      { name: "Faraz Malik", role: "Director, SmileCare Dental", photo: img("owner-1"), dur: "1:12", q: "We were missing patients who messaged after hours. Now every one of them gets an answer and a booking request lands in our sheet before we open." },
      { name: "Ayesha Noor", role: "Founder, Studio Noor", photo: img("owner-2"), dur: "0:56", q: "I run a small agency. Suuper qualifies every enquiry, so I only take calls with people who are ready to work with us." },
      { name: "Bilal Raza", role: "Owner, Iron Yard Gym", photo: img("owner-3"), dur: "0:39", q: "Trial sign-ups doubled because people get the package details the moment they ask, not two days later." }
    ]
  },
  proof,
  trust,
  ...pick(oldHome, "faq"),
  ...pick(oldHome, "cta")
];
const homeMarquee = pick(pages.home, "marquee")[0];
if (homeMarquee) homeMarquee.items = ["WEBSITE", "WHATSAPP", "INSTAGRAM", "MESSENGER", "SLACK", "ASANA", "NOTION", "HUBSPOT", "SALESFORCE", "GMAIL", "STRIPE", "ZAPIER", "SHOPIFY", "WORDPRESS", "TELEGRAM", "TIKTOK", "JIRA", "POSTGRESQL", "MONGODB", "REST APIS", "WEBHOOKS", "MCP"];

const hire: HireSection = {
  type: "hire", id: "vs-hire", kicker: "THE MATH", title: "Cheaper than one more hire.", sub: "Compare a full-time support rep with Suuper Growth covering the same inbox.",
  a: { label: "HIRING A SUPPORT REP", rows: [["Salary", "PKR 65,000"], ["Training & turnover", "PKR 8,000"], ["Hours covered", "48 / week"], ["Chats at once", "1"], ["Languages", "1–2"]], total: "PKR 73,000", per: "/month" },
  b: { label: "SUUPER GROWTH", rows: [["Plan", "PKR 2,999"], ["Setup", "PKR 0"], ["Hours covered", "168 / week"], ["Chats at once", "Unlimited"], ["Languages", "English, Urdu, Roman Urdu +"]], total: "PKR 2,999", per: "/month" },
  save: "≈ PKR 70,000 saved every month, with 3.5× the hours covered."
};
{
  const p = pages.pricing;
  p.splice(1, 0, logos, hire);
  const faqAt = p.findIndex((x) => x.type === "faq");
  p.splice(faqAt, 0, trust);
  p.splice(faqAt + 2, 0, proof);
}

pages.demo = [{ type: "book", points: ["A live build of your assistant on your own website content", "Pricing for your volume, including Enterprise and SSO", "Answers on security, data handling and handoff", "30 minutes, no slides"] }];

pages.changelog = [
  { type: "hero", title: "What's new in Suuper.", body: "New features, improvements and fixes, shipped every week.", ctas: [btn("Start free", "/signup", "dark"), btn("Subscribe to updates", "/changelog#subscribe", "outlineDark")], micro: "UPDATED OCT 14, 2026", orbit: orbit(["NEW", "IMPROVED", "FIXED", "WEEKLY"]) },
  { type: "changelog", items: [
    { d: "OCT 14, 2026", v: "v3.8", tag: "NEW", t: "WhatsApp Business API on every plan", b: "Connect your verified WhatsApp number from Settings → Channels. Templates, media and quick replies are supported out of the box.", img: img("unified-support-desk"), points: ["Official API with green-tick support", "Message templates for order updates", "Shared with your One Inbox"] },
    { d: "OCT 02, 2026", v: "v3.7", tag: "NEW", t: "Workflow builder from a single prompt", b: "Describe a process in plain words and Suuper drafts the trigger, steps and connected tools. Review, edit and publish.", img: img("workflow-meeting"), points: [] },
    { d: "SEP 24, 2026", v: "v3.6", tag: "IMPROVED", t: "Roman Urdu understanding", b: "Better intent detection for mixed English and Roman Urdu messages. Answer accuracy on our test set rose from 88% to 95%.", img: "", points: [] },
    { d: "SEP 11, 2026", v: "v3.5", tag: "NEW", t: "Copilot in the inbox", b: "Suggested replies, customer history and next best action appear beside every conversation your team takes over.", img: "", points: ["One-click insert", "Shows order history from Shopify"] },
    { d: "AUG 29, 2026", v: "v3.4", tag: "FIXED", t: "Instagram story replies", b: "Story replies with stickers now reach the inbox reliably and keep the story preview.", img: "", points: [] },
    { d: "AUG 15, 2026", v: "v3.3", tag: "IMPROVED", t: "Faster first reply", b: "Median first reply dropped to 1.2 seconds after moving retrieval closer to the model.", img: "", points: [] }
  ] },
  finalCta
];

pages.help = [{ type: "help",
  cats: [
    ["Getting started", "Create a workspace and go live in minutes.", "12", "M5 12h14 M12 5l7 7-7 7"],
    ["Channels", "Website widget, WhatsApp, Instagram, Messenger.", "18", "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"],
    ["Knowledge", "Upload docs, crawl your site, fix gaps.", "14", "M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z"],
    ["Workflows & agents", "Triggers, steps, approvals and permissions.", "21", "M5 6h4v4H5z M15 14h4v4h-4z M9 8h3a2 2 0 0 1 2 2v4a2 2 0 0 0 2 2"],
    ["Billing & plans", "Invoices, upgrades, refunds and add-ons.", "9", "M20.6 13.4l-7.2 7.2a2 2 0 0 1-2.8 0L2 12V2h10l8.6 8.6a2 2 0 0 1 0 2.8z"],
    ["Account & security", "Team roles, SSO, API keys and audit logs.", "11", "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"]
  ],
  articles: [
    ["Getting started", "Add the chat widget to your website"], ["Channels", "Connect your WhatsApp Business number"], ["Channels", "Reply to Instagram DMs and story replies"],
    ["Knowledge", "Why did the AI say it doesn't know?"], ["Knowledge", "Upload a price list as CSV"], ["Workflows & agents", "Require approval before a refund"],
    ["Billing & plans", "Change plan or switch to yearly billing"], ["Account & security", "Invite your team and set roles"], ["Getting started", "Test your assistant before publishing"],
    ["Workflows & agents", "Send qualified leads to HubSpot"], ["Account & security", "Turn on SSO for your workspace"], ["Billing & plans", "Request a refund"]
  ] }];

pages.careers = [
  { type: "hero", title: "Build the AI layer small businesses run on.", body: "We're a small team in Lahore and remote across Pakistan, shipping every week for businesses that never had software built for them.", ctas: [btn("See open roles", "/careers#roles", "dark"), btn("Life at Suuper", "/about", "outlineDark")], micro: "7 OPEN ROLES · LAHORE · REMOTE (PK)", orbit: orbit(["LAHORE", "REMOTE", "SHIP WEEKLY", "EQUITY"]) },
  { type: "cards", kicker: "HOW WE WORK", title: "Small team. Real ownership.", items: [
    card("01", "Talk to customers", "Everyone spends time in the inbox. You'll know the people you build for.", "/about", "About us"),
    card("02", "Ship weekly", "Small releases, fast feedback, a changelog we're proud of.", "/changelog", "See changelog"),
    card("03", "Own outcomes", "You own a problem end to end, from first sketch to customer result.", "/careers#roles", "Open roles"),
    card("04", "Grow with equity", "Every full-time hire gets equity, a learning budget and health cover.", "/careers#roles", "Open roles")
  ], min: 250 },
  { type: "jobs", id: "roles", kicker: "OPEN ROLES", title: "Find your seat.", items: [
    ["Senior Full-stack Engineer", "Engineering", "Lahore / Remote", "Full-time"], ["AI Engineer, Retrieval", "Engineering", "Remote (PK)", "Full-time"], ["Product Designer", "Product", "Lahore", "Full-time"],
    ["Product Manager, Channels", "Product", "Lahore", "Full-time"], ["Account Executive, SMB", "Sales", "Karachi", "Full-time"], ["Partnerships Lead", "Sales", "Lahore", "Full-time"], ["Customer Success Specialist", "Customer success", "Remote (PK)", "Full-time"]
  ] },
  finalCta
];

pages.partners = [
  { type: "hero", title: "Grow with Suuper.", body: "Earn recurring commission, resell to your clients or build an integration that thousands of businesses can use.", ctas: [btn("Become a partner", "/demo", "dark"), btn("Partner FAQ", "/partners#faq", "outlineDark")], micro: "30% RECURRING · 90-DAY COOKIE · MONTHLY PAYOUTS", orbit: orbit(["AFFILIATE", "AGENCY", "TECHNOLOGY", "30%"]) },
  { type: "cards", kicker: "PROGRAMS", title: "Three ways to partner.", items: [
    card("AFF", "Affiliate", "Share your link. Earn 30% of every payment for 12 months, paid monthly.", "/demo", "Join affiliates"),
    card("AGY", "Agency partner", "Build assistants for clients on the Agency plan with white-label and client workspaces.", "/pricing", "See Agency plan"),
    card("TEC", "Technology partner", "List your tool as a Suuper connector and reach businesses already automating.", "/connectors", "Explore connectors")
  ], min: 280 },
  { type: "stats", items: [{ value: "30%", label: "recurring commission" }, { value: "90 days", label: "cookie window" }, { value: "PKR 0", label: "to join" }, { value: "140+", label: "active partners" }], note: "SAMPLE PROGRAM TERMS" },
  { type: "faq", id: "faq", title: "Partner questions.", items: [["Who can join?", "Agencies, consultants, creators and software companies that work with small businesses."], ["How are payouts made?", "Monthly via bank transfer once your balance passes PKR 5,000."], ["Do I need to be technical?", "No. Affiliates only share a link. Agency partners get onboarding and templates."], ["Can I white-label Suuper?", "Yes, on the Agency plan the widget and client workspaces carry your brand."]] },
  finalCta
];

pages.status = [{ type: "status",
  comps: [
    { n: "AI replies", up: "99.99%", bad: [61] }, { n: "Website widget", up: "100%", bad: [] }, { n: "WhatsApp", up: "99.96%", bad: [34, 35] },
    { n: "Instagram & Messenger", up: "99.98%", bad: [12] }, { n: "Workflows", up: "99.97%", bad: [78] }, { n: "Dashboard & API", up: "100%", bad: [] }
  ],
  incidents: [["OCT 07, 2026", "WhatsApp delivery delays", "Resolved in 42 min. Messages queued and delivered in order."], ["SEP 12, 2026", "Elevated reply latency", "Resolved in 18 min after scaling the retrieval cluster."]] }];

pages.blog = pages.resources;

caseStudies.forEach((cs) => {
  pages["case-" + cs.slug] = [
    { type: "article", tag: "CUSTOMER STORY", read: cs.ind, title: cs.co + ": " + cs.metric + " " + cs.ml + ".", lead: cs.quote, photo: cs.photo,
      sections: [
        { h: "The problem", p: "Most enquiries arrived after hours on WhatsApp and Instagram. By morning, many customers had already bought elsewhere." },
        { h: "What they set up", p: "A Suuper assistant trained on their price list, policies and FAQs, connected to their website, WhatsApp and Instagram, with handoff to the team for anything complex." },
        { h: "The result", p: cs.metric + " " + cs.ml + ", with the team spending mornings on confirmed requests instead of catching up on messages." }
      ],
      nextTitle: "Read more customer stories", nextHref: "/#stories" },
    finalCta
  ];
});

footer.push({ title: "LEGAL", links: [["Privacy", "/privacy"], ["Terms", "/terms"], ["Refunds", "/refunds"]] });

// The design's "popularPlan" prop defaults to Pro.
export const popularPlan = "Pro";

export function getPage(key: string): Section[] | undefined {
  return Object.hasOwn(pages, key) ? pages[key] : undefined;
}

const reserved = new Set(["home", "industries", "resources", "notfound"]);
const prefixed = (k: string) => k.startsWith("ind-") || k.startsWith("article-") || k.startsWith("case-");
export const topLevelPages = Object.keys(pages).filter((k) => !reserved.has(k) && !prefixed(k));
export const industryPages = Object.keys(pages).filter((k) => k.startsWith("ind-")).map((k) => k.slice(4));
export const customerPages = Object.keys(pages).filter((k) => k.startsWith("case-")).map((k) => k.slice(5));
