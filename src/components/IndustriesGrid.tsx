import { motion } from "framer-motion";
import { ShoppingBag, Stethoscope, GraduationCap, Building2, Utensils, Plane, Wrench, Briefcase } from "lucide-react";
import { Card } from "@/components/ui/card";

const industries = [
  { icon: ShoppingBag, label: "E-commerce" },
  { icon: Stethoscope, label: "Healthcare" },
  { icon: GraduationCap, label: "Education" },
  { icon: Building2, label: "Real Estate" },
  { icon: Utensils, label: "Restaurants" },
  { icon: Plane, label: "Travel & Tourism" },
  { icon: Wrench, label: "Services & Trades" },
  { icon: Briefcase, label: "B2B / SaaS" },
];

export const IndustriesGrid = () => (
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
    {industries.map((it, i) => (
      <motion.div key={it.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
        <Card className="p-5 text-center hover:shadow-elegant hover:-translate-y-1 transition-smooth bg-white">
          <it.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
          <div className="text-sm font-semibold">{it.label}</div>
        </Card>
      </motion.div>
    ))}
  </div>
);
