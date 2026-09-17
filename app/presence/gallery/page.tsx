import type { Metadata } from 'next';
import PresenceGalleryGrid from '@/components/presence/PresenceGalleryGrid';
import PresenceGalleryIntro from '@/components/presence/PresenceGalleryIntro';
import { getPresenceGalleryItems } from '@/lib/district-members/public';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: 'Presence Gallery',
  description:
    'Photographs of verified BKS West Bengal district members from Our Presence.',
};

export default async function PresenceGalleryPage() {
  const items = await getPresenceGalleryItems();

  return (
    <>
      <PresenceGalleryIntro />
      <section className="band muted">
        <div className="wrap">
          <PresenceGalleryGrid items={items} />
        </div>
      </section>
    </>
  );
}
