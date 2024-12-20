import { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Book Recommendations',
  description: 'Get personalized book recommendations based on your preferences',
  icons: {
    icon: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}; 