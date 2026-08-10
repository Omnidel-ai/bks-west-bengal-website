import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PresenceExplorer from '@/components/presence/PresenceExplorer';
import { getDistrict } from '@/content/presence/districts';

type Props = { params: Promise<{ district: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { district } = await params;
  const d = getDistrict(district);
  if (!d) return { title: 'District' };
  return { title: `${d.officialName} — Our Presence` };
}

export default async function DistrictPresencePage({ params }: Props) {
  const { district } = await params;
  const d = getDistrict(district);
  if (!d) notFound();
  return (
    <section className="band">
      <div className="wrap">
        <PresenceExplorer initialSlug={d.slug} />
      </div>
    </section>
  );
}
