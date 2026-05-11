import { PageHero } from "@/components/layout/PageHero";
import { useParams, Link, Navigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle2 } from "lucide-react";
import { services as fallback } from "@/data/services";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const ServiceDetail = () => {
  const { slug } = useParams();
  const { data, isLoading } = useRealtimeTable<any>({ table: "services", filters: [{ column: "slug", value: slug }], limit: 1 });
  const dbService = data?.[0];
  const fb = fallback.find((x) => x.slug === slug);
  if (isLoading) return <div className="min-h-screen" />;
  if (!dbService && !fb) return <Navigate to="/services" replace />;

  const s = dbService ? {
    title: dbService.title,
    short: dbService.description,
    description: dbService.long_description || dbService.description,
    benefits: fb?.benefits ?? [],
    process: fb?.process ?? [],
    pricing: fb?.pricing ?? "",
    faqs: fb?.faqs ?? [],
    slug: dbService.slug,
  } : fb!;

  return (
    <PageLayout title={`${s.title} — AM Enterprises`} description={s.short} canonical={`/services/${s.slug}`}>
      <PageHero title={s.title} subtitle={s.short} />
      <div className="container mx-auto -mt-8 relative z-10 mb-12 text-center">
        <Button asChild variant="accent" size="lg"><Link to="/contact">Get a Quote</Link></Button>
      </div>

      <section className="py-16">
        <div className="container mx-auto max-w-4xl">
          <p className="text-lg text-muted-foreground mb-10 whitespace-pre-line">{s.description}</p>

          {s.benefits.length > 0 && (<>
            <h2 className="text-2xl mb-6">Key Benefits</h2>
            <div className="grid md:grid-cols-2 gap-3 mb-12">
              {s.benefits.map((b) => (
                <div key={b} className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-accent mt-0.5 shrink-0" /><span>{b}</span></div>
              ))}
            </div>
          </>)}

          {s.process.length > 0 && (<>
            <h2 className="text-2xl mb-6">Our Process</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-12">
              {s.process.map((p, i) => (
                <Card key={p.step} className="p-5">
                  <div className="text-sm font-bold text-accent mb-2">STEP {i + 1}</div>
                  <h3 className="text-lg mb-1">{p.step}</h3>
                  <p className="text-sm text-muted-foreground">{p.desc}</p>
                </Card>
              ))}
            </div>
          </>)}

          {s.pricing && (
            <Card className="p-8 gradient-primary text-primary-foreground mb-12">
              <div className="text-sm uppercase tracking-wider opacity-80 mb-2">Pricing</div>
              <div className="text-3xl font-bold mb-4">{s.pricing}</div>
              <Button asChild variant="accent" size="lg"><Link to="/contact">Request Quote</Link></Button>
            </Card>
          )}

          {s.faqs.length > 0 && (<>
            <h2 className="text-2xl mb-6">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible>
              {s.faqs.map((f, i) => (
                <AccordionItem key={i} value={`q${i}`}>
                  <AccordionTrigger>{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </>)}
        </div>
      </section>
    </PageLayout>
  );
};

export default ServiceDetail;
