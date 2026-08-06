/**
 * Admin module route table.
 *
 * Drop-in usage in ANY React Router app:
 *
 *   import { AdminRoutes, PortalRoutes } from "@/admin";
 *   <Routes>
 *      ...your public routes...
 *      {AdminRoutes()}
 *      {PortalRoutes()}
 *   </Routes>
 *
 * Requires: <AuthProvider> from "@/admin/hooks/useAuth" somewhere above the router outlet,
 * a @tanstack/react-query QueryClientProvider, and the Supabase client at
 * "@/integrations/supabase/client" (see ./lib/supabase.ts to re-point it).
 */
import { Route } from "react-router-dom";

import AdminLayout from "./pages/AdminLayout";
import Dashboard from "./pages/Dashboard";
import TeamAdmin from "./pages/TeamAdmin";
import ServicesAdmin from "./pages/ServicesAdmin";
import PortfolioAdmin from "./pages/PortfolioAdmin";
import BlogAdmin from "./pages/BlogAdmin";
import Leads from "./pages/Leads";
import Newsletter from "./pages/Newsletter";
import InvoicesAdmin from "./pages/InvoicesAdmin";
import ProposalsAdmin from "./pages/ProposalsAdmin";
import SettingsAdmin from "./pages/SettingsAdmin";
import FaqsAdmin from "./pages/FaqsAdmin";
import PricingPlansAdmin from "./pages/PricingPlansAdmin";
import PackagesAdmin from "./pages/PackagesAdmin";
import QuizAdmin from "./pages/QuizAdmin";
import PopupsAdmin from "./pages/PopupsAdmin";
import CaseStudiesAdmin from "./pages/CaseStudiesAdmin";
import ClientsAdmin from "./pages/ClientsAdmin";
import ProcessStepsAdmin from "./pages/ProcessStepsAdmin";
import StatsAdmin from "./pages/StatsAdmin";
import JobsAdmin from "./pages/JobsAdmin";
import JobApplicationsAdmin from "./pages/JobApplicationsAdmin";
import AppointmentsAdmin from "./pages/AppointmentsAdmin";
import CouponsAdmin from "./pages/CouponsAdmin";
import MediaLibraryAdmin from "./pages/MediaLibraryAdmin";
import PageSeoAdmin from "./pages/PageSeoAdmin";
import DynamicPagesAdmin from "./pages/DynamicPagesAdmin";
import BannersAdmin from "./pages/BannersAdmin";
import PixelManagerAdmin from "./pages/PixelManagerAdmin";
import VisitorAnalyticsAdmin from "./pages/VisitorAnalyticsAdmin";
import ThemeColorsAdmin from "./pages/ThemeColorsAdmin";
import CrmFollowupsAdmin from "./pages/CrmFollowupsAdmin";
import AOSClientsAdmin from "./pages/aos/ClientsAdmin";
import AOSProjectsAdmin from "./pages/aos/ProjectsAdmin";
import AOSClientUsersAdmin from "./pages/aos/ClientUsersAdmin";
import AOSApprovalsAdmin from "./pages/aos/ApprovalsAdmin";
import AOSVaultAdmin from "./pages/aos/VaultAdmin";
import ClientPortal from "./portal/ClientPortal";

/** Base path of the admin panel. Change here to remount the whole module. */
export const ADMIN_BASE = "/admin";
/** Base path of the client-facing AOS portal. */
export const PORTAL_BASE = "/portal";

export const AdminRoutes = () => (
  <Route path={ADMIN_BASE} element={<AdminLayout />}>
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
);

export const PortalRoutes = () => (
  <Route path={`${PORTAL_BASE}/:clientId`} element={<ClientPortal />} />
);
