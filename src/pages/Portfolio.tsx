import { PageHero } from "@/components/layout/PageHero";
import { useMemo, useState } from "react";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const Portfolio = () => {
  const { data } = useRealtimeTable<any>({ table: "portfolio_items", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const items = data ?? [];
  const cats = useMemo(() => ["All", ...Array.from(new Set(items.map((i: any) => i.category).filter(Boolean)))], [items]);
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? items : items.filter((i: any) => i.category === active);
  return (
    <PageLayout title="Portfolio — Our Work | AM Enterprises" description="Explore websites, apps, and marketing campaigns we've built for ambitious clients." canonical="/portfolio">
      <PageHero title="Our Portfolio" subtitle="Real work for real businesses." />
      <section className="py-16">
        <div className="container mx-auto">
          {cats.length > 1 && (
            <div className="flex flex-wrap gap-2 justify-center mb-10">
              {cats.map((c) => (
                <Button key={c} variant={active === c ? "hero" : "outline"} size="sm" onClick={() => setActive(c)}>{c}</Button>
              ))}
            </div>
          )}
          {items.length === 0 && <p className="text-center text-muted-foreground">Projects coming soon.</p>}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((i: any) => (
              <Card key={i.id} className="overflow-hidden hover:shadow-elegant hover:-translate-y-1 transition-smooth">
                {i.image_url ? <img src={i.image_url} alt={i.title} className="h-48 w-full object-cover" /> : <div className="h-48 gradient-primary" />}
                <div className="p-6">
                  {i.category && <div className="text-xs font-semibold text-accent uppercase mb-2">{i.category}</div>}
                  <h3 className="text-lg mb-2">{i.title}</h3>
                  <p className="text-sm text-muted-foreground">{i.description}</p>
                  {i.project_url && <a href={i.project_url} target="_blank" rel="noopener noreferrer" className="text-primary text-sm font-semibold mt-3 inline-block">View →</a>}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};
export default Portfolio;
