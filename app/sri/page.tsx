import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'SRI Case Study',
};

export default function Page() {
  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>KarmYog field study</p>
        <h1>SRI education in Odisha: technology and media built around the farmer.</h1>
        <p>With support from Tata Trusts and NGO partners, KarmYog built a farmer-education approach around the System of Rice Intensification (SRI) in Odisha.</p>
        <p>The work begins by listening to farmers in villages, then connects field facilitators, farmers and specialists through tablet-based learning, rapid problem-solving, and media created for local realities.</p>
        <ul><li>Village listening before reusable learning design</li><li>Tablet-based field education</li><li>Local media for practical adoption</li></ul>
        
        <p style={{ marginTop: '1.5rem' }}>
          <Link className="text-link" href="/">← Home</Link>
        </p>
      </div>
    </section>
  );
}
