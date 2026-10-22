import Link from 'next/link';

import { Lockup } from '@/components/brand/Lockup';
import { compactHeaderSection, sections } from '@/content/sections';

import styles from './SiteHeader.module.css';

export interface SiteHeaderProps {
  /**
   * `landing`: links are plain #anchors on this page, so the browser moves focus natively.
   * `elsewhere` (the 404 page): links lead back into the landing's sections.
   */
  on?: 'landing' | 'elsewhere';
}

/**
 * Lockup and a short list of section links. The header does not stick: the page is one story
 * read top to bottom, and at 200% zoom a sticky bar would cover too much of the window.
 */
export function SiteHeader({ on = 'landing' }: SiteHeaderProps) {
  const lockup = <Lockup size="sm" />;
  return (
    <header id="atas" className={styles.header} tabIndex={-1}>
      <div className={`page ${styles.bar}`}>
        {on === 'landing' ? (
          <a className={styles.home} href="#atas">
            {lockup}
          </a>
        ) : (
          <Link className={styles.home} href="/">
            {lockup}
          </Link>
        )}
        <nav aria-label="Utama">
          <ul className={styles.links}>
            {sections.map((section) => (
              <li
                key={section.id}
                className={section.id === compactHeaderSection ? undefined : styles.wideOnly}
              >
                {on === 'landing' ? (
                  <a className={styles.link} href={`#${section.id}`}>
                    {section.label}
                  </a>
                ) : (
                  <Link className={styles.link} href={`/#${section.id}`}>
                    {section.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
