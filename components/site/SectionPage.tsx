'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageProvider';
import type { Lang } from '@/lib/i18n/types';

type T = Record<Lang, string>;

export default function SectionPage({
  kicker,
  title,
  paras,
  bullets,
  pillars,
  ctaHref,
  ctaLabel,
}: {
  kicker: T;
  title: T;
  paras: T[];
  bullets?: T[];
  pillars?: { title: T; body: T }[];
  ctaHref?: string;
  ctaLabel?: T;
}) {
  const { lang, t } = useLang();
  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>
          {kicker[lang]}
        </p>
        <h1>{title[lang]}</h1>
        {paras.map((p) => (
          <p key={p.en}>{p[lang]}</p>
        ))}
        {pillars && (
          <div className="tile-grid" style={{ marginTop: '1.25rem' }}>
            {pillars.map((pillar) => (
              <article key={pillar.title.en} className="tile">
                <h3>{pillar.title[lang]}</h3>
                <p>{pillar.body[lang]}</p>
              </article>
            ))}
          </div>
        )}
        {bullets && (
          <ul>
            {bullets.map((b) => (
              <li key={b.en}>{b[lang]}</li>
            ))}
          </ul>
        )}
        {ctaHref && ctaLabel && (
          <p style={{ marginTop: '1.25rem' }}>
            <Link className="btn-gold" href={ctaHref}>
              {ctaLabel[lang]}
            </Link>
          </p>
        )}
        <p style={{ marginTop: '1.5rem' }}>
          <Link className="text-link" href="/">
            ← {t.common.backHome}
          </Link>
        </p>
      </div>
    </section>
  );
}
