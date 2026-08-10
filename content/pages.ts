import type { Lang } from '@/lib/i18n/types';

type T = Record<Lang, string>;
const t = (bn: string, en: string, hi: string): T => ({ bn, en, hi });

export const pages = {
  about: {
    kicker: t('BKS সম্পর্কে', 'About BKS', 'BKS के बारे में'),
    title: t(
      'অন্নদাতার কণ্ঠস্বর বহনকারী একটি জাতীয় কৃষক সংগঠন।',
      'A national farmer organisation that carries the annadata’s voice.',
      'अन्नदाता की आवाज़ ले जाने वाला एक राष्ट्रीय किसान संगठन।',
    ),
    paras: [
      t(
        'ভারতীয় কৃষক সমাজ (BKS) নতুন দিল্লিতে সদর দপ্তরযুক্ত একটি জাতীয় কৃষক সংগঠন, যা কৃষকের অধিকার, কৃষি আয় বৃদ্ধি এবং সুষ্ঠু কৃষিনীতির জন্য কাজ করে।',
        'Bharatiya Krishak Samaj (BKS) is a national farmer organisation headquartered in New Delhi, working for farmer rights, agricultural income growth, and fair agri-policy.',
        'भारतीय कृषक समाज (BKS) नई दिल्ली में मुख्यालय वाला राष्ट्रीय किसान संगठन है, जो किसान अधिकार, कृषि आय वृद्धि और उचित कृषि नीति के लिए काम करता है।',
      ),
      t(
        'কয়েক দশক ধরে BKS ভারতীয় কৃষকের পাশে দাঁড়িয়েছে সেই প্রশ্নগুলিতে যা একটি কৃষক পরিবারের ভবিষ্যৎ নির্ধারণ করে: ন্যায্য মূল্য, ভালো বীজ, সুস্থ মাটি এবং স্বনির্ভরতা।',
        'For decades BKS has stood with Indian farmers on the questions that decide a farm family’s future: fair prices, good seed, healthy soil, and self-reliance.',
        'दशकों से BKS उन प्रश्नों पर भारतीय किसानों के साथ खड़ा रहा है जो किसी किसान परिवार का भविष्य तय करते हैं: उचित मूल्य, अच्छा बीज, स्वस्थ मिट्टी और आत्मनिर्भरता।',
      ),
      t(
        'এর জাতীয় সভাপতি শ্রী কৃষ্ণ বীর চৌধুরীর নেতৃত্বে, BKS ন্যূনতম সহায়ক মূল্যের আইনি নিশ্চয়তা এবং কৃষি মূল্য কমিশনের সাংবিধানিক মর্যাদার এক ধারাবাহিক কণ্ঠস্বর হয়ে থেকেছে।',
        'Under National President Shri Krishan Bir Chaudhary, BKS has been a consistent voice for legal guarantee of Minimum Support Price and constitutional status for the agricultural price commission.',
        'राष्ट्रीय अध्यक्ष श्री कृष्ण बीर चौधरी के नेतृत्व में BKS न्यूनतम समर्थन मूल्य की कानूनी गारंटी और कृषि मूल्य आयोग की संवैधानिक गरिमा का लगातार स्वर रहा है।',
      ),
    ],
    pillars: [
      {
        title: t('কৃষকের মর্যাদা', 'Farmer dignity', 'किसान की गरिमा'),
        body: t(
          'কৃষক কোনো সুবিধাভোগী নন, বরং জাতির মেরুদণ্ড, এবং এমন নীতি, প্রতিষ্ঠান ও জনসম্মানের অধিকারী যা তা প্রতিফলিত করে।',
          'Farmers are not beneficiaries — they are the nation’s backbone, and deserve policy, institutions, and public honour that reflect that.',
          'किसान लाभार्थी नहीं, राष्ट्र की रीढ़ हैं — और ऐसी नीति, संस्थाएँ व सम्मान उनके हक हैं जो इसे दर्शाएँ।',
        ),
      },
      {
        title: t('স্বদেশি শক্তি', 'Swadeshi strength', 'स्वदेशी शक्ति'),
        body: t(
          'ভারতের কৃষি দাঁড়ানো উচিত ভারতীয় বীজ, ভারতীয় জ্ঞান এবং ভারতীয় উদ্যোগের উপর: স্বনির্ভর, পরনির্ভর নয়।',
          'Indian agriculture should stand on Indian seed, Indian knowledge, and Indian enterprise: self-reliant, not dependent.',
          'भारत की कृषि भारतीय बीज, भारतीय ज्ञान और भारतीय उद्यम पर खड़ी हो: आत्मनिर्भर, परनिर्भर नहीं।',
        ),
      },
      {
        title: t('প্রাকৃতিক কৃষি', 'Natural farming', 'प्राकृतिक कृषि'),
        body: t(
          'এমন চাষ যা মাটি, বীজ বা সম্প্রদায়ের জীবন দুর্বল না করে আয় বাড়ায়: রাসায়নিক-সচেতন, পরিবেশগতভাবে ভারসাম্যপূর্ণ এবং ঐতিহ্যবাহী জ্ঞানে প্রোথিত।',
          'Farming that raises income without weakening soil, seed, or community life — chemical-conscious, ecologically balanced, rooted in traditional knowledge.',
          'ऐसी खेती जो मिट्टी, बीज या समुदाय को कमज़ोर किए बिना आय बढ़ाए — रसायन-सचेत, पर्यावरण-संतुलित और पारंपरिक ज्ञान में जमी।',
        ),
      },
      {
        title: t('ব্যবহারিক জ্ঞান', 'Practical knowledge', 'व्यावहारিক ज्ञान'),
        body: t(
          'কৃষকের এমন জ্ঞান দরকার যা মাঠে কাজে লাগে, তাঁদের কাছে সেখানেই পৌঁছায় যেখানে তাঁরা থাকেন, সেই ভাষাতেই যা তাঁরা বলেন।',
          'Farmers need knowledge that works in the field, reaches them where they live, in the language they speak.',
          'किसान को ऐसा ज्ञान चाहिए जो खेत में काम आए, वहीं पहुँचे जहाँ वे रहते हैं, उसी भाषा में जो वे बोलते हैं।',
        ),
      },
    ],
  },
  westBengal: {
    kicker: t('পশ্চিমবঙ্গ শাখা', 'West Bengal unit', 'पश्चिम बंगाल शाखा'),
    title: t(
      'মন দিয়ে শোনা, ধৈর্যের সঙ্গে সংগঠিত করা এবং সহনশীল কৃষিকে সমর্থন করা।',
      'Listen carefully, organise patiently, and support resilient agriculture.',
      'मन से सुनना, धैर्य से संगठित करना और लचीली कृषि का समर्थन करना।',
    ),
    paras: [
      t(
        'BKS-এর পশ্চিমবঙ্গ শাখা জুন ২০২৬-এ গঠিত হয়, যখন ৩০ জুন ২০২৬-এ নতুন দিল্লিতে জাতীয় সভাপতি শ্রী কৃষ্ণ বীর চৌধুরী কর্তৃক মহাচার্য সৌরভ জে. সরকারকে রাজ্য সভাপতি নিযুক্ত করা হয়।',
        'The West Bengal chapter of BKS was formed in June 2026, when Mahacharya Sourabh J. Sarkar was appointed State President by National President Shri Krishan Bir Chaudhary in New Delhi on 30 June 2026.',
        'BKS की पश्चिम बंगाल शाखा जून 2026 में गठित हुई, जब 30 जून 2026 को नई दिल्ली में राष्ट्रीय अध्यक्ष श्री कृष्ण बीर चौधरी ने महाचार्य सौरभ जे. सरकार को राज्य अध्यक्ष नियुक्त किया।',
      ),
      t(
        'পশ্চিমবঙ্গ ভারতের অন্যতম কৃষিপ্রধান রাজ্য, যেখানে লক্ষ লক্ষ ছোট ও প্রান্তিক কৃষক, বর্গাদার, খেতমজুর এবং গ্রামীণ উদ্যোক্তা বাস করেন।',
        'West Bengal is one of India’s most agrarian states, home to millions of small and marginal farmers, sharecroppers, farm workers, and rural entrepreneurs.',
        'पश्चिम बंगाल भारत के सबसे कृषि-प्रधान राज्यों में से एक है, जहाँ लाखों छोटे व सीमांत किसान, बटाईदार, खेतिहर मज़दूर और ग्रामीण उद्यमी रहते हैं।',
      ),
      t(
        'BKS পশ্চিমবঙ্গ কলকাতায় একটি আনুষ্ঠানিক কর্মসূচি আয়োজন করবে, রাজ্য, বিভাগীয় ও জেলা স্তরের শাখা গঠন করবে, এবং জাতীয় সভাপতির নির্দেশনায় অন্যান্য রাজ্যের কৃষক নেতাদের আমন্ত্রণ জানাবে।',
        'BKS West Bengal will organise a ceremonial programme in Kolkata, form state, divisional and district units, and invite farmer leaders from other states under the National President’s guidance.',
        'BKS पश्चिम बंगाल कोलकाता में औपचारिक कार्यक्रम आयोजित करेगा, राज्य/मंडल/ज़िला इकाइयाँ बनाएगा, और राष्ट्रीय अध्यक्ष के मार्गदर्शन में अन्य राज्यों के किसान नेताओं को आमंत्रित करेगा।',
      ),
    ],
    priorities: [
      t('জেলায় জেলায় প্রশিক্ষণ ও মাঠ-সেমিনার', 'District training and field seminars', 'ज़िला प्रशिक्षण व मैदान सेमिनार'),
      t('প্রাকৃতিক ও রাসায়নিক-সচেতন চাষ', 'Natural and chemical-conscious farming', 'प्राकृतिक व रसायन-सचेत खेती'),
      t('জৈব ও দেশীয় উপকরণ, স্থানীয় বীজ', 'Organic and indigenous inputs, local seed', 'जैविक व देशी इनपुट, स्थानीय बीज'),
      t('মূল্য সংযোজন ও কৃষক উদ্যোগ', 'Value addition and farmer enterprise', 'मूल्य संवर्धन व किसान उद्यम'),
      t('নীতি-প্রতিক্রিয়া মাঠ থেকে সরকারে', 'Policy feedback from field to government', 'मैदान से सरकार तक नीति प्रतिक्रिया'),
      t('কৃষিতে যুব ও নারী অন্তর্ভুক্তি', 'Youth and women inclusion in agriculture', 'कृषि में युवा व महिला समावेश'),
      t('অন্নদাতার জন্য AI — স্থানীয় ভাষায়', 'AI for Annadata in local languages', 'अन्नदाता के लिए स्थानीय भाषा में AI'),
    ],
  },
};

export function pick(lang: Lang, value: T) {
  return value[lang];
}
