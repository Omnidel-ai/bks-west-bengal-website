import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Media' };

type Story = {
  thumb: string;
  href: string;
  alt: string;
  meta: string;
  title: string;
  body: string;
  language: string;
  cta: string;
  contain?: boolean;
};

const stories: Story[] = [
  {
    thumb: '/assets/media/thumbs/life-of-calcutta-14-july-2026.jpg',
    href: 'https://lifeofcalcutta.in/2026/07/14/mahacharya-sourabh-j-sarkar-appointed-as-state-president-west-bengal-of-bharatiya-krishak-samaj/',
    alt: 'Life of Calcutta online portal thumbnail',
    meta: 'Online portal · Life of Calcutta · 14 July 2026',
    title: 'Mahacharya Sourabh J. Sarkar appointed as State President - West Bengal of Bharatiya Krishak Samaj',
    body: "Life of Calcutta reports on the West Bengal appointment and the organisation's farmer-centred direction.",
    language: 'English',
    cta: 'Read online',
  },
  {
    thumb: '/assets/media/thumbs/dailyhunt-14-july-2026.webp',
    href: 'https://dhunt.in/14XIIK',
    alt: 'Dailyhunt online portal thumbnail',
    meta: 'Online portal · Dailyhunt · 14 July 2026',
    title: 'Mahacharya Sourabh J. Sarkar appointed as State President - West Bengal of Bharatiya Krishak Samaj',
    body: "Dailyhunt coverage of the appointment and the next phase of Bharatiya Krishak Samaj's work in West Bengal.",
    language: 'English',
    cta: 'Read online',
  },
  {
    thumb: '/assets/media/mentions/prabhurashtra-page-2-12-july-2026.jpg',
    href: '/assets/media/mentions/prabhurashtra-page-2-12-july-2026.jpg',
    alt: 'Prabhurashtra press mention thumbnail',
    meta: 'Press mention · Prabhurashtra · 12 July 2026',
    title: 'Mahacharya Sourabh J. Sarkar appointed as State President - West Bengal of Bharatiya Krishak Samaj',
    body: "Prabhurashtra's Hindi print coverage of the appointment, outlining BKS West Bengal's farmer-centred mandate and organisational priorities.",
    language: 'Hindi print',
    cta: 'View full clipping',
    contain: true,
  },
  {
    thumb: '/assets/media/mentions/aarthik-lipi-page-4-11-july-2026.png',
    href: '/assets/media/mentions/aarthik-lipi-page-4-11-july-2026.png',
    alt: 'Aarthik Lipi press mention thumbnail',
    meta: 'Press mention · Aarthik Lipi · 11 July 2026',
    title: 'Mahacharya Sourabh J. Sarkar appointed as State President - West Bengal of Bharatiya Krishak Samaj',
    body: "Aarthik Lipi's Bengali print coverage of Mahacharya Sourabh J. Sarkar's appointment and the priorities of BKS West Bengal.",
    language: 'Bengali print',
    cta: 'View full clipping',
    contain: true,
  },
  {
    thumb: '/assets/media/thumbs/voice-of-kolkata-11-july-2026.jpg',
    href: 'https://voiceofkolkata.com/sourabh-j-sarkar-appointed-as-wb-state-president-of-bharatiya-krishak-samaj/',
    alt: 'Voice of Kolkata online portal thumbnail',
    meta: 'Online portal · Voice of Kolkata · 11 July 2026',
    title: 'Sourabh J. Sarkar appointed as WB State President of Bharatiya Krishak Samaj',
    body: "Online coverage of the West Bengal appointment and the organisation's farmer-focused priorities.",
    language: 'English',
    cta: 'Read online',
  },
  {
    thumb: '/assets/media/thumbs/newsbell-8-july-2026.jpg',
    href: 'https://newsbell.in/en/181144/mahacharya-sourabh-j-sarkar-appointed-as-state-president--west-bengal-of-bharatiya-krishak-samaj',
    alt: 'NewsBell online portal thumbnail',
    meta: 'Online portal · NewsBell · 8 July 2026',
    title: 'Mahacharya Sourabh J. Sarkar appointed as State President - West Bengal of Bharatiya Krishak Samaj',
    body: "Online coverage of the appointment and BKS West Bengal's emerging priorities.",
    language: 'English',
    cta: 'Read online',
  },
  {
    thumb: '/assets/media/mentions/prabhat-khabar-page-5-10-july-2026.jpg',
    href: '/assets/media/mentions/prabhat-khabar-page-5-10-july-2026.jpg',
    alt: 'Prabhat Khabar press mention thumbnail',
    meta: 'Press mention · Prabhat Khabar · 10 July 2026',
    title: 'Prabhat Khabar carries the BKS West Bengal appointment coverage',
    body: 'Page 5 press coverage from Prabhat Khabar highlighting the BKS West Bengal appointment announcement.',
    language: 'Print / e-paper',
    cta: 'View clipping',
  },
  {
    thumb: '/assets/media/thumbs/dv-epaper-10-july-2026.jpg',
    href: '/assets/media/mentions/dv-epaper-10-july-2026.pdf',
    alt: 'DV e-paper press mention thumbnail',
    meta: 'Press mention · DV e-paper · 10 July 2026',
    title: 'DV e-paper coverage',
    body: 'E-paper clipping covering the appointment announcement.',
    language: 'Print / e-paper',
    cta: 'Open PDF',
  },
  {
    thumb: '/assets/media/thumbs/kolkata-page-3-10-july-2026.jpg',
    href: '/assets/media/mentions/kolkata-page-3-10-july-2026.pdf',
    alt: 'Kolkata edition press mention thumbnail',
    meta: 'Press mention · Kolkata edition · 10 July 2026',
    title: 'Kolkata page 3 coverage',
    body: 'Kolkata e-paper page carrying the BKS West Bengal mention.',
    language: 'Print / e-paper',
    cta: 'Open PDF',
  },
  {
    thumb: '/assets/media/thumbs/page-11-kolkata-10-july-2026.jpg',
    href: '/assets/media/mentions/page-11-kolkata-10-july-2026.pdf',
    alt: 'Kolkata edition press mention thumbnail',
    meta: 'Press mention · Kolkata edition · 10 July 2026',
    title: 'Page 11 Kolkata coverage',
    body: 'Kolkata page 11 clipping for the media archive.',
    language: 'Print / e-paper',
    cta: 'Open PDF',
  },
];

const releases = [
  {
    thumb: '/assets/media/thumbs/press-release-english-letterhead.jpg',
    href: '/assets/media/bks-wb-press-release-english-letterhead.pdf',
    language: 'English',
    body: 'Official letterhead version for media reference and circulation.',
  },
  {
    thumb: '/assets/media/thumbs/press-release-bengali.jpg',
    href: '/assets/media/bks-wb-press-release-bengali.pdf',
    language: 'Bengali',
    body: 'Bengali version for regional media, partners and public circulation.',
  },
  {
    thumb: '/assets/media/thumbs/press-release-hindi.jpg',
    href: '/assets/media/bks-wb-press-release-hindi.pdf',
    language: 'Hindi',
    body: 'Hindi version for national media, partners and public circulation.',
  },
];

function StoryCard({ story, sizes }: { story: Story; sizes: string }) {
  return (
    <article className="media-story-card">
      <a
        className={`media-story-thumb${story.contain ? ' media-image-contain' : ''}`}
        href={story.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image src={story.thumb} alt={story.alt} fill sizes={sizes} />
      </a>
      <div className="media-story-body">
        <p className="media-meta">{story.meta}</p>
        <h3>{story.title}</h3>
        <p>{story.body}</p>
        <p className="media-language">{story.language}</p>
        <a className="btn-secondary media-download" href={story.href} target="_blank" rel="noopener noreferrer">
          {story.cta}
        </a>
      </div>
    </article>
  );
}

export default function Page() {
  return (
    <>
      <section className="media-page-hero" aria-labelledby="media-page-title">
        <div className="wrap">
          <Link className="media-back-link" href="/">
            Back to home
          </Link>
          <span className="eyebrow">Media</span>
          <h1 id="media-page-title">BKS West Bengal media room</h1>
          <div className="stitch-accent" aria-hidden />
          <p>
            Stories, e-paper coverage, press releases and official reference material from BKS West Bengal. Built for
            farmers, partners, journalists and public readers.
          </p>
        </div>
      </section>

      <section className="media-feature-section" aria-labelledby="featured-media-title">
        <div className="wrap">
          <article className="media-feature-card">
            <a
              className="media-feature-image media-image-contain"
              href="/assets/media/mentions/ganamadhyam-page-3-15-july-2026.png"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/assets/media/mentions/ganamadhyam-page-3-15-july-2026.png"
                alt="Ganamadhyam coverage thumbnail"
                fill
                sizes="(max-width: 900px) 100vw, 520px"
                priority
              />
            </a>
            <div className="media-feature-copy">
              <p className="media-meta">Press mention · Ganamadhyam · 15 July 2026</p>
              <h2 id="featured-media-title">
                Mahacharya Sourabh J. Sarkar appointed as State President - West Bengal of Bharatiya Krishak Samaj
              </h2>
              <p>
                Ganamadhyam&apos;s Bengali print coverage of the appointment and BKS West Bengal&apos;s priorities for
                farmer income, training, technology and rural institutions.
              </p>
              <a
                className="btn-gold media-cta"
                href="/assets/media/mentions/ganamadhyam-page-3-15-july-2026.png"
                target="_blank"
                rel="noopener noreferrer"
              >
                View full clipping
              </a>
            </div>
          </article>
        </div>
      </section>

      <div className="wrap">
        <div className="section-seam" aria-hidden />
      </div>

      <section className="home-section" aria-labelledby="press-mentions-page-title">
        <div className="wrap section-heading section-heading-wide">
          <span className="eyebrow">In the press</span>
          <h2 id="press-mentions-page-title">Coverage people can see, share and remember.</h2>
          <div className="stitch-accent" aria-hidden />
        </div>
        <div className="wrap media-card-grid">
          {stories.map((story) => (
            <StoryCard key={story.href + story.title} story={story} sizes="(max-width: 760px) 100vw, 360px" />
          ))}
        </div>
      </section>

      <div className="wrap">
        <div className="section-seam" aria-hidden />
      </div>

      <section className="home-section" aria-labelledby="press-releases-page-title">
        <div className="wrap section-heading section-heading-wide">
          <span className="eyebrow">Press releases</span>
          <h2 id="press-releases-page-title">Official releases for circulation.</h2>
          <div className="stitch-accent" aria-hidden />
        </div>
        <div className="wrap media-card-grid media-card-grid-compact">
          {releases.map((item) => (
            <article key={item.href} className="media-story-card">
              <a className="media-story-thumb" href={item.href} target="_blank" rel="noopener noreferrer">
                <Image
                  src={item.thumb}
                  alt="Bharatiya Krishak Samaj, West Bengal press release thumbnail"
                  fill
                  sizes="(max-width: 760px) 100vw, 320px"
                />
              </a>
              <div className="media-story-body">
                <p className="media-meta">Press release · Bharatiya Krishak Samaj, West Bengal · July 2026</p>
                <h3>BKS West Bengal press release</h3>
                <p>{item.body}</p>
                <p className="media-language">{item.language}</p>
                <a className="btn-secondary media-download" href={item.href} target="_blank" rel="noopener noreferrer">
                  Open PDF
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
