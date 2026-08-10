'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageProvider';

export default function HomePage() {
  const { t } = useLang();
  const tiles = [
    { href: '/about', title: t.nav.about, body: 'National farmer organisation, principles, and public purpose.' },
    { href: '/west-bengal', title: t.nav.westBengal, body: 'State chapter, priorities, and district direction.' },
    { href: '/appointment', title: t.nav.appointment, body: '30 June appointment meeting and formal records.' },
    { href: '/leadership', title: t.nav.leadership, body: 'National and West Bengal leadership serving farmers.' },
    { href: '/presence', title: t.nav.presence, body: 'Interactive district map and verified local teams.' },
    { href: '/digital-creators', title: t.nav.digitalCreators, body: 'Bangla YouTube agri-educators in one directory.' },
    { href: '/sri', title: t.nav.sri, body: 'Farmer-centred SRI field education case study.' },
    { href: '/media', title: t.nav.media, body: 'Press releases, e-paper coverage, and public references.' },
    { href: '/ai', title: t.nav.ai, body: 'Local-language practical AI support for annadatas.' },
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-visual" aria-hidden />
        <div className="wrap hero-copy">
          <p className="kicker">{t.home.kicker}</p>
          <h1>{t.home.title}</h1>
          <p>{t.home.lead}</p>
          <div className="hero-actions">
            <Link className="btn-gold" href="/west-bengal">
              {t.home.ctaWestBengal}
            </Link>
            <Link className="btn-secondary" href="/sri" style={{ color: '#163a26' }}>
              {t.home.ctaSri}
            </Link>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <figure style={{ margin: 0, borderRadius: 'var(--r-lg)', overflow: 'hidden', border: '1px solid var(--rule)' }}>
            <Image
              src="/assets/appointment/appointment-chaudhary-sourabh-reena-02.jpeg"
              alt="After the appointment letter handover with Shri Krishan Bir Chaudhary, Mahacharya Ji and Smt. Reena Ji."
              width={1400}
              height={900}
              priority
            />
          </figure>
        </div>
      </section>

      <section className="band muted">
        <div className="wrap">
          <div className="section-head">
            <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>
              {t.common.openSection}
            </p>
            <h2>{t.home.exploreTitle}</h2>
            <p className="section-deck">{t.home.exploreDeck}</p>
          </div>
          <div className="tile-grid">
            {tiles.map((tile) => (
              <Link key={tile.href} href={tile.href} className="tile">
                <h3>{tile.title}</h3>
                <p>{tile.body}</p>
                <span className="text-link">{t.common.openSection}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
