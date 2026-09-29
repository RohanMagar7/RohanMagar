import type { NextConfig } from 'next';
const nextConfig: NextConfig = {
  poweredByHeader: false,
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
};
export default nextConfig;
