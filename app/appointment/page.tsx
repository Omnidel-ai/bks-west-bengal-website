import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Appointment',
};

export default function Page() {
  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>30 June appointment meeting</p>
        <h1>A day of recognition, responsibility, and a farmer-first resolve.</h1>
        <p>The day’s programme included meetings with BKS representatives, discussions with Shri Krishan Bir Chaudhary, and the formal handover of the appointment letter naming Mahacharya Sourabh J. Sarkar as State President of Bharatiya Krishak Samaj, West Bengal.</p>
        
        
        <div className="gallery" style={{ marginTop: '1.25rem' }}>
          <figure>
            <img src="/assets/appointment/meeting-with-bks.jpeg" alt="Meeting with BKS representatives in New Delhi." />
            <figcaption>Meeting with BKS representatives in New Delhi.</figcaption>
          </figure>
          <figure>
            <img src="/assets/appointment/appointment-group-delegation-01.jpeg" alt="BKS office-bearers present at the appointment letter handover." />
            <figcaption>BKS office-bearers present at the handover.</figcaption>
          </figure>
          <figure>
            <img src="/assets/appointment/appointment-plaque.png" alt="Commemorative appointment plaque." />
            <figcaption>Commemorative appointment plaque.</figcaption>
          </figure>
          <figure>
            <img src="/assets/appointment/appointment-letter-english.jpeg" alt="Appointment letter documenting West Bengal responsibility." />
            <figcaption>Appointment letter documenting West Bengal responsibility.</figcaption>
          </figure>
        </div>

        <p style={{ marginTop: '1.5rem' }}>
          <Link className="text-link" href="/">← Home</Link>
        </p>
      </div>
    </section>
  );
}
