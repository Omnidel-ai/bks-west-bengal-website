'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageProvider';

export default function PresenceGalleryIntro() {
  const { t, lang } = useLang();
  const title =
    lang === 'bn'
      ? 'উপস্থিতি গ্যালারি'
      : lang === 'hi'
        ? 'उपस्थिति गैलरी'
        : 'Presence Gallery';
  const lead =
    lang === 'bn'
      ? 'পশ্চিমবঙ্গ জুড়ে যাচাইকৃত জেলা সদস্যদের ছবি। নাম ও জেলা প্রকাশিত উপস্থিতি রেকর্ড থেকে।'
      : lang === 'hi'
        ? 'पश्चिम बंगाल में सत्यापित ज़िला सदस्यों की तस्वीरें। नाम और ज़िला प्रकाशित उपस्थिति रिकॉर्ड से।'
        : 'Photographs of verified district members across West Bengal. Names and districts come from published Presence records.';

  return (
    <section className="band">
      <div className="wrap page-hero">
        <p className="kicker">{t.presence.kicker}</p>
        <h1>{title}</h1>
        <p className="lede">{lead}</p>
        <p style={{ marginTop: '1rem' }}>
          <Link href="/presence" className="btn ghost">
            ← {t.presence.mapTitle}
          </Link>
        </p>
      </div>
    </section>
  );
}
