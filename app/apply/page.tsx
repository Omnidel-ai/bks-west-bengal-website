import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'District leadership enrollment',
};

export default function Page() {
  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>Building the organisation</p>
        <h1>District leadership enrollment</h1>
        <p>As State President of BKS West Bengal, Mahacharya Ji’s next responsibility is to identify, assess, and appoint district leadership across the state.</p>
        <p>This page is the formal intake for those who want to serve farmers in their own district.</p>
        <p>Staging note: form submission backends are not wired in this reconstruction until confirmed. The public UX and district/role enums are preserved for parity.</p>
        <ul><li>District President</li><li>District Working President</li><li>District General Secretary</li><li>Block / Regional Coordinator</li><li>Women Farmer Wing Lead</li><li>Youth Farmer Wing Lead</li></ul>
        
        <p style={{ marginTop: '1.5rem' }}>
          <Link className="text-link" href="/">← Home</Link>
        </p>
      </div>
    </section>
  );
}
