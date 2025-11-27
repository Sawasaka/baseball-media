import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://chukou-yakyu-media.pages.dev/sitemap.xml', // 仮ドメイン
  }
}

