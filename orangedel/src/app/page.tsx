"use client";

import { useEffect } from "react";
import { useLoading } from "@/context/LoadingContext";
import { useLenis } from "@/hooks/useLenis";

import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import HeroTransition from "@/components/sections/HeroTransition/HeroTransition";
import About from "@/components/sections/About/About";
import HasilKebun from "@/components/sections/HasilKebun/HasilKebun";
import Gallery from "@/components/sections/Gallery/Gallery";
import Testimonial from "@/components/sections/Testimonial/Testimonial";
import Location from "@/components/sections/Location/Location";
import Contact from "@/components/sections/Contact/Contact";
import Footer from "@/components/sections/Footer/Footer";

import styles from "./page.module.css";

export default function Home() {
  const { isLoading } = useLoading();

  // Reset scroll ke atas dan cegah scroll restoration otomatis bawaan browser pada saat refresh
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  // Aktifkan Lenis smooth scroll setelah loading selesai
  useLenis(isLoading);

  return (
    <div className={styles.page}>
      {/* Loading Screen — selalu render, animasi exit sendiri */}
      <LoadingScreen />

      {/* Main content — muncul di balik loading screen */}
      <div className={styles.mainContent}>
        <Navbar />
        <main>
          <Hero />
          <HeroTransition />
          <About />
          <HasilKebun />
          <Gallery />
          <Testimonial />
          <Location />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
}
