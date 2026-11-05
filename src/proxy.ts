import { NextResponse, type NextRequest } from "next/server";
import { knownPaths } from "@/lib/routes";

// Runs before rendering. Streamed pages can't change their status once they start, so unknown
// URLs are caught here to return a real 404 instead of a 200 "soft 404".
export function proxy(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const { pathname, search } = request.nextUrl;

  // One canonical host: www.suuper.cc → suuper.cc.
  if (host.startsWith("www.")) {
    return NextResponse.redirect(`https://${host.slice(4)}${pathname}${search}`, 301);
  }

  const path = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  if (!knownPaths.has(path)) {
    return NextResponse.rewrite(new URL("/not-found-page", request.url), { status: 404 });
  }
}

export const config = {
  // Pages only: skip Next.js internals and any path with a file extension (images, robots.txt, sitemap.xml…).
  matcher: ["/((?!_next/|.*\\..*).*)"],
};
