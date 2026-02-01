import type { Metadata } from "next";
import { siteUrl, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Tabularis. By using the service you agree to these terms and our Privacy Policy.",
  openGraph: {
    title: "Terms of Service",
    description: "Terms of Service for Tabularis.",
    url: `${siteUrl}/terms`,
    siteName,
    type: "website",
  },
  alternates: { canonical: `${siteUrl}/terms` },
  robots: { index: true, follow: true },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
