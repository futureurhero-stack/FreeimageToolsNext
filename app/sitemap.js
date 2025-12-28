export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeimage-tools-next.vercel.app';
  const lastmod = new Date().toISOString();
  
  return [
    {
      url: baseUrl,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/resize`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/idphoto`,
      lastModified: lastmod,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];
}

