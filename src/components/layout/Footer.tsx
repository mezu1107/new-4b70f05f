import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Twitter, Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import fallbackLogo from "@/assets/logo.png";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export const Footer = () => {
  const { data: settings } = useSiteSettings();
  const logo = settings?.logo_url || fallbackLogo;
  const siteName = settings?.site_name || "AM Enterprises";
  return (
  <footer className="bg-primary text-primary-foreground mt-24">
    <div className="container mx-auto py-16 grid md:grid-cols-4 gap-10">
      <div>
        <div className="flex items-center gap-2 mb-4">
          <img src={logo} alt={`${siteName} logo`} className="w-10 h-10 rounded-full object-cover bg-white" />
          <span className="font-bold text-lg">{siteName}</span>
        </div>
        <p className="text-sm opacity-80">Digital marketing & software agency helping businesses scale through smart digital solutions since 2022.</p>
        <div className="flex gap-3 mt-5">
          <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"><Facebook className="w-4 h-4" /></a>
          <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"><Instagram className="w-4 h-4" /></a>
          <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"><Linkedin className="w-4 h-4" /></a>
          <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center"><Twitter className="w-4 h-4" /></a>
        </div>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Company</h4>
        <ul className="space-y-2 text-sm opacity-80">
          <li><Link to="/about" className="hover:opacity-100">About</Link></li>
          <li><Link to="/portfolio" className="hover:opacity-100">Portfolio</Link></li>
          <li><Link to="/case-studies" className="hover:opacity-100">Case Studies</Link></li>
          <li><Link to="/testimonials" className="hover:opacity-100">Testimonials</Link></li>
          <li><Link to="/blog" className="hover:opacity-100">Blog</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Services</h4>
        <ul className="space-y-2 text-sm opacity-80">
          <li><Link to="/services/digital-marketing">Digital Marketing</Link></li>
          <li><Link to="/services/seo-services">SEO Services</Link></li>
          <li><Link to="/services/web-development">Web Development</Link></li>
          <li><Link to="/services/app-development">App Development</Link></li>
          <li><Link to="/services/branding-design">Branding & Design</Link></li>
        </ul>
      </div>
      <div>
        <h4 className="font-semibold mb-4">Contact</h4>
        <ul className="space-y-3 text-sm opacity-80">
          <li><a href="tel:03173712950" className="flex gap-2 hover:opacity-100"><Phone className="w-4 h-4 mt-0.5" /> 0317-3712950</a></li>
          <li><a href="https://wa.me/923173712950" target="_blank" rel="noopener noreferrer" className="flex gap-2 hover:opacity-100"><MessageCircle className="w-4 h-4 mt-0.5" /> WhatsApp Chat</a></li>
          <li><a href="mailto:hello@amenterprises.pk" className="flex gap-2 hover:opacity-100"><Mail className="w-4 h-4 mt-0.5" /> hello@amenterprises.pk</a></li>
          <li className="flex gap-2"><MapPin className="w-4 h-4 mt-0.5" /> Islamabad & Rawat Technology Park, Pakistan</li>
        </ul>
      </div>
    </div>
    <div className="border-t border-white/10">
      <div className="container mx-auto py-6 flex flex-col md:flex-row justify-between gap-3 text-sm opacity-70">
        <p>© {new Date().getFullYear()} AM Enterprises. All rights reserved.</p>
        <div className="flex gap-5">
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
          <Link to="/faq">FAQ</Link>
        </div>
      </div>
    </div>
  </footer>
  );
};
