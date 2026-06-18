"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./Gallery.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const IMAGES = [
  {
    title: "Suasana Pagi Kebun",
    desc: "Kabut tipis menyelimuti deretan pohon jeruk di lereng bukit Karo.",
    url: "/images/gallery_suasana_pagi.png",
    size: "large",
  },
  {
    title: "Panen Jeruk Siam",
    desc: "Petani kami memetik buah jeruk segar yang matang sempurna langsung dari pohon.",
    url: "/images/gallery_panen.png",
    size: "medium",
  },
  {
    title: "Detail Kualitas Buah",
    desc: "Bulir buah jeruk yang padat dan kaya akan kandungan air vitamin C alami.",
    url: "/images/gallery_kualitas.png",
    size: "small",
  },
  {
    title: "Dedikasi Pertanian",
    desc: "Pohon jeruk pilihan yang dirawat sepenuh hati tanpa pestisida kimia sintetis.",
    url: "/images/gallery_dedikasi.png",
    size: "small",
  },
  {
    title: "Hasil Panen Melimpah",
    desc: "Keranjang penuh jeruk siap sortir untuk didistribusikan hari ini.",
    url: "/images/gallery_melimpah.png",
    size: "medium",
  },
  {
    title: "Kesegaran Citrus",
    desc: "Visualisasi detail warna oranye segar alami dari kulit jeruk pilihan.",
    url: "/images/gallery_kesegaran.png",
    size: "large",
  },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const items = gridRef.current?.querySelectorAll(`.${styles.item}`);

    if (!section || !title || !items) return;

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
      items,
      {
        opacity: 0,
        y: 40,
        scale: 0.98,
        duration: 0.8,
        stagger: 0.1,
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
    <section ref={sectionRef} id="galeri" className={styles.section}>
      <div className={styles.container}>
        
        {/* Header */}
        <div className={styles.header}>
          <p className={styles.label}>Galeri Kebun</p>
          <h2 ref={titleRef} className={styles.heading}>
            Suasana dan keindahan alam<br />
            <em>di perkebunan OrangeDel.</em>
          </h2>
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className={styles.grid}>
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className={`${styles.item} ${styles[img.size]}`}
            >
              <div
                className={styles.image}
                style={{ backgroundImage: `url(${img.url})` }}
                aria-label={img.title}
              />
              <div className={styles.overlay} aria-hidden="true" />
              <div className={styles.meta}>
                <h3 className={styles.itemTitle}>{img.title}</h3>
                <p className={styles.itemDesc}>{img.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
