import { contact } from '@/content/contact';
import { siteUrl } from '@/content/metadata';

/**
 * The site's security.txt (RFC 9116), served at /.well-known/security.txt. `Expires` is a fixed
 * date a little under a year after the file was last reviewed, as the RFC recommends: renew it
 * (and review the contact and the policy) before then. The tests fail once it is less than a
 * month away, so a stale file is noticed. No `Encryption` key is listed, because there is none
 * yet, and the file is not signed (OpenPGP), for the same reason.
 */
export const securityTxt = {
  contact: `mailto:${contact.security}`,
  expires: '2027-11-01T00:00:00.000Z',
  preferredLanguages: 'id, en',
  policy: `${siteUrl}/keamanan`,
  canonical: `${siteUrl}/.well-known/security.txt`,
} as const;

/** The file's text: one field per line, in the order the RFC lists them. */
export function securityTxtBody(): string {
  return [
    '# Patepang: cara melaporkan kerentanan / how to report a vulnerability',
    `Contact: ${securityTxt.contact}`,
    `Expires: ${securityTxt.expires}`,
    `Preferred-Languages: ${securityTxt.preferredLanguages}`,
    `Canonical: ${securityTxt.canonical}`,
    `Policy: ${securityTxt.policy}`,
    '',
  ].join('\n');
}
