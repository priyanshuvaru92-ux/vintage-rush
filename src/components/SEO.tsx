import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  type?: 'website' | 'article' | 'product';
  image?: string;
  structuredData?: Record<string, any>;
}

export default function SEO({ 
  title, 
  description = "Discover premium streetwear and fashion inspired by the latest trends. Shop Vintage Rush for oversized tees, hoodies, cargos, and more.", 
  canonical, 
  type = 'website', 
  image = `${import.meta.env.VITE_SITE_URL || 'https://vintagerush.in'}/og-image.jpg`,
  structuredData
}: SEOProps) {
  const siteName = "Vintage Rush";
  const url = canonical || (typeof window !== 'undefined' ? window.location.href : '');

  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://vintagerush.in';
  
  // Default Organization JSON-LD
  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Vintage Rush",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "sameAs": [
      "https://instagram.com/vintagerush",
      "https://twitter.com/vintagerush"
    ]
  };

  const schema = structuredData || defaultSchema;

  return (
    <Helmet>
      {/* Standard Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Search Console Verification (Placeholder) */}
      <meta name="google-site-verification" content="your-google-verification-code" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
}
