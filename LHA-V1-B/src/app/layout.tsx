import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nexia Virtual Desk — Kerala Legal Heirship Certificate Assistant",
  description:
    "Private application assistance from Nexia Virtual Desk: prepare and print the Kerala Legal Heirship Certificate application forms. Not a Government of Kerala website.",
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0f2744",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/*
          Noto Sans Malayalam is loaded so that the Malayalam headings of the
          printable forms rasterise identically on every device. If the font
          cannot be fetched the browser falls back to a local Malayalam font —
          no personal data is ever sent to Google Fonts.
        */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;600;700&family=Noto+Sans+Malayalam:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-slate-100 text-slate-900 antialiased">{children}</body>
    </html>
  );
}
