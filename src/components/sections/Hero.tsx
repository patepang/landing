import { HourglassMediumIcon } from '@phosphor-icons/react/dist/ssr/HourglassMedium';

import { Icon } from '@/components/Icon';
import { TempelScreenPreview } from '@/components/preview/TempelScreenPreview';
import button from '@/components/ui/button.module.css';

import styles from './Hero.module.css';

/**
 * The opening: what Patepang is, where to look next, and that it is not out yet. Below it, the
 * Tempel tab as a new person first sees it, with three things worth knowing at its edges.
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
            <a className={`${button.button} ${button.primary} ${button.large}`} href="#cara-kerja">
              Lihat cara kerja
            </a>
            <a className={`${button.button} ${button.ghost}`} href="#fitur">
              Jelajahi fitur
            </a>
          </div>
          <p className={`type-body-small ${styles.status}`}>
            <Icon glyph={HourglassMediumIcon} size="sm" className={styles.statusIcon} />
            <span>Segera hadir. Belum tersedia untuk diunduh.</span>
          </p>
        </div>
      </div>

      <figure className={`page ${styles.exhibit}`}>
        <div className={styles.notesStart}>
          <p className={`${styles.note} ${styles.noteBorn}`}>
            <strong className={styles.noteTitle}>Tanpa email atau nomor telepon</strong>
            Akunmu lahir saat tempel pertama dengan orang yang kamu temui, kapan pun itu.
          </p>
          <p className={`${styles.note} ${styles.noteCode}`}>
            <strong className={styles.noteTitle}>Kode berganti setiap 30 detik</strong>
            Satu HP menampilkan kode, HP lain memindainya, saat kalian berhadapan.
          </p>
        </div>
        <div className={styles.notesEnd}>
          <p className={`${styles.note} ${styles.noteFace}`}>
            <strong className={styles.noteTitle}>Hanya saat bertemu langsung</strong>
            Tempel dilakukan sebelum kalian berpisah. Koneksi tidak bisa dibuat dari pencarian.
          </p>
        </div>
        <TempelScreenPreview className={styles.phone} />
      </figure>
    </section>
  );
}
