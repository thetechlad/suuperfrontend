// The visitor's country, from geolocation headers added by the CDN or host (if any).
// Used only to choose a price currency; nothing is stored.

const COUNTRY_HEADERS = [
  "cf-ipcountry",
  "x-vercel-ip-country",
  "cloudfront-viewer-country",
  "x-country-code",
  "x-geo-country",
  "x-hcdn-country",
  "x-hcdn-client-country",
  "geoip-country-code",
  "x-geoip-country",
];

export async function GET(request: Request) {
  let country: string | null = null;
  for (const h of COUNTRY_HEADERS) {
    const v = request.headers.get(h);
    if (v && /^[A-Za-z]{2}$/.test(v) && v.toUpperCase() !== "XX") {
      country = v.toUpperCase();
      break;
    }
  }
  return Response.json({ country }, { headers: { "Cache-Control": "private, no-store" } });
}
