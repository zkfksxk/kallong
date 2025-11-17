import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    serverActions: {
      bodySizeLimit: '30mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'xfcyugqtuicsfdsskonp.supabase.co',
        port: '',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;
