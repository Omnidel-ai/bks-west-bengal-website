import type { Metadata } from 'next';
import { Baloo_Da_2, Hind_Siliguri } from 'next/font/google';
import SiteFooter from '@/components/site/SiteFooter';
import SiteHeader from '@/components/site/SiteHeader';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import './globals.css';
import './initiative.css';

const display = Baloo_Da_2({
  subsets: ['bengali', 'latin'],
  weight: ['700'],
  variable: '--font-baloo-da',
  display: 'swap',
});

const text = Hind_Siliguri({
  subsets: ['bengali', 'latin'],
  weight: ['400', '600', '700'],
  variable: '--font-hind-siliguri',
  display: 'swap',
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: 'Bharatiya Krishak Samaj — West Bengal',
    template: '%s | Bharatiya Krishak Samaj, West Bengal',
  },
  description:
    'Vision and district leadership enrollment platform for Bharatiya Krishak Samaj, West Bengal.',
};

export const viewport = {
  themeColor: '#163a26',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn" className={`${display.variable} ${text.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <LanguageProvider>
          <SiteHeader />
          <main id="main">{children}</main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
