import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  return (
    <footer className="bg-dark border-t border-border mt-24">
      <div className="container mx-auto py-16 grid md:grid-cols-2 lg:grid-cols-5 gap-10">
        <div className="lg:col-span-1">
          <div className="leading-tight mb-4">
            <div className="font-extrabold text-xl tracking-tight">
              <span className="text-primary">AM</span> ENTERPRISES
            </div>
            <div className="text-[10px] tracking-[0.2em] opacity-60">.TECH</div>
          </div>
          <p className="text-sm opacity-70 mb-5 leading-relaxed">AI-powered marketing systems that help businesses in USA &amp; Canada generate leads, scale ads, and automate growth.</p>
          <div className="flex gap-2">
            {[Facebook, Linkedin, Instagram, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social" className="w-9 h-9 rounded-lg border border-border bg-card/40 hover:border-primary hover:text-primary flex items-center justify-center transition-smooth">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Quick Links</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            <li><Link to="/" className="hover:text-primary hover:opacity-100">Home</Link></li>
            <li><Link to="/services" className="hover:text-primary hover:opacity-100">Services</Link></li>
            <li><Link to="/#ai-systems" className="hover:text-primary hover:opacity-100">AI Systems</Link></li>
            <li><Link to="/case-studies" className="hover:text-primary hover:opacity-100">Case Studies</Link></li>
            <li><Link to="/pricing" className="hover:text-primary hover:opacity-100">Pricing</Link></li>
            <li><Link to="/about" className="hover:text-primary hover:opacity-100">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Services</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            <li><Link to="/services/google-ads" className="hover:text-primary hover:opacity-100">Google Ads</Link></li>
            <li><Link to="/services/social-media-marketing" className="hover:text-primary hover:opacity-100">Meta Ads</Link></li>
            <li><Link to="/services/seo-services" className="hover:text-primary hover:opacity-100">SEO</Link></li>
            <li><Link to="/services/web-development" className="hover:text-primary hover:opacity-100">Web Development</Link></li>
            <li><Link to="/services" className="hover:text-primary hover:opacity-100">AI Automation</Link></li>
            <li><Link to="/services" className="hover:text-primary hover:opacity-100">CRM Systems</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Resources</h4>
          <ul className="space-y-2.5 text-sm opacity-70">
            <li><Link to="/blog" className="hover:text-primary hover:opacity-100">Blog</Link></li>
            <li><Link to="/case-studies" className="hover:text-primary hover:opacity-100">Case Studies</Link></li>
            <li><Link to="/blog" className="hover:text-primary hover:opacity-100">Guides</Link></li>
            <li><Link to="/faq" className="hover:text-primary hover:opacity-100">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-primary hover:opacity-100">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4 text-sm uppercase tracking-wider opacity-90">Contact Us</h4>
          <ul className="space-y-3 text-sm opacity-70 mb-5">
            <li><a href="mailto:info@amenterprises.tech <br>amenterprises1105@gmail.com" className="flex gap-2 hover:text-primary hover:opacity-100"><Mail className="w-4 h-4 mt-0.5 shrink-0" /> hello@amenterprises.tech</a></li>
            <li><a href="tel:+92 3173712950" className="flex gap-2 hover:text-primary hover:opacity-100"><Phone className="w-4 h-4 mt-0.5 shrink-0" /> +92 3173712950</a></li>
            <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5 shrink-0" /> USA & Canada | Pakistan (Islamabad, Rawalpindi)  </li>
          </ul>
          <Button asChild className="gradient-cta text-primary-foreground shadow-glow w-full">
            <Link to="/contact"><Calendar className="w-4 h-4 mr-2" /> Book Free Call</Link>
          </Button>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container mx-auto py-5 flex flex-col md:flex-row justify-between gap-3 text-sm opacity-60">
          <p>© {new Date().getFullYear()} AM Enterprises. All Rights Reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy-policy" className="hover:text-primary">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
