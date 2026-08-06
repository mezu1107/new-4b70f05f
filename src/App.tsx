import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, AdminRoutes, PortalRoutes } from "@/admin";
import { ThemeProvider } from "@/hooks/useTheme";
import { FloatingWidget } from "@/components/FloatingWidget";
import DynamicPage from "./pages/DynamicPage.tsx";
import { PixelInjector } from "@/components/PixelInjector";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { PopupRenderer } from "@/components/PopupRenderer";
import { SmartBookingPopup } from "@/components/SmartBookingPopup";
import Index from "./pages/Index.tsx";
import About from "./pages/About.tsx";
import Services from "./pages/Services.tsx";
import ServiceDetail from "./pages/ServiceDetail.tsx";
import Portfolio from "./pages/Portfolio.tsx";
import CaseStudies from "./pages/CaseStudies.tsx";
import Testimonials from "./pages/Testimonials.tsx";
import Blog from "./pages/Blog.tsx";
import Contact from "./pages/Contact.tsx";
import FAQ from "./pages/FAQ.tsx";
import { PrivacyPolicy, Terms } from "./pages/Legal.tsx";
import NotFound from "./pages/NotFound.tsx";
import Auth from "./pages/Auth.tsx";
import OAuthConsent from "./pages/OAuthConsent.tsx";
import Careers from "./pages/Careers.tsx";
import Pricing from "./pages/Pricing.tsx";
import Team from "./pages/Team.tsx";
import CompanyProfile from "./pages/CompanyProfile.tsx";

const queryClient = new QueryClient();

const TrackingMount = () => { useVisitorTracking(); return null; };

const App = () => (
  <HelmetProvider>
    <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <PixelInjector />
            <TrackingMount />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/about/company-profile" element={<CompanyProfile />} />
              <Route path="/team" element={<Team />} />
              <Route path="/services" element={<Services />} />
              <Route path="/services/:slug" element={<ServiceDetail />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/p/:slug" element={<DynamicPage />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/.lovable/oauth/consent" element={<OAuthConsent />} />
              {PortalRoutes()}
              {AdminRoutes()}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingWidget />
            <PopupRenderer />
            <SmartBookingPopup />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
