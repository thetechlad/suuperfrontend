"use client";

// Client side of website lead capture (see src/app/api/lead/route.ts).

import { consentValue } from "@/components/site/FloatingUi";
import { trackConversion } from "@/components/site/Tracking";

const UTM_KEY = "suuper-utm";
const UTM_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "ref"];

/** Remembers the first campaign parameters a visitor arrived with, for this browser session. */
export function captureUtm() {
  try {
    if (sessionStorage.getItem(UTM_KEY)) return;
    const q = new URLSearchParams(location.search);
    const utm = Object.fromEntries(UTM_PARAMS.filter((k) => q.get(k)).map((k) => [k, q.get(k) as string]));
    if (Object.keys(utm).length) sessionStorage.setItem(UTM_KEY, JSON.stringify(utm));
  } catch {}
}

function savedUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(UTM_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export type LeadSource = "demo" | "contact" | "apply" | "newsletter" | "guide";

/** Sends a form's fields (plus any extras) to the lead endpoint. Throws with a readable message on failure. */
export async function submitLead(source: LeadSource, form: HTMLFormElement, extra: Record<string, string> = {}) {
  const fields: Record<string, string> = {};
  let hp = "";
  new FormData(form).forEach((v, k) => {
    if (typeof v !== "string") return;
    if (k === "hp") hp = v;
    else fields[k] = v;
  });
  const res = await fetch("/api/lead", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ source, page: location.pathname, fields: { ...fields, ...extra }, utm: savedUtm(), hp, consent: consentValue() === "all" }),
  }).catch(() => null);
  if (!res) throw new Error("Network error. Check your connection and try again.");
  if (!res.ok) {
    const data = (await res.json().catch(() => null)) as { error?: string } | null;
    throw new Error(data?.error ?? "Something went wrong. Please try again.");
  }
  trackConversion("generate_lead", { source });
}

/** Hidden field that bots fill in and people don't. Put one inside every lead form. */
export const honeypotProps = {
  name: "hp",
  tabIndex: -1,
  autoComplete: "off",
  "aria-hidden": true,
  className: "absolute left-[-9999px] h-px w-px opacity-0",
} as const;
