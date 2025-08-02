import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  devIndicators: false,
  images: {
    domains: ['https://ejwmhfclgmreuyeluitn.supabase.co'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ejwmhfclgmreuyeluitn.supabase.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
