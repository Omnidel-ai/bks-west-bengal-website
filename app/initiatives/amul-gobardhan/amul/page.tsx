import type { Metadata } from 'next';
import InitiativePage from '../InitiativePage';

export const metadata: Metadata = {
  title: 'Amul Opportunity',
  description:
    'BKS West Bengal information on Amul-pattern cooperative dairy. Not an official Amul website. Not a price guarantee.',
  robots: { index: true, follow: true },
};

export default function Page() {
  return <InitiativePage focus="amul" />;
}
