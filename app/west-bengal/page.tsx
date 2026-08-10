import type { Metadata } from 'next';
import SectionPage from '@/components/site/SectionPage';
import { pages } from '@/content/pages';

export const metadata: Metadata = { title: 'West Bengal Unit' };

export default function WestBengalPage() {
  const p = pages.westBengal;
  return (
    <SectionPage
      kicker={p.kicker}
      title={p.title}
      paras={p.paras}
      bullets={p.priorities}
      ctaHref="/presence"
      ctaLabel={{
        bn: 'আমাদের উপস্থিতি দেখুন',
        en: 'See Our Presence',
        hi: 'हमारी उपस्थिति देखें',
      }}
    />
  );
}
