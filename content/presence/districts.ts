export type DistrictStatus = 'active' | 'indicated' | 'upcoming';

export type I18nText = { bn: string; en: string; hi: string };

export type District = {
  id: string;
  slug: string;
  officialName: string;
  name: I18nText;
  status: DistrictStatus;
  summary?: I18nText;
};

export type Member = {
  id: string;
  slug: string;
  districtId: string;
  name: string;
  photo?: string;
  publicBackground?: I18nText;
};

export const districts: District[] = [
  { id: 'alipurduar', slug: 'alipurduar', officialName: 'Alipurduar', name: { bn: 'আলিপুরদুয়ার', en: 'Alipurduar', hi: 'अलीपुरदुआर' }, status: 'upcoming' },
  { id: 'bankura', slug: 'bankura', officialName: 'Bankura', name: { bn: 'বাঁকুড়া', en: 'Bankura', hi: 'बाँकुड़ा' }, status: 'upcoming' },
  { id: 'birbhum', slug: 'birbhum', officialName: 'Birbhum', name: { bn: 'বীরভূম', en: 'Birbhum', hi: 'बीरभूम' }, status: 'upcoming' },
  { id: 'cooch-behar', slug: 'cooch-behar', officialName: 'Cooch Behar', name: { bn: 'কোচবিহার', en: 'Cooch Behar', hi: 'कोचबिहार' }, status: 'upcoming' },
  { id: 'dakshin-dinajpur', slug: 'dakshin-dinajpur', officialName: 'Dakshin Dinajpur', name: { bn: 'দক্ষিণ দিনাজপুর', en: 'Dakshin Dinajpur', hi: 'दक्षिण दिनाजपुर' }, status: 'upcoming' },
  { id: 'darjeeling', slug: 'darjeeling', officialName: 'Darjeeling', name: { bn: 'দার্জিলিং', en: 'Darjeeling', hi: 'दार्जिलिंग' }, status: 'upcoming' },
  { id: 'hooghly', slug: 'hooghly', officialName: 'Hooghly', name: { bn: 'হুগলি', en: 'Hooghly', hi: 'हुगली' }, status: 'upcoming' },
  { id: 'howrah', slug: 'howrah', officialName: 'Howrah', name: { bn: 'হাওড়া', en: 'Howrah', hi: 'हावड़ा' }, status: 'upcoming' },
  { id: 'jalpaiguri', slug: 'jalpaiguri', officialName: 'Jalpaiguri', name: { bn: 'জলপাইगुড়ি', en: 'Jalpaiguri', hi: 'जलपाईगुड़ी' }, status: 'upcoming' },
  { id: 'jhargram', slug: 'jhargram', officialName: 'Jhargram', name: { bn: 'ঝাড়গ্রাম', en: 'Jhargram', hi: 'झाड़ग्राम' }, status: 'upcoming' },
  { id: 'kalimpong', slug: 'kalimpong', officialName: 'Kalimpong', name: { bn: 'কালিম্পং', en: 'Kalimpong', hi: 'कालिम्पोंग' }, status: 'upcoming' },
  { id: 'kolkata', slug: 'kolkata', officialName: 'Kolkata', name: { bn: 'কলকাতা', en: 'Kolkata', hi: 'कोलकाता' }, status: 'upcoming' },
  { id: 'malda', slug: 'malda', officialName: 'Malda', name: { bn: 'মালদা', en: 'Malda', hi: 'मालदा' }, status: 'upcoming' },
  { id: 'murshidabad', slug: 'murshidabad', officialName: 'Murshidabad', name: { bn: 'মুর্শিদাবাদ', en: 'Murshidabad', hi: 'मुर्शिदाबाद' }, status: 'upcoming' },
  { id: 'nadia', slug: 'nadia', officialName: 'Nadia', name: { bn: 'নদিয়া', en: 'Nadia', hi: 'नदिया' }, status: 'upcoming' },
  {
    id: 'north-24-parganas',
    slug: 'north-24-parganas',
    officialName: 'North 24 Parganas',
    name: { bn: 'উত্তর ২৪ পরগনা', en: 'North 24 Parganas', hi: 'उत्तर 24 परगना' },
    status: 'indicated',
    summary: {
      bn: 'উপস্থিতি চিহ্নিত — দলের তথ্য শীঘ্রই আসছে।',
      en: 'Presence identified — team information coming soon.',
      hi: 'उपस्थिति चिह्नित — टीम जानकारी शीघ्र आ रही है।',
    },
  },
  { id: 'paschim-bardhaman', slug: 'paschim-bardhaman', officialName: 'Paschim Bardhaman', name: { bn: 'পশ্চিম বর্ধমান', en: 'Paschim Bardhaman', hi: 'पश्चिम बर्धमान' }, status: 'upcoming' },
  {
    id: 'paschim-medinipur',
    slug: 'paschim-medinipur',
    officialName: 'Paschim Medinipur',
    name: { bn: 'পশ্চিম মেদিনীপুর', en: 'Paschim Medinipur', hi: 'पश्चिम मेदिनीपुर' },
    status: 'active',
    summary: {
      bn: 'সক্রিয় জেলা উপস্থিতি — যাচাইকৃত সদস্যদের সঙ্গে।',
      en: 'Active district presence with verified members.',
      hi: 'सत्यापित सदस्यों के साथ सक्रिय ज़िला उपस्थिति।',
    },
  },
  { id: 'purba-bardhaman', slug: 'purba-bardhaman', officialName: 'Purba Bardhaman', name: { bn: 'পূর্ব বর্ধমান', en: 'Purba Bardhaman', hi: 'पूर्व बर्धमान' }, status: 'upcoming' },
  { id: 'purba-medinipur', slug: 'purba-medinipur', officialName: 'Purba Medinipur', name: { bn: 'পূর্ব মেদিনীপুর', en: 'Purba Medinipur', hi: 'पूर्व मेदिनीपुर' }, status: 'upcoming' },
  { id: 'purulia', slug: 'purulia', officialName: 'Purulia', name: { bn: 'পুরুলিয়া', en: 'Purulia', hi: 'पुरुलिया' }, status: 'upcoming' },
  { id: 'south-24-parganas', slug: 'south-24-parganas', officialName: 'South 24 Parganas', name: { bn: 'দক্ষিণ ২৪ পরগনা', en: 'South 24 Parganas', hi: 'दक्षिण 24 परगना' }, status: 'upcoming' },
  { id: 'uttar-dinajpur', slug: 'uttar-dinajpur', officialName: 'Uttar Dinajpur', name: { bn: 'উত্তর দিনাজপুর', en: 'Uttar Dinajpur', hi: 'उत्तर दिनाजपुर' }, status: 'upcoming' },
];

export const members: Member[] = [
  {
    id: 'buddhadeb-patra',
    slug: 'buddhadeb-patra',
    districtId: 'paschim-medinipur',
    name: 'Buddhadeb Patra',
    photo: '/assets/presence/buddhadeb-patra.jpg',
    publicBackground: {
      bn: 'পশ্চিম মেদিনীপুরের BKS উপস্থিতির সঙ্গে যুক্ত।',
      en: 'Associated with BKS presence in Paschim Medinipur.',
      hi: 'पश्चिम मेदिनीपुर में BKS उपस्थिति से जुड़े।',
    },
  },
  {
    id: 'rajib-lochan-dey',
    slug: 'rajib-lochan-dey',
    districtId: 'paschim-medinipur',
    name: 'Rajib Lochan Dey',
    photo: '/assets/presence/rajib-lochan-dey.jpg',
    publicBackground: {
      bn: 'পশ্চিম মেদিনীপুরের BKS উপস্থিতির সঙ্গে যুক্ত।',
      en: 'Associated with BKS presence in Paschim Medinipur.',
      hi: 'पश्चिम मेदिनीपुर में BKS उपस्थिति से जुड़े।',
    },
  },
  {
    id: 'apurba-bera',
    slug: 'apurba-bera',
    districtId: 'paschim-medinipur',
    name: 'Apurba Bera',
    photo: '/assets/presence/apurba-bera.jpg',
    publicBackground: {
      bn: 'পশ্চিম মেদিনীপুরের BKS উপস্থিতির সঙ্গে যুক্ত।',
      en: 'Associated with BKS presence in Paschim Medinipur.',
      hi: 'पश्चिम मेदिनीपुर में BKS उपस्थिति से जुड़े।',
    },
  },
];

export function getDistrict(slug: string) {
  return districts.find((d) => d.slug === slug);
}

export function getMembersForDistrict(districtId: string) {
  return members.filter((m) => m.districtId === districtId);
}
