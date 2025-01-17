import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

export const metadata: Metadata = {
  title: 'RecomBooks - Smart Book Discovery Platform',
  description:
    'Smart Book Recommendations for Every Reader. Discover your next favorite book with AI-powered personalized recommendations.',
  keywords: [
    'book recommendations',
    'AI book finder',
    'personalized reading',
    'book discovery',
    'reading suggestions',
    'smart book search',
    'RecomBooks',
  ],
  authors: [{ name: 'Nayan Swarnkar' }],
  creator: 'Nayan Swarnkar',
  publisher: 'RecomBooks',
  metadataBase: new URL('https://book-recom-nayansoni.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://book-recom-nayansoni.vercel.app',
    title: 'RecomBooks - Smart Book Discovery Platform',
    description: 'Smart Book Recommendations for Every Reader',
    siteName: 'RecomBooks',
    images: [
      {
        url: '/meta-image.png',
        width: 1200,
        height: 630,
        alt: 'RecomBooks - Smart Book Recommendations for Every Reader',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RecomBooks - Smart Book Discovery',
    description: 'Smart Book Recommendations for Every Reader',
    creator: '@NayanSwarnkar04',
    images: ['/meta-image.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${inter.variable} ${playfair.variable} ${GeistSans.variable} font-sans`}
      >
        {children}
      </body>
    </html>
  );
}
