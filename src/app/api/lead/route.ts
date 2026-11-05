import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import { appendFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";

// Website lead capture: demo requests, pilot applications, contact messages and email sign-ups.
// Each submission is appended to a private JSON-lines file (outside public/) and, when
// LEAD_NOTIFY_EMAIL is set, an email notification is sent through the server's sendmail.

const LEADS_FILE = process.env.LEADS_FILE ?? path.join(process.cwd(), "data", "leads.jsonl");
const NOTIFY = process.env.LEAD_NOTIFY_EMAIL;
const FROM = process.env.LEAD_FROM_EMAIL ?? "no-reply@suuper.cc";
const SENDMAIL = ["/usr/sbin/sendmail", "/usr/lib/sendmail"].find((p) => existsSync(p));

// Optional Meta Conversions API. Only sent when configured and the visitor accepted all cookies.
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const META_CAPI_TOKEN = process.env.META_CAPI_TOKEN;

function sendMetaLead(email: string, ip: string, ua: string, page: string) {
  if (!META_PIXEL_ID || !META_CAPI_TOKEN) return;
  const em = createHash("sha256").update(email.trim().toLowerCase()).digest("hex");
  const event = {
    event_name: "Lead",
    event_time: Math.floor(Date.now() / 1000),
    action_source: "website",
    event_source_url: "https://suuper.cc" + page,
    user_data: { em: [em], client_ip_address: ip, client_user_agent: ua },
  };
  fetch(`https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${encodeURIComponent(META_CAPI_TOKEN)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ data: [event] }),
  }).catch(() => {});
}

const SOURCES = new Set(["demo", "contact", "apply", "newsletter", "guide"]);
const MAX_FIELD = 2000;
const MAX_FIELDS = 20;

// Simple per-IP throttle: 5 submissions per 10 minutes per server process.
const hits = new Map<string, number[]>();
function throttled(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > 5;
}

const clean = (v: unknown) => (typeof v === "string" ? v.replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").trim().slice(0, MAX_FIELD) : "");

function notify(lead: Record<string, unknown>, fields: Record<string, string>) {
  if (!NOTIFY || !SENDMAIL) return;
  const who = fields.name || fields.email || "someone";
  const subject = `New ${lead.source} lead from ${who}`.replace(/[\r\n]+/g, " ");
  const lines = Object.entries(fields).map(([k, v]) => `${k}: ${v}`);
  const body = [...lines, "", `Page: ${lead.page}`, `UTM: ${JSON.stringify(lead.utm)}`, `Time: ${lead.at}`].join("\n");
  const replyTo = /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(fields.email ?? "") ? `Reply-To: ${fields.email}\n` : "";
  const msg = `To: ${NOTIFY}\nFrom: Suuper website <${FROM}>\n${replyTo}Subject: ${subject}\nContent-Type: text/plain; charset=utf-8\n\n${body}\n`;
  try {
    const p = spawn(SENDMAIL, ["-t", "-i"], { stdio: ["pipe", "ignore", "ignore"] });
    p.on("error", () => {});
    p.stdin.on("error", () => {});
    p.stdin.end(msg);
  } catch {
    // The lead is already saved; email is best-effort.
  }
}

export async function POST(request: Request) {
  const ip = (request.headers.get("x-forwarded-for") ?? "").split(",")[0].trim() || "unknown";
  if (throttled(ip)) return Response.json({ ok: false, error: "Too many submissions. Please try again later." }, { status: 429 });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
  const b = (body ?? {}) as { source?: unknown; page?: unknown; fields?: unknown; utm?: unknown; hp?: unknown; consent?: unknown };

  // Honeypot: real visitors never fill this hidden field.
  if (clean(b.hp)) return Response.json({ ok: true });

  const source = clean(b.source);
  if (!SOURCES.has(source)) return Response.json({ ok: false, error: "Unknown form." }, { status: 400 });

  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries((b.fields ?? {}) as Record<string, unknown>).slice(0, MAX_FIELDS)) {
    const key = clean(k).slice(0, 40);
    const val = clean(v);
    if (key && val) fields[key] = val;
  }
  const email = fields.email ?? "";
  if (!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) {
    return Response.json({ ok: false, error: "Please enter a valid email address." }, { status: 400 });
  }

  const utm: Record<string, string> = {};
  for (const [k, v] of Object.entries((b.utm ?? {}) as Record<string, unknown>).slice(0, 8)) {
    if (/^(utm_[a-z]+|gclid|fbclid|ref)$/.test(k)) utm[k] = clean(v).slice(0, 200);
  }

  const lead = { at: new Date().toISOString(), source, page: clean(b.page).slice(0, 200), fields, utm, ip, ua: clean(request.headers.get("user-agent")).slice(0, 300) };
  try {
    await mkdir(path.dirname(LEADS_FILE), { recursive: true });
    await appendFile(LEADS_FILE, JSON.stringify(lead) + "\n", { mode: 0o600 });
  } catch {
    return Response.json({ ok: false, error: "We couldn't save your details. Please try again." }, { status: 500 });
  }
  notify(lead, fields);
  if (b.consent === true) sendMetaLead(email, ip, lead.ua, lead.page);
  return Response.json({ ok: true });
}
