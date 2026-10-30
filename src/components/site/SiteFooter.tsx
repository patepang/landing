import { ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';

import { Icon } from '@/components/Icon';
import { sections } from '@/content/sections';

import styles from './SiteFooter.module.css';

/**
 * The page's sign-off: the line Patepang stands for and the section links again, the wordmark set
 * as wide as the page column, and a last line with the way back up. The header carries the two
 * dots alone; the name closes the page. Only real destinations: there is no contact, social
 * account or legal page to link to yet. Nothing here moves on scroll; the controls answer the
 * pointer and the keyboard.
 */
export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`page ${styles.inner}`}>
        <p className={`type-section ${styles.line}`}>Hanya orang yang pernah kamu temui.</p>
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
        <div className={styles.end}>
          {/* The name is read in the last line; this is its drawing. */}
          <p className={styles.wordmark} aria-hidden="true">
            patepang
          </p>
          <div className={styles.base}>
            <p className="type-body-small tone-secondary">© 2026 Patepang</p>
            <a className={styles.top} href="#atas">
              <Icon glyph={ArrowUpIcon} size="xs" weight="bold" className={styles.topIcon} />
              Kembali ke atas
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
