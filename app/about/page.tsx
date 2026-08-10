import type { Metadata } from 'next';
import SectionPage from '@/components/site/SectionPage';
import { pages } from '@/content/pages';

export const metadata: Metadata = { title: 'About BKS' };

export default function AboutPage() {
  const p = pages.about;
  return (
    <SectionPage
      kicker={p.kicker}
      title={p.title}
      paras={p.paras}
      pillars={p.pillars}
    />
  );
}
