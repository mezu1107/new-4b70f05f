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
import DynamicPagesAdmin from "./pages/admin/DynamicPagesAdmin.tsx";
import { PixelInjector } from "@/components/PixelInjector";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { PopupRenderer } from "@/components/PopupRenderer";
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
import AdminLayout from "./pages/admin/AdminLayout.tsx";
import Dashboard from "./pages/admin/Dashboard.tsx";
import TeamAdmin from "./pages/admin/TeamAdmin.tsx";
import ServicesAdmin from "./pages/admin/ServicesAdmin.tsx";
import PortfolioAdmin from "./pages/admin/PortfolioAdmin.tsx";
import BlogAdmin from "./pages/admin/BlogAdmin.tsx";
import Leads from "./pages/admin/Leads.tsx";
import Newsletter from "./pages/admin/Newsletter.tsx";
import InvoicesAdmin from "./pages/admin/InvoicesAdmin.tsx";
import ProposalsAdmin from "./pages/admin/ProposalsAdmin.tsx";
import SettingsAdmin from "./pages/admin/SettingsAdmin.tsx";
import FaqsAdmin from "./pages/admin/FaqsAdmin.tsx";
import PricingPlansAdmin from "./pages/admin/PricingPlansAdmin.tsx";
import PackagesAdmin from "./pages/admin/PackagesAdmin.tsx";
import QuizAdmin from "./pages/admin/QuizAdmin.tsx";
import PopupsAdmin from "./pages/admin/PopupsAdmin.tsx";
import CaseStudiesAdmin from "./pages/admin/CaseStudiesAdmin.tsx";
import ClientsAdmin from "./pages/admin/ClientsAdmin.tsx";
import ProcessStepsAdmin from "./pages/admin/ProcessStepsAdmin.tsx";
import StatsAdmin from "./pages/admin/StatsAdmin.tsx";
import JobsAdmin from "./pages/admin/JobsAdmin.tsx";
import JobApplicationsAdmin from "./pages/admin/JobApplicationsAdmin.tsx";
import AppointmentsAdmin from "./pages/admin/AppointmentsAdmin.tsx";
import CouponsAdmin from "./pages/admin/CouponsAdmin.tsx";
import MediaLibraryAdmin from "./pages/admin/MediaLibraryAdmin.tsx";
import PageSeoAdmin from "./pages/admin/PageSeoAdmin.tsx";
import BannersAdmin from "./pages/admin/BannersAdmin.tsx";
import Careers from "./pages/Careers.tsx";
import Pricing from "./pages/Pricing.tsx";
import PixelManagerAdmin from "./pages/admin/PixelManagerAdmin.tsx";
import VisitorAnalyticsAdmin from "./pages/admin/VisitorAnalyticsAdmin.tsx";
import ThemeColorsAdmin from "./pages/admin/ThemeColorsAdmin.tsx";
import CrmFollowupsAdmin from "./pages/admin/CrmFollowupsAdmin.tsx";

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
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
            <FloatingWidget />
            <PopupRenderer />
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
    </ThemeProvider>
  </HelmetProvider>
);

export default App;
