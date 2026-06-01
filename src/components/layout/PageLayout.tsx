import { Helmet } from "react-helmet-async";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { StickyPromoBar } from "@/components/StickyPromoBar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SiteParticles } from "@/components/SiteParticles";
import { PageBanner } from "@/components/PageBanner";
import { SeoHead } from "@/components/SeoHead";
import { CookieConsent } from "@/components/CookieConsent";
import { BackToTop } from "@/components/BackToTop";
import { SocialProofToast } from "@/components/SocialProofToast";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { StickyCTABar } from "@/components/StickyCTABar";
import { useLocation } from "react-router-dom";

interface Props {
  title: string;
  description: string;
  canonical?: string;
  primaryKeyword?: string;
  children: React.ReactNode;
}

export const PageLayout = ({ title, description, canonical, primaryKeyword, children }: Props) => {
  const { pathname } = useLocation();
  const route = canonical || pathname;
  return (
    <div className="flex flex-col min-h-screen relative">
      <Helmet>
        <meta property="og:type" content="website" />
      </Helmet>
      <SeoHead route={route} defaultTitle={title} defaultDescription={description} primaryKeyword={primaryKeyword} />
      <StickyPromoBar />
      <SiteParticles />
      <ScrollProgress />
      <Header />
      <PageBanner position="top" />
      <main className="flex-1 relative pb-16 md:pb-0">{children}</main>
      <PageBanner position="bottom" />
      <Footer />
      <BackToTop />
      <SocialProofToast />
      <CookieConsent />
      <ExitIntentPopup />
      <StickyCTABar />
    </div>
  );
};
