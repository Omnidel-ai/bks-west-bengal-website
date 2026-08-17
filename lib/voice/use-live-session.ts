'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { AudioQueue, downsampleToPcm16, bytesToBase64 } from './audio';
import type { ToolHandlers } from '@/lib/amul-gobardhan/voice-tools';

export type VoiceStatus = 'idle' | 'connecting' | 'listening' | 'thinking' | 'speaking' | 'error';

type Ctrl = { cancelled: boolean };
type Mint = { token: string; websocketUrl: string; setup: Record<string, never> };

type LiveMsg = {
  setupComplete?: unknown;
  serverContent?: {
    modelTurn?: { parts?: Array<{ inlineData?: { data?: string; mimeType?: string } }> };
    inputTranscription?: { text?: string };
    outputTranscription?: { text?: string };
    interrupted?: boolean;
    turnComplete?: boolean;
  };
  toolCall?: { functionCalls?: Array<{ id: string; name: string; args?: Record<string, unknown> }> };
};

function isValidLiveUrl(url: string): boolean {
  return url.includes('BidiGenerateContentConstrained') && url.includes('access_token=') && !url.includes('?key=');
}

async function wsDataToString(data: unknown): Promise<string> {
  if (typeof data === 'string') return data;
  if (typeof Blob !== 'undefined' && data instanceof Blob) return data.text();
  if (data instanceof ArrayBuffer) return new TextDecoder().decode(data);
  if (ArrayBuffer.isView(data)) {
    return new TextDecoder().decode(data);
  }
  return '';
}

export function useLiveSession(handlersRef: { current: ToolHandlers }) {
  const [status, setStatus] = useState<VoiceStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const statusRef = useRef<VoiceStatus>('idle');
  const liveRef = useRef(false);
  const sessionRef = useRef(0);
  const wsRef = useRef<WebSocket | null>(null);
  const ctrlRef = useRef<Ctrl | null>(null);
  const queueRef = useRef<AudioQueue | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recCtxRef = useRef<AudioContext | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const reconnectsRef = useRef(0);
  const kickedOffRef = useRef(false);
  const inAcc = useRef('');
  const outAcc = useRef('');

  const setSt = useCallback((s: VoiceStatus) => {
    statusRef.current = s;
    setStatus(s);
  }, []);

  const cleanupAudio = useCallback(() => {
    try {
      processorRef.current?.disconnect();
    } catch {
      /* ignore */
    }
    processorRef.current = null;
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    try {
      recCtxRef.current?.close();
    } catch {
      /* ignore */
    }
    recCtxRef.current = null;
    queueRef.current?.stop();
  }, []);

  const hardClose = useCallback(() => {
    liveRef.current = false;
    if (ctrlRef.current) ctrlRef.current.cancelled = true;
    try {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({ realtimeInput: { audioStreamEnd: true } }));
      }
    } catch {
      /* ignore */
    }
    try {
      wsRef.current?.close();
    } catch {
      /* ignore */
    }
    wsRef.current = null;
    cleanupAudio();
  }, [cleanupAudio]);

  const sendKickoff = useCallback((ws: WebSocket, resume: boolean) => {
    const text = resume
      ? '<session-resume> Continue. No greeting.'
      : '<session-start> Greet using the exact Bengali greeting in your instructions, then wait.';
    ws.send(
      JSON.stringify({
        clientContent: {
          turns: [{ role: 'user', parts: [{ text }] }],
          turnComplete: true,
        },
      }),
    );
  }, []);

  const handleMessage = useCallback(
    async (ws: WebSocket, raw: string, sessionId: number) => {
      let msg: LiveMsg;
      try {
        msg = JSON.parse(raw) as LiveMsg;
      } catch {
        return;
      }
      if (msg.setupComplete) {
        return;
      }
      const sc = msg.serverContent;
      if (sc?.interrupted) {
        queueRef.current?.stop();
        if (liveRef.current) setSt('listening');
        return;
      }
      const audioParts = sc?.modelTurn?.parts || [];
      for (const part of audioParts) {
        const data = part.inlineData?.data;
        if (data) {
          if (sessionRef.current !== sessionId) return;
          setSt('speaking');
          queueRef.current?.enqueue(data);
        }
      }
      if (sc?.inputTranscription?.text) {
        inAcc.current += sc.inputTranscription.text;
        setInputText(inAcc.current);
        if (statusRef.current === 'listening') setSt('thinking');
      }
      if (sc?.outputTranscription?.text) {
        outAcc.current += sc.outputTranscription.text;
        setOutputText(outAcc.current);
      }
      if (sc?.turnComplete) {
        inAcc.current = '';
        outAcc.current = '';
        if (liveRef.current && statusRef.current !== 'speaking') setSt('listening');
      }
      const calls = msg.toolCall?.functionCalls;
      if (calls?.length) {
        const handlers = handlersRef.current;
        const responses = await Promise.all(
          calls.map(async (fc) => ({
            id: fc.id,
            name: fc.name,
            response: handlers[fc.name]
              ? await handlers[fc.name](fc.args || {})
              : { ok: false, error: 'unhandled' },
          })),
        );
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ toolResponse: { functionResponses: responses } }));
        }
      }
    },
    [handlersRef, setSt],
  );

  const startMic = useCallback(
    async (ws: WebSocket) => {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: { echoCancellation: true, noiseSuppression: true, channelCount: 1 },
      });
      if (!liveRef.current) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }
      streamRef.current = stream;
      const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new Ctor();
      recCtxRef.current = ctx;
      await ctx.resume().catch(() => undefined);
      const source = ctx.createMediaStreamSource(stream);
      const proc = ctx.createScriptProcessor(4096, 1, 1);
      processorRef.current = proc;
      const mute = ctx.createGain();
      mute.gain.value = 0;
      source.connect(proc);
      proc.connect(mute);
      mute.connect(ctx.destination);
      proc.onaudioprocess = (ev) => {
        if (!liveRef.current || ws.readyState !== WebSocket.OPEN) return;
        if (ws.bufferedAmount > 256000) return;
        const input = ev.inputBuffer.getChannelData(0);
        const pcm = downsampleToPcm16(input, ctx.sampleRate, 16000);
        ws.send(
          JSON.stringify({
            realtimeInput: {
              audio: { mimeType: 'audio/pcm;rate=16000', data: bytesToBase64(pcm) },
            },
          }),
        );
      };
    },
    [],
  );

  const connect = useCallback(
    async (ctrl: Ctrl, resume: boolean) => {
      setSt('connecting');
      setError(null);
      const mintRes = await fetch('/api/amul-gobardhan/live-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      if (ctrl.cancelled) return;
      const mint = (await mintRes.json().catch(() => ({}))) as Mint & { error?: string };
      if (ctrl.cancelled) return;
      if (!mintRes.ok || !mint.websocketUrl) {
        throw new Error(mint.error || 'Voice session could not start.');
      }
      if (!isValidLiveUrl(mint.websocketUrl) || !mint.token?.startsWith('auth_tokens/')) {
        throw new Error('Invalid websocketUrl from token route');
      }
      if (wsRef.current) {
        try {
          wsRef.current.close();
        } catch {
          /* ignore */
        }
      }
      const sessionId = sessionRef.current;
      const ws = new WebSocket(mint.websocketUrl);
      ws.binaryType = 'arraybuffer';
      wsRef.current = ws;
      let setupOk = false;
      let micStarted = false;
      const engage = () => {
        if (ctrl.cancelled || !liveRef.current || micStarted) return;
        micStarted = true;
        if (!kickedOffRef.current) {
          kickedOffRef.current = true;
          sendKickoff(ws, resume);
        }
        void startMic(ws);
        setSt('listening');
      };
      const grace = window.setTimeout(() => {
        if (!setupOk && ws.readyState === WebSocket.OPEN) {
          setupOk = true;
          engage();
        }
      }, 8000);
      ws.onopen = () => {
        if (ctrl.cancelled) {
          ws.close();
          return;
        }
        ws.send(JSON.stringify({ setup: mint.setup || {} }));
      };
      ws.onmessage = (ev) => {
        void wsDataToString(ev.data).then((raw) => {
          if (!raw) return;
          if (!setupOk && raw.includes('setupComplete')) {
            setupOk = true;
            window.clearTimeout(grace);
            engage();
          }
          void handleMessage(ws, raw, sessionId);
        });
      };
      ws.onerror = () => {
        window.clearTimeout(grace);
      };
      ws.onclose = (ev) => {
        window.clearTimeout(grace);
        if (ctrl.cancelled || !liveRef.current) return;
        if (reconnectsRef.current >= 3) {
          liveRef.current = false;
          cleanupAudio();
          setError(
            ev.code && ev.code !== 1000
              ? `সংযোগ বিচ্ছিন্ন হয়েছে (${ev.code})। আবার চেষ্টা করুন।`
              : 'সংযোগ বিচ্ছিন্ন হয়েছে। আবার চেষ্টা করুন।',
          );
          setSt('error');
          return;
        }
        reconnectsRef.current += 1;
        kickedOffRef.current = false;
        void connect(ctrl, true).catch(() => {
          if (!ctrl.cancelled) {
            setError('সংযোগ বিচ্ছিন্ন হয়েছে। আবার চেষ্টা করুন।');
            setSt('error');
            liveRef.current = false;
            cleanupAudio();
          }
        });
      };
    },
    [cleanupAudio, handleMessage, sendKickoff, setSt, startMic],
  );

  const start = useCallback(async () => {
    if (statusRef.current === 'connecting') return;
    hardClose();
    const ctrl: Ctrl = { cancelled: false };
    ctrlRef.current = ctrl;
    liveRef.current = true;
    reconnectsRef.current = 0;
    kickedOffRef.current = false;
    inAcc.current = '';
    outAcc.current = '';
    setInputText('');
    setOutputText('');
    sessionRef.current += 1;
    const q = new AudioQueue((speaking) => {
      if (!liveRef.current) return;
      if (speaking) setSt('speaking');
      else if (statusRef.current === 'speaking') setSt('listening');
    });
    queueRef.current = q;
    await q.warm();
    if (ctrl.cancelled) return;
    try {
      await connect(ctrl, false);
    } catch (e) {
      if (ctrl.cancelled) return;
      liveRef.current = false;
      cleanupAudio();
      setError(e instanceof Error ? e.message : 'Voice session could not start.');
      setSt('error');
    }
  }, [cleanupAudio, connect, hardClose, setSt]);

  const stop = useCallback(() => {
    hardClose();
    setSt('idle');
    setError(null);
  }, [hardClose, setSt]);

  const sendText = useCallback((text: string) => {
    const ws = wsRef.current;
    if (!text.trim() || !ws || ws.readyState !== WebSocket.OPEN) return false;
    setSt('thinking');
    ws.send(
      JSON.stringify({
        clientContent: {
          turns: [{ role: 'user', parts: [{ text: text.trim() }] }],
          turnComplete: true,
        },
      }),
    );
    return true;
  }, [setSt]);

  useEffect(() => {
    return () => {
      hardClose();
    };
  }, [hardClose]);

  return { status, error, inputText, outputText, start, stop, sendText };
}
