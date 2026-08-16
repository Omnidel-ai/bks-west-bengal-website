import Link from 'next/link';

function T({ bn, en }: { bn: string; en: string }) {
  return (
    <>
      <span className="i18n-bn">{bn}</span>
      <span className="i18n-en">{en}</span>
    </>
  );
}

export default function InitiativePage() {
  return (
    <>
      <section className="hero initiative-hero">
        <div className="wrap">
          <p className="kicker">Bharatiya Krishak Samaj · West Bengal Initiative</p>
          <h1>
            <T
              bn="Amul + GOBARdhan — কৃষকের জন্য BKS তথ্য উদ্যোগ"
              en="Amul + GOBARdhan — a BKS information initiative for farmers"
            />
          </h1>
          <p>
            <T
              bn="BKS পশ্চিমবঙ্গ দুগ্ধ সমবায় (Amul-ধাঁচ) এবং সরকারি GOBARdhan biogas/CBG কর্মসূচি ব্যাখ্যা করে। এটি Amul-এর অফিসিয়াল সাইট নয়, সরকারি পোর্টাল নয়, ভর্তুকি অনুমোদন নয়।"
              en="BKS West Bengal explains cooperative dairy (Amul-pattern) and the government GOBARdhan biogas/CBG programme. This is not Amul official, not a government portal, and not a subsidy approval desk."
            />
          </p>
          <div className="hero-actions">
            <Link className="btn-gold" href="/initiatives/amul-gobardhan/assistant" prefetch={false}>
              <T bn="BKS সহকারীকে জিজ্ঞাসা করুন" en="Ask the BKS Assistant" />
            </Link>
            <a className="btn-secondary" href="#sources">
              <T bn="সূত্র ও যাচাই" en="Sources & verification" />
            </a>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap prose">
          <h2>
            <T bn="এই BKS উদ্যোগ কী?" en="What is this BKS initiative?" />
          </h2>
          <p>
            <T
              bn="তিনটি স্তর: (১) বিদ্যমান Amul উপস্থাপনা BKS ব্যানারে, (২) ভবিষ্যৎ BKS YouTube, (৩) Amul + GOBARdhan তথ্য সহকারী। BKS তথ্য দেয় — সরকার বা Amul নয়।"
              en="Three layers: (1) the existing Amul presentation under a BKS banner, (2) future BKS YouTube, (3) an Amul + GOBARdhan information assistant. BKS informs — it is not the government and not Amul."
            />
          </p>
        </div>
      </section>

      <section className="band muted">
        <div className="wrap">
          <h2>
            <T bn="কেন Amul?" en="Why Amul?" />
          </h2>
          <p className="pending">Pending source verification on rupee figures</p>
          <div className="tile-grid">
            <article className="tile">
              <h3>
                <T bn="৩-স্তর সমবায়" en="3-tier cooperative" />
              </h3>
              <p>
                <T
                  bn="গ্রাম সমিতি → জেলা ইউনিয়ন → রাজ্য ফেডারেশন। দুধ ওপরে, টাকা সদস্যের দিকে — মডেল, গ্যারান্টি নয়।"
                  en="Village society → district union → state federation. A model, not a price guarantee."
                />
              </p>
            </article>
            <article className="tile">
              <h3>Sankrail</h3>
              <p>
                <T
                  bn="উপস্থাপনায় হাওড়ার সাঁকরাইল, ₹৭০০ কোটি, ৩০ লক্ষ লিটার/দিন — যাচাই বাকি। কৃষক প্রতি উপহার নয়।"
                  en="Presentation names Sankrail, Howrah, ₹700 crore, 30 lakh L/day — pending primary source. Not a per-farmer gift."
                />
              </p>
            </article>
            <article className="tile">
              <h3>
                <T bn="গ্রাম সমিতি" en="Village society" />
              </h3>
              <p>
                <T
                  bn="উপস্থাপনার ধাপ: জড়ো হওয়া, e-RCS, ইউনিয়নের সঙ্গে যোগাযোগ। ইউনিয়ন নিশ্চিত করবে।"
                  en="Presentation steps: gather, e-RCS, connect with the union. The union confirms."
                />
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap">
          <h2>
            <T bn="GOBARdhan কী?" en="What is GOBARdhan?" />
          </h2>
          <p>
            <T
              bn="সরকারি কর্মসূচি (২০১৮): গোবর ও জৈব বর্জ্য থেকে biogas/CBG ও সার। একজন কৃষকের একটা চেক নয়।"
              en="Government of India programme (2018): dung and organic waste to biogas/CBG and manure. Not one cheque to one farmer."
            />
          </p>
          <h3>
            <T bn="তিনটি পথ — মেশাবেন না" en="Three pathways — do not merge" />
          </h3>
          <div className="tile-grid">
            <article className="tile">
              <h3>Track A</h3>
              <p>
                <T
                  bn="বাড়ির ছোট biogas। MNRE CFA, প্ল্যান্ট চালুর পর। ২–৪ m³ সাধারণ শ্রেণিতে ₹১৪,৩৫০ (২০২১-২৬)।"
                  en="Household biogas. MNRE CFA after commissioning. 2–4 m³ general category ₹14,350 (2021–26)."
                />
              </p>
            </article>
            <article className="tile">
              <h3>Track B</h3>
              <p>
                <T
                  bn="Community/cluster। জেলা প্রতি সর্বোচ্চ ₹৫০ লক্ষ — কৃষক প্রতি নয়।"
                  en="Community/cluster. Up to ₹50 lakh per district — not per farmer."
                />
              </p>
            </article>
            <article className="tile">
              <h3>Track C</h3>
              <p>
                <T
                  bn="বাণিজ্যিক CBG। Cabinet ৬ আগস্ট ২০২৬: ₹২ কোটি/TPD, ₹২,১১০/MMBTU। আবেদন নির্দেশিকা তখনও প্রকাশিত হয়নি।"
                  en="Commercial CBG. Cabinet 6 Aug 2026: up to ₹2 crore/TPD, ₹2,110/MMBTU. Apply-guidelines were not published as of 16 Aug 2026."
                />
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="band muted">
        <div className="wrap">
          <h2>
            <T bn="কৃষক ও সম্প্রদায়ের সুযোগ" en="Farmer / community opportunity" />
          </h2>
          <p>
            <T
              bn="সমর্থিত যাত্রা: দুধ/পশু → গরু → গোবর → biogas/CBG → সার। সুযোগ ট্র্যাক অনুযায়ী আলাদা।"
              en="Supported journey: dairy / livestock → cattle → dung → biogas / CBG → manure. Opportunity depends on the track."
            />
          </p>
          <div className="tile-grid">
            <article className="tile">
              <h3>
                <T bn="দুধ সমবায়" en="Dairy cooperative" />
              </h3>
              <p>
                <T
                  bn="গ্রাম সমিতি দুধ সংগ্রহ করে। দাম, সদস্যপদ ও মেশিন জেলা ইউনিয়ন নিশ্চিত করে — BKS গ্যারান্টি দেয় না।"
                  en="A village society collects milk. Price, membership and machines are confirmed by the district union — not guaranteed by BKS."
                />
              </p>
            </article>
            <article className="tile">
              <h3>
                <T bn="গোবর ও সার" en="Dung and manure" />
              </h3>
              <p>
                <T
                  bn="গোবর বা সার বিক্রি একটি সম্ভাবনা, জাতীয় MSP নয়। Banas কেস স্টাডি বাংলার স্বয়ংক্রিয় পেমেন্ট নয়।"
                  en="Selling dung or manure is a possibility, not a national MSP. The Banas case study is not an automatic Bengal payment."
                />
              </p>
            </article>
            <article className="tile">
              <h3>
                <T bn="কমিউনিটি / CBG" en="Community / CBG" />
              </h3>
              <p>
                <T
                  bn="২টি গরু মানে Track A, বাণিজ্যিক CBG নয়। FPO/ক্লাস্টার Track B। কার্বন ক্রেডিট আয় গ্যারান্টি নেই।"
                  en="Two cows point to Track A, not commercial CBG. FPO/cluster is Track B. There is no carbon-credit income guarantee."
                />
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="band">
        <div className="wrap prose">
          <h2>
            <T bn="Amul + GOBARdhan সম্পর্ক" en="Amul + GOBARdhan relationship" />
          </h2>
          <p>
            <T
              bn="দুগ্ধ সমবায় GOBARdhan বাস্তবায়নকারী হতে পারে। Amul স্কিমের মালিক নয়। যোগ দিলেই ভর্তুকি মেলে না। Banas (গুজরাট) ও Sundarini (বাংলা) কেস স্টাডি — বাংলার গ্যারান্টি নয়।"
              en="Milk cooperatives can implement GOBARdhan. Amul does not own the scheme. Joining does not grant subsidy. Banas (Gujarat) and Sundarini (Bengal) are case studies — not a Bengal guarantee."
            />
          </p>
        </div>
      </section>

      <section className="band">
        <div className="wrap prose">
          <h2>
            <T bn="BKS উদ্যোগ কীভাবে সাহায্য করে" en="How the BKS initiative helps" />
          </h2>
          <p>
            <T
              bn="BKS তথ্য স্তর: উপস্থাপনা, এই পাতা, সহকারী, এবং ভবিষ্যৎ YouTube। BKS সরকারি স্কিম নয়, Amul নয়, অনুমোদন ডেস্ক নয়।"
              en="BKS is an information layer: the presentation, this page, the assistant, and future YouTube. BKS is not a government scheme, not Amul, and not an approval desk."
            />
          </p>
        </div>
      </section>

      <section className="band" id="assistant-cta">
        <div className="wrap">
          <h2>
            <T bn="BKS সহকারীকে জিজ্ঞাসা করুন" en="Ask the BKS Assistant" />
          </h2>
          <p>
            <T bn="তথ্য ও ব্যাখ্যা — অনুমোদন নয়।" en="Information and explanation — not approval." />
          </p>
          <Link className="btn-gold" href="/initiatives/amul-gobardhan/assistant" prefetch={false}>
            <T bn="সহকারী খুলুন" en="Open the assistant" />
          </Link>
        </div>
      </section>

      <section className="band muted" id="video">
        <div className="wrap">
          <h2>YouTube</h2>
          <p className="pending">Not published — architecture only</p>
          <div className="tile-grid">
            <article className="tile">
              <h3>
                <T bn="Amul সুযোগ" en="Amul opportunity" />
              </h3>
              <p>publish_status: unpublished</p>
            </article>
            <article className="tile">
              <h3>GOBARdhan explainer</h3>
              <p>publish_status: unpublished</p>
            </article>
            <article className="tile">
              <h3>
                <T bn="Amul + GOBARdhan সংযোগ" en="Amul + GOBARdhan connection" />
              </h3>
              <p>publish_status: unpublished</p>
            </article>
            <article className="tile">
              <h3>
                <T bn="কৃষক FAQ" en="Farmer FAQ" />
              </h3>
              <p>publish_status: unpublished</p>
            </article>
            <article className="tile">
              <h3>
                <T bn="বাংলা ব্যাখ্যা" en="Bengali explainer" />
              </h3>
              <p>publish_status: unpublished</p>
            </article>
          </div>
        </div>
      </section>

      <section className="band" id="sources">
        <div className="wrap prose">
          <h2>
            <T bn="সূত্র ও যাচাই" en="Verified information / source notes" />
          </h2>
          <div className="note-block">
            <T
              bn="GOBARdhan অর্থের হিসাব ১৬ আগস্ট ২০২৬ গবেষণা (PIB/পোর্টাল)। Amul উপস্থাপনার ₹ সংখ্যা PENDING SOURCE VERIFICATION। Dealership ফি এই জ্ঞানভাণ্ডারে নেই।"
              en="GOBARdhan money figures follow the 16 Aug 2026 research (PIB/portals). Amul presentation rupee figures remain PENDING SOURCE VERIFICATION. Dealership fees are not in this knowledge base."
            />
          </div>
          <p>GOBARdhan: gobardhan.sbm.gov.in · biogas.mnre.gov.in · Panchayat Helpline 1800 889 9451</p>
        </div>
      </section>

      <section className="band muted" id="contact">
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
