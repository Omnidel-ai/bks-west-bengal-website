'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageProvider';
import { matchAnswer, type KnowledgePack } from '@/lib/amul-gobardhan/assistant';
import type { ToolHandlers } from '@/lib/amul-gobardhan/voice-tools';
import VoiceDock from '@/components/amul-gobardhan/VoiceDock';
import { useLiveSession } from '@/lib/voice/use-live-session';

type Msg = { role: 'user' | 'assistant'; text: string; meta?: string };

export default function AssistantClient() {
  const { lang } = useLang();
  const bn = lang === 'bn';
  const [pack, setPack] = useState<KnowledgePack | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const liveLog = useRef<HTMLDivElement>(null);
  const stopRef = useRef<() => void>(() => undefined);
  const handlersRef = useRef<ToolHandlers>({});
  handlersRef.current = {
    end_conversation: async () => {
      stopRef.current();
      return { ok: true };
    },
  };
  const voice = useLiveSession(handlersRef);
  stopRef.current = voice.stop;

  const voiceLive = voice.status !== 'idle' && voice.status !== 'error';
  const caption = useMemo(() => {
    if (voice.status === 'speaking' || voice.status === 'thinking') {
      return voice.outputText || voice.inputText;
    }
    return voice.inputText || voice.outputText;
  }, [voice.inputText, voice.outputText, voice.status]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const topic = params.get('topic');
    if (topic === 'amul') {
      setInput(bn ? 'Amul সুযোগ কী?' : 'What is the Amul opportunity?');
    } else if (topic === 'gobardhan') {
      setInput(bn ? 'GOBARdhan কী?' : 'What is GOBARdhan?');
    }
  }, [bn]);

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
    const q = text.trim();
    if (!q) return;
    if (voiceLive && voice.sendText(q)) {
      setMsgs((m) => [...m, { role: 'user', text: q, meta: 'voice-session' }]);
      setInput('');
      return;
    }
    if (!pack) return;
    const spokenLang = lang === 'hi' ? 'en' : lang;
    const res = matchAnswer(pack, q, spokenLang);
    setMsgs((m) => [
      ...m,
      { role: 'user', text: q },
      {
        role: 'assistant',
        text: res.answer,
        meta: `${res.classifier_domain} · ${res.claim_type || ''} · ${res.verification_status || ''} · ${res.id}`,
      },
    ]);
    setInput('');
  }

  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>
          BKS Amul & GOBARdhan Assistant
        </p>
        <h1>{bn ? 'BKS Amul ও GOBARdhan সহকারী' : 'BKS Amul & GOBARdhan Assistant'}</h1>
        <p>
          {bn
            ? 'এটি BKS-এর তথ্য ও ব্যাখ্যার সহকারী। আবেদন অনুমোদন করে না, সরকারি হেল্পলাইন নয়, Amul অফিস নয়। কণ্ঠ সহকারী শুধু বাংলায় কথা বলে।'
            : 'This is BKS’s information and explanation assistant. It does not approve applications, is not a government helpline, and is not an Amul office. The spoken assistant is Bengali-only.'}
        </p>
        <VoiceDock
          status={voice.status}
          error={voice.error}
          caption={caption}
          onToggle={() => {
            if (voiceLive) voice.stop();
            else void voice.start();
          }}
        />
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
        <div className="chat-log" aria-live="polite" ref={liveLog}>
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
          <label htmlFor="q">{bn ? 'লিখে জিজ্ঞাসা করুন' : 'Type a question'}</label>
          <textarea
            id="q"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={bn ? 'যেমন: আমার ৩টা গরু আছে, কোন ট্র্যাক?' : 'e.g. I have 3 cows — which track?'}
          />
          <button className="btn-gold" type="submit" disabled={!pack && !voiceLive}>
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
