import type { Metadata } from "next";
import { Cinzel, Noto_Sans } from "next/font/google";
import "./globals.css";
import CursorStars from "@/components/CursorStars";

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

export const metadata: Metadata = {
  title: "Carol Hsiao | Product Builder",
  description: "My personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`${cinzel.variable} ${notoSans.variable} antialiased overflow-x-hidden`}>
        <CursorStars />
        {children}
      </body>
    </html>
  );
}
