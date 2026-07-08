import { Cinzel, Noto_Sans, Noto_Sans_TC } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import "./globals.css";
import LazyCursorStars from "@/components/LazyCursorStars";
import PageTransitionProvider from "@/components/PageTransition";
import { LanguageProvider } from "@/components/LanguageContext";


const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-cinzel",
  display: "swap",
});

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-tc",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="overscroll-none">
      <head>
        <link rel="preload" href="/models/planets.glb" as="fetch" crossOrigin="anonymous" fetchPriority="low" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Carol Hsiao",
              jobTitle: "Interactive Designer",
              url: "https://www.carolhsiao.com",
              sameAs: [
                "https://www.linkedin.com/in/carol-hsiao-5779a1158/",
                "https://github.com/carolhsiaoo",
                "https://dribbble.com/carolhsiao",
                "https://www.instagram.com/itscarolstudio",
                "https://x.com/CarolXiaoo",
                "https://www.threads.com/@itscarolstudio",
              ],
              worksFor: {
                "@type": "Organization",
                name: "Aburi Studio",
                url: "https://aburistudio.com",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Calgary",
                addressRegion: "AB",
                addressCountry: "CA",
              },
              knowsAbout: [
                "UI/UX Design",
                "Product Design",
                "User Research",
                "Frontend Development",
                "React",
                "Next.js",
              ],
            }),
          }}
        />
      </head>
      <body className={`${cinzel.variable} ${notoSans.variable} ${notoSansTC.variable} antialiased overflow-x-clip`}>
        <LanguageProvider>
          <LazyCursorStars />
          <PageTransitionProvider>
            {children}
          </PageTransitionProvider>
        </LanguageProvider>
      </body>
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </html>
  );
}
