import { DocPage, type DocSection } from '@/components/doc/DocPage';
import { Entity, Mail, Placeholder, Registration } from '@/components/doc/parts';
import { pageMetadata } from '@/content/metadata';
import { pageAt } from '@/content/pages';
import { released } from '@/content/status';

/*
 * The privacy policy (UU PDP No. 27 Tahun 2022). Every statement of fact comes from the data fact
 * sheet of 4 November 2026 (fakta-data.md: backend spec and ADRs, app and core code), as corrected
 * after the review of the same day; its section is named beside each part below. What that sheet
 * marks UNCONFIRMED, or leaves to the owner or to counsel, stands here as a marked placeholder.
 * Legal bases are the drafter's proposal for counsel's review.
 */

const page = pageAt('/kebijakan-privasi');

export const metadata = pageMetadata(page);

const sections: DocSection[] = [
  {
    // fakta-data §0, §4.2 to §4.5
    id: 'ringkasnya',
    title: 'Ringkasnya',
    body: (
      <ul>
        <li>
          Akunmu adalah sepasang kunci yang dibuat di HP-mu. Server tidak pernah menerima nama,
          email, nomor telepon, kata sandi, tanggal lahir, atau foto dalam bentuk yang bisa
          dibacanya. Nama panggilan yang kamu isi di aplikasi tinggal di HP-mu dan hanya dikirim
          terenkripsi.
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
          Server tidak menyimpan log masuk, riwayat pemakaian aplikasi, atau riwayat alamat IP.
          Selain tanggal terakhir kamu aktif dan tanggal terakhir setiap perangkatmu masuk, server
          menyimpan riwayat tempelmu (dengan siapa dan kapan, sampai ke menit) dan waktu setiap
          perubahan kuncimu, yang bersifat publik.
        </li>
        <li>
          Cloudflare, jaringan di depan server, melihat setiap permintaan kecuali isi yang
          terenkripsi, termasuk alamat IP, id akun, dan penerima pesan (bagian 8).
        </li>
        <li>Aplikasi tidak memuat iklan atau alat analitik, dan situs ini tidak memakai cookie.</li>
        <li>Data di server diproses di luar Indonesia, terutama di Singapura.</li>
        <li>Kamu bisa mengekspor data di HP-mu dan menghapus akunmu dari aplikasi.</li>
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
          terdaftar dengan <Registration />. Dalam kebijakan ini, &ldquo;kami&rdquo; berarti badan
          itu. Kami adalah pengendali data pribadi untuk data yang diproses server Patepang.
        </p>
        <p>
          Kebijakan ini berlaku untuk aplikasi Patepang dan situs patepang.com.
          {released
            ? null
            : ' Patepang belum diluncurkan: kebijakan ini menjelaskan cara layanan memproses data saat sudah berjalan.'}
          {page.draft ? ' Kebijakan ini baru berlaku setelah ditinjau penasihat hukum.' : null}
        </p>
        <p>
          Pertanyaan dan permintaan tentang data pribadi: <Mail to="privacy" />. Pejabat pelindungan
          data pribadi: <Entity field="dpo" />.
        </p>
      </>
    ),
  },
  {
    // fakta-data §3, §4.6, §5, §6.5, §8.5, §10
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
            kabar, momen, lingkaran, rencana, catatan, dan pengaturan. Semua ini keluar dari HP
            dalam bentuk terenkripsi: ke orang yang kamu pilih, di cadangan akun bila kamu
            mengaktifkannya (bagian 4.7), atau di berkas ekspor yang kamu buat sendiri.
            Pengecualiannya adalah yang kamu keluarkan sendiri dalam bentuk terbuka: berkas dari{' '}
            <strong>Simpan bukti</strong> (teks satu percakapan beserta nama orangnya, untuk polisi
            atau pengacara), berkas kalender .ics dari rencana, dan nama tempat yang kamu buka di
            aplikasi peta (bagian 8).
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
          sendiri. Aplikasi meminta izin kamera untuk memindai kode dan mengambil foto atau video,
          dan izin mikrofon untuk pesan suara; yang direkam hanya keluar dari HP bila kamu
          mengirimnya, terenkripsi. Sensor gerak hanya dibaca selama goyangan tempel, sekitar dua
          detik (bagian 4.2), dan izin notifikasi ditanyakan lebih dulu (bagian 4.8).
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
          Server tidak pernah menerima lokasi HP-mu. Tetapi untuk tempel di titik lahir, server tahu
          kotanya: daftar titik lahir yang publik menyebut kota setiap ruang, dan tempel di sana
          mencatat ruangnya.
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
          Untuk menunjukkan bahwa dua orang bertemu langsung: tempel adalah satu-satunya cara
          terhubung dan cara akun lahir. Tempel membuktikan bahwa dua HP digoyang bersama, atau
          bahwa dua orang sengaja bekerja sama dari jauh untuk menirunya (lihat batasnya di halaman{' '}
          <a href="/keamanan">Keamanan</a>). Dasar: pemenuhan perjanjian.
        </p>

        <h3>4.3 Pengiriman pesan</h3>
        <p>
          Setiap pesan disimpan sebagai amplop terenkripsi untuk perangkat penerima, bersama akun
          dan perangkat penerima, kelompok ukurannya, dan waktu dibuat. Permintaan kirim tidak
          memakai akun pengirim, jadi server Patepang tidak mencatat siapa pengirimnya, dengan dua
          pengecualian. Pesan pertama setelah tempel (paling banyak 20 dalam 24 jam) dikirim dengan
          token yang terikat pada tempel itu, sehingga server tahu pesan itu datang dari orang yang
          kamu tempel. Dan bila kamu memutus koneksi pada hari kalian bertemu, server bisa
          menyimpulkannya dari token tempel yang dicabut HP-mu.
        </p>
        <p>
          Amplop dihapus begitu perangkat penerima mengambilnya. Amplop yang belum diambil tetap
          tersimpan sampai perangkat itu dicabut atau akunnya dihapus; pengirimnya tidak bisa
          menariknya kembali, juga tidak dengan &ldquo;Hapus untuk semua&rdquo;.
        </p>
        <p>
          Token pengiriman dibuat di HP penerima, satu untuk setiap koneksi dan arah. Server hanya
          menyimpan hash-nya, terhubung ke penerima, dan menghapus token yang dicabut 30 hari
          setelah dicabut. Waktu dan ukuran lalu lintas tetap terlihat oleh server. Cloudflare juga
          melihat penerima dan token setiap pengiriman, beserta alamat IP pengirimnya (bagian 8).
        </p>
        <p>Untuk mengantar pesan. Dasar: pemenuhan perjanjian.</p>

        <h3>4.4 Grup</h3>
        <p>
          Id grup dan id akun anggotanya, peran (admin atau anggota), siapa menambahkan siapa, dan
          tanggal bergabung. Keanggotaan ini disimpan tanpa enkripsi di server. Nama, foto, dan
          pesan grup terenkripsi ujung ke ujung: server hanya memegangnya dalam bentuk terenkripsi,
          pesan sampai diambil setiap perangkat anggota, dan foto sebagai media (bagian 4.5). Data
          keanggotaan dihapus saat kamu keluar dari grup. Untuk menjalankan grup. Dasar: pemenuhan
          perjanjian.
        </p>

        <h3>4.5 Foto, video, suara, dan berkas</h3>
        <p>
          Media disimpan terenkripsi, masing-masing dengan kuncinya sendiri yang hanya dikirim di
          dalam pesan terenkripsi. Server mencatat id objek, kunci unduhan acak, akun pemiliknya
          (untuk kuota), ukuran yang sudah dibulatkan ke atas di dalam enkripsi, kelasnya (pesan,
          kabar, momen, stiker, cadangan, atau ruang), dan tanggalnya. Unduhan tidak memakai akun,
          jadi server Patepang tidak bisa menghubungkan pengunggah dan pengunduh. Cloudflare, yang
          meneruskan unggahan dan unduhan itu, bisa menghubungkan keduanya lewat alamat IP dan kunci
          unduhan (bagian 8).
        </p>
        <p>
          Foto yang dikirim sebagai foto dikodekan ulang tanpa data EXIF dan lokasi. Berkas yang
          dikirim sebagai dokumen dikirim apa adanya, termasuk metadatanya, dan aplikasi
          memperingatkan hal itu. Kabar dengan foto, momen bersama, stiker, foto profil, dan album
          ruang acara sedang dibangun dan menyusul; saat tersedia, medianya mengikuti aturan yang
          sama. Untuk menyimpan dan mengantar media. Dasar: pemenuhan perjanjian.
        </p>

        <h3>4.6 Ruang acara, titik lahir, dan daftar tunggu kota</h3>
        <p>
          Untuk ruang acara dan titik lahir: tuan rumah, jenis ruang, jam buka dan tutup, kota untuk
          titik lahir, peserta dan waktu mereka masuk, kartu peserta terenkripsi, permintaan koneksi
          antarpeserta, dan papan terenkripsi tanpa nama penulis. Daftar titik lahir bersifat
          publik: kota dan jamnya, tanpa tuan rumah. Semuanya dihapus beberapa menit setelah ruang
          ditutup, paling lama 7 hari setelah dibuka. Akun yang belum lahir boleh menulis satu kota
          untuk daftar tunggu titik lahir; kota itu dihapus saat akun lahir atau setelah 90 hari.
          Dasar: pemenuhan perjanjian.
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
          cadangan dengan kunci baru setiap kali, lalu memecah kuncinya menjadi pecahan yang
          masing-masing disegel untuk HP satu penjaga. Dua pecahan cukup untuk membuka cadangan.
          Server menyimpan cadangan dan pecahan kunci itu tetapi tidak bisa membuka keduanya. Foto
          dan grup belum ikut dicadangkan. Dasar: pemenuhan perjanjian.
        </p>
        <p>
          <strong>Dua penjagamu yang bersekongkol bisa membuka cadangan tanpa pemulihan.</strong>{' '}
          Aplikasi penjaga hanya memakai pecahannya saat tempel pemulihan, tetapi itu aturan
          aplikasi, bukan batas kriptografi: dengan aplikasi yang diubah, dua penjaga bisa membuka
          cadangan diam-diam, tanpa masa tunggu 48 jam dan tanpa pemberitahuan kepadamu. Cadangan
          berisi orang yang kamu temui dan nama mereka, percakapan, kabar, momen, catatan, dan token
          pengiriman koneksimu. Karena itu, pilih penjaga yang benar-benar kamu percaya.
        </p>

        <h3>4.8 Notifikasi</h3>
        <p>
          Bila kamu mengizinkan notifikasi, server menyimpan token notifikasi HP-mu dari Apple atau
          Google. Token itu disimpan terenkripsi, tetapi server membukanya untuk mengirim
          notifikasi, jadi server bisa membacanya. Setiap notifikasi berukuran sama, 176 byte,
          tersegel untuk HP-mu: jenis dan waktunya saja, tanpa pengirim dan tanpa isi. Apple dan
          Google hanya tahu ada notifikasi ke perangkat itu pada waktu tertentu. Di Android,
          notifikasi diterima lewat SDK Firebase Cloud Messaging dari Google di dalam aplikasi.{' '}
          <Placeholder>
            Apakah SDK itu mengirim data pengiriman notifikasi ke Google: belum dikonfirmasi
          </Placeholder>{' '}
          Pengingat pertemuan dari server mati sampai kamu menyalakannya.
        </p>
        <p>
          Token dihapus bersama perangkat atau akunnya, atau saat Apple atau Google menyatakannya
          tidak berlaku lagi.{' '}
          <strong>Mematikan notifikasi di pengaturan HP tidak menghapus token dari server:</strong>{' '}
          server tetap menyimpannya dan tetap mengirim notifikasi lewat Apple atau Google, yang
          tetap melihat waktunya; HP-mu hanya tidak menampilkannya.{' '}
          <Placeholder>
            Cara menghapus token dari server saat izin notifikasi dicabut: menunggu keputusan
          </Placeholder>{' '}
          Dasar: pemenuhan perjanjian, dan persetujuanmu atas izin notifikasi.
        </p>

        <h3>4.9 Langganan dan tip</h3>
        <p>
          Untuk langganan: toko tempat kamu membeli, pengenal acak yang menghubungkan pembelian
          dengan akunmu, status langganan, apakah masa coba sudah dipakai, dan batas aksesnya. Hash
          id langganan dari toko hanya disimpan selama langganan aktif, termasuk masa coba dan masa
          tenggang. Kami tidak menyimpan harga, cara bayar, identitas akun tokomu, atau kuitansi.
          Pembelian diperiksa lewat layanan Apple atau Google. Pengenal acak itu juga tersimpan di
          Apple atau Google bersama pembelianmu, sehingga mereka bisa menghubungkannya dengan akun
          tokomu.
        </p>
        <p>
          Tip hanya dihitung dalam jumlah harian; hash id transaksinya disimpan 30 hari untuk
          mencegah hitungan ganda, tanpa akun, jumlah, atau produk. Dasar: pemenuhan perjanjian.
        </p>

        <h3>4.10 Laporan dan moderasi</h3>
        <p>
          Saat kamu melaporkan sesuatu, kamu memilih bahasa isinya, supaya laporan sampai ke
          moderator yang membacanya. HP-mu lalu menyegel isi yang dilaporkan untuk para moderator;
          server tidak bisa membacanya. Memilih kategori dan menulis catatan untuk moderator
          menyusul; keduanya juga akan disegel. Server menyimpan akun yang dilaporkan, jenis isi,
          bahasa, pernyataan bertanda tangan dari penulis isi itu, bukti tersegel, jam laporan
          dibuat, serta status, keputusan, alasan, dan banding kasusnya.{' '}
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
          akun lahir. Untuk batas 3 akun per HP per bulan, server membaca dan menulis penanda milik
          Apple atau Google untuk HP itu: dua bit DeviceCheck di Apple, atau bit device recall di
          Google. Penanda itu disimpan Apple atau Google, tetap ada walaupun aplikasi dihapus (di
          Android juga setelah HP direset), dan tidak ikut terhapus bersama akunmu. Server sendiri
          menyimpan kunci acak per pemasangan, bulannya, dan jumlahnya; hitungan bulan lalu dihapus
          setiap hari. Penghitung laju sementara memakai perangkat, akun, atau alamat IP (alamat IP
          hanya di rute tanpa masuk), di memori, tanpa ditulis ke disk. Dasar: kepentingan yang sah.
        </p>

        <h3>4.12 Alamat IP, negara, dan log</h3>
        <p>
          Server Patepang tidak menyimpan atau mencatat alamat IP; Cloudflare melihatnya di setiap
          permintaan (bagian 8). Negara dari Cloudflare hanya dipakai untuk hitungan harian
          pembuatan akun dan mulai langganan; negara yang dipakai kurang dari 5 akun hari itu
          dihitung sebagai &ldquo;lainnya&rdquo;. Log server tanpa alamat IP dan tanpa id akun,
          disimpan 7 hari. Log audit mencatat tindakan operator dan moderator, tanpa id akun, dan
          disimpan tanpa batas waktu.{' '}
          <Placeholder>Aturan lama penyimpanan log audit: menunggu keputusan</Placeholder>
        </p>

        <h3>4.13 Hitungan dan laporan transparansi</h3>
        <p>
          Server menyimpan hitungan harian tanpa akun, misalnya jumlah akun, tempel, laporan, dan
          keputusan. Kota atau negara yang dipakai kurang dari 5 akun digabung sebagai
          &ldquo;lainnya&rdquo;. Hitungan ini dipakai untuk menjalankan layanan, dan sebagiannya
          untuk laporan transparansi; semuanya disimpan tanpa batas waktu. Dasar: kepentingan yang
          sah.
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
    // fakta-data §4.7, §4.12, §4.23; app ADR 0064 (B13, B9)
    id: 'isi-terenkripsi',
    title: 'Isi yang tidak bisa kami baca',
    body: (
      <>
        <p>
          Pesan, grup, kabar, momen, rencana, foto, suara, dan berkas dienkripsi di HP sebelum
          dikirim, dan hanya terbuka di HP penerima. Server tidak memegang kuncinya. Isi itu bisa
          dibaca pihak lain karena tindakanmu atau tindakan penerimanya: saat kamu atau penerimanya
          melaporkannya (moderator membaca salinan yang dilaporkan), atau saat kamu atau penerimanya
          menyimpannya sebagai berkas bukti, berkas ekspor, atau berkas lain di luar aplikasi.
        </p>
        <p>
          Server tidak bisa membuka cadangan akun. Cadangan dibuka HP barumu setelah pemulihan yang
          disetujui dua penjaga, atau oleh dua penjagamu bila mereka bersekongkol (bagian 4.7).
        </p>
        <p>
          &ldquo;Hapus untuk semua&rdquo; dan pesan yang menghilang adalah janji aplikasi, bukan
          jaminan teknis: salinan di HP penerima ada di HP mereka. Isi yang sudah tampil juga masih
          bisa dilaporkan penerimanya sampai 30 hari sejak isi itu tiba di HP-nya, walaupun
          pengirimnya sudah menghapusnya.
        </p>
        <p>
          Menghapus isi juga tidak menghapus setiap salinannya seketika: amplop yang belum diambil
          penerima tetap di server sampai diambil, cadangan akunmu yang terakhir masih memuat isi
          itu sampai cadangan berikutnya, dan cadangan basis data menyimpan data yang dihapus sampai
          40 hari (bagian 7).
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
    // fakta-produk Lampiran A (retensi); fakta-data §4, §8.1 to §8.3, §4.23
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
            <td>
              Dihapus setelah 30 hari tanpa tempel, kecuali entrinya di log transparansi kunci (bagi
              akun yang diatestasi), yang permanen.
            </td>
          </tr>
          <tr>
            <th scope="row">Akun yang tidak aktif</th>
            <td>
              Pengingat lewat notifikasi di bulan ke-11, bila kamu mengizinkan notifikasi; akun
              dihapus setelah 12 bulan tidak aktif.
            </td>
          </tr>
          <tr>
            <th scope="row">Akun yang kamu hapus</th>
            <td>Tenggang 7 hari yang bisa dibatalkan, lalu dihapus.</td>
          </tr>
          <tr>
            <th scope="row">Perangkat, kunci publiknya, dan token notifikasi</th>
            <td>
              Sampai perangkat dicabut atau akun dihapus. Token notifikasi juga dihapus saat Apple
              atau Google menyatakannya tidak berlaku.
            </td>
          </tr>
          <tr>
            <th scope="row">Token masuk</th>
            <td>24 jam.</td>
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
            <th scope="row">Token tempel untuk pesan pertama</th>
            <td>Berlaku 24 jam, lalu dihapus 7 hari kemudian.</td>
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
            <th scope="row">Keanggotaan grup dan penjaga</th>
            <td>Sampai kamu keluar dari grup atau penjaganya diganti, atau akun dihapus.</td>
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
            <th scope="row">Kasus moderasi</th>
            <td>
              Catatan kasus (akun yang dilaporkan, keputusan, alasan tertulis, status banding, dan
              tanda blokir) selama akun yang dilaporkan ada. Pernyataan penulis dan bukti tersegel
              dihapus saat kasusnya ditutup, kecuali selama blokir masih berlaku.
            </td>
          </tr>
          <tr>
            <th scope="row">Penghitung batas akun per HP</th>
            <td>
              Selama bulan kalender berjalan; hitungan bulan lalu dihapus setiap hari. Penanda di
              Apple atau Google disimpan mereka sendiri (bagian 4.11).
            </td>
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
    // fakta-data §2, §6
    id: 'penerima-dan-pemroses',
    title: 'Penerima dan pemroses data',
    body: (
      <>
        <p>
          Kami tidak menjual data dan tidak membagikannya untuk iklan atau pemasaran. Penyedia di
          bawah memproses data untuk kami sebagai bagian dari layanan. Setiap penyedia terikat
          perjanjian untuk memproses data hanya atas perintah kami dan memberi perlindungan yang
          sama atau setara dengan kebijakan ini. Untuk akun toko dan pembelianmu, Apple dan Google
          juga bertindak atas nama mereka sendiri, menurut kebijakan privasi mereka.{' '}
          <Placeholder>
            Perjanjian pemrosesan data dengan setiap penyedia: menunggu pemilik dan penasihat hukum
          </Placeholder>
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
              bila fitur panggilan tersedia.{' '}
              <strong>
                Cloudflare membuka enkripsi koneksi (TLS) di jaringannya, jadi melihat setiap
                permintaan ke server kecuali isi yang terenkripsi ujung ke ujung.
              </strong>{' '}
              Yang terlihat: alamat IP, waktu, dan ukuran; token masuk, id akun, dan nomor
              perangkat; penerima dan token setiap pesan yang dikirim; dan kunci setiap media yang
              diunggah atau diunduh. Karena itu, lewat alamat IP, Cloudflare bisa menghubungkan
              sebuah HP dengan akunnya, pengirim pesan dengan penerimanya, dan pengunggah media
              dengan pengunduhnya. Isi pesan dan media tetap terenkripsi. Lokasi: pusat data
              terdekat di seluruh dunia; media dengan petunjuk lokasi Asia-Pasifik (petunjuk, bukan
              jaminan); cadangan di wilayah hukum Uni Eropa. Lama penyimpanan lognya:{' '}
              <Placeholder>
                Retensi log dan Security Events Cloudflare: belum dikonfirmasi
              </Placeholder>
            </dd>
          </div>
          <div>
            <dt>Apple</dt>
            <dd>
              App Store (unduhan, langganan, tip), layanan notifikasi, dan pemeriksaan keaslian
              aplikasi saat akun dibuat, termasuk dua bit DeviceCheck yang menghitung akun yang
              dibuat sebuah iPhone dalam sebulan (bagian 4.11). Melihat akun App Store dan
              pembeliannya (data Apple sendiri), pengenal acak langganan, token notifikasi, dan
              waktu notifikasi. Lokasi: Amerika Serikat dan global.
            </dd>
          </div>
          <div>
            <dt>Google</dt>
            <dd>
              Google Play (unduhan dan pembayaran), Firebase Cloud Messaging (notifikasi, lewat
              SDK-nya di aplikasi Android), Play Integrity dan device recall (pemeriksaan keaslian
              aplikasi dan hitungan akun per HP saat akun dibuat), dan Google Cloud Pub/Sub
              (pemberitahuan tagihan Google Play ke server, dengan token pembeliannya). Melihat hal
              yang sama seperti Apple. Lokasi: Amerika Serikat dan global.
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
          Bila kamu membuka tempat sebuah rencana di peta, nama tempat yang kamu ketik dikirim ke
          Apple Maps di iPhone, atau ke aplikasi peta di HP Android-mu (misalnya Google Maps), yang
          memprosesnya menurut kebijakan mereka sendiri. Itu hanya terjadi saat kamu menekannya.
        </p>
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
          Eropa (cadangan basis data terenkripsi), di Amerika Serikat atau secara global (Apple,
          Google, dan Expo), dan di lokasi Vercel serta penyedia surel dan halaman status (bagian
          8). Saat ini hanya ada satu wilayah server, Singapura, dan akun belum bisa dipindahkan ke
          wilayah lain.
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
            kamu ekspor sebagai berkas terenkripsi yang dibuka dengan enam kata. Berkas ekspor hanya
            berisi data di HP-mu, tidak data di server. Untuk data di server, aplikasi menampilkan
            langganan, kuota, penjaga, pemulihan, keputusan moderasi, jumlah tempel, dan rantai
            perangkatmu. Belum ada cara mengunduh semua data server sekaligus.{' '}
            <Placeholder>
              Cara meminta salinan data di server: menunggu keputusan dan pembangunan
            </Placeholder>
          </li>
          <li>
            <strong>Memperbaiki</strong>: nama panggilan dan profil kamu ubah sendiri di aplikasi.
          </li>
          <li>
            <strong>Menghapus dan mengakhiri pemrosesan</strong>: hapus isi milikmu di aplikasi,
            atau hapus akunmu. Caranya ada di halaman <a href="/hapus-akun">Hapus akun</a>.
          </li>
          <li>
            <strong>Menarik persetujuan</strong>: pilihan privasi di aplikasi bisa diubah kapan
            saja. Pilihan seperti tanda dibaca dan nama di notifikasi dimulai dari yang paling
            privat sampai kamu memilih. Mematikan notifikasi di pengaturan HP menghentikan
            tampilannya di HP-mu, tetapi belum menghapus token notifikasi dari server (bagian 4.8).
          </li>
          <li>
            <strong>Memindahkan data</strong>: berkas ekspor adalah arsip JSON terenkripsi yang
            dibuka dengan enam kata.{' '}
            <Placeholder>
              Alat pembuka dan format berkas ekspor untuk umum: menyusul bersama kode Patepang
            </Placeholder>
          </li>
          <li>
            <strong>Mengajukan keberatan atas keputusan otomatis</strong> (bagian 11), lewat{' '}
            <Mail to="privacy" />.
          </li>
          <li>
            <strong>Membatasi pemrosesan, mengajukan keberatan, dan menggugat</strong> sesuai UU
            PDP, lewat <Mail to="privacy" />.
          </li>
        </ul>
        <p>
          Karena kami tidak menyimpan nama, email, atau nomor teleponmu, kami tidak bisa mengenali
          akunmu dari sebuah surel, dan aplikasi belum menampilkan id akunmu.{' '}
          <Placeholder>
            Cara membuktikan pemilik akun untuk permintaan lewat surel: menunggu keputusan
          </Placeholder>{' '}
          <Placeholder>
            Proses dan batas waktu menjawab permintaan sesuai UU PDP: menunggu keputusan dan
            tinjauan penasihat hukum
          </Placeholder>{' '}
          Kamu juga bisa mengadu ke lembaga pelindungan data pribadi yang ditetapkan pemerintah.
        </p>
      </>
    ),
  },
  {
    // fakta-data §4.5, §4.15, §4.18, §4.20, §8.2, §8.3; app ADR 0060 B26
    id: 'keputusan-otomatis',
    title: 'Keputusan otomatis',
    body: (
      <>
        <p>
          Patepang tidak membuat profil tentangmu, dan isi tidak dipindai otomatis, karena server
          memang tidak bisa membacanya. Keputusan moderasi selalu diambil manusia. Tetapi beberapa
          aturan berjalan otomatis dan bisa berdampak besar bagimu:
        </p>
        <ul>
          <li>
            Akun yang belum lahir dihapus 30 hari setelah dibuat bila belum ada tempel. Akun yang
            tidak aktif selama 12 bulan dihapus, dengan pengingat lewat notifikasi di bulan ke-11
            bila kamu mengizinkan notifikasi.
          </li>
          <li>
            Bila media di server melewati kuotamu selama 12 bulan, media kabar, momen, dan stiker
            yang paling lama dihapus sampai muat, dengan peringatan 3 bulan, 1 bulan, dan 1 minggu
            sebelumnya.
          </li>
          <li>
            Saat akun dibuat, bila pemeriksaan keaslian aplikasi dari Apple atau Google menolak
            HP-mu, akunmu tidak bisa lahir sendiri dan harus menunggu tempel dengan sponsor. Satu HP
            hanya bisa membuat 3 akun dalam satu bulan kalender.
          </li>
          <li>
            Akun yang tiga akun sponsornya diblokir dalam setahun tidak bisa menjadi sponsor lagi.
          </li>
          <li>
            Tempel hanya berhasil bila enklaf menilai dua goyangan cocok, dan tempel adalah
            satu-satunya cara terhubung dan lahir. Goyangan yang terlalu lemah bisa ditolak; bila
            goyang berdua tidak berhasil, orang lain boleh membantu menggoyang kedua HP.
          </li>
        </ul>
        <p>
          Kamu bisa mengajukan keberatan atas keputusan otomatis lewat <Mail to="privacy" />, dan
          atas keputusan moderasi lewat banding di aplikasi.{' '}
          <Placeholder>
            Cara meninjau keberatan atas keputusan otomatis, sesuai Pasal 10 UU PDP: menunggu
            tinjauan penasihat hukum
          </Placeholder>
        </p>
      </>
    ),
  },
  {
    // fakta-data §9
    id: 'anak-anak',
    title: 'Anak-anak',
    body: (
      <p>
        Patepang hanya untuk orang berumur 18 tahun ke atas. Server tidak menerima tanggal lahir
        atau umur siapa pun; ulang tahun di aplikasi bersifat pilihan, tanggal dan bulan saja.{' '}
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
          Audit keamanan oleh pihak luar adalah syarat sebelum peluncuran publik
          {released ? '.' : ' dan belum dilakukan.'} Tidak ada sistem yang bebas risiko; bila kamu
          menemukan kerentanan, laporkan ke <Mail to="security" />.
        </p>
      </>
    ),
  },
  {
    // fakta-data §11 (breach notification); backend push kinds (no notice channel in the app)
    id: 'kebocoran-data',
    title: 'Bila terjadi kebocoran data',
    body: (
      <p>
        Bila kami mengetahui kebocoran data pribadi, kami memberi tahu secara tertulis lembaga
        pelindungan data pribadi dan orang yang terdampak paling lambat 3 × 24 jam, sesuai Pasal 46
        UU PDP. Karena server tidak punya kontak siapa pun, pemberitahuan untukmu disampaikan di
        halaman status (status.patepang.com) dan di situs ini.{' '}
        <Placeholder>
          Saluran pemberitahuan di dalam aplikasi, dan apakah saluran ini memenuhi Pasal 46 UU PDP:
          menunggu keputusan dan tinjauan penasihat hukum
        </Placeholder>{' '}
        Isinya: apa yang terjadi dan kapan, data apa yang terdampak, apa yang sudah kami lakukan,
        dan apa yang bisa kamu lakukan. Yang belum diketahui kami sebut terus terang, lalu kami
        susul. Setiap insiden dihitung di laporan transparansi.
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
        umumkan di halaman ini dan di halaman status sebelum berlaku.{' '}
        <Placeholder>
          Pemberitahuan perubahan di dalam aplikasi: menunggu keputusan dan pembangunan
        </Placeholder>
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
