import { Inter, Playfair_Display } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import { cn } from '@/lib/utils';
import '@/app/globals.css';
import type { Metadata, Viewport } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RecomBooks - Smart Book Recommendations',
  description:
    'Discover your next favorite book with AI-powered personalized recommendations',
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          inter.variable,
          playfair.variable,
          GeistSans.variable
        )}
      >
        {children}
      </body>
    </html>
  );
}
