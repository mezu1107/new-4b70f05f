import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Card } from "@/components/ui/card";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const CaseStudies = () => {
  const { data } = useRealtimeTable<any>({ table: "case_studies", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const list = data ?? [];
  return (
    <PageLayout title="Case Studies — Real Results | AM Enterprises" description="See how we've helped clients achieve 4x growth, 10x SEO traffic, and more." canonical="/case-studies">
      <PageHero title="Case Studies" subtitle="Problem → Solution → Results." />
      <section className="py-16">
        <div className="container mx-auto max-w-4xl space-y-8">
          {list.length === 0 && <p className="text-center text-muted-foreground">Case studies coming soon.</p>}
          {list.map((s: any) => (
            <Card key={s.id} className="p-8 shadow-card">
              <div className="flex items-baseline justify-between flex-wrap gap-2 mb-6">
                <h2 className="text-2xl">{s.client || s.title}</h2>
                {s.industry && <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.industry}</span>}
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                <div><div className="text-xs font-bold text-destructive uppercase mb-2">Challenge</div><p className="text-sm">{s.challenge}</p></div>
                <div><div className="text-xs font-bold text-accent uppercase mb-2">Solution</div><p className="text-sm">{s.solution}</p></div>
                <div><div className="text-xs font-bold text-primary uppercase mb-2">Results</div><p className="text-sm whitespace-pre-line">{s.results}</p></div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};
export default CaseStudies;
