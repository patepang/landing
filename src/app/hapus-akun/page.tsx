import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { Entity, Mail, Placeholder } from '@/components/doc/parts';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';

/*
 * How to delete a Patepang account and its data, what goes and when, and what stays (fakta-data
 * §8.1 to §8.4; app DeleteAccountScreen.tsx @ b4c6118 for the steps and words). Google Play asks
 * for this page: it names the app and its developer, the steps, the data deleted and kept, and
 * how long. There is no web sign-in, so the steps are the app's; what to do without the app is
 * said as far as it is decided.
 */

const page = pageAt('/hapus-akun');

export const metadata = pageMetadata(page);

const sections: DocSection[] = [
  {
    // app DeleteAccountScreen.tsx, SettingsScreen.tsx
    id: 'cara-menghapus',
    title: 'Cara menghapus akun',
    body: (
      <>
        <ol>
          <li>Di aplikasi Patepang, buka menu, lalu pilih Pengaturan.</li>
          <li>Pilih Hapus akun, baris merah di bagian paling bawah.</li>
          <li>
            Baca apa yang terjadi, lalu tekan <strong>Hapus akun</strong> dan pastikan dengan{' '}
            <strong>Jadwalkan penghapusan</strong>.
          </li>
        </ol>
        <p>
          Akunmu dihapus setelah tenggang 7 hari. Sampai saat itu kamu bisa membatalkannya dengan{' '}
          <strong>Batalkan penghapusan</strong> di layar yang sama. Selama tenggang, perangkat tidak
          bisa ditambah atau dicabut. Setelah tenggang selesai, akun tidak bisa dipulihkan.
        </p>
      </>
    ),
  },
  {
    // app DeleteAccountScreen.tsx (STORE_REMINDER, export, sole admin)
    id: 'sebelum-menghapus',
    title: 'Sebelum menghapus',
    body: (
      <ul>
        <li>
          <strong>Simpan salinan</strong>, bila mau: Ekspor data membuat berkas terenkripsi berisi
          momen, kabarmu, percakapan, koneksi dan catatan, serta pengaturan. Berkas itu dibuka
          dengan enam kata yang ditampilkan saat ekspor.
        </li>
        <li>
          <strong>Hentikan langganan di toko.</strong> Langganan di App Store atau Google Play tidak
          berhenti sendiri saat akun dihapus.
        </li>
        <li>
          <strong>Pilih admin grup.</strong> Di grup yang adminnya hanya kamu, anggota yang paling
          lama bergabung menjadi admin setelah akunmu dihapus.
        </li>
      </ul>
    ),
  },
  {
    // fakta-data §8.1 (execution)
    id: 'yang-dihapus',
    title: 'Yang dihapus',
    body: (
      <>
        <p>
          Setelah tenggang selesai, dalam satu jam berikutnya, server menghapus semua yang terhubung
          dengan akunmu:
        </p>
        <ul>
          <li>
            perangkat dan token notifikasinya, kunci publik sekali pakai, dan pesan yang belum
            diambil;
          </li>
          <li>token pengiriman, catatan tempel, dan tempel yang belum selesai;</li>
          <li>penjaga (ke dua arah), pecahan kunci cadangan, dan cadangan akunmu;</li>
          <li>keanggotaan grup dan ruang acara, serta ruang yang kamu buka;</li>
          <li>
            semua media yang kamu simpan; datanya langsung, berkasnya paling lambat seperempat jam
            setelah jam itu berakhir;
          </li>
          <li>status langganan di server dan kota di daftar tunggu titik lahir;</li>
          <li>kasus moderasi tentang akunmu, beserta buktinya;</li>
          <li>rantai kunci akunmu, kecuali entri penutupnya.</li>
        </ul>
        <p>
          Orang yang pernah kamu temui tidak lagi melihatmu. Aplikasi di HP-mu menghapus kunci dan
          datanya sendiri begitu server menyatakan akunnya sudah tidak ada.
        </p>
      </>
    ),
  },
  {
    // fakta-data §8.1 (what remains), §4.2, §4.23
    id: 'yang-tersisa',
    title: 'Yang tersisa, dan berapa lama',
    body: (
      <table>
        <caption>Yang tersisa setelah akun dihapus</caption>
        <thead>
          <tr>
            <th scope="col">Yang tersisa</th>
            <th scope="col">Berapa lama</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">
              Catatan penutup: id akun, wilayah server, tanggal hapus, entri pencabutan
            </th>
            <td>12 bulan, supaya HP orang lain tahu akun itu sudah berakhir.</td>
          </tr>
          <tr>
            <th scope="row">Entri log transparansi kunci</th>
            <td>
              Permanen, karena log itu hanya bertambah. Yang publik tidak menyebut akun; di server,
              entri itu tetap merujuk ke id akun.
            </td>
          </tr>
          <tr>
            <th scope="row">Cadangan basis data terenkripsi</th>
            <td>Sampai 40 hari, lalu terhapus bersama cadangannya.</td>
          </tr>
          <tr>
            <th scope="row">Log audit dan hitungan harian</th>
            <td>Tanpa batas waktu, tanpa id akun.</td>
          </tr>
          <tr>
            <th scope="row">Pesan dan media di HP orang lain</th>
            <td>Di HP mereka, di luar jangkauan kami.</td>
          </tr>
          <tr>
            <th scope="row">Langganan di App Store atau Google Play</th>
            <td>Sampai kamu menghentikannya di toko.</td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    // fakta-data §8.2 to §8.4, §8.6
    id: 'tanpa-aplikasi',
    title: 'Bila kamu tidak lagi punya aplikasinya',
    body: (
      <>
        <ul>
          <li>
            <strong>HP hilang, tetapi kamu punya penjaga</strong>: pulihkan akunmu di HP baru lewat
            tempel dengan dua penjaga, lalu hapus akun dari sana. Akun yang punya perangkat lain
            bisa dihapus dari perangkat itu.
          </li>
          <li>
            <strong>Tidak ada perangkat dan tidak ada penjaga</strong>: akun yang tidak aktif
            dihapus otomatis setelah 12 bulan. Akun yang belum lahir dihapus setelah 30 hari.
          </li>
        </ul>
        <p>
          Patepang tidak menyimpan nama, email, atau nomor teleponmu, jadi kami tidak bisa
          memastikan dari sebuah surel bahwa akun tertentu milikmu.{' '}
          <Placeholder>
            Cara meminta penghapusan tanpa aplikasi, dan cara membuktikan pemilik akun: menunggu
            keputusan
          </Placeholder>{' '}
          Pertanyaan: <Mail to="privacy" />.
        </p>
      </>
    ),
  },
  {
    // fakta-data §8.1 (blocked accounts, FLAG)
    id: 'akun-diblokir',
    title: 'Akun yang diblokir',
    body: (
      <p>
        Akun yang diblokir karena pelanggaran hanya bisa melihat status moderasi, mengajukan
        banding, dan keluar, jadi tidak bisa meminta penghapusan dari aplikasi. Akun itu dihapus
        setelah 12 bulan tidak aktif, atau bisa dihapus seperti biasa bila bandingnya dikabulkan.{' '}
        <Placeholder>
          Hak penghapusan bagi akun yang diblokir: menunggu tinjauan penasihat hukum
        </Placeholder>
      </p>
    ),
  },
  {
    id: 'situs-ini',
    title: 'Situs ini',
    body: (
      <p>
        Situs patepang.com tidak menyimpan apa pun tentangmu, jadi tidak ada yang perlu dihapus di
        sini. Aplikasi Patepang dikembangkan oleh <Entity field="name" />.
      </p>
    ),
  },
];

export default function HapusAkunPage() {
  return (
    <DocPage
      page={page}
      appNote
      lede={
        <>
          <p>
            Cara menghapus akun Patepang dan datamu, apa yang terhapus dan kapan, dan apa yang
            tersisa.
          </p>
          <p className="type-body tone-secondary">
            Untuk aplikasi Patepang, dari <Entity field="name" />.
          </p>
        </>
      }
      sections={sections}
    />
  );
}
