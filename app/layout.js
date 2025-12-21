// app/layout.js
import "./globals.css";

export const metadata = {
  title: "FreeImageTools – JPG Converter & Image Resizer",
  description: "Free JPG converter & image size reducer in your browser."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}




