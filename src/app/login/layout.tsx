import type { Metadata } from "next";
import { siteUrl, siteName } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in with your Microsoft account to access Tabularis and convert PDFs to Excel.",
  openGraph: {
    title: "Sign in | Tabularis",
    description: "Sign in with Microsoft to access Tabularis.",
    url: `${siteUrl}/login`,
    siteName,
    type: "website",
  },
  robots: { index: false, follow: true },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children;
}
