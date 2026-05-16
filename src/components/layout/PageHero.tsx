import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import hero1 from "@/assets/hero-royal-1.jpg";
import hero2 from "@/assets/hero-royal-2.jpg";
import hero3 from "@/assets/hero-royal-3.jpg";

const pool = [hero1, hero2, hero3];

interface Props {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  showBreadcrumb?: boolean;
}

export const PageHero = ({ title, subtitle, backgroundImage, showBreadcrumb = true }: Props) => {
  const { pathname } = useLocation();
  const idx = Math.abs(hash(pathname)) % pool.length;
  const bg = backgroundImage || pool[idx];
  const crumbs = pathname.split("/").filter(Boolean);

  return (
    <section className="relative overflow-hidden border-b border-border gradient-hero">
      <div className="relative container mx-auto py-20 md:py-28 text-center text-foreground animate-fade-up">
        {showBreadcrumb && crumbs.length > 0 && (
          <nav className="flex items-center justify-center gap-2 text-xs md:text-sm text-muted-foreground mb-5">
            <Link to="/" className="hover:text-primary transition-smooth">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-2">
                <ChevronRight className="w-3 h-3 opacity-60" />
                <span className="capitalize">{c.replace(/-/g, " ")}</span>
              </span>
            ))}
          </nav>
        )}
        <h1 className="font-display text-4xl md:text-6xl lg:text-7xl mb-5 leading-tight text-foreground">
          {title}
        </h1>
        <div className="gold-divider mx-auto mb-6" />
        {subtitle && (
          <p className="text-base md:text-lg max-w-2xl mx-auto text-muted-foreground leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return h;
}
