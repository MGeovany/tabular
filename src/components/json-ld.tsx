import { siteUrl, siteName, defaultDescription } from "@/lib/seo";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: siteName,
  url: siteUrl,
  description: defaultDescription,
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteName,
  url: siteUrl,
  description: defaultDescription,
  publisher: { "@id": `${siteUrl}/#organization` },
  inLanguage: "en-US",
};

export function JsonLd() {
  const jsonLd = [organizationSchema, websiteSchema];
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
