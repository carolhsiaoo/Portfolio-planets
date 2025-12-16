import type { Metadata } from "next";
import "./globals.css";
import CursorStars from "@/components/CursorStars";

export const metadata: Metadata = {
  title: "Portfolio - Planets",
  description: "My personal portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className="antialiased overflow-x-hidden">
        <CursorStars />
        {children}
      </body>
    </html>
  );
}
