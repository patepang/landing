import type { Metadata } from 'next';
import Link from 'next/link';

import { TwoDots } from '@/components/brand/TwoDots';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import button from '@/components/ui/button.module.css';
import { pageAt, type SitePath } from '@/content/pages';

import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Halaman tidak ditemukan | Patepang',
};

/** Pages people most often look for, offered where an address led nowhere. */
const suggestions: readonly SitePath[] = [
  '/kebijakan-privasi',
  '/syarat-ketentuan',
  '/hapus-akun',
  '/kontak',
  '/kebijakan',
];

/** Any address the site does not have. It says what happened and offers the ways back. */
export default function NotFound() {
  return (
    <>
      <div id="atas" tabIndex={-1} />
      <a className="skip-link" href="#isi">
        Langsung ke isi
      </a>
      <SiteHeader on="elsewhere" />
      <main id="isi" tabIndex={-1} className={styles.main}>
        <div className={`page ${styles.inner}`}>
          <TwoDots phase="apart" size="md" />
          <h1 className="type-hero">Halaman ini tidak ada.</h1>
          <p className="type-body-large tone-secondary">
            Alamatnya mungkin salah ketik, atau halamannya memang belum pernah ada.
          </p>
          <Link className={`${button.button} ${button.primary} ${button.large}`} href="/">
            Kembali ke halaman utama
          </Link>
          <nav aria-labelledby="mungkin-dicari" className={styles.more}>
            <h2 id="mungkin-dicari" className="type-headline">
              Mungkin yang kamu cari
            </h2>
            <ul className={styles.links}>
              {suggestions.map((path) => (
                <li key={path}>
                  <a className={styles.link} href={path}>
                    {pageAt(path).title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <SiteFooter on="elsewhere" />
    </>
  );
}
