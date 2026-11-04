# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Keputusan pengguna (brief landing): Next.js dan TypeScript dengan fondasi sederhana, dan static
export bila kebutuhan halaman memungkinkan. Tanpa backend, database, auth, server actions, layanan
formulir, atau fitur server lain. Versi dipilih saat implementasi (stabil, bukan prarilis) dan
dicatat di `docs/superpowers/specs/2026-10-22-landing-design.md`.

## Users

- Pengunjung `patepang.com` yang belum mengenal Patepang. Mereka ingin tetap dekat dengan orang
  yang benar-benar pernah mereka temui, misalnya teman, kenalan dari acara, atau keluarga.
  Biasanya mereka mendengar namanya, lalu mencari tahu apa Patepang itu dan bagaimana cara kerjanya.
- Segmen target awal (usia, kota, komunitas) **belum diputuskan**. Repo tidak memuat riset
  pengguna, jadi bagian ini tidak boleh diisi dengan asumsi.

## Product Purpose

Patepang adalah aplikasi HP untuk menjaga hubungan dengan orang yang pernah ditemui langsung:
"Hanya orang yang pernah kamu temui." Koneksi lahir dari pertemuan, dijaga lewat kabar dan rencana
bertemu lagi, dan memudar bila kedua orang tidak pernah bertemu lagi.

Landing berhasil bila pengunjung baru, dalam satu kunjungan singkat, paham apa Patepang, bagaimana
koneksinya terbentuk, apa yang terjadi setelah bertemu, apa yang sengaja tidak ada, berapa
harganya, dan kapan Patepang bisa dipakai. Halaman lain (kebijakan privasi, syarat dan ketentuan,
pedoman komunitas, keamanan, transparansi, hapus akun, langganan, kontak, tentang, lisensi)
menjawab pertanyaan sesudahnya, termasuk yang diminta hukum dan toko aplikasi.

## Positioning

- **Pertemuan langsung adalah satu-satunya pintu.** Koneksi hanya lahir dari *tempel* saat dua
  orang berhadapan: satu HP menampilkan kode, HP lain memindainya, lalu kedua HP digoyangkan
  bersama selama dua detik. Akun pun lahir saat tempel pertama, tanpa email atau nomor telepon.
- **Bertemu lagi yang menjaga hubungan.** Koneksi memudar setahun setelah pertemuan terakhir.
  Bertemu dan tempel lagi menyegarkannya.
- **Menolak mekanisme keterlibatan.** Tidak ada pencarian orang, pengikut, like publik, peringkat,
  atau feed tanpa akhir. Kabar harian berakhir dengan "Selesai untuk hari ini".
- **Bukan** aplikasi dating, pencari teman asing, jejaring publik, contact manager, CRM, atau
  pengganti pertemuan nyata.

## Operating Context

- Ritual tempel: "sebelum pamit, tempel dulu", yaitu saat berhadapan, sebelum berpisah.
- Setelah bertemu:
  - **Kabar**: hanya dari koneksi. Penerimanya semua koneksi, satu lingkaran, atau satu orang.
    Halamannya berakhir.
  - **Momen**: catatan pertemuan.
  - **Orang**: riwayat pertemuan, yaitu pertama bertemu, berapa kali, dan kapan terakhir.
  - **Rencana bertemu** dan daftar pribadi "Ingin ketemu lagi".
  - **Buku pertemuan**: "Siapa yang kamu temui hari ini?"
- **Titik lahir** adalah pertemuan terbuka tempat orang yang belum punya koneksi melakukan tempel
  pertamanya. Ini rancangan; belum ada jadwal sungguhan.
- Bahasa produk: Indonesia.

## Capabilities and Constraints

- **Status per 4 November 2026 (lembar fakta koordinator `fakta-produk.md` dan `fakta-data.md`,
  dari app `b4c6118`, backend `02a41af`, inti `8380813`).** Mode nyata berjalan di build web
  pengembangan terhadap server lokal: tempel, pesan terenkripsi, kabar, grup, momen, rencana,
  ruang, pemulihan, laporan, langganan dengan toko tiruan. Belum ada di App Store maupun Google
  Play, belum ada server produksi, iOS belum pernah dibangun, dan 0 dari 322 butir uji HP
  terverifikasi. Peluncuran pertama di Indonesia, bahasa Indonesia, untuk umur 18 tahun ke atas,
  di iPhone dan Android (app ADR 0060 B19, B29, B34). Audit keamanan eksternal dan pembukaan kode
  (AGPL-3.0-only) dilakukan sebelum dan saat peluncuran publik (B31, B33).
- **Landing (permintaan pemilik, 4 November 2026; menggantikan keputusan 30 Oktober).** "Landing
  masih dummy semuanya": landing dibuat nyata, dengan dokumen legal dan halaman lain. Status
  ketersediaan mengikuti fakta lewat satu sakelar, `src/content/availability.ts`: sekarang
  "Segera hadir" tanpa tombol unduh; saat pemilik membaliknya dengan tautan kedua toko, tombol
  unduh muncul di header, hero, dan section penutup. Harga ditampilkan (B21, B22). Dokumen legal
  adalah draf yang menunggu tinjauan penasihat hukum (B33, B34) dan menandai fakta yang belum ada
  dengan placeholder.
- **Status lama (fakta di `patepang/app` @ `262202f`, 22 Oktober 2026).** Yang ada di commit itu adalah prototipe
  aplikasi v0.1.0 dengan data fiktif lokal, mencakup 115 ID layar. Tidak ada backend, akun
  sungguhan, pesan, panggilan, pembayaran, atau kriptografi. Kamera/QR, goyang, NFC, dan biometrik
  disimulasikan. Menurut pemilik (30 Oktober 2026), sekitar 90% Patepang kini sudah selesai.
- **Landing (keputusan pemilik, 30 Oktober 2026; diganti 4 November).** Landing menampilkan
  Patepang sebagai produk yang sudah rilis ke publik ("Sudah hadir"), bukan "Segera hadir". Tautan toko aplikasi belum
  diberikan: tombol "Unduh Patepang" di header dan hero mengarah ke section penutup (`#unduh`),
  yang memuat tombol toko setelah tautannya dikirim pemilik. Teks status sudah diganti di seluruh
  halaman. Desain diperbaiki bertahap per section (header, lalu footer, hero, dan section lain),
  sebagai perbaikan, bukan redesign. Setelah putaran hero, pemilik menegaskan bahwa ini produk
  jadi: setiap section harus digarap tata letak, ukuran huruf, jarak, gerak, animasi, dan
  ilustrasinya, bukan sekadar kumpulan teks, dengan kata seminimal mungkin. Keputusan ini
  menggantikan keputusan 22 Oktober di bawah.
- **Landing (keputusan pemilik, 22 Oktober 2026; diganti 30 Oktober).** Landing tampil sebagai
  halaman produk pra-rilis, bukan tur prototipe: fitur dijelaskan sebagai produk Patepang, tanpa
  label "Pratinjau prototipe". Statusnya tetap disebut jujur sebagai "Segera hadir": belum ada
  tanggal rilis dan belum bisa diunduh. Halaman tidak pernah menyatakan aplikasi sudah tersedia.
  (Sebelumnya pemilik memilih status prototipe disebut eksplisit dan fitur ditulis sebagai
  rancangan.)
- Tautan unduhan (toko aplikasi) dan daftar tunggu belum ada. Tetap tanpa formulir dan tanpa
  pengumpulan data. Kontak berupa alamat surel di `src/content/contact.ts`: `halo@` dan
  `security@` diputuskan pemilik (B32); `privasi@` dan `hukum@` ditambahkan atas brief 4 November
  dan menunggu konfirmasi pemilik. Semua kotak suratnya dibuat pemilik.
- Karena belum ada pengguna, slot testimoni di landing diisi skenario pemakaian yang ditulis
  sebagai contoh untuk pembaca ("kamu"), bukan kutipan orang.
- Istilah: **Tempel** (aksinya ditulis huruf kecil di tengah kalimat dan kapital sebagai nama tab),
  **Kabar**, **Orang**, **Momen**, **lingkaran**, **titik lahir**. Menurut aplikasi, "tepang"
  berarti "bertemu" dalam bahasa Sunda; whitepaper pemilik menjelaskan nama Patepang dari sana.
- **Sudah diputuskan (app ADR 0060):** harga Rp49.000 per bulan atau Rp499.000 per tahun, masa
  coba 14 hari, semua fitur gratis (B21, B22); Indonesia dulu, 18+ (B34); kontak `halo@` dan
  `security@`, halaman `/kebijakan` dan `/ketentuan` (B32); lisensi AGPL-3.0-only (B33).
- **Entitas hukum (diberikan pemilik 4 November 2026):** PT Pakuan Teknologi Pangrango, perseroan
  perorangan yang disahkan Menteri Hukum pada 28 Oktober 2026, berkantor di Kabupaten Bogor, NIB
  2810260094182. Pendaftaran PSE menyusul sebelum peluncuran.
- **Belum diputuskan atau belum diberikan:** tautan toko dan tanggal rilis, kota awal, hasil
  tinjauan penasihat hukum, dan simbol logo final.
- **Boleh dijelaskan sebagai fakta rancangan, bukan jaminan:** isi dikunci di HP sebelum dikirim
  dan server tidak bisa membacanya; server tidak menyimpan alamat IP. Yang diketahui server
  (siapa tempel dengan siapa dan kapan, keanggotaan grup, penjaga) disebut terus terang.
- **Tidak boleh diklaim:** "sudah diaudit", "kode terbuka" (sekarang), "server tidak tahu siapa
  bertemu siapa", "tidak bisa diretas" atau "paling aman", teruji di HP, panggilan di HP, angka
  pengguna, testimoni, mitra, maupun rating.

## Brand Commitments

Komitmen berikut mengikat menurut brief pengguna:

- Ini bukan redesign identitas. Logo dipertahankan, yaitu wordmark huruf kecil `patepang` dan
  lockup dua titik di atas wordmark. Atas permintaan pemilik (30 Oktober 2026), header landing
  hanya memakai tanda dua titik sebagai ikon, dan footer menutup halaman dengan wordmark saja;
  lockup bertumpuk tetap logo resmi. Karakter dan bagian design system aplikasi yang sudah bagus
  juga dipertahankan. Setiap penyimpangan penting dicatat bersama bukti masalah dan manfaatnya.
- Plus Jakarta Sans adalah keluarga huruf utama. Phosphor dipakai konsisten, dengan bobot dan
  ukuran yang tertib.
- Arahnya warm-modern, presisi, polished, dan terasa manusiawi.
- Nada mengikuti repo: bahasa Indonesia, kalimat biasa, tenang, dan tidak memburu ("tidak ada yang
  perlu dikejar"). Tanpa urgensi palsu, tanpa minta maaf, dan hal yang disimulasikan diakui.
- Otoritas visualnya adalah design system `patepang/app` @ `262202f`: `DESIGN_SYSTEM.md`,
  `docs/adr/0002-arah-visual-dan-gerak.md`, dan `src/design-system/tokens/`.

## Evidence on Hand

- Lembar fakta koordinator per 4 November 2026: `fakta-produk.md` (fakta produk dan daftar teks
  dummy) dan `fakta-data.md` (praktik data untuk kebijakan privasi). Keduanya berada di luar repo;
  ringkasan dan pemakaiannya di `docs/landing-implementation.md` §9.
- Kode dan dokumen prototipe di `patepang/app` @ `262202f` (pemahaman lama, 22 Oktober). Rujukan
  path ada di `docs/product-understanding.md`.
- Copy produk asli: "Hanya orang yang pernah kamu temui.", "sebelum pamit, tempel dulu", "Selesai
  untuk hari ini", serta FAQ di layar Bantuan dan tentang.
- **Tidak ada:** pengguna sungguhan, testimoni, logo pelanggan, mitra, liputan pers, rating, angka,
  tangkapan layar resmi, simbol logo, ikon aplikasi, dan favicon. Data dummy prototipe (Kirana,
  "21 koneksi", kota, acara, harga contoh) tidak boleh tampil sebagai bukti.

## Product Principles

1. **Pertemuan dulu.** Aplikasi melayani hubungan yang lahir dari bertemu, bukan menggantikannya.
2. **Betah karena nyaman, bukan karena dipancing.** Tidak ada angka atau feed yang memancing orang
   kembali.
3. **Jujur tentang keadaan.** Rancangan dan prototipe selalu dibedakan dari layanan yang berjalan.
4. **Tunjukkan pilihan, jangan janjikan jaminan.** Siapa yang melihat apa boleh dijelaskan, dan
   cara Patepang dibangun boleh diceritakan, sedangkan jaminan keamanan dan privasi tidak
   diumumkan.

## Accessibility & Inclusion

- Design system aplikasi menetapkan kontras WCAG 2.2 AA untuk setiap pasangan warna yang dipakai,
  target sentuh minimal 48 px, cincin fokus keyboard yang terlihat, penghormatan pada gerak
  dikurangi, dan teks yang tetap utuh pada ukuran 200%. Landing memakai standar yang sama.
- Brief meminta pemeriksaan pada lebar 360, 390, 768, dan 1440 px serta zoom 200%. Audit otomatis
  tidak dianggap bukti kepatuhan aksesibilitas menyeluruh.
