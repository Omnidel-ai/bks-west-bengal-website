/** PCM helpers + gapless 24 kHz playback. Copy of the OmniDEL Constrained Live audio shape. */

export function bytesToBase64(bytes: Uint8Array): string {
  let bin = '';
  const chunk = 0x2000;
  for (let i = 0; i < bytes.length; i += chunk) {
    bin += String.fromCharCode(...bytes.subarray(i, i + chunk));
  }
  return btoa(bin);
}

export function base64ToBytes(b64: string): Uint8Array {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return bytes;
}

export function downsampleToPcm16(input: Float32Array, inputRate: number, outputRate = 16000): Uint8Array {
  const ratio = inputRate / outputRate;
  const length = Math.max(0, Math.floor(input.length / ratio));
  const out = new Int16Array(length);
  for (let i = 0; i < length; i++) {
    const sample = Math.max(-1, Math.min(1, input[Math.floor(i * ratio)] || 0));
    out[i] = sample < 0 ? sample * 0x8000 : sample * 0x7fff;
  }
  return new Uint8Array(out.buffer);
}

export function pcm24kToAudioBuffer(ctx: AudioContext, b64: string): AudioBuffer {
  const bytes = base64ToBytes(b64);
  const pcm = new Int16Array(bytes.buffer, bytes.byteOffset, Math.floor(bytes.byteLength / 2));
  const buffer = ctx.createBuffer(1, pcm.length, 24000);
  const channel = buffer.getChannelData(0);
  for (let i = 0; i < pcm.length; i++) channel[i] = pcm[i] / 0x8000;
  return buffer;
}

function createAudioContext(): AudioContext {
  const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  return new Ctor();
}

/** Gapless 24 kHz playback. Recreates a closed AudioContext. */
export class AudioQueue {
  private ctx: AudioContext | null = null;
  private nextStart = 0;
  private gen = 0;
  constructor(private onSpeaking?: (speaking: boolean) => void) {}

  private ensure(): AudioContext {
    if (!this.ctx || this.ctx.state === 'closed') {
      this.ctx = createAudioContext();
      this.nextStart = 0;
    }
    return this.ctx;
  }

  async warm() {
    const ctx = this.ensure();
    await ctx.resume().catch(() => undefined);
  }

  stop() {
    this.gen += 1;
    this.nextStart = 0;
    this.onSpeaking?.(false);
    try {
      this.ctx?.close();
    } catch {
      /* ignore */
    }
    this.ctx = null;
  }

  enqueue(b64: string) {
    if (!b64) return;
    const ctx = this.ensure();
    const myGen = this.gen;
    void ctx.resume().then(() => {
      if (myGen !== this.gen) return;
      const buffer = pcm24kToAudioBuffer(ctx, b64);
      if (!buffer.length) return;
      const src = ctx.createBufferSource();
      src.buffer = buffer;
      src.connect(ctx.destination);
      const at = Math.max(ctx.currentTime, this.nextStart);
      src.start(at);
      this.nextStart = at + buffer.duration;
      this.onSpeaking?.(true);
      src.onended = () => {
        if (myGen === this.gen && ctx.currentTime >= this.nextStart - 0.02) {
          this.onSpeaking?.(false);
        }
      };
    });
  }
}
