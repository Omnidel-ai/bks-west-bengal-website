'use client';

import { useLang } from '@/lib/i18n/LanguageProvider';

export default function PresenceIntro() {
  const { t } = useLang();
  return (
    <section className="band">
      <div className="wrap page-hero">
        <p className="kicker">{t.presence.kicker}</p>
        <h1>{t.presence.title}</h1>
        <p className="lede">{t.presence.lead}</p>
      </div>
    </section>
  );
}
