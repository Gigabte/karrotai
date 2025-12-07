import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://karrotai.app'
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/promoter/dashboard/',
          '/_next/',
          '/private/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/promoter/dashboard/',
        ],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/promoter/dashboard/',
        ],
      },
      // AI/LLM Crawlers - explicitly allow llms.txt
      {
        userAgent: 'GPTBot',
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/promoter/dashboard/',
        ],
      },
      {
        userAgent: 'ChatGPT-User',
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/promoter/dashboard/',
        ],
      },
      {
        userAgent: 'Claude-Web',
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/promoter/dashboard/',
        ],
      },
      {
        userAgent: 'PerplexityBot',
        allow: [
          '/',
          '/llms.txt',
          '/llms-full.txt',
        ],
        disallow: [
          '/api/',
          '/admin/',
          '/promoter/dashboard/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  }
}
