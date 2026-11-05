"use client";

import { currencies } from "@/content/currency";
import { useCurrency } from "@/components/useCurrency";

/** Footer line stating which currency prices are shown in. */
export function CurrencyNote() {
  const { code, ready } = useCurrency();
  return <span className={ready ? undefined : "invisible"}>{currencies[code].note}</span>;
}
