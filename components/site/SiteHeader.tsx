'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useLang } from '@/lib/i18n/LanguageProvider';
import LangToggle from './LangToggle';

export default function SiteHeader() {
  const { t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const current = (href: string) => (pathname === href ? 'page' : undefined);

  const intro = [
    { href: '/about', label: t.nav.about },
    { href: '/west-bengal', label: t.nav.westBengal },
    { href: '/leadership', label: t.nav.leadership },
    { href: '/presence', label: t.nav.presence },
    {
      href: 'https://krishan-bir-chaudhary.vercel.app/',
      label: `${t.nav.nationalPresident} ↗`,
      external: true,
    },
  ];
  const learn = [
    { href: '/digital-creators', label: t.nav.digitalCreators },
    { href: '/sri', label: t.nav.sri },
    { href: '/media', label: t.nav.media },
    { href: '/ai', label: t.nav.ai },
  ];

  return (
    <header className="site-header">
      <div className="wrap site-header-inner">
        <Link href="/" className="brand" onClick={() => setOpen(false)}>
          <Image src="/assets/bks-logo-unit.png" alt="" width={48} height={48} priority />
          <span className="brand-text">
            <strong>{t.brandName}</strong>
            <span>{t.brandRegion}</span>
          </span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <div className="nav-group">
            <div className="nav-group-label">{t.nav.intro}</div>
            <div className="nav-links">
              {intro.map((item) =>
                item.external ? (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.href} href={item.href} aria-current={current(item.href)}>
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>
          <div className="nav-group">
            <div className="nav-group-label">{t.nav.learn}</div>
            <div className="nav-links">
              {learn.map((item) => (
                <Link key={item.href} href={item.href} aria-current={current(item.href)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link className="btn-gold" href="/apply">
            {t.nav.apply}
          </Link>
        </nav>

        <div className="header-actions">
          <LangToggle />
          <button
            type="button"
            className="site-menu-toggle"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            Menu
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-nav${open ? ' open' : ''}`}>
        <div className="wrap">
          <div className="nav-group">
            <div className="nav-group-label">{t.nav.intro}</div>
            <div className="nav-links">
              {intro.map((item) =>
                item.external ? (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </div>
          <div className="nav-group">
            <div className="nav-group-label">{t.nav.learn}</div>
            <div className="nav-links">
              {learn.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <Link className="btn-gold" href="/apply" onClick={() => setOpen(false)}>
            {t.nav.apply}
          </Link>
        </div>
      </div>
    </header>
  );
}
