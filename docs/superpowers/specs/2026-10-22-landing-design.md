# Desain landing patepang.com

- **Status:** diimplementasikan dengan struktur A pada 22 Oktober 2026 (commit `35b4e47`). Pada 23
  Oktober 2026 pemilik meminta landing tampil sebagai halaman produk pra-rilis: header, hero,
  masalah, solusi, fitur, skenario pemakaian (pengganti testimoni), tanya jawab, CTA "Segera hadir",
  dan footer, tanpa label prototipe. Keputusan, penyimpangan, versi yang benar-benar dipasang, dan
  hasil verifikasi ada di `docs/landing-implementation.md`. Dokumen ini tetap menjadi rencana yang
  mendasarinya, kecuali pembingkaian prototipe yang sudah diganti.
- **Tanggal:** 22 Oktober 2026.
- **Sumber kebenaran:** `PRODUCT.md` (product truth), `DESIGN.md` dan `.impeccable/design.json`
  (dunia visual Patepang yang sudah ada), `docs/product-understanding.md` (riset `patepang/app` @
  `262202f`), dan `docs/tooling-status.md`.
- **Keputusan pemilik yang sudah diterima:** CTA hanya navigasi di halaman; status prototipe disebut
  secara eksplisit; alat dipakai lewat repo.
- **Keputusan pemilik di brief implementasi (22 Oktober 2026), menjawab §16:** struktur A; favicon
  kosong `data:,`; "Dua Titik Bertemu" hanya arahan kerja internal; tanya jawab asal nama tidak
  dimuat; `metadataBase` `https://patepang.com` tanpa berarti deployment. Tidak ada commit, push,
  PR, atau deployment tanpa izin terpisah; catatan push lama di atas tidak berlaku lagi.

## 1. Maksud

Orang yang mendengar nama Patepang perlu cepat memahami satu hal yang tidak dimiliki aplikasi
lain: koneksi di Patepang **hanya lahir saat dua orang bertemu langsung, dan dijaga dengan bertemu
lagi**. Landing menjelaskan itu dengan jujur. Produknya masih prototipe, jadi halaman ini menjelaskan
rancangan, bukan menjual layanan yang belum ada.

## 2. Tujuan, non-goal, dan anti-goal

**Tujuan pengunjung.** Dalam satu kunjungan singkat, pengunjung bisa menjawab lima hal:

1. Apa Patepang? Aplikasi hanya untuk orang yang pernah kamu temui.
2. Bagaimana koneksinya lahir? Lewat tempel, saat berhadapan, sebelum berpisah.
3. Apa yang terjadi setelah bertemu? Kabar yang punya akhir, momen, riwayat pertemuan, dan rencana
   bertemu lagi.
4. Apa yang sengaja tidak ada? Pencarian orang, pengikut, like publik, peringkat, dan feed tanpa akhir.
5. Bisakah saya memakainya sekarang? Belum. Patepang masih prototipe dengan data fiktif.

**Non-goal:** unduhan, pendaftaran, daftar tunggu, formulir, harga, halaman blog, versi bahasa
Inggris, dan tombol ganti tema.

**Anti-goal**, yaitu hal yang membuat hasil gagal walau tampak rapi:

- Pengunjung mengira aplikasinya sudah bisa diunduh.
- Data fiktif prototipe terbaca sebagai bukti pengguna nyata.
- Patepang terbaca seperti aplikasi kencan, jejaring sosial, atau CRM.
- Pola SaaS: hero, logo pelanggan, tiga kartu fitur, statistik, dan testimoni.
- Identitas visual bergeser dari `DESIGN.md`.
- Ada klaim keamanan, privasi, atau enkripsi.

## 3. Batasan

- Next.js dan TypeScript dengan static export. Tanpa backend, database, auth, server actions,
  layanan formulir, analytics, atau tracking.
- Satu halaman berbahasa Indonesia (`lang="id"`), ditambah halaman 404.
- Hanya Plus Jakarta Sans dan Phosphor. Token dari `DESIGN.md`. Tanpa UI kit, CSS framework, atau
  library gerak.
- Aksesibilitas: kontras WCAG 2.2 AA, target sentuh minimal 48px, fokus keyboard terlihat, gerak
  dikurangi dihormati, dan tetap utuh pada lebar 360, 390, 768, 1440 serta zoom 200%.
- Kebijakan dependensi mengikuti repo `app`: versi dipin persis, berumur minimal 14 hari saat dipasang,
  pnpm lewat corepack, dan skrip lifecycle diblokir.
- Tidak boleh ada deploy, publikasi, PR, perubahan DNS, perubahan `patepang/app`, atau pengumpulan data.

## 4. Brief surface (Impeccable `shape`)

1. **Job dan audiens.** Pengunjung baru yang ingin tahu apa Patepang. Mode **Persuade**: pengunjung
   memutuskan apakah ide ini masuk akal dan relevan baginya. Kesuksesan di sini adalah pemahaman,
   bukan konversi, karena belum ada yang bisa dikonversi.
2. **Hasil dan bukti.** Aksi utama berbentuk nyata di halaman: "Lihat cara tempel" membawa ke
   penjelasan ritual yang bisa diputar. Bukti yang jujur berasal dari aturan produk itu sendiri
   (tempel, kabar yang berakhir, memudar setelah setahun) dan dari tampilan prototipe yang diberi
   label. Tidak ada angka, logo, atau testimoni.
3. **Arah.** Otoritas visual adalah dunia Patepang yang sudah ada (`DESIGN.md`) dan tidak dipilih
   ulang. Yang masih terbuka hanya **struktur dan momen khas**. Tiga struktur dikocok dari tujuh
   kandidat lewat `impeccable concept-seed --scope surface --mode persuade`
   (`seed:1890326d8fad4b69`). Sketsa first viewport-nya ada di
   `.impeccable/mocks/decision/{tur-prototipe,satu-tahun,kalender}.html`. Lihat §8.
4. **Lingkup.** Satu halaman, kualitas produksi, interaksi minimal: satu atau dua pulau interaktif
   kecil. Yang tidak boleh berubah: logo (wordmark dan lockup dua titik), istilah produk, token, dan
   nada.
5. **Keadaan.** Tema terang dan gelap mengikuti OS, gerak penuh dan gerak dikurangi, JavaScript mati
   (semua isi tetap terbaca dan tautan tetap bekerja), font gagal dimuat (fallback sistem dengan bobot
   yang sama), teks 200%, serta judul panjang yang membungkus tanpa terpotong.
6. **Interaksi dan layout.** Navigasi atas berisi lockup dan tautan anchor. Section mengalir vertikal
   dengan satu ritme jarak. Di mobile, layout menjadi satu kolom. Tanya jawab memakai `<details>`
   bawaan. Satu momen gerak per halaman (lihat §11).
7. **Keputusan terbuka** untuk pemilik ada di §16.

## 5. Alur informasi

Urutan ini sama untuk ketiga struktur. Yang berbeda hanya pembuka dan momen khasnya (§8).

| # | Section (anchor) | Pertanyaan pengunjung yang dijawab |
|---|---|---|
| 1 | Pembuka | Apa ini? Untuk siapa? Apa yang bisa saya lakukan di sini? |
| 2 | Cara tempel (`#cara-tempel`) | Bagaimana koneksi lahir? |
| 3 | Setelah bertemu (`#setelah-bertemu`) | Apa yang terjadi setelah kami berpisah? |
| 4 | Bertemu lagi (`#bertemu-lagi`) | Kenapa harus bertemu lagi? |
| 5 | Yang sengaja tidak ada (`#tanpa`) | Apa bedanya dengan aplikasi lain? |
| 6 | Prototipe (`#prototipe`) | Bisakah saya memakainya sekarang? |
| 7 | Tanya jawab (`#tanya-jawab`) | Pertanyaan yang tersisa |
| 8 | Penutup | Halaman yang punya akhir |

## 6. Draf copy

Copy di bawah ini adalah draf. Kalimat yang diambil verbatim dari aplikasi ditandai **(app)**.
Semuanya bahasa Indonesia dengan kalimat biasa, tanpa label huruf kapital, tanpa `→`, dan tanpa
gabungan dengan titik tengah.

**Head.** Title: "Patepang: hanya orang yang pernah kamu temui". Description: "Patepang adalah
aplikasi untuk tetap dekat dengan orang yang pernah kamu temui langsung. Saat ini masih prototipe."

**Navigasi.** Lockup `patepang` (kembali ke atas), lalu "Cara tempel", "Setelah bertemu",
"Prototipe", dan "Tanya jawab". Ada skip link "Langsung ke isi".

**1. Pembuka**

- H1: "Hanya orang yang pernah kamu temui." **(app)**
- Lede bergantung pada struktur (§8). Lede untuk A: "Patepang adalah aplikasi untuk tetap dekat
  dengan orang yang benar-benar pernah kamu temui. Koneksi hanya lahir saat kalian bertemu langsung."
- CTA: "Lihat cara tempel" (utama) dan "Tentang prototipe" (tautan teks).
- Status: "Masih prototipe dengan data fiktif. Belum ada aplikasi yang bisa diunduh."

**2. Cara tempel**

- H2: "Sebelum pamit, tempel dulu."
- Intro: "Tempel hanya bisa dilakukan saat kalian berhadapan. Tidak ada cara lain untuk terhubung."
- Langkah (berurutan, jadi penomoran sah):
  1. "Pindai kode": "Satu HP menampilkan kode; HP lainnya memindainya." **(app)**
  2. "Goyang bersama": "Pegang kedua HP berdempetan, lalu goyangkan bersama selama dua detik."
     **(app)**
  3. "Terhubung": "Koneksi kalian dan momen pertama tercatat di kedua HP." **(app)**
- Tombol demo: "Putar cara tempel", lalu "Putar lagi". Keterangan: "Pratinjau visual. Di prototipe,
  kamera, kode QR, dan sensor gerak masih disimulasikan."
- Catatan: "Akunmu lahir saat tempel pertama. Tidak ada email atau nomor telepon yang diminta, dan
  tidak ada batas waktu."

**3. Setelah bertemu**

- H2: "Setelah kalian berpisah"
- "Kabar yang punya akhir": "Kabar hanya datang dari orang yang pernah kamu temui. Kamu memilih siapa
  yang membaca: semua koneksi, satu lingkaran, atau satu orang. Setelah semuanya terbaca, halamannya
  selesai." Ilustrasinya kartu "Selesai untuk hari ini. Kabar berikutnya datang besok; tidak ada yang
  perlu dikejar." **(app)**
- "Momen dari setiap pertemuan": "Setiap tempel mencatat momen di HP kalian berdua. Foto dan nama
  tempat boleh ditambahkan, boleh juga tidak."
- "Riwayat kalian, bukan profil": "Patepang mengingat kapan kalian pertama bertemu, sudah berapa kali,
  dan kapan terakhir. Tidak ada pengikut dan tidak ada angka popularitas."
- "Rencana untuk bertemu lagi": "Ajak ketemu, buat rencana, dan simpan daftar pribadi orang yang ingin
  kamu temui lagi."

**4. Bertemu lagi**

- H2: "Koneksi dijaga dengan bertemu lagi"
- Isi: "Koneksi memudar setahun setelah pertemuan terakhir. Peringatan muncul di bulan ke-11. Bertemu
  dan tempel lagi, dan koneksinya segar kembali."
- Ilustrasinya kartu koneksi contoh: "Sari, pertama bertemu 3 Mar 2025 di kedai kopi, bertemu 3 kali,
  terakhir 11 bulan lalu", dengan peringatan "Memudar dalam 30 hari. Bertemu dan tempel lagi untuk
  menyegarkan koneksi ini." Labelnya: "Contoh tampilan dari prototipe, data fiktif."

**5. Yang sengaja tidak ada**

- H2: "Yang sengaja tidak ada"
- "Pencarian orang. Koneksi lahir dari tempel, bukan dari pencarian." **(app)**
- "Pengikut, like publik, dan peringkat."
- "Feed tanpa akhir. Kabar harian selesai, dan tidak ada yang perlu dikejar."
- "Orang asing. Patepang bukan aplikasi kencan dan bukan tempat berkenalan dengan orang yang belum
  pernah kamu temui."

**6. Prototipe** (eksplisit, sesuai keputusan pemilik)

- H2: "Patepang masih prototipe"
- "Yang ada sekarang adalah prototipe aplikasi dengan data fiktif, untuk menguji rancangan di atas.
  Belum ada server, akun sungguhan, pesan, panggilan, atau pembayaran. Kamera, kode QR, dan goyang
  masih disimulasikan."
- "Belum ada aplikasi yang bisa diunduh, dan belum ada tanggal peluncuran."
- "Halaman ini tidak meminta data apa pun darimu."

**7. Tanya jawab** (`<details>`)

- "Kenapa tidak ada pencarian orang?" "Patepang hanya menghubungkan orang yang pernah bertemu langsung.
  Koneksi lahir dari tempel, bukan dari pencarian." **(app)**
- "Apa itu tempel?" "Satu HP menampilkan kode, HP lain memindainya, lalu kalian menggoyangkan kedua HP
  bersama dua detik." **(app)**
- "Bagaimana kalau aku belum punya koneksi?" "Akunmu lahir saat tempel pertama, kapan pun itu.
  Rancangannya juga menyediakan titik lahir: pertemuan terbuka untuk tempel pertama. Jadwalnya belum
  ada."
- "Apa yang terjadi kalau lama tidak bertemu?" "Koneksi memudar setahun setelah pertemuan terakhir,
  dengan peringatan di bulan ke-11. Bertemu dan tempel lagi menyegarkannya."
- "Kapan Patepang bisa dipakai?" "Belum ada tanggal. Patepang masih prototipe dengan data fiktif, dan
  belum ada aplikasi yang bisa diunduh."
- _(Usulan, perlu konfirmasi)_ "Apa arti tepang?" "Dalam bahasa Sunda, tepang berarti bertemu."

**8. Penutup**

- "Selesai. Tidak ada yang perlu dikejar." Kalimat ini menggemakan akhir halaman Kabar.
- Lockup, kalimat status, dan tautan "Kembali ke atas".

## 7. CTA

| Elemen | Perilaku | Alasan |
|---|---|---|
| "Lihat cara tempel" (utama) | Anchor ke `#cara-tempel`. Fokus berpindah ke judul section itu. | Navigasi di halaman (keputusan pemilik). Aksi ini benar-benar bekerja dan tidak mengumpulkan data. |
| "Tentang prototipe" (teks) | Anchor ke `#prototipe` | Menjawab "bisakah saya memakainya?" dengan jujur. |
| "Putar cara tempel" (di section 2) | Memutar ritual sekali per tekan. Tombol tetap aktif sehingga fokus tidak hilang. | Demo yang bekerja di tempat, sesuai mode Persuade. |

Tidak ada tombol unduh, daftar akun, daftar tunggu, formulir, `mailto`, atau tautan ke
`patepang.example`.

## 8. Tiga struktur pembuka (pilih satu)

Ketiganya memakai dunia visual dan isi section 2 sampai 8 yang sama. Yang berbeda adalah pembuka,
momen khas, dan section mana yang diangkat. Urutan di bawah adalah urutan kocokan; tidak ada yang
diunggulkan.

**A. Tur prototipe** (`tur-prototipe.html`)

- Thesis: halaman ini memandu pengunjung melewati layar-layar prototipe yang asli, masing-masing
  sebesar HP di atas panggung hijau kabut dan dianotasi di tepinya. Pengunjung melihat persis apa yang
  sudah ada dan bagaimana cara kerjanya.
- First viewport: H1 besar di kiri atas, lede, CTA, dan status di kanan. Di bawahnya, panggung
  `forest-mist` selebar layar dengan layar Tempel ("sebelum pamit, tempel dulu", dua titik, pola kode
  demo) yang muncul dari tepi bawah, diberi tiga anotasi bergaris penunjuk.
- Momen khas: menekan "Putar cara tempel" menghidupkan layar itu. Dua titik mendekat, goyang, lalu
  centang mendarat (pola `TapRitualPreview` dari aplikasi).
- Risiko: tampilan aplikasi berisi data fiktif, jadi label harus selalu terlihat. Komposisi dengan
  ponsel juga dekat dengan kebiasaan kategori landing aplikasi.

**B. Satu tahun di antara dua titik** (`satu-tahun.html`)

- Thesis: satu lintasan waktu selebar layar menceritakan satu koneksi selama setahun. Titik hijau
  menandai pertemuan terakhir, titik apricot menandai hari ini, dan jarak di antara keduanya adalah
  waktu tanpa bertemu.
- First viewport: H1, lede, dan CTA di atas. Di bawahnya lintasan Hari 1 sampai Bulan 12 dengan skala
  proporsional, titik-titik kabar kecil, segmen jarak yang menguat menjelang bulan ke-11, pil "Bulan
  ke-11: koneksi mulai memudar", dan pasangan bergaris putus di bulan ke-12.
- Momen khas: "Putar setahun". Titik apricot berjalan dari Hari 1 ke Bulan 11, peringatan muncul,
  lalu titik hijau melompat ke Bulan 12 dan keduanya bersatu (tempel ulang). Durasi kurang dari 2,5
  detik, sekali per tekan. Saat gerak dikurangi, lima fase bernama berganti tanpa gerak.
- Risiko: bergantung pada satu infografik. Di mobile, lintasan harus berubah menjadi vertikal tanpa
  kehilangan arti.

**C. Kalender pertemuan** (`kalender.html`)

- Thesis: setahun satu koneksi digambar sebagai perencana dua belas bulan. Bulan tanpa pertemuan
  tampak sepi walau kabar tetap datang, bulan ke-11 ditandai peringatan, dan bulan ke-12 berisi
  pertemuan lagi.
- First viewport: H1, lede, dan CTA di atas. Dua belas kartu bulan dengan grid hari, legenda di bawah.
- Momen khas: kartu bulan menyala berurutan sekali (kabar muncul, bulan sepi tetap sepi), peringatan,
  lalu pertemuan. Saat gerak dikurangi, gambar langsung lengkap.
- Risiko: grid kalender bisa terbaca seperti grafik *streak*, pola yang ditolak produk. Mitigasinya
  warna tenang, tanpa angka, dan tanpa hitungan beruntun. Di mobile perlu 2 × 6 atau 3 × 4.

Disiplin yang dipinjam dari challenger katalog (cyclorama): setiap fase diberi nama dan tidak pernah
hanya dibedakan lewat warna. Ini berlaku untuk ketiga struktur. Challenger lain ditolak karena tidak
sesuai produk: dinding streaming adalah pola feed, VU meter memberi kesan memantau orang, dan yang
lain asing bagi audiens.

## 9. Wireframe teks

Desktop (≥ 1024px). Pembuka mengikuti struktur terpilih; section lain:

```
┌ nav: ●● patepang ................. Cara tempel  Setelah bertemu  Prototipe  Tanya jawab ┐
│ [pembuka: lihat §8]                                                                     │
├─ #cara-tempel ───────────────────────────────────────────────────────────────────────────┤
│ H2 Sebelum pamit, tempel dulu.          ┌ panggung forest-mist ─────────────────┐        │
│ intro                                   │  ▢ HP      ● ●  →  ●●      ▢ HP       │        │
│ 1 Pindai kode ......                    │  langkah aktif disorot                │        │
│ 2 Goyang bersama ...                    └───────────────────────────────────────┘        │
│ 3 Terhubung ........                    [Putar cara tempel]  keterangan simulasi        │
│ catatan: akun lahir saat tempel pertama                                                 │
├─ #setelah-bertemu ───────────────────────────────────────────────────────────────────────┤
│ H2 Setelah kalian berpisah                                                              │
│ Kabar yang punya akhir .........  ┌ kartu "Selesai untuk hari ini" ┐                    │
│ Momen / Riwayat / Rencana: tiga baris dipisah hairline, bukan tiga kartu kembar          │
├─ #bertemu-lagi ──────────────────────────────────────────────────────────────────────────┤
│ H2 Koneksi dijaga dengan bertemu lagi      ┌ kartu koneksi contoh + peringatan ┐        │
├─ #tanpa ─── daftar tipografis empat baris, tanpa ikon dalam kotak ──────────────────────┤
├─ #prototipe ── latar sand-well, teks status lengkap ────────────────────────────────────┤
├─ #tanya-jawab ── lima <details> ─────────────────────────────────────────────────────────┤
└ penutup: "Selesai. Tidak ada yang perlu dikejar."  ●● patepang  status  Kembali ke atas ┘
```

Mobile (360 sampai 599px): satu kolom dengan gutter 20px. H1 40/48. CTA selebar penuh. Panggung ritual
di bawah langkah-langkahnya. Navigasi menyisakan lockup ditambah satu tautan "Tanya jawab". Kartu
ilustrasi tetap sebesar konten dan tidak pernah memicu gulir horizontal.

## 10. Token dan komponen

**Token** diambil persis dari `DESIGN.md`. Di web, token menjadi CSS custom properties di `:root`,
dengan nilai gelap di bawah `@media (prefers-color-scheme: dark)`.

**Komponen yang dipertahankan dan diterjemahkan ke web** (sumber di `app/src/...`):

| Komponen app | Di landing | Catatan |
|---|---|---|
| `TwoDots`, `Lockup` (`features/system/Wordmark.tsx`) | Lockup navigasi dan penutup, motif momen khas | Warna, ukuran 12/16/28, sekali gerak |
| `Button` primary, secondary, ghost | CTA, tombol demo | Kapsul, 48/56px, fokus biru |
| `TapRitualPreview` | Demo di section 2 | Tiga langkah, ±1,9 detik, pengumuman pembaca layar |
| `DayCompleteCard` | Ilustrasi Kabar | Copy verbatim |
| `ConnectionCard` | Ilustrasi Bertemu lagi | Dengan label data fiktif |
| `Surface` brand dan raised | Panggung dan kartu | Radius 20, hairline |

**Tidak dipakai:** komponen formulir, dialog, toast, dan tab bar, karena landing tidak membutuhkannya.

## 11. Rencana gerak

| Gerak | Pemicu | Tujuan | Gerak dikurangi |
|---|---|---|---|
| Momen khas struktur (§8) | Tombol "Putar ..." | Menjelaskan hubungan setelah bertemu | Fase berganti dengan fade 120ms, tanpa translasi |
| Ritual tempel (section 2) | Tombol "Putar cara tempel" | Menjelaskan tempel | Sama; pengumuman `aria-live` tetap |
| Tekan tombol | Pointer atau keyboard | Umpan balik | Hanya warna, tanpa skala |
| Anchor scroll | CTA | Arah | `scroll-behavior` otomatis jadi instan |

- Gerak tidak berjalan sendiri saat halaman dimuat, kecuali satu kali lockup bila struktur A dipilih.
- Tidak ada fade-in per section, parallax, scroll hijacking, atau loop.
- Kurva dan durasi diambil dari token. Dibangun dengan CSS dan sedikit JavaScript di satu pulau
  interaktif, tanpa library gerak.

## 12. Perubahan yang benar-benar diperlukan

| Perubahan | Bukti masalah | Manfaat |
|---|---|---|
| Langkah tipe web: H1 72/80 (−1,44px) di ≥ 1024, 56/64 di ≥ 600, 40/48 di bawahnya; H2 40/48 di desktop dan 28/36 di mobile | Langkah terbesar aplikasi, `display` 36/44, dirancang untuk layar HP. Di 1440px judul itu kehilangan hierarki (terlihat di sketsa). | Hierarki terjaga. Keluarga, bobot, dan logika tracking sama; tinggi baris tetap kelipatan 4. |
| Status hover untuk pointer (`@media (hover: hover)`), memakai warna *pressed* yang sudah ada | Aplikasi native tidak punya hover, sedangkan web membutuhkannya | Konsisten tanpa warna baru |
| Lebar halaman maksimum 1360px dengan grid 12 kolom; lebar baca 680px tetap | Aplikasi tidak punya tata letak desktop di luar showcase | Komposisi desktop yang tertib |
| Istilah "tempel" di semua tempat, bukan "tepang" | Drift istilah di repo (`docs/product-understanding.md` §3) | Mengikuti `SCREENS-v1.md` |

Perubahan lain hanya boleh masuk dengan bukti. `DESIGN.md` diperbarui di akhir build oleh
documenter Impeccable.

## 13. Stack dan dependensi

> Tabel ini adalah kandidat saat perencanaan. Versi yang akhirnya dipasang berbeda (antara lain
> `next` 16.4.2 karena advisory keamanan, ESLint 9, dan Playwright Node, bukan Python); lihat
> `docs/landing-implementation.md` §3.

| Paket | Kandidat hari ini | Alasan |
|---|---|---|
| `next` | 16.4.0 (6 Okt 2026, ≥ 14 hari). 16.4.1 dan 16.4.2 baru 7 sampai 8 hari dan menurut catatan rilis hanya backport Turbopack, bukan perbaikan keamanan. | Diminta brief. Static export (`output: 'export'`). |
| `react`, `react-dom` | 19.3.0 (9 Sep 2026). 19.3.1 (14 Okt) hanya menyebut "Improve transport protocol" untuk RSC tanpa advisory; dievaluasi ulang saat instalasi. | Peer Next |
| `typescript` | 6.0.3 (sama dengan `app`) | TS 7 adalah port native yang kompatibilitasnya dengan build Next.js belum terverifikasi |
| `@phosphor-icons/react` | 2.1.10, impor dari `@phosphor-icons/react/ssr` | Satu set ikon, dirender di server, tanpa JavaScript klien |
| Font | `next/font/google` untuk Plus Jakarta Sans 400/500/600/700, `latin`, `display: swap` | Di-host sendiri saat build, tanpa permintaan ke Google saat runtime, dengan fallback metrik |
| Lint dan format | `eslint-config-next` 16.4.0 (peer `eslint` ≥ 9) dengan `eslint` 10.12.0; `prettier` 3.9.9 (lebar 100, kutip tunggal, sama dengan `app`) | Konsistensi organisasi. `eslint-config-next` membawa `eslint-plugin-react` 7.x dan `eslint-plugin-import` 2.x yang kompatibilitasnya dengan ESLint 10 diperiksa saat instalasi. Bila tidak cocok, dipakai ESLint 9 terbaru yang berumur ≥ 14 hari. |
| Uji | Python Playwright 1.56.0 di `.venv` (dev saja) melalui skill webapp-testing | Cocok dengan Chromium bawaan; tanpa dependensi npm tambahan |
| Manajer paket | pnpm 10.34.6 lewat corepack, `minimum-release-age=20160`, `save-exact`, `engine-strict`, skrip lifecycle diblokir | Sama dengan `app` |

**Tidak dipakai:** Tailwind, UI kit, library gerak, `next/image` dengan optimasi, analytics, dan
`sharp`. Gambar raster tidak diperlukan; ilustrasi dibuat dengan HTML, CSS, dan SVG.

**Akan diverifikasi saat instalasi** dari dokumentasi versi terpasang (Context7 setelah API key ada,
atau dokumentasi resmi): batas static export, `next/font` saat export, metadata, `not-found`, dan
konfigurasi ESLint di Next 16.

## 14. Rencana verifikasi dan pemakaian alat

| Fase | Alat |
|---|---|
| Rencana implementasi | Superpowers `writing-plans` menghasilkan `docs/superpowers/plans/2026-10-22-landing.md` |
| Build | Superpowers TDD: asersi Playwright ditulis dulu untuk anchor CTA, tombol demo, gerak dikurangi, tidak ada error console, dan tidak ada overflow di 360. Context7 untuk API. TypeScript: `tsc --noEmit` plus language server via skrip. `vercel-react-best-practices` untuk batas server/client dan impor. |
| Tinjauan visual | webapp-testing dan Playwright MCP: screenshot 360, 390, 768, 1440 (terang dan gelap), lebar 720 dengan DPR 2 untuk zoom 200%, konten panjang, urutan Tab, fokus, gerak dikurangi, console, permintaan gagal, dan font. |
| Tinjauan UI | `web-design-guidelines` atas `app/**` dan CSS. Impeccable `detect --json`, `critique`, `audit`, `polish`, finish reviewer, lalu documenter untuk `DESIGN.md`. |
| Selesai | Superpowers `verification-before-completion` dan `requesting-code-review`. `pnpm typecheck`, `lint`, `format:check`, tes, `next build` (export), dan uji ulang atas hasil export. |

Lighthouse hanya dilaporkan bila benar-benar diukur, dengan konteks lokal.

## 15. Tinjauan Frontend Design (lintasan kedua)

| Default yang diwaspadai | Keputusan |
|---|---|
| Krem, serif kontras tinggi, aksen terakota | Mengikuti `DESIGN.md`: ivory dengan sans dan merek hijau. Boldness dipusatkan pada panggung hijau kabut atau lintasan waktu, bukan pada krem. |
| Kit kartu SaaS (kartu kembar, bayangan sama) | Section 3 memakai baris berpemisah hairline. Kartu hanya untuk ilustrasi yang memang kartu di aplikasi. |
| Eyebrow kapital, `A · B`, `→`, label monospace | Dihapus dari semua draf. Label sketsa diganti menjadi kalimat biasa. |
| Kata di headline yang diberi aksen | H1 dibiarkan utuh tanpa kata berwarna. |
| Nomor 01/02/03 sebagai hiasan | Nomor hanya dipakai untuk tiga langkah tempel, karena memang urutan. |
| Fade-in per section | Diganti satu momen gerak yang dipicu pengguna. |

## 16. Diserahkan ke builder dan keputusan pemilik

**Diserahkan ke builder:** struktur file, nama komponen, tata letak navigasi mobile secara detail,
nama anchor, dan penyesuaian kecil jarak dalam token yang ada.

**Keputusan pemilik:**

1. Struktur pembuka: A, B, atau C.
2. Persetujuan dokumen ini sebagai rencana.
3. Favicon. Tidak ada aset resmi. Pilihannya: (a) tanpa favicon, dengan `<link rel="icon" href="data:,">`
   agar tidak ada error 404; atau (b) favicon dua titik sebagai pengganti sementara, seperti lockup di
   aplikasi.
4. Creative North Star "Dua Titik Bertemu" di `DESIGN.md`.
5. Tanya jawab "Apa arti tepang?".
6. Domain untuk metadata (`metadataBase`), yaitu `https://patepang.com` seperti di brief.
