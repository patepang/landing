import type { Metadata } from 'next';
import Link from 'next/link';

import { TwoDots } from '@/components/brand/TwoDots';
import { SiteHeader } from '@/components/site/SiteHeader';
import button from '@/components/ui/button.module.css';

import styles from './not-found.module.css';

export const metadata: Metadata = {
  title: 'Halaman tidak ditemukan | Patepang',
};

/** Any address the site does not have. It says what happened and offers the way back. */
export default function NotFound() {
  return (
    <>
      <a className="skip-link" href="#isi">
        Langsung ke isi
      </a>
      <SiteHeader on="elsewhere" />
      <main id="isi" tabIndex={-1} className={styles.main}>
        <div className={`page ${styles.inner}`}>
          <TwoDots phase="apart" size="md" />
          <h1 className="type-hero">Halaman ini tidak ada.</h1>
          <p className="type-body-large tone-secondary">
            Alamatnya mungkin salah ketik, atau halamannya memang belum pernah ada. Semua penjelasan
            tentang Patepang ada di halaman utama.
          </p>
          <Link className={`${button.button} ${button.primary} ${button.large}`} href="/">
            Kembali ke halaman utama
          </Link>
        </div>
      </main>
    </>
  );
}
