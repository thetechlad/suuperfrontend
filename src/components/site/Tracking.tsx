"use client";

import { useEffect, useSyncExternalStore } from "react";
import { captureUtm } from "@/lib/leads";
import { consentValue, subscribeConsent } from "./FloatingUi";

// Analytics and ad pixels load only when an ID is configured AND the visitor chose "Accept all".
const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

type W = Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void; fbq?: ((...a: unknown[]) => void) & { q?: unknown[] } };

function loadScript(src: string) {
  const el = document.createElement("script");
  el.async = true;
  el.src = src;
  document.head.appendChild(el);
}

let loaded = false;
function loadTrackers() {
  if (loaded) return;
  loaded = true;
  const w = window as W;
  if (GA4_ID) {
    w.dataLayer = w.dataLayer ?? [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params -- gtag expects the arguments object
      w.dataLayer!.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", GA4_ID);
    loadScript(`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`);
  }
  if (META_PIXEL_ID) {
    const fbq = ((...a: unknown[]) => {
      fbq.q!.push(a);
    }) as NonNullable<W["fbq"]>;
    fbq.q = [];
    w.fbq = w.fbq ?? fbq;
    w.fbq("init", META_PIXEL_ID);
    w.fbq("track", "PageView");
    loadScript("https://connect.facebook.net/en_US/fbevents.js");
  }
}

/** Records campaign parameters and, with consent, loads GA4 and the Meta Pixel. Renders nothing. */
export function Tracking() {
  const consent = useSyncExternalStore(subscribeConsent, consentValue, () => "");
  useEffect(() => captureUtm(), []);
  useEffect(() => {
    if (consent === "all" && (GA4_ID || META_PIXEL_ID)) loadTrackers();
  }, [consent]);
  return null;
}

/** Sends a conversion event to whichever trackers loaded (no-op without consent). */
export function trackConversion(name: "generate_lead" | "sign_up", params: Record<string, string> = {}) {
  const w = window as W;
  w.gtag?.("event", name, params);
  w.fbq?.("track", name === "generate_lead" ? "Lead" : "CompleteRegistration", params);
}
