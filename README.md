# 🍊 OrangeDel — Company Profile Digital Kebun Jeruk

> Website company profile premium untuk UMKM perkebunan jeruk **Orange Del**.  
> Dibangun dengan Next.js, GSAP, Three.js, dan Lenis untuk pengalaman scroll yang cinematic.

---

## 🌐 Tentang Proyek

**OrangeDel** adalah platform digital untuk membangun brand awareness dan memperluas jangkauan pasar UMKM perkebunan jeruk secara online. Bukan toko online — murni website promosi dan brand building dengan visual *dark luxury citrus*.

**Positioning:**  
> *"Orange Del adalah kebun jeruk yang cukup serius untuk punya brand sendiri."*

---

## ✨ Fitur Utama

- 🎥 **Hero Section** — WebGL sphere interaktif, animasi GSAP entrance & parallax scroll
- 📖 **Tentang** — Story dan misi kebun Orange Del
- 🏆 **Keunggulan** — 4 keunggulan utama dengan visual dramatis
- 🍊 **Hasil Kebun** — Varietas & grade jeruk dengan animasi scroll
- 🌿 **Dari Kebun ke Tanganmu** — Storytelling proses farm-to-table (pinned scroll)
- 📸 **Galeri** — Foto suasana kebun & panen
- 💬 **Testimoni** — Social proof dari pelanggan
- 📍 **Lokasi & Kontak** — Maps embed + CTA WhatsApp
- 🖱️ **Custom Cursor** — Animasi kursor premium
- 💬 **Floating WhatsApp Button** — CTA kontak selalu terlihat

---

## 🛠️ Tech Stack

| Teknologi | Kegunaan |
|-----------|----------|
| **Next.js 15** (App Router + TypeScript) | Framework utama |
| **GSAP** + `@gsap/react` | Animasi (ScrollTrigger, Reveal, Parallax) |
| **Three.js** + `@types/three` | WebGL / 3D visual (Hero sphere) |
| **Lenis** | Smooth scroll |
| **split-type** | Text splitting untuk Text Reveal Animation |

---

## 🎨 Design System

**Tema: "Dark Luxury Citrus"**

| Token | Warna | Peran |
|-------|-------|-------|
| `--color-bg` | `#080804` | Background utama |
| `--color-primary` | `#FF6B00` | Oranye brand utama |
| `--color-gold` | `#D4A017` | Aksen emas |
| `--color-text-primary` | `#F5F0E8` | Putih hangat |

**Font:** Cormorant (Display) + DM Sans (Body)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Install & Run

```bash
# Clone repository
git clone <repo-url>
cd orangedel

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build Production

```bash
npm run build
npm run start
```

---

## 📁 Struktur Project

```
src/
├── app/
│   ├── page.tsx          # Halaman utama (single page)
│   └── globals.css       # Design system & CSS tokens
├── components/
│   ├── Navbar/           # Navbar dengan smooth scroll
│   ├── CustomCursor/     # Kursor animasi kustom
│   ├── FloatingWA/       # Floating WhatsApp CTA
│   └── sections/
│       ├── Hero/         # WebGL sphere + entrance animation
│       ├── About/        # Story kebun
│       ├── Keunggulan/   # 4 keunggulan utama
│       ├── HasilKebun/   # Varietas produk
│       ├── Proses/       # Farm-to-table journey
│       ├── Gallery/      # Galeri foto
│       ├── Testimoni/    # Testimonial
│       ├── Location/     # Lokasi & kontak
│       └── Footer/       # Footer
└── data/
    └── nav.ts            # Konfigurasi navigasi
```

---

## 📋 Status Pengerjaan

### ✅ Selesai
- [x] Next.js project setup (App Router + TypeScript)
- [x] GSAP, Three.js, Lenis, split-type installed
- [x] Design system (colors, typography, spacing tokens)
- [x] **Hero section** — WebGL sphere, animasi entrance & parallax
- [x] **Navbar** — smooth scroll, anchor links
- [x] **Tentang (About)** — story & misi kebun
- [x] **Keunggulan** — 4 poin keunggulan visual dramatis
- [x] **Hasil Kebun** — varietas & grade jeruk
- [x] **Proses** — farm-to-table journey (pinned scroll)
- [x] **Galeri** — foto kebun & panen
- [x] **Testimoni** — social proof pelanggan
- [x] **Lokasi & Kontak** — Maps + CTA WhatsApp
- [x] **Footer** — informasi & navigasi akhir
- [x] **Custom Cursor** — animasi kursor premium
- [x] **Floating WhatsApp Button** — CTA kontak persisten

---

## 🏆 Konteks Lomba

Proyek ini dibuat untuk **Lomba Web Design** dengan sub tema **UMKM dan Kewirausahaan**.

> *"Website kami adalah company profile untuk UMKM perkebunan jeruk bernama Orange Del. Tujuannya untuk membangun brand awareness dan memperluas jangkauan pasar secara digital."*

---

*Dibuat dengan ❤️ untuk Orange Del Citrus Farm*
