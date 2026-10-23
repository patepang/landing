import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

import { canvasColor } from '@/design/tokens';

import { jakarta } from './fonts';
import './globals.css';

const title = 'Patepang: hanya orang yang pernah kamu temui';
const description =
  'Patepang adalah aplikasi untuk menjaga hubungan dengan orang yang benar-benar pernah kamu temui langsung. Koneksi hanya lahir saat kalian bertemu. Segera hadir.';

/*
 * `metadataBase` names the domain the owner plans to connect; it does not mean the site is
 * deployed. No social image exists yet, so none is declared. The empty icon stops the browser
 * from requesting /favicon.ico until a real icon is made.
 */
export const metadata: Metadata = {
  metadataBase: new URL('https://patepang.com'),
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
