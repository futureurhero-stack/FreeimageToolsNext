// app/layout.js
import "./globals.css";

export const metadata = {
  title: "FreeImageTools – JPG Converter & Image Resizer",
  description: "Free JPG converter & image size reducer in your browser.",
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
      <body>{children}</body>
    </html>
  );
}




