export type KnowledgeRecord = {
  id: string;
  domain?: string;
  claim_type?: string;
  verification_status?: string;
  triggers: string[];
  priority?: number;
  answer_en: string;
  answer_bn: string;
  sources?: unknown[];
};

export type KnowledgePack = {
  identity_en: string;
  identity_bn: string;
  records: KnowledgeRecord[];
  pages?: Record<string, unknown>;
  assistant_name?: string;
};

export type AssistantMatch = {
  id: string;
  claim_type?: string;
  verification_status?: string;
  domain?: string;
  classifier_domain: string;
  answer_en: string;
  answer_bn: string;
  answer: string;
};

const AMUL_KW = [
  'amul', 'dairy', 'milk', 'vdcs', 'e-rcs', 'sankrail', 'gcmmf', 'dealership',
  'village society', 'দুধ', 'সমিতি',
];
const GOBAR_KW = [
  'gobardhan', 'gobar', 'biogas', 'cbg', 'cfa', 'satat', 'slurry', 'mnre',
  'track a', 'track b', 'track c', 'গোবর্ধন', 'গোবর', 'সিবিজি', 'বায়োগ্যাস',
];
const COMP_KW = [
  'difference', 'different', 'versus', ' vs ', 'both', 'relation',
  'join korlei', 'automatically', 'owns the gobardhan', 'not the same',
  'amul and gobardhan', 'amul vs',
];
const CLARIFY_KW = [
  'which one is relevant', 'relevant for my situation', 'which is relevant',
  'my situation', 'amar jonno konta', 'কোনটা আমার',
];
const SHARED_KW = [
  'who are you', 'are you amul', 'government officer', 'polling booth',
  'where do i vote', 'are you government',
];
const HARD_CLAIMS = new Set(['HARD_REFUSAL', 'SOURCE_MISSING']);

function norm(s: string) {
  return s.toLowerCase().replace(/₹/g, 'rs ').replace(/\s+/g, ' ').trim();
}

function scoreRecord(q: string, rec: KnowledgeRecord) {
  const hits = rec.triggers.filter((t) => q.includes(t.toLowerCase())).length;
  if (!hits) return 0;
  return hits * 10 + (rec.priority || 0);
}

function kwScore(q: string, words: string[]) {
  return words.reduce((n, w) => n + (q.includes(w) ? 8 : 0), 0);
}

export function recordDomain(rec: KnowledgeRecord) {
  const d = (rec.domain || 'SHARED').toUpperCase();
  if (d === 'BKS' || d === 'SHARED') return 'SHARED';
  if (d === 'CROSS') return 'COMPARISON';
  if (d === 'AMUL' || d === 'GOBARDHAN') return d;
  return 'SHARED';
}

export function classifyIntent(pack: KnowledgePack, query: string): string {
  const q = norm(query);
  const scores: Record<string, number> = { AMUL: 0, GOBARDHAN: 0, COMPARISON: 0, SHARED: 0 };
  for (const rec of pack.records) {
    const s = scoreRecord(q, rec);
    if (!s) continue;
    scores[recordDomain(rec)] += s;
  }
  scores.AMUL += kwScore(q, AMUL_KW);
  scores.GOBARDHAN += kwScore(q, GOBAR_KW);
  scores.COMPARISON += kwScore(q, COMP_KW);
  scores.SHARED += kwScore(q, SHARED_KW) + kwScore(q, CLARIFY_KW) * 3;

  if (CLARIFY_KW.some((k) => q.includes(k))) return 'SHARED';
  if (COMP_KW.some((k) => q.includes(k)) || scores.COMPARISON >= 70) return 'COMPARISON';
  const amul = scores.AMUL;
  const gob = scores.GOBARDHAN;
  if (amul >= 40 && gob >= 40 && Math.abs(amul - gob) < 50) return 'SHARED';
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const [top, topS] = ranked[0];
  if (topS <= 0) return 'UNSUPPORTED';
  return top;
}

function candidateRecords(intent: string, records: KnowledgeRecord[]) {
  if (intent === 'COMPARISON') return records;
  if (intent === 'UNSUPPORTED') {
    return records.filter((r) => HARD_CLAIMS.has(r.claim_type || '') || recordDomain(r) === 'SHARED');
  }
  const allow: Record<string, Set<string>> = {
    AMUL: new Set(['AMUL', 'SHARED']),
    GOBARDHAN: new Set(['GOBARDHAN', 'SHARED']),
    SHARED: new Set(['SHARED', 'COMPARISON']),
  };
  const set = allow[intent];
  return records.filter(
    (r) => HARD_CLAIMS.has(r.claim_type || '') || (set && set.has(recordDomain(r))),
  );
}

export function matchAnswer(pack: KnowledgePack, query: string, lang: 'bn' | 'en' | 'mixed'): AssistantMatch {
  const q = norm(query);
  const intent = classifyIntent(pack, query);
  const pool = candidateRecords(intent, pack.records);
  let best: KnowledgeRecord | null = null;
  let bestScore = 0;
  for (const rec of pool) {
    const s = scoreRecord(q, rec);
    if (s > bestScore) {
      bestScore = s;
      best = rec;
    }
  }
  if (!best || bestScore < 10) {
    const answer_en =
      pack.identity_en +
      ' I do not have a dated official source for that specific claim. ' +
      'Ask your Gram Panchayat, District SBM cell, or the district milk union. ' +
      'How many cattle do you have, and is this about milk / Amul or gobar gas / GOBARdhan?';
    const answer_bn =
      pack.identity_bn +
      ' এই দাবির জন্য দাপ্তরিক সূত্র নেই। গ্রাম পঞ্চায়েত, জেলা SBM বা দুগ্ধ ইউনিয়নে জিজ্ঞাসা করুন। ' +
      'কতগুলো গরু, আর প্রশ্ন দুধ/Amul না gobar/GOBARdhan?';
    return {
      id: 'unknown',
      claim_type: 'HARD_REFUSAL',
      verification_status: 'SOURCE_MISSING',
      domain: intent,
      classifier_domain: intent,
      answer_en,
      answer_bn,
      answer: lang === 'bn' ? answer_bn : answer_en,
    };
  }
  const spoken = lang === 'bn' ? best.answer_bn : best.answer_en;
  return {
    id: best.id,
    claim_type: best.claim_type,
    verification_status: best.verification_status,
    domain: recordDomain(best),
    classifier_domain: intent,
    answer_en: best.answer_en,
    answer_bn: best.answer_bn,
    answer: spoken,
  };
}
