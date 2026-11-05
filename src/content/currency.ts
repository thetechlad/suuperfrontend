// Regional price lists. Every price on the site comes from here; edit amounts in this file only.

export type CurrencyCode = "PKR" | "USD" | "EUR" | "GBP" | "AED" | "INR";

export type Currency = {
  code: CurrencyCode;
  /** Shown in the currency switcher. */
  label: string;
  /** Monthly list price per plan name (must match `plans` in site.ts). */
  plans: Record<string, number>;
  /** Monthly price of one channel add-on, and of all three together. */
  addon: number;
  addonAll: number;
  payMethods: string[];
  /** Footer note; only PKR prices are stated as tax-inclusive. */
  note: string;
  /** Average-order-value slider in the ROI calculator. */
  roi: { aov: number; min: number; max: number; step: number };
};

const cards = ["Visa", "Mastercard", "Bank transfer"];

export const currencies: Record<CurrencyCode, Currency> = {
  USD: {
    code: "USD", label: "USD $",
    plans: { Starter: 9, Growth: 29, Pro: 79, Agency: 199 },
    addon: 5, addonAll: 12, payMethods: cards, note: "PRICES IN USD",
    roi: { aov: 60, min: 5, max: 1000, step: 5 },
  },
  EUR: {
    code: "EUR", label: "EUR €",
    plans: { Starter: 9, Growth: 27, Pro: 75, Agency: 189 },
    addon: 5, addonAll: 11, payMethods: cards, note: "PRICES IN EUR",
    roi: { aov: 55, min: 5, max: 1000, step: 5 },
  },
  GBP: {
    code: "GBP", label: "GBP £",
    plans: { Starter: 8, Growth: 23, Pro: 65, Agency: 159 },
    addon: 4, addonAll: 10, payMethods: cards, note: "PRICES IN GBP",
    roi: { aov: 50, min: 5, max: 1000, step: 5 },
  },
  AED: {
    code: "AED", label: "AED",
    plans: { Starter: 35, Growth: 109, Pro: 289, Agency: 729 },
    addon: 19, addonAll: 45, payMethods: cards, note: "PRICES IN AED",
    roi: { aov: 220, min: 20, max: 4000, step: 20 },
  },
  INR: {
    code: "INR", label: "INR ₹",
    plans: { Starter: 499, Growth: 1999, Pro: 4999, Agency: 12999 },
    addon: 299, addonAll: 699, payMethods: cards, note: "PRICES IN INR",
    roi: { aov: 1500, min: 100, max: 20000, step: 100 },
  },
  PKR: {
    code: "PKR", label: "PKR",
    plans: { Starter: 500, Growth: 2999, Pro: 7999, Agency: 19999 },
    addon: 300, addonAll: 700,
    payMethods: ["Visa", "Mastercard", "JazzCash", "Easypaisa", "Raast", "Bank transfer"],
    note: "PRICES IN PKR · INCLUSIVE OF TAXES",
    roi: { aov: 4500, min: 500, max: 50000, step: 500 },
  },
};

export const currencyCodes = Object.keys(currencies) as CurrencyCode[];
export const DEFAULT_CURRENCY: CurrencyCode = "USD";

export const isCurrencyCode = (v: unknown): v is CurrencyCode => typeof v === "string" && v in currencies;

const euro = new Set([
  "AT", "BE", "HR", "CY", "EE", "FI", "FR", "DE", "GR", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PT", "SK", "SI", "ES",
  "AD", "MC", "SM", "VA", "ME", "XK",
]);

/** ISO 3166 country code → currency. Countries without their own list get USD. */
export function currencyForCountry(country: string | null | undefined): CurrencyCode | undefined {
  if (!country) return undefined;
  const c = country.toUpperCase();
  if (c === "PK") return "PKR";
  if (c === "IN") return "INR";
  if (c === "AE") return "AED";
  if (c === "GB" || c === "GG" || c === "JE" || c === "IM") return "GBP";
  if (euro.has(c)) return "EUR";
  return /^[A-Z]{2}$/.test(c) ? "USD" : undefined;
}

/** Best guess from the browser's timezone, used until (or instead of) the IP lookup. */
export function currencyForTimeZone(tz: string | undefined): CurrencyCode {
  if (!tz) return DEFAULT_CURRENCY;
  if (tz === "Asia/Karachi") return "PKR";
  if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") return "INR";
  if (tz === "Asia/Dubai") return "AED";
  if (tz === "Europe/London" || tz === "Europe/Belfast" || tz === "Europe/Guernsey" || tz === "Europe/Jersey" || tz === "Europe/Isle_of_Man")
    return "GBP";
  const euroZones = [
    "Vienna", "Brussels", "Zagreb", "Nicosia", "Tallinn", "Helsinki", "Paris", "Berlin", "Busingen", "Athens", "Dublin", "Rome",
    "Riga", "Vilnius", "Luxembourg", "Malta", "Amsterdam", "Lisbon", "Bratislava", "Ljubljana", "Madrid", "Andorra", "Monaco",
    "San_Marino", "Vatican", "Podgorica",
  ];
  if (euroZones.some((z) => tz === "Europe/" + z) || tz === "Atlantic/Madeira" || tz === "Atlantic/Canary" || tz === "Atlantic/Azores")
    return "EUR";
  return DEFAULT_CURRENCY;
}

const symbols: Partial<Record<CurrencyCode, string>> = { USD: "$", EUR: "€", GBP: "£", INR: "₹" };

/** Whole-unit price, e.g. "$29", "€27", "₹1,999", "PKR 2,999", "AED 109". */
export function formatMoney(amount: number, code: CurrencyCode): string {
  const n = Math.round(amount).toLocaleString(code === "INR" ? "en-IN" : "en-US");
  const sym = symbols[code];
  return sym ? sym + n : `${code} ${n}`;
}
