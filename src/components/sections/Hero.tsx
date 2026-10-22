import { InfoIcon } from '@phosphor-icons/react/dist/ssr/Info';

import { Icon } from '@/components/Icon';
import { PreviewLabel } from '@/components/preview/parts';
import { TempelScreenPreview } from '@/components/preview/TempelScreenPreview';
import button from '@/components/ui/button.module.css';

import styles from './Hero.module.css';

/**
 * The opening: what Patepang is, what to do here, and that it is a prototype. Below it, the first
 * stop of the tour: the Tempel tab as a new person sees it, annotated at its edges.
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
            Patepang sedang dirancang sebagai aplikasi HP untuk menjaga hubungan dengan orang yang
            benar-benar pernah kamu temui.{' '}
            <strong className={styles.emphasis}>
              Koneksinya hanya lahir saat kalian bertemu langsung.
            </strong>
          </p>
          <div className={styles.actions}>
            <a className={`${button.button} ${button.primary} ${button.large}`} href="#cara-tempel">
              Lihat cara tempel
            </a>
            <a className={`${button.button} ${button.ghost}`} href="#prototipe">
              Tentang prototipe
            </a>
          </div>
          <p className={`type-body-small ${styles.status}`}>
            <Icon glyph={InfoIcon} size="sm" className={styles.statusIcon} />
            <span>Masih prototipe dengan data fiktif. Belum tersedia untuk diunduh.</span>
          </p>
        </div>
      </div>

      <figure id="pratinjau" className={`page ${styles.exhibit}`} tabIndex={-1}>
        <div className={styles.notesStart}>
          <p className={`${styles.note} ${styles.noteBorn}`}>
            <strong className={styles.noteTitle}>Tanpa email atau nomor telepon</strong>
            Akun lahir saat tempel pertama dengan orang yang kamu temui, kapan pun itu.
          </p>
          <p className={`${styles.note} ${styles.noteCode}`}>
            <strong className={styles.noteTitle}>Kode berganti setiap 30 detik</strong>
            Satu HP menampilkan kode, HP lain memindainya. Di prototipe, kode ini hanya pola demo
            yang tidak bisa dipindai.
          </p>
        </div>
        <div className={styles.notesEnd}>
          <p className={`${styles.note} ${styles.noteFace}`}>
            <strong className={styles.noteTitle}>Hanya saat bertemu langsung</strong>
            Tempel dilakukan saat kalian berhadapan, sebelum berpisah. Koneksi tidak bisa dibuat
            dari pencarian.
          </p>
        </div>
        <TempelScreenPreview className={styles.phone} />
        <PreviewLabel className={styles.label} />
      </figure>
    </section>
  );
}
