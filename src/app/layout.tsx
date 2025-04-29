import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata = {
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
        url: "/favicon.png",
        width: 1200,
        height: 630,
        alt: "RecomBooks - Smart Book Recommendations",
      },
    ],
  },

  // Twitter Meta Tags
  twitter: {
    card: "summary_large_image",
    site: "@NayanSwarnkar04",
    creator: "@NayanSwarnkar04",
    title: "RecomBooks - Smart Book Discovery",
    description: "Smart Book Recommendations for Every Reader",
    images: ["/meta-image.png"],
  },

  // Additional Meta Tags
  alternates: {
    canonical: "https://book-recom-nayansoni.vercel.app",
  },

  // Basic Meta Tags
  authors: [
    { name: "Nayan Swarnkar", url: "https://twitter.com/NayanSwarnkar04" },
  ],
  creator: "Nayan Swarnkar",
  publisher: "RecomBooks",
  formatDetection: {
    telephone: false,
  },

  // Icons
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/icon.png", type: "image/png" }],
    other: [
      {
        rel: "apple-touch-icon",
        url: "/apple-touch-icon.png",
      },
    ],
  },

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
      <head>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${GeistSans.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
