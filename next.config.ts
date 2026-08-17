import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
  },
  async headers() {
    return [
      {
        source: '/durga-puja-2026/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ];
  },
  async rewrites() {
    return [
      { source: '/durga-puja-2026', destination: '/durga-puja-2026/index.html' },
      { source: '/durga-puja-2026/', destination: '/durga-puja-2026/index.html' },
    ];
  },
};

export default nextConfig;
