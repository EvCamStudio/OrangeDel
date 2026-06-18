"use client";

import { useEffect, useState } from "react";
import styles from "./FloatingWA.module.css";

export default function FloatingWA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling past 50% of the viewport height (e.g. past hero cover)
      if (window.scrollY > window.innerHeight * 0.5) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to handle loaded states
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <a
      href="https://wa.me/6281263608108"
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.floatingWA} ${isVisible ? styles.visible : ""}`}
      aria-label="Hubungi kami via WhatsApp"
    >
      <svg
        className={styles.icon}
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.97C16.59 1.967 14.12 1.052 12.008 1.052c-5.442 0-9.866 4.372-9.87 9.802 0 1.764.476 3.49 1.38 5.02l-.999 3.649 3.737-.969z" />
      </svg>
    </a>
  );
}
