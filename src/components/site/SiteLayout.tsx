import { Helmet } from "react-helmet-async";
import { SiteHeader } from "./SiteHeader";
import { SiteFooter } from "./SiteFooter";

interface Props {
  title: string;
  description: string;
  canonical?: string;
  jsonLd?: Record<string, unknown>;
  children: React.ReactNode;
}

const ORIGIN = "https://amenterprises.tech";

export const SiteLayout = ({ title, description, canonical = "/", jsonLd, children }: Props) => (
  <div className="flex min-h-screen flex-col">
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${ORIGIN}${canonical}`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${ORIGIN}${canonical}`} />
      <meta name="twitter:card" content="summary_large_image" />
      {jsonLd && <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>}
    </Helmet>
    <SiteHeader />
    <main className="flex-1">{children}</main>
    <SiteFooter />
  </div>
);
