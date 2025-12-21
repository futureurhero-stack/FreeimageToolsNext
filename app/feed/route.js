function escapeXml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeimage-tools-next.vercel.app';
  const siteName = 'FreeImageTools';
  const siteDescription = 'Free JPG converter & image size reducer in your browser.';

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteName)}</title>
    <link>${baseUrl}</link>
    <description>${escapeXml(siteDescription)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed" rel="self" type="application/rss+xml"/>
    <item>
      <title>${escapeXml('JPG Converter - Free Image Format Converter')}</title>
      <link>${baseUrl}</link>
      <description>${escapeXml('Convert PNG, WebP and more into JPG files. Free browser-based image converter with no upload required.')}</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}</guid>
    </item>
    <item>
      <title>${escapeXml('Image Size Reducer - Compress Images to Target Size')}</title>
      <link>${baseUrl}/resize</link>
      <description>${escapeXml('Compress images to your target size (KB). Optimize image file sizes for web, email, and social media.')}</description>
      <pubDate>${new Date().toUTCString()}</pubDate>
      <guid>${baseUrl}/resize</guid>
    </item>
    <item>
      <title>${escapeXml('ID Photo Creator - Passport & Visa Photo Generator')}</title>
      <link>${baseUrl}/idphoto</link>
      <description>${escapeXml('Create standard ID photos for passport, visa, and forms. Supports multiple international formats including passport and visa sizes.')}</description>
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

