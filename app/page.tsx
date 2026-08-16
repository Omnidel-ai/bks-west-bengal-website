'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageProvider';

export default function HomePage() {
  const { lang, t } = useLang();
  const tiles = [
    { href: '/about', title: t.nav.aboutBks, body: { bn: 'জাতীয় কৃষক সংগঠন, তার নীতি এবং জনস্বার্থের উদ্দেশ্য।', en: 'National farmer organisation, principles, and public purpose.', hi: 'राष्ट्रीय किसान संगठन, उसके सिद्धांत और सार्वजनिक उद्देश्य।' } },
    { href: '/west-bengal', title: t.nav.westBengal, body: { bn: 'রাজ্য শাখা, তার অগ্রাধিকার এবং জেলা স্তরের দিশা।', en: 'State chapter, priorities, and district direction.', hi: 'राज्य शाखा, प्राथमिकताएँ और ज़िला दिशा।' } },
    { href: '/appointment', title: t.nav.appointment, body: { bn: '৩০ জুনের নিয়োগ সভা এবং তার আনুষ্ঠানিক নথি।', en: '30 June appointment meeting and formal records.', hi: '30 जून की नियुक्ति बैठक और औपचारिक दस्तावेज़।' } },
    { href: '/leadership', title: t.nav.leadership, body: { bn: 'কৃষকদের সঙ্গে কাজ করা জাতীয় ও পশ্চিমবঙ্গের নেতৃত্ব।', en: 'National and West Bengal leadership serving farmers.', hi: 'किसानों के साथ काम करने वाला राष्ट्रीय व पश्चिम बंगाल नेतृत्व।' } },
    { href: '/presence', title: t.nav.presence, body: { bn: 'জেলা মানচিত্র এবং যাচাইকৃত স্থানীয় দল।', en: 'Interactive district map and verified local teams.', hi: 'ज़िला मानचित्र और सत्यापित स्थानीय टीमें।' } },
    { href: '/initiatives/amul-gobardhan', title: t.nav.amulGobardhan, body: { bn: 'দুগ্ধ সমবায় ও GOBARdhan তথ্য উদ্যোগ — Amul অফিসিয়াল সাইট নয়।', en: 'BKS information initiative on cooperative dairy and GOBARdhan. Not an official Amul site.', hi: 'सहकारी डेयरी और GOBARdhan की BKS सूचना पहल — आधिकारिक Amul साइट नहीं।' } },
    { href: '/digital-creators', title: t.nav.digitalCreators, body: { bn: 'বাংলা ইউটিউব কৃষি-শিক্ষক — ছাদবাগান, পশুপালন ও মাঠ-শিক্ষা।', en: 'Bangla YouTube agri-educators in one directory.', hi: 'बाংলা यूट्यूब कृषि-शिक्षक — एक निर्देशिका में।' } },
    { href: '/sri', title: t.nav.sri, body: { bn: 'কৃষক শিক্ষা ও প্রযুক্তিতে ওড়িশার একটি বিস্তারিত ক্ষেত্র-সমীক্ষা।', en: 'Farmer-centred SRI field education case study.', hi: 'किसान-केंद्रित SRI क्षेत्र अध्ययन।' } },
    { href: '/media', title: t.nav.media, body: { bn: 'প্রেস বিজ্ঞপ্তি, মুদ্রিত সংবাদ এবং আনুষ্ঠানিক তথ্যসূত্র।', en: 'Press releases, e-paper coverage, and public references.', hi: 'प्रेस विज्ञप्ति, ई-पेपर कवरेज और सार्वजनिक संदर्भ।' } },
    { href: '/ai', title: t.nav.ai, body: { bn: 'কৃষকের জন্য স্থানীয় ভাষায় ব্যবহারিক সহায়তার দৃষ্টিভঙ্গি।', en: 'Local-language practical AI support for annadatas.', hi: 'अन्नदाता के लिए स्थानीय भाषा में व्यावहारिक AI सहायता।' } },
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
            <Link className="btn-secondary" href="/presence" style={{ color: '#163a26' }}>
              {t.nav.presence}
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
                <p>{tile.body[lang]}</p>
                <span className="text-link">{t.common.openSection}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
