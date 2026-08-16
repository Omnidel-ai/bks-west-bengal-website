'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useLang } from '@/lib/i18n/LanguageProvider';
import type { Lang } from '@/lib/i18n/types';

const options: { id: Lang; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'bn', label: 'বাংলা' },
  { id: 'hi', label: 'हिन्दी' },
];

export default function LangToggle() {
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const listId = useId();
  const current = options.find((o) => o.id === lang) ?? options[1];

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div className="lang-select" ref={ref}>
      <button
        type="button"
        className="lang-select-btn"
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="lang-select-kicker">{t.nav.language}</span>
        <span>{current.label}</span>
        <span aria-hidden="true">▾</span>
      </button>
      <ul id={listId} className="lang-select-list" role="listbox" hidden={!open} aria-label={t.nav.language}>
        {options.map((o) => (
          <li key={o.id} role="presentation">
            <button
              type="button"
              role="option"
              aria-selected={lang === o.id}
              lang={o.id}
              onClick={() => {
                setLang(o.id);
                setOpen(false);
              }}
            >
              {o.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
