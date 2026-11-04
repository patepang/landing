/**
 * The site's addresses, in one place. `halo@` and `security@` are the owner's decision (app ADR
 * 0060 B32: the general contact the stores ask for, and the contact named in security.txt).
 * Requests about personal data and legal requests go to `halo@` too, until the owner gives them a
 * mailbox of their own: point `privacy` or `legal` at it then, and confirm it in `confirmed`
 * below (/kontak lists each address once, with every purpose it serves). Nothing on the site
 * collects anything: every contact is a mailto link.
 */
export const contact = {
  /** Questions, help with the app, and the stores' general contact. */
  general: 'halo@patepang.com',
  /** Requests about personal data (UU PDP) and the data protection officer. */
  privacy: 'halo@patepang.com',
  /** Vulnerability reports (security.txt, /keamanan). */
  security: 'security@patepang.com',
  /** Requests from authorities and other legal matters. */
  legal: 'halo@patepang.com',
} as const;

export type ContactKey = keyof typeof contact;

/**
 * Whether the owner has confirmed that each address is a mailbox that exists and is read. This is
 * the merge gate for production: a production build on Vercel (`VERCEL_ENV=production`, which
 * Vercel sets for builds of `main`) stops while an address the site shows is unconfirmed, so the
 * site never goes live with a contact nobody reads (next.config.ts). Preview and local builds,
 * and the tests, are not stopped. Set an address to `true` once its mailbox receives mail.
 */
export const confirmed: Readonly<Record<string, boolean>> = {
  // Confirmed by the owner on 4 November 2026; the domain's mail is hosted by Zoho Mail (its MX
  // and SPF records).
  'halo@patepang.com': true,
  'security@patepang.com': true,
};

/** The addresses the site shows that the owner has not confirmed yet. */
export function unconfirmedMailboxes(): string[] {
  return [...new Set(Object.values(contact))].filter((address) => confirmed[address] !== true);
}
