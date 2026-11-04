import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { Entity, Mail, Placeholder } from '@/components/doc/parts';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';
import { pricing } from '@/content/pricing';
import { released } from '@/content/status';

/*
 * The terms of service. The product facts (age, account, guardians, sanctions, prices, stores)
 * come from fakta-produk.md and fakta-data.md of 4 November 2026, as corrected after the review of
 * the same day; the legal choices (governing law, disputes, liability) are drafted to fit
 * Indonesian consumer law (UU No. 8 Tahun 1999) and are for counsel to settle. The app has no step
 * yet where a person agrees to these terms, and no channel for notices in the app (its server
 * pushes carry no notice kind): both are said as missing, with placeholders, rather than assumed.
 * What is not decided stands as a marked placeholder.
 */

const page = pageAt('/syarat-ketentuan');

export const metadata = pageMetadata(page);

const sections: DocSection[] = [
  {
    id: 'tentang-syarat-ini',
    title: 'Tentang syarat ini',
    body: (
      <>
        <p>
          Syarat ini adalah perjanjian antara kamu dan <Entity field="name" /> (&ldquo;kami&rdquo;)
          tentang pemakaian aplikasi Patepang dan situs patepang.com. Kamu menyetujui syarat ini,
          bersama <a href="/pedoman-komunitas">Pedoman komunitas</a> dan ketentuan{' '}
          <a href="/langganan">Langganan dan pembayaran</a> yang menjadi bagian darinya, saat
          menyatakan setuju di aplikasi.{' '}
          <Placeholder>
            Langkah persetujuan di aplikasi, dan cara aplikasi mencatat versi yang kamu setujui:
            menunggu keputusan dan pembangunan
          </Placeholder>{' '}
          Cara kami memproses data dijelaskan di <a href="/kebijakan-privasi">Kebijakan privasi</a>.
        </p>
        {released && !page.draft ? null : (
          <p>
            {released ? null : 'Patepang belum diluncurkan. '}
            {page.draft
              ? 'Syarat ini adalah draf dan baru berlaku setelah ditinjau penasihat hukum.'
              : null}
          </p>
        )}
      </>
    ),
  },
  {
    // fakta-produk §7, Lampiran A; fakta-data §9
    id: 'siapa-yang-boleh',
    title: 'Siapa yang boleh memakai Patepang',
    body: (
      <ul>
        <li>Kamu berumur 18 tahun ke atas.</li>
        <li>Satu orang memakai satu akun, dengan paling banyak 3 perangkat aktif.</li>
        <li>
          Kamu tidak sedang dilarang memakai Patepang karena pelanggaran sebelumnya, kecuali
          larangan itu sudah dicabut lewat banding.
        </li>
      </ul>
    ),
  },
  {
    // fakta-produk §2, §5.1, §8; fakta-data §8
    id: 'akunmu',
    title: 'Akunmu',
    body: (
      <>
        <p>
          Akunmu dibuat di HP-mu sebagai sepasang kunci kriptografi, tanpa email atau nomor telepon.
          Akun lahir saat tempel pertama. Bila dalam 30 hari belum ada tempel, akun itu dihapus.
          Satu HP bisa membuat paling banyak 3 akun dalam satu bulan kalender.
        </p>
        <p>
          Kamu yang menjaga akunmu. Simpan PIN-mu untuk dirimu sendiri: Patepang tidak pernah
          menanyakan PIN-mu. Tambahkan penjaga, yaitu tiga orang yang pernah tempel denganmu, dua di
          antaranya cukup untuk memulihkan akunmu lewat tempel di HP baru. Pemulihan punya masa
          tunggu 48 jam yang bisa dibatalkan dari HP lamamu.
        </p>
        <p>
          <strong>
            Kami tidak bisa memulihkan akunmu dengan cara lain. Kami tidak tahu siapa kamu dan tidak
            memegang kuncimu. Bila kamu kehilangan semua perangkat dan tidak punya penjaga yang bisa
            membantu, akun dan isinya tidak bisa dipulihkan.
          </strong>
        </p>
        <p>
          Akun yang tidak aktif selama 12 bulan dihapus, dengan pengingat lewat notifikasi di bulan
          ke-11 bila kamu mengizinkan notifikasi. Dalam keadaan darurat, dari perangkat yang masih
          kamu pegang, kamu bisa mengeluarkan semua perangkat lain dan mengunci penautan perangkat,
          perubahan penjaga, dan pemulihan selama 72 jam. Kamu juga bisa menghapus akunmu kapan
          saja, kecuali akun yang diblokir (lihat <a href="/hapus-akun">Hapus akun</a>).
        </p>
      </>
    ),
  },
  {
    id: 'penggunaan',
    title: 'Penggunaan yang boleh dan tidak boleh',
    body: (
      <>
        <p>
          Pakai Patepang untuk menjaga hubungan dengan orang yang pernah kamu temui. Kamu tidak
          boleh:
        </p>
        <ul>
          <li>
            melakukan hal yang dilarang <a href="/pedoman-komunitas">Pedoman komunitas</a>, seperti
            pelecehan, penipuan, ancaman, konten seksual anak, kekerasan, gambar intim tanpa izin,
            atau spam;
          </li>
          <li>melanggar hukum, atau hak orang lain, lewat Patepang;</li>
          <li>
            memalsukan tempel, membuat akun secara massal atau dengan program otomatis, atau
            mengakali batas akun dan pemeriksaan keaslian aplikasi;
          </li>
          <li>membeli, menjual, atau menyewakan akun;</li>
          <li>
            mengganggu, membebani, atau membobol layanan, kecuali penelitian keamanan beritikad baik
            sesuai halaman <a href="/keamanan">Keamanan</a>.
          </li>
        </ul>
      </>
    ),
  },
  {
    // fakta-data §4.7, §4.20
    id: 'isimu',
    title: 'Isimu',
    body: (
      <>
        <p>
          Pesan, kabar, momen, foto, dan isi lain yang kamu buat tetap milikmu. Kamu memberi kami
          izin sebatas yang dibutuhkan untuk menyimpan dan mengantarkan isi itu dalam bentuk
          terenkripsi kepada orang yang kamu pilih. Karena isi dienkripsi ujung ke ujung di HP, kami
          tidak bisa membacanya.
        </p>
        <p>
          Kamu bertanggung jawab atas isi yang kamu kirim. Isi yang dilaporkan orang lain bisa
          dibaca moderator, sebatas salinan yang dilaporkan. Menghapus isi menghapusnya dari akunmu
          dan dari server, dengan batas yang dijelaskan di Kebijakan privasi bagian 5: amplop yang
          belum diambil penerima tetap di server sampai diambil, dan cadangan menyimpannya untuk
          sementara. Salinan yang sudah sampai di HP orang lain ada di HP mereka.
        </p>
      </>
    ),
  },
  {
    // fakta-produk §8; fakta-data §4.20
    id: 'moderasi',
    title: 'Moderasi, sanksi, dan banding',
    body: (
      <>
        <p>
          Moderator Patepang adalah manusia. Mereka hanya membaca isi yang dilaporkan, dan
          keputusannya bisa berupa penolakan laporan, peringatan, pembatasan 30 hari, penangguhan 7
          atau 30 hari, atau blokir. Blokir butuh persetujuan moderator kedua. Setiap keputusan
          disertai alasan tertulis yang bisa kamu baca di aplikasi.
        </p>
        <p>
          Kamu bisa mengajukan banding satu kali untuk setiap kasus, dalam 30 hari setelah
          keputusan. Banding ditinjau moderator yang tidak terlibat dalam keputusan pertama.
          Rinciannya ada di <a href="/pedoman-komunitas">Pedoman komunitas</a>.
        </p>
      </>
    ),
  },
  {
    // fakta-produk §6; fakta-data §4.14
    id: 'langganan',
    title: 'Langganan dan pembayaran',
    body: (
      <>
        <p>
          Semua fitur Patepang gratis. Langganan ({pricing.monthly} per bulan atau {pricing.yearly}{' '}
          per tahun di Indonesia) hanya menambah ruang media di server dan ukuran berkas. Pelanggan
          baru mendapat masa coba {String(pricing.trialDays)} hari. Tip bersifat sekali bayar dan
          tidak menambah fitur.
        </p>
        <p>
          Pembelian, perpanjangan otomatis, penghentian, dan pengembalian dana diproses App Store
          atau Google Play, menurut ketentuan toko itu. Harga yang berlaku adalah harga yang
          ditampilkan toko saat kamu membeli. Menghapus akun tidak menghentikan langganan di toko.
          Rinciannya ada di <a href="/langganan">Langganan dan pembayaran</a>.
        </p>
      </>
    ),
  },
  {
    id: 'layanan',
    title: 'Layanan dan perubahannya',
    body: (
      <>
        <p>
          Kami berusaha menjaga Patepang tetap berjalan, tetapi tidak bisa menjamin layanan selalu
          tersedia tanpa gangguan, misalnya saat pemeliharaan, gangguan jaringan, atau gangguan di
          penyedia layanan kami. Gangguan besar kami umumkan di halaman status.
        </p>
        <p>
          Fitur bisa bertambah, berubah, atau berhenti. Perubahan penting kami umumkan di halaman
          status dan di situs ini sebelum berlaku. Bila Patepang berhenti beroperasi, kami
          mengumumkannya lebih dulu dengan cara yang sama, supaya kamu sempat mengekspor datamu.{' '}
          <Placeholder>
            Pemberitahuan di dalam aplikasi dan jangka waktunya: menunggu keputusan dan tinjauan
            penasihat hukum
          </Placeholder>
        </p>
      </>
    ),
  },
  {
    // fakta-data §8.1 to §8.3
    id: 'pengakhiran',
    title: 'Pengakhiran',
    body: (
      <>
        <p>
          Kamu bisa berhenti kapan saja dengan menghapus akunmu, kecuali bila akunmu diblokir.
          Penghapusan punya tenggang 7 hari yang bisa dibatalkan, lalu akun dan datanya dihapus
          seperti dijelaskan di halaman <a href="/hapus-akun">Hapus akun</a>, yang juga menjelaskan
          akun yang diblokir.
        </p>
        <p>
          Kami bisa menangguhkan atau memblokir akun yang melanggar syarat ini atau pedoman
          komunitas, dengan alasan tertulis dan kesempatan banding. Akun yang belum lahir dihapus
          setelah 30 hari, dan akun yang tidak aktif dihapus setelah 12 bulan.
        </p>
      </>
    ),
  },
  {
    id: 'tanggung-jawab',
    title: 'Tanggung jawab',
    body: (
      <>
        <p>
          Kami bertanggung jawab atas kerugian yang timbul karena kesalahan atau kelalaian kami,
          sesuai hukum yang berlaku. Tidak ada bagian syarat ini yang mengurangi hakmu sebagai
          konsumen menurut Undang-Undang No. 8 Tahun 1999 tentang Perlindungan Konsumen, atau
          mengalihkan tanggung jawab yang menurut hukum tidak boleh dialihkan.
        </p>
        <p>Kami tidak bertanggung jawab atas:</p>
        <ul>
          <li>isi yang dikirim orang lain, walaupun kami menindaklanjuti setiap laporan;</li>
          <li>
            kerugian karena kamu memberikan PIN, enam kata ekspor, atau perangkatmu kepada orang
            lain, atau kehilangan semua perangkat tanpa penjaga;
          </li>
          <li>
            gangguan pada layanan pihak lain yang di luar kendali kami, seperti toko aplikasi,
            jaringan seluler, atau HP-mu sendiri.
          </li>
        </ul>
        <p>
          <Placeholder>
            Batas jumlah tanggung jawab, bila ada: menunggu tinjauan penasihat hukum
          </Placeholder>
        </p>
      </>
    ),
  },
  {
    id: 'hukum-yang-berlaku',
    title: 'Hukum yang berlaku',
    body: (
      <p>
        Syarat ini diatur oleh hukum Republik Indonesia. Syarat ini dibuat dalam bahasa Indonesia;
        bila kelak ada terjemahan, versi bahasa Indonesia yang berlaku.
      </p>
    ),
  },
  {
    id: 'sengketa',
    title: 'Penyelesaian sengketa',
    body: (
      <>
        <p>
          Bila ada masalah, hubungi kami lebih dulu di <Mail to="legal" />, supaya bisa kita
          selesaikan secara musyawarah.
        </p>
        <p>
          Bila musyawarah tidak berhasil, kamu berhak menyelesaikan sengketa melalui Badan
          Penyelesaian Sengketa Konsumen (BPSK) atau melalui pengadilan, sesuai UU No. 8 Tahun 1999.
          Untuk sengketa di pengadilan, para pihak memilih <Entity field="court" />, tanpa
          mengurangi hakmu menurut hukum acara yang berlaku.
        </p>
      </>
    ),
  },
  {
    id: 'lain-lain',
    title: 'Ketentuan lain',
    body: (
      <ul>
        <li>Bila sebagian syarat ini dinyatakan tidak berlaku, bagian lainnya tetap berlaku.</li>
        <li>Bila kami tidak menegakkan suatu hak, itu tidak berarti kami melepaskannya.</li>
        <li>
          Syarat ini, bersama Pedoman komunitas, ketentuan Langganan dan pembayaran, dan Kebijakan
          privasi, adalah seluruh kesepakatan antara kamu dan kami tentang Patepang.
        </li>
      </ul>
    ),
  },
  {
    id: 'perubahan',
    title: 'Perubahan syarat',
    body: (
      <p>
        Syarat ini bisa berubah. Perubahan penting kami umumkan di halaman ini dan di halaman status
        sebelum berlaku.{' '}
        <Placeholder>
          Cara memberi tahu perubahan di aplikasi dan mencatat persetujuanmu atasnya: menunggu
          keputusan dan pembangunan
        </Placeholder>{' '}
        Bila kamu tidak setuju dengan perubahan itu, kamu bisa berhenti memakai Patepang dan
        menghapus akunmu. Tanggal di bagian atas halaman menunjukkan perubahan terakhir.
      </p>
    ),
  },
  {
    id: 'kontak',
    title: 'Kontak',
    body: (
      <p>
        Pertanyaan umum: <Mail to="general" />. Urusan hukum: <Mail to="legal" />. Surat:{' '}
        <Entity field="name" />, <Entity field="address" />.
      </p>
    ),
  },
];

export default function SyaratKetentuanPage() {
  return (
    <DocPage
      page={page}
      numbered
      lede={
        <p>
          Perjanjian antara kamu dan Patepang: siapa yang boleh memakai, bagaimana akunmu dijaga,
          apa yang boleh dikirim, langganan, dan cara menyelesaikan masalah.
        </p>
      }
      sections={sections}
    />
  );
}
