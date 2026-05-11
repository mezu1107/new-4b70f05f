import { motion } from "framer-motion";
import { Bot, Gauge, Shield, Headphones, BarChart3, Globe } from "lucide-react";

const features = [
  { icon: Bot, title: "AI-Powered Workflows", desc: "Automate lead capture, replies and reporting with smart AI agents." },
  { icon: Gauge, title: "Lightning Performance", desc: "Sub-second page loads & 95+ Lighthouse scores on every project." },
  { icon: Shield, title: "Enterprise Security", desc: "SSL, secure hosting, regular backups and GDPR-ready setups." },
  { icon: Headphones, title: "24/7 Support", desc: "Dedicated team via WhatsApp, email and call — whenever you need us." },
  { icon: BarChart3, title: "Real-Time Dashboards", desc: "See traffic, leads, ROI and conversions live — full transparency." },
  { icon: Globe, title: "Global Standards", desc: "International best practices, delivered with local Pakistani value." },
];

export const FeatureGrid = () => (
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
    {features.map((f, i) => (
      <motion.div
        key={f.title}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08, duration: 0.5 }}
        className="p-6 rounded-2xl bg-white border border-border hover:border-primary/50 hover:shadow-elegant transition-smooth group"
      >
        <div className="w-12 h-12 rounded-xl gradient-accent flex items-center justify-center mb-4 group-hover:scale-110 transition-smooth">
          <f.icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg mb-2">{f.title}</h3>
        <p className="text-sm text-muted-foreground">{f.desc}</p>
      </motion.div>
    ))}
  </div>
);
