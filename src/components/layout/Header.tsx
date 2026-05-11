import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import fallbackLogo from "@/assets/logo.png";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { MegaMenu } from "@/components/MegaMenu";

const nav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/portfolio", label: "Portfolio" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/blog", label: "Blog" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
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
    <header className={`sticky top-0 z-50 transition-smooth ${scrolled ? "bg-background/90 backdrop-blur-lg shadow-card" : "bg-background/60 backdrop-blur"}`}>
      <div className="container mx-auto flex items-center justify-between py-4">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt={`${siteName} logo`} className="w-10 h-10 rounded-full object-cover" />
          <span className="font-bold text-lg">{siteName}</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          <NavLink to="/" end className={({ isActive }) => `text-sm font-medium transition-smooth hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`}>Home</NavLink>
          <NavLink to="/about" className={({ isActive }) => `text-sm font-medium transition-smooth hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`}>About</NavLink>
          <MegaMenu />
          {nav.slice(2).map((n) => (
            <NavLink key={n.to} to={n.to} className={({ isActive }) =>
              `text-sm font-medium transition-smooth hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`
            }>{n.label}</NavLink>
          ))}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <a href="tel:03173712950" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary">
            <Phone className="w-4 h-4" /> 0317-3712950
          </a>
          <Button asChild variant="hero" size="sm"><Link to="/contact">Get Free Consultation</Link></Button>
        </div>
        <button className="lg:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto py-4 flex flex-col gap-3">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === "/"} onClick={() => setOpen(false)}
                className={({ isActive }) => `py-2 ${isActive ? "text-primary font-semibold" : "text-foreground"}`}>{n.label}</NavLink>
            ))}
            <NavLink to="/services" onClick={() => setOpen(false)} className="py-2 text-foreground">Services</NavLink>
            <NavLink to="/pricing" onClick={() => setOpen(false)} className="py-2 text-foreground">Pricing</NavLink>
            <a href="tel:03173712950" className="py-2 flex items-center gap-2 text-foreground"><Phone className="w-4 h-4" /> 0317-3712950</a>
            <Button asChild variant="hero"><Link to="/contact" onClick={() => setOpen(false)}>Get Free Consultation</Link></Button>
          </div>
        </div>
      )}
    </header>
  );
};
