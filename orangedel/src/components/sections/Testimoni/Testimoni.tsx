"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./Testimoni.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TESTIMONIALS = [
  {
    quote: "Kualitas jeruk Siam dari OrangeDel benar-benar luar biasa. Keseimbangan rasa manis dan asamnya sempurna, sangat segar dan berair. Kami menggunakannya untuk sajian penutup di restoran kami.",
    author: "Chef Andra",
    role: "Culinary Director, Bali",
    rating: 5,
  },
  {
    quote: "Sebagai distributor buah segar premium, kami sangat pemilih. OrangeDel adalah satu-satunya kebun yang konsisten memberikan grade jeruk terbaik. Konsumen kami selalu menanyakan jeruk ini.",
    author: "Toko Buah Segar",
    role: "Premium Fruit Supplier, Bandung",
    rating: 5,
  },
  {
    quote: "Jeruknya dipetik langsung dari pohon dan sampai di rumah masih sangat segar. Kulitnya bersih dan daging buahnya tebal. Anak-anak saya sangat menyukainya. Sangat direkomendasikan!",
    author: "Keluarga Santoso",
    role: "Pelanggan Setia, Yogyakarta",
    rating: 5,
  },
];

export default function Testimoni() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current?.querySelectorAll(`.${styles.card}`);
    const title = titleRef.current;

    if (!section || !title) return;

    // Split title for text reveal
    const splitTitle = new SplitType(title, { types: "lines" });
    splitTitle.lines?.forEach((line) => {
      const wrap = document.createElement("div");
      wrap.style.overflow = "hidden";
      wrap.style.display = "block";
      line.parentNode?.insertBefore(wrap, line);
      wrap.appendChild(line);
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
        toggleActions: "play none none none",
      },
    });

    tl.from(splitTitle.lines ?? [], {
      yPercent: 110,
      duration: 1,
      stagger: 0.1,
      ease: "power4.out",
    });

    if (cards && cards.length > 0) {
      tl.from(
        cards,
        {
          opacity: 0,
          y: 60,
          scale: 0.95,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        },
        "-=0.6"
      );
    }

    return () => {
      tl.kill();
      splitTitle.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="testimoni" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.label}>Testimoni</p>
          <h2 ref={titleRef} className={styles.heading}>
            Dipercaya oleh mereka yang<br />
            <em>menghargai rasa & kualitas.</em>
          </h2>
        </div>

        <div ref={cardsRef} className={styles.cardsGrid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className={styles.card}>
              <div className={styles.quoteIcon} aria-hidden="true">“</div>
              <div className={styles.rating}>
                {Array.from({ length: t.rating }).map((_, idx) => (
                  <span key={idx} className={styles.star}>★</span>
                ))}
              </div>
              <p className={styles.quoteText}>{t.quote}</p>
              <div className={styles.divider} />
              <div className={styles.authorInfo}>
                <h4 className={styles.authorName}>{t.author}</h4>
                <p className={styles.authorRole}>{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
