import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { solutions } from "@/data/solutions";
import logo from "@/assets/logo.png";

const nav = [
  { label: "Services", to: "/services", children: solutions.map((s) => ({ to: `/services/${s.slug}`, label: s.name })) },
  { label: "Solutions", to: "/services/restaurant-technology" },
  { label: "Industries", to: "/#industries" },
  { label: "Work", to: "/#work" },
  { label: "Process", to: "/#process" },
  { label: "About", to: "/#about" },
  { label: "Contact", to: "/contact" },
];

export const SiteHeader = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menu, setMenu] = useState<string | null>(null);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-smooth ${
        scrolled ? "bg-background/85 backdrop-blur-xl border-b border-border py-2" : "bg-background/60 backdrop-blur-md py-3"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between gap-6">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label="AM Enterprises home">
          <img src={logo} alt="AM Enterprises logo" width={36} height={36} className="w-9 h-9 rounded-xl object-cover" />
          <span className="font-extrabold text-[15px] tracking-tight">AM Enterprises</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main">
          {nav.map((n) => (
            <div
              key={n.label}
              className="relative"
              onMouseEnter={() => n.children && setMenu(n.label)}
              onMouseLeave={() => setMenu(null)}
            >
              {n.to.startsWith("/#") ? (
                <a href={n.to} className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg transition-smooth">
                  {n.label}
                </a>
              ) : (
                <NavLink
                  to={n.to}
                  className={({ isActive }) =>
                    `inline-flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-smooth hover:text-foreground ${
                      isActive ? "text-foreground" : "text-muted-foreground"
                    }`
                  }
                >
                  {n.label}
                  {n.children && <ChevronDown className="w-3.5 h-3.5" aria-hidden />}
                </NavLink>
              )}
              {n.children && menu === n.label && (
                <div className="absolute top-full left-0 pt-2 animate-fade-up">
                  <div className="min-w-[240px] rounded-2xl border border-border bg-background shadow-card p-2">
                    {n.children.map((c) => (
                      <Link key={c.to} to={c.to} className="block px-3 py-2 rounded-xl text-sm hover:bg-secondary transition-smooth">
                        {c.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild className="gradient-cta text-primary-foreground rounded-full px-5 hover:opacity-90">
            <Link to="/contact">Start a project</Link>
          </Button>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-secondary"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <div className="container mx-auto py-4 flex flex-col gap-1">
            {nav.map((n) =>
              n.to.startsWith("/#") ? (
                <a key={n.label} href={n.to} onClick={() => setOpen(false)} className="py-2.5 text-sm font-semibold">
                  {n.label}
                </a>
              ) : (
                <div key={n.label}>
                  <Link to={n.to} onClick={() => setOpen(false)} className="block py-2.5 text-sm font-semibold">
                    {n.label}
                  </Link>
                  {n.children && (
                    <div className="pl-3 border-l border-border ml-1 mb-2">
                      {n.children.map((c) => (
                        <Link key={c.to} to={c.to} onClick={() => setOpen(false)} className="block py-2 text-sm text-muted-foreground">
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
            <Button asChild className="gradient-cta text-primary-foreground rounded-full mt-3">
              <Link to="/contact" onClick={() => setOpen(false)}>Start a project</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};
