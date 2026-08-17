import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Appointment' };

const photos = [
  {
    src: '/assets/appointment/meeting-with-bks.jpeg',
    alt: 'Meeting with Bharatiya Krishak Samaj representatives in New Delhi',
    caption: 'Meeting with BKS representatives in New Delhi.',
    className: 'photo-frame tilt-l span-2',
  },
  {
    src: '/assets/appointment/appointment-group-delegation-01.jpeg',
    alt: 'Delegation present during the appointment letter handover',
    caption: 'BKS office bearers present during the appointment letter handover.',
    className: 'photo-frame tilt-r',
  },
  {
    src: '/assets/appointment/appointment-plaque.png',
    alt: 'Commemorative appointment plaque naming Sourabh J. Sarkar State President - West Bengal of Bharatiya Krishak Samaj',
    caption:
      'The commemorative appointment plaque appointing Shri Sourabh J. Sarkar as State President - West Bengal of Bharatiya Krishak Samaj.',
    className: 'photo-frame tilt-l',
  },
  {
    src: '/assets/appointment/appointment-letter-english.jpeg',
    alt: 'English appointment letter for the BKS West Bengal state president',
    caption: 'The appointment letter recording the West Bengal mandate.',
    className: 'photo-frame tilt-r appointment-letter-frame',
  },
  {
    src: '/assets/appointment/appointment-chaudhary-sourabh-reena-02.jpeg',
    alt: 'Shri Krishan Bir Choudhary with Mahacharya Sourabh J. Sarkar and Smt. Reena J. Sarkar',
    caption: 'Shri Krishan Bir Choudhary with Mahacharya Ji and Smt. Reena Ji after the appointment.',
    className: 'photo-frame tilt-l',
  },
  {
    src: '/assets/appointment/hero-plant-presentation-social-v3.jpeg',
    alt: 'Mahacharya Sourabh J. Sarkar presenting a plant to Shri Krishan Bir Choudhary with BKS representatives',
    caption: 'A plant-presentation moment with BKS representatives in New Delhi.',
    className: 'photo-frame tilt-r',
  },
];

export default function Page() {
  return (
    <>
      <section className="section-page-hero">
        <div className="wrap">
          <Link className="media-back-link" href="/">
            Back to home
          </Link>
          <span className="eyebrow">The June 30 appointment meeting</span>
          <h1>A day of recognition, responsibility and farmer-first resolve.</h1>
          <div className="stitch-accent" aria-hidden />
          <p>
            The day&apos;s programme included a meeting with BKS representatives, interaction with Shri Krishan Bir
            Choudhary, and the formal handing over of the appointment letter naming Mahacharya Sourabh J. Sarkar as
            State President - West Bengal of Bharatiya Krishak Samaj.
          </p>
        </div>
      </section>
      <section className="home-section">
        <div className="wrap story-photos">
          {photos.map((photo) => (
            <figure key={photo.src} className={photo.className} style={{ margin: 0 }}>
              <div className="photo-frame-media">
                <Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 900px) 100vw, 420px" />
              </div>
              <figcaption className="photo-frame-caption">{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
        <div className="wrap note-row">
          <article className="note-block">
            <h3>Message of congratulations</h3>
            <p>
              A BKS representative congratulated Mahacharya Ji and Smt. Reena Ji, noting that under his leadership the
              organisation in West Bengal will become stronger and work toward increasing farmers&apos; income.
            </p>
          </article>
          <article className="note-block">
            <h3>Next organisational step</h3>
            <p>
              The note also records the plan to organise a ceremony in Kolkata, form state, divisional and
              district-level BKS units, and invite leaders from other states under the guidance of National President
              Shri Krishan Bir Choudhary.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}
