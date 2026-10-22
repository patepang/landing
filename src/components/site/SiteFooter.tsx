import { Lockup } from '@/components/brand/Lockup';

import styles from './SiteFooter.module.css';

/**
 * Short and real: the lockup, the one line Patepang stands for, and the way back up. The page's
 * status is said where it matters (hero, status section, FAQ), not repeated on the way out.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`page ${styles.inner}`}>
        <div className={styles.identity}>
          <Lockup size="sm" />
          <p className="type-body tone-secondary">Hanya orang yang pernah kamu temui.</p>
        </div>
        <a className={styles.link} href="#atas">
          Kembali ke atas
        </a>
      </div>
    </footer>
  );
}
