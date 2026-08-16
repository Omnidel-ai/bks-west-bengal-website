'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageProvider';

export default function SiteFooter() {
  const { t } = useLang();
  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div>
          <h3>{t.brandName}</h3>
          <p>{t.brandRegion}</p>
          <p>{t.common.stateOffice}</p>
          <p>
            Email:{' '}
            <a href="mailto:contact@bkswbengal.org">contact@bkswbengal.org</a>
            <br />
            Phone: <a href="tel:+918655246764">+91 86552 46764</a>
          </p>
        </div>
        <div>
          <h3>{t.nav.intro}</h3>
          <p>
            <Link href="/about">{t.nav.about}</Link>
            <br />
            <Link href="/west-bengal">{t.nav.westBengal}</Link>
            <br />
            <Link href="/leadership">{t.nav.leadership}</Link>
            <br />
            <Link href="/presence">{t.nav.presence}</Link>
          </p>
        </div>
        <div>
          <h3>{t.nav.learn}</h3>
          <p>
            <Link href="/media">{t.nav.media}</Link>
            <br />
            <Link href="/ai">{t.nav.ai}</Link>
            <br />
            <Link href="/initiatives/amul-gobardhan">{t.nav.amulGobardhan}</Link>
            <br />
            <Link href="/apply">{t.nav.apply}</Link>
          </p>
        </div>
      </div>
      <div className="wrap footer-quote">{t.common.footerQuote}</div>
    </footer>
  );
}
