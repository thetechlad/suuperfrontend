# Suuper frontend

Marketing site, signup/onboarding flow and dashboard for Suuper, built from the Claude Design file
"Suuper — Your business, on autopilot."

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS v4.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## Layout

| Path | What it is |
| --- | --- |
| `src/content/site.ts` | All marketing copy: nav, pages (as lists of typed sections), plans, articles, legal, footer |
| `src/content/types.ts` | Section types — each page is an array of these |
| `src/content/demo.ts` | Demo data shared by the marketing demos and the dashboard (chat Q&A, inbox, metrics) |
| `src/content/dashboard.ts` | Dashboard nav and per-view blocks |
| `src/components/sections/` | One component per section type; `Sections.tsx` renders a page and alternates the band backgrounds |
| `src/components/site/` | Header, footer, chat widget, sticky CTA and exit-intent offer |
| `src/components/onboarding/` | Six-step signup flow (also the login screen) |
| `src/components/dashboard/` | Dashboard shell and blocks |
| `src/app/globals.css` | Design tokens (`ink`, `paper`, `teal`, `panel`…), fonts, keyframes and scroll-driven reveals |

## Routes

- `/` and `/{chat,connectors,apps,agents,workflows,inbox,knowledge,analytics,pricing,security,about,contact,privacy,terms,refunds}`
- `/industries`, `/industries/{ecommerce,clinics,realestate,restaurants,gyms,agencies,local}`
- `/resources`, `/resources/{slug}` for articles
- `/signup`, `/login`
- `/app` and `/app/{inbox,knowledge,chat,connectors,apps,agents,workflows,analytics,team,settings,billing}`

To add a marketing page, add an entry to `pages` in `src/content/site.ts`; it is picked up by `generateStaticParams`.

## Not wired up yet

Forms (contact, signup, login, guide download) and the dashboard are front-end only: they validate and show
their success states, but nothing is sent to a backend.
