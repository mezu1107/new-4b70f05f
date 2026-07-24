import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

type T = { id?: string; name: string; role?: string | null; quote: string; rating?: number };

const fallback: T[] = [
  { name: "Sarah Mitchell", role: "Founder, GlowCart (USA)", quote: "AM Enterprises transformed our funnel — 3x ROAS in the first 60 days. Reporting is world-class.", rating: 5 },
  { name: "James O'Connor", role: "CEO, FinEdge (UK)", quote: "Finally an agency that ships. Website relaunched in 15 days and leads doubled.", rating: 5 },
  { name: "Priya Shah", role: "Marketing Lead, NovaCorp", quote: "Their AI automation replaced two full-time roles. The team is genuinely brilliant.", rating: 5 },
  { name: "Daniel Reyes", role: "Owner, SwiftMart (CA)", quote: "Straight talk, real results. Best digital partner we've ever hired.", rating: 5 },
  { name: "Aisha Rahman", role: "Director, MediCare+", quote: "Patient bookings up 240%. Their SEO team is the best in the business.", rating: 5 },
  { name: "Michael Thompson", role: "Founder, TechVista", quote: "Weekly reports, dedicated manager, zero fluff. Highly recommended.", rating: 5 },
  { name: "Emma Wilson", role: "CMO, EduPro (AU)", quote: "Ad spend cut 30%, conversions up 4x. They know exactly what they're doing.", rating: 5 },
  { name: "Kabir Malhotra", role: "Founder, PakBazaar", quote: "From strategy to execution — everything on time, on budget, on point.", rating: 5 },
];

const Card = ({ t }: { t: T }) => (
  <div className="w-[340px] sm:w-[380px] shrink-0 rounded-2xl border border-border bg-card p-6 shadow-card hover:shadow-elegant hover:-translate-y-1 transition-smooth">
    <Quote className="w-6 h-6 text-primary/50 mb-3" />
    <p className="text-sm leading-relaxed text-foreground/85 mb-4 line-clamp-4">"{t.quote}"</p>
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm font-bold">{t.name}</div>
        {t.role && <div className="text-xs text-muted-foreground">{t.role}</div>}
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: t.rating || 5 }).map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 fill-primary text-primary" />
        ))}
      </div>
    </div>
  </div>
);

const Row = ({ items, direction = "left" }: { items: T[]; direction?: "left" | "right" }) => {
  const doubled = [...items, ...items];
  const from = direction === "left" ? "0%" : "-50%";
  const to = direction === "left" ? "-50%" : "0%";
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
      <motion.div
        className="flex gap-5 py-3"
        animate={{ x: [from, to] }}
        transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map((t, i) => (
          <Card key={i} t={t} />
        ))}
      </motion.div>
    </div>
  );
};

export const TestimonialsMarquee = () => {
  const { data } = useQuery({
    queryKey: ["public_testimonials"],
    queryFn: async () => {
      const { data } = await supabase.from("testimonials").select("*").eq("is_active", true).order("sort_order");
      return (data as T[]) ?? [];
    },
  });
  const items = data && data.length >= 4 ? data : fallback;
  const mid = Math.ceil(items.length / 2);
  const row1 = items.slice(0, mid);
  const row2 = items.slice(mid).concat(items.slice(0, Math.max(0, 4 - (items.length - mid))));

  return (
    <div className="space-y-5">
      <Row items={row1} direction="left" />
      <Row items={row2.length ? row2 : items} direction="right" />
    </div>
  );
};
