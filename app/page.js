import Source from "../components/variations/source";
import Script from "next/script";

export const metadata = {
  title: "JPG Converter - Convert PNG to JPG Free Online",
  description: "Free online JPG converter. Convert PNG, WebP, and other image formats to JPG files instantly in your browser. No uploads, 100% private and secure.",
  keywords: ["JPG converter", "PNG to JPG", "image converter", "convert PNG to JPG", "WebP to JPG", "online JPG converter", "free image converter"],
  openGraph: {
    title: "JPG Converter - Convert PNG to JPG Free Online",
    description: "Free online JPG converter. Convert PNG, WebP, and other image formats to JPG files instantly in your browser.",
    type: "website",
  },
};

export default function JpgConverterPage() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeimage-tools-next.vercel.app';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FreeImageTools JPG Converter",
    "description": "Free online JPG converter. Convert PNG, WebP, and other image formats to JPG files instantly in your browser. No uploads, 100% private and secure.",
    "url": baseUrl,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Convert PNG to JPG",
      "Convert WebP to JPG",
      "Adjustable JPG quality",
      "100% browser-based processing",
      "No server uploads",
      "Privacy-focused"
    ],
    "screenshot": `${baseUrl}/og-image.jpg`
  };

  return (
    <>
      <Script
        id="json-ld-jpg-converter"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Source />
    </>
  );
}
