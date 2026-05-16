import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const fallback = [
  { question: "How long until I see results?", answer: "Most clients see measurable lift in 30–60 days for ads, and 3–6 months for SEO." },
  { question: "Do you work with small businesses?", answer: "Absolutely — flexible packages starting at PKR 45,000/mo." },
  { question: "Will I own my website and content?", answer: "Yes — 100%. Every asset and codebase belongs to you." },
];

export const FAQAccordion = () => {
  const { data } = useRealtimeTable<any>({ table: "faqs", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" }, limit: 6 });
  const list = data && data.length ? data : fallback;
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
      <Accordion type="single" collapsible className="space-y-3">
        {list.map((f: any, i: number) => (
          <AccordionItem key={f.id ?? i} value={`i${i}`} className="border-2 border-border rounded-xl px-5 bg-white">
            <AccordionTrigger className="text-left font-semibold hover:no-underline">{f.question}</AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </motion.div>
  );
};
