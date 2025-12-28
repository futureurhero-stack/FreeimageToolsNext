import Script from "next/script";

export const metadata = {
  title: "ID Photo Maker - Create Passport Photos Free Online",
  description: "Free online ID photo maker. Create passport photos, visa photos, and standard ID photos with custom sizes. 100% browser-based, no uploads.",
  keywords: ["ID photo maker", "passport photo", "visa photo", "ID photo creator", "passport photo maker", "online ID photo", "free passport photo"],
  openGraph: {
    title: "ID Photo Maker - Create Passport Photos Free Online",
    description: "Free online ID photo maker. Create passport photos, visa photos, and standard ID photos with custom sizes.",
    type: "website",
  },
};

export default function IdPhotoLayout({ children }) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeimage-tools-next.vercel.app';
  
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "FreeImageTools ID Photo Maker",
    "description": "Free online ID photo maker. Create passport photos, visa photos, and standard ID photos with custom sizes.",
    "url": `${baseUrl}/idphoto`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Create passport photos",
      "Create visa photos",
      "Standard ID photo sizes",
      "Custom file size (50KB-1000KB)",
      "100% browser-based processing",
      "No server uploads",
      "Privacy-focused"
    ]
  };

  return (
    <>
      <Script
        id="json-ld-id-photo-maker"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}

