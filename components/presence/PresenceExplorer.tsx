'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import {
  districts,
  getMembersForDistrict,
  type District,
} from '@/content/presence/districts';
import type { PublicMemberView } from '@/lib/district-members/types';
import { useLang } from '@/lib/i18n/LanguageProvider';
import WestBengalMap from './WestBengalMap';

function StatusBadge({ status, label }: { status: District['status']; label: string }) {
  return <span className={`badge ${status}`}>{label}</span>;
}

function toViewFromStatic(districtId: string): PublicMemberView[] {
  return getMembersForDistrict(districtId).map((m) => ({
    id: m.id,
    slug: m.slug,
    districtId: m.districtId,
    name: m.name,
    photo: m.photo,
    publicBackground: m.publicBackground,
    source: 'static-fallback' as const,
  }));
}

export default function PresenceExplorer({
  initialSlug,
  members: initialMembers,
}: {
  initialSlug?: string;
  /** Server-resolved members for the initial district (DB or static fallback). */
  members?: PublicMemberView[];
}) {
  const { lang, t } = useLang();
  const router = useRouter();
  const [selectedSlug, setSelectedSlug] = useState(
    initialSlug || 'paschim-medinipur',
  );

  useEffect(() => {
    if (initialSlug) setSelectedSlug(initialSlug);
  }, [initialSlug]);

  const selectDistrict = (slug: string) => {
    setSelectedSlug(slug);
    router.replace(`/presence/west-bengal/${slug}`, { scroll: false });
  };

  const selected = useMemo(
    () => districts.find((d) => d.slug === selectedSlug) || districts.find((d) => d.status === 'active')!,
    [selectedSlug],
  );

  const team = useMemo(() => {
    // Only trust SSR members for the district they were fetched for.
    if (
      initialMembers !== undefined &&
      initialSlug &&
      selected.slug === initialSlug
    ) {
      return initialMembers;
    }
    return toViewFromStatic(selected.id);
  }, [selected, initialSlug, initialMembers]);

  const statusLabel =
    selected.status === 'active'
      ? t.presence.active
      : selected.status === 'indicated'
        ? t.presence.indicated
        : t.presence.upcoming;

  const prioritized = [...districts].sort((a, b) => {
    const rank = { active: 0, indicated: 1, upcoming: 2 } as const;
    return rank[a.status] - rank[b.status] || a.name.en.localeCompare(b.name.en);
  });

  return (
    <div className="presence-layout">
      <div className="presence-map-panel">
        <h2 style={{ marginTop: 0, fontFamily: 'var(--font-display)', color: 'var(--field-green)' }}>
          {t.presence.mapTitle}
        </h2>
        <WestBengalMap lang={lang} selectedSlug={selected.slug} onSelect={selectDistrict} />
        <p className="legend">
          <span className="l-active">{t.presence.active}</span>
          <span className="l-indicated">{t.presence.indicated}</span>
          <span className="l-upcoming">{t.presence.upcoming}</span>
        </p>
      </div>

      <div className="presence-team-panel">
        <h2 style={{ marginTop: 0, fontFamily: 'var(--font-display)', color: 'var(--field-green)' }}>
          {t.presence.teamTitle}
        </h2>
        <p style={{ color: 'var(--ink-mute)', marginTop: 0 }}>{t.presence.selectDistrict}</p>

        <ul className="district-list">
          {prioritized.map((d) => (
            <li key={d.id}>
              <button
                type="button"
                aria-selected={d.slug === selected.slug}
                onClick={() => selectDistrict(d.slug)}
              >
                <span>{d.name[lang]}</span>
                <StatusBadge
                  status={d.status}
                  label={
                    d.status === 'active'
                      ? t.presence.active
                      : d.status === 'indicated'
                        ? t.presence.indicated
                        : t.presence.upcoming
                  }
                />
              </button>
            </li>
          ))}
        </ul>

        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h3 style={{ margin: 0, fontFamily: 'var(--font-display)', color: 'var(--field-green)' }}>
              {selected.name[lang]}
            </h3>
            <StatusBadge status={selected.status} label={statusLabel} />
          </div>
          <p style={{ color: 'var(--ink-soft)' }}>
            {selected.summary?.[lang] ||
              (selected.status === 'indicated'
                ? t.presence.comingSoon
                : selected.status === 'upcoming'
                  ? t.presence.upcoming
                  : '')}
          </p>

          <h4 style={{ fontFamily: 'var(--font-display)', color: 'var(--field-green)' }}>
            {t.presence.membersHeading}
          </h4>
          {team.length === 0 ? (
            <p className="note-block">{t.presence.noMembers}</p>
          ) : (
            <div className="member-grid">
              {team.map((m) => (
                <Link
                  key={m.id}
                  href={`/presence/west-bengal/${selected.slug}/${m.slug}`}
                  className="member-card"
                >
                  {m.photo ? (
                    <Image
                      src={m.photo}
                      alt={m.name}
                      width={72}
                      height={72}
                      className="member-card-photo"
                    />
                  ) : null}
                  <div className="member-card-copy">
                    <h3>{m.name}</h3>
                    <p className="member-card-blurb">
                      {m.designation || m.publicBackground?.[lang] || m.bio}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
