import type { Metadata } from "next";
import { siteUrl, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Tabularis. How we collect, use, and protect your data. We do not store your documents.",
  openGraph: {
    title: "Privacy Policy",
    description: "Privacy Policy for Tabularis.",
    url: `${siteUrl}/privacy`,
    siteName,
    type: "website",
  },
  alternates: { canonical: `${siteUrl}/privacy` },
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
