import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageHero } from "@/components/layout/PageHero";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import NotFound from "./NotFound";

interface Section { type: string; data: any }
interface Page {
  id: string; slug: string; title: string;
  hero_subtitle?: string; hero_image?: string;
  sections: Section[];
  meta_title?: string; meta_description?: string; primary_keyword?: string;
}

const RenderSection = ({ s }: { s: Section }) => {
  const d = s.data || {};
  switch (s.type) {
    case "text":
      return (
        <section className="py-16">
          <div className="container mx-auto max-w-3xl">
            {d.heading && <h2 className="text-3xl md:text-4xl mb-4">{d.heading}</h2>}
            {d.body && <div className="prose max-w-none text-muted-foreground whitespace-pre-line">{d.body}</div>}
          </div>
        </section>
      );
    case "features":
      return (
        <section className="py-20 bg-secondary/40">
          <div className="container mx-auto">
            {d.heading && <h2 className="text-3xl md:text-4xl text-center mb-3">{d.heading}</h2>}
            {d.subheading && <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">{d.subheading}</p>}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {(d.items || []).map((it: any, i: number) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-6 h-full hover:shadow-elegant transition-smooth bg-white">
                    {it.icon && <div className="w-12 h-12 rounded-lg gradient-primary text-white flex items-center justify-center mb-4 text-xl">{it.icon}</div>}
                    <h3 className="text-lg mb-2">{it.title}</h3>
                    <p className="text-sm text-muted-foreground">{it.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    case "pricing":
      return (
        <section className="py-20">
          <div className="container mx-auto">
            {d.heading && <h2 className="text-3xl md:text-4xl text-center mb-3">{d.heading}</h2>}
            {d.subheading && <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">{d.subheading}</p>}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {(d.plans || []).map((p: any, i: number) => (
                <Card key={i} className={`p-8 ${p.featured ? "border-primary border-2 shadow-elegant scale-105" : ""} bg-white`}>
                  {p.featured && <div className="text-xs font-bold text-primary uppercase mb-2">Most Popular</div>}
                  <h3 className="text-xl mb-2">{p.name}</h3>
                  <div className="text-4xl font-extrabold mb-1">{p.currency || "PKR"} {p.price}</div>
                  <div className="text-sm text-muted-foreground mb-5">{p.period || "per month"}</div>
                  <ul className="space-y-2 mb-6">
                    {(p.features || []).map((f: string, j: number) => (
                      <li key={j} className="flex items-start gap-2 text-sm"><Check className="w-4 h-4 text-primary mt-0.5 shrink-0" /> {f}</li>
                    ))}
                  </ul>
                  <Button asChild variant={p.featured ? "hero" : "outline"} className="w-full">
                    <Link to={p.cta_url || "/contact"}>{p.cta_text || "Get Started"}</Link>
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </section>
      );
    case "faq":
      return (
        <section className="py-20 bg-secondary/40">
          <div className="container mx-auto max-w-3xl">
            {d.heading && <h2 className="text-3xl md:text-4xl text-center mb-10">{d.heading}</h2>}
            <Accordion type="single" collapsible>
              {(d.items || []).map((q: any, i: number) => (
                <AccordionItem key={i} value={`q-${i}`}>
                  <AccordionTrigger>{q.question}</AccordionTrigger>
                  <AccordionContent>{q.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      );
    case "cta":
      return (
        <section className="py-20">
          <div className="container mx-auto">
            <Card className="p-10 md:p-16 gradient-primary text-white text-center shadow-elegant border-0">
              <h2 className="text-3xl md:text-5xl mb-4">{d.heading}</h2>
              {d.subheading && <p className="opacity-95 mb-8 max-w-2xl mx-auto">{d.subheading}</p>}
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="accent" size="xl"><Link to={d.cta_url || "/contact"}>{d.cta_text || "Get Started"} <ArrowRight className="ml-1" /></Link></Button>
                {d.secondary_text && <Button asChild size="xl" variant="outline" className="bg-white/10 border-white/40 text-white hover:bg-white/20"><a href={d.secondary_url || "tel:03173712950"}>{d.secondary_text}</a></Button>}
              </div>
            </Card>
          </div>
        </section>
      );
    case "gallery":
      return (
        <section className="py-20">
          <div className="container mx-auto">
            {d.heading && <h2 className="text-3xl md:text-4xl text-center mb-10">{d.heading}</h2>}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {(d.images || []).map((img: any, i: number) => (
                <img key={i} src={typeof img === "string" ? img : img.url} alt={img.alt || `Gallery ${i + 1}`} loading="lazy" className="w-full aspect-square object-cover rounded-lg shadow-card" />
              ))}
            </div>
          </div>
        </section>
      );
    case "stats":
      return (
        <section className="py-16 border-b border-border">
          <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            {(d.items || []).map((it: any, i: number) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-extrabold text-gradient">{it.value}{it.suffix || ""}</div>
                <div className="text-sm text-muted-foreground mt-2">{it.label}</div>
              </div>
            ))}
          </div>
        </section>
      );
    default:
      return null;
  }
};

const DynamicPage = () => {
  const { slug } = useParams();
  const [page, setPage] = useState<Page | null | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data } = await supabase.from("dynamic_pages").select("*").eq("slug", slug!).eq("is_published", true).maybeSingle();
      if (!cancelled) setPage(data as any);
    })();
    const ch = supabase
      .channel(`rt-dyn-${slug}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "dynamic_pages", filter: `slug=eq.${slug}` }, (payload) => {
        if (payload.eventType === "DELETE") setPage(null);
        else setPage(payload.new as any);
      })
      .subscribe();
    return () => { cancelled = true; supabase.removeChannel(ch); };
  }, [slug]);

  if (page === undefined) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  if (page === null) return <NotFound />;

  const sections: Section[] = Array.isArray(page.sections) ? page.sections : [];

  return (
    <PageLayout
      title={page.meta_title || page.title}
      description={page.meta_description || page.hero_subtitle || page.title}
      canonical={`/p/${page.slug}`}
      primaryKeyword={page.primary_keyword}
    >
      <PageHero title={page.title} subtitle={page.hero_subtitle} backgroundImage={page.hero_image} />
      {sections.map((s, i) => <RenderSection key={i} s={s} />)}
    </PageLayout>
  );
};

export default DynamicPage;
