import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'AI for Annadata',
};

export default function Page() {
  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>AI for Annadata</p>
        <h1>Using artificial intelligence as a practical companion for farmers.</h1>
        <p>BKS West Bengal will treat AI not as distant technology, but as a local-language support system for farmers: timely knowledge, better decisions, documenting field realities, and stronger links to markets, institutions, and training networks.</p>
        <ul><li>Local-language advisory in Bangla, Hindi and plain English</li><li>Training at scale beyond one-off seminars</li><li>Market intelligence and structured farmer feedback</li></ul>
        
        <p style={{ marginTop: '1.5rem' }}>
          <Link className="text-link" href="/">← Home</Link>
        </p>
      </div>
    </section>
  );
}
