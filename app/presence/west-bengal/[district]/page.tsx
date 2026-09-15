import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import PresenceExplorer from '@/components/presence/PresenceExplorer';
import { getDistrict } from '@/content/presence/districts';
import { getPublicMembersForDistrict } from '@/lib/district-members/public';
import { getDistrictsWithPresenceStatus } from '@/lib/district-members/presence-status';

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
  const [districts, members] = await Promise.all([
    getDistrictsWithPresenceStatus(),
    getPublicMembersForDistrict(d.id),
  ]);
  return (
    <section className="band">
      <div className="wrap">
        <PresenceExplorer
          initialSlug={d.slug}
          members={members}
          districts={districts}
        />
      </div>
    </section>
  );
}
