import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Calendar, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT } from "@/lib/contact";

export const Footer = () => {
  return (
    <footer className="bg-dark border-t border-border mt-24">
      <div className="container mx-auto py-14 grid md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="font-extrabold text-xl tracking-tight mb-4">
            <span className="text-primary">AM</span> ENTERPRISES
          </div>
          <p className="text-sm opacity-70 mb-5 leading-relaxed">
            AI-powered marketing systems that help ambitious brands generate leads, scale ads and automate growth.
          </p>
          <div className="flex gap-2">
            {[Facebook, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="w-9 h-9 rounded-lg border border-border bg-card/40 hover:border-primary hover:text-primary flex items-center justify-center transition-smooth">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Company</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            <li><Link to="/about" className="hover:text-primary hover:opacity-100">About Us</Link></li>
            <li><Link to="/services" className="hover:text-primary hover:opacity-100">Services</Link></li>
            <li><Link to="/case-studies" className="hover:text-primary hover:opacity-100">Case Studies</Link></li>
            <li><Link to="/pricing" className="hover:text-primary hover:opacity-100">Pricing</Link></li>
            <li><Link to="/blog" className="hover:text-primary hover:opacity-100">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-primary hover:opacity-100">Contact</Link></li>
          </ul>
        </div>

        {/* Contact — dropdowns */}
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Get In Touch</h4>
          <ul className="space-y-3 text-sm opacity-80">
            {/* Phone dropdown */}
            <li className="group relative">
              <button className="flex items-center gap-2 hover:text-primary transition-smooth w-full">
                <Phone className="w-4 h-4 shrink-0" />
                <span>{CONTACT.phones[0].display}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute left-0 bottom-full mb-2 z-30 min-w-[240px] rounded-xl border border-border bg-background text-foreground shadow-elegant p-2">
                {CONTACT.phones.map((p) => (
                  <a key={p.tel} href={`tel:${p.tel}`} className="flex items-start gap-2 px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-smooth">
                    <Phone className="w-4 h-4 mt-0.5 shrink-0" />
                    <div>
                      <div className="text-sm font-semibold">{p.display}</div>
                      <div className="text-xs text-muted-foreground">{p.label}</div>
                    </div>
                  </a>
                ))}
              </div>
            </li>

            {/* Location dropdown */}
            <li className="group relative">
              <button className="flex items-center gap-2 hover:text-primary transition-smooth w-full">
                <MapPin className="w-4 h-4 shrink-0" />
                <span>Our Offices</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute left-0 bottom-full mb-2 z-30 min-w-[260px] rounded-xl border border-border bg-background text-foreground shadow-elegant p-2">
                {CONTACT.offices.map((o) => (
                  <div key={o.name} className="flex items-start gap-2 px-3 py-2 rounded-md hover:bg-primary/10">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
                    <div>
                      <div className="text-sm font-semibold">{o.name}</div>
                      <div className="text-xs text-muted-foreground">{o.address}</div>
                    </div>
                  </div>
                ))}
              </div>
            </li>

            {/* Email dropdown */}
            <li className="group relative">
              <button className="flex items-center gap-2 hover:text-primary transition-smooth w-full">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="break-all">{CONTACT.emails[0]}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-60 group-hover:rotate-180 transition-transform" />
              </button>
              <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all absolute left-0 bottom-full mb-2 z-30 min-w-[280px] rounded-xl border border-border bg-background text-foreground shadow-elegant p-2">
                {CONTACT.emails.map((e) => (
                  <a key={e} href={`mailto:${e}`} className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-smooth">
                    <Mail className="w-4 h-4 shrink-0" />
                    <span className="text-sm break-all">{e}</span>
                  </a>
                ))}
              </div>
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Ready To Grow?</h4>
          <p className="text-sm opacity-70 mb-4 leading-relaxed">Book a free 15-min strategy call. No pressure — just a clear next step.</p>
          <Button asChild className="gradient-cta text-primary-foreground shadow-glow w-full">
            <Link to="/contact"><Calendar className="w-4 h-4 mr-2" /> Book Free Call</Link>
          </Button>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container mx-auto py-5 flex flex-col md:flex-row justify-between gap-3 text-sm opacity-60">
          <p>© {new Date().getFullYear()} AM Enterprises. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-primary">Privacy</Link>
            <Link to="/terms" className="hover:text-primary">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
