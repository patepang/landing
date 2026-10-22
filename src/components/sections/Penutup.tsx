import { TwoDots } from '@/components/brand/TwoDots';
import button from '@/components/ui/button.module.css';

import styles from './Penutup.module.css';

/**
 * The page has an end, like the Kabar page: the dots have met, and the only actions lead back
 * into the page itself.
 */
export function Penutup() {
  return (
    <section className={styles.closing} aria-labelledby="penutup">
      <div className={`page ${styles.inner}`}>
        <TwoDots phase="meet" size="lg" />
        <h2 id="penutup" className="type-section">
          Selesai. Tidak ada yang perlu dikejar.
        </h2>
        <p className="type-body-large tone-secondary">
          Kalau ingin melihat lagi, mulai dari cara tempel atau kembali ke pratinjau layar Tempel.
        </p>
        <div className={styles.actions}>
          <a className={`${button.button} ${button.primary} ${button.large}`} href="#cara-tempel">
            Lihat cara tempel
          </a>
          <a className={`${button.button} ${button.ghost}`} href="#pratinjau">
            Kembali ke pratinjau
          </a>
        </div>
      </div>
    </section>
  );
}
