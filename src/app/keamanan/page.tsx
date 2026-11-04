import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { Mail } from '@/components/doc/parts';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';

/*
 * How Patepang protects people, its limits, and the coordinated disclosure policy with its safe
 * harbour (backend docs/security/disclosure.md; app ADR 0060 B32 approved the deadlines). The
 * design facts come from fakta-produk §5 and fakta-data §3, §11; nothing here is a guarantee, and
 * the audit status is said as it is. security.txt points here (Policy).
 */

const page = pageAt('/keamanan');

export const metadata = pageMetadata(page);

const sections: DocSection[] = [
  {
    // fakta-produk §5.1; fakta-data §0, §3, §4.8, §4.10, §4.13
    id: 'cara-melindungi',
    title: 'Cara Patepang melindungimu',
    body: (
      <>
        <p>
          Yang di bawah ini adalah cara Patepang dibangun. Semuanya sudah ada di kode, tetapi belum
          diaudit pihak luar dan belum berjalan di layanan sungguhan.
        </p>
        <ul>
          <li>
            <strong>Enkripsi ujung ke ujung.</strong> Pesan, grup, kabar, momen, foto, suara, dan
            berkas dienkripsi di HP sebelum dikirim, dengan libsignal (PQXDH dengan ML-KEM-1024 dan
            triple ratchet). Server hanya meneruskan isi yang tidak bisa dibacanya.
          </li>
          <li>
            <strong>Pengirim tersegel.</strong> Untuk pesan, server tahu penerimanya, tetapi tidak
            tahu pengirimnya.
          </li>
          <li>
            <strong>Kunci yang bisa diperiksa.</strong> Kunci setiap akun tercatat di log
            transparansi kunci yang publik dan hanya bertambah. HP orang lain memeriksa kuncimu
            sebelum mempercayainya, sehingga kunci tidak bisa diganti diam-diam. Catatan jangka
            panjang ditandatangani dua kali, dengan Ed25519 dan ML-DSA-65.
          </li>
          <li>
            <strong>Tempel yang disaksikan.</strong> Kecocokan goyangan diperiksa di enklaf, yaitu
            lingkungan terisolasi yang kodenya bisa dibuktikan; server sendiri tidak bisa membuat
            sertifikat tempel.
          </li>
          <li>
            <strong>Kunci tetap di HP.</strong> Kunci pribadi disimpan dengan kunci perangkat keras
            HP dan tidak pernah dikirim. PIN diperiksa di HP; Patepang tidak pernah menanyakan
            PIN-mu.
          </li>
          <li>
            <strong>Sedikit yang tersimpan.</strong> Tanpa email, nomor telepon, atau nama di
            server. Server tidak mencatat alamat IP, hanya tanggal terakhir aktif, dan log server
            disimpan 7 hari.
          </li>
          <li>
            <strong>Notifikasi tersegel.</strong> Apple dan Google hanya mengantar 176 byte
            tersegel; kalimat di layar tidak menyebut nama atau isi.
          </li>
          <li>
            <strong>Foto tanpa metadata.</strong> Foto dikirim tanpa data EXIF dan lokasi, dan
            ukuran setiap media dibulatkan ke atas sebelum dienkripsi, sehingga server hanya tahu
            ukuran kira-kira.
          </li>
          <li>
            <strong>Mode perjalanan dan percakapan terkunci.</strong> Dengan enam kata, orang,
            percakapan, kabar, dan momen bisa disegel sehingga HP hanya menampilkan pengganti.
            Percakapan juga bisa dikunci di balik PIN.
          </li>
          <li>
            <strong>Pemulihan lewat orang yang kamu temui.</strong> Tiga penjaga, dua cukup, dengan
            masa tunggu 48 jam yang bisa dibatalkan HP lamamu, dan kunci darurat 72 jam bila HP-mu
            hilang.
          </li>
        </ul>
      </>
    ),
  },
  {
    // fakta-produk §5.2, §5.3; fakta-data §14
    id: 'batasnya',
    title: 'Batasnya',
    body: (
      <>
        <p>Supaya kamu bisa menilai sendiri, ini yang tidak dilindungi rancangan Patepang:</p>
        <ul>
          <li>
            Server tahu akun mana pernah tempel dengan akun mana dan kapan, siapa anggota grup mana,
            dan siapa penjaga siapa. Isinya tidak, tetapi hubungan antarakun ya.
          </li>
          <li>
            Salinan di HP penerima ada di tangan penerima. &ldquo;Hapus untuk semua&rdquo; dan pesan
            yang menghilang bergantung pada aplikasi di HP mereka, dan tangkapan layar tetap
            mungkin.
          </li>
          <li>
            Cloudflare, Apple, dan Google melihat alamat IP dan waktu lalu lintas yang melewati
            mereka.
          </li>
          <li>HP yang sudah dibobol bisa membaca apa pun yang tampil di layarnya.</li>
        </ul>
        <p>
          Rinciannya ada di <a href="/kebijakan-privasi">Kebijakan privasi</a>.
        </p>
      </>
    ),
  },
  {
    // fakta-produk §0 items 1 and 7, §9
    id: 'keadaan-sekarang',
    title: 'Keadaan sekarang',
    body: (
      <p>
        Patepang belum diluncurkan. Audit keamanan oleh pihak luar adalah syarat sebelum peluncuran
        publik, dan belum dilakukan. Kode Patepang akan dibuka dengan lisensi AGPL-3.0 saat
        peluncuran publik, setelah audit, supaya siapa pun bisa memeriksanya (lihat{' '}
        <a href="/lisensi">Lisensi</a>).
      </p>
    ),
  },
  {
    // backend docs/security/disclosure.md: Scope, How to report
    id: 'melaporkan-kerentanan',
    title: 'Melaporkan kerentanan',
    body: (
      <>
        <p>
          Tulis ke <Mail to="security" /> dalam bahasa Indonesia atau Inggris. Ceritakan apa yang
          kamu temukan, cara mengulanginya, dan apa yang bisa didapat penyerang. Jangan sertakan
          data orang lain, dan uji hanya dengan akun dan perangkatmu sendiri.
        </p>
        <h3>Yang termasuk</h3>
        <p>
          Server dan selnya, enklaf dan atestasinya, aplikasi, protokol dan formatnya, dan log
          transparansi kunci.
        </p>
        <h3>Yang tidak termasuk</h3>
        <p>
          Serangan penolakan layanan dengan membanjiri lalu lintas, temuan di layanan pihak ketiga
          (laporkan kepada mereka), rekayasa sosial terhadap orang-orang kami, serangan fisik, dan
          hasil pemindai otomatis tanpa dampak yang ditunjukkan.
        </p>
      </>
    ),
  },
  {
    // backend docs/security/disclosure.md: What we do
    id: 'yang-kami-lakukan',
    title: 'Yang kami lakukan',
    body: (
      <ul>
        <li>
          Mengonfirmasi laporanmu paling lambat 3 hari kerja, dengan nama orang yang menanganinya.
        </li>
        <li>
          Menilai paling lambat 10 hari kerja: apakah bisa kami ulangi, seberapa berat, dan apa
          rencana kami.
        </li>
        <li>
          Memperbaiki temuan kritis dan tinggi secepat mungkin, biasanya dalam 30 hari, dan temuan
          lain dalam 90 hari.
        </li>
        <li>Memberi kabar paling sedikit setiap dua minggu sampai diperbaiki.</li>
        <li>
          Menyepakati tanggal pengungkapan bersamamu: biasanya setelah perbaikan sampai ke pengguna,
          atau 90 hari setelah laporanmu, mana yang lebih dulu, kecuali kita sepakat lain.
        </li>
        <li>Mencantumkan namamu di catatan rilis dan ucapan terima kasih, bila kamu mau.</li>
      </ul>
    ),
  },
  {
    // backend docs/security/disclosure.md: Safe harbour
    id: 'safe-harbour',
    title: 'Perlindungan untuk peneliti (safe harbour)',
    body: (
      <>
        <p>
          Kami tidak akan menempuh atau mendukung langkah hukum terhadap siapa pun yang, dengan
          itikad baik, melaporkan kerentanan sesuai kebijakan ini. Itikad baik berarti: hanya
          menguji yang termasuk cakupan, tidak membaca, menyimpan, mengubah, atau menghapus data
          orang lain, tidak mengganggu layanan bagi orang lain, dan memberi kami waktu yang wajar
          sebelum mengungkapkan.
        </p>
        <p>
          Bila pihak ketiga mengambil langkah hukum terhadapmu atas penelitian seperti itu, kami
          akan menyatakan bahwa kamu bertindak sesuai kebijakan ini.
        </p>
      </>
    ),
  },
  {
    id: 'in-english',
    title: 'In English',
    body: (
      <div lang="en">
        <p>
          Report vulnerabilities to <Mail to="security" />, in Indonesian or English, with what you
          found, how to reproduce it, and what an attacker gains. Do not include anyone else&rsquo;s
          data, and test only with your own accounts and devices. In scope: the server and its
          cells, the enclaves and their attestation, the apps, the protocol and its formats, and the
          key-transparency log. Out of scope: volumetric denial of service, third-party services,
          social engineering, physical attacks, and scanner output without a demonstrated impact.
        </p>
        <p>
          We acknowledge within 3 business days, triage within 10 business days, fix critical and
          high findings normally within 30 days and others within 90, keep you informed at least
          every two weeks, and agree a disclosure date with you (normally once the fix reaches
          users, or 90 days after your report, whichever comes first). We will not pursue or support
          legal action against good-faith research under this policy. Patepang has not launched yet
          and has not been externally audited; the audit comes before public launch.
        </p>
      </div>
    ),
  },
  {
    id: 'security-txt',
    title: 'security.txt',
    body: (
      <p>
        Kontak dan kebijakan ini juga tercantum di{' '}
        <a href="/.well-known/security.txt">/.well-known/security.txt</a>, sesuai RFC 9116.
      </p>
    ),
  },
];

export default function KeamananPage() {
  return (
    <DocPage
      page={page}
      lede={
        <p>
          Cara Patepang melindungi orang yang memakainya, apa yang tidak bisa dilindunginya, dan
          cara melaporkan kerentanan dengan aman.
        </p>
      }
      sections={sections}
    />
  );
}
