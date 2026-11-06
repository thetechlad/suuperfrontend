// Production entry point for Hostinger's Node.js runner (Passenger).
// Shared hosting caps how many processes/threads the account may run, so keep Node's pools small.
// (Must be set before anything uses the libuv thread pool.)
process.env.UV_THREADPOOL_SIZE = process.env.UV_THREADPOOL_SIZE || "2";
const { createServer } = require("http");
const next = require("next");

const port = parseInt(process.env.PORT || "3000", 10);
const app = next({ dev: false, dir: __dirname });
const handle = app.getRequestHandler();

// Next.js marks prerendered pages "s-maxage=31536000" (one year). Hostinger's CDN honours that,
// so after a deploy it keeps serving old pages. Cap page caching at 60 seconds instead.
// Hashed build assets under /_next/static/ keep their long cache.
const PAGE_CACHE = "public, max-age=0, s-maxage=60, stale-while-revalidate=300";

app.prepare().then(() => {
  createServer((req, res) => {
    if (!(req.url || "").startsWith("/_next/static/")) {
      const setHeader = res.setHeader.bind(res);
      res.setHeader = (name, value) => {
        if (String(name).toLowerCase() === "cache-control" && /s-maxage=\d{4,}/.test(String(value))) value = PAGE_CACHE;
        return setHeader(name, value);
      };
    }
    handle(req, res);
  }).listen(port, () => {
    console.log(`suuper.cc ready on port ${port}`);
  });
});
