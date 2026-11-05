import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { External, Placeholder } from '@/components/doc/parts';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';
import { released } from '@/content/status';

/*
 * Licences: Patepang's own code (app ADR 0060 B33: AGPL-3.0-only for the app and the core, as
 * libsignal requires, and for the backend by choice; the repositories open at public launch,
 * after the audit), and the third-party software this site ships (package.json, the font's
 * SOURCE.md and OFL.txt). The app's own notices list is not written yet.
 */

const page = pageAt('/lisensi');

export const metadata = pageMetadata(page);

const siteSoftware = [
  { name: 'Next.js', license: 'Lisensi MIT', role: 'kerangka situs' },
  { name: 'React dan React DOM', license: 'Lisensi MIT', role: 'tampilan situs' },
  { name: 'Phosphor Icons', license: 'Lisensi MIT', role: 'ikon' },
  {
    name: 'Plus Jakarta Sans',
    license: 'SIL Open Font License 1.1',
    role: 'huruf, © 2020 The Plus Jakarta Sans Project Authors',
  },
] as const;

const sections: DocSection[] = [
  {
    id: 'kode-patepang',
    title: 'Kode Patepang',
    body: (
      <>
        <p>
          Kode aplikasi dan inti Patepang ditetapkan memakai lisensi GNU Affero General Public
          License versi 3 (AGPL-3.0-only). Lisensi ini wajib, karena keduanya memakai libsignal yang
          berlisensi sama. Kode server Patepang juga memakai AGPL-3.0-only, sebagai pilihan
          keterbukaan.
        </p>
        {released ? (
          <p>
            Kode Patepang dibuka saat peluncuran publik, setelah audit keamanan oleh pihak luar.{' '}
            <Placeholder>Alamat kode sumber: diisi pemilik saat peluncuran</Placeholder>
          </p>
        ) : (
          <p>
            Kode Patepang akan dibuka saat peluncuran publik, setelah audit keamanan oleh pihak
            luar. Sampai saat itu kodenya belum terbuka untuk umum.
          </p>
        )}
      </>
    ),
  },
  {
    id: 'artinya',
    title: 'Artinya bagimu',
    body: (
      <>
        <p>
          Setelah kodenya dibuka, kamu boleh memakai, mempelajari, mengubah, dan membagikannya. Bila
          kamu membagikan versi yang diubah, atau menjalankannya sebagai layanan untuk orang lain
          lewat jaringan, kamu wajib menyediakan kode sumbernya dengan lisensi yang sama.
        </p>
        <p>
          Teks lengkap lisensinya ada di{' '}
          <External href="https://www.gnu.org/licenses/agpl-3.0.html">situs GNU</External>.
        </p>
      </>
    ),
  },
  {
    id: 'situs-ini',
    title: 'Perangkat lunak di situs ini',
    body: (
      <>
        <dl>
          {siteSoftware.map((item) => (
            <div key={item.name}>
              <dt>{item.name}</dt>
              <dd>
                {item.license}, untuk {item.role}.
              </dd>
            </div>
          ))}
        </dl>
        <p>
          Next.js menyertakan komponen terbuka lain dengan lisensinya masing-masing. Huruf Plus
          Jakarta Sans disajikan dari situs ini sendiri; lisensinya ada di{' '}
          <External href="https://openfontlicense.org/">openfontlicense.org</External>.
        </p>
      </>
    ),
  },
  {
    id: 'aplikasi',
    title: 'Perangkat lunak di aplikasi',
    body: (
      <p>
        Aplikasi Patepang memakai libsignal (AGPL-3.0-only) dan perangkat lunak terbuka lain.{' '}
        <Placeholder>
          Daftar lengkap pemberitahuan pihak ketiga untuk aplikasi: menyusul
        </Placeholder>
      </p>
    ),
  },
  {
    id: 'merek',
    title: 'Merek',
    body: <p>App Store adalah merek Apple Inc. Google Play adalah merek Google LLC.</p>,
  },
];

export default function LisensiPage() {
  return (
    <DocPage
      page={page}
      lede={
        <p>
          Lisensi kode Patepang, rencana membukanya, dan perangkat lunak pihak ketiga yang dipakai
          situs ini.
        </p>
      }
      sections={sections}
    />
  );
}
