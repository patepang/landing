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
koneksinya terbentuk, apa yang terjadi setelah bertemu, apa yang sengaja tidak ada, dan bahwa
Patepang sudah hadir dan bisa diunduh.

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

- **Status (fakta di `patepang/app` @ `262202f`).** Yang ada di commit itu adalah prototipe
  aplikasi v0.1.0 dengan data fiktif lokal, mencakup 115 ID layar. Tidak ada backend, akun
  sungguhan, pesan, panggilan, pembayaran, atau kriptografi. Kamera/QR, goyang, NFC, dan biometrik
  disimulasikan. Menurut pemilik (30 Oktober 2026), sekitar 90% Patepang kini sudah selesai.
- **Landing (keputusan pemilik, 30 Oktober 2026).** Landing menampilkan Patepang sebagai produk
  yang sudah rilis ke publik ("Sudah hadir"), bukan "Segera hadir". Tautan toko aplikasi belum
  diberikan: tombol "Unduh Patepang" di header dan hero mengarah ke section penutup (`#unduh`),
  yang memuat tombol toko setelah tautannya dikirim pemilik. Teks status sudah diganti di seluruh
  halaman. Desain diperbaiki bertahap per section (header, lalu footer, hero, dan section lain),
  sebagai perbaikan, bukan redesign. Keputusan ini menggantikan keputusan 22 Oktober di bawah.
- **Landing (keputusan pemilik, 22 Oktober 2026; diganti 30 Oktober).** Landing tampil sebagai
  halaman produk pra-rilis, bukan tur prototipe: fitur dijelaskan sebagai produk Patepang, tanpa
  label "Pratinjau prototipe". Statusnya tetap disebut jujur sebagai "Segera hadir": belum ada
  tanggal rilis dan belum bisa diunduh. Halaman tidak pernah menyatakan aplikasi sudah tersedia.
  (Sebelumnya pemilik memilih status prototipe disebut eksplisit dan fitur ditulis sebagai
  rancangan.)
- Tautan unduhan (toko aplikasi), daftar tunggu, dan kanal kontak belum ada di landing. Pengguna
  memilih tanpa formulir dan tanpa pengumpulan data; CTA landing mengarah ke section di halaman
  itu sendiri sampai tautan toko diberikan.
- Karena belum ada pengguna, slot testimoni di landing diisi skenario pemakaian yang ditulis
  sebagai contoh untuk pembaca ("kamu"), bukan kutipan orang.
- Istilah: **Tempel** (aksinya ditulis huruf kecil di tengah kalimat dan kapital sebagai nama tab),
  **Kabar**, **Orang**, **Momen**, **lingkaran**, **titik lahir**. Menurut repo, "tepang" berarti
  "bertemu" dalam bahasa Sunda. Asal-usul nama "Patepang" belum dikonfirmasi.
- **Belum diputuskan atau belum diberikan:** tautan toko dan platform rilis, negara atau kota
  awal, harga, kanal kontak, kebijakan privasi, entitas hukum, dan simbol logo final.
- **Tidak boleh diklaim:** keamanan, privasi, enkripsi, penyimpanan di perangkat, pemulihan akun,
  angka pengguna, testimoni, mitra, maupun rating.

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

- Kode dan dokumen prototipe di `patepang/app` @ `262202f`. Rujukan path ada di
  `docs/product-understanding.md`.
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
4. **Tunjukkan pilihan, jangan janjikan jaminan.** Siapa yang melihat apa boleh dijelaskan,
   sedangkan jaminan keamanan dan privasi tidak diumumkan.

## Accessibility & Inclusion

- Design system aplikasi menetapkan kontras WCAG 2.2 AA untuk setiap pasangan warna yang dipakai,
  target sentuh minimal 48 px, cincin fokus keyboard yang terlihat, penghormatan pada gerak
  dikurangi, dan teks yang tetap utuh pada ukuran 200%. Landing memakai standar yang sama.
- Brief meminta pemeriksaan pada lebar 360, 390, 768, dan 1440 px serta zoom 200%. Audit otomatis
  tidak dianggap bukti kepatuhan aksesibilitas menyeluruh.
