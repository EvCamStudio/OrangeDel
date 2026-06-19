"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./HasilKebun.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const PRODUCTS = [
  {
    name: "Jeruk Siam",
    grade: "Grade A — Sweet & Juicy",
    desc: "Memiliki rasa manis segar yang dominan dengan kadar air melimpah dan kulit yang tipis. Sangat cocok untuk diperas menjadi jus segar murni atau dinikmati langsung.",
    image: "/images/produk_siam.png",
  },
  {
    name: "Jeruk Keprok",
    grade: "Premium — Rich Aroma",
    desc: "Berukuran sedang hingga besar dengan aroma khas yang harum kuat. Daging buahnya padat, manis legit, dan memiliki tekstur bulir besar yang memuaskan.",
    image: "/images/produk_keprok.png",
  },
  {
    name: "Jeruk Lemon",
    grade: "Specialty — Fresh & Sour",
    desc: "Berwarna kuning cerah memikat dengan keasaman tinggi yang bersih dan menyegarkan. Sangat kaya akan vitamin C, ideal untuk infusi air, kuliner, dan minuman hangat.",
    image: "/images/produk_lemon.png",
  },
  {
    name: "Jeruk Mandarin",
    grade: "Select — Sweet Honey",
    desc: "Ukurannya yang kecil mungil membuatnya praktis dikonsumsi. Rasanya manis pekat seperti madu, mudah dikupas, dan hampir tanpa biji — favorit anak-anak.",
    image: "/images/produk_mandarin.png",
  },
];

export default function HasilKebun() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const cards = gridRef.current?.querySelectorAll(`.${styles.card}`);

    if (!section || !title || !cards) return;

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
    }).from(
      cards,
      {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.12,
        ease: "power3.out",
      },
      "-=0.6"
    );

    return () => {
      tl.kill();
      splitTitle.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="hasil-kebun" className={styles.section}>
      <div className={styles.container}>
        
        {/* Header Section */}
        <div className={styles.header}>
          <p className={styles.label}>Hasil Kebun</p>
          <h2 ref={titleRef} className={styles.heading}>
            Varietas jeruk pilihan terbaik<br />
            <em>yang kami budidayakan.</em>
          </h2>
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className={styles.grid}>
          {PRODUCTS.map((prod, i) => (
            <div key={i} className={styles.card}>
              
              {/* Card Image */}
              <div className={styles.imageWrap}>
                <div
                  className={styles.image}
                  style={{ backgroundImage: `url(${prod.image})` }}
                  aria-hidden="true"
                />
                <div className={styles.imageOverlay} aria-hidden="true" />
              </div>

              {/* Card Body */}
              <div className={styles.cardBody}>
                <span className={styles.cardGrade}>{prod.grade}</span>
                <h3 className={styles.cardTitle}>{prod.name}</h3>
                <p className={styles.cardDesc}>{prod.desc}</p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
