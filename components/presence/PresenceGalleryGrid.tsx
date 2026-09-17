'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import type { PresenceGalleryItem } from '@/lib/district-members/types';
import { useLang } from '@/lib/i18n/LanguageProvider';

export default function PresenceGalleryGrid({
  items,
}: {
  items: PresenceGalleryItem[];
}) {
  const { t } = useLang();
  const [activeId, setActiveId] = useState<string | null>(null);
  const active = items.find((i) => i.id === activeId) || null;

  const close = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, close]);

  if (items.length === 0) {
    return <p className="note-block">{t.presence.galleryEmpty}</p>;
  }

  return (
    <>
      <ul className="presence-gallery-grid">
        {items.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              className="presence-gallery-card"
              onClick={() => setActiveId(item.id)}
              aria-label={`${item.name} — ${item.districtOfficialName}`}
            >
              <span className="presence-gallery-frame">
                <Image
                  src={item.photo}
                  alt={item.name}
                  width={480}
                  height={480}
                  className="presence-gallery-img"
                  unoptimized={item.photo.includes('supabase.co')}
                />
              </span>
              <span className="presence-gallery-meta">
                <span className="presence-gallery-name">{item.name}</span>
                <span className="presence-gallery-district">
                  {item.districtOfficialName}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>

      {active ? (
        <div
          className="presence-gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
          onClick={close}
        >
          <div
            className="presence-gallery-lightbox-panel"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              className="presence-gallery-lightbox-close"
              onClick={close}
              aria-label="Close"
            >
              ×
            </button>
            <div className="presence-gallery-lightbox-media">
              <Image
                src={active.photo}
                alt={active.name}
                width={900}
                height={900}
                className="presence-gallery-lightbox-img"
                unoptimized={active.photo.includes('supabase.co')}
              />
            </div>
            <div className="presence-gallery-lightbox-copy">
              <h2>{active.name}</h2>
              <p>{active.districtOfficialName}</p>
              <Link
                href={`/presence/west-bengal/${active.districtSlug}/${active.memberSlug}`}
                className="btn"
              >
                {t.presence.galleryViewMember}
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
