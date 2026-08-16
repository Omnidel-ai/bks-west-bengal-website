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
};

function norm(s: string) {
  return s.toLowerCase().replace(/₹/g, 'rs ').replace(/\s+/g, ' ').trim();
}

export function matchAnswer(pack: KnowledgePack, query: string, lang: 'bn' | 'en' | 'mixed') {
  const q = norm(query);
  let best: KnowledgeRecord | null = null;
  let bestScore = 0;
  for (const rec of pack.records) {
    const hits = rec.triggers.filter((t) => q.includes(t.toLowerCase())).length;
    if (!hits) continue;
    const s = hits * 10 + (rec.priority || 0);
    if (s > bestScore) {
      bestScore = s;
      best = rec;
    }
  }
  if (!best) {
    return {
      id: 'unknown',
      claim_type: 'HARD_REFUSAL',
      answer_en: pack.identity_en + ' I do not have a dated official source for that specific claim.',
      answer_bn: pack.identity_bn,
      answer: lang === 'bn' ? pack.identity_bn : pack.identity_en,
    };
  }
  const spoken = lang === 'bn' ? best.answer_bn : best.answer_en;
  return {
    id: best.id,
    claim_type: best.claim_type,
    verification_status: best.verification_status,
    answer_en: best.answer_en,
    answer_bn: best.answer_bn,
    answer: spoken,
  };
}
