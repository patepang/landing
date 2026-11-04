import type { Metadata } from 'next';

import type { SitePage } from '@/content/pages';
import { descriptionStatus } from '@/content/status';

/** The site's address, for canonical links, the sitemap and link previews. */
export const siteUrl = 'https://patepang.com';
export const siteName = 'Patepang';

export const homeTitle = 'Patepang: hanya orang yang pernah kamu temui';
export const homeDescription = `Patepang adalah aplikasi untuk menjaga hubungan dengan orang yang benar-benar pernah kamu temui langsung. Koneksi hanya lahir saat kalian bertemu. ${descriptionStatus}`;

/**
 * A page's own title, description, canonical address and link preview. Next merges metadata one
 * key deep, so every key a page sets is set in full here: a page never inherits the landing's
 * canonical address or preview by accident. No social image exists yet, so none is declared.
 */
export function pageMetadata(page: Pick<SitePage, 'path' | 'title' | 'description'>): Metadata {
  const title = `${page.title} | ${siteName}`;
  return {
    title,
    description: page.description,
    alternates: { canonical: page.path },
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      url: page.path,
      siteName,
      title,
      description: page.description,
    },
    twitter: { card: 'summary', title, description: page.description },
  };
}
