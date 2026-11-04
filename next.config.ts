import type { NextConfig } from 'next';

/**
 * The site is static: `next build` writes plain HTML, CSS, JS and text files to `out/`, which any
 * static file host can serve. Nothing here needs a Node.js server at runtime. The hosting rules
 * (security headers, the /ketentuan redirect) are in vercel.json, because a static export cannot
 * carry them.
 *
 * `PATEPANG_AVAILABILITY` is for the tests only: it names a module that replaces
 * src/content/availability.ts in the build, so the launched state (tests/fixtures) can be built
 * and checked without touching the owner's switch. Production builds never set it.
 */
const availabilityModule = process.env.PATEPANG_AVAILABILITY;

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  ...(availabilityModule
    ? { turbopack: { resolveAlias: { '@/content/availability': availabilityModule } } }
    : {}),
};

export default nextConfig;
