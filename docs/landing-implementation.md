# Implementasi landing patepang.com

- **Tanggal:** 22 Oktober 2026 (versi pertama dan keputusan versi produksi), 23 Oktober 2026
  (versi produksi selesai dan diverifikasi), 30 Oktober 2026 (revisi bertahap dimulai: teks status
  dan header, §8).
- **Status:** sejak 30 Oktober 2026 halaman produk yang sudah hadir (keputusan pemilik). `main`
  di-deploy otomatis oleh Vercel. Tanpa analytics atau pengumpulan data.
- **Arah:** versi pertama memakai arah A, Tur prototipe
  (`docs/superpowers/specs/2026-10-22-landing-design.md` §8; commit `35b4e47`). Pada 22 Oktober 2026
  pemilik meminta halaman tampil "seakan-akan produksi", dengan section header, hero, masalah,
  solusi, fitur, testimoni, tanya jawab, CTA, dan footer. Keputusan pemilik atas hal yang tidak bisa
  dikarang:
  - testimoni diganti skenario pemakaian;
  - CTA "Segera hadir" tanpa formulir;
  - footer berisi navigasi dan hak cipta.
- **Sumber kebenaran:** `PRODUCT.md`, `DESIGN.md`, `docs/product-understanding.md`, dan kode
  `patepang/app` @ `262202f` (dibaca saja, lewat clone terpisah di luar repo ini; tidak ada
  install, build, atau perubahan di app).

## 1. Yang dibangun

Satu route `/` berisi seluruh halaman, ditambah 404:

1. **Header**:
   - lockup bertumpuk (dua titik di atas wordmark, dari `features/system/Wordmark.tsx`) dan skip
     link "Langsung ke isi";
   - tautan Cara kerja, Fitur, Cerita, dan Tanya jawab, sebaris mulai 768px;
   - di bawah 768px tautannya ada di balik tombol "Menu", yaitu `<details>` asli. Pulau klien kecil
     `MobileMenu` menutupnya saat tautan dipilih atau Escape ditekan.
   - **Direvisi 30 Oktober 2026** (§8.2): mengambang sebagai kapsul saat halaman digulir, penanda
     section yang sedang dibaca, tombol "Unduh Patepang", dan tombol menu bulat.
2. **Hero**:
   - H1 "Hanya orang yang pernah kamu temui." dan lede;
   - CTA "Lihat cara kerja" dan "Jelajahi fitur";
   - status "Segera hadir. Belum tersedia untuk diunduh." (sejak 30 Oktober 2026: "Sudah hadir.
     Tersedia untuk diunduh.", §8.1);
   - di bawahnya, panggung forest mist dengan layar Tempel untuk orang yang belum punya akun. Tiga
     catatan di tepinya: tanpa email atau nomor telepon, kode berganti setiap 30 detik, dan hanya
     saat bertemu langsung.
   - **Direvisi 30 Oktober 2026** (§8.5): aksi "Unduh Patepang" dan "Lihat cara kerja", tanpa baris
     status; layar Tempel di dalam bingkai HP yang naik dari panggung sekali saat halaman dibuka;
     tiap catatan sejajar dengan bagian layar yang dijelaskannya, pada ukuran teks berapa pun.
3. **Masalah**: "Setelah pamit, kabar sering berhenti begitu saja.", dengan tiga masalah. Tanpa
   klaim riset. **Direvisi 30 Oktober 2026** (§8.6): satu pertemuan yang memudar, dari hari kalian
   bertemu sampai setahun kemudian, dengan gambar dan gerak yang mengikuti guliran.
4. **Solusi / Cara kerja**:
   - "Sebelum pamit, tempel dulu." dengan tiga langkah dari `TapRitualPreview`;
   - ilustrasi bergerak yang berputar sendiri sekali saat panggungnya terlihat, lalu bisa diputar
     ulang dengan "Putar lagi".
5. **Fitur**:
   - "Setelah bertemu, hubungan tetap terjaga.";
   - Kabar (`DayCompleteCard`), Momen (`MomenCard`), serta Orang dan bertemu lagi
     (`ConnectionCard` dengan peringatan memudar, ditambah satu baris Rencana), di satu panggung;
   - ditutup daftar "Yang sengaja tidak ada di Patepang".
6. **Cerita** (pengganti testimoni):
   - "Dibuat untuk pertemuan seperti ini.", dengan tiga skenario: kenalan di workshop, teman lama di
     pernikahan, dan sepupu dari kota lain;
   - setiap skenario punya tiga ketukan, ditulis untuk pembaca ("kamu"), bukan kutipan orang;
   - penanda tiap ketukan adalah dua titik merek: berjauhan, mendekat, lalu bertemu.
7. **Tanya jawab**: enam `<details>`. Pertanyaan asal nama tidak dimuat karena belum terverifikasi.
8. **CTA** (sejak 30 Oktober 2026 "Patepang sudah hadir." di `#unduh`, §8.1): pita forest mist
   "Patepang segera hadir." dengan dua anchor kembali ke Cara kerja dan
   Fitur. Tidak ada unduhan, daftar tunggu, atau formulir.
9. **Footer**: lockup, "Hanya orang yang pernah kamu temui.", tautan section, "© 2026 Patepang",
   dan "Kembali ke atas". Tidak ada tautan ke halaman yang belum ada. **Direvisi 30 Oktober 2026**
   (§8.3): wordmark selebar kolom menggantikan lockup.

Pratinjau app adalah terjemahan HTML/CSS/SVG dari komponen sumber dengan data contoh, tanpa
screenshot asli. Setiap pratinjau punya nama aksesibel (`role="img"` + `aria-label`).

## 2. Keputusan dan penyimpangan (dengan alasan)

| Hal | Keputusan | Alasan |
|---|---|---|
| Pembingkaian | Halaman produk pra-rilis: fitur ditulis sebagai produk Patepang. Label "Pratinjau prototipe — data fiktif" dan section Status prototipe dihapus. Status "Segera hadir" tampil di hero, FAQ "Kapan", dan CTA. | Keputusan pemilik 22 Oktober 2026, dicatat di `PRODUCT.md`. Halaman tetap tidak menyatakan aplikasi sudah tersedia. **Diganti 30 Oktober 2026:** produk yang sudah hadir (§8). |
| Testimoni | Diganti tiga skenario pemakaian berpenanda "Tiga contoh dari keseharian", tanpa nama, foto, atau tanda kutip. Setiap ketukan adalah perilaku app: momen tercatat, foto di Kabar (composer app menerima foto), rencana dengan jawaban "Ikut", peringatan memudar. | Belum ada pengguna sungguhan; testimoni karangan akan menyesatkan pengunjung. Keputusan pemilik. |
| CTA | "Lihat cara kerja" dan "Jelajahi fitur" (anchor di halaman). | Belum ada unduhan, daftar tunggu, atau kontak; pemilik memilih tanpa formulir. **Sejak 30 Oktober 2026** header menambah "Unduh Patepang" ke `#unduh` (§8.2), dan aksi hero menjadi "Unduh Patepang" dan "Lihat cara kerja" (§8.5). |
| Footer | Lockup, tagline, tautan section, "© 2026 Patepang", "Kembali ke atas". | Belum ada kontak, akun media sosial, atau halaman legal. Keputusan pemilik. |
| Navigasi di HP | Tombol "Menu" berupa `<details>` asli; panelnya menutupi halaman di bawah header. Dengan JavaScript, menu tertutup saat tautan dipilih, Escape ditekan (fokus kembali ke tombol), fokus pindah keluar menu, atau halaman ditekan di luar menu. | Dengan empat tujuan, satu tautan tidak lagi cukup. `<details>` tetap bekerja tanpa JavaScript. **Direvisi 30 Oktober 2026:** tombol bulat, panel membuka dan menutup dengan gerak (§8.2). |
| Gerak khas | Ilustrasi Cara kerja berputar sendiri sekali, saat 60% panggungnya terlihat, dan tidak pernah berulang. "Putar lagi" memutarnya kembali; tekanan sebelum autoplay membatalkan autoplay. Hero dan lockup diam. | Halaman produksi menjelaskan alur tanpa meminta klik; satu momen yang terjadi sekali tetap sesuai larangan loop dan gerak dekoratif. Durasinya ±2 detik, di bawah batas 5 detik WCAG 2.2.2. **Sejak 30 Oktober 2026** dua titik lockup header bertemu sekali saat halaman dimuat (§8.2), dan HP di hero naik sekali lalu catatannya muncul (§8.5). Di Masalah, waktu berjalan mengikuti guliran pembaca (§8.6). |
| Pengumuman langkah | Kalimat langkah tampil di layar (`aria-hidden`); region `role="status"` terpisah yang tak terlihat hanya diisi untuk putaran yang diminta lewat tombol. Putaran otomatis tidak diumumkan; langkah aktif tetap terbaca lewat `aria-current="step"`. | Tanpa ini, pembaca layar yang menggulir halaman (VoiceOver iOS, mode jelajah NVDA) disela tiga pengumuman yang tidak diminta (temuan code review). |
| Nama tombol | Label terlihat "Putar" atau "Putar lagi", ditambah teks tak terlihat " cara tempel". | Nama aksesibel jelas di luar konteks ("Putar cara tempel") dan tetap memuat label yang terlihat (WCAG 2.5.3). |
| Judul CTA | "Patepang segera hadir." memakai ukuran section di HP dan ukuran hero mulai 600px. | Dengan ukuran hero, kata "Patepang" lebih lebar dari layar 360px pada teks 200% (temuan code review; kini dites). Teksnya kini "Patepang sudah hadir." (§8.1). |
| Token | `src/app/tokens.css` menerjemahkan `palette.ts`, `color.ts` (terang dan gelap), `typography.ts`, `spacing.ts`, `shape.ts`, `elevation.ts`, `motion.ts`, `layout.ts`, `opacity.ts` apa adanya. Komponen hanya membaca custom property. | Brief: token lengkap dari sumber, tanpa nilai mentah di komponen. |
| Ukuran teks | Skala app diubah ke `rem` (16px = 1rem); tracking diubah ke `em`. | Agar pengaturan ukuran teks pembaca tetap berlaku, setara `allowFontScaling` di app. |
| Header di teks besar | Baris header boleh membungkus: pada teks 200% di lebar HP, tombol "Menu" pindah ke bawah lockup. | Wordmark di app juga ikut skala teks. Tanpa pembungkusan, tombol keluar layar 59px (ditemukan oleh tes teks 200%). |
| Kata bertanda hubung | "benar-benar", "ke-11", "Kabar-mu", dan sejenisnya dijaga tetap satu baris (`KeepHyphenated` dan kelas `.nowrap`). | Browser boleh memutus baris setelah tanda hubung. Font merek tidak punya glyph U+2011 (diuji), jadi tanda hubung tak-terputus akan meminjam glyph font lain. |
| Perluasan web | H1 40/56/72px dan H2 28/32/40px per breakpoint, lebar halaman 1360px dengan grid 12 kolom, jarak antarsection 64/96/128px. Ditandai terpisah di `tokens.css`. | Skala app (display 36px) dirancang untuk HP; di 1440px hierarkinya hilang (spec §12). |
| Breakpoint | 600 dan 1024px dari kelas jendela app (gutter 20/32/40). Khusus landing: 720px (catatan hero di kanan HP), 768px (tautan header sebaris), 1024px (masalah tiga kolom, cara kerja dan fitur dua kolom, skenario berdampingan), 1280px (judul hero berdampingan dengan lede, catatan di kedua sisi HP). | Diturunkan dari isi, bukan dari daftar perangkat. **Header sejak 30 Oktober 2026:** 48em dan 64em (§8.2). **Hero:** 37,5em, 48em, dan 80em (§8.5). **Masalah:** 48em dan 64em (§8.6). |
| Hover | Memakai warna *pressed* yang sudah ada, hanya di `@media (hover: hover)`. | App native tidak punya hover. |
| Penanda langkah | Ukurannya `1rem + 8px` (24px di ukuran normal), tumbuh bersama teks. | Di teks 200% angka keluar dari lingkaran 24px yang tetap. |
| Inisial avatar | Ukuran px tetap. | Paritas dengan app (`allowFontScaling={false}`). |
| Istilah | "Bertemu dan **tempel** lagi" di kartu koneksi. | `ConnectionCard.tsx` masih memakai "tepang" (drift); spec §12 memilih "tempel" di semua tempat. |
| Ilustrasi tempel | Timeline dan geometri `TapRitualPreview` (0,9 s dan 1,9 s; mendekat 24px; goyang 5° per 70ms, tiga siklus); di layar lebar diperbesar 1,5×. Dua titik merek berjauhan, mendekat, bertemu, seperti `ShakeScreen.tsx`. | Setia pada sumber. |
| Gerak dikurangi | Tanpa translasi, rotasi, atau skala; tanda centang muncul dengan fade 120ms; langkah dan status tetap berganti. | DESIGN.md dan brief. |
| Tanpa JavaScript | Semua isi tampil; tombol "Putar" disembunyikan dengan `@media (scripting: none)`. Selama belum terhidrasi (skrip masih dimuat atau gagal dimuat), kontrolnya bertanda `data-hydrating` dan disembunyikan dengan `visibility: hidden`, ruangnya tetap disisakan. Menu HP tetap bisa dibuka. | Tidak ada tombol yang hanya tampak bisa diklik. |
| Sorotan langkah | Latar `surface-pressed` (1,08:1 terhadap kanvas terang, 1,43:1 gelap), ditambah penanda terisi berangka, `aria-current="step"`, dan kalimat status. | Warna bukan satu-satunya penanda. |
| Daftar | `role="list"` pada daftar tanpa penanda di luar `nav` (langkah, masalah, skenario). | Safari menghapus semantik daftar dari list tanpa penanda; peran eksplisit mempertahankannya. Belum diuji dengan VoiceOver (lihat §7). |
| Pola kode | Port `qrPath()` dari `QrCodeView.tsx`; modul identik dengan app (dicek untuk empat seed), path digabung per baris. | Setia pada sumber, path ±50% lebih pendek. |
| Data contoh | `src/content/fiction.ts`: satu cerita yang konsisten (Sari, pertama bertemu 3 Mar 2025, terakhir 341 hari lalu, memudar dalam 24 hari, rencana Sabtu, 7 November). String dibentuk mengikuti formatter app. Nama aksesibel setiap pratinjau diawali "Contoh". | Contoh tampilan app, tidak pernah ditampilkan sebagai bukti (tanpa angka pengguna, kutipan, atau testimoni). |
| Favicon dan gambar sosial | `<link rel="icon" href="data:,">`; tidak ada `og:image`. | Jangan mengarang aset atau simbol. |
| Font | Empat file woff2 Plus Jakarta Sans (latin) dari `@fontsource/plus-jakarta-sans@5.3.0`, di `src/app/fonts/` bersama `OFL.txt`, dimuat dengan `next/font/local` (fallback metrik dari Arial). | Di-host sendiri, tanpa permintaan ke Google. |
| Creative North Star | "Dua Titik Bertemu" hanya arahan kerja; tidak muncul di halaman. | Brief. |

## 3. Dependensi

Versi diperiksa di registry npm pada 22 Oktober 2026, dipin persis, dipasang dengan pnpm 10.34.6
(Corepack, hash diverifikasi), satu lockfile. Kebijakan dari app: umur rilis minimal 14 hari
(`minimum-release-age` di `.npmrc`), skrip lifecycle diblokir (`onlyBuiltDependencies: []`).
Versi produksi tidak menambah dependensi.

| Paket | Versi | Catatan |
|---|---|---|
| `next` | 16.4.2 (15 Okt 2026) | **Pengecualian keamanan.** `next build` 16.4.0 berhenti dengan peringatan keamanan. Database advisory npm membenarkan tiga advisory untuk `>=16.0.0 <=16.4.0`: GHSA-2464-fhr4-w9xw (kritis), GHSA-673q-mjm6-r5xr (kritis), GHSA-p3m5-59mp-jv5r (tinggi). Rilis perbaikan pertama (16.4.1) berumur kurang dari 14 hari, jadi hanya `next`, `@next/env`, dan biner `@next/swc-*` (keduanya dipin persis oleh `next`) yang dikecualikan (`minimum-release-age-exclude` di `.npmrc`). Uji negatif pada salinan sementara: tanpa pengecualian, `next` 16.4.2 ditolak; tanpa pola `@next/swc-*`, biner SWC 16.4.2 ditolak; dengan pengecualian, `prettier` 3.9.10 tetap ditolak. Hapus pengecualian setelah 29 Okt 2026. Perintah `next upgrade --agent=security` yang disarankan CLI tidak dijalankan. |
| `react`, `react-dom` | 19.3.0 | 19.3.1 belum 14 hari dan tidak punya advisory. |
| `@phosphor-icons/react` | 2.1.10 | Paket web; diimpor per ikon dari `dist/ssr/*` dan dirender di server. |
| `typescript` | 6.0.3 | `typescript-eslint` 8.71.1 membatasi `typescript <6.1.0`. |
| `eslint` | 9.39.5 | Plugin di dalam `eslint-config-next` hanya mendeklarasikan dukungan sampai ESLint 9. Lini ESLint 9 sudah ditandai tidak didukung di registry; ini alat dev saja. |
| `eslint-config-next` | 16.4.0 | Tidak punya advisory; tetap dalam aturan umur. |
| `prettier` | 3.9.9 | 3.9.10 belum 14 hari. |
| `@playwright/test` | 1.56.1 | Cocok dengan Chromium 141 (build 1194) yang terpasang di lingkungan ini. |
| `axe-core` | 4.14.0 | Audit otomatis pelengkap di tes; bukan bukti kepatuhan menyeluruh. |
| `@types/node`, `@types/react`, `@types/react-dom` | 22.20.5, 19.3.0, 19.3.0 | |

Dokumentasi API Next.js yang dipakai adalah salinan resmi yang ikut terpasang
(`node_modules/next/dist/docs`, versi yang sama), sebagai pengganti Context7.

## 4. Berat halaman (hasil export)

Diukur dari `out/` hasil build versi produksi:

- HTML `index.html`: 101 KB, 20 KB gzip.
- CSS: tiga file, 40 KB, 8 KB gzip. Font: empat woff2, 47 KB total, di-preload.
- JavaScript yang dimuat browser modern: 458 KB, 137 KB gzip, hampir seluruhnya runtime React dan
  router Next.js App Router. Kedua pulau klien (ilustrasi tempel dan menu HP) ada di satu chunk:
  12,6 KB, 4,9 KB gzip. Satu chunk polyfill (110 KB, 38 KB gzip) berlabel `noModule`, sehingga
  hanya diunduh browser lama.
- Lighthouse tidak diukur.

## 5. Gambar tinjauan

`docs/screenshots/` (28 file, ±5,9 MB), dibuat ulang dengan `pnpm screenshots`, yang selalu
menjalankan `next build` lebih dulu. Set yang ada sekarang diambil dari versi produksi:

- Halaman penuh (JPEG): `360-light`, `390-light`, `390-dark`, `768-light`, `1440-light`,
  `1440-dark`, `no-js-390` (JavaScript mati), `text-200-390` (pengaturan ukuran teks browser 200%).
- Tampilan pertama (PNG): `390-light|dark-first-view`, `1440-light|dark-first-view`.
- Ilustrasi Cara kerja: `demo-scan`, `demo-shake`, `demo-done`, masing-masing juga versi
  `-reduced-motion`.
- Zoom browser 200% sungguhan pada jendela 1440×900 (tata letak 720 CSS px, DPR 2):
  `zoom-200-window-1440-1` sampai `-7`, satu per section. Diambil lewat DevTools per layar, karena
  screenshot Playwright tidak menggambar halaman yang di-zoom browser dengan benar (lihat §7).
- `menu-open-390.png`, `faq-open-390.png`, `404-390.png`.

## 6. Verifikasi

Dijalankan pada 23 Oktober 2026 di container Linux: Node 22.22.0, pnpm 10.34.6, Chromium
141.0.7390.37 (Playwright 1.56.1, build 1194). Semua perintah dijalankan ulang setelah perubahan
kode terakhir.

| Perintah | Hasil |
|---|---|
| `pnpm typecheck` | Lulus, 0 error. |
| `pnpm lint` | Lulus, 0 error, 0 peringatan (`--max-warnings 0`). |
| `pnpm format:check` | Semua file sesuai Prettier. |
| `pnpm check:contrast` | 62 dari 62 pasangan warna (31 pasangan × 2 tema) memenuhi minimum WCAG 2.2, termasuk teks dan cincin fokus di panel menu serta tombol di pita CTA. |
| `pnpm build` | Static export berhasil: `out/index.html` dan `out/404.html`. |
| `pnpm test:e2e` | 29 dari 29 lulus. Build dijalankan lebih dulu, dan server statis selalu dijalankan baru di port 4174. |
| `pnpm screenshots` | 9 dari 9 lulus; 28 gambar di `docs/screenshots/`. |
| `pnpm check` | Semua di atas (kecuali screenshot) sekaligus: lulus. |

**Isi tes e2e** (`tests/landing.spec.ts`, `tests/zoom.spec.ts`):

- **Muat halaman**: tidak ada error atau peringatan konsol, error halaman, permintaan yang gagal,
  atau permintaan ke pihak ketiga. Keempat bobot font termuat dari situs sendiri. H1 dan keenam H2
  hadir.
- **Metadata**: title, description ("Segera hadir"), canonical, `og:locale` id_ID, kartu Twitter
  `summary`, favicon `data:,`, dan tanpa `og:image`.
- **Kejujuran**:
  - status "Segera hadir" terlihat, dan setiap pratinjau punya nama aksesibel;
  - tidak ada form, dan tidak ada `blockquote`, `q`, atau `cite` (skenario bukan testimoni);
  - pemindaian kata terlarang (enkripsi, keamanan, privasi, jamin, toko aplikasi, platform,
    termasuk "ios" sebagai kata utuh, testimoni, rating, pengguna, harga, gratis, daftar tunggu,
    unduh sekarang) mencakup teks halaman, jawaban FAQ yang tertutup, `aria-label`, `alt`, `title`,
    dan metadata.
- **Tautan**: setiap `href` adalah anchor di halaman ini, dan targetnya ada.
- **CTA**: CTA hero dan CTA penutup memindahkan fokus ke judul section tujuan, dan judul itu terlihat
  di layar.
- **Header dan menu**:
  - di 768px keempat tautan sebaris dan tombol "Menu" tidak ada;
  - di 390px tautannya tersembunyi sampai "Menu" dibuka;
  - memilih tautan menutup menu, membuka section, dan memindahkan fokus ke judulnya;
  - Enter membuka menu, Tab masuk ke tautan pertama, Escape menutup dan mengembalikan fokus ke
    tombol.
- **Keyboard dan fokus**:
  - skip link menjadi pemberhentian pertama dan memindahkan fokus ke `main`;
  - pada 14 pemberhentian Tab pertama, cincin fokus selalu 2px focus-blue;
  - urutan delapan pemberhentian pertama sesuai harapan (skip link, lockup, empat tautan, dua CTA),
    lalu tombol "Putar".
- **Target sentuh**: semua elemen yang terlihat dan bisa ditekan minimal 48×48px, di 360 (dengan menu
  terbuka, sehingga tautannya ikut diukur) dan 1440px.
- **Ilustrasi Cara kerja**:
  - urutan langkah dicatat dari dalam halaman: kalimat di layar dan langkah ber-`aria-current` pada
    saat yang sama, serta semua yang diumumkan region `role="status"`;
  - ilustrasi berputar sendiri sekali saat terlihat, tanpa satu pun pengumuman, tidak berulang, dan
    tidak mulai lagi saat pengunjung pergi lalu kembali;
  - dengan seperempat panggung terlihat, ilustrasi tetap diam;
  - "Putar lagi cara tempel" mulai dari langkah pertama, fokus tetap di tombol, dan ketiga langkah
    diumumkan;
  - tekanan sebelum autoplay memutarnya sekali, dan melihat panggung sesudahnya tidak memulainya lagi;
  - tidak ada error konsol selama diputar;
  - dengan gerak dikurangi, semua langkah tercapai, dan di akhir (tempat gerak penuh menggeser HP)
    kedua HP tidak dianimasikan dan tidak di-transform;
  - kalau skripnya gagal dimuat, tombol tidak ditawarkan, tetapi ruangnya tetap ada.
- **FAQ**: bisa dibuka dan ditutup dengan Enter, Space, dan pointer.
- **Tema**: kanvas mengikuti tema sistem, dan `theme-color` sama dengan kanvas di kedua tema.
- **Overflow**: tidak ada overflow horizontal dan tidak ada elemen yang keluar layar, di 360, 390,
  768, dan 1440px.
- **Tanpa JavaScript**: isi, anchor, dan FAQ bekerja; tombol "Putar" tidak tampil; menu HP terbuka
  dan tautannya bekerja.
- **404**: status 404, judul, dan jalan kembali. Tautan header kembali ke section di halaman utama.
- **axe-core 4.14** (tag `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`, `wcag22aa`, `best-practice`):
  0 pelanggaran di halaman utama dan 404, terang dan gelap.
- **Zoom dan ukuran teks 200% sungguhan**: lima kasus, dibahas di bawah. Pada lebar di bawah 768 CSS
  px, menu juga dibuka: tautan pertamanya harus utuh di jendela, dan tautan terakhir harus utuh
  setelah digulir.

**Cara zoom 200% diuji**:

- Tes membuka Chromium lengkap (`channel: 'chromium'`, headless baru) dengan profil yang berisi
  pengaturan browser sungguhan:
  - Zoom: `partition.default_zoom_level` = ln 2 / ln 1,2, yaitu pengaturan yang diubah oleh Ctrl/Cmd +.
  - Ukuran teks: `webkit.webprefs.default_font_size` 32, yaitu 200% dari 16.
- Setiap tes memastikan pengaturannya benar-benar berlaku, sehingga ini bukan sekadar viewport sempit
  yang diemulasikan:
  - Jendela 1440×900 menghasilkan `innerWidth` 720 dan `devicePixelRatio` 2.
  - Jendela 1280×800 menghasilkan `innerWidth` 640.
  - Pengaturan ukuran teks menghasilkan font root 32px (jendela 1440×900, serta viewport 390×844
    dan 360×740).
- Di setiap kasus, tes memeriksa:
  - tidak ada overflow atau teks terpotong;
  - H1 terlihat;
  - CTA memindahkan fokus;
  - ilustrasi Cara kerja sampai ke langkah 3.

**Pengukuran dan uji tambahan** (skrip sementara di luar repo, pada build versi produksi):

- **Teks 200% di 390px**: tes sempat gagal karena tombol "Menu" keluar layar 59px. Setelah baris
  header boleh membungkus, overflow-nya 0 dan tombol berada di bawah lockup.
- **Uji negatif menu**: tanpa penutupan saat tautan dipilih, tes menu gagal karena menu tetap
  terbuka. Setelah kodenya dikembalikan, tes lulus lagi.
- **Uji negatif judul CTA**: dengan ukuran hero di HP, kasus teks 200% di 360px gagal (overflow 2px).
  Dengan ukuran section, kasus itu lulus.
- **Uji negatif dari versi pertama**: tes "skrip gagal dimuat" gagal ketika aturan penyembunyian
  dihapus sementara.
- **Font merek**: tidak punya glyph U+2011. Lebarnya berbeda tergantung font cadangan yang dipakai.
- **Tinjauan visual**: 390, 768, dan 1440px, terang dan gelap, menu terbuka, teks 200%, zoom 200%.
  Yang diperbaiki dari tinjauan itu:
  - kata ulang yang terpotong di tanda hubung;
  - penanda skenario yang belum rata di layar lebar;
  - kolom masalah yang terlalu sempit di 768px.
- **`impeccable detect`** pada build versi produksi (1280×800 dan 390×844): satu-satunya temuan
  adalah `cream-palette`, yaitu kanvas merek #F7F5F0 dari token app.

**Code review versi produksi** (`requesting-code-review`, sub-agen baca-saja dengan konteks bersih,
atas `35b4e47..d4f04c8`):

- Tidak ada temuan kritis. Setiap temuan dicek dulu terhadap kode, lalu ditindaklanjuti
  (`receiving-code-review`).
- Temuan penting yang diperbaiki:
  - judul CTA keluar layar di 360px dengan teks 200%; kini ada kasus 360px di tes teks 200%;
  - putaran otomatis membuat pembaca layar bicara tanpa diminta;
  - tes gerak dikurangi rawan gagal karena mengambil sampel fase yang hanya ±1 detik.
- Temuan minor yang diperbaiki:
  - tekanan sebelum autoplay tidak membatalkan autoplay;
  - nama tombol "Putar" ambigu di luar konteks;
  - nama aksesibel pratinjau tidak menyebut contoh;
  - celah tes: kata terlarang, ukuran tautan menu, menu di jendela zoom, dan ambang 60%;
  - komentar dan sisa kode yang usang, termasuk tujuan landing di `PRODUCT.md`;
  - tautan header yang boleh membungkus;
  - `figure` tanpa keterangan;
  - menu yang tetap terbuka saat fokus atau klik pindah keluar;
  - "Kabar-mu" menjadi "Kabarmu" seperti di app.
- Tidak diubah, karena sudah ada sebelum versi ini: setelah tautan menu dipakai di halaman 404
  (navigasi `next/link`), fokus tertinggal di `<body>`, bukan di judul section (lihat §7).

**Tinjauan versi pertama** (masih berlaku untuk bagian yang tidak berubah):

- **Kritik Impeccable**: 29/36, dengan kelima isu prioritas sudah ditangani di pass polish. Snapshot
  tersimpan di `.impeccable/critique/2026-10-22T21-49-33Z__src-app-page-tsx.md`.
- **Code review oleh sub-agen**: tanpa temuan kritis. Temuan yang valid sudah diperbaiki.
- Dua pertanyaan terbuka dari kritik untuk pemilik:
  - apakah layar hero sebaiknya menjadi demo;
  - apakah "memudar setelah setahun" layak menjadi klimaks.

## 7. Batas yang nyata

- **Deploy.** Menurut pemilik, `main` di-deploy otomatis oleh Vercel. Apakah domain
  `https://patepang.com` (tujuan `metadataBase` dan canonical) sudah tersambung tidak dicek dari
  lingkungan ini.
- **Isi yang belum ada di dunia nyata tetap tidak dikarang**:
  - testimoni, angka pengguna, dan rating;
  - kontak, media sosial, dan halaman legal;
  - tautan toko aplikasi, platform rilis, harga, dan tanggal rilis.

  Bila tersedia, isinya harus berasal dari pemilik.
- **Hanya Chromium 141 yang diuji.** Safari/WebKit dan Firefox tidak tersedia di lingkungan ini. Yang
  perlu dicek di sana:
  - `@media (scripting: none)`;
  - `text-wrap: pretty` dan `balance` (progresif);
  - `<details>` sebagai menu dan konten tertutupnya;
  - pita panggung dengan `box-shadow` dan `clip-path`;
  - `<summary>` yang memakai flex;
  - `role="list"` di VoiceOver.
- **Tidak ada perangkat nyata dan tidak ada pembaca layar nyata** (VoiceOver, TalkBack, NVDA).
  axe-core hanya menangkap sebagian masalah aksesibilitas; hasil di atas bukan klaim kepatuhan WCAG.
- **Zoom dan screenshot**:
  - Zoom 200% memakai pengaturan zoom Chromium yang sesungguhnya, tetapi di jendela headless.
  - Screenshot halaman yang di-zoom diambil per layar lewat DevTools Protocol.
  - Ukuran teks 200% di lebar HP memakai viewport emulasi, karena Chromium headless tidak membuka
    jendela yang lebih sempit dari 500px.
- **Lighthouse dan Core Web Vitals tidak diukur.** Angka di §4 adalah ukuran file.
- **Fokus setelah navigasi dari 404**: tautan header di halaman 404 memakai `next/link`. Setelah
  berpindah ke `/#section`, halaman menggulir ke section itu, tetapi fokus keyboard tetap di
  `<body>`.
- **Tes ilustrasi bergantung pada waktu** (fase 0,9 s dan 1,9 s) dan pada IntersectionObserver.
  Urutannya dicatat dari dalam halaman, dan batas tunggu tiap langkah 8 s; di mesin yang sangat
  sibuk, tes ini tetap yang paling peka.
- **Dependensi**:
  - Pengecualian umur rilis untuk `next` di `.npmrc` harus dihapus setelah 29 Oktober 2026.
  - `next dev` 16.4 menulis `AGENTS.md` di root repo bila mendeteksi agen AI. Bila tidak
    diinginkan, `agentRules: false` di `next.config.ts` mematikannya; itu keputusan pemilik.
- **Keputusan pemilik yang masih terbuka**: dua pertanyaan dari kritik di §6.
- **Referensi app**: `patepang/app` dibaca dari clone baca-saja di `/home/user/app`, di luar repo
  ini. Tidak ada file app yang diubah, di-install, atau di-build.

## 8. Revisi bertahap, mulai 30 Oktober 2026

Permintaan pemilik (30 Oktober 2026): Patepang dianggap sudah rilis ke publik, bukan lagi "segera
hadir". UI/UX diperbaiki secara mendalam tanpa redesign, satu section per putaran: header dulu,
lalu footer, hero, dan section lain. Setelah header selesai, hasilnya di-merge ke `main` untuk
dicek di deploy otomatis Vercel.

Jawaban pemilik atas dua pertanyaan di awal putaran:

- Tombol "Unduh Patepang" di header mengarah ke section penutup (`#unduh`). Tautan toko aplikasi
  dipasang di section itu setelah dikirim pemilik.
- Teks "Segera hadir" diganti sekarang, teksnya saja. Desain section lain menyusul sesuai urutan.

### 8.1 Teks status (teks saja)

| Tempat | Sebelum | Sesudah |
|---|---|---|
| Hero | "Segera hadir. Belum tersedia untuk diunduh." (ikon jam pasir) | "Sudah hadir. Tersedia untuk diunduh." (ikon centang) |
| Tanya jawab, "Kapan Patepang bisa dipakai?" | "Patepang segera hadir. Belum ada tanggal rilis, dan aplikasinya belum bisa diunduh." | "Sekarang. Patepang sudah bisa diunduh, dan koneksi pertamamu lahir saat kamu tempel dengan orang yang kamu temui berikutnya." |
| Section penutup | `#segera-hadir`, "Patepang segera hadir.", "Belum ada tanggal rilis. …" | `#unduh` (judulnya bisa menerima fokus), "Patepang sudah hadir.", "Pasang Patepang di HP-mu, lalu tempel dengan orang yang kamu temui berikutnya. Koneksi pertamamu lahir di pertemuan itu." Tombol toko belum ada. |
| Metadata description | "… Segera hadir." | "… Sudah bisa diunduh." |

Kata terlarang di tes kejujuran kini juga mencakup "segera hadir", "belum bisa diunduh", dan "belum
tersedia". Nama toko dan platform tetap dilarang sampai tautan toko diberikan.

### 8.2 Header

**Yang dibangun:**

- **Diam (atas halaman):** tanda dua titik di kiri (tanpa wordmark, permintaan pemilik), tombol
  "Unduh" (kapsul forest dengan ikon unduh) di kanan. Mulai 64em tautan section berada di tengah
  halaman (tiga kolom). Di antara 48em dan 64em tautan berdiri di samping tombol. Di bawah 48em
  hanya ada tanda, "Unduh", dan tombol menu bulat. Tinggi header 80px.
- **Mengambang (dengan JavaScript):** header menempel di atas jendela. Setelah halaman bergulir
  16px, kapsul berkumpul di sekitar baris: permukaan kaca, hairline, dan bayangan raised. Baris
  tidak bergerak naik atau turun, karena saat diam ia sudah berada di tempat kapsul akan
  memegangnya. Mulai 64em kapsulnya menjadi pulau selebar paling banyak 48rem, sehingga tanda dan
  tombol bergerak saling mendekat, seperti dua titik yang bertemu.
- **Presisi:** kontrol header berupa kapsul 36px di dalam target 48px. Kapsul header setinggi 56px
  dengan inset 10px, sehingga lengkungnya konsentris (18 + 10 = 28). Tanda (dua titik 16px, 32 ×
  16) duduk 20px dari ujung kapsul, juga konsentris (8 + 20 = 28). Cincin fokus memeluk bentuk yang
  terlihat pada jarak 2px, bukan target 48px-nya. Tanda dan tepi tombol sejajar dengan tepi kolom
  halaman. Jarak antar-kontrol diukur di antara kapsul yang terlihat, sehingga tetap sama pada
  ukuran teks berapa pun.
- **Section yang sedang dibaca:** section yang melintasi garis baca (38% tinggi jendela) ditandai
  `aria-current` pada tautannya, baik di baris maupun di menu. Di layar lebar, kapsul forest mist
  (gaya chip terpilih app) bergeser dari tautan ke tautan. Label tautan digandakan di bawah
  `clip-path` (lapisan `aria-hidden`), sehingga warna label berubah tepat di tepi kapsul yang
  bergeser. Dari "tidak ada" kapsulnya tumbuh dari tengah tautan, dan ke "tidak ada" ia menyusut ke
  tengah tautan yang ditinggalkan.
- **HP:** setelah halaman bergulir dua kali tinggi header, header mengambang menyingkir saat pembaca
  menggulir ke bawah. Header muncul lagi begitu pembaca menggulir ke atas 12px, saat fokus masuk ke
  header, atau saat menunya dibuka.
- **Menu, satu kartu (permintaan pemilik):** tombol bulat dengan nama "Menu" untuk pembaca layar.
  Ikon daftar berputar menjadi silang, dan lingkarannya terisi tinta saat menu terbuka. Bar dan
  tautannya menjadi satu kartu kaca. Kartu itu mulai persis sebagai kapsul di sekitar baris, lalu
  membuka ke bawah (`clip-path`, 300ms), dan tautannya naik satu per satu dengan jarak 30ms. Tanda,
  "Unduh", dan tombol tutup tetap di baris atas kartu dan tetap bisa ditekan. Selama menu terbuka
  header dianggap mengambang, jadi kartu selalu tumbuh dari kapsul yang sama, juga di atas halaman.
  Tautan berukuran title (22px), dan sudut barisnya konsentris dengan kartu (16 + 12 = 28). Sebelum
  `<details>` ditutup, kartu melipat kembali menjadi kapsul dengan lebih cepat (240ms). Section yang
  sedang dibaca ditandai di menu.
- **Tanda:** dua titik datang dari posisi berjauhan dan bertemu sekali saat halaman pertama tampil:
  jeda 220ms, gerak 300ms dengan kurva app. Gerak ini tidak pernah diulang. Animasinya CSS, jadi
  tidak butuh JavaScript.

**Keputusan dan penyimpangan:**

| Hal | Keputusan | Alasan |
|---|---|---|
| Header menempel | Header menempel dan mengambang hanya dengan JavaScript, dan hanya bila jendela setidaknya 20em lebar dan 32,5em tinggi. Tanpa JavaScript, dengan zoom 200%, atau dengan teks sangat besar, header diam di atas halaman seperti versi pertama. | Alasan versi pertama untuk tidak menempel (pada zoom 200% bar yang menempel menutupi terlalu banyak jendela) tetap dihormati. Karena syaratnya ditulis dalam em, header diam di kelima kasus zoom dan teks 200%, dan itu dites. |
| Breakpoint header dalam em | 48em untuk tautan sebaris, 64em untuk tiga kolom dan pulau, 20em × 32,5em untuk mengambang. | Breakpoint ikut ukuran teks pembaca: pada teks 200% header berpindah ke bentuk sempit sebelum ada yang bertabrakan. |
| Tanpa pergeseran | Semua gerak memakai `translate` dan `scale` pada kotak yang ukurannya tetap, dan tinggi header di alur halaman tidak pernah berubah. Area di sekitar kapsul tidak menangkap pointer. | Tanpa CLS dan tanpa lompatan gulir. Halaman di sekitar kapsul tetap bisa diklik. |
| Kapsul kaca | `--color-surface-glass` (overlay 88%) dengan `--filter-glass` (blur 20px). Kontras teks diukur terhadap benda terburuk yang bisa lewat di bawahnya: tinta di tema terang, dan panel kode yang tetap terang di tema gelap. `prefers-reduced-transparency` dan browser tanpa `backdrop-filter` mendapat kapsul padat. | Measured Pair Rule. |
| Tombol menu di atas kaca | Saat mengambang, cincin `border-strong` diganti lingkaran terisi `surface-pressed`. | Cincin tipis hanya 2,92:1 (terang) dan 2,30:1 (gelap) di atas kaca dalam kasus terburuk. Glyph di atas `surface-pressed` (diukur) sudah menamai kontrol. |
| Tanda tanpa wordmark | Header hanya memakai tanda dua titik (ukuran md, 16px; `TwoDots` dengan `snug`, kotaknya selebar titik yang bertemu). Tautannya bernama "Patepang" untuk pembaca layar. Lockup lengkap tetap di footer. | Permintaan pemilik di tengah putaran (30 Oktober 2026): header cukup ikon, seperti situs pada umumnya. Dicatat di `PRODUCT.md`. |
| Label tombol unduh | "Unduh" di semua lebar. Nama aksesibel "Unduh Patepang" (`aria-label`, memuat kata yang terlihat). | Pemilik tidak ingin teks "patepang" di header. Baris juga muat di 768px (dengan label penuh, baris membungkus). |
| Menu satu kartu | Panel menu adalah kartu kaca yang dimulai di kapsul dan memuat baris header. Di urutan tumpuk bar, ia berada di atas kapsul dan di bawah kontrol baris. | Permintaan pemilik: header dan tautan sebelumnya terlihat seperti dua kartu. |
| Tombol menu tanpa teks terlihat | "Menu" tetap ada untuk pembaca layar (tes mencari teks itu). | Agar tanda, tombol unduh, dan menu muat satu baris di 360px dengan ruang lega. |
| Gerak | Durasi dari token: masuk 300ms, keluar 240ms, tekan 120ms, kurva ease-out app, tanpa loop. Gerak dikurangi: tidak ada perpindahan, putaran, atau skala. Kapsul dan kartu menu memudar 120ms, header yang menyingkir memudar, dan dua titik langsung bertemu. | DESIGN.md (gerak) dan brief. |
| `scroll-padding-top` | Saat header bisa mengambang, nilainya kapsul ditambah 24px (92px). | Judul tujuan anchor dan elemen yang difokus berhenti di bawah kapsul, bukan di bawahnya (dites lewat titik hit pada judul `#unduh`). |
| Token baru (web) | `--header-control`, `--header-capsule`, `--header-capsule-top`, `--color-surface-glass`, `--filter-glass`, dan `--motion-stagger` di bagian web-only `tokens.css`. | Tanpa nilai mentah di komponen. Token ini masuk DESIGN.md setelah disetujui pemilik. |

**Verifikasi putaran ini** (Node 22.22.0, pnpm 10.34.6, Playwright 1.56.1):

- Chromium di lingkungan ini adalah Chrome for Testing 153 (build 1243), bukan build 1194 yang
  dipin Playwright 1.56.1. Untuk menjalankan suite, `PLAYWRIGHT_BROWSERS_PATH` diarahkan ke folder
  sementara di luar repo, yang menautkan nama build 1194 ke build 1243. Tidak ada file repo yang
  diubah untuk itu.
- `pnpm typecheck`, `pnpm lint`, dan `pnpm format:check` lulus.
- `pnpm check:contrast`: 74 dari 74 pasangan lulus (37 × 2 tema). Ada tujuh pasangan baru untuk
  header, empat di antaranya di atas kaca dalam kasus terburuk. Pasangan "tautan menu di atas
  overlay" diganti "tautan di kartu menu kaca".
- `pnpm test:e2e`: 32 dari 32 lulus, 29 tes lama (disesuaikan) dan 3 tes baru:
  - header mengambang, menempel di atas jendela, dan menandai Fitur, Cerita, lalu Cara kerja
    (tautan baris dan menu), lalu kembali diam di atas halaman;
  - di HP header tetap terlihat di dekat atas, menyingkir saat pembaca menggulir ke bawah, kembali
    saat pembaca menggulir ke atas, dan kembali saat fokus keyboard masuk;
  - dua titik tanda header bertemu sekali (satu iterasi, lalu tidak ada animasi yang berjalan),
    dan dengan gerak dikurangi tidak ada animasi titik maupun transisi header.

  Tes lama yang diperluas:
  - urutan fokus kini memuat "Patepang" (tanda) dan "Unduh Patepang";
  - di 768px lockup, tautan, dan tombol berada di satu baris;
  - di HP tombol unduh selalu terlihat;
  - tombol unduh header memindahkan fokus ke `#unduh` tanpa tertutup header;
  - tanpa JavaScript header tidak menempel;
  - di kelima kasus zoom dan teks 200% header tidak menempel.
- Uji negatif: tanpa `data-hidden` dan tanpa penandaan section, kedua tes baru gagal. Setelah kode
  dikembalikan, keduanya lulus lagi.
- Tinjauan visual pada 360, 390, 768, 1024, 1280, dan 1440px, terang dan gelap, menu terbuka,
  gerak yang diperlambat 10× (dua titik, kapsul berkumpul, penanda bergeser, menu membuka dan
  menutup), fokus keyboard, gerak dikurangi, tanpa JavaScript, teks 200% (390 dan 1440px), serta
  zoom 200% (ditangkap lewat DevTools Protocol). Yang diperbaiki dari tinjauan itu:
  - baris header membungkus di 768px;
  - tombol menu tetap 36px di samping tombol unduh yang membesar pada teks 200%;
  - jarak antar-kontrol hilang pada teks 200%;
  - header di HP langsung menyingkir sebelum kapsulnya sempat terlihat.

  Atas permintaan pemilik di tengah putaran, logo header menjadi tanda dua titik saja, label tombol
  menjadi "Unduh", dan menu menjadi satu kartu dengan header. Semua pemeriksaan di atas dijalankan
  ulang setelah perubahan itu.
- Catatan tes tanpa JavaScript: Playwright tidak bisa menunggu panel yang sedang membuka sampai
  diam sebelum mengklik, karena pemeriksaan stabilitasnya butuh skrip halaman (sama di Playwright
  1.63). Bagian menu HP di tes itu memakai gerak dikurangi. Di browser sungguhan tautannya langsung
  bisa ditekan.

### 8.3 Footer (putaran kedua, 30 Oktober 2026)

**Yang dibangun:**

- **Isi tetap, susunannya baru:** kalimat merek "Hanya orang yang pernah kamu temui." (ukuran
  section), tautan section, wordmark, lalu baris terakhir dengan "© 2026 Patepang" dan "Kembali ke
  atas". Tetap hanya tujuan yang sungguh ada: belum ada kontak, akun media sosial, atau halaman
  legal.
- **Wordmark selebar kolom:** "patepang" (Bold, warna merek) tintanya tepat selebar kolom halaman
  di semua lebar, dari 71px di 360px sampai 302px di 1440px. Ukurannya `100cqw / 4.497` (kolom
  sebagai container), dengan margin yang menarik kotak ke tinta. Angkanya diukur dari render
  halaman sendiri pada 1000px, karena `measureText` canvas membulatkan batas glyph di beberapa
  ukuran (0,047em, padahal yang tergambar 0,061em). Wordmark berdiri 24px di atas hairline baris
  terakhir. Ia `aria-hidden`; namanya terbaca di baris terakhir.
- **Grid:** mulai 48em, kalimat menempati kolom 1–7 dan tautan satu kolom di kolom 9–12, dengan
  label pertama sejajar puncak kalimat. Di HP tautan dua kolom, dan satu kolom di bawah 20em
  (teks sangat besar), supaya tiap label tetap satu baris.
- **Kontrol:** tautan dan "Kembali ke atas" memakai bahasa header: kapsul 36px di dalam target
  48px, dengan permukaan pressed saat hover atau tekan, dan cincin fokus yang memeluk kapsul.
  Labelnya sejajar tepi kolom, dan targetnya tetap di dalam gutter tersempit (20px). Panah
  "Kembali ke atas" naik 2px saat hover, dan tombolnya mengecil 0,97 saat ditekan.
- **Tanpa gerak saat digulir** (janji kepada pemilik): footer diam, dan hanya kontrolnya yang
  merespons. Dengan gerak dikurangi, panah tidak bergerak dan tekan tidak mengecilkan.

**Keputusan dan penyimpangan:**

| Hal | Keputusan | Alasan |
|---|---|---|
| Logo di halaman | Header memakai tanda dua titik saja (permintaan pemilik), footer menutup dengan wordmark saja. Lockup bertumpuk lengkap kini tidak tampil di halaman, tetapi tetap logo resmi. | Bersama-sama keduanya membentuk lockup: halaman dibuka dengan dua titik dan ditutup dengan namanya. Ukuran titik di design system (12, 16, 28px) tidak bisa mengikuti wordmark raksasa. Dicatat di `PRODUCT.md`; pemilik bisa memintanya kembali. |
| Ukuran wordmark | Lebih besar dari batas display biasa (6rem). | Wordmark diperlakukan sebagai tanda merek, bukan judul, dan tetap `aria-hidden`. Ukurannya mengikuti kolom, bukan teks pembaca, sehingga tidak meluap pada teks 200%. |
| Hairline atas footer | Dihapus. | Pita mist section penutup sudah memisahkan footer. |

### 8.4 Seluruh halaman (putaran kedua)

- **Tanpa scrollbar** (permintaan pemilik: "efek scroll yang di kanan, yang abu-abu"):
  `scrollbar-width: none` dan `::-webkit-scrollbar { display: none }` pada halaman dan daftar menu.
  Halaman tetap bisa digulir dengan roda, trackpad, sentuhan, dan keyboard (dites).
- **Tanpa efek biru saat klik** (permintaan pemilik): `-webkit-tap-highlight-color: transparent`
  untuk semua `a`, `button`, dan `summary` di `globals.css`, menggantikan deklarasi per komponen.
  Klik mouse dan ketukan tidak pernah menampilkan cincin fokus (dites pada tautan header, tombol
  unduh, pertanyaan FAQ, tombol "Putar", "Kembali ke atas", menu HP, dan tautan menu). Cincin
  biru tetap muncul untuk navigasi keyboard, sesuai WCAG 2.4.7 dan design system.
- **`#atas` kini penanda kosong di puncak halaman, bukan header.** Header yang menempel selalu
  terlihat, jadi browser tidak menggulir ke sana. Akibatnya, sejak putaran header, "Kembali ke
  atas" dan tanda di header tidak membawa pembaca ke atas. Ini ditemukan oleh tes footer yang baru,
  dan kini dites: keduanya menggulir ke 0, dan fokus mendarat di penanda itu.
- Perilaku header di HP (menyingkir saat menggulir ke bawah) tidak diubah. Pemilik menjelaskan
  bahwa yang dimaksud "efek scroll" adalah scrollbar.

**Verifikasi putaran kedua:**

- `pnpm check:contrast`: 74 dari 74 pasangan lulus. Footer memakai pasangan yang sudah diukur.
- `pnpm test:e2e`: 35 dari 35 lulus, termasuk 3 tes baru:
  - klik dan ketukan tidak meninggalkan cincin fokus, keyboard menampilkannya, dan semua kontrol
    tanpa warna tap;
  - scrollbar tidak digambar, dan halaman tetap bergulir;
  - tepi tinta wordmark, diukur dari piksel layar, sejajar tepi kolom (selisih < 1px) di 360, 768,
    dan 1440px, lalu "Kembali ke atas" dan tanda header membawa ke atas walaupun header
    mengambang.
- Kegagalan nyata selama pengembangan menunjukkan tes ini menangkap masalahnya: angka canvas
  membuat tinta meleset 1,7 sampai 4,5px dari tepi kolom, dan target `#atas` di header membuat
  halaman tetap di bawah (`scrollY` 6052).
- Tinjauan visual footer di 360, 390, 768, 1024, 1440, dan 1920px, terang dan gelap, hover,
  fokus keyboard, dan teks 200%. Yang diperbaiki dari tinjauan itu:
  - baris terakhir 12px lebih lebar dari kolom karena wordmark;
  - overflow 2px di HP karena target "Kembali ke atas";
  - "Tanya jawab" terpotong dua baris pada teks 200%.

### 8.5 Hero (putaran ketiga, 30 Oktober 2026)

Permintaan pemilik: hero "se-eksklusif mungkin", tetap sebagai perbaikan, bukan redesign. Judul,
lede, layar Tempel, dan isi ketiga catatan tidak berubah. Yang berubah adalah aksinya, bingkai HP,
gerak, dan ketepatan susunannya.

**Yang dibangun:**

- **Dua aksi, yang utama untuk mendapatkan Patepang:**
  - "Unduh Patepang" (tombol utama besar dengan ikon unduh) ke `#unduh`;
  - "Lihat cara kerja" (tombol ghost dengan panah ke bawah) ke `#cara-kerja`.

  Panahnya turun 2px saat pointer ada di atasnya. Baris status "Sudah hadir. Tersedia untuk
  diunduh." (§8.1) dihapus, karena tombol utama sudah mengatakannya. "Jelajahi fitur" kini hanya
  ada di section penutup. Di HP kedua aksi selebar kolom.
- **HP sungguhan:** layar Tempel kini dipegang bingkai HP:
  - bezel 12px yang gelap di kedua tema (`--color-device`), dengan hairline cahaya di tepi luarnya;
  - lengkung konsentris (56 di luar, 44 di dalam);
  - pulau kamera dan status bar (09.41, sinyal, Wi-Fi, baterai; ikon Phosphor).

  Bingkainya tanpa tepi bawah, dan dipotong tepat di tepi bawah panggung, bayangannya juga. HP
  terbaca seperti berdiri di panggung dan berlanjut ke bawahnya. Hanya pola kode yang terpotong;
  tidak ada teks yang terpotong.
- **Catatan sejajar dengan bagian layarnya, pada ukuran teks berapa pun:** mulai 48em, baris
  panggung adalah enam bagian layar: status bar, header app, kartu, judul, dua titik, dan kode.
  Baris itu diteruskan ke HP dan layarnya dengan `subgrid`, berjarak 16px seperti di layar. Tiap
  catatan duduk di baris bagiannya, dan baris pertamanya berpusat pada satu baris bagian itu:
  - judul kartu "Akunmu lahir saat tempel pertama";
  - baris pertama "sebelum pamit, tempel dulu";
  - tengah kotak sudut atas pola kode.

  Garis penunjuk berjalan dari catatan tepat sampai bingkai HP. Hasil ukur: selisih paling besar
  0,1px, di lebar 768 sampai 2560px dan teks 100 sampai 200%. Catatan yang lebih tinggi dari
  bagiannya menambah tinggi baris terakhir, sehingga layar memperlihatkan lebih banyak kode. Di
  bawah catatan terakhir selalu tersisa minimal 32px panggung.
- **Satu pembukaan, sekali saja:**
  - saat halaman dibuka, HP naik 96px dari panggung (300ms, setelah jeda 120ms);
  - lalu, dalam urutan layar dan berjarak 120ms, garis tiap catatan ditarik dari HP (240ms);
  - bagian layarnya menyala sebentar: cincin forest di kartu dan kode, tinta forest di judul;
  - catatannya muncul (220ms).

  Semuanya selesai dalam 1,6 detik dan tidak pernah diulang. Di bawah 48em catatan ada di bawah
  panggung, jadi yang bergerak hanya HP. Dengan gerak dikurangi tidak ada yang bergerak. Semuanya
  CSS, tanpa JavaScript, dan tanpa pergeseran tata letak (`translate`, `scale`, dan opasitas).
- **Catatan dan bagiannya terhubung:** pointer di atas catatan menyalakan bagian layar yang
  dijelaskannya, dengan warna saja.

**Keputusan dan penyimpangan:**

| Hal | Keputusan | Alasan |
|---|---|---|
| Aksi utama | "Unduh Patepang" ke `#unduh`, sama dengan header. | Produknya sudah hadir (§8). Tautan toko belum ada, jadi aksi ini membawa ke section penutup, tempat tombol toko akan dipasang. |
| Breakpoint hero dalam em | 37,5em (di bawahnya aksi selebar kolom), 48em (catatan di samping HP), dan 80em (judul dan lede berdampingan, catatan di kedua sisi HP). Sebelumnya 600, 720, dan 1280px. | Sama dengan header dan footer: pada teks besar, susunan sempit dipakai lebih lama. Pada teks 200% di jendela 1440px, judul tidak lagi terjepit lima baris di samping lede, dan catatan berada di bawah HP. |
| Penyelarasan dengan `subgrid` | Keenam bagian layar adalah anak langsung bingkai HP: pembungkus `code` dihapus, dan bezel berupa `border`, sehingga satu tingkat subgrid cukup. | Sebelumnya posisi catatan berupa margin dan padding piksel yang disetel di ukuran teks bawaan. Pada teks 150 sampai 200%, garisnya menunjuk bagian yang salah. Kini kesejajarannya bagian dari tata letak, bukan angka. |
| Lebar catatan dalam rem | 20rem, dan 18rem mulai 80em. | Jumlah kata per baris tetap saat teks membesar. |
| Cincin kartu kode | Token web baru `--color-code-ring` (forest.700 di kedua tema). | Kartu kode terang di kedua tema; mint dari tema gelap hanya sekitar 1,8:1 di atasnya. Hasil ukur: 7,42:1. |
| Token baru (web) | `--color-device`, `--color-device-edge`, dan `--color-code-ring` di bagian web-only `tokens.css`. | Masuk DESIGN.md setelah disetujui pemilik, seperti token header. |

**Verifikasi putaran ketiga:**

- `pnpm check:contrast`: 76 dari 76 pasangan lulus, termasuk cincin kartu kode (baru). Tiga label
  pasangan lama kini juga menyebut pemakaian di hero.
- `pnpm test:e2e`: 41 dari 41 lulus, termasuk 6 tes baru:
  - HP naik sekali, catatan menyusul di layar lebar, di HP hanya HP yang naik, dan dengan gerak
    dikurangi tidak ada animasi; setelah itu tidak ada yang berjalan lagi;
  - pointer di atas tiap catatan menyalakan bagiannya, di tema terang dan gelap;
  - di 768, 1024, dan 1440px: HP rata dengan tepi panggung, garis tiap catatan menyentuh bingkai
    HP dan selisihnya dari baris bagiannya di bawah 1px, dan tersisa minimal 32px panggung di bawah
    tiap catatan;
  - hal yang sama pada teks 150% di jendela 1440px (setelan browser sungguhan).

  Tes lama yang disesuaikan:
  - aksi utama hero menuju `#unduh`, dan judul "Patepang sudah hadir." ada (menggantikan baris
    status);
  - kedua aksi hero, kedua aksi penutup, dan tombol unduh header memindahkan fokus ke judul tujuan,
    yang tidak tertutup header;
  - urutan fokus: setelah header, "Unduh Patepang" dan "Lihat cara kerja" dari hero.
- Uji negatif: catatan "Hanya saat bertemu langsung" digeser 8px, dan keempat tes kesejajaran
  gagal ("face", selisih 8px). Setelah kode dikembalikan, semuanya lulus lagi.
- Tinjauan visual pada 360, 390, 768, 1024, 1280, 1440, dan 1920px, terang dan gelap, dengan:
  - pembukaan yang diperlambat 5×, pointer di atas tiap catatan, dan gerak dikurangi;
  - teks 200% di 390, 768, 1024, dan 1440px.

  Yang diperbaiki dari tinjauan itu:
  - di 720px catatan meluap dan catatan "face" tidak sejajar, jadi catatan berdiri di samping HP
    mulai 48em;
  - di 768px HP berakhir 8px di atas tepi panggung, karena catatannya lebih tinggi dari HP;
  - di 768px catatan terakhir menyentuh tepi panggung;
  - pada teks 150 sampai 200% garis menunjuk bagian yang salah;
  - cincin kartu kode di tema gelap hanya sekitar 1,8:1.

### 8.6 Masalah (putaran keempat, 30 Oktober 2026)

Permintaan pemilik setelah putaran hero: "Ingat ini proyek jadi! Jangan cuma kumpulan teks saja!"
Tata letak, ukuran huruf, jarak, gerak, animasi, dan ilustrasi harus digarap di setiap section,
bukan kumpulan teks. Sebelumnya Masalah hanya berisi judul, lede, dan tiga paragraf. Judul, lede,
dan teks ketiga masalah tidak berubah.

**Yang dibangun:**

- **Satu pertemuan, setelah pamit:** di bawah judul, pita pasir (`surface-sunken`) memuat sebuah
  rel waktu:
  - dimulai dari dua titik yang bersentuhan, "Hari kalian bertemu";
  - lalu tiga titik di rel: "Seminggu kemudian", "Sebulan kemudian", dan "Setahun kemudian";
  - di tiap titik, sebuah gambar dan masalahnya (judul dan teks yang sama seperti sebelumnya).

  Pita pasir adalah panggung netral halaman: panggung forest menunjukkan Patepang, sedangkan
  panggung pasir menunjukkan keseharian tanpa Patepang.
- **Pertemuan yang sama dengan pratinjau di bawahnya:** gambarnya memakai Sari dari
  `content/fiction.ts`, pertemuan di kedai kopi dekat stasiun pada 3 Mar 2025. Di Masalah,
  pertemuan itu memudar. Di Fitur, Patepang menyimpannya (momen, riwayat, rencana bertemu lagi).
- **Tiga gambar dari alat sehari-hari, dalam nada netral halaman** (permukaan pratinjau, hairline,
  ikon Phosphor). Tidak ada layar Patepang dan tidak ada produk sungguhan yang ditiru:
  - **Kontak:** nama dan nomor tersimpan, "Catatan" kosong, dan "Yang kamu ingat" berisi kedai
    kopi, tanggal, dan obrolan soal buku. Ingatan itu memudar dan kabur, tinggal garis putus-putus.
  - **Beranda:** lima unggahan ("Disarankan untukmu", "Bersponsor", "Mungkin kamu kenal",
    "Sedang ramai") datang satu per satu di atas unggahan Sari. Unggahan Sari terdorong ke bawah
    sampai hanya namanya yang terlihat.
  - **Pesan:** obrolan hari itu ("Senang ketemu tadi!", "Sama-sama! Kapan-kapan ketemu lagi, ya.",
    "Iya, kapan-kapan."), lalu "Pesan terakhir" yang menua dari "hari ini" sampai "setahun lalu".
- **Gerak yang mengikuti guliran** (CSS scroll-driven animations, tanpa JavaScript):
  - **HP dan tablet:** rel turun di kiri. Titik kedua mengikuti tengah jendela, tepat (selisih di
    bawah 1px), dan memudar sampai 40%. Tiap gambar berjalan saat naik dari bawah jendela ke
    tengahnya.
  - **Mulai 64em:** rel melintang di atas tiga kolom. Titik kedua menyeberanginya saat cerita
    masuk ke jendela, dan ketiga gambar berjalan berurutan saat titik itu lewat. Saat cerita
    terlihat utuh, semuanya sudah selesai.
  - Gerak ini berjalan mundur saat pembaca menggulir kembali ke atas.
  - Dengan gerak dikurangi, atau di browser tanpa scroll-driven animations, tidak ada yang
    bergerak, dan tiap gambar langsung menunjukkan akhir ceritanya.
- **Untuk pembaca layar:** gambar disembunyikan (`aria-hidden`), sehingga yang terbaca hanya
  daftar berurutan: label waktu, judul masalah, dan teksnya.

**Keputusan dan penyimpangan:**

| Hal | Keputusan | Alasan |
|---|---|---|
| Ilustrasi | Gambar dirakit dari bagian design system (permukaan, avatar, hairline, kapsul, ikon Phosphor) dan motif dua titik, tanpa gambar bitmap. | Permintaan pemilik akan ilustrasi. Hanya Plus Jakarta Sans dan Phosphor yang dipakai, tidak ada layar Patepang yang dikarang, dan tidak ada merek lain yang ditiru. |
| Dua titik yang menjauh | Motif dipakai terbalik: titik kedua menjauh dan memudar. | Ini masalahnya, kebalikan dari "dua titik bertemu" yang muncul lagi di Cara kerja. Apricot tetap hanya titik kedua. |
| Gerak mengikuti guliran | Bukan animasi sekali jalan berdasarkan waktu, melainkan progres yang ditentukan posisi gulir. Tidak berulang sendiri dan tidak ada durasi. | Cerita tentang waktu yang berlalu berjalan dengan kecepatan pembaca, dan tidak ada yang terlewat bila pembaca menggulir cepat atau membuka halaman di tengah. Ini perluasan web dari aturan gerak; masuk DESIGN.md setelah disetujui pemilik. |
| `view-timeline-inset: 0` | Timeline cerita memakai seluruh jendela. | Bawaannya mengecualikan `scroll-padding` halaman (92px untuk header mengambang), sehingga titik mendahului tengah jendela sekitar 40px. Ini ditemukan oleh tes. |
| Keadaan akhir sebagai dasar | Gaya dasar adalah akhir cerita; keyframe hanya menyebut awalnya. | Tanpa dukungan atau dengan gerak dikurangi, halaman tetap utuh dan bercerita. |
| Breakpoint dalam em | 48em (gambar di samping teks) dan 64em (tiga kolom). | Sama dengan header, footer, dan hero. Pada teks 200% di jendela 1440px dipakai susunan bertumpuk. |

**Verifikasi putaran keempat:**

- `pnpm check:contrast`: 80 dari 80 pasangan lulus. Ada dua pasangan baru:
  - teks utama di atas pita pasir (judul masalah dan gelembung pesan sendiri);
  - rel dan titik-titiknya di atas pita pasir (3,18:1 terang, 4,23:1 gelap).
- `pnpm test:e2e`: 44 dari 44 lulus, termasuk 3 tes baru:
  - yang sampai ke pembaca layar hanya daftar tiga momen (label waktu, judul, teks), tanpa isi
    gambar (snapshot ARIA);
  - di 1440px, sebelum cerita terlihat, dua titik masih bersentuhan, ingatan masih utuh, unggahan
    Sari di atas, dan pesan terakhir "hari ini". Saat cerita terlihat utuh, titik ada di ujung
    rel dan memudar ke 40%, ingatan hilang, unggahan Sari terlihat 32px, dan pesan terakhir
    "setahun lalu". Saat digulir kembali ke atas, cerita mundur. Dengan gerak dikurangi, keadaan
    akhir langsung tampil dan tidak ada animasi;
  - di HP titik kedua mengikuti tengah jendela (selisih di bawah 1px di 25, 50, dan 75%).
- Dua tes lama kini mengukur halaman yang sudah diam. Keduanya sesekali gagal karena waktu
  pengukuran, bukan karena halamannya:
  - tes axe menunggu pembukaan hero selesai; sebelumnya catatan hero yang masih memudar kadang
    terukur sebagai kontras rendah;
  - tes target 48px di 360px menunggu header selesai bergeser setelah menu dibuka; di tengah
    gesernya, tombol menu 48px kadang terukur 47,99px.
- Uji negatif: dengan blok gerak dimatikan, kedua tes gerak gagal, dan tes struktur tetap lulus.
  Percobaan pertama memakai syarat `@supports` yang ternyata tetap benar, karena Chromium ini
  membaca `--nama(1)` sebagai fungsi kustom CSS. Percobaan kedua memakai nilai yang tidak sah.
- Detektor desain: tidak ada temuan pada berkas Masalah. Di halaman hanya ada `cream-palette`
  (kanvas merek, disengaja).
- Tinjauan visual: 360, 390, 768, 1024, dan 1440px, terang dan gelap, bingkai gerak di beberapa
  posisi gulir (desktop dan HP), gerak dikurangi, dan teks 200% (390 dan 1440px). Yang diperbaiki
  dari tinjauan itu:
  - unggahan di atas Sari kurang satu, sehingga unggahannya masih utuh;
  - kartu kontak kosong di tengah, lalu diisi bidang "Seluler" dan "Catatan" dengan kepala yang
    berpusat;
  - di 1024px kartu Beranda meregang dan menyisakan ruang kosong di bawah potongannya, sehingga
    Beranda dijadikan kartu tertinggi;
  - judul satu baris terpisah dari teksnya karena baris grid bersama;
  - obrolan diberi tanggal hari itu (3 Mar 2025).

### 8.7 Belum dikerjakan

- `docs/screenshots/` belum dibuat ulang, jadi gambarnya masih versi pra-rilis. Gambar akan dibuat
  ulang di akhir revisi bertahap, supaya ±6 MB gambar biner tidak ditulis ulang di setiap putaran.
  `tests/screenshots.spec.ts` sudah menunjuk `#unduh`.
- Section penutup belum punya tombol toko, karena tautannya belum ada.
- Section berikutnya menunggu putaran masing-masing, dengan standar yang sama (permintaan pemilik
  di §8.6): Cara kerja, Fitur, Cerita, Tanya jawab, dan section penutup.
- Hanya Chromium yang diuji. Yang perlu dicek di Safari dan Firefox:
  - `backdrop-filter`, `subgrid`, `:has()`, dan `color-mix()`;
  - properti `translate`/`scale`, unit `cqw`, dan `clip-path` dengan `round`;
  - scroll-driven animations di Masalah (Firefox mendapat keadaan akhir tanpa gerak);
  - `prefers-reduced-transparency`, `scrollbar-width`, dan animasi tutup `<details>`.
