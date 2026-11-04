import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { Mail, Placeholder } from '@/components/doc/parts';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';

/*
 * The community guidelines: the eight report categories, reporting, what moderators can and
 * cannot see, decisions and appeals (fakta-produk §8; fakta-data §4.20; backend ADR 0132 for the
 * categories). Response times and reporting to authorities are not decided (fakta-data §4.20,
 * UNCONFIRMED) and stand as placeholders.
 */

const page = pageAt('/pedoman-komunitas');

export const metadata = pageMetadata(page);

/** The eight categories a report can carry, in the app's order. */
const categories = [
  {
    term: 'Pelecehan',
    text: 'Merundung, menghina, atau terus mengganggu seseorang yang tidak mau, termasuk menyerang orang karena siapa mereka.',
  },
  {
    term: 'Penipuan',
    text: 'Menipu atau memeras, menyamar sebagai orang lain atau sebagai Patepang, atau memancing orang memberikan PIN dan enam katanya.',
  },
  {
    term: 'Ancaman',
    text: 'Mengancam menyakiti seseorang atau orang dekatnya, termasuk mengancam menyebarkan data atau gambar pribadinya.',
  },
  {
    term: 'Konten seksual anak',
    text: 'Apa pun yang menampilkan atau melibatkan anak secara seksual. Akun yang mengirimnya diblokir.',
  },
  {
    term: 'Kekerasan',
    text: 'Mendorong, merencanakan, atau merayakan kekerasan terhadap orang.',
  },
  {
    term: 'Gambar intim tanpa izin',
    text: 'Mengirim atau menyebarkan foto atau video intim seseorang tanpa izinnya.',
  },
  {
    term: 'Spam',
    text: 'Pesan massal atau promosi berulang yang tidak diminta.',
  },
  {
    term: 'Lainnya',
    text: 'Hal lain yang melanggar hukum atau membahayakan orang, misalnya menjual barang terlarang.',
  },
] as const;

const sections: DocSection[] = [
  {
    id: 'dasarnya',
    title: 'Dasarnya',
    body: (
      <>
        <p>
          Patepang hanya menghubungkan orang yang pernah bertemu langsung. Perlakukan orang di
          Patepang seperti saat kalian bertatap muka. Pedoman ini berlaku untuk semua yang kamu
          kirim atau tampilkan: pesan, kabar, momen, kartu kontak, foto profil, rencana, ajakan,
          pertanyaan lingkaran, dan papan ruang acara.
        </p>
        <p>
          Pedoman ini bagian dari <a href="/syarat-ketentuan">Syarat dan ketentuan</a>.
        </p>
      </>
    ),
  },
  {
    // backend ADR 0132; fakta-produk §8
    id: 'yang-tidak-boleh',
    title: 'Yang tidak boleh',
    body: (
      <>
        <p>Setiap laporan memilih salah satu dari delapan kategori ini:</p>
        <dl>
          {categories.map((category) => (
            <div key={category.term}>
              <dt>{category.term}</dt>
              <dd>{category.text}</dd>
            </div>
          ))}
        </dl>
        <p>
          Kamu juga tidak boleh memalsukan tempel, membuat akun secara massal atau dengan program
          otomatis, membeli atau menjual akun, atau mengakali batas akun.
        </p>
      </>
    ),
  },
  {
    // fakta-produk §8; fakta-data §4.20
    id: 'cara-melapor',
    title: 'Cara melapor',
    body: (
      <>
        <p>
          Di aplikasi, pilih isi yang bermasalah, lalu <strong>Laporkan</strong>. Pilih kategori
          dan, bila perlu, tulis catatan sampai 500 karakter.
        </p>
        <ul>
          <li>
            HP-mu menyegel salinan isi itu, kategori, dan catatanmu untuk para moderator, bersama
            pernyataan bertanda tangan dari penulis isi itu. Server tidak bisa membacanya.
          </li>
          <li>
            Server tidak menyimpan siapa pelapornya, dan orang yang kamu laporkan tidak diberi tahu
            siapa yang melapor.
          </li>
          <li>
            Isi yang sudah tampil di HP-mu masih bisa dilaporkan sampai 30 hari setelah dihapus
            pengirimnya, setelah menghilang, atau setelah foto sekali lihat ditutup.
          </li>
          <li>
            Laporan tentang satu akun digabung menjadi satu kasus. Satu akun bisa mengirim paling
            banyak 10 laporan sehari, dan satu perangkat 20.
          </li>
          <li>
            Dengan tanda terima laporannya, kamu bisa mengikuti status dan keputusan kasusnya.
          </li>
        </ul>
      </>
    ),
  },
  {
    // fakta-data §4.20; fakta-produk §8
    id: 'yang-dilihat-moderator',
    title: 'Yang dilihat moderator, dan yang tidak',
    body: (
      <>
        <p>
          Moderator Patepang adalah manusia. Saat peluncuran, paling sedikit tiga orang yang membaca
          bahasa Indonesia. Daftar moderator ditandatangani dua dari tiga pemegang kunci akar, dan
          setiap moderator hanya bisa membuka bukti yang disegel untuknya, di konsolnya sendiri.
        </p>
        <h3>Yang dilihat moderator</h3>
        <ul>
          <li>salinan isi yang dilaporkan, persis seperti yang tampil di HP pelapor;</li>
          <li>
            pernyataan penulisnya: id akun, perangkat, jenis isi, sidik isinya, dan waktu dibuat;
          </li>
          <li>kategori laporan dan catatan pelapor.</li>
        </ul>
        <h3>Yang tidak dilihat moderator</h3>
        <ul>
          <li>pesan, kabar, atau isi lain yang tidak dilaporkan;</li>
          <li>siapa yang melapor;</li>
          <li>daftar koneksi, nama di HP-mu, atau lokasimu.</li>
        </ul>
        <p>
          Setiap kali moderator masuk, membaca kasus, atau memutuskan, kegiatannya dicatat di log
          audit. Isi tidak pernah dipindai otomatis: server memang tidak bisa membacanya.
        </p>
      </>
    ),
  },
  {
    // fakta-produk §8 (KP #35); fakta-data §4.20
    id: 'keputusan-dan-sanksi',
    title: 'Keputusan dan sanksi',
    body: (
      <>
        <table>
          <caption>Keputusan moderator dan akibatnya</caption>
          <thead>
            <tr>
              <th scope="col">Keputusan</th>
              <th scope="col">Akibatnya</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Ditolak</th>
              <td>Laporan tidak terbukti melanggar. Tidak ada sanksi.</td>
            </tr>
            <tr>
              <th scope="row">Peringatan</th>
              <td>Pemilik akun menerima peringatan dan alasannya.</td>
            </tr>
            <tr>
              <th scope="row">Pembatasan 30 hari</th>
              <td>Tidak bisa membuat grup atau ruang acara selama 30 hari.</td>
            </tr>
            <tr>
              <th scope="row">Penangguhan 7 atau 30 hari</th>
              <td>Kotak masuk akun ditolak; pesan untuknya menunggu sampai penangguhan selesai.</td>
            </tr>
            <tr>
              <th scope="row">Blokir</th>
              <td>
                Akun tidak bisa dipakai, kecuali untuk melihat status moderasi, mengajukan banding,
                dan keluar. Blokir butuh persetujuan moderator kedua dan berlaku sampai dibatalkan
                lewat banding.
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          Blokir terlihat publik di rantai kunci akun, sehingga aplikasi orang lain menampilkan
          bahwa kunci itu diblokir karena pelanggaran. Ruang acara yang dibuka akun itu ditutup.
          Akun yang tiga akun sponsornya diblokir dalam setahun tidak bisa menjadi sponsor lagi.
          Dalam keadaan darurat, pemilik Patepang bisa memblokir akun lebih dulu.
        </p>
        <p>
          Setiap keputusan dikirim lewat notifikasi, disertai kode alasan dan alasan tertulis yang
          bisa dibaca pemilik akun di aplikasi. Pelapor bisa membaca keputusan yang sama lewat tanda
          terimanya, tanpa bukti dan tanpa nama siapa pun.{' '}
          <Placeholder>Target waktu peninjauan laporan: menunggu keputusan</Placeholder>
        </p>
      </>
    ),
  },
  {
    // fakta-produk §8; fakta-data §4.20
    id: 'banding',
    title: 'Banding',
    body: (
      <p>
        Kamu bisa mengajukan banding satu kali untuk setiap kasus, dalam 30 hari setelah keputusan,
        dari status moderasi di aplikasi. Laporan yang ditolak tidak bisa dibanding. Banding
        ditinjau moderator yang tidak terlibat dalam keputusan pertama. Bila keputusan dibatalkan,
        sanksinya dicabut.
      </p>
    ),
  },
  {
    // fakta-produk §8
    id: 'melindungi-dirimu',
    title: 'Melindungi dirimu sendiri',
    body: (
      <ul>
        <li>
          <strong>Putuskan koneksi</strong>: orang itu tidak bisa mengirim apa pun lagi kepadamu,
          dan untuk terhubung lagi kalian harus tempel langsung. Kamu memilih menyimpan percakapan
          (hanya bisa dibaca, di balik PIN) atau menghapusnya.
        </li>
        <li>
          <strong>Laporkan dulu</strong> dan <strong>Simpan bukti</strong>: sebelum memutus, kamu
          bisa melapor dan menyimpan percakapan sebagai berkas bersama pernyataan penulisnya, untuk
          polisi atau pengacara.
        </li>
        <li>
          <strong>Sembunyikan</strong> kabar, status, dan ulang tahunmu dari seseorang tanpa memutus
          koneksi, tanpa pemberitahuan.
        </li>
        <li>
          <strong>Kunci darurat</strong> membekukan akunmu selama 72 jam bila HP-mu hilang atau
          direbut: pemulihan dan penautan perangkat ditolak.
        </li>
      </ul>
    ),
  },
  {
    id: 'bahaya',
    title: 'Bila ada bahaya',
    body: (
      <>
        <p>
          Bila seseorang dalam bahaya langsung, hubungi layanan darurat di 112. Patepang tidak
          memantau isi dan tidak bisa mengirim bantuan.
        </p>
        <p>
          <Placeholder>
            Penanganan konten seksual anak dan pelaporan ke pihak berwenang: menunggu tinjauan
            penasihat hukum
          </Placeholder>
        </p>
        <p>
          Pertanyaan tentang pedoman ini: <Mail to="general" />.
        </p>
      </>
    ),
  },
];

export default function PedomanKomunitasPage() {
  return (
    <DocPage
      page={page}
      numbered
      lede={
        <p>
          Yang tidak boleh dilakukan di Patepang, cara melapor, apa yang dilihat moderator dan apa
          yang tidak, sanksi, dan cara mengajukan banding.
        </p>
      }
      sections={sections}
    />
  );
}
