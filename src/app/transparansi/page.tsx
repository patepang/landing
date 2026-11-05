import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { Mail, Placeholder } from '@/components/doc/parts';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';
import { released } from '@/content/status';

/*
 * What Patepang will publish (the transparency file, the moderator and release lists, the key
 * transparency log, the half-yearly report) and what it can and cannot hand over when lawfully
 * required (fakta-data §4.22, §12). The report's contents are what the server sums for it
 * (backend transparency service, REPORT_PREFIXES; spec §5.8), not every daily count: those stay
 * in the admin aggregates. The written law-enforcement policy and how users are told are not
 * decided (fakta-data §12, UNCONFIRMED) and stand as placeholders.
 */

const page = pageAt('/transparansi');

export const metadata = pageMetadata(page);

const sections: DocSection[] = [
  {
    // fakta-data §4.22; fakta-produk §10.1 (berkas produksi belum ada)
    id: 'yang-diterbitkan',
    title: 'Yang kami terbitkan',
    body: (
      <>
        <p>
          {released
            ? 'Server Patepang menyajikan berkas publik yang bisa diperiksa siapa pun, tanpa data pribadi.'
            : 'Setelah Patepang diluncurkan, server Patepang menyajikan berkas publik yang bisa diperiksa siapa pun, tanpa data pribadi. Berkas untuk layanan sungguhan belum ada, karena layanannya belum berjalan.'}
        </p>
        <dl>
          <div>
            <dt>Berkas transparansi</dt>
            <dd>
              Kunci akar untuk saksi tempel, pemulihan, log transparansi kunci, dan moderasi; sidik
              (measurement) enklaf yang boleh dipercaya; dan alamat-alamat resmi, termasuk halaman
              kebijakan ini.
            </dd>
          </div>
          <div>
            <dt>Daftar moderator</dt>
            <dd>
              Id moderator, kunci publik, dan bahasa yang mereka baca, tanpa nama atau email,
              ditandatangani dua dari tiga pemegang kunci akar.
            </dd>
          </div>
          <div>
            <dt>Daftar rilis</dt>
            <dd>
              Setiap versi rilis, sidiknya (hash), dan nomornya di log publik Sigstore Rekor, supaya
              siapa pun bisa memeriksa bahwa berkas rilis sama dengan yang tercatat di Rekor.
            </dd>
          </div>
          <div>
            <dt>Log transparansi kunci</dt>
            <dd>
              Catatan publik yang hanya bertambah tentang perubahan kunci setiap akun, dengan
              ringkasan bertanda tangan setiap jam. Isinya menunjukkan berapa banyak perubahan dan
              kapan, bukan akun mana.
            </dd>
          </div>
          <div>
            <dt>security.txt</dt>
            <dd>
              Kontak keamanan dan kebijakan pengungkapan kerentanan (lihat{' '}
              <a href="/keamanan">Keamanan</a>).
            </dd>
          </div>
        </dl>
      </>
    ),
  },
  {
    // fakta-data §4.22; backend transparency service (REPORT_PREFIXES), spec §5.8
    id: 'laporan-transparansi',
    title: 'Laporan transparansi',
    body: (
      <>
        <p>
          Setiap setengah tahun kami menerbitkan laporan dari hitungan harian yang tidak menyebut
          akun siapa pun. Laporan pertama terbit setelah peluncuran. Isinya:
        </p>
        <ul>
          <li>laporan yang diterima, menurut bahasa;</li>
          <li>keputusan moderasi menurut jenisnya, dan banding menurut hasilnya;</li>
          <li>
            permintaan dari aparat dan pemerintah, menurut jenis, hasil, dan negara asal permintaan;
          </li>
          <li>insiden keamanan, menurut tingkatnya;</li>
          <li>perubahan kebijakan yang dipaksakan pihak luar.</li>
        </ul>
        <p>Laporan hanya berisi jumlah, tanpa akun siapa pun.</p>
      </>
    ),
  },
  {
    // fakta-data §12
    id: 'permintaan-aparat',
    title: 'Permintaan aparat penegak hukum dan pemerintah',
    body: (
      <>
        <p>
          Kami tidak menyimpan nama, nomor telepon, atau email siapa pun, jadi kami sendiri tidak
          bisa mencari akun berdasarkan identitas. Permintaan harus menyebut id akun. Setiap
          permintaan dicatat menurut negara, jenis (data pengguna, penghapusan konten, penyimpanan
          data, darurat, penyadapan, atau lainnya), dan hasilnya (tidak ada data, ditolak, dipenuhi
          sebagian, atau dipenuhi), tanpa menyebut akun, lalu dihitung di laporan transparansi.
        </p>
        <h3>Yang ada di server untuk sebuah id akun</h3>
        <ul>
          <li>catatan akun, perangkat dan kunci publiknya, serta rantai kuncinya;</li>
          <li>tempel: dengan akun mana, kapan sampai ke menit, jenisnya, dan ruangnya;</li>
          <li>keanggotaan grup, keikutsertaan di ruang acara yang masih buka, dan penjaga;</li>
          <li>
            amplop pesan yang belum diambil (terenkripsi, dengan penerima, ukuran, dan waktu) dan
            data media terenkripsi;
          </li>
          <li>status langganan, kuota, dan kasus serta keputusan moderasi;</li>
          <li>
            pengenal acak langganan, yang juga dipegang Apple atau Google bersama pembeliannya, dan
            token notifikasi HP, yang bisa dibuka server.
          </li>
        </ul>
        <p>
          <strong>Dua data terakhir bisa menghubungkan akun dengan orangnya.</strong> Apple atau
          Google bisa mencocokkan pengenal langganan dengan akun toko pembelinya (nama, email, dan
          cara bayar), dan token notifikasi dengan perangkatnya beserta akun Apple atau Google di
          perangkat itu. Jadi data Patepang yang digabung dengan catatan Apple atau Google bisa
          menunjukkan siapa pemilik sebuah akun.
        </p>
        <h3>Yang tidak ada, sehingga tidak bisa diberikan</h3>
        <ul>
          <li>isi pesan, kabar, momen, atau media dalam bentuk yang bisa dibaca;</li>
          <li>nama, foto, nomor telepon, email, atau buku alamat;</li>
          <li>alamat IP, lokasi HP (GPS), atau catatan panggilan;</li>
          <li>
            siapa pengirim sebuah pesan, kecuali pesan pertama setelah tempel, yang terikat pada
            tempelnya (Kebijakan privasi bagian 4.3).
          </li>
        </ul>
        <p>
          Data lokasi yang ada di server hanya kota: kota yang ditulis akun yang belum lahir untuk
          daftar tunggu titik lahir (paling lama 90 hari), dan kota setiap titik lahir selama
          ruangnya ada, yang dirujuk tempel di sana.
        </p>
        <p>
          Patepang versi pertama tidak punya penahanan data (legal hold): penghapusan yang sudah
          terjadwal tetap berjalan. Bukti laporan hanya bisa dibaca moderator, bukan server.
        </p>
        <p>
          <Placeholder>
            Kebijakan tertulis untuk permintaan aparat, termasuk dasar hukum yang diterima dan kapan
            pengguna diberi tahu: menunggu keputusan dan tinjauan penasihat hukum
          </Placeholder>
        </p>
        <p>
          Permintaan resmi dikirim ke <Mail to="legal" />.
        </p>
      </>
    ),
  },
];

export default function TransparansiPage() {
  return (
    <DocPage
      page={page}
      lede={
        <p>
          Apa yang akan diterbitkan Patepang supaya bisa diperiksa orang lain, dan apa yang bisa dan
          tidak bisa kami berikan bila aparat memintanya.
        </p>
      }
      sections={sections}
    />
  );
}
