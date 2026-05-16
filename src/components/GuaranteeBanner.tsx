import { Shield, Clock, RefreshCw, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

const items = [
  { icon: Shield, title: "100% Satisfaction", desc: "Or your money back within 14 days." },
  { icon: Clock, title: "On-Time Delivery", desc: "Every project, every milestone." },
  { icon: RefreshCw, title: "Unlimited Revisions", desc: "Until you love the result." },
  { icon: Award, title: "Award-Winning Team", desc: "Certified experts at your service." },
];

export const GuaranteeBanner = () => (
  <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
    {items.map((it) => (
      <Card key={it.title} className="p-5 flex items-start gap-3 bg-white hover:shadow-elegant transition-smooth">
        <div className="w-11 h-11 rounded-lg gradient-primary text-white flex items-center justify-center shrink-0"><it.icon className="w-5 h-5" /></div>
        <div>
          <div className="font-semibold text-sm">{it.title}</div>
          <div className="text-xs text-muted-foreground">{it.desc}</div>
        </div>
      </Card>
    ))}
  </div>
);
