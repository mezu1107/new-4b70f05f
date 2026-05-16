import { Link } from "react-router-dom";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Sparkles, TrendingUp, Code, Bot } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const FALLBACK_CATEGORIES = [
  { key: "AI Automation", icon: Bot, featured: true, items: [
    { title: "AI Chatbots", slug: "ai-chatbots" },
    { title: "WhatsApp Bots", slug: "whatsapp-bots" },
    { title: "WhatsApp API Integration", slug: "whatsapp-api" },
    { title: "Shopify Bots", slug: "shopify-bots" },
    { title: "GPT Integrations", slug: "gpt-integrations" },
    { title: "AI SaaS Solutions", slug: "ai-saas" },
  ]},
  { key: "Digital Marketing", icon: TrendingUp, items: [
    { title: "SEO Services", slug: "seo-services" },
    { title: "Social Media Marketing", slug: "social-media-marketing" },
    { title: "Google Ads", slug: "google-ads" },
    { title: "Facebook Ads", slug: "facebook-ads" },
    { title: "Content Marketing", slug: "content-marketing" },
  ]},
  { key: "Web Development", icon: Code, items: [
    { title: "Custom Websites", slug: "web-development" },
    { title: "Shopify Development", slug: "ecommerce-development" },
    { title: "WordPress", slug: "wordpress" },
    { title: "MERN Stack", slug: "mern-stack" },
    { title: "SaaS Platforms", slug: "saas-platforms" },
  ]},
  { key: "Automation", icon: Sparkles, items: [
    { title: "YouTube Automation", slug: "youtube-automation" },
    { title: "TikTok Automation", slug: "tiktok-automation" },
    { title: "Workflow Automation", slug: "workflow-automation" },
  ]},
];

export const MegaMenu = ({ onNavigate }: { onNavigate?: () => void }) => {
  const [open, setOpen] = useState(false);
  const { data: services } = useRealtimeTable<any>({
    table: "services",
    filters: [{ column: "is_active", value: true }],
    orderBy: { column: "sort_order" },
  });

  // Group DB services by category, fall back to defaults if empty
  const grouped = (() => {
    if (!services || services.length === 0) return FALLBACK_CATEGORIES;
    const map = new Map<string, any[]>();
    for (const s of services) {
      const cat = s.category || "Services";
      if (!map.has(cat)) map.set(cat, []);
      map.get(cat)!.push(s);
    }
    const order = ["AI Automation", "Digital Marketing", "Web Development", "Automation", "Services"];
    return Array.from(map.entries())
      .sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]))
      .map(([key, items]) => {
        const fb = FALLBACK_CATEGORIES.find(c => c.key === key);
        return { key, icon: fb?.icon || Sparkles, featured: fb?.featured, items };
      });
  })();

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <Link to="/services" className="text-sm font-medium text-muted-foreground hover:text-primary inline-flex items-center gap-1">
        Services <ChevronDown className="w-4 h-4" />
      </Link>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.18 }}
            className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-50"
          >
            <div className="w-[min(900px,90vw)] rounded-2xl border border-border bg-white/95 backdrop-blur-xl shadow-elegant p-6 grid grid-cols-2 lg:grid-cols-4 gap-5">
              {grouped.map((cat) => (
                <div key={cat.key} className="relative">
                  <div className="flex items-center gap-2 mb-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-white ${cat.featured ? "bg-gradient-to-br from-fuchsia-500 to-cyan-400" : "gradient-primary"}`}>
                      <cat.icon className="w-4 h-4" />
                    </div>
                    <div className="font-bold text-sm">{cat.key}</div>
                    {cat.featured && (
                      <span className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full bg-fuchsia-100 text-fuchsia-700">TRENDING</span>
                    )}
                  </div>
                  <ul className="space-y-1.5">
                    {cat.items.slice(0, 6).map((s: any) => (
                      <li key={s.slug || s.id}>
                        <Link
                          to={`/services/${s.slug}`}
                          onClick={onNavigate}
                          className="text-sm text-muted-foreground hover:text-primary transition-smooth block py-0.5"
                        >
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
