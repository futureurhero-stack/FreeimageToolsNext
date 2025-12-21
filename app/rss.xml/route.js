export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://yourdomain.com';
  const siteName = 'FreeImageTools';
  const siteDescription = 'Free JPG converter & image size reducer in your browser.';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <link>${baseUrl}</link>
    <description>${siteDescription}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml"/>
    <item>
      <title>JPG Converter - Free Image Format Converter</title>
      <link>${baseUrl}</link>
      <description>Convert PNG, WebP and more into JPG files. Free browser-based image converter with no upload required.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}</guid>
    </item>
    <item>
      <title>Image Size Reducer - Compress Images to Target Size</title>
      <link>${baseUrl}/resize</link>
      <description>Compress images to your target size (KB). Optimize image file sizes for web, email, and social media.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/resize</guid>
    </item>
    <item>
      <title>ID Photo Creator - Passport & Visa Photo Generator</title>
      <link>${baseUrl}/idphoto</link>
      <description>Create standard ID photos for passport, visa, and forms. Supports multiple international formats including passport and visa sizes.</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/idphoto</guid>
    </item>
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
}

