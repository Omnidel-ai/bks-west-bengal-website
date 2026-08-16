'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageProvider';
import { matchAnswer, type KnowledgePack } from '@/lib/amul-gobardhan/assistant';

type Msg = { role: 'user' | 'assistant'; text: string; meta?: string };

export default function AssistantClient() {
  const { lang } = useLang();
  const bn = lang === 'bn';
  const [pack, setPack] = useState<KnowledgePack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const live = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch('/amul-gobardhan/knowledge.json')
      .then((r) => {
        if (!r.ok) throw new Error('knowledge pack missing');
        return r.json();
      })
      .then((data) => {
        setPack(data);
        setMsgs([
          {
            role: 'assistant',
            text: lang === 'bn' ? data.identity_bn : data.identity_en,
            meta: 'identity',
          },
        ]);
      })
      .catch((e) => setError(String(e)));
  }, [lang]);

  function send(text: string) {
    if (!pack || !text.trim()) return;
    const q = text.trim();
    const spokenLang = lang === 'hi' ? 'en' : lang;
    const res = matchAnswer(pack, q, spokenLang);
    setMsgs((m) => [
      ...m,
      { role: 'user', text: q },
      {
        role: 'assistant',
        text: res.answer,
        meta: `${res.claim_type || ''} · ${res.verification_status || ''} · ${res.id}`,
      },
    ]);
    setInput('');
  }

  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>
          BKS Assistant
        </p>
        <h1>{bn ? 'Amul ও GOBARdhan তথ্য সহকারী' : 'Amul + GOBARdhan information assistant'}</h1>
        <p>
          {bn
            ? 'এটি তথ্য দেয়, আবেদন অনুমোদন করে না। Gemini Live চাবি লাগে না — যাচাইকৃত জ্ঞানভাণ্ডার।'
            : 'This assistant explains. It does not approve applications. No cloud voice key is used — answers come from the verified knowledge pack.'}
        </p>
        {error && (
          <p role="alert" className="note-block">
            {error}
          </p>
        )}
        {!pack && !error && (
          <p className="meta-line" aria-live="polite">
            {bn ? 'জ্ঞানভাণ্ডার লোড হচ্ছে…' : 'Loading knowledge pack…'}
          </p>
        )}
        <div className="chat-log" aria-live="polite" ref={live}>
          {msgs.map((m, i) => (
            <div key={i} className={`bubble ${m.role === 'user' ? 'user' : ''}`}>
              <p>{m.text}</p>
              {m.meta && <p className="meta-line">{m.meta}</p>}
            </div>
          ))}
        </div>
        <form
          className="chat-form"
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
        >
          <label htmlFor="q">{bn ? 'আপনার প্রশ্ন' : 'Your question'}</label>
          <textarea
            id="q"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={bn ? 'যেমন: আমার ৩টা গরু আছে, কোন ট্র্যাক?' : 'e.g. I have 3 cows — which track?'}
          />
          <button className="btn-gold" type="submit" disabled={!pack}>
            {bn ? 'পাঠান' : 'Send'}
          </button>
        </form>
        <p>
          <Link className="btn-secondary" href="/initiatives/amul-gobardhan">
            {bn ? 'উদ্যোগ পাতায় ফিরুন' : 'Back to initiative'}
          </Link>
        </p>
      </div>
    </section>
  );
}
