# 🍊 OrangeDel — Project Brief

> **Baca file ini di awal setiap sesi baru. Ini adalah sumber kebenaran tunggal proyek ini.**

---

## Konteks

Proyek ini dibuat dalam rangka **Lomba Web Design**.

- **Sub Tema:** UMKM dan Kewirausahaan
- Platform digital untuk membantu pelaku usaha mempromosikan produk, meningkatkan pemasaran, dan memperluas jangkauan pasar secara online.

---

## Identitas Website

**OrangeDel** adalah **company profile digital untuk UMKM perkebunan jeruk**.

Ini **bukan toko online**. Tidak ada proses jual beli di dalamnya.

**Tujuan utama:** Membangun brand awareness dan memperluas jangkauan pasar secara digital — sehingga lebih banyak orang mengenal dan mempercayai kualitas produk kebun Orange Del, lalu menghubungi langsung untuk membeli.

### Positioning Statement
> *"Orange Del adalah kebun jeruk yang cukup serius untuk punya brand sendiri."*

Orang yang mengunjungi web ini harus langsung berpikir:
**"Ini bukan petani biasa — ini kebun yang profesional dan peduli kualitas."**

### Cara Menjelaskan ke Juri (Pitch)
> *"Website kami adalah company profile untuk UMKM perkebunan jeruk bernama Orange Del. Tujuannya untuk membangun brand awareness dan memperluas jangkauan pasar secara digital — sehingga lebih banyak orang mengenal dan mempercayai kualitas produk kebun ini."*

**Analogi:** Seperti website Dole atau Tropicana — tidak jual langsung di websitenya, tapi berhasil membuat orang percaya bahwa produknya adalah yang terbaik.

**Kenapa ini kuat untuk lomba:**
- Produk agrikultur + visual dark luxury & WebGL → tidak terduga, standout, memorable
- Peserta lain umumnya pilih fashion/makanan/kerajinan → Orange Del langsung berbeda

### Fokus Konten
- ✅ Memperkenalkan kebun dan story di baliknya
- ✅ Menampilkan varietas jeruk beserta keunggulannya
- ✅ Membangun kepercayaan lewat galeri, testimoni, dan profil kebun
- ✅ Mengarahkan calon pembeli untuk menghubungi lewat kontak (WA/telepon)

### Bukan Fokusnya
- ❌ Tidak ada sistem pembelian / e-commerce
- ❌ Tidak ada cart, checkout, atau payment gateway
- ❌ Bukan toko online — murni website promosi & brand building

### USP (Unique Selling Point)
**Angle utama: Farm-to-Table**
> *Jeruk segar langsung dari kebun, tanpa perantara.*

| Pesan | Artinya |
|---|---|
| **Kesegaran** | Dipetik dari sumber, bukan dari gudang distributor |
| **Kualitas terpilih** | Hanya buah terbaik yang dikeluarkan dari kebun |
| **Kejujuran** | Langsung dari petani, tidak ada rantai tengkulak |
| **Kepercayaan** | Kebun yang profesional, bukan sekadar petani biasa |

---

## Struktur Section (FINAL — JANGAN DIUBAH TANPA ALASAN KUAT)

Total: **8 section**, **5 di navbar**.

| # | Section | ID Anchor | Navbar? | Tujuan |
|---|---|---|---|---|
| 1 | **Hero** | `#hero` | ✗ | Kesan pertama — sudah selesai dibangun |
| 2 | **Tentang** | `#about` | ✅ `About` | *"Siapa Orange Del?"* — story & misi kebun |
| 3 | **Keunggulan** | `#keunggulan` | ✗ | *"Kenapa pilih kami?"* — 3–4 poin kuat, visual dramatis, bukan template |
| 4 | **Hasil Kebun** | `#hasil-kebun` | ✅ `Hasil Kebun` | *"Apa yang tersedia?"* — varietas & grade jeruk |
| 5 | **Dari Kebun ke Tanganmu** | `#proses` | ✗ | *"Bagaimana prosesnya?"* — journey farm-to-table, kandidat pinned scroll |
| 6 | **Galeri** | `#galeri` | ✅ `Galeri` | *"Bukti visual kebunnya nyata"* — foto suasana & panen |
| 7 | **Testimoni** | `#testimoni` | ✅ `Testimoni` | *"Orang lain sudah percaya"* — social proof |
| 8 | **Lokasi & Kontak** | `#lokasi` | ✅ `Lokasi` | *"Cara hubungi kami"* — CTA final |

### Catatan Section
- Section **#3 Keunggulan** & **#5 Dari Kebun ke Tanganmu** tidak ada di navbar — tapi tetap penting untuk kualitas & panjang scroll experience
- **"Dari Kebun ke Tanganmu"** kandidat terkuat untuk pinned scroll / horizontal scroll — reinforce USP farm-to-table secara visual (contoh: Pohon → Panen → Seleksi → Pengiriman)
- Navbar labels: `About` · `Hasil Kebun` · `Galeri` · `Testimoni` · `Lokasi`
- CTA button di Hero: **"Lihat Hasil Kebun"** dan **"Tentang Kami"**
- Prinsip scroll: panjang & interaktif adalah nilai plus — tapi setiap section harus **earn its place**, tidak boleh ada filler

---

## Design System

**Tema: "Dark Luxury Citrus"** — Dark background dramatis yang membuat aset jeruk dan WebGL tampil maksimal.

### Color Palette
| Token | Hex | Peran |
|-------|-----|-------|
| `--color-bg` | `#080804` | Background utama (hitam hangat) |
| `--color-surface` | `#141310` | Card / panel |
| `--color-primary` | `#FF6B00` | Oranye utama — warna brand |
| `--color-primary-light` | `#FFA040` | Amber — lighter orange |
| `--color-primary-pale` | `#FFD4A0` | Sangat light |
| `--color-gold` | `#D4A017` | Aksen emas |
| `--color-green` | `#3D6B35` | Hijau daun — nature accent |
| `--color-text-primary` | `#F5F0E8` | Putih hangat |
| `--color-text-secondary` | `#9A9488` | Abu hangat — subtext |

### Typography
| Peran | Font | Source |
|-------|------|--------|
| Display / Heading | **Cormorant** (light, italic) | Google Fonts (gratis) |
| Body / UI | **DM Sans** | Google Fonts (gratis) |

- Heading: weight 300–400, italic untuk aksen elegan
- Body: weight 400–500, clean dan readable
- Font sizes: fluid dengan `clamp()` untuk responsif

### Design Decisions
- ✅ Background gelap → aset jeruk/WebGL **pop** maksimal
- ✅ Cormorant italic → kesan luxury & premium
- ✅ Scrollbar custom warna oranye
- ✅ `::selection` warna oranye
- ✅ Gradient text oranye→emas untuk headline dramatis

---

## Tech Stack

> **Prinsip: Gunakan teknologi terbaik yang tersedia, selama gratis.**
> Tidak ada batasan library — apapun yang membuat website lebih premium dan lebih baik, kita pakai.

### Yang Sudah Terpasang
| Package | Kegunaan |
|---------|----------|
| Next.js (App Router + TypeScript) | Framework utama |
| GSAP + @gsap/react | Animasi (ScrollTrigger, dll) |
| Three.js + @types/three | WebGL / 3D visual |
| Lenis | Smooth scroll |
| split-type | Text splitting untuk Text Reveal Animation |

### Fitur Animasi
- **Text Reveal / Scroll-Triggered Typography** → `split-type` + GSAP
- **Pinned Scroll / Scroll Storytelling** → GSAP ScrollTrigger (`pin: true`)
- **Parallax** → GSAP ScrollTrigger (`scrub`)
- **WebGL / 3D** → Three.js
- **Smooth Scroll** → Lenis

### Pendekatan
- **Single Page** — semua section dalam 1 halaman, tidak ada navigasi antar page
- **Navbar** → smooth scroll ke section (anchor links)
- Scroll panjang & interaktif adalah nilai plus — setiap section harus earn its place

**Package Manager:** npm
**Lokasi Project:** `d:\Lomba\LombaWebDesign\OrangeDel\orangedel\`

```bash
npm run dev
# Buka: http://localhost:3000
```

---

## Status Pengerjaan

### ✅ Selesai
- [x] Next.js project setup (App Router + TypeScript)
- [x] GSAP, Three.js, Lenis, split-type terinstall
- [x] Design system (colors, typography, spacing tokens di `globals.css`)
- [x] **Hero section** — WebGL sphere, GSAP entrance animation, parallax scroll
- [x] Navbar — smooth scroll, sudah ada (perlu update label menu)
- [x] Identitas & positioning website sudah jelas (lihat bagian di atas)
- [x] Struktur section final sudah disepakati (lihat tabel di atas)
- [x] Folder section sudah dibuat: About, Hero, Product, Gallery, Testimonial, Location, Contact, Footer

### 🔄 Selanjutnya (kerjakan berurutan)
- [ ] Update label navbar: `PRODUK` → `HASIL KEBUN`, update CTA Hero
- [ ] Section **Tentang** (`#about`) — bangun & isi konten
- [ ] Section **Keunggulan** (`#keunggulan`) — bangun & isi konten
- [ ] Section **Hasil Kebun** (`#hasil-kebun`) — bangun & isi konten
- [ ] Section **Dari Kebun ke Tanganmu** (`#proses`) — bangun & isi (pinned scroll)
- [ ] Section **Galeri** (`#galeri`) — bangun & isi konten
- [ ] Section **Testimoni** (`#testimoni`) — bangun & isi konten
- [ ] Section **Lokasi & Kontak** (`#lokasi`) — bangun & isi konten
- [ ] Review keseluruhan, polish animasi, responsif
