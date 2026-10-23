/**
 * Sample data shown in the app previews. Nothing here describes a real person, place, plan or
 * user, and none of it is shown as evidence (no counts, quotes or testimonials).
 *
 * The strings are what the app's own formatters produce for these values (id-ID), and they are
 * consistent with each other for a reading date of 22 October 2026: the last meeting was 341 days
 * earlier ("11 bulan lalu"), so the connection fades in 24 days, inside the month-11 warning.
 */
export const fiction = {
  person: {
    name: 'Sari Wulandari',
    firstName: 'Sari',
    /** avatarTones index from the app's name hash (Avatar.tsx toneFor); 0 is the forest pair. */
    avatarTone: 0,
  },
  firstMeeting: {
    /** formatLongDate(3 March 2025) */
    longDate: 'Senin, 3 Maret 2025',
    /** formatShortDate(3 March 2025) */
    shortDate: '3 Mar 2025',
    /** Typed by the people who were there; Patepang never records a location. */
    place: 'kedai kopi dekat stasiun',
    note: 'Ngobrol soal buku sampai kedainya hampir tutup.',
  },
  meetings: 3,
  /** formatRelativePast for a meeting 341 days ago. */
  lastMet: '11 bulan lalu',
  /** formatRelativeFuture(24) */
  fadesIn: 'dalam 24 hari',
  plan: {
    title: 'Ngopi lagi di kedai yang sama',
    /** planWhen(): formatWeekdayDate + "pukul" + formatTime */
    when: 'Sabtu, 7 November pukul 09.00',
    /** rsvpWords.yes */
    rsvp: 'Ikut',
  },
  /** Seed of the demo code pattern (qrSeed('demo', 0) in the app's terms). */
  codeOwner: 'demo',
} as const;
