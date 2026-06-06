import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import fallbackLogo from "@/assets/logo.png";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

type SubItem = { to: string; label: string; desc?: string };
type NavItem = { to: string; label: string; children?: SubItem[] };

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const { data: settings } = useSiteSettings();
  const { data: dbServices } = useRealtimeTable<any>({ table: "services", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" }, limit: 8 });
  const logo = settings?.logo_url || fallbackLogo;
  const siteName = settings?.site_name || "AM Enterprises";

  const nav: NavItem[] = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About Us", children: [
      { to: "/about", label: "About Our Company", desc: "Story, mission & vision" },
      { to: "/team", label: "Our Team", desc: "Meet the experts" },
      { to: "/about/company-profile", label: "Company Profile", desc: "Credentials & overview" },
      { to: "/careers", label: "Careers", desc: "Join the team" },
    ]},
    { to: "/services", label: "Services", children: [
      { to: "/services", label: "All Services" },
      ...((dbServices || []).slice(0, 6).map((s: any) => ({ to: `/services/${s.slug}`, label: s.title }))),
    ]},
    { to: "/pricing", label: "Pricing", children: [
      { to: "/pricing", label: "Monthly Plans", desc: "Subscription packages" },
      { to: "/pricing#packages", label: "One-off Packages", desc: "Project-based packs" },
      { to: "/pricing#saas", label: "SaaS Plans", desc: "Software subscriptions" },
    ]},
    { to: "/case-studies", label: "Case Studies" },
    { to: "/portfolio", label: "Portfolio" },
    { to: "/blog", label: "Blog" },
    { to: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-smooth ${scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border" : "bg-background/40 backdrop-blur-md"}`}>
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" data-header-text>
          <img src={logo} alt={`${siteName} logo`} className="w-9 h-9 rounded-lg object-cover" />
          <div className="leading-tight">
            <div className="font-extrabold text-base tracking-tight">
              <span className="text-primary">AM</span> ENTERPRISES
            </div>
            <div className="text-[10px] text-muted-foreground tracking-[0.2em] -mt-0.5">.TECH</div>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-1">
          {nav.map((n) => (
            <div key={n.label} className="relative" onMouseEnter={() => n.children && setOpenMenu(n.label)} onMouseLeave={() => setOpenMenu(null)}>
              <NavLink to={n.to} end={n.to === "/"} className={({ isActive }) =>
                `inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-md transition-smooth hover:text-primary hover:bg-primary/5 ${isActive ? "text-foreground" : "text-muted-foreground"}`
              }>
                {n.label}
                {n.children && <ChevronDown className="w-3 h-3" />}
              </NavLink>
              {n.children && openMenu === n.label && (
                <div className="absolute top-full left-0 pt-2 z-50 animate-fade-in">
                  <div className="min-w-[260px] rounded-xl border border-border bg-background/95 backdrop-blur-xl shadow-elegant overflow-hidden p-2">
                    {n.children.map((c) => (
                      <Link key={c.to} to={c.to} className="block px-3 py-2.5 rounded-md hover:bg-primary/10 hover:text-primary transition-smooth">
                        <div className="text-sm font-semibold">{c.label}</div>
                        {c.desc && <div className="text-xs text-muted-foreground">{c.desc}</div>}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />
          <Button asChild className="gradient-cta text-primary-foreground shadow-glow hover:opacity-90">
            <Link to="/contact"><Calendar className="w-4 h-4 mr-2" /> Book Free Call</Link>
          </Button>
        </div>
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button onClick={() => setOpen(!open)} aria-label="Menu" className="p-2 rounded-md hover:bg-secondary">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background max-h-[75vh] overflow-y-auto">
          <div className="container mx-auto py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <div key={n.label}>
                <NavLink to={n.to} end={n.to === "/"} onClick={() => setOpen(false)}
                  className={({ isActive }) => `block py-2.5 px-2 rounded-md text-sm font-semibold ${isActive ? "text-primary bg-primary/5" : "text-foreground"}`}>{n.label}</NavLink>
                {n.children && (
                  <div className="pl-4 border-l border-border ml-2 mb-2">
                    {n.children.map((c) => (
                      <Link key={c.to} to={c.to} onClick={() => setOpen(false)} className="block py-2 px-2 text-sm text-muted-foreground hover:text-primary">{c.label}</Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Button asChild className="gradient-cta text-primary-foreground mt-2"><Link to="/contact" onClick={() => setOpen(false)}><Calendar className="w-4 h-4 mr-2" /> Book Free Strategy Call</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
};
