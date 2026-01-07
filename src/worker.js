/**
 * Minimal Worker wrapper for a static HTML dapp.
 * - Uses Workers Static Assets via env.ASSETS.fetch(request)
 * - Adds no-store + basic security headers
 *
 * Docs:
 * - Static Assets: https://developers.cloudflare.com/workers/static-assets/
 * - Assets binding: https://developers.cloudflare.com/workers/static-assets/binding/
 */
export default {
  async fetch(request, env, ctx) {
    // Only allow safe methods for a static site.
    if (request.method !== "GET" && request.method !== "HEAD") {
      return new Response("Method Not Allowed", { status: 405 });
    }

    // Serve the static asset (index.html, etc.)
    const assetResponse = await env.ASSETS.fetch(request);

    // Clone response so we can set headers safely.
    const resp = new Response(assetResponse.body, assetResponse);

    // Keep deployments deterministic: always fetch latest HTML.
    resp.headers.set("Cache-Control", "no-store");

    // Basic hardening headers (won't interfere with wallet injection).
    resp.headers.set("X-Content-Type-Options", "nosniff");
    resp.headers.set("Referrer-Policy", "no-referrer");
    resp.headers.set("Permissions-Policy", "interest-cohort=()");

    return resp;
  },
};
