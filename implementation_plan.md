# OrangeDel — Implementation Plan
## "Dark Luxury Citrus" — Single Page Scroll Experience

Membangun ulang website OrangeDel menjadi pengalaman scroll sinematik berkelas Awwwards,
menggunakan kombinasi Unsplash photos, Sketchfab 3D models, Three.js, dan GSAP ScrollTrigger.

---

## Prinsip Utama

- **Scroll adalah pengalaman** — setiap gerakan scroll harus memberikan "reward" visual
- **Tidak ada section filler** — setiap section harus earn its place
- **Assets dari luar** — Unsplash (foto), Sketchfab (3D model), bisa di-replace nanti
- **Panjang scroll = nilai plus** — Navbar hanya 5 anchor, tapi scroll sangat panjang

---

## Arsitektur Section (Urutan Scroll)

```
[HERO — Pinned Scene]
      ↓ scroll pertama: transisi sinematik
[INTERLUDE 1 — Statement]         ← tidak di navbar
      ↓ scroll normal
[ABOUT — Pinned Storytelling]     ← navbar: About
      ↓ scroll normal
[KEUNGGULAN — Horizontal Cards]   ← tidak di navbar
      ↓ scroll normal
[HASIL KEBUN — Product Showcase]  ← navbar: Hasil Kebun
      ↓ scroll normal
[INTERLUDE 2 — Farm-to-Table Teaser] ← tidak di navbar
      ↓ scroll normal
[PROSES — Pinned Horizontal Scroll] ← tidak di navbar
      ↓ scroll normal
[GALERI — Masonry Scroll]         ← navbar: Galeri
      ↓ scroll normal
[TESTIMONI — Stacked Cards]       ← navbar: Testimoni
      ↓ scroll normal
[LOKASI & KONTAK]                 ← navbar: Lokasi
[FOOTER]
```

---

## Detail Per Section

### 1. HERO (Revamp Total)

**Konsep:** Scene immersive full-screen. Pinned saat pertama load. Scroll pertama = transisi sinematik memasuki kebun. Setelah itu scroll normal.

**Visual:**
- Background: Foto Unsplash kebun jeruk suasana senja/gelap → atmospheric overlay
- Foreground: Model 3D jeruk dari Sketchfab (`.glb`) di-render via Three.js
- Layer tengah: Partikel cahaya mengambang (GSAP)
- Layer atas: Grain texture + gradient overlay

**Transisi scroll pertama (inspirasi vaulk.com):**
- Hero di-pin
- Saat scroll: layer-layer parallax bergerak dengan kecepatan berbeda (foreground cepat, background lambat)
- Efek "memasuki kebun" — kamera zoom in ke scene
- Setelah threshold scroll tertentu → unpin, lanjut ke Interlude 1
- Scroll balik ke atas → normal, tidak re-trigger

**Animasi:**
- `ScrollTrigger` pin untuk hero
- `scrub` parallax multi-layer
- Three.js model 3D jeruk yang berputar lambat + reaktif hover mouse
- GSAP partikel floating

**Aset:**
- Foto background: Unsplash — kebun jeruk, senja/golden hour, tone gelap
- 3D model: Sketchfab — "orange fruit" CC0/CC BY (`.glb` format)
- Alternatif 3D: Three.js geometry sphere + custom orange shader material

---

### 2. INTERLUDE 1 — "Bukan Jeruk Biasa" (NEW)

**Konsep:** Full-screen typographic statement. Sederhana tapi dramatis. Tidak ada di navbar.

**Visual:**
- Background: Foto Unsplash close-up permukaan kulit jeruk (macro) → dark overlay
- Center: Quote besar dengan Cormorant italic + text reveal animasi
- Aksen: Garis tipis oranye yang muncul dari scroll

**Animasi:**
- Text reveal dengan SplitType (per karakter atau per kata)
- Parallax pada foto background
- Fade in/out saat scroll melewati section

**Konten:**
> *"Setiap jeruk yang kami hadirkan*  
> *adalah bukti bahwa alam Indonesia*  
> *tak pernah mengecewakan."*

**Aset:**
- Foto: Unsplash — macro close-up orange peel / citrus texture

---

### 3. ABOUT (Sudah Ada — Polish)

**Status:** Sudah dibangun. Pinned scroll storytelling 4 chapter.

**Yang perlu diupdate:**
- Tambah foto atmosferik Unsplash sebagai visual pendukung di sisi kanan (gantikan rings/dekoratif abstract)
- Polish animasi transisi antar chapter
- Pastikan stats row terlihat premium

**Aset:**
- Foto: Unsplash — petani di kebun, tangan memegang jeruk, lahan pertanian hijau

---

### 4. KEUNGGULAN (NEW — Tidak di Navbar)

**Konsep:** 4 keunggulan utama OrangeDel dengan visual dramatis. Bukan template biasa — setiap keunggulan punya visual sendiri.

**Layout:** Horizontal scroll dengan GSAP + ScrollTrigger  
*atau* Vertical stacked cards yang reveal satu per satu dengan pinned

**Konten (4 poin):**
1. **Farm-to-Table** — Jeruk langsung dari kebun, tanpa rantai tengkulak
2. **Organik Alami** — 100% tanpa pestisida kimia berbahaya
3. **Kualitas Terpilih** — Hanya buah terbaik yang keluar dari kebun
4. **Dataran Tinggi** — Ditanam di iklim sejuk, tanah vulkanik kaya mineral

**Animasi:**
- Pinned horizontal scroll (4 panel bergeser ke kiri saat scroll)
- Setiap panel: foto background + overlay + teks reveal
- Nomor besar (01, 02, 03, 04) sebagai typographic accent

**Aset:**
- Foto per panel: Unsplash — (1) jeruk dipetik tangan, (2) daun hijau segar, (3) seleksi buah, (4) pegunungan/dataran tinggi)

---

### 5. HASIL KEBUN (Rebuild)

**Konsep:** Showcase varietas jeruk yang tersedia. Interaktif — user bisa hover untuk lihat detail.

**Layout:** Grid cards + filter atau carousel horizontal

**Konten (varietas):**
1. **Jeruk Siam** — Manis, segar, kulit tipis
2. **Jeruk Keprok** — Aromatis, premium, ukuran besar
3. **Jeruk Lemon** — Asam segar, cocok untuk minuman
4. **Jeruk Mandarin** — Kecil manis, mudah dikupas

**Animasi:**
- Card reveal saat scroll (stagger)
- Hover: 3D tilt effect (CSS perspective)
- Hover: Image zoom, overlay info muncul
- Active card: Expand dengan detail lengkap

**Aset:**
- Foto per varietas: Unsplash — individual citrus fruit shots
- 3D model bisa jadi accent dekoratif di section ini

---

### 6. INTERLUDE 2 — "Dari Kebun ke Tanganmu" Teaser (NEW)

**Konsep:** Transisi visual sebelum section Proses. Full-screen dengan foto dramatis + teks pendek.

**Visual:**
- Foto Unsplash: tangan memegang jeruk atau panen jeruk, tone hangat
- Teks: *"Dari tangan petani. Langsung ke tangan Anda."*
- Panah/indikator scroll yang mengundang

**Animasi:**
- Parallax pada foto
- Text reveal
- Gradient transition menuju section Proses

---

### 7. PROSES — "Dari Kebun ke Tanganmu" (NEW — Pinned Horizontal)

**Konsep:** Journey farm-to-table disampaikan lewat horizontal scroll yang di-pin.

**Steps (5 tahap):**
1. 🌱 **Tanam** — Bibit pilihan di lahan subur dataran tinggi
2. 🌿 **Rawat** — Perawatan organik selama 8–12 bulan
3. 🍊 **Panen** — Dipetik manual saat kematangan sempurna
4. ✅ **Seleksi** — Hanya buah terbaik yang lolos standar kami
5. 🚚 **Kirim** — Dikirim langsung, hari yang sama

**Animasi:**
- GSAP ScrollTrigger horizontal scroll (`x` translate)
- Setiap step: foto + ikon + judul + deskripsi
- Progress bar horizontal yang menunjukkan posisi step
- Step number yang count up

**Aset:**
- Foto per step: Unsplash — planting, farming, orange harvest, fruit sorting, delivery

---

### 8. GALERI (Rebuild)

**Konsep:** Bukti visual bahwa kebun nyata. Foto-foto autentik suasana panen.

**Layout:** Masonry grid dengan scroll reveal bertahap  
*atau* Full-screen photo slider dengan transisi dramatis

**Konten:** 8–12 foto kebun, panen, suasana alam

**Animasi:**
- Setiap foto: reveal dari bawah saat scroll (stagger)
- Hover: scale up + overlay dengan caption
- Masonry layout yang memberikan kesan editorial

**Aset:**
- Foto: Unsplash — orange farm, citrus grove, harvest, oranges on tree, farming

---

### 9. TESTIMONI (Rebuild)

**Konsep:** Social proof yang terasa premium — bukan template slider biasa.

**Layout:** Large quote cards, stacked/carousel

**Konten (5 testimoni fiktif):**
1. Budi S., Surabaya — *"Rasanya beda dari jeruk supermarket biasa..."*
2. Rina M., Jakarta — *"Langsung pesan lagi setelah nyoba pertama..."*
3. Toko Buah Segar, Bandung — *"Supplier terpercaya untuk usaha kami..."*
4. Chef Andra, Bali — *"Kualitas konsisten, cocok untuk restoran kami..."*
5. Keluarga Santoso, Yogyakarta — *"Langganan setiap minggu..."*

**Animasi:**
- Card slide in dari samping
- Active quote: larger scale, highlight warna oranye
- Auto-advance dengan pause on hover

---

### 10. LOKASI & KONTAK (Rebuild)

**Konsep:** CTA final yang kuat. Harus membuat orang mau menghubungi.

**Layout:** 2 kolom — kiri: peta/lokasi info, kanan: kontak + CTA

**Konten:**
- Alamat kebun (placeholder: Dataran Tinggi Karo, Sumatera Utara)
- Nomor WA dengan CTA button "Hubungi via WhatsApp"
- Jam operasional
- Embed Google Maps (iframe)

**Animasi:**
- Section reveal saat scroll
- CTA button dengan pulse animation
- Peta dengan fade in

---

### 11. FOOTER

**Konten:** Logo, tagline, nav links, copyright, sosmed icons

**Design:** Minimalis, dark, dengan gradient oranye tipis di atas

---

## Strategi Aset

### Foto — Unsplash
Akan menggunakan URL Unsplash langsung dengan spesific photo IDs yang telah dikurasi.
Semua foto dioptimasi dengan parameter Unsplash (`?w=1920&q=80&fit=crop`).

### 3D Model — Sketchfab / Three.js
- **Priority:** Cari model `.glb` jeruk dari Sketchfab (CC0/CC BY)
- **Fallback:** Three.js procedural sphere + custom orange GLSL shader material
- Loaded via Three.js `GLTFLoader`

### Gambar Generate
- Untuk elemen spesifik yang tidak tersedia di Unsplash
- Grain textures, pattern overlays

---

## Urutan Pengerjaan

- [ ] **Step 1** — Kurasikan & test semua foto Unsplash yang akan dipakai
- [ ] **Step 2** — Cari / test 3D model jeruk (Sketchfab)
- [ ] **Step 3** — Revamp Hero section (paling kompleks)
- [ ] **Step 4** — Interlude 1
- [ ] **Step 5** — Polish About (tambah foto)
- [ ] **Step 6** — Build Keunggulan
- [ ] **Step 7** — Build Hasil Kebun
- [ ] **Step 8** — Interlude 2
- [ ] **Step 9** — Build Proses
- [ ] **Step 10** — Build Galeri
- [ ] **Step 11** — Build Testimoni
- [ ] **Step 12** — Build Lokasi & Kontak
- [ ] **Step 13** — Build Footer
- [ ] **Step 14** — Update nav.ts (label fix, Testimoni → Testimoni, hapus Kontak dari navbar)
- [ ] **Step 15** — Review keseluruhan, polish animasi, responsif

---

## Open Questions

> [!IMPORTANT]
> **Lokasi kebun**: Apakah ada lokasi kebun yang spesifik yang ingin ditampilkan, atau boleh saya pakai placeholder (misal: Dataran Tinggi Karo, Sumatera Utara)?

> [!IMPORTANT]
> **Kontak WA**: Apakah ada nomor WhatsApp yang ingin ditampilkan, atau pakai placeholder dulu?

> [!NOTE]
> **Nama varietas jeruk**: Apakah 4 varietas yang saya tulis (Siam, Keprok, Lemon, Mandarin) sesuai dengan produk kebun, atau ada varietas lain yang ingin ditonjolkan?
