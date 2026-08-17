'use client';

import { useLang } from '@/lib/i18n/LanguageProvider';
import type { Lang } from '@/lib/i18n/types';

const options: { id: Lang; label: string }[] = [
  { id: 'en', label: 'English' },
  { id: 'hi', label: 'हिंदी' },
  { id: 'bn', label: 'বাংলা' },
];

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <div className="lang-toggle" role="group" aria-label="Language">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          aria-pressed={lang === o.id}
          onClick={() => setLang(o.id)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
