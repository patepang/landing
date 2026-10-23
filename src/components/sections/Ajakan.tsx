import { TwoDots } from '@/components/brand/TwoDots';
import button from '@/components/ui/button.module.css';

import styles from './Ajakan.module.css';

/**
 * The closing call. There is nothing to download or sign up for yet, so it says when (not yet)
 * and offers the two things a visitor can do now, both on this page.
 */
export function Ajakan() {
  return (
    <section className={styles.cta} aria-labelledby="segera-hadir">
      <div className={`page ${styles.inner}`}>
        <TwoDots phase="meet" size="lg" />
        <h2 id="segera-hadir" className={`type-section ${styles.title}`}>
          Patepang segera hadir.
        </h2>
        <p className="type-body-large">
          Belum ada tanggal rilis. Sementara itu, lihat lagi cara kerjanya dan apa yang terjadi
          setelah kalian bertemu.
        </p>
        <div className={styles.actions}>
          <a className={`${button.button} ${button.primary} ${button.large}`} href="#cara-kerja">
            Lihat cara kerja
          </a>
          <a className={`${button.button} ${button.ghost}`} href="#fitur">
            Jelajahi fitur
          </a>
        </div>
      </div>
    </section>
  );
}
