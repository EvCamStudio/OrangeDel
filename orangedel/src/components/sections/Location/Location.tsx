"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import styles from "./Location.module.css";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Location() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const leftCol = leftColRef.current;
    const map = mapRef.current;

    if (!section || !title || !leftCol || !map) return;

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
    })
      .from(
        leftCol.children,
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.6"
      )
      .from(
        map,
        {
          opacity: 0,
          scale: 0.96,
          duration: 1,
          ease: "power2.out",
        },
        "-=0.8"
      );

    return () => {
      tl.kill();
      splitTitle.revert();
    };
  }, []);

  return (
    <section ref={sectionRef} id="lokasi" className={styles.section}>
      <div className={styles.container}>
        
        <div className={styles.grid}>
          
          {/* Kolom Kiri: Informasi Kontak */}
          <div ref={leftColRef} className={styles.leftCol}>
            
            <div className={styles.header}>
              <p className={styles.label}>Hubungi Kami</p>
              <h2 ref={titleRef} className={styles.heading}>
                Kunjungi kebun kami atau<br />
                <em>hubungi langsung hari ini.</em>
              </h2>
            </div>

            <div className={styles.infoGroup}>
              <div className={styles.infoItem}>
                <h4 className={styles.infoTitle}>Alamat Kebun</h4>
                <p className={styles.infoText}>
                  Jl. Raya Bukit Klasik No. 45,<br />
                  Kecamatan Barusjahe, Dataran Tinggi Karo,<br />
                  Sumatera Utara, Indonesia
                </p>
              </div>

              <div className={styles.infoItem}>
                <h4 className={styles.infoTitle}>Jam Operasional</h4>
                <p className={styles.infoText}>
                  Senin – Sabtu: 08:00 – 17:00 WIB<br />
                  Minggu: Tutup (Hanya melayani janji temu khusus)
                </p>
              </div>

              <div className={styles.infoItem}>
                <h4 className={styles.infoTitle}>Kontak Cepat</h4>
                <p className={styles.infoText}>
                  WhatsApp: +62 812-6360-8108<br />
                  Email: evcamstudio@gmail.com
                </p>
              </div>
            </div>

            <div className={styles.ctaWrap}>
              <a
                href="https://wa.me/6281263608108"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.waButton}
              >
                <svg
                  className={styles.waIcon}
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.967 14.12 1.052 12.008 1.052c-5.442 0-9.866 4.372-9.87 9.802 0 1.764.476 3.49 1.38 5.02l-.999 3.649 3.737-.969z" />
                </svg>
                Hubungi via WhatsApp
              </a>
            </div>

          </div>

          {/* Kolom Kanan: Google Maps Dark Style */}
          <div ref={mapRef} className={styles.mapWrap}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15943.43301980836!2d98.57143929999999!3d3.1324707000000003!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3031023a7be177b9%3A0xa6c268a737f5979c!2sBarusjahe%2C%20Karo%20Regency%2C%20North%20Sumatra!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className={styles.mapIframe}
              title="Lokasi Perkebunan OrangeDel"
            />
          </div>

        </div>

      </div>
    </section>
  );
}
