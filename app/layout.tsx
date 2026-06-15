import type { Metadata } from "next";
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

const siteUrl = "https://www.carolhsiao.com";

export const metadata: Metadata = {
  title: {
    default: "Carol Hsiao | Product Designer in Calgary",
    template: "%s | Carol Hsiao",
  },
  description:
    "Carol Hsiao is a product designer at Aburi Studio in Calgary, specializing in UI/UX design, user research, and frontend development. View portfolio projects including FireFree, DailyWage, and CoreHour.",
  metadataBase: new URL(siteUrl),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Carol Hsiao | Product Designer in Calgary",
    description:
      "Product designer specializing in UI/UX design, user research, and frontend development. Portfolio featuring finance apps, time-tracking tools, and spatial experiences.",
    url: siteUrl,
    siteName: "Carol Hsiao Portfolio",
    locale: "en_CA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carol Hsiao | Product Designer",
    description:
      "Product designer at Aburi Studio in Calgary. UI/UX design, user research, and frontend development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

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
              jobTitle: "Product Designer",
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
