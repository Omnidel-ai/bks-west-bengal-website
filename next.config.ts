import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lhnorkjfldywnrqqunqn.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
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
