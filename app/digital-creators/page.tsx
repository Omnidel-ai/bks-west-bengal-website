'use client';

import Link from 'next/link';
import { useLang } from '@/lib/i18n/LanguageProvider';
import type { Lang } from '@/lib/i18n/types';

type Copy = Record<Lang, string>;

type Creator = {
  name: Copy;
  handle: string;
  blurb: Copy;
  tags: string[];
  subs: string;
  videoHref: string;
  channelHref: string;
  thumb: string;
  avatar: string;
};

const copy = {
  eyebrow: {
    bn: 'ডিজিটাল কৃষি-শিক্ষা · বাংলা কণ্ঠ',
    en: 'Digital farm learning · Bangla voices',
    hi: 'डिजिटल कृषि-शिक्षा · बांग्ला आवाज़ें',
  },
  title: {
    bn: 'ডিজিটাল কৃষি স্রষ্টা',
    en: 'Digital Agri Creators',
    hi: 'डिजिटल कृषि स्रष्टा',
  },
  lede: {
    bn: 'বাংলায় অনেক কৃষক ও গৃহ-উদ্যানী এখন ইউটিউব থেকে শিখছেন — ছাদবাগান, সবজি, পশুপালন, জৈব চাষ ও আধুনিক খামারের কৌশল। BKS পশ্চিমবঙ্গ এই বাংলা ডিজিটাল শিক্ষকদের এক জায়গায় তুলে ধরছে, যাতে অন্নদাতা ও শিক্ষার্থীরা বিশ্বস্ত কণ্ঠ আরও দ্রুত খুঁজে পায়।',
    en: 'Across Bengal, farmers and home growers are learning through YouTube — rooftop gardens, vegetables, livestock, organic practice and modern farm tools. BKS West Bengal brings these Bangla digital educators into one place so annadatas and curious learners can find trusted voices faster.',
    hi: 'बंगाल में किसान और घरेलू बागवानी करने वाले लोग यूट्यूब से सीख रहे हैं — छत की बागवानी, सब्ज़ी, पशुपालन, जैविक खेती और आधुनिक फार्म। BKS पश्चिम बंगाल इन बांग्ला डिजिटल शिक्षकों को एक जगह लाता है, ताकि अन्नदाता और सीखने वाले विश्वसनीय आवाज़ें जल्दी पा सकें।',
  },
  sectionEyebrow: { bn: 'নির্বাচিত চ্যানেল', en: 'Featured channels', hi: 'चुने हुए चैनल' },
  sectionTitle: {
    bn: 'বাংলা ডিজিটাল কৃষি-শিক্ষক',
    en: 'Bangla digital farm educators',
    hi: 'बांग्ला डिजिटल कृषि-शिक्षक',
  },
  watch: { bn: 'ইউটিউবে দেখুন', en: 'Watch on YouTube', hi: 'यूट्यूब पर देखें' },
  disclaimer: {
    bn: 'এই প্রোফাইলগুলি স্বাধীন ইউটিউব শিক্ষক। তালিকাভুক্তির অর্থ প্রতিটি ভিডিও বা বাণিজ্যিক পণ্যের সমর্থন নয়। BKS পশ্চিমবঙ্গ বাংলায় ডিজিটাল কৃষি-শিক্ষার কণ্ঠগুলির একটি পাবলিক ডিরেক্টরি গড়ছে।',
    en: 'Profiles are independent YouTube educators. Listing does not imply endorsement of every video or commercial product. BKS West Bengal is building a public directory of digital farm learning voices in Bangla.',
    hi: 'ये प्रोफ़ाइल स्वतंत्र यूट्यूब शिक्षक हैं। सूची में होना हर वीडियो या व्यावसायिक उत्पाद का समर्थन नहीं है। BKS पश्चिम बंगाल बांग्ला डिजिटल कृषि-शिक्षा आवाज़ों की सार्वजनिक निर्देशिका बना रहा है।',
  },
  apply: { bn: 'BKS-এ আবেদন করুন', en: 'Apply to BKS West Bengal', hi: 'BKS में आवेदन करें' },
} satisfies Record<string, Copy>;

const creators: Creator[] = [
  {
    name: { bn: 'NATURE farm', en: 'NATURE farm', hi: 'NATURE farm' },
    handle: '@NATUREfarmbangla',
    blurb: {
      bn: 'বড় বাংলা খামার চ্যানেল — মৌসুমি ফসল, নার্সারি ও আধুনিক চাষের ধারণা।',
      en: 'Large Bangla farm channel covering seasonal crops, nursery practice and modern farming ideas.',
      hi: 'बड़ा बांग्ला फार्म चैनल — मौसमी फसल, नर्सरी और आधुनिक खेती के विचार।',
    },
    tags: ['Modern farming', 'Nursery', 'Seasonal crops'],
    subs: '637K',
    videoHref: 'https://www.youtube.com/watch?v=rzoJVAA7tZ0',
    channelHref: 'https://www.youtube.com/@naturefarmbangla',
    thumb: 'https://i.ytimg.com/vi/rzoJVAA7tZ0/hqdefault.jpg',
    avatar:
      'https://yt3.googleusercontent.com/RDiELkrrNsJzTpG83-RQFJr2hbV5hIaNSCxSdqrUZHWRJ0FBdYdDP74aX1Hevpise8anGNqYrA=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: { bn: 'Green Friends', en: 'Green Friends', hi: 'Green Friends' },
    handle: '@greenfriends8901',
    blurb: {
      bn: 'জনপ্রিয় বাংলা ছাদবাগান ও গৃহ-উদ্যান চ্যানেল — মাটিবিহীন চাষ, ফলের গাছ ও শহুরে জৈব টিপস।',
      en: 'Popular Bangla rooftop and home-garden channel — soil-free setups, fruit trees, organic tips for city growers.',
      hi: 'लोकप्रिय बांग्ला छत-बागवानी चैनल — मिट्टी-रहित सेटअप, फलदार पेड़ और शहरी जैविक सुझाव।',
    },
    tags: ['Rooftop garden', 'Organic', 'Fruit trees'],
    subs: '486K',
    videoHref: 'https://www.youtube.com/watch?v=mvR8qKAO3bk',
    channelHref: 'https://www.youtube.com/@greenfriends8901',
    thumb: 'https://i.ytimg.com/vi/mvR8qKAO3bk/hqdefault.jpg',
    avatar:
      'https://yt3.googleusercontent.com/ARKb8r6lFuxosHHMJKFGzWFAfj3tDinNNlwzPBlwPmzDC_cis0y40yTMxA90uZtsJ-ba3whX6YE=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: { bn: 'NATURE Agriculture', en: 'NATURE Agriculture', hi: 'NATURE Agriculture' },
    handle: '@NATUREAgricultureGardening',
    blurb: {
      bn: 'সবজি-কেন্দ্রিক বাংলা চ্যানেল — বাড়ির বাগান ও ক্ষেতের সবজি যত্ন।',
      en: 'Vegetable-focused Bangla channel — kitchen garden and field vegetable care tips.',
      hi: 'सब्ज़ी-केंद्रित बांग्ला चैनल — किचन गार्डन और खेत की सब्ज़ी देखभाल।',
    },
    tags: ['Brinjal', 'Chili', 'Kitchen garden'],
    subs: '263K',
    videoHref: 'https://www.youtube.com/watch?v=N4QRBtnZH5Y',
    channelHref: 'https://www.youtube.com/@NATUREAgricultureGardening',
    thumb: 'https://i.ytimg.com/vi/N4QRBtnZH5Y/hqdefault.jpg',
    avatar:
      'https://yt3.googleusercontent.com/ytc/AIdro_lpOlP_6nvjbjLLM78PbT1QTx7dXi9HvYkW1nx7w5LubQ=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: { bn: "Pika's Gardening", en: "Pika's Gardening", hi: "Pika's Gardening" },
    handle: '@PikasGardening',
    blurb: {
      bn: 'দৈনন্দিন গৃহ ও ছাদবাগানের জন্য সহজ বাংলা গাছ-যত্নের চ্যানেল।',
      en: 'Friendly Bangla plant-care channel focused on everyday household and terrace gardening.',
      hi: 'रोज़मर्रा की घरेलू और छत बागवानी के लिए सरल बांग्ला प्लांट-केयर चैनल।',
    },
    tags: ['Plant care', 'Gardening tips', 'Summer care'],
    subs: '217K',
    videoHref: 'https://www.youtube.com/watch?v=fKNbnlr576E',
    channelHref: 'https://www.youtube.com/@PikasGardening',
    thumb: 'https://i.ytimg.com/vi/fKNbnlr576E/hqdefault.jpg',
    avatar:
      'https://yt3.googleusercontent.com/z_pLXA3GW4LWzO77w1v7IOtkZZZj6DAPVYiIzrMNei_fiH0679FT6abvxN5c7BsHPL9BjGdMSA=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: { bn: 'Two sides krishi', en: 'Two sides krishi', hi: 'Two sides krishi' },
    handle: '@Twosideskrishi',
    blurb: {
      bn: 'বাংলা কৃষি ও বাগানের কৌশল — কলম, গাছ-যত্ন ও ব্যবহারিক টিপস।',
      en: 'Bangla krishi and gardening tricks — propagation, plant care and practical grower tips.',
      hi: 'बांग्ला कृषि और बागवानी ट्रिक्स — प्रोपेगेशन, पौधों की देखभाल और व्यवहारिक सुझाव।',
    },
    tags: ['Propagation', 'Plant care', 'Gardening tips'],
    subs: '200K',
    videoHref: 'https://www.youtube.com/watch?v=9XTVUSGRHvs',
    channelHref: 'https://www.youtube.com/@Twosideskrishi',
    thumb: 'https://i.ytimg.com/vi/9XTVUSGRHvs/hqdefault.jpg',
    avatar:
      'https://yt3.googleusercontent.com/ytc/AIdro_nhdrL_mu5Axs-2pkZUcS1n5hlIRm5TiCnRiYeKMKObgw=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: { bn: 'Biswajit sardar', en: 'Biswajit sardar', hi: 'Biswajit sardar' },
    handle: '@Biswajitsardar',
    blurb: {
      bn: 'বাংলা গ্রামীণ উদ্যোগ চ্যানেল — ছাগল পালন, ছোট যন্ত্রপাতি ও খামারের সরঞ্জাম।',
      en: 'Bangla rural enterprise channel — goat farming, small machines and farm tools.',
      hi: 'बांग्ला ग्रामीण उद्यम चैनल — बकरी पालन, छोटी मशीनें और फार्म उपकरण।',
    },
    tags: ['Goat farming', 'Farm machinery', 'Incubators'],
    subs: '175K',
    videoHref: 'https://www.youtube.com/watch?v=6wDWJ71QEao',
    channelHref: 'https://www.youtube.com/@Biswajitsardar',
    thumb: 'https://i.ytimg.com/vi/6wDWJ71QEao/hqdefault.jpg',
    avatar:
      'https://yt3.googleusercontent.com/1XItYZJhTRanbigz6g9_3jJ0XBMJSNj757CjCxZ789ZWeo6Xw1IZqQVA2HW_ENJmOAEHbJXicw=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: { bn: 'Banchharamerbagan', en: 'Banchharamerbagan', hi: 'Banchharamerbagan' },
    handle: '@SabujBangla',
    blurb: {
      bn: 'জৈব প্রক্রিয়া ও খামার-শিক্ষায় মনোযোগী বাংলা চ্যানেল (সবুজ বাংলা)।',
      en: 'Organic-process and farm-education focused Bangla channel (Sabuj Bangla branding).',
      hi: 'जैविक प्रक्रिया और फार्म-शिक्षा पर बांग्ला चैनल (सबुज बांग्ला)।',
    },
    tags: ['Organic gardening', 'Farm education'],
    subs: '165K',
    videoHref: 'https://www.youtube.com/watch?v=KJyqCu-TiWI',
    channelHref: 'https://www.youtube.com/@SabujBangla',
    thumb: 'https://i.ytimg.com/vi/KJyqCu-TiWI/hqdefault.jpg',
    avatar:
      'https://yt3.googleusercontent.com/SwSjU4i1I8GEHtouwrjU7Q7xHTEBnwbgeVHdqvdVUaCGBdD1VVTNIrauNYMc3HQOf3tAMI42-w=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: { bn: 'Rupali Garden', en: 'Rupali Garden', hi: 'Rupali Garden' },
    handle: '@RupaliGarden',
    blurb: {
      bn: 'ছাদবাগান ও ফলচাষে মনোযোগী বাংলা চ্যানেল — ড্রাগন ফলসহ শহুরে ফলের বাগান।',
      en: 'Bangla urban and roof-garden educator with strong fruit-growing content (including dragon fruit).',
      hi: 'छत बागवानी और फल-कृषि पर केंद्रित बांग्ला चैनल — ड्रैगन फ्रूट सहित शहरी फल।',
    },
    tags: ['Roof garden', 'Dragon fruit', 'Fruit growing'],
    subs: '130K',
    videoHref: 'https://www.youtube.com/watch?v=3sdGQS6iRSc',
    channelHref: 'https://www.youtube.com/@RupaliGarden',
    thumb: 'https://i.ytimg.com/vi/3sdGQS6iRSc/hqdefault.jpg',
    avatar:
      'https://yt3.googleusercontent.com/bYL6vDINNjEETL3Q6FdySgtHJB-m0jFdlsPqrZ7-eF0fwDIaScFrsw3hN_YokBwISw3agAva=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: { bn: 'উত্তরণ কৃষি', en: 'Uttaran Krishi', hi: 'Uttaran Krishi' },
    handle: '@uttarankrishi',
    blurb: {
      bn: 'বাংলা পশুপালন ও নার্সারি ব্যবসা চ্যানেল — শূকর, ছাগল ও নার্সারি উদ্যোগ।',
      en: 'Bangla livestock and nursery business channel — pig, goat and nursery enterprise tips.',
      hi: 'बांग्ला पशुपालन और नर्सरी व्यवसाय चैनल — सूअर, बकरी और नर्सरी उद्यम।',
    },
    tags: ['Pig farming', 'Goat farming', 'Nursery'],
    subs: '123K',
    videoHref: 'https://www.youtube.com/watch?v=rtBreqIVoDo',
    channelHref: 'https://www.youtube.com/@uttarankrishi',
    thumb: 'https://i.ytimg.com/vi/rtBreqIVoDo/hqdefault.jpg',
    avatar:
      'https://yt3.googleusercontent.com/PmK4V8cxSd-SjpNuEp7scLqmMeNZl9iDaPJ94Z8zxPDnFcXaCMXNfR6-k6DVau1hapKgLnKo=s900-c-k-c0x00ffffff-no-rj',
  },
  {
    name: { bn: 'Aj agro', en: 'Aj agro', hi: 'Aj agro' },
    handle: '@ajagro9733',
    blurb: {
      bn: 'ব্যবহারিক বাংলা মাঠ-কৃষি — দুগ্ধ, ছাগল, ফলের গাছ ও কৃষক-উপযোগী টিপস।',
      en: 'Practical Bangla field agri — dairy, goat, tree crops and farmer-facing farm tips.',
      hi: 'व्यवहारिक बांग्ला खेत-कृषि — डेयरी, बकरी, फलदार पेड़ और किसान-उपयोगी सुझाव।',
    },
    tags: ['Goat farming', 'Dairy', 'Jackfruit'],
    subs: '121K',
    videoHref: 'https://www.youtube.com/watch?v=6QYkZ8G-cjc',
    channelHref: 'https://www.youtube.com/@ajagro9733',
    thumb: 'https://i.ytimg.com/vi/6QYkZ8G-cjc/hqdefault.jpg',
    avatar:
      'https://yt3.googleusercontent.com/pufkDbQgsaBq6xnX_QP9aztVx2CjT1ecQHoVpJhOuqpflr-gYki62g2CVxBJwN9lUlYwlwht=s900-c-k-c0x00ffffff-no-rj',
  },
];

export default function Page() {
  const { lang } = useLang();
  const L = (c: Copy) => c[lang];

  return (
    <>
      <section className="media-page-hero" aria-labelledby="digital-creators-title">
        <div className="wrap">
          <Link className="media-back-link" href="/">
            Back to home
          </Link>
          <span className="eyebrow">{L(copy.eyebrow)}</span>
          <h1 id="digital-creators-title">{L(copy.title)}</h1>
          <div className="stitch-accent" aria-hidden />
          <p>{L(copy.lede)}</p>
        </div>
      </section>

      <section className="home-section" aria-labelledby="creator-grid-title">
        <div className="wrap section-heading section-heading-wide">
          <span className="eyebrow">{L(copy.sectionEyebrow)}</span>
          <h2 id="creator-grid-title">{L(copy.sectionTitle)}</h2>
          <div className="stitch-accent" aria-hidden />
        </div>
        <div className="wrap creator-grid">
          {creators.map((creator) => (
            <article key={creator.handle} className="creator-card">
              <a
                className="creator-card-media"
                href={creator.videoHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${creator.name.en} on YouTube`}
              >
                {/* Native img: YouTube thumbs are remote and not in next/image remotePatterns. */}
                <img className="creator-card-thumb" src={creator.thumb} alt={`${creator.name.en} — YouTube`} />
                <img className="creator-card-avatar" src={creator.avatar} alt="" />
              </a>
              <div className="creator-card-body">
                <div className="creator-card-identity">
                  <img className="creator-card-avatar-inline" src={creator.avatar} alt="" />
                  <div className="creator-card-identity-text">
                    <h3>{L(creator.name)}</h3>
                    <p className="creator-handle">{creator.handle}</p>
                  </div>
                </div>
                <p className="creator-blurb">{L(creator.blurb)}</p>
                <div className="creator-tags">
                  {creator.tags.map((tag) => (
                    <span key={tag} className="creator-tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <p className="creator-subs">{creator.subs} subscribers</p>
                <a
                  className="btn-secondary creator-cta"
                  href={creator.channelHref}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {L(copy.watch)}
                </a>
              </div>
            </article>
          ))}
        </div>
        <div className="wrap">
          <p className="creator-disclaimer">{L(copy.disclaimer)}</p>
          <p className="hero-actions">
            <Link className="btn-gold" href="/apply">
              {L(copy.apply)}
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
