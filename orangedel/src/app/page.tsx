"use client";

import { useLoading } from "@/context/LoadingContext";
import { useLenis } from "@/hooks/useLenis";

import LoadingScreen from "@/components/LoadingScreen/LoadingScreen";
import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/sections/Hero/Hero";
import About from "@/components/sections/About/About";
import Product from "@/components/sections/Product/Product";
import Gallery from "@/components/sections/Gallery/Gallery";
import Testimonial from "@/components/sections/Testimonial/Testimonial";
import Location from "@/components/sections/Location/Location";
import Contact from "@/components/sections/Contact/Contact";
import Footer from "@/components/sections/Footer/Footer";

import styles from "./page.module.css";

export default function Home() {
  const { isLoading } = useLoading();

  // Aktifkan Lenis smooth scroll setelah loading selesai
  useLenis();

  return (
    <div className={styles.page}>
      {/* Loading Screen — selalu render, animasi exit sendiri */}
      <LoadingScreen />

      {/* Main content — muncul setelah loading selesai */}
      <div
        className={styles.mainContent}
        style={{ visibility: isLoading ? "hidden" : "visible" }}
      >
        <Navbar />
        <main>
          <Hero />
          <About />
          <Product />
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
