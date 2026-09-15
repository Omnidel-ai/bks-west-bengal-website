import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PresenceExplorer from '@/components/presence/PresenceExplorer';
import { getDistrict } from '@/content/presence/districts';
import { getPublicMembersForDistrict } from '@/lib/district-members/public';

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
  const members = await getPublicMembersForDistrict(d.id);
  return (
    <section className="band">
      <div className="wrap">
        <PresenceExplorer initialSlug={d.slug} members={members} />
      </div>
    </section>
  );
}
