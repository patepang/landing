import { Lockup } from '@/components/brand/Lockup';
import { sections } from '@/content/sections';

import styles from './SiteFooter.module.css';

/**
 * The lockup and the line Patepang stands for, the section links again, and the way back up.
 * Only real destinations: there is no contact, social account or legal page to link to yet.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`page ${styles.inner}`}>
        <div className={styles.identity}>
          <Lockup size="sm" />
          <p className="type-body tone-secondary">Hanya orang yang pernah kamu temui.</p>
        </div>
        <nav aria-label="Halaman ini" className={styles.nav}>
          <ul className={styles.links}>
            {sections.map((section) => (
              <li key={section.id}>
                <a className={styles.link} href={`#${section.id}`}>
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className={styles.base}>
          <p className="type-body-small tone-secondary">© 2026 Patepang</p>
          <a className={styles.link} href="#atas">
            Kembali ke atas
          </a>
        </div>
      </div>
    </footer>
  );
}
