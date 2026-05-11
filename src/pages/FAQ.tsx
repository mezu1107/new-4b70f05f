import { PageHero } from "@/components/layout/PageHero";
import { PageLayout } from "@/components/layout/PageLayout";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const fallback = [
  { question: "How much do your services cost?", answer: "Pricing depends on scope. Marketing starts at PKR 35,000/month; websites from PKR 150,000; apps from PKR 400,000." },
  { question: "How long does a typical project take?", answer: "Websites 4–8 weeks, apps 10–16 weeks, campaigns launch in 2 weeks." },
];

const FAQ = () => {
  const { data } = useRealtimeTable<any>({ table: "faqs", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const list = data && data.length ? data : fallback;
  return (
    <PageLayout title="FAQ — Frequently Asked Questions | AM Enterprises" description="Pricing, timelines, services and process — answers to the questions clients ask most." canonical="/faq">
      <PageHero title="Frequently Asked Questions" subtitle="Everything you need to know about working with us." />
      <section className="py-16">
        <div className="container mx-auto max-w-3xl">
          <Accordion type="single" collapsible>
            {list.map((f: any, i: number) => (
              <AccordionItem key={f.id ?? i} value={`q${i}`}>
                <AccordionTrigger className="text-left">{f.question}</AccordionTrigger>
                <AccordionContent>{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </PageLayout>
  );
};
export default FAQ;
