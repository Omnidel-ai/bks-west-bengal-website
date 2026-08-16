'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useLang } from '@/lib/i18n/LanguageProvider';
import LangToggle from './LangToggle';
import NavDisclosure from './NavDisclosure';

export default function SiteHeader() {
  const { t } = useLang();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const on = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const current = (href: string) => (on(href) ? 'page' : undefined);

  const aboutItems = [
    { href: '/about', label: t.nav.aboutBks },
    { href: '/west-bengal', label: t.nav.westBengal },
    { href: '/leadership', label: t.nav.leadership },
    {
      href: 'https://krishan-bir-chaudhary.vercel.app/',
      label: `${t.nav.nationalPresident} ↗`,
      external: true,
    },
  ];
  const initiativeItems = [{ href: '/initiatives/amul-gobardhan', label: t.nav.amulGobardhan }];
  const workItems = [
    { href: '/media', label: t.nav.media },
    { href: '/ai', label: t.nav.ai },
    { href: '/sri', label: t.nav.sri },
    { href: '/digital-creators', label: t.nav.digitalCreators },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  const linkRow = (
    items: { href: string; label: string; external?: boolean }[],
    close?: boolean,
  ) =>
    items.map((item) =>
      item.external ? (
        <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" onClick={() => close && setOpen(false)}>
          {item.label}
        </a>
      ) : (
        <Link
          key={item.href}
          href={item.href}
          aria-current={current(item.href)}
          onClick={() => close && setOpen(false)}
        >
          {item.label}
        </Link>
      ),
    );

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
          <NavDisclosure
            label={t.nav.about}
            current={['/about', '/west-bengal', '/leadership'].some(on)}
          >
            {linkRow(aboutItems)}
          </NavDisclosure>
          <Link href="/presence" className="nav-top-link" aria-current={current('/presence')}>
            {t.nav.presence}
          </Link>
          <NavDisclosure label={t.nav.initiatives} current={on('/initiatives')}>
            {linkRow(initiativeItems)}
          </NavDisclosure>
          <NavDisclosure
            label={t.nav.work}
            current={['/media', '/ai', '/sri', '/digital-creators'].some(on)}
          >
            {linkRow(workItems)}
          </NavDisclosure>
          <Link className="btn-gold nav-apply" href="/apply">
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
            {open ? t.nav.close : t.nav.menu}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className={`mobile-nav${open ? ' open' : ''}`} hidden={!open}>
        <div className="wrap mobile-nav-inner">
          <p className="mobile-nav-label">{t.nav.about}</p>
          <div className="nav-links stacked">{linkRow(aboutItems, true)}</div>
          <p className="mobile-nav-label">{t.nav.presence}</p>
          <div className="nav-links stacked">
            <Link href="/presence" aria-current={current('/presence')} onClick={() => setOpen(false)}>
              {t.nav.presence}
            </Link>
          </div>
          <p className="mobile-nav-label">{t.nav.initiatives}</p>
          <div className="nav-links stacked">{linkRow(initiativeItems, true)}</div>
          <p className="mobile-nav-label">{t.nav.work}</p>
          <div className="nav-links stacked">{linkRow(workItems, true)}</div>
          <div className="mobile-nav-utility">
            <Link className="btn-gold" href="/apply" onClick={() => setOpen(false)}>
              {t.nav.apply}
            </Link>
            <p className="mobile-nav-label">{t.common.contact}</p>
            <a href="mailto:contact@bkswbengal.org">contact@bkswbengal.org</a>
            <a href="tel:+918655246764">+91 86552 46764</a>
            <p className="mobile-nav-label">{t.nav.language}</p>
            <LangToggle />
          </div>
        </div>
      </div>
    </header>
  );
}
