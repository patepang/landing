import { DownloadSimpleIcon } from '@phosphor-icons/react/dist/ssr/DownloadSimple';
import { HourglassMediumIcon } from '@phosphor-icons/react/dist/ssr/HourglassMedium';
import { ListIcon } from '@phosphor-icons/react/dist/ssr/List';
import { XIcon } from '@phosphor-icons/react/dist/ssr/X';
import type { ReactNode } from 'react';

import { TwoDots } from '@/components/brand/TwoDots';
import { Icon } from '@/components/Icon';
import { closingId, sections } from '@/content/sections';
import { headerAction, released } from '@/content/status';

import { HeaderShell } from './HeaderShell';
import { MobileMenu } from './MobileMenu';
import styles from './SiteHeader.module.css';

export interface SiteHeaderProps {
  /**
   * `landing`: links are plain #anchors on this page, so the browser moves focus natively.
   * `elsewhere` (every other page): links lead back into the landing's sections.
   */
  on?: 'landing' | 'elsewhere';
}

/**
 * The brand mark, the section links and the action: "Unduh" once Patepang is in the stores,
 * "Segera hadir" until then (src/content/status.ts), both leading to the closing section, which
 * holds the store links or says when. The mark is the two dots alone,
 * met, as the owner asked (30 October 2026): the header names Patepang to screen readers, while
 * the full lockup stays in the footer. The links sit in a row from 48em and behind a menu button
 * below that; the breakpoints are in em, so a larger reader text size moves the header to its
 * narrow form before anything can collide. HeaderShell adds the floating capsule and the
 * current-section indicator once JavaScript runs.
 */
export function SiteHeader({ on = 'landing' }: SiteHeaderProps) {
  /**
   * A link into the landing: an #anchor on it, or the route plus the anchor from elsewhere, as a
   * plain link: the site is static, so a page loads whole, and nothing is fetched ahead of a
   * click. Section links carry `data-section`, so HeaderShell can mark the one the reader is in.
   */
  function into(
    id: string,
    className: string | undefined,
    children: ReactNode,
    extra: { 'data-section'?: string; 'aria-label'?: string; 'data-released'?: string } = {
      'data-section': id,
    },
  ) {
    return (
      <a className={className} href={on === 'landing' ? `#${id}` : `/#${id}`} {...extra}>
        {children}
      </a>
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
          <a className={styles.home} href={on === 'landing' ? '#atas' : '/'}>
            {mark}
          </a>
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
              closingId,
              styles.cta,
              <>
                <Icon
                  glyph={released ? DownloadSimpleIcon : HourglassMediumIcon}
                  size="xs"
                  weight="bold"
                  className={styles.ctaIcon}
                />
                {/* A short label on screen; the name says it in full for screen readers. */}
                <span>{headerAction.label}</span>
              </>,
              { 'aria-label': headerAction.name, 'data-released': released ? 'true' : 'false' },
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
