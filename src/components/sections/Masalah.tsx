import { AddressBookIcon } from '@phosphor-icons/react/dist/ssr/AddressBook';
import { ChatCircleIcon } from '@phosphor-icons/react/dist/ssr/ChatCircle';
import { HouseIcon } from '@phosphor-icons/react/dist/ssr/House';
import type { ComponentType } from 'react';

import { Icon } from '@/components/Icon';
import { KeepHyphenated } from '@/components/KeepHyphenated';
import { Avatar, surfaceClass } from '@/components/preview/parts';
import { fiction } from '@/content/fiction';

import styles from './Masalah.module.css';

const { person, firstMeeting } = fiction;

/*
 * The pictures show one meeting after it ends: Sari's, the same one the previews further down
 * keep. They are the everyday tools where a meeting fades (a contact, a feed, a chat), drawn in
 * the page's neutral tones; none of them is a Patepang screen or a real product. They are
 * pictures only, hidden from assistive technology: the words under each carry the meaning.
 */

/** What you remember of the meeting, and nothing in the contact holds it. */
const memories = [firstMeeting.place, firstMeeting.shortDate, 'ngobrol soal buku'];

function ContactPicture() {
  return (
    <div className={`${surfaceClass} ${styles.picture}`} aria-hidden="true">
      <span className={styles.app}>
        <Icon glyph={AddressBookIcon} size="xs" weight="bold" />
        Kontak
      </span>
      <span className={styles.contactHead}>
        <Avatar name={person.name} size="lg" tone={person.avatarTone} />
        <span className="type-headline">{person.name}</span>
      </span>
      {/* What a contact holds: a number, and an empty note. */}
      <span className={styles.fields}>
        <span className={styles.field}>
          <span className={styles.fieldLabel}>Seluler</span>
          <span className="type-body-small">0812 •••• 4027</span>
        </span>
        <span className={styles.field}>
          <span className={styles.fieldLabel}>Catatan</span>
          <span className={styles.empty} />
        </span>
      </span>
      <span className={styles.memoryLabel}>Yang kamu ingat</span>
      <span className={styles.memories}>
        {memories.map((memory) => (
          <span key={memory} className={styles.memory}>
            <span className={styles.memoryFill} data-part="">
              {memory}
            </span>
          </span>
        ))}
      </span>
    </div>
  );
}

function NoisePost({ label }: { label: string }) {
  return (
    <span className={styles.noise}>
      <span className={styles.thumb} />
      <span className={styles.noiseText}>
        <span className={styles.noiseLabel}>{label}</span>
        <span className={styles.bar} />
        <span className={`${styles.bar} ${styles.barShort}`} />
      </span>
    </span>
  );
}

function FeedPicture() {
  return (
    <div className={`${surfaceClass} ${styles.picture}`} aria-hidden="true">
      <span className={styles.app}>
        <Icon glyph={HouseIcon} size="xs" weight="bold" />
        Beranda
      </span>
      {/* Sari's post runs off the bottom of the feed: the picture is meant to cut it. */}
      <span className={styles.feedWindow} data-intentional-crop="">
        <span className={styles.feed} data-part="">
          <NoisePost label="Disarankan untukmu" />
          <NoisePost label="Bersponsor" />
          <NoisePost label="Mungkin kamu kenal" />
          <NoisePost label="Sedang ramai" />
          <NoisePost label="Bersponsor" />
          <span className={styles.post}>
            <Avatar name={person.name} size="md" tone={person.avatarTone} />
            <span className={styles.personText}>
              <span className="type-body-strong">{person.name}</span>
              <span className="type-body-small tone-secondary">
                Buku yang kita obrolin waktu itu akhirnya selesai kubaca.
              </span>
            </span>
          </span>
          <NoisePost label="Disarankan untukmu" />
          <NoisePost label="Sedang ramai" />
        </span>
      </span>
    </div>
  );
}

/** The last message's age, as the chat would put it, a year on. */
const ages = ['hari ini', 'seminggu lalu', 'sebulan lalu', 'setahun lalu'];

function ChatPicture() {
  return (
    <div className={`${surfaceClass} ${styles.picture}`} aria-hidden="true">
      <span className={styles.app}>
        <Icon glyph={ChatCircleIcon} size="xs" weight="bold" />
        Pesan
      </span>
      <span className={styles.chatWith}>
        <Avatar name={person.name} size="sm" tone={person.avatarTone} />
        <span className="type-body-strong">{person.name}</span>
      </span>
      <span className={styles.thread}>
        <span className={styles.day}>{firstMeeting.shortDate}</span>
        <span className={`${styles.bubble} ${styles.mine}`}>Senang ketemu tadi!</span>
        <span className={`${styles.bubble} ${styles.theirs}`}>
          Sama-sama! Kapan-kapan ketemu lagi, ya.
        </span>
        <span className={`${styles.bubble} ${styles.mine}`}>Iya, kapan-kapan.</span>
      </span>
      <span className={styles.lastMessage}>
        Pesan terakhir
        {/* One line shows at a time: the picture is meant to cut the others. */}
        <span className={styles.age} data-intentional-crop="">
          <span className={styles.ages} data-part="">
            {ages.map((age) => (
              <span key={age}>{age}</span>
            ))}
          </span>
        </span>
      </span>
    </div>
  );
}

/** What happens after a good meeting, in the visitor's own experience, a week to a year on. */
const moments: readonly {
  when: string;
  title: string;
  body: string;
  Picture: ComponentType;
}[] = [
  {
    when: 'Seminggu kemudian',
    title: 'Kontaknya tersimpan, ceritanya hilang.',
    body: 'Nama dan nomor ada di HP. Kapan dan di mana kalian bertemu tidak tercatat.',
    Picture: ContactPicture,
  },
  {
    when: 'Sebulan kemudian',
    title: 'Kabarnya tenggelam.',
    body: 'Kabar dari orang yang kamu temui bercampur dengan orang asing dan feed tanpa ujung.',
    Picture: FeedPicture,
  },
  {
    when: 'Setahun kemudian',
    title: 'Bertemu lagi terus tertunda.',
    body: 'Tanpa pengingat dan rencana, “kapan-kapan ketemu lagi” mudah berhenti sebagai basa-basi.',
    Picture: ChatPicture,
  },
];

/**
 * The problem Patepang answers: real meetings that fade once people part. Below the heading, a
 * rail runs from the day two people met (the two dots together) through a week, a month and a
 * year; as the reader scrolls, the second dot drifts away along it and each moment's picture
 * plays out. The motion is tied to scrolling and needs no script; without it, each picture shows
 * how it ends.
 */
export function Masalah() {
  return (
    <section className={styles.section} aria-labelledby="masalah">
      <div className={`page ${styles.intro}`}>
        <h2 id="masalah" className={`type-section ${styles.title}`}>
          Setelah pamit, kabar sering berhenti begitu saja.
        </h2>
        <p className={`type-body-large tone-secondary ${styles.lede}`}>
          Pertemuannya hangat. Setelah berpisah, hubungannya perlahan hilang.
        </p>
      </div>
      <div className={styles.stage}>
        <div className={`page ${styles.story}`}>
          <div className={styles.rail} aria-hidden="true">
            <span className={styles.you} />
            <span className={styles.them} />
          </div>
          <p className={styles.met} aria-hidden="true">
            Hari kalian bertemu
          </p>
          <ol className={styles.moments} role="list">
            {moments.map(({ when, title, body, Picture }) => (
              <li key={when} className={styles.moment}>
                <p className={styles.when}>{when}</p>
                <Picture />
                <div className={styles.words}>
                  <h3 className={`type-title ${styles.momentTitle}`}>{title}</h3>
                  <p className="type-body tone-secondary">
                    <KeepHyphenated text={body} />
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
