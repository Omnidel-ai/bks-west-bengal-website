import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'About BKS',
};

export default function Page() {
  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>About BKS</p>
        <h1>A national farmer organisation that carries the annadata’s voice.</h1>
        <p>Bharatiya Krishak Samaj (BKS) is a national farmer organisation headquartered in New Delhi, working for farmer rights, agricultural income growth, and fair agri-policy.</p>
        <p>For decades BKS has stood with Indian farmers on the questions that decide a farm family’s future: fair prices, good seed, healthy soil, and self-reliance.</p>
        <p>Under National President Shri Krishan Bir Chaudhary, BKS has been a consistent voice for legal guarantee of Minimum Support Price and constitutional status for the agricultural price commission.</p>
        <ul><li>Farmer dignity</li><li>Swadeshi strength</li><li>Natural farming</li><li>Practical knowledge</li></ul>
        
        <p style={{ marginTop: '1.5rem' }}>
          <Link className="text-link" href="/">← Home</Link>
        </p>
      </div>
    </section>
  );
}
