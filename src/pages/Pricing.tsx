import { PageHero } from "@/components/layout/PageHero";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Crown } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const Pricing = () => {
  const { data: plans } = useRealtimeTable<any>({ table: "pricing_plans", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const { data: packs } = useRealtimeTable<any>({ table: "packages", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });

  return (
    <PageLayout title="Pricing — Plans & Packages | AM Enterprises" description="Transparent monthly plans and one-off packages for growth, marketing, and software." canonical="/pricing">
      <PageHero title="Pricing" subtitle="Pick a plan that matches your stage. Upgrade anytime." />

      <section className="py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl mb-8 text-center">Monthly Plans</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {(plans ?? []).map((t: any) => {
              const features: string[] = Array.isArray(t.features) ? t.features : [];
              return (
                <Card key={t.id} className={`p-8 h-full relative ${t.highlighted ? "border-2 border-primary shadow-elegant" : "shadow-card"}`}>
                  {t.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-primary text-white text-xs font-bold flex items-center gap-1">
                      <Crown className="w-3 h-3" /> POPULAR
                    </div>
                  )}
                  <h3 className="text-2xl mb-2">{t.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{t.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-extrabold text-gradient">{t.currency} {Number(t.price).toLocaleString()}</span>
                    {t.period && <span className="text-muted-foreground text-sm">/{t.period}</span>}
                  </div>
                  <ul className="space-y-3 mb-8">
                    {features.map((f, i) => <li key={i} className="flex gap-2 text-sm"><Check className="w-5 h-5 text-accent shrink-0" /> {f}</li>)}
                  </ul>
                  <Button asChild variant={t.highlighted ? "hero" : "outline"} className="w-full">
                    <Link to={t.cta_url || "/contact"}>{t.cta_text || "Get Started"}</Link>
                  </Button>
                </Card>
              );
            })}
            {(plans ?? []).length === 0 && <p className="text-center text-muted-foreground col-span-full">Plans coming soon.</p>}
          </div>
        </div>
      </section>

      {(packs ?? []).length > 0 && (
        <section className="py-16 bg-secondary/40">
          <div className="container mx-auto">
            <h2 className="text-3xl mb-8 text-center">One-off Packages</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(packs ?? []).map((p: any) => {
                const inc: string[] = Array.isArray(p.includes) ? p.includes : [];
                return (
                  <Card key={p.id} className="p-6">
                    {p.image_url && <img src={p.image_url} alt={p.name} className="h-40 w-full object-cover rounded-lg mb-4" />}
                    <h3 className="text-xl font-bold">{p.name}</h3>
                    {p.tagline && <p className="text-xs text-accent uppercase font-bold mt-1">{p.tagline}</p>}
                    <p className="text-sm text-muted-foreground my-3">{p.description}</p>
                    <div className="text-2xl font-extrabold text-gradient mb-3">{p.currency} {Number(p.price).toLocaleString()}</div>
                    <ul className="space-y-1 text-sm mb-4">{inc.map((i, k) => <li key={k} className="flex gap-2"><Check className="w-4 h-4 text-accent shrink-0 mt-0.5" /> {i}</li>)}</ul>
                    <Button asChild variant="hero" className="w-full"><Link to="/contact">Enquire</Link></Button>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};
export default Pricing;
