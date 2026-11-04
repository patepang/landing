/**
 * Prices and space, as the owner set them (app ADR 0060 B21, B22, 4 November 2026) and as the
 * server counts them (backend packages/protocol limits). Sizes use the app's own words: it shows
 * 1024-based sizes as "GB" and "MB" (app src/domain/format.ts, formatBytes). The stores hold the
 * final prices; these are the Indonesian ones.
 */
export const pricing = {
  monthly: 'Rp49.000',
  yearly: 'Rp499.000',
  /** Twelve months at the monthly price, less the yearly price. */
  yearlySaving: 'Rp89.000',
  trialDays: 14,
  free: {
    storage: '5 GB',
    /** The second-meeting bonus: per pair, once, for free accounts only. */
    bonusPerPair: '500 MB',
    bonusMax: '10 GB',
    storageMax: '15 GB',
    file: '100 MB',
  },
  subscriber: {
    storage: '100 GB',
    file: '4 GB',
  },
  tips: ['Rp15.000', 'Rp50.000', 'Rp150.000'],
} as const;
