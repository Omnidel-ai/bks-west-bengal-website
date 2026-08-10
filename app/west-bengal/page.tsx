import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'West Bengal Unit',
};

export default function Page() {
  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>West Bengal</p>
        <h1>Listen carefully, organise patiently, and support resilient agriculture.</h1>
        <p>The West Bengal chapter of BKS was formed in June 2026, when Mahacharya Sourabh J. Sarkar was appointed State President by National President Shri Krishan Bir Chaudhary in New Delhi on 30 June 2026.</p>
        <p>West Bengal is one of India’s most agrarian states, home to millions of small and marginal farmers, sharecroppers, farm workers, and rural entrepreneurs.</p>
        <p>BKS West Bengal will organise a ceremonial programme in Kolkata, form state, divisional and district units, and invite farmer leaders from other states under the National President’s guidance.</p>
        <ul><li>District training and field seminars</li><li>Natural and chemical-conscious farming</li><li>Organic and indigenous inputs</li><li>Value addition and farmer entrepreneurship</li><li>Policy feedback from the field</li><li>Youth and women inclusion</li><li>AI for Annadata in local languages</li></ul>
        
        <p style={{ marginTop: '1.5rem' }}>
          <Link className="text-link" href="/">← Home</Link>
        </p>
      </div>
    </section>
  );
}
