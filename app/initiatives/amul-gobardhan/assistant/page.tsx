import type { Metadata } from 'next';
import AssistantClient from './AssistantClient';

export const metadata: Metadata = {
  title: 'Ask the BKS Assistant',
  description:
    'BKS West Bengal Amul and GOBARdhan information assistant. Explains schemes; does not approve applications.',
  robots: { index: false, follow: true },
};

export default function Page() {
  return <AssistantClient />;
}
