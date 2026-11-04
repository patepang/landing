import { CaretDownIcon } from '@phosphor-icons/react/dist/ssr/CaretDown';
import { HourglassMediumIcon } from '@phosphor-icons/react/dist/ssr/HourglassMedium';
import { ScalesIcon } from '@phosphor-icons/react/dist/ssr/Scales';
import type { ReactNode } from 'react';

import { Icon } from '@/components/Icon';
import { SiteFooter } from '@/components/site/SiteFooter';
import { SiteHeader } from '@/components/site/SiteHeader';
import type { SitePage } from '@/content/pages';
import { pageNote } from '@/content/status';

import styles from './DocPage.module.css';

export interface DocSection {
  /** The heading's id, for the table of contents and links from other pages. */
  readonly id: string;
  readonly title: string;
  readonly body: ReactNode;
}

export interface DocPageProps {
  readonly page: SitePage;
  /** What the page is for, in a sentence or two, under the title. */
  readonly lede: ReactNode;
  readonly sections: readonly DocSection[];
  /**
   * Numbered sections, as a legal document's are, so a clause can be cited ("bagian 4"). The
   * numbers are part of the headings, so they are read too.
   */
  readonly numbered?: boolean;
  /** Pages that explain what the app does say, while it cannot be installed, that it cannot yet. */
  readonly appNote?: boolean;
}

/** "4 November 2026", in Indonesian, from an ISO date, the same on any build machine. */
function longDate(iso: string): string {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${iso}T00:00:00Z`));
}

/**
 * A page to read: a policy, a help page, a notice. The site's header and footer frame it; inside,
 * a masthead (title, what it is for, when it last changed, and, for drafts, the notice that it is
 * not in force), then the sections in one calm reading column, with their contents beside them
 * on wide screens and folded above them on phones. Nothing here needs JavaScript.
 */
/** Pages with at least this many sections get their contents listed. */
const TOC_FROM = 5;

export function DocPage({ page, lede, sections, numbered = false, appNote = false }: DocPageProps) {
  const heading = (index: number, title: string) =>
    numbered ? `${String(index + 1)}. ${title}` : title;
  const note = appNote ? pageNote : null;
  const toc = sections.length >= TOC_FROM;
  const contents = (
    <ol className={styles.tocList}>
      {sections.map((section, index) => (
        <li key={section.id}>
          <a className={styles.tocLink} href={`#${section.id}`}>
            {numbered ? <span className={styles.tocNumber}>{String(index + 1)}</span> : null}
            <span>{section.title}</span>
          </a>
        </li>
      ))}
    </ol>
  );

  return (
    <>
      {/* The top of the page, where the mark's link and "Kembali ke atas" lead. */}
      <div id="atas" tabIndex={-1} />
      <a className="skip-link" href="#isi">
        Langsung ke isi
      </a>
      <SiteHeader on="elsewhere" />
      <main id="isi" tabIndex={-1} className={styles.main}>
        <article>
          <div className={`page ${styles.masthead}`}>
            <h1 className={`type-hero ${styles.title}`}>{page.title}</h1>
            <div className={`type-body-large tone-secondary ${styles.lede}`}>{lede}</div>
            <p className="type-body-small tone-secondary">
              Terakhir diperbarui <time dateTime={page.updated}>{longDate(page.updated)}</time>
            </p>
            {page.draft ? (
              <p className={styles.draft} role="note">
                <Icon glyph={ScalesIcon} size="md" className={styles.noticeIcon} />
                <span>
                  <strong className={styles.draftTitle}>
                    Draf: menunggu tinjauan penasihat hukum. Belum berlaku.
                  </strong>{' '}
                  Isinya bisa berubah setelah ditinjau. Bagian bertanda kurung siku, seperti{' '}
                  <span className={styles.sample}>[Nama badan hukum]</span>, menunggu data dari
                  pemilik Patepang.
                </span>
              </p>
            ) : null}
            {note ? (
              <p className={styles.appNote}>
                <Icon glyph={HourglassMediumIcon} size="md" className={styles.noticeIcon} />
                <span>{note}</span>
              </p>
            ) : null}
          </div>

          <div className={`page ${styles.body}`} data-toc={toc ? '' : undefined}>
            {toc ? (
              <>
                {/*
                 * The contents twice, one shown at a time (the other is display: none, so it is
                 * neither read nor reachable): folded in a native disclosure on phones, and as an
                 * always-open rail beside the text from 64em.
                 */}
                <nav aria-label="Isi halaman" className={styles.tocFolded}>
                  <details className={styles.tocDetails}>
                    <summary className={styles.tocSummary}>
                      <span>Isi halaman</span>
                      <Icon glyph={CaretDownIcon} size="sm" className={styles.tocCaret} />
                    </summary>
                    {contents}
                  </details>
                </nav>
                <nav aria-labelledby="isi-halaman" className={styles.tocRail}>
                  <p id="isi-halaman" className={styles.tocHeading}>
                    Isi halaman
                  </p>
                  {contents}
                </nav>
              </>
            ) : null}

            <div className={styles.prose} data-prose="">
              {sections.map((section, index) => (
                <section key={section.id} className={styles.section} aria-labelledby={section.id}>
                  <h2 id={section.id} className={styles.sectionTitle} tabIndex={-1}>
                    {heading(index, section.title)}
                  </h2>
                  {section.body}
                </section>
              ))}
            </div>
          </div>
        </article>
      </main>
      <SiteFooter on="elsewhere" />
    </>
  );
}
