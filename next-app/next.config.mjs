/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'kriyabackend.psgtech.ac.in',
      },
    ],
  },
};

// Allow self-signed certs for image optimization
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default nextConfig;
