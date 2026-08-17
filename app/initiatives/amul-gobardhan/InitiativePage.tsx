import Link from 'next/link';
import pack from '@/lib/amul-gobardhan/knowledge.json';
import InitiativeSection from '@/components/site/InitiativeSection';
import type { KnowledgeRecord } from '@/lib/amul-gobardhan/assistant';

function T({ bn, en }: { bn: string; en: string }) {
  return (
    <>
      <span className="i18n-bn">{bn}</span>
      <span className="i18n-en">{en}</span>
    </>
  );
}

const records = pack.records as KnowledgeRecord[];
const pages = pack.pages as {
  hub: {
    kicker_en: string;
    kicker_bn: string;
    title_en: string;
    title_bn: string;
    lead_en: string;
    lead_bn: string;
    chooser: Array<{
      id: string;
      title_en: string;
      title_bn: string;
      blurb_en: string;
      blurb_bn: string;
      href: string;
      deep: string;
    }>;
    proposed_note: {
      status: string;
      title_en: string;
      title_bn: string;
      en: string;
      bn: string;
    };
  };
  comparison: { heading_en: string; heading_bn: string; en: string; bn: string };
  amul: Parameters<typeof InitiativeSection>[0]['data'];
  gobardhan: Parameters<typeof InitiativeSection>[0]['data'];
};

export default function InitiativePage({ focus }: { focus?: 'amul' | 'gobardhan' }) {
  const showAmul = !focus || focus === 'amul';
  const showGobardhan = !focus || focus === 'gobardhan';
  const hub = pages.hub;

  return (
    <>
      <section className="hero initiative-hero">
        <div className="wrap">
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <Link href="/">
                  <T bn="হোম" en="Home" />
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <T bn="উদ্যোগ" en="Initiatives" />
              </li>
              <li aria-hidden="true">/</li>
              <li aria-current="page">
                {focus === 'amul' ? (
                  <T bn="Amul সুযোগ" en="Amul Opportunity" />
                ) : focus === 'gobardhan' ? (
                  <T bn="GOBARdhan উদ্যোগ" en="GOBARdhan Initiative" />
                ) : (
                  'Amul & GOBARdhan'
                )}
              </li>
            </ol>
          </nav>
          <p className="kicker">
            <T bn={hub.kicker_bn} en={hub.kicker_en} />
          </p>
          <h1>
            <T bn={hub.title_bn} en={hub.title_en} />
          </h1>
          <p>
            <T bn={hub.lead_bn} en={hub.lead_en} />
          </p>
          <div className="hero-actions">
            <Link className="btn-gold" href="/initiatives/amul-gobardhan/assistant" prefetch={false}>
              <T bn="BKS Amul ও GOBARdhan সহকারীকে জিজ্ঞাসা করুন" en="Ask the BKS Amul & GOBARdhan Assistant" />
            </Link>
            <a className="btn-secondary" href="#sources">
              <T bn="সূত্র ও যাচাই" en="Sources & verification" />
            </a>
          </div>
        </div>
      </section>

      {!focus && (
        <section className="band" id="chooser">
          <div className="wrap">
            <h2>
              <T bn="দুটি সমান উদ্যোগ বেছে নিন" en="Choose either first-class initiative" />
            </h2>
            <div className="initiative-chooser">
              {hub.chooser.map((card) => (
                <a key={card.id} className={`chooser-card chooser-${card.id}`} href={card.href}>
                  <h3>
                    <T bn={card.title_bn} en={card.title_en} />
                  </h3>
                  <p>
                    <T bn={card.blurb_bn} en={card.blurb_en} />
                  </p>
                  <span className="chooser-more">
                    <T bn="বিস্তারিত পড়ুন" en="Read this section" />
                  </span>
                </a>
              ))}
            </div>
            <div className="featured-note">
              <p className="pending">{hub.proposed_note.status}</p>
              <h3>
                <T bn={hub.proposed_note.title_bn} en={hub.proposed_note.title_en} />
              </h3>
              <p>
                <T bn={hub.proposed_note.bn} en={hub.proposed_note.en} />
              </p>
            </div>
          </div>
        </section>
      )}

      {showAmul && (
        <section className="band band-amul">
          <div className="wrap">
            <InitiativeSection data={pages.amul} records={records} />
            {focus === 'amul' && (
              <p>
                <Link href="/initiatives/amul-gobardhan#gobardhan">
                  <T bn="GOBARdhan উদ্যোগ দেখুন" en="See the GOBARdhan Initiative" />
                </Link>
              </p>
            )}
          </div>
        </section>
      )}

      {showGobardhan && (
        <section className="band band-gobardhan">
          <div className="wrap">
            <InitiativeSection data={pages.gobardhan} records={records} />
            {focus === 'gobardhan' && (
              <p>
                <Link href="/initiatives/amul-gobardhan#amul">
                  <T bn="Amul সুযোগ দেখুন" en="See the Amul Opportunity" />
                </Link>
              </p>
            )}
          </div>
        </section>
      )}

      <section className="band muted" id="compare">
        <div className="wrap prose">
          <h2>
            <T bn={pages.comparison.heading_bn} en={pages.comparison.heading_en} />
          </h2>
          <p>
            <T bn={pages.comparison.bn} en={pages.comparison.en} />
          </p>
        </div>
      </section>

      <section className="service-band" id="assistant-cta">
        <div className="wrap">
          <h2>
            <T bn="BKS Amul ও GOBARdhan সহকারীকে জিজ্ঞাসা করুন" en="Ask the BKS Amul & GOBARdhan Assistant" />
          </h2>
          <p>
            <T bn="তথ্য ও ব্যাখ্যা — অনুমোদন নয়।" en="Information and explanation — not approval." />
          </p>
          <Link className="btn-gold" href="/initiatives/amul-gobardhan/assistant" prefetch={false}>
            <T bn="সহকারী খুলুন" en="Open the assistant" />
          </Link>
        </div>
      </section>

      <section className="band" id="video">
        <div className="wrap prose">
          <h2>YouTube</h2>
          <p className="pending">Not published — architecture only</p>
          <ul className="unpublished-list">
            <li>
              <T bn="Amul সুযোগ" en="Amul opportunity" />
              <span>unpublished</span>
            </li>
            <li>
              <span>GOBARdhan explainer</span>
              <span>unpublished</span>
            </li>
            <li>
              <T bn="দুটি উদ্যোগের পার্থক্য" en="How the two initiatives differ" />
              <span>unpublished</span>
            </li>
            <li>
              <T bn="কৃষক FAQ" en="Farmer FAQ" />
              <span>unpublished</span>
            </li>
            <li>
              <T bn="বাংলা ব্যাখ্যা" en="Bengali explainer" />
              <span>unpublished</span>
            </li>
          </ul>
        </div>
      </section>

      <section className="band muted" id="sources">
        <div className="wrap prose">
          <h2>
            <T bn="সূত্র ও যাচাই" en="Verified information / source notes" />
          </h2>
          <div className="note-block">
            <T
              bn="GOBARdhan অর্থের হিসাব ১৬ আগস্ট ২০২৬ গবেষণা (PIB/পোর্টাল)। Amul উপস্থাপনার ₹ সংখ্যা PENDING VERIFICATION। Dealership ফি এই জ্ঞানভাণ্ডারে নেই। ৫,০০০ × ₹১ লক্ষ PROPOSED / যাচাই বাকি।"
              en="GOBARdhan money figures follow the 16 Aug 2026 research (PIB/portals). Amul presentation rupee figures remain PENDING VERIFICATION. Dealership fees are not in this knowledge base. 5,000 × ₹1 lakh is PROPOSED / PENDING VERIFICATION."
            />
          </div>
          <p>GOBARdhan: gobardhan.sbm.gov.in · biogas.mnre.gov.in · Panchayat Helpline 1800 889 9451</p>
        </div>
      </section>

      <section className="band" id="contact">
        <div className="wrap prose">
          <h2>
            <T bn="যোগাযোগ / পরবর্তী ধাপ" en="Contact / next step" />
          </h2>
          <p>
            <T
              bn="স্কিম আবেদন: সংশ্লিষ্ট সরকারি পোর্টাল বা গ্রাম পঞ্চায়েত / জেলা SBM। দুধ সমবায়: জেলা দুগ্ধ ইউনিয়ন। BKS রাজ্য কার্যালয় তথ্যের জন্য।"
              en="For scheme applications: the relevant government portal, Gram Panchayat, or District SBM cell. For dairy cooperative membership: the district milk union. BKS State Office is for initiative information."
            />
          </p>
          <p>BKS State Office: F 127, Downtown Mall, Uniworld City, New Town, Kolkata 700 156</p>
          <p>
            <T
              bn="এই পাতায় Amul dealership ফি, MoU বা বিনিয়োগের যাচাইকৃত সূত্র নেই।"
              en="This page does not contain verified Amul dealership fees, MoU terms, or investment requirements."
            />
          </p>
        </div>
      </section>
    </>
  );
}
