'use client';

import Image from 'next/image';
import { districts } from '@/content/presence/districts';
import { useLang } from '@/lib/i18n/LanguageProvider';

const roles = [
  { bn: 'জেলা সভাপতি', en: 'District President', hi: 'ज़िला अध्यक्ष' },
  { bn: 'জেলা কার্যকরী সভাপতি', en: 'District Working President', hi: 'ज़िला कार्यकारी अध्यक्ष' },
  { bn: 'জেলা সাধারণ সম্পাদক', en: 'District General Secretary', hi: 'ज़िला महासचिव' },
  { bn: 'ব্লক / আঞ্চলিক সমন্বয়ক', en: 'Block / Regional Coordinator', hi: 'ब्लॉक / क्षेत्रीय समन्वयक' },
  { bn: 'মহিলা কৃষক শাখা নেতৃত্ব', en: 'Women Farmer Wing Lead', hi: 'महिला किसान विंग लीड' },
  { bn: 'যুব কৃষক শাখা নেতৃত্ব', en: 'Youth Farmer Wing Lead', hi: 'युवा किसान विंग लीड' },
];

export default function ApplyPage() {
  const { lang } = useLang();
  return (
    <section className="band">
      <div className="wrap">
        <div className="page-hero">
          <p className="kicker">
            {lang === 'bn' ? 'সংগঠন গড়ে তোলা' : lang === 'hi' ? 'संगठन निर्माण' : 'Building the organisation'}
          </p>
          <h1>
            {lang === 'bn'
              ? 'জেলা নেতৃত্ব নামাংকন'
              : lang === 'hi'
                ? 'ज़िला नेतृत्व नामांकन'
                : 'District leadership enrollment'}
          </h1>
          <p className="lede">
            {lang === 'bn'
              ? 'BKS পশ্চিমবঙ্গের সভাপতি হিসেবে মহাচার্যজির পরবর্তী দায়িত্ব হল রাজ্যজুড়ে জেলা নেতৃত্ব চিহ্নিত, মূল্যায়ন ও নিয়োগ করা।'
              : lang === 'hi'
                ? 'BKS पश्चिम बंगाल के अध्यक्ष के रूप में महाचार्य जी की अगली ज़िम्मेदारी राज्यभर में ज़िला नेतृत्व की पहचान, मूल्यांकन और नियुक्ति है।'
                : 'As State President of BKS West Bengal, Mahacharya Ji’s next responsibility is to identify, assess, and appoint district leadership across the state.'}
          </p>
        </div>

        <div className="split">
          <aside className="note-block" style={{ display: 'grid', gap: '0.75rem', alignContent: 'start' }}>
            <Image src="/assets/arjun-avatar.jpg" alt="" width={72} height={72} style={{ borderRadius: '50%' }} />
            <strong>{lang === 'bn' ? 'অর্জুন আচার্য' : lang === 'hi' ? 'अर्जुन आचार्य' : 'Arjun Acharya'}</strong>
            <p style={{ margin: 0 }}>
              {lang === 'bn'
                ? 'staging-এ ভয়েস সহায়ক এখনো সংযুক্ত নয়। নিচের ফর্মটি UI parity-র জন্য — জমা দেওয়া এখনো নিশ্চিত ব্যাকএন্ড ছাড়া চালু নয়।'
                : lang === 'hi'
                  ? 'स्टेजिंग में वॉइस सहायक अभी जुड़ा नहीं है। नीचे का फ़ॉर्म UI parity के लिए है — जमा करना अभी पुष्ट बैकएंड के बिना सक्रिय नहीं।'
                  : 'Voice assistant is not wired in staging yet. The form below is for UI parity — submission stays gated until backends are confirmed.'}
            </p>
          </aside>

          <form
            className="presence-team-panel"
            onSubmit={(e) => {
              e.preventDefault();
              alert(
                lang === 'bn'
                  ? 'Staging: আবেদন জমা এখনো সক্রিয় নয়।'
                  : lang === 'hi'
                    ? 'स्टेजिंग: आवेदन जमा अभी सक्रिय नहीं।'
                    : 'Staging: form submission is not active yet.',
              );
            }}
          >
            <label>
              {lang === 'bn' ? 'পূর্ণ নাম' : lang === 'hi' ? 'पूरा नाम' : 'Full name'} *
              <input name="name" required style={inputStyle} />
            </label>
            <label>
              {lang === 'bn' ? 'মোবাইল / WhatsApp' : lang === 'hi' ? 'मोबाइल / WhatsApp' : 'Mobile / WhatsApp'} *
              <input name="phone" required style={inputStyle} />
            </label>
            <label>
              {lang === 'bn' ? 'ইমেল' : lang === 'hi' ? 'ईमेल' : 'Email'}
              <input name="email" type="email" style={inputStyle} />
            </label>
            <label>
              {lang === 'bn' ? 'জেলা' : lang === 'hi' ? 'ज़िला' : 'District'} *
              <select name="district" required defaultValue="" style={inputStyle}>
                <option value="" disabled>
                  {lang === 'bn' ? 'আপনার জেলা নির্বাচন করুন' : lang === 'hi' ? 'अपना ज़िला चुनें' : 'Select your district'}
                </option>
                {districts.map((d) => (
                  <option key={d.id} value={d.slug}>
                    {d.name[lang]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {lang === 'bn' ? 'যে পদের জন্য আবেদন' : lang === 'hi' ? 'पद हेतु आवेदन' : 'Role applied for'} *
              <select name="role" required defaultValue="" style={inputStyle}>
                <option value="" disabled>
                  {lang === 'bn' ? 'পদ নির্বাচন করুন' : lang === 'hi' ? 'पद चुनें' : 'Select a role'}
                </option>
                {roles.map((r) => (
                  <option key={r.en} value={r.en}>
                    {r[lang]}
                  </option>
                ))}
              </select>
            </label>
            <label>
              {lang === 'bn' ? 'যোগ্যতা / অভিজ্ঞতা' : lang === 'hi' ? 'योग्यता / अनुभव' : 'Background / experience'} *
              <textarea name="experience" required rows={4} style={inputStyle} />
            </label>
            <button className="btn-gold" type="submit">
              {lang === 'bn' ? 'আবেদন জমা দিন' : lang === 'hi' ? 'आवेदन जमा करें' : 'Submit application'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

const inputStyle: import("react").CSSProperties = {
  display: 'block',
  width: '100%',
  marginTop: '0.35rem',
  marginBottom: '0.85rem',
  minHeight: '48px',
  padding: '0.7rem 0.85rem',
  borderRadius: '8px',
  border: '1px solid var(--rule)',
  background: 'var(--page)',
};
