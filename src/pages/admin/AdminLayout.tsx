import { NavLink, Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, Users, Briefcase, Image, FileText, MessageSquare, Settings, Receipt, FileSignature, LogOut, Mail, HelpCircle, Tag, Package, Sparkles, Megaphone, BookOpen, BarChart3, ListChecks, UserPlus, CalendarCheck, Ticket, Library, Search, Bell, Activity, Palette, Target, Headphones, Building2, FolderKanban, CheckSquare, FolderLock, KeyRound } from "lucide-react";

const items = [
  { to: "/admin", icon: LayoutDashboard, label: "Dashboard", end: true },
  { to: "/admin/analytics", icon: Activity, label: "Visitor Analytics" },
  { to: "/admin/pixels", icon: Target, label: "Pixel Manager" },
  { to: "/admin/theme-colors", icon: Palette, label: "Theme Colors" },
  { to: "/admin/crm", icon: Headphones, label: "CRM Follow-ups" },
  { to: "/admin/team", icon: Users, label: "Team" },
  { to: "/admin/services", icon: Briefcase, label: "Services" },
  { to: "/admin/portfolio", icon: Image, label: "Portfolio" },
  { to: "/admin/case-studies", icon: BookOpen, label: "Case Studies" },
  { to: "/admin/clients", icon: Sparkles, label: "Clients & Logos" },
  { to: "/admin/process-steps", icon: ListChecks, label: "Process Steps" },
  { to: "/admin/stats", icon: BarChart3, label: "Stats Counters" },
  { to: "/admin/blog", icon: FileText, label: "Blog" },
  { to: "/admin/faqs", icon: HelpCircle, label: "FAQs" },
  { to: "/admin/pricing-plans", icon: Tag, label: "Pricing Plans" },
  { to: "/admin/packages", icon: Package, label: "Packages" },
  { to: "/admin/quiz", icon: Megaphone, label: "Quiz" },
  { to: "/admin/popups", icon: Bell, label: "Popups" },
  { to: "/admin/jobs", icon: Briefcase, label: "Job Openings" },
  { to: "/admin/job-applications", icon: UserPlus, label: "Applications" },
  { to: "/admin/appointments", icon: CalendarCheck, label: "Appointments" },
  { to: "/admin/coupons", icon: Ticket, label: "Coupons" },
  { to: "/admin/media", icon: Library, label: "Media Library" },
  { to: "/admin/page-seo", icon: Search, label: "Page SEO" },
  { to: "/admin/pages", icon: FileText, label: "Pages (Builder)" },
  { to: "/admin/banners", icon: Megaphone, label: "Page Banners" },
  { to: "/admin/leads", icon: MessageSquare, label: "Leads" },
  { to: "/admin/newsletter", icon: Mail, label: "Newsletter" },
  { to: "/admin/invoices", icon: Receipt, label: "Invoices" },
  { to: "/admin/proposals", icon: FileSignature, label: "Proposals" },
  { to: "/admin/settings", icon: Settings, label: "Settings" },
];

const AdminLayout = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const nav = useNavigate();
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  if (!user) return <Navigate to="/auth" replace />;
  if (!isAdmin) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4 text-center">
      <h1 className="text-2xl font-bold">Not authorized</h1>
      <p className="text-muted-foreground max-w-md">Your account ({user.email}) needs the <code className="bg-muted px-2 py-1 rounded">admin</code> role. Promote it from the backend → user_roles table.</p>
      <Button variant="outline" onClick={async () => { await signOut(); nav("/auth"); }}>Sign Out</Button>
    </div>
  );
  return (
    <div className="min-h-screen flex bg-muted/30">
      <aside className="w-60 bg-background border-r border-border flex flex-col">
        <div className="p-5 border-b border-border flex items-center gap-3">
          <img src={new URL("@/assets/logo.png", import.meta.url).href} alt="AM" className="w-10 h-10 rounded-full object-cover" />
          <div className="min-w-0">
            <div className="font-bold text-lg leading-tight">AM Admin</div>
            <div className="text-xs text-muted-foreground truncate">{user.email}</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map((i) => (
            <NavLink key={i.to} to={i.to} end={i.end} className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`
            }>
              <i.icon className="w-4 h-4" /> {i.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-border">
          <Button variant="outline" size="sm" className="w-full" onClick={async () => { await signOut(); nav("/"); }}>
            <LogOut className="w-4 h-4 mr-2" /> Sign Out
          </Button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto p-6 lg:p-8"><Outlet /></main>
    </div>
  );
};
export default AdminLayout;
