import { CalendarBlankIcon } from '@phosphor-icons/react/dist/ssr/CalendarBlank';
import { CalendarCheckIcon } from '@phosphor-icons/react/dist/ssr/CalendarCheck';
import { CaretRightIcon } from '@phosphor-icons/react/dist/ssr/CaretRight';
import { CheckIcon } from '@phosphor-icons/react/dist/ssr/Check';
import { HandshakeIcon } from '@phosphor-icons/react/dist/ssr/Handshake';
import { HourglassMediumIcon } from '@phosphor-icons/react/dist/ssr/HourglassMedium';
import { ImageSquareIcon } from '@phosphor-icons/react/dist/ssr/ImageSquare';
import { MapPinIcon } from '@phosphor-icons/react/dist/ssr/MapPin';

import { TwoDots } from '@/components/brand/TwoDots';
import { Icon } from '@/components/Icon';
import { fiction } from '@/content/fiction';

import styles from './AfterPreviews.module.css';
import { Avatar, Badge, Divider, surfaceClass } from './parts';

const { person, firstMeeting } = fiction;

/**
 * The end of the daily Kabar page (KabarScreen footer + DayCompleteCard): the dots meet and the
 * page says it is finished. The count of people is left out, as the card does when it has none.
 */
export function KabarEndPreview() {
  return (
    <div
      className={styles.stack}
      role="img"
      aria-label="Akhir halaman Kabar di aplikasi Patepang: kartu “Selesai untuk hari ini. Kamu sudah membaca semua kabar hari ini. Kabar berikutnya datang besok; tidak ada yang perlu dikejar.”"
    >
      <TwoDots phase="meet" size="sm" className={styles.centerDots} />
      <div className={`${surfaceClass} ${styles.dayComplete}`}>
        <span className={styles.stateBadge}>
          <Icon glyph={CalendarCheckIcon} size="lg" weight="duotone" />
        </span>
        <span className={styles.stateText}>
          <span className="type-headline">Selesai untuk hari ini</span>
          <span className="type-body tone-secondary">
            Kamu sudah membaca semua kabar hari ini. Kabar berikutnya datang besok; tidak ada yang
            perlu dikejar.
          </span>
        </span>
      </div>
    </div>
  );
}

/** One meeting, remembered (MomenCard, origin "tap", no photo yet). */
export function MomenPreview() {
  return (
    <div
      className={`${surfaceClass} ${styles.momen}`}
      role="img"
      aria-label={`Kartu momen di aplikasi Patepang: ${firstMeeting.longDate}, di ${firstMeeting.place}, bersama ${person.firstName}, dengan catatan singkat, belum ada foto, dan tanda “Tempel langsung”.`}
    >
      <span className={styles.titleBlock}>
        <span className="type-headline">{firstMeeting.longDate}</span>
        <span className={styles.place}>
          <Icon glyph={MapPinIcon} size="xs" className={styles.mutedIcon} />
          <span className="type-body-small tone-secondary">{firstMeeting.place}</span>
        </span>
      </span>
      <span className="type-body">{firstMeeting.note}</span>
      <span className={styles.people}>
        <Avatar name={person.name} size="sm" tone={person.avatarTone} />
        <span className="type-body-small tone-secondary">Bersama {person.firstName}</span>
      </span>
      <span className={styles.photo}>
        <Icon glyph={ImageSquareIcon} size="sm" className={styles.mutedIcon} />
        <span className="type-body-small tone-tertiary">Foto bersama belum ditambahkan</span>
      </span>
      <Badge
        label="Tempel langsung"
        tone="brand"
        icon={<Icon glyph={HandshakeIcon} size="xs" weight="bold" />}
      />
    </div>
  );
}

/**
 * A person, told as the history between the two of you (ConnectionCard with its fading warning),
 * and the plan that answers it (a row of the Rencana list).
 */
export function MeetAgainPreview() {
  return (
    <div
      className={styles.stack}
      role="img"
      aria-label={`Kartu koneksi di aplikasi Patepang: ${person.name}, pertama bertemu ${firstMeeting.shortDate} di ${firstMeeting.place}, bertemu ${String(fiction.meetings)} kali, terakhir ${fiction.lastMet}, dengan peringatan “Memudar ${fiction.fadesIn}”. Di bawahnya, rencana “${fiction.plan.title}”, ${fiction.plan.when}, jawaban “${fiction.plan.rsvp}”.`}
    >
      <div className={surfaceClass}>
        <span className={styles.connectionHeader}>
          <Avatar name={person.name} size="lg" tone={person.avatarTone} />
          <span className={styles.identity}>
            <span className="type-headline">{person.name}</span>
            <span className="type-body-small tone-secondary">
              Pertama bertemu {firstMeeting.shortDate} di {firstMeeting.place}
            </span>
          </span>
        </span>
        <Divider />
        <span className={styles.facts}>
          <span className={styles.fact}>
            <Icon glyph={HandshakeIcon} size="sm" className={styles.mutedIcon} />
            <span className="type-body-small tone-secondary">Bertemu {fiction.meetings} kali</span>
          </span>
          <span className={styles.fact}>
            <Icon glyph={CalendarBlankIcon} size="sm" className={styles.mutedIcon} />
            <span className="type-body-small tone-secondary">Terakhir {fiction.lastMet}</span>
          </span>
        </span>
        <span className={styles.fading}>
          <Icon glyph={HourglassMediumIcon} size="sm" />
          <span className="type-body-small">
            Memudar {fiction.fadesIn}. Bertemu dan tempel lagi untuk menyegarkan koneksi ini.
          </span>
        </span>
      </div>

      <div className={`${surfaceClass} ${styles.planRow}`}>
        {/* As in ListItem: when the row gets narrow, the status moves under the title block. */}
        <span className={styles.planMain}>
          <span className={styles.planText}>
            <span className="type-body-strong">{fiction.plan.title}</span>
            <span className="type-body-small tone-secondary">
              {fiction.plan.when} · Bersama {person.firstName}
            </span>
          </span>
          <Badge
            label={fiction.plan.rsvp}
            tone="success"
            icon={<Icon glyph={CheckIcon} size="xs" weight="bold" />}
          />
        </span>
        <Icon glyph={CaretRightIcon} size="sm" className={styles.mutedIcon} />
      </div>
    </div>
  );
}
