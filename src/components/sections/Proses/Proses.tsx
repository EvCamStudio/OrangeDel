"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./Proses.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const STEPS = [
  {
    num: "01",
    title: "Pemilihan Bibit",
    label: "Tanam",
    desc: "Memilih varietas bibit jeruk Siam & Keprok unggulan yang sehat untuk ditanam di tanah vulkanik dataran tinggi Karo yang subur dan kaya mineral.",
    image: "/images/proses_tanam.png",
  },
  {
    num: "02",
    title: "Perawatan Organik",
    label: "Rawat",
    desc: "Merawat pohon jeruk menggunakan pupuk kompos alami buatan sendiri dan sistem irigasi air gunung bersih tanpa zat kimia sintetis.",
    image: "/images/proses_rawat.png",
  },
  {
    num: "03",
    title: "Pemetikan Manual",
    label: "Panen",
    desc: "Setiap buah jeruk dipetik secara manual satu per satu oleh petani terampil hanya pada saat buah telah matang optimal di pohon.",
    image: "/images/proses_panen.png",
  },
  {
    num: "04",
    title: "Penyortiran Ketat",
    label: "Seleksi",
    desc: "Hasil panen disortir secara manual berdasarkan ukuran, berat, kemulusan kulit, dan tingkat kemanisan untuk jaminan kualitas mutu.",
    image: "/images/proses_seleksi.png",
  },
  {
    num: "05",
    title: "Pengiriman Segar",
    label: "Kirim",
    desc: "Jeruk dikemas dengan bahan ramah lingkungan dan didistribusikan langsung ke kota tujuan di hari yang sama agar kesegaran alaminya terjaga.",
    image: "/images/proses_kirim.png",
  },
];

export default function Proses() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    const title = titleRef.current;
    if (!section || !track || !title) return;

    // Split title for text reveal
    const splitTitle = new SplitType(title, { types: "lines" });
    splitTitle.lines?.forEach((line) => {
      const wrap = document.createElement("div");
      wrap.style.overflow = "hidden";
      wrap.style.display = "block";
      line.parentNode?.insertBefore(wrap, line);
      wrap.appendChild(line);
    });

    const scrollWidth = track.scrollWidth - window.innerWidth;

    const mainTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top top",
        end: `+=${track.scrollWidth}`, // Scroll distance equals track width
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });

    // Horizontal translate track
    mainTl.to(track, {
      x: -scrollWidth - 100, // extra offset for smooth end padding
      ease: "none",
    });

    // Animate title split reveal
    const titleTrigger = ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      onEnter: () => {
        gsap.fromTo(
          splitTitle.lines ?? [],
          { yPercent: 110 },
          { yPercent: 0, duration: 1, stagger: 0.1, ease: "power4.out" }
        );
      },
    });

    return () => {
      mainTl.kill();
      titleTrigger.kill();
      splitTitle.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="proses" className={styles.section}>
      <div className={styles.container}>
        
        {/* Header (Tetap terlihat di atas / kiri saat di-pin) */}
        <div className={styles.header}>
          <p className={styles.label}>Proses Kami</p>
          <h2 ref={titleRef} className={styles.heading}>
            Dari kebun ke tanganmu, <br />
            <em>perjalanan kualitas jeruk terbaik.</em>
          </h2>
        </div>

        {/* Horizontal Scroll Track */}
        <div ref={trackRef} className={styles.track}>
          {STEPS.map((step, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.imageWrap}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${step.image})` }}
                  aria-hidden="true"
                />
                <div className={styles.imageOverlay} aria-hidden="true" />
                <span className={styles.cardNum}>{step.num}</span>
              </div>
              <div className={styles.cardBody}>
                <span className={styles.cardLabel}>{step.label}</span>
                <h3 className={styles.cardTitle}>{step.title}</h3>
                <p className={styles.cardDesc}>{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
