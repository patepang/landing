import { ArrowUpIcon } from '@phosphor-icons/react/dist/ssr/ArrowUp';

import { Icon } from '@/components/Icon';
import { entity } from '@/content/entity';
import { sitePages, type SitePage } from '@/content/pages';
import { sections } from '@/content/sections';

import styles from './SiteFooter.module.css';

export interface SiteFooterProps {
  /**
   * `landing`: the section links are #anchors on this page. `elsewhere` (every other page): they
   * lead back into the landing's sections.
   */
  on?: 'landing' | 'elsewhere';
}

interface FooterLink {
  readonly href: string;
  readonly label: string;
}

const groupTitles: Record<SitePage['group'], string> = {
  patepang: 'Patepang',
  kebijakan: 'Kebijakan',
  bantuan: 'Bantuan',
};

/**
 * The site's sign-off: the line Patepang stands for, every page of the site in three groups (the
 * landing's sections, the policies, and help), the wordmark set as wide as the page column, and a
 * last line with the way back up. The header carries the two dots alone; the name closes the
 * page. The groups come from src/content/pages.ts, so every page is linked here. Nothing here
 * moves on scroll; the controls answer the pointer and the keyboard.
 */
export function SiteFooter({ on = 'landing' }: SiteFooterProps) {
  const sectionLinks: FooterLink[] = sections.map((section) => ({
    href: on === 'landing' ? `#${section.id}` : `/#${section.id}`,
    label: section.label,
  }));
  const groups = (Object.keys(groupTitles) as SitePage['group'][]).map((group) => ({
    group,
    title: groupTitles[group],
    links: [
      ...(group === 'patepang' ? sectionLinks : []),
      ...sitePages
        .filter((page) => page.group === group)
        .map((page): FooterLink => ({ href: page.path, label: page.label })),
    ],
  }));

  return (
    <footer className={styles.footer}>
      <div className={`page ${styles.inner}`}>
        <p className={`type-section ${styles.line}`}>Hanya orang yang pernah kamu temui.</p>
        <nav aria-label="Situs" className={styles.nav}>
          {groups.map(({ group, title, links }) => (
            <div key={group} className={styles.group}>
              <h2 id={`kaki-${group}`} className={styles.groupTitle}>
                {title}
              </h2>
              <ul className={styles.links} aria-labelledby={`kaki-${group}`}>
                {links.map((link) => (
                  <li key={link.href}>
                    <a className={styles.link} href={link.href}>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        <div className={styles.end}>
          {/* The name is read in the last line; this is its drawing. */}
          <p className={styles.wordmark} aria-hidden="true">
            patepang
          </p>
          <div className={styles.base}>
            <p className="type-body-small tone-secondary">© 2026 {entity.name ?? 'Patepang'}</p>
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
