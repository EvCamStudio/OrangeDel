import type { Metadata } from "next";
import { Cormorant, DM_Sans } from "next/font/google";
import { LoadingProvider } from "@/context/LoadingContext";
import "./globals.css";

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "OrangeDel — Kebun Jeruk Premium",
  description:
    "OrangeDel adalah platform digital kebun jeruk premium. Temukan kesegaran jeruk pilihan langsung dari kebun kami.",
  keywords: ["jeruk", "kebun jeruk", "OrangeDel", "buah segar", "UMKM"],
  openGraph: {
    title: "OrangeDel — Kebun Jeruk Premium",
    description: "Platform digital kebun jeruk premium. Jeruk pilihan langsung dari kebun.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
