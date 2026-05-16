import { Helmet } from "react-helmet-async";
import { useSeo } from "@/hooks/useSeo";

interface Props {
  route: string;
  defaultTitle: string;
  defaultDescription: string;
  primaryKeyword?: string;
}

export const SeoHead = ({ route, defaultTitle, defaultDescription, primaryKeyword }: Props) => {
  const seo = useSeo({ route, title: defaultTitle, description: defaultDescription, primaryKeyword });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: seo.title,
    description: seo.description,
    url: seo.canonical,
    keywords: seo.keywords,
    isPartOf: {
      "@type": "WebSite",
      name: "AM Enterprises",
      url: "https://amenterprises.tech",
    },
  };

  return (
    <Helmet>
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.canonical} />
      {seo.noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:url" content={seo.canonical} />
      {seo.ogImage && <meta property="og:image" content={seo.ogImage} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      {seo.ogImage && <meta name="twitter:image" content={seo.ogImage} />}

      {seo.tags.map((t) => (
        <meta key={t} property="article:tag" content={t} />
      ))}

      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
};
