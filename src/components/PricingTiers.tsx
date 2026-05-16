import { motion } from "framer-motion";
import { Check, Crown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const fallback = [
  { name: "Starter", price: 45000, currency: "PKR", period: "month", description: "Perfect for small businesses ready to grow.", features: ["1-page website", "Basic SEO setup", "Social starter kit", "Monthly report"] },
  { name: "Growth", price: 120000, currency: "PKR", period: "month", description: "Most popular — built to scale revenue.", features: ["Multi-page website", "Full SEO + content", "Social + Google Ads", "Lead automation"], highlighted: true },
  { name: "Enterprise", price: 0, currency: "PKR", period: "month", description: "Full digital transformation & custom software.", features: ["Custom dev", "Dedicated AM", "AI integrations", "24/7 support"] },
];

export const PricingTiers = () => {
  const { data } = useRealtimeTable<any>({ table: "pricing_plans", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" }, limit: 3 });
  const tiers = (data && data.length ? data : fallback) as any[];
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {tiers.map((t: any, i: number) => {
        const features: string[] = Array.isArray(t.features) ? t.features : [];
        return (
          <motion.div key={t.id ?? t.name} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }}>
            <Card className={`p-8 h-full relative transition-smooth hover:-translate-y-2 ${t.highlighted ? "border-2 border-primary shadow-elegant" : "shadow-card"}`}>
              {t.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-white text-xs font-bold flex items-center gap-1">
                  <Crown className="w-3 h-3" /> MOST POPULAR
                </div>
              )}
              <h3 className="text-2xl mb-2">{t.name}</h3>
              <p className="text-sm text-muted-foreground mb-5">{t.description}</p>
              <div className="mb-6">
                <span className="text-4xl font-extrabold text-gradient">
                  {Number(t.price) === 0 ? "Custom" : `${t.currency || "PKR"} ${Number(t.price).toLocaleString()}`}
                </span>
                {Number(t.price) > 0 && t.period && <span className="text-muted-foreground text-sm">/{t.period}</span>}
              </div>
              <ul className="space-y-3 mb-8">
                {features.map((f) => <li key={f} className="flex gap-2 text-sm"><Check className="w-5 h-5 text-accent shrink-0" /> {f}</li>)}
              </ul>
              <Button asChild variant={t.highlighted ? "hero" : "outline"} className="w-full">
                <Link to={t.cta_url || "/contact"}>{t.cta_text || "Get Started"}</Link>
              </Button>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};
