import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Digital Agri Creators',
};

export default function Page() {
  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>Bangla digital agri education</p>
        <h1>Bangla YouTube educators for roof gardens, livestock, and field learning.</h1>
        <p>Many Bangla-speaking farmers and home gardeners now learn from YouTube — roof gardening, vegetables, animal husbandry, organic methods, and modern farm techniques.</p>
        <p>BKS West Bengal brings these Bangla digital teachers together so annadatas and learners can find reliable voices more easily.</p>
        <ul><li>Selected Bangla agri channels</li><li>Practical field and homestead education</li><li>Directory for farmers and learners</li></ul>
        
        <p style={{ marginTop: '1.5rem' }}>
          <Link className="text-link" href="/">← Home</Link>
        </p>
      </div>
    </section>
  );
}
