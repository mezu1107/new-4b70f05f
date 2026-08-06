import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import { ThemeProvider } from "@/hooks/useTheme";
import { FloatingWidget } from "@/components/FloatingWidget";
import DynamicPage from "./pages/DynamicPage.tsx";
import DynamicPagesAdmin from "./admin/pages/DynamicPagesAdmin.tsx";
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
import AdminLayout from "./admin/pages/AdminLayout.tsx";
import Dashboard from "./admin/pages/Dashboard.tsx";
import TeamAdmin from "./admin/pages/TeamAdmin.tsx";
import ServicesAdmin from "./admin/pages/ServicesAdmin.tsx";
import PortfolioAdmin from "./admin/pages/PortfolioAdmin.tsx";
import BlogAdmin from "./admin/pages/BlogAdmin.tsx";
import Leads from "./admin/pages/Leads.tsx";
import Newsletter from "./admin/pages/Newsletter.tsx";
import InvoicesAdmin from "./admin/pages/InvoicesAdmin.tsx";
import ProposalsAdmin from "./admin/pages/ProposalsAdmin.tsx";
import SettingsAdmin from "./admin/pages/SettingsAdmin.tsx";
import FaqsAdmin from "./admin/pages/FaqsAdmin.tsx";
import PricingPlansAdmin from "./admin/pages/PricingPlansAdmin.tsx";
import PackagesAdmin from "./admin/pages/PackagesAdmin.tsx";
import QuizAdmin from "./admin/pages/QuizAdmin.tsx";
import PopupsAdmin from "./admin/pages/PopupsAdmin.tsx";
import CaseStudiesAdmin from "./admin/pages/CaseStudiesAdmin.tsx";
import ClientsAdmin from "./admin/pages/ClientsAdmin.tsx";
import ProcessStepsAdmin from "./admin/pages/ProcessStepsAdmin.tsx";
import StatsAdmin from "./admin/pages/StatsAdmin.tsx";
import JobsAdmin from "./admin/pages/JobsAdmin.tsx";
import JobApplicationsAdmin from "./admin/pages/JobApplicationsAdmin.tsx";
import AppointmentsAdmin from "./admin/pages/AppointmentsAdmin.tsx";
import CouponsAdmin from "./admin/pages/CouponsAdmin.tsx";
import MediaLibraryAdmin from "./admin/pages/MediaLibraryAdmin.tsx";
import PageSeoAdmin from "./admin/pages/PageSeoAdmin.tsx";
import BannersAdmin from "./admin/pages/BannersAdmin.tsx";
import Careers from "./pages/Careers.tsx";
import Pricing from "./pages/Pricing.tsx";
import PixelManagerAdmin from "./admin/pages/PixelManagerAdmin.tsx";
import VisitorAnalyticsAdmin from "./admin/pages/VisitorAnalyticsAdmin.tsx";
import ThemeColorsAdmin from "./admin/pages/ThemeColorsAdmin.tsx";
import CrmFollowupsAdmin from "./admin/pages/CrmFollowupsAdmin.tsx";
import Team from "./pages/Team.tsx";
import CompanyProfile from "./pages/CompanyProfile.tsx";
import ClientPortal from "./admin/portal/ClientPortal.tsx";
import AOSClientsAdmin from "./admin/pages/aos/ClientsAdmin.tsx";
import AOSProjectsAdmin from "./admin/pages/aos/ProjectsAdmin.tsx";
import AOSClientUsersAdmin from "./admin/pages/aos/ClientUsersAdmin.tsx";
import AOSApprovalsAdmin from "./admin/pages/aos/ApprovalsAdmin.tsx";
import AOSVaultAdmin from "./admin/pages/aos/VaultAdmin.tsx";

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
              <Route path="/portal/:clientId" element={<ClientPortal />} />
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="team" element={<TeamAdmin />} />
                <Route path="services" element={<ServicesAdmin />} />
                <Route path="portfolio" element={<PortfolioAdmin />} />
                <Route path="blog" element={<BlogAdmin />} />
                <Route path="leads" element={<Leads />} />
                <Route path="newsletter" element={<Newsletter />} />
                <Route path="invoices" element={<InvoicesAdmin />} />
                <Route path="proposals" element={<ProposalsAdmin />} />
                <Route path="settings" element={<SettingsAdmin />} />
                <Route path="faqs" element={<FaqsAdmin />} />
                <Route path="pricing-plans" element={<PricingPlansAdmin />} />
                <Route path="packages" element={<PackagesAdmin />} />
                <Route path="quiz" element={<QuizAdmin />} />
                <Route path="popups" element={<PopupsAdmin />} />
                <Route path="case-studies" element={<CaseStudiesAdmin />} />
                <Route path="clients" element={<ClientsAdmin />} />
                <Route path="process-steps" element={<ProcessStepsAdmin />} />
                <Route path="stats" element={<StatsAdmin />} />
                <Route path="jobs" element={<JobsAdmin />} />
                <Route path="job-applications" element={<JobApplicationsAdmin />} />
                <Route path="appointments" element={<AppointmentsAdmin />} />
                <Route path="coupons" element={<CouponsAdmin />} />
                <Route path="media" element={<MediaLibraryAdmin />} />
                <Route path="page-seo" element={<PageSeoAdmin />} />
                <Route path="pages" element={<DynamicPagesAdmin />} />
                <Route path="banners" element={<BannersAdmin />} />
                <Route path="pixels" element={<PixelManagerAdmin />} />
                <Route path="analytics" element={<VisitorAnalyticsAdmin />} />
                <Route path="theme-colors" element={<ThemeColorsAdmin />} />
                <Route path="crm" element={<CrmFollowupsAdmin />} />
                <Route path="aos/clients" element={<AOSClientsAdmin />} />
                <Route path="aos/portal-access" element={<AOSClientUsersAdmin />} />
                <Route path="aos/projects" element={<AOSProjectsAdmin />} />
                <Route path="aos/approvals" element={<AOSApprovalsAdmin />} />
                <Route path="aos/vault" element={<AOSVaultAdmin />} />
              </Route>
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
