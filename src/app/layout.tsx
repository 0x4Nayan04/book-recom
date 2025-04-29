import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://book-recom-nayansoni.vercel.app'),
  title: "RecomBooks - Smart Book Recommendations",
  description:
    "Discover personalized book recommendations based on your interests and preferences. Find your next favorite read with RecomBooks.",
  openGraph: {
    title: "RecomBooks - Smart Book Recommendations",
    description:
      "Discover personalized book recommendations based on your interests and preferences. Find your next favorite read with RecomBooks.",
    url: "https://book-recom-nayansoni.vercel.app/",
    siteName: "RecomBooks",
    images: [
      {
        url: "/favicon_io/android-chrome-512x512.png",
        width: 512,
        height: 512,
        alt: "RecomBooks - Smart Book Recommendations",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@NayanSwarnkar04",
    creator: "@NayanSwarnkar04",
    title: "RecomBooks - Smart Book Discovery",
    description: "Smart Book Recommendations for Every Reader",
    images: ["/favicon_io/android-chrome-512x512.png"],
  },
  alternates: {
    canonical: "https://book-recom-nayansoni.vercel.app",
  },
  authors: [
    { name: "Nayan Swarnkar", url: "https://twitter.com/NayanSwarnkar04" },
  ],
  creator: "Nayan Swarnkar",
  publisher: "RecomBooks",
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon.ico" },
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/favicon_io/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  keywords: [
    "book recommendations",
    "AI book finder",
    "personalized reading",
    "book discovery",
    "reading suggestions",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${playfair.variable} ${GeistSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
