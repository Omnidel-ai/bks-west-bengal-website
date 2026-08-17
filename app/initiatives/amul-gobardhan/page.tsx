import type { Metadata } from 'next';
import InitiativePage from './InitiativePage';

export const metadata: Metadata = {
  title: 'Amul Opportunity & GOBARdhan Initiative',
  description:
    'Bharatiya Krishak Samaj, West Bengal: two first-class information initiatives — Amul Opportunity (cooperative dairy) and GOBARdhan Initiative (government biogas/CBG). Not an official Amul website and not a government scheme portal.',
  alternates: {
    canonical: 'https://www.bkswbengal.org/initiatives/amul-gobardhan',
    languages: {
      'bn-IN': 'https://www.bkswbengal.org/initiatives/amul-gobardhan',
      'en-IN': 'https://www.bkswbengal.org/initiatives/amul-gobardhan',
      'x-default': 'https://www.bkswbengal.org/initiatives/amul-gobardhan',
    },
  },
  openGraph: {
    title: 'BKS West Bengal — Amul Opportunity & GOBARdhan Initiative',
    description:
      'Farmer-facing information on cooperative dairy and GOBARdhan. BKS explains; it does not approve subsidies.',
    locale: 'bn_IN',
    alternateLocale: ['en_IN'],
    type: 'website',
    siteName: 'Bharatiya Krishak Samaj, West Bengal',
    url: 'https://www.bkswbengal.org/initiatives/amul-gobardhan',
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'BKS West Bengal — Amul + GOBARdhan initiative',
  description:
    'Bharatiya Krishak Samaj West Bengal information initiative on Amul-pattern dairy cooperatives and the GOBARdhan programme. Not an official Amul website and not a Government of India scheme portal.',
  inLanguage: ['bn-IN', 'en-IN'],
  isPartOf: {
    '@type': 'Organization',
    name: 'Bharatiya Krishak Samaj, West Bengal',
    url: 'https://www.bkswbengal.org',
  },
  about: ['Amul cooperative dairy model', 'GOBARdhan', 'BKS West Bengal initiative'],
};

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <InitiativePage />
    </>
  );
}
