import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/**
 * Content-Security-Policy for a fully static site.
 * No nonces (they would force dynamic rendering — this site is static), so we
 * allow same-origin + inline bootstrap scripts, lock everything else down, and
 * only permit the Google Maps frame the contact page embeds.
 */
const contentSecurityPolicy = [
  "default-src 'self'",
  // 'unsafe-inline' is required for Next.js inline flight/bootstrap scripts
  // (nonces would force dynamic rendering; this site is static).
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  // next/font self-hosts both Figtree and Noto Sans Tamil at build time,
  // so no Google Fonts origin is needed at runtime.
  "style-src 'self' 'unsafe-inline'",
  "font-src 'self' data:",
  "img-src 'self' data: blob:",
  "media-src 'self'",
  "connect-src 'self'",
  // Google Maps embed + place links on the contact/admissions/footer pages
  "frame-src https://www.google.com https://maps.google.com",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  // NOTE: require-trusted-types-for 'script' was tested but Turbopack's chunk
  // loader assigns script.src directly (TrustedScriptURL) and is blocked by it.
  // Safe to omit: this site has no HTML-injection sinks (no dangerouslySetInnerHTML,
  // no user content rendered as markup — React escapes all text nodes).
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Per OWASP: disable the legacy XSS auditor (it can *introduce* XSS).
  { key: "X-XSS-Protection", value: "0" },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(), autoplay=(), camera=(), display-capture=(), encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), usb=(), xr-spatial-tracking=(), interest-cohort=()",
  },
  { key: "X-DNS-Prefetch-Control", value: "on" },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "Origin-Agent-Cluster", value: "?1" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  // No Cross-Origin-Embedder-Policy: it would block the Google Maps iframe
  // (maps.google.com sends no Cross-Origin-Resource-Policy header).
];

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // do not advertise the framework in response headers
  poweredByHeader: false,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
