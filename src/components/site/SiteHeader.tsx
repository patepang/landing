import { DownloadSimpleIcon } from '@phosphor-icons/react/dist/ssr/DownloadSimple';
import { ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { TwoDots } from '@/components/brand/TwoDots';
import { Icon } from '@/components/Icon';
import { download, sections } from '@/content/sections';

import { HeaderShell } from './HeaderShell';
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
 * The brand mark, the section links and the download action. The mark is the two dots alone,
 * met, as the owner asked (30 October 2026): the header names Patepang to screen readers, while
 * the full lockup stays in the footer. The links sit in a row from 48em and behind a menu button
 * below that; the breakpoints are in em, so a larger reader text size moves the header to its
 * narrow form before anything can collide. HeaderShell adds the floating capsule and the
 * current-section indicator once JavaScript runs.
 */
export function SiteHeader({ on = 'landing' }: SiteHeaderProps) {
  /**
   * A link into the landing: an #anchor on it, or the route plus the anchor from elsewhere.
   * Section links carry `data-section`, so HeaderShell can mark the one the reader is in.
   */
  function into(
    id: string,
    className: string | undefined,
    children: ReactNode,
    extra: { 'data-section'?: string; 'aria-label'?: string } = { 'data-section': id },
  ) {
    return on === 'landing' ? (
      <a className={className} href={`#${id}`} {...extra}>
        {children}
      </a>
    ) : (
      <Link className={className} href={`/#${id}`} {...extra}>
        {children}
      </Link>
    );
  }

  // The dots arrive from apart and meet once as the page first paints.
  const mark = (
    <>
      <TwoDots phase="meet" size="md" from="apart" snug className={styles.mark} />
      <span className="visually-hidden">Patepang</span>
    </>
  );

  return (
    <HeaderShell className={styles.header}>
      <div className={`page ${styles.frame}`}>
        <div className={styles.bar}>
          {on === 'landing' ? (
            <a className={styles.home} href="#atas">
              {mark}
            </a>
          ) : (
            <Link className={styles.home} href="/">
              {mark}
            </Link>
          )}
          <nav aria-label="Utama" className={styles.nav}>
            <div className={styles.track} data-nav-track>
              <ul className={styles.links}>
                {sections.map((section) => (
                  <li key={section.id}>{into(section.id, styles.link, section.label)}</li>
                ))}
              </ul>
              {/*
               * The current-section indicator: the same labels again, set exactly over the links
               * on the brand's mist, and cut down to the current link's capsule. As the cut slides
               * from one link to the next, the label colour changes exactly at its edge.
               */}
              <span className={styles.indicator} data-nav-indicator aria-hidden="true">
                {sections.map((section) => (
                  <span key={section.id} className={styles.indicatorLabel}>
                    {section.label}
                  </span>
                ))}
              </span>
            </div>
            {into(
              download.id,
              styles.cta,
              <>
                <Icon
                  glyph={DownloadSimpleIcon}
                  size="xs"
                  weight="bold"
                  className={styles.ctaIcon}
                />
                {/* "Unduh" on screen; the name stays whole for screen readers. */}
                <span>Unduh</span>
              </>,
              { 'aria-label': download.label },
            )}
            <MobileMenu
              icons={{
                open: <Icon glyph={ListIcon} size="sm" />,
                close: <Icon glyph={XIcon} size="sm" />,
              }}
            >
              <ul className={styles.menuLinks}>
                {sections.map((section) => (
                  <li key={section.id}>{into(section.id, styles.menuLink, section.label)}</li>
                ))}
              </ul>
            </MobileMenu>
          </nav>
        </div>
      </div>
    </HeaderShell>
  );
}
