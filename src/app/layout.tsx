import type { Metadata } from 'next';
import { Syne, DM_Sans, Noto_Kufi_Arabic } from 'next/font/google';
import './globals.css';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const notoKufi = Noto_Kufi_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-arabic',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Mesbar | مسبار — AI Career Intelligence',
  description:
    'AI-powered career intelligence platform for Technology and Business & Management professionals. Discover your path, build your CV, and land your dream role.',
  keywords: [
    'career intelligence', 'AI career', 'career path', 'CV builder', 'ATS', 'mock interview',
    'career roadmap', 'مسبار', 'مسار مهني', 'ذكاء اصطناعي', 'سيرة ذاتية',
  ],
  openGraph: {
    title: 'Mesbar | مسبار — AI Career Intelligence',
    description: 'AI-powered career platform for Tech & Business professionals',
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
      <body
        className={`${syne.variable} ${dmSans.variable} ${notoKufi.variable}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
