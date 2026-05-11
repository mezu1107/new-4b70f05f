import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";

const cases = [
  { brand: "TechVista", metric: "+312%", label: "Qualified Leads", time: "in 90 days", color: "from-primary to-accent" },
  { brand: "GlowCart", metric: "4.2x", label: "E-commerce Sales", time: "in 6 months", color: "from-accent to-primary" },
  { brand: "NovaCorp", metric: "#1", label: "Google Ranking", time: "for target keyword", color: "from-secondary-foreground to-primary" },
];

export const CaseStudyHighlights = () => (
  <div className="grid md:grid-cols-3 gap-6">
    {cases.map((c, i) => (
      <motion.div key={c.brand} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative p-8 rounded-2xl bg-white border border-border shadow-card hover:shadow-elegant transition-smooth overflow-hidden">
        <TrendingUp className="absolute top-4 right-4 w-6 h-6 text-accent" />
        <div className="text-sm text-muted-foreground mb-1">{c.brand}</div>
        <div className="text-5xl font-extrabold text-gradient mb-2">{c.metric}</div>
        <div className="font-semibold text-foreground">{c.label}</div>
        <div className="text-sm text-muted-foreground">{c.time}</div>
      </motion.div>
    ))}
  </div>
);
