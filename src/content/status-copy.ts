import type { Availability } from './availability';

/**
 * Every word and link on the site that depends on whether Patepang can be installed yet, for a
 * given state of the owner's switch. A pure function, so the tests can derive what each build
 * should say (relative imports only: the Playwright tests import this file directly). The site
 * reads the current state's words from src/content/status.ts.
 */
export interface Store {
  readonly id: 'app-store' | 'google-play';
  readonly name: string;
  /** The phones it serves, said next to the store's name. */
  readonly platform: string;
  readonly href: string;
}

export function statusFor(availability: Availability) {
  const released = availability.state === 'tersedia';
  const stores: readonly Store[] =
    availability.state === 'tersedia'
      ? [
          {
            id: 'app-store',
            name: 'App Store',
            platform: 'iPhone',
            href: availability.appStore,
          },
          {
            id: 'google-play',
            name: 'Google Play',
            platform: 'Android',
            href: availability.googlePlay,
          },
        ]
      : [];
  return {
    /** Patepang is in the App Store and Google Play. */
    released,
    /** The store pages, once there are any; none before. */
    stores,
    /**
     * The header's action, which leads to the closing section (#unduh): the download once there
     * is one, and until then the honest status, which the closing section explains.
     */
    headerAction: released
      ? { label: 'Unduh', name: 'Unduh Patepang' }
      : { label: 'Segera hadir', name: 'Segera hadir: kapan Patepang bisa dipakai' },
    /** The line under the opening's actions while there is nothing to download. */
    heroStatus: released ? null : 'Segera hadir di Indonesia. Belum bisa diunduh.',
    /** The closing section (#unduh). */
    closing: released
      ? {
          title: 'Patepang sudah hadir.',
          body: 'Pasang Patepang di HP-mu, lalu tempel dengan orang yang kamu temui berikutnya. Koneksi pertamamu lahir di pertemuan itu.',
        }
      : {
          title: 'Patepang segera hadir di Indonesia.',
          body: 'Untuk iPhone dan Android, bagi yang berumur 18 tahun ke atas. Belum ada tanggal rilis. Saat Patepang sudah bisa dipasang, tautannya ada di sini.',
        },
    /** "Kapan Patepang bisa dipakai?" */
    whenAnswer: released
      ? 'Sekarang. Patepang ada di App Store dan Google Play, untuk umur 18 tahun ke atas. Koneksi pertamamu lahir saat kamu tempel dengan orang yang kamu temui berikutnya.'
      : 'Belum sekarang. Patepang sedang dibangun dan belum ada di App Store maupun Google Play. Peluncuran pertama di Indonesia, untuk umur 18 tahun ke atas. Belum ada tanggal rilis.',
    /** The end of the site's description, for search results and link previews. */
    descriptionStatus: released
      ? 'Tersedia di App Store dan Google Play.'
      : 'Segera hadir di Indonesia.',
    /**
     * Said at the top of pages that explain what the app does (deleting an account,
     * subscriptions) while the app cannot be installed yet. Gone once it can.
     */
    pageNote: released
      ? null
      : 'Patepang belum bisa diunduh. Halaman ini menjelaskan cara kerjanya saat aplikasi tersedia.',
    /** The current state on the about page. */
    aboutStatus: released
      ? 'Patepang tersedia di App Store dan Google Play.'
      : 'Patepang sedang dibangun dan belum bisa diunduh. Belum ada tanggal rilis.',
  } as const;
}

export type Status = ReturnType<typeof statusFor>;
