import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const fallback = [
  { name: "Ali Hassan", role: "CEO, TechVista", quote: "AM Enterprises rebuilt our funnel and tripled our qualified leads in 90 days.", rating: 5 },
  { name: "Sarah Khan", role: "Founder, GlowCart", quote: "Our e-commerce sales jumped 4x. Best decision we made.", rating: 5 },
];

const Testimonials = () => {
  const { data } = useRealtimeTable<any>({ table: "testimonials", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const list = data && data.length ? data : fallback;
  return (
    <PageLayout title="Testimonials — Client Reviews | AM Enterprises" description="Real reviews from clients across Pakistan who grew with AM Enterprises." canonical="/testimonials">
      <PageHero title="Client Testimonials" subtitle="Don't take our word for it — hear from the brands we've helped grow." />
      <section className="py-16">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((t: any) => (
            <Card key={t.id ?? t.name} className="p-6">
              <div className="flex gap-1 mb-3">{[...Array(t.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-accent text-accent" />)}</div>
              <p className="mb-5">"{t.quote}"</p>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-muted-foreground">{t.role}</div>
            </Card>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
export default Testimonials;
