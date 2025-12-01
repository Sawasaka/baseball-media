/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // microCMS の画像ドメインを許可
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.microcms-assets.io',
      },
    ],
    // Cloudflare Pages では next/image の最適化は使えないため unoptimized にする
    unoptimized: true,
  },
}

module.exports = nextConfig

