"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./Keunggulan.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CARDS = [
  {
    num: "01",
    title: "Farm-to-Table",
    subtitle: "Tanpa Perantara",
    desc: "Jeruk segar kami dipetik langsung dari kebun pada saat kematangan sempurna dan langsung dikirim ke pelanggan, memastikan rantai distribusi yang transparan dan adil bagi petani lokal.",
    image: "/images/keunggulan_farm.png",
  },
  {
    num: "02",
    title: "100% Organik Alami",
    subtitle: "Bebas Pestisida Kimia",
    desc: "Kami mengutamakan metode pembudidayaan yang ramah lingkungan dengan menggunakan pupuk organik buatan sendiri dan kontrol hama hayati demi menghasilkan jeruk yang sehat, aman, dan sarat nutrisi.",
    image: "/images/keunggulan_organik.png",
  },
  {
    num: "03",
    title: "Kualitas Terpilih",
    subtitle: "Sortir Ketat Manual",
    desc: "Setiap buah jeruk melewati proses seleksi manual (manual grading) oleh tangan-tangan ahli untuk memastikan hanya buah dengan tingkat kemanisan, kesegaran, dan ukuran terbaik yang sampai ke tangan Anda.",
    image: "/images/keunggulan_sortir.png",
  },
  {
    num: "04",
    title: "Dataran Tinggi Karo",
    subtitle: "Tanah Vulkanik Subur",
    desc: "Perkebunan kami terletak di dataran tinggi Karo yang sejuk. Kombinasi ketinggian, udara dingin, dan tanah vulkanik yang kaya mineral organik menghasilkan rasa jeruk manis segar yang khas dan sulit ditiru.",
    image: "/images/keunggulan_karo.png",
  },
];

export default function Keunggulan() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const cards = container.querySelectorAll(`.${styles.card}`);
    if (cards.length === 0) return;

    // Timeline GSAP untuk stacked cards
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${cards.length * 100}%`, // scroll 100vh per card tambahan
        pin: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
      },
    });

    cards.forEach((card, index) => {
      if (index === 0) return; // card 0 sudah di posisinya sejak awal

      // Card naik dari bawah
      tl.fromTo(
        card,
        { yPercent: 110, scale: 0.95 },
        { yPercent: 0, scale: 1, ease: "none", duration: 1 },
        index - 1
      );

      // Card sebelumnya mengecil dan memudar sedikit
      const prevCard = cards[index - 1];
      tl.to(
        prevCard,
        {
          scale: 0.92,
          opacity: 0.4,
          yPercent: -8,
          ease: "none",
          duration: 1,
        },
        index - 1
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} id="keunggulan" className={styles.section}>
      <div ref={containerRef} className={styles.pinContainer}>
        
        {/* Header di sisi kiri / atas */}
        <div className={styles.header}>
          <p className={styles.label}>Keunggulan Kami</p>
          <h2 className={styles.heading}>
            Mengapa OrangeDel<br />
            <em>begitu istimewa?</em>
          </h2>
        </div>

        {/* Container untuk kartu yang menumpuk */}
        <div className={styles.cardsContainer}>
          {CARDS.map((card, i) => (
            <div
              key={i}
              className={styles.card}
              style={{ zIndex: i + 1 }}
            >
              {/* Background image dengan overlay gelap */}
              <div
                className={styles.cardBg}
                style={{ backgroundImage: `url(${card.image})` }}
                aria-hidden="true"
              />
              <div className={styles.cardOverlay} aria-hidden="true" />

              {/* Konten Kartu */}
              <div className={styles.cardContent}>
                <span className={styles.cardNum}>{card.num}</span>
                <div className={styles.cardMeta}>
                  <p className={styles.cardSubtitle}>{card.subtitle}</p>
                  <h3 className={styles.cardTitle}>{card.title}</h3>
                </div>
                <p className={styles.cardDesc}>{card.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
