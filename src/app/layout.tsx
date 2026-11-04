import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { homeDescription as description, homeTitle as title, siteUrl } from '@/content/metadata';
import { canvasColor } from '@/design/tokens';

import { jakarta } from './fonts';
import './globals.css';

/*
 * The landing's metadata, which every other page replaces with its own (src/content/metadata.ts).
 * `metadataBase` names the site's domain. The description ends with the launch status
 * (src/content/status.ts). No social image exists yet, so none is declared. The empty icon stops
 * the browser from requesting /favicon.ico until a real icon is made.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: '/',
    siteName: 'Patepang',
    title,
    description,
  },
  twitter: { card: 'summary', title, description },
  icons: { icon: 'data:,' },
};

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: canvasColor.light },
    { media: '(prefers-color-scheme: dark)', color: canvasColor.dark },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className={jakarta.variable}>
      <body>{children}</body>
    </html>
  );
}
