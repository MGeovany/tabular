import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, Space_Mono } from "next/font/google";
import { Providers } from "./providers";
import { AppTransition } from "@/components/app-transition";
import { JsonLd } from "@/components/json-ld";
import {
  siteUrl,
  siteName,
  defaultTitle,
  defaultDescription,
  defaultKeywords,
  locale,
  ogImagePath,
} from "@/lib/seo";
import "./globals.css";

const delaGothic = Dela_Gothic_One({
  weight: "400",
  variable: "--font-dela",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0038a8",
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: defaultKeywords,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    locale,
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: ogImagePath ? [{ url: ogImagePath, width: 1200, height: 630, alt: siteName }] : [],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ogImagePath ? [ogImagePath] : [],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: siteUrl },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${delaGothic.variable} ${spaceMono.variable} bg-paper font-mono antialiased`}
      >
        <JsonLd />
        <Providers>
          <AppTransition>{children}</AppTransition>
        </Providers>
      </body>
    </html>
  );
}
