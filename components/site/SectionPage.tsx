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
  const { lang } = useLang();
  const [heroPara, ...rest] = paras;

  return (
    <>
      <section className="section-page-hero">
        <div className="wrap">
          <Link className="media-back-link" href="/">
            Back to home
          </Link>
          <span className="eyebrow">{kicker[lang]}</span>
          <h1>{title[lang]}</h1>
          <div className="stitch-accent" aria-hidden />
          {heroPara ? <p>{heroPara[lang]}</p> : null}
        </div>
      </section>
      <section className="home-section">
        {rest.length > 0 ? (
          <div className="wrap prose-block page-reading">
            {rest.map((p) => (
              <p key={p.en}>{p[lang]}</p>
            ))}
          </div>
        ) : null}
        {pillars ? (
          <div className="wrap principle-grid">
            {pillars.map((pillar) => (
              <article key={pillar.title.en} className="note-block">
                <h3>{pillar.title[lang]}</h3>
                <p>{pillar.body[lang]}</p>
              </article>
            ))}
          </div>
        ) : null}
        {bullets ? (
          <div className="wrap page-reading">
            <ul>
              {bullets.map((b) => (
                <li key={b.en}>{b[lang]}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {ctaHref && ctaLabel ? (
          <div className="wrap" style={{ marginTop: '1.25rem' }}>
            <Link className="btn-gold" href={ctaHref}>
              {ctaLabel[lang]}
            </Link>
          </div>
        ) : null}
      </section>
    </>
  );
}
