import type { Metadata } from 'next';
import PresenceExplorer from '@/components/presence/PresenceExplorer';
import PresenceIntro from '@/components/presence/PresenceIntro';

export const metadata: Metadata = {
  title: 'Our Presence',
  description:
    'BKS West Bengal geographic presence — interactive district map and verified local teams.',
};

export default function PresencePage() {
  return (
    <>
      <PresenceIntro />
      <section className="band muted">
        <div className="wrap">
          <PresenceExplorer />
        </div>
      </section>
    </>
  );
}
