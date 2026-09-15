import type { Metadata } from 'next';
import PresenceExplorer from '@/components/presence/PresenceExplorer';
import PresenceIntro from '@/components/presence/PresenceIntro';
import { getPublicMembersForDistrict } from '@/lib/district-members/public';
import { getDistrictsWithPresenceStatus } from '@/lib/district-members/presence-status';

/** Presence must always reflect live DB members + auto-Active districts. */
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Our Presence',
  description:
    'BKS West Bengal geographic presence — interactive district map and verified local teams.',
};

export default async function PresencePage() {
  const [districts, members] = await Promise.all([
    getDistrictsWithPresenceStatus(),
    getPublicMembersForDistrict('paschim-medinipur'),
  ]);
  return (
    <>
      <PresenceIntro />
      <section className="band muted">
        <div className="wrap">
          <PresenceExplorer
            initialSlug="paschim-medinipur"
            members={members}
            districts={districts}
          />
        </div>
      </section>
    </>
  );
}
