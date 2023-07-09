/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatar.maplestory.nexon.com', 'ssl.nexon.com'],
  },
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
