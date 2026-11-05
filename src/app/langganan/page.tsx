import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { External, Mail } from '@/components/doc/parts';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';
import { pricing } from '@/content/pricing';

/*
 * Plans, store billing, stopping, refunds, the grace period and what happens over quota (app ADR
 * 0060 B21 to B25; fakta-produk §6; fakta-data §4.14, §4.15). Part of the terms. The stores bill,
 * renew and refund under their own rules; Patepang never sees payment details. Every stored media
 * object counts against its uploader's quota while it is kept, chat and room media too (backend
 * spec §3.5, media service); the kinds of media still being built, and uploads in parts above
 * 64 MiB (backend ADR 0130, the app's part still being built), are said as coming.
 */

const page = pageAt('/langganan');

export const metadata = pageMetadata(page);

const sections: DocSection[] = [
  {
    // B21, B22; limits
    id: 'paket',
    title: 'Paket',
    body: (
      <>
        <p>
          Semua fitur Patepang gratis untuk semua orang. Langganan hanya menambah ruang media di
          server dan ukuran berkas yang bisa dikirim.
        </p>
        <table>
          <caption>Paket gratis dan langganan</caption>
          <thead>
            <tr>
              <th scope="col">Yang didapat</th>
              <th scope="col">Gratis</th>
              <th scope="col">Langganan</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Harga</th>
              <td>Rp0</td>
              <td>
                {pricing.monthly} per bulan, atau {pricing.yearly} per tahun
              </td>
            </tr>
            <tr>
              <th scope="row">Fitur</th>
              <td>Semua</td>
              <td>Semua</td>
            </tr>
            <tr>
              <th scope="row">Ruang media di server</th>
              <td>
                {pricing.free.storage}, ditambah bonus pertemuan kedua (paling banyak{' '}
                {pricing.free.bonusMax}), jadi paling banyak {pricing.free.storageMax}
              </td>
              <td>{pricing.subscriber.storage}</td>
            </tr>
            <tr>
              <th scope="row">Ukuran berkas</th>
              <td>Sampai {pricing.free.file}</td>
              <td>Sampai {pricing.subscriber.file}</td>
            </tr>
          </tbody>
        </table>
        <p>
          Berkas di atas 64 MB dikirim bertahap. Pengiriman bertahap itu sedang dibangun di aplikasi
          dan menyusul; sampai saat itu, berkas paling besar 64 MB untuk semua paket.
        </p>
        <p>
          Paket tahunan lebih hemat {pricing.yearlySaving} dibanding 12 bulan. Kamu bisa pindah
          antara paket bulanan dan tahunan di toko. Harga di atas adalah harga di Indonesia; di luar
          Indonesia, toko menetapkan harga yang setara. Berbagi lewat Family Sharing tidak tersedia.
        </p>
      </>
    ),
  },
  {
    // B22
    id: 'masa-coba',
    title: 'Masa coba',
    body: (
      <p>
        Pelanggan baru mendapat masa coba {String(pricing.trialDays)} hari, satu kali untuk setiap
        akun toko. Selama masa coba, ruang dan ukuran berkasmu sama dengan pelanggan. Bila tidak
        dihentikan sebelum masa coba berakhir, langganan berlanjut dan ditagih oleh toko.
      </p>
    ),
  },
  {
    // fakta-data §4.14; app LiveSubscription.tsx
    id: 'pembayaran',
    title: 'Pembayaran lewat toko',
    body: (
      <>
        <p>
          Langganan dibeli, diperpanjang otomatis setiap periode, dan ditagih lewat akun App Store
          atau Google Play-mu, sampai kamu menghentikannya di pengaturan langganan toko. Harga yang
          berlaku adalah harga yang ditampilkan toko saat kamu membeli. Harga bisa berubah;
          perubahan untuk langganan yang sedang berjalan mengikuti aturan toko.
        </p>
        <p>
          Kami tidak menerima dan tidak menyimpan kartu, rekening, atau cara bayarmu. Server
          mencatat status langgananmu, sampai kapan berlaku, toko tempat kamu membeli, apakah masa
          coba sudah dipakai, pengenal acak yang menghubungkan pembelian dengan akunmu, dan, selama
          langganan berjalan, hash id langganan dari toko (lihat{' '}
          <a href="/kebijakan-privasi">Kebijakan privasi</a>).
        </p>
      </>
    ),
  },
  {
    id: 'menghentikan',
    title: 'Menghentikan langganan',
    body: (
      <>
        <p>
          Hentikan langganan di pengaturan langganan App Store atau Google Play, di HP yang memakai
          akun toko yang sama. Langganan tetap berlaku sampai akhir periode yang sudah dibayar, lalu
          berakhir.
        </p>
        <p>
          <strong>Menghapus akun Patepang tidak menghentikan langganan di toko.</strong> Hentikan
          langganan lebih dulu, lalu hapus akunmu.
        </p>
      </>
    ),
  },
  {
    id: 'pengembalian-dana',
    title: 'Pengembalian dana',
    body: (
      <>
        <p>
          Karena pembayaran diproses toko, pengembalian dana juga diajukan ke toko, menurut
          kebijakan mereka:
        </p>
        <ul>
          <li>
            App Store: lewat{' '}
            <External href="https://reportaproblem.apple.com/">reportaproblem.apple.com</External>.
          </li>
          <li>
            Google Play: lewat{' '}
            <External href="https://support.google.com/googleplay/answer/2479637">
              halaman pengembalian dana Google Play
            </External>
            .
          </li>
        </ul>
        <p>
          Hakmu sebagai konsumen menurut Undang-Undang No. 8 Tahun 1999 tentang Perlindungan
          Konsumen tetap berlaku. Bila ada masalah dengan pembelian yang tidak terselesaikan lewat
          toko, tulis ke <Mail to="general" />.
        </p>
      </>
    ),
  },
  {
    // app LiveSubscription.tsx (grace); fakta-data §4.14
    id: 'masa-tenggang',
    title: 'Bila pembayaran gagal',
    body: (
      <p>
        Bila toko gagal menagih perpanjangan, langgananmu masuk masa tenggang yang diberikan toko.
        Selama masa tenggang, ruang dan ukuran berkasmu tetap seperti pelanggan. Perbaiki cara
        bayarmu di toko; bila tidak diperbaiki sampai masa tenggang berakhir, langgananmu berakhir.
      </p>
    ),
  },
  {
    // B23; fakta-data §4.15; SPEC §10 media.quota
    id: 'melebihi-kuota',
    title: 'Bila ruang melebihi kuota',
    body: (
      <>
        <p>
          Bila media yang kamu simpan melebihi kuotamu, misalnya setelah langganan berakhir, media
          yang sudah ada tidak langsung dihapus:
        </p>
        <ul>
          <li>unggahan baru ditahan sampai ruangmu cukup lagi;</li>
          <li>kamu diberi tahu 3 bulan, 1 bulan, dan 1 minggu sebelum batas 12 bulan;</li>
          <li>
            setelah 12 bulan, media kabar, momen, dan stiker yang paling lama dihapus sampai muat;
            cadangan akun tidak pernah dihapus karena kuota.
          </li>
        </ul>
        <p>
          Setiap pemberitahuan menawarkan <strong>Simpan ke HP</strong>. Saat album grup dan momen
          bersama tersedia, foto di album grup dan bagianmu di momen bersama juga hilang bagi orang
          lain bila terhapus.
        </p>
      </>
    ),
  },
  {
    // fakta-produk §6; B21, B25; SPEC §6.3
    id: 'ruang-media',
    title: 'Yang memakai ruang media',
    body: (
      <>
        <p>
          Ruang media dipakai semua media yang disimpan server untukmu, selama media itu disimpan:
          foto, suara, dan berkas yang kamu kirim di pesan dan grup (sampai semua penerima
          mengambilnya, paling lama 30 hari), media ruang acara selama ruangnya ada, cadangan akun,
          dan media kabar, momen, stiker, dan foto profil. Bila ruangmu penuh, kamu juga tidak bisa
          mengirim foto atau berkas di pesan sampai ada ruang lagi.
        </p>
        <p>
          Kabar dengan foto, momen bersama, stiker, foto profil, dan album ruang acara sedang
          dibangun dan menyusul.
        </p>
        <p>
          <strong>Bonus pertemuan kedua</strong>: saat kamu tempel lagi dengan seseorang, setidaknya
          24 jam setelah tempel langsung pertama kalian, kalian berdua mendapat{' '}
          {pricing.free.bonusPerPair} ruang media, sekali untuk setiap pasangan. Bonus paling banyak{' '}
          {pricing.free.bonusMax}, sehingga ruang akun gratis paling banyak{' '}
          {pricing.free.storageMax}. Bonus hanya untuk akun gratis.
        </p>
      </>
    ),
  },
  {
    // B22; app ADR 0032
    id: 'tip',
    title: 'Tip',
    body: (
      <p>
        Kalau ingin mendukung Patepang tanpa berlangganan, ada tip sekali bayar sebesar{' '}
        {pricing.tips.join(', ').replace(/, ([^,]*)$/, ', atau $1')}. Tip tidak menambah fitur atau
        ruang, dan tidak tercatat di akunmu.
      </p>
    ),
  },
];

export default function LanggananPage() {
  return (
    <DocPage
      page={page}
      appNote
      lede={
        <p>
          Semua fitur gratis. Halaman ini menjelaskan langganan: harga, masa coba, pembayaran lewat
          App Store dan Google Play, cara berhenti, pengembalian dana, dan ruang media.
        </p>
      }
      sections={sections}
    />
  );
}
