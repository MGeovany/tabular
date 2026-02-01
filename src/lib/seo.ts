/**
 * SEO config: base URL and default values for metadata, sitemap, robots.
 * Set NEXT_PUBLIC_APP_URL in production (e.g. https://tabularis.example.com).
 */
export const siteUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const siteName = "Tabularis";
export const defaultTitle = "Tabularis - Extract tables from PDF to Excel";
export const defaultDescription =
  "Extract tables from PDF automatically. Turn fixed documents into editable Excel or CSV. Encrypted, audit-ready, open source.";
export const defaultKeywords = [
  "PDF to Excel",
  "PDF to CSV",
  "extract tables from PDF",
  "table extraction",
  "PDF converter",
  "document conversion",
  "audit-ready",
  "encrypted",
];
export const twitterHandle = ""; // e.g. "@tabularis"
export const locale = "en_US";
export const ogImagePath = ""; // set to "/og.png" and add public/og.png (1200x630) for social cards
