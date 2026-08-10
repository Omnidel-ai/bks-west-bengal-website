import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Media',
};

export default function Page() {
  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>Media</p>
        <h1>BKS West Bengal media room</h1>
        <p>Stories, e-paper coverage, press releases and official reference material from BKS West Bengal — for farmers, partners, journalists and public readers.</p>
        
        
        <div className="tile-grid" style={{ marginTop: '1.25rem' }}>
          <a className="tile" href="/assets/media/bks-wb-press-release-english-letterhead.pdf" target="_blank" rel="noopener noreferrer">
            <h3>Press release (English)</h3>
            <p>Official letterhead PDF.</p>
          </a>
          <a className="tile" href="/assets/media/bks-wb-press-release-bengali.pdf" target="_blank" rel="noopener noreferrer">
            <h3>Press release (Bengali)</h3>
            <p>Official Bengali PDF.</p>
          </a>
          <a className="tile" href="/assets/media/bks-wb-press-release-hindi.pdf" target="_blank" rel="noopener noreferrer">
            <h3>Press release (Hindi)</h3>
            <p>Official Hindi PDF.</p>
          </a>
        </div>

        <p style={{ marginTop: '1.5rem' }}>
          <Link className="text-link" href="/">← Home</Link>
        </p>
      </div>
    </section>
  );
}
