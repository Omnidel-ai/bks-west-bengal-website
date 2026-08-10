import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Leadership',
};

export default function Page() {
  return (
    <section className="band">
      <div className="wrap prose">
        <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>People</p>
        <h1>Leaders who have walked the fields, sat with farmers, and carried their voice forward.</h1>
        <p>National President Shri Krishan Bir Chaudhary has been associated with Indian agriculture and the farmer movement for decades, and is regarded as one of the leading voices in agri-policy.</p>
        <p>Mahacharya Sourabh J. Sarkar, appointed State President on 30 June 2026 in New Delhi, leads the building of BKS presence across West Bengal from state to district units.</p>
        <p>Advisors include Jayanta Chakravarty (agriculture & rural development) and Prasenjit Mitra (media & communications).</p>
        
        
        <div className="profile" style={{ marginTop: '1.25rem' }}>
          <img src="/assets/dr-krishan-bir-chaudhary.jpg" alt="Shri Krishan Bir Chaudhary" />
          <div>
            <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>National President</p>
            <h2>Shri Krishan Bir Chaudhary</h2>
            <p>National President, Bharatiya Krishak Samaj — carrying the farmer’s voice into government, national platforms and media.</p>
          </div>
        </div>
        <div className="profile">
          <img src="/assets/mahacharya-sourabh-j-sarkar.jpg" alt="Mahacharya Sourabh J. Sarkar" />
          <div>
            <p className="kicker" style={{ color: 'var(--paddy-gold)' }}>West Bengal State President</p>
            <h2>Mahacharya Sourabh J. Sarkar</h2>
            <p>Founder, KarmYog for the 21st Century. Appointed State President on 30 June 2026 to build BKS across West Bengal.</p>
          </div>
        </div>
        <div className="profile">
          <img src="/assets/jayanta-chakraborty.png" alt="Jayanta Chakravarty" />
          <div>
            <h3>Jayanta Chakravarty</h3>
            <p>Chairperson, Agriculture & Rural Development Committee, The Bengal Chamber. Strengthens BKS West Bengal’s links to FPOs, markets, responsible agri-inputs, drones and rural enterprise models.</p>
          </div>
        </div>

        <p style={{ marginTop: '1.5rem' }}>
          <Link className="text-link" href="/">← Home</Link>
        </p>
      </div>
    </section>
  );
}
