'use client';

import type { VoiceStatus } from '@/lib/voice/use-live-session';

const STATUS_BN: Record<VoiceStatus, string> = {
  idle: 'কথা বলুন',
  connecting: 'সংযোগ হচ্ছে…',
  listening: 'শুনছি',
  thinking: 'ভাবছি…',
  speaking: 'বলছি',
  error: 'আবার চেষ্টা করুন',
};

export default function VoiceDock({
  status,
  error,
  caption,
  onToggle,
}: {
  status: VoiceStatus;
  error: string | null;
  caption: string;
  onToggle: () => void;
}) {
  const live = status !== 'idle' && status !== 'error';
  return (
    <div className="voice-dock">
      <p className="voice-dock-kicker">BKS Amul ও GOBARdhan সহকারী</p>
      <p className="voice-dock-role">
        BKS-এর তথ্য ও ব্যাখ্যার সহকারী — সরকারি হেল্পলাইন, Amul অফিস বা ভর্তুকি অনুমোদন নয়
      </p>
      <div className="voice-dock-row">
        <button
          type="button"
          className={`voice-mic voice-mic-${status}`}
          aria-pressed={live}
          aria-label={live ? 'কথা বলা বন্ধ করুন' : 'বাংলায় কথা বলুন'}
          onClick={onToggle}
        >
          <MicIcon />
        </button>
        <div className="voice-dock-copy">
          <p className="voice-dock-status" aria-live="polite">
            {STATUS_BN[status]}
          </p>
          {status === 'idle' && (
            <p className="meta-line">মাইক্রোফোন টিপুন। সহকারী বাংলায় শোনে ও বাংলায় বলে।</p>
          )}
          {status === 'connecting' && <p className="meta-line">অপেক্ষা করুন…</p>}
        </div>
      </div>
      {error && (
        <p className="note-block" role="alert">
          {error}
        </p>
      )}
      {caption ? (
        <p className="voice-caption" lang="bn">
          {caption}
        </p>
      ) : null}
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.92V21h2v-3.08A7 7 0 0 0 19 11h-2Z"
      />
    </svg>
  );
}
