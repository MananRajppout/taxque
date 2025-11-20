import '../styles/globals.css';
import '@livekit/components-styles';
import '@livekit/components-styles/prefabs';
import type { Metadata, Viewport } from 'next';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: {
    default: 'Taxque Meet | Best Video Conferencing Solution',
    template: '%s',
  },
  description:
    'Taxque Meet is the best video conferencing solution for your business. It is a platform that allows you to conduct meetings with your team members and clients.',
  twitter: {
    creator: '@taxque',
    site: '@taxque',
    card: 'summary_large_image',
  },
  openGraph: {
    url: 'https://meet.taxque.com',
    images: [
      {
        url: '/images/open-graph.png',
        width: 2000,
        height: 1000,
        type: 'image/png',
      },
    ],
    siteName: 'Taxque Meet | Best Video Conferencing Solution',
  },
  icons: {
    icon: {
      rel: 'icon',
      url: '/favicon.ico',
    },
    apple: [
      {
        rel: 'apple-touch-icon',
        url: '/images/apple-touch-icon.png',
        sizes: '180x180',
      },
      { rel: 'mask-icon', url: '/images/mask-icon.svg', color: '#070707' },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: '#070707',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body data-lk-theme="default">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
