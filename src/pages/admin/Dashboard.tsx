import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Users, MessageSquare, Receipt, FileSignature, Mail, Briefcase } from "lucide-react";

const counters = [
  { table: "team_members", label: "Team", icon: Users },
  { table: "services", label: "Services", icon: Briefcase },
  { table: "contact_leads", label: "Leads", icon: MessageSquare },
  { table: "newsletter_subscribers", label: "Subscribers", icon: Mail },
  { table: "invoices", label: "Invoices", icon: Receipt },
  { table: "proposals", label: "Proposals", icon: FileSignature },
] as const;

const Dashboard = () => {
  const { data } = useQuery({
    queryKey: ["admin_counts"],
    queryFn: async () => {
      const out: Record<string, number> = {};
      for (const c of counters) {
        const { count } = await supabase.from(c.table as any).select("*", { count: "exact", head: true });
        out[c.table] = count ?? 0;
      }
      return out;
    },
  });
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {counters.map((c) => (
          <Card key={c.table} className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{c.label}</span>
              <c.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="text-3xl font-bold">{data?.[c.table] ?? "—"}</div>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default Dashboard;
