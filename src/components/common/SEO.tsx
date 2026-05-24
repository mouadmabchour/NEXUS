import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  type?: string;
  image?: string;
  schema?: object;
}

export const SEO = ({ 
  title = 'NEXUS PRODUCTS | Modern Streetwear & Trending Products in Morocco', 
  description = 'Découvrez les meilleurs produits tendance, streetwear et accessoires modernes au Maroc avec livraison rapide et paiement sécurisé.',
  canonical = 'https://nexus-products.io',
  type = 'website',
  image = 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=1200',
  schema
}: SEOProps) => {
  const siteTitle = title.includes('NEXUS PRODUCTS') ? title : `${title} | NEXUS PRODUCTS`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={canonical} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={siteTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
