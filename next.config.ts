import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  devIndicators: false,
  // Serve images as-is. The on-the-fly optimizer needs worker threads that Hostinger's shared-hosting
  // process limit doesn't allow (it returned 503 for every image); the files in public/ are already web-sized.
  images: { unoptimized: true },
  async redirects() {
    const app = "https://app.suuper.cc/login";
    return [
      // The marketing site has no accounts: sign-in lives in the app, and new customers start with a demo.
      { source: "/login", destination: app, permanent: false },
      { source: "/app", destination: app, permanent: false },
      { source: "/app/:path*", destination: app, permanent: false },
      { source: "/signup", destination: "/demo", permanent: false },
      // Pages retired in the November 2026 accuracy pass.
      { source: "/blog", destination: "/resources", permanent: true },
      { source: "/partners", destination: "/agencies", permanent: true },
      { source: "/analytics", destination: "/apps", permanent: true },
      { source: "/industries/agencies", destination: "/agencies", permanent: true },
      { source: "/customers/:slug", destination: "/", permanent: true },
      { source: "/resources/mcp", destination: "/resources", permanent: true },
      { source: "/resources/employee-onboarding", destination: "/resources", permanent: true },
      { source: "/:page(status|careers|changelog|help)", destination: "/", permanent: false },
    ];
  },
  turbopack: {
    // A lockfile in a parent folder otherwise makes Next guess the wrong workspace root.
    root: process.cwd(),
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
