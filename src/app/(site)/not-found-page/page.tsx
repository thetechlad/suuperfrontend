import { notFound } from "next/navigation";

// Target of the proxy's 404 rewrite (src/proxy.ts). Calling notFound() during prerendering makes
// Next.js serve the (site) not-found page with a real 404 status instead of a streamed 200.
export default function NotFoundPage() {
  notFound();
}
