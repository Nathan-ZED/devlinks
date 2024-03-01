/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '',
            pathname: '*',
          },
          {
            protocol: 'http',
            hostname: 'localhost',
            port: '8000',
            pathname: '*',
          }
        ],
      },
}

module.exports = nextConfig
