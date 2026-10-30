import { ArrowDownIcon } from '@phosphor-icons/react/dist/ssr/ArrowDown';
import { DownloadSimpleIcon } from '@phosphor-icons/react/dist/ssr/DownloadSimple';

import { Icon } from '@/components/Icon';
import { TempelScreenPreview } from '@/components/preview/TempelScreenPreview';
import button from '@/components/ui/button.module.css';
import { download } from '@/content/sections';

import styles from './Hero.module.css';

/**
 * The opening: what Patepang is, and the two things to do next, get it or see how it works.
 * Below, on the stage, the Tempel tab as a new person first sees it, held in a phone that rises
 * from the stage once as the page opens; three notes, in the order of the screen, say what is
 * different, each pointing at the part of the screen it explains (`data-note` names its
 * `data-target`).
 */
export function Hero() {
  return (
    <section className={styles.hero} aria-labelledby="judul-utama">
      <div className={`page ${styles.intro}`}>
        <h1 id="judul-utama" className={`type-hero ${styles.title}`}>
          Hanya orang yang pernah kamu temui.
        </h1>
        <div className={styles.aside}>
          <p className="type-body-large tone-secondary">
            Patepang adalah aplikasi untuk menjaga hubungan dengan orang yang{' '}
            <span className="nowrap">benar-benar</span> pernah kamu temui.{' '}
            <strong className={styles.emphasis}>
              Koneksinya hanya lahir saat kalian bertemu langsung.
            </strong>
          </p>
          <div className={styles.actions}>
            <a
              className={`${button.button} ${button.primary} ${button.large} ${styles.get}`}
              href={`#${download.id}`}
            >
              <Icon glyph={DownloadSimpleIcon} size="sm" weight="bold" />
              {download.label}
            </a>
            <a className={`${button.button} ${button.ghost} ${styles.see}`} href="#cara-kerja">
              Lihat cara kerja
              <Icon glyph={ArrowDownIcon} size="sm" />
            </a>
          </div>
        </div>
      </div>

      <div className={`page ${styles.exhibit}`}>
        <div className={styles.phone}>
          <TempelScreenPreview className={styles.screen} />
        </div>
        <p className={`${styles.note} ${styles.noteBorn}`} data-note="born">
          <strong className={styles.noteTitle}>Tanpa email atau nomor telepon</strong>
          <span className={styles.noteBody}>
            Akunmu lahir saat tempel pertama dengan orang yang kamu temui, kapan pun itu.
          </span>
        </p>
        <p className={`${styles.note} ${styles.noteFace}`} data-note="face">
          <strong className={styles.noteTitle}>Hanya saat bertemu langsung</strong>
          <span className={styles.noteBody}>
            Tempel dilakukan sebelum kalian berpisah. Koneksi tidak bisa dibuat dari pencarian.
          </span>
        </p>
        <p className={`${styles.note} ${styles.noteCode}`} data-note="code">
          <strong className={styles.noteTitle}>Kode berganti setiap 30 detik</strong>
          <span className={styles.noteBody}>
            Satu HP menampilkan kode, HP lain memindainya, saat kalian berhadapan.
          </span>
        </p>
      </div>
    </section>
  );
}
