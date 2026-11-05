import type { Metadata } from "next";
import { Onboarding } from "@/components/onboarding/Onboarding";

export const metadata: Metadata = { title: "Start free", robots: { index: false } };

export default function SignupPage() {
  return <Onboarding mode="signup" />;
}
