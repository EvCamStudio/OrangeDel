# 🍊 OrangeDel — Technical Brief (Session Handoff)

> **Baca file ini di awal setiap sesi baru SETELAH membaca PROJECT_BRIEF.md.**
> File ini berisi keputusan teknis, kondisi kode saat ini, dan konteks yang diputuskan di sesi sebelumnya.
> PROJECT_BRIEF.md = "apa yang kita buat" | TECHNICAL_BRIEF.md = "bagaimana kita membuatnya"

---

## 1. Visi UX (Diputuskan di Sesi Ini)

Website ini adalah **single-page scroll experience** bergaya Awwwards — bukan website biasa.

- **Scroll = pengalaman**, bukan sekadar navigasi
- Setiap section harus "earn its place" — tidak ada filler
- Scroll panjang dan interaktif adalah nilai plus di lomba
- Navbar hanya 5 anchor, tapi total scroll halaman sangat panjang
- Beberapa section tidak perlu ada di navbar (interlude, transisi, keunggulan, proses)
- Inspirasi utama: **vaulk.com** (efek parallax berlapis, pinned hero, transisi sinematik)

---

## 2. Strategi Aset (Diputuskan di Sesi Ini)

Karena tidak ada aset nyata dari klien, strategi yang disetujui:

| Jenis Aset | Sumber | Catatan |
|---|---|---|
| Foto | **Unsplash** (URL langsung, gratis, legal) | Kurasi foto yang tone-nya cocok: dark, moody, warm |
| Model 3D | **Sketchfab** (CC0/CC BY, format `.glb`) | Dimuat via Three.js `GLTFLoader` |
| Model 3D fallback | **Three.js geometry + custom shader** | Kalau model Sketchfab tidak cocok |
| Efek/overlay | **GSAP + CSS + Three.js** | Partikel, grain, cahaya volumetrik |
| Generate image | Hanya untuk kebutuhan spesifik yang tidak ada di Unsplash | |

> **Catatan lomba:** Aset dari Unsplash/Sketchfab bisa di-replace nanti kalau lomba melarang.
> Untuk sekarang, pakai yang paling bagus dan cocok dulu.

**Parameter Unsplash yang dipakai:**
```
https://images.unsplash.com/photo-[ID]?w=1920&q=80&fit=crop&auto=format
```

---

## 3. Struktur File Saat Ini

```
src/
├── app/
│   ├── globals.css          ← Design system tokens (LENGKAP, jangan ubah sembarangan)
│   ├── layout.tsx           ← Font setup (Cormorant + DM Sans), metadata, LoadingProvider
│   └── page.tsx             ← Main page, import semua section
│
├── components/
│   ├── LoadingScreen/       ← Loading screen dengan animasi exit
│   ├── Navbar/              ← Navbar dengan scroll spy, smooth scroll via Lenis
│   └── sections/
│       ├── Hero/            ← ✅ Sudah dibangun (PERLU REVAMP — lihat section 5)
│       │   ├── Hero.tsx
│       │   ├── Hero.module.css
│       │   ├── HeroCanvas.tsx   ← Three.js WebGL sphere
│       │   └── HeroCanvas.module.css
│       ├── About/           ← ✅ Sudah dibangun (pinned scroll storytelling)
│       │   ├── About.tsx
│       │   └── About.module.css
│       ├── HasilKebun/      ← 🔴 KOSONG (skeleton saja, belum dibangun)
│       │   ├── HasilKebun.tsx
│       │   └── HasilKebun.module.css
│       ├── Gallery/         ← 🔴 KOSONG
│       ├── Testimonial/     ← 🔴 KOSONG (id masih #testimonial, harusnya #testimoni)
│       ├── Location/        ← 🔴 KOSONG
│       ├── Contact/         ← 🔴 KOSONG (di brief tidak ada section Kontak terpisah)
│       └── Footer/          ← 🔴 KOSONG
│
├── context/
│   └── LoadingContext.tsx   ← isLoading state, dipakai Hero & Navbar untuk sinkronisasi animasi
│
├── data/
│   ├── about.ts             ← ABOUT_CHAPTERS (4 chapter), ABOUT_STATS (4 stats)
│   └── nav.ts               ← NAV_ITEMS — navbar links
│
├── hooks/
│   ├── useLenis.ts          ← Aktivasi Lenis smooth scroll
│   ├── useScrollAnimation.ts
│   └── useThreeScene.ts
│
└── lib/
    ├── lenis.ts             ← Singleton Lenis instance (getLenis())
    └── animations/
        ├── gsap.ts
        ├── parallax.ts
        ├── scrollStory.ts
        └── textReveal.ts
```

---

## 4. Kondisi nav.ts Saat Ini

```typescript
// src/data/nav.ts
export const NAV_ITEMS: NavItem[] = [
  { label: "About",       href: "#about" },
  { label: "Hasil Kebun", href: "#hasil-kebun" },  // ← sudah diupdate dari "Produk"
  { label: "Galeri",      href: "#galeri" },
  { label: "Testimonial", href: "#testimonial" },   // ← MASIH SALAH, harusnya "Testimoni" / "#testimoni"
  { label: "Lokasi",      href: "#lokasi" },
  { label: "Kontak",      href: "#kontak" },        // ← Ini di brief tidak ada, perlu diputuskan hapus atau tidak
];
```

**Yang masih perlu difix di nav.ts (belum dikerjakan):**
- `"Testimonial"` → `"Testimoni"` dan `href: "#testimoni"`
- `"Kontak"` → kemungkinan dihapus (di brief Kontak digabung ke Lokasi)

---

## 5. FOKUS SESI SAAT INI: Hero & About

### 5a. Hero — Rencana Revamp

**Status Hero sekarang:**
- Ada WebGL sphere di `HeroCanvas.tsx` (Three.js)
- Entrance animation sudah ada (GSAP, sync dengan LoadingContext)
- Parallax scroll sudah ada
- CTA buttons: "Lihat Hasil Kebun" + "Tentang Kami" ← sudah diupdate

**Yang akan diubah (revamp total Hero):**

#### Konsep Visual Baru:
Inspirasi vaulk.com — **pinned hero sinematik dengan transisi berlapis**.

```
FASE 1: Hero terkunci (pinned)
├── Background: Foto Unsplash kebun jeruk (dark/moody/golden hour)
├── Foreground: Model 3D jeruk dari Sketchfab (Three.js GLTFLoader)
├── Layer: Partikel cahaya melayang (GSAP)
├── Overlay: Grain texture + gradient gelap dari bawah
└── Teks: "Orange Del" + subtitle + CTA (sudah ada, perlu diposisikan ulang)

FASE 2: Scroll pertama — transisi sinematik
├── Parallax berlapis: foreground bergerak lebih cepat dari background
├── Efek: seperti "memasuki" kebun / zoom in ke scene
├── Model 3D: perlahan scale down / fade saat scroll
└── Setelah threshold → unpin, lanjut ke section berikutnya

FASE 3: Setelah hero
└── Scroll balik ke atas → normal, tidak re-trigger animasi besar
```

#### Teknis Implementasi Hero:
```typescript
// Struktur layer (z-index dari belakang ke depan):
// 1. Background image (Unsplash) — parallax lambat (scrub: 2)
// 2. Three.js canvas (model 3D jeruk) — parallax sedang
// 3. Particle layer (GSAP animasi float) — parallax cepat
// 4. Gradient overlays (CSS)
// 5. Grain texture (CSS)
// 6. Content teks + CTA

// Pin hero:
ScrollTrigger.create({
  trigger: heroSection,
  start: "top top",
  end: "+=150%",  // hero butuh 2.5x viewport height untuk scroll
  pin: true,
  scrub: false,
})

// Parallax saat scroll:
// Background: yPercent: -15 (bergerak lambat)
// 3D canvas: yPercent: -25
// Particles: yPercent: -40 (bergerak paling cepat → kedalaman)
// Content teks: opacity fade out + slight yPercent
```

#### Aset Hero:
- **Foto background:** Unsplash — cari foto kebun jeruk dengan tone gelap/golden hour
  - Kandidat search: "orange grove sunset", "citrus farm golden hour dark", "orange orchard atmospheric"
- **Model 3D:** Sketchfab — cari "orange fruit" format GLB, CC0 atau CC BY
  - Alternatif: Buat dari Three.js geometry (sphere) + orange GLSL shader

---

### 5b. About — Yang Perlu Dipolish

**Status About sekarang:** Sudah dibangun dengan baik.
- Pinned scroll storytelling (4 chapter: Asal Usul, Lahan, Kualitas, Komunitas)
- Stats row di bawah (4 stats)
- Text reveal animasi intro

**Yang perlu diupdate:**
- Sisi kanan pinned story saat ini hanya ada lingkaran dekoratif (`ring`, `ring2`) — terlalu abstract
- **Rencana:** Tambah foto Unsplash atmosferik sebagai visual utama di sisi kanan
  - Foto berganti setiap chapter berganti (4 foto berbeda)
  - Transisi foto: cross-fade atau clip-path wipe
- Cek apakah layout sudah responsif di mobile

**Aset About:**
- Foto per chapter: Unsplash
  1. Chapter 01 (Asal Usul): petani di ladang / kebun tua
  2. Chapter 02 (Lahan): aerial view lahan hijau / dataran tinggi
  3. Chapter 03 (Kualitas): close-up buah jeruk segar
  4. Chapter 04 (Komunitas): keluarga petani / komunitas lokal

---

## 6. Design System (Dari globals.css — Jangan Ubah Token)

```css
/* Colors */
--color-bg:              #080804;   /* Background utama */
--color-surface:         #141310;   /* Card/panel */
--color-primary:         #FF6B00;   /* Oranye brand */
--color-primary-light:   #FFA040;   /* Amber */
--color-primary-pale:    #FFD4A0;   /* Light untuk teks */
--color-gold:            #D4A017;   /* Aksen emas */
--color-green:           #3D6B35;   /* Hijau daun */
--color-text-primary:    #F5F0E8;   /* Putih hangat */
--color-text-secondary:  #9A9488;   /* Abu hangat */

/* Fonts */
--font-display: Cormorant (weight 300-700, italic tersedia)
--font-body:    DM Sans (weight 300-700)

/* Section padding */
--section-py: clamp(5rem, 10vw, 10rem);
--section-px: clamp(1.5rem, 6vw, 8rem);
```

---

## 7. Tech Stack & Pola Kode

### Packages Terinstall:
- `next` (App Router + TypeScript)
- `gsap` + `@gsap/react` — animasi utama
- `gsap/ScrollTrigger` — scroll animations (register di file yang perlu)
- `three` + `@types/three` — WebGL/3D
- `lenis` — smooth scroll
- `split-type` — text splitting untuk reveal animation

### Pola Yang Digunakan:

**1. GSAP Registration (selalu di top file):**
```typescript
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}
```

**2. Smooth scroll via Lenis (jangan pakai window.scrollTo langsung):**
```typescript
import { getLenis } from "@/lib/lenis";
const lenis = getLenis();
lenis?.scrollTo(target, { offset: -80, duration: 1.6 });
```

**3. Loading state sync:**
```typescript
const { isLoading } = useLoading(); // dari LoadingContext
// Gunakan isLoading untuk delay animasi sampai loading screen selesai
```

**4. SplitType text reveal pattern:**
```typescript
const split = new SplitType(element, { types: "lines" });
split.lines?.forEach(line => {
  const wrap = document.createElement("div");
  wrap.style.overflow = "hidden";
  wrap.style.display = "block";
  line.parentNode?.insertBefore(wrap, line);
  wrap.appendChild(line);
});
gsap.from(split.lines, { yPercent: 110, stagger: 0.1, ... });
```

**5. Cleanup pattern di useEffect:**
```typescript
return () => {
  tl.kill();
  splitInstance.revert();
  scrollTriggerInstance.kill();
};
```

---

## 8. Keputusan Yang Sudah Dibuat (Jangan Diubah Tanpa Alasan Kuat)

1. ✅ **Folder `Product` → `HasilKebun`** — rename sudah dilakukan, id section `#hasil-kebun`
2. ✅ **Hero CTA** — "Lihat Hasil Kebun" (#hasil-kebun) + "Tentang Kami" (#about)
3. ✅ **nav.ts** — label "Hasil Kebun" sudah diupdate
4. ✅ **Aset** — pakai Unsplash (foto) + Sketchfab (3D model), bisa di-replace nanti
5. ✅ **Scroll experience** — single page, panjang, interaktif, bergaya Awwwards
6. ✅ **Section interlude** — ada section-section transisi yang tidak perlu di navbar

---

## 9. Yang Belum Diputuskan / Pending

- [ ] Lokasi kebun (placeholder atau lokasi nyata?)
- [ ] Nomor WhatsApp kontak
- [ ] Varietas jeruk yang dijual (untuk section Hasil Kebun)
- [ ] Label "Kontak" di navbar — dihapus atau digabung ke "Lokasi"?
- [ ] Label "Testimonial" → "Testimoni" (perlu difix tapi belum dikerjakan)
- [ ] Section-section setelah About (Keunggulan, Hasil Kebun, Proses, Galeri, Testimoni, Lokasi) — **BELUM DIKERJAKAN, ditunda ke sesi berikutnya**

---

## 10. Urutan Pekerjaan Saat Ini

**Fokus sesi ini: Hero Revamp + About Polish**

- [ ] Kurasi foto Unsplash untuk Hero (background scene)
- [ ] Kurasi foto Unsplash untuk About (4 foto per chapter)
- [ ] Cari/test model 3D jeruk di Sketchfab
- [ ] Revamp Hero.tsx + HeroCanvas.tsx (pinned, parallax berlapis, foto background)
- [ ] Polish About.tsx (tambah foto di sisi kanan, cross-fade antar chapter)
- [ ] Test di browser, pastikan animasi smooth

**Section lain (HasilKebun, Gallery, Testimonial, Location, Contact, Footer):**
Biarkan kosong dulu. Jangan diubah. Dikerjakan di sesi berikutnya.
