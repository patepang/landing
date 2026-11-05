import { availability as source } from '../src/content/availability';
import { statusFor } from '../src/content/status-copy';

import { availability as launched } from './fixtures/availability-tersedia';

/**
 * What the build under test says about availability. `pnpm test:e2e` builds the owner's switch as
 * it stands (src/content/availability.ts); `pnpm test:tersedia` builds the launched fixture, and
 * sets PATEPANG_AVAILABILITY for the tests too, so they expect what that build shows.
 */
export const builtAvailability = process.env.PATEPANG_AVAILABILITY ? launched : source;
export const built = statusFor(builtAvailability);
