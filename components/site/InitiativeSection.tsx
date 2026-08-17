import Link from 'next/link';
import type { KnowledgeRecord } from '@/lib/amul-gobardhan/assistant';

function T({ bn, en }: { bn: string; en: string }) {
  return (
    <>
      <span className="i18n-bn">{bn}</span>
      <span className="i18n-en">{en}</span>
    </>
  );
}

type Block = {
  type: string;
  en?: string;
  bn?: string;
  status?: string;
  title_en?: string;
  title_bn?: string;
  items?: Array<{
    en?: string;
    bn?: string;
    title_en?: string;
    title_bn?: string;
    kicker?: string;
    status?: string;
    id?: string;
    q_en?: string;
    q_bn?: string;
  }>;
  ids?: string[];
  topic?: string;
};

type Section = {
  id: string;
  heading_en: string;
  heading_bn: string;
  disclosure?: boolean;
  blocks: Block[];
};

type Initiative = {
  id: string;
  theme: string;
  title_en: string;
  title_bn: string;
  kicker_en: string;
  kicker_bn: string;
  sections: Section[];
};

function StatusChip({ status }: { status?: string }) {
  if (!status) return null;
  return <p className="pending">{status}</p>;
}

function BlockView({ block, records }: { block: Block; records: KnowledgeRecord[] }) {
  if (block.type === 'p') {
    return (
      <p>
        <T bn={block.bn || ''} en={block.en || ''} />
      </p>
    );
  }
  if (block.type === 'ul') {
    return (
      <ul className="support-list">
        {(block.items || []).map((item, i) => (
          <li key={i}>
            <p>
              <T bn={item.bn || ''} en={item.en || ''} />
            </p>
          </li>
        ))}
      </ul>
    );
  }
  if (block.type === 'note') {
    return (
      <div className="featured-note">
        <StatusChip status={block.status} />
        <h3>
          <T bn={block.title_bn || ''} en={block.title_en || ''} />
        </h3>
        <p>
          <T bn={block.bn || ''} en={block.en || ''} />
        </p>
      </div>
    );
  }
  if (block.type === 'steps') {
    return (
      <ol className="pathway-steps">
        {(block.items || []).map((item, i) => (
          <li key={i}>
            <h3>
              <T bn={item.title_bn || ''} en={item.title_en || ''} />
            </h3>
            <p>
              <T bn={item.bn || ''} en={item.en || ''} />
            </p>
          </li>
        ))}
      </ol>
    );
  }
  if (block.type === 'tracks') {
    return (
      <ol className="track-list">
        {(block.items || []).map((item, i) => (
          <li key={i}>
            <span className="track-kicker">{item.kicker}</span>
            <div>
              <StatusChip status={item.status} />
              <h3>
                <T bn={item.title_bn || ''} en={item.title_en || ''} />
              </h3>
              <p>
                <T bn={item.bn || ''} en={item.en || ''} />
              </p>
            </div>
          </li>
        ))}
      </ol>
    );
  }
  if (block.type === 'faqs' || block.type === 'faq_ids') {
    const items = (block.items || []).map((item) => ({
      rec: records.find((r) => r.id === item.id),
      q_en: item.q_en,
      q_bn: item.q_bn,
    }));
    const fromIds = (block.ids || []).map((id) => ({
      rec: records.find((r) => r.id === id),
      q_en: id,
      q_bn: id,
    }));
    const faqs = [...items, ...fromIds].filter((x) => x.rec);
    return (
      <div className="faq-list">
        {faqs.map(({ rec, q_en, q_bn }) => (
          <details key={rec!.id} className="faq-item">
            <summary>
              {rec!.verification_status ? <span className="pending">{rec!.verification_status}</span> : null}{' '}
              <T bn={q_bn || rec!.id} en={q_en || rec!.id} />
            </summary>
            <p>
              <T bn={rec!.answer_bn} en={rec!.answer_en} />
            </p>
          </details>
        ))}
      </div>
    );
  }
  if (block.type === 'cta') {
    const href = `/initiatives/amul-gobardhan/assistant${block.topic ? `?topic=${block.topic}` : ''}`;
    return (
      <p>
        <T bn={block.bn || ''} en={block.en || ''} />{' '}
        <Link className="btn-gold" href={href} prefetch={false}>
          <T bn="সহকারী খুলুন" en="Open the assistant" />
        </Link>
      </p>
    );
  }
  return null;
}

export default function InitiativeSection({
  data,
  records,
}: {
  data: Initiative;
  records: KnowledgeRecord[];
}) {
  return (
    <article id={data.id} className={`initiative-panel initiative-${data.theme}`}>
      <header className="initiative-panel-head">
        <p className="kicker">
          <T bn={data.kicker_bn} en={data.kicker_en} />
        </p>
        <h2>
          <T bn={data.title_bn} en={data.title_en} />
        </h2>
        <nav className="section-jump" aria-label={data.title_en}>
          {data.sections.map((s) => (
            <a key={s.id} href={`#${data.id}-${s.id}`}>
              <T bn={s.heading_bn} en={s.heading_en} />
            </a>
          ))}
        </nav>
      </header>
      {data.sections.map((section) => {
        const inner = (
          <>
            {section.disclosure ? null : (
              <h3 id={`${data.id}-${section.id}`}>
                <T bn={section.heading_bn} en={section.heading_en} />
              </h3>
            )}
            {section.blocks.map((block, i) => (
              <BlockView key={i} block={block} records={records} />
            ))}
          </>
        );
        if (section.disclosure) {
          return (
            <details key={section.id} className="disclosure" open={section.id !== 'faqs'}>
              <summary id={`${data.id}-${section.id}`}>
                <T bn={section.heading_bn} en={section.heading_en} />
              </summary>
              {section.blocks.map((block, i) => (
                <BlockView key={i} block={block} records={records} />
              ))}
            </details>
          );
        }
        return (
          <section key={section.id} className="initiative-sub">
            {inner}
          </section>
        );
      })}
    </article>
  );
}
