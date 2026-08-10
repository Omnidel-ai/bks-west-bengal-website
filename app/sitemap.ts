import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.bkswbengal.org';
  const routes = [
    '',
    '/about',
    '/west-bengal',
    '/leadership',
    '/appointment',
    '/media',
    '/ai',
    '/sri',
    '/digital-creators',
    '/apply',
    '/presence',
    '/presence/west-bengal/paschim-medinipur',
  ];
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
  }));
}
