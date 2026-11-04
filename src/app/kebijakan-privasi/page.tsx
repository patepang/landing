import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { Entity, Mail, Placeholder } from '@/components/doc/parts';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';

/*
 * The privacy policy (UU PDP No. 27 Tahun 2022). Every statement of fact comes from the data fact
 * sheet of 4 November 2026 (fakta-data.md: backend spec and ADRs, app and core code); its section
 * is named beside each part below. What that sheet marks UNCONFIRMED, or leaves to the owner or to
 * counsel, stands here as a marked placeholder. Legal bases are the drafter's proposal for
 * counsel's review.
 */

const page = pageAt('/kebijakan-privasi');

export const metadata = pageMetadata(page);

const sections: DocSection[] = [
  {
    // fakta-data §0
    id: 'ringkasnya',
    title: 'Ringkasnya',
    body: (
      <ul>
        <li>
          Akunmu adalah sepasang kunci yang dibuat di HP-mu. Kami tidak meminta nama, email, nomor
          telepon, kata sandi, tanggal lahir, atau foto.
        </li>
        <li>
          Isi yang kamu kirim, seperti pesan, kabar, momen, foto, dan berkas, dikunci di HP-mu
          sebelum dikirim. Server menyimpan dan meneruskannya dalam bentuk yang tidak bisa
          dibacanya.
        </li>
        <li>
          Server tetap menyimpan sebagian data tentang akunmu: kunci publik, akun mana pernah tempel
          dengan akun mana dan kapan, keanggotaan grup, penjagamu, status langganan, dan ruang media
          yang kamu pakai. Bagian 4 merinci semuanya.
        </li>
        <li>
          Server tidak mencatat alamat IP per akun dan tidak menyimpan riwayat aktivitas. Yang
          disimpan hanya tanggal terakhir kamu aktif.
        </li>
        <li>Aplikasi tidak memuat iklan atau alat analitik, dan situs ini tidak memakai cookie.</li>
        <li>Data di server diproses di luar Indonesia, terutama di Singapura.</li>
        <li>Kamu bisa mengekspor datamu dan menghapus akunmu dari aplikasi.</li>
      </ul>
    ),
  },
  {
    // fakta-data §1
    id: 'siapa-kami',
    title: 'Siapa kami',
    body: (
      <>
        <p>
          Patepang dikelola oleh <Entity field="name" />, beralamat di <Entity field="address" />,
          dengan nomor pendaftaran <Entity field="registration" />. Dalam kebijakan ini,
          &ldquo;kami&rdquo; berarti badan itu. Kami adalah pengendali data pribadi untuk data yang
          diproses server Patepang.
        </p>
        <p>
          Kebijakan ini berlaku untuk aplikasi Patepang dan situs patepang.com. Patepang belum
          diluncurkan: kebijakan ini menjelaskan cara layanan memproses data saat sudah berjalan,
          dan baru berlaku setelah ditinjau penasihat hukum.
        </p>
        <p>
          Pertanyaan dan permintaan tentang data pribadi: <Mail to="privacy" />. Pejabat pelindungan
          data pribadi: <Entity field="dpo" />.
        </p>
      </>
    ),
  },
  {
    // fakta-data §3, §5, §10
    id: 'tetap-di-hp',
    title: 'Yang tetap di HP-mu',
    body: (
      <>
        <p>
          Sebagian besar Patepang hidup di HP-mu dan tidak pernah sampai ke kami. Data aplikasi
          disimpan tersegel dengan kunci perangkat keras HP, di tempat yang tidak ikut cadangan
          sistem HP.
        </p>
        <ul>
          <li>
            <strong>Kunci pribadi</strong> akun dan perangkatmu tidak pernah meninggalkan HP.
          </li>
          <li>
            <strong>PIN</strong> diperiksa di HP dan tidak pernah dikirim. Patepang tidak pernah
            menanyakan PIN-mu.
          </li>
          <li>
            <strong>Isi aplikasimu</strong>: orang yang kamu temui dan nama mereka, percakapan,
            kabar, momen, lingkaran, rencana, catatan, dan pengaturan. Semua ini hanya keluar dari
            HP dalam bentuk terenkripsi: ke orang yang kamu pilih, di cadangan akun bila kamu
            mengaktifkannya (bagian 4.7), atau di berkas ekspor yang kamu buat sendiri.
          </li>
          <li>
            <strong>Wilayah rumah</strong> (provinsi) hanya disimpan di HP.
          </li>
          <li>
            <strong>Nama panggilan dan foto profil</strong> hanya dikirim terenkripsi ke orang yang
            pernah kamu temui. <strong>Ulang tahun</strong> bersifat pilihan, tanggal dan bulan
            saja, dan hanya dikirim ke penerima yang kamu pilih.
          </li>
          <li>
            <strong>Bukti untuk laporan</strong>: isi yang sudah tampil di HP-mu disimpan tersegel
            di HP selama 30 hari sejak tiba, walaupun pengirimnya menghapusnya, supaya masih bisa
            kamu laporkan. Isi itu hanya keluar bila kamu melaporkannya.
          </li>
          <li>
            <strong>Pengingat</strong> rencana, momen setahun lalu, dan koneksi yang memudar
            dijadwalkan di HP, tanpa nama.
          </li>
        </ul>
        <p>
          Aplikasi tidak meminta izin lokasi atau buku alamat, dan tidak membaca galeri fotomu: foto
          dipilih lewat pemilih milik sistem HP. Nama tempat di momen dan rencana kamu ketik
          sendiri.
        </p>
      </>
    ),
  },
  {
    // fakta-data §4.1 to §4.18, §6
    id: 'data-yang-kami-proses',
    title: 'Data yang kami proses, untuk apa, dan dasar hukumnya',
    body: (
      <>
        <p>
          Server Patepang menyimpan data berikut. Dasar hukum yang disebut mengikuti Pasal 20 UU No.
          27 Tahun 2022 tentang Pelindungan Data Pribadi.
        </p>

        <h3>4.1 Akun dan perangkat</h3>
        <p>
          Id akun (sidik kunci publik perangkat pertamamu), wilayah server akunmu, waktu akun
          dibuat, waktu akun lahir (dibulatkan ke 15 menit), cara lahir (diatestasi atau disponsori,
          dan akun sponsornya bila disponsori), tanggal terakhir aktif, status langganan, ruang
          media terpakai, jadwal penghapusan bila kamu memintanya, kunci darurat, dan status
          moderasi. Untuk setiap perangkat: nomornya, jenisnya, kunci publiknya, tanggal terakhir
          masuk, dan kapan ditambahkan atau dicabut. Masuk memakai tanda tangan kunci perangkat,
          tanpa kata sandi; token masuk hanya disimpan sebagai hash dan berlaku 24 jam.
        </p>
        <p>
          Untuk menjalankan akunmu: masuk, paket dan kuota, lahir dan berakhirnya akun, batas
          penyalahgunaan, dan sanksi. Dasar: pemenuhan perjanjian denganmu (syarat dan ketentuan),
          dan kepentingan yang sah untuk mencegah penyalahgunaan.
        </p>

        <h3>4.2 Tempel</h3>
        <p>
          Untuk setiap tempel yang berhasil: id kedua akun, jenis tempel, waktunya (dibulatkan ke 15
          menit), ruangnya bila terjadi di ruang acara, dan sertifikat tempel. Sertifikat itu memuat
          waktu yang ditandatangani kedua HP sampai ke menit, nomor perangkat, dan tanda tangan
          kedua HP serta saksi.{' '}
          <strong>
            Jadi server tahu akun mana pernah bertemu akun mana, kapan, dan dengan cara apa.
          </strong>{' '}
          Server tidak tahu di mana kalian bertemu.
        </p>
        <p>
          Rekaman goyangan (2 sampai 2,5 detik data sensor gerak) disegel di HP untuk enklaf tempel,
          yaitu lingkungan terisolasi yang kodenya bisa dibuktikan. Server hanya memegang bentuk
          tersegelnya dan tidak bisa membacanya. Enklaf membandingkan dua rekaman, membuangnya, lalu
          hanya mengembalikan keputusannya. Rekaman hanya dipakai untuk mencocokkan dua goyangan
          yang terjadi bersamaan, tidak pernah untuk mengenali orang.
        </p>
        <p>
          Selama tempel berlangsung, data sesinya disimpan beberapa menit saja. Tempel tanpa sinyal
          menyimpan bahannya paling lama 7 hari sampai dikonfirmasi. Server juga menghitung berapa
          akun berbeda yang pernah kamu tempel, untuk syarat membuat ruang acara dan menjadi
          sponsor.
        </p>
        <p>
          Untuk membuktikan pertemuan langsung, satu-satunya cara terhubung dan cara akun lahir.
          Dasar: pemenuhan perjanjian.
        </p>

        <h3>4.3 Pengiriman pesan</h3>
        <p>
          Setiap pesan disimpan sebagai amplop terenkripsi untuk perangkat penerima, bersama akun
          dan perangkat penerima, kelompok ukurannya, dan waktu dibuat. Pengirim tidak diketahui
          server. Amplop dihapus begitu perangkat penerima mengambilnya. Amplop yang belum diambil
          tetap tersimpan sampai perangkat itu dicabut atau akunnya dihapus.
        </p>
        <p>
          Token pengiriman dibuat di HP penerima, satu untuk setiap koneksi dan arah. Server hanya
          menyimpan hash-nya, terhubung ke penerima, dan menghapus token yang dicabut 30 hari
          setelah dicabut. Waktu dan ukuran lalu lintas tetap terlihat oleh server dan oleh
          Cloudflare.
        </p>
        <p>Untuk mengantar pesan. Dasar: pemenuhan perjanjian.</p>

        <h3>4.4 Grup</h3>
        <p>
          Id grup dan id akun anggotanya, peran (admin atau anggota), siapa menambahkan siapa, dan
          tanggal bergabung. Keanggotaan ini disimpan tanpa enkripsi di server; nama, foto, dan
          pesan grup terenkripsi dan tidak ada di server. Data keanggotaan dihapus saat kamu keluar
          dari grup. Untuk menjalankan grup. Dasar: pemenuhan perjanjian.
        </p>

        <h3>4.5 Foto, video, suara, dan berkas</h3>
        <p>
          Media disimpan terenkripsi, masing-masing dengan kuncinya sendiri yang hanya dikirim di
          dalam pesan terenkripsi. Server mencatat id objek, kunci unduhan acak, akun pemiliknya
          (untuk kuota), ukuran yang sudah dibulatkan ke atas di dalam enkripsi, kelasnya (pesan,
          kabar, momen, stiker, cadangan, atau ruang), dan tanggalnya. Unduhan tidak memakai akun,
          jadi server tidak bisa menghubungkan pengunggah dan pengunduh.
        </p>
        <p>
          Foto yang dikirim sebagai foto dikodekan ulang tanpa data EXIF dan lokasi. Berkas yang
          dikirim sebagai dokumen dikirim apa adanya, termasuk metadatanya, dan aplikasi
          memperingatkan hal itu. Untuk menyimpan dan mengantar media. Dasar: pemenuhan perjanjian.
        </p>

        <h3>4.6 Ruang acara, titik lahir, dan daftar tunggu kota</h3>
        <p>
          Untuk ruang acara dan titik lahir: tuan rumah, jenis ruang, jam buka dan tutup, kota untuk
          titik lahir, peserta dan waktu mereka masuk, kartu peserta terenkripsi, permintaan koneksi
          antarpeserta, dan papan terenkripsi tanpa nama penulis. Semuanya dihapus beberapa menit
          setelah ruang ditutup, paling lama 7 hari setelah dibuka. Akun yang belum lahir boleh
          menulis satu kota untuk daftar tunggu titik lahir; kota itu dihapus saat akun lahir atau
          setelah 90 hari. Dasar: pemenuhan perjanjian.
        </p>

        <h3>4.7 Penjaga, pemulihan, dan cadangan akun</h3>
        <p>
          Server mencatat siapa menjaga siapa dan jawaban mereka. Pemulihan menyimpan kunci publik
          HP baru, pernyataan bertanda tangan dua penjaga, dan waktunya, dengan masa tunggu 48 jam.
          Selama pemulihan berjalan, perangkat lamamu dan setiap akun yang pernah tempel denganmu
          diberi tahu. Data pemulihan dihapus 8 hari setelah pemulihan selesai.
        </p>
        <p>
          Cadangan akun bersifat pilihan dan butuh paling sedikit dua penjaga. HP-mu mengenkripsi
          cadangan dengan kunci baru setiap kali, lalu memecah kuncinya untuk HP para penjaga.
          Server menyimpan cadangan dan pecahan kunci itu tetapi tidak bisa membuka keduanya. Foto
          dan grup belum ikut dicadangkan. Dasar: pemenuhan perjanjian.
        </p>

        <h3>4.8 Notifikasi</h3>
        <p>
          Bila kamu mengizinkan notifikasi, server menyimpan token notifikasi HP-mu dari Apple atau
          Google. Token itu disimpan terenkripsi, tetapi server membukanya untuk mengirim
          notifikasi, jadi server bisa membacanya. Setiap notifikasi berukuran sama, 176 byte,
          tersegel untuk HP-mu: jenis dan waktunya saja, tanpa pengirim dan tanpa isi. Apple dan
          Google hanya tahu ada notifikasi ke perangkat itu pada waktu tertentu. Pengingat pertemuan
          dari server mati sampai kamu menyalakannya. Token dihapus bersama perangkat atau akunnya.
          Dasar: pemenuhan perjanjian, dan persetujuanmu atas izin notifikasi.
        </p>

        <h3>4.9 Langganan dan tip</h3>
        <p>
          Untuk langganan: toko tempat kamu membeli, pengenal acak yang menghubungkan pembelian
          dengan akunmu, status langganan, apakah masa coba sudah dipakai, dan batas aksesnya. Hash
          id langganan dari toko hanya disimpan selama langganan aktif, termasuk masa coba dan masa
          tenggang. Kami tidak menyimpan harga, cara bayar, identitas akun tokomu, atau kuitansi.
          Pembelian diperiksa lewat layanan Apple atau Google.
        </p>
        <p>
          Tip hanya dihitung dalam jumlah harian; hash id transaksinya disimpan 30 hari untuk
          mencegah hitungan ganda, tanpa akun, jumlah, atau produk. Dasar: pemenuhan perjanjian.
        </p>

        <h3>4.10 Laporan dan moderasi</h3>
        <p>
          Saat kamu melaporkan sesuatu, HP-mu menyegel isi yang dilaporkan, kategorinya, dan
          catatanmu untuk para moderator; server tidak bisa membacanya. Server menyimpan akun yang
          dilaporkan, jenis isi, bahasa, pernyataan bertanda tangan dari penulis isi itu, bukti
          tersegel, jam laporan dibuat, serta status, keputusan, alasan, dan banding kasusnya.{' '}
          <strong>Akun, perangkat, dan alamat pelapor tidak disimpan.</strong> Moderator adalah
          manusia; setiap pembacaan kasus dan keputusan dicatat di log audit.
        </p>
        <p>
          Untuk menjaga keselamatan orang yang memakai Patepang dan menegakkan pedoman komunitas.
          Dasar: kepentingan yang sah, dan kewajiban hukum bila berlaku.
        </p>

        <h3>4.11 Mencegah bot dan akun massal</h3>
        <p>
          Saat akun dibuat, HP memberi bukti dari Apple (App Attest dan DeviceCheck) atau Google
          (Play Integrity) bahwa aplikasinya asli. Server memeriksanya lalu hanya menyimpan cara
          akun lahir. Untuk batas 3 akun per HP per bulan, server menyimpan kunci acak per
          pemasangan, bulannya, dan jumlahnya; hitungan bulan lalu dihapus setiap hari. Penghitung
          laju sementara memakai perangkat, akun, atau alamat IP (alamat IP hanya di rute tanpa
          masuk), di memori, tanpa ditulis ke disk. Dasar: kepentingan yang sah.
        </p>

        <h3>4.12 Alamat IP, negara, dan log</h3>
        <p>
          Server Patepang tidak menyimpan atau mencatat alamat IP. Negara dari Cloudflare hanya
          dipakai untuk hitungan harian pembuatan akun dan mulai langganan; negara yang dipakai
          kurang dari 5 akun hari itu dihitung sebagai &ldquo;lainnya&rdquo;. Log server tanpa
          alamat IP dan tanpa id akun, disimpan 7 hari. Log audit mencatat tindakan operator dan
          moderator, tanpa id akun, dan disimpan tanpa batas waktu.{' '}
          <Placeholder>Aturan lama penyimpanan log audit: menunggu keputusan</Placeholder>
        </p>

        <h3>4.13 Hitungan dan laporan transparansi</h3>
        <p>
          Server menyimpan hitungan harian tanpa akun, misalnya jumlah akun, tempel, laporan, dan
          keputusan. Kota atau negara yang dipakai kurang dari 5 akun digabung sebagai
          &ldquo;lainnya&rdquo;. Hitungan ini dipakai untuk menjalankan layanan dan untuk laporan
          transparansi, dan disimpan tanpa batas waktu. Dasar: kepentingan yang sah.
        </p>

        <h3>4.14 Pemeriksaan pembaruan aplikasi</h3>
        <p>
          Setiap kali dibuka, aplikasi menanyakan pembaruan ke layanan Expo (EAS Update). Permintaan
          itu membawa alamat IP HP, pengenal acak untuk pemasangan aplikasi itu, platform, dan
          versi.{' '}
          <Placeholder>
            Keputusan pemilik: fitur ini tetap dipakai dan diungkapkan di sini, atau dimatikan di
            versi rilis
          </Placeholder>{' '}
          Dasar: kepentingan yang sah untuk mengirim perbaikan.
        </p>
      </>
    ),
  },
  {
    // fakta-data §4.7
    id: 'isi-terenkripsi',
    title: 'Isi yang tidak bisa kami baca',
    body: (
      <>
        <p>
          Pesan, grup, kabar, momen, rencana, foto, suara, dan berkas dienkripsi di HP sebelum
          dikirim, dan hanya terbuka di HP penerima. Server tidak memegang kuncinya. Isi itu hanya
          bisa dibaca pihak lain karena tindakanmu sendiri: saat kamu melaporkannya (moderator
          membacanya), atau saat kamu membuat berkas ekspor atau berkas bukti. Cadangan akun hanya
          bisa dibuka HP barumu, setelah pemulihan yang disetujui dua penjaga.
        </p>
        <p>
          &ldquo;Hapus untuk semua&rdquo;, pesan yang menghilang, dan foto sekali lihat adalah janji
          aplikasi, bukan jaminan teknis: salinan di HP penerima ada di HP mereka. Isi yang sudah
          tampil juga masih bisa dilaporkan penerimanya sampai 30 hari setelah dihapus.
        </p>
      </>
    ),
  },
  {
    // fakta-data §4.2, §4.12, §4.20
    id: 'yang-terlihat-orang-lain',
    title: 'Yang bisa dilihat orang lain',
    body: (
      <ul>
        <li>
          Rantai kunci akunmu bersifat publik, supaya HP orang lain bisa memeriksa kuncimu sebelum
          mempercayainya. Siapa pun yang tahu id akunmu bisa membaca kunci publik perangkatmu, waktu
          setiap perubahan, id akun para penjagamu, dan, bila akunmu diblokir, tanda blokir itu.
        </li>
        <li>
          Log transparansi kunci bersifat publik dan hanya bertambah. Isinya menunjukkan berapa
          banyak perubahan dan kapan, bukan akun mana.
        </li>
        <li>Orang yang pernah tempel denganmu diberi tahu bila akunmu sedang dipulihkan.</li>
        <li>
          Anggota grup saling melihat sesama anggota; peserta ruang acara melihat peserta lain
          sesuai perannya.
        </li>
      </ul>
    ),
  },
  {
    // fakta-produk Lampiran A (retensi); fakta-data §4, §8.1, §4.23
    id: 'lama-penyimpanan',
    title: 'Berapa lama data disimpan',
    body: (
      <table>
        <caption>Lama penyimpanan data di server</caption>
        <thead>
          <tr>
            <th scope="col">Data</th>
            <th scope="col">Lama disimpan</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Akun</th>
            <td>
              Selama akun ada. Setelah dihapus, tersisa catatan penutup (id, wilayah server, tanggal
              hapus, dan entri pencabutan terakhir) selama 12 bulan.
            </td>
          </tr>
          <tr>
            <th scope="row">Akun yang belum lahir</th>
            <td>Dihapus seluruhnya setelah 30 hari tanpa tempel.</td>
          </tr>
          <tr>
            <th scope="row">Akun yang tidak aktif</th>
            <td>Pengingat di bulan ke-11; akun dihapus setelah 12 bulan tidak aktif.</td>
          </tr>
          <tr>
            <th scope="row">Akun yang kamu hapus</th>
            <td>Tenggang 7 hari yang bisa dibatalkan, lalu dihapus.</td>
          </tr>
          <tr>
            <th scope="row">Log transparansi kunci</th>
            <td>Permanen, sesuai rancangannya, termasuk rujukan internal ke id akun.</td>
          </tr>
          <tr>
            <th scope="row">Tempel</th>
            <td>Sampai salah satu akunnya dihapus.</td>
          </tr>
          <tr>
            <th scope="row">Amplop pesan</th>
            <td>
              Sampai diambil perangkat penerima. Yang belum diambil, sampai perangkat dicabut atau
              akun dihapus.
            </td>
          </tr>
          <tr>
            <th scope="row">Token pengiriman yang dicabut</th>
            <td>30 hari setelah dicabut.</td>
          </tr>
          <tr>
            <th scope="row">Media di pesan</th>
            <td>Sampai semua penerima mengunduhnya, paling lama 30 hari.</td>
          </tr>
          <tr>
            <th scope="row">Media kabar, momen, stiker, dan foto profil</th>
            <td>
              Sampai kamu menghapusnya, atau dihapus mulai dari yang tertua setelah 12 bulan
              melewati kuota.
            </td>
          </tr>
          <tr>
            <th scope="row">Cadangan akun</th>
            <td>Diganti cadangan berikutnya; dihapus saat cadangan dimatikan.</td>
          </tr>
          <tr>
            <th scope="row">Ruang acara</th>
            <td>Sampai ditutup, paling lama 7 hari setelah dibuka. Catatan tempelnya tetap.</td>
          </tr>
          <tr>
            <th scope="row">Daftar tunggu kota</th>
            <td>Sampai akun lahir, paling lama 90 hari.</td>
          </tr>
          <tr>
            <th scope="row">Tempel tanpa sinyal</th>
            <td>Paling lama 7 hari sampai dikonfirmasi, lalu dihapus 7 hari kemudian.</td>
          </tr>
          <tr>
            <th scope="row">Pemulihan akun</th>
            <td>8 hari setelah selesai.</td>
          </tr>
          <tr>
            <th scope="row">Bukti laporan</th>
            <td>Sampai kasusnya ditutup, kecuali selama blokir masih berlaku.</td>
          </tr>
          <tr>
            <th scope="row">Hash id langganan toko</th>
            <td>Sampai langganan dan masa tenggangnya berakhir.</td>
          </tr>
          <tr>
            <th scope="row">Hash transaksi tip</th>
            <td>30 hari.</td>
          </tr>
          <tr>
            <th scope="row">Log server</th>
            <td>7 hari.</td>
          </tr>
          <tr>
            <th scope="row">Hitungan harian tanpa akun</th>
            <td>Tanpa batas waktu.</td>
          </tr>
          <tr>
            <th scope="row">Cadangan basis data</th>
            <td>
              Terenkripsi, dikunci 35 hari, dihapus setelah 40 hari. Data yang sudah dihapus bisa
              tetap ada di cadangan ini sampai 40 hari.
            </td>
          </tr>
        </tbody>
      </table>
    ),
  },
  {
    // fakta-data §2
    id: 'penerima-dan-pemroses',
    title: 'Penerima dan pemroses data',
    body: (
      <>
        <p>
          Kami tidak menjual data dan tidak membagikannya untuk iklan atau pemasaran. Penyedia di
          bawah memproses data untuk kami sebagai bagian dari layanan:
        </p>
        <dl>
          <div>
            <dt>Amazon Web Services (AWS)</dt>
            <dd>
              Server aplikasi, enklaf, basis data, dan kunci enkripsi. Bisa mengakses semua yang
              disimpan server: data di bagian 4 dan isi yang terenkripsi. Lokasi: Singapura; kunci
              enkripsi cadangan basis data di Frankfurt, Jerman.
            </dd>
          </div>
          <div>
            <dt>Cloudflare</dt>
            <dd>
              Jaringan di depan server (DNS, TLS, perlindungan serangan, pembatasan laju),
              penyimpanan media terenkripsi, cadangan basis data terenkripsi, dan relay panggilan
              bila fitur panggilan tersedia. Melihat alamat IP, waktu, dan ukuran setiap permintaan,
              termasuk id akun yang ada di sebagian alamat permintaan; isi pesan dan media tetap
              terenkripsi. Lokasi: pusat data terdekat di seluruh dunia; media dengan petunjuk
              lokasi Asia-Pasifik (petunjuk, bukan jaminan); cadangan di wilayah hukum Uni Eropa.
            </dd>
          </div>
          <div>
            <dt>Apple</dt>
            <dd>
              App Store (unduhan, langganan, tip), layanan notifikasi, dan pemeriksaan keaslian
              aplikasi saat akun dibuat. Melihat akun App Store dan pembeliannya (data Apple
              sendiri), token notifikasi, dan waktu notifikasi. Lokasi: Amerika Serikat dan global.
            </dd>
          </div>
          <div>
            <dt>Google</dt>
            <dd>
              Google Play (unduhan dan pembayaran), Firebase Cloud Messaging (notifikasi), dan Play
              Integrity (pemeriksaan keaslian aplikasi saat akun dibuat). Melihat hal yang sama
              seperti Apple. Lokasi: Amerika Serikat dan global.
            </dd>
          </div>
          <div>
            <dt>Expo (EAS Update)</dt>
            <dd>
              Pemeriksaan pembaruan aplikasi (bagian 4.14). Melihat alamat IP, pengenal acak per
              pemasangan, platform, dan versi. Lokasi:{' '}
              <Placeholder>Lokasi pemrosesan Expo: belum dikonfirmasi</Placeholder>
            </dd>
          </div>
          <div>
            <dt>Vercel</dt>
            <dd>
              Menyajikan situs patepang.com dan mencatat alamat IP serta jenis browser pengunjung di
              log permintaannya. Lokasi dan lama penyimpanan:{' '}
              <Placeholder>Lokasi dan retensi log Vercel: belum dikonfirmasi</Placeholder>
            </dd>
          </div>
          <div>
            <dt>Penyedia surel dan halaman status</dt>
            <dd>
              Menerima surel yang kamu kirim ke kami dan menyajikan halaman status layanan.{' '}
              <Placeholder>Penyedia surel dan halaman status: belum dipilih</Placeholder>
            </dd>
          </div>
        </dl>
        <p>
          Permintaan dari aparat penegak hukum dan pemerintah dijelaskan di halaman{' '}
          <a href="/transparansi">Transparansi</a>.
        </p>
      </>
    ),
  },
  {
    // fakta-data §2 (cross-border summary)
    id: 'transfer-ke-luar-negeri',
    title: 'Transfer data ke luar Indonesia',
    body: (
      <>
        <p>
          Data server dari pengguna di Indonesia diproses di luar Indonesia: di Singapura (server
          utama), di pusat data Cloudflare terdekat, di Asia-Pasifik (media terenkripsi), di Uni
          Eropa (cadangan basis data terenkripsi), dan di Amerika Serikat atau secara global (Apple,
          Google, Expo). Saat ini hanya ada satu wilayah server, Singapura, dan akun belum bisa
          dipindahkan ke wilayah lain.
        </p>
        <p>
          Isi yang kamu kirim terenkripsi ujung ke ujung, dan data di server serta cadangannya
          disimpan terenkripsi.{' '}
          <Placeholder>
            Dasar transfer menurut Pasal 56 UU PDP: menunggu tinjauan penasihat hukum
          </Placeholder>
        </p>
      </>
    ),
  },
  {
    // fakta-data §8, §14
    id: 'hakmu',
    title: 'Hakmu dan cara memakainya',
    body: (
      <>
        <p>UU PDP memberimu hak atas data pribadimu. Di Patepang, caranya sebagai berikut.</p>
        <ul>
          <li>
            <strong>Mendapat informasi</strong> tentang pemrosesan datamu: kebijakan ini, dan
            jawaban atas pertanyaanmu di <Mail to="privacy" />.
          </li>
          <li>
            <strong>Mengakses dan mendapat salinan</strong>: data di HP-mu ada di aplikasi dan bisa
            kamu ekspor sebagai berkas terenkripsi yang dibuka dengan enam kata. Untuk data di
            server, aplikasi menampilkan langganan, kuota, penjaga, pemulihan, keputusan moderasi,
            jumlah tempel, dan rantai perangkatmu. Belum ada satu tombol untuk mengunduh semua data
            server sekaligus.
          </li>
          <li>
            <strong>Memperbaiki</strong>: nama panggilan dan profil kamu ubah sendiri di aplikasi.
          </li>
          <li>
            <strong>Menghapus dan mengakhiri pemrosesan</strong>: hapus isi milikmu di aplikasi,
            atau hapus akunmu. Caranya ada di halaman <a href="/hapus-akun">Hapus akun</a>.
          </li>
          <li>
            <strong>Menarik persetujuan</strong>: izin notifikasi bisa dicabut di pengaturan HP, dan
            pilihan privasi di aplikasi bisa diubah kapan saja. Pilihan seperti tanda dibaca dan
            nama di notifikasi dimulai dari yang paling privat sampai kamu memilih.
          </li>
          <li>
            <strong>Memindahkan data</strong>: berkas ekspor berisi datamu dalam format terbuka.
          </li>
          <li>
            <strong>Menolak keputusan otomatis</strong>: Patepang tidak membuat keputusan otomatis
            tentangmu (bagian 11).
          </li>
          <li>
            <strong>Membatasi pemrosesan, mengajukan keberatan, dan menggugat</strong> sesuai UU
            PDP, lewat <Mail to="privacy" />.
          </li>
        </ul>
        <p>
          Karena kami tidak menyimpan nama, email, atau nomor teleponmu, kami tidak bisa mengenali
          akunmu dari sebuah surel. Permintaan atas data di server perlu menyebut id akunmu dan
          menunjukkan bahwa kamu memegang kuncinya.{' '}
          <Placeholder>Cara memverifikasi permintaan lewat surel: menunggu keputusan</Placeholder>{' '}
          Kami menjawab dalam batas waktu yang ditetapkan UU PDP. Kamu juga bisa mengadu ke lembaga
          pelindungan data pribadi yang ditetapkan pemerintah.
        </p>
      </>
    ),
  },
  {
    // fakta-data §4.5, §4.18, §4.20
    id: 'keputusan-otomatis',
    title: 'Keputusan otomatis',
    body: (
      <p>
        Patepang tidak membuat keputusan otomatis atau profil tentangmu yang berakibat hukum atau
        berdampak besar bagimu. Pemeriksaan otomatis yang ada bersifat teknis: enklaf memeriksa
        apakah dua goyangan terjadi bersamaan, dan server membatasi jumlah akun per HP dan laju
        permintaan untuk mencegah penyalahgunaan. Isi tidak dipindai otomatis, karena server memang
        tidak bisa membacanya. Keputusan moderasi selalu diambil manusia.
      </p>
    ),
  },
  {
    // fakta-data §9
    id: 'anak-anak',
    title: 'Anak-anak',
    body: (
      <p>
        Patepang hanya untuk orang berumur 18 tahun ke atas. Kami tidak meminta tanggal lahir, dan
        server tidak menyimpan umur siapa pun.{' '}
        <Placeholder>
          Cara aplikasi menanyakan umur, dan langkah bila ada pengguna di bawah 18 tahun: menunggu
          tinjauan penasihat hukum
        </Placeholder>
      </p>
    ),
  },
  {
    // fakta-data §11
    id: 'keamanan-data',
    title: 'Keamanan data',
    body: (
      <>
        <p>
          Isi dienkripsi ujung ke ujung di HP. Kunci pribadi disimpan dengan kunci perangkat keras
          HP. Koneksi ke server memakai TLS 1.3 dengan HSTS dan DNSSEC; jalur dari Cloudflare ke
          server memakai TLS dua arah. Basis data terenkripsi, setiap bagian server hanya mendapat
          hak akses yang dibutuhkannya, dan kunci enklaf hanya terbuka di dalam enklaf yang
          terbukti. Penjelasan lengkapnya ada di halaman <a href="/keamanan">Keamanan</a>.
        </p>
        <p>
          Audit keamanan oleh pihak luar adalah syarat sebelum peluncuran publik dan belum
          dilakukan. Tidak ada sistem yang bebas risiko; bila kamu menemukan kerentanan, laporkan ke{' '}
          <Mail to="security" />.
        </p>
      </>
    ),
  },
  {
    // fakta-data §11 (breach notification)
    id: 'kebocoran-data',
    title: 'Bila terjadi kebocoran data',
    body: (
      <p>
        Bila kami mengetahui kebocoran data pribadi, kami memberi tahu secara tertulis lembaga
        pelindungan data pribadi dan orang yang terdampak paling lambat 3 × 24 jam, sesuai Pasal 46
        UU PDP. Karena server tidak punya kontak siapa pun, pemberitahuan untukmu disampaikan di
        aplikasi dan di halaman status (status.patepang.com). Isinya: apa yang terjadi dan kapan,
        data apa yang terdampak, apa yang sudah kami lakukan, dan apa yang bisa kamu lakukan. Yang
        belum diketahui kami sebut terus terang, lalu kami susul. Setiap insiden dihitung di laporan
        transparansi.
      </p>
    ),
  },
  {
    // fakta-data §7
    id: 'situs-ini',
    title: 'Situs patepang.com',
    body: (
      <p>
        Situs ini berupa berkas statis: tanpa cookie, tanpa analitik, tanpa formulir, tanpa
        penyimpanan di browser, dan tanpa skrip atau huruf dari pihak lain. Situs disajikan Vercel,
        yang mencatat alamat IP dan jenis browser pengunjung di log permintaannya (bagian 8). Bila
        kamu menulis surel kepada kami, kami menerima alamat surel dan isi suratmu.{' '}
        <Placeholder>Lama penyimpanan surel: menunggu keputusan</Placeholder>
      </p>
    ),
  },
  {
    id: 'perubahan',
    title: 'Perubahan kebijakan',
    body: (
      <p>
        Kebijakan ini bisa berubah, misalnya saat fitur baru hadir atau setelah ditinjau penasihat
        hukum. Tanggal di bagian atas halaman menunjukkan perubahan terakhir. Perubahan penting kami
        umumkan di aplikasi dan di halaman ini sebelum berlaku.
      </p>
    ),
  },
  {
    id: 'kontak',
    title: 'Kontak',
    body: (
      <p>
        Pertanyaan dan permintaan tentang data pribadi: <Mail to="privacy" />. Pejabat pelindungan
        data pribadi: <Entity field="dpo" />. Surat: <Entity field="name" />,{' '}
        <Entity field="address" />. Alamat lain ada di halaman <a href="/kontak">Kontak</a>.
      </p>
    ),
  },
];

export default function KebijakanPrivasiPage() {
  return (
    <DocPage
      page={page}
      numbered
      lede={
        <p>
          Data apa yang diproses Patepang, untuk apa, di mana, berapa lama, siapa yang ikut
          memprosesnya, dan apa hakmu. Ditulis sesuai cara Patepang dibangun, termasuk hal yang
          diketahui server.
        </p>
      }
      sections={sections}
    />
  );
}
