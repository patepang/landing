---
name: Patepang
description: Hanya orang yang pernah kamu temui.
colors:
  ivory-canvas: "#F7F5F0"
  warm-white: "#FFFEFB"
  sand-well: "#EFECE5"
  sand-hairline: "#E3DFD6"
  charcoal-ink: "#22201C"
  ink-secondary: "#57524A"
  ink-tertiary: "#6E685E"
  stone-border: "#8A8378"
  forest-teal: "#1F5F4F"
  forest-teal-pressed: "#184B3E"
  forest-mist: "#E2EEE9"
  forest-on-mist: "#1A5244"
  apricot-dot: "#E7956C"
  brick-memory: "#A0461E"
  apricot-wash: "#FBE8DB"
  brick-on-wash: "#86391A"
  focus-blue: "#245C8F"
  amber-warning: "#7A5200"
  amber-wash: "#FBEFD3"
  white: "#FFFFFF"
  night-canvas: "#141513"
  night-surface: "#1C1E1B"
  night-overlay: "#242723"
  night-pressed: "#30332F"
  night-ink: "#F2EFE8"
  night-ink-secondary: "#C5C0B5"
  night-ink-tertiary: "#A39E93"
  night-border: "#74786F"
  mint: "#7FCDB4"
  mint-pressed: "#9AD9C5"
  mint-on: "#0C2620"
  night-forest: "#1C3029"
  night-mint-on: "#A5DDCB"
  night-apricot-text: "#F1A47C"
  night-focus-blue: "#8DBDEB"
  night-amber-warning: "#F0C468"
  night-amber-wash: "#2E2716"
  night-hairline: "#30332F"
typography:
  display:
    fontFamily: "Plus Jakarta Sans, system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Arial, sans-serif"
    fontSize: "36px"
    fontWeight: 700
    lineHeight: "44px"
    letterSpacing: "-0.72px"
  title-large:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    lineHeight: "36px"
    letterSpacing: "-0.42px"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "22px"
    fontWeight: 600
    lineHeight: "28px"
    letterSpacing: "-0.22px"
  headline:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 600
    lineHeight: "24px"
    letterSpacing: "-0.09px"
  body-large:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "18px"
    fontWeight: 400
    lineHeight: "28px"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: "24px"
  body-strong:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "24px"
  body-small:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: "20px"
  label:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
    lineHeight: "20px"
  label-small:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 600
    lineHeight: "20px"
    letterSpacing: "0.07px"
  caption:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: "16px"
    letterSpacing: "0.12px"
rounded:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "20px"
  xxl: "28px"
  full: "9999px"
spacing:
  "1": "4px"
  "2": "8px"
  "3": "12px"
  "4": "16px"
  "5": "20px"
  "6": "24px"
  "8": "32px"
  "10": "40px"
  "12": "48px"
  "16": "64px"
components:
  button-primary:
    backgroundColor: "{colors.forest-teal}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    height: "48px"
  button-primary-pressed:
    backgroundColor: "{colors.forest-teal-pressed}"
    textColor: "{colors.white}"
    rounded: "{rounded.full}"
  button-primary-large:
    backgroundColor: "{colors.forest-teal}"
    textColor: "{colors.white}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "16px 32px"
    height: "56px"
  button-secondary:
    textColor: "{colors.charcoal-ink}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    height: "48px"
  button-ghost:
    textColor: "{colors.forest-teal}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    padding: "12px 24px"
    height: "48px"
  chip:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label-small}"
    rounded: "{rounded.full}"
    padding: "8px 12px"
    height: "36px"
  chip-selected:
    backgroundColor: "{colors.forest-mist}"
    textColor: "{colors.forest-on-mist}"
    typography: "{typography.label-small}"
    rounded: "{rounded.full}"
  card:
    backgroundColor: "{colors.warm-white}"
    textColor: "{colors.charcoal-ink}"
    rounded: "{rounded.xl}"
    padding: "16px"
  card-brand:
    backgroundColor: "{colors.forest-mist}"
    textColor: "{colors.forest-on-mist}"
    rounded: "{rounded.xl}"
    padding: "20px"
  card-memory:
    backgroundColor: "{colors.apricot-wash}"
    textColor: "{colors.brick-on-wash}"
    rounded: "{rounded.xl}"
    padding: "16px"
  fading-strip:
    backgroundColor: "{colors.amber-wash}"
    textColor: "{colors.amber-warning}"
    typography: "{typography.body-small}"
    padding: "12px 16px"
---

# Design System: Patepang

<!-- Sumber: design system patepang/app @ 262202fa7866d268ba1f74258d47e7b19515df89
     (src/design-system/tokens/*.ts, DESIGN_SYSTEM.md, docs/adr/0002-arah-visual-dan-gerak.md).
     File ini mendokumentasikan sistem yang sudah ada untuk dipakai di web; ia tidak menggantinya.
     Nilai dp di aplikasi = px CSS. Perluasan khusus landing dicatat di docs/landing-plan.md dan baru
     masuk ke sini setelah dibangun dan disetujui. -->

## Overview

**Creative North Star: "Dua Titik Bertemu"** _(usulan; menunggu konfirmasi pemilik)_

Patepang tampil seperti pertemuan yang tenang: ruang lega di atas kanvas ivory hangat, tinta
charcoal yang hangat, dan satu hijau hutan yang dalam untuk apa pun yang bisa dilakukan. Bentuknya
presisi, dengan grid 4 titik, tinggi baris kelipatan 4, dan radius bertingkat. Hangatnya datang dari
nada warna dan kalimat, bukan dari dekorasi. Motif intinya adalah dua titik, satu hijau dan satu
apricot, yang bergerak saling mendekat lalu bertemu sekali dan tidak berulang. Itulah pertemuan
yang menjadi alasan Patepang ada.

Sistem ini sengaja menolak mekanisme keterlibatan: tidak ada angka yang memancing, tidak ada feed
tanpa akhir, dan gerak tidak pernah berputar tanpa akhir. Rasa betah datang dari rasa nyaman,
bermakna, dan mudah dipahami. Sistem ini juga sengaja tidak memakai pasangan krem `#F4F1EA` dan
terakota `#D97757` yang kini menjadi ciri desain generik: mereknya hijau, dan apricot dijaga untuk
kenangan.

**Key Characteristics:**

- Kanvas ivory hangat dan tinta charcoal hangat, bukan putih murni dan hitam murni.
- Satu warna merek, hijau hutan, untuk aksi, tautan, dan kontrol aktif.
- Apricot dan bata hanya untuk kenangan.
- Satu keluarga huruf, Plus Jakarta Sans, dalam empat bobot.
- Semua yang ditekan jari berbentuk kapsul.
- Pemisahan lewat nada warna dan garis tipis; bayangan hanya untuk yang mengambang.
- Gerak pendek yang menjelaskan, sekali jalan, dan menghormati gerak dikurangi.

## Colors

Netral hangat dengan satu merek hijau dan satu aksen yang dijatah untuk kenangan.

### Primary

- **Forest Teal** (`forest-teal`): aksi utama, tautan, kontrol aktif, dan titik pertama motif.
  Saat ditekan menjadi `forest-teal-pressed`. Di tema gelap perannya diambil **Mint** (`mint`), dengan
  teks di atasnya `mint-on`.
- **Forest Mist** (`forest-mist`) dengan teks `forest-on-mist`: latar ajakan dan chip terpilih, serta
  panggung pratinjau ritual tempel.

### Secondary

- **Apricot Dot** (`apricot-dot`): titik kedua motif. Hanya dekoratif, tidak pernah membawa teks.
- **Brick Memory** (`brick-memory`) di atas **Apricot Wash** (`apricot-wash`), dengan teks lencana
  `brick-on-wash`: kenangan, yaitu momen dan "Setahun lalu hari ini".

### Tertiary

- **Focus Blue** (`focus-blue`, gelap: `night-focus-blue`): hanya untuk cincin fokus keyboard, supaya
  tidak tertukar dengan status terpilih yang hijau.
- **Amber Warning** (`amber-warning` di atas `amber-wash`; gelap: `night-amber-warning` di atas
  `night-amber-wash`): peringatan, termasuk koneksi yang memudar. Di aplikasi ini adalah peran
  `warning.text` dan `warning.subtle`. Statusnya selalu disertai ikon dan kata, tidak hanya warna.

### Neutral

- **Ivory Canvas** (`ivory-canvas`): latar halaman. Gelap: **Night Canvas** (`night-canvas`), charcoal
  hangat yang sedikit kehijauan, bukan hitam murni.
- **Warm White** (`warm-white`): kartu dan permukaan yang naik. Gelap: `night-surface`, lalu
  `night-overlay` untuk dialog.
- **Sand Well** (`sand-well`): sumur, trek, dan latar saat ditekan. Gelap: `night-pressed`.
- **Charcoal Ink** (`charcoal-ink`), **Ink Secondary** (`ink-secondary`), **Ink Tertiary**
  (`ink-tertiary`): tiga tingkat teks. Gelap: `night-ink`, `night-ink-secondary`, `night-ink-tertiary`.
- **Sand Hairline** (`sand-hairline`, gelap: `night-hairline`): pemisah dekoratif, tanpa syarat kontras.
- **Stone Border** (`stone-border`, gelap: `night-border`): batas kontrol yang harus ditemukan orang,
  dengan kontras ≥ 3:1.

### Named Rules

**The Memory-Only Apricot Rule.** Apricot dan bata hanya untuk kenangan dan untuk titik kedua.
Keduanya tidak pernah dipakai untuk tombol, tautan, peringatan biasa, atau hiasan. Kelangkaan
itulah yang membuatnya bermakna.

**The Measured Pair Rule.** Setiap pasangan teks dan latar yang dipakai memenuhi WCAG 2.2 AA (4,5:1
untuk teks; 3:1 untuk batas kontrol, cincin fokus, dan isi kontrol aktif) di kedua tema, dan
diukur, bukan diperkirakan.

## Typography

**Display Font:** Plus Jakarta Sans (dengan fallback `system-ui` pada bobot yang sama)
**Body Font:** Plus Jakarta Sans
**Label/Mono Font:** tidak ada monospace

**Character:** Satu keluarga sans yang modern dan bulat secukupnya. Ukuran besar dirapatkan sedikit
dan ukuran kecil dilonggarkan sedikit, supaya hangat tanpa kehilangan presisi.

### Hierarchy

- **Display** (700, 36px, 44px): judul layar besar.
- **Title Large** (700, 28px, 36px): judul bagian.
- **Title** (600, 22px, 28px): judul dialog.
- **Headline** (600, 18px, 24px): nama dan judul kartu.
- **Body Large** (400, 18px, 28px): bacaan panjang. Lebar baca maksimum 680px.
- **Body** (400, 16px, 24px) dan **Body Strong** (600): teks utama dan judul baris.
- **Body Small** (400, 14px, 20px): teks pendukung dan deskripsi.
- **Label** (600, 16px, 20px): label tombol. **Label Small** (600, 14px, 20px, +0,07px): chip dan label
  bidang.
- **Caption** (500, 12px, 16px, +0,12px): keterangan dan lencana.

### Named Rules

**The One Family Rule.** Hanya Plus Jakarta Sans, dari empat file statis (400, 500, 600, 700). Di
web, setiap bobot dideklarasikan dengan `@font-face` sendiri agar browser tidak membuat bold palsu.

**The Baseline-of-Four Rule.** Tinggi baris selalu kelipatan 4 supaya teks duduk di grid 4 titik.
Tidak ada label huruf kapital semua.

**The Readable-at-200% Rule.** Skala teks dari pengguna tetap berlaku. Tinggi minimum dipakai, bukan
tinggi tetap, sehingga tidak ada teks yang terpotong pada ukuran 200%.

## Layout

Grid 4 titik dengan langkah jarak 4, 8, 12, 16, 20, 24, 32, 40, 48, dan 64. Jendela dibagi menjadi
kompak (< 600px), sedang (≥ 600px), dan lebar (≥ 1024px), dengan gutter horizontal 20, 32, dan 40px.
Lebar konten: baca 680px, halaman 760px, pesan pendek 360px. `gap` dipakai untuk ritme antar-saudara,
dan padding untuk inset. Ruang di atas judul lebih besar daripada ruang di bawahnya. Tidak semua hal
dijadikan kartu: daftar dikelompokkan dengan garis tipis.

## Elevation & Depth

Kedalaman datang lebih dulu dari nada warna dan garis tipis. Bayangan sangat lembut hanya dipakai
untuk kartu dan benda yang mengambang. Di tema gelap bayangan hampir tak terlihat, sehingga permukaan
yang naik dibedakan oleh nadanya yang lebih terang.

### Shadow Vocabulary

- **Raised** (`box-shadow: 0px 1px 2px rgba(34, 32, 28, 0.06), 0px 4px 12px rgba(34, 32, 28, 0.04)`):
  kartu di atas kanvas, hanya di tema terang.
- **Overlay** (`box-shadow: 0px 2px 6px rgba(20, 18, 14, 0.08), 0px 16px 40px rgba(20, 18, 14, 0.16)`;
  gelap: `0px 16px 40px rgba(0, 0, 0, 0.48)`): dialog, sheet, dan toast.

### Named Rules

**The Tone-Before-Shadow Rule.** Bila dua permukaan bisa dibedakan dengan nada dan garis tipis,
jangan tambahkan bayangan.

## Shapes

Radius bertingkat: kontrol kecil 4 sampai 12px, banner 16px, kartu 20px, dialog dan sheet 28px. Semua
yang ditekan jari, yaitu tombol, chip, dan sakelar, berbentuk kapsul penuh. Bentuk ini menggemakan
motif dua busur pada logo. Garis: hairline untuk pemisah, 1px untuk batas kontrol, dan 2px untuk
garis terpilih. Cincin fokus selebar 2px dengan offset 2px.

**The Capsule Touch Rule.** Apa pun yang bisa ditekan berbentuk kapsul dan punya area sentuh minimal
48px, walau bentuk visualnya lebih kecil.

## Components

### Buttons

Tegas dan tenang: satu aksi utama yang jelas, sisanya mundur.

- **Shape:** kapsul penuh (9999px).
- **Primary:** latar `forest-teal`, teks putih, label 16px semibold. Ukuran md: tinggi 48px dengan
  padding 12px × 24px. Ukuran lg: tinggi 56px dengan padding 16px × 32px. Ukuran sm: visual 36px,
  area sentuh tetap 48px.
- **Pressed / Focus:** saat ditekan, latar berubah ke `forest-teal-pressed` dan skala turun ke 0,97
  selama 120ms ease-out. Fokus keyboard memakai cincin `focus-blue` 2px dengan offset 2px.
- **Secondary:** transparan, garis 1px `stone-border`, teks `charcoal-ink`, dan latar `sand-well` saat
  ditekan.
- **Ghost:** transparan dengan teks `forest-teal`, untuk aksi ketiga seperti "Cara tempel".

### Chips

- **Style:** kapsul, visual 36px dengan area sentuh 48px, garis 1px `stone-border`, dan teks
  `ink-secondary`.
- **State:** saat terpilih, latar `forest-mist`, garis `forest-teal`, teks `forest-on-mist`, dan ikon
  centang tebal. Status tidak pernah hanya ditandai warna.

### Cards / Containers

- **Corner Style:** 20px.
- **Background:** `warm-white` untuk kartu biasa. Varian merek memakai `forest-mist` untuk ajakan dan
  panggung ritual, dan varian kenangan memakai `apricot-wash` hanya untuk momen.
- **Shadow Strategy:** hanya kartu `raised` yang memakai bayangan Raised. Lihat Elevation & Depth.
- **Border:** hairline `sand-hairline`.
- **Internal Padding:** 16 sampai 20px.
- **Strip peringatan memudar:** pita di dasar kartu koneksi, berlatar `amber-wash`, dengan ikon
  Phosphor `HourglassMedium` dan teks Body Small `amber-warning`, misalnya "Memudar dalam 30 hari.
  Bertemu dan tempel lagi untuk menyegarkan koneksi ini."

### Two Dots and Lockup

Komponen tanda tangan. Dua titik berdiameter sama (12, 16, atau 28px), satu `forest-teal` dan satu
`apricot-dot`, berpindah dari jauh (`apart`) ke dekat (`near`) ke bertemu (`meet`). Perpindahan
berjalan sekali per perubahan, selama sekitar 300ms dengan kurva `cubic-bezier(0.23, 1, 0.32, 1)`,
dan tidak pernah berulang. Saat gerak dikurangi, posisinya langsung berubah. Motif ini dekoratif dan
disembunyikan dari pembaca layar, karena maknanya dibawa kata-kata di sekitarnya.

Logo saat ini hanya wordmark tipografis: `patepang` huruf kecil, Bold, warna merek (ADR 0002). Lockup
bertumpuk menaruh dua titik di atas wordmark itu, dibaca sebagai "Patepang". Di aplikasi lockup ini
dipakai di splash dan layar Selamat datang. Simbol dua busur yang bersentuhan belum dibuat; jangan
menggambarnya sendiri, karena dua titik yang menggantikannya. Varian lain, misalnya dua titik di
samping wordmark, belum ada dan tidak boleh dibuat tanpa persetujuan pemilik.

## Do's and Don'ts

### Do:

- **Do** memakai token untuk warna, jarak, radius, tipe, dan durasi. Nilai mentah di komponen adalah
  galat.
- **Do** memakai `forest-teal` untuk aksi utama dan `focus-blue` 2px dengan offset 2px untuk fokus
  keyboard.
- **Do** membuat setiap target sentuh minimal 48px dan setiap aksi yang bisa ditekan berbentuk kapsul.
- **Do** menjaga gerak di bawah 300ms dengan kurva ease-out (0.23, 1, 0.32, 1). Keluar sekitar 20%
  lebih cepat daripada masuk. Saat gerak dikurangi, pakai fade 120ms tanpa translasi, skala, atau
  rotasi.
- **Do** memakai Phosphor bobot `regular` untuk UI, `fill` untuk status aktif (selalu bersama isyarat
  lain), `bold` pada 16px, dan `duotone` hanya untuk ilustrasi status.
- **Do** menulis dalam bahasa Indonesia, kalimat biasa, dan mengakui hal yang disimulasikan.

### Don't:

- **Don't** memakai krem `#F4F1EA` dengan terakota `#D97757`, warna generik yang sengaja ditolak sistem
  ini.
- **Don't** memakai apricot atau bata untuk aksi, tautan, atau hiasan.
- **Don't** memakai hitam murni untuk tema gelap. Pakai `night-canvas`.
- **Don't** memakai emoji sebagai ikon, set ikon kedua, atau Phosphor `thin`/`light`.
- **Don't** memakai label huruf kapital semua, font monospace, atau bold palsu.
- **Don't** menampilkan angka belum dibaca yang memancing, hitungan pengikut, urgensi palsu, atau feed
  tanpa akhir.
- **Don't** membuat animasi yang berulang tanpa akhir, kurva ease-in, atau bounce dekoratif.
- **Don't** menggambar simbol logo sendiri.
