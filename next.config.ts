import type { NextConfig } from 'next';

import { unconfirmedMailboxes } from './src/content/contact';

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

/*
 * The merge gate for production (src/content/contact.ts): Vercel builds `main` with
 * `VERCEL_ENV=production`, and that build stops while the site would show a mailbox the owner has
 * not confirmed. Vercel then keeps serving the deployment it had. Previews and local builds go on.
 */
if (process.env.VERCEL_ENV === 'production') {
  const missing = unconfirmedMailboxes();
  if (missing.length > 0) {
    throw new Error(
      `Production build stopped: the mailboxes ${missing.join(', ')} are not confirmed. ` +
        'Create them, then mark them confirmed in src/content/contact.ts.',
    );
  }
}

const nextConfig: NextConfig = {
  output: 'export',
  reactStrictMode: true,
  ...(availabilityModule
    ? { turbopack: { resolveAlias: { '@/content/availability': availabilityModule } } }
    : {}),
};

export default nextConfig;
