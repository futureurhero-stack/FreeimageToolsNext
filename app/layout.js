// app/layout.js
import "./globals.css";
import Script from "next/script";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://freeimage-tools-next.vercel.app';

export const metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "FreeImageTools – Free JPG Converter & Image Resizer",
    template: "%s | FreeImageTools"
  },
  description: "Free JPG converter, image resizer, and ID photo maker. Convert PNG to JPG, resize images, and create passport photos 100% in your browser. No uploads, completely private.",
  keywords: ["JPG converter", "image converter", "PNG to JPG", "image resizer", "image compressor", "ID photo maker", "passport photo", "free image tools", "online image converter", "browser image converter"],
  authors: [{ name: "FreeImageTools" }],
  creator: "FreeImageTools",
  publisher: "FreeImageTools",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "FreeImageTools",
    title: "FreeImageTools – Free JPG Converter & Image Resizer",
    description: "Free JPG converter, image resizer, and ID photo maker. Convert PNG to JPG, resize images, and create passport photos 100% in your browser.",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "FreeImageTools – Free JPG Converter & Image Resizer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FreeImageTools – Free JPG Converter & Image Resizer",
    description: "Free JPG converter, image resizer, and ID photo maker. Convert PNG to JPG, resize images, and create passport photos 100% in your browser.",
    images: [`${baseUrl}/og-image.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "NxOfBV1OdIGVDYaWX8D1HQqT3AMU-192wC-s5O8fQCY",
  },
  other: {
    "google-adsense-account": "ca-pub-2947007400947272",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2947007400947272" />
        <meta name="google-site-verification" content="NxOfBV1OdIGVDYaWX8D1HQqT3AMU-192wC-s5O8fQCY" />
        <meta name="naver-site-verification" content="d2674ed1907b4cf4e544f07a40281dfe83ca7579" />
      </head>
      <body>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CZML0SNNVS"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CZML0SNNVS');
          `}
        </Script>
        {children}
      </body>
    </html>
  );
}




