import { NextRequest, NextResponse } from 'next/server';
import { voiceRecordsFromPack, estimateVoiceTokens } from '@/lib/amul-gobardhan/voice-corpus';
import { buildVoiceSystemPrompt } from '@/lib/amul-gobardhan/voice-prompt';
import { VOICE_TOOL_DECLARATIONS } from '@/lib/amul-gobardhan/voice-tools';

export const runtime = 'nodejs';
export const preferredRegion = 'bom1';

const LIVE_MODEL = process.env.GEMINI_LIVE_MODEL || 'gemini-3.1-flash-live-preview';
const LIVE_VOICE = process.env.GEMINI_LIVE_VOICE || 'Charon';
const WINDOW_MS = 60_000;
const MAX_HITS = 10;
const hits = new Map<string, number[]>();

function clientIp(req: NextRequest): string {
  const fwd = req.headers.get('x-forwarded-for');
  if (fwd) return fwd.split(',')[0]?.trim() || 'unknown';
  return req.headers.get('x-real-ip') || 'unknown';
}

function allow(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  if (recent.length >= MAX_HITS) {
    hits.set(ip, recent);
    return false;
  }
  recent.push(now);
  hits.set(ip, recent);
  return true;
}

export async function POST(req: NextRequest) {
  if (!allow(clientIp(req))) {
    return NextResponse.json({ error: 'Too many voice sessions. Please wait a minute.' }, { status: 429 });
  }

  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'Voice is not configured on this server.' }, { status: 503 });
  }

  // Body is ignored for prompt/tools/language. This agent is Bengali-only and server-bound.
  await req.json().catch(() => ({}));

  const records = voiceRecordsFromPack();
  const tokens = estimateVoiceTokens(records);
  if (tokens > 20000) {
    console.error('[amul-gobardhan/live-token] corpus over inject budget', tokens);
    return NextResponse.json({ error: 'Voice knowledge is too large to start a session.' }, { status: 500 });
  }

  const systemPrompt = buildVoiceSystemPrompt(records);
  const now = Date.now();
  const tokenRequest = {
    uses: 1,
    expire_time: new Date(now + 30 * 60 * 1000).toISOString(),
    new_session_expire_time: new Date(now + 2 * 60 * 1000).toISOString(),
    bidi_generate_content_setup: {
      model: `models/${LIVE_MODEL}`,
      generation_config: {
        response_modalities: ['AUDIO'],
        temperature: 0.45,
        speech_config: {
          language_code: 'bn',
          voice_config: {
            prebuilt_voice_config: { voice_name: LIVE_VOICE },
          },
        },
      },
      session_resumption: {},
      system_instruction: { parts: [{ text: systemPrompt }] },
      input_audio_transcription: {},
      output_audio_transcription: {},
      tools: [{ function_declarations: VOICE_TOOL_DECLARATIONS }],
    },
  };

  const google = await fetch('https://generativelanguage.googleapis.com/v1alpha/auth_tokens', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': apiKey,
    },
    body: JSON.stringify(tokenRequest),
  });

  const raw = await google.text();
  let token: { name?: string } = {};
  try {
    token = raw ? (JSON.parse(raw) as { name?: string }) : {};
  } catch {
    token = {};
  }

  if (!google.ok || !token.name) {
    console.error('[amul-gobardhan/live-token]', google.status, raw.slice(0, 300));
    return NextResponse.json(
      {
        error: 'Could not create voice session',
        detail: process.env.NODE_ENV === 'development' ? raw.slice(0, 300) : undefined,
      },
      { status: 502 },
    );
  }

  if (!token.name.startsWith('auth_tokens/')) {
    console.error('[amul-gobardhan/live-token] unexpected token name shape');
    return NextResponse.json({ error: 'Could not create voice session' }, { status: 502 });
  }

  const websocketUrl =
    'wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContentConstrained?access_token=' +
    encodeURIComponent(token.name);

  return NextResponse.json({
    token: token.name,
    websocketUrl,
    setup: {},
  });
}
