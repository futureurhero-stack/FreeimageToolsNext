import Script from "next/script";

export const metadata = {
  title: "Image Resizer - Resize & Compress Images Free Online",
  description: "Free online image resizer and compressor. Resize images to target file size (50KB-1000KB) instantly in your browser. No uploads, 100% private.",
  keywords: ["image resizer", "image compressor", "resize images", "compress images", "image size reducer", "online image resizer", "free image compressor"],
  openGraph: {
    title: "Image Resizer - Resize & Compress Images Free Online",
    description: "Free online image resizer and compressor. Resize images to target file size instantly in your browser.",
    type: "website",
  },
};

export default function ResizeLayout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeimage-tools-next.vercel.app';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FreeImageTools Image Resizer",
    "description": "Free online image resizer and compressor. Resize images to target file size (50KB-1000KB) instantly in your browser.",
    "url": `${baseUrl}/resize`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Resize images to target file size",
      "Compress images (50KB-1000KB)",
      "100% browser-based processing",
      "No server uploads",
      "Privacy-focused"
    ]
  };

  return (
    <>
      <Script
        id="json-ld-image-resizer"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

