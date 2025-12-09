import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { ThemeProvider } from '@/components/providers/ThemeProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Rick & Morty Explorer',
    template: '%s | Rick & Morty Explorer',
  },
  description: 'Explore characters and episodes from the Rick and Morty universe',
  keywords: ['Rick and Morty', 'characters', 'episodes', 'cartoon', 'Adult Swim'],
  authors: [{ name: 'Rick & Morty Explorer' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'Rick & Morty Explorer',
    description: 'Explore characters and episodes from the Rick and Morty universe',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen`}>
        <ThemeProvider>
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
