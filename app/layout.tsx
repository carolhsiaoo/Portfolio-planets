import type { Metadata } from "next";
import { Cinzel, Noto_Sans, Noto_Sans_TC } from "next/font/google";
import "./globals.css";
import CursorStars from "@/components/CursorStars";
import PageTransitionProvider from "@/components/PageTransition";
import { LanguageProvider } from "@/components/LanguageContext";


const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Carol Hsiao | Product Designer",
  description: "My personal portfolio website showcasing my work as a product designer",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-none">
      <head>
        <link rel="preload" href="/models/planets.glb" as="fetch" crossOrigin="anonymous" />
      </head>
      <body className={`${cinzel.variable} ${notoSans.variable} ${notoSansTC.variable} antialiased overflow-x-clip`}>
        <LanguageProvider>
          <CursorStars />
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
