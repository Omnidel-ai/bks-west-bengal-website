import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDistrict, members } from '@/content/presence/districts';

type Props = { params: Promise<{ district: string; member: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { member } = await params;
  const m = members.find((x) => x.slug === member);
  return { title: m ? m.name : 'Member' };
}

export default async function MemberPage({ params }: Props) {
  const { district, member } = await params;
  const d = getDistrict(district);
  const m = members.find((x) => x.slug === member && x.districtId === d?.id);
  if (!d || !m) notFound();

  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>
          {d.officialName}
        </p>
        {m.photo ? (
          <Image
            src={m.photo}
            alt=""
            width={180}
            height={180}
            className="member-profile-photo"
          />
        ) : null}
        <h1>{m.name}</h1>
        <p>{m.publicBackground?.en}</p>
        <p className="note-block">
          Public profile only. BKS designations are not published here until officially verified.
        </p>
        <p>
          <Link className="text-link" href="/presence">
            ← Our Presence
          </Link>
        </p>
      </div>
    </section>
  );
}
