import type { MetadataRoute } from 'next';

import { siteUrl } from '@/content/metadata';
import { sitePages } from '@/content/pages';

/**
 * Written to out/sitemap.xml at build time: the landing and every page in src/content/pages.ts,
 * each with the date its text last changed (not the build's), so the file only changes when a
 * page does.
 */
export const dynamic = 'force-static';

/** When the landing's text last changed. */
const LANDING_UPDATED = '2026-11-04';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: siteUrl, lastModified: LANDING_UPDATED },
    ...sitePages.map((page) => ({ url: `${siteUrl}${page.path}`, lastModified: page.updated })),
  ];
}
