# Suuper — Product, Pricing, Positioning & Growth Audit

_November 6, 2026 · scope: marketing site (this repo, live at suuper.cc) checked against the Suuper Business Pitch (Oct 26, 2026) and the public surface of app.suuper.cc._

---

## 0. Scope and limits (read first)

| Source | Available? | How it was used |
|---|---|---|
| Suuper Business Pitch (Oct 26, 2026) | Yes (`~/Downloads/Suuper — Business Pitch.pdf`) | Primary source for business model, pricing, roadmap and the "built and live" feature list |
| Marketing site repo (this repo) | Yes | Fully audited and changed |
| App repo (app.suuper.cc) | **No.** Not on this machine and not in any connected account | Not audited. Only public endpoints were probed |
| Stripe account | No access | Not audited, and nothing was changed |

**Consequence:** every statement below about what the *app* does is taken from the pitch and is **unverified in code**. Items marked _(pitch)_ should be confirmed against the app repo before they are used in paid advertising or sales contracts. Sections 3 (billing, entitlements, credit enforcement and webhooks) and 8 (feature classification) of the brief need the app repo to complete.

What the public probes show about app.suuper.cc:
- `/login` exists (200).
- `/signup`, `/register`, `/sign-up`, `/onboarding`, `/invite` and `/join` all return 404. **There is no public self-serve signup.**
- `/api/health` returns `{"status":"ok","service":"api-gateway"}`.
- There's no public pricing or plans endpoint.

---

## A. Product audit

### A1. Critical discrepancies found on the live marketing site (before this change)

The marketing site was recovered and redeployed on Nov 4–5. Its copy came from an earlier design file and **contradicted the pitch in ways that were false or misleading**:

| # | What the live site said | What the pitch says | Severity | Status |
|---|---|---|---|---|
| 1 | "1,200+ businesses", "96% answered without a human", "data from 1,200+ active accounts" | "We have no paying customers yet" | **Critical: fabricated** | Removed |
| 2 | Customer stories: Kurta House +31%, SmileCare 2.4×, Basil & Ember −68%; named video testimonials with photos | No customers | **Critical: fabricated** | Removed (pages redirect to `/`) |
| 3 | Ratings: G2 4.8, Capterra 4.7, Product Hunt 4.9; "4.9/5 from 300+ demos" | Not listed anywhere | **Critical: fabricated** | Removed |
| 4 | SOC 2 Type II "in audit", GDPR DPA, SSO, 99.9% uptime SLA, "All systems operational · 99.98%", a status page with invented incidents | Not in pitch | **Critical** | Removed |
| 5 | Instagram & Messenger shown as live channels, plans and add-ons | Phase 4 roadmap (Jul–Dec 2027) | High | Now marked "on our roadmap, not available yet" |
| 6 | White-label widget, unlimited client workspaces (Agency plan) | Phase 1, being built now | High | Now marked "in development" |
| 7 | Telegram barely mentioned | Live channel | Medium | Now a first-class channel |
| 8 | Pricing in PKR 500 / 2,999 / 7,999 / 19,999, free plan with 200 replies, add-ons PKR 300, yearly discounts, a monthly "launch offer" countdown that reset every month | $97 / $297 / $497 with AI credits; no free plan or yearly discount in pitch | **Critical** | Replaced with pitch plans (see C) |
| 9 | "Start free · no card" on every page → `/signup`, a **mock** onboarding that created no account; "Sign in" opened a **demo dashboard with invented data** | App has no self-serve signup; sign-in is at app.suuper.cc | **Critical: funnel dead end** | Fixed (see D) |
| 10 | Contact form, demo booking, newsletter and exit pop-up **discarded every submission**; demo booking said "You're booked, a calendar invite is on its way" | — | **Critical: leads lost** | Fixed: real capture + honest confirmations |
| 11 | Careers page with 7 open roles, equity and health cover; changelog with releases v3.3–v3.8; partner program "30% recurring, 90-day cookie, 140+ partners"; help centre with article counts | Not in pitch | High: unverifiable | Removed (redirects) |
| 12 | MCP, Asana, Jira, Notion, PostgreSQL, MongoDB, Teams connectors; "describe it and Suuper builds the app"; HR/finance agents | Pitch integrations: Slack, email, Shopify, HubSpot, Google | High | Rewritten to pitch list |
| 13 | Security page listed RBAC and audit logs as "coming soon" | Pitch: roles, audit log and API keys are live | Medium (undersold) | Fixed |
| 14 | Refund policy promised a 14-day money-back guarantee and a free plan | No policy in pitch | Medium (legal) | Replaced with neutral text; **needs owner review** |
| 15 | Mobile app download badges (App Store, Google Play) | Phase 4 roadmap | High | Removed |

### A2. Feature status (from the pitch, not verified in code)

| Capability | Pitch status | Marketing site now says |
|---|---|---|
| Bots with knowledge (docs, FAQs, websites, store catalogues), Playground | Built & live _(pitch)_ | Available |
| WhatsApp (Cloud API), Telegram, website widget | Built & live _(pitch)_ | Available |
| Conversations inbox with human takeover | Built & live _(pitch)_ | Available |
| Business apps: leads/CRM, tickets, appointments, expenses (records, dashboards, public forms) | Built & live _(pitch)_ | Available |
| AI agents with tools and schedules | Built & live _(pitch)_ | Available |
| Workflows and integrations (Slack, email, Shopify, HubSpot, Google) | Built & live _(pitch)_ | Available |
| Claude, GPT, Gemini, local models; BYOK | Built & live _(pitch)_ | Available |
| Plans, AI credits, usage tracking, Stripe billing | Built _(pitch)_; **Stripe keys not set** | Prices shown; checkout via demo call |
| Team roles, audit log, API keys | Built & live _(pitch)_ | Available |
| Suuper's own AI provider keys | **Blocked on setup** _(pitch)_ | — |
| One-click WhatsApp (Embedded Signup) | Planned, **blocked on Meta Tech Provider verification** | Planned |
| Agency login, client workspaces, branding/domain | Phase 1, in progress | In development |
| Wholesale pricing | Phase 1 | Offered to pilot agencies (manual) |
| Credit top-ups, Urdu/Roman Urdu packs, vertical templates | Phase 2, planned | Planned |
| Agency billing, template store, ROI reports, partner program | Phase 3, planned | Planned |
| Instagram, Messenger, AI phone calls, mobile app | Phase 4, planned | Planned |
| Public self-serve signup | **Not present** (404 on app) | Not offered; CTAs go to demo/pilot |

**Payment readiness:** not ready, per the pitch. Stripe keys aren't set, and Stripe doesn't onboard Pakistan-registered businesses directly (the pitch suggests a US/UK entity via Stripe Atlas, or a local provider). **Nobody can pay today**, which is the binding constraint on any November revenue goal.

---

## B. Positioning strategy

### B1. Decision: one homepage with two clear paths, plus a dedicated `/agencies` page

| Option | Product maturity | Pricing | November goal | Conversion complexity | Agency readiness | Verdict |
|---|---|---|---|---|---|---|
| 1. Unified home + two paths | Fits: business features are live, agency layer isn't | Works with retail plans and wholesale pilot | Captures both funnels | Medium (two CTAs) | Honest about what's in development | **Chosen** |
| 2. Business-first home + agency page | Fits | Fits | Under-weights the primary channel | Low | — | Close second |
| 3. Agency-first home + business page | Over-promises: no agency login or branding yet | Wholesale not productised | Agencies can't self-serve | Medium | **Not ready** | Rejected for now |

**Why:** the pitch's distribution strategy is agency-led, but the agency layer (one login, client workspaces, branding) is Phase 1 and not shipped. An agency-first homepage would sell what doesn't exist yet. The homepage therefore leads with the business outcome, which is true today and lets agencies picture what they'd resell. Agencies get an always-visible path: the announcement bar, a nav item, a home section, the pricing card, and a `/demo?for=agency` application. **Revisit when Phase 1 ships:** at that point the homepage should flip to agency-first (option 3).

### B2. Messaging (implemented)

- **Master brand:** *Suuper — AI employees for modern businesses.* Supporting line: *AI-powered customer conversations, business apps and automation, working together in one platform.*
- **Business hero:** *Your business has customers. Give them an AI employee.* Suuper answers every customer on WhatsApp, Telegram and your website in seconds, books appointments, captures every lead, and hands over to your team when it matters.
- **Agency:** *Launch your own AI services business.* Sell WhatsApp AI assistants and business apps to your clients and keep the monthly recurring revenue.
- **Narrative order on home:**
  1. Hero (WhatsApp booking at 11 pm)
  2. Two paths
  3. "One message, three outcomes" (the pitch's Sara example)
  4. Channels demo (WhatsApp / website / Telegram)
  5. Platform bento (the pitch's product table)
  6. Workflow example
  7. Before/after
  8. Agency section
  9. AI models and capped cost
  10. ROI estimator
  11. Industries
  12. Category comparison
  13. FAQ
  14. CTA
- **Differentiation** (the pitch's five points): WhatsApp-first, business apps behind chat, AI that acts, any model with capped cost, made to resell. Every one now appears on the home page.
- **Not used:** "GoHighLevel for WhatsApp markets" is a good investor and agency line, but naming a competitor on the public site invites comparison claims we can't back yet. Use it in sales decks.

---

## C. Pricing strategy

### C1. What the evidence says

- The pitch table ($97 / $297 / $497) is labelled *"Suuper plan prices and AI credit budgets, October 2026"*, sourced to *"Suuper's own platform at app.suuper.cc"*. That means they are **the plans configured in the app**, and they are **retail prices**: the pitch says agencies pay "a wholesale price below the $97 to $497 retail plans".
- The PKR plans on the old site have **no source in the pitch** and look like design-file placeholder copy.
- **Unverified:** whether those prices exist as Stripe Price objects, and whether credits and reply limits are enforced server-side. Confirm both in the app repo.

### C2. Model comparison

| | A. Premium unified (USD) | B. Regional PKR (999 / 3,999 / 9,999) | C. Two-sided: retail + agency wholesale |
|---|---|---|---|
| Fits pitch | Yes | No | **Yes (pitch's own model)** |
| AI cost coverage | Yes, 15–30% cap | **No**: PKR 999 ≈ $3.6; a 15% cap = $0.54 = 54 credits ≈ 1,800 GPT-6 Luna replies or 180 Claude Haiku replies | Yes |
| Covers WhatsApp costs | Billed by Meta to the business | Same | Same |
| Reaches Pakistani SMBs | Poorly direct; well via agencies | Well | **Well via agencies** (agency sets local retail) |
| Ops complexity | Low | Medium | Medium (wholesale manual until Phase 3) |
| Recommendation | Base layer | **Only as BYOK/local-model plans**, never including Suuper credits | **Adopt** |

### C3. Recommended architecture

1. **Retail (direct businesses):** keep the pitch plans. Starter $97, Growth $297, Pro $497, with credits 1,500 / 6,000 / 15,000, replies 2,000 / 10,000 / 50,000, bots 3 / 10 / 25, seats 3 / 10 / 25.
2. **Agency wholesale** (pilot agreements now, productised in Phase 3):
   - Suggested starting point: Starter $49, Growth $149, Pro $299 per client a month.
   - Same credit caps as retail.
   - Agency sets its own retail price (in PKR, AED or anything else).
   - The pitch's $150 average net per client is consistent with a mix weighted to Growth.
3. **Pakistan-affordable entry** (optional, later): a "Lite" plan at PKR 4,999–7,999 that **requires BYOK or local models** (zero Suuper AI credits). It sells channels, inbox, apps and workflows, not AI usage. Ship only after usage data shows infrastructure cost per workspace.

### C4. Estimated unit economics (assumptions, monthly, per workspace)

Assumptions:
- AI cost = full credit budget (worst case).
- Infrastructure and support allocation: $5 / $10 / $15.
- Payment fees about 3.5%.
- WhatsApp charges are paid by the business directly to Meta.

| Plan | Price | AI cap | Infra+support | Fees | Contribution | Margin (worst case) |
|---|---|---|---|---|---|---|
| Starter retail | $97 | $15 | $5 | $3.4 | **$73.6** | 76% |
| Growth retail | $297 | $60 | $10 | $10.4 | **$216.6** | 73% |
| Pro retail | $497 | $150 | $15 | $17.4 | **$314.6** | 63% |
| Starter wholesale | $49 | $15 | $5 | $1.7 | $27.3 | 56% |
| Growth wholesale | $149 | $60 | $10 | $5.2 | $73.8 | 50% |
| Pro wholesale | $299 | $150 | $15 | $10.5 | $123.5 | 41% |

Typical AI usage will be far below the cap: cheap models plus BYOK. Even so, **wholesale Pro is the plan to watch**. Either keep wholesale Pro at $299 or lower, or reduce its credit cap for agency clients.

### C5. Credits and usage

- Default new bots to the cheapest capable model.
- Expensive models (Opus-class) should be opt-in per bot.
- Enforce hard stops at 100% of credits server-side. Alert the owner (and the agency) at 80% and 100%.
- Credits don't roll over. Credit top-ups (Phase 2) should be priced at cost + 30–50%.
- Reply limits and credit limits must both be enforced. **Verify in the app**, and don't trust the client.

### C6. Free trial

| Option | Recommendation |
|---|---|
| Permanent free plan with Suuper credits | **No**: open-ended AI and infrastructure cost |
| 7–14 day trial, no card, **capped at about 300 credits**, cheapest model only, WhatsApp via test number | **Yes, once self-serve signup exists** |
| Free agency pilot workspace | **Yes** (pitch). Cap at 3 client workspaces and about 1,000 pooled credits during the pilot |
| Trial extension | Yes, manually, for businesses with ≥1 connected channel and ≥20 real conversations |

### C7. Upgrade, downgrade and migration

- **Upgrades** are immediate and prorated, and credits top up to the new plan's budget.
- **Downgrades** take effect at the end of the period. Block downgrades that would exceed new bot or seat limits until the extras are archived.
- **Existing customers:** the pitch says there are none as of Oct 26, so no grandfathering is needed. Confirm in Stripe and the app database. Pilot agencies keep wholesale pricing "for life" (pitch commitment), so record it per agency.

### C8. Checkout architecture (target, unverified)

- **Entity:** US/UK entity → Stripe. Products are Starter, Growth and Pro, with monthly prices in USD.
- **Checkout:** Stripe Checkout created **server-side** from an app session. Never let the client set the price or plan.
- **Entitlements:** a single server-side entitlements module maps plan to limits (credits, replies, bots, seats). Enforce it in the API gateway or usage service.
- **Webhooks:** idempotent handlers for `checkout.session.completed`, `customer.subscription.updated/deleted` and `invoice.paid/payment_failed`, with a test suite using Stripe's test clocks.
- **Pakistan:** add a local provider later, behind the same entitlements module.

---

## D. Implemented changes (this repo)

None of these are deployed yet. All are committed locally.

1. **Accuracy pass across every page** (`src/content/site.ts` rewritten; `src/content/demo.ts` and components adjusted). Everything in A1 is fixed. Industry and demo conversations are labelled "sample". The scripted chat bubble is labelled "Scripted demo · sample clothing store".
2. **Real lead capture:**
   - `POST /api/lead` (`src/app/api/lead/route.ts`) validates input, uses a honeypot and per-IP throttling, and appends to `data/leads.jsonl` (mode 600, git-ignored).
   - It emails `LEAD_NOTIFY_EMAIL` via the server's sendmail, if one is available.
   - It captures UTM, gclid and fbclid.
   - Wired into: contact form, demo request, agency pilot application.
3. **Demo / pilot form** (`/demo`, `/demo?for=agency`): a business or agency choice, a *preferred* time request (no fake "you're booked"), WhatsApp number and client count.
4. **Conversion paths:**
   - "Start free" becomes "Get started" and leads to `/demo`.
   - "Sign in" goes to `https://app.suuper.cc/login`.
   - Mock `/login`, `/signup` and `/app` pages are removed (redirects in `next.config.ts`).
   - New "Agencies" nav item and agency announcement bar.
5. **New `/agencies` page:** problem, pilot steps, a *what's ready / what's coming* table, the pilot offer and an agency FAQ.
6. **Pricing rebuilt** around the pitch plans:
   - Credits, replies, bots and seats per plan, plus each plan's AI cost cap.
   - An "every plan includes" list and an AI-credits explainer.
   - An agency pilot card, and a note that Meta's WhatsApp charges are separate.
   - Removed: the countdown "offer", free plan, yearly discounts and PKR add-ons.
   - ROI estimator moved to USD against Starter, labelled "an estimate, not a promise".
7. **Analytics, consent-gated:**
   - GA4 (`NEXT_PUBLIC_GA4_ID`) and the Meta Pixel (`NEXT_PUBLIC_META_PIXEL_ID`) load only after "Accept all".
   - A `generate_lead` / `Lead` event fires on form success.
   - The server-side Meta Conversions API (`META_CAPI_TOKEN`) sends with a hashed email, only with consent.
   - UTM capture per session.
8. **Removed or redirected pages:** `/status`, `/careers`, `/changelog`, `/help`, `/partners` (→ `/agencies`), `/blog` (→ `/resources`), `/analytics` (→ `/apps`), `/customers/*`, MCP and HR guides.
9. **SEO:**
   - Titles and descriptions rewritten (WhatsApp-first, no Instagram/Messenger claims).
   - JSON-LD offers in USD from the pitch plans.
   - The sitemap now lists 30 accurate pages.

### Configuration needed before deploy

`.env.production` on the server (not in git):

```
LEAD_NOTIFY_EMAIL=you@yourdomain        # where lead notifications go
LEAD_FROM_EMAIL=no-reply@suuper.cc      # must be allowed by the host's mail setup
NEXT_PUBLIC_GA4_ID=G-XXXXXXX            # optional; build-time variable, set before `next build`
NEXT_PUBLIC_META_PIXEL_ID=000000000     # optional; build-time variable
META_CAPI_TOKEN=...                     # optional, server-only
```

---

## E. Launch materials

All claims below are limited to the "built and live" list. **Don't publish any of this until a self-serve signup or a clear "book a demo" flow is live, and the app claims are verified.**

### Product Hunt

- **Name:** Suuper
- **Tagline (60 chars):** *AI employees that answer your customers on WhatsApp*
- **Description:** Suuper gives small businesses an AI employee on WhatsApp, Telegram and their website. It answers from your own prices and FAQs, books appointments into a built-in Appointments app, saves every lead, and hands the chat to your team when it matters. Choose Claude, GPT, Gemini or a free local model; AI credits keep costs capped. Agencies can resell it to their clients.
- **First comment (founder):** *We built Suuper because in Pakistan and the Gulf, customers do business on WhatsApp, and small businesses can't keep up: messages pile up, late replies lose sales, and leads live in chat threads. Most AI tools are website-first and priced for the West. Suuper is WhatsApp-first, puts business apps behind every conversation, and is built for agencies to resell. We're onboarding our first pilot agencies now. Honest roadmap: one-click WhatsApp setup, agency branding and Instagram are coming; everything else you see is live today.*
- **Gallery (5 shots):**
  1. A WhatsApp booking at 11 pm.
  2. The inbox with takeover.
  3. The Appointments app record.
  4. The workflow (booking, email, reminder).
  5. The model picker with credits.

### Short listings (Uneed, Peerlist, SaaSHub, AlternativeTo)

*WhatsApp-first AI assistant for small businesses: answers customers, books appointments, captures leads in built-in apps, and hands over to your team. Claude, GPT, Gemini or local models with capped AI costs. Resellable by agencies.* Alternatives to list against: WATI, respond.io, Chatbase, Tidio. **Wait for real reviews before creating G2 and Capterra profiles.**

### Social posts

- **LinkedIn (business):** *A clinic gets a WhatsApp message at 11 pm: "How much is a check-up, and can I come tomorrow?" Nobody's there, and by morning the patient has booked elsewhere. Suuper answers in seconds from the clinic's own price list, books the slot, emails the receptionist and sends a reminder. The owner did nothing. That's what we mean by an AI employee.*
- **LinkedIn (agency):** *Agencies: your clients need AI, and you need something to sell every month. Suuper lets you set up WhatsApp AI assistants and business apps for clients and keep the recurring revenue. We're taking 3–5 pilot agencies: free agency workspace, wholesale pricing, and we set up your first three clients with you.*
- **X:** *Your WhatsApp gets customers at midnight. Suuper answers them, books them and saves the lead. → suuper.cc*
- **Reddit (r/smallbusiness, r/agency):** lead with the problem and the honest pilot offer. No links in the first post; follow each sub's self-promotion rules.

### Video scripts

- **60-second business demo:**
  - 0–5s: phone buzzes at 11 pm.
  - 5–20s: Sara's question gets answered with fees and slots.
  - 20–30s: booking appears in the Appointments app.
  - 30–40s: receptionist email, then the morning reminder.
  - 40–50s: inbox takeover on a question the bot can't answer.
  - 50–60s: "Suuper: AI employees for businesses that run on WhatsApp. Book a demo."
- **90-second agency video:**
  - Problem: clients want AI, and building it is slow.
  - Set up a client: add knowledge, test in the Playground, connect WhatsApp.
  - Add an app and a workflow, then go live.
  - The math: wholesale vs your retail price.
  - CTA: apply for the pilot.

### Email onboarding (after a demo or pilot application)

1. **Day 0:** "Here's what we'll set up together." Checklist: price list, FAQs, WhatsApp number, top 10 customer questions.
2. **Day 1:** "Your first assistant is ready to test." Playground link.
3. **Day 3:** "Connect your channel." WhatsApp Cloud API steps, website snippet, Telegram.
4. **Day 7:** "What your assistant handled this week." Real counts from the app only.
5. **Day 12:** "Choose your plan." Plan comparison and the credit explanation.
6. **Agencies only:** Day 2 "Pick your first three clients," Day 10 "Pricing your service to clients."

### Remarketing ads (consented audiences only)

- **Business:** *Still answering WhatsApp at midnight? Suuper's AI employee answers, books and saves the lead. Book a demo.*
- **Agency:** *Your clients need AI. Build a recurring service around it. Free agency workspace for pilot agencies.*

---

## F. Quality assurance

| Check | Result |
|---|---|
| TypeScript (`tsc --noEmit`) | Pass |
| ESLint | Pass (0 errors, 0 warnings) |
| Production build | Pass (all pages generated) |
| All 30 sitemap pages (including home) | 200 |
| Unknown URL | 404 with styled page |
| Redirects (`/login`, `/signup`, `/app/*`, `/blog`, `/partners`, `/status`, `/customers/*`, `/analytics`) | Correct targets |
| `/api/lead`: valid submission | Saved (file mode 600) |
| `/api/lead`: invalid email / unknown form | Rejected with message |
| `/api/lead`: honeypot | Silently dropped |
| Claim scan across every page (1,200, G2, Capterra, SOC 2, uptime, white-label, free plan, PKR 0, money back, Start free, testimonials, MCP, Asana, Jira, App Store) | **Clean.** Instagram and Messenger appear only in "roadmap, not available yet" text |
| Visual check (headless Chrome): home, pricing, agencies, demo | OK |

**Not tested / open issues:**

- **Form submit in a real browser:** I clicked through the endpoint, not the UI. Test once after deploy.
- **sendmail on Hostinger:** availability is unverified, and the server's process cap may block it. Leads are saved regardless, so check `data/leads.jsonl` until email is confirmed.
- **GA4, Pixel and CAPI:** not configured (no IDs), so these are untested end to end.
- **App audit:** not done (no repo). This covers billing, entitlements, credit enforcement, webhooks, tenant isolation and RBAC.
- **Legal pages:** placeholder text. Needs owner and legal review before paid plans open.
- **Dead code:** unused mock components remain (dashboard, onboarding, status, changelog, help, cases, testimonials, ratings). They're harmless but should be deleted in a cleanup PR.
- **Pitch figures shown publicly:** GPT-6 Luna, Haiku and Opus credit-per-reply numbers should be re-checked against current model prices.

**Deployment readiness:** ready to deploy once the owner approves. Set `.env.production` first.

---

## G. Growth roadmap

### G1. Reality check on "100–200 paying customers in November"

Three things stand in the way:
- **No billing:** Stripe keys aren't set and no entity is in place.
- **No self-serve signup.**
- **No one-click WhatsApp setup.**

Every customer is therefore a hand-held onboarding, and nobody can pay online. **100–200 paying customers in November is not achievable.** A credible November:

| Metric | Target |
|---|---|
| Pilot agencies signed | 3–5 |
| Client businesses live (≥1 channel, ≥20 real conversations) | 6–15 |
| Direct business demos held | 20–30 |
| First invoices (manual, bank transfer or Stripe once live) | 3–10 |
| Billing live (entity + Stripe or local provider) | By Nov 30 |

### G2. November plan

- **Week 1:**
  - Approve and deploy the corrected site with lead email working.
  - Turn on Suuper's AI provider keys.
  - Start Meta Tech Provider verification.
  - Choose the first vertical: **clinics** (clearest booking outcome).
- **Week 2:**
  - Outreach to 40 agencies in Lahore, Karachi and Islamabad, with a live demo on their own client's WhatsApp.
  - Sign 3 pilots.
  - Set up the first client for each.
- **Week 3:**
  - Measure real numbers per pilot client (replies answered, leads saved, bookings).
  - Fix setup friction.
  - Start the billing entity.
- **Week 4:**
  - First case study with real, permissioned numbers.
  - Open a waitlist for self-serve.
  - Bring Phase 1 (agency layer) to beta for the pilots.

### G3. First three pilot-agency milestones

1. **Pilot agency 1:** two clinics live on WhatsApp, with appointments booked by the bot within 14 days.
2. **Pilot agency 2:** an online shop live, with product answers and COD leads saved.
3. **Pilot agency 3:** three clients live. The agency invoices its clients its own retail price, which proves the wholesale margin.

### G4. Longer term

Follow the pitch's milestone-gated roadmap:

| Milestone | Unlocks |
|---|---|
| 3 pilots live | Phase 2: one-click WhatsApp, vertical packs, Urdu |
| 20 paying agencies | Phase 3: agency billing, template store, ROI reports, partner program |
| 50 paying agencies | Phase 4: more channels, mobile app, Gulf and Africa |

Replace the pitch's revenue scenario with pilot data as soon as it exists.
