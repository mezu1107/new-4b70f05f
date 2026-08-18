import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

export const SiteFooter = () => (
  <footer className="border-t border-border surface-ice mt-24">
    <div className="container mx-auto py-14 grid gap-10 md:grid-cols-4">
      <div className="md:col-span-1">
        <div className="flex items-center gap-2.5 mb-3">
          <img src={logo} alt="AM Enterprises logo" width={32} height={32} loading="lazy" className="w-8 h-8 rounded-lg object-cover" />
          <span className="font-extrabold tracking-tight">AM Enterprises</span>
        </div>
        <p className="text-sm text-muted-foreground">Web and app development</p>
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3">Services</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><Link to="/services/web-development" className="hover:text-foreground">Web development</Link></li>
          <li><Link to="/services/app-development" className="hover:text-foreground">App development</Link></li>
          <li><Link to="/services/custom-software" className="hover:text-foreground">Custom software</Link></li>
          <li><Link to="/services/restaurant-technology" className="hover:text-foreground">Restaurant technology</Link></li>
          <li><Link to="/services" className="hover:text-foreground">Growth</Link></li>
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3">Company</h2>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li><a href="/#work" className="hover:text-foreground">Work</a></li>
          <li><a href="/#about" className="hover:text-foreground">About</a></li>
          <li><a href="/#process" className="hover:text-foreground">Process</a></li>
          <li><Link to="/contact" className="hover:text-foreground">Contact</Link></li>
        </ul>
      </div>

      <div>
        <h2 className="text-sm font-semibold mb-3">Contact</h2>
        <ul className="space-y-2.5 text-sm text-muted-foreground">
          <li className="flex items-start gap-2"><MapPin className="w-4 h-4 mt-0.5 text-primary" aria-hidden /> Islamabad, Pakistan</li>
          <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary" aria-hidden /><a href="tel:+923173712950" className="hover:text-foreground">0317 3712 950</a></li>
          <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary" aria-hidden /><a href="mailto:info@amenterprises.tech" className="hover:text-foreground">info@amenterprises.tech</a></li>
        </ul>
      </div>
    </div>

    <div className="border-t border-border">
      <div className="container mx-auto py-5 flex flex-col sm:flex-row justify-between gap-3 text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} AM Enterprises</p>
        <div className="flex gap-5">
          <Link to="/privacy-policy" className="hover:text-foreground">Privacy</Link>
          <Link to="/terms" className="hover:text-foreground">Terms</Link>
        </div>
      </div>
    </div>
  </footer>
);
