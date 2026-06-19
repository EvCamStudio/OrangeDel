"use client";

import { NAV_ITEMS } from "@/data/nav";
import { getLenis } from "@/lib/lenis";
import styles from "./Footer.module.css";

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const lenis = getLenis();
    const target = document.querySelector(href);
    if (!target) return;

    const computedStyle = window.getComputedStyle(target);
    const paddingTop = parseFloat(computedStyle.paddingTop) || 0;
    const scrollOffset = paddingTop - 80;

    if (lenis) {
      lenis.scrollTo(target as HTMLElement, {
        offset: scrollOffset,
        duration: 1.6,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      const top = target.getBoundingClientRect().top + window.scrollY + scrollOffset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      {/* Garis Aksen Oranye Emas */}
      <div className={styles.accentLine} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.grid}>
          
          {/* Sisi Kiri: Brand & Tagline */}
          <div className={styles.brand}>
            <h3 className={styles.logo}>
              Orange<em>Del</em>
            </h3>
            <p className={styles.tagline}>
              Kebun jeruk premium dengan dedikasi penuh pada kualitas rasa dan kesegaran alamiah.
            </p>
          </div>

          {/* Sisi Kanan: Tautan Navigasi */}
          <div className={styles.nav}>
            <h4 className={styles.navTitle}>Navigasi</h4>
            <ul className={styles.navList}>
              {NAV_ITEMS.map((item, i) => (
                <li key={i}>
                  <a
                    href={item.href}
                    onClick={(e) => handleScroll(e, item.href)}
                    className={styles.navLink}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Garis Pembatas Bawah */}
        <div className={styles.divider} aria-hidden="true" />

        {/* Informasi Hak Cipta */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            © {new Date().getFullYear()} OrangeDel. All rights reserved. dibuat untuk Lomba Web Design.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialLink} aria-label="Instagram">Instagram</a>
            <a href="#" className={styles.socialLink} aria-label="Facebook">Facebook</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
