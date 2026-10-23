import { ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';
import Link from 'next/link';

import { Lockup } from '@/components/brand/Lockup';
import { Icon } from '@/components/Icon';
import { sections } from '@/content/sections';

import { MobileMenu } from './MobileMenu';
import styles from './SiteHeader.module.css';

export interface SiteHeaderProps {
  /**
   * `landing`: links are plain #anchors on this page, so the browser moves focus natively.
   * `elsewhere` (the 404 page): links lead back into the landing's sections.
   */
  on?: 'landing' | 'elsewhere';
}

/**
 * Lockup and the section links: inline from 768px, behind a "Menu" disclosure below that. The
 * header does not stick: the page is read top to bottom, and at 200% zoom a sticky bar would cover
 * too much of the window.
 */
export function SiteHeader({ on = 'landing' }: SiteHeaderProps) {
  const lockup = <Lockup size="sm" />;

  function links(className: string | undefined) {
    return sections.map((section) => (
      <li key={section.id}>
        {on === 'landing' ? (
          <a className={className} href={`#${section.id}`}>
            {section.label}
          </a>
        ) : (
          <Link className={className} href={`/#${section.id}`}>
            {section.label}
          </Link>
        )}
      </li>
    ));
  }

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
          <ul className={styles.links}>{links(styles.link)}</ul>
          <MobileMenu
            icons={{
              open: <Icon glyph={ListIcon} size="sm" />,
              close: <Icon glyph={XIcon} size="sm" />,
            }}
          >
            <ul className={`page ${styles.menuLinks}`}>{links(styles.menuLink)}</ul>
          </MobileMenu>
        </nav>
      </div>
    </header>
  );
}
