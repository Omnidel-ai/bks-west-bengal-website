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
            <a href="mailto:contact@bkswbengal.org">contact@bkswbengal.org</a>
            <br />
            <a href="tel:+918655246764">+91 86552 46764</a>
          </p>
        </div>
        <div>
          <h3>{t.nav.explore}</h3>
          <ul className="footer-list">
            <li>
              <Link href="/about">{t.nav.aboutBks}</Link>
            </li>
            <li>
              <Link href="/west-bengal">{t.nav.westBengal}</Link>
            </li>
            <li>
              <Link href="/leadership">{t.nav.leadership}</Link>
            </li>
            <li>
              <Link href="/presence">{t.nav.presence}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>{t.nav.initiatives}</h3>
          <ul className="footer-list">
            <li>
              <Link href="/initiatives/amul-gobardhan">{t.nav.amulGobardhan}</Link>
            </li>
          </ul>
        </div>
        <div>
          <h3>{t.nav.getInvolved}</h3>
          <ul className="footer-list">
            <li>
              <Link href="/apply">{t.nav.apply}</Link>
            </li>
            <li>
              <Link href="/appointment">{t.nav.appointment}</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="wrap footer-quote">{t.common.footerQuote}</div>
    </footer>
  );
}
