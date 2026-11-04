import { securityTxtBody } from '@/content/security';

/** Written to out/.well-known/security.txt at build time; the host serves it as plain text. */
export const dynamic = 'force-static';

export function GET() {
  return new Response(securityTxtBody(), {
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}
