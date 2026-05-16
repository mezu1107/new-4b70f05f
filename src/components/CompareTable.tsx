import { Check, X } from "lucide-react";

const rows = [
  { f: "Dedicated Account Manager", a: true, b: false, c: false },
  { f: "AI-Powered Reporting", a: true, b: false, c: true },
  { f: "24/7 Support", a: true, b: true, c: false },
  { f: "Free SEO Audit", a: true, b: false, c: false },
  { f: "ROI Guarantee", a: true, b: false, c: false },
  { f: "Local Pakistan Team", a: true, b: false, c: true },
  { f: "Custom Strategy", a: true, b: false, c: false },
];

export const CompareTable = () => (
  <div className="overflow-x-auto">
    <table className="w-full bg-white rounded-2xl shadow-card border border-border overflow-hidden">
      <thead className="gradient-primary text-white">
        <tr>
          <th className="text-left p-4">Feature</th>
          <th className="p-4 font-bold">AM Enterprises</th>
          <th className="p-4 font-medium opacity-90">Freelancers</th>
          <th className="p-4 font-medium opacity-90">Other Agencies</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={r.f} className={i % 2 ? "bg-secondary/40" : ""}>
            <td className="p-4 font-medium text-foreground">{r.f}</td>
            <td className="p-4 text-center">{r.a ? <Check className="w-5 h-5 text-accent inline" /> : <X className="w-5 h-5 text-muted-foreground inline" />}</td>
            <td className="p-4 text-center">{r.b ? <Check className="w-5 h-5 text-accent inline" /> : <X className="w-5 h-5 text-muted-foreground inline" />}</td>
            <td className="p-4 text-center">{r.c ? <Check className="w-5 h-5 text-accent inline" /> : <X className="w-5 h-5 text-muted-foreground inline" />}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
