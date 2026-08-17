import type { KnowledgePack, KnowledgeRecord } from './assistant';
import packJson from './knowledge.json';

export type VoiceRecord = {
  id: string;
  domain: string;
  claim_type?: string;
  verification_status?: string;
  answer_bn: string;
  answer_en: string;
};

export function getKnowledgePack(): KnowledgePack {
  return packJson as KnowledgePack;
}

/** Complete Q&A records for mint injection. Pages/IA are website-only and are not this document. */
export function voiceRecordsFromPack(pack: KnowledgePack = getKnowledgePack()): VoiceRecord[] {
  return (pack.records || []).map((r: KnowledgeRecord) => ({
    id: r.id,
    domain: r.domain || 'SHARED',
    claim_type: r.claim_type,
    verification_status: r.verification_status,
    answer_bn: r.answer_bn,
    answer_en: r.answer_en,
  }));
}

export function estimateVoiceTokens(records: VoiceRecord[]): number {
  return Math.round(JSON.stringify(records).length / 3);
}
