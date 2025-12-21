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
      </head>
      <body>{children}</body>
    </html>
  );
}




