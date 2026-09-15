import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getDistrict } from '@/content/presence/districts';
import { getPublicMember } from '@/lib/district-members/public';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ district: string; member: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { district, member } = await params;
  const d = getDistrict(district);
  if (!d) return { title: 'Member' };
  const m = await getPublicMember(d.id, member);
  return { title: m ? m.name : 'Member' };
}

export default async function MemberPage({ params }: Props) {
  const { district, member } = await params;
  const d = getDistrict(district);
  if (!d) notFound();
  const m = await getPublicMember(d.id, member);
  if (!m) notFound();

  const blurb =
    m.publicBackground?.bn ||
    m.publicBackground?.en ||
    m.bio ||
    '';

  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>
          {d.officialName}
        </p>
        {m.photo ? (
          <Image
            src={m.photo}
            alt={m.name}
            width={180}
            height={180}
            className="member-profile-photo"
          />
        ) : null}
        <h1>{m.name}</h1>
        {m.designation ? <p><strong>{m.designation}</strong></p> : null}
        {[m.village, m.area, m.block].filter(Boolean).length ? (
          <p style={{ color: 'var(--ink-soft)' }}>
            {[m.village, m.area, m.block].filter(Boolean).join(', ')}
          </p>
        ) : null}
        {blurb ? <p>{blurb}</p> : null}
        <p className="note-block">
          Public profile only. BKS designations are not published here until officially verified.
        </p>
        <p>
          <Link className="text-link" href={`/presence/west-bengal/${d.slug}`}>
            ← {d.name.bn}
          </Link>
        </p>
      </div>
    </section>
  );
}
