import type { Metadata } from 'next';
import InitiativePage from '../InitiativePage';

export const metadata: Metadata = {
  title: 'GOBARdhan Initiative',
  description:
    'BKS West Bengal information on the Government of India GOBARdhan biogas/CBG/manure programme. Not a subsidy approval desk.',
  robots: { index: true, follow: true },
};

export default function Page() {
  return <InitiativePage focus="gobardhan" />;
}
