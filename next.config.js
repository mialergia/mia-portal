/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mialergia.fcien.edu.uy',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig
