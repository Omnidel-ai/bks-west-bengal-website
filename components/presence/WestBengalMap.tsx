'use client';

import { districts, type District } from '@/content/presence/districts';
import type { Lang } from '@/lib/i18n/types';

type Props = {
  lang: Lang;
  selectedSlug: string;
  onSelect: (slug: string) => void;
};

/** Schematic West Bengal district map (staging). Path IDs match district slugs. */
export default function WestBengalMap({ lang, selectedSlug, onSelect }: Props) {
  const bySlug = Object.fromEntries(districts.map((d) => [d.slug, d]));

  const shapes: { slug: string; d: string }[] = [
    { slug: 'darjeeling', d: 'M210,28 h70 v36 h-70 z' },
    { slug: 'kalimpong', d: 'M280,28 h55 v36 h-55 z' },
    { slug: 'jalpaiguri', d: 'M210,64 h125 v40 h-125 z' },
    { slug: 'alipurduar', d: 'M335,64 h70 v40 h-70 z' },
    { slug: 'cooch-behar', d: 'M300,104 h90 v38 h-90 z' },
    { slug: 'uttar-dinajpur', d: 'M210,104 h90 v38 h-90 z' },
    { slug: 'dakshin-dinajpur', d: 'M210,142 h90 v34 h-90 z' },
    { slug: 'malda', d: 'M210,176 h100 v40 h-100 z' },
    { slug: 'murshidabad', d: 'M200,216 h95 v48 h-95 z' },
    { slug: 'birbhum', d: 'M140,216 h60 v55 h-60 z' },
    { slug: 'nadia', d: 'M295,230 h70 v55 h-70 z' },
    { slug: 'purulia', d: 'M70,250 h55 v70 h-55 z' },
    { slug: 'bankura', d: 'M125,271 h55 v60 h-55 z' },
    { slug: 'paschim-bardhaman', d: 'M180,264 h55 v45 h-55 z' },
    { slug: 'purba-bardhaman', d: 'M235,264 h55 v45 h-55 z' },
    { slug: 'hooghly', d: 'M290,285 h50 v45 h-50 z' },
    { slug: 'howrah', d: 'M300,330 h40 v35 h-40 z' },
    { slug: 'north-24-parganas', d: 'M340,285 h70 v70 h-70 z' },
    { slug: 'kolkata', d: 'M325,355 h35 v28 h-35 z' },
    { slug: 'south-24-parganas', d: 'M340,365 h75 v70 h-75 z' },
    { slug: 'jhargram', d: 'M70,330 h55 v50 h-55 z' },
    { slug: 'paschim-medinipur', d: 'M125,340 h90 v70 h-90 z' },
    { slug: 'purba-medinipur', d: 'M215,355 h80 v70 h-80 z' },
  ];

  return (
    <svg
      className="wb-map"
      viewBox="0 0 460 460"
      role="img"
      aria-label="West Bengal districts"
    >
      <rect x="0" y="0" width="460" height="460" fill="#f7f1e2" rx="16" />
      {shapes.map((shape) => {
        const district = bySlug[shape.slug] as District | undefined;
        if (!district) return null;
        const selected = selectedSlug === district.slug;
        return (
          <path
            key={district.slug}
            id={district.slug}
            className={`district ${district.status}`}
            d={shape.d}
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
