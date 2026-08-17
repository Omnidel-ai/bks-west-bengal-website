'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n/LanguageProvider';
import LangToggle from './LangToggle';

const PRESIDENT_HREF = 'https://krishan-bir-chaudhary.vercel.app';

export default function SiteHeader() {
  const { t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const intro = [
    { href: '/about', label: t.nav.about },
    { href: '/west-bengal', label: t.nav.westBengal },
    { href: '/leadership', label: t.nav.leadership },
    { href: '/presence', label: t.nav.presence },
  ];
  const learn = [
    { href: '/digital-creators', label: t.nav.digitalCreators },
    { href: '/sri', label: t.nav.sri },
    { href: '/media', label: t.nav.media },
    { href: '/ai', label: t.nav.ai },
    { href: '/initiatives/amul-gobardhan', label: t.nav.amulGobardhan },
  ];

  return (
    <header className={`site-header${open ? ' is-menu-open' : ''}`}>
      <div className="wrap site-header-row">
        <Link href="/" className="site-brand" aria-label="Bharatiya Krishak Samaj" onClick={() => setOpen(false)}>
          <Image
            src="/assets/bks-logo.png"
            alt="Bharatiya Krishak Samaj"
            width={42}
            height={42}
            className="site-brand-logo"
            priority
          />
          <span className="site-brand-text">
            <strong>Bharatiya Krishak Samaj</strong>
            <small>West Bengal</small>
          </span>
        </Link>

        <button
          type="button"
          className="site-menu-toggle"
          aria-expanded={open}
          aria-controls="site-navigation"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden />
          <span aria-hidden />
          <span aria-hidden />
        </button>

        <nav id="site-navigation" className="site-nav" aria-label="Sections">
          {open ? (
            <button
              type="button"
              className="site-nav-backdrop"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            />
          ) : null}
          <div className="site-nav-scroll">
            <p className="site-nav-group-label" aria-hidden>
              {t.nav.intro}
            </p>
            {intro.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            ))}
            <a href={PRESIDENT_HREF} target="_blank" rel="noopener noreferrer" className="site-nav-external">
              {t.nav.nationalPresident}
              <span className="site-nav-ext-mark" aria-hidden>
                ↗
              </span>
            </a>
            <details className="site-nav-learn site-nav-learn-desktop">
              <summary className="site-nav-learn-summary">{t.nav.learn}</summary>
              <div className="site-nav-learn-panel">
                {learn.map((item) => (
                  <Link key={item.href} href={item.href}>
                    {item.label}
                  </Link>
                ))}
              </div>
            </details>
            <div className="site-nav-learn-mobile">
              <p className="site-nav-group-label" aria-hidden>
                {t.nav.learn}
              </p>
              {learn.map((item) => (
                <Link key={`m-${item.href}`} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="site-nav-footer">
            <Link className="site-nav-apply" href="/apply" onClick={() => setOpen(false)}>
              {t.nav.apply}
            </Link>
          </div>
        </nav>

        <LangToggle />
      </div>
    </header>
  );
}
