'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageProvider';
import type { Lang } from '@/lib/i18n/types';

type Copy = Record<Lang, string>;

const PRESIDENT_HREF = 'https://krishan-bir-chaudhary.vercel.app';

export default function HomePage() {
  const { lang, t } = useLang();
  const L = (c: Copy) => c[lang];

  const introCards = [
    { href: '/about', title: t.nav.about, body: { bn: 'জাতীয় কৃষক সংগঠন, তার নীতি এবং জনস্বার্থের উদ্দেশ্য।', en: 'The national farmer organisation, its principles and public purpose.', hi: 'राष्ट्रीय किसान संगठन, उसके सिद्धांत और सार्वजनिक उद्देश्य।' }, cta: t.common.openSection },
    { href: '/west-bengal', title: t.nav.westBengal, body: { bn: 'রাজ্য শাখা, তার অগ্রাধিকার এবং জেলা স্তরের দিশা।', en: 'The state unit, its priorities and its district-level direction.', hi: 'राज्य इकाई, उसकी प्राथमिकताएं और जिला स्तर की दिशा।' }, cta: t.common.openSection },
    { href: '/appointment', title: t.nav.appointment, body: { bn: '৩০ জুনের নিয়োগ সভা এবং তার আনুষ্ঠানিক নথি।', en: 'The June 30 appointment meeting and its official record.', hi: '30 जून की नियुक्ति बैठक और उसका आधिकारिक रिकॉर्ड।' }, cta: t.common.openSection },
    { href: '/leadership', title: t.nav.leadership, body: { bn: 'কৃষকদের সঙ্গে কাজ করা জাতীয় ও পশ্চিমবঙ্গের নেতৃত্ব।', en: 'National and West Bengal leadership working with farmers.', hi: 'किसानों के साथ काम करने वाला राष्ट्रीय और पश्चिम बंगाल नेतृत्व।' }, cta: t.common.openSection },
  ];

  const learnCards = [
    {
      href: '/digital-creators',
      title: t.nav.digitalCreators,
      body: { bn: 'বাংলা ইউটিউব কৃষি-শিক্ষক — ছাদবাগান, পশুপালন ও মাঠ-শিক্ষা।', en: 'Bangla YouTube farm educators — rooftop gardens, livestock and field learning.', hi: 'बांग्ला यूट्यूब कृषि शिक्षक — छत बागवानी, पशुपालन और खेत-शिक्षा।' },
      cta: { bn: 'তালিকা খুলুন', en: 'Open directory', hi: 'निर्देशिका खोलें' }[lang],
    },
    {
      href: '/sri',
      title: { bn: 'কর্মযোগ SRI', en: 'KarmYog SRI', hi: 'कर्मयोग SRI' }[lang],
      body: { bn: 'কৃষক শিক্ষা ও প্রযুক্তিতে ওড়িশার একটি বিস্তারিত ক্ষেত্র-সমীক্ষা।', en: 'A detailed Odisha case study in farmer education and technology.', hi: 'किसान शिक्षा और तकनीक पर ओडिशा का विस्तृत अध्ययन।' },
      cta: t.common.openSection,
    },
    {
      href: '/media',
      title: t.nav.media,
      body: { bn: 'প্রেস বিজ্ঞপ্তি, মুদ্রিত সংবাদ এবং আনুষ্ঠানিক জনসাধারণের তথ্যসূত্র।', en: 'Press releases, print coverage and official public references.', hi: 'प्रेस विज्ञप्तियां, प्रिंट कवरेज और आधिकारिक सार्वजनिक संदर्भ।' },
      cta: t.common.openSection,
    },
    {
      href: '/ai',
      title: t.nav.ai,
      body: { bn: 'কৃষকের জন্য স্থানীয় ভাষায় ব্যবহারিক সহায়তার দৃষ্টিভঙ্গি।', en: 'A practical local-language support vision for farmers.', hi: 'किसानों के लिए स्थानीय भाषा में व्यावहारिक सहयोग की दृष्टि।' },
      cta: t.common.openSection,
    },
  ];

  const photoAlt = {
    bn: 'Shri Krishan Bir Choudhary with মহাচার্য সৌরভ জে. সরকার and Smt. Reena J. Sarkar',
    en: 'Shri Krishan Bir Choudhary with Mahacharya Sourabh J. Sarkar and Smt. Reena J. Sarkar',
    hi: 'Shri Krishan Bir Choudhary with महाचार्य सौरभ जे. सरकार and Smt. Reena J. Sarkar',
  }[lang];

  const photoCaption = {
    bn: 'নিয়োগপত্র হস্তান্তরের পর শ্রী কৃষ্ণ বীর চৌধুরী, মহাচার্য জি এবং শ্রীমতী রীনা জির সঙ্গে।',
    en: 'Shri Krishan Bir Choudhary with Mahacharya Ji and Smt. Reena Ji after the appointment letter handover.',
    hi: 'नियुक्ति पत्र सौंपे जाने के बाद श्री कृष्ण बीर चौधरी, महाचार्य जी और श्रीमती रीना जी के साथ।',
  }[lang];

  return (
    <>
      <section className="home-section hero-section" aria-labelledby="hero-title">
        <div className="field-contours" aria-hidden />
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow">Bharatiya Krishak Samaj, West Bengal</span>
            <h1 id="hero-title" className="hero-title">
              {t.home.title}
            </h1>
            <div className="stitch-accent" aria-hidden />
            <p className="hero-lead">{t.home.lead}</p>
            <div className="hero-actions">
              <Link className="btn-gold" href="/west-bengal">
                {t.home.ctaWestBengal}
              </Link>
              <Link className="hero-secondary-link" href="/sri">
                {t.home.ctaSri}
              </Link>
            </div>
          </div>
          <figure className="photo-frame hero-photo-frame tilt-r" style={{ margin: 0 }}>
            <div className="photo-frame-media hero-photo-media" style={{ aspectRatio: '4 / 3' }}>
              <Image
                src="/assets/appointment/appointment-chaudhary-sourabh-reena-02.jpeg"
                alt={photoAlt}
                fill
                sizes="(max-width: 900px) 100vw, 560px"
                style={{ objectFit: 'cover', objectPosition: 'center 42%' }}
                priority
              />
            </div>
            <figcaption className="photo-frame-caption">{photoCaption}</figcaption>
          </figure>
        </div>
      </section>

      <div className="wrap">
        <div className="section-seam" aria-hidden />
      </div>

      <section className="home-section" aria-labelledby="explore-title">
        <div className="wrap section-heading section-heading-wide">
          <span className="eyebrow">
            {L({ bn: 'জানুন', en: 'Explore', hi: 'जानें' })}
          </span>
          <h2 id="explore-title">{t.home.exploreTitle}</h2>
          <div className="stitch-accent" aria-hidden />
        </div>
        <div className="wrap gateway-groups">
          <div className="gateway-group">
            <h3 className="gateway-group-label">
              {L({ bn: 'সংগঠনের পরিচিতি', en: 'About the organisation', hi: 'संगठन का परिचय' })}
            </h3>
            <div className="gateway-grid">
              {introCards.map((card) => (
                <Link key={card.href} className="gateway-link" href={card.href}>
                  <h3>{card.title}</h3>
                  <p>{card.body[lang]}</p>
                  <span>{card.cta}</span>
                </Link>
              ))}
              <a className="gateway-link" href={PRESIDENT_HREF} target="_blank" rel="noopener noreferrer">
                <h3>{t.nav.nationalPresident}</h3>
                <p>
                  {L({
                    bn: 'ভারতীয় কৃষক সমাজের সভাপতি শ্রী কৃষ্ণ বীর চৌধুরীর সম্পূর্ণ প্রোফাইল।',
                    en: 'Full profile of Shri Krishan Bir Choudhary, President of Bharatiya Krishak Samaj.',
                    hi: 'भारतीय कृषक समाज के अध्यक्ष श्री कृष्ण बीर चौधरी की पूर्ण प्रोफ़ाइल।',
                  })}
                </p>
                <span>
                  {L({ bn: 'প্রোফাইল সাইট খুলুন', en: 'Open profile site', hi: 'प्रोफ़ाइल साइट खोलें' })}
                </span>
              </a>
            </div>
          </div>
          <div className="gateway-group">
            <h3 className="gateway-group-label">{t.nav.learn}</h3>
            <div className="gateway-grid">
              {learnCards.map((card) => (
                <Link key={card.href} className="gateway-link" href={card.href}>
                  <h3>{card.title}</h3>
                  <p>{card.body[lang]}</p>
                  <span>{card.cta}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
