# 🍊 OrangeDel — Project Brief

## Konteks
Proyek ini dibuat dalam rangka **Lomba Web Design**.

---

## Sub Tema
**UMKM dan Kewirausahaan**

> Platform digital untuk membantu pelaku usaha dalam:
> - Mempromosikan produk
> - Meningkatkan pemasaran
> - Memperluas jangkauan pasar secara online

---

## Tentang Website: OrangeDel

**OrangeDel** adalah website promosi produk **Jeruk** milik sebuah kebun jeruk.

### Fokus Utama
- ✅ Mempromosikan produk jeruk dari kebun
- ✅ Meningkatkan pemasaran penjualan kebun jeruk
- ✅ Memperluas jangkauan pasar secara online

### Bukan Fokusnya
- ❌ Tidak ada sistem pembelian / e-commerce
- ❌ Tidak ada cart, checkout, atau payment gateway
- ❌ Bukan toko online — murni website promosi & pemasaran

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
- Body: weight 400–500, clean dan readabel
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
| GSAP + @gsap/react | Animasi (ScrollTrigger, TextPlugin, dll) |
| Three.js + @types/three | WebGL / 3D visual |
| Lenis | Smooth scroll |
| split-type | Text splitting untuk Text Reveal Animation |

### Fitur Animasi yang Akan Diimplementasikan
- **Text Reveal / Scroll-Triggered Typography** → `split-type` + GSAP
- **Pinned Scroll / Scroll Storytelling** → GSAP ScrollTrigger (`pin: true`)
- **Parallax** → GSAP ScrollTrigger (`scrub`)
- **WebGL / 3D** → Three.js
- **Smooth Scroll** → Lenis

### Pendekatan Website
- **Single Page** — semua section dalam 1 halaman, tidak ada navigasi antar page
- **Navbar** → smooth scroll ke section (anchor links)
- Pinned scroll diterapkan di beberapa section (About, Gallery, dll — ditentukan saat build)

**Package Manager:** npm  
**Lokasi Project:** `d:\Lomba\LombaWebDesign\OrangeDel\orangedel\`

### Menjalankan Dev Server
```bash
cd d:\Lomba\LombaWebDesign\OrangeDel\orangedel
npm run dev
```
Buka di browser: `http://localhost:3000`

---

## Status Saat Ini
- [x] Next.js project sudah di-setup
- [x] GSAP, Three.js, Lenis sudah terinstall
- [x] Halaman blank hitam (canvas kosong)
- [ ] Design system belum ditentukan
- [ ] Belum ada konten / halaman

---

*File ini dibuat sebagai referensi antar sesi. Baca file ini di awal sesi baru untuk langsung melanjutkan pekerjaan.*
