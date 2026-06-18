# Proposal Detail Website — OrangeDel
## Kategori: Lomba Web Design (Sub-Tema: UMKM & Kewirausahaan)

Dokumen ini berisi penjelasan mendalam mengenai detail teknis, desain, dan konsep filosofis dari website **OrangeDel** sebagai bahan penyusunan proposal lomba.

---

## 1. Pendahuluan & Latar Belakang

### Urgensi Digitalisasi Agrikultur
Indonesia kaya akan hasil bumi, salah satunya adalah komoditas jeruk yang melimpah di berbagai daerah seperti dataran tinggi Karo. Namun, sebagian besar pelaku usaha tani (UMKM) masih terjebak dalam rantai distribusi tradisional dan kurang memiliki identitas brand yang kuat secara digital. 

**OrangeDel** hadir sebagai solusi digital berupa *company profile* premium untuk UMKM perkebunan jeruk lokal. Tujuannya adalah membuktikan bahwa produk pertanian lokal layak bersanding dengan brand global.

### Positioning Statement
> *"Orange Del adalah kebun jeruk yang cukup serius untuk memiliki brand sendiri."*

Website ini dirancang bukan sebagai *e-commerce / toko online* transaksional, melainkan sebagai media **Brand Building & Awareness**. Tujuannya adalah membangun reputasi kebun profesional yang mengutamakan kualitas, sehingga calon pembeli (baik ritel maupun skala besar) percaya dan tergerak untuk menghubungi langsung melalui kontak personal (WhatsApp).

---

## 2. Visi Desain & Estetika (Visual Concept)

Untuk membedakan proyek ini dari kompetitor lomba yang umumnya memilih tema fashion, makanan, atau kerajinan tangan, OrangeDel mengambil pendekatan desain yang sangat kontras: **"Dark Luxury Citrus"**.

### Palet Warna (Color System)
Warna gelap dipilih secara sengaja sebagai background utama agar warna buah jeruk yang oranye-kuning cerah dapat **menonjol secara maksimal (pop-out)** secara visual.
* **Background Utama (`#080804`):** Hitam hangat (*warm black*) yang memberi kesan premium dan misterius.
* **Surface/Cards (`#141310`):** Abu-hitam hangat untuk membedakan kontainer kartu informasi.
* **Oranye Utama (`#FF6B00`):** Warna brand representasi dari buah jeruk segar yang matang.
* **Aksen Emas (`#D4A017`):** Menegaskan kesan mewah (*luxury*) dan kualitas terpilih.
* **Teks Primer (`#F5F0E8`):** Putih hangat agar nyaman dibaca di latar belakang gelap.
* **Teks Sekunder (`#9A9488`):** Abu-abu hangat untuk informasi pendukung/sub-teks.

### Tipografi (Typography)
* **Font Display/Heading (Cormorant Italic):** Font serif yang elegan, tipis, dan berkelas klasik. Digunakan untuk judul besar demi memperkuat nuansa *luxury*.
* **Font Body/UI (DM Sans):** Font sans-serif yang bersih, modern, dan memiliki tingkat keterbacaan (*readability*) yang tinggi pada berbagai ukuran layar.

---

## 3. Struktur Konten & Alur Scroll (UX Journey)

Website ini dirancang menggunakan konsep **Single-Page Scroll Experience** bergaya editorial/Awwwards. Setiap perpindahan bagian (section) didesain secara sinematik dengan struktur sebagai berikut:

```
[1. HERO — Pinned Immersive Intro]
       ↓
[2. INTERLUDE 1 — Filosofi Kebun] (Typographic Statement)
       ↓
[3. TENTANG KAMI — Pinned Storytelling] (Chapter 01 - 04)
       ↓
[4. KEUNGGULAN — Stacked Cards Effect] (4 Nilai Tambah)
       ↓
[5. HASIL KEBUN — Premium Citrus Showcase] (Grid interaktif)
       ↓
[6. PROSES KAMI — Pinned Horizontal Scroll] (5 Langkah Perjalanan)
       ↓
[7. GALERI KEBUN — Masonry Editorial Layout] (Foto Otentik)
       ↓
[8. TESTIMONI — Stacked Card Review] (Social Proof)
       ↓
[9. LOKASI & KONTAK — Dark Map & WhatsApp CTA]
       ↓
[FOOTER — Minimalist Luxury Navigation]
```

---

## 4. Analisis Teknis & Fitur Unggulan (Tech Stack)

### Teknologi Utama:
* **Next.js 16 (App Router) & TypeScript:** Menjamin performa pemuatan halaman yang cepat, struktur folder terorganisir, serta pengetikan kode yang aman dari bug (*type-safe*).
* **GSAP (GreenSock Animation Platform) & ScrollTrigger:** Mengontrol seluruh animasi berbasis scroll secara presisi dan teroptimasi untuk performa tinggi.
* **Lenis Smooth Scroll:** Memberikan pengalaman scrolling yang sangat halus (*smooth-scrolling*) di semua browser dan sistem operasi.
* **CSS Modules (Vanilla CSS):** Kontrol penuh atas styling tanpa ketergantungan utility class yang rumit, menjaga fleksibilitas desain estetika tinggi.

### Detail Mekanisme Animasi:

1. **Entrance Loading Screen (Ripple Splash Reveal):**
   Mencegah flash putih saat halaman dimuat. Animasi berupa penghitung persentase progres melingkar yang mengembun menjadi tetesan jeruk, lalu jatuh bebas ke bawah dan memicu riak lingkaran (*ripple splash*) yang membuka seluruh halaman utama.

2. **Hero Cinematic Transition:**
   Saat scroll dimulai, background foto kebun jeruk membesar perlahan (zoom-in), overlay gelap mengaburkan suasana, sementara teks judul meluncur naik keluar layar secara paralel menciptakan efek kedalaman 3D (*parallax layers*).

3. **About Pinned Storytelling:**
   Membagi profil kebun dalam 4 Chapter (Asal Usul, Lahan, Kualitas, Komunitas). Teks cerita akan bergulir di sebelah kiri, sementara panel foto di sebelah kanan ter-pin dan berganti foto secara otomatis (*cross-fade*) sinkron dengan chapter yang aktif.

4. **Keunggulan Stacked Cards:**
   Menggunakan pinned scroll di mana kartu keunggulan berikutnya akan meluncur dari bawah menumpuk kartu sebelumnya secara bertahap, memberikan efek interaksi penumpukan yang sinematik.

5. **Proses Horizontal Scroll Track:**
   Mengubah scroll vertikal menjadi horizontal untuk menceritakan proses pembibitan hingga pengiriman jeruk. Track horizontal bergeser lancar seiring scroll roda mouse, memberikan variasi interaksi agar juri/pengguna tidak bosan.

6. **Lokasi & Dark Maps Integration:**
   Peta lokasi kebun diintegrasikan menggunakan Google Maps iframe dengan filter CSS (`grayscale` & `invert`) agar warna peta menyatu sempurna dengan estetika gelap website tanpa merusak visualisasi jalan.

---

## 5. Mengapa Website Ini Kuat untuk Lomba?

1. **Topik yang Anti-Mainstream:**
   Peserta lomba umumnya mendesain web UMKM kuliner kekinian atau fashion. Memilih agrikultur (kebun jeruk) dengan visualisasi luxury kelas dunia langsung memberikan faktor *standout* (berbeda dari yang lain).
2. **Keseimbangan Estetika & Keterbacaan:**
   Meskipun menggunakan tema gelap, penempatan warna aksen emas dan oranye diletakkan secara presisi pada elemen penting (CTA, Heading, Status), menjaga keterbacaan teks tetap optimal.
3. **Eksekusi Animasi Berkualitas Tinggi:**
   Penggunaan GSAP ScrollTrigger dan Lenis menghasilkan animasi scroll yang interaktif tanpa lag, memberikan kesan situs web profesional berskala internasional.
