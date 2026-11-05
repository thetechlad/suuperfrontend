"use client";

import { useEffect, useRef, useState } from "react";

/** A short chat thread of canned questions: keeps the last three and shows a typing state before each answer. */
export function useAskThread(initial: number[] = [], typingMs = 900) {
  const [asked, setAsked] = useState<number[]>(initial);
  const [typing, setTyping] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const ask = (i: number) => {
    clearTimeout(timer.current);
    setAsked((prev) => [...prev, i].slice(-3));
    setTyping(true);
    timer.current = setTimeout(() => setTyping(false), typingMs);
  };

  return { asked, typing, ask };
}
