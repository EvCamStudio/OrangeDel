# SESSION PROGRESS — OrangeDel Website
> Dibuat: 2026-06-16 | Untuk lanjut di sesi berikutnya
> Baca juga: `PROJECT_BRIEF.md` dan `TECHNICAL_BRIEF.md`

---

## ✅ SUDAH SELESAI (sesi ini)

### 1. Refactoring Nama
- `src/components/sections/Product/` → `src/components/sections/HasilKebun/`
- `src/data/nav.ts` → label dan href sudah diubah ke `#hasil-kebun`
- `src/app/page.tsx` → import sudah diupdate

### 2. Hero Section — DIREVAMP (Hero.tsx + Hero.module.css)
**File:** `src/components/sections/Hero/Hero.tsx`
- Ditambah layer **background photo** (div.bgImage) sebagai lapisan paling bawah
- Ditambah **dark overlay** (div.bgOverlayScroll) yang muncul saat scroll
- **Pinned scroll sinematik** via GSAP ScrollTrigger:
  - Background zoom in lambat (scale 1 → 1.15, scrub 2)
  - Dark overlay fade in (opacity 0 → 0.6)
  - Canvas parallax naik (yPercent -18)
  - Content fade out + naik (opacity 0, yPercent -22)
- Entrance animation (setelah loading selesai): bg fade + canvas in + title slide up
- ScrollTrigger pin selama 100vh extra

**File:** `src/components/sections/Hero/Hero.module.css`
- Ditambah `.bgImage` — background-image layer, filter brightness(0.55)
- Ditambah `.bgOverlayScroll` — radial gradient overlay untuk darkening scroll

### 3. About Section — DIREVAMP (About.tsx + About.module.css)
**File:** `src/components/sections/About/About.tsx`
- Ditambah array `CHAPTER_PHOTOS` (4 foto Unsplash, 1 per chapter)
- Ditambah `photoRefs` untuk cross-fade foto per chapter
- `animateToStep()` sekarang juga switch `.active` class pada foto
- Foto muncul di sisi kanan, berganti dengan CSS transition saat chapter berganti

**File:** `src/components/sections/About/About.module.css`
- `.storyRight` diubah dari dekoratif abstract → **photo frame** nyata
- Ditambah `.chapterPhotoWrap`, `.chapterPhoto`, `.chapterPhoto.active`
- Foto stack di atas satu sama lain, active = opacity:1 + scale(1)
- `.statVisual` dipindah jadi overlay di atas foto (bottom-left)
- Gradient overlay gelap di bawah foto untuk readability stat number

### 4. next.config.ts
- Ditambah `images.remotePatterns` untuk `images.unsplash.com`
  (berlaku untuk `<Image>` komponen, tidak untuk CSS background-image)

---

## ⚠️ MASALAH YANG BELUM SELESAI

### MASALAH UTAMA: Foto Unsplash Tidak Muncul di Browser

**Gejala:** Hero background dan About right-panel photo tampak hitam/kosong.

**Analisis:**
- URL yang dipakai: `https://images.unsplash.com/photo-XXXX?w=800&q=80&fit=crop&auto=format`
- Kemungkinan masalah: URL tidak valid / butuh parameter `ixlib` / foto tidak ada
- Screenshot browser `direct_image_load_1781603611996.png` menunjukkan foto berhasil diload langsung di browser (status OK)
- Artinya: **bukan masalah CORS atau network** — kemungkinan URL foto yang spesifik tidak benar

**URL YANG SUDAH DICOBA (di Hero.tsx):**
```
https://images.unsplash.com/photo-1536657464919-892534f60d6e?w=1920&q=80&fit=crop&auto=format
```
URL ini **BERHASIL** diload langsung (confirmed dari screenshot `direct_image_load_1781603611996.png`)

**Kemungkinan penyebab foto tidak muncul:**
1. CSS `opacity: 0` pada `.bgImage` tidak pernah di-animate karena `isLoading` context belum resolve
2. GSAP entrance animation tidak berjalan (timeline di-kill sebelum selesai)
3. LoadingContext masih dalam state `isLoading: true` saat foto harusnya muncul

### SOLUSI YANG HARUS DICOBA DI SESI BERIKUTNYA

**Opsi A (Paling Mungkin Benar):**
Cek apakah `isLoading` memang berubah ke `false`. Tambahkan `console.log` di Hero.tsx:
```tsx
useEffect(() => {
  console.log('[Hero] isLoading changed:', isLoading);
}, [isLoading]);
```

**Opsi B — Quick Fix:**
Jika LoadingContext bermasalah, ubah initial opacity di `.bgImage` dari `0` ke `1` di style inline,
dan hapus kondisi `if (isLoading) return;` sementara untuk debug.

**Opsi C — Ganti Logika:**
Hapus ketergantungan pada `isLoading` untuk background photo. Background photo selalu visible,
hanya teks/canvas yang bergantung pada loading state.

---

## 📸 FOTO UNSPLASH YANG DIKURASI

Foto ini sudah dikonfirmasi **ada di Unsplash** (terlihat di browser subagent):

| Kegunaan | Photo ID | Deskripsi |
|---|---|---|
| Hero background | `1536657464919-892534f60d6e` | Pohon jeruk penuh buah, close-up |
| About Ch01 (Asal Usul) | `1556316824-0d496cd18555` | Petani memetik jeruk — **belum dikonfirmasi valid** |
| About Ch02 (Lahan) | `1767022093613-ee137618421b` | Kebun jeruk di perbukitan — **belum dikonfirmasi valid** |
| About Ch03 (Kualitas) | `1536657464919-892534f60d6e` | Sama dengan Hero — pohon penuh jeruk |
| About Ch04 (Komunitas) | `1574570068419-a928da8c45c4` | Tangan memetik jeruk dari pohon — **belum dikonfirmasi valid** |

**Foto yang PASTI valid (dikonfirmasi terbuka di browser):**
- `photo-1536657464919-892534f60d6e` — Pohon jeruk (max iconquistador)
- `photo-b4JXSNMD1VE` → nama asli: `hand-picking-an-orange-from-a-tree-b4JXSNMD1VE`
  CDN URL: Belum terkonfirmasi penuh tapi page ada di https://unsplash.com/photos/hand-picking-an-orange-from-a-tree-b4JXSNMD1VE
- `photo-hsP0BnbXQHc` → kebun jeruk di perbukitan (Alexis Presa)
- `photo-2DfjRspDYJE` → jeruk tunggal dark background
- `photo-cTXxBBs3yNQ` → citrus dark moody (Monika Grabkowska)

**URL format yang BENAR untuk CSS background-image:**
```
https://images.unsplash.com/photo-[NUMERIC_ID]?w=1920&q=80&fit=crop
```
Note: Photo ID di Unsplash ada dua format:
1. Numeric: `photo-1536657464919-892534f60d6e` → pakai langsung sebagai `photo-[ID]`
2. Short: `b4JXSNMD1VE` → perlu di-resolve dulu ke format numeric

---

## 🔧 TASK YANG TERSISA

### PRIORITAS 1 — Fix Foto Unsplash di Hero & About
- [ ] Debug kenapa background photo tidak muncul di Hero
- [ ] Pastikan `isLoading` benar-benar resolve ke `false`
- [ ] Kalau URL foto salah, gunakan foto yang confirmed valid: `photo-1536657464919-892534f60d6e`
- [ ] Test About chapter photo cross-fade berfungsi dengan benar

### PRIORITAS 2 — Cari URL CDN yang tepat untuk semua foto
Gunakan browser untuk buka foto ini dan right-click → copy image address:
- https://unsplash.com/photos/b4JXSNMD1VE (tangan memetik jeruk — About Ch04)
- https://unsplash.com/photos/hsP0BnbXQHc (kebun perbukitan — About Ch02)
- https://unsplash.com/photos/V3DokM1NQcs (farmer harvesting — About Ch01)
- https://unsplash.com/photos/2DfjRspDYJE (jeruk dark bg — alternatif hero)

### PRIORITAS 3 — Verifikasi pinned scroll Hero berfungsi
- [ ] Scroll di browser, pastikan Hero ter-pin selama 100vh extra
- [ ] Pastikan content fade out smooth saat scroll
- [ ] Pastikan transition ke About section mulus

### PRIORITAS 4 — Polish visual kecil
- [ ] CTA button hero masih bertulisan "Lihat Produk" di navbar (perlu cek nav.ts)
- [ ] Navbar item "PRODUK" masih tampil (harus "HASIL KEBUN")

---

## 📁 FILE YANG DIMODIFIKASI SESI INI

```
src/components/sections/Hero/Hero.tsx          ← REVAMP BESAR
src/components/sections/Hero/Hero.module.css   ← Tambah .bgImage, .bgOverlayScroll
src/components/sections/About/About.tsx        ← REVAMP BESAR (foto cross-fade)
src/components/sections/About/About.module.css ← Ganti rings → photo frame
next.config.ts                                 ← Tambah Unsplash remotePatterns
```

## 📁 FILE YANG TIDAK BOLEH DIUBAH (masih kosong/skeleton)
```
src/components/sections/HasilKebun/  ← jangan ubah
src/components/sections/Gallery/     ← jangan ubah
src/components/sections/Testimonial/ ← jangan ubah
src/components/sections/Location/    ← jangan ubah
src/components/sections/Footer/      ← jangan ubah
```

---

## 🏁 CARA LANJUT DI SESI BARU

1. Baca `PROJECT_BRIEF.md` → visi bisnis
2. Baca `TECHNICAL_BRIEF.md` → arsitektur teknis
3. Baca file ini (`SESSION_PROGRESS.md`) → status terakhir
4. Jalankan `npm run dev` (bukan `npm run start`) agar ada hot-reload
5. Buka http://localhost:3000 di browser
6. Debug masalah foto Unsplash sesuai panduan di atas
7. Verifikasi pinned scroll Hero berfungsi
8. Lanjut ke task berikutnya

---

## 💡 KONTEKS PENTING UNTUK AI BARU

- Project ini **Next.js App Router** + **GSAP** + **Three.js** + **Lenis** (smooth scroll)
- Server saat ini berjalan dengan `npm run start` (production build) — untuk dev pakai `npm run dev`
- `LoadingContext` di `src/context/LoadingContext.tsx` mengontrol kapan animasi mulai
- Semua foto background pakai **CSS `background-image`**, bukan `<Image>` komponen Next.js
- GSAP ScrollTrigger pin berjalan karena Lenis disabled untuk scroll yang di-pin
- `ABOUT_CHAPTERS` ada di `src/data/about.ts`
- Navbar items ada di `src/data/nav.ts`
