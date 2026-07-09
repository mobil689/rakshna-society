import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title: string;
  description: string;
  path?: string;
  ogType?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const SITE_NAME = "RAKSHNA | Cybersecurity Society of MAIT";
const BASE_URL = "https://rakshnamait.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/rakshna-logo.png`;

/**
 * Reusable SEO head component that sets per-page title, description,
 * canonical URL, Open Graph, and Twitter Card meta tags.
 */
const SEOHead = ({
  title,
  description,
  path = "/",
  ogType = "website",
  ogImage,
  noIndex = false,
}: SEOHeadProps) => {
  const fullTitle = title === SITE_NAME ? title : `${title} | RAKSHNA - MAIT`;
  const canonicalUrl = `${BASE_URL}${path}`;
  const image = ogImage || DEFAULT_OG_IMAGE;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={SITE_NAME} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
    </Helmet>
  );
};

export default SEOHead;
