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
  // /articles/ から /columns/ へのリダイレクト（SEO対策）
  async redirects() {
    return [
      {
        source: '/articles',
        destination: '/?scrollTo=columns',
        permanent: true, // 301リダイレクト
      },
      {
        source: '/articles/:slug',
        destination: '/columns/:slug',
        permanent: true, // 301リダイレクト
      },
    ]
  },
}

module.exports = nextConfig

