'use client';

import { useLang } from '@/lib/i18n/LanguageProvider';
import type { Lang } from '@/lib/i18n/types';

const options: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'hi', label: 'HI' },
  { id: 'bn', label: 'BN' },
];

export default function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <label className="lang-toggle lang-toggle-compact">
      <span className="sr-only">Language</span>
      <select
        className="lang-toggle-select"
        aria-label="Language"
        value={lang}
        onChange={(e) => setLang(e.target.value as Lang)}
      >
        {options.map((o) => (
          <option key={o.id} value={o.id}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
