'use client';

import type { District } from '@/content/presence/districts';
import type { Lang } from '@/lib/i18n/types';
import { WB_DISTRICT_PATHS, WB_MAP_VIEWBOX } from '@/lib/presence/wb-district-paths';

type Props = {
  lang: Lang;
  selectedSlug: string;
  onSelect: (slug: string) => void;
  /** Merged Presence statuses (static + optional DB overrides). */
  districts: District[];
};

/** Geographic West Bengal district map. Path IDs match district slugs. */
export default function WestBengalMap({
  lang,
  selectedSlug,
  onSelect,
  districts,
}: Props) {
  const bySlug = Object.fromEntries(districts.map((d) => [d.slug, d]));

  return (
    <svg
      className="wb-map"
      viewBox={WB_MAP_VIEWBOX}
      role="img"
      aria-label="West Bengal districts"
    >
      <rect x="0" y="0" width="420" height="640.2" fill="#f7f1e2" rx="12" />
      {WB_DISTRICT_PATHS.map((shape) => {
        const district = bySlug[shape.slug] as District | undefined;
        if (!district) return null;
        const selected = selectedSlug === district.slug;
        return (
          <path
            key={district.slug}
            id={district.slug}
            className={`district ${district.status}`}
            d={shape.d}
            fillRule="evenodd"
            vectorEffect="nonScalingStroke"
            tabIndex={district.status === 'upcoming' ? -1 : 0}
            role="button"
            aria-label={district.name[lang]}
            aria-selected={selected}
            onClick={() => {
              if (district.status !== 'upcoming') onSelect(district.slug);
            }}
            onKeyDown={(e) => {
              if (district.status === 'upcoming') return;
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelect(district.slug);
              }
            }}
          />
        );
      })}
    </svg>
  );
}
