"use client";

import { useSyncExternalStore } from "react";
import {
  type CurrencyCode,
  currencyForCountry,
  currencyForTimeZone,
  DEFAULT_CURRENCY,
  isCurrencyCode,
} from "@/content/currency";

// Visitor currency, shared by every price on the page.
// Order: the visitor's own pick (saved) → IP country from /api/geo → browser timezone.

const STORAGE_KEY = "suuper-currency";
let current: CurrencyCode | null = null;
let lookupStarted = false;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

function saved(): CurrencyCode | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return isCurrencyCode(v) ? v : null;
  } catch {
    return null;
  }
}

function init() {
  if (current) return;
  const pick = saved();
  if (pick) {
    current = pick;
    return;
  }
  current = currencyForTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  if (lookupStarted) return;
  lookupStarted = true;
  fetch("/api/geo", { cache: "no-store" })
    .then((r) => (r.ok ? r.json() : null))
    .then((geo: { country?: string } | null) => {
      const byIp = currencyForCountry(geo?.country);
      if (byIp && !saved() && byIp !== current) {
        current = byIp;
        emit();
      }
    })
    .catch(() => {});
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const snapshot = () => {
  init();
  return current;
};
// Null on the server and during hydration: the currency is only known in the browser.
const serverSnapshot = () => null;

export function setCurrency(code: CurrencyCode) {
  current = code;
  try {
    localStorage.setItem(STORAGE_KEY, code);
  } catch {}
  emit();
}

/** The visitor's currency, plus whether it has been resolved yet (false during server render). */
export function useCurrency(): { code: CurrencyCode; ready: boolean } {
  const code = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  return { code: code ?? DEFAULT_CURRENCY, ready: code !== null };
}
