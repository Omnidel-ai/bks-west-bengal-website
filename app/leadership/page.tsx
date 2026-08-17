'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageProvider';
import type { Lang } from '@/lib/i18n/types';

type Copy = Record<Lang, string>;

const PRESIDENT_HREF = 'https://krishan-bir-chaudhary.vercel.app';

export default function Page() {
  const { lang } = useLang();
  const L = (c: Copy) => c[lang];

  return (
    <>
      <section className="section-page-hero">
        <div className="wrap">
          <Link className="media-back-link" href="/">
            Back to home
          </Link>
          <span className="eyebrow">{L({ bn: 'নেতৃত্ব', en: 'People', hi: 'नेतृत्व' })}</span>
          <h1>
            {L({
              bn: 'যে নেতারা মাঠে হেঁটেছেন, কৃষকদের সঙ্গে বসেছেন এবং তাঁদের কণ্ঠস্বর এগিয়ে নিয়ে গেছেন।',
              en: 'Leaders who have walked the fields, sat with cultivators and carried their voice forward.',
              hi: 'वे नेता जो खेतों में चले, किसानों के साथ बैठे और उनकी आवाज़ को आगे ले गए।',
            })}
          </h1>
          <div className="stitch-accent" aria-hidden />
        </div>
      </section>

      <section className="home-section" aria-labelledby="national-president-name">
        <div className="wrap leader-profile">
          <div className="profile-photo-block">
            <div className="leader-portrait leader-portrait-large">
              <Image
                src="/assets/dr-krishan-bir-chaudhary.jpg"
                alt={L({
                  bn: 'শ্রী কৃষ্ণ বীর চৌধুরী',
                  en: 'Shri Krishan Bir Choudhary',
                  hi: 'श्री कृष्ण बीर चौधरी',
                })}
                fill
                sizes="(max-width: 900px) 100vw, 320px"
                priority
              />
            </div>
          </div>
          <div className="prose-block">
            <p className="eyebrow">
              {L({
                bn: 'জাতীয় সভাপতি, ভারতীয় কৃষক সমাজ',
                en: 'National President, Bharatiya Krishak Samaj',
                hi: 'राष्ट्रीय अध्यक्ष, भारतीय कृषक समाज',
              })}
            </p>
            <h2 id="national-president-name">
              {L({
                bn: 'শ্রী কৃষ্ণ বীর চৌধুরী',
                en: 'Shri Krishan Bir Choudhary',
                hi: 'श्री कृष्ण बीर चौधरी',
              })}
            </h2>
            <p>
              {L({
                bn: 'শ্রী কৃষ্ণ বীর চৌধুরী কয়েক দশক ধরে ভারতীয় কৃষি ও কৃষক আন্দোলনের সঙ্গে যুক্ত থেকেছেন, এবং কৃষিনীতিতে দেশের অন্যতম অগ্রণী কণ্ঠস্বর হিসেবে বিবেচিত।',
                en: "Shri Krishan Bir Choudhary has been associated with Indian agriculture and the farmers' movement for decades, and is regarded as one of the country's foremost voices on agricultural policy.",
                hi: 'श्री कृष्ण बीर चौधरी दशकों से भारतीय कृषि और किसान आंदोलन से जुड़े रहे हैं, और कृषि नीति पर देश की प्रमुख आवाज़ों में गिने जाते हैं।',
              })}
            </p>
            <p>
              {L({
                bn: 'ভারতীয় কৃষক সমাজের জাতীয় সভাপতি হিসেবে, তিনি সংগঠনের সেই কাজের নেতৃত্ব দেন যা ভারতীয় কৃষকের কণ্ঠস্বর সরকার, জাতীয় মঞ্চ ও গণমাধ্যমে পৌঁছে দেয়।',
                en: "As National President of Bharatiya Krishak Samaj, he leads the organisation's work of carrying the Indian farmer's voice to governments, national platforms and the media.",
                hi: 'भारतीय कृषक समाज के राष्ट्रीय अध्यक्ष के रूप में वे उस काम का नेतृत्व करते हैं जो भारतीय किसान की आवाज़ सरकार, राष्ट्रीय मंचों और मीडिया तक पहुँचाता है।',
              })}
            </p>
            <div className="two-column-list">
              <div>
                <h3>
                  {L({
                    bn: 'জাতীয় দায়িত্ব',
                    en: 'National responsibilities',
                    hi: 'राष्ट्रीय जिम्मेदारियाँ',
                  })}
                </h3>
                <ul>
                  <li>
                    {L({
                      bn: 'প্রাক্তন চেয়ারম্যান, স্টেট ফার্মস কর্পোরেশন অফ ইন্ডিয়া, ভারত সরকার',
                      en: 'Former Chairman, State Farms Corporation of India, Government of India',
                      hi: 'पूर्व अध्यक्ष, स्टेट फार्म्स कॉर्पोरेशन ऑफ इंडिया, भारत सरकार',
                    })}
                  </li>
                  <li>
                    {L({
                      bn: 'প্রাক্তন চেয়ারম্যান, ইন্ডিয়ান সুগারকেন ডেভেলপমেন্ট কাউন্সিল, ভারত সরকার',
                      en: 'Former Chairman, Indian Sugarcane Development Council, Government of India',
                      hi: 'पूर्व अध्यक्ष, इंडियन शुगरकेन डेवलपमेंट काउंसिल, भारत सरकार',
                    })}
                  </li>
                  <li>
                    {L({
                      bn: 'প্রতিষ্ঠাতা, স্মল ফার্মার্স অ্যাগ্রি-বিজনেস কনসোর্টিয়াম (SFAC)',
                      en: "Founder, Small Farmers' Agri-Business Consortium (SFAC)",
                      hi: 'संस्थापक, स्मॉल फार्मर्स एग्री-बिज़नेस कंसोर्टियम (SFAC)',
                    })}
                  </li>
                  <li>
                    {L({
                      bn: 'পরিচালক, NAFED, ন্যাশনাল অ্যাগ্রিকালচারাল কোঅপারেটিভ মার্কেটিং ফেডারেশন অফ ইন্ডিয়া',
                      en: 'Director, NAFED, National Agricultural Cooperative Marketing Federation of India',
                      hi: 'निदेशक, NAFED, नेशनल एग्रीकल्चरल कोऑपरेटिव मार्केटिंग फेडरेशन ऑफ इंडिया',
                    })}
                  </li>
                  <li>
                    {L({
                      bn: 'সদস্য, MSP কমিটি, ভারত সরকার',
                      en: 'Member, MSP Committee, Government of India',
                      hi: 'सदस्य, MSP समिति, भारत सरकार',
                    })}
                  </li>
                </ul>
              </div>
              <div>
                <h3>{L({ bn: 'কৃষকের কণ্ঠস্বর', en: 'A voice for the farmer', hi: 'किसान की आवाज़' })}</h3>
                <ul>
                  <li>
                    {L({
                      bn: 'ন্যূনতম সহায়ক মূল্যের (MSP) আইনি নিশ্চয়তা, যাতে ন্যায্য মূল্য কৃষকের অধিকার হয়।',
                      en: "A legal guarantee of Minimum Support Price (MSP) so that fair price is a farmer's right.",
                      hi: 'न्यूनतम समर्थन मूल्य (MSP) की कानूनी गारंटी, ताकि उचित मूल्य किसान का अधिकार हो।',
                    })}
                  </li>
                  <li>
                    {L({
                      bn: 'কৃষি মূল্য কমিশনের সাংবিধানিক মর্যাদা, যাতে যে সংস্থা কৃষকের মূল্য নির্ধারণ করে তা কৃষকের প্রাপ্য গুরুত্ব বহন করে।',
                      en: 'Constitutional status for the Agricultural Price Commission so the body that decides the farmer’s price carries the weight the farmer deserves.',
                      hi: 'कृषि मूल्य आयोग को संवैधानिक दर्जा, ताकि किसान की कीमत तय करने वाली संस्था किसान के योग्य महत्व रखे।',
                    })}
                  </li>
                </ul>
              </div>
            </div>
            <p className="leader-links">
              <a className="btn-gold" href={PRESIDENT_HREF} target="_blank" rel="noopener noreferrer">
                {L({
                  bn: 'পূর্ণ জাতীয় সভাপতি প্রোফাইল',
                  en: 'Full National President profile',
                  hi: 'पूर्ण राष्ट्रीय अध्यक्ष प्रोफ़ाइल',
                })}
              </a>
              <a className="btn-secondary" href="https://x.com/DrKrishanBir" target="_blank" rel="noopener noreferrer">
                X
              </a>
              <a
                className="btn-secondary"
                href="https://www.instagram.com/krishanbir.chaudhary/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a
                className="btn-secondary"
                href="https://www.facebook.com/krishanbir.chaudhary/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="home-section" aria-labelledby="state-president-name">
        <div className="wrap person-feature">
          <div className="person-feature-photo">
            <Image
              src="/assets/mahacharya-sourabh-j-sarkar.jpg"
              alt={L({
                bn: 'মহাচার্য সৌরভ জে. সরকার',
                en: 'Mahacharya Sourabh J. Sarkar',
                hi: 'महाचार्य सौरभ जे. सरकार',
              })}
              fill
              sizes="(max-width: 900px) 100vw, 420px"
            />
          </div>
          <div>
            <p className="person-role">
              {L({
                bn: 'রাজ্য সভাপতি — পশ্চিমবঙ্গ, ভারতীয় কৃষক সমাজ',
                en: 'State President - West Bengal of Bharatiya Krishak Samaj',
                hi: 'राज्य अध्यक्ष — पश्चिम बंगाल, भारतीय कृषक समाज',
              })}
            </p>
            <h2 id="state-president-name">
              {L({
                bn: 'মহাচার্য সৌরভ জে. সরকার',
                en: 'Mahacharya Sourabh J. Sarkar',
                hi: 'महाचार्य सौरभ जे. सरकार',
              })}
            </h2>
            <p className="eyebrow">{L({ bn: 'প্রতিষ্ঠাতা, KarmYog for the 21st Century', en: 'Founder, KarmYog for the 21st Century', hi: 'संस्थापक, KarmYog for the 21st Century' })}</p>
            <p>
              What we need is a Human Potential Manifestation system that is meaningful, relevant, holistic, balanced
              and inclusive.
            </p>
            <p>
              {L({
                bn: '৩০ জুন ২০২৬-এ নতুন দিল্লিতে শ্রী কৃষ্ণ বীর চৌধুরী কর্তৃক রাজ্য সভাপতি নিযুক্ত, মহাচার্য সৌরভ জে. সরকার রাজ্য স্তর থেকে বিভাগীয় ও জেলা শাখা পর্যন্ত পশ্চিমবঙ্গ জুড়ে BKS-এর উপস্থিতি গড়ে তোলার নেতৃত্ব দেন।',
                en: "Appointed State President - West Bengal of Bharatiya Krishak Samaj on 30 June 2026 by Shri Krishan Bir Choudhary in New Delhi, Mahacharya Sourabh J. Sarkar leads the building of BKS's presence across West Bengal from the state level down to divisional and district units.",
                hi: '30 जून 2026 को नई दिल्ली में श्री कृष्ण बीर चौधरी द्वारा राज्य अध्यक्ष नियुक्त, महाचार्य सौरभ जे. सरकार राज्य स्तर से मंडलीय और ज़िला इकाइयों तक पश्चिम बंगाल में BKS की उपस्थिति बनाने का नेतृत्व करते हैं।',
              })}
            </p>
            <p>
              {L({
                bn: 'শ্রদ্ধার সঙ্গে মহাচার্য জি নামে পরিচিত, তিনি একজন কৃষি-শিক্ষাবিদ, নগর কৃষি ও খাদ্য-ব্যবস্থার অগ্রদূত, এবং বৃহৎ পরিসরে সংস্কৃতি ও আচরণ পরিবর্তনের ভারতের অন্যতম প্রধান রূপকার।',
                en: "Known reverentially as Mahacharya Ji, he is an agriculturist-educationist, urban farming and food-systems pioneer, and one of India's foremost practitioners of large-scale culture and behaviour change.",
                hi: 'श्रद्धा से महाचार्य जी कहे जाने वाले वे कृषि-शिक्षाविद्, शहरी कृषि और खाद्य-प्रणाली के अग्रणी, तथा बड़े पैमाने पर संस्कृति और व्यवहार परिवर्तन के भारत के प्रमुख साधकों में हैं।',
              })}
            </p>
            <p>
              {L({
                bn: 'তাঁর স্বতন্ত্র অবদান হল ঐতিহ্য ও আধুনিকতাকে একসঙ্গে আনা: ঐতিহ্যবাহী কৃষি ও সামাজিক জ্ঞানকে সম্মান জানিয়ে প্রযুক্তি, ডিজাইন ও কৃত্রিম বুদ্ধিমত্তা ব্যবহার করে পরিবর্তনকে জনগণের স্তরে গ্রহণযোগ্য করে তোলা।',
                en: 'His distinctive contribution is bringing tradition and modernity together: honouring traditional agricultural and community wisdom while using technology, design and artificial intelligence to make change adoptable at population scale.',
                hi: 'उनका विशिष्ट योगदान परंपरा और आधुनिकता को साथ लाना है: पारंपरिक कृषि और सामुदायिक ज्ञान का सम्मान करते हुए तकनीक, डिज़ाइन और कृत्रिम बुद्धिमत्ता से बदलाव को जन-स्तर पर ग्रहणयोग्य बनाना।',
              })}
            </p>
          </div>
        </div>

        <div className="wrap mahacharya-inline-photos">
          <figure className="mahacharya-inline-photo">
            <Image
              src="/assets/mahacharya-field/mahacharya-ox-plough.jpg"
              alt="Mahacharya Sourabh J. Sarkar with oxen in the field"
              fill
              sizes="(max-width: 900px) 100vw, 360px"
            />
          </figure>
          <figure className="mahacharya-inline-photo">
            <Image
              src="/assets/mahacharya-field/mahacharya-tractor-plough.jpg"
              alt="Mahacharya Sourabh J. Sarkar on a tractor plough"
              fill
              sizes="(max-width: 900px) 100vw, 360px"
            />
          </figure>
          <figure className="mahacharya-inline-photo">
            <Image
              src="/assets/mahacharya-field/mahacharya-tractor-selfie.jpg"
              alt="Mahacharya Sourabh J. Sarkar on farm equipment"
              fill
              sizes="(max-width: 900px) 100vw, 360px"
            />
          </figure>
        </div>

        <div className="wrap mahacharya-detail-grid">
          <article className="note-block">
            <h3>{L({ bn: 'কর্মযোগ আন্দোলন', en: 'The KarmYog movement', hi: 'कर्मयोग आंदोलन' })}</h3>
            <p>
              {L({
                bn: 'মহাচার্য জি KarmYog for the 21st Century প্রতিষ্ঠা করেন, একটি আন্দোলন যা দর্শনকে গ্রামীণ ও নগর রূপান্তরের বৃহৎ মডেলে রূপান্তরিত করে, যার কেন্দ্রে রয়েছে খাদ্য, চাষ এবং পরিবেশগত কল্যাণ।',
                en: 'Mahacharya Ji founded KarmYog for the 21st Century, a movement that converts philosophy into scalable models of rural and urban transformation with food, farming and ecological well-being at its centre.',
                hi: 'महाचार्य जी ने KarmYog for the 21st Century की स्थापना की, एक आंदोलन जो दर्शन को ग्रामीण और शहरी रूपांतरण के विस्तार योग्य मॉडल में बदलता है, जिसके केंद्र में भोजन, खेती और पारिस्थितिक कल्याण है।',
              })}
            </p>
          </article>
          <article className="note-block">
            <h3>{L({ bn: 'পাঁচ লক্ষ জীবনে পৌঁছানো', en: 'Reaching half a million lives', hi: 'पाँच लाख जीवन तक पहुँच' })}</h3>
            <p>
              {L({
                bn: 'তাঁর OmniDEL লার্নিং ফ্রেমওয়ার্ক কৃষক শিক্ষা, গ্রামীণ যুব পরামর্শ, সড়ক নিরাপত্তা এবং স্কিল মিত্র কর্মসূচিকে সমর্থন করেছে, যা ভারতের বিভিন্ন রাজ্যে প্রায় পাঁচ লক্ষ জীবনে পৌঁছেছে।',
                en: 'His OmniDEL Learning Framework has supported farmer education, rural youth counselling, road safety and Skill Mitra programmes, touching close to half a million lives across Indian states.',
                hi: 'उनका OmniDEL लर्निंग फ्रेमवर्क किसान शिक्षा, ग्रामीण युवा परामर्श, सड़क सुरक्षा और स्किल मित्र कार्यक्रमों का समर्थन करता रहा है, जो भारत के राज्यों में लगभग पाँच लाख जीवन तक पहुँचा है।',
              })}
            </p>
          </article>
          <article className="note-block">
            <h3>{L({ bn: 'বাটিকা দৃষ্টিভঙ্গি', en: 'The Vatika vision', hi: 'वाटिका दृष्टि' })}</h3>
            <p>
              {L({
                bn: 'মিশন বায়োফিলিয়ার মাধ্যমে, তিনি বারান্দা থেকে প্রাতিষ্ঠানিক ও সরকারি স্থান পর্যন্ত দশ লক্ষ উৎপাদনশীল শিক্ষা-ও-জীবিকা বাগানের দিকে কাজ করছেন।',
                en: 'Through Mission Biophilia, he is working toward one million productive learning-and-livelihood gardens, from balconies to institutional and government spaces.',
                hi: 'मिशन बायोफिलिया के माध्यम से वे बालकनी से संस्थागत और सरकारी स्थानों तक दस लाख उत्पादक शिक्षा-और-जीविका उद्यानों की दिशा में काम कर रहे हैं।',
              })}
            </p>
          </article>
          <article className="note-block">
            <h3>{L({ bn: 'শিক্ষক ও প্রযুক্তিবিদ', en: 'Educator and technologist', hi: 'शिक्षक और प्रौद्योगिकीविद्' })}</h3>
            <p>
              {L({
                bn: 'তিনি ১৯৯৬ সালে ভারতের প্রথম ইন্টারঅ্যাক্টিভ-মাল্টিমিডিয়া কর্পোরেট-প্রশিক্ষণ বিভাগ গড়ে তোলেন এবং বিশ্বজুড়ে ২০০টিরও বেশি রিচ-মিডিয়া ই-লার্নিং প্রকল্প সরবরাহ করেছেন।',
                en: "He built India's first interactive-multimedia corporate-training division in 1996 and has delivered more than 200 rich-media eLearning projects worldwide.",
                hi: 'उन्होंने 1996 में भारत का पहला इंटरैक्टिव-मल्टीमीडिया कॉर्पोरेट-प्रशिक्षण विभाग बनाया और विश्व भर में 200 से अधिक रिच-मीडिया ई-लर्निंग परियोजनाएँ पूरी कीं।',
              })}
            </p>
          </article>
        </div>
      </section>

      <section className="home-section wrap video-section leadership-video-section" aria-labelledby="profile-videos-title">
        <div className="section-heading section-heading-wide">
          <span className="eyebrow">
            {L({ bn: 'মহাচার্য প্রোফাইল ভিডিও', en: 'Mahacharya profile videos', hi: 'महाचार्य प्रोफ़ाइल वीडियो' })}
          </span>
          <h3 id="profile-videos-title">
            {L({
              bn: 'প্রোফাইলের পিছনের কাজের দুটি জানালা।',
              en: 'Two video windows into the work behind the profile.',
              hi: 'प्रोफ़ाइल के पीछे के काम की दो खिड़कियाँ।',
            })}
          </h3>
          <div className="stitch-accent" aria-hidden />
        </div>
        <div className="video-grid">
          <article className="video-card">
            <div className="video-frame">
              <iframe
                src="https://www.youtube.com/embed/c6CCNVbBGL8"
                title={L({
                  bn: 'মানব-সম্ভাবনা ও বৃহৎ পরিসরে শিক্ষা নিয়ে মহাচার্য জি',
                  en: 'Mahacharya Ji on human potential and learning at scale',
                  hi: 'मानव-संभावना और बड़े पैमाने पर शिक्षा पर महाचार्य जी',
                })}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h4>
              {L({
                bn: 'মানব-সম্ভাবনা ও বৃহৎ পরিসরে শিক্ষা নিয়ে মহাচার্য জি',
                en: 'Mahacharya Ji on human potential and learning at scale',
                hi: 'मानव-संभावना और बड़े पैमाने पर शिक्षा पर महाचार्य जी',
              })}
            </h4>
            <p>
              {L({
                bn: 'মহাচার্য বিভাগের জন্য একটি প্রোফাইল ভিডিও, যা মানব-সম্ভাবনা বিকাশ, শিক্ষা, সামাজিক পরিবর্তন এবং বৃহৎ শিক্ষা ব্যবস্থায় তাঁর কাজকে যুক্ত করে।',
                en: 'A profile video for the Mahacharya section, connecting his work in human potential manifestation, education, community change and scalable learning systems.',
                hi: 'महाचार्य खंड के लिए एक प्रोफ़ाइल वीडियो, जो मानव-संभावना विकास, शिक्षा, सामाजिक परिवर्तन और विस्तार योग्य शिक्षा प्रणालियों से उनके काम को जोड़ता है।',
              })}
            </p>
          </article>
          <article className="video-card">
            <div className="video-frame">
              <iframe
                src="https://www.youtube.com/embed/2lveMnYU9Ds?start=191"
                title={L({
                  bn: 'কর্মযোগ, খাদ্য-ব্যবস্থা ও রূপান্তর নিয়ে মহাচার্য জি',
                  en: 'Mahacharya Ji on KarmYog, food systems and transformation',
                  hi: 'कर्मयोग, खाद्य-प्रणाली और रूपांतरण पर महाचार्य जी',
                })}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h4>
              {L({
                bn: 'কর্মযোগ, খাদ্য-ব্যবস্থা ও রূপান্তর নিয়ে মহাচার্য জি',
                en: 'Mahacharya Ji on KarmYog, food systems and transformation',
                hi: 'कर्मयोग, खाद्य-प्रणाली और रूपांतरण पर महाचार्य जी',
              })}
            </h4>
            <p>
              {L({
                bn: 'একটি সহায়ক ভিডিও যা দর্শকদের KarmYog for the 21st Century-এর পিছনের দর্শন এবং প্রকৃতি, জীবিকা ও সামাজিক পরিবর্তনের সঙ্গে এর সম্পর্ক নিয়ে আরও প্রসঙ্গ দেয়।',
                en: 'A supporting video that gives visitors more context on the philosophy behind KarmYog for the 21st Century and its connection with nature, livelihood and social change.',
                hi: 'एक सहायक वीडियो जो KarmYog for the 21st Century के पीछे के दर्शन और प्रकृति, आजीविका व सामाजिक परिवर्तन से उसके संबंध पर अधिक संदर्भ देता है।',
              })}
            </p>
          </article>
        </div>
      </section>

      <section className="home-section">
        <div className="wrap people-grid">
          <article className="people-card">
            <div className="people-card-body">
              <h3>{L({ bn: 'সুভাশিস ঘোষ', en: 'Subhashish Ghosh', hi: 'सुभाषिश घोष' })}</h3>
              <p className="eyebrow">{L({ bn: 'আউটরিচ প্রধান', en: 'Head of Outreach', hi: 'आउटरीच प्रमुख' })}</p>
              <p>
                {L({
                  bn: 'সুভাশিস ঘোষ ভারতীয় কৃষক সমাজ, পশ্চিমবঙ্গের আউটরিচ বিভাগের নেতৃত্ব দেন।',
                  en: 'Subhashish Ghosh leads outreach for Bharatiya Krishak Samaj, West Bengal.',
                  hi: 'सुभाषिश घोष भारतीय कृषक समाज, पश्चिम बंगाल के आउटरीच का नेतृत्व करते हैं।',
                })}
              </p>
              <p>{L({ bn: 'ফোন: +91 98365 80480', en: 'Phone: +91 98365 80480', hi: 'फोन: +91 98365 80480' })}</p>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
