import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Search, Lightbulb, Rocket, BarChart3 } from "lucide-react";
import { useRealtimeTable } from "@/hooks/useRealtimeTable";

const fallback = [
  { title: "Discover", description: "We audit your business, audience & competition.", icon: "Search" },
  { title: "Strategize", description: "Custom roadmap with KPIs and timelines.", icon: "Lightbulb" },
  { title: "Execute", description: "Specialists launch campaigns and ship code fast.", icon: "Rocket" },
  { title: "Optimize", description: "Continuous testing & reporting for more ROI.", icon: "BarChart3" },
];

const iconFor = (name?: string) => {
  if (name && (Icons as any)[name]) return (Icons as any)[name];
  return [Search, Lightbulb, Rocket, BarChart3];
};

export const ProcessTimeline = () => {
  const { data } = useRealtimeTable<any>({ table: "process_steps", filters: [{ column: "is_active", value: true }], orderBy: { column: "sort_order" } });
  const steps = (data && data.length ? data : fallback) as any[];
  return (
    <div className="relative">
      <div className="hidden md:block absolute top-12 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary opacity-30" />
      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((s: any, i: number) => {
          const Icon = (Icons as any)[s.icon] || iconFor()[i % 4];
          return (
            <motion.div key={s.id ?? s.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15, duration: 0.5 }} className="text-center relative">
              <div className="relative z-10 w-24 h-24 mx-auto rounded-full gradient-primary flex items-center justify-center shadow-glow mb-5">
                <Icon className="w-10 h-10 text-white" />
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm">{i + 1}</div>
              </div>
              <h3 className="text-xl mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
