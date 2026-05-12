import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import fallbackLogo from "@/assets/logo.png";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const nav = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/#ai-systems", label: "AI Systems" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About Us" },
];

export const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { data: settings } = useSiteSettings();
  const logo = settings?.logo_url || fallbackLogo;
  const siteName = settings?.site_name || "AM Enterprises";

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
        <nav className="hidden lg:flex items-center gap-7">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.to === "/"} className={({ isActive }) =>
              `text-sm font-medium transition-smooth hover:text-primary ${isActive ? "text-foreground" : "text-muted-foreground"}`
            }>{n.label}</NavLink>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          <Button asChild className="gradient-cta text-primary-foreground shadow-glow hover:opacity-90">
            <Link to="/contact"><Calendar className="w-4 h-4 mr-2" /> Book Free Strategy Call</Link>
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
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto py-4 flex flex-col gap-1">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === "/"} onClick={() => setOpen(false)}
                className={({ isActive }) => `py-2.5 px-2 rounded-md text-sm ${isActive ? "text-primary font-semibold bg-primary/5" : "text-foreground"}`}>{n.label}</NavLink>
            ))}
            <Button asChild className="gradient-cta text-primary-foreground mt-2"><Link to="/contact" onClick={() => setOpen(false)}><Calendar className="w-4 h-4 mr-2" /> Book Free Strategy Call</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
};
