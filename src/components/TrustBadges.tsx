import { ShieldCheck, Award, Clock, Users, Star, ThumbsUp } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "SSL Secured" },
  { icon: Award, label: "Google Partner" },
  { icon: Star, label: "5-Star Rated" },
  { icon: Clock, label: "On-Time Delivery" },
  { icon: Users, label: "150+ Clients" },
  { icon: ThumbsUp, label: "Money-Back Guarantee" },
];

export const TrustBadges = () => (
  <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
    {badges.map((b) => (
      <div key={b.label} className="flex flex-col items-center text-center gap-2 p-3 rounded-xl bg-white border border-border hover:shadow-card transition-smooth">
        <b.icon className="w-7 h-7 text-primary" />
        <span className="text-xs font-medium text-foreground">{b.label}</span>
      </div>
    ))}
  </div>
);
