import { TwoDots } from '@/components/brand/TwoDots';
import button from '@/components/ui/button.module.css';

import styles from './Ajakan.module.css';

/**
 * The closing call, and where the header's download action leads (#unduh). The store links are
 * not in yet, so for now it says how to start and offers two things to look at on this page.
 */
export function Ajakan() {
  return (
    <section className={styles.cta} aria-labelledby="unduh">
      <div className={`page ${styles.inner}`}>
        <TwoDots phase="meet" size="lg" />
        <h2 id="unduh" className={`type-section ${styles.title}`} tabIndex={-1}>
          Patepang sudah hadir.
        </h2>
        <p className="type-body-large">
          Pasang Patepang di <span className="nowrap">HP-mu</span>, lalu tempel dengan orang yang
          kamu temui berikutnya. Koneksi pertamamu lahir di pertemuan itu.
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
