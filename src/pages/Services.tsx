import { PageHero } from "@/components/layout/PageHero";
import { Link } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { services as fallbackServices } from "@/data/services";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";
import { AIAutomationShowcase } from "@/components/AIAutomationShowcase";

const Services = () => {
  const { data } = useRealtimeTable<any>({ table: "services", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const list: any[] = data && data.length ? data : fallbackServices;
  return (
    <PageLayout title="Services — Digital Marketing & Software | AM Enterprises" description="Explore our full range of services: SEO, digital marketing, web & app development, branding and more." canonical="/services">
      <PageHero title="Our Services" subtitle="End-to-end digital growth services tailored to your business goals." />

      <AIAutomationShowcase />

      <section className="py-20">
        <div className="container mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {list.map((s: any) => (
            <Card key={s.slug || s.id} className="p-6 hover:shadow-elegant hover:-translate-y-1 transition-smooth flex flex-col">
              <h3 className="text-xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">{s.description || s.short}</p>
              {s.pricing && <div className="text-sm font-semibold text-primary mb-4">{s.pricing}</div>}
              <Button asChild variant="hero" size="sm"><Link to={`/services/${s.slug}`}>View Details <ArrowRight /></Link></Button>
            </Card>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Services;
